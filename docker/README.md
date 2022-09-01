## 传染病可视化系统镜像
访问地址：http://10.11.12.2:8080/
### 运行

1. **拉取镜像（900M，大概要10分钟）到本地**。docker pull liuyishoua/infectious_visual:3.0

   

2. **本地运行镜像**。docker run -it -p 8080[外部端口]:80[内部端口] liuyishoua/infectious_visual:3.0 /bin/bash。（不太懂外部，内部端口，请看下面的项目描述）

   

3. 如上的 2 的命令，实际上已经进入到刚刚创建的容器中了。（run命令，创建容器并运行）

   

4. **启动 nginx 服务器**。容器内输入（经过2后你已经在容器中）：nginx

   

5. **启动 uwsgi 服务器**。先 cd /root/apps/infectious_disease_analysis_platform ，再 uwsgi uwsgi.ini。

   

6. **按 ctrl + p + q 退出容器**

**命令集合如下**：

```shell
# 1. 拉取镜像到本地
root@VM-8-2-ubuntu: docker pull liuyishoua/infectious_visual:3.0
# 2. 本地运行镜像,并给该容器命名为 oligei
root@VM-8-2-ubuntu: docker run -it -p 8080[外部端口]:80[内部端口] --name oligei liuyishoua/infectious_visual:2.0 /bin/bash
# 4. 已经在容器中，启动 nginx 服务器
[root@6e7ad5b5121b /] nginx
# 5. 进入项目主目录,启动 uwsgi 服务器
[root@6e7ad5b5121b /] cd /root/apps/infectious_disease_analysis_platform
[root@6e7ad5b5121b /] uwsgi uwsgi.ini
# 6. 按 ctrl + p + q 退出容器
root@VM-8-2-ubuntu:
```

###  运行测试

1. **本机测试**

```shell
curl 127.0.0.1

# 或者用本地浏览器访问http://127.0.0.1
# 注意没有设置安全服务，只能 http 访问，不能 https
```

2. **公网测试**（前提：拥有公网ip）

```python
# 需要改几个自己的 IP 的配置

# 1. 进入容器内部
root@VM-8-2-ubuntu: docker exec -it oligei /bin/bash
# 2. 关闭所有nginx以及uwsgi服务
[root@6e7ad5b5121b /] ps -ef|grep -E "nginx|uwsgi"|awk '{print $2}'|xargs kill -s 9

# 3. 更改nginx配置, 改动如图一所示。加上 default_server 并注释掉 server_name。
[root@6e7ad5b5121b /] cd /etc/nginx
[root@6e7ad5b5121b /] vi nginx.conf
# 4. 更改django setting.py的配置。改动如图二所示
[root@6e7ad5b5121b /] cd /root/apps/infectious_disease_analysis_platform/
[root@6e7ad5b5121b /] vi infectious_disease_analysis_platform/settings.py

# 5. 开启nginx服务以及uwsgi服务
[root@6e7ad5b5121b /] nginx
[root@6e7ad5b5121b /] uwsgi uwsgi.ini
# 6. 按 ctrl + p + q 退出容器。这时候不仅 curl 127.0.0.1 能访问。通过公网ip地址也能访问。比如我的服务器 http://82.156.12.199/
```

![1658994155697](http://10.11.12.2/liuyishou/infectious_visual/-/raw/master/images/docker/infectious/4.png)

​											图一

![1658994414284](http://10.11.12.2/liuyishou/infectious_visual/-/raw/master/images/docker/infectious/5.png)

​											图二

### 展示效果

![1658988486020](http://10.11.12.2/liuyishou/infectious_visual/-/raw/master/images/docker/infectious/1.png)

### 项目描述

**架构**：

1. 前端采用原生的html，css，js技术以及 echart 实现大屏和动画效果。 

   

2. 为了便于将算法嵌入的后端程序中，采用python的Django框架搭建。

   

3. 由于展示的数据格式较为统一（Json文件），暂时未考虑使用数据库技术。

**部署**：

采用 ubuntu16.04 + uwsgi + nginx + django。

![1658989874885](http://10.11.12.2/liuyishou/infectious_visual/-/raw/master/images/docker/infectious/3.png)

1. 看过去很复杂，其实 uwsgi 与 nginx 都是独立的模块，他们通过 tcp 端口 9000 实现通讯。上图搞错了，9000 改成 81。

   

2. 这意味着就算没有了 uwsgi，你在本地还是能够访问到nginx服务。

   

3. 只不过只会出现 nginx 的首页，我们的传染病系统就看不到了

**主要文件目录**:

* 项目的主目录

  ```shell
  /root/apps/infectious_disease_analysis_platform
  ```

* uwsgi配置目录

  ```shell
  /root/apps/infectious_disease_analysis_platform/uwsgi.ini
  ```

* nginx配置目录

  ```python
  /etc/nginx/nginx.conf
  ```

**Tips**：仅提供比较重要的目录。只要配好这三个文件，哪个电脑都运行得起来。

### 学习链接

* nginx选用server规则 

  https://blog.csdn.net/qq_35952638/article/details/100163824

* 使用uWSGI和nginx来设置Django和你的web服务器

  https://uwsgi-docs-zh.readthedocs.io/zh_CN/latest/tutorials/Django_and_nginx.html

**Linux命令总结**：

* 查看进程

  ```shell
  ps -ef | grep 指定名字
  ```

* kill 进程

  ```shell
  kill -s -9 pid
  ```

* 批量 kill 进程

  ```shell
  ps -ef | grep nginx | awk '{print $2}' | xargs kill -s 9 
  ```

* 查看端口开放情况

  ```shell
  netstat -ntlp
  ```

* 管道查看多个name

  ```shell
  ps -ef | grep -E "name1|name2"
  ```
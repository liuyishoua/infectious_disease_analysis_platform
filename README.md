# 传染病可视化系统

传染病大屏展示系统。包括数据实时更新以及 facebook prophet 算法进行实时预测，预测与数据更新频率：一天。

访问地址：http://47.116.64.26/

### 概览

**文件**

* **docker** 文件夹提供 docker 容器的开发部署功能

  

* **infectious_disease_analysis_platform** 为项目主目录

**架构**

1. 前端采用原生的 html，css，js 技术以及 echart 实现大屏和动画效果。

   

2. 为了便于将算法嵌入的后端程序中，采用 python 的 Django 框架搭建。

   

3. 由于展示的数据格式较为统一（Json文件），暂时未考虑使用数据库技术。

**TIPS**: **项目的进展以及细节，请** [点击跳转](http://10.11.12.2/liuyishou/infectious_visual/-/tree/master/infectious_disease_analysis_platform) **查看**

**展示**

![1658988486020](https://raw.githubusercontent.com/liuyishoua/images/master/docker/infectious/1.png)

点击图展示平台，进入如下

![1658988486020](https://raw.githubusercontent.com/liuyishoua/images/master/docker/infectious/2.png)

### 运行

1. 安装所需 Python 生态库

   

2. 进入项目主目录

   

3. 开发环境直接运行即可（工程级部署，转自 docker 文件内查看详情）

```python
# 1. 安装所需 Python 生态库
pip install -r requirement.txt

# 2. 进入项目主目录
cd infectious_disease_analysis_platform

# 3. 测试环境直接运行即可 (如下对与任何访问的服务器，开发 80 端口)
python manage.py runserver 0.0.0.0:80
```

### 重要文件

* 项目设置

```shell
infectious_disease_analysis_platform\infectious_disease_analysis_platform\settings.py

# 1. 设置静态路由以及 template 访问路由
# 2. 在工程部署时，其中的变量 ALLOWED_HOSTS 需要加上自己的公网 IP 比如：['127.0.0.1','82.156.12.199']
```
* 运行入口

```shell
infectious_disease_analysis_platform\manage.py

# 该项目的运行入口。在工程部署时，一般无需改动
```


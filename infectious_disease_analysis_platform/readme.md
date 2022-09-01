## 项目主目录

传染病大屏展示系统。包括数据实时更新以及 facebook prophet 算法进行实时预测，预测与数据更新频率：一天。

访问地址：http://47.116.64.26/

### 概览

**架构**

1. 前端采用原生的 html，css，js 技术以及 echart 实现大屏和动画效果。 



2. 为了便于将算法嵌入的后端程序中，采用 python 的 Django 框架搭建。

   

3. 由于展示的数据格式较为统一（Json文件），暂时未考虑使用数据库技术。

**展示**

![1658988486020](https://raw.githubusercontent.com/liuyishoua/infectious_disease_analysis_platform/master/images/docker/infectious/1.png)

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

### 项目细节

**整体**

* Django 包括两个 app ，一个是 **infectious_disease_analysis_platform**，另外是 **visual** 

  

* **infectious_disease_analysis_platform** 是 Django 启动自动建的一个 app。不能惯着它，之后建了一个 **visual** app，所有逻辑的实现均在 **visual** app里面。

  

* **infectious_disease_analysis_platform** 仅实现一个路由的转接，转到 visual 的 urls.py 文件内（如下图）。

![整体逻辑](https://raw.githubusercontent.com/liuyishoua/infectious_disease_analysis_platform/master/images/docker/infectious/zhengti.png)

- 项目配置

```shell
infectious_disease_analysis_platform\infectious_disease_analysis_platform\settings.py

# 1. 设置静态路由以及 template 访问路由
# 2. 在工程部署时，其中的变量 ALLOWED_HOSTS 需要加上自己的公网 IP 比如：['127.0.0.1','82.156.12.199']
```

**前端**

前端包括 templates 与 static 两个文件夹。其细节如下图所示


* 前端的大屏主页再怎么花哨，无非是数据在不同维度的展示，体现不同的统计特征，便于人类捕捉关键信息。

  

* 这里需要着重注意的是 **原始数据的加载** 以及主页上几个 **动态图的实现**。

![前端逻辑](https://raw.githubusercontent.com/liuyishoua/infectious_disease_analysis_platform/master/images/docker/infectious/houduan.png)



**后端**

* 后端路由模块，在 **整体** 中通过图直观的表示出来了

  

* 难点在**自动更新模块**。（通过 timeloop 库实现，开启一个线程自动监听，每过一天就更新一次元数据，即 /visual/static/datas/plot.json 文件）

![后端逻辑](https://raw.githubusercontent.com/liuyishoua/infectious_disease_analysis_platform/master/images/docker/infectious/qianduan.png)

### 项目进度
* **总的来说**

1. **目标**：传染病作为主要场景，围绕各种与图相关的应用场景展开，实现可视化监督与交互

2. **场景**：主页（已完成），图展示（已完成），国外疫情预测，疫情爆发临界建模，时空伴随者模拟推演

![大逻辑](https://raw.githubusercontent.com/liuyishoua/infectious_disease_analysis_platform/master/images/docker/infectious/all_logic.png)


* **已完成**

1. 传染病的大屏主页展示。

2. 图展示平台，包括社区挖掘与子图查找功能。



* **已完成，但是需要修补的工作**

1. 传染病大屏展示为了更加可信，可以添加疫情数据实时爬取更新模块

2. 图展示平台虽然整个页面效果有了，但是社区挖掘以及子图查找的算法还没有应用上，现在看到的是手动设置的数据。



* **未完成**

1. 国外疫情预测

2. 疫情爆发临界建模

3. 时空伴随者模拟推演

### 有话说

1. 前端代码写的混乱，但大体原则就是一个页面用一个 html 写

2. 传染病页面前端主要用的是百度的 **echarts** 技术，图展示平台的前端使用蚂蚁的 **G6** 做图渲染，echarts 做图表展示。

3. 如果有问题，将问题列全发送至邮箱 fyhvyhj@gmail.com




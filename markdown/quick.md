---
name: quick
title: 快速开始
group: guide
index: 0
---

# 快速开始

### 第一步，安装工具

首先，需要安装命令行工具 `doczilla`，使用命令行工具可方便的「创建文档项目、本地编写及预览、构建部署版本」，同时，还可用于「开发 `doczilla` 插件」。

```sh
npm i doczilla -g
```

### 第二步，创建项目

可以新建一个目录或在现有开发项目的目录中创建文档，直接通过 init 初始化项目文档配置。

```sh
doc init
```

通过如上的命令将会在目录下自动生成 `doczilla.yml` 文档配置，`单击下边的「展开配置示例」查看`

::: details 展开配置示例 收起配置示例
```yaml
# 本地预览端口，省略时将自动选择一个可用端口
port: 9527
# 文档输出目录，与配置文件相对的目录
output: ./docs
# 生成模式，可选 static/browser/hash 三种模式
mode: static

# 针对每种语言配置
locales:
    # 基础配置
  - name: zh                                        
    text: 中文                                       
    title: Doczilla 
    # 导航栏链接列表
    links:
      - text: GitHub
        url: https://github.com/Houfeng/doczilla
    # 分组设定
    groups:
      - name: guide
        text: 入门
      - name: plugin
        text: 插件    
    # 文档匹配表达式 
    docs:
      - ./**/*.md
      - '!./node_modules/**/*.md'
```
:::


### 第三步，编写文档

文档项目初始完成后，即可过命令行工具启动本地实时预览

```sh
doc dev
```

实时预览启动成功后，将会在 `终端` 看到如下启动信息

```sh
...
[doczilla] Started: http://127.0.0.1:9527
...
```

在浏览器打开提示的 URL，然后在项目合适的目录任意创建 `markdown` 文件，只要为配置中 `文档匹配表达式` 即可。

示例文档

```md
---
name: demo
title: 示例文档
group: guide
---

# 示例文档

这是一个示例文档

```

在 `doczilla` 中每一个 `markdown 文档` 在头部都需要包括用于描述文描的 `文档元信息`，包括

名称     | 必需     | 作用  
------- | ------- | -------  
name    | Yes     | 文档名称（将影响 URL） 
title   | Yes     | 文档标题  
group   | Yes     | 文档所属分组
index   | No      | 文档的排序 
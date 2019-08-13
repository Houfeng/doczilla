window.DOC_DATA={"locales":[{"name":"zh","text":"中文","title":"Doczilla","links":[{"text":"GitHub","url":"https://github.com/Houfeng/doczilla"}],"groups":[{"name":"guide","text":"入门","docs":[{"name":"quick","title":"快速开始","group":"guide","index":0,"source":"# 快速开始\n\n### 第一步，安装工具\n\n首先，需要安装命令行工具 `doczilla`，使用命令行工具可方便的「创建文档项目、本地编写及预览、构建部署版本」，同时，还可用于「开发 `doczilla` 插件」。\n\n```sh\nnpm i doczilla -g\n```\n\n### 第二步，创建项目\n\n可以新建一个目录或在现有开发项目的目录中创建文档，直接通过 init 初始化项目文档配置。\n\n```sh\ndoc init\n```\n\n通过如上的命令将会在目录下自动生成 `doczilla.yml` 文档配置，`单击下边的「展开配置示例」查看`\n\n::: details 展开配置示例 收起配置示例\n```yaml\n# 本地预览端口，省略时将自动选择一个可用端口\nport: 9527\n# 文档输出目录，与配置文件相对的目录\noutput: ./docs\n# 生成模式，可选 static/browser/hash 三种模式\nmode: static\n\n# 针对每种语言配置\nlocales:\n    # 基础配置\n  - name: zh                                        \n    text: 中文                                       \n    title: Doczilla \n    # 导航栏链接列表\n    links:\n      - text: GitHub\n        url: https://github.com/Houfeng/doczilla\n    # 分组设定\n    groups:\n      - name: guide\n        text: 入门\n      - name: plugin\n        text: 插件    \n    # 文档匹配表达式 \n    docs:\n      - ./**/*.md\n      - '!./node_modules/**/*.md'\n```\n:::\n\n\n### 第三步，编写文档\n\n文档项目初始完成后，即可过命令行工具启动本地实时预览\n\n```sh\ndoc dev\n```\n\n实时预览启动成功后，将会在 `终端` 看到如下启动信息\n\n```sh\n...\n[doczilla] Started: http://127.0.0.1:9527\n...\n```\n\n在浏览器打开提示的 URL，然后在项目合适的目录任意创建 `markdown` 文件，只要为配置中 `文档匹配表达式` 即可。\n\n示例文档\n\n```md\n---\nname: demo\ntitle: 示例文档\ngroup: guide\n---\n\n# 示例文档\n\n这是一个示例文档\n\n```\n\n在 `doczilla` 中每一个 `markdown 文档` 在头部都需要包括用于描述文描的 `文档元信息`，包括\n\n名称     | 必需     | 作用  \n------- | ------- | -------  \nname    | Yes     | 文档名称（将影响 URL） \ntitle   | Yes     | 文档标题  \ngroup   | Yes     | 文档所属分组\nindex   | No      | 文档的排序","filename":"./markdown/quick.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1 id=\"%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B\">快速开始</h1>\n<h3 id=\"%E7%AC%AC%E4%B8%80%E6%AD%A5%EF%BC%8C%E5%AE%89%E8%A3%85%E5%B7%A5%E5%85%B7\">第一步，安装工具</h3>\n<p>首先，需要安装命令行工具 <code>doczilla</code>，使用命令行工具可方便的「创建文档项目、本地编写及预览、构建部署版本」，同时，还可用于「开发 <code>doczilla</code> 插件」。</p>\n<pre><code class=\"language-sh\">npm i doczilla -g\n</code></pre>\n<h3 id=\"%E7%AC%AC%E4%BA%8C%E6%AD%A5%EF%BC%8C%E5%88%9B%E5%BB%BA%E9%A1%B9%E7%9B%AE\">第二步，创建项目</h3>\n<p>可以新建一个目录或在现有开发项目的目录中创建文档，直接通过 init 初始化项目文档配置。</p>\n<pre><code class=\"language-sh\">doc init\n</code></pre>\n<p>通过如上的命令将会在目录下自动生成 <code>doczilla.yml</code> 文档配置，<code>单击下边的「展开配置示例」查看</code></p>\n<details><summary><span class=\"state-open\">展开配置示例</span><span class=\"state-close\">收起配置示例</span></summary><pre><code class=\"language-yaml\"><span class=\"token comment\"># 本地预览端口，省略时将自动选择一个可用端口</span>\n<span class=\"token key atrule\">port</span><span class=\"token punctuation\">:</span> <span class=\"token number\">9527</span>\n<span class=\"token comment\"># 文档输出目录，与配置文件相对的目录</span>\n<span class=\"token key atrule\">output</span><span class=\"token punctuation\">:</span> ./docs\n<span class=\"token comment\"># 生成模式，可选 static/browser/hash 三种模式</span>\n<span class=\"token key atrule\">mode</span><span class=\"token punctuation\">:</span> static\n\n<span class=\"token comment\"># 针对每种语言配置</span>\n<span class=\"token key atrule\">locales</span><span class=\"token punctuation\">:</span>\n    <span class=\"token comment\"># 基础配置</span>\n  <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">name</span><span class=\"token punctuation\">:</span> zh                                        \n    <span class=\"token key atrule\">text</span><span class=\"token punctuation\">:</span> 中文                                       \n    <span class=\"token key atrule\">title</span><span class=\"token punctuation\">:</span> Doczilla \n    <span class=\"token comment\"># 导航栏链接列表</span>\n    <span class=\"token key atrule\">links</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">text</span><span class=\"token punctuation\">:</span> GitHub\n        <span class=\"token key atrule\">url</span><span class=\"token punctuation\">:</span> https<span class=\"token punctuation\">:</span>//github.com/Houfeng/doczilla\n    <span class=\"token comment\"># 分组设定</span>\n    <span class=\"token key atrule\">groups</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">name</span><span class=\"token punctuation\">:</span> guide\n        <span class=\"token key atrule\">text</span><span class=\"token punctuation\">:</span> 入门\n      <span class=\"token punctuation\">-</span> <span class=\"token key atrule\">name</span><span class=\"token punctuation\">:</span> plugin\n        <span class=\"token key atrule\">text</span><span class=\"token punctuation\">:</span> 插件    \n    <span class=\"token comment\"># 文档匹配表达式 </span>\n    <span class=\"token key atrule\">docs</span><span class=\"token punctuation\">:</span>\n      <span class=\"token punctuation\">-</span> ./**/*.md\n      <span class=\"token punctuation\">-</span> <span class=\"token string\">'!./node_modules/**/*.md'</span>\n</code></pre>\n</details><h3 id=\"%E7%AC%AC%E4%B8%89%E6%AD%A5%EF%BC%8C%E7%BC%96%E5%86%99%E6%96%87%E6%A1%A3\">第三步，编写文档</h3>\n<p>文档项目初始完成后，即可过命令行工具启动本地实时预览</p>\n<pre><code class=\"language-sh\">doc dev\n</code></pre>\n<p>实时预览启动成功后，将会在 <code>终端</code> 看到如下启动信息</p>\n<pre><code class=\"language-sh\">...\n[doczilla] Started: http://127.0.0.1:9527\n...\n</code></pre>\n<p>在浏览器打开提示的 URL，然后在项目合适的目录任意创建 <code>markdown</code> 文件，只要为配置中 <code>文档匹配表达式</code> 即可。</p>\n<p>示例文档</p>\n<pre><code class=\"language-md\"><span class=\"token hr punctuation\">---</span>\nname: demo\ntitle: 示例文档\n<span class=\"token title important\">group: guide\n<span class=\"token punctuation\">---</span></span>\n\n<span class=\"token title important\"><span class=\"token punctuation\">#</span> 示例文档</span>\n\n这是一个示例文档\n\n</code></pre>\n<p>在 <code>doczilla</code> 中每一个 <code>markdown 文档</code> 在头部都需要包括用于描述文描的 <code>文档元信息</code>，包括</p>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>必需</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>name</td>\n<td>Yes</td>\n<td>文档名称（将影响 URL）</td>\n</tr>\n<tr>\n<td>title</td>\n<td>Yes</td>\n<td>文档标题</td>\n</tr>\n<tr>\n<td>group</td>\n<td>Yes</td>\n<td>文档所属分组</td>\n</tr>\n<tr>\n<td>index</td>\n<td>No</td>\n<td>文档的排序</td>\n</tr>\n</tbody>\n</table>\n"},{"name":"config","title":"配置文档","keywords":"配置,文档","group":"guide","index":1,"source":"# 配置文档","filename":"./markdown/confg.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1 id=\"%E9%85%8D%E7%BD%AE%E6%96%87%E6%A1%A3\">配置文档</h1>\n"},{"name":"deploy","title":"部署文档","group":"guide","index":2,"source":"# 部署文档","filename":"./markdown/deploy.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1 id=\"%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3\">部署文档</h1>\n"}]},{"name":"plugin","text":"插件","docs":[{"name":"use","title":"使用插件","group":"plugin","index":0,"source":"# 使用插件","filename":"./markdown/plugin-use.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1 id=\"%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6\">使用插件</h1>\n"},{"name":"dev","title":"开发插件","group":"plugin","index":1,"source":"# 开发插件","filename":"./markdown/plugin-dev.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1 id=\"%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6\">开发插件</h1>\n"}]}]}],"plugins":[{"name":"doczilla-place","options":{}},{"name":"doczilla-include","options":{}},{"name":"doczilla-container","options":{}},{"name":"doczilla-highlight","options":{}},{"name":"doczilla-details","options":{}},{"name":"doczilla-card","options":{}},{"name":"doczilla-anchor","options":{}}],"mode":"hash","baseUri":"","extname":""};
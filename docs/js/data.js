window.DOC_DATA={"locales":[{"name":"zh","text":"中文","title":"测试文档","links":[{"text":"测试链接","url":"test-url"}],"groups":[{"name":"guide","text":"使用指南","docs":[{"group":"guide","name":"doc3","title":"文档三","index":0,"source":"# 文档三\n\n::: card 50\n\n```js\nconsole.log('你好中国');\n``` \n \n:::\n\n::: card 50\n\n你好中国\n \n:::\n\n\n::: details\n```js\nimport { Popover } from '@ali/aps';\n...\nrender() {\n  return <div>\n    <Popover \n      overlay={true} \n      visible={this.state.visible} \n      dock=\"center\"\n      follow=\"rigth\"\n      autoClose={true} />\n  </div>;\n}\n...\n```\n:::\n\n\n<pre><code class=\"language-js\">console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'这是一个测试666'</span><span class=\"token punctuation\">)</span>\n</code></pre>\n","filename":"./markdown/doc3.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1>文档三</h1>\n<div class=\"card\" style=\"width:50%;\">\n        <div class=\"inner\"><pre><code class=\"language-js\">console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'你好中国'</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n</code></pre>\n</div></div><div class=\"card\" style=\"width:50%;\">\n        <div class=\"inner\"><p>你好中国</p>\n</div></div><details><summary><span class=\"state-open\">Details</span><span class=\"state-close\">Details</span></summary><pre><code class=\"language-js\"><span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Popover <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@ali/aps'</span><span class=\"token punctuation\">;</span>\n<span class=\"token operator\">...</span>\n<span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token operator\">&lt;</span>div<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>Popover \n      overlay<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> \n      visible<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>state<span class=\"token punctuation\">.</span>visible<span class=\"token punctuation\">}</span> \n      dock<span class=\"token operator\">=</span><span class=\"token string\">\"center\"</span>\n      follow<span class=\"token operator\">=</span><span class=\"token string\">\"rigth\"</span>\n      autoClose<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n<span class=\"token operator\">...</span>\n</code></pre>\n</details><pre><code class=\"language-js\">console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'这是一个测试666'</span><span class=\"token punctuation\">)</span>\n</code></pre>\n"},{"group":"guide","name":"doc4","title":"文档 4","index":0,"source":"# Icon\n\n语义化的矢量图形。\n\n# 如何使用\n\n使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:\n\n```js\n<Icon type=\"refresh\" />\n```\n\n# 图标列表\n\n使用方式：\n\n- 在下方找到需要使用的图标，例如 `xiajiantou`\n- 则直接使用 `xiajiantou` 作为`type`\n\n## API\n\n由于图标字体本质上还是文字，可以使用 `style` 和 `className` 设置图标的大小和颜色。\n\n```jsx\n<Icon type=\"question\" style={{ fontSize: 16, color: '#08c' }} />\n```\n\n<!-- @latest-css-url https://at.alicdn.com/t/font_755236_42mhpr0p14p.css -->","filename":"./markdown/doc4.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1>Icon</h1>\n<p>语义化的矢量图形。</p>\n<h1>如何使用</h1>\n<p>使用 <code>&lt;Icon /&gt;</code> 标签声明组件，指定图标对应的 type 属性，示例代码如下:</p>\n<pre><code class=\"language-js\"><span class=\"token operator\">&lt;</span>Icon type<span class=\"token operator\">=</span><span class=\"token string\">\"refresh\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n</code></pre>\n<h1>图标列表</h1>\n<p>使用方式：</p>\n<ul>\n<li>在下方找到需要使用的图标，例如 <code>xiajiantou</code></li>\n<li>则直接使用 <code>xiajiantou</code> 作为<code>type</code></li>\n</ul>\n<h2>API</h2>\n<p>由于图标字体本质上还是文字，可以使用 <code>style</code> 和 <code>className</code> 设置图标的大小和颜色。</p>\n<pre><code class=\"language-jsx\"><span class=\"token operator\">&lt;</span>Icon type<span class=\"token operator\">=</span><span class=\"token string\">\"question\"</span> style<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token punctuation\">{</span> fontSize<span class=\"token punctuation\">:</span> <span class=\"token number\">16</span><span class=\"token punctuation\">,</span> color<span class=\"token punctuation\">:</span> <span class=\"token string\">'#08c'</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n</code></pre>\n<!-- @latest-css-url https://at.alicdn.com/t/font_755236_42mhpr0p14p.css -->"}]},{"name":"components","text":"组件说明","docs":[{"group":"components","name":"popover","title":"Popover","source":"# Popover \n\n## 简介\nPopover 是一个「弹出内容组件」，可以停靠在窗口指定的边缘或窗口中间，也可以「跟随」指定元素，还可以指定是否开始「遮罩」。\n\n## 使用\n\n```js\nimport { Popover } from '@ali/aps';\n...\nrender() {\n  return <div>\n    <Popover \n      overlay={true} \n      visible={this.state.visible} \n      dock=\"center\"\n      follow=\"rigth\"\n      autoClose={true} />\n  </div>;\n}\n...\n```\n  \n## 示例\n\n\n# Input\n\n## 简介\n\n输入框组件，通过键盘输入内容\n\n## 使用\n\n```js\nimport React, { Component } from 'react';\nimport { Input, Icon, common } from '@ali/aps';\n\nclass App extends Component {\n  state = { \n    value: ''\n  };\n\n  handleChange = e => {\n    this.setState({ \n      value: e.target.value \n    });\n  }\n\n  render() {\n    return <div>\n      <h3>基本使用</h3>\n      <p>\n        <Input placeholder=\"基本使用\" value={this.state.value} onChange={this.handleChange}/>\n      </p>\n      <p>\n        <Input disabled={true} placeholder=\"不可用\"/>\n      </p>\n      <p>\n        <Input readOnly={true} defaultValue=\"只读\"/>\n      </p>\n      <h3>大小</h3>\n      <p>\n        <Input size=\"small\" placeholder=\"小\"/>\n      </p>\n      <p>\n        <Input size=\"medium\" placeholder=\"默认\"/>\n      </p>\n      <p>\n        <Input size=\"large\" placeholder=\"大\"/>\n      </p>\n      <h3>图标</h3>\n      <p>\n        <Input prefix={<Icon type=\"search\" />} placeholder=\"前缀图标\" />\n      </p>\n      <p>\n        <Input suffix={<Icon type=\"search\" />} placeholder=\"后缀图标\" />\n      </p>\n      <h3>多行模式</h3>\n      <p>\n        <Input placeholder=\"多行模式\" multiple rows={3} />\n      </p>\n    </div>;\n  }\n}\n\ncommon.render(<App />, mountNode);\n```\n\n## API\n\n| 参数 | 说明 | 类型 | 可选值 | 默认值 |\n|-----|-----|------|-------|-------|\n|type|input类型，意义和原生input一样|string|'text', 'number', 'password'|'text'|\n|size|尺寸|string|'small', 'medium', 'large'|'medium'|\n|value|内容|string/number|any|-|\n|defaultValue|默认内容|string/number|any|-|\n|onPressEnter|输入回车时的回调|function(e)|any|-|\n|disabled|是否禁用|boolean|true, false|false|\n|readOnly|是否只读|boolean|true, false|false|\n|prefix|前缀图标|ReactNode|any|-|\n|suffix|后缀图标|ReactNode|any|-|\n|multiple|多行模式|boolean|true, false|false|\n|rows|多行模式可见行数|number|any|-|\n\n## 示例\n\n<iframe x-src=\"https://riddle.alibaba-inc.com/riddles/bb6db52f/iframe\" height=\"360\" frameborder=\"no\" allowtransparency=\"true\" allowfullscreen=\"true\" style=\"width: 100%; border: 1px solid #e9e9e9;\"></iframe>","filename":"./markdown/doc1.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1>Popover</h1>\n<h2>简介</h2>\n<p>Popover 是一个「弹出内容组件」，可以停靠在窗口指定的边缘或窗口中间，也可以「跟随」指定元素，还可以指定是否开始「遮罩」。</p>\n<h2>使用</h2>\n<pre><code class=\"language-js\"><span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Popover <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@ali/aps'</span><span class=\"token punctuation\">;</span>\n<span class=\"token operator\">...</span>\n<span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token operator\">&lt;</span>div<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>Popover \n      overlay<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> \n      visible<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>state<span class=\"token punctuation\">.</span>visible<span class=\"token punctuation\">}</span> \n      dock<span class=\"token operator\">=</span><span class=\"token string\">\"center\"</span>\n      follow<span class=\"token operator\">=</span><span class=\"token string\">\"rigth\"</span>\n      autoClose<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n<span class=\"token operator\">...</span>\n</code></pre>\n<h2>示例</h2>\n<h1>Input</h1>\n<h2>简介</h2>\n<p>输入框组件，通过键盘输入内容</p>\n<h2>使用</h2>\n<pre><code class=\"language-js\"><span class=\"token keyword\">import</span> React<span class=\"token punctuation\">,</span> <span class=\"token punctuation\">{</span> Component <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'react'</span><span class=\"token punctuation\">;</span>\n<span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Input<span class=\"token punctuation\">,</span> Icon<span class=\"token punctuation\">,</span> common <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@ali/aps'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token keyword\">class</span> <span class=\"token class-name\">App</span> <span class=\"token keyword\">extends</span> <span class=\"token class-name\">Component</span> <span class=\"token punctuation\">{</span>\n  state <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span> \n    value<span class=\"token punctuation\">:</span> <span class=\"token string\">''</span>\n  <span class=\"token punctuation\">}</span><span class=\"token punctuation\">;</span>\n\n  <span class=\"token function-variable function\">handleChange</span> <span class=\"token operator\">=</span> e <span class=\"token operator\">=></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">setState</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span> \n      value<span class=\"token punctuation\">:</span> e<span class=\"token punctuation\">.</span>target<span class=\"token punctuation\">.</span>value \n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n  <span class=\"token punctuation\">}</span>\n\n  <span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">return</span> <span class=\"token operator\">&lt;</span>div<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>h3<span class=\"token operator\">></span>基本使用<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>h3<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"基本使用\"</span> value<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>state<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">}</span> onChange<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>handleChange<span class=\"token punctuation\">}</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input disabled<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"不可用\"</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input readOnly<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> defaultValue<span class=\"token operator\">=</span><span class=\"token string\">\"只读\"</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>h3<span class=\"token operator\">></span>大小<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>h3<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input size<span class=\"token operator\">=</span><span class=\"token string\">\"small\"</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"小\"</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input size<span class=\"token operator\">=</span><span class=\"token string\">\"medium\"</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"默认\"</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input size<span class=\"token operator\">=</span><span class=\"token string\">\"large\"</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"大\"</span><span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>h3<span class=\"token operator\">></span>图标<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>h3<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input prefix<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token operator\">&lt;</span>Icon type<span class=\"token operator\">=</span><span class=\"token string\">\"search\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span><span class=\"token punctuation\">}</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"前缀图标\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input suffix<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token operator\">&lt;</span>Icon type<span class=\"token operator\">=</span><span class=\"token string\">\"search\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span><span class=\"token punctuation\">}</span> placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"后缀图标\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>h3<span class=\"token operator\">></span>多行模式<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>h3<span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span>p<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>Input placeholder<span class=\"token operator\">=</span><span class=\"token string\">\"多行模式\"</span> multiple rows<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token number\">3</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n      <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>p<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n  <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span>\n\ncommon<span class=\"token punctuation\">.</span><span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token operator\">&lt;</span>App <span class=\"token operator\">/</span><span class=\"token operator\">></span><span class=\"token punctuation\">,</span> mountNode<span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n</code></pre>\n<h2>API</h2>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>可选值</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>type</td>\n<td>input类型，意义和原生input一样</td>\n<td>string</td>\n<td>'text', 'number', 'password'</td>\n<td>'text'</td>\n</tr>\n<tr>\n<td>size</td>\n<td>尺寸</td>\n<td>string</td>\n<td>'small', 'medium', 'large'</td>\n<td>'medium'</td>\n</tr>\n<tr>\n<td>value</td>\n<td>内容</td>\n<td>string/number</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>defaultValue</td>\n<td>默认内容</td>\n<td>string/number</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>onPressEnter</td>\n<td>输入回车时的回调</td>\n<td>function(e)</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>是否禁用</td>\n<td>boolean</td>\n<td>true, false</td>\n<td>false</td>\n</tr>\n<tr>\n<td>readOnly</td>\n<td>是否只读</td>\n<td>boolean</td>\n<td>true, false</td>\n<td>false</td>\n</tr>\n<tr>\n<td>prefix</td>\n<td>前缀图标</td>\n<td>ReactNode</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>suffix</td>\n<td>后缀图标</td>\n<td>ReactNode</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>multiple</td>\n<td>多行模式</td>\n<td>boolean</td>\n<td>true, false</td>\n<td>false</td>\n</tr>\n<tr>\n<td>rows</td>\n<td>多行模式可见行数</td>\n<td>number</td>\n<td>any</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h2>示例</h2>\n<iframe x-src=\"https://riddle.alibaba-inc.com/riddles/bb6db52f/iframe\" height=\"360\" frameborder=\"no\" allowtransparency=\"true\" allowfullscreen=\"true\" style=\"width: 100%; border: 1px solid #e9e9e9;\"></iframe>"},{"group":"components","name":"overlay","title":"Overlay","source":"# Overlay \n\n## 简介\nOverlay 是一个「遮罩组件」，一般无须直接使用 Overlay 组件，多数情况被其它组件引用，比如 Popover 等\n\n## 使用\n\n通过静态方法调用\n```js\nimport { Overlay } from '@ali/aps';\n\n//显示 overlay\nlet hide = Overlay.show();\nhide(); //返值是一个函数直接调用隐藏\n\n//或者这样\nlet ref = Overlay.show();\nOverlay.hide(ref)\n\n//允许点击遮罩时自动关闭\nOverlay.show({ autoClose: true }); \n\n```\n\n通过组件使用\n```js\nimport { Overlay } from '@ali/aps';\n...\nrender() {\n  return <div>\n    <Overlay visible={this.state.visible} autoClose={true} />\n  </div>;\n}\n...\n```\n\n## 示例","filename":"./markdown/doc2.md","root":"/Users/Houfeng/my/dev/doczilla","result":"<h1>Overlay</h1>\n<h2>简介</h2>\n<p>Overlay 是一个「遮罩组件」，一般无须直接使用 Overlay 组件，多数情况被其它组件引用，比如 Popover 等</p>\n<h2>使用</h2>\n<p>通过静态方法调用</p>\n<pre><code class=\"language-js\"><span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Overlay <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@ali/aps'</span><span class=\"token punctuation\">;</span>\n\n<span class=\"token comment\">//显示 overlay</span>\n<span class=\"token keyword\">let</span> hide <span class=\"token operator\">=</span> Overlay<span class=\"token punctuation\">.</span><span class=\"token function\">show</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\n<span class=\"token function\">hide</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> <span class=\"token comment\">//返值是一个函数直接调用隐藏</span>\n\n<span class=\"token comment\">//或者这样</span>\n<span class=\"token keyword\">let</span> ref <span class=\"token operator\">=</span> Overlay<span class=\"token punctuation\">.</span><span class=\"token function\">show</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span>\nOverlay<span class=\"token punctuation\">.</span><span class=\"token function\">hide</span><span class=\"token punctuation\">(</span>ref<span class=\"token punctuation\">)</span>\n\n<span class=\"token comment\">//允许点击遮罩时自动关闭</span>\nOverlay<span class=\"token punctuation\">.</span><span class=\"token function\">show</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">{</span> autoClose<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span> <span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">;</span> \n\n</code></pre>\n<p>通过组件使用</p>\n<pre><code class=\"language-js\"><span class=\"token keyword\">import</span> <span class=\"token punctuation\">{</span> Overlay <span class=\"token punctuation\">}</span> <span class=\"token keyword\">from</span> <span class=\"token string\">'@ali/aps'</span><span class=\"token punctuation\">;</span>\n<span class=\"token operator\">...</span>\n<span class=\"token function\">render</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n  <span class=\"token keyword\">return</span> <span class=\"token operator\">&lt;</span>div<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>Overlay visible<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>state<span class=\"token punctuation\">.</span>visible<span class=\"token punctuation\">}</span> autoClose<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n  <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n<span class=\"token operator\">...</span>\n</code></pre>\n<h2>示例</h2>\n"}]}]}],"plugins":[{"name":"doczilla-place","options":{}},{"name":"doczilla-include","options":{}},{"name":"doczilla-container","options":{}},{"name":"doczilla-highlight","options":{}},{"name":"doczilla-details","options":{}},{"name":"doczilla-card","options":{}}]};
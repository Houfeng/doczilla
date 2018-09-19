---
group: guide
name: doc4
title: 文档 4
index: 0
---

# Icon

语义化的矢量图形。

# 如何使用

使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```js
<Icon type="refresh" />
```

# 图标列表

使用方式：

- 在下方找到需要使用的图标，例如 `xiajiantou`
- 则直接使用 `xiajiantou` 作为`type`

## API

由于图标字体本质上还是文字，可以使用 `style` 和 `className` 设置图标的大小和颜色。

```jsx
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

<!-- @latest-css-url https://at.alicdn.com/t/font_755236_42mhpr0p14p.css -->
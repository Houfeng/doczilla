---
group: guide
name: doc3
title: 文档三
index: 0
---

# 文档三

你好中国，你好中国

```js
import { Popover } from '@ali/aps';
...
render() {
  return <div>
    <Popover 
      overlay={true} 
      visible={this.state.visible} 
      dock="center"
      follow="rigth"
      autoClose={true} />
  </div>;
}
...
```

::: details
```js
import { Popover } from '@ali/aps';
...
render() {
  return <div>
    <Popover 
      overlay={true} 
      visible={this.state.visible} 
      dock="center"
      follow="rigth"
      autoClose={true} />
  </div>;
}
...
```
:::

::: details 展开示例 收起示例
```js
console.log('你好中国');
```
:::

:: include ./test.md
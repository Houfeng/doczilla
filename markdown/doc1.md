---
group: components
name: popover
title: Popover
---

# Popover 

## 简介
Popover 是一个「弹出内容组件」，可以停靠在窗口指定的边缘或窗口中间，也可以「跟随」指定元素，还可以指定是否开始「遮罩」。

## 使用

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
  
## 示例

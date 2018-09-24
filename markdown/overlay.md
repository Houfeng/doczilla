---
group: components
name: overlay
title: Overlay
---

# Overlay 

## 简介
Overlay 是一个「遮罩组件」，一般无须直接使用 Overlay 组件，多数情况被其它组件引用，比如 Popover 等

## 使用

通过静态方法调用
```js
import { Overlay } from '@ali/aps';

//显示 overlay
let hide = Overlay.show();
hide(); //返值是一个函数直接调用隐藏

//或者这样
let ref = Overlay.show();
Overlay.hide(ref)

//允许点击遮罩时自动关闭
Overlay.show({ autoClose: true }); 

```

通过组件使用
```js
import { Overlay } from '@ali/aps';
...
render() {
  return <div>
    <Overlay visible={this.state.visible} autoClose={true} />
  </div>;
}
...
```

## 示例

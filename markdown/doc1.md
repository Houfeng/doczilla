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


# Input

## 简介

输入框组件，通过键盘输入内容

## 使用

```js
import React, { Component } from 'react';
import { Input, Icon, common } from '@ali/aps';

class App extends Component {
  state = { 
    value: ''
  };

  handleChange = e => {
    this.setState({ 
      value: e.target.value 
    });
  }

  render() {
    return <div>
      <h3>基本使用</h3>
      <p>
        <Input placeholder="基本使用" value={this.state.value} onChange={this.handleChange}/>
      </p>
      <p>
        <Input disabled={true} placeholder="不可用"/>
      </p>
      <p>
        <Input readOnly={true} defaultValue="只读"/>
      </p>
      <h3>大小</h3>
      <p>
        <Input size="small" placeholder="小"/>
      </p>
      <p>
        <Input size="medium" placeholder="默认"/>
      </p>
      <p>
        <Input size="large" placeholder="大"/>
      </p>
      <h3>图标</h3>
      <p>
        <Input prefix={<Icon type="search" />} placeholder="前缀图标" />
      </p>
      <p>
        <Input suffix={<Icon type="search" />} placeholder="后缀图标" />
      </p>
      <h3>多行模式</h3>
      <p>
        <Input placeholder="多行模式" multiple rows={3} />
      </p>
    </div>;
  }
}

common.render(<App />, mountNode);
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|-----|------|-------|-------|
|type|input类型，意义和原生input一样|string|'text', 'number', 'password'|'text'|
|size|尺寸|string|'small', 'medium', 'large'|'medium'|
|value|内容|string/number|any|-|
|defaultValue|默认内容|string/number|any|-|
|onPressEnter|输入回车时的回调|function(e)|any|-|
|disabled|是否禁用|boolean|true, false|false|
|readOnly|是否只读|boolean|true, false|false|
|prefix|前缀图标|ReactNode|any|-|
|suffix|后缀图标|ReactNode|any|-|
|multiple|多行模式|boolean|true, false|false|
|rows|多行模式可见行数|number|any|-|

## 示例

<iframe x-src="https://riddle.alibaba-inc.com/riddles/bb6db52f/iframe" height="360" frameborder="no" allowtransparency="true" allowfullscreen="true" style="width: 100%; border: 1px solid #e9e9e9;"></iframe>
# Date对象

#### 1、初始化Date对象的四种方法

**①、new Date()**

new Date()是获取到的本地（计算机）的时间，不是北京时间; GMT 世界时间 格林尼治。

```js
 var data = new Date();
 console.log(data);//Thu Jul 22 2021 21:46:01 GMT+0800 (中国标准时间)
```

②、new Date(milliseconds)


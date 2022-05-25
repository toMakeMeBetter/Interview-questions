# let和const和var的区别

#### 1、变量提升

###### ①、let声明的变量不存在变量提升,一定要在声明后使用不然报错

```js
console.log(bar);//报错
let bar=2;
```

###### ②、var有变量提升，变量可以在声明前使用值为undefined

```js
console.log(foo);//undefined
var foo=2;
```

#### 2、暂存性死区，块级作用域

​		在块级作用域内使用let命令，它所声明的变量就“绑定”在这个区域，不受外部影响，凡是在声明之前使用这些变量就会报错，这个就成为“暂存性死区”。

​		在区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成封闭作用域

```js
var temp=123;
if(true){
	temp="abc";//报错
	let temp;
}
```

```js
隐秘的死区
function bar(x=y,y=2){//报错
	return [x,y];
}
bar();
var x=x;//不报错
let y=y;//报错
```

#### 3、不允许重复声明

​		let不允许在同一个作用域重复声明同一个变量，会报错。

```js
let a=1;
let a=2;//报错
var a=1;
var a=2;
console.log(a)//2
```

#### 4、const（不变量提升，暂存性死区，块级作用域，不重复声明）

​		声明一个变量一旦声明就不能改变，改变报错

```js
const PI=3.14
PI=3//报错
```

​		意味着const一旦声明变量，就立即初始化，不能留到后面赋值，只声明不赋值会报错

```js
const foo;//报错
```

**本质：**const保证的是变量的内存地址不得改动

​	  对于基本类型的数据，值就保存在变量指向的那个内存地址，因此等同于常量

​	 对于引用类型的数据，变量保存的内存地址，保存的只是一个指针，只要保证指针是固定不变的，它指向的数据结构是不是不可变的就完全不受控制了。

**将一个对象声明为变量要特别小心**

```js
const foo={};
foo.prop=123;
console.log(foo.prop);//123
```

如果要想将对象冻结可以使用`Object.freeze()`方法

```js
const foo=Object.freeze({});
foo.prop=123;
console.log(foo.prop);//混杂模式undefined,不起作用
```

#### 5、js中顶层对象的属性和全局对象挂钩，在es6中全局对象将逐步与顶层对象的属性脱钩

```js
var a=1;
console.log(window.a);//1
let b=1;
console.log(window.b);//undefined
const c=1;
console.log(window.c)///undefined
```


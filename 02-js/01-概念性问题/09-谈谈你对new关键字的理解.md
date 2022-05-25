#  js在new（）过程中到底做了什么？ 

​	要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4个步骤：

1. 创造一个全新的对象
2. 这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象
3. 这个新对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

 **new 操作符**
	在有上面的基础概念的介绍之后，在加上new操作符，我们就能完成传统面向对象的class + new的方式创建对象，在JavaScript中，我们将这类方式成为Pseudoclassical。
	基于上面的例子，我们执行如下代码 

```
var obj = new Base();
```

 new操作符具体干了什么呢?其实很简单，就干了三件事情。 

```js
var obj  = {};
```

```js
obj.proto = Base.prototype;
```

```js
Base.call(obj);
```

第一行，我们创建了一个空对象obj
第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，关于call函数的用法。

 	如果我们给Base.prototype的对象添加一些函数会有什么效果呢？
例如代码如下： 

```js
Base.prototype.toString = function() {
   return this.id;
}
```

​	那么当我们使用new创建一个新对象的时候，根据__proto__的特性，toString这个方法也可以做新对象的方法被访问到。于是我们看到了：
构造子中，我们来设置‘类’的成员变量（例如：例子中的id），构造子对象prototype中我们来设置‘类’的公共方法。于是通过函数对象和Javascript特有的__proto__与prototype成员及new操作符，模拟出类和类实例化的效果。

```js
// ES5构造函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
const child = new Parent('测试', 25);
child.sayName() //'测试'


//ES6 class类
class Parent {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(this.name);
    }
};
const child = new Parent('echo', 25);
child.sayName() //echo
```

## new 一个构造函数，如果函数返回 `return {}` 、 `return null` ， `return 1` ， `return true` 会发生什么情况？

 	如果函数返回一个对象，那么new 这个函数调用返回这个函数的返回对象，否则返回 new 创建的新对象 


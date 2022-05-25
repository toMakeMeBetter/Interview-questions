# less,sass,styus三者的区别

**变量**

Sass声明变量必须是『$』开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号：分隔开。

Less 声明变量用『@』开头，其余等同 Sass。

Stylus 中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。

**作用域**

Sass：三者最差，不存在全局变量的概念

Less：最近的一次更新的变量有效，并且会作用于全部的引用！

Stylus：Sass 的处理方式和 Stylus 相同，变量值输出时根据之前最近的一次定义计算，每次引用最近的定义有效；

**嵌套**

三种 css 预编译器的「选择器嵌套」在使用上来说没有任何区别，甚至连引用父级选择器的标记 & 也相同

**继承**

Sass和Stylus的继承非常像，能把一个选择器的所有样式继承到另一个选择器上。使用『@extend』开始，后面接被继承的选择器。Stylus 的继承方式来自 Sass，两者如出一辙。 Less 则又「独树一帜」地用伪类来描述继承关系；

**导入@Import**

Sass 中只能在使用 url() 表达式引入时进行变量插值

```
$device: mobile;
@import url(styles.#{$device}.css);
复制代码
```

Less 中可以在字符串中进行插值

```
@device: mobile;
@import "styles.@{device}.css";
复制代码
```

Stylus 中在这里插值不管用，但是可以利用其字符串拼接的功能实现

```
device = "mobile"
@import "styles." + device + ".css"
复制代码
```

**总结**

Sass和Less语法严谨、Stylus相对自由。因为Less长得更像 css，所以它可能学习起来更容易。

Sass 和 Compass、Stylus 和 Nib 都是好基友。

Sass 和 Stylus 都具有类语言的逻辑方式处理：条件、循环等，而 Less 需要通过When等关键词模拟这些功能，这方面 Less 比不上 Sass 和 Stylus。
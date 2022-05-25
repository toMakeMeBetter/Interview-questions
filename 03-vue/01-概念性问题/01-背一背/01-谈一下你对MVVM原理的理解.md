#### 谈一下你对MVVM原理的理解

MVVM是Model-View-ViewModel 的缩写，由 Model,View,ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来。ViewModel 是一个同步View 和 Model的对象，它是一种基于前端开发的架构模式，其核心是提供对View和ViewModel 的双向数据绑定，这使得ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。

Vue.js 是一个提供了 MVVM 风格的双向数据绑定的 Javascript 库，专注于View 层。它的核心是 MVVM 中的 VM，也就是 ViewModel。 ViewModel负责连接 View 和 Model，保证视图和数据的一致性，这种轻量级的架构让前端开发更加高效、便捷。

**（1）View 层**

View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

**（2）Model 层**

Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

**（3）ViewModel 层**

ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。需要注意的是 ViewModel 所封装出来的数据模型包括视图的状态和行为两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。

**（1）View 层**

```
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
复制代码
```

**（2）ViewModel 层**

```
var app = new Vue({
    el: '#app',
    data: {  // 用于描述视图状态   
        message: 'Hello Vue!', 
    },
    methods: {  // 用于描述视图行为  
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;
        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                vm.message = res;
            }
        });
    }
})
复制代码
```

**（3） Model 层**

```
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
```

![在这里插入图片描述](https://gitee.com/front-end-learning-666/image/raw/master/vue-study/01/01/01/image4.png)

​	**首先解释：MVVM是什么？干什么用的？**

```
1：MVVM 是Model-View-ViewModel 的缩写，它是一种基于前端开发的架构模式。

2：其核心是提供对View 和 ViewModel 的双向数据绑定，这使得ViewModel 的状态改变可以自动传递给 View，即所谓的数据双向绑定。

3：以Vue.js 为例。Vue是一个提供了 MVVM 风格的双向数据绑定的 Javascript 库，专注于View 层。

4：它的核心是 MVVM 中的 VM，也就是 ViewModel。 ViewModel负责连接 View 和 Model，保证视图和数据的一致性，这种轻量级的架构让前端开发
更加高效、便捷。

```

**继续引出：为什么会出现MVVM? 框架的发展？ MVC----MVP----MVVM**

最初的MVC–Model-View-Controller

```
1:最初是MVC:MVC是一种架构模式，M表示Model，V表示视图View，C表示控制器Controller
		    就是 模型—视图—控制器，也就是说一个标准的Web 应用程式是由这三部分组成的
		    
2:在HTML5 还未火起来的那些年，MVC 作为Web 应用的最佳实践是OK 的.

3:这是因为 Web 应用的View 层相对来说比较简单，前端所需要的数据在后端基本上都可以处理好

4:View 层主要是做一下展示，那时候提倡的是 Controller 来处理复杂的业务逻辑，所以View 层相对来说比较轻量，就是所谓的瘦客户端思想。

```

​	model(模型)：数据保存

​	view(视图)：用户界面

​	controller：业务逻辑

这里面mvc的通信是单向的。

**为什么会出现MVVM?**

```
1、 开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护。

2、大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。

3、 当 Model 频繁发生变化，开发者需要主动更新到View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model 中，这样
的工作不仅繁琐，而且很难维护复杂多变的数据状态。

```

MVVM的出现完美的解决了上面的几个问题：

```
1：VVM 由 Model、View、ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负
责将数据模型转化成UI 展现出来，ViewModel 是一个同步View 和 Model的对象。

2：在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数
据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
3：ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发
者只需关注业务逻辑，不需要手动操作DOM， 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

```


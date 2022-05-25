# 1、Vue的生命周期

​		什么是Vue的生命周期：每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

**1、beforeCreate(创建前)**

​		表示实例完全被创建之前会执行的函数，data和methods的数据并没有初始化。

**2、created(创建后)**

​		data和methods已经初始化好了，如果要调用data中的属性或methods中的方法，可以在created中调用。但是不能获取到dom元素，因为此时的元素并没有挂载上去。

**3、beforeMount(载入前)**

​		在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时模板已经在内存中编译好了，但是还没有挂载到页面中去，此时的页面还是旧的，因此此时还是无法获取到dom元素的。

**4、mounted（载入后）**

​		组件已经脱离了创建阶段，进入到了运行阶段，如果需要操作DOM节点，最早要在mounted中进行。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。

**5、beforeUpdate（更新前）**

​		在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。

**6、updated（更新后）**

​		数据和页面已经保持了同步，都是最新的内容。由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

**7、beforeDestroy（销毁前）**

​		在实例销毁之前调用。实例仍然完全可用。

**8、destroyed（销毁后）**

​		组件已经完全被销毁，此时所有的数据和方法、指令等等，都不可以用了。



# 2、Vue父子组件的渲染顺序

#### 加载渲染过程

父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

#### 子组件更新过程

父beforeUpdate->子beforeUpdate->子updated->父updated

#### 父组件更新过程

父beforeUpdate->父updated

#### 销毁过程

父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

# 3、其他生命周期函数

除了上面的八大生命周期函数之外，我们还有在使用keep-alive内置组件时使用到的三个生命周期函数，分别为：

**activated**、**deactivated**、**errorCaptured**这三个生命周期函数是在使用了keep-alive组件后，重新激活该组件就会触发**activated**中的内容，当我们离开该组件就会触发**deactivated**中的内容，当子组件使用发生错误时，就会执行**errorCaptured**中的内容。

## 4、在哪个生命周期内调用异步请求？

​	可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 5、在什么阶段才能访问操作DOM？

​	在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。vue 具体的生命周期示意图可以参见如下，理解了整个生命周期各个阶段的操作，关于生命周期相关的面试题就难不倒你了。

## 6、父组件可以监听到子组件的生命周期吗？

​	比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```vue
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
复制代码
```

​	以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```vue
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
复制代码
```

​	当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。


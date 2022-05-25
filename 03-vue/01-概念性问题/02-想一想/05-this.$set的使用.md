# this.$set介绍

## 1、为什么要用set？

​	 在使用` vue`进行开发的过程中，可能会遇到一种情况：当生成`vue`实例后，再次给数据赋值时，有时候并不会自动更新到视图上去。也就是 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。

​	在`vue`中，并不是任何时候数据都是双向绑定的。通过阅读官方文档，我们知道由于JavaScript的限制，`Vue`不能检测数组的变动。

**原因：** 

​	受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以 属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。

**因此：** 

​	`Vue` 不能检测以下变动的数组： 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue` 当你修改数组的长度时，例如：`vm.items.length = newLength` 

**eg：** 

​	使用`this.arr[0]`去更新 array 的内容，视图没有刷新 使用 `Vue.set(this.arr, 0, !this.arr[0])` 去更新 array 的内容，视图被刷新 使用 `this.arr[0] = !this.arr[0]` 和 `this.obj.a = !this.obj.a `同时更新，视图被刷新

**结论：**

​	 如果方法里面单纯的更新数组 Array 的话，要使用 `Vue.set()`； 如果方法里面同时有数组和对象的更新，直接操作 data 即可;

## 2、set的用法

 解决数据没有被双向绑定我们可以使用 `vm.$set` 实例方法，该方法是全局方法 `Vue.set` 的一个别名。

**语法规则：**

 `Vue.set( target, propertyName/index, value )` 

**参数：**

 `{Object | Array} target` `{string | number} propertyName/index` `{any} value` 

**返回值：**

 设置的值。 

**用法：** 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。 它必须用于向响应式对象上添加新 property，因为 `Vue` 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`) **注意：** 对象不能是 `Vue `实例，或者 `Vue` 实例的根数据对象。

## 3、题目

### 3.1、直接给一个数组项赋值，Vue 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
复制代码
```

为了解决第二个问题，Vue 提供了以下操作方法：

```
// Array.prototype.splice
vm.items.splice(newLength)
```

​	也就是说我们要是直接赋值修改data数组中的某一个值时，vue检测不到，我们就可以使用this.$set，还有一种方法就是我们操作数据的时候不直接赋值，可以使用splice修改该数组。
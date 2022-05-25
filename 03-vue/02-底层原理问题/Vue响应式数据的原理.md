#### 请说一下响应式数据的原理

​		①、核心点：object.defineProperty

​		②、默认Vue在初始化数据时，会给data中的属性使用object.definedProperty重新定义所有的属性，当页面读取到对应的属性时，会进行依赖收集（收集当前组件的watcher）如果属性发生变化会通知相关依赖进行更新操作。

​		原理：
​				initData【初始化用户传入的data数据】 -----》new Observer【将数据进行观测】------》this.walk(value)【进行对象的处理】------》defineReactive【循环对象属性定义响应式变化】------》Object.definedProperty【重新定义数据】

```js
function initData (vm) { //初始化data
    var data = vm.$options.data; //用户传入的数据
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) { 
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) { 
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */); //观测对象类型
  }
```



```js
/**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) { //观测数据
    if (!isObject(value) || value instanceof VNode) { //不是对象不进行观测
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) { //判断数据是否被观测过了
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&  //是否可扩展
      !value._isVue
    ) {
      ob = new Observer(value);  //观测对象类型
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }
```





```js
var Observer = function Observer (value) { 
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {  //是数组
      if (hasProto) {
        protoAugment(value, arrayMethods); //改写数组原型方法
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);  //深度观察数组中的每一项
    } else {
      this.walk(value);  //重新定义对象数据类型
    }
  };
```



```js
  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);  //定义响应式
    }
  };
```



```js
 /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 ( ////定义响应式
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val); //递归观测
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {  //数据的取值
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();  //收集依赖watcher
          if (childOb) {
            childOb.dep.depend();  //收集依赖
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) { //数据的设置值
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();  //触发数据对应的依赖进行更新
      }
    });
  }
```


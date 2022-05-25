#### Vue进行class和style绑定

​		操作元素的class列表和内联样式是数据绑定的一个常见需求，因为它们都是属性，所以我们可以用v-bind处理它们：只需要通过表达式计算出字符串的结果即可。不过，字符串的拼接麻烦且易错。因此，在使用v-bind用于绑定class和style时，Vue.js做了专门的增强。**表达式结果的类型除了字符串外，还可以是对象或数组。**

**Class 可以通过对象语法和数组语法进行动态绑定：**

- **对象语法：**

```vue
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

data: {
  isActive: true,
  hasError: false
}
```

- **数组语法：**

```vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

**Style 也可以通过对象语法和数组语法进行动态绑定：**

- **对象语法：**

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```

- **数组语法：**

```vue
<div v-bind:style="[styleColor, styleSize]"></div>

data: {
  styleColor: {
     color: 'red'
   },
  styleSize:{
     fontSize:'23px'
  }
}
```

**自我学习举例：**

```html
<div id="app">
       <ul>
           <!-- class绑定方法 -->
           <li v-for="(item,index) in courses"
                :class="{active:(selectedCourse === c)}"
                @click="selectedCourse = c">{{c}}
            </li>
            <!-- style绑定 -->
            <li v-for="(item,index) in courses" :key="index"
                :style="{backgroundColor:(selectedCourse === c)?'#ddd','transparent'}"
                @click="selectedCourse = c">{{c}}
            </li>
       </ul>
    </div>
```

```vue
<div id="app">
        <input type="text" v-model="msg"><button @click="fn">新增</button>
        <p v-for="(item,index) in lover" :style="{backgroundColor:'red'}">{{item}}</p>
    </div>
    <script>
        const app = new Vue({
            el:"#app",
            data:{
                msg:'',
                lover:[],
            },
            methods:{
                fn(){
                    this.lover.push(this.msg);
                    this.msg = '';
                    console.log(this.lover)
                }
            }
        })
    </script>
```


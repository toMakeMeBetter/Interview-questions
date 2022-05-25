<template>
  <div class="about">
    <input type="text" v-model="value" @input="changeValue"><button @click="search">点击搜索</button>
    <div class="nameList" v-for="(item,index) in list" :key="index">{{item.name}}</div>
  </div>
</template>
<script>
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
import axios from 'axios';
export default {
  data(){
    return{
      value:'',
      list:[]
    }
  },
  methods:{
    changeValue(){
     delay(() => {
        this.getValue()
      }, 2000)
    },
    getValue(){
       axios.post('http://127.0.0.1:3800/getData',{name:this.value})
      .then((res) =>{
          console.log(res.data.List)
          this.list = res.data.List
      })
    },
    debounce(fn, delay) {
      debugger
        var delay = delay || 200;
        var timer;
        return function () {
            var th = this;
            var args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                timer = null;
                fn.apply(th, args);
            }, delay);
        };
    },
    search(){
       axios.post('http://127.0.0.1:3800/getData',{name:this.value})
      .then((res) =>{
          console.log(res.data.List)
          this.list = res.data.List
      })
    }
  }
}
</script>
<style scoped>
 .nameList{
   background-color: #ccc;
   width: 200px;
   height: 100%;
   margin: 10px auto;
 }
</style>

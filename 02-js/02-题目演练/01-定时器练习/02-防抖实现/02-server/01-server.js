const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")
var dataName = JSON.parse(fs.readFileSync(path.join(__dirname, "./02-name.json"),(error,data) =>{
    console.log(error)//null
    if(!error){
        console.log(JSON.parse(data))
    }
}));

// 获取post过来的数据 /
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
 
// 允许跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("X-Powered-By",' 3.2.1')
  next();
});
app.post("/getData",(req,res) =>{
  var data = ''
  var param = null
  req.on('data',function(chunk){
    data += chunk
  })
  req.on('end',function(){
    param = JSON.parse(data)
    let nameList = []
    dataName.nameList.map(res =>{
      if(res.name.indexOf(param.name) !== -1){
        nameList.push(res)
      }
    })
    console.log(nameList)
    setTimeout(() =>{
      res.send({List:nameList})
    },2000)
  })
})
app.listen(3800,()=>{
    console.log("服务已启动,3800 端口监听");
})
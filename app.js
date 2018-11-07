/*
* @Author: name
* @Date:   2018-09-25 10:42:59
* @Last Modified by:   name
* @Last Modified time: 2018-09-28 20:48:08
*/
const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParse = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const mysql = require('mysql');
const upload = multer({dest:"./www/upload"});


const app = express();
app.listen(8848);
//解析请求数据post
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload.any());

//解析cookie、session
app.use(cookieParse());
(function(){
  var keys = [];
  for(var i=0;i<10000;i++){
    keys.push("zhenghang_" + Math.random());
  }
  app.use(cookieSession({
    name:"admin_id",
    keys:keys,
    maxAge:30*60*1000
  }))
})();


//设置模板
app.engine("html",consolidate.ejs);//用哪个模板引擎
app.set("views","./template");//模板在哪个文件夹里面
app.set("view engine","html");//输出文件的格式

//设置路由
// app.use("/",前台);
app.use("/admin",require("./router/admin/index")());

//静态页面
app.use(static("./www/"))

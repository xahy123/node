/*
* @Author: name
* @Date:   2018-09-25 15:44:01
* @Last Modified by:   name
* @Last Modified time: 2018-09-26 21:15:15
*/
const express = require("express");
const mysql = require("mysql");
// const common = require("../../libs/common");

var db = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"root",
    database:"zhenghang"
  }
)
module.exports = function(){
  var router = express.Router();
  // 通过地址栏来请求页面
  router.get("/",(req,res) => {
    res.render("admin/login.ejs",{})
  })
  // 通过表单来请求psot数据
  router.post("/",(req,res) => {
    var username = req.body.username;
    var password = req.body.password;//common.md5(req.body.password)
    db.query(`SELECT * FROM admin_user WHERE username = '${username}'`,(err,data) => {
      if(err){
        res.send("can't connection database").end();
      }else{
        if(data.length == 0){
          res.send("没有此用户").end();
        }else{
          if(data[0].password == password){
            //成功
            // 写入session
            req.session["admin_id"] = data[0].id;
            //跳转到管理员首页
            res.redirect("/admin/");
          }else{
            //密码不相等
            res.send("密码错误").end();
          }
        }
      }
    })
  })
  return router;
}
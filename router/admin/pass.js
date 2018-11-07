/*
* @Author: name
* @Date:   2018-09-26 15:12:35
* @Last Modified by:   name
* @Last Modified time: 2018-09-27 09:30:45
*/

const express = require("express");
const mysql = require("mysql");

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
    res.render("admin/pass.ejs",{})
  })
  //提交数据
  router.post("/",(req,res) => {
    db.query(`select * from admin_user WHERE id = 1`,(err,data) =>{
      if(err){
        res.send("can't connection database").end();
      }else{
        var old = data[0].password;
        if(old != req.body.mpass){
          res.send("原始密码错误");
        }else{
          if(req.body.newpass != req.body.renewpass){
            res.send("can't connection database").end();
          }else{
             // res.redirect("/admin/pass");//重新定向到当前页面
            db.query(`UPDATE admin_user SET password = "${req.body.newpass}"where id = 1`,(err,data) => {
              if(err){
                res.send("can't connection database").end();
              }else{
                res.redirect("/admin/pass");//重新定向到当前页面
              }
            })
          }
        }
      }
    })
  })
  return router;
}
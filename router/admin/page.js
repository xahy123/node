/*
* @Author: name
* @Date:   2018-09-26 20:17:20
* @Last Modified by:   name
* @Last Modified time: 2018-09-27 10:57:50
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
    res.render("admin/page.ejs",{})
  })
  //post请求数据
  router.post("/",(req,res) => {
    db.query(`UPDATE PAGE SET title = "${req.body.title}",content = "${req.body.content}"where title = '${req.body.title}'`,(err,data) => {
        if(err){
           res.send("can't connection database").end();
       }else{
          res.redirect("/admin/page");//重新定向到当前页面
       }
    })

  })
  return router;
}
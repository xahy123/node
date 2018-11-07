/*
* @Author: name
* @Date:   2018-09-25 20:08:56
* @Last Modified by:   name
* @Last Modified time: 2018-09-28 21:09:03
*/

const express = require("express");
const mysql = require("mysql");
const common = require("../../libs/common");

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
    db.query(`select * from banner`,(err,data) => {
       if(err){
        res.send("can't connection database").end();
      }else{
        res.render("admin/banner.ejs",{data:data});//第二个data是获取的数据，数据库中的，第一个是固定格式的
      }
    })
  })
  //请求数据，也就是往数据库中添加数据
  router.post("/",(req,res) => {
    db.query(`insert into banner (img_src,name,description,sort) values ("../images/y.jpg","四","图四","4")`,(err,data) => {
      if(err){
        res.send("can't connection database").end();
      }else{
        res.redirect("/admin/banner");//重新定向到当前页面
      }
    })
  })
  return router;
}
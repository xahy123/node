/*
* @Author: name
* @Date:   2018-09-26 11:34:58
* @Last Modified by:   name
* @Last Modified time: 2018-09-26 15:01:45
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
  //请求数据
  router.get("/",(req,res) => {
    db.query("SELECT * FROM SYSTEM WHERE ID = 1",(err,data) => {
      if(err){
        res.send("can't connection database").end();
      }else{
        res.render("admin/info.ejs",{data:data});//第二个data是获取的数据，数据库中的，第一个是固定格式的
      }
    })
  })
  //提交数据,页面提交的数据会改变数据库
  router.post("/",(req,res) => {
    db.query(`UPDATE SYSTEM SET title = "${req.body.title}",keywords = "${req.body.keywords}",description = "${req.body.description}",address = "${req.body.address}",email = "${req.body.email}",tel = "${req.body.tel}",fax = "${req.body.fax}",footer = "${req.body.footer}"WHERE id = 1`,(err,data) =>{
       if(err){
        res.send("can't connection database").end();
      }else{
        res.redirect("/admin/system");//重新定向到当前页面
      }
    })
  })

  return router;
}
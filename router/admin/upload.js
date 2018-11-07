/*
* @Author: name
* @Date:   2018-09-28 19:54:51
* @Last Modified by:   name
* @Last Modified time: 2018-09-28 21:29:34
*/
const express = require("express");
const fs = require("fs");
const pathLib = require("path");

module.exports = function(){
  var router = express.Router();
  router.use("/",(req,res) => {
    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;//重命名，返回的是没有后缀的，我们要把后缀加上去
    fs.rename(req.files[0].path,newName,(err) => {
      if(err){
        res.send({"ok":false,"msg":"上传失败"}).end();
      }else{ //上传成功之后，还要获取图片的路径，以便添加到数据库，所以要加"fileUrl":newName
        res.send({"ok":true,"msg":"上传成功","fileUrl":newName}).end();
      }
    })
  });
  return router;
}

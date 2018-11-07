const express = require('express');

module.exports = function(){
  var router = express.Router();

  //检查登录状态
  router.use((req,res,next) => {
    //判断用户是否登录过，session,如果没有登录，就重定向到login页面
    if(!req.session['admin_id'] && req.url != '/login'){
      res.redirect('/admin/login');
    }else{
      next();
    }
    // console.log(req.session['admin_id'])
  })
  //请求后台首页
  router.get("/",(req,res) => {
    res.render("admin/index.ejs",{})
  })

  //请求登录
  router.use("/login",require('./login')());
  // router.use("/info",require('./info')());
  //请求修改banner
  router.use("/banner",require('./banner')());
  //后台图片上传接口
  router.use("/upload",require('./upload')());
  //修改单页
  router.use("/page",require('./page')());
  //修改密码
  router.use("/pass",require('./pass')());
  // 修改企业新闻
  // 修改行业新闻
  // 系统设置
  router.use("/system",require('./system')());

  return router;
}

const crypto = require('crypto');

//设置加密方式
var hash = crypto.createHash("md5");
//设置加密算法

hash.update("admin");

var str = hash.digest("hex");//输出方式为16进制

console.log("str")





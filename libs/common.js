const crypto = require('crypto');

module.exports = {
  md5:function(str){
    var hash = crypto.createHash("md5").update(str);
    return hash.digest("hex");
  }
}




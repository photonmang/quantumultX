/*
作业帮 解锁付费音频
制作时间：2021/4/6
制作者：photonmang

1.仅解锁付费音频部分，其他部分未进行解锁处理。后续看个人使用情况解锁更多VIP功能
2021/9/4 修复接口变更导致的失效问题
https://apivip.zuoyebang.com/vipols/album/albumdetail?.+ url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/zuoyebang.js
MITM = apivip.zuoyebang.com
*/


re('"freeTrail":"0"@"status":\\d@"stopTime":""@','"freeTrail":"1"@"status":1@"stopTime":"9999999999"@')

function re() {
 var body = $response.body;
 if (arguments[0].includes("@")) {
  var regs = arguments[0].split("@");
  var strs = arguments[1].split("@");
  for (i = 0;i < regs.length;i++) {
   var reg = new RegExp(regs[i],"g");
   body = body.replace(reg, strs[i]);
 }
}
 else {
  var reg = new RegExp(arguments[0],"g");
  body = body.replace(reg, arguments[1]);
}
 $done(body);
} 

/*
作业帮 解锁付费音频
制作时间：2021/4/6
制作者：photonmang

1.本仅解锁付费音频部分，其他部分未进行解锁处理。后续看个人使用情况解锁更多VIP功能

https://mall.zuoyebang.com/mall/goods/audio/voice/list?audioId=\d+ url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/zuoyebang.js
MITM = mall.zuoyebang.com
*/


re('"freeTrail":\\d+','"freeTrail":1')

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

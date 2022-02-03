/*

https://*.lzjoy.com/.+ url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/ccgq.js
MITM = cc.lzjoy.com,gangqinpu.lzjoy.com

*/


re('"is_vip":"0"@"is_expire":\\d@"enable_buy_vip":"1"@','"is_vip":"1"@"is_expire":9999999999@"enable_buy_vip":"0"@')

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

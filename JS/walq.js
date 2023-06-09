/*
我奥篮球 解锁付费直播回放及回放下载
制作时间：2021/05/02
制作者：photonmang
https://gatewayapi.woaolanqiu.cn url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/walq.js
hostname=gatewayapi.woaolanqiu.cn
*/

re('"woaoVip":false@"hasNotExpiredLeagueVip":false@"woaoVipExpireTime":""@"alreadyPaid":\\w+@"alreadyPaidReplay":\\w+@"alreadyPaidReplayDownload":\\w+@"isPaid":\\w+@"canWatchFree":\\w+@"isWoaoVip":\\w+@"watchPlayback":\\w+@"downloadPlayback":\\w+@"isLeagueVip":\\w+@"canDownload":false@"isVip":false@"showButton":true@"status":2@"validForever":false@','"woaoVip":true@"hasNotExpiredLeagueVip":true@"woaoVipExpireTime":"2099-12-12"@"alreadyPaid":true@"alreadyPaidReplay":true@"alreadyPaidReplayDownload":true@"isPaid":true@"canWatchFree":true@"isWoaoVip":true@"watchPlayback":true@"downloadPlayback":true@"isLeagueVip":true@"canDownload":true@"isVip":true@"showButton":false@"status":0@"validForever":true@')

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

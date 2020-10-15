/*
更新：2020-10-15
小小影视 unlock Vip&免广告
感谢@GB-png，提供新方法
QX:
https:\/\/.*\..*\.com\/(ssp-svr\/ssp\/list3|ucp/index) url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/xxys.js
Surge:
http-response https:\/\/.*\..*\.com\/(ssp-svr\/ssp\/list3|ucp/index) requires-body=1,max-size=0,script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/xxys.js

MITM = *.xxjjappss.com,*.huaerdadi.com
*/

const path1 = "/ucp/index";
const ad = 'ssp-svr/ssp/list3';
let obj = JSON.parse($response.body);

if ($request.url.indexOf(path1) != -1){
	obj.data.uinfo["down_daily_remainders"] = "666";
	obj.data.uinfo["play_daily_remainders"] = "666";
	obj.data.uinfo["curr_group"] = "5";
	obj.data.user["isvip"] = "1";
	obj.data.user["goldcoin"] = "666";
}

if ($request.url.indexOf(ad) != -1) {
delete obj.data.pmap
}

$done({body: JSON.stringify(obj)});

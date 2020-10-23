/*
更新：2020-10-23
*新增加小小影视老版本的广告去除方案。目前在使用老版本广告失效的，请重新更新下脚本并重新替换下rewrite_remote下的链接

小小影视 unlock Vip&免广告
感谢@GB-png，提供新方法
QX:
https:\/\/.*\..*\.com\/(ssp-svr\/ssp\/list3|ucp/index|getGlobalData) url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/xxys.js
Surge:
http-response https:\/\/.*\..*\.com\/(ssp-svr\/ssp\/list3|ucp/index|getGlobalData) requires-body=1,max-size=0,script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/xxys.js

MITM = *.xxjjappss.com,*.huaerdadi.com
*/

const path1 = "/ucp/index";
const ad = 'ssp-svr/ssp/list3';
const adold = 'getGlobalData';
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

if ($request.url.indexOf(adold) != -1) {
delete obj.data.adrows
delete obj.data.adgroups
delete obj.data.iOS_adgroups
}

$done({body: JSON.stringify(obj)});

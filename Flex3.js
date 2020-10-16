/*
#Flex3解锁ban设备 
https://api2.getflex.co url script-request-body https://raw.githubusercontent.com/photonmang/quantumultX/master/Flex3.js

MITM = api2.getflex.co
*/
const deviceID = "6c90e64fa0e65e75f743fb8a40f4edb88fe3c2df"; //如再次被Ban，请修改里面任意一个数字或字母
let url = $request.url;
let body = $request.body;
let obj = JSON.parse(body);
let headers = $request.headers;

const regx = /(\/patch\/(info|download)|\/patches\/listings\/recent)|\/user\/(signIn|profileSettings\/info)|applications\/listings\/all/

if (url.match(regx)) {
  obj.deviceID = deviceID
  body = JSON.stringify(obj);
}

headers["deviceID"] = deviceID
$done({ headers: headers, body });

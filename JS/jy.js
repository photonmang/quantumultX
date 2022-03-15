
/*
鲸鱼视频 解锁付费观看
制作时间：2022/03/07
制作者：photonmang
下载地址：https://jysp.app（官方是要下载描述文件），网页版：https://h5.7595vip06.com （不需要描述文件）
QX:
hostname = api.8897815.com
https://api.8897815.com/long_video/user/video/(watch|buy) url script-request-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/jy.js
*/
let obj = JSON.parse($request.body);
let obj1 = JSON.parse($response.body);
obj.videoPayCoin = 0;
if ($request.url.indexOf("advertising") != -1) {
delete obj1.data
}
$done({body:JSON.stringify(obj)});

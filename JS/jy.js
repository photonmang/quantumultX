
/*
鲸鱼视频 解锁付费观看
制作时间：2022/03/07
制作者：photonmang
下载地址：https://6478726.com/96iru.html
QX:
hostname = api.8897815.com
https://api.8897815.com/long_video/user/video/(watch|buy) url script-request-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/jy.js
*/
let obj = JSON.parse($request.body);
obj.videoPayCoin = 0;
$done({body:JSON.stringify(obj)});

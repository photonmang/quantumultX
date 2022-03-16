/*
鲸鱼视频 去广告
制作时间：2022/03/16
制作者：photonmang
下载地址：https://jysp.app（官方是要下载描述文件），网页版：https://h5.7595vip06.com （不需要描述文件）
QX:
hostname = api.8897815.com
https://api.8897815.com url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/jy_ad.js
*/
const ad = '/long_video/notice/pop_notice';
const ad2 = '/long_video/advertising';
const ad3 = '/long_video/advertising/specify';
let obj = JSON.parse($response.body);
if ($request.url.indexOf(ad) != -1) {
    delete obj.data
}
if ($request.url.indexOf(ad2) != -1) {
    delete obj.data.ad_2
    delete obj.data.LOGIN_BEFOR
    delete obj.data.ad_1
    delete obj.data.CAROUSEL_FEATURED
    delete obj.data.CAROUSEL_CN
    delete obj.data.CAROUSEL_USA
    delete obj.data.CAROUSEL_HJ
    delete obj.data.CAROUSEL_JK
    delete obj.data.CAROUSEL_FF
    delete obj.data.CAROUSEL_DM
    delete obj.data.CAROUSEL_NOVEL
    delete obj.data["1"]
}
if ($request.url.indexOf(ad3) != -1) {
    delete obj.data.adList[0].adPic
}
$done({ body: JSON.stringify(obj) });

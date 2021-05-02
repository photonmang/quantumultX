/*
我奥篮球 解锁付费直播回放及回放下载
制作时间：2021/05/02
制作者：photonmang
1.本仅解锁付费音频部分，其他部分未进行解锁处理。后续看个人使用情况解锁更多VIP功能
http://api.woaoo.net/schedule/getScheduleBasicInfo?\d+ url script-response-body https://raw.githubusercontent.com/photonmang/quantumultX/master/JS/walq.js
MITM = api.woaoo.net


*/
let walq = JSON.parse($request.body);
walq.data.alreadyPaid = 'true';
walq.data.alreadyPaidReplay = 'true';
walq.data.alreadyPaidReplayDownload = 'true';
walq.data.firstHighlightVideo.isPaid = 'true';
walq.data.firstHighlightVideo.canWatchFree = 'true';
walq.data.firstScheduleHighlight.isPaid = 'true';
$done({body:JSON.stringify(walq)});


/**
 * 调用的是【清风不识字】的网易云音乐刷歌接口，仅供自己研究参考！有冒犯的请联系我删掉。
 * 请自行在下方user和pwd填写自己的账号密码
 * 密码采用md5 32位小写加密，请自行到站长工具加密，再复制进去！http://tool.chinaz.com/tools/md5.aspx
 * 仅仅只对圈X适配
  [task]
 0 9 * * * wyyyy.js,tag=网易云音乐刷歌
 */

  const user=''  //填写网易云音乐用户名
  const pwd='' //填写网易云音乐密码
const url = "http://111.231.32.34/api2/?uin="+user+"&pwd="+pwd;
const method = "GET";
const headers = {
    "Accept": "*/*",
    "Host": "111.231.32.34",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Connection": "close",
    "User-Agent": "%E5%BF%AB%E6%8D%B7%E6%8C%87%E4%BB%A4/1050.4.6 CFNetwork/1121.2.2 Darwin/19.2.0"
};
const data = {"info": "abc"};

const myRequest = {
    url: url,
    method: method, 
    headers: headers, 
    //body: JSON.stringify(data) 
};

$task.fetch(myRequest).then(response => {
    
    console.log(response.body);
    $notify("网易云音乐刷歌🎶", "", response.body); // Success!
}, reason => {
    // reason.error
    $notify("网易云音乐刷歌🎶", "", reason.error); // Error!
});
  







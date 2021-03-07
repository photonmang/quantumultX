/*

2.14 增加5次答题和2次抽奖，暂时无法解决每日不同答题！每日人工更新，方便批量运行，后续再想办法解决
2.16 修复自动答题功能
2.17 修复多账号自动答题过程中出现卡滞现象
2.18 调整通知方式
*/

const jsname = 'QQ阅读'
const $ = Env(jsname)
let task = '';
let tz = '';
const zhs=$.getdata('zhs') || 1 
const qqreadbdArr = [];
let qqreadbodyVal = "";
const qqreadtimeurlArr = [];
let qqreadtimeurlVal = "";
const qqreadtimehdArr = [];
let qqreadtimeheaderVal = "";
let qit,z1,z2,O,n=1,dd='';

console.log(`\n==== 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})} ====\n`)
const QQlogs = $.getdata('QQlogs') || false   //调试日志，默认关闭

for (let index = 1; index <= zhs; index++) {
    if ($.getdata('qqreadbd'+index) === undefined || $.getdata('qqreadbd'+index) === '') {
      break
    }
    qqreadbdArr.push($.getdata("qqreadbd"+index));
    qqreadtimeurlArr.push($.getdata("qqreadtimeurl"+index));
    qqreadtimehdArr.push($.getdata("qqreadtimehd"+index));
  }
  console.log(`============ 共${qqreadtimehdArr.length}个QQ阅读账号  =============\n`)

!(async () => {

  await all();
  
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })


async function all() {
  for (let i = 0; i < zhs; i++) {	  
	  let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);  
    tz = '';    
    qqreadbodyVal = qqreadbdArr[i];
    qqreadtimeheaderVal = qqreadtimehdArr[i];    
    O =(`============ ${jsname+(i + 1)} =============`);     
    $.log(`${O}`);
    await qqreadkey();
    n=1
    for (z=0;z<2;z++){
    await qqreaddati1();  
    await $.wait(3000);
    if (z1== -4){
       break
     } else if (z2 == true){
       break
     } 
    }
    n=1
    for (z=0;z<2;z++){
    await qqreaddati2();  
    await $.wait(3000);
    if (z1== -4){
       break
     } else if (z2 == true){
       break
     } 
    }
    n=1
    for (z=0;z<2;z++){
    await qqreaddati3();  
    await $.wait(3000);
    if (z1== -4){
       break
     } else if (z2 == true){
       break
     } 
    }
    n=1
    for (z=0;z<2;z++){
    await qqreaddati4();  
    await $.wait(3000);
    if (z1== -4){
       break
     } else if (z2 == true){
       break
     } 
    }
    n=1
    for (z=0;z<2;z++){
    await qqreaddati5();  
    await $.wait(3000);
    if (z1== -4){
       break
     } else if (z2 == true){
       break
     } 
    }
    for(c=0;c<2;c++){
    await qqreaddraw();
    await $.wait(3000);
    }
    dd +=O+'\n'+tz
  }
await showmsg();
}

function showmsg() {
  return new Promise(async resolve => {
    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);   
    $.msg("QQ阅读-答题", "", dd);
    resolve()
  })
}

// 获取答题
function qqreadkey() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/v2/user/page?fromGuid=`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl, (error, response, data) => {
       //$.log(`答题: ${data}`);

      
      const dt = JSON.parse(data);
     qit=dt.data.question.questionList[0].qid 
     qit1=dt.data.question.questionList[1].qid
     qit2=dt.data.question.questionList[2].qid 
     qit3=dt.data.question.questionList[3].qid 
     qit4=dt.data.question.questionList[4].qid 

     
      resolve();
    });
  });
}


// 抽奖
function qqreaddraw() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl1 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/lottery`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl1, (error, response, data) => {
      
      $.log(`抽奖: ${data}`);
      const cj = JSON.parse(data);
      if (cj.code == 0) {
      tz += `【抽奖】:${cj.data.rewardText}\n`;
      }
else if (cj.code !=0){
tz += `【抽奖】:${cj.msg}\n`;
}
      resolve();
    });
  });
}


// 答题1
function qqreaddati1() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl1 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/answer?qid=${qit}&optionNo=${n}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl1, (error, response, data) => {
      
      $.log(`答题1: ${data}`);
      const dati = JSON.parse(data);
      z1=dati.data.code
      z2=dati.data.flag
      if (dati.data.code) {
      tz += `【答题1】:${dati.data.msg}\n`;
      }
      else if (dati.data.flag ==false) {
      n=n+1
      tz += `【答题1】:回答❌,重新尝试答题！\n`;
      }
      else if (dati.data.flag ==true) {
      tz += `【答题1】:回答✅\n`;
      }
      resolve();
    });
  });
}


// 答题2
function qqreaddati2() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl2 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/answer?qid=${qit1}&optionNo=${n}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl2, (error, response, data) => {
      
      $.log(`答题2: ${data}`);
      const dati = JSON.parse(data);
      z1=dati.data.code
      z2=dati.data.flag
      if (dati.data.code) {
      tz += `【答题2】:${dati.data.msg}\n`;
      }
      else if (dati.data.flag ==false) {
      n=n+1
      tz += `【答题2】:回答❌,重新尝试答题！\n`;
      }
      else if (dati.data.flag ==true) {
      tz += `【答题2】:回答✅\n`;
      }
      resolve();
    });
  });
}

// 答题3
function qqreaddati3() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl3 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/answer?qid=${qit2}&optionNo=${n}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl3, (error, response, data) => {
      
      $.log(`答题3: ${data}`);
      const dati = JSON.parse(data);
      z1=dati.data.code
      z2=dati.data.flag
      if (dati.data.code) {
      tz += `【答题3】:${dati.data.msg}\n`;
      }
      else if (dati.data.flag ==false) {
      n=n+1
      tz += `【答题3】:回答❌,重新尝试答题！\n`;
      }
      else if (dati.data.flag ==true) {
      tz += `【答题3】:回答✅\n`;
      }
      resolve();
    });
  });
}
// 答题4
function qqreaddati4() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl4 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/answer?qid=${qit3}&optionNo=${n}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl4, (error, response, data) => {
      
      $.log(`答题4: ${data}`);
      const dati = JSON.parse(data);
      z1=dati.data.code
      z2=dati.data.flag
      if (dati.data.code) {
      tz += `【答题4】:${dati.data.msg}\n`;
      }
      else if (dati.data.flag ==false) {
      n=n+1
      tz += `【答题4】:回答❌,重新尝试答题！\n`;
      }
      else if (dati.data.flag ==true) {
      tz += `【答题4】:回答✅\n`;
      }
      resolve();
    });
  });
}

// 答题5
function qqreaddati5() {
  return new Promise((resolve, reject) => {
    const toqqreaddatiurl5 = {
      url: `https://mqqapi.reader.qq.com/mqq/red_packet/user/question/answer?qid=${qit4}&optionNo=${n}`,
      headers: JSON.parse(qqreadtimeheaderVal),
      timeout: 60000,
    };
    $.get(toqqreaddatiurl5, (error, response, data) => {
      
      $.log(`答题5: ${data}`);
      const dati = JSON.parse(data);
      z1=dati.data.code
      z2=dati.data.flag
      if (dati.data.code) {
      tz += `【答题5】:${dati.data.msg}\n`;
      }
      else if (dati.data.flag ==false) {
      n=n+1
      tz += `【答题5】:回答❌,重新尝试答题！\n`;
      }
      else if (dati.data.flag ==true) {
      tz += `【答题5】:回答✅\n`;
      }
      resolve();
    });
  });
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

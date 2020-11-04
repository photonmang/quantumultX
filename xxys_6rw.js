const $ = new Env('小小影视')
$.VAL_loginurl = $.getdata('py_signurl_xxys')
$.VAL_loginheader = $.getdata('py_signheader_xxys')
const logs = 0   //响应日志开关,默认关闭

!(async () => {
var myDate = new Date();
var days = myDate.getDay();
var hour = myDate.getHours();
if (hour == 22) {
if  (days == 6) {
  await box()  
  await box6()   
  await showmsg()
} else {
  await box()
  await showmsg()
}} else {
  await sign()   
  await pl()    
  await ad()    
  await fx()    
for (let s = 0; s < 1; s ++) {
        await sc();
        i = s + 1;
console.log(`\n开始收藏:第`+i+`次`)
await $.wait(1000);
if ($.sc.retcode == -1) {
await sc();
console.log(`\n收藏失败:开始重新执行收藏任务`)
await $.wait(1000);
}
      }
for (let ten = 0; ten < 1; ten ++) {
        await tenplay();
        i = ten + 1;
console.log(`\n开始播放:第`+i+`次`)
await $.wait(1000);
if ($.tenplay.retcode == 2) {
await tenplay();
console.log(`\n播放失败:开始重新执行播放任务`)
await $.wait(1000);
}
      }
  await showmsg()
}
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

function sign() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/task/sign`, headers: JSON.parse($.VAL_loginheader) }

    $.post(url, (err, resp, data) => {
		if(logs)$.log(`签到结果 : ${data}\n`)
      try {
        $.sign = JSON.parse(data)
    if ($.sign.retcode == 0) {
      $.desc += `签到:`+unescape($.sign.errmsg)+`✅`+`\n`
     } else if ($.sign.retcode == -1) {
      $.desc = `签到:`+unescape($.sign.errmsg)+`⚠️`+`\n`
     } 
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function pl() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/comment/post`, headers: JSON.parse($.VAL_loginheader) }
    url.body = '{_t=1590651136000&content=%e7%9c%9f%e5%a5%bd%e7%9c%8b&parentid=0&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid=62894}'

    $.post(url, (err, resp, data) => {
		if(logs)$.log(`评论结果 : ${data}\n`)
      try {
        $.pl = JSON.parse(data)
	if ($.pl.retcode == 0) {
	  $.desc += `评论:`+unescape($.pl.errmsg)+`✅`+`\n`
     } else if ($.pl.retcode != 0) {
	  $.desc += `评论:`+unescape($.pl.errmsg)+`⚠️`+`\n`
     }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function ad() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com//ucp/task/adviewClick?`, headers: JSON.parse($.VAL_loginheader) }

    $.post(url, (err, resp, data) => {
		if(logs)$.log(`广告结果 : ${data}\n`)
      try {
        $.ad = JSON.parse(data)
	if ($.ad.retcode == 0) {
      $.desc += `广告:`+unescape($.ad.errmsg)+`✅`+`\n`
     } else if ($.ad.retcode == -1) {
      $.desc += `广告:`+unescape($.ad.errmsg)+`⚠️`+`\n`
     } 
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function fx() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/task/share?_t=1590118900000&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid=62935`, headers: JSON.parse($.VAL_loginheader) }
    
    $.post(url, (err, resp, data) => {
       if(logs)$.log(`分享结果 : ${data}\n`)
      try {
        $.fx = JSON.parse(data)
	if ($.fx.retcode == 0) {
      $.desc += `分享: 成功✅`+`\n`
     } else if ($.fx.retcode == -1) {
      $.desc += `分享:`+unescape($.fx.errmsg)`⚠️`+`\n`
     }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function box() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/taskbox/taskboxopen?taskid=1022`, headers: JSON.parse($.VAL_loginheader) }
    $.post(url, (err, resp, data) => {
		if(logs)$.log(`每日开箱结果 : ${data}\n`)
      try {
        $.box = JSON.parse(data)
    if ($.box.retcode == 0) {
      $.desc = `开箱结果:`+unescape($.box.errmsg)+`✅`+`\n`
    }
	 else if ($.box.retcode == -1) {
      $.desc = `开箱结果:`+unescape($.box.errmsg)+`⚠️`+`\n`
    }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function box6() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/taskbox/taskboxopen?taskid=1622`, headers: JSON.parse($.VAL_loginheader) }
    $.post(url, (err, resp, data) => {
		if(logs)$.log(`每周开箱结果 : ${data}\n`)
      try {
        $.box6 = JSON.parse(data)
    if ($.box6.retcode == 0) {
      $.desc += `开箱结果:`+unescape($.box6.errmsg)+`✅`+`\n`
    }
	 else if ($.box6.retcode == -1) {
      $.desc += `开箱结果:`+unescape($.box6.errmsg)+`⚠️`+`\n`
    }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function sc() {
  return new Promise((resolve) => {
    const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/favorite/add`, headers: JSON.parse($.VAL_loginheader) }
var ID = Math.floor(Math.random() * 60000 + 10);
  url.body = '_t=1590122851000&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid='+ID
    $.post(url, (err, resp, data) => {
    if(logs)$.log(`收藏结果 : ${data}\n`)
      try {
        $.sc = JSON.parse(data)
    if ($.sc.retcode == 0) {
      $.desc += `收藏结果:`+unescape($.sc.errmsg)+`✅`+`\n`
    }
	 else if ($.sc.retcode == -1) {
      $.desc += `收藏结果:`+unescape($.sc.errmsg)+`⚠️`+`\n`
    }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function tenplay() {
  return new Promise((resolve) => {
var num = Math.floor(Math.random() * 60000 + 10);
    const url = { url: "https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/vod/reqplay/"+num+"?_t=1590938797000&pid=&playindex=1", headers: JSON.parse($.VAL_loginheader) }
var ID = Math.floor(Math.random() * 60000 + 10);
    $.post(url, (err, resp, data) => {
    if(logs)$.log(`播放结果 : ${data}\n`)
      try {
        $.tenplay = JSON.parse(data)
    if ($.tenplay.retcode == 0) {
      $.desc += `播放结果:`+unescape($.tenplay.errmsg)+`✅`+`\n`
    }
	 else if ($.tenplay.retcode == -1) {
      $.desc += `播放结果:`+unescape($.tenplay.errmsg)+`⚠️`+`\n`
    }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function showmsg() {
  return new Promise((resolve) => {
    $.msg($.name, $.subt, $.desc)
    resolve()
  })
}


// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient}isLoon(){return"undefined"!=typeof $loon}loaddata(){if(!this.isNode)return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch{return{}}}}}writedata(){if(this.isNode){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),h=JSON.stringify(this.data);e?this.fs.writeFileSync(t,h):i?this.fs.writeFileSync(s,h):this.fs.writeFileSync(t,h)}}getdata(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setdata(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:h,body:o}=t;s(null,{status:e,statusCode:i,headers:h,body:o},o)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:h,body:o}=t;s(null,{status:e,statusCode:i,headers:h,body:o},o)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status,s(t,e,i))});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:h,body:o}=t;s(null,{status:e,statusCode:i,headers:h,body:o},o)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:h,body:o}=t;s(null,{status:e,statusCode:i,headers:h,body:o},o)},t=>s(t))}}msg(s=t,e="",i="",h){this.isSurge()||this.isLoon()?$notification.post(s,e,i):this.isQuanX()&&$notify(s,e,i),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.message)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t=null){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}

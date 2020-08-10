const cookieName = '小小影视'
const signurlKey = 'py_signurl_xxys'
const signheaderKey = 'py_signheader_xxys'
const py = init()
const signurlVal = py.getdata(signurlKey)
const signheaderVal = py.getdata(signheaderKey)


var date = new Date();
  var hour = date.getHours();
   var min = date.getMinutes();
    var s = date.getSeconds();
if (hour == 22) {
boxall()//开启宝箱
}
else if (hour != 22){
sign()  //签到
pl()    //评论
ad()    //广告
fx()    //分享
sc()    //收藏
ten()   //10次观影
}
/*
else if (hour == 22 && min<=30){
play()  //30分钟观影
}
*/

function sign() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/task/sign`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `签到结果: 成功`
      detail = ``
    } else if (result.retcode == -1) {
      subTitle = `签到结果: 成功 (重复签到)`
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}

function pl() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/comment/post`, headers: JSON.parse(signheaderVal) }
  url.body = '{_t=1590651136000&content=%E6%B5%8B%E8%AF%95%E4%B8%80%E4%B8%8B&parentid=0&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid=62894}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle += `评论结果: 成功`
      detail += ``
    } else if (result.retcode == 2) {
      subTitle += `评论结果: 每日发表评论数已满额`
    } else {
      subTitle += `评论结果: 失败`
      detail += `编码: ${result.retcode},说明:记录不存在或已被删除`
    }
    py.msg(title, subTitle, detail)
    py.done()
  })
}

function ad() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com//ucp/task/adviewClick?`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `广告结果: 点击广告已送金币`
      detail = ``
    } else if (result.retcode == -1) {
      subTitle = `广告结果: 您今天已经送过了`
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}

function fx() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/task/share?_t=1590118900000&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid=62935`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `分享结果: 成功`
      detail = ``
    } else if (result.retcode == -1) {
      subTitle = `未知错误: 影片记录不存在或已删除`
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}

function sc1() {

  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/favorite/add`, headers: JSON.parse(signheaderVal) }
var ID = Math.floor(Math.random() * 60000 + 10);
  url.body = '_t=1590122851000&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid='+ID

  py.post(url, (error, response, data) => {
  py.log(`${cookieName}, data: ${data}`)
})
}

function sc() {
for (i=0;i<5;i++){
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/favorite/add`, headers: JSON.parse(signheaderVal) }
var ID = Math.floor(Math.random() * 60000 + 10);
  url.body = '_t=1590122851000&pid=&s_device_id=2D1749C8-38B2-4859-A2FC-4BF783C533A3&s_os_version=13.3&s_platform=ios&vodid='+ID

  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `收藏结果: 成功`
      detail = `执行第:`+(6-i--)+`次`
    } else if (result.retcode == -1) {
      subTitle = `收藏结果: 重复收藏`
      detail=`开始重新执行一次,执行第:`+(6-i--)+'次'
      sc1()
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}
}

function boxall() {

var myDate = new Date();
var days = myDate.getDay();

if  (days == 6) {
box()
box6()

} else {
box()
}
}

function box6() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/taskbox/taskboxopen?taskid=1622`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `开箱结果: 周六宝箱成功开启🎉`
      detail = ``
    } else if (result.retcode == -1) {
      subTitle = `开箱结果: 每周神秘宝箱已领过了⚠️`
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}
function box() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/ucp/taskbox/taskboxopen?taskid=1022`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `开箱结果: 宝箱成功开启🎉`
      detail = ``
    } else if (result.retcode == -1) {
      subTitle = `开箱结果: 每日神秘宝箱已领过了⚠️`
    } 
    py.msg(title, subTitle, detail)
    py.done()
  })
}



function bf() {
var num = Math.floor(Math.random() * 60000 + 10);
  const url = { url: "https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/vod/reqplay/"+num+"?_t=1590938797000&pid=&playindex=1", headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
})
}

function ten() {
for (t=0;t<10;t++){ 
setTimeout(function() {
var num = Math.floor(Math.random() * 60000 + 10);
  const url = { url: "https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/vod/reqplay/"+num+"?_t=1590938797000&pid=&playindex=1", headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `播放结果: 成功🎉`
      detail = `执行第:`+(11-t--)+'次'
    } else if (result.retcode == 2) {
      subTitle = `播放结果: 播放地址不存在⚠️`
      detail = `开始重新执行一次,执行第:`+(11-t--)+'次'
       bf()
    } else if (result.retcode == 3) {
      subTitle = `播放结果: 今日观看次数已看完🌪`
       
    } else {
      subTitle = `播放结果: 记录不存在或被删除❌`
      detail = `开始重新执行一次,执行第:`+(11-t--)+'次'
       bf()
           }
    py.msg(title, subTitle, detail)
    py.done()
  })
},(i - 1) * 2000);
}
}

function play() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/vod/playhb/53376?`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
    const result = JSON.parse(data)
    py.log(e)
    py.done()

  })
}


function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}

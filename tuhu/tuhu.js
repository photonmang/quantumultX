/*

cookie获取:打开app，我的，点击积分获取成功即可注释点cookie获取脚本
[rewrite_local]
#途虎养车获取Cookie
https://api.tuhu.cn/User/GetUserCurrentAndNextGradeInfo url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.Cookie.js

[task_local]
0 8 * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.js, enabled=true
*/

const cookieName = '途虎养车'
const signurlKey = 'photonmang_signurl_tuhu'
const signheaderKey = 'photonmang_signheader_tuhu'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)


sign()  //签到


function sign() {
  const url = { url: `https://api.tuhu.cn/User/UserCheckInVersion1`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  photonmang.post(url, (error, response, data) => {
    photonmang.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.Code == 1) {
      subTitle = `签到结果: 签到成功`
      detail += `积分增加:${result.AddIntegral}`+`\n`
      detail += `已连续签到:${result.NeedDays}`+`/7天`
    } else if (result.Code == 0) {
      subTitle = `签到结果: ${result.Message}`
    } 
    photonmang.msg(title, subTitle, detail)
    photonmang.done()
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

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
const title = `${cookieName}`
if (min<=30){
play()  //30分钟观影
}
else if (min>30){

$notify(title, "","连续观影结束");
    
}



function play() {
  const url = { url: `https://uv4tq1fvpg5gy5r5lkq9.hnhx360.com/vod/playhb/53376?`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  py.post(url, (error, response, data) => {
    py.log(`${cookieName}, data: ${data}`)
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

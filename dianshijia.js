/*
2020.10.13 由于作者停更，因本人一直有在用所以进行日常维护，只要我一直在用，也会一直维护下去。
           去掉奖励信息随机的BUG奖励，改为固定显示每日0.2元额度。
2021.2.12 彻底修复因每日奖励额度接口变动导致奖励额度失效问题！
2021.6.24 调整额度为0.4元。由于官方的额度进行了调整，0.2元为当日奖励，0.4元为明日奖励额度，脚本调整获取方式为直接提交明日奖励进行获取。
2021.8.9  新增VIP兑换，每日上限6天，一次兑换+3天
2022.1.10 修复脚本，去除额外额度获取
2022.2.21 修复api失效，新增提现开关。方便没额度的只获取VIP天数
2022.2.22 1.增加圈X版多账号控制，需要配合本仓库JSBOX订阅:https://raw.githubusercontent.com/photonmang/quantumultX/master/photonmang.boxjs.json
          2.因修改了CK获取的开始值，需要重新获取一次CK.
	  3.提现变量改为自动判断
2022.2.23 去除失效的游戏模块，新增刷短视频获取金币
2022.3.4  1.API变更，最新版无法抓到header请重新更新cookie.conf或者自行替换[rewrite_local]
          2.多账号执行新增用户名方便查验；
	  3.修复V2P下因账户中未获取提现链接获取导致的请求超时
2022.3.5  新增会员时长查询
2022.5.26 推送通知改为晚上20点推送一次

获取Cookie方法:
1.将下方[rewrite_local]和[Task]地址复制的相应的区域，无需添加 hostname，每日7点、12点、20点各运行一次，其他随意
2.APP登陆账号后，点击菜单栏'领现金',即可获取Cookie，进入提现页面，点击随机金额，可获取提现地址!!
~~~~~~~~~~~~~~~~~~~~
loon 2.10+ :
[Script]
cron "04 00 * * *" script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js, tag=电视家
http-request http:\/\/act.mydianshijia.com\/api\/v\d\/sign\/signin script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js, timeout=10, tag=电视家
http-request http:\/\/act.mydianshijia.com\/api\/cash\/v1\/zz\/withdrawal script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js, timeout=10, tag=电视家
~~~~~~~~~~~~~~~~~~~~~
# 获取电视家 Cookie.
Surge 4.0
[Script]
电视家 = type=cron,cronexp=0 8 0 * * *,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js,script-update-interval=0
电视家 = type=http-request,pattern=http:\/\/act.mydianshijia.com\/api\/v\d\/sign\/signin,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js
电视家 = type=http-request,pattern=http:\/\/act.mydianshijia.com\/api\/cash\/v1\/zz\/withdrawal,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js
~~~~~~~~~~~~~~~~~~
QX 1.0.6+ :
[task_local]
0 9 * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js
[rewrite_local]
http:\/\/act.mydianshijia.com\/api\/v\d\/sign\/signin url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js
http:\/\/act.mydianshijia.com\/api\/cash\/v1\/zz\/withdrawal url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/dianshijia.js
~~~~~~~~~~~~~~~~~
*/
const walkstep = '20000'; //每日步数设置，可设置0-20000
const logs = 0 //响应日志开关,默认关闭
const $ = new Env('电视家')
const notify = $.isNode() ? require('./sendNotify') : '';
const dsj_id=$.getdata('dsj_id') || 1 //默认获取账号1
const dsj_zhs=$.getdata('dsj_zhs') || 1 //默认输出1个账号
let sleeping = "",
    dsjname = "",
    detail = ``,
    subTitle = ``;
const dianshijia_API = 'http://api.mydianshijia.com/api'
let tokenArr = [],
    DsjurlArr = [],
    DrawalArr = [],
    drawalCode = "";
if ($.isNode()) {
    if (process.env.DSJ_HEADERS && process.env.DSJ_HEADERS.indexOf('#') > -1) {
        Dsjheaders = process.env.DSJ_HEADERS.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    } else if (process.env.DSJ_HEADERS && process.env.DSJ_HEADERS.indexOf('\n') > -1) {
        Dsjheaders = process.env.DSJ_HEADERS.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        Dsjheaders = process.env.DSJ_HEADERS.split()
    };

    if (process.env.DSJ_DRAWAL && process.env.DSJ_DRAWAL.indexOf('#') > -1) {
        Drawals = process.env.DSJ_DRAWAL.split('#');
    } else if (process.env.DSJ_DRAWAL && process.env.DSJ_DRAWAL.indexOf('\n') > -1) {
        Drawals = process.env.DSJ_DRAWAL.split('\n');
    } else {
        Drawals = process.env.DSJ_DRAWAL.split()
    };
    Object.keys(Dsjheaders).forEach((item) => {
        if (Dsjheaders[item]) {
            tokenArr.push(Dsjheaders[item])
        }
    });
    Object.keys(Drawals).forEach((item) => {
        if (Drawals[item]) {
            DrawalArr.push(Drawals[item])
        }
    });
} 
   for (let sun = 1; sun <= dsj_zhs; sun++) {
       
    tokenArr.push($.getdata('sy_signheader_dsj'+sun))
    DrawalArr.push($.getdata('drawal_dsj'+sun))
}

if (isGetCookie = typeof $request !== 'undefined') {
    GetCookie();
    $.done()
}

!(async() => {
    if (!tokenArr[0]) {
        $.msg($.name, '【提示】请先获取电视家一cookie')
        return;
    }
    timeZone = new Date().getTimezoneOffset() / 60;
    timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp).toLocaleString('zh', {
        hour12: false,
        timeZoneName: 'long'
    });
    console.log(`\n === 脚本执行 ${bjTime} ===\n`);
    console.log(`------------- 共${tokenArr.length}个账号`);
    if (new Date().getTimezoneOffset() / 60 != '-8' && $.time('HH') < '16') {
        time = new Date(new Date(new Date().toLocaleDateString()).getTime()) / 1000 - 28800
        console.log(time)
    } else if (new Date().getTimezoneOffset() / 60 != '-8' && $.time('HH') > '16') {
        time = new Date(new Date(new Date().toLocaleDateString()).getTime()) / 1000 + 16 * 60 * 60
    } else {
        time = new Date(new Date(new Date().toLocaleDateString()).getTime()) / 1000
    }
    for (let i = 0; i < tokenArr.length; i++) {
        if (tokenArr[i]) {
            signheaderVal = tokenArr[i];
            drawalVal = DrawalArr[i];
            $.index = i + 1;
            console.log(`\n\n开始【电视家${$.index}】`)
            await signin(); // 签到
            await signinfo(); // 签到信息
            await Addsign(); // 额外奖励，默认额度
            if (drawalVal != "") {
             await Withdrawal()
            } 
            await run();
            await tasks(); // 任务状态
            await videoPlay(); // 刷短视频
            await userinfo();
            await total(); // 总计
            await cash(); // 现金
            await vip();
			if (drawalVal != "") {
            await cashlist(); // 现金列表
			}
            await coinlist(); // 金币列表
            if ($.isNode() && process.env.DSJ_NOTIFY_CONTROL && drawalCode == '0') {
                await notify.sendNotify($.name, subTitle + '\n' + detail)
            }
        }
    }
})()
.catch((e) => $.logErr(e))
    .finally(() => $.done())

function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/sign\/signin/)) {
        const signheaderVal = JSON.stringify($request.headers)
        $.log(`signheaderVal:${signheaderVal}`)
        if (signheaderVal) $.setdata(signheaderVal, 'sy_signheader_dsj'+dsj_id)
        $.msg($.name+dsj_id, `获取Cookie: 成功`, ``)
    } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/cash\/withdrawal/)) {
        const drawalVal = $request.url
        $.log(`drawalVal:${drawalVal}`)
        if (drawalVal) $.setdata(drawalVal, 'drawal_dsj'+dsj_id)
        $.msg($.name+dsj_id, `获取提现地址: 成功`, ``)
    }
}
async function run() {
    if ($.isNode() && new Date().getTimezoneOffset() == '0') {
        if ($.time('HH') > 11) {
            await sleep();
            await CarveUp();
        } else if ($.time('HH') > 3 && $.time('HH') < 5) {
            await getCUpcoin();
            await walk();
        } else if ($.time('HH') > 22) {
            await wakeup()
        }
    } else {
        if ($.time('HH') > 17) {
            await sleep();
            await CarveUp();
        } else if ($.time('HH') > 11 && $.time('HH') < 14) {
            await getCUpcoin();
            await walk();
        } else if ($.time('HH') > 6 && $.time('HH') < 9) {
            await wakeup()
        }
    }
}

function signin() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/v5/sign/signin?accelerate=0&ext=0&ticket=`,
            headers: JSON.parse(signheaderVal)
        }, async(error, response, data) => {
            if (logs) $.log(`${$.name}, 签到结果: ${data}\n`)
            let result = JSON.parse(data)
            if (result.errCode == 0) {
                signinres = `签到成功 `
                var h = result.data.reward.length
                if (h > 1) {
                    detail = `【签到收益】` + signinres + `${result.data.reward[0].count}金币，奖励${result.data.reward[1].name} `
                } else {
                    detail = `【签到收益】` + signinres + `+${result.data.reward[0].count}金币 `
                }
            } else if (result.errCode == 4) {
                detail = `【签到结果】 重复 🔁 `
            } else if (result.errCode == 6) {
                subTitle = `【签到结果】 失败`
                detail = `原因: ${result.msg}`
                if ($.isNode()) {
                    await notify.sendNotify($.name, subTitle + '\n' + detail)
                }
                return
            }
            resolve()
        })
    })
}

function signinfo() {
  return new Promise((resolve, reject) => {
     $.get({ url: `${dianshijia_API}/v5/sign/get`, headers: JSON.parse(signheaderVal)}, (error, response, data) => 
  {
   if(logs)$.log(`${$.name}, 签到信息: ${data}\n`)
     const result = JSON.parse(data)
     if (result.errCode == 0) 
    {
     var d = `${result.data.currentDay}`
     for (i=0; i < result.data.recentDays.length;i++)      
        {
       if (d == result.data.recentDays[i].day)
          {detail += ` 连续签到${d}天\n`
       var j = result.data.recentDays[i].rewards.length
       if (j > 1){
aa=result.data.recentDays[i+1].rewards[1].rewardsType
bb=result.data.recentDays[i+1].rewards[2].rewardsType
//cc=result.data.recentDays[i+1].rewards[3].rewardsType

if (aa==1){
money=result.data.recentDays[i+1].rewards[1].id
detail += `【奖励信息】今日:${result.data.recentDays[i+1].rewards[1].name}\n`

} else 
if (bb==1){
money=result.data.recentDays[i+1].rewards[2].id
detail += `【奖励信息】今日:${result.data.recentDays[i+1].rewards[2].name}\n`

} else
if (cc==1){
money=result.data.recentDays[i+1].rewards[3].id
detail += `【奖励信息】今日:${result.data.recentDays[i+1].rewards[3].name}\n`
}

                 } 
          else   if (j == 1) 
                 { 
                detail += `【奖励信息】今日: 无 ` 
                 }
        
               }               
           }  
     resolve()
        }
    })
  })
}  

function total() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/coin/info`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            if (logs) $.log(`${$.name}, 总计: ${data}\n`)
            let result = JSON.parse(data)
            subTitle = `待兑换金币: ${result.data.coin} `
            try {
                if (result.data.tempCoin) {
                    for (i = 0; i < result.data.tempCoin.length; i++) {
                        coinid = result.data.tempCoin[i].id
                        $.get({
                            url: `http://api.mydianshijia.com/api/coin/temp/exchange?id=` + coinid,
                            headers: JSON.parse(signheaderVal)
                        }, (error, response, data))
                    }
                }
                resolve()
            } catch (e) {
                console.log(e)
                resolve()
            }
        })
    })
}

function cash() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/cash/info`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            if (logs) $.log(`现金: ${data}\n`)
            let cashresult = JSON.parse(data)
            if (cashresult.errCode == "0") {
                subTitle += '现金:' + cashresult.data.amount / 100 + '元 额度:' + cashresult.data.withdrawalQuota / 100 + '元'
                cashtotal = cashresult.data.totalWithdrawn / 100
            }
            resolve()
        })
    })
}

function vip() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/v2/product/exchange?code=mianfeiduihuan0003`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            if (logs) $.log(`vip: ${data}\n`)
            let vipresult = JSON.parse(data)
            if (vipresult.errCode == 0) {
                detail += '【VIP兑换】✅兑换成功+3天\n'}  else {
				detail += '【VIP兑换】'+vipresult.msg+'\n'
				}
            resolve()
        })
    })
}

function cashlist() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/cash/detail`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            let result = JSON.parse(data)
            let totalcash = Number(),
                cashres = "";
            //console.log(`提现列表: ${data}`)
            if (result.errCode == 0) {
                for (i = 0; i < result.data.length; i++) {
                    if (result.data[i].type == '2' && result.data[i].from == "支付宝提现" && result.data[i].ctime <= time) {
                        cashres = `✅ 今日提现:` + result.data[i].amount / 100 + `元 `
                    }
                }
                if (cashres && cashtotal) {
                    detail += `【提现结果】` + cashres + `共计提现:` + cashtotal + `元\n`
                } else if (!cashres && cashtotal) {
                    detail += `【提现结果】今日未提现 共计提现:` + cashtotal + `元\n`
                }
            } else {
                console.log(`提现列表失败，可忽略: ${data}`)
            }
            resolve()
        })
    })
}

function tasks(tkcode) {
    return new Promise(async(resolve, reject) => {
        let taskcode = ['1M005', '1M002', 'playTask', 'SpWatchVideo', 'Mobilewatchvideo', 'MutilPlatformActive']
        for (code of taskcode) {
            await dotask(code)
        }
        resolve()
    })
}

function dotask(code) {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/v4/task/complete?code=${code}`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            let taskres = JSON.parse(data),
                taskcode = taskres.errCode;
            if (taskcode == 0) {
                CompCount = taskres.data.dayCompCount
                CountMax = taskres.data.dayDoCountMax
                console.log('任务代码:' + code + '，获得金币:' + taskres.data.getCoin)
                if (code == 'playTask' && taskres.data.doneStatus == 3) {
                    detail += `【播放任务】🔕 完成/共计 ` + CompCount + `/` + CountMax + ` 次\n`
                }
            } else if (taskcode == '4000') {
                //console.log('任务代码:'+code+'，'+taskres.msg)
            }
            resolve()
        })
    })
}

function walk() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/taskext/getWalk?step=${walkstep}`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`走路任务: ${data}\n`)
            let result = JSON.parse(data)
            if (result.data.unGetCoin > 10) {
                $.get({
                    url: `${dianshijia_API}/taskext/getCoin?code=walk&coin=${result.data.unGetCoin}&ext=1`,
                    headers: JSON.parse(signheaderVal)
                }, (error, response, data) => {})
            }
            resolve()
        })
    })
}

function sleep() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/taskext/getSleep?ext=1`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, (error, response, data) => {
            try {
                if (logs) $.log(`睡觉任务: ${data}\n`)
                let sleepres = JSON.parse(data)
                if (sleepres.errCode == 0) {
                    sleeping = sleepres.data.name + '报名成功 🛌'
                } else if (sleepres.errCode == 4006) {
                    sleeping = '睡觉中😴'
                } else {
                    sleeping = ''
                }
                resolve()
            } catch (e) {
                $.msg($.name, `睡觉结果: 失败`, `说明: ${e}`)
            }
            resolve()
        })
    })
}

function wakeup() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/taskext/getCoin?code=sleep&coin=1910&ext=1`,
            headers: JSON.parse(signheaderVal)
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`睡觉打卡: ${data}\n`)
        })
        resolve()
    })
}

function coinlist() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let url = {
                url: `${dianshijia_API}/coin/detail`,
                headers: JSON.parse(signheaderVal)
            }
            $.get(url, (error, response, data) => {
                //console.log(`金币列表: ${data}`)
                let result = JSON.parse(data)
                let onlamount = 0,
                    vdamount = 0,
                    gamestime = 0,
                    todaysign = 0;
                try {
                    for (i = 0; i < result.data.length && result.data[i].ctime >= time; i++) {
                        if (result.data[i].from == "领取走路金币") {
                            detail += `【走路任务】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "领取睡觉金币") {
                            detail += `【睡觉任务】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "手机分享") {
                            detail += `【分享任务】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "双端活跃") {
                            detail += `【双端活跃】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "播放任务") {
                            detail += `【播放任务】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "领取瓜分金币") {
                            detail += `【瓜分金币】✅ 获得金币` + result.data[i].amount + '\n'
                        }
                        if (result.data[i].from == "激励视频") {
                            vdamount += result.data[i].amount
                        }
                        if (result.data[i].from == "手机在线") {
                            onlamount += result.data[i].amount
                        }
                        if (result.data[i].from == "签到") {
                            todaysign += result.data[i].amount
                        }
                    }
                    if (todaysign) {
                        detail += `【每日签到】✅ 获得金币` + todaysign + '\n'
                    }
                    if (vdamount) {
                        detail += `【激励视频】✅ 获得金币` + vdamount + '\n'
                    }
                    if (onlamount) {
                        detail += `【手机在线】✅ 获得金币` + onlamount + '\n'
                    }
                    if (i > 0) {
                        detail += `【任务统计】共完成${i+1}次任务🌷`
                    }
if ($.time('HH') == 20) { 
                    $.msg($.name+$.index+dsjname+ `  ` + sleeping, subTitle, detail)
}
                } catch (e) {
                    console.log(`获取任务金币列表失败，错误代码${e}+ \n响应数据:${data}`)
                    $.msg($.name + ` 获取金币详情失败 `, subTitle, detail)
                }
                resolve()
            })
        }, 1000)
    })
}

function CarveUp() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/v2/taskext/getCarveUp?ext=1`,
            headers: JSON.parse(signheaderVal),
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`瓜分百万金币: ${data}`)
            const result = JSON.parse(data)
            if (result.errCode == 0) {
                detail += `【金币瓜分】✅ 报名成功\n`
            }
            resolve()
        })
    })
}

function getCUpcoin() {
    return new Promise((resolve, reject) => {
        $.get({
            url: `${dianshijia_API}/taskext/getCoin?code=carveUp&coin=0&ext=1`,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            if (logs) $.log(`瓜分百万金币: ${data}`)
        })
        resolve()
    })
}

function Withdrawal() {
    return new Promise((resolve, reject) => {
        $.get({
            url: drawalVal,
            headers: JSON.parse(signheaderVal)
        }, (error, response, data) => {
            if (logs) $.log(`金币随机兑换 : ${data}\n`)
            let todrawal = JSON.parse(data);
            if (todrawal.errCode == 0) {
                detail += `【金额提现】✅ 到账` + todrawal.data.price / 100 + `元 🌷\n`
                drawalCode = todrawal.errCode
            }
            resolve()
        })
    })
}

function videoPlay() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/v5/task/complete?code=ShortvideoPlay&comType=0`,
            headers: JSON.parse(signheaderVal),
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`刷短视频: ${data}`)
            const result = JSON.parse(data)
            if (result.errCode == 0) {
                detail += `【刷短视频】已刷${result.data.dayCompCount}/${result.data.dayDoCountMax}次\n`
            } else if (result.errCode == 4000) {
				detail += `【刷短视频】`+result.msg+`\n`
			}
            resolve()
        })
    })
}

function userinfo() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/v3/user/info`,
            headers: JSON.parse(signheaderVal),
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`获取用户信息: ${data}`)
            const result = JSON.parse(data)
                    var date = new Date(result.data.equityTime);
                    Y = date.getFullYear() + '-';
                    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    D = date.getDate() + ' ';
                    h = date.getHours() + ':';
                    m = date.getMinutes() + ':';
                    s = date.getSeconds();
                    detail  += `【会员到期】⏱`+Y + M + D + h + m + s+`\n`;
                    dsjname = `[${result.data.nickname}]`
            resolve()
        })
    })
}
function Addsign() {
    return new Promise((resolve, reject) => {
        let url = {
            url: `${dianshijia_API}/sign/chooseAdditionalReward?rewardId=`+money,
            headers: JSON.parse(signheaderVal),
        }
        $.get(url, (error, response, data) => {
            if (logs) $.log(`额外签到: ${data}\n`)
        })
        resolve()
    })
}
function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? { url: opts } : opts
      let sender = this.get
      if (method === 'POST') {
        sender = this.post
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err)
          else resolve(resp)
        })
      })
    }

    get(opts) {
      return this.send.call(this.env, opts)
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST')
    }
  }

  return new (class {
    constructor(name, opts) {
      this.name = name
      this.http = new Http(this)
      this.data = null
      this.dataFile = 'box.dat'
      this.logs = []
      this.isMute = false
      this.isNeedRewrite = false
      this.logSeparator = '\n'
      this.startTime = new Date().getTime()
      Object.assign(this, opts)
      this.log('', `🔔${this.name}, 开始!`)
    }

    isNode() {
      return 'undefined' !== typeof module && !!module.exports
    }

    isQuanX() {
      return 'undefined' !== typeof $task
    }

    isSurge() {
      return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
    }

    isLoon() {
      return 'undefined' !== typeof $loon
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str)
      } catch {
        return defaultValue
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj)
      } catch {
        return defaultValue
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue
      const val = this.getdata(key)
      if (val) {
        try {
          json = JSON.parse(this.getdata(key))
        } catch {}
      }
      return json
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key)
      } catch {
        return false
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body))
      })
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
        let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
        httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
        const [key, addr] = httpapi.split('@')
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: { script_text: script, mock_type: 'cron', timeout: httpapi_timeout },
          headers: { 'X-Key': key, 'Accept': '*/*' }
        }
        this.post(opts, (err, resp, body) => resolve(body))
      }).catch((e) => this.logErr(e))
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      } else return {}
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
      let result = source
      for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
          return defaultValue
        }
      }
      return result
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
      path
        .slice(0, -1)
        .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
        path[path.length - 1]
      ] = value
      return obj
    }

    getdata(key) {
      let val = this.getval(key)
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objval = objkey ? this.getval(objkey) : ''
        if (objval) {
          try {
            const objedval = JSON.parse(objval)
            val = objedval ? this.lodash_get(objedval, paths, '') : val
          } catch (e) {
            val = ''
          }
        }
      }
      return val
    }

    setdata(val, key) {
      let issuc = false
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objdat = this.getval(objkey)
        const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
        try {
          const objedval = JSON.parse(objval)
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        } catch (e) {
          const objedval = {}
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        }
      } else {
        issuc = this.setval(val, key)
      }
      return issuc
    }

    getval(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key)
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        return this.data[key]
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    setval(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key)
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        this.data[key] = val
        this.writedata()
        return true
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got')
      this.cktough = this.cktough ? this.cktough : require('tough-cookie')
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar
        }
      }
    }

    get(opts, callback = () => {}) {
      if (opts.headers) {
        delete opts.headers['Content-Type']
        delete opts.headers['Content-Length']
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient.get(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        this.got(opts)
          .on('redirect', (resp, nextOpts) => {
            try {
              if (resp.headers['set-cookie']) {
                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                if (ck) {
                  this.ckjar.setCookieSync(ck, null)
                }
                nextOpts.cookieJar = this.ckjar
              }
            } catch (e) {
              this.logErr(e)
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const { statusCode: status, statusCode, headers, body } = resp
              callback(null, { status, statusCode, headers, body }, body)
            },
            (err) => {
              const { message: error, response: resp } = err
              callback(error, resp, resp && resp.body)
            }
          )
      }
    }

    post(opts, callback = () => {}) {
      const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
      // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
      if (opts.body && opts.headers && !opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
      if (opts.headers) delete opts.headers['Content-Length']
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient[method](opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        opts.method = method
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        const { url, ..._opts } = opts
        this.got[method](url, _opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => {
            const { message: error, response: resp } = err
            callback(error, resp, resp && resp.body)
          }
        )
      }
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {string} fmt 格式化参数
     * @param {number} 可选: 根据指定时间戳返回格式化日期
     *
     */
    time(fmt, ts = null) {
      const date = ts ? new Date(ts) : new Date()
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return fmt
    }

    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts) return rawopts
        if (typeof rawopts === 'string') {
          if (this.isLoon()) return rawopts
          else if (this.isQuanX()) return { 'open-url': rawopts }
          else if (this.isSurge()) return { url: rawopts }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return { openUrl, mediaUrl }
          } else if (this.isQuanX()) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            return { 'open-url': openUrl, 'media-url': mediaUrl }
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return { url: openUrl }
          }
        } else {
          return undefined
        }
      }
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts))
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts))
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '==============📣系统通知📣==============']
        logs.push(title)
        subt ? logs.push(subt) : ''
        desc ? logs.push(desc) : ''
        console.log(logs.join('\n'))
        this.logs = this.logs.concat(logs)
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs]
      }
      console.log(logs.join(this.logSeparator))
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
      if (!isPrintSack) {
        this.log('', `❗️${this.name}, 错误!`, err)
      } else {
        this.log('', `❗️${this.name}, 错误!`, err.stack)
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    done(val = {}) {
      const endTime = new Date().getTime()
      const costTime = (endTime - this.startTime) / 1000
      this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
      this.log()
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val)
      }
    }
  })(name, opts)
}

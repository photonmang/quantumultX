/* ziye 

⚠️悦动族
点击  http://yuedongzu.yichengw.cn/?id=37919 下载APP 或者APP Store 搜索悦动族

2.28 制作
3.1 完成
3.1-2 修复前置报错，修复签到问题
3.2 调整抽奖机制，一次运行5次抽奖，抽中1000金币则兑奖
3.2 修复手机不能跑的低级错误,调整提现时间为8点以后
3.2-3 增加10分钟限速，修复用户名判定，修复视频助力
3.3 完善提现判定，修复睡觉，解决资讯赚报错问题
3.4 取消限速

⚠️ 时间设置    0,30 0-23 * * *    每天 25次以上就行 

一 视频助力手动也是不行的 
二 默认20点睡7点醒，时间务必包括这两个点 
(已内置随机udid，添加重写无视多设备检测，如非必要，勿频繁登录)

⚠️一共1个位置 1个ck  👉 2条 Secrets 

多账号换行
第一步 添加Cookie重写脚本：https://raw.githubusercontent.com/photonmang/quantumultX/master/config/Cookie.conf

第二步 ⚠️添加悦动族获取TOKEN重写  

登录悦动族  获取token

yuedongzutokenVal 👉YDZ_yuedongzuTOKEN
CASH  👉  YDZ_CASH     可设置0 0.3 1 5 50 100 200 888  默认0关闭提现，设置888由上至下循环提现

⚠️主机名以及重写👇
hostname=yuedongzu.yichengw.cn,

############## 圈x
#悦动族获取TOKEN
https:\/\/yuedongzu\.yichengw\.cn\/* url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/yuedongzu/yuedongzu.js

############## loon
#悦动族获取TOKEN
http-response https:\/\/yuedongzu\.yichengw\.cn\/* script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/yuedongzu/yuedongzu.js, requires-body=1,max-size=0, tag=悦动族获取TOKEN

############## surge
#悦动族获取TOKEN
悦动族获取TOKEN = type=http-response,pattern=https:\/\/yuedongzu\.yichengw\.cn\/*,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/yuedongzu/yuedongzu.js


*/
const $ = Env("悦动族");
$.idx = ($.idx = ($.getval('yuedongzuSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./yuedongzuCOOKIE") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1 // 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
$.message = '', COOKIES_SPLIT = '', CASH = '', ddtime = '';
CZ = 10
const yuedongzutokenArr = [];
let yuedongzutokenVal = ``;
let middleyuedongzuTOKEN = [];
if ($.isNode()) {
    // 没有设置 YDZ_CASH 则默认为 0 不兑换
    CASH = process.env.YDZ_CASH || 0;
}
if ($.isNode() && process.env.YDZ_yuedongzuTOKEN) {
    COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
    console.log(
        `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
    );
    if (
        process.env.YDZ_yuedongzuTOKEN &&
        process.env.YDZ_yuedongzuTOKEN.indexOf(COOKIES_SPLIT) > -1
    ) {
        middleyuedongzuTOKEN = process.env.YDZ_yuedongzuTOKEN.split(COOKIES_SPLIT);
    } else {
        middleyuedongzuTOKEN = process.env.YDZ_yuedongzuTOKEN.split();
    }
}
if (COOKIE.yuedongzutokenVal) {
    YDZ_COOKIES = {
        "yuedongzutokenVal": COOKIE.yuedongzutokenVal.split('\n'),
    }
    Length = YDZ_COOKIES.yuedongzutokenVal.length;
}
if (!COOKIE.yuedongzutokenVal) {
    if ($.isNode()) {
        Object.keys(middleyuedongzuTOKEN).forEach((item) => {
            if (middleyuedongzuTOKEN[item]) {
                yuedongzutokenArr.push(middleyuedongzuTOKEN[item]);
            }
        });
    } else {
        yuedongzutokenArr.push($.getdata("yuedongzutoken"));
        // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
        if ("yuedongzuCASH") {
            CASH = $.getval("yuedongzuCASH") || '0';
        }
        let yuedongzuCount = ($.getval('yuedongzuCount') || '1') - 0;
        for (let i = 2; i <= yuedongzuCount; i++) {
            if ($.getdata(`yuedongzutoken${i}`)) {
                yuedongzutokenArr.push($.getdata(`yuedongzutoken${i}`));
            }
        }
    }
    if (yuedongzutokenArr == '') {
        Length = 0
    } else Length = yuedongzutokenArr.length
}

function GetCookie() {
    if ($request && $request.url.indexOf("login") >= 0) {
        modifiedHeaders = $request.headers;
        modifiedHeaders['imei'] = udid()
        console.log(JSON.stringify(modifiedHeaders));
        $done({
            headers: modifiedHeaders
        });
    }
    if ($request && $request.url.indexOf("profile") >= 0) {
        const yuedongzutokenVal = $request.headers.Authorization;
        if (yuedongzutokenVal) $.setdata(yuedongzutokenVal, "yuedongzutoken" + $.idx);
        $.log(
            `[${$.name + $.idx}] 获取yuedongzutokenVal✅: 成功,yuedongzutokenVal: ${yuedongzutokenVal}`
        );
        $.msg($.name + $.idx, `获取yuedongzutokenVal: 成功🎉`, ``);
    }
}
console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
    `============ 共 ${Length} 个${$.name}账号=============\n`
);
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
console.log(ddtime)
//当前时间戳
function tts(inputTime) {
    if ($.isNode()) {
        TTS = Math.round(new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000).toString();
    } else TTS = Math.round(new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();
    return TTS;
};
//当前10位时间戳
function ts(inputTime) {
    if ($.isNode()) {
        TS = Math.round((new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
    } else TS = Math.round((new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000) / 1000).toString();
    return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
    if ($.isNode()) {
        DAYTIME =
            new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
    } else DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
    return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    if ($.isNode()) {
        var date = new Date(inputTime + 8 * 60 * 60 * 1000);
    } else var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};
//日期格式化时间戳
function timecs() {
    if ($.isNode()) {
        var date = new Date(newtime).getTime() - 8 * 60 * 60 * 1000
    } else var date = new Date(newtime).getTime()

    return date;
};
//随机udid 大写
function udid() {
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}
//随机udid 小写
function udid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
    GetCookie()
    $.done();
} else {
    !(async () => {
        await all();
        await msgShow();
    })()
    .catch((e) => {
            $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })
}
async function all() {
    if (!Length) {
        $.msg(
            $.name,
            '提示：⚠️请点击前往获取 http://yuedongzu.yichengw.cn/?id=37919\n',
            ' http://yuedongzu.yichengw.cn/?id=37919', {
                "open-url": " http://yuedongzu.yichengw.cn/?id=37919"
            }
        );
        return;
    }
    for (let i = 0; i < Length; i++) {
        if (COOKIE.yuedongzutokenVal) {
            yuedongzutokenVal = YDZ_COOKIES.yuedongzutokenVal[i];
        }
        if (!COOKIE.yuedongzutokenVal) {
            yuedongzutokenVal = yuedongzutokenArr[i];
        }
        header = {
            'store': `appstore`,
            'Authorization': `${yuedongzutokenVal}`,
            'Connection': `keep-alive`,
            'Accept-Encoding': `gzip, deflate, br`,
            'version': `3`,
            'idfa': ``,
            'Content-Type': `application/x-www-form-urlencoded`,
            'User-Agent': `YDZ/20 CFNetwork/1206 Darwin/20.1.0`,
            'platform': `2`,
            'imei': ``,
            'Host': `yuedongzu.yichengw.cn`,
            'Accept-Language': `zh-cn`,
            'Accept': `*/*`
        };
        O = (`${$.name + (i + 1)}🔔`);
        await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`)
        let cookie_is_live = await user(); //用户名
        if (!cookie_is_live) {
            continue;
        }
        //await jinbi_record() //收益记录
        if (CZ >= 10) {
            await help_index() //助力活动
            await home() //首页信息
            await coupon() //签到
            await zhuan_index() //任务列表
            await pophongbaoyu() //红包雨
            await dk_info() //打卡
            await water_info() //喝水
            await sleep_info() //睡觉
            await ggk() //刮刮卡
            await $.wait(8000)
            await lucky() //转盘抽奖
            await $.wait(1000)
            await lucky() //转盘抽奖
            await mystate() //福利
            await kk_list() //看看赚
            await news_info() //资讯赚
            await tixian_html() //提现
        }


    }
}
//通知
function msgShow() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
            await notify.sendNotify($.name, $.message);
        resolve()
    })
}
//用户名
function user(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/user/profile?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 用户名🚩: ${data}`);
                    $.user = JSON.parse(data);
                    if ($.user.uid) {
                        console.log(`\n${O}\n========== ${$.user.username} ==========\n微信绑定：${$.user.wx_username},今日收益：${$.user.day_jinbi/10000}元\n现金余额：${$.user.money}元,累计收益：${$.user.leiji_jinbi/10000}元\n`)
                        $.message += `\n${O}\n========== 【${$.user.username}】 ==========\n【微信绑定】：${$.user.wx_username},今日收益：${$.user.day_jinbi/10000}元\n【现金余额】：${$.user.money}元,累计收益：${$.user.leiji_jinbi/10000}元\n`;
                        resolve(true);
                    }
                    if (!$.user.uid) {
                        $.msg(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        if ($.isNode()) {
                            notify.sendNotify(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        }
                        resolve(false);
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


//收益记录
function jinbi_record(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://yuedongzu.yichengw.cn/apps/user/jinbi_record?`,
                    headers: header,
                    body: `page=1&page_limit=25&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 收益记录🚩: ${data}`);
                        $.jinbi_record = JSON.parse(data);
                        if ($.jinbi_record.code == 200) {
                            if ($.jinbi_record.data && $.jinbi_record.data[0].add_date) {
                                newtime = $.jinbi_record.data[0].add_date + 'T' + $.jinbi_record.data[0].add_time
                                CZ = ((tts() - timecs(newtime)) / 60000).toFixed(0)

                                console.log(`收益记录：距离上次收益${CZ}分钟，已限速10分钟\n`);
                                $.message += `【收益记录】：距离上次收益${CZ}分钟，已限速10分钟\n`;

                            }

                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}


//首页信息
function home(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/home?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页信息🚩: ${data}`);
                    $.home = JSON.parse(data);
                    if ($.home.lucky_jinbi) {
                        console.log(`首页信息：金币：${$.home.lucky_jinbi}金币,金币：${$.home.lucky_jinbi2}金币\n`);
                        $.message += `【首页信息】：金币：${$.home.lucky_jinbi}金币,金币：${$.home.lucky_jinbi2}金币\n`;
                        if ($.home.xuanfu_time) {
                            console.log(`红包等待：${$.home.xuanfu_time}秒\n`);
                            $.message += `【红包等待】：${$.home.xuanfu_time}秒\n`;
                        }
                        if ((!$.home.xuanfu_time || $.home.xuanfu_time <= 0) && $.home.xuanfu_st != 2) {
                            await xuanfu() //首页红包
                        }
                        if ($.home.lucky_jinbi != 0) {
                            lucky_pos = 1
                            await luckycoins() //首页金币1
                        }
                        if ($.home.lucky_jinbi2 != 0) {
                            lucky_pos = 2
                            await luckycoins() //首页金币2
                        }
                        if ($.home.xuanfu_st == 2) {
                            console.log(`首页红包：已完成\n`);
                            $.message += `【首页红包】：已完成\n`;
                        }
                        if ($.home.steps_btn_st == 1) {
                            await donejin() //步数奖励
                        }
                        if ($.home.jinbi > 0) {
                            collsteps() //步数金币
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//步数奖励
function donejin(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/donejin?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 步数奖励🚩: ${data}`);
                    $.donejin = JSON.parse(data);
                    if ($.donejin.code == 200) {
                        console.log(`步数奖励：${$.donejin.tip},${$.donejin.msg}\n`);
                        $.message += `【步数奖励】：${$.donejin.tip},${$.donejin.msg}\n`;
                        nonce_str = $.donejin.nonce_str
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//步数金币
function collsteps(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/collsteps?`,
                headers: header,
                body: `duihuan_dialog=0&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 步数金币🚩: ${data}`);
                    $.collsteps = JSON.parse(data);
                    if ($.collsteps.code == 200) {
                        console.log(`步数金币：${$.collsteps.jinbi}金币,${$.collsteps.msg}\n`);
                        $.message += `【步数金币】：${$.collsteps.jinbi}金币,${$.collsteps.msg}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//首页红包
function xuanfu(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/xuanfu?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页红包🚩: ${data}`);
                    $.xuanfu = JSON.parse(data);
                    if ($.xuanfu.code == 200) {
                        console.log(`首页红包：领取${$.xuanfu.jinbi}金币\n`);
                        $.message += `【首页红包】：领取${$.xuanfu.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//附加处理
function index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/index?`,
                headers: header,
                body: `nonce_str=${nonce_str}&tid=${tid}&pos=${pos}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 附加处理🚩:${data}`);
                    $.index = JSON.parse(data);
                    if ($.index.code == 200) {
                        console.log(`附加处理：成功\n`);
                        //$.message += `【附加处理】：成功\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//前置处理
function chuansj(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/chuansj?`,
                headers: header,
                body: `mini_pos=${mini_pos}&c_type=${c_type}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 前置处理🚩: ${data}`);
                    $.chuansj = JSON.parse(data);
                    if ($.chuansj.code == 200) {
                        console.log(`前置处理：成功\n`);
                        //$.message += `【前置处理】：成功\n`;
                        nonce_str = $.chuansj.nonce_str
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//首页金币
function luckycoins(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/luckycoins?`,
                headers: header,
                body: `lucky_pos=${lucky_pos}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页金币🚩: ${data}`);
                    $.luckycoins = JSON.parse(data);
                    if ($.luckycoins.code == 200) {
                        console.log(`首页金币：成功领取${$.luckycoins.jinbi}金币\n`);
                        $.message += `【首页金币】：成功领取${$.luckycoins.jinbi}金币\n`;
                    }
                    tid = 16
                    pos = 1
                    nonce_str = $.luckycoins.nonce_str
                    await index()
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//红包雨页
function pophongbaoyu(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/pophongbaoyu?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 红包雨页🚩: ${data}`);
                    $.pophongbaoyu = JSON.parse(data);
                    if ($.pophongbaoyu.code == 200) {
                        console.log(`红包雨：剩余${$.pophongbaoyu.hongbaoyu_count}次\n`);
                        $.message += `【红包雨】：剩余${$.pophongbaoyu.hongbaoyu_count}次\n`;
                        if ($.pophongbaoyu.hongbaoyu_count != 0) {
                            await hongbaoyu() //红包雨
                        }
                    }
                    if ($.pophongbaoyu.hongbaoyu_time) {
                        console.log(`红包雨：剩余${$.pophongbaoyu.hongbaoyu_time }秒\n`);
                        $.message += `【红包雨】：剩余${$.pophongbaoyu.hongbaoyu_time }秒\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//红包雨
function hongbaoyu(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://yuedongzu.yichengw.cn/apps/hongbaoyu?`,
                    headers: header,
                    body: `close=(null)&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 红包雨🚩: ${data}`);
                        $.hongbaoyu = JSON.parse(data);
                        if ($.hongbaoyu.code == 200) {
                            console.log(`红包雨：${$.hongbaoyu.jinbi}金币,${$.hongbaoyu.message}\n`);
                            $.message += `【红包雨】：${$.hongbaoyu.jinbi}金币,${$.hongbaoyu.message}\n`;
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//助力活动
function help_index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/help_index?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 助力活动🚩: ${data}`);
                    $.help_index = JSON.parse(data);
                    if ($.help_index.code == 200) {
                        console.log(`助力活动：现金${$.help_index.jinbi}元,差${$.help_index.diff_jinbi}元,时间剩余${($.help_index.time/3600).toFixed(0)}小时\n`);
                        $.message += `【助力活动】：现金${$.help_index.jinbi}元,差${$.help_index.diff_jinbi}元,时间剩余${($.help_index.time/3600).toFixed(0)}小时\n`;
                        nonce_str = $.help_index.nonce_str
                        if ($.help_index.diff_jinbi > 0 && $.help_index.btn_st == 0) {
                            await help_click()
                        } else {
                            console.log(`视频助力：今日已达到上限\n`);
                            $.message += `【视频助力】：今日已达到上限\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//视频助力
function help_click(timeout = 0) {
    return new Promise(async (resolve) => {
        mini_pos = 5
        c_type = 0
        await chuansj()
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/help_click?`,
                headers: header,
                body: `nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 视频助力🚩: ${data}`);
                    $.help_click = JSON.parse(data);
                    if ($.help_click.code == 200) {
                        console.log(`视频助力：${$.help_click.jinbi/10000}元,领取成功\n`);
                        $.message += `【视频助力】：${$.help_click.jinbi/10000}元,领取成功\n`;
                        tid = 15
                        pos = 1
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//提现券页
function coupon(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/coupon?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现券页🚩: ${data}`);
                    $.coupon = JSON.parse(data);
                    if ($.coupon.code == 200) {
                        qds = $.coupon.renwu.find(item => item.text === "今日已签" || item.text === "\u4eca\u65e5\u5df2\u7b7e");
                        if (qds) {
                            console.log(`每日签到：已完成，获得${qds.jinbi}金币\n`)
                            $.message += `【每日签到】：已完成，获得${qds.jinbi}金币\n`;
                        }
                        if (!qds) {
                            await signget() //签到
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//每日签到
function signget(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/sign?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 每日签到🚩: ${data}`);
                    $.signget = JSON.parse(data);
                    if ($.signget.code == 200) {

                        console.log(`每日签到：领取${$.signget.jinbi}金币\n`);
                        $.message += `【每日签到】：领取${$.signget.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//任务列表
function zhuan_index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/zhuan_index?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务列表🚩: ${data}`);
                    $.zhuan_index = JSON.parse(data);
                    if ($.zhuan_index.code == 200) {
                        sps = $.zhuan_index.renwu.find(item => item.type === 5);
                        zxzs = $.zhuan_index.renwu.find(item => item.type === 18);
                        dks = $.zhuan_index.renwu.find(item => item.type === 6);
                        hss = $.zhuan_index.renwu.find(item => item.type === 7);
                        cjs = $.zhuan_index.renwu.find(item => item.type === 8);
                        ggks = $.zhuan_index.renwu.find(item => item.type === 11);
                        bss = $.zhuan_index.renwu.find(item => item.type === 13);
                        rwrw = $.zhuan_index.renwu.find(item => item.st === 1);


                        console.log(`${sps.title}：${sps.text}${sps.jinbi}金币\n${zxzs.title}：${zxzs.text}${zxzs.jinbi}金币\n${dks.title}：${dks.text}${dks.jinbi}金币\n${hss.title}：${hss.text}${hss.jinbi}金币\n${cjs.title}：${cjs.text}${cjs.jinbi}金币\n${ggks.title}：${ggks.text}${ggks.jinbi}金币\n${bss.title}：${bss.text}${bss.jinbi}金币\n`)
                        $.message += `【${sps.title}】：${sps.text}${sps.jinbi}金币\n【${zxzs.title}】：${zxzs.text}${zxzs.jinbi}金币\n【${dks.title}】：${dks.text}${dks.jinbi}金币\n【${hss.title}】：${hss.text}${hss.jinbi}金币\n【${cjs.title}】：${cjs.text}${cjs.jinbi}金币\n【${ggks.title}】：${ggks.text}${ggks.jinbi}金币\n【${bss.title}】：${bss.text}${bss.jinbi}金币\n`

                        if (sps.st == 0) {
                            await ssp() //视频任务
                        }
                        if (rwrw && rwrw.jinbi) {
                            taskid = rwrw.type
                            taskjinbi = rwrw.jinbi
                            await zhuan_done()
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//视频任务
async function ssp() {
    console.log(`视频任务：开始执行\n`);
    $.message += `【视频任务】：开始执行\n`;
    c_type = 0
    mini_pos = 0
    tid = 14
    pos = 1
    await chuansj()
    await index()
}
//早晚打卡页
function dk_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/dk_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 早晚打卡页🚩: ${data}`);
                    $.dk_info = JSON.parse(data);
                    if ($.dk_info.code == 200) {
                        now_time = $.dk_info.now_time
                        console.log(`早晚打卡页：${$.dk_info.day},${$.dk_info.title1}\n`);
                        $.message += `【早晚打卡页】：${$.dk_info.day},${$.dk_info.title1}\n`;
                        if ($.dk_info.is_dk == 0) {
                            await dk_click() //早晚打卡
                        }
                        if ($.dk_info.is_dk == 1) {
                            console.log(`早晚打卡：已完成\n`);
                            $.message += `【早晚打卡】：已完成\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//早晚打卡
function dk_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/dk_click?`,
                headers: header,
                body: `now_time=${now_time}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 早晚打卡🚩: ${data}`);
                    $.dk_click = JSON.parse(data);
                    if ($.dk_click.code == 200) {
                        console.log(`早晚打卡：获得${$.dk_click.jinbi}金币\n`);
                        $.message += `【早晚打卡】：获得${$.dk_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.dk_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//任务达成
function zhuan_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/zhuan_done?`,
                headers: header,
                body: `taskid=${taskid}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务达成🚩: ${data}`);
                    $.zhuan_done = JSON.parse(data);
                    if ($.zhuan_done.code == 200) {
                        console.log(`任务达成：获得${taskjinbi}金币\n`);
                        $.message += `【任务达成】：获得${taskjinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.zhuan_done.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//每天喝水
function water_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/water_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 每天喝水🚩: ${data}`);
                    $.water_info = JSON.parse(data);
                    if ($.water_info.code == 200) {
                        day_num = $.water_info.day_num
                        if ($.water_info.day_num <= 7 && $.water_info.next_time == 0) {
                            await water_click() //开始喝水
                        }
                        if ($.water_info.next_time) {
                            console.log(`每天喝水：已喝${$.water_info.day_num}杯\n`);
                            $.message += `【每天喝水】：已喝${$.water_info.day_num}杯\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//开始喝水
function water_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/water_click?`,
                headers: header,
                body: `day_num=${day_num}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 开始喝水🚩: ${data}`);
                    $.water_click = JSON.parse(data);
                    if ($.water_click.code == 200) {
                        console.log(`${$.water_click.msg}：获得${$.water_click.jinbi}金币\n`);
                        $.message += `【${$.water_click.msg}】：获得${$.water_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.water_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//睡觉状态
function sleep_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/sleep_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 睡觉状态🚩: ${data}`);
                    $.sleep_info = JSON.parse(data);
                    if ($.sleep_info.is_sleep == 1) {
                        console.log(`睡觉状态：做梦中\n`);
                        $.message += `【睡觉状态】：做梦中\n`;
                        if (nowTimes.getHours() === 7) {
                            await sleep_end()
                        }
                    }
                    if ($.sleep_info.is_sleep == 0) {
                        console.log(`睡觉状态：清醒中\n`);
                        $.message += `【睡觉状态】：清醒中\n`;
                        if (nowTimes.getHours() === 20) {
                            await sleep_start()
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//开始睡觉
function sleep_start(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/sleep_start?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 开始睡觉🚩: ${data}`);
                    $.sleep_start = JSON.parse(data);
                    if ($.sleep_start.code == 200) {
                        console.log(`开始睡觉：开始睡觉\n`);
                        $.message += `【开始睡觉】：开始睡觉\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//结束睡觉
function sleep_end(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/sleep_end?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 结束睡觉🚩: ${data}`);
                    $.sleep_end = JSON.parse(data);
                    if ($.sleep_end.code == 200) {
                        console.log(`结束睡觉：结束睡觉，产生${$.sleep_end.jinbi}金币\n`);
                        $.message += `【结束睡觉】：结束睡觉，产生${$.sleep_end.jinbi}金币\n`;
                        taskid = $.sleep_end.taskid
                        nonce_str = $.sleep_end.nonce_str
                        await sleep_done() //睡觉奖励
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//睡觉奖励
function sleep_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/sleep_done?`,
                headers: header,
                body: `taskid=${taskid}&nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 睡觉奖励🚩: ${data}`);
                    $.sleep_done = JSON.parse(data);
                    if ($.sleep_done.code == 200) {
                        console.log(`睡觉奖励：睡觉奖励领取${$.sleep_done.jinbi}金币\n`);
                        $.message += `【睡觉奖励】：睡觉奖励领取${$.sleep_done.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


//刮刮卡
async function ggk() {
    for (let i = 0; i < 5; i++) {
        setTimeout(async () => {
            await gualist()
        }, i * 2000);
    }
}

//刮刮卡列表
function gualist(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/gua/index?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡列表🚩: ${data}`);
                    $.gualist = JSON.parse(data);
                    if ($.gualist.data.ka && $.gualist.data.ka >= 1) {
                        idlist = $.gualist.data.list.find(item => item.is_ad === 0);
                        id = idlist.id
                        console.log(`刮刮卡列表：剩余${$.gualist.data.ka}张，下一张${idlist.jine}元\n`);
                        $.message += `【刮刮卡列表】：剩余${$.gualist.data.ka}张，下一张${idlist.jine}元\n`;
                        await guadet() //刮卡
                    } else {
                        console.log(`刮刮卡列表：剩余${$.gualist.data.ka}张，已完成\n`);
                        $.message += `【刮刮卡列表】：剩余${$.gualist.data.ka}张，已完成\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刮刮卡
function guadet(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {

            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/gua/det?gid=${id}&`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡🚩: ${data}`);
                    $.guadet = JSON.parse(data);

                    if ($.guadet.jine) {
                        guacs = data.match(/x(\d+).png/g).length + 1

                        if (!guacs) {
                            console.log(`【刮刮卡查询】：开启${$.guadet.jine}元,抽中1等奖\n`)
                            $.message += `【刮刮卡查询】：开启${$.guadet.jine}元,抽中1等奖\n`;
                            console.log(`【刮刮卡领取】：成功领奖\n`)
                            $.message += `【刮刮卡领取】：成功领奖\n`;
                            sign = $.guadet.sign
                            glid = $.guadet.glid
                            await guapost() //刮卡奖励
                        }
                        if (guacs) {
                            console.log(`【刮刮卡查询】：开启${$.guadet.jine}元,抽中${guacs}等奖\n`)
                            $.message += `【刮刮卡查询】：开启${$.guadet.jine}元,抽中${guacs}等奖\n`;

                            if (guacs <= 2 && nowTimes.getHours() >= 0 && nowTimes.getHours() <= 17) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else if (guacs <= 3 && nowTimes.getHours() >= 18 && nowTimes.getHours() <= 22) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else if (guacs <= 4 && nowTimes.getHours() == 23) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else {
                                console.log(`【刮刮卡领取】：再来一次\n`)
                                $.message += `【刮刮卡领取】：再来一次\n`;
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刮刮卡奖励
function guapost(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/gua/det_post?`,
                headers: header,
                body: `sign=${sign}&gid=${id}&glid=${glid}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡奖励🚩: ${data}`);
                    $.guapost = JSON.parse(data);
                    if ($.guapost.jf) {
                        console.log(`刮刮卡奖励：获得${$.guapost.jf}金币\n`);
                        $.message += `【刮刮卡奖励】：获得${$.guapost.jf}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.guapost.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//转盘列表
function lucky(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘列表🚩: ${data}`);
                    $.lucky = JSON.parse(data);
                    if ($.lucky.lucky_num) {
                        console.log(`转盘列表：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`);
                        $.message += `【转盘列表】：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`;
                        if ($.lucky.lucky_num >= 1) {
                            await lucky_click() //转盘抽奖
                        }
                    }
                    if ($.lucky && $.lucky.lucky_box.indexOf('1') >= 0) {
                        box = $.lucky.lucky_box.indexOf('1') + 1
                        await lucky_box() //抽奖宝箱
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//转盘抽奖
function lucky_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘抽奖🚩: ${data}`);
                    $.lucky_click = JSON.parse(data);
                    if ($.lucky_click.jinbi) {
                        console.log(`转盘抽奖：获得${$.lucky_click.jinbi}金币\n`);
                        $.message += `【转盘抽奖】：获得${$.lucky_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//抽奖宝箱
function lucky_box(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/lucky_box?`,
                headers: header,
                body: `box=${box}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽奖宝箱🚩: ${data}`);
                    $.lucky_box = JSON.parse(data);
                    if ($.lucky_box.jinbi) {
                        console.log(`抽奖宝箱：获得${$.lucky_box.jinbi}金币\n`);
                        $.message += `【抽奖宝箱】：获得${$.lucky_box.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_box.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//福利查询
function mystate(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/mystate?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 福利查询🚩: ${data}`);
                    $.mystate = JSON.parse(data);
                    if ($.mystate.code == 200) {
                        if ($.mystate.jindan_time) {
                            console.log(`金蛋时间：${$.mystate.jindan_time}秒\n`);
                            $.message += `【金蛋时间】：${$.mystate.jindan_time}秒\n`;
                        }
                        if ($.mystate.box_time) {
                            console.log(`宝箱时间：${$.mystate.box_time}秒\n`);
                            $.message += `【宝箱时间】：${$.mystate.box_time}秒\n`;
                        }
                        if ($.mystate.jindan_st == 0) {
                            await jindan_click() //金蛋
                        }
                        if ($.mystate.box_st == 0) {
                            await box_click() //宝箱
                        }
                        if ($.mystate.jindan_st == 2) {
                            console.log(`金蛋福利：已完成\n`);
                            $.message += `【金蛋福利】：已完成\n`;
                        }
                        if ($.mystate.box_st == 2) {
                            console.log(`宝箱福利：已完成\n`);
                            $.message += `【宝箱福利】：已完成\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//金蛋前置
function jindan_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/jindan_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 金蛋前置🚩: ${data}`);
                    $.jindan_click = JSON.parse(data);
                    if ($.jindan_click.code == 200) {
                        taskid = $.jindan_click.taskid
                        nonce_str = $.jindan_click.nonce_str
                        await jindan_done() //福利金蛋
                    }
                    if ($.jindan_click.code == -1) {
                        console.log(`福利金蛋：已完成\n`);
                        $.message += `【福利金蛋】：已完成\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//福利金蛋
function jindan_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://bububao.duoshoutuan.com/apps/jindan_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利金蛋🚩: ${data}`);
                        $.jindan_done = JSON.parse(data);
                        if ($.jindan_done.code == 1) {
                            console.log(`福利金蛋：${$.jindan_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利金蛋】：${$.jindan_done.jinbi}金币,领取成功\n`;
                            nonce_str = $.jindan_done.nonce_str
                            tid = 16
                            pos = 1
                            await callback()
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//宝箱前置
function box_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/box_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 宝箱前置🚩: ${data}`);
                    $.box_click = JSON.parse(data);
                    if ($.box_click.code == 200) {
                        taskid = $.box_click.taskid
                        nonce_str = $.box_click.nonce_str
                        await box_done() //福利宝箱
                    }
                    if ($.box_click.code == -1) {
                        console.log(`福利宝箱：已完成\n`);
                        $.message += `【福利宝箱】：已完成\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//福利宝箱
function box_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://bububao.duoshoutuan.com/apps/box_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利宝箱🚩: ${data}`);
                        $.box_done = JSON.parse(data);
                        if ($.box_done.code == 1) {
                            console.log(`福利宝箱：${$.box_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利宝箱】：${$.box_done.jinbi}金币,领取成功\n`;
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//看看赚列表
function kk_list(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_list?`,
                headers: header,
                body: `page=1&page_limit=25&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚列表🚩: ${data}`);
                    $.kk_list = JSON.parse(data);
                    is_ok = $.kk_list.data.find(item => item.is_ok === 0);
                    if (is_ok) {
                        id = is_ok.id
                        console.log(`看看赚列表：下个任务：${is_ok.mini_name}\n`);
                        $.message += `【看看赚列表】：下个任务：${is_ok.mini_name}\n`;
                        await kk_click() //看看赚执行
                    } else {
                        console.log(`看看赚：已完成\n`);
                        $.message += `【看看赚】：已完成\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//看看赚执行
function kk_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_click?`,
                headers: header,
                body: `mini_id=${id}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚执行🚩: ${data}`);
                    $.kk_click = JSON.parse(data);
                    if ($.kk_click.taskid) {
                        console.log(`看看赚执行：下个任务：${$.kk_click.mini_str}\n`);
                        $.message += `【看看赚执行】：下个任务：${$.kk_click.mini_str}\n`;
                        taskid = $.kk_click.taskid
                        nonce_str = $.kk_click.nonce_str
                        await $.wait(15000)
                        await kk_kk() //看看上传
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//看看赚上传
function kk_kk(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://hunter-report.dui88.com/tuiaExtLog?group=1&type=9&json=%7B%22subtype%22%3A%22head%22%2C%22tck_rid_6c8%22%3A%220a56e7aaklm541ew-6681973%22%2C%22slotId%22%3A%22353024%22%2C%22activityId%22%3A%2216765%22%2C%22consumerId%22%3A%2226444115908%22%2C%22timestamp%22%3A${tts()}%7D`,
                headers: {
                    "Host": "hunter-report.dui88.com"
                },
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚上传🚩: ${data}`);
                    $.kk_kk = JSON.parse(data);
                    console.log(`看看赚：${$.kk_kk.msg}\n`);
                    $.message += `【看看赚】：${$.kk_kk.msg}\n`;
                    await $.wait(30000)
                    await kk_done() //看看赚完成
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//看看赚完成
function kk_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://bububao.duoshoutuan.com/apps/kk_done?`,
                headers: header,
                body: `taskid=${taskid}&nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 看看赚完成🚩: ${data}`);
                    $.kk_done = JSON.parse(data);
                    if ($.kk_done.code == 200) {
                        console.log(`看看赚完成：获得${$.kk_done.jinbi}金币\n`);
                        $.message += `【看看赚完成】：获得${$.kk_done.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.kk_done.fb_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//资讯赚页
function news_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/news_info?`,
                headers: header,
                body: `type_class=1&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚页🚩: ${data}`);
                    $.news_info = JSON.parse(data);
                    if ($.news_info.code == 200) {
                        console.log(`资讯赚页：今日获得${$.news_info.jinbi}金币\n`);
                        $.message += `【资讯赚页】：今日获得${$.news_info.jinbi}金币\n`;
                        if ($.news_info.jinbi < 1000) {
                            nonce_str = $.news_info.nonce_str
                            await news_done() //资讯赚
                        }
                        if ($.news_info.jinbi >= 1000) {
                            console.log(`资讯赚：完成\n`);
                            $.message += `【资讯赚】：完成\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//资讯赚
function news_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/news_done?`,
                headers: header,
                body: `nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚🚩: ${data}`);
                    $.news_done = JSON.parse(data);
                    if ($.news_done.jinbi) {
                        console.log(`资讯赚：获得${$.news_done.jinbi}金币\n`);
                        $.message += `【资讯赚】：获得${$.news_done.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//提现页
function tixian_html(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/user/tixian_html?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现页🚩: ${data}`);
                    $.tixian_html = JSON.parse(data);
                    if ($.tixian_html.tixian_html) {
                        jine1 = $.tixian_html.tixian_html.find(item => item.jine === '0.3');
                        jine2 = $.tixian_html.tixian_html.find(item => item.jine === '1');
                        jine3 = $.tixian_html.tixian_html.find(item => item.jine === '5');
                        jine4 = $.tixian_html.tixian_html.find(item => item.jine === '50');
                        jine5 = $.tixian_html.tixian_html.find(item => item.jine === '100');
                        jine6 = $.tixian_html.tixian_html.find(item => item.jine === '200');
                        day_tixian_tip = $.tixian_html.tixian_html.find(item => item.day_tixian_tip);
                        if (day_tixian_tip) {
                            console.log(`提现查询：今日已提现\n`);
                            $.message += `【提现查询】：今日已提现\n`;
                        }
                        console.log(`提现券：剩余${$.tixian_html.tixian_coupon}张券\n${jine2.jine}元：需要${jine2.cond}张券\n${jine3.jine}元：需要${jine3.cond}张券\n`);
                        $.message += `【提现券】：剩余${$.tixian_html.tixian_coupon}张券\n【${jine2.jine}元】：需要${jine2.cond}张券\n【${jine3.jine}元】：需要${jine3.cond}张券\n`;
                        if (!day_tixian_tip && nowTimes.getHours() >= 8 && ($.user.wx_username != "" || $.user.is_weixin == 1)) {
                            if (CASH == 0.3 && $.user.money >= CASH && $.user.day_jinbi >= 6000) {
                                await tixian() //提现
                            }
                            if (CASH == 1 && $.tixian_html.tixian_coupon >= 8 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH == 5 && $.tixian_html.tixian_coupon >= 30 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH > 5 && CASH <= 200 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH == 888) {
                                if ($.user.money >= 200) {
                                    CASH = 200
                                } else if ($.user.money >= 100) {
                                    CASH = 100
                                } else if ($.user.money >= 50) {
                                    CASH = 50
                                } else if ($.user.money > 5 && $.tixian_html.tixian_coupon >= 30) {
                                    CASH = 5
                                } else if ($.user.money > 1 && $.tixian_html.tixian_coupon >= 8) {
                                    CASH = 1
                                } else if ($.user.money > 5 && $.user.day_jinbi >= 6000) {
                                    CASH = 0.3
                                }
                                if (CASH != 888) {
                                    await tixian() //提现
                                }
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//现金提现
function tixian(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://yuedongzu.yichengw.cn/apps/user/tixian?`,
                headers: header,
                body: `tx=${CASH}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 现金提现🚩: ${data}`);
                    $.tixian = JSON.parse(data);
                    if ($.tixian.code == 200) {
                        console.log(`现金提现${CASH}：${$.tixian.tip}\n`);
                        $.message += `【现金提现${CASH}】：${$.tixian.tip}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, ``).trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``;
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, ``) : e
                } catch (t) {
                    e = ``
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length)));
            return t
        }
        msg(e = t, s = ``, i = ``, r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}

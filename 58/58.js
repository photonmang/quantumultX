/*
作者：photonmang
转载请注明出处，谢谢！

请通过作者链接下载58同城助力作者：
https://wxyuzltongzhen.ganji.com/magicminers/web/v/invitepagenew/bingychoric?identity=710CBB19DC84EB18E391C02A1F56150C0472CC8C1DDBAC1454C2F1F4A240404C738C6E0CFBF8765A9E8951279B4EBB37&source=tc&pid=1936&invitetype=8&platform=m&targetpage=home

更新：
2021-3-17   新增看视频
2021-3-18   新增早起报名、早起打卡、每日收矿
2021-3-19   新增低价竞拍；神奇旷工：自动召唤矿工、自动收取矿石
2021-3-20   新增看视频领现金（每天共10次）
2021-3-21   新增发财树浇水领现金活动
2021-3-22   新增首页签到；发财树：快速集水滴、翻倍领水滴、升级奖励领取
2021-3-23   新增神奇矿：三日早起打卡报名、三日早起打卡；发财树：每日礼包、浇水领水滴、开红包领水滴、看视频领水滴、开任务红包1-2领水滴；修复升级红包BUG
2021-3-24   新增租金签到、首页签到看视频赢矿石活动;修复发财树活动BUG、调整执行逻辑顺序
2021-3-25   新增发财树：大转盘（需到转盘页面先执行一次转盘获取Cookie）;增加自动判断矿工滑块验证，修复每过一段时间收矿需要手工验证的问题
2021-3-26   新增神奇矿石自动收取2次免费矿、自动收取剩余6次视频矿
2021-3-27   新增发财树：签到领水滴、修复看视频领水滴


[mitm]
hostname = magicisland.58.com,xzd.hswchangdu.com,ftoy-api.58.com
#圈x
[rewrite local]
https://magicisland.58.com/web/share/getShareUserInfo url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js
https://xzd.hswchangdu.com/activityTreeMoney/watering url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js
https://ftoy-api.58.com/wapi/zf_points_mall/api_sign_in? url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js
https://xzd.hswchangdu.com/lotteryMachine/drawGoods? url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js

#loon
http-request https://magicisland.58.com/web/share/getShareUserInfo script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js, requires-body=true, timeout=10, tag=58同城
http-request https://xzd.hswchangdu.com/activityTreeMoney/watering script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js, requires-body=true, timeout=10, tag=58同城
https://ftoy-api.58.com/wapi/zf_points_mall/api_sign_in? script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js, requires-body=true, timeout=10, tag=58同城
https://xzd.hswchangdu.com/lotteryMachine/drawGoods? script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js, requires-body=true, timeout=10, tag=58同城

#surge
58同城神奇矿 = type=http-request,pattern=https://magicisland.58.com/web/share/getShareUserInfo,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js,script-update-interval=0
58同城发财树 = type=http-request,pattern=https://xzd.hswchangdu.com/activityTreeMoney/watering,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js,script-update-interval=0
58同城租金 = type=http-request,pattern=https://ftoy-api.58.com/wapi/zf_points_mall/api_sign_in?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js,script-update-interval=0
58同城大转盘 = type=http-request,pattern=https://xzd.hswchangdu.com/lotteryMachine/drawGoods?,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/58/58.js,script-update-interval=0

---------------------------------------
Cookie获取方式：
矿石获取步骤==>我的，神奇矿，进入页面自动获取
发财树获取步骤==>我的，领奖励金，种颗发财树,点击浇水，自动获取浇水CK

运行方式建议每小时一次运行。

*/

const photonmang = '58同城'
const $ = Env(photonmang)
const notify = $.isNode() ? require('./sendNotify') : '';
let status, day3, treeLevel, taskConfigId, treeID, sessionID,treesignType,treesignID;
let ks1, ks2, ks3, ks4, ks5, ksId1, ksId2, ksId3, ksId4, ksId5, ksId6, ksId7, ksId8
let ore = 0.1;
status = (status = ($.getval("wbtcstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
const wbtcurlArr = [], wbtcArr = []
let wbtc = $.getdata('wbtc')
let zsheader = $.getdata('zsheader')
let zjheader = $.getdata('zjheader')
let dzpheader = $.getdata('dzpheader')
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const logs = 0;//0为关闭日志，1为开启
var hour = ''
var minute = ''
if ($.isNode()) {
    hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
    minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
    hour = (new Date()).getHours();
    minute = (new Date()).getMinutes();
}
//CK运行
let iswbtcck = typeof $request !== 'undefined'
if (iswbtcck) {
    wbtcck();
    $.done()
}
if ($.isNode()) {
    if (process.env.wbtcURL && process.env.wbtcURL.indexOf('#') > -1) {
        wbtcurl = process.env.wbtcURL.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    }
    else if (process.env.wbtcURL && process.env.wbtcURL.indexOf('\n') > -1) {
        wbtcurl = process.env.wbtcURL.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        wbtcurl = process.env.wbtcURL.split()
    };
    if (process.env.wbtc && process.env.wbtc.indexOf('#') > -1) {
        wbtc = process.env.wbtc.split('#');
        console.log(`您选择的是用"#"隔开\n`)
    }
    else if (process.env.wbtc && process.env.wbtc.indexOf('\n') > -1) {
        wbtc = process.env.wbtc.split('\n');
        console.log(`您选择的是用换行隔开\n`)
    } else {
        wbtc = process.env.wbtc.split()
    };
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
} else {
    wbtcurlArr.push($.getdata('wbtcurl'))
    wbtcArr.push($.getdata('wbtc'))
    let wbtccount = ($.getval('wbtccount') || '1');
    for (let i = 2; i <= wbtccount; i++) {
        wbtcurlArr.push($.getdata(`wbtcurl${i}`))
        wbtcArr.push($.getdata(`wbtc${i}`))
    }
}
!(async () => {
    if (!wbtcurlArr[0] && !wbtcArr[0]) {
        $.msg($.name, '【提示】请先获取58同城一cookie')
        return;
    }
    console.log(`------------- 共${wbtcArr.length}个账号----------------\n`)
    for (let i = 0; i < wbtcArr.length; i++) {
        if (wbtcArr[i]) {
            message = ''
            wbtcurl = wbtcurlArr[i];
            wbtc = wbtcArr[i];
            $.index = i + 1;
            console.log(`\n开始【58同城${$.index}】`)
            await detailinfo()  //早起列表
            await TreeGetConfig()  //智慧树信息

            if (new Date().getHours() == 1) {
                await sign() //神奇矿签到
                await websign() //首页签到
                //await taskore() //获取首页签到最大视频奖励值
                await mineral() //首页收取矿石
                await attendance() //早起报名
                await multiDay() //三日早起报名
                await reward_video_ks() //神奇矿6次收矿视频
                await strangerInfo()  //获取偷矿ID
                await stealStranger() //偷矿
            }
            if (new Date().getHours() <= 7) {
                await reward_video() //8次视频打卡
            }
            if (new Date().getHours() == 5) {
                await attendance_attend() //早起打卡
                await multiDay_end() //三日早起打卡
            }
            if (
                new Date().getHours() == 7 ||
                new Date().getHours() == 9 ||
                new Date().getHours() == 11 ||
                new Date().getHours() == 13 ||
                new Date().getHours() == 15 ||
                new Date().getHours() == 17 ||
                new Date().getHours() == 19 ||
                new Date().getHours() == 21 ||
                new Date().getHours() == 23
            ) {
                await auction() //低价竞拍
            }
            //await captchaConfiguration() //刷新滑块验证
            await mining()  //获取神奇矿工列表
            if (ks1 != "") {
                await gain()    //收取神奇矿工矿石
            }
            await enroll()  //召唤神奇矿工 
            if (new Date().getHours() == 8) {
                await gameprocessore() //游戏赚矿石任务
                await receiveDayWelfare() //每日礼包
            }
            if ((new Date().getHours() >= 9) &&
                (new Date().getHours() <= 18)
            ) {
                await reward_video_xj() //看视频领现金
            }
            await receiveUpgrade() //升级奖励领取
            if (new Date().getHours() == 16) {
                await Taskvideo()  // 看视频领水滴
                await $.wait(1000);
                await receiveUpgradeSpeed()  //开任务红包1-2领水滴
                await $.wait(1000);
                await Taskjs()   // 浇水领水滴
                await $.wait(1000);
            }
            await receiveSign() //签到领水滴
            await $.wait(1000);
            await Taskred()   // 开红包领水滴
            await $.wait(1000);
            await quickenBottle() //快速集水滴
            await $.wait(1000);
            await receiveBottle() //翻倍水滴领取
            await $.wait(1000);
            await watering()  //发财树浇水
            if (new Date().getHours() <= 10) {
            await $.wait(1000);
            await drawLuck_dzp() //大转盘
            }
            if (new Date().getHours() == 8) {
                await api_sign_in() //租金签到
            } 
            if (new Date().getHours() == 1 ||
                new Date().getHours() <= 8) {
            await orevideo()   //首页签到看视频领额外矿石奖励
            }
            await showmsg()
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

//获取cookie   
function wbtcck() {
    if ($request && $request.url.indexOf("getShareUserInfo") >= 0) {
        const wbtc = JSON.stringify($request.headers)
        if (wbtc) $.setdata(wbtc, `wbtc${status}`)
        $.log(`[${photonmang}] header请求: 成功,wbtc: ${wbtc}`)
        $.msg(`[${photonmang}] header${status}: 成功🎉`, ``)
    }
    if ($request && $request.url.indexOf("watering") >= 0) {
        const zsheader = JSON.stringify($request.headers)
        if (zsheader) $.setdata(zsheader, `zsheader${status}`)
        $.log(`[${photonmang}] 发财树header请求: 成功,zsheader: ${zsheader}`)
        $.msg(`[${photonmang}] 发财树header${status}: 成功🎉`, ``)
    }
    if ($request && $request.url.indexOf("api_sign_in") >= 0) {
        const zjheader = JSON.stringify($request.headers)
        if (zjheader) $.setdata(zjheader, `zjheader${status}`)
        $.log(`[${photonmang}] 租金header请求: 成功,zsheader: ${zjheader}`)
        $.msg(`[${photonmang}] 租金header${status}: 成功🎉`, ``)
    }
    if ($request && $request.url.indexOf("drawGoods") >= 0) {
        const dzpheader = JSON.stringify($request.headers)
        if (dzpheader) $.setdata(dzpheader, `dzpheader${status}`)
        $.log(`[${photonmang}] 大转盘header请求: 成功,dzpheader: ${dzpheader}`)
        $.msg(`[${photonmang}] 大转盘header${status}: 成功🎉`, ``)
    }
}

//获取时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
Y = nowTimes.getFullYear();
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1);
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
ddtime1 = Y + M + (D + 1);

/*-------------------租金签到领现金部分---------------------------*/

//租金签到
async function api_sign_in() {
    return new Promise((resolve) => {
        let api_sign_in_url = {
            url: `https://ftoy-api.58.com/wapi/zf_points_mall/api_sign_in`,
            headers: JSON.parse(zjheader),
            body: ``
        }
        $.get(api_sign_in_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.result.code == 0) {
                        message += `【租金签到】:${result.result.data.checkMsg}\n`
                    } else {
                        message += `【租金签到】:${result.result.message}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

/*-------------------发财树浇水领现金部分---------------------------*/

// 大转盘
async function drawLuck_dzp() {
    return new Promise((resolve) => {
        let drawLuck_dzp_url = {
            url: `https://xzd.hswchangdu.com/lotteryMachine/drawLuck`,
            headers: JSON.parse(dzpheader),
            body: `activityNo=49_2021-01-27_kugx_20210324&strategyId=848`
        }
        $.post(drawLuck_dzp_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【大转盘】:摇中${result.data.prizeName}\n`
                    } else {
                        message += `【大转盘】:${result.desc}\n`
                    }
                    await $.wait(1000);
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//签到领水滴
async function receiveSign() {
    return new Promise((resolve) => {
        let receiveSign_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/receiveSign`,
            headers: JSON.parse(zsheader),
            body: `{"taskType":${treesignType},"taskConfigId":${treesignID}}`
        }
        $.post(receiveSign_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                        if (result.code == 0) {
                            message += `【签到领水滴】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                        } else {
                            message += `【签到领水滴】:${result.desc}\n`
                        }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//获取智慧树信息
async function TreeGetConfig() {
    return new Promise((resolve) => {
        let TreeGetConfig_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/getConfig`,
            headers: JSON.parse(zsheader),
            body: ``
        }
        $.get(TreeGetConfig_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        treeLevel = result.data.treeConfig.upgradeReward.taskType
                        taskConfigId = result.data.treeConfig.upgradeReward.taskConfigId
                        treeID = result.data.treeConfig.treeId
                        treesignType= result.data.nextSignTask.taskType
                        treesignID=result.data.nextSignTask.taskConfigId

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//智慧树升级红包
async function receiveUpgrade() {
    return new Promise((resolve) => {
        let receiveUpgrade_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/receiveUpgrade`,
            headers: JSON.parse(zsheader),
            body: `{"taskType":${treeLevel},"taskConfigId":${taskConfigId},"treeId":${treeID}}`
        }
        $.post(receiveUpgrade_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `-----------------------------\n` +
                            `【升级红包】:${result.data.rewardList[0].rewardName}${result.data.rewardList[0].rewardNum}\n`
                    } else {
                        message += `-----------------------------\n` +
                            `【升级红包】:${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

// 开任务红包1-2领水滴
async function receiveUpgradeSpeed() {
    return new Promise((resolve) => {
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
            const TaskRedList = [`{"taskType":1,"taskConfigId":737}`, `{"taskType":2,"taskConfigId":738}`]
            let receiveUpgradeSpeed_url = {
                url: `https://xzd.hswchangdu.com/activityTask/receiveUpgradeSpeed`,
                headers: JSON.parse(zsheader),
                body: `${TaskRedList[i]}`
            }
            $.post(receiveUpgradeSpeed_url, async (error, response, data) => {
                try {
                    if (error) {
                        console.log("⛔️API查询请求失败❌ ‼️‼️");
                        console.log(JSON.stringify(error));
                        $.logErr(error);
                    } else {
                        const result = JSON.parse(data)
                        if (logs) $.log(data)
                        if (result.code == 0) {
                            message += `【任务红包${i + 1}】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                        } else {
                            message += `【任务红包${i + 1}】:${result.desc}\n`
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            })
            }, i * 100);
        }
    })
}

// 看视频领水滴
async function Taskvideo() {
    return new Promise((resolve) => {
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
            const TaskList = ["finishTask", "receiveTaskList"]
            let Taskvideo_url = {
                url: `https://xzd.hswchangdu.com/activityTask/${TaskList[i]}`,
                headers: JSON.parse(zsheader),
                body: `{"taskType":101,"taskConfigId":740}`
            }
            $.post(Taskvideo_url, async (error, response, data) => {
                try {
                    if (error) {
                        console.log("⛔️API查询请求失败❌ ‼️‼️");
                        console.log(JSON.stringify(error));
                        $.logErr(error);
                    } else {
                        const result = JSON.parse(data)
                        if (logs) $.log(data)
                        if ((result.code == 0) && (i == 1)) {
                            message += `【看视频领水滴】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                        } else if ((result.code == 300515) && (i == 1)) {
                            message += `【看视频领水滴】:${result.desc}\n`
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            })
            }, i * 100);
        }
    })
}

// 开红包领水滴
async function Taskred() {
    return new Promise((resolve) => {
        let Taskred_url = {
            url: `https://xzd.hswchangdu.com/activityTask/receiveTaskList`,
            headers: JSON.parse(zsheader),
            body: `{"taskType":102,"taskConfigId":741}`
        }
        $.post(Taskred_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【开红包领水滴】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                    } else {
                        message += `【开红包领水滴】:${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

// 浇水领水滴
async function Taskjs() {
    return new Promise((resolve) => {
        let Taskjs_url = {
            url: `https://xzd.hswchangdu.com/activityTask/receiveTaskList`,
            headers: JSON.parse(zsheader),
            body: `{"taskType":103,"taskConfigId":742}`
        }
        $.post(Taskjs_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【浇水领水滴】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                    } else {
                        message += `【浇水领水滴】:${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

// 每日礼包
async function receiveDayWelfare() {
    return new Promise((resolve) => {
        let receiveDayWelfare_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/receiveDayWelfare`,
            headers: JSON.parse(zsheader),
            body: ``
        }
        $.post(receiveDayWelfare_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【每日礼包】:${result.data.rewardList[0].rewardName}:${result.data.rewardList[0].rewardNum}\n`
                    } else {
                        message += `【每日礼包】:${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//快速集水滴
async function quickenBottle() {
    return new Promise((resolve) => {
        let quickenBottle_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/quickenBottle`,
            headers: JSON.parse(zsheader),
            body: `{"treeId":${treeID}}`
        }
        $.post(quickenBottle_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【快速集水滴】:${result.desc}\n`
                    } else {
                        message += `【快速集水滴】:失败!${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//翻倍领水滴
async function receiveBottle() {
    return new Promise((resolve) => {
        let receiveBottle_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/receiveBottle`,
            headers: JSON.parse(zsheader),
            body: `{"treeId":${treeID},"multiple":1}`
        }
        $.post(receiveBottle_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【翻倍水滴】:40g,剩余水滴:${result.data.usableEnergy}\n`
                    } else {
                        message += `【翻倍水滴】:失败!${result.desc}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//浇水
async function watering() {
    return new Promise((resolve) => {
        let watering_url = {
            url: `https://xzd.hswchangdu.com/activityTreeMoney/watering`,
            headers: JSON.parse(zsheader),
            body: `{"treeId":${treeID}}`
        }
        $.post(watering_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【浇水】:成功,剩余水滴:${result.data.usableEnergy}\n` +
                            `【等级】：${result.data.treeConfig.treeTag}\n` +
                            `【状态】：${result.data.treeConfig.wateringTips}\n` +
                            `【进度】：${result.data.treeConfig.upUpgradeRewardTips}\n` +
                            `-----------------------------\n`
                    } else {
                        message += `【浇水】:失败${result}\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}


/*-------------------会员领奖励金部分---------------------------*/

//领现金看视频
async function reward_video_xj() {
    return new Promise((resolve) => {
        let reward_url = {
            url: `https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/`,
            headers: { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WUBA/10.12.1` },
            body: `${videobody[2]}`
        }
        $.post(reward_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    message += `【领现金看视频】：刷新成功\n`
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

/*-------------------神奇矿部分---------------------------*/

//首页签到
async function websign() {
    return new Promise((resolve) => {
        let websign_url = {
            url: `https://magicisland.58.com/web/sign/signInfo`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(websign_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【首页签到成功】：增加${result.result.cardInfo[new Date().getDay()].oreValue}矿石\n`
                    } else {
                        message += `【首页签到失败】：` + result.message + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//签到视频赢矿石

async function taskore() {
    return new Promise((resolve) => {
        while (ore < 0.5) {
            let taskore_url = {
                url: `https://magicisland.58.com/web/video/task/ore`,
                headers: JSON.parse(wbtc),
                body: ``
            }
            $.get(taskore_url, async (error, response, data) => {
                try {
                    if (error) {
                        console.log("⛔️API查询请求失败❌ ‼️‼️");
                        console.log(JSON.stringify(error));
                        $.logErr(error);
                    } else {
                        const result = JSON.parse(data)
                        if (logs) $.log(data)

                        ore = result.result.ore

                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            })
        }
    })
}



//神奇矿签到
async function sign() {
    return new Promise((resolve) => {
        let sign_in_url = {
            url: `https://magicisland.58.com/web/sign/signInV2?sessionId=&successToken=&scene=58home`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.post(sign_in_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【神奇矿签到】：` + result.message + `,获得：` + result.result.amount + `矿石` + `\n`
                    } else {
                        message += `【神奇矿签到】：` + result.message + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//游戏赚矿石
async function gameprocessore() {
    return new Promise((resolve) => {
        let gameprocessore_url = {
            url: `https://magicisland.58.com/web/mineral/gameprocessore`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(gameprocessore_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.result.state == 0) {
                        message += `【游戏赚矿石】：` + result.message + `\n`
                    } else {
                        message += `【游戏赚矿石】：` + result.message + `\n`
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//召唤矿工
async function enroll() {
    return new Promise((resolve) => {
        let enroll_url = {
            url: `https://magicisland.58.com/web/mining/enroll`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(enroll_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.result.state == 0) {
                        message += `【召唤矿工】：` + result.result.message + `\n`
                    } else {
                        message += `【召唤矿工】：` + result.message + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//获取矿山滑块验证
async function captchaConfiguration() {
    return new Promise((resolve) => {
        let captchaConfiguration_url = {
            url: `https://magicisland.58.com/web/mineral/exchange/captchaConfiguration`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(captchaConfiguration_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (result.result.status == 2)
                        sessionID = result.result.sessionId
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//获取矿石列表
async function mining() {
    return new Promise((resolve) => {
        let mining_url = {
            url: `https://magicisland.58.com/web/mining/userInfo`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(mining_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (result.result.status == 2) {

                        ks1 = result.result.grantList[0].id
                        ks2 = result.result.grantList[1].id
                        ks3 = result.result.grantList[2].id
                        ks4 = result.result.grantList[3].id
                        ks5 = result.result.grantList[4].id
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//收取矿石
async function gain() {
    return new Promise((resolve) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
            const ksid = [`${ks1}`, `${ks2}`, `${ks3}`, `${ks4}`, `${ks5}`]
            let gain_url = {
                url: `https://magicisland.58.com/web/mining/gain?id=${ksid[i]}`,
                headers: JSON.parse(wbtc),
                body: ``
            }
            $.get(gain_url, async (error, response, data) => {
                try {
                    if (error) {
                        console.log("⛔️API查询请求失败❌ ‼️‼️");
                        console.log(JSON.stringify(error));
                        $.logErr(error);
                    } else {
                        const result = JSON.parse(data)
                        if (logs) $.log(data)
                        if (result.code == 0) {
                            message += `【获取矿石${i + 1}】：` + result.result.gainOre + `矿石\n`
                        }

                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            })
         }, i * 200);
        }
    })
}

//获取矿山偷矿ID
async function strangerInfo() {
    return new Promise((resolve) => {
        let strangerInfo_url = {
            url: `https://magicisland.58.com/web/mining/strangerInfo`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(strangerInfo_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (result.code == 0) {

                        ksId1 = result.result.strangerList[0].id
                        ksId2 = result.result.strangerList[1].id
                        ksId3 = result.result.strangerList[2].id
                        ksId4 = result.result.strangerList[3].id
                        ksId5 = result.result.strangerList[4].id
                        ksId6 = result.result.strangerList[5].id
                        ksId7 = result.result.strangerList[6].id
                        ksId8 = result.result.strangerList[7].id
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}


//偷取矿石
async function stealStranger() {
    return new Promise((resolve) => {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
            const ksIds = [`${ksId1}`, `${ksId2}`, `${ksId3}`, `${ksId4}`, `${ksId5}`, `${ksId6}`, `${ksId7}`, `${ksId8}`]
            let stealStranger_url = {
                url: `https://magicisland.58.com/web/mining/stealStranger?id=${ksIds[i]}`,
                headers: JSON.parse(wbtc),
                body: ``
            }
            $.get(stealStranger_url, async (error, response, data) => {
                try {
                    if (error) {
                        console.log("⛔️API查询请求失败❌ ‼️‼️");
                        console.log(JSON.stringify(error));
                        $.logErr(error);
                    } else {
                        const result = JSON.parse(data)
                        if (logs) $.log(data)
                        if (result.result.ore != null) {
                            message += `【偷取矿石${i + 1}】：${result.result.message},偷取${result.result.ore}矿石\n`
                        } else {
                            message += `【偷取矿石${i + 1}】：${result.result.message}\n`
                        }
                    }
                } catch (e) {
                    $.logErr(e, response);
                } finally {
                    resolve();
                }
            })
            }, i * 200);
        }
    })
}



//低价竞拍
async function auction() {
    return new Promise((resolve) => {
        var num = Math.floor(Math.random() * 3 + 1);
        let auction_url = {
            url: `https://magicisland.58.com/web/auction/bid`,
            headers: JSON.parse(wbtc),
            body: `ore=${num}`
        }
        $.post(auction_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【低价竞拍】：` + result.message + `,报名花费：${num}矿石` + `\n`
                    } else {
                        message += `【低价竞拍】：` + result.message + `\n`
                        //await auction();
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}
//获取报名信息
async function detailinfo() {
    return new Promise((resolve) => {
        let detailinfo_url = {
            url: `https://magicisland.58.com/web/attendance/detail/info?productorid=3`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(detailinfo_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        day3 = result.result.infoList[1].number
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}
//三日早起报名
async function multiDay() {
    return new Promise((resolve) => {

        let multiDay_url = {
            url: `https://magicisland.58.com/web/attendance/signIn`,
            headers: JSON.parse(wbtc),
            body: `number=${day3}&category=multiDay&productorid=3`
        }
        $.post(multiDay_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【三日打卡挑战报名】：${result.message}\n`
                    } else {
                        message += `【三日打卡挑战报名】：重复报名！` + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//三日早起打卡
async function multiDay_end() {
    return new Promise((resolve) => {

        let multiDay_end_url = {
            url: `https://magicisland.58.com/web/attendance/attend`,
            headers: JSON.parse(wbtc),
            body: `productorid=3&numberMany=${day3}`
        }
        $.post(multiDay_end_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【三日早起打卡】：${result.result.message},还需要打卡：${result.result.needAttendDays}天\n`
                    } else {
                        message += `【三日早起打卡】：重复打卡！` + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//早起报名
async function attendance() {
    return new Promise((resolve) => {
        let attendance_url = {
            url: `https://magicisland.58.com/web/attendance/signIn`,
            headers: JSON.parse(wbtc),
            body: `number=${ddtime1}&category=oneDay&productorid=3`
        }
        $.post(attendance_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【早起打卡报名】：` + result.message + `,报名花费：` + result.result.averageRewardOre + `矿石` + `\n`
                    } else {
                        message += `【早起打卡报名】：重复报名！` + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//早起打卡
async function attendance_attend() {
    return new Promise((resolve) => {
        let attendance_end_url = {
            url: `https://magicisland.58.com/web/attendance/attend`,
            headers: JSON.parse(wbtc),
            body: `productorid=3&number=${ddtime}`
        }
        $.post(attendance_end_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【早起打卡】：` + result.result.message + `,打卡时间：` + result.result.number + `\n`
                    } else {
                        message += `【早起打卡】：重复打卡！` + `\n`

                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//矿石收取
async function mineral() {
    return new Promise((resolve) => {
        let mineral_url = {
            url: `https://magicisland.58.com/web/mineral/dailyore`,
            headers: JSON.parse(wbtc),
            body: ``
        }
        $.get(mineral_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    if (result.code == 0) {
                        message += `【矿石收取】：` + result.message + `\n`
                    } else {
                        message += `【矿石收取】：` + result.message + `\n`
                    }
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//神奇矿山6次收矿视频
async function reward_video_ks() {
    return new Promise((resolve) => {
        for (let i=3;i<9;i++){
            setTimeout(() => {
        let reward_url = {
            url: `https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/`,
            headers: { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WUBA/10.12.1` },
            body: `${videobody[i]}`
        }
        $.post(reward_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    message += `【收矿视频${i-2}】：刷新成功\n`
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
       }, i * 100);
        }
    })
}

//神奇矿8次视频打卡
async function reward_video() {
    return new Promise((resolve) => {
        let reward_url = {
            url: `https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/`,
            headers: { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WUBA/10.12.1` },
            body: `${videobody[1]}`
        }
        $.post(reward_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    message += `【看视频】：刷新成功\n`
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//首页签到看视频
async function orevideo() {
    return new Promise((resolve) => {
        let reward_url = {
            url: `https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/`,
            headers: { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WUBA/10.12.1` },
            body: `${videobody[0]}`
        }
        $.post(reward_url, async (error, response, data) => {
            try {
                if (error) {
                    console.log("⛔️API查询请求失败❌ ‼️‼️");
                    console.log(JSON.stringify(error));
                    $.logErr(error);
                } else {
                    const result = JSON.parse(data)
                    if (logs) $.log(data)
                    message += `【额外奖励视频】：刷新成功\n`
                }
            } catch (e) {
                $.logErr(e, response);
            } finally {
                resolve();
            }
        })
    })
}

//0首页签到看视频、1神奇矿8次视频打卡、2看视频领现金、3-8神奇矿山
const videobody=[`{"message":"2MHY3xosU3gwIMvTz\/TlO6\/n5nzItYL\/RqZwyPt\/MkadQk2NFdkQnYToWQKKbo6Mq97foL6r91EUitSfqtnAjDFDEnlfRpRMrx24CCLsJpJHRBGSHVMWF46772BrkpoKIAPWhYhmdNyzCK9AAKB53tRraTlHGaU0w4qrJQobCo1Q+WbLNRMpUTM87ue3EDkjvHWjpG7oRbD5qLQ1xckmi0sJ\/UsWbOKtJRB1viqzcz6vdBqoZRLMBz3KXIp21NysLzcDoVggVfZqjrwQFKTDaYttcgRln\/EKinATy0nnY5l+p64EX0aBD06XgwhHoWuSwHsBiQVKVokonMduQhRSdXjNg1IxBbOQftMr1Q+mfgfgkiq8J5BVufhxb3ACn5IIfXL86dzKjxZvAGWwKYlSnzmd5RnX0T94eg4kTXryfq\/+4qMasktF7kXrT5yrt5hUqKFMhfC9DzfCxQ\/pBhMGCpfWA0zeBuDiCH4DBDbaGrmIZy1YPHODVYBRCyCcz305ZyYCgmYLurR6C9H3OxK29f6x6PGw0bupFi8m9Icg5tkjz2RlaSqklVuY41H8qnyMvgf+cynva0diXhd9z\/BWYHiYXZTklE6OJme5Olx96jhYZPYssMo5z7hOnDJsieapx44DCimoeD\/MEVQfXPn5E9YS5cG8nHdM4WGiFp+6DxAbyEDoNwkS4pWTFax5eedv12gLHFMD4ef5KhuDMRx9rZeO7zFM8tbcyyvW7PnQo+hKke6US5aTTcIszKqTTOtFdKzK4UXxkiz\/qFBMBUzhJTRDSo7KjmQYgou8GEcfPmGwGsAfrI4d1ND9c5xtGCz\/3QzuRuZtdKW84504ZBVsv3x0MLxk7jiT4VjIWoqtJT5Wl+vO2QiMpqy7yjN3lGxqgwcwrcCmn04jtAukICLDCdetr+FCmr1VLhxnZDlY+R7eVL9kYcf4pjWBcoXAMVC09W6Y27CLT0dhYTDZnPT3fWxQOCPmCysnQMzfRoDrqwoC8aDQq665ebxEDt1H5MaS8hkPPwnfIOcDZl7QjI7O+PfMYPPhsqIdhGgRzG+z2dMdg4L3XhIFbSbzASgTnXTxurtTj2crqLyI9xosOAsAcmpi\/jupiZfTkk6uDIaFl8gIU0\/nBvDUPynRZNwEQgeb1p490\/L5c5VgpfVC2vBQ44K\/7TdXSRsJkcLaBz1gtpyXWE7Exg9hHm6xX75\/L046DlAAGZza2DEWH5qIUvmXAw0+wFIyuaE5dV17BqL8M0jBDXVaYJERHDw8xfF9eFgmnExmNegH0LvMNh48yihN+JStDFS77UvlNT70vTqsNMlqsrGieibCj\/muyzn3AqRQwp5k27IRERh4OAh4PqkSCfr5OcbfxZpJWqAGNRcI5GxXfvtcJupX2SWIyzi6meqqs1gPVZin8XimK8SMng3rsw7fVC8wxAHEBoGLEe9xNmxshtZbctAakk8GxbnNLdrDwrMfha3vUB2CYXm+JQxLrNvCyEWgry\/hwP4greUqEwedlv77kgOEpZrlH+g0rPWUyNNDB2ao6VoI4P2EjDCjtWPfR\/fAk\/Y61IcIZN2+kFdpxQmYO++FehbO0R+dpDNliMhgYZFsZthzWdzKmwvw4jPHe7YpU5DJqCutqOYoE9SXKTAz35wP6sanA\/8ZCWyrF1o6LXBXOrb5Y061WqT8Tmtxe7+\/zzY1gJsN\/ETanemQO8+QB7q7428XIbZGxjfZ5fvw4Pq4bD858ym+vS3TbzEL0eqEeUtfd802RnIJ1hRLiAKplJXqOUiaEYjHr8plCVH+U942pgrK7R1W1VVuY4pczOoRwjIlXVc0kb55Oh+9WkjAQb2tkXfg0XcbSMgKtroeYKAda50sVTF0syw0tEjibm0NagUqRrcWFtU12w\/tj7fGM\/ssUK0o92kkU0a2mV0zOSBGnAZWJzafihqE+Cdvlt5\/zdSG6M\/kIsW1fy73+gDpScgYNTYOFJUHM28CCeRvZhMbmCH2d1RxFkZT0A73PxnY3f6js\/NOrtO\/TiKMfGOft\/oaUkYvfHCdDZbhp0d5puWYQGHkbHAhQ\/LaBvi9HEd1ZFl\/MD9WV7unj56GGbWfR3GhIzAjKOOi2HMbBDtC0EQKAFY934wEra9FzfJuRQsOGfNZF72FjFwDm\/xcrCeWkvzcTHTCMV2KGMTRxsgEdYSwVIU9dkcx1jVlHZhoLJpkdTtts7XeV2a94B5vlnDKPfk52U+ZNleapGPrWO9wdK608+PxNeyxux2sbQ\/3ou466g6bVpFYcfsF+M21dSyKgFBqEnQOvojo5K\/xTTCKCrOZ10zxz\/Ua23v3bcKXv2vfTvc7sDxz8HewFt32GIY5o8Eoqr0FVYBUun336dCV6dTbLG5EUNtyCChVWsqPkllLHemgc6aQh6Si61Li31k5AYFO4lSsv2Tpx4PLekJgcDFV\/6arYT5xrMYY8TyDbE32kfA7TGt0t5fPm1X3k5FepNe4UHnV7znnUQtxN58NDUMUfxSpPodKMJCv9WgsVq31V+8vtvUHn53njvVluE42zy1OwrZYNQBcDBdFoh3lgZKR\/0aBov9yu6It4uDe5DfKHvrfS9rflrVmu8zjnN46xkvUtH+NRlPNjcOAcbHDUYZeYpf\/tXWyPlGy+O7ug57Dw567\/4AO6vIkRYkS\/zyet0UVxh3xZiWdrju7qvGU+KxBKij\/chJ0JHWp4GWg9BMvN9K8955rX3vvRZ06O3Wqa0XgpYLRUcQXoDYf84BHOkD75wKD9MlsMTHAqWn7S7E777Cdv+JN99PAVYROsk7V8AluElOEYWz9LX8JoLwROKoZKh1Ti49nAplpCyn3OzNhiwN1T7KxBQccRPRCNfPEqDeZ5XIwjaLuwmCBUcIan38ecdMuzBvshib+qz4UEO4bpwsJEvUPs1Xcv8q7BXe5oHWfOdgnadjlAT4sObBD0xQRwSIOeenlypXjWr81rGk0\/FHnyI6H6UD\/3JbeZUlB20ePTnpc0rJJ1LH\/pdKxf0VyliIfi9\/kn6p0mOEoXZOLeLoUCAMSXE7B1HoCKm4dmF9cANAe94sgmzxrkmo\/4ft5L4oZacOmAGqW5Ir0ffE6vQDn8AGs2ereegOoeoJLqq0eNuKsoAaOH8Cvy\/p7s5mXure0hvl0JwzmiRX\/2Vd2VtfgulCtP0OJLaSnORJPApN1VdZ7pV7qCXrrRFrB8R\/SuhdwILNtNLVvgwm2W2o7fbbU8cob7f7M3YmzDHV5DA9kDKtP4evX0fKFsxwKH2z27fFNskrruRXpWlYkomNCKupy2uLgO7+aB2MjBCqooFBKbOPBflGV5\/\/MTCPyvfgSZuLkRKpN+lQhmGKe2JRuez+G107T+XCwQDRhwjjTeuHcIOdhW\/oET\/oQsyeALpFB7fkbqRL\/S+dLWcGeLq1vyamClzzT0kZMbU8c95N9a+SayHOlm6IkVyFUnIc3chFlHyxxye4JI\/\/30mWzyA8r3AJRcsMzy0dmztmW+zeoLHguhMXXTWZ+pEYL0sQNkaBNc21omkmL6pQnxl1sE34uQ3cCgf8LwNcpT5DZbl3Gzb588y\/WkiWNWIeeRkLiS0aT4U5cJ4eUM8B6U0Mpcz3dmsIpJvDDRl++nSyFwwd7FySxtz0igk6V68QqqMNhJSxuZWQElDuOmTjtpnESWz+UPVbnblP+GGBe1zPcMmsKNREEzkRrmC6ed7xmJ9armst5ltvIAevwo","cypher":2}`,`{"message":"2DmpIf1d6Ell7V1XUQwD8XK0S+71P4HFDcIvrjzQBuzgx0AAfE9lRZIsCM7Er0Fe9JqClzTWfj1wMNpV\/GtZ8J+KojaggCKkUEURIKATSOoptBEPO8fig4jcAWDz7tJKb8Vfr\/nynI7OMtpvYng+oWynWUMYj73e5v9DGeto6u+HP8w4phAEz9F+7XPMRxqC9K96dHKoA\/nxa2zPcePNwToAdSCZEnPWuWjI0lZvmypal8Lr7DxnpJLCHe3FdlCTeiUx9xXkh9P3F\/QnTuO300RP6Frt5e6FyehOifE6ozTYqcnie1Gpw7BOfOAnEVBhG26yPQ5HnOVKxE0bT0Gp0CCLQ+z6VBjz00TAcZttSUtbmxa3WiIXPBshak2pb6qTt3FB8gAtIuc3AfXt41rjZzluOtDWxPz4Pq6HFqZAw6WZltiLSHrZZY16PBCVwvOllNcCFXTN1v+cRDFNG9XK+P1v9IGUo2Bexfn+N+RPEaZ0yOWceQVtWk+r\/I7+aSRBykXoKAWh8l+zP9kQ8OZ58rTAPsVDqLkr0V0WuBvp7Lh+EDfOTkTTlCwwp0wF4gR2afFFDdpIJBsHSbnd+fIvDg4KDFau\/TxTIN0wZ9\/D4Cpe2GWm9dBAe0xPVycxckV9gnMExN2aKHvN8svr5RegnPqkT6zNGvOPnZLi5llgA6HL9MnZD9xryBGD+cpjYGrR\/pdMjc\/EqECUZJ7CYrQYZloprlHzYfE+gRKdOy99sF6a3ieD3CWkzaakKrTT0KQO3g9rihCyHqx4rUhVEhMHmGLtsMy1enPb4b2o188i2ZHhD7FR3u9E4a6Hq7QkjuDeTO9IlsfT+OsXL43PdDRZlAZz1iLrPnyPFsQhoP6egBKsjnGsDQC9aoMSpr1lisWkC4iQWDgvWQKcWPxzXsB13+TuQVhCj4ZXo+tapv4pwDsDeY2OWDYfAIz\/VZFbwKegcGOBfYb0IoVIh9g8Nj6KPY\/yb1jHQ0Jay6VP8lU6HbG73wfTDj6rc\/zNKyFftr8O5CmJDdtQzjCkAAKRV6KyISaYauX6VTALyafKKkHnYUCQdSgoasszwf8W0SCx7FcGRKSNSQB+SiCFcZthZ7FrxgcPYQ1zGg70RpkEUWBkZNnM7ZcqJ5zuwKZhOr8CrSNhgkYHdjdF5SRKuegiKHefRf+FnTvI2JK8SQXmpzJd\/IA9qP2to0o97i7U70\/NZn\/PLQzxDUPDd44Osm7D3ivtHZI\/CvTbdGfZqwZDrjNhy0P5FKax1Jhq4wz3Ce5h8drBPFzvbFcVeTPAY5erpgG58MUhO5ULOKBycDBi8Q9WxTlYIpxfq+xp\/1gbQEv8oCGAd62eYPIUniW4Hea9JXbRV2ebl5FijhKpG8nwaNXILtrgJgKomY7mlYps7LUagXh12bQ75H8lBaqGe2Cj24v4lGbaCvtST7ohcUxvgy61CReau8FXtYAQasbFLtZcNeIWK0Q+8UaRstt4XlUa6kwrfE8XCT55W63rC\/MiXp9\/B30IPCrpf44of74OJeOkKnhUlO5Qjxlr0LnwIL+lZxhVxAKqmkOdiqlD0aYX+H8TsKeTsKUkqNeTVVZtaQ5JalB7WAymGOWDjVqcntNrhuH0Qgx+n\/CIJz0MxJu6bVjKm6Q6eQOKcrmqXyTjwwr4zN\/o6tjLYvqKp78gauq9GZk9EbiPgErF33HsP5YTznj44h192dY2Me7g80P1m20XD85v58Jpy0h3PKCBbx1t0TKmiLmXsbWNbFagzjqbzElOBCnN9tSBL1F2c3Oi44led5XNE31Fdl1uLzA8MwjR3sgarK1wgJfA99EiZ9RZjuNZHmtdt2VaEWMpsYzwWO0qZ1m9+FflsNQIU6\/w6OxwfMt43vYKcG6KHKEh5n4SWBNPyEfy71ZaLruZFHz95wZCzYtoCtgWgx2Ej5zdfc6qrzvniFzTzleAcXkLkHKdrQcsigcBtdazCRxrblTC8oI+G0rvZV032+vTnzA\/0e1zTlmuoRCHrAig+oRDHDwut5BJwMGOoEgp\/txlZSnL9GRUCklmCNEJaslPIWfPZih91G9fzZpl4sNMSNP8MLl3jbdWaI2Mp1fIV5GVYxeuwbRbf4\/zBUH5dWwZHuoZA7osPgNDr4qjiRHz4phydE6plgAAWlaoZK2Wal5ZIvpy2I1fSB\/YBHXavzHdOMDoAQZDJTlGAz94zQ2NlVXen4ZvvPoAtPrNeWDfotDNoXYJfCH93BSqGTItntyGRUOCVr+YQyeNI0PgX3Jg7ffSuGXu\/tRott7JaRQpHIOFfCMixv30zYH7RhvK+RTJ+AQ0UsM5HtK0k9\/VUsltrCikU0UdmD1nW+9CCvjJ8jPtPbH7dq33rECFn55+0KCIMbP6+bADTnPpHxrNKkBfje4LQDD1AlYH3kG+6DafkKS2Mh4gQdntTdeXO+2pNXVR\/l9z73LVgjAsLuevxfS6wYNGFG1Vi\/wjxnBoZxjIlO2ejoYyTyoDh8wWTFxyiHbkGEuEo49v189cY7xXtko4jDm\/ihtYtbRTpyZUXkmaEqmhrZsyiattX7MJ4jO6S4NFt\/ATt1yySHyuPfqymshfF0BMev5xy+kSCfdlld0RPHoc6yHZ94StD8M\/XWh0HnPt8z9hA62\/oOHzXK4shi096cz7exZZWB8wLBy0z\/jgYdCXFpTSjZgaX+0Z9SIvbZbkEb9aZ9B8wgftnAa1Sm581\/S6rkz9whoNrBqc3V2ajrLCJRLPl31pcsLnU5UO7SPDiK2nxKp5Fg9Bs7WWmlcUVsFPjYkf1jHCCvOy2hvuMCg0EvonLNo2t0pNqvEEDYSqOVHJ7PNZyd4D5PUPGUX3saoJfj8\/QiI11pmy5Mx6BsiZU0ZMavvSU7SWx\/5c51FX\/YN2DR7Ejj0J1aX3ZmHQqRS7tp1b+mOEo4ud00ie+WsXIV8ry08NGgQxgSo7dRyFPHEg5xhNU7qRRDTFOifVIQ36wLjSr4THRaeHNirvwnytRA1L7OKp6yqNeiiXBz9BaK1z9\/VUuFd6\/oLHU0lOAOOrEJ7cME\/fcnzU7ommcLn5RkYWRC4XmCDT5GiJUA7z6QHX5fujBA+GBk+z3xjEsBqw90DkI6Nv9wJ2HisZZtAHwlhqfJBb+tylJA47pawg7sI7FLdvq2YpvfDnTJp74P5SkN4H4tvtnv0W6Q+OytgmJAHxPd42utZOkqi+3YI\/5Z6Sbh1qc3fS74dhmzHuZJfuhICskE2eolbjgGrzEAwV564R3FetEMyNW8yyGJYLXXFMligItlxeQRkDW3i43sO0sLrvGy3amaXwvfEeua\/jD9grtHTBjo01BO7QwwknyQM8WAVXqzBta6whSg2vnRcjALj\/oCej1HYuZAbtkeAAUBzQVsnF+G9UuBIaIYKFSA2P6QUQ3C5seMVLG0X1ULYQpvSPY0ZMjIN5vrub4Cbpc0qsrLUKNuv4qhHwxwRhRdStqZLTF1cinLcMHVpwep2hzJwL+1A==","cypher":2}`,`{"message":"26Wyleu7I1hDAaQAI8Zp4ScYVom\/iD+CYYG1XzgtQbwQlG8G49H1Uki8AWAI5e2x\/fEKHFd77TjTke75U6pRWVfOQD50wUXXIaouQthM+I7kkp8GpgTspKgK4PQrmHaRkSQGbNvGXFTq5Xr12rTXyvpZGJPiTWP0PPGxPZSTa+k5EL\/T7Fzl7LvLXz7o+uiY8YtFcxrMI4RH42ZNb9LAb4GJJ0nbx155j9llM7P5a\/m9ZZ6iGn1cjNF4EhrtNckELkgZ\/F058wfIbAj6+oDjpX0z1dLuF6j8leE1F75Liae7eQ\/2HuOiORKrnAHbyDErEmW0Unz6Az6IjySqNor\/drC7IIxFK6NaUWtBtiOPfmPMh8MMFnZVjxdel4Y6SmOCYlEJcBzBHlvd99U\/OKteYp1LUxtYiX7ft4x+7517fwUzEEkv1w4U\/ofHqXXGL9GglhGk3rbpKvkbWv0I247EvpBemmVaaA2erTx1ae7Lnb0qHj0GRYAuuosT0RZViT0033946eDW45Lbf5Pi8KcaG23GKDuoi4NeUwFM8cnEWvfQ44qjsvmOQzcNVGPuH8s9BcKbD2x\/oVV1tPiaW4qfK6LnrVhQNWa6kIKKxXY79GMlrqumLYLjQtD8NuA\/SKLio5e1jhTE71k1ieeuHpK8blLcZP4Mj4KrD5ZKOp4MoEVXIzphlt2Zrxu0iRCCWmXCxXgDt7i1ArFut0wwQ4vLjpuUPF2Ulm\/c47RQFfXnu6GkroFxIS2JFl3VJ\/enzLrCs3ma\/wbh66MMDtWVqYzqUlDoQlUc2E1n6mGzT1alQHjUPnLpDDqxILRDQkU2yzQLSIdXVi0XGNyNbFTQpHmufH5gylmjXjmhjS9jWpx3Y3ZyXTQhMECtC\/dwp6r17GF7ytK0+39tWeNAUMkIRxTEuJYXQoq5bU8R1Q8M\/sNQddHSfE\/bi0mnKOUmPjQWE6TXuTPp13ezWHyWZkU\/HywN+NpEG+EE+sTl+tgKgfTUJ+YJcTVYfWV+QAM1892ftfivBrhlpVBm1lrKxUGMXZ+FeHLLXSABQdSfpnITWua3\/z+7B9oPk5vUVzp8j2cgSF6gcTS\/AwfIcmpQcuEGDVYdZ2DEypf6nAKZPNlDo\/cnK9Qi7fGk2MWGrswjq5bTdGL8XDdxhKbdNbB4EPXHMMGfcZ+CEmGo3r732YWX4Q+i+XyGZgTqCuwhxL0GWXqddP3WtOvJy0eQnxNjtG4NyN9pAPNLo9F\/9uYE5L6zFcqY3xtBH3dgkeBpdbHalIgLyg5kAJFR0hQMinjwZ86j9hGKI71dGuc9ijy\/h4nJMRI5srdAOkR0IyqTU4uHlRj4j4o2K\/788CLQ888l\/Mt6MLOKPMGczdGjARut2iA6U7mQJ4CE5W2YpUUvVrLUV2i9pqx1tObHDDjbkPzxY5Z\/jLlhEhY9H5+5dXfkUWtZw7QGvsf2jEBZj6FetWzzc8jB7W7YQ88K58bYJEgUkQGiPyYXWCEEF0LZJ25H\/37fBzj\/MWjeIZahXPN\/MkjlwXYo6rKY7T2Jjrt6zXAhASThX7HwL+7saByUlIl26o2LLEK6wWvsMDWYDUe1sz\/iGwdsaEkgWS8y8KekEAlJZN1o8kAdq2tP9aV13dtjnpqe\/4rkgAE4g2amFX\/\/ul20IAmRJifQELLHnSeutXVZ\/9bleZKRxFnXaOcP\/KLmGioRcqhHp\/7potaKHkRQYdsBC5xiJBqu6pcZYv7ucBIucqtNpj2ihk6ci7DVaWzHmqzId6b6HdMi78AI\/HMDZ10ccereJanM2\/QFUSKWkDP9SvL33RWQRf5ITqR8WdNSdv0wzwFcXi1P9nlgeJZbHua102k3rpVUSjV\/zlWZgKN\/gv2UU\/KiJA22P4j6O8icD092sEKP5BJINKmeHFI1AqtOIoouGDJiSaE2bv5b7muavjKtKHDnSR9WEJPPeFv2ubthekjMFmysX6cneCIoWw1NZJ5UAY8wXPaXPi8o3aP3D\/ahApllEhlc5JKwrPQ\/3XkrZzdxCDl1hYY0lzFFZcWWV37B+REfhlADjPjmiSzVx5X0UkqCpRQjPYn4YEahcQCHnVS4d5YbVPGbg89TsGdgii2uFWOhQSBsGoQpARmvpIJPLnKqMVZALoeVNB8T2MI48OGyJRC3gcVPUb7\/ND3hLd6c1vXY6ICZj8uzqwV5Q\/a4jQxzg4r7RaFfH5NyNkRVW13nwU+oeaynCtOqck\/VdQX8nRLY2XagINRflEoyQZmY2aFAwA8jhP+PsG1V0rRQlxiMh1eGCm7VP8eMrYOwL5vk9RXY8vYei450cVXm6j75sUBDcLgQ4X5OFDR0xg42UFT60xend0bN2Ku7QcqPojdN6y+Wgi1MgwFfdnI1+WYsIQS4lZo17JifN6+7bRmnYnRiCiCmg8uY3l9N1PkofrnpmXbkMpHZeLYY7dx1dyiDqiAOsGXLLTkPi9O7ljnkqpiHvzjs0spMx7CAhMbNZdnAlODHq779UA7qAOYxFeE4ISoaPr5N4Hfd+iLbbr3603WlBlBoL4OTt9zpax4IH7gXinBx89FODP++DNw53ygzILVc9lgD\/e\/69jG\/1zviPsq6tj0ob0GqkKZEjQ2O6aQZf0f6FCYHNiD\/cIWtCwttkE1gYD3UkYt2jKh0UZ\/cCWbI4rfLQkC1rPpSIyMGmanWb+Lm7HWcEhgIPrCFqxNgYcRwfKeqet3ok9eyvny5toTCpGk5XczdwjTePg2P+Yjj6yk6Gd9pkPk0tt2Pqb7xSaIUFfDHA6sLyBihtoXBlwWZFIdfL7gsuSaLDIyEvun+mC3\/uGLsDKfF62Tz8Dyv+5jvKb8Alj0gpymQg11doqE0inmDGT9Nt+yWf9Ho0PZ9DymBNHlcp2Xnf6w\/QjdlmeFh2XUzggndt8EOJ6D6FSLMJuiSyuiPUrfE3U+EvGcrBFKag3RYn80HDoI7SvEs0yXP7UsouplFTGKDytymZ9ZknICr14a+Kyu8UA3l+TRvBXDkC7Bp2VhkzNggJmoabx8qhK6LLYos+DJrOly8nrD6GVGDD5Rmcn+g8kAjGb8KTW3bqcIp6KqZReW5eRCV6+3AG1gJGlvsY5YjqOcj\/eFvaFjfBuxZw939TZ7Shgvnq+nbkJSVda\/Dr9AZViDnR8RaDYgi2fMiIyPJz0g+jHk7aOCs879xcg6zc5NLIm6F\/\/M0ZVsAwgqh+DHZdpvA+ixMyqMu9bl+2KwfG5D25xwlUZNvXL1DniurVIMaaHjkG8OOMN+0tM6h4i0bQWWoXDKdL+lgQK3iLtjMl9NLQZD\/FHmjVEC0Nl43247sd\/uebCtjdNthWebpVJa1Ow\/Iqf1pfFvPsX5nzsomR1bnUaIxAyk6J7tq3aFon\/A9n3ucyelJuc6vufDSKoqWhukkshXkeAO5mI0tX3df\/TIQj2UZAsFh1lHjG52nc6okzNjX+56LKmmiT\/c1+6xRITbxvoxl5PVgiUI03kKdLWTejAsVXmeXwm7\/jVJXH7DrFxJN8vstpP7FkIPcrtyimO9jcScFm4w0IxnXuSlD2xnwQ4ZNu0kXF7nAkrjW0JKT7JZMOvJoTX4i\/hTPo7czA+dL5FFLtUoF8OMMrZ1AEdB8zh3VWYzb96QW1IrDMUBm\/4kuRzWAulfKpL0APXIc4R9ZoyU8oPuatBeHYJVneEGVazzOs4waovAdDIiSRhs+5i519IJhDOC4\/phV6lSho6bsyKr9zMB4VOYordiJ5oLKxJoNjEqI0jhg56Ae8iX1kTBARtlDcP\/uzELWSuHqKEazRDYEwANK9mIfzNpyG1a3TUvqeBOOXS4JVbJsj+S\/mm\/5P5ada8E9TUih7uba92iEN0GnckeNW0LLxkQGjIUefw87sOxvDLmrWqVsb24S5IQGFgJ9gfRsUHswtFyXR5wfq1gebKVMeyWBLxiy+ZBdqL3rq0\/ZYBWH6ngQ\/kEDgP83ynJYPeM76rOBvGpJ6aL0qKR7ZVsU2Tv19Ye3tzwb9\/G4RgsjcULuiER4iWg72mDffU3suaQAr3NSThQkSbKMwHy4ahs280tdCImRDdEVMuylkP6lxWP4uw44tvts6JwmKWVEQzBS+ocgyyVIm33n9","cypher":2}`,`{"message":"2DGrz4Ptsl01yg4iBW7+Gp7BxI\/hN\/+lig+v2hGTTbgPLSdUlOwVX0+tyWUsZPjm1TIL+HGc0r1yrqWdK14rcsjx0dleAyyVN6rRgGEn9h67RTv6bUcNpRD1lQ9BsN9KAQMiYhpi3L5X5ffizTdGBYNMNPNkOVPyMIqOxjkYV73sBR6\/DKsl28AB4NxQGzVhtJbJxR0dt3Mg\/+guNAaf+QuO5G8dteAMf6UIXG1n0gXBBFlmbIkS8X4styX7k+qyOPci6xsXbmfKp+wHk9BA4E5frlfDudBfMXerYMQv6nWXVQGSsuoUcUgWt9Wm5ark075wRYmi43Iiw1tDfo80qSZ2uFOJ80ZGBmbFr7ZwakhQ\/oqCKCRTJZ705f5xNWRWhKuhX8V88YBiBQ5QZ83Mke8\/G8W1IHgWxKCNHJv1qnJ\/03Z2Bpflzhx8+ddy16nNabwdgfl7iMteSGtjX3ky2dylDz4EfISGWOdQf1iWTIbFpMfyBJznJ2eAwu+MMwP80oxXUKQFOV5vr3Kdk2T6VfeKj1J7MMJkXFy2szolu2mgQx8fW6sMTX\/TWKWX9x9MiWOuMEFFA7dbWcDocyS9Y5MEahTqYu7lTIvw4EK0IM2mE6agNfhnSd7bpUoTEPVEn5ksVQJVw\/xOByP+kYwL3y3Z1DlEre5lTs5G6P92hkYtSbDMpDNpUx6fcAJR9FpHRczCmKSUZ+RM1UytlyloSfsiyukskMgyMfW7psitADnkexumlFB\/LE6mHUkNKcScBZNll2XnvJlCbAO8MvfYovkSiNTZ2gBLGXSpOcTmJ\/MsUl5jmLZ2kcS+CZ3Q+bwbNZdGySAXh7SKSgeJsK7cZmzmnp29OLCuNpOShvefy3U3KpPY08U4DCFvs2zC0D1HtwfkOv1kvySCaQGm9pnexcHXuELLPNktlR4dAyAEzV83F+qeUFDYq382wWNDasvw0mTmsklC6rebxcWEg6tRZ55Rbfn3NiMGahtcMhY7rO3dmO\/AUY8jBoHLeQlynAlr1R8vgZAfTrQPkmgFnJw\/pcF3gQ47uxVyxxufUQgCwUnIpUdI2PajkSnkG6fBrh8EE8025j6cXZAm8WN3sO2ZjE1zcHa\/OX7mdMutuYRgqnkavJNmYirJD86m94xs2\/lE4ZTWGeuNuFQVK+g0orfTTIzfeWnN30zCyWnAdPFIuXXDTApdFhO8ffrXYPKFCr0PvkuXjjv3e6P4kSdQFBxEcqFVHdX0wdA3Jg+5a+ki64p6WcVo0nHcapTCVrTYPbl\/cg66ApePSpTvSqiS+SUxn9L9RpY4coiCBi7+68FtqwPxW587+TFMRkglEXH2PqZQae\/bN+jQ7b0U+sBBzaAx7YC69pkkFWRJyD6TZApbPfq+AgH7\/rW7lCxmFtm\/TyjWJI\/a547ZteUP4CwXtZZsNud8naQOc3JRij+spS0jqVXFFlxaUsjN4v5EhtM9WJcUdzhFsniP0jXK+JFV4WHmKcQOo00qe8cG3xuP\/pOA8ELVkJYXwmMAxejGpSc4AoOtoLlMwtLuwJIOBFUf3a5HkrgXOlXKn3ntgLP7NH9PhX3cUautJTHGQFyN+68dI9PZssjvnfUosVrqK\/UjHl3N65VyZ2vZU\/AaBXDTeeupcjVe6zyErMkkib1BgBUtRsM\/wj6UiXRVqtq1tyHrNCIOAih5jOu9+rOKeHI\/mUUkjifh1u7Y2ajo\/ST7mXs7kfDeFjl8Uhwfi0zKPoW0e87R5E26BwXR7RaaMNtA32QOq1D2W1BaJu9nPS4tPnB67da\/KlWs4seRwTrLvB4n1J6Q1wzv58gy38Bj+btdV9zQU2fl59hXhHsRNVIQmjEzr3aQrVbv\/GtI3OQldE0HDwFh8wUop58tQZH2ME3QfqOGBoY\/n8GeRHgJGPhTCQaUHTCRQg4NjwoooPVFrEILwzbi+jFhLRnIW7JtkKj5tRrFuFdyqv+WiER3iWe59be5d6xAblia8aydYE6ZXsQBJ09s7hXxMvZXGVxjbgyWmqYeNSjs\/0KJz7f2AXHYccrdrgaDhQOQib4o8yKQztMtgHzUHGkF+XhOH3LPqS04lFhUL3shgRceuPXTi4UK0bmc+Jd+od3hVSHJ\/C5RjIgIkkVVeHQbnDZuRgJ69mZNov334GQaWlOQ\/C9ibk8pEf8NJiwHpxkVoNLQ3jN8tIqGufzKjLjPw8yY7USOU5K3KY9pJondgKlJJ92p+ahQguC7QadjMtwFqVbe44rK02DgT7KCCKQVd9LeUS7ZpRbFYqQEvMMwUxSA6k5UmdbDE5abEulRKOiCpXd30y+XnCMNj3vYGf4TykbHvhEW1pTNqG5S0UZEm\/z06VbSAXwLDyGI4+QBiR78RQS2zix9Ix8ADiiPpXen3QluLJeJL8RTsfrKJPFNkqjRPMDBrl0zvCRDi1gxzh+WO\/PzKWI1aqNQmKWPjz3cfi+hqCGIwGMcRzQMKKpdxKMaJeDOeARJ9bsvYm42gvbu\/giG1merNQGeqX9kKF22AGo06CNrDkDwdlPtSCXNJIMd7OZ\/qNj7N5urH0b0x9VSUA0DmcyLc1za\/3KjUh2KkbWNKCS12W5jYnHW5CcN7\/87DM6SjhWaJxyI1hGzCYdunzzvEUN3XM4fHRn9JpDdy85txkCuIWYdET40b4JZhuzJO4rXyOaFQ8d4A80\/ferCRmqwPN14Jg5af9hxkF5+eIXg9C65qz5eXLfJ+umdXfIR8xFDN6ZcvwTjj2v\/wViVNKdPadujT\/NU\/dhoTprthVEFXREcse8CP8NyVo\/D8TsQhQocZD\/4+8qNHRRuGIkKyL1+Cn6gAwoJVmvjuQC6zYjtU23+mLPidPzZGErh4kcTqOG7jyMbSYpglCmpXmtKsml0gP5qx\/LlmOJobOZBSgJ\/rWErkySuhNqOwMuxLcBnT0bx2wM+\/yVofZ96yXPBL7J3KEoIICCwWBImpzExZiyBlL0bDCN0aByijx3KEsWZB+BHT3RkGv8YSLWUC3zKeFzgIlSFGtPQya3nMvpUkhbDZsm\/+Xn0p4bB5EccK9GmSQjDqoMCxZKUCO2HzOg0Lx9GIWObPkGly0qFl9XdH03gOfAdoPmbfv7zlDB4k8VcO6BWV5f2M\/0LDmBhyyyQmgEfZ38RM8jbiHQENqDd824uZ1+qbvgzxr3l3gIgtF1enNniWKUv4JfQD1XG\/88iqx3Aaag4kO59pjWYSouKwkzWhQnMNOufgF9G1vfGua9+hzd6J2qPJm22mKq3ImtnbldgplMpTFtBo5ng1LFST+JKBR4ccTankGgONrUZ6DAYhe1JIT8phi4oHckXn9W++v\/SPD+t0oFDZXMGFWrLVZIcmcfvAfrgmIWMpzBIg+kjaB\/4Dii21EduJNKSv89jC0rA8LAhN4R4Ds\/LfrOXklsaDpRWayFdyKI5wYV9300KRhM3j25pl1o2MRTatYfHV8b+V0qCya1N1JT6lHclF9XMyq6zjcDrmRu8Up\/bAdWygtvnx1Qj4tP7vQnK\/kMLzkbaEXU+ZJP5uS4QaD5XGpeuQCf7CPBSyYpO+lyImk0WsIMgtXE+kU+jKaqqBH0FubAv2OguCs60vMKEOTNkrVy6Kn5efZ1NAZ08ycFuhJ9JeWkxFvkNK+PRcfzffcVGgbExBRmc06JSaErRZnHjE2TDrs3mbXMNK2bvE3tkqBEK7Uvxqg\/MUdphCv6Fpn1U0NxpwIZQIR\/m3iI0lmYRB42sV+9iFDHcGwa2kMYvUmRyYwMNfXFKfooN7yHWpRP5giou3vePYH3PSvfihTnsMrHH\/OTxmA8SP5Xmc0u2rIl5suzxZqwT7r+7JC99cer7x8MjTx2Uurm3Q5yCk12IsLpILTjvJU66HzI0ds\/InNfBFVWjm\/l6yyVe8VZbpMwLrZpifhyI3FTV3kFoNo8oPeoewZemQrbyuSwu3iSoOvoOkZPIA4AyeI6JVUJ4J5A5UCQuLANeeZKaE5vWe4imS2nmI9tRM4IQpnqI6pjzMuPWgAYphVH09pNwC68kifEAnXkLVWg384jAC","cypher":2}`,`{"message":"2hZ4g4AZAaVFoeXazhH+79p4D5zotlXWI1wIIZLhks2DfjeBBLsmteM4ZcgTgFlu2nLkcDVCmLxi6miFhxRzrnuT9bR4YKveWXdXrhTF\/mT1o3qYe2msWwptGVpVNeVHl6fICdDPewWf5TvBHaGiNBkrAmbkAAZ30kkrxAaJd\/u\/l3Elqun1dk0KK5X\/nMc6Ji8uXWOu0boKtyDwLoY7fIwgXQdROR9ctqcVUR0CP+qynFX+5kwfHswl0EoSsUSx+asReQWQdVW6k5O9e6pjCTySifxCCYSQ3aZ1mO7U4Omva14rEbUEh8CmZKGzj6SXKbmyrOjkovBLSBF9KP8uFkxLPHEK+X2p6W0SA10uJDU9sQgH7R56pHTs4ztcQ6BsmsEWDhhf27xkU0uuXNJC\/LMQpf1pe8eqkw+u7JBJiq+t25B6QnQUpuynWd8ldA2nGNTGZsmIKk2fXekISKCyB41b+mC6\/9duRSv5FqQHh2RdhcutLeGIZjo5u6cNSdBuZ35wigr66JumoL8z4Z1IvknqFt9azn4\/mEIuAZpFATYXQC0fyp238c269J4vlJZZI+AD99CDRsqmZghZEcJKQLUR13OzNYo5vivkigYgv6erJcb5ip4bIp5OZ4vhsoJ7w49jl1CvfZ+6vu7Lyz0RTtMiyEash+VKnria2SbeCAXUVUtw3Sf\/Mw6TME529Bq+htOBh4YVZJKVZNFtLLcLn\/iKMMzcT9FJwXEKrFAVcUykbDoqInqzAs6hcPRP2k+JKnydpr4g+f0jH93PlmJgYBvj0cjihVUFiHlKYAiYyAZnQ2F+M67AVsBzCVT8uwMytTgaaSFk0r\/wet6vwTN8StKPRZ6w\/UlV4pFIEmdiM7ATJy2wEGIjiD1rYJ4EA\/\/ZnXsaccl32x\/eR4t7uCzfnnqkfuh39kCpTU5yG+Lqln6syr2\/7Hng7BjhyALM9TcRN5gJhNA5Wp7LUO\/VGSmsLyxqWYgXhrN3u6fMA41yd9hemnkM++Y7vWeWJJb2Nj0TC71zUpYwHOJUCrR5svuiUkfhv4c+c1VhI63NOF4xy0rL\/Ll8NWHMXvz0T6OqQ0AfBVRMum9TERNYiky9qOqbwh8OxpJRGOW4rMRxSQnrXNoKNJdKeK7WhmDWBkXzhsn7Sq9QZ0+BFJFMSSdUG0bC1evUhNKbiIDmYrmDIxjELKB2BZ4NgJzIbvahyZf\/7E4MDB3a4vIbTqu3t9q+YntDBQX+lVU74h6tkKZSD55Gg+iqDi10kyaDXRq6iiQ3AFsBwpEhJEu\/XlHVJpU1jrlMPOImF4LJR4nGMnKkHPOTQoYLHzZcGSNdRWbxFk3H1Upq3I9m62uhkACFnsMsx84UdNa8+u4f94dO26SnrqDSIj4TD79hh9prB6moLJABXpzcqD4qh9QtOXZnh+\/bHPh3xf8h3O6kn2jrImdscNSuai6HrwQxxDegPOMxSQsIep3Zd3548OX\/F5ccBQ+Ma8iT9WzMok4LVcjw5V+Kc1SgD2P90XL1hyhK1L5+qcHfR\/i\/xZTEYt9CW5mQlW86WkyJhbNPxBCT\/Ug7nRQf4vdpfUlVFx3tFHKqcwk+jmwZlhSwFsdfDVAg6SuBw0\/uks74G5olbliTlDDQt0FZyyTdd7KacGUvgUjn4rk+fOgwn3zg+VCA1+IfcZgD5buaIsUfo8Rh7WoEEjuQ1Pxi\/WhWRhArc2Ulyn583ftyRRfA3ynGncvE7wAyBCohX2t28lFe5TWtZTkbuLsGF7quymj4BFrtfMxINrGJf0YzxqvQelEZLy0EGo8SszCntUI9E83fCVirl3tABkrGNtnuF5uQ\/y8AGb9XhM4IHIXjqimZO4\/K1M06gROLz7ospb6qirtHw9SnQcF1iR\/wflW+Vpi6fIA\/WxMkvky\/hEFs4v7ZgETAo3l1rOBNLmKsNTU2Mlvqg8LNDnQR\/edZz68HzO+gRSxpUmBs\/aXh37SJ5417MvECrMgZwu4NWSxX8b\/lNEmdiG4KnUyC1ggAlCoJt9IcUFAkAZdF2CnZYtnRVX3i0+1pmb5kmUAS47Qc2Z8w1wMevQHQub4BstMUCdBIRdVezi4007iJmp\/X9ObarFsAyjIHcK2hjUCRyxxub8ctd1M4sXdXLNjTM8uiSau1PdZc31iuBoxsq5CnjB7NS2EqbjQPcu6XIcRaPfYvDN6US4MbGfjEmk5uUobmHOnaGYYBbM50aKSz\/PqXVaQjRSnISsQmFupwdGbsronw7+VaGJGxCePiMVNrf\/rTWuzMuAr5mPZIM9Q9\/KROpxSHi9kDSeItFmjVjcJgIwqSG+uCDisFywDrooixESnFHDfbsDA5J3QtJaQBXcQBhZj7SCe8S54wlbAHTp+jwjvNsPaJrnx4DTu7yxfUWRQQ9La0q6dvYGent6oJDc01\/RSYCh7O88tsCeZtRCRwpfaxag3E90Pc2v8bWlNlUYMV3Bmk5PgHFHdt01DTYpecrGPG+KCj494KN8n\/cfGuWAab5yaqTXVkeuFbVTg+OFOHt0+EdzmfR47VUKiffOtwzUH3voiMZPCmtkVNycjqKQZEkXmfOymfa9S3JcEMkXoYZvOd910x5dzD+6XkyqRGVqXr8NatQOUKBZiJnjoSqh+EWsqgmntEA9Tfod3cyNmWVI0B6H2jSBrfoLW6wEKGdsknEFqh0W6JnAen3or3f08axxxusf\/SFHeLqKw9vjxjSVFt7VbsN5TnvGujl6DvgFsmcDDnRaKCZDhjh+yaWHAue7v0aJDkZRzEpUkWF7rfbtPrWXH9q9joEc\/UGRQiG\/rG+AV5FeEdWLioWo5gqyqF+BmpBZ7JuHY0V87K4JZcyxtLDL9Ouhnuj9JRYUNVI2iMtmHBJNkMGCJKYcur\/RZWb5STkmzM3\/Zkt6xDP+rFsCKKZQzPqbP\/Rso1BULdcikPeq1WwCX+PVcFIswQu3I+Y+ZDmugUyINLI7sXPB6ZBecG3xCX3S7PTTZ1HVykHSFGA4TTCSB6te\/hWi5J15vgEKtW8Uaum+SQ5yNdcn7SDBT7sQgS556GJGakOS58yfDHgBi9UmWH0ZxjDlWdYhYibyWrHdLRiag4w4OHCZVdGcXEjzs2xRyHm4e4cK52df82SlvMXAV1X4PzmQLJcX1\/V5WHQYRXo7QaW\/J7j7hxF6aqwLuOst\/eb4JXPhLPv\/\/fFgLJoW6Zg047Viuhi8RJbxwHsBoAP5Rffpvy4dECAe3+LlY0fTgL5sfNuOKdl1jgqU0L8JIsXMVFu9AwA4MZCCgn7LJwVJVMk\/Z3R22MnDww9gRxtNmkgi28b1BQa22Hysz7eAvPd\/4s8kQY1v\/QSI0L5INWqZ\/EVp0ow9P7ZVmCQ8jsuufnJMoNGrV\/+2uYMgCQTA\/gmUZ7EyWqMpwEvg+xrxfyxnHYeZtbjzSPWmP+GQAg3Wo567kmqP0rAhW+CBRnqbzUdddifA4So4toccBZmjR0fED4H6P9jtiKj4rbq+u8rHwYDehpLQ\/RShBM7QXSsVCCxG611mo+l\/N1w4RwzFaWhZLJX33+SeFVdzYnVXV0Q8CJCRujTbxqEyyMCjvp03J7isDKwb6\/S9eae31WcRJE\/GBT5u8QqAcmoFySLG+qpmlCgGpZMezxJdi2tHl+qPkkJVbPg1IH1qZanDn\/fCCOHCwDkLOVFSiCvvyd1qYbWYBN5IBjV533yvCbP+g3PyTJTCMNjulzvHrCJvoxOtwVvjWuIXmq8Cnr2+09sJIkm3fijMVjfXZ9K3QuROY9+\/nOki2hiQ0myCr+lannY","cypher":2}`,`{"message":"217kxO717Scp3LlI8qLXA6Lq+RGepTjnFeJYJhU7XANj\/O1mq3zcGmUqacb9SXrjVFaCLhANkeYzlYmLfXyIiNp4ajV0yE4z7cnPbx2ekU5q\/WJDnrw4dc24w5Klq+xvPfkFxR4MY6cYm4XYtWpoxgpcqB6P1AP4DQo0NLT7yHoSefvzWewF98SXC+Wz2IUzlj1JXxnFVFao8rBSZLgMEsI5Cm0608YLcSv5POIfpfM58QnZuzOgD\/oDJTz888o6KRqo6wyv7cTSZ9+ccNPUejr7\/5xZmjdKSBWjfYUWp2w7l1oYY9+XFKhP6Vl7UtoMwCH\/xX6nQ4UCCCK7SAkaIzDE4WNqYHubUT++1WtXUEnTyCe4ukdYzyIkgjv1txLRZUjSBcG6nukxOFvopRu8LuemwOWYYBXlo4UFzKA83zt9ZV0lBsieI5lPpCw79FLZL1ncfP5+4Px4+i+U2tgGDVjrB4BBNQ5kgluHu04bC0nwt7NA1u2FBuY8DcW2uOUiDLj3U6jyxeIzvhfBrm+x0wNBoOSzaQW3deNX7mMbGNk8TBVjjXSgzlF1hOWHv535sA23dIB4\/ZEnirYbimqeKCa7gDJV+jNpe36WpBh5F8iF2zoFkZhhjBgnb3xhRPHJqU6GPeKmgdmAj36EU8xyvt\/2M9cR3C0EC2L0wulkanZCLOm\/7mPEbBuyEoeZdEZ3PAzO2WS43oYpYlmpcAJv\/nfVKln9MxLDcRlL7b2nxV6c53dBaXRA\/JEqul50gxJTKvTTpJoVDG9uJ928T5E+O\/JK\/vM9r9IgUfodnSpjUzQprBBnAXAlo6hbAg3N1zEU2bQNVq2pHyyuBwnFXEpHR3w4yUL76kycTnjT\/HL17e5VOF8QzBegESfE2AZZHPb8sMCHmV3KMdP\/j1Cm07Y\/e7bHmD5zNtQ6rPI2lSdt+ZUQ+9Jl999jrbPJCf84fVRn03jjzMHLb7VX20rtNFMFhgf8VZcdBmOU88znctCw7KCPAgpzD8QMMxreZ99i3ATbjnMMmIb2QkFmgujJyrd5mN+++hnfSPxjxBFKd3w1tE1+Cf04QwItiSZE\/5vp9kqrFzsRyjRLMkFC8M2wBs0J5h6vPafUk75oSPUJbfcLNLPYuYi7NPkvhlczK0tJPeILA7pxnVJjBfd4oNqDe\/wMFI5iYOF5TUMexI6XBamQfbTzNGtb0+wXfE6NI0JS28oVNH1VcLFzziPw6Abxtva4jBmmKTkAibbaBw0sppY06sJn6uBUjKsghhL8yCdGMWd0pwUmpLWI+680zCBScL+b0Z7cefN+9r4fNfvT\/enUjmvYqW2zifsw1+8HSmXiNhAFU1iY746s7BDt1L7JOjuspULZQvaHex076daSdiKlDJLCg\/gve\/M8xn7wwWB3CCMpW3313MSnBPbBayGutAAkTigwU7cRPXD4DVdVwx1Gcqxm9zHap23w0QjJRvK4InvdmNr9wDM\/RczEdHKa91OYrnRseI6lION5jZiEm\/mjo6KwJ3yTa\/JFYlaPt\/h5hLkHmOzPoJLeSrXxp3b3V9ilHqMUT0hQ4axtB0djvFoDgnsVhAFlrv8AWwthnhg5dLA8oRyboxq+N0uC48o8IlElIT6d5WPXYMskN79mzxyfz7Qse42B1YAOf6moHw3MphJXMBQZGna3P2NcKgUFG2z5ktKYz67DLkpHFFAkqjAN9zehHefY0GxenhvfYjpDKHAZptKwIvYCKHsM8k\/4udCvk1FNbix55qlTlUoP\/IXHFahJK0FV05AkMP\/qNfXTyUvuZnMAbx+NpqZnAhMxJLKk+IIH5lzbNL80yV10TliRVcBWMzcq0jn9D8tP55LKkXDSaBI1CGA6akUmlQ\/xBDAr1tJXxlClLDr87nM99EwHVJQSd9hbPiSBGhD69zfvB8loQVaF07LVAiPw2z9gM5UN8JduscQXCa29REoD27nyiKJfhZ2o7CGaEikv73Q7AtUkX2jBZJ+BDLHz7+FdHDAFtrrb3Uju7TdJl309Wv7KTGBd5thVbFDzK7k\/ACf2t7o1N0jkNpelwI3Qq3liORcdWHQLJAphnRtzNzPNf8IrIKRKq++WZLUnjCom6ByF5i6Y+RzgQVIEdduk0U7iKLPciwLTXcW1YEAgBMxeItqeAtRopfcPX7ST7bIJWTRkcnnB09UJdEJh\/+RJXWUVl19GphDtZmB8FjwQc01jO1UFNsWe7HgcU6Abax+umlggKmbLAPRStJB7nO4M02E943auUtOy4QKDbf+iUQjFXC4GtjrmVKuFGBfCGZGUcTJzLd0wrVOuwniY4pezZ\/q+aBLIIxBe2QgCepc1Bq1sbt0g82wSChSZkgDQOd70QPbyesFuEzjS7NmHfnqGEArG99vF+9z1kFOvuEue2Zjl9Igfbl5kmpZmtoJ+EQBNXa4zPbZ8sIiZAYNnKB2FjLXrKguzpOmhl52lpY9KT5BtabAHQ\/qmTGykzWh3PxCgPkPjJU\/\/x5fMlJQnoLxC1P4sXg2Kg88mrl\/TxqKBhs5o48073K3EweHLScYcd8sw5RNMSu4J6I6q7q1H9n5r\/uix+8UV\/2F5STaaMxUj9LGXkgOu1fMcR9VNqLTzdSX5Dydocxbma0N1EYHQwjorsUtyPSpxTckslAurRD\/w6GEmO2tTrO4GG\/bmsmtfh\/XxnjJqgNa\/wuSDJkNksz2tbqN0XJ9QY1BL5wEsQ8h9wEF+\/\/m\/xbvNx3upMo7\/vywakS+3zbremJdnljE4ByOyg6hWVZs\/DZphYZgDZe5dWAO++SmydMh4DVNuCTON8TZclegyJrkw+M+h\/tiDAR1Cgga5YzqJQNZctdsni7KGnhouo57cjTFstY\/NOc1hpL4rwaBArIw2nLrcy7VWZxpuFNo2dBdkHAkeU9EK8D+bru4mSdOtzCcr2grAeIi135GOK\/Li9RHMEnp4HxTo86Pd94QnkgyNaIf\/knWlHTpaA5xzaDqyKO5H1a469eupHwL54JYGx0OE7+Qic3l\/lT+aWpd2P\/TpC1nehrkU6YxJIgD9Pszq0yVHiiTB2yVT7yeGXrsb3Q0eyOKnnRjSxC9h2vqtfx3D7sA4P8DcnVAh6GnWjPLIf0wetsRTFgTU3L6UBfiia95vquVNR6yRfj2AmDdSUVHHvEgdLvZJsEyeTsDGf\/3YfMAlxtAKSOKqkbgWS5j86sZ1iTLOholtq5pPoPmSS6+R+XXbXLQ95lPS9MPj9d10a3HPRH10WeXBowjK2noOYRcg+\/kJ5D\/iZS290JqcvcEJsWAb2By7Mw77MlOpxrozaDA3RnRiyhBokFaDk+jJUpB9bHNPwDo4UZgGbGU6z0m\/pNBS95RfZW6iqzTxpoiA\/\/tUYhqWmPSjwymB4zaLJX+APR7hJPswucfgGBDqsd7mE4LxC\/HL2c9dEtwe3+aLV8xi+2nkwlijn3uMz9yhgbEtiAmuXqFZcaUUierHfz8YUrvXIttKuka8m3maB4slEuMWCaAdbUoeIITS2Jz29ZuYLGjqtDlrcBB5vh6aHKP\/U+uhwMje9XZw0jGOiMmTH1XtTCDSMnSmyvjXf5IWyt3nh6\/3vIc\/BtAhHHtJ41wIbzbpfogBsDMQ5J0scT+mUBX20jOdKv6OhFX9cKCxhMIu+mqISm9BGgmZgXSqef3wWW7rurt0vPtX4VVYO\/g==","cypher":2}`,`{"message":"2IFcdLqHoBA4WvyCtde\/M+ZJ7ieOWdpDsswstf+FtfR8Cw4\/bMcRQ8koY7X6eQtrmlOl9Qu7fkl1qldxpjBB0DgaR1f4AgUZ1u+WkU+d8GojaVzb\/yCGdCupgxn8tf\/lNvLCwxFO6fC90Fd+q57SOyd234UeTz52nNjkaD7+WKhDddxqrUJk9HYp7OtAmzA0veZzBH50q7Cr0R7PAXP5sLJCxyAjRtx3LhRAFSnWHyk7FH8lRJVYiBCk4txodrqD5uTc2\/xMSgTAHGTTFW1ZYcxb2aG9dB8Ocp2rhUvRKqRn1s+xE97Mi4+LrH6XK28U7G1dk5iF63oF8pCz+uXpY3HvEDKlNoKuINdh7S\/ViJrrMXOnpl5\/3874ila7Mzru93DYWw1iemE0548O9d0mXPazIF4ggH+U4LJ8MQx\/BRIPoZm1sNsEAcKi3n3SrRj3IbCT4hcBN5z2alaiDm6k97Id2n6q\/CbwBACWfNqVeKLf8V0h4IP4h3G3o7DGYll\/lXpAmzfY5vPb2AXXObz\/OAK6vzvzD9npV\/Uk71FRo0ZO41lWtcGQ9iPDgK9BGCVD5V7vMNcrunY5s4TMTPKGBUTuqsccIUtYHabcORfew8xixHBeS2FgLtU7w5cxl8OsrxitKnccn6u8Tmu\/3S6U7D+X3miipqVolxjx1l59G5+wVmoSGb34uuTimJZaVGZTL\/A88vLAeV6krGbsZJPwzYrb+uHDxKmsWKINvx1WXSPawo3ibILkojp+whZ\/\/n9azjuoCfXUQ84xKX0N1\/dEDVs3CkBqReOz6yGfZcPntqTlj1D7xxt6Jdzo9k9mus+3g3lX8mHIMaO8v+JCCTCvCivA+\/1a3FZ0rlNt9dBEoJqz72xTUAqsCJPQg22uS4Bt9aoKmx3IaMRNHLQyyJaB2iyoYnj3x1YG8zNsjjBWFgOiGLZWkfInHZj\/1HC4zzVFXgfs7rkDCGlv2dCYjj6hpSYbkG7Cf1+sadSD5pSjjhVEwsTlUaKERlBlauUy+a3c8OvXot\/1B+udA+oR6gZY7lbfzKjMTzTP8IPR3HewyudOCuDUOgjrr8fKswpaARuRFx6S4kCtsmWu7faFauNNge5KAYejlu+JFehmeJXXACAVsxPy92ovQQgmPcLqq\/YUgkfODCpUqIh90T8TM14gSqa+ege2f6S+FYY\/YjQekMk1AcweB0q06kQi+SxXQ634SBvSj0Ayjpl\/h3ZB05Txb49oZbIOcKtNEHqV1r4MxxCeV39SWxIwRZt9WnU2OapE4\/8BjujHjpjEMF\/cW1qOt5qXYTNOA2FIuUoC97fsB9YqEzSE9n+UBKRNevSDShwO9VfncEGVUyuYopFbS4jZjeHi7j+wc3knTMJzUKWP57JB3P6V5c2VIJ23AAzLEiKfJiN\/XymdSRHWdUDRsuRSYnzcydvtEb88V8mjmJzJwKjbB2mIbhhzZtvWF5iwUs57+\/x+Gmg7DghQM\/jz+TT5HN9fyippVB6hGSo8Si0aEuTbXwr3FivPQ77w72Hr6TKuCpSNm0cHGY0zKSK\/i1VANKbyCM\/IZ6hvtIsMBS7jSRlEyQiC34YqJSrAP\/MwZhuCuCSeZutCLdp8QzhvEz5T6mkOK6trOOGIosGE0N0Rk6ojytSoTM\/oWPsSURkivm8VKdehnTtEEQat3r6rkurQgwklXxZ+Rn8GRC3gqC0ueEz\/8skSGuSeRan\/WI8kQFvHG+f0H0AArb5CSJUN6SKxT3h6MMAXnOyOba20BvCm7XTyt0bJ8pjVVdyNs2HORpvCHbl3qMZazh9ATfcFFZCTPTb9c\/HnIWKWHaUaHdLUG1MG1dWy02CIGP7JHJDbTaMNlQEmaYFa3xD9K2nxSyRXCPUYNQ6A251wx+5yaGRC8jYN7p7InT5fGYaaMmSCB1txKgg7PeMVM42y6nlBvpn6lbDA37o7YqbehcE6yCInGKBROX6jKzUPjKga5WosJ1BhZHnEdHbT2tNb+hHFkf55WTfR5hqKWZnEOhr1GQBgDyRCTMc340gx3t55LkZfvWfPOpv3Y9GK0eSr9JPzLQUzF1\/aNFD+Cm70qL3vhX+MYIPPrGKndcWRt8vbUTcRhiTw9jUbiT\/JBJxjNsdyQh44fhfMS1ftG88rHf58hxH1BX+NR2VpgLwePqDm6FQnIROfkjZoOHCGAm02fTqUB1zunQr8kfDjXEI0FquWijJFgpWApcv7koHyGOsAWHAVC3JER29cl\/ve0dnN9+yJKBloJ1YI27v7XHOxcehqxF8P+kDXzOFUDEPVDARJC3wspvPKACWahQ1FoDicQbtqNt4FDb\/i5lRGGIw3sdxR+RPvR+kpGmbP3poTYoygGDgfNWoJ26Q6m7kDmEXxeX88jWm3lVjVk8fj1znrWGxBrtywZnNfYQ1HmPIjh1ECNd61PJ3DwGdcAIMjdz4oKlMfjFol21v1kUV1Xun+J\/fuQRo2zQv1S+ZSFaC8sVUOqGh62KXFf1cwCZEr\/Km5opQ1erZXX2ewqOp\/rtXDLF3bJHxyq\/Yw7qQs9Uev1rQgnWQbVV3jQjP1i7Fd11K6gPLJqJwtEYtan5h1geEBdOLI0dUTMi0kduebbPSU+VoQErVYbqO06T4kDFsjApmdYpBvRBQVB+wR4uRLoLjmHu9MB7E4+El+vmtNkSU9uL01lctQh4xsnNr+rII+JNY94c8wH8Lm5TbfLuCusGDDKwiFgDY6zC6U3YXr3pWxopSPZK2AZCSDyLiAqFhGSjhtu2cxTWGHDQPpt8FDREblftRGyQDdlIpkbrfLyux6LFYJXNk2NJ\/npKtHBEOD+ttfmY6zjz3Xj56F+PkX0A2ijs1NiAjdgd+\/0evI9TMHFT8goJc7vYgxmFvEqmo1s6IXZHjqlNalymKDQ41L5dMTPxdB7J66H3Wxe6IVZ5Oo1dj6uqbN+vZfZYlbvIoEOli4d1a9tWxBY9DHMu8BEjDLHeNZIEl3\/F8K22Txc1TUwP7hBqEshO1ejE+i\/qYcd1fe0mnJcT8QJ8VS5AjkFOIuUIfRjnG22OvSxMovwa8YEWVBO1JBTWZncRhAw00lSbYojnORPoXxfJXhYypPNLFP9KG1coVO0K+PduH3xGcHtQZeKOacmTI1OF06mW1rJx6aAdAIOSLmr9pnmbot2e0genWMwDzC1QdI1xbtxamKgR2X7CpS2Bd9rPGGZdGxPKVDwnCNaznLbuYnzLNVJvc4T+ezqZOsPkFwQHpipPWbZIQPSvjn\/rTK0b0iCVg8\/n5AhRjhyA2SJ8mEVvhOOfsnwCBbAGDGXpv\/NQ2vUhGgZ+SmhmMr+IyWI0vqduPY743\/a2dP\/gZYZEw4L6GfRfYyCiPkmUPtdmnfxPm4Z4\/bnmSIOHHaW1VFRCmeNmuZLyq9zcb3RK\/8ZPZLTXNuLRh\/oUQzUFppWZJo8S14CPRft98GE61gQQQBnluLPNF4gtEuFduPBlVSlEEV5QwqRu6qW4orI3AdaTy+7EFhzOHIrjlA3M61otZUVlWH7Ee+hW86kPrsrd6BsQh\/rD4bslEI3R3kQkHiZpc9yslEHen3sdUGYqzdLrt+Kq5LhkX4u43\/FGzGNCOp6VZNA398kk3b3CMjvUsG22HzVXPlUbzF4qMeiptariJBrG0TgRzCWiFRo4DtK8rufmD2tv8wRkQlXPddyLw==","cypher":2}`,` {"message":"2BNkzxSxpu4hB6eyKJAgMh8dwLdugYFFBdHHBqKGElmwIWa9+vtfd5O\/dr+u82r5dcHJwf1K7y+WPvZ+9As0B8bU6WqdxdD8oU3gx1qF3fZRrCQNslmD9iqqBZQEw7eeAojnz\/vgafnvVGRgaO7hR4V7wdCfF30cKwqynyYUwBfgaZADxFxaG6aRRH4QJO+lvv4JtPbygMceQlmumbea+rD0yqekJMa8aQ6vqAJE3whLJoVjVS9U5UhLztSO3g\/i4UDD8\/QHTKNl1TU5wWU5zMqTKBsCMd1MsP3CksJJgYaBp+evx8giv\/kusb+LJgV9lnfESGKmmH9elZQUVlycS70PqrbJhrNpVCpuIJsdGaAU3R8itTQzRXAc+jI4zM1vFAsmSr6ahrt2GasbFKa1cvOZQ\/mw3SAHbsHArOI1gITX0G0FFzRLEYYhJfQ+IZIoe\/mvYM0EHqqGraGQb\/6T1Cc\/zsNTiSc6wucC1oulOAyl4gB\/8CsGIzz11kVOlOcCbTOkgHDh5xDnVU7lVYGsqgv9nG52mr9mHqJ37zuFsmCwm15++iUGlaS7Nn24cGxhK0ErYeX6vxMYyN5jvcsb8Xyy1OdD+MByuX6fg+cUJVEltzDFI1Sqjxd3BisWbwjSAVu8q\/pc+\/SAlSt35KPdlTRaMsOpLHnEkcyo8EO8gITOXsE5Oc84ZWp4j0n7ZCKzWYb6v6AA8ajAItX+uC2VaVbrAZkJicF2wYGcCRuAI2NcJe4fLn2aPixN455KIsNoj0g2OHQFRDVWFkRGr\/EEVE4jS\/+ztRcAarcmZRzGzNWk8nwvezuzD6f3Dd8JlwMYxqzOhBCZRNaNYrMJxjBhGPFsbNWQgP69zgXHXxktKsER60fs0u63o1vRcjogVbIqqUeBklOaj8BRKn8qcucIjW34bwIxGw3ULr8ymJpqd32wV9Jp5PehxJhLIbqAkAFSyu4SaBommZBPgieBPMrl3AsiYKpNyxsF\/A1VUZvcHouMsz1ZhzLzKZQ9LZwoGvC8zGBcLVQLTZIvgDDanDIYIW+ajxhMwTUJm18MRXdC\/kWMIVoHQBfEcWPA6Qp3MlBz\/a3z7jD5YxlBxrnM0wynuBOlT25sYVOv9sOcRPczEAnOujCOLWJPWHdZ8fl2Va4NOUskmlfy70UUlglytV8YockuMyzRMGyZAKHIgNccnIqibF8UrU8BxHtvV6lhknSFh6M\/yFBSM\/YjK7+ofQcqHUO\/d5uyoWPOA23G3oj\/1CUnbGRcSKv5YtVVrzVW6b2L6OF4kRw0qxPqy1tQUOsfFjxh+pPNE4POVMMsmtA4xNahIzfcll0q5bSRYjl6hb3YNUWfeolkmGSIeg8EOGTwlzs12Ba3f3dFSNGKKQs+9GC5hmictI4Oa4yCjbs6WJwWD6\/jN3yvYPndiYuuNA2qjxA3msfi5r7lJ4DWYYmt4kDuJ9SbvOrOUMLi49UyicTpwTw6AelVu\/9xPuDvLMda814kERFUFr\/wgieoTYKZw3uz6ULa64NHDEOD5aTybdcsQHjtv1wEn+g+5ehRXxl8i203wszKzN7laHouYLkLgbEiwhgDmqZGhLjE0ryJg95g+6EGTWv83AvPf+yI\/DFBwmw7r8unn3h9cqi+BKDhjFUDPd\/wKOdCxE7PsGrAp4G2ONa1sD\/sKVEZRNJHHiFaG04tBuh5pvDadPCg07F+thk85kPCqRiktqLvvN7LS40VaK1ntA\/t4MaJpoVmmwZem1KwK1ndU\/2LDTXiL3HOBn39z7Rxlw5NbJZL159qVsYIj8Owjt8wM8Jt2A6m\/8THTHGaa4IlexXCwxFz1Tml6sXATj8PaXoDGGYAyzxRdOvs2XipF3fGJ4RmYEAa1AN45UhTpfjkFIjymd+Pig+pj+HgNDNO5herFtL+n7M2pZOaLpz2oMlraKz\/VYB+7vn+pHGIAf\/m5mOKjXR2vgZGQGqrVjzlI\/yXF\/PIi3JMzjWQi3OqJpE7zGY2As5KiHVTzEbIjDVvYJiYRQf+zMb\/akEhHgMZk7lZYP5EPuUrB2zARjQhLn+wKVWwIYIfqPfb5TeeQ\/GfPaPr0so1U4ibYHmEYvjIsGMpRrZaCK8mt8DyhP6AcPCigpFd9gDOhMr00ptXD1Q1rZC8YELYhAcvh1arI9UlySFFaT9o9oP9N7HVn\/PHCEGXPcMTQYHWmpHbBI0VdtpYxl1nn4VGPoCKak5eJBbu\/\/jJYMnSzLQmHwjIeuz8NWhDChyNeLxTMemu3EIohddAB38zRBg9F+mJi9uMOAvT7yaNjf421X3qiE82s1r+C+fBFw\/Ia438paXTJVIK6a6FbUf3ndNweYIDlF00l8A6xTwiFCwYbV+HkGRyEP0hX9Nkb0sWr2HJ+qgovqeGBWBa0qOY2TEtU11kMw67Hc+\/ovfVuX1WBjxvQjHYDb7Zk+mUBwQIK3kvsW4ddvNuFVia7nvsryX0k5G2GfV9oQ7GkSXQHmqcnXpQMybJiGozlqjrBBCnfw3mOUrBGj16rmPDGrt+0cjT9LMVROU3jDCLT3jcb8qbMI\/J4wY1VWhWlin7e0Rit0HFeke98AS+jAjGiLoBeLQAwFtWV6YZtDY3mroLYBKaBOhHxDoO+xtV96ztqLT92Ht9H21JjzbGU2gDPLgXNgRJ5YMzNPuoQ9Uz6A9rgLqHMbvMx64HCfb1WA0PlMDmS4WtqGXarhOfiAFyt1wzAPBBiDSvlYGfKvmvyqdvtLWcS5YTb4K1yhBLGov4SwvqHPyZTl9H65yorPlzJ8b\/6H536YXuz7WDalA2jtTJj53gL1CdNj1H8DdcfWiMmVXX52BDJojnfD0uNVgQ6NsEbHlWXX9TFa0KI0\/33rDmQVN1DzS6l4MB6RNEwvetv4GwbDK6\/01ThtHiwqn09Of9ce5VjljRBe8TMqUK3c6FAoCF9FLhf6japUjhOh5CnNrs9ztU\/MDIO4aU2gYhR+o2Prh1qEbBNHfmHljs3V0fTKZexdvNG0+BjdEH8QDhE3riLgpr6yQWSHM63xHQcmJZXvQ5QMQLTDzUCFZmBO8w7zgx6xYdbgoSRLvtLRlUnufErOR5+ScDJZKC12GS6pZCfW8pXjQow0jXI\/CWz7zD0KLH9z0mCx2lUvFBTrxq76JnJGdGEDA0mCPNvIkuPvMcJPwaZu0Gl2NyEbBVXbHPdSRKlJ28Lkfe8avV2qlOwSnsioEGI+xbe5SWrChFLwM95h9Dt9HJaPnyqUsYZ7uoxwPxhLcIAxWMnB+w3VMvv9uFYs16Nd8A7h6KX04QbW5+hT41ajEqXnhf0+pt0ZZZV93QDiHUr+ZQxIqDnrY1avMGhcWIXjZuN9xP\/h+6aGeXrBcBEhcxKPRBxV0yZ6WzSjryWyCMh555yRB+qwMwlBaJ8G6LMzx\/Akcj16tWatzJ8ep12N5G7aMAz6gAiWVtRn5YMd3plBzA1FKz1JXpCTzed5icxn6OY31ZXD1XWRc2uP\/1nzd3Gkc013XgjmrjYCFTtPJHkI6+diSobZdubWI+f12arJM+Epa2aMh4dP8438qNj\/\/TSpVNuZngjbEvfmKYJIaVU7XHrUKngn6MspzioyTfwvuHUZCz+U2uyZUOb6CPXzUhSxGgbSlsAWKLpkTrzNEQKsteJsrvwXdA1nsVHGHlG4gAKKquYhFYgBogHGxhnJKBZ0zYh6Wlg2OzJYMRxfAND0C6uAGmndMZAo4Nn9CKYlxt4e\/Yc1xijwszUi7ldFg==","cypher":2}`,`{"message":"2g5DrM8tHQG7GUcxNLaQZEPxVWGMmN9TwsZ0wvM\/NJOgPKpdlMlv+s4FI+yQJgIDwRR6vzjF44Zq4IByYZVei1re2w8haqidI4liB5ZzKi2F49XTH9g5W2owfpYZzW0SxqUsDDMYF1HZPvD9pzFfQR\/\/BuK99L2udAumdmhJQ0\/dXBY9j8i268ljWGDwXz03Gg9nZLw0wvEXeF0VkaYxMHW7sSBiX3zjivW82BJjRRlLZ7PasXS6kIyMKrwYNHXmyNHXQSBGeN1oLbxp3bhoVnUTRDhi+3M1Rjzl+opisPYY9BqfJonG9TKFvKFY6R0fRwxPv+r3RfNI6++\/zxF0Jc8Sj4ZDViPlfBYNuPpYcc\/5pVS8njKvJlUxkzXYDfp7kYJ4kSDQIVMn0H9F6BQ1nuDTPRnhmr1gvjQmDGbWjrTpZovaUk4Y590iM6YQsApyp1QZP8uW2+WiswcHfyEwmEWrxEq52Sc9lZNoJRPo6WmzTyXPslUsKgRdp4CulZ67EmOe46ADH+q4QQi9daGMcuahKg1QJfelXa8uzWcU1WqxY5XJKqP0ZEM6odgjtO9FMqukYWVECOME0OHbDUIAetq4UPcSWauteuU3aNquZZMa\/BU7TKdWC15wnteWc3mihdpot9Zk0h+YIxVcvj15JXpBPG10R8izS6ym7aFzxVVRsjZHtPT9yK+djTaQihiSJlB6as8CxyCZSr8AIOMb4E+\/iSbJBi1rEcnYBT2MdTXnjWKXbxtzEZJEUHLclwhOw\/AOq1nq1yrctfaqoux7InjGuRQQ1il8KLDNTomiaqsY77ddYsns9sTkHsk\/LyIE87PZPvxSlmi6i55lDJ63YH94QP\/xZAWKB3q8yW12cmMa96+LHbRIPRs37a9BAlfkXSOLtW5FGVzrziAvvrqJFL0CeiLqKpueIyxjMHpasIeRYDYiVz67\/2IiSOE6sfMSiq9cnNHXTsig34WfnSy2NZxZGJB7hccBNGxR6DYpLNMkBFNM4Rjb9\/PTltF4dz\/sDfUjcxUqvyrG1bVirU\/outg+7iN8oJUpfB9rVlJYNt\/G7oFEBJyRelAD9w2Is5Tm8TqI7T9IQpWjTsXIglc95qOr6b1p6bQfyRfOP+Aui192+utEsOXh6uJxt78oe0yqoIGpGEDIUcG0Aph\/u2HDtpkAqcXiSf5sHQw5PEpbzHIV+q9oXdV8r65L+h0LtTJ4jcMeSiwuW8arLusWDfZIqW\/aGcxCwWpzRB3LU6fabnbnFNMnGHr33bauXpVbhgkeu3uyhCYo5uR38FDfwUdd\/gXjUS5d\/biCIDteY0M17Hcs0osG6xXvU1mstGEviO4G2Nnof+E0xGPOxCJcnI9sPr4VyjdlLD74yoamFTTTcIrVvI5ChVsxKtEyBGJd25\/Xl15t0ZhuC9ocnIAjQ7amNQO8L+CK8gHOZfFmutRRxjDtRko5NT6l2aGvaWxIhKvr1uWwnRyOvdGdudFSXGbqwGz787AIkaxUofMSmYjvOpxMjlXksfa5GnRETbVZXSvzWIBVzFR0O8NmM4uFa1ZgGdGUfRhPQHpd9wrf5UBVNCVp5tJvu9had7vycAEZAhkH40hMfs55ORAUgDTR8Rq0Hbp2pl9JovXjA27OMps1qdwclXSjLyLYV+HoZq1iePkKld06T30lvyqA5edtN0Yw9EIku82ewlF+X\/ZHgxByEh1Tju+3YgytiL9sM3vcN8HHzm7G0YRNspaSmvddyjWZnCcvBf25uHfdJ\/1EDXUgarS\/+MgQ\/bSHcVeZbcJ7\/ogsA+SwFLkjv\/e\/aM+BIrHKhCePPjYucy\/heOzPEroYrYN49DFsHIpqOk8DXMFSeDfI6Q+VLpbXjqCMOMahmRLtJJ6cBzCETbnRSdLmLT\/dYXTCtb7JV8VluhldzIVlh\/C1hR1MUeLzZGbBsg6UcAyJ\/EwEAPxtFPAoeexeqT8c8TUyiMWxlHtyO\/4fScVfCGJu4\/ANYUtJ92oF0uhCmX59njAy+fQRMBM77xfvjTVpcOO+yYKwKoPs3ZM\/\/uyjZUeRi9yEBgxnB5ks+Jq8Itd1zkz\/RFmjaD\/btzaFB3C86cfP5V5xxscSAIxOdk4feMevZsmJBqLREjbOIvkKg17BQpp6lK4jGQoa3Wq49rHdSN9Anc18h7gJkftRqiFgwXegqzW1wHWpRl\/G2P4i1Q\/g2CDRNEvplAAP6NfxOWNG+IsQiVAOt3EA9xQHZwOS2yfTZQJjZaR6NDiCRHTRCTwVLnsJ77jx+mPE\/2xRVlkiI7h8Hi96htpZjRPbzKpZS3pzdB6D+8hE9fE\/IBUgkrY91iZGEFwFbv01MqOCm4GRsACOEh4zjjILWMH1rZ3K3AXu6B6HAp2BRDmdbgFNBgeeJkzAemu5NSxgubayXUOzWTSGzb3CrOjb8mFdKbMtXMs8I0QyO4\/CNgeXl8TGDWitw1pYzXRS7HvWQ\/MlSVS+oG9ZtzXm5qXzk57EhlDUkxe36vrOqeOJmGrxDt9sOSsXPwpXaaCsuwmmSe\/qwHJrtlFFB9UELuH+vyaGhg1L0wjVcoJLObBRpoXES2pipA+rsgz2GUhw6ubOdGumNEAWbCr6lnq4wYGqTade5yAE15pu+h2tvcbW9kGbwhsQnPDQBfo0B\/jWJWia61Eb+qwN6impjRQrukpepRYy+3PBV0v3idtSRE3E+Mvg\/LWyKhkO3s\/WfFyXR5eJnyWl+vQw6n2OodLk8e+m8OlL3L2X8bBSeHVwkuhdAZXHC7N2QZYoM9mKyHDXq8nYCpllPCB1OUspj14Be0lmIVk6wGcJKorwUctLQKq7IJ2elFGMN1VIMgv7qRdhfC5Nj27xvke8XqJPhhPceQOffkFjaVlrgn+TMbvFpaoZ5txudw0RtnKpZH3wc+tdONI1dAqGz0AY8aYCOiSbZBjwz3nez\/L9t0sQ\/50Icqcw+K\/rw27s\/QCHGY+bMLRhG7fHvaa1\/sJGp0gNzGF1gzPegwjUCedr\/4reof9TRvHS\/UC6EvhZlpggXxdmMXa9nSfO7PJul9jp6FmtX31GDEIybI\/YltSJuDXq8MNzrveeMbfbc2l8ucHIYalv3ByznHVVDIQ6jzfm9Eu\/TVsH8cCKhoOGWNqdBAGij7C9NhQvpINDJEHkKptB\/7cOpp\/GIG3FTT1pmZyvf4hNID6hZZMAvRCy7vTl4RGqpmsNGwANIbK6ToRc95JxUVqSs0kS\/m7g2W2bFyk2FynYvazWgBHULbeWRs12a1vWoMtk3hFfH7Sd1lo2uWl9KuLDD4ufcKmDJ4xHQsT265lATs1htqvYsrfN6V+gx60jA5HLskoEvvOAIIt1lo7S3EQK9PuAhh67VBVsm7+gfbJPV\/vvnlUDY7V89Mx6MyFBYv7YFk4vF4cO6jzRfnBBC56odgD75X\/4te2j9YCoAPqOTOzJAINwFRZJcgIjoy+DDMJvhd5uSOG0pjXslPurf+oV7xrCPiSIm9LcWFxiqSZdrNsvSYTZNyJxsue0oHdRhkve9UJH0rdY8mhJ50gusa+uS7HGQ7hduNYtIgFWBYXudLYsXgOVVv9Gw2jV707ZGyQTjJ7AaSLQJkdI3URVCyspFAHA\/a7EvuVlogp+0qc8zg6jqwCOPy7+L5ILTe37Dnmpf6ob8nPKu3FS3hF\/e2nVYmaJ04yK7JtHn36jAnByO8H5KNyS8hOFJZiH+788h1BT6kJl8rbH2udTf","cypher":2}`]


//showmsg
async function showmsg() {
    if (tz == 1) {
        if ($.isNode()) {
            await notify.sendNotify($.name, message)
        } else {
            $.msg(photonmang, '', message)
        }
    } else {
        console.log(message)
    }
}
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch{return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch{return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch{} return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch{return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const {statusCode: s, statusCode: i, headers: r, body: o} = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const {statusCode: s, statusCode: i, headers: r, body: o} = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const {message: s, response: i} = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const {statusCode: s, statusCode: i, headers: r, body: o} = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const {url: s, ...i} = t; this.got.post(s, i).then(t => { const {statusCode: s, statusCode: i, headers: r, body: o} = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const {message: s, response: i} = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

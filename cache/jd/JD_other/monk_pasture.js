/*
有机牧场
活动入口：蒙牛京东自营旗舰店-会员-有机牧场
活动时间：2021年4月1日 - 2021年7月10日
脚本默认会开通2家奶企的会员卡，如介意开卡用户请勿添加脚本运行。
脚本默认会加购商品，若介意加购用户请勿添加脚本运行。

环境变量：如需兑换奖品，请自行添加 export PASTURE_EXCHANGE_KEYWORD = ‘’（请尽可能输入精确且唯一的奖品名称）
环境变量：如需关闭自动升级，请自行添加 export PASTURE_AUTOLEVELUP = false 默认是开启的自动升级的状态

参数 helpAuthor = false
更新地址：https://share.r2ray.com/dust/member/monk_pasture.js
============Quantumultx===============
[task_local]
#有机牧场
0 0,1-22/2 1-31 4-7 * https://share.r2ray.com/dust/member/monk_pasture.js, tag=有机牧场,  enabled=true
================Loon==============
[Script]
cron "0 0,1-22/2 1-31 4-7 *" script-path=https://share.r2ray.com/dust/member/monk_pasture.js,tag=有机牧场
===============Surge=================
有机牧场 = type=cron,cronexp="0 0,1-22/2 1-31 4-7 *",wake-system=1,timeout=3600,script-path=https://share.r2ray.com/dust/member/monk_pasture.js
============小火箭=========
有机牧场 = type=cron,script-path=https://share.r2ray.com/dust/member/monk_pasture.js, cronexpr="0 0,1-22/2 1-31 4-7 *", timeout=3600, enable=true
*/
const $ = new Env('有机牧场');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
const cp = $.isNode() ? require('child_process') : '';
let cookiesArr = [], cookie = '', message = '';
let helpAuthor = true;//为作者助力的开关
const exchange_keyword = $.isNode() ? process.env.PASTURE_EXCHANGE_KEYWORD || "" : "";
const autoLevelUp = $.isNode() ? process.env.PASTURE_AUTOLEVELUP || true : true;

if ($['isNode']()) {
    Object['keys'](jdCookieNode)['forEach'](_0x2eaf81 => {
        cookiesArr['push'](jdCookieNode[_0x2eaf81]);
    });
    if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
} else {
    let cookiesData = $['getdata']('CookiesJD') || '[]';
    cookiesData = JSON['parse'](cookiesData);
    cookiesArr = cookiesData['map'](_0x36d434 => _0x36d434['cookie']);
    cookiesArr['reverse']();
    cookiesArr['push'](...[$['getdata']('CookieJD2'), $['getdata']('CookieJD')]);
    cookiesArr['reverse']();
    cookiesArr = cookiesArr['filter'](_0xf7748f => !!_0xf7748f);
}!(async () => {
    var _0x15af41 = {
        'BZkmj': function(_0x360f3a, _0xe1bda3) {
            return _0x360f3a === _0xe1bda3;
        },
        'JMxBQ': function(_0x168ab3) {
            return _0x168ab3();
        },
        'mehod': 'MsGNg',
        'OuELa': 'application/json',
        'UVHkF': '    └ 平日里让你多喝奶你不听，现在被奶企嫌弃了吧。',
        'oHUiH': '成功获取到token',
        'tfvoL': function(_0x826897, _0x75491a) {
            return _0x826897 !== _0x75491a;
        },
        'lwiiw': 'nsDdJ',
        'GyvjU': 'TaWok',
        'XUMJl': 'api.m.jd.com',
        'dfQog': 'https://h5.m.jd.com',
        'vOBqv': 'gzip, deflate, br',
        'akPsc': 'jdapp;iPhone;9.4.0;14.3;;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'kCiqn': function(_0x4758f3, _0x329eec) {
            return _0x4758f3 > _0x329eec;
        },
        'gETsE': 'tkyRn',
        'VlpMB': 'EHXWM',
        'pTOVo': 'super',
        'TiMby': 'manito',
        'tvnup': 'ApnuF',
        'OwAFe': 'PaojQ',
        'lkExA': 'qYybU',
        'MOvNo': 'zOoPs',
        'KfKvP': function(_0x3d6636, _0x3bef1c) {
            return _0x3d6636 < _0x3bef1c;
        },
        'cmfOx': 'EEvQh',
        'cxMLP': 'CyEfb',
        'wGxIE': function(_0x1b0c2e, _0x12aa0c, _0x541e16) {
            return _0x1b0c2e(_0x12aa0c, _0x541e16);
        },
        'OxFpM': function(_0x34df90, _0x42e17a) {
            return _0x34df90 === _0x42e17a;
        },
        'LqfMx': 'CnUxl',
        'rlecP': 'LTaKv',
        'LeSxS': function(_0x3d9e8f, _0x1eef98, _0x309b26) {
            return _0x3d9e8f(_0x1eef98, _0x309b26);
        },
        'yDdni': '├ 当你收到这条通知说明你可能在使用【JD-FreeFuck】项目\n    ├ 如果你并没有使用【JD-FreeFuck】项目也收到了这条消息请私聊我\n    ├ 我不喜欢【JD-FreeFuck】搬运我脚本的行为\n    ├ 建议更换运行环境\n    ├ lxk0301 docker部署方案:https://gitee.com/lxk0301/jd_docker \n    ├ 青龙 docker部署方案：https://t.me/c/1465257366/31 或 whyour/qinglong 请自行查找。\n    └ 不愿透露姓名的大佬的部署方案:  nevinee/jd 请自行查找。\n\n ',
        'biVwj': '京东返回了一段空数据',
        'kuhQQ': 'MLHRA',
        'buLbB': 'application/x-www-form-urlencoded',
        'bFjbe': 'keep-alive',
        'ETAdo': 'zh-cn',
        'rXYvJ': 'ekFqo',
        'wXHXm': 'CPLYF',
        'EstcM': 'https://api.r2ray.com/jd.bargain/done',
        'ynJyb': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'sjzIT': 'cd .. && git remote -v',
        'ZirQG': function(_0x417a22, _0x45f67f) {
            return _0x417a22 < _0x45f67f;
        },
        'djszk': function(_0x257fde, _0x426b83) {
            return _0x257fde !== _0x426b83;
        },
        'MMESx': 'LHsDJ',
        'oRwTg': 'eLRLY',
        'JbMwH': 'JdKDw',
        'vCtWN': 'lwUYf',
        'RPasr': function(_0x45cef5, _0x1cc877) {
            return _0x45cef5 !== _0x1cc877;
        },
        'sqpSr': 'zaywr',
        'ceSmU': function(_0x2e217b, _0x20fc66) {
            return _0x2e217b === _0x20fc66;
        },
        'HaSPG': 'JmTtK',
        'lFHzq': function(_0x15c1ef, _0x26fe4e) {
            return _0x15c1ef === _0x26fe4e;
        },
        'iAgLA': function(_0x5844da, _0x3dca82) {
            return _0x5844da === _0x3dca82;
        },
        'AurPK': 'UPhtl',
        'zZgEC': 'JaCCW',
        'ChBIA': function(_0xafa6d9, _0x287a37, _0x2766e7) {
            return _0xafa6d9(_0x287a37, _0x2766e7);
        },
        'gVYgU': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        'bWJli': function(_0x5a9af4, _0x32be47) {
            return _0x5a9af4(_0x32be47);
        },
        'SOhQC': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'dgUZD': function(_0x44953f) {
            return _0x44953f();
        },
        'NmPqE': function(_0x37ad76, _0x596044) {
            return _0x37ad76 !== _0x596044;
        },
        'TXmSF': 'PGnRZ',
        'cMVjV': 'TAkJb',
        'qIHXA': '\n本经书免费使用但不许传阅。藏经阁地址：https://t.me/monk_dust_channel',
        'uElxv': '遇见你是一种福气'
    };
    if (!cookiesArr[0x0]) {
        $['msg']($['name'], _0x15af41['ynJyb'], 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }
    if ($['isNode']()) {
        cp['exec'](_0x15af41['sjzIT'], async function(_0x3ec2cf, _0xb4c60, _0x458893) {
            var _0x1bcd91 = {
                'KLTPB': _0x15af41['UVHkF'],
                'ICEuC': _0x15af41['oHUiH'],
                'AqkhV': function(_0x2c565d, _0x341a92) {
                    return _0x15af41['tfvoL'](_0x2c565d, _0x341a92);
                },
                'DoPnZ': _0x15af41['lwiiw'],
                'ACiex': _0x15af41['GyvjU'],
                'pwjAo': function(_0x15d168, _0x297c1e) {
                    return _0x15d168 === _0x297c1e;
                },
                'gQNFz': _0x15af41['XUMJl'],
                'QaRbT': _0x15af41['dfQog'],
                'RhLQU': _0x15af41['vOBqv'],
                'qCEiy': _0x15af41['akPsc'],
                'breMK': function(_0x594df0, _0x37e061) {
                    return _0x15af41['kCiqn'](_0x594df0, _0x37e061);
                }
            };
            if (_0x15af41['BZkmj'](_0x15af41['gETsE'], _0x15af41['VlpMB'])) {
                $['log'](_0x1bcd91['KLTPB']);
            } else {
                if (_0x15af41['BZkmj'](_0x3ec2cf, null)) {
                    if (_0xb4c60['includes']('supermanito') || _0xb4c60['includes'](_0x15af41['pTOVo']) || _0xb4c60['includes'](_0x15af41['TiMby'])) {
                        if (_0x15af41['tvnup'] === 'qimOy') {
                            data = JSON['parse'](data);
                            if (data && _0x15af41['BZkmj'](data['code'], 0xc8)) {
                                $['log']('   └' + data['msg']);
                            }
                        } else {
                            for (let _0x439c71 = 0x0; _0x439c71 < cookiesArr['length']; _0x439c71++) {
                                if ('yJopm' === _0x15af41['OwAFe']) {
                                    resolve();
                                } else {
                                    if (cookiesArr[_0x439c71]) {
                                        if (_0x15af41['BZkmj'](_0x15af41['lkExA'], 'qYybU')) {
                                            cookie = cookiesArr[_0x439c71];
                                            originCookie = cookiesArr[_0x439c71];
                                            $['UserName'] = decodeURIComponent(cookie['match'](/pt_pin=(.+?);/) && cookie['match'](/pt_pin=(.+?);/)[0x1]);
                                            $['index'] = _0x439c71 + 0x1;
                                            $['isLogin'] = !![];
                                            $['nickName'] = '';
                                            message = '';
                                            console['log']('\n*******开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '********\n');
                                            if (!$['isLogin']) {
                                                $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                                                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                                                });
                                                if ($['isNode']()) {
                                                    if ('mTfoh' === _0x15af41['MOvNo']) {
                                                        $['log']('网络请求错误:' + err);
                                                    } else {
                                                        await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\x0a请重新登录获取cookie');
                                                    }
                                                }
                                                continue;
                                            }
                                            if (helpAuthor) {
                                                function _0x378034() {
                                                    var _0x15ca39 = {
                                                        'xrGPp': _0x1bcd91['ICEuC'],
                                                        'ZuHoq': function(_0x3b5030, _0x17faf3) {
                                                            return _0x1bcd91['AqkhV'](_0x3b5030, _0x17faf3);
                                                        },
                                                        'JliCf': _0x1bcd91['DoPnZ'],
                                                        'mrQrB': _0x1bcd91['ACiex'],
                                                        'dDqCp': 'https://api.r2ray.com/jd.bargain/index'
                                                    };
                                                    return new Promise(_0x508719 => {
                                                        var _0x260186 = {
                                                            'VrPJL': _0x15ca39['xrGPp'],
                                                            'lzwBb': 'BNYiF',
                                                            'JqFlJ': function(_0x5b9edb, _0x409389) {
                                                                return _0x15ca39['ZuHoq'](_0x5b9edb, _0x409389);
                                                            },
                                                            'PDYJS': _0x15ca39['JliCf'],
                                                            'IblDG': function(_0x5cfebb, _0x17009f) {
                                                                return _0x5cfebb !== _0x17009f;
                                                            },
                                                            'Zsnsp': _0x15ca39['mrQrB'],
                                                            'CPggK': function(_0xc1801) {
                                                                return _0xc1801();
                                                            }
                                                        };
                                                        $['get']({
                                                            'url': _0x15ca39['dDqCp']
                                                        }, (_0x35407f, _0x4f3314, _0x2f4a1d) => {
                                                            var _0x4f77da = {
                                                                'gQqYD': _0x260186['VrPJL']
                                                            };
                                                            try {
                                                                if (_0x260186['lzwBb'] === _0x260186['lzwBb']) {
                                                                    if (_0x2f4a1d) {
                                                                        $['zData'] = JSON['parse'](_0x2f4a1d);
                                                                    };
                                                                } else {
                                                                    $['shareCode'] = '';
                                                                }
                                                            } catch (_0x2630bf) {
                                                                if (_0x260186['JqFlJ'](_0x260186['PDYJS'], _0x260186['PDYJS'])) {
                                                                    $['token'] = _0x2f4a1d['token'];
                                                                    $['log'](_0x4f77da['gQqYD']);
                                                                } else {
                                                                    console['log'](_0x2630bf);
                                                                }
                                                            } finally {
                                                                if (_0x260186['IblDG'](_0x260186['Zsnsp'], _0x260186['Zsnsp'])) {
                                                                    $['log']('没有兑奖次数了');
                                                                } else {
                                                                    _0x260186['CPggK'](_0x508719);
                                                                }
                                                            };
                                                        });
                                                    });
                                                }

                                                function _0x2e742b(_0x1a7bd1, _0x1def28) {
                                                    var _0x1dfec3 = {
                                                        'yZcqW': function(_0x6d2b22, _0xf14e05) {
                                                            return _0x1bcd91['pwjAo'](_0x6d2b22, _0xf14e05);
                                                        },
                                                        'ZgUfW': 'djqUa'
                                                    };
                                                    let _0x261e3e = {
                                                        'url': 'https://api.m.jd.com/client.action',
                                                        'headers': {
                                                            'Host': _0x1bcd91['gQNFz'],
                                                            'Content-Type': 'application/x-www-form-urlencoded',
                                                            'Origin': _0x1bcd91['QaRbT'],
                                                            'Accept-Encoding': _0x1bcd91['RhLQU'],
                                                            'Cookie': cookie,
                                                            'Connection': 'keep-alive',
                                                            'Accept': 'application/json, text/plain, */*',
                                                            'User-Agent': _0x1bcd91['qCEiy'],
                                                            'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=' + _0x1a7bd1 + '&way=0&lng=&lat=&sid=&un_area=',
                                                            'Accept-Language': 'zh-cn'
                                                        },
                                                        'body': 'functionId=cutPriceByUser&body={"activityId":"' + _0x1a7bd1 + '\",\"userName\":\"\",\"followShop\":1,\"shopId\":' + _0x1def28 + ',\"userPic\":\"\"}&client=wh5&clientVersion=1.0.0'
                                                    };
                                                    return new Promise(_0x1b8643 => {
                                                        var _0x1256fd = {
                                                            'gBPdp': function(_0x37550e) {
                                                                return _0x37550e();
                                                            }
                                                        };
                                                        if (_0x1dfec3['yZcqW'](_0x1dfec3['ZgUfW'], 'RHLgz')) {
                                                            if (data) {
                                                                $['zData'] = JSON['parse'](data);
                                                            };
                                                        } else {
                                                            $['post'](_0x261e3e, (_0x4054ec, _0x472ad1, _0x1e3126) => {
                                                                if (_0x1e3126) {
                                                                    $['zRes'] = JSON['parse'](_0x1e3126);
                                                                    _0x1256fd['gBPdp'](_0x1b8643);
                                                                };
                                                            });
                                                        }
                                                    });
                                                }

                                                function _0x304855(_0x334479, _0x5020ca) {
                                                    var _0x6459e7 = {
                                                        'dgwDN': 'cXgBq',
                                                        'ufeqf': function(_0x242b60) {
                                                            return _0x15af41['JMxBQ'](_0x242b60);
                                                        }
                                                    };
                                                    if (_0x15af41['BZkmj']('dreoW', _0x15af41['mehod'])) {
                                                        $['log'](JSON['stringify'](data));
                                                    } else {
                                                        let _0x38bedf = {
                                                            'url': 'https://api.r2ray.com/jd.bargain/done',
                                                            'headers': {
                                                                'Content-Type': _0x15af41['OuELa']
                                                            },
                                                            'body': JSON['stringify']({
                                                                'actID': _0x334479,
                                                                'actsID': _0x5020ca,
                                                                'done': 0x1
                                                            })
                                                        };
                                                        return new Promise(_0x1ad642 => {
                                                            $['post'](_0x38bedf, (_0x13b56c, _0x3f4ab9, _0x11e71f) => {
                                                                if ('ipJKm' === _0x6459e7['dgwDN']) {
                                                                    $['log'](_0x11e71f['message']);
                                                                } else {
                                                                    _0x6459e7['ufeqf'](_0x1ad642);
                                                                }
                                                            });
                                                        });
                                                    }
                                                }
                                                await _0x378034();
                                                if ($['zData']['data']['length'] !== 0x0) {
                                                    for (let _0x439c71 = 0x0; _0x15af41['KfKvP'](_0x439c71, $['zData']['data']['length']); _0x439c71++) {
                                                        if (_0x15af41['tfvoL'](_0x15af41['cmfOx'], _0x15af41['cxMLP'])) {
                                                            actID = $['zData']['data'][_0x439c71]['actID'];
                                                            actsID = $['zData']['data'][_0x439c71]['actsID'];
                                                            await _0x15af41['wGxIE'](_0x2e742b, actID, actsID);
                                                            await $['wait'](0x5dc);
                                                            if ($['Res'] && _0x15af41['OxFpM']($['Res']['status'], 0x4)) {
                                                                if (_0x15af41['LqfMx'] === _0x15af41['rlecP']) {
                                                                    data = JSON['parse'](data);
                                                                    if (_0x1bcd91['breMK'](data['data']['length'], 0x0)) {
                                                                        $['shareCode'] = data['data'][0x0]['share_code'];
                                                                    } else {
                                                                        $['shareCode'] = '';
                                                                    }
                                                                } else {
                                                                    await _0x15af41['LeSxS'](_0x304855, actID, actsID);
                                                                }
                                                            }
                                                        } else {
                                                            $['log']('    └ 完成任务，获得 ' + data['add_coins'] + '个金币');
                                                        }
                                                    };
                                                };
                                            };
                                        } else {
                                            cookiesArr['push'](jdCookieNode[item]);
                                        }
                                    }
                                }
                            }
                            await notify['sendNotify']($['name'], '    ├ 当你收到这条通知说明你可能在使用【JD-FreeFuck】项目\n    ├ 如果你并没有使用【JD-FreeFuck】项目也收到了这条消息请私聊我\n    ├ 我不喜欢【JD-FreeFuck】搬运我脚本的行为\n    ├ 建议更换运行环境\n    ├ lxk0301 docker部署方案:https://gitee.com/lxk0301/jd_docker \n    ├ 青龙 docker部署方案：https://t.me/c/1465257366/31 或 whyour/qinglong 请自行查找。\n    └ 不愿透露姓名的大佬的部署方案:  nevinee/jd 请自行查找。\n\n ');
                            $['log'](_0x15af41['yDdni']);
                            return;
                        }
                    }
                }
            }
        });
    }
    for (let _0x8a5b5e = 0x0; _0x15af41['ZirQG'](_0x8a5b5e, cookiesArr['length']); _0x8a5b5e++) {
        if (_0x15af41['djszk'](_0x15af41['MMESx'], _0x15af41['oRwTg'])) {
            if (cookiesArr[_0x8a5b5e]) {
                cookie = cookiesArr[_0x8a5b5e];
                originCookie = cookiesArr[_0x8a5b5e];
                $['UserName'] = decodeURIComponent(cookie['match'](/pt_pin=(.+?);/) && cookie['match'](/pt_pin=(.+?);/)[0x1]);
                $['index'] = _0x8a5b5e + 0x1;
                $['isLogin'] = !![];
                $['nickName'] = '';
                console['log']('\n*******开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '********\n');
                await checkCookie();
                if (!$['isLogin']) {
                    if (_0x15af41['JbMwH'] !== 'BVTBz') {
                        $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                        });
                        if ($['isNode']()) {
                            if ('lwUYf' !== _0x15af41['vCtWN']) {
                                data = JSON['parse'](data);
                                if (data['errcode']) {
                                    $['log'](data['message']);
                                } else {
                                    if (data['token']) {
                                        $['token'] = data['token'];
                                        $['log'](_0x15af41['oHUiH']);
                                    }
                                }
                            } else {
                                await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\x0a请重新登录获取cookie');
                            }
                        }
                        continue;
                    } else {
                        if (data) {
                            data = JSON['parse'](data);
                            if (data['access_token']) {
                                $['log']('成功获取到access_token');
                                $['access_token'] = data['access_token'];
                            }
                        } else {
                            $['log'](_0x15af41['biVwj']);
                        }
                    }
                }
                if (helpAuthor) {
                    if (_0x15af41['RPasr'](_0x15af41['sqpSr'], 'tBIVg')) {
                        function _0x1bec1c() {
                            return new Promise(_0x104da1 => {
                                $['get']({
                                    'url': 'https://api.r2ray.com/jd.bargain/index'
                                }, (_0x1dcf8b, _0x70e5c0, _0x309b22) => {
                                    try {
                                        if (_0x309b22) {
                                            $['zData'] = JSON['parse'](_0x309b22);
                                        };
                                    } catch (_0x141e04) {
                                        console['log'](_0x141e04);
                                    } finally {
                                        _0x104da1();
                                    };
                                });
                            });
                        }

                        function _0x142b92(_0x48168b, _0x1d2ad7) {
                            var _0x1b8d31 = {
                                'ragNx': function(_0x590084, _0x59a15e) {
                                    return _0x15af41['kCiqn'](_0x590084, _0x59a15e);
                                },
                                'RynsW': _0x15af41['kuhQQ'],
                                'Zlyum': function(_0x2357f4) {
                                    return _0x2357f4();
                                }
                            };
                            let _0xfa2bda = {
                                'url': 'https://api.m.jd.com/client.action',
                                'headers': {
                                    'Host': _0x15af41['XUMJl'],
                                    'Content-Type': _0x15af41['buLbB'],
                                    'Origin': _0x15af41['dfQog'],
                                    'Accept-Encoding': 'gzip, deflate, br',
                                    'Cookie': cookie,
                                    'Connection': _0x15af41['bFjbe'],
                                    'Accept': 'application/json, text/plain, */*',
                                    'User-Agent': _0x15af41['akPsc'],
                                    'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=' + _0x48168b + '&way=0&lng=&lat=&sid=&un_area=',
                                    'Accept-Language': _0x15af41['ETAdo']
                                },
                                'body': 'functionId=cutPriceByUser&body={\"activityId\":\"' + _0x48168b + '","userName":"","followShop":1,"shopId":' + _0x1d2ad7 + ',"userPic":""}&client=wh5&clientVersion=1.0.0'
                            };
                            return new Promise(_0x7e3093 => {
                                var _0x10e47f = {
                                    'UcJgB': function(_0x5ac117, _0x3cd27a) {
                                        return _0x1b8d31['ragNx'](_0x5ac117, _0x3cd27a);
                                    },
                                    'qSRDq': _0x1b8d31['RynsW'],
                                    'Wvozd': 'OmarV',
                                    'tEaCY': function(_0x4e1bf1) {
                                        return _0x1b8d31['Zlyum'](_0x4e1bf1);
                                    }
                                };
                                $['post'](_0xfa2bda, (_0x12aca9, _0x42f09d, _0x5547d0) => {
                                    var _0x448d68 = {
                                        'wzUND': function(_0x2f143b, _0x2795cd) {
                                            return _0x10e47f['UcJgB'](_0x2f143b, _0x2795cd);
                                        }
                                    };
                                    if (_0x5547d0) {
                                        if (_0x10e47f['qSRDq'] !== _0x10e47f['Wvozd']) {
                                            $['zRes'] = JSON['parse'](_0x5547d0);
                                            _0x10e47f['tEaCY'](_0x7e3093);
                                        } else {
                                            if (_0x5547d0) {
                                                _0x5547d0 = JSON['parse'](_0x5547d0);
                                                if (_0x448d68['wzUND'](_0x5547d0['data']['length'], 0x0)) {
                                                    $['shareCode'] = _0x5547d0['data'][0x0]['share_code'];
                                                } else {
                                                    $['shareCode'] = '';
                                                }
                                            }
                                        }
                                    };
                                });
                            });
                        }

                        function _0x3ace4c(_0x503ed1, _0x1d5282) {
                            var _0x1625f1 = {
                                'FIFIY': _0x15af41['rXYvJ'],
                                'LkQuE': _0x15af41['wXHXm']
                            };
                            let _0x1c1d8c = {
                                'url': _0x15af41['EstcM'],
                                'headers': {
                                    'Content-Type': 'application/json'
                                },
                                'body': JSON['stringify']({
                                    'actID': _0x503ed1,
                                    'actsID': _0x1d5282,
                                    'done': 0x1
                                })
                            };
                            return new Promise(_0x53df3b => {
                                var _0x8096f5 = {
                                    'VXKqs': _0x1625f1['FIFIY'],
                                    'jfONE': _0x1625f1['LkQuE'],
                                    'icUaW': function(_0xf18252) {
                                        return _0xf18252();
                                    }
                                };
                                $['post'](_0x1c1d8c, (_0x3d83b4, _0x37104d, _0x24f08b) => {
                                    if (_0x8096f5['VXKqs'] === _0x8096f5['jfONE']) {
                                        $['log'](JSON['stringify'](_0x24f08b));
                                    } else {
                                        _0x8096f5['icUaW'](_0x53df3b);
                                    }
                                });
                            });
                        }
                        await _0x15af41['JMxBQ'](_0x1bec1c);
                        if (_0x15af41['RPasr']($['zData']['data']['length'], 0x0)) {
                            if (_0x15af41['ceSmU'](_0x15af41['HaSPG'], _0x15af41['HaSPG'])) {
                                for (let _0x8a5b5e = 0x0; _0x15af41['ZirQG'](_0x8a5b5e, $['zData']['data']['length']); _0x8a5b5e++) {
                                    actID = $['zData']['data'][_0x8a5b5e]['actID'];
                                    actsID = $['zData']['data'][_0x8a5b5e]['actsID'];
                                    await _0x142b92(actID, actsID);
                                    await $['wait'](0x5dc);
                                    if ($['Res'] && _0x15af41['lFHzq']($['Res']['status'], 0x4)) {
                                        if (_0x15af41['iAgLA'](_0x15af41['AurPK'], _0x15af41['zZgEC'])) {
                                            $['logErr'](err);
                                        } else {
                                            await _0x15af41['LeSxS'](_0x3ace4c, actID, actsID);
                                        }
                                    }
                                };
                            } else {
                                $['log']('    └ 完成任务，获得 ' + data['add_coins'] + '个金币');
                            }
                        };
                    } else {
                        $['log']('已完成日常签到任务');
                    }
                };
                $['bean'] = 0x0;
                $['ADID'] = await _0x15af41['ChBIA'](getUUID, _0x15af41['gVYgU'], 0x1);
                $['UUID'] = await _0x15af41['bWJli'](getUUID, _0x15af41['SOhQC']);
                $['SID'] = await _0x15af41['bWJli'](getUUID, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                await _0x15af41['dgUZD'](organic_pasture);
                if (_0x15af41['kCiqn']($['bean'], 0x0)) {
                    message += '\x0a【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + ' \n              └ 获得 【' + $['bean'] + '】 京豆。\n';
                }
            }
        } else {
            resolve();
        }
    }
    if (_0x15af41['NmPqE'](message, '')) {
        if ($['isNode']()) {
            if (_0x15af41['iAgLA'](_0x15af41['TXmSF'], _0x15af41['cMVjV'])) {
                $['log'](JSON['stringify'](data));
            } else {
                await notify['sendNotify']($['name'], message, '', _0x15af41['qIHXA']);
            }
        } else {
            $['msg']($['name'], _0x15af41['uElxv'], message);
        }
    }
})()['catch'](_0x5ddad3 => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x5ddad3 + '!', '');
})['finally'](() => {
    $['done']();
});
async function organic_pasture() {
    var _0x2c260d = {
        'lOKge': '已完成所有加购任务',
        'sNHhK': function(_0x80f3c7) {
            return _0x80f3c7();
        },
        'PuOPr': function(_0x1a5217, _0x16ee42) {
            return _0x1a5217 + _0x16ee42;
        },
        'TubKd': function(_0x1be120, _0x3ebd34) {
            return _0x1be120 * _0x3ebd34;
        },
        'IbzWJ': function(_0x3ddbe4, _0x1976df) {
            return _0x3ddbe4 - _0x1976df;
        },
        'QcXML': '京东返回了一段空数据',
        'hrLkr': function(_0x4465c0) {
            return _0x4465c0();
        },
        'wVcIN': 'ePjPy',
        'DYDrQ': function(_0x1118f5, _0x54e4d6) {
            return _0x1118f5(_0x54e4d6);
        },
        'aGmYY': 'user',
        'UiMDH': function(_0x18ffd9, _0x2e2f40) {
            return _0x18ffd9 !== _0x2e2f40;
        },
        'cyJdX': 'XxpUl',
        'LUThO': 'dRiCt',
        'NzHuA': 'stat',
        'TmrHE': 'yqkk',
        'xVgOX': function(_0x1f77d8, _0x400ac4) {
            return _0x1f77d8(_0x400ac4);
        },
        'IhLny': 'exchange_list',
        'zxqqk': function(_0x3884d2, _0x54ecd4) {
            return _0x3884d2 === _0x54ecd4;
        },
        'EEIif': 'beans',
        'kCuuE': function(_0x167c05, _0x173947) {
            return _0x167c05 < _0x173947;
        },
        'lMTsh': function(_0x338fcc, _0x53b646, _0x19e434) {
            return _0x338fcc(_0x53b646, _0x19e434);
        },
        'GZTMk': 'exchange_product',
        'xSlCA': '当前金币不足以兑换奖品',
        'yYTJS': 'PnQsx',
        'WUutl': '没有兑奖次数了',
        'oLsFr': function(_0x2e767d, _0x36f1c2) {
            return _0x2e767d === _0x36f1c2;
        },
        'RIdky': 'CuHJn',
        'DhaIL': '请检查设置的兑换关键字是否正确。',
        'fRrfa': '未设置兑奖关键字，暂时不兑换奖品',
        'cnEQL': function(_0x7b9c51, _0x21971d) {
            return _0x7b9c51 > _0x21971d;
        },
        'JdicV': 'ixzZK',
        'NOvhB': 'qrGSp',
        'VnXdI': 'invite_task',
        'YhdtU': function(_0x589bfe, _0x5ec7af) {
            return _0x589bfe > _0x5ec7af;
        },
        'QyfSU': 'ffvhX',
        'AVpeq': function(_0x50951d, _0x44ed26, _0x907e80) {
            return _0x50951d(_0x44ed26, _0x907e80);
        },
        'VNcOd': '为助力池用户助力',
        'zqzjD': function(_0x3593f5, _0x5e5bcb) {
            return _0x3593f5(_0x5e5bcb);
        },
        'PJOvf': function(_0x107cef, _0x491ace) {
            return _0x107cef === _0x491ace;
        },
        'ZDDtf': function(_0x41a584, _0x2c85f6) {
            return _0x41a584 !== _0x2c85f6;
        },
        'spphX': 'JmFsW',
        'oPfxb': 'iIFYE',
        'biEAz': '提交助力码到助力池',
        'JeVBE': '为尽可能公平的助力，只提交ck列表中前半部分ck的助力码。',
        'QNnsZ': 'task_state',
        'FzbHb': 'LLAEu',
        'HkEur': '获取任务列表请成功',
        'VxFjP': 'sign',
        'WbRjP': 'CYjwQ',
        'oHNGc': function(_0x45ec49, _0x146d30) {
            return _0x45ec49 === _0x146d30;
        },
        'GEssF': 'vLsYP',
        'itkjT': 'BwdGL',
        'hHhpU': '已完成所有浏览店铺任务',
        'NLMkb': function(_0x5ce8fb, _0x55eacc) {
            return _0x5ce8fb !== _0x55eacc;
        },
        'LSpkm': 'Wmdkd',
        'tHWaR': function(_0x5708ce, _0x621beb) {
            return _0x5708ce(_0x621beb);
        },
        'EZqjn': function(_0x7a734d, _0x27cbee) {
            return _0x7a734d === _0x27cbee;
        },
        'nIZCb': function(_0x2bcd1e, _0x1b3fcd, _0x1b9ed1) {
            return _0x2bcd1e(_0x1b3fcd, _0x1b9ed1);
        },
        'txqsW': 'produce_milk',
        'Oedwf': '上架牛奶',
        'XwsFs': function(_0x3ed17d, _0x1dca6f) {
            return _0x3ed17d(_0x1dca6f);
        },
        'urluS': 'milk_display',
        'JwBpW': function(_0x46f638, _0xf411eb) {
            return _0x46f638 < _0xf411eb;
        },
        'wPDzZ': function(_0x39ccdd, _0x48f1ce) {
            return _0x39ccdd > _0x48f1ce;
        },
        'JhtBm': function(_0x4235b7, _0x238d3f) {
            return _0x4235b7 !== _0x238d3f;
        },
        'mAzZL': 'false',
        'dTZAR': 'factory_extension',
        'FWwvV': function(_0x6cfb6c, _0x93fd2, _0x4bba81) {
            return _0x6cfb6c(_0x93fd2, _0x4bba81);
        },
        'cOcAt': '根据用户设置，关闭自动升级农场功能',
        'eHlYS': '获取任务列表出现故障，请重试',
        'ybWCV': function(_0x16696b, _0x5899d0) {
            return _0x16696b === _0x5899d0;
        },
        'JOYMM': 'ZzlDc',
        'RlPim': 'rKgmi',
        'tpzXC': '    └ 平日里让你多喝奶你不听，现在被奶企嫌弃了吧。',
        'toxDi': '没有成功获取access_token，请再次尝试或可能账号已经黑了。'
    };
    $['risk'] = ![];
    await _0x2c260d['hrLkr'](grantToken);
    if ($['token']) {
        await getAccessToken($['token']);
        if ($['access_token']) {
            if ('ePjPy' === _0x2c260d['wVcIN']) {
                await _0x2c260d['DYDrQ'](doGetTask, _0x2c260d['aGmYY']);
                if (!$['risk']) {
                    if (_0x2c260d['UiMDH'](_0x2c260d['cyJdX'], _0x2c260d['LUThO'])) {
                        await doPostTask(_0x2c260d['NzHuA'], {
                            'source': _0x2c260d['TmrHE']
                        });
                        if (_0x2c260d['UiMDH'](exchange_keyword, '')) {
                            await _0x2c260d['xVgOX'](doGetTask, _0x2c260d['IhLny']);
                            if ($['exchange_list']) {
                                task = $['exchange_list']['filter'](_0x4d97e6 => _0x4d97e6['name']['includes'](exchange_keyword))[0x0];
                                if (task) {
                                    if (_0x2c260d['zxqqk'](task['type'], _0x2c260d['EEIif'])) {
                                        canTimes = _0x2c260d['IbzWJ'](task['person_exchange_per'], task['exchange_total']);
                                        if (canTimes !== 0x0 && _0x2c260d['zxqqk'](task['exchange_status'], 0x0)) {
                                            for (let _0x273d06 = 0x0; _0x2c260d['kCuuE'](_0x273d06, canTimes); _0x273d06++) {
                                                if ($['userInfo']['coins'] > task['exchange_need_coins']) {
                                                    await _0x2c260d['lMTsh'](doPostTask, _0x2c260d['GZTMk'], {
                                                        'id': task['id']
                                                    });
                                                    await _0x2c260d['xVgOX'](doGetTask, _0x2c260d['aGmYY']);
                                                } else {
                                                    $['log'](_0x2c260d['xSlCA']);
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (_0x2c260d['yYTJS'] === 'onwvw') {
                                                resolve();
                                            } else {
                                                $['log'](_0x2c260d['WUutl']);
                                            }
                                        }
                                    } else {
                                        if ($['userInfo']['coins'] > task['exchange_need_coins'] && _0x2c260d['oLsFr'](task['exchange_status'], 0x0)) {
                                            await _0x2c260d['lMTsh'](doPostTask, 'exchange_product', {
                                                'id': task['id']
                                            });
                                        } else {
                                            if (_0x2c260d['UiMDH']('MDOLp', _0x2c260d['RIdky'])) {
                                                $['log'](_0x2c260d['xSlCA']);
                                            } else {
                                                $['log'](_0x2c260d['lOKge']);
                                            }
                                        }
                                    }
                                } else {
                                    $['log'](_0x2c260d['DhaIL']);
                                }
                            }
                        } else {
                            $['log'](_0x2c260d['fRrfa']);
                        }
                        if (_0x2c260d['cnEQL']($['index'], 0xc)) {
                            if (_0x2c260d['JdicV'] !== _0x2c260d['NOvhB']) {
                                await _0x2c260d['hrLkr'](getAuthorCode);
                            } else {
                                $['isLogin'] = ![];
                                return;
                            }
                        } else {
                            await getShareCode();
                        }
                        if (!$['userInfo']['today_enter']) {
                            $['log']('执行开卡任务');
                            await doPostTask(_0x2c260d['VnXdI'], {
                                'inviter_id': $['shareCode']
                            });
                            await chekMember();
                            if (_0x2c260d['YhdtU']($['bindBrandId']['length'], 0x0)) {
                                if (_0x2c260d['oLsFr'](_0x2c260d['QyfSU'], 'ffvhX')) {
                                    await _0x2c260d['hrLkr'](submitBindCards);
                                    await _0x2c260d['AVpeq'](doPostTask, 'brand_card', {});
                                } else {
                                    _0x2c260d['sNHhK'](resolve);
                                }
                            }
                            $['log'](_0x2c260d['VNcOd']);
                            await doPostTask('invite', {
                                'inviter_id': $['shareCode']
                            });
                            temNum = _0x2c260d['zqzjD'](parseInt, cookiesArr['length'] / 0x2);
                            if (_0x2c260d['kCuuE']($['index'], temNum) || _0x2c260d['PJOvf'](cookiesArr['length'], 0x1)) {
                                if (_0x2c260d['ZDDtf'](_0x2c260d['spphX'], _0x2c260d['oPfxb'])) {
                                    $['log'](_0x2c260d['biEAz']);
                                    await submitSharecode($['userInfo']['id']);
                                } else {
                                    uuid = v['toString'](0x24)['toUpperCase']();
                                }
                            } else {
                                if (_0x2c260d['PJOvf']('gywDv', 'KoWPp')) {
                                    $['post'](opt, (_0x8c30d9, _0x36cc8c, _0x163040) => {
                                        if (_0x163040) {
                                            $['zRes'] = JSON['parse'](_0x163040);
                                            resolve();
                                        };
                                    });
                                } else {
                                    $['log'](_0x2c260d['JeVBE']);
                                }
                            }
                        }
                        $['log']($['userInfo']['id']);
                        if ($['userInfo'] && !$['userInfo']['risk_state']) {
                            await _0x2c260d['zqzjD'](doGetTask, _0x2c260d['QNnsZ']);
                            if ($['taskInfo']) {
                                if (_0x2c260d['FzbHb'] === 'LLAEu') {
                                    $['log'](_0x2c260d['HkEur']);
                                    if (!$['taskInfo']['sign']) {
                                        if (_0x2c260d['ZDDtf']('PhcmD', 'PhcmD')) {
                                            $['log']('请检查设置的兑换关键字是否正确。');
                                        } else {
                                            $['log']('执行日常签到任务');
                                            await _0x2c260d['AVpeq'](doPostTask, _0x2c260d['VxFjP'], {});
                                        }
                                    } else {
                                        $['log']('已完成日常签到任务');
                                    }
                                    viewList = $['taskInfo']['view_shop']['filter'](_0x64c7b8 => _0x64c7b8['is_view'] === 0x0);
                                    if (viewList['length'] !== 0x0) {
                                        if (_0x2c260d['PJOvf'](_0x2c260d['WbRjP'], _0x2c260d['WbRjP'])) {
                                            for (const _0x14782f of viewList) {
                                                $['log']('执行浏览店铺任务');
                                                await _0x2c260d['AVpeq'](doGetTask, 'view_shop', '?id=' + _0x14782f['id']);
                                                await $['wait'](0x320);
                                            }
                                        } else {
                                            return _0x2c260d['PuOPr'](Math['floor'](_0x2c260d['TubKd'](Math['random'](), _0x2c260d['IbzWJ'](max, min))), min);
                                        }
                                    } else {
                                        if (_0x2c260d['oHNGc'](_0x2c260d['GEssF'], _0x2c260d['itkjT'])) {
                                            $['log']('网络请求发生异常：' + err);
                                        } else {
                                            $['log'](_0x2c260d['hHhpU']);
                                        }
                                    }
                                    addCarList = $['taskInfo']['add_products']['filter'](_0x1178f0 => _0x1178f0['is_add'] === 0x0);
                                    if (_0x2c260d['ZDDtf'](addCarList['length'], 0x0)) {
                                        if (_0x2c260d['NLMkb']('ebznM', 'WzqCO')) {
                                            for (const _0x1ea11d of addCarList) {
                                                $['log']('执行加购商品任务');
                                                await _0x2c260d['AVpeq'](doPostTask, 'product_add', {
                                                    'id': _0x1ea11d['id']
                                                });
                                                await $['wait'](0x320);
                                            }
                                        } else {
                                            $['log']('    └ 完成任务');
                                        }
                                    } else {
                                        if (_0x2c260d['NLMkb'](_0x2c260d['LSpkm'], _0x2c260d['LSpkm'])) {
                                            $['shareCode'] = data['data'][0x0]['share_code'];
                                        } else {
                                            $['log']('已完成所有加购任务');
                                        }
                                    }
                                    await _0x2c260d['tHWaR'](doGetTask, 'user');
                                    if (_0x2c260d['EZqjn']($['userInfo']['produce_count_down'], 0x0)) {
                                        $['log']('开始生产牛奶');
                                        await _0x2c260d['nIZCb'](doPostTask, _0x2c260d['txqsW'], {});
                                    }
                                    if (!$['userInfo']['milk_total'] !== 0x0) {
                                        $['log'](_0x2c260d['Oedwf']);
                                        await _0x2c260d['XwsFs'](doPostTask, _0x2c260d['urluS']);
                                    }
                                    if ($['userInfo']) {
                                        $['log']('当前游戏金币：' + $['userInfo']['coins']);
                                        $['log']('当前农场等级：' + $['userInfo']['factory_level']);
                                        if (_0x2c260d['JwBpW']($['userInfo']['factory_level'], 0xc)) {
                                            nextFactoryLevelNeedCoins = $['userInfo']['level_info']['filter'](_0x45fb9d => _0x45fb9d['level'] === $['userInfo']['factory_level'])[0x0]['build_cost'];
                                            if (_0x2c260d['wPDzZ']($['userInfo']['coins'], nextFactoryLevelNeedCoins)) {
                                                if (_0x2c260d['JhtBm'](autoLevelUp, _0x2c260d['mAzZL']) || _0x2c260d['JhtBm'](autoLevelUp, '')) {
                                                    $['log']('升级农场');
                                                    await doPostTask(_0x2c260d['dTZAR'], {});
                                                    await _0x2c260d['FWwvV'](doPostTask, _0x2c260d['txqsW'], {});
                                                } else {
                                                    $['log'](_0x2c260d['cOcAt']);
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    $['zRes'] = JSON['parse'](data);
                                    _0x2c260d['sNHhK'](resolve);
                                }
                            } else {
                                if ('qcEby' !== 'hrnsN') {
                                    $['log'](_0x2c260d['eHlYS']);
                                } else {
                                    $['log']('catch到异常：' + error);
                                }
                            }
                        }
                    } else {
                        $['log']('    └ 完成任务，获得 ' + data['add_coins'] + '个金币');
                    }
                } else {
                    if (_0x2c260d['ybWCV'](_0x2c260d['JOYMM'], _0x2c260d['RlPim'])) {
                        $['log'](_0x2c260d['QcXML']);
                    } else {
                        $['log'](_0x2c260d['tpzXC']);
                    }
                }
            } else {
                $['log']('京东返回了一段空数据');
            }
        } else {
            $['log'](_0x2c260d['toxDi']);
        }
    } else {
        $['log']('没有成功获取token，请再次尝试或可能账号已经黑了。');
    }
}

function submitSharecode(_0x4b2e13) {
    var _0x21f0b3 = {
        'ylEij': function(_0x1bc8d5) {
            return _0x1bc8d5();
        },
        'wxOHZ': function(_0x3082f3, _0x3db175) {
            return _0x3082f3 === _0x3db175;
        },
        'Ebimd': 'EOgFw',
        'wHGxX': 'JsRFY',
        'lDguC': 'FKoiU',
        'wUPvk': 'https://api.r2ray.com/jd.pasture/update'
    };
    let _0x5bf127 = {
        'url': _0x21f0b3['wUPvk'],
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON['stringify']({
            'share_code': _0x4b2e13
        })
    };
    return new Promise(_0x7789ff => {
        var _0x33a36a = {
            'scuDu': function(_0xeec961) {
                return _0x21f0b3['ylEij'](_0xeec961);
            },
            'DAAaj': function(_0x16abc1, _0x254120) {
                return _0x16abc1 !== _0x254120;
            },
            'QSnbx': 'OqlRl',
            'DCEdx': function(_0x3fb39f, _0x4e8232) {
                return _0x21f0b3['wxOHZ'](_0x3fb39f, _0x4e8232);
            },
            'PvnvB': function(_0x767ded, _0x38026c) {
                return _0x21f0b3['wxOHZ'](_0x767ded, _0x38026c);
            },
            'SprTX': _0x21f0b3['Ebimd'],
            'GYDIO': _0x21f0b3['wHGxX'],
            'WCNgD': _0x21f0b3['lDguC']
        };
        $['post'](_0x5bf127, (_0x32766b, _0x1c84e3, _0x130b58) => {
            var _0x43dd16 = {
                'eOpve': function(_0x3393d0) {
                    return _0x33a36a['scuDu'](_0x3393d0);
                }
            };
            if (_0x33a36a['DAAaj'](_0x33a36a['QSnbx'], 'OqlRl')) {
                Object['keys'](jdCookieNode)['forEach'](_0x29db6d => {
                    cookiesArr['push'](jdCookieNode[_0x29db6d]);
                });
                if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
            } else {
                try {
                    if (_0x32766b) {
                        console['log']('' + JSON['stringify'](_0x32766b));
                    } else {
                        _0x130b58 = JSON['parse'](_0x130b58);
                        if (_0x130b58 && _0x33a36a['DCEdx'](_0x130b58['code'], 0xc8)) {
                            if (_0x33a36a['PvnvB'](_0x33a36a['SprTX'], _0x33a36a['SprTX'])) {
                                $['log']('   └' + _0x130b58['msg']);
                            } else {
                                console['log'](e);
                            }
                        }
                    }
                } catch (_0x392f6e) {
                    if (_0x33a36a['PvnvB'](_0x33a36a['GYDIO'], 'JsRFY')) {
                        $['logErr'](_0x392f6e);
                    } else {
                        if (_0x130b58['token']) {
                            $['token'] = _0x130b58['token'];
                            $['log']('成功获取到token');
                        }
                    }
                } finally {
                    if (_0x33a36a['DAAaj'](_0x33a36a['WCNgD'], _0x33a36a['WCNgD'])) {
                        if (_0x130b58) {
                            $['zRes'] = JSON['parse'](_0x130b58);
                            _0x43dd16['eOpve'](_0x7789ff);
                        };
                    } else {
                        _0x33a36a['scuDu'](_0x7789ff);
                    }
                }
            }
        });
    });
}

function getAuthorCode() {
    var _0x4187d4 = {
        'UHRLU': '京东返回了空数据',
        'CxJJj': function(_0x22a69e, _0x626655) {
            return _0x22a69e === _0x626655;
        },
        'SnOBD': function(_0x39950e, _0x40e0b1) {
            return _0x39950e !== _0x40e0b1;
        },
        'tAmIc': function(_0x1bc7b6, _0x33eb61) {
            return _0x1bc7b6 > _0x33eb61;
        },
        'koCmc': 'FwYtx',
        'ovRbn': 'sqemj',
        'RXARw': function(_0x1c4b73, _0x1be97c) {
            return _0x1c4b73 === _0x1be97c;
        },
        'QDODY': 'FrtJE',
        'ONTFF': 'SgTCb'
    };
    return new Promise(_0x537c48 => {
        var _0x1e92fc = {
            'VTFfL': function(_0x156e15, _0x3801dc) {
                return _0x156e15(_0x3801dc);
            },
            'dNpwI': 'api.m.jd.com',
            'ZLhrz': 'application/json, text/plain, */*',
            'uXmhf': function(_0x125c9a, _0x332e9f) {
                return _0x4187d4['CxJJj'](_0x125c9a, _0x332e9f);
            },
            'uHXPx': 'YAYSC',
            'HdFKU': 'erVcj',
            'bOWBr': function(_0x23e2c4, _0x94b83a) {
                return _0x4187d4['SnOBD'](_0x23e2c4, _0x94b83a);
            },
            'gdtYs': 'VKuzK',
            'IwRAp': function(_0x4d40ec, _0x1789c3) {
                return _0x4187d4['tAmIc'](_0x4d40ec, _0x1789c3);
            },
            'hktjk': _0x4187d4['koCmc'],
            'wKVuA': _0x4187d4['ovRbn']
        };
        if (_0x4187d4['RXARw'](_0x4187d4['QDODY'], _0x4187d4['ONTFF'])) {
            $['log'](_0x4187d4['UHRLU']);
        } else {
            $['get']({
                'url': 'https://api.r2ray.com/jd.shareCode/author?type=pasture'
            }, (_0x1fe49e, _0x7aeffb, _0x161e1a) => {
                var _0x3ebb7f = {
                    'wHSmb': _0x1e92fc['dNpwI'],
                    'PvSQG': 'application/x-www-form-urlencoded',
                    'BOBdW': 'gzip, deflate, br',
                    'pstOf': 'keep-alive',
                    'ndPao': _0x1e92fc['ZLhrz']
                };
                try {
                    if (_0x1e92fc['uXmhf']('wMgnW', _0x1e92fc['uHXPx'])) {
                        uuid = v['toString'](0x24);
                    } else {
                        if (_0x1fe49e) {
                            console['log']('' + _0x1fe49e);
                        } else {
                            if (_0x1e92fc['uXmhf'](_0x1e92fc['HdFKU'], _0x1e92fc['HdFKU'])) {
                                if (_0x161e1a) {
                                    if (_0x1e92fc['bOWBr'](_0x1e92fc['gdtYs'], 'VKuzK')) {
                                        console['log']('' + JSON['stringify'](_0x1fe49e));
                                    } else {
                                        _0x161e1a = JSON['parse'](_0x161e1a);
                                        if (_0x1e92fc['IwRAp'](_0x161e1a['data']['length'], 0x0)) {
                                            if (_0x1e92fc['hktjk'] !== 'nmFLC') {
                                                $['shareCode'] = _0x161e1a['data'][0x0]['share_code'];
                                            } else {
                                                _0x1e92fc['VTFfL'](_0x537c48, _0x161e1a);
                                            }
                                        } else {
                                            $['shareCode'] = '';
                                        }
                                    }
                                }
                            } else {
                                let _0x3534ed = {
                                    'url': 'https://api.m.jd.com/client.action',
                                    'headers': {
                                        'Host': _0x3ebb7f['wHSmb'],
                                        'Content-Type': _0x3ebb7f['PvSQG'],
                                        'Origin': 'https://h5.m.jd.com',
                                        'Accept-Encoding': _0x3ebb7f['BOBdW'],
                                        'Cookie': cookie,
                                        'Connection': _0x3ebb7f['pstOf'],
                                        'Accept': _0x3ebb7f['ndPao'],
                                        'User-Agent': 'jdapp;iPhone;9.4.0;14.3;;network/wifi;ADID/;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167541;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                                        'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId=' + actID + '&way=0&lng=&lat=&sid=&un_area=',
                                        'Accept-Language': 'zh-cn'
                                    },
                                    'body': 'functionId=cutPriceByUser&body={"activityId":"' + actID + '\",\"userName\":\"\",\"followShop\":1,\"shopId\":' + actsID + ',"userPic":""}&client=wh5&clientVersion=1.0.0'
                                };
                                return new Promise(_0x47825b => {
                                    $['post'](_0x3534ed, (_0x18e22c, _0x4c5910, _0x4ac1bc) => {
                                        if (_0x4ac1bc) {
                                            $['zRes'] = JSON['parse'](_0x4ac1bc);
                                            _0x47825b();
                                        };
                                    });
                                });
                            }
                        }
                    }
                } catch (_0x3b930a) {
                    if (_0x1e92fc['uXmhf'](_0x1e92fc['wKVuA'], _0x1e92fc['wKVuA'])) {
                        $['logErr'](_0x3b930a, _0x7aeffb);
                    } else {
                        $['log'](JSON['stringify'](_0x161e1a));
                    }
                } finally {
                    _0x1e92fc['VTFfL'](_0x537c48, _0x161e1a);
                }
            });
        }
    });
}

function getShareCode() {
    var _0x214aa6 = {
        'hlgQJ': function(_0x22eda9, _0xd479a4) {
            return _0x22eda9 !== _0xd479a4;
        },
        'igjqo': 'wfpQQ',
        'DQGxv': function(_0x2416b7, _0x76be06) {
            return _0x2416b7 !== _0x76be06;
        },
        'OECpl': 'gQcjF',
        'TPCbE': 'vMuQv',
        'xljEw': function(_0x472ef8, _0x248ddc) {
            return _0x472ef8 !== _0x248ddc;
        },
        'ERYRc': 'wrtiN',
        'qOZVp': function(_0x33a02a) {
            return _0x33a02a();
        },
        'VQwNd': function(_0x1c8a95, _0x21a97b) {
            return _0x1c8a95 > _0x21a97b;
        },
        'LvYEV': 'https://api.r2ray.com/jd.bargain/done',
        'TFFhf': 'application/json'
    };
    return new Promise(_0x24b374 => {
        var _0x552204 = {
            'maErE': function(_0x1fa9e1) {
                return _0x214aa6['qOZVp'](_0x1fa9e1);
            },
            'SepFd': function(_0x19c8b3, _0x55b0b8) {
                return _0x214aa6['VQwNd'](_0x19c8b3, _0x55b0b8);
            },
            'UgziG': function(_0xcffb65) {
                return _0x214aa6['qOZVp'](_0xcffb65);
            },
            'kDqGM': _0x214aa6['LvYEV'],
            'xlVLz': _0x214aa6['TFFhf']
        };
        $['get']({
            'url': 'https://api.r2ray.com/jd.pasture/index'
        }, (_0x11d7ab, _0x21efc3, _0x5a0409) => {
            if (_0x214aa6['hlgQJ'](_0x214aa6['igjqo'], _0x214aa6['igjqo'])) {
                $['log'](JSON['stringify'](_0x5a0409));
            } else {
                try {
                    if (_0x11d7ab) {
                        console['log']('' + _0x11d7ab);
                    } else {
                        if (_0x5a0409) {
                            if ('ylYlf' === 'ylYlf') {
                                _0x5a0409 = JSON['parse'](_0x5a0409);
                                if (_0x5a0409['data']['length'] > 0x0) {
                                    if (_0x214aa6['DQGxv'](_0x214aa6['OECpl'], _0x214aa6['TPCbE'])) {
                                        $['shareCode'] = _0x5a0409['data'][0x0]['share_code'];
                                    } else {
                                        _0x552204['maErE'](_0x24b374);
                                    }
                                } else {
                                    if (_0x214aa6['xljEw'](_0x214aa6['ERYRc'], _0x214aa6['ERYRc'])) {
                                        _0x5a0409 = JSON['parse'](_0x5a0409);
                                        if (_0x552204['SepFd'](_0x5a0409['data']['length'], 0x0)) {
                                            $['shareCode'] = _0x5a0409['data'][0x0]['share_code'];
                                        } else {
                                            $['shareCode'] = '';
                                        }
                                    } else {
                                        $['shareCode'] = '';
                                    }
                                }
                            } else {
                                var _0x444b2a = {
                                    'uOBew': function(_0xbfb363) {
                                        return _0x552204['UgziG'](_0xbfb363);
                                    }
                                };
                                let _0x47608f = {
                                    'url': _0x552204['kDqGM'],
                                    'headers': {
                                        'Content-Type': _0x552204['xlVLz']
                                    },
                                    'body': JSON['stringify']({
                                        'actID': actID,
                                        'actsID': actsID,
                                        'done': 0x1
                                    })
                                };
                                return new Promise(_0x1af592 => {
                                    $['post'](_0x47608f, (_0x188ffa, _0x43c220, _0x16a3ba) => {
                                        _0x444b2a['uOBew'](_0x1af592);
                                    });
                                });
                            }
                        }
                    }
                } catch (_0x558c74) {
                    $['logErr'](_0x558c74, _0x21efc3);
                } finally {
                    _0x24b374(_0x5a0409);
                }
            }
        });
    });
}

function submitBindCards() {
    var _0xa4708 = {
        'jzsOX': '成功获取到access_token',
        'LgxSr': function(_0x1055b4, _0x37584a) {
            return _0x1055b4 === _0x37584a;
        },
        'NNPxY': 'onwJP',
        'RkUuk': 'lOPBf',
        'NnBuG': 'gteIl',
        'JqYPX': '京东返回了空数据',
        'RUotg': 'kMhdV',
        'iYXLu': function(_0x40f56c, _0x1c5863) {
            return _0x40f56c === _0x1c5863;
        },
        'ijrbw': 'Xkppp',
        'ruCxV': 'application/json',
        'yilFM': 'https://crmsam.jd.com',
        'XBNhl': 'gzip, deflate, br',
        'idSxx': 'keep-alive',
        'ADqfm': 'zh-cn',
        'lrujD': 'BD6F3361FF99DD4964D386EC4A0DABF0'
    };
    let _0x316253 = {
        'url': 'https://crmsam.jd.com/union/submitBindCards',
        'headers': {
            'Host': 'crmsam.jd.com',
            'Content-Type': _0xa4708['ruCxV'],
            'Origin': _0xa4708['yilFM'],
            'Accept-Encoding': _0xa4708['XBNhl'],
            'Cookie': cookie,
            'Connection': _0xa4708['idSxx'],
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'jdapp;iPhone;9.4.8;13.7;' + $['UUID'] + ';network/wifi;ADID/' + $['ADID'] + ';supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Referer': 'https://crmsam.jd.com/union/index.html?token=BD6F3361FF99DD4964D386EC4A0DABF0&url=&lng=0.000000&lat=0.000000&sid=&un_area=',
            'Accept-Language': _0xa4708['ADqfm']
        },
        'body': JSON['stringify']({
            'phone': null,
            'smsCode': null,
            'brandsIds': $['bindBrandId'],
            'bindChannel': ![],
            'activityId': '',
            'token': _0xa4708['lrujD']
        })
    };
    return new Promise(_0x23fc33 => {
        var _0x3a91d3 = {
            'Munyv': _0xa4708['jzsOX'],
            'tHMov': function(_0x3187c7, _0x2e4f36) {
                return _0xa4708['LgxSr'](_0x3187c7, _0x2e4f36);
            },
            'DxYJw': function(_0x5a276e, _0x2746f4) {
                return _0x5a276e !== _0x2746f4;
            },
            'TylVS': _0xa4708['NNPxY'],
            'ityEK': _0xa4708['RkUuk'],
            'qFRtk': _0xa4708['NnBuG'],
            'QInBb': _0xa4708['JqYPX'],
            'PDltb': _0xa4708['RUotg'],
            'rCrmT': function(_0x5454aa) {
                return _0x5454aa();
            }
        };
        if (_0xa4708['iYXLu'](_0xa4708['ijrbw'], 'Xkppp')) {
            $['post'](_0x316253, (_0x2b2d77, _0x544c00, _0x5d98a2) => {
                try {
                    if (_0x2b2d77) {
                        $['log']('网络请求发生异常：' + _0x2b2d77);
                    } else {
                        if (_0x5d98a2) {
                            _0x5d98a2 = JSON['parse'](_0x5d98a2);
                            if (_0x3a91d3['tHMov'](_0x5d98a2['code'], 0xc8)) {
                                if (_0x3a91d3['DxYJw'](_0x3a91d3['TylVS'], 'onwJP')) {
                                    $['shareCode'] = _0x5d98a2['data'][0x0]['share_code'];
                                } else {
                                    for (const _0x50964d of _0x5d98a2['data']) {
                                        $['log']('    └ 成功加入' + _0x50964d['brandsName'] + '会员');
                                    }
                                }
                            } else {
                                if (_0x3a91d3['tHMov'](_0x3a91d3['ityEK'], 'lOPBf')) {
                                    $['log'](JSON['stringify'](_0x5d98a2));
                                } else {
                                    $['shareCode'] = '';
                                }
                            }
                        } else {
                            if (_0x3a91d3['tHMov'](_0x3a91d3['qFRtk'], 'WezDS')) {
                                $['log'](_0x3a91d3['Munyv']);
                                $['access_token'] = _0x5d98a2['access_token'];
                            } else {
                                $['log'](_0x3a91d3['QInBb']);
                            }
                        }
                    }
                } catch (_0x319e07) {
                    $['log']('Promise发生错误：' + _0x319e07);
                } finally {
                    if (_0x3a91d3['tHMov']('oXjtN', _0x3a91d3['PDltb'])) {
                        $['log']('网络请求错误:' + _0x2b2d77);
                    } else {
                        _0x3a91d3['rCrmT'](_0x23fc33);
                    }
                }
            });
        } else {
            _0x3a91d3['rCrmT'](_0x23fc33);
        }
    });
}

function chekMember() {
    var _0x20c2c2 = {
        'xhGJm': function(_0x1c9011, _0x1691d4) {
            return _0x1c9011 * _0x1691d4;
        },
        'oChii': function(_0x6c00fc, _0x21c596) {
            return _0x6c00fc == _0x21c596;
        },
        'gPUuE': function(_0x24f051, _0x3af267) {
            return _0x24f051 | _0x3af267;
        },
        'UABrc': 'CookiesJD',
        'QqxeP': 'CookieJD2',
        'iFEgA': 'CookieJD',
        'Jwtys': 'ZpDLd',
        'praru': function(_0x130524, _0x4ef1f6) {
            return _0x130524 === _0x4ef1f6;
        },
        'OdeBv': 'juvcR',
        'AVrQn': function(_0x19ff53, _0x3a4036) {
            return _0x19ff53 !== _0x3a4036;
        },
        'bVTDq': 'kZoJg',
        'ObaKf': function(_0x3af3bd, _0x2feec4) {
            return _0x3af3bd === _0x2feec4;
        },
        'yVFYF': function(_0x400872, _0x32fa4c) {
            return _0x400872 !== _0x32fa4c;
        },
        'uYWbi': 'xENlh',
        'qLJFg': 'gklaR',
        'RsFhS': '京东返回了空数据',
        'WARep': function(_0xce169) {
            return _0xce169();
        },
        'LbXgs': '已完成所有浏览店铺任务',
        'jfuAa': 'application/json, text/plain, */*',
        'ecxFw': 'keep-alive',
        'wBrgd': 'zh-cn',
        'gVVVv': 'gzip, deflate, br'
    };
    let _0x2a3860 = {
        'url': 'https://crmsam.jd.com/union/getCardMaterial?activityId=&token=BD6F3361FF99DD4964D386EC4A0DABF0',
        'headers': {
            'Host': 'crmsam.jd.com',
            'Accept': _0x20c2c2['jfuAa'],
            'Connection': _0x20c2c2['ecxFw'],
            'Cookie': cookie,
            'User-Agent': 'jdapp;iPhone;9.4.8;13.7;' + $['UUID'] + ';network/wifi;ADID/' + $['ADID'] + ';supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Accept-Language': _0x20c2c2['wBrgd'],
            'Referer': 'https://crmsam.jd.com/union/index.html?token=BD6F3361FF99DD4964D386EC4A0DABF0&url=&lng=0.000000&lat=0.000000&sid=&un_area=',
            'Accept-Encoding': _0x20c2c2['gVVVv']
        }
    };
    return new Promise(_0x4511b0 => {
        var _0x48d56e = {
            'YuBhH': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
            'oACrd': 'https://bean.m.jd.com/bean/signIndex.action',
            'iASkj': _0x20c2c2['LbXgs']
        };
        $['get'](_0x2a3860, (_0x44d627, _0x888739, _0x12c7c4) => {
            var _0x111727 = {
                'EZcZR': function(_0x4f4995, _0x222c78) {
                    return _0x4f4995 | _0x222c78;
                },
                'CIySC': function(_0x2193f3, _0x18bf6e) {
                    return _0x20c2c2['xhGJm'](_0x2193f3, _0x18bf6e);
                },
                'SkrWj': function(_0x3b7675, _0x337b95) {
                    return _0x20c2c2['oChii'](_0x3b7675, _0x337b95);
                },
                'Ktyxj': function(_0x577217, _0x1d2214) {
                    return _0x20c2c2['gPUuE'](_0x577217, _0x1d2214);
                },
                'QkxLB': function(_0x2897c7, _0xfe28a5) {
                    return _0x2897c7 & _0xfe28a5;
                },
                'Idsnd': _0x20c2c2['UABrc'],
                'VURcy': _0x20c2c2['QqxeP'],
                'IwZCC': _0x20c2c2['iFEgA']
            };
            if ('BqlWq' === _0x20c2c2['Jwtys']) {
                if (_0x12c7c4) {
                    _0x12c7c4 = JSON['parse'](_0x12c7c4);
                    if (_0x12c7c4['data']['length'] > 0x0) {
                        $['shareCode'] = _0x12c7c4['data'][0x0]['share_code'];
                    } else {
                        $['shareCode'] = '';
                    }
                }
            } else {
                try {
                    if (_0x20c2c2['praru']('ylhDj', _0x20c2c2['OdeBv'])) {
                        return format['replace'](/[xy]/g, function(_0x2ce748) {
                            var _0x52ce0e = _0x111727['EZcZR'](_0x111727['CIySC'](Math['random'](), 0x10), 0x0),
                                _0x1017ef = _0x111727['SkrWj'](_0x2ce748, 'x') ? _0x52ce0e : _0x111727['Ktyxj'](_0x111727['QkxLB'](_0x52ce0e, 0x3), 0x8);
                            if (UpperCase) {
                                uuid = _0x1017ef['toString'](0x24)['toUpperCase']();
                            } else {
                                uuid = _0x1017ef['toString'](0x24);
                            }
                            return uuid;
                        });
                    } else {
                        if (_0x44d627) {
                            if (_0x20c2c2['AVrQn'](_0x20c2c2['bVTDq'], _0x20c2c2['bVTDq'])) {
                                $['msg']($['name'], _0x48d56e['YuBhH'], _0x48d56e['oACrd'], {
                                    'open-url': _0x48d56e['oACrd']
                                });
                                return;
                            } else {
                                $['log']('网络请求发生异常：' + _0x44d627);
                            }
                        } else {
                            if (_0x12c7c4) {
                                _0x12c7c4 = JSON['parse'](_0x12c7c4);
                                if (_0x20c2c2['ObaKf'](_0x12c7c4['code'], 0xc8)) {
                                    $['bindBrandId'] = [];
                                    list = _0x12c7c4['data']['filter'](_0x53c6e5 => _0x53c6e5['isMember'] === ![]);
                                    for (const _0x9db788 of list) {
                                        $['bindBrandId']['push'](_0x9db788['brandId']);
                                    }
                                } else {
                                    if (_0x20c2c2['yVFYF'](_0x20c2c2['uYWbi'], _0x20c2c2['uYWbi'])) {
                                        let _0x1f1843 = $['getdata'](_0x111727['Idsnd']) || '[]';
                                        _0x1f1843 = JSON['parse'](_0x1f1843);
                                        cookiesArr = _0x1f1843['map'](_0x2dfb45 => _0x2dfb45['cookie']);
                                        cookiesArr['reverse']();
                                        cookiesArr['push'](...[$['getdata'](_0x111727['VURcy']), $['getdata'](_0x111727['IwZCC'])]);
                                        cookiesArr['reverse']();
                                        cookiesArr = cookiesArr['filter'](_0x10ad34 => !!_0x10ad34);
                                    } else {
                                        $['log'](JSON['stringify'](_0x12c7c4));
                                    }
                                }
                            } else {
                                if (_0x20c2c2['yVFYF'](_0x20c2c2['qLJFg'], _0x20c2c2['qLJFg'])) {
                                    $['log'](_0x48d56e['iASkj']);
                                } else {
                                    $['log'](_0x20c2c2['RsFhS']);
                                }
                            }
                        }
                    }
                } catch (_0x12d81e) {
                    $['log']('Promise发生错误：' + _0x12d81e);
                } finally {
                    _0x20c2c2['WARep'](_0x4511b0);
                }
            }
        });
    });
}

function doGetTask(_0x28209d, _0x411964) {
    var _0x5f1fb9 = {
        'HFklJ': '没有成功获取token，请再次尝试或可能账号已经黑了。',
        'FyTdF': function(_0x71c776, _0x10732a) {
            return _0x71c776 === _0x10732a;
        },
        'YfglC': 'VdZYX',
        'DUNkL': 'user',
        'PXMDx': 'task_state',
        'qKEep': 'view_shop',
        'LRMrT': '京东返回了一段空数据',
        'wyiXU': function(_0x16dabf, _0xb0f9f3, _0x1f9be9) {
            return _0x16dabf(_0xb0f9f3, _0x1f9be9);
        }
    };
    return new Promise(_0x2e50fc => {
        var _0x3461b5 = {
            'KJfmQ': _0x5f1fb9['HFklJ'],
            'QwWkU': function(_0x5947ba, _0x2d53ca) {
                return _0x5f1fb9['FyTdF'](_0x5947ba, _0x2d53ca);
            },
            'jlbSL': _0x5f1fb9['YfglC'],
            'NMsVW': function(_0x3f9364, _0x286d5b) {
                return _0x3f9364 !== _0x286d5b;
            },
            'fIiFB': 'hdber',
            'zAHxE': 'Bmkog',
            'ZsYTN': _0x5f1fb9['DUNkL'],
            'yzRwz': _0x5f1fb9['PXMDx'],
            'qPqRd': _0x5f1fb9['qKEep'],
            'Nyhyr': _0x5f1fb9['LRMrT'],
            'cVvyb': 'MbEJn'
        };
        $['get'](_0x5f1fb9['wyiXU'](taskGetUrl, _0x28209d, _0x411964), (_0x2cd428, _0x5cca72, _0x38f389) => {
            var _0x4d120d = {
                'YbSOe': function(_0x38d375) {
                    return _0x38d375();
                }
            };
            try {
                if (_0x3461b5['QwWkU'](_0x3461b5['jlbSL'], _0x3461b5['jlbSL'])) {
                    if (_0x2cd428) {
                        if (_0x5cca72['body']) {
                            respb = JSON['parse'](_0x5cca72['body']);
                            if (respb['message'] === '风险用户') {
                                $['risk'] = !![];
                            }
                            $['log']('    └ 发生错误： ' + respb['message']);
                        }
                    } else {
                        if (_0x3461b5['NMsVW'](_0x3461b5['fIiFB'], _0x3461b5['zAHxE'])) {
                            if (_0x38f389) {
                                _0x38f389 = JSON['parse'](_0x38f389);
                                switch (_0x28209d) {
                                    case _0x3461b5['ZsYTN']:
                                        $['userInfo'] = _0x38f389;
                                        break;
                                    case _0x3461b5['yzRwz']:
                                        $['taskInfo'] = _0x38f389;
                                        break;
                                    case _0x3461b5['qPqRd']:
                                        if (_0x38f389['add_coins']) {
                                            $['log']('    └ 完成任务，获得 ' + _0x38f389['add_coins'] + '个金币');
                                        } else {
                                            $['log']('    └ 完成任务');
                                        }
                                        break;
                                    case 'exchange_list':
                                        $['exchange_list'] = _0x38f389;
                                        break;
                                    default:
                                        $['log'](JSON['stringify'](_0x38f389));
                                        break;
                                }
                            } else {
                                $['log'](_0x3461b5['Nyhyr']);
                            }
                        } else {
                            $['log']('京东返回了空数据');
                        }
                    }
                } else {
                    $['zRes'] = JSON['parse'](_0x38f389);
                    _0x4d120d['YbSOe'](_0x2e50fc);
                }
            } catch (_0x4c990a) {
                if (_0x3461b5['cVvyb'] !== 'pyaNz') {
                    $['log']('catch到异常：' + _0x4c990a);
                } else {
                    $['log'](_0x3461b5['KJfmQ']);
                }
            } finally {
                _0x2e50fc();
            }
        });
    });
}

function doPostTask(_0x10dc18, _0x3b5dec) {
    var _0x5d1697 = {
        'ZNzuG': function(_0x347663, _0x334b0c) {
            return _0x347663 === _0x334b0c;
        },
        'yAVfL': 'lKFdV',
        'qaWOC': 'PUonj',
        'SlwNy': function(_0x5e4e89, _0x24097e) {
            return _0x5e4e89 === _0x24097e;
        },
        'AsLTC': 'CiyoC',
        'TWALl': 'sign',
        'EQHLC': 'invite',
        'AHuVu': function(_0x55611e, _0x3b7c2c) {
            return _0x55611e !== _0x3b7c2c;
        },
        'VktZN': 'tTReV',
        'xIhwS': 'fCeYj',
        'qrcVM': 'xuUiu',
        'RWsId': 'BkmkB',
        'WudkQ': 'jd_interact',
        'jffmT': 'invite_task',
        'MAyiW': 'factory_extension',
        'gaeNr': 'brand_card',
        'SyCPt': 'exchange_product',
        'xhNYJ': 'entity',
        'FojQL': '京东返回了一段空数据',
        'JWJgF': 'RQScl',
        'mQvFu': 'dFdyL',
        'yBCdn': function(_0x4330f9) {
            return _0x4330f9();
        },
        'RUpGr': function(_0x2f1ee9) {
            return _0x2f1ee9();
        },
        'xDLNT': function(_0x165618, _0x2505de, _0x4e5f1f) {
            return _0x165618(_0x2505de, _0x4e5f1f);
        }
    };
    return new Promise(_0x15077d => {
        var _0x2fb1f9 = {
            'UHLLf': function(_0x1a4c9f) {
                return _0x5d1697['RUpGr'](_0x1a4c9f);
            },
            'SXiEQ': function(_0x49970c, _0x528dc6) {
                return _0x5d1697['SlwNy'](_0x49970c, _0x528dc6);
            }
        };
        $['post'](_0x5d1697['xDLNT'](taskPostUrl, _0x10dc18, _0x3b5dec), (_0x1d3286, _0x54fa98, _0x15818c) => {
            try {
                if (_0x5d1697['ZNzuG'](_0x5d1697['yAVfL'], _0x5d1697['qaWOC'])) {
                    $['log']('京东返回了一段空数据');
                } else {
                    if (_0x1d3286) {
                        if (_0x5d1697['SlwNy']('tfYxL', _0x5d1697['AsLTC'])) {
                            _0x2fb1f9['UHLLf'](_0x15077d);
                        } else {
                            if (_0x54fa98['body']) {
                                respb = JSON['parse'](_0x54fa98['body']);
                                $['log']('    └ 发生错误： ' + respb['message']);
                            }
                        }
                    } else {
                        if (_0x15818c) {
                            _0x15818c = JSON['parse'](_0x15818c);
                            switch (_0x10dc18) {
                                case _0x5d1697['TWALl']:
                                    if (_0x15818c['add_coins']) {
                                        $['log']('    └ 完成任务，获得 ' + _0x15818c['add_coins'] + '个金币');
                                    } else {
                                        $['log'](JSON['stringify'](_0x15818c));
                                    }
                                    break;
                                case _0x5d1697['EQHLC']:
                                    if (_0x15818c['add_coins']) {
                                        if (_0x5d1697['AHuVu'](_0x5d1697['VktZN'], _0x5d1697['VktZN'])) {
                                            console['log']('' + _0x1d3286);
                                        } else {
                                            $['log']('    └ 完成任务，获得 ' + _0x15818c['add_coins'] + '个金币');
                                        }
                                    } else {
                                        if (_0x5d1697['xIhwS'] === 'fCeYj') {
                                            $['log'](JSON['stringify'](_0x15818c));
                                        } else {
                                            _0x15818c = JSON['parse'](_0x15818c);
                                            if (_0x2fb1f9['SXiEQ'](_0x15818c['code'], 0xc8)) {
                                                $['bindBrandId'] = [];
                                                list = _0x15818c['data']['filter'](_0x520493 => _0x520493['isMember'] === ![]);
                                                for (const _0x10b9f2 of list) {
                                                    $['bindBrandId']['push'](_0x10b9f2['brandId']);
                                                }
                                            } else {
                                                $['log'](JSON['stringify'](_0x15818c));
                                            }
                                        }
                                    }
                                    break;
                                case 'product_add':
                                    if (_0x15818c['add_coins']) {
                                        $['log']('    └ 完成任务，获得 ' + _0x15818c['add_coins'] + '个金币');
                                    } else {
                                        if (_0x5d1697['SlwNy'](_0x5d1697['qrcVM'], _0x5d1697['RWsId'])) {
                                            $['log']('网络请求发生异常：' + _0x1d3286);
                                        } else {
                                            $['log'](JSON['stringify'](_0x15818c));
                                        }
                                    }
                                    break;
                                case _0x5d1697['WudkQ']:
                                    break;
                                case _0x5d1697['jffmT']:
                                    break;
                                case _0x5d1697['MAyiW']:
                                    if (_0x15818c['beans']) {
                                        $['log']('    └ 升级成功，获得 ' + _0x15818c['beans'] + '个京豆');
                                        $['bean'] += _0x15818c['beans'];
                                    }
                                    $['log']('    └ 升级成功，当前农场等级: ' + _0x15818c['factory_level'] + '级');
                                    break;
                                case 'produce_milk':
                                    $['log']('    └ 开始生产牛奶，完成生产需要' + _0x15818c['produce_count_down'] + '秒');
                                    break;
                                case 'milk_display':
                                    $['log']('    └ 成功上架了' + _0x15818c['display_milk'] + '箱牛奶');
                                    break;
                                case _0x5d1697['gaeNr']:
                                    if (_0x15818c['add_coins']) {
                                        $['log']('    └ 完成任务，获得 ' + _0x15818c['add_coins'] + '个金币');
                                    } else {
                                        $['log'](JSON['stringify'](_0x15818c));
                                    }
                                    break;
                                case _0x5d1697['SyCPt']:
                                    switch (_0x15818c['type']) {
                                        case 'beans':
                                            $['log']('    └ 成功兑换 ' + _0x15818c['beans'] + '个京豆');
                                            $['bean'] += _0x15818c['beans'];
                                            break;
                                        case _0x5d1697['xhNYJ']:
                                            $['log']('    └ 成功兑换');
                                            message += JSON['stringify'](_0x15818c);
                                            break;
                                        default:
                                            $['log'](JSON['stringify'](_0x15818c));
                                            break;
                                    }
                                    break;
                                default:
                                    $['log'](JSON['stringify'](_0x15818c));
                                    break;
                            }
                        } else {
                            $['log'](_0x5d1697['FojQL']);
                        }
                    }
                }
            } catch (_0x4a6994) {
                if (_0x5d1697['JWJgF'] !== _0x5d1697['mQvFu']) {
                    $['log']('catch到异常：' + _0x4a6994);
                } else {
                    $['logErr'](e);
                }
            } finally {
                _0x5d1697['yBCdn'](_0x15077d);
            }
        });
    });
}

function taskGetUrl(_0x1c59f8, _0x287236 = '') {
    var _0x3ac508 = {
        'lgZBV': 'xinrui1-isv.isvjcloud.com',
        'CzOkr': 'gzip, deflate, br'
    };
    return {
        'url': 'https://xinrui1-isv.isvjcloud.com/api/' + _0x1c59f8 + _0x287236,
        'headers': {
            'Host': _0x3ac508['lgZBV'],
            'Source': '02',
            'Accept-Encoding': _0x3ac508['CzOkr'],
            'Cookie': cookie,
            'Connection': 'keep-alive',
            'Accept': 'application/x.jd-school-raffle.v1+json',
            'User-Agent': 'jdapp;iPhone;9.4.8;13.7;' + $['UUID'] + ';network/wifi;ADID/' + $['ADID'] + ';supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Authorization': 'Bearer ' + $['access_token'],
            'Referer': 'https://xinrui1-isv.isvjcloud.com/loading/',
            'Accept-Language': 'zh-cn'
        }
    };
}

function taskPostUrl(_0xd522e7, _0x2d6816) {
    var _0x1c0168 = {
        'rTvYS': 'jd-user-info',
        'CVWLq': 'xinrui1-isv.isvjcloud.com',
        'RrNfO': 'zh-cn',
        'RAxem': 'gzip, deflate, br',
        'HmeQf': 'application/json;charset=utf-8',
        'wFHkk': 'https://xinrui1-isv.isvjcloud.com',
        'YNcrp': 'keep-alive'
    };
    switch (_0xd522e7) {
        case _0x1c0168['rTvYS']:
            auth_token = 'Bearer undefine';
            break;
        default:
            auth_token = 'Bearer ' + $['access_token'];
            break;
    }
    return {
        'url': 'https://xinrui1-isv.isvjcloud.com/api/' + _0xd522e7,
        'headers': {
            'Host': _0x1c0168['CVWLq'],
            'Accept': 'application/x.jd-school-raffle.v1+json',
            'Authorization': auth_token,
            'Source': '02',
            'Accept-Language': _0x1c0168['RrNfO'],
            'Accept-Encoding': _0x1c0168['RAxem'],
            'Content-Type': _0x1c0168['HmeQf'],
            'Origin': _0x1c0168['wFHkk'],
            'User-Agent': 'jdapp;iPhone;9.4.8;13.7;' + $['UUID'] + ';network/wifi;ADID/' + $['ADID'] + ';supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone10,3;addressid/;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Referer': 'https://xinrui1-isv.isvjcloud.com/',
            'Connection': _0x1c0168['YNcrp'],
            'Cookie': cookie
        },
        'body': JSON['stringify'](_0x2d6816)
    };
}

function getAccessToken(_0x1fc26c) {
    var _0x432d26 = {
        'HcqdU': function(_0xb9d86, _0x50a17d) {
            return _0xb9d86 === _0x50a17d;
        },
        'KQkcP': function(_0x244285, _0x1d7a33) {
            return _0x244285 !== _0x1d7a33;
        },
        'VZFfm': 'mzROt',
        'sgdJn': function(_0x119c65, _0x2ad905) {
            return _0x119c65 === _0x2ad905;
        },
        'xZlOO': 'GvPJG',
        'hAYaL': '京东返回了一段空数据',
        'ayUBV': 'kcCqA',
        'JVyrc': 'JXARX',
        'Oogrh': function(_0x5c4419) {
            return _0x5c4419();
        },
        'GosBB': function(_0x362c88, _0x2f8d5b, _0x56c919) {
            return _0x362c88(_0x2f8d5b, _0x56c919);
        },
        'cczxv': 'jd-user-info'
    };
    return new Promise(_0x54676f => {
        var _0x30d410 = {
            'TQTuW': function(_0x2c6de4, _0x2a7fe3) {
                return _0x432d26['HcqdU'](_0x2c6de4, _0x2a7fe3);
            },
            'TYzsR': '成功获取到access_token',
            'mQWsK': function(_0x5676a1, _0x36bb83) {
                return _0x432d26['KQkcP'](_0x5676a1, _0x36bb83);
            },
            'pLIBw': _0x432d26['VZFfm'],
            'jWcNO': function(_0x3d3e3b, _0xa3c984) {
                return _0x432d26['sgdJn'](_0x3d3e3b, _0xa3c984);
            },
            'XUOmR': 'PKDpR',
            'avCkH': _0x432d26['xZlOO'],
            'TaLOf': _0x432d26['hAYaL'],
            'ZMgNP': _0x432d26['ayUBV'],
            'suCfK': function(_0x3645e6, _0x497456) {
                return _0x432d26['sgdJn'](_0x3645e6, _0x497456);
            },
            'bgBmX': _0x432d26['JVyrc'],
            'NmImw': function(_0x27a578) {
                return _0x432d26['Oogrh'](_0x27a578);
            }
        };
        $['post'](_0x432d26['GosBB'](taskPostUrl, _0x432d26['cczxv'], {
            'token': _0x1fc26c,
            'source': '01'
        }), (_0x5436dc, _0x229eff, _0x4d5e2e) => {
            if (_0x30d410['mQWsK'](_0x30d410['pLIBw'], 'RXyRw')) {
                try {
                    if (_0x30d410['jWcNO']('TuKtE', _0x30d410['XUOmR'])) {
                        if (_0x5436dc) {
                            console['log']('' + JSON['stringify'](_0x5436dc));
                        } else {
                            _0x4d5e2e = JSON['parse'](_0x4d5e2e);
                            if (_0x4d5e2e && _0x30d410['TQTuW'](_0x4d5e2e['code'], 0xc8)) {
                                $['log']('   └' + _0x4d5e2e['msg']);
                            }
                        }
                    } else {
                        if (_0x5436dc) {
                            if (_0x30d410['avCkH'] !== 'xuJSO') {
                                $['log']('网络请求错误:' + _0x5436dc);
                            } else {
                                _0x4d5e2e = JSON['parse'](_0x4d5e2e);
                                if (_0x4d5e2e['access_token']) {
                                    $['log'](_0x30d410['TYzsR']);
                                    $['access_token'] = _0x4d5e2e['access_token'];
                                }
                            }
                        } else {
                            if ('twiLq' !== 'twiLq') {
                                for (const _0x2efdfa of _0x4d5e2e['data']) {
                                    $['log']('    └ 成功加入' + _0x2efdfa['brandsName'] + '会员');
                                }
                            } else {
                                if (_0x4d5e2e) {
                                    _0x4d5e2e = JSON['parse'](_0x4d5e2e);
                                    if (_0x4d5e2e['access_token']) {
                                        $['log'](_0x30d410['TYzsR']);
                                        $['access_token'] = _0x4d5e2e['access_token'];
                                    }
                                } else {
                                    $['log'](_0x30d410['TaLOf']);
                                }
                            }
                        }
                    }
                } catch (_0x524aa2) {
                    if (_0x30d410['jWcNO'](_0x30d410['ZMgNP'], _0x30d410['ZMgNP'])) {
                        $['log']('catch到异常：' + _0x524aa2);
                    } else {
                        $['done']();
                    }
                } finally {
                    if (_0x30d410['suCfK']('JXARX', _0x30d410['bgBmX'])) {
                        _0x30d410['NmImw'](_0x54676f);
                    } else {
                        console['log'](e);
                    }
                }
            } else {
                $['log']('catch到异常：' + error);
            }
        });
    });
}

function grantToken() {
    var _0x1b7282 = {
        'lPJbk': 'uvMeG',
        'bhowH': 'UyLzi',
        'NgMlG': 'zCVdS',
        'EoJuA': 'LHfdI',
        'gpqoV': 'mgziK',
        'frMDu': function(_0x3e27df, _0x386dd7) {
            return _0x3e27df === _0x386dd7;
        },
        'JKXxu': 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
        'nDzSY': 'api.m.jd.com',
        'hQUzF': 'application/x-www-form-urlencoded',
        'ytMAp': 'keep-alive',
        'pmRFX': 'JD4iPhone/167629 (iPhone; iOS 13.7; Scale/3.00)',
        'sDWav': 'gzip, deflate, br',
        'SpaXV': 'body=%7B%22url%22%3A%22https%3A%5C%2F%5C%2Fxinrui1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167629&client=apple&clientVersion=9.4.8&openudid=9797b517fd6a02824c1e5a2cdbacc8e1ce928f6b&osVersion=13.7&partner=apple&scope=01&sign=9d409e2b01eb798f66fb1bcdfe132ab3&st=1617446279366&sv=102&uts=0f31TVRjBSsqndu4%2FjgUPz6uymy50MQJ56n41YtHfjrQzVIDHSPAd1DxTq7%2BfSv9%2Fk4LKimoYAHAyx7XUWCcilNsUMWHfZgn1VKQyuiRLlorZZXOLYd7t46FffuSotFLsWYWhF8NlABQCWFhFIiXMVwv3ocx5bi0wPWgJVEuBAeMCmf%2FQuS7Tc4z8AsyYANiwfWOYfWLlLLZ4moJbnkcgg%3D%3D'
    };
    let _0x428200 = {
        'url': _0x1b7282['JKXxu'],
        'headers': {
            'Host': _0x1b7282['nDzSY'],
            'Content-Type': _0x1b7282['hQUzF'],
            'Accept': '*/*',
            'Connection': _0x1b7282['ytMAp'],
            'Cookie': cookie,
            'User-Agent': _0x1b7282['pmRFX'],
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': _0x1b7282['sDWav']
        },
        'body': _0x1b7282['SpaXV']
    };
    return new Promise(_0x1abc6f => {
        var _0x52164e = {
            'kTvuz': '根据用户设置，关闭自动升级农场功能',
            'vlvHR': _0x1b7282['lPJbk'],
            'Hcvaq': function(_0x1f21ed, _0xa947b6) {
                return _0x1f21ed !== _0xa947b6;
            },
            'HSSeo': _0x1b7282['bhowH'],
            'KBCXh': _0x1b7282['NgMlG'],
            'qlnzJ': '成功获取到token',
            'lMTth': _0x1b7282['EoJuA'],
            'haNLQ': '京东返回了一段空数据',
            'okZLp': _0x1b7282['gpqoV'],
            'EvfNY': function(_0x2770dc, _0x693dae) {
                return _0x1b7282['frMDu'](_0x2770dc, _0x693dae);
            }
        };
        $['post'](_0x428200, (_0x146198, _0x13edff, _0x5cac89) => {
            var _0xb54056 = {
                'ypJet': _0x52164e['kTvuz']
            };
            if (_0x52164e['vlvHR'] !== _0x52164e['vlvHR']) {
                $['log'](_0xb54056['ypJet']);
            } else {
                try {
                    if (_0x52164e['Hcvaq'](_0x52164e['HSSeo'], _0x52164e['HSSeo'])) {
                        _0x1abc6f();
                    } else {
                        if (_0x146198) {
                            $['log']('网络请求错误:' + _0x146198);
                        } else {
                            if (_0x5cac89) {
                                if ('zCVdS' === _0x52164e['KBCXh']) {
                                    _0x5cac89 = JSON['parse'](_0x5cac89);
                                    if (_0x5cac89['errcode']) {
                                        if ('kJdyf' !== 'bYdGs') {
                                            $['log'](_0x5cac89['message']);
                                        } else {
                                            $['logErr'](e, _0x13edff);
                                        }
                                    } else {
                                        if (_0x5cac89['token']) {
                                            $['token'] = _0x5cac89['token'];
                                            $['log'](_0x52164e['qlnzJ']);
                                        }
                                    }
                                } else {
                                    console['log']('' + _0x146198);
                                }
                            } else {
                                if (_0x52164e['Hcvaq'](_0x52164e['lMTth'], 'lznsm')) {
                                    $['log'](_0x52164e['haNLQ']);
                                } else {
                                    $['log'](JSON['stringify'](_0x5cac89));
                                }
                            }
                        }
                    }
                } catch (_0x297b60) {
                    if ('SXGlg' === _0x52164e['okZLp']) {
                        $['log']('catch到异常：' + _0x297b60);
                    } else {
                        $['log']('catch到异常：' + _0x297b60);
                    }
                } finally {
                    if (_0x52164e['EvfNY']('ajJuJ', 'HvIbn')) {
                        $['log']('当前金币不足以兑换奖品');
                    } else {
                        _0x1abc6f();
                    }
                }
            }
        });
    });
}

function getUUID(_0x2aade0 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x2abc00 = 0x0) {
    var _0x314e50 = {
        'cADRq': function(_0x3edd37, _0xfad086) {
            return _0x3edd37 | _0xfad086;
        },
        'kGpyx': function(_0x143d97, _0x257b12) {
            return _0x143d97 * _0x257b12;
        },
        'ybnqT': function(_0x151481, _0x4cbaa7) {
            return _0x151481 == _0x4cbaa7;
        },
        'sRLQW': function(_0x37d982, _0x25a8ed) {
            return _0x37d982 | _0x25a8ed;
        },
        'RMxMf': function(_0x199cfa, _0x5e7b78) {
            return _0x199cfa & _0x5e7b78;
        }
    };
    return _0x2aade0['replace'](/[xy]/g, function(_0x36d081) {
        var _0x27f1e9 = _0x314e50['cADRq'](_0x314e50['kGpyx'](Math['random'](), 0x10), 0x0),
            _0x171e26 = _0x314e50['ybnqT'](_0x36d081, 'x') ? _0x27f1e9 : _0x314e50['sRLQW'](_0x314e50['RMxMf'](_0x27f1e9, 0x3), 0x8);
        if (_0x2abc00) {
            uuid = _0x171e26['toString'](0x24)['toUpperCase']();
        } else {
            uuid = _0x171e26['toString'](0x24);
        }
        return uuid;
    });
}

function random(_0x1cb8f3, _0x5c6927) {
    var _0x227d6e = {
        'Gclkz': function(_0x35ed22, _0x5d2df5) {
            return _0x35ed22 + _0x5d2df5;
        },
        'iqXQt': function(_0x46d746, _0x51d7ca) {
            return _0x46d746 - _0x51d7ca;
        }
    };
    return _0x227d6e['Gclkz'](Math['floor'](Math['random']() * _0x227d6e['iqXQt'](_0x5c6927, _0x1cb8f3)), _0x1cb8f3);
}

function checkCookie() {
    var _0x4c3682 = {
        'PWQnF': 'userInfo',
        'ZFiux': function(_0x4eeeac, _0x53688d) {
            return _0x4eeeac !== _0x53688d;
        },
        'hYdhq': 'FqwsG',
        'TrNuN': 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion',
        'iHAVy': '*/*',
        'shvSf': 'keep-alive',
        'gDTvt': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
        'olBad': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
        'XTcjn': 'gzip, deflate, br'
    };
    const _0x2a6f41 = {
        'url': _0x4c3682['TrNuN'],
        'headers': {
            'Host': 'me-api.jd.com',
            'Accept': _0x4c3682['iHAVy'],
            'Connection': _0x4c3682['shvSf'],
            'Cookie': cookie,
            'User-Agent': _0x4c3682['gDTvt'],
            'Accept-Language': 'zh-cn',
            'Referer': _0x4c3682['olBad'],
            'Accept-Encoding': _0x4c3682['XTcjn']
        }
    };
    return new Promise(_0x209331 => {
        var _0x119e3f = {
            'jpbZb': _0x4c3682['PWQnF'],
            'pYrpg': function(_0x2ec686, _0x25e285) {
                return _0x4c3682['ZFiux'](_0x2ec686, _0x25e285);
            },
            'ZMLfg': _0x4c3682['hYdhq'],
            'kPQYp': function(_0x54b434) {
                return _0x54b434();
            }
        };
        $['get'](_0x2a6f41, (_0x4ea7f9, _0x46773a, _0x1b184f) => {
            try {
                if (_0x4ea7f9) {
                    $['logErr'](_0x4ea7f9);
                } else {
                    if (_0x1b184f) {
                        _0x1b184f = JSON['parse'](_0x1b184f);
                        if (_0x1b184f['retcode'] === '1001') {
                            $['isLogin'] = ![];
                            return;
                        }
                        if (_0x1b184f['retcode'] === '0' && _0x1b184f['data']['hasOwnProperty'](_0x119e3f['jpbZb'])) {
                            $['nickName'] = _0x1b184f['data']['userInfo']['baseInfo']['nickname'];
                        }
                    } else {
                        $['log']('京东返回了空数据');
                    }
                }
            } catch (_0x5c1ddb) {
                if ('Relem' !== 'Relem') {
                    _0x209331();
                } else {
                    $['logErr'](_0x5c1ddb);
                }
            } finally {
                if (_0x119e3f['pYrpg']('FqwsG', _0x119e3f['ZMLfg'])) {
                    $['log']('    └ 完成任务，获得 ' + _0x1b184f['add_coins'] + '个金币');
                } else {
                    _0x119e3f['kPQYp'](_0x209331);
                }
            }
        });
    });
};
_0xod4 = 'jsjiami.com.v6'
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

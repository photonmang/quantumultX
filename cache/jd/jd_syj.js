/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-11-27 09:19:21
 * @Last Modified by: lxk0301
 * @Last Modified time: 2021-3-31 16:58:02
 */
/*
赚京豆脚本，一周签到下来可获得30京豆，一天任意时刻运行一次即可
活动入口：赚京豆(微信小程序)-赚京豆-签到领京豆
更新地址：https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_syj.js
参考github@jidesheng6修改而来
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#赚京豆
10 7 * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_syj.js, tag=赚京豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jd_syj.png, enabled=true

================Loon==============
[Script]
cron "10 7 * * *" script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_syj.js, tag=赚京豆

===============Surge=================
赚京豆 = type=cron,cronexp="10 7 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_syj.js

============小火箭=========
赚京豆 = type=cron,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_syj.js, cronexpr="10 7 * * *", timeout=3600, enable=true
 */
const $ = new Env('赚京豆');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;



if ($['isNode']()) {
    Object['keys'](jdCookieNode)['forEach'](_0x147e80 => {
        cookiesArr['push'](jdCookieNode[_0x147e80]);
    });
    if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
    if (JSON['stringify'](process['env'])['indexOf']('GITHUB') > -0x1) process['exit'](0x0);
} else {
    cookiesArr = [$['getdata']('CookieJD'), $['getdata']('CookieJD2'), ...jsonParse($['getdata']('CookiesJD') || '[]')['map'](_0x558439 => _0x558439['cookie'])]['filter'](_0x3d1d6e => !!_0x3d1d6e);
}
const JD_API_HOST = 'https://api.m.jd.com/api';
!(async () => {
    var _0x529fbf = {
        'oXavr': function(_0x455775, _0x7ffdd3) {
            return _0x455775 === _0x7ffdd3;
        },
        'TSwif': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'iPnwb': 'https://bean.m.jd.com/bean/signIndex.action',
        'JQblD': function(_0x32f5f2, _0x295718) {
            return _0x32f5f2 < _0x295718;
        },
        'szWiT': function(_0x39cb25, _0x475da0) {
            return _0x39cb25 !== _0x475da0;
        },
        'jjAHQ': 'RGrJw',
        'vpfjD': 'swrtn',
        'zGOSA': function(_0x991c82, _0x43890f) {
            return _0x991c82(_0x43890f);
        },
        'vtvWc': function(_0x1079b7, _0x4d6747) {
            return _0x1079b7 + _0x4d6747;
        },
        'ZGkmT': function(_0x29d1cf) {
            return _0x29d1cf();
        },
        'mxyUd': function(_0x3e3bb6, _0x2dbf7e) {
            return _0x3e3bb6 !== _0x2dbf7e;
        },
        'htNLJ': 'sTGOT',
        'rbQSY': function(_0x660462) {
            return _0x660462();
        }
    };
    if (!cookiesArr[0x0]) {
        $['msg']($['name'], _0x529fbf['TSwif'], _0x529fbf['iPnwb'], {
            'open-url': _0x529fbf['iPnwb']
        });
        return;
    }
    for (let _0x4d075b = 0x0; _0x529fbf['JQblD'](_0x4d075b, cookiesArr['length']); _0x4d075b++) {
        if (_0x529fbf['szWiT'](_0x529fbf['jjAHQ'], _0x529fbf['vpfjD'])) {
            if (cookiesArr[_0x4d075b]) {
                cookie = cookiesArr[_0x4d075b];
                $['UserName'] = _0x529fbf['zGOSA'](decodeURIComponent, cookie['match'](/pt_pin=([^; ]+)(?=;?)/) && cookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
                $['index'] = _0x529fbf['vtvWc'](_0x4d075b, 0x1);
                $['isLogin'] = !![];
                $['nickName'] = '';
                message = '';
                await _0x529fbf['ZGkmT'](TotalBean);
                console['log']('\n******开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '*********\n');
                if (!$['isLogin']) {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                        'open-url': _0x529fbf['iPnwb']
                    });
                    if ($['isNode']()) {
                        if (_0x529fbf['mxyUd'](_0x529fbf['htNLJ'], _0x529fbf['htNLJ'])) {
                            let {
                                alreadySignDays,
                                beanTotalNum,
                                todayPrize,
                                eachDayPrize
                            } = data['data'];
                            message += '【第' + alreadySignDays + '日签到】成功，获得' + todayPrize['beanAmount'] + '京豆 🐶\n';
                            if (_0x529fbf['oXavr'](alreadySignDays, 0x7)) alreadySignDays = 0x0;
                            message += '【明日签到】可获得' + eachDayPrize[alreadySignDays]['beanAmount'] + '京豆 🐶\n';
                            message += '【累计获得】' + beanTotalNum + '京豆 🐶';
                        } else {
                            await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\n请重新登录获取cookie');
                        }
                    }
                    continue;
                }
                await _0x529fbf['rbQSY'](userSignIn);
                await _0x529fbf['rbQSY'](vvipTask);
                await _0x529fbf['rbQSY'](showMsg);
            }
        } else {
            console['log']('异常：' + JSON['stringify'](data));
        }
    }
})()['catch'](_0x37b536 => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x37b536 + '!', '');
})['finally'](() => {
    $['done']();
});

function showMsg() {
    var _0x48e1b7 = {
        'OdvxB': function(_0x836069) {
            return _0x836069();
        }
    };
    return new Promise(_0x557a8a => {
        if (message) $['msg']($['name'], '', '【京东账号' + $['index'] + '】' + $['nickName'] + '\x0a' + message);
        _0x48e1b7['OdvxB'](_0x557a8a);
    });
}
let signFlag = 0x0;

function userSignIn() {
    var _0x4b9882 = {
        'MysKB': function(_0xfa9bb7) {
            return _0xfa9bb7();
        },
        'AfcLI': function(_0x59a9b9, _0x5b4f4d) {
            return _0x59a9b9 + _0x5b4f4d;
        },
        'KrUrF': '做任务 天天领京豆',
        'eGcgt': function(_0x3dfd3c) {
            return _0x3dfd3c();
        },
        'pECSo': function(_0x220d30) {
            return _0x220d30();
        },
        'yhxfd': function(_0xc90182, _0x536258) {
            return _0xc90182 !== _0x536258;
        },
        'gkznj': 'fqGFu',
        'Loocw': 'kVOvo',
        'CCTrS': function(_0x4aa9a8, _0x48ba2b) {
            return _0x4aa9a8 === _0x48ba2b;
        },
        'xoMCo': 'xBcoc',
        'pYikS': 'qtLXe',
        'Nevyh': 'Kretk',
        'Ykmja': 'hAQCV',
        'NjfNK': function(_0x5ee145, _0x2bef18) {
            return _0x5ee145(_0x2bef18);
        },
        'VkrWa': function(_0x31ac96, _0x194ed3) {
            return _0x31ac96 !== _0x194ed3;
        },
        'yUKkl': 'zdYXq',
        'eSFoj': 'cAOMU',
        'uDfOS': function(_0x2a5793, _0x40e3ec) {
            return _0x2a5793 === _0x40e3ec;
        },
        'zJLwH': 'nkrIn',
        'OzPSZ': function(_0x3f0b91, _0x43039c) {
            return _0x3f0b91 !== _0x43039c;
        },
        'DZKNC': 'QPPvI',
        'uaqYP': 'PgBdW',
        'AOWOK': function(_0x238581, _0x47c8fa) {
            return _0x238581 < _0x47c8fa;
        },
        'GqohH': 'dPahz',
        'LtEaS': 'EnmnS',
        'tWodE': 'QeOFS',
        'Artkg': 'bPXqy',
        'gTJcA': 'ccd8067defcd4787871b7f0c96fcbf5c',
        'UFWMn': 'MiniProgram',
        'RtcAR': function(_0x429454, _0x5cead4, _0x21fb6a) {
            return _0x429454(_0x5cead4, _0x21fb6a);
        },
        'RlzUz': 'userSignIn'
    };
    return new Promise(_0x5977a6 => {
        var _0x1ded3e = {
            'wOCLU': function(_0x52f83d) {
                return _0x4b9882['MysKB'](_0x52f83d);
            },
            'ZAzyE': function(_0x38b179, _0x3f4979) {
                return _0x4b9882['AfcLI'](_0x38b179, _0x3f4979);
            },
            'NOqGp': _0x4b9882['KrUrF'],
            'xxpIE': function(_0x3db11b) {
                return _0x4b9882['eGcgt'](_0x3db11b);
            },
            'oktQU': function(_0xf1f99c) {
                return _0x4b9882['pECSo'](_0xf1f99c);
            },
            'HqzgY': function(_0x457980, _0x1a0262) {
                return _0x4b9882['yhxfd'](_0x457980, _0x1a0262);
            },
            'fstHT': _0x4b9882['gkznj'],
            'QOAjv': _0x4b9882['Loocw'],
            'BZEMa': function(_0x13ff73, _0x18364f) {
                return _0x4b9882['CCTrS'](_0x13ff73, _0x18364f);
            },
            'KfQlG': _0x4b9882['xoMCo'],
            'AqrQN': _0x4b9882['pYikS'],
            'LQGRV': _0x4b9882['Nevyh'],
            'CilxH': _0x4b9882['Ykmja'],
            'WoAVI': function(_0xf50441, _0x4b5f67) {
                return _0x4b9882['NjfNK'](_0xf50441, _0x4b5f67);
            },
            'enpja': function(_0x4fa570, _0x3483cc) {
                return _0x4b9882['VkrWa'](_0x4fa570, _0x3483cc);
            },
            'ouvCR': _0x4b9882['yUKkl'],
            'hYKyx': _0x4b9882['eSFoj'],
            'YwYyy': function(_0x345e99, _0x13a2e8) {
                return _0x4b9882['CCTrS'](_0x345e99, _0x13a2e8);
            },
            'CgMQv': function(_0x190e7d, _0x33c185) {
                return _0x4b9882['uDfOS'](_0x190e7d, _0x33c185);
            },
            'GpQgb': _0x4b9882['zJLwH'],
            'GMcTb': function(_0x5227e8, _0x3fd934) {
                return _0x4b9882['uDfOS'](_0x5227e8, _0x3fd934);
            },
            'BQQkV': function(_0x22b49d, _0x15db6e) {
                return _0x4b9882['OzPSZ'](_0x22b49d, _0x15db6e);
            },
            'jBpSh': _0x4b9882['DZKNC'],
            'nKngp': _0x4b9882['uaqYP'],
            'zBGNM': function(_0x1aad36, _0x39e85b) {
                return _0x4b9882['AOWOK'](_0x1aad36, _0x39e85b);
            },
            'smNJD': _0x4b9882['GqohH'],
            'HpvjE': function(_0x3a1e86) {
                return _0x4b9882['pECSo'](_0x3a1e86);
            },
            'apBMF': function(_0x4863a9, _0x13e8c1) {
                return _0x4b9882['uDfOS'](_0x4863a9, _0x13e8c1);
            },
            'Kpqus': _0x4b9882['LtEaS'],
            'kPuXF': _0x4b9882['tWodE'],
            'PmPYG': _0x4b9882['Artkg'],
            'YuhhR': function(_0x241374) {
                return _0x4b9882['pECSo'](_0x241374);
            }
        };
        const _0x7b5162 = {
            'activityId': _0x4b9882['gTJcA'],
            'inviterId': '',
            'channel': _0x4b9882['UFWMn']
        };
        $['get'](_0x4b9882['RtcAR'](taskUrl, _0x4b9882['RlzUz'], _0x7b5162), async (_0x76dcfd, _0x273c14, _0x586c7b) => {
            var _0x40f0ff = {
                'xuLMm': function(_0x59b79c) {
                    return _0x1ded3e['oktQU'](_0x59b79c);
                }
            };
            if (_0x1ded3e['HqzgY'](_0x1ded3e['fstHT'], _0x1ded3e['QOAjv'])) {
                try {
                    if (_0x76dcfd) {
                        if (_0x1ded3e['BZEMa'](_0x1ded3e['KfQlG'], _0x1ded3e['AqrQN'])) {
                            _0x40f0ff['xuLMm'](_0x5977a6);
                        } else {
                            console['log']('' + JSON['stringify'](_0x76dcfd));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        }
                    } else {
                        if (_0x1ded3e['HqzgY'](_0x1ded3e['LQGRV'], _0x1ded3e['CilxH'])) {
                            if (_0x1ded3e['WoAVI'](safeGet, _0x586c7b)) {
                                if (_0x1ded3e['enpja'](_0x1ded3e['ouvCR'], _0x1ded3e['hYKyx'])) {
                                    _0x586c7b = JSON['parse'](_0x586c7b);
                                    if (_0x1ded3e['YwYyy'](_0x586c7b['code'], 0x0)) {
                                        signFlag = 0x0;
                                        console['log']($['name'] + '今日签到成功');
                                        if (_0x586c7b['data']) {
                                            if (_0x1ded3e['CgMQv'](_0x1ded3e['GpQgb'], _0x1ded3e['GpQgb'])) {
                                                let {
                                                    alreadySignDays,
                                                    beanTotalNum,
                                                    todayPrize,
                                                    eachDayPrize
                                                } = _0x586c7b['data'];
                                                message += '【第' + alreadySignDays + '日签到】成功，获得' + todayPrize['beanAmount'] + '京豆 🐶\n';
                                                if (_0x1ded3e['CgMQv'](alreadySignDays, 0x7)) alreadySignDays = 0x0;
                                                message += '【明日签到】可获得' + eachDayPrize[alreadySignDays]['beanAmount'] + '京豆 🐶\n';
                                                message += '【累计获得】' + beanTotalNum + '京豆 🐶';
                                            } else {
                                                $['logErr'](e, _0x273c14);
                                            }
                                        }
                                    } else if (_0x1ded3e['GMcTb'](_0x586c7b['code'], 0x51)) {
                                        if (_0x1ded3e['BQQkV'](_0x1ded3e['jBpSh'], _0x1ded3e['nKngp'])) {
                                            console['log']('【签到】失败，今日已签到');
                                        } else {
                                            _0x1ded3e['wOCLU'](_0x5977a6);
                                        }
                                    } else if (_0x1ded3e['GMcTb'](_0x586c7b['code'], 0x6)) {
                                        $['log']($['name'] + '签到失败' + signFlag + ':' + _0x586c7b['msg']);
                                        if (_0x1ded3e['zBGNM'](signFlag, 0x3)) {
                                            if (_0x1ded3e['GMcTb'](_0x1ded3e['smNJD'], _0x1ded3e['smNJD'])) {
                                                signFlag++;
                                                await _0x1ded3e['HpvjE'](userSignIn);
                                            } else {
                                                console['log'](_0x1ded3e['ZAzyE'](_0x1ded3e['NOqGp'], _0x586c7b['message']));
                                            }
                                        }
                                    } else if (_0x1ded3e['apBMF'](_0x586c7b['code'], 0x42)) {
                                        $['log']($['name'] + '签到失败:' + _0x586c7b['msg']);
                                        message += '【签到】失败，' + _0x586c7b['msg'];
                                    } else {
                                        console['log']('异常：' + JSON['stringify'](_0x586c7b));
                                    }
                                } else {
                                    if (message) $['msg']($['name'], '', '【京东账号' + $['index'] + '】' + $['nickName'] + '\x0a' + message);
                                    _0x1ded3e['xxpIE'](_0x5977a6);
                                }
                            }
                        } else {
                            $['logErr'](e, _0x273c14);
                        }
                    }
                } catch (_0x3d9672) {
                    if (_0x1ded3e['BQQkV'](_0x1ded3e['Kpqus'], _0x1ded3e['Kpqus'])) {
                        $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x3d9672 + '!', '');
                    } else {
                        $['logErr'](_0x3d9672, _0x273c14);
                    }
                } finally {
                    if (_0x1ded3e['BQQkV'](_0x1ded3e['kPuXF'], _0x1ded3e['PmPYG'])) {
                        _0x1ded3e['YuhhR'](_0x5977a6);
                    } else {
                        $['logErr'](e, _0x273c14);
                    }
                }
            } else {
                $['logErr'](e, _0x273c14);
            }
        });
    });
}
async function vvipTask() {
    var _0x63d547 = {
        'CXFWF': function(_0x373a06) {
            return _0x373a06();
        },
        'uwyMs': function(_0x5d3c06, _0x3f173d) {
            return _0x5d3c06 === _0x3f173d;
        },
        'nMatr': 'UzPKE',
        'DrQNW': '6|2|3|5|4|7|0|1',
        'HKlmA': function(_0x2b01a9) {
            return _0x2b01a9();
        },
        'qBCNK': function(_0xb6cd07) {
            return _0xb6cd07();
        },
        'qFhzS': function(_0x45e079) {
            return _0x45e079();
        },
        'rBiCq': function(_0x1f965d) {
            return _0x1f965d();
        },
        'rHzWq': function(_0x5bda2f, _0x1a159b) {
            return _0x5bda2f !== _0x1a159b;
        },
        'yPuwS': 'AbJwh'
    };
    try {
        if (_0x63d547['uwyMs'](_0x63d547['nMatr'], _0x63d547['nMatr'])) {
            var _0x4e2e87 = _0x63d547['DrQNW']['split']('|'),
                _0x5f130d = 0x0;
            while (!![]) {
                switch (_0x4e2e87[_0x5f130d++]) {
                    case '0':
                        await $['wait'](0x3e8);
                        continue;
                    case '1':
                        await _0x63d547['HKlmA'](pg_channel_page_data);
                        continue;
                    case '2':
                        $['rewardBeanNum'] = 0x0;
                        continue;
                    case '3':
                        await _0x63d547['qBCNK'](vvipscdp_raffle_auto_send_bean);
                        continue;
                    case '4':
                        if (!$['vvipFlag']) return;
                        continue;
                    case '5':
                        await _0x63d547['qFhzS'](pg_channel_page_data);
                        continue;
                    case '6':
                        $['vvipFlag'] = ![];
                        continue;
                    case '7':
                        await _0x63d547['rBiCq'](vviptask_receive_list);
                        continue;
                }
                break;
            }
        } else {
            _0x63d547['CXFWF'](resolve);
        }
    } catch (_0x80f3f7) {
        if (_0x63d547['rHzWq'](_0x63d547['yPuwS'], _0x63d547['yPuwS'])) {
            $['log']($['name'] + '签到失败:' + data['msg']);
            message += '【签到】失败，' + data['msg'];
        } else {
            $['logErr'](_0x80f3f7);
        }
    }
}

function pg_channel_page_data() {
    var _0x24cbb7 = {
        'CfCye': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'hGfbv': function(_0x49d6db) {
            return _0x49d6db();
        },
        'YkoIC': 'success',
        'GDJGP': 'activityBeanInitAmount',
        'rGFOI': function(_0x21444c, _0x4ad768) {
            return _0x21444c(_0x4ad768);
        },
        'edZFe': function(_0x4cc61b, _0x5d0fdd) {
            return _0x4cc61b === _0x5d0fdd;
        },
        'MegkN': 'TKpeX',
        'rGTyE': 'data',
        'GsRlC': 'floorInfoList',
        'apLci': 'token',
        'vEqti': 'floorData',
        'zbXNn': 'userActivityInfo',
        'SUpYz': function(_0x1f5f17, _0x4477c4) {
            return _0x1f5f17 === _0x4477c4;
        },
        'gjMkE': 'hUZLX',
        'JoQqD': 'uNZeW',
        'msTfP': function(_0x5592c9, _0x537aa6) {
            return _0x5592c9(_0x537aa6);
        },
        'RRKIy': function(_0x320570, _0x448a5a) {
            return _0x320570 !== _0x448a5a;
        },
        'izZxl': 'BewTL',
        'EdXpN': function(_0x2a70d6, _0x1fa2e8) {
            return _0x2a70d6 < _0x1fa2e8;
        },
        'LyQBh': 'lUICM',
        'bRGph': 'LptMJ',
        'rFoyd': function(_0x3a07e7) {
            return _0x3a07e7();
        },
        'VqdyH': '3b9f3e0d-7a67-4be3-a05f-9b076cb8ed6a',
        'ermqP': function(_0x2f304e, _0x2f4f9f, _0x58a254) {
            return _0x2f304e(_0x2f4f9f, _0x58a254);
        },
        'domss': 'pg_channel_page_data'
    };
    return new Promise(_0x5af427 => {
        var _0x42f601 = {
            'KVFUj': _0x24cbb7['CfCye'],
            'yaacs': function(_0x177eae) {
                return _0x24cbb7['hGfbv'](_0x177eae);
            },
            'iiJLD': _0x24cbb7['YkoIC'],
            'ewaYU': _0x24cbb7['GDJGP'],
            'bYvDe': function(_0x53830c, _0xd330b3) {
                return _0x24cbb7['rGFOI'](_0x53830c, _0xd330b3);
            },
            'EpljK': function(_0x1df5c1, _0x399718) {
                return _0x24cbb7['edZFe'](_0x1df5c1, _0x399718);
            },
            'oDLUT': _0x24cbb7['MegkN'],
            'JRnDq': _0x24cbb7['rGTyE'],
            'HdCPo': _0x24cbb7['GsRlC'],
            'wvQDQ': _0x24cbb7['apLci'],
            'FqfFs': _0x24cbb7['vEqti'],
            'UQGkj': _0x24cbb7['zbXNn'],
            'yuNXz': function(_0x35c03f, _0xc3ba37) {
                return _0x24cbb7['SUpYz'](_0x35c03f, _0xc3ba37);
            },
            'bdqRt': _0x24cbb7['gjMkE'],
            'QcqIv': _0x24cbb7['JoQqD'],
            'dqNnq': function(_0xb68f16, _0x2e7b12) {
                return _0x24cbb7['msTfP'](_0xb68f16, _0x2e7b12);
            },
            'TWfLi': function(_0xf9ffcc, _0x176cfa) {
                return _0x24cbb7['RRKIy'](_0xf9ffcc, _0x176cfa);
            },
            'bxRUX': _0x24cbb7['izZxl'],
            'WnaCj': function(_0x40636d, _0x2c58a9) {
                return _0x24cbb7['EdXpN'](_0x40636d, _0x2c58a9);
            },
            'dlNQA': function(_0x1a681c, _0x19f6f2) {
                return _0x24cbb7['RRKIy'](_0x1a681c, _0x19f6f2);
            },
            'GMMlV': _0x24cbb7['LyQBh'],
            'qFYYQ': function(_0x1e966a, _0x18025f) {
                return _0x24cbb7['SUpYz'](_0x1e966a, _0x18025f);
            },
            'ahHnE': _0x24cbb7['bRGph'],
            'uuFdI': function(_0xba3031) {
                return _0x24cbb7['rFoyd'](_0xba3031);
            }
        };
        const _0x58bed6 = {
            'paramData': {
                'token': _0x24cbb7['VqdyH']
            }
        };
        $['get'](_0x24cbb7['ermqP'](taskUrl, _0x24cbb7['domss'], _0x58bed6), async (_0x402930, _0x596bb6, _0x3b91be) => {
            try {
                if (_0x402930) {
                    console['log']('' + JSON['stringify'](_0x402930));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {
                    if (_0x42f601['bYvDe'](safeGet, _0x3b91be)) {
                        _0x3b91be = JSON['parse'](_0x3b91be);
                        if (_0x3b91be[_0x42f601['iiJLD']]) {
                            if (_0x42f601['EpljK'](_0x42f601['oDLUT'], _0x42f601['oDLUT'])) {
                                if (_0x3b91be[_0x42f601['JRnDq']] && _0x3b91be[_0x42f601['JRnDq']][_0x42f601['HdCPo']]) {
                                    const _0x55aa61 = _0x3b91be[_0x42f601['JRnDq']][_0x42f601['HdCPo']]['filter'](_0x301aaf => !!_0x301aaf && _0x301aaf['code'] === 'SWAT_RED_PACKET_ACT_INFO')[0x0];
                                    if (_0x55aa61['hasOwnProperty'](_0x42f601['wvQDQ']) && _0x55aa61[_0x42f601['FqfFs']]['hasOwnProperty'](_0x42f601['UQGkj'])) {
                                        $['token'] = _0x55aa61[_0x42f601['wvQDQ']];
                                        const {
                                            activityExistFlag,
                                            redPacketOpenFlag,
                                            redPacketRewardTakeFlag,
                                            beanAmountTakeMinLimit,
                                            currActivityBeanAmount
                                        } = _0x55aa61[_0x42f601['FqfFs']][_0x42f601['UQGkj']];
                                        if (activityExistFlag) {
                                            if (_0x42f601['yuNXz'](_0x42f601['bdqRt'], _0x42f601['QcqIv'])) {
                                                try {
                                                    return JSON['parse'](str);
                                                } catch (_0x57f02e) {
                                                    console['log'](_0x57f02e);
                                                    $['msg']($['name'], '', _0x42f601['KVFUj']);
                                                    return [];
                                                }
                                            } else {
                                                if (!redPacketOpenFlag) {
                                                    console['log']('做任务 天天领京豆 活动未开启，现在去开启此活动\n');
                                                    await _0x42f601['dqNnq'](openRedPacket, $['token']);
                                                } else {
                                                    if (_0x42f601['TWfLi'](_0x42f601['bxRUX'], _0x42f601['bxRUX'])) {
                                                        _0x42f601['yaacs'](_0x5af427);
                                                    } else {
                                                        console['log']('做任务 天天领京豆 累计到' + beanAmountTakeMinLimit + '京豆可领取到京东账户 ' + currActivityBeanAmount + '/' + beanAmountTakeMinLimit);
                                                        if (_0x42f601['WnaCj'](currActivityBeanAmount, beanAmountTakeMinLimit)) $['vvipFlag'] = !![];
                                                        if (redPacketRewardTakeFlag) {
                                                            if (_0x42f601['dlNQA'](_0x42f601['GMMlV'], _0x42f601['GMMlV'])) {
                                                                if (_0x402930) {
                                                                    console['log']('' + JSON['stringify'](_0x402930));
                                                                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                                                                } else {}
                                                            } else {
                                                                console['log']('做任务 天天领京豆 200京豆已领取');
                                                            }
                                                        } else {
                                                            await _0x42f601['dqNnq'](pg_interact_interface_invoke, $['token']);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            console['log']('200京豆活动已下线');
                                        }
                                    }
                                }
                            } else {
                                _0x3b91be = JSON['parse'](_0x3b91be);
                                if (_0x3b91be[_0x42f601['iiJLD']]) {
                                    console['log']('活动开启成功，初始：' + (_0x3b91be['data'] && _0x3b91be['data'][_0x42f601['ewaYU']]) + '京豆');
                                    $['vvipFlag'] = !![];
                                } else {
                                    console['log'](_0x3b91be['message']);
                                }
                            }
                        } else {
                            console['log'](_0x3b91be['message']);
                        }
                    }
                }
            } catch (_0x91a96a) {
                $['logErr'](_0x91a96a, _0x596bb6);
            } finally {
                if (_0x42f601['qFYYQ'](_0x42f601['ahHnE'], _0x42f601['ahHnE'])) {
                    _0x42f601['uuFdI'](_0x5af427);
                } else {
                    console['log']('京东服务器返回空数据');
                }
            }
        });
    });
}

function vvipscdp_raffle_auto_send_bean() {
    var _0x3d5adb = {
        'gxgUd': function(_0x1418ea) {
            return _0x1418ea();
        },
        'xCYjI': 'sendBeanAmount',
        'ElQdo': 'base',
        'XgCGH': function(_0x2414c9, _0x5a2d35) {
            return _0x2414c9(_0x5a2d35);
        },
        'NXTBD': function(_0x41a939, _0x518da8) {
            return _0x41a939 === _0x518da8;
        },
        'vgEgb': 'TIrfC',
        'ZjVKn': 'success',
        'hEpjR': function(_0x453113, _0x39ad71) {
            return _0x453113 === _0x39ad71;
        },
        'lRqrg': 'OsEzo',
        'JKkNn': function(_0xa4b329, _0x2e1cad) {
            return _0xa4b329 !== _0x2e1cad;
        },
        'NSMFZ': 'CqdlU',
        'JSjCi': 'nEiUN',
        'RMcdm': function(_0x4846df, _0x16891d) {
            return _0x4846df + _0x16891d;
        },
        'nmDtF': '做任务 天天领京豆',
        'qQFkl': 'zeUCn',
        'ozlaV': 'swat_system_id',
        'bxdtD': function(_0x7ad1cc, _0x203e1c) {
            return _0x7ad1cc + _0x203e1c;
        },
        'yvjuP': function(_0x506a43, _0x2f4d52) {
            return _0x506a43 * _0x2f4d52;
        },
        'OFVLo': function(_0x432d6c, _0x31eac8) {
            return _0x432d6c * _0x31eac8;
        },
        'alIPN': function(_0x13fd47, _0x49068e) {
            return _0x13fd47 * _0x49068e;
        },
        'cFcpA': function(_0x2820ed, _0x1d6114) {
            return _0x2820ed * _0x1d6114;
        },
        'GJZpK': function(_0x52a7a0, _0x1ece91) {
            return _0x52a7a0 * _0x1ece91;
        },
        'Ktthd': '*/*',
        'QTpYG': 'gzip, deflate, br',
        'TOLkP': 'zh-cn',
        'QYtyg': 'keep-alive',
        'fMTWq': 'application/x-www-form-urlencoded',
        'qoNco': 'api.m.jd.com',
        'OKkAq': 'https://lottery.m.jd.com/',
        'UFMwx': function(_0x50ac76, _0x417b3c) {
            return _0x50ac76(_0x417b3c);
        },
        'UFKre': './USER_AGENTS',
        'cAAST': 'JDUA',
        'YsXFo': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0x4576d3 = {
        'channelCode': _0x3d5adb['ozlaV']
    };
    const _0x41265b = {
        'url': JD_API_HOST + 'api?functionId=vvipscdp_raffle_auto_send_bean&body=' + _0x3d5adb['XgCGH'](escape, JSON['stringify'](_0x4576d3)) + '&appid=lottery_drew&t=' + _0x3d5adb['bxdtD'](_0x3d5adb['bxdtD'](new Date()['getTime'](), _0x3d5adb['yvjuP'](_0x3d5adb['OFVLo'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x3d5adb['alIPN'](_0x3d5adb['cFcpA'](_0x3d5adb['GJZpK'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x3d5adb['Ktthd'],
            'Accept-Encoding': _0x3d5adb['QTpYG'],
            'Accept-Language': _0x3d5adb['TOLkP'],
            'Connection': _0x3d5adb['QYtyg'],
            'Content-Type': _0x3d5adb['fMTWq'],
            'Host': _0x3d5adb['qoNco'],
            'Referer': _0x3d5adb['OKkAq'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x3d5adb['UFMwx'](require, _0x3d5adb['UFKre'])['USER_AGENT'] : $['getdata'](_0x3d5adb['cAAST']) ? $['getdata'](_0x3d5adb['cAAST']) : _0x3d5adb['YsXFo']
        }
    };
    return new Promise(_0x10a7b6 => {
        $['post'](_0x41265b, async (_0x1390ad, _0x374e29, _0x886782) => {
            var _0x52b8cb = {
                'zHjPh': function(_0x2ab094) {
                    return _0x3d5adb['gxgUd'](_0x2ab094);
                },
                'nykez': _0x3d5adb['xCYjI'],
                'msNWV': _0x3d5adb['ElQdo']
            };
            try {
                if (_0x1390ad) {
                    console['log']('' + JSON['stringify'](_0x1390ad));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {
                    if (_0x3d5adb['XgCGH'](safeGet, _0x886782)) {
                        if (_0x3d5adb['NXTBD'](_0x3d5adb['vgEgb'], _0x3d5adb['vgEgb'])) {
                            _0x886782 = JSON['parse'](_0x886782);
                            if (_0x886782[_0x3d5adb['ZjVKn']]) {
                                if (_0x886782['data'] && _0x886782['data'][_0x3d5adb['xCYjI']]) {
                                    if (_0x3d5adb['hEpjR'](_0x3d5adb['lRqrg'], _0x3d5adb['lRqrg'])) {
                                        console['log']('获得' + _0x886782['data'][_0x3d5adb['xCYjI']] + '京豆');
                                        $['rewardBeanNum'] += _0x886782['data'][_0x3d5adb['xCYjI']];
                                    } else {
                                        _0x52b8cb['zHjPh'](_0x10a7b6);
                                    }
                                }
                            } else {
                                if (_0x3d5adb['JKkNn'](_0x3d5adb['NSMFZ'], _0x3d5adb['JSjCi'])) {
                                    console['log'](_0x3d5adb['RMcdm'](_0x3d5adb['nmDtF'], _0x886782['message']));
                                } else {
                                    $['logErr'](e);
                                }
                            }
                        } else {
                            console['log']('获得' + _0x886782['data'][_0x52b8cb['nykez']] + '京豆');
                            $['rewardBeanNum'] += _0x886782['data'][_0x52b8cb['nykez']];
                        }
                    }
                }
            } catch (_0x214afb) {
                $['logErr'](_0x214afb, _0x374e29);
            } finally {
                if (_0x3d5adb['JKkNn'](_0x3d5adb['qQFkl'], _0x3d5adb['qQFkl'])) {
                    $['nickName'] = _0x886782[_0x52b8cb['msNWV']] && _0x886782[_0x52b8cb['msNWV']]['nickname'] || $['UserName'];
                } else {
                    _0x3d5adb['gxgUd'](_0x10a7b6);
                }
            }
        });
    });
}

function vviptask_receive_list() {
    var _0x29a878 = {
        'qqcgD': 'success',
        'mJmZg': 'data',
        'fxqNc': 'rewardBeanAmount',
        'LBPaZ': function(_0x814422) {
            return _0x814422();
        },
        'YopQg': function(_0x474635) {
            return _0x474635();
        },
        'TMKKE': 'sendBeanAmount',
        'gjhoB': function(_0x399cf2, _0x3de327) {
            return _0x399cf2 !== _0x3de327;
        },
        'JmYBs': 'RoJvP',
        'GNdXc': 'XTTpw',
        'rducU': function(_0x532079, _0x8ce137) {
            return _0x532079 === _0x8ce137;
        },
        'aOKtR': 'jVEZr',
        'jvmlq': function(_0x2f09af, _0x3c14b5) {
            return _0x2f09af === _0x3c14b5;
        },
        'FOwoL': 'BfIxI',
        'QYase': 'SvnVP',
        'aKHbs': function(_0x85be41, _0x25e09c) {
            return _0x85be41(_0x25e09c);
        },
        'MCZxe': function(_0x2bd733, _0x16de33) {
            return _0x2bd733 === _0x16de33;
        },
        'VqxFP': 'NepNp',
        'WRkwF': function(_0x2415a2, _0x47d091) {
            return _0x2415a2 !== _0x47d091;
        },
        'tVGuC': 'pLYUg',
        'ucUcz': 'eVfmM',
        'ZYwLc': '1|0|3|2|4|5|6',
        'uVviU': function(_0x28001f, _0x3a216f) {
            return _0x28001f(_0x3a216f);
        },
        'sBWpf': 'title',
        'OEtPG': function(_0x4f5605, _0x4b9921) {
            return _0x4f5605(_0x4b9921);
        },
        'bcufD': function(_0x1d3d62, _0x47e6c2) {
            return _0x1d3d62 === _0x47e6c2;
        },
        'ikOEC': 'eKcYI',
        'Olkzu': 'zoLwN',
        'LRsod': 'SWAT_RED_PACKET',
        'qRrVC': function(_0x33e385, _0x5ed868) {
            return _0x33e385 + _0x5ed868;
        },
        'hqkIR': function(_0x505115, _0x234300) {
            return _0x505115 + _0x234300;
        },
        'rHXWT': function(_0x445732, _0xe3b635) {
            return _0x445732 * _0xe3b635;
        },
        'XINUu': function(_0x523f9c, _0x36ca59) {
            return _0x523f9c * _0x36ca59;
        },
        'PmEPE': '*/*',
        'uSPNB': 'gzip, deflate, br',
        'GWuuV': 'zh-cn',
        'YUBil': 'keep-alive',
        'zYsRZ': 'application/x-www-form-urlencoded',
        'nyTnz': 'api.m.jd.com',
        'Hmibj': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'Fxlmi': './USER_AGENTS',
        'QBaBT': 'JDUA',
        'yToPb': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    $['taskData'] = [];
    const _0x1c4914 = {
        'channel': _0x29a878['LRsod'],
        'systemId': '19',
        'withAutoAward': 0x1
    };
    const _0x382375 = {
        'url': JD_API_HOST + '?functionId=vviptask_receive_list&body=' + _0x29a878['OEtPG'](escape, JSON['stringify'](_0x1c4914)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x29a878['qRrVC'](_0x29a878['hqkIR'](new Date()['getTime'](), _0x29a878['rHXWT'](_0x29a878['XINUu'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x29a878['XINUu'](_0x29a878['XINUu'](_0x29a878['XINUu'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x29a878['PmEPE'],
            'Accept-Encoding': _0x29a878['uSPNB'],
            'Accept-Language': _0x29a878['GWuuV'],
            'Connection': _0x29a878['YUBil'],
            'Content-Type': _0x29a878['zYsRZ'],
            'Host': _0x29a878['nyTnz'],
            'Referer': _0x29a878['Hmibj'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x29a878['OEtPG'](require, _0x29a878['Fxlmi'])['USER_AGENT'] : $['getdata'](_0x29a878['QBaBT']) ? $['getdata'](_0x29a878['QBaBT']) : _0x29a878['yToPb']
        }
    };
    return new Promise(_0x5b46ce => {
        var _0x1e65c8 = {
            'oiOgy': function(_0x3b8496) {
                return _0x29a878['LBPaZ'](_0x3b8496);
            },
            'vLcLK': function(_0x48d0d6) {
                return _0x29a878['YopQg'](_0x48d0d6);
            },
            'YBKxD': _0x29a878['TMKKE'],
            'lJmpp': function(_0x344841, _0x2c912) {
                return _0x29a878['gjhoB'](_0x344841, _0x2c912);
            },
            'olASt': _0x29a878['JmYBs'],
            'lyeEb': _0x29a878['GNdXc'],
            'sjYVo': function(_0x5d3a0c, _0xd9bd65) {
                return _0x29a878['rducU'](_0x5d3a0c, _0xd9bd65);
            },
            'IYfuO': _0x29a878['aOKtR'],
            'KGWmV': function(_0x474138, _0x192de2) {
                return _0x29a878['jvmlq'](_0x474138, _0x192de2);
            },
            'GistO': _0x29a878['FOwoL'],
            'aOpYC': _0x29a878['QYase'],
            'oyyRc': function(_0x239356, _0x4fc447) {
                return _0x29a878['aKHbs'](_0x239356, _0x4fc447);
            },
            'DiAWw': function(_0x14198b, _0xbcb458) {
                return _0x29a878['MCZxe'](_0x14198b, _0xbcb458);
            },
            'esLtP': _0x29a878['VqxFP'],
            'svgNK': _0x29a878['qqcgD'],
            'ohVit': _0x29a878['mJmZg'],
            'Qoxrs': function(_0x4420b4, _0x19ee55) {
                return _0x29a878['WRkwF'](_0x4420b4, _0x19ee55);
            },
            'VUsxE': _0x29a878['tVGuC'],
            'TxFZA': _0x29a878['ucUcz'],
            'LyyOJ': _0x29a878['ZYwLc'],
            'TnwWk': function(_0x15c054, _0x583602) {
                return _0x29a878['uVviU'](_0x15c054, _0x583602);
            },
            'CksKZ': _0x29a878['sBWpf'],
            'idXSs': function(_0x397982, _0x5c8506) {
                return _0x29a878['OEtPG'](_0x397982, _0x5c8506);
            },
            'BxYUb': function(_0x21918d) {
                return _0x29a878['YopQg'](_0x21918d);
            }
        };
        if (_0x29a878['bcufD'](_0x29a878['ikOEC'], _0x29a878['Olkzu'])) {
            data = JSON['parse'](data);
            if (data[_0x29a878['qqcgD']]) {
                console['log'](data[_0x29a878['mJmZg']][_0x29a878['fxqNc']] + '京豆领取成功');
                $['rewardBeanNum'] += data[_0x29a878['mJmZg']][_0x29a878['fxqNc']];
                message += (message ? '\x0a' : '') + '【做任务 天天领京豆】' + $['rewardBeanNum'] + '京豆';
            } else {
                console['log'](data['message']);
            }
        } else {
            $['post'](_0x382375, async (_0x42ea07, _0x7f916, _0x24b6ff) => {
                try {
                    if (_0x1e65c8['lJmpp'](_0x1e65c8['olASt'], _0x1e65c8['lyeEb'])) {
                        if (_0x42ea07) {
                            if (_0x1e65c8['sjYVo'](_0x1e65c8['IYfuO'], _0x1e65c8['IYfuO'])) {
                                console['log']('' + JSON['stringify'](_0x42ea07));
                                console['log']($['name'] + ' API请求失败，请检查网路重试');
                            } else {
                                _0x1e65c8['oiOgy'](_0x5b46ce);
                            }
                        } else {
                            if (_0x1e65c8['KGWmV'](_0x1e65c8['GistO'], _0x1e65c8['aOpYC'])) {
                                _0x1e65c8['vLcLK'](_0x5b46ce);
                            } else {
                                if (_0x1e65c8['oyyRc'](safeGet, _0x24b6ff)) {
                                    if (_0x1e65c8['DiAWw'](_0x1e65c8['esLtP'], _0x1e65c8['esLtP'])) {
                                        _0x24b6ff = JSON['parse'](_0x24b6ff);
                                        if (_0x24b6ff[_0x1e65c8['svgNK']]) {
                                            $['taskData'] = _0x24b6ff[_0x1e65c8['ohVit']]['filter'](_0x2007e3 => !!_0x2007e3 && _0x2007e3['taskDataStatus'] !== 0x3);
                                            for (let _0x587997 of $['taskData']) {
                                                if (_0x1e65c8['Qoxrs'](_0x1e65c8['VUsxE'], _0x1e65c8['TxFZA'])) {
                                                    var _0x5ae41c = _0x1e65c8['LyyOJ']['split']('|'),
                                                        _0x5cbca9 = 0x0;
                                                    while (!![]) {
                                                        switch (_0x5ae41c[_0x5cbca9++]) {
                                                            case '0':
                                                                await _0x1e65c8['TnwWk'](vviptask_receive_getone, _0x587997['id']);
                                                                continue;
                                                            case '1':
                                                                console['log']('\n领取 ' + _0x587997[_0x1e65c8['CksKZ']] + ' 任务');
                                                                continue;
                                                            case '2':
                                                                console['log']('去完成 ' + _0x587997[_0x1e65c8['CksKZ']] + ' 任务');
                                                                continue;
                                                            case '3':
                                                                await $['wait'](0x3e8);
                                                                continue;
                                                            case '4':
                                                                await _0x1e65c8['TnwWk'](vviptask_reach_task, _0x587997['id']);
                                                                continue;
                                                            case '5':
                                                                console['log']('领取 ' + _0x587997[_0x1e65c8['CksKZ']] + ' 任务奖励\n');
                                                                continue;
                                                            case '6':
                                                                await _0x1e65c8['idXSs'](vviptask_reward_receive, _0x587997['id']);
                                                                continue;
                                                        }
                                                        break;
                                                    }
                                                } else {
                                                    if (_0x24b6ff['data'] && _0x24b6ff['data'][_0x1e65c8['YBKxD']]) {
                                                        console['log']('获得' + _0x24b6ff['data'][_0x1e65c8['YBKxD']] + '京豆');
                                                        $['rewardBeanNum'] += _0x24b6ff['data'][_0x1e65c8['YBKxD']];
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        console['log']('【签到】失败，今日已签到');
                                    }
                                }
                            }
                        }
                    } else {
                        console['log'](_0x24b6ff['message']);
                    }
                } catch (_0x58081a) {
                    $['logErr'](_0x58081a, _0x7f916);
                } finally {
                    _0x1e65c8['BxYUb'](_0x5b46ce);
                }
            });
        }
    });
}

function vviptask_receive_getone(_0x84f5a0) {
    var _0x2500a0 = {
        'Skdln': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'EwmSo': function(_0x3ea4e2, _0xca8027) {
            return _0x3ea4e2 === _0xca8027;
        },
        'HdWMf': 'QRDCk',
        'NZHuY': 'jQiCn',
        'fQJWh': function(_0x59ae84, _0x2f17cc) {
            return _0x59ae84 === _0x2f17cc;
        },
        'PyXzX': 'PeZjF',
        'UaRxR': 'SgMqh',
        'ZrLKj': function(_0x568768) {
            return _0x568768();
        },
        'AjbMs': 'SWAT_RED_PACKET',
        'upEQL': function(_0x18fe70, _0x598bf2) {
            return _0x18fe70(_0x598bf2);
        },
        'QMlKd': function(_0xb360cc, _0x3602a6) {
            return _0xb360cc + _0x3602a6;
        },
        'eiQHJ': function(_0x14f725, _0x5deca7) {
            return _0x14f725 + _0x5deca7;
        },
        'gFdwP': function(_0x1c6985, _0x21b6bc) {
            return _0x1c6985 * _0x21b6bc;
        },
        'YQZib': function(_0x1f1733, _0x34ef2f) {
            return _0x1f1733 * _0x34ef2f;
        },
        'JlnZx': '*/*',
        'SEoyK': 'gzip, deflate, br',
        'AVqdQ': 'zh-cn',
        'hqKaW': 'keep-alive',
        'tvrcG': 'application/x-www-form-urlencoded',
        'kKWHe': 'api.m.jd.com',
        'zafWP': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'oYIQi': function(_0x35be04, _0x46ad00) {
            return _0x35be04(_0x46ad00);
        },
        'UoJGu': './USER_AGENTS',
        'mkQNF': 'JDUA',
        'kOKBf': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0xf087a0 = {
        'channel': _0x2500a0['AjbMs'],
        'systemId': '19',
        'ids': _0x84f5a0
    };
    const _0x400547 = {
        'url': JD_API_HOST + '?functionId=vviptask_receive_getone&body=' + _0x2500a0['upEQL'](escape, JSON['stringify'](_0xf087a0)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x2500a0['QMlKd'](_0x2500a0['eiQHJ'](new Date()['getTime'](), _0x2500a0['gFdwP'](_0x2500a0['gFdwP'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x2500a0['gFdwP'](_0x2500a0['YQZib'](_0x2500a0['YQZib'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x2500a0['JlnZx'],
            'Accept-Encoding': _0x2500a0['SEoyK'],
            'Accept-Language': _0x2500a0['AVqdQ'],
            'Connection': _0x2500a0['hqKaW'],
            'Content-Type': _0x2500a0['tvrcG'],
            'Host': _0x2500a0['kKWHe'],
            'Referer': _0x2500a0['zafWP'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x2500a0['oYIQi'](require, _0x2500a0['UoJGu'])['USER_AGENT'] : $['getdata'](_0x2500a0['mkQNF']) ? $['getdata'](_0x2500a0['mkQNF']) : _0x2500a0['kOKBf']
        }
    };
    return new Promise(_0x4d4fa5 => {
        $['post'](_0x400547, async (_0x40ec87, _0x5de4c7, _0x589735) => {
            var _0x2b4cef = {
                'QdHkq': _0x2500a0['Skdln']
            };
            if (_0x2500a0['EwmSo'](_0x2500a0['HdWMf'], _0x2500a0['HdWMf'])) {
                try {
                    if (_0x40ec87) {
                        if (_0x2500a0['EwmSo'](_0x2500a0['NZHuY'], _0x2500a0['NZHuY'])) {
                            console['log']('' + JSON['stringify'](_0x40ec87));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            $['logErr'](e, _0x5de4c7);
                        }
                    } else {}
                } catch (_0x2a3689) {
                    $['logErr'](_0x2a3689, _0x5de4c7);
                } finally {
                    if (_0x2500a0['fQJWh'](_0x2500a0['PyXzX'], _0x2500a0['UaRxR'])) {
                        $['logErr'](e, _0x5de4c7);
                    } else {
                        _0x2500a0['ZrLKj'](_0x4d4fa5);
                    }
                }
            } else {
                console['log'](e);
                $['msg']($['name'], '', _0x2b4cef['QdHkq']);
                return [];
            }
        });
    });
}

function vviptask_reach_task(_0x599345) {
    var _0x4ed305 = {
        'BuEgQ': function(_0x1de645, _0x5267a5) {
            return _0x1de645 === _0x5267a5;
        },
        'mjDXN': 'lWoJk',
        'hAIoN': function(_0x3bb933, _0x6cd514) {
            return _0x3bb933 !== _0x6cd514;
        },
        'Xcfwc': 'hrKJS',
        'NPHjF': 'qIgEN',
        'JfTxh': function(_0x4003b4) {
            return _0x4003b4();
        },
        'pXdsg': 'SWAT_RED_PACKET',
        'mCZGr': function(_0x157e86, _0x7ca47f) {
            return _0x157e86(_0x7ca47f);
        },
        'zQKgd': function(_0x6b9522, _0x290ae5) {
            return _0x6b9522 + _0x290ae5;
        },
        'JWvBb': function(_0x1efd49, _0x120ab3) {
            return _0x1efd49 * _0x120ab3;
        },
        'Fxhui': function(_0x193228, _0x1dd33e) {
            return _0x193228 * _0x1dd33e;
        },
        'JHaWc': function(_0x4708fc, _0x225449) {
            return _0x4708fc * _0x225449;
        },
        'zTbbe': '*/*',
        'QvVFG': 'gzip, deflate, br',
        'oshet': 'zh-cn',
        'uZWeS': 'keep-alive',
        'jluNx': 'application/x-www-form-urlencoded',
        'pFckE': 'api.m.jd.com',
        'HzHOj': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'phjZA': './USER_AGENTS',
        'FXaOD': 'JDUA',
        'pJSCY': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0x6aa9f = {
        'channel': _0x4ed305['pXdsg'],
        'systemId': '19',
        'taskIdEncrypted': _0x599345
    };
    const _0x25f59c = {
        'url': JD_API_HOST + '?functionId=vviptask_reach_task&body=' + _0x4ed305['mCZGr'](escape, JSON['stringify'](_0x6aa9f)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x4ed305['zQKgd'](_0x4ed305['zQKgd'](new Date()['getTime'](), _0x4ed305['JWvBb'](_0x4ed305['JWvBb'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x4ed305['Fxhui'](_0x4ed305['JHaWc'](_0x4ed305['JHaWc'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x4ed305['zTbbe'],
            'Accept-Encoding': _0x4ed305['QvVFG'],
            'Accept-Language': _0x4ed305['oshet'],
            'Connection': _0x4ed305['uZWeS'],
            'Content-Type': _0x4ed305['jluNx'],
            'Host': _0x4ed305['pFckE'],
            'Referer': _0x4ed305['HzHOj'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x4ed305['mCZGr'](require, _0x4ed305['phjZA'])['USER_AGENT'] : $['getdata'](_0x4ed305['FXaOD']) ? $['getdata'](_0x4ed305['FXaOD']) : _0x4ed305['pJSCY']
        }
    };
    return new Promise(_0x2605a1 => {
        var _0x575289 = {
            'paLHb': function(_0x4bb625, _0x315ec8) {
                return _0x4ed305['BuEgQ'](_0x4bb625, _0x315ec8);
            },
            'bwFtK': _0x4ed305['mjDXN'],
            'rAryn': function(_0x3631b1, _0x1d67f2) {
                return _0x4ed305['hAIoN'](_0x3631b1, _0x1d67f2);
            },
            'ovflX': _0x4ed305['Xcfwc'],
            'KkPkX': _0x4ed305['NPHjF'],
            'mTjvb': function(_0x5956e6) {
                return _0x4ed305['JfTxh'](_0x5956e6);
            }
        };
        $['post'](_0x25f59c, (_0x4e08cb, _0x5e0687, _0x5e212f) => {
            try {
                if (_0x575289['paLHb'](_0x575289['bwFtK'], _0x575289['bwFtK'])) {
                    if (_0x4e08cb) {
                        console['log']('' + JSON['stringify'](_0x4e08cb));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {}
                } else {
                    console['log']('' + JSON['stringify'](_0x4e08cb));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                }
            } catch (_0x4f7e3e) {
                if (_0x575289['rAryn'](_0x575289['ovflX'], _0x575289['KkPkX'])) {
                    $['logErr'](_0x4f7e3e, _0x5e0687);
                } else {
                    $['logErr'](_0x4f7e3e, _0x5e0687);
                }
            } finally {
                _0x575289['mTjvb'](_0x2605a1);
            }
        });
    });
}

function vviptask_reward_receive(_0x359f65) {
    var _0x480ae3 = {
        'KQQtW': function(_0x38d902, _0x410ac2) {
            return _0x38d902 !== _0x410ac2;
        },
        'BkNYd': 'pLdTm',
        'qXxLj': function(_0x120daa) {
            return _0x120daa();
        },
        'DTYUZ': 'SWAT_RED_PACKET',
        'rlldh': function(_0xf917f3, _0x301017) {
            return _0xf917f3(_0x301017);
        },
        'Uunit': function(_0x49bbba, _0x3043b4) {
            return _0x49bbba + _0x3043b4;
        },
        'FZRFX': function(_0x52d039, _0x2e9f17) {
            return _0x52d039 + _0x2e9f17;
        },
        'WhhWN': function(_0x1725b2, _0x44d1e1) {
            return _0x1725b2 * _0x44d1e1;
        },
        'OWQch': function(_0xe01c6e, _0x494f3a) {
            return _0xe01c6e * _0x494f3a;
        },
        'gPcfM': function(_0x1a3a24, _0x2ff55a) {
            return _0x1a3a24 * _0x2ff55a;
        },
        'UNszI': '*/*',
        'ScTRs': 'gzip, deflate, br',
        'JWXdl': 'zh-cn',
        'XkcxB': 'keep-alive',
        'HFZpo': 'application/x-www-form-urlencoded',
        'gsytv': 'api.m.jd.com',
        'dPYMa': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'qwyms': './USER_AGENTS',
        'KCwHK': 'JDUA',
        'bhviN': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0x1eec4b = {
        'channel': _0x480ae3['DTYUZ'],
        'systemId': '19',
        'idEncKey': _0x359f65
    };
    const _0x1b25d9 = {
        'url': JD_API_HOST + '?functionId=vviptask_reward_receive&body=' + _0x480ae3['rlldh'](escape, JSON['stringify'](_0x1eec4b)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x480ae3['Uunit'](_0x480ae3['FZRFX'](new Date()['getTime'](), _0x480ae3['WhhWN'](_0x480ae3['OWQch'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x480ae3['OWQch'](_0x480ae3['OWQch'](_0x480ae3['gPcfM'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x480ae3['UNszI'],
            'Accept-Encoding': _0x480ae3['ScTRs'],
            'Accept-Language': _0x480ae3['JWXdl'],
            'Connection': _0x480ae3['XkcxB'],
            'Content-Type': _0x480ae3['HFZpo'],
            'Host': _0x480ae3['gsytv'],
            'Referer': _0x480ae3['dPYMa'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x480ae3['rlldh'](require, _0x480ae3['qwyms'])['USER_AGENT'] : $['getdata'](_0x480ae3['KCwHK']) ? $['getdata'](_0x480ae3['KCwHK']) : _0x480ae3['bhviN']
        }
    };
    return new Promise(_0xc1f783 => {
        $['post'](_0x1b25d9, (_0x5614b2, _0x2fb91e, _0x4d5fe1) => {
            try {
                if (_0x5614b2) {
                    console['log']('' + JSON['stringify'](_0x5614b2));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {}
            } catch (_0x298ec7) {
                $['logErr'](_0x298ec7, _0x2fb91e);
            } finally {
                if (_0x480ae3['KQQtW'](_0x480ae3['BkNYd'], _0x480ae3['BkNYd'])) {
                    $['nickName'] = $['UserName'];
                } else {
                    _0x480ae3['qXxLj'](_0xc1f783);
                }
            }
        });
    });
}

function pg_interact_interface_invoke(_0x218102) {
    var _0x55afd7 = {
        'XSlTa': function(_0x220294, _0x31402a) {
            return _0x220294 == _0x31402a;
        },
        'VRUWw': 'string',
        'wGtQa': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie',
        'NKPpi': 'success',
        'nqDuv': 'sendBeanAmount',
        'WoZsA': function(_0x5869c7, _0x56a4a9) {
            return _0x5869c7 + _0x56a4a9;
        },
        'LWVHA': '做任务 天天领京豆',
        'dybzf': function(_0x155a94, _0x14c1ff) {
            return _0x155a94 !== _0x14c1ff;
        },
        'rXLFg': 'qbNHH',
        'qdsYY': 'UYOQT',
        'cgUZg': function(_0x5733ff, _0x3c22bb) {
            return _0x5733ff !== _0x3c22bb;
        },
        'DCEKH': 'CIrxz',
        'XXMHg': 'eiIIt',
        'jdeqS': function(_0x1b081f, _0x809d52) {
            return _0x1b081f(_0x809d52);
        },
        'GkFRQ': 'data',
        'PIFHp': 'rewardBeanAmount',
        'PNuPX': function(_0x23cd78, _0x9a7334) {
            return _0x23cd78 === _0x9a7334;
        },
        'dggUq': 'KvkfY',
        'RWFZZ': 'NNRnH',
        'cKvQV': function(_0x5a043d) {
            return _0x5a043d();
        },
        'dPQLN': 'takeReward',
        'HaSvI': function(_0x7b1191, _0x29bcae) {
            return _0x7b1191(_0x29bcae);
        },
        'RFtPt': function(_0xea1a54, _0x1b78c5) {
            return _0xea1a54 * _0x1b78c5;
        },
        'ezZvj': function(_0x5c3635, _0x446abc) {
            return _0x5c3635 * _0x446abc;
        },
        'poEsE': '*/*',
        'gtEHF': 'gzip, deflate, br',
        'xEahW': 'zh-cn',
        'Ehlvn': 'keep-alive',
        'KowUy': 'application/x-www-form-urlencoded',
        'QcVTJ': 'api.m.jd.com',
        'kmthO': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'ndjPB': function(_0x359a45, _0x3942d1) {
            return _0x359a45(_0x3942d1);
        },
        'hCcAN': './USER_AGENTS',
        'YkdUi': 'JDUA',
        'LAmHv': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0x44e0dc = {
        'floorToken': _0x218102,
        'dataSourceCode': _0x55afd7['dPQLN'],
        'argMap': {}
    };
    const _0x3a438b = {
        'url': JD_API_HOST + '?functionId=pg_interact_interface_invoke&body=' + _0x55afd7['HaSvI'](escape, JSON['stringify'](_0x44e0dc)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x55afd7['WoZsA'](_0x55afd7['WoZsA'](new Date()['getTime'](), _0x55afd7['RFtPt'](_0x55afd7['RFtPt'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x55afd7['ezZvj'](_0x55afd7['ezZvj'](_0x55afd7['ezZvj'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x55afd7['poEsE'],
            'Accept-Encoding': _0x55afd7['gtEHF'],
            'Accept-Language': _0x55afd7['xEahW'],
            'Connection': _0x55afd7['Ehlvn'],
            'Content-Type': _0x55afd7['KowUy'],
            'Host': _0x55afd7['QcVTJ'],
            'Referer': _0x55afd7['kmthO'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x55afd7['ndjPB'](require, _0x55afd7['hCcAN'])['USER_AGENT'] : $['getdata'](_0x55afd7['YkdUi']) ? $['getdata'](_0x55afd7['YkdUi']) : _0x55afd7['LAmHv']
        }
    };
    return new Promise(_0x13da6d => {
        var _0x380f9f = {
            'Jwsqi': function(_0x2ed0e2, _0x5c13b5) {
                return _0x55afd7['XSlTa'](_0x2ed0e2, _0x5c13b5);
            },
            'maVQq': _0x55afd7['VRUWw'],
            'dQRfY': _0x55afd7['wGtQa'],
            'TigPA': _0x55afd7['NKPpi'],
            'HBBww': _0x55afd7['nqDuv'],
            'KIrtg': function(_0x27aa28, _0xf53a0e) {
                return _0x55afd7['WoZsA'](_0x27aa28, _0xf53a0e);
            },
            'lrTBa': _0x55afd7['LWVHA'],
            'JzsxD': function(_0x4f8aac, _0x234766) {
                return _0x55afd7['dybzf'](_0x4f8aac, _0x234766);
            },
            'ptXMk': _0x55afd7['rXLFg'],
            'vxroj': _0x55afd7['qdsYY'],
            'RelDv': function(_0x510691, _0x3d6dfa) {
                return _0x55afd7['cgUZg'](_0x510691, _0x3d6dfa);
            },
            'HSmGK': _0x55afd7['DCEKH'],
            'EJYss': _0x55afd7['XXMHg'],
            'DAHaS': function(_0x24b108, _0x2fc0af) {
                return _0x55afd7['jdeqS'](_0x24b108, _0x2fc0af);
            },
            'qtSkJ': _0x55afd7['GkFRQ'],
            'DlQOL': _0x55afd7['PIFHp'],
            'mAsxe': function(_0x9bfe5b, _0x4b4519) {
                return _0x55afd7['PNuPX'](_0x9bfe5b, _0x4b4519);
            },
            'ttqaJ': _0x55afd7['dggUq'],
            'hxdtR': _0x55afd7['RWFZZ'],
            'bKtMW': function(_0x4ef4cb) {
                return _0x55afd7['cKvQV'](_0x4ef4cb);
            }
        };
        $['post'](_0x3a438b, (_0x4f97b5, _0x5ea57f, _0x1b0145) => {
            var _0x17d1cd = {
                'lLUGa': function(_0x33c009, _0x1df0d9) {
                    return _0x380f9f['Jwsqi'](_0x33c009, _0x1df0d9);
                },
                'JnLBB': _0x380f9f['maVQq'],
                'MQjWz': _0x380f9f['dQRfY'],
                'DxwdQ': _0x380f9f['TigPA'],
                'XtNaG': _0x380f9f['HBBww'],
                'dbgwP': function(_0x299a1e, _0x33f269) {
                    return _0x380f9f['KIrtg'](_0x299a1e, _0x33f269);
                },
                'uwGQG': _0x380f9f['lrTBa']
            };
            if (_0x380f9f['JzsxD'](_0x380f9f['ptXMk'], _0x380f9f['vxroj'])) {
                try {
                    if (_0x4f97b5) {
                        console['log']('' + JSON['stringify'](_0x4f97b5));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        if (_0x380f9f['RelDv'](_0x380f9f['HSmGK'], _0x380f9f['EJYss'])) {
                            if (_0x380f9f['DAHaS'](safeGet, _0x1b0145)) {
                                _0x1b0145 = JSON['parse'](_0x1b0145);
                                if (_0x1b0145[_0x380f9f['TigPA']]) {
                                    console['log'](_0x1b0145[_0x380f9f['qtSkJ']][_0x380f9f['DlQOL']] + '京豆领取成功');
                                    $['rewardBeanNum'] += _0x1b0145[_0x380f9f['qtSkJ']][_0x380f9f['DlQOL']];
                                    message += (message ? '\x0a' : '') + '【做任务 天天领京豆】' + $['rewardBeanNum'] + '京豆';
                                } else {
                                    if (_0x380f9f['mAsxe'](_0x380f9f['ttqaJ'], _0x380f9f['hxdtR'])) {
                                        if (_0x17d1cd['lLUGa'](typeof str, _0x17d1cd['JnLBB'])) {
                                            try {
                                                return JSON['parse'](str);
                                            } catch (_0xe29da7) {
                                                console['log'](_0xe29da7);
                                                $['msg']($['name'], '', _0x17d1cd['MQjWz']);
                                                return [];
                                            }
                                        }
                                    } else {
                                        console['log'](_0x1b0145['message']);
                                    }
                                }
                            }
                        } else {
                            $['logErr'](e, _0x5ea57f);
                        }
                    }
                } catch (_0x292466) {
                    $['logErr'](_0x292466, _0x5ea57f);
                } finally {
                    _0x380f9f['bKtMW'](_0x13da6d);
                }
            } else {
                _0x1b0145 = JSON['parse'](_0x1b0145);
                if (_0x1b0145[_0x17d1cd['DxwdQ']]) {
                    if (_0x1b0145['data'] && _0x1b0145['data'][_0x17d1cd['XtNaG']]) {
                        console['log']('获得' + _0x1b0145['data'][_0x17d1cd['XtNaG']] + '京豆');
                        $['rewardBeanNum'] += _0x1b0145['data'][_0x17d1cd['XtNaG']];
                    }
                } else {
                    console['log'](_0x17d1cd['dbgwP'](_0x17d1cd['uwGQG'], _0x1b0145['message']));
                }
            }
        });
    });
}

function openRedPacket(_0x3d47a2) {
    var _0x56f614 = {
        'cbJyE': 'data',
        'STbJA': 'rewardBeanAmount',
        'aoMdw': function(_0x479b1a, _0x545eb5) {
            return _0x479b1a !== _0x545eb5;
        },
        'jkcLQ': 'eRUfg',
        'fdzHk': 'yCBhc',
        'PuGxi': function(_0x274244, _0x3cb378) {
            return _0x274244 === _0x3cb378;
        },
        'lkdBH': 'bidyV',
        'BaeuA': 'kyGoH',
        'uStVk': function(_0x54954f, _0x1397a3) {
            return _0x54954f(_0x1397a3);
        },
        'hlRQU': 'success',
        'tOQqo': 'BIggz',
        'eHxGn': 'activityBeanInitAmount',
        'fKurN': 'wrnpe',
        'QdIqP': function(_0x34ef5d) {
            return _0x34ef5d();
        },
        'RDMOx': 'CookieJD',
        'qXJDe': 'CookieJD2',
        'hOUNd': 'CookiesJD',
        'SlCCd': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'JkfrO': 'https://bean.m.jd.com/bean/signIndex.action',
        'hwexQ': function(_0x10755b, _0x4c3139) {
            return _0x10755b == _0x4c3139;
        },
        'vMsMF': 'object',
        'kIjwZ': 'openRedPacket',
        'PCZlR': function(_0x1bd2b7, _0x2d9835) {
            return _0x1bd2b7(_0x2d9835);
        },
        'KoaDP': function(_0x1df801, _0x5aa1f5) {
            return _0x1df801 + _0x5aa1f5;
        },
        'hoTih': function(_0x1c33fb, _0x2d297f) {
            return _0x1c33fb + _0x2d297f;
        },
        'ezOmR': function(_0x5151f2, _0x2315f7) {
            return _0x5151f2 * _0x2315f7;
        },
        'hBxYr': function(_0x1a2983, _0x4cee8f) {
            return _0x1a2983 * _0x4cee8f;
        },
        'wZfUC': function(_0x34508b, _0x40d4ff) {
            return _0x34508b * _0x40d4ff;
        },
        'ZMumx': '*/*',
        'dasbA': 'gzip, deflate, br',
        'FaXfx': 'zh-cn',
        'btPvg': 'keep-alive',
        'fdczE': 'application/x-www-form-urlencoded',
        'KKACQ': 'api.m.jd.com',
        'erEwH': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'LpoTw': './USER_AGENTS',
        'QNEWK': 'JDUA',
        'wXFHy': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    const _0x385d55 = {
        'floorToken': _0x3d47a2,
        'dataSourceCode': _0x56f614['kIjwZ'],
        'argMap': {}
    };
    const _0x25ec6f = {
        'url': JD_API_HOST + '?functionId=pg_interact_interface_invoke&body=' + _0x56f614['PCZlR'](escape, JSON['stringify'](_0x385d55)) + '&appid=swat_miniprogram&fromType=wxapp×tamp=' + _0x56f614['KoaDP'](_0x56f614['hoTih'](new Date()['getTime'](), _0x56f614['ezOmR'](_0x56f614['ezOmR'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x56f614['hBxYr'](_0x56f614['wZfUC'](_0x56f614['wZfUC'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x56f614['ZMumx'],
            'Accept-Encoding': _0x56f614['dasbA'],
            'Accept-Language': _0x56f614['FaXfx'],
            'Connection': _0x56f614['btPvg'],
            'Content-Type': _0x56f614['fdczE'],
            'Host': _0x56f614['KKACQ'],
            'Referer': _0x56f614['erEwH'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x56f614['PCZlR'](require, _0x56f614['LpoTw'])['USER_AGENT'] : $['getdata'](_0x56f614['QNEWK']) ? $['getdata'](_0x56f614['QNEWK']) : _0x56f614['wXFHy']
        }
    };
    return new Promise(_0x548da1 => {
        var _0x3880ed = {
            'jRbyL': _0x56f614['RDMOx'],
            'TjZXD': _0x56f614['qXJDe'],
            'CkYZT': function(_0x39f53a, _0x3e9e15) {
                return _0x56f614['uStVk'](_0x39f53a, _0x3e9e15);
            },
            'LRbKF': _0x56f614['hOUNd'],
            'FMoHS': _0x56f614['SlCCd'],
            'VKcIE': _0x56f614['JkfrO'],
            'xRIyf': function(_0x41a87c, _0x3bb4c8) {
                return _0x56f614['hwexQ'](_0x41a87c, _0x3bb4c8);
            },
            'FnuRv': _0x56f614['vMsMF']
        };
        $['post'](_0x25ec6f, (_0x55b595, _0x593918, _0x59a928) => {
            var _0x273b43 = {
                'OMwcW': _0x56f614['cbJyE'],
                'OngcR': _0x56f614['STbJA']
            };
            try {
                if (_0x56f614['aoMdw'](_0x56f614['jkcLQ'], _0x56f614['jkcLQ'])) {
                    cookiesArr = [$['getdata'](_0x3880ed['jRbyL']), $['getdata'](_0x3880ed['TjZXD']), ..._0x3880ed['CkYZT'](jsonParse, $['getdata'](_0x3880ed['LRbKF']) || '[]')['map'](_0x38dcc6 => _0x38dcc6['cookie'])]['filter'](_0x67e8f9 => !!_0x67e8f9);
                } else {
                    if (_0x55b595) {
                        if (_0x56f614['aoMdw'](_0x56f614['fdzHk'], _0x56f614['fdzHk'])) {
                            $['isLogin'] = ![];
                            return;
                        } else {
                            console['log']('' + JSON['stringify'](_0x55b595));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        }
                    } else {
                        if (_0x56f614['PuGxi'](_0x56f614['lkdBH'], _0x56f614['BaeuA'])) {
                            $['msg']($['name'], _0x3880ed['FMoHS'], _0x3880ed['VKcIE'], {
                                'open-url': _0x3880ed['VKcIE']
                            });
                            return;
                        } else {
                            if (_0x56f614['uStVk'](safeGet, _0x59a928)) {
                                _0x59a928 = JSON['parse'](_0x59a928);
                                if (_0x59a928[_0x56f614['hlRQU']]) {
                                    if (_0x56f614['aoMdw'](_0x56f614['tOQqo'], _0x56f614['tOQqo'])) {
                                        if (_0x3880ed['xRIyf'](typeof JSON['parse'](_0x59a928), _0x3880ed['FnuRv'])) {
                                            return !![];
                                        }
                                    } else {
                                        console['log']('活动开启成功，初始：' + (_0x59a928['data'] && _0x59a928['data'][_0x56f614['eHxGn']]) + '京豆');
                                        $['vvipFlag'] = !![];
                                    }
                                } else {
                                    if (_0x56f614['aoMdw'](_0x56f614['fKurN'], _0x56f614['fKurN'])) {
                                        console['log'](_0x59a928[_0x273b43['OMwcW']][_0x273b43['OngcR']] + '京豆领取成功');
                                        $['rewardBeanNum'] += _0x59a928[_0x273b43['OMwcW']][_0x273b43['OngcR']];
                                        message += (message ? '\x0a' : '') + '【做任务 天天领京豆】' + $['rewardBeanNum'] + '京豆';
                                    } else {
                                        console['log'](_0x59a928['message']);
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (_0x26bd44) {
                $['logErr'](_0x26bd44, _0x593918);
            } finally {
                _0x56f614['QdIqP'](_0x548da1);
            }
        });
    });
}

function taskUrl(_0x41ffe4, _0xdde8d6 = {}) {
    var _0x4216df = {
        'ZiTKO': function(_0x2b1785, _0x23e725) {
            return _0x2b1785(_0x23e725);
        },
        'CwUIk': function(_0x2f83b6, _0x5cc908) {
            return _0x2f83b6 + _0x5cc908;
        },
        'TvZRe': function(_0x17ec11, _0x329873) {
            return _0x17ec11 * _0x329873;
        },
        'SHrSv': '*/*',
        'eoDXs': 'gzip, deflate, br',
        'XamBZ': 'zh-cn',
        'DCGlB': 'keep-alive',
        'KQwwb': 'application/x-www-form-urlencoded',
        'XWajQ': 'api.m.jd.com',
        'fQedr': 'https://servicewechat.com/wxa5bf5ee667d91626/108/page-frame.html',
        'AbvZw': function(_0x1a2be4, _0xd10c48) {
            return _0x1a2be4(_0xd10c48);
        },
        'ifTIJ': './USER_AGENTS',
        'MusZQ': 'JDUA',
        'SHsLu': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return {
        'url': JD_API_HOST + '?functionId=' + _0x41ffe4 + '&body=' + _0x4216df['ZiTKO'](escape, JSON['stringify'](_0xdde8d6)) + '&appid=swat_miniprogram&osVersion=5.0.0&clientVersion=3.1.3&fromType=wxapp×tamp=' + _0x4216df['CwUIk'](_0x4216df['CwUIk'](new Date()['getTime'](), _0x4216df['TvZRe'](_0x4216df['TvZRe'](new Date()['getTimezoneOffset'](), 0x3c), 0x3e8)), _0x4216df['TvZRe'](_0x4216df['TvZRe'](_0x4216df['TvZRe'](0x8, 0x3c), 0x3c), 0x3e8)),
        'headers': {
            'Accept': _0x4216df['SHrSv'],
            'Accept-Encoding': _0x4216df['eoDXs'],
            'Accept-Language': _0x4216df['XamBZ'],
            'Connection': _0x4216df['DCGlB'],
            'Content-Type': _0x4216df['KQwwb'],
            'Host': _0x4216df['XWajQ'],
            'Referer': _0x4216df['fQedr'],
            'Cookie': cookie,
            'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x4216df['AbvZw'](require, _0x4216df['ifTIJ'])['USER_AGENT'] : $['getdata'](_0x4216df['MusZQ']) ? $['getdata'](_0x4216df['MusZQ']) : _0x4216df['SHsLu']
        }
    };
}

function TotalBean() {
    var _0x28daa0 = {
        'tAfOb': function(_0x11574f) {
            return _0x11574f();
        },
        'cYmEw': function(_0x595d46, _0x3e911c) {
            return _0x595d46 === _0x3e911c;
        },
        'nMgTF': 'mrAyw',
        'qcvsa': 'whIij',
        'faLlb': 'NGQlG',
        'zjvpN': 'pKwMU',
        'Vrpkm': function(_0x19413b, _0x202773) {
            return _0x19413b === _0x202773;
        },
        'izdES': 'retcode',
        'sLIiD': function(_0x1aa71c, _0x354fa3) {
            return _0x1aa71c !== _0x354fa3;
        },
        'LkgkB': 'rClhJ',
        'jmTvi': function(_0x2e61e8, _0x28d6a7) {
            return _0x2e61e8 === _0x28d6a7;
        },
        'RUXVZ': 'WvYOQ',
        'PLIoI': 'base',
        'agUAg': function(_0x2d6a3b, _0x2df49e) {
            return _0x2d6a3b === _0x2df49e;
        },
        'qVpbN': 'YFcuv',
        'AqwjW': 'hSZSY',
        'HdtNq': function(_0x5bf769) {
            return _0x5bf769();
        },
        'ZUKNU': 'application/json,text/plain, */*',
        'bNjuE': 'application/x-www-form-urlencoded',
        'KnzFF': 'gzip, deflate, br',
        'aSZFt': 'zh-cn',
        'TXSRl': 'keep-alive',
        'ReMjN': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'IJccd': function(_0x2220f2, _0x448cfc) {
            return _0x2220f2(_0x448cfc);
        },
        'TBpji': './USER_AGENTS',
        'eBmtj': 'JDUA',
        'kTmQQ': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(async _0x59d692 => {
        const _0x58fa0f = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': _0x28daa0['ZUKNU'],
                'Content-Type': _0x28daa0['bNjuE'],
                'Accept-Encoding': _0x28daa0['KnzFF'],
                'Accept-Language': _0x28daa0['aSZFt'],
                'Connection': _0x28daa0['TXSRl'],
                'Cookie': cookie,
                'Referer': _0x28daa0['ReMjN'],
                'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x28daa0['IJccd'](require, _0x28daa0['TBpji'])['USER_AGENT'] : $['getdata'](_0x28daa0['eBmtj']) ? $['getdata'](_0x28daa0['eBmtj']) : _0x28daa0['kTmQQ']
            }
        };
        $['post'](_0x58fa0f, (_0x5a924b, _0x3de66c, _0x19a139) => {
            var _0xd2cf8 = {
                'LLuLb': function(_0x44646d) {
                    return _0x28daa0['tAfOb'](_0x44646d);
                },
                'wTRlV': function(_0x245628) {
                    return _0x28daa0['tAfOb'](_0x245628);
                }
            };
            if (_0x28daa0['cYmEw'](_0x28daa0['nMgTF'], _0x28daa0['nMgTF'])) {
                try {
                    if (_0x28daa0['cYmEw'](_0x28daa0['qcvsa'], _0x28daa0['qcvsa'])) {
                        if (_0x5a924b) {
                            console['log']('' + JSON['stringify'](_0x5a924b));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x19a139) {
                                if (_0x28daa0['cYmEw'](_0x28daa0['faLlb'], _0x28daa0['zjvpN'])) {
                                    $['logErr'](e, _0x3de66c);
                                } else {
                                    _0x19a139 = JSON['parse'](_0x19a139);
                                    if (_0x28daa0['Vrpkm'](_0x19a139[_0x28daa0['izdES']], 0xd)) {
                                        if (_0x28daa0['sLIiD'](_0x28daa0['LkgkB'], _0x28daa0['LkgkB'])) {
                                            console['log'](e);
                                            console['log']('京东服务器访问数据为空，请检查自身设备网络情况');
                                            return ![];
                                        } else {
                                            $['isLogin'] = ![];
                                            return;
                                        }
                                    }
                                    if (_0x28daa0['jmTvi'](_0x19a139[_0x28daa0['izdES']], 0x0)) {
                                        if (_0x28daa0['jmTvi'](_0x28daa0['RUXVZ'], _0x28daa0['RUXVZ'])) {
                                            $['nickName'] = _0x19a139[_0x28daa0['PLIoI']] && _0x19a139[_0x28daa0['PLIoI']]['nickname'] || $['UserName'];
                                        } else {
                                            _0xd2cf8['LLuLb'](_0x59d692);
                                        }
                                    } else {
                                        if (_0x28daa0['agUAg'](_0x28daa0['qVpbN'], _0x28daa0['qVpbN'])) {
                                            $['nickName'] = $['UserName'];
                                        } else {
                                            if (_0x5a924b) {
                                                console['log']('' + JSON['stringify'](_0x5a924b));
                                                console['log']($['name'] + ' API请求失败，请检查网路重试');
                                            } else {}
                                        }
                                    }
                                }
                            } else {
                                console['log']('京东服务器返回空数据');
                            }
                        }
                    } else {
                        return JSON['parse'](str);
                    }
                } catch (_0x317671) {
                    $['logErr'](_0x317671, _0x3de66c);
                } finally {
                    if (_0x28daa0['sLIiD'](_0x28daa0['AqwjW'], _0x28daa0['AqwjW'])) {
                        console['log']('' + JSON['stringify'](_0x5a924b));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        _0x28daa0['HdtNq'](_0x59d692);
                    }
                }
            } else {
                _0xd2cf8['wTRlV'](_0x59d692);
            }
        });
    });
}

function safeGet(_0xadcb60) {
    var _0xfd23b5 = {
        'zpjms': function(_0xe1209b) {
            return _0xe1209b();
        },
        'fEgzN': function(_0x1c9b40, _0x1eed31) {
            return _0x1c9b40 == _0x1eed31;
        },
        'KtVfN': 'object',
        'Mlxoo': function(_0x55e702, _0x48a4e7) {
            return _0x55e702 === _0x48a4e7;
        },
        'piyIw': 'jbDku'
    };
    try {
        if (_0xfd23b5['fEgzN'](typeof JSON['parse'](_0xadcb60), _0xfd23b5['KtVfN'])) {
            if (_0xfd23b5['Mlxoo'](_0xfd23b5['piyIw'], _0xfd23b5['piyIw'])) {
                return !![];
            } else {
                return new Promise(_0x2c3773 => {
                    if (message) $['msg']($['name'], '', '【京东账号' + $['index'] + '】' + $['nickName'] + '\x0a' + message);
                    _0xfd23b5['zpjms'](_0x2c3773);
                });
            }
        }
    } catch (_0x138b8e) {
        console['log'](_0x138b8e);
        console['log']('京东服务器访问数据为空，请检查自身设备网络情况');
        return ![];
    }
}

function jsonParse(_0x55f266) {
    var _0x199f79 = {
        'YPhtc': function(_0x2e274d, _0x74f2b8) {
            return _0x2e274d == _0x74f2b8;
        },
        'HQZuY': 'object',
        'RMAhJ': 'string',
        'vceTt': function(_0x3e0f19, _0x80242f) {
            return _0x3e0f19 !== _0x80242f;
        },
        'cERva': 'iHtmp',
        'rlcgf': 'IgowM',
        'AFgxG': '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'
    };
    if (_0x199f79['YPhtc'](typeof _0x55f266, _0x199f79['RMAhJ'])) {
        if (_0x199f79['vceTt'](_0x199f79['cERva'], _0x199f79['rlcgf'])) {
            try {
                return JSON['parse'](_0x55f266);
            } catch (_0x209efe) {
                console['log'](_0x209efe);
                $['msg']($['name'], '', _0x199f79['AFgxG']);
                return [];
            }
        } else {
            try {
                if (_0x199f79['YPhtc'](typeof JSON['parse'](data), _0x199f79['HQZuY'])) {
                    return !![];
                }
            } catch (_0x23e3ba) {
                console['log'](_0x23e3ba);
                console['log']('京东服务器访问数据为空，请检查自身设备网络情况');
                return ![];
            }
        }
    }
};
_0xodJ = 'jsjiami.com.v6'


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

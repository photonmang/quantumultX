/*
 * @Author: LXK9301 https://github.com/LXK9301
 * @Date: 2020-11-03 09:25:47
 * @Last Modified by: LXK9301
 * @Last Modified time: 2021-4-3 15:27:07
 */
/*
京东手机狂欢城活动，每日可获得20+以上京豆（其中20京豆是往期奖励，需第一天参加活动后，第二天才能拿到）
活动时间: 2021-4-1至2021-4-20
活动入口：暂无 [活动地址](https://carnivalcity.m.jd.com/)

往期奖励：
a、 4月1日-4月20日期间第1名可获得实物手机一部，4月1日/16日/17日/18日/19日/20日 第1名/418名获得手机。
b、 每日第2-10000名，可获得50个京豆
c、 每日第10001-30000名可获得20个京豆
d、 30000名之外，0京豆


脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
===================quantumultx================
[task_local]
#京东手机狂欢城
0 0-18/6 * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_carnivalcity.js, tag=京东手机狂欢城, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

=====================Loon================
[Script]
cron "0 0-18/6 * * *" script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_carnivalcity.js, tag=京东手机狂欢城

====================Surge================
京东手机狂欢城 = type=cron,cronexp=0 0-18/6 * * *,wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_carnivalcity.js

============小火箭=========
5G狂欢城 = type=cron,script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/jd/jd_carnivalcity.js, cronexpr="0 0,6,12,18 * * *", timeout=3600, enable=true
*/
const $ = new Env('京东手机狂欢城');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message = '', allMessage = '';


if ($['isNode']()) {
    Object['keys'](jdCookieNode)['forEach'](_0x359b1a => {
        cookiesArr['push'](jdCookieNode[_0x359b1a]);
    });
    if (process['env']['JD_DEBUG'] && process['env']['JD_DEBUG'] === 'false') console['log'] = () => {};
    if (JSON['stringify'](process['env'])['indexOf']('GITHUB') > -0x1) process['exit'](0x0);
} else {
    cookiesArr = [$['getdata']('CookieJD'), $['getdata']('CookieJD2'), ...jsonParse($['getdata']('CookiesJD') || '[]')['map'](_0x1311d1 => _0x1311d1['cookie'])]['filter'](_0x49a899 => !!_0x49a899);
}
let inviteCodes = [`b251f579-82ec-4a10-a2be-4621ae4fd73f@7b0ae744-85ee-424b-a6cb-01449658225a@dc660244-92de-4e57-9a21-226a5c788143@64309a17-bdf9-48ca-bc0b-b7f970601c16@8d5764d1-1cc7-4b58-b78f-a9cc25a1cc77@2ae76835-1e7f-4dd5-a22a-8196e01848f7@0af2786e-b2a2-4d77-9b8e-70be2e446d6f@d6106c97-db08-49ef-b0bc-3a44df6b7c6f`];
const JD_API_HOST = 'https://carnivalcity.m.jd.com';
const activeEndTime = '2021/4/20 00:59:59+08:00';
!(async () => {
    var _0x5c408f = {
        'oEETh': function(_0x2fff05, _0xf5d263) {
            return _0x2fff05 > _0xf5d263;
        },
        'GNaty': function(_0x3241c3, _0x375e55) {
            return _0x3241c3(_0x375e55);
        },
        'AhlFo': function(_0x5adbf1, _0x7f66dd) {
            return _0x5adbf1 === _0x7f66dd;
        },
        'AfFnj': 'function',
        'mjdQp': function(_0x15faa8, _0x5245b4) {
            return _0x15faa8 === _0x5245b4;
        },
        'HBSZZ': function(_0x3be936, _0x51f98a) {
            return _0x3be936 !== _0x51f98a;
        },
        'TjsZl': 'symbol',
        'xGpJr': function(_0x810400, _0x2efc6c) {
            return _0x810400 === _0x2efc6c;
        },
        'karQS': function(_0x386518, _0x1e8f0b) {
            return _0x386518(_0x1e8f0b);
        },
        'HJMNq': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'xJJRM': 'https://bean.m.jd.com/bean/signIndex.action',
        'UEijm': function(_0x4e63ab) {
            return _0x4e63ab();
        },
        'ThlMv': function(_0x37ceac) {
            return _0x37ceac();
        },
        'SBcwx': function(_0x11548f, _0x2ecd37) {
            return _0x11548f < _0x2ecd37;
        },
        'gMXnS': function(_0x1c7662, _0x1da1a6) {
            return _0x1c7662 + _0x1da1a6;
        },
        'aBEnL': function(_0x2b379f, _0x3bad97) {
            return _0x2b379f === _0x3bad97;
        },
        'JGvap': 'EQlHO',
        'rqDXh': 'BbzHR',
        'EzdgQ': function(_0x217875, _0x27eb03) {
            return _0x217875 === _0x27eb03;
        },
        'aUgbi': 'IcGlm',
        'pYkaE': 'IZUeM',
        'wnlwY': function(_0x264cfa) {
            return _0x264cfa();
        },
        'DHnAE': function(_0x5943a8, _0x4fdc8d) {
            return _0x5943a8 < _0x4fdc8d;
        },
        'fAxAx': function(_0x5ee10a, _0x2ccce3) {
            return _0x5ee10a >= _0x2ccce3;
        },
        'tTCgK': function(_0x284700, _0x49d836) {
            return _0x284700 === _0x49d836;
        },
        'deRbB': 'MKorh',
        'NYdEY': 'sAcFG',
        'xTHeg': function(_0x3603f8, _0x1db5e5) {
            return _0x3603f8(_0x1db5e5);
        },
        'ULXkP': 'drArE',
        'GHJYw': 'ZDfdu',
        'WWqOs': 'FAbas'
    };
    if (!cookiesArr[0x0]) {
        $['msg']($['name'], _0x5c408f['HJMNq'], _0x5c408f['xJJRM'], {
            'open-url': _0x5c408f['xJJRM']
        });
        return;
    }
    $['temp'] = [];
    await _0x5c408f['UEijm'](updateShareCodesCDN);
    await _0x5c408f['ThlMv'](requireConfig);
    for (let _0x342a8c = 0x0; _0x5c408f['SBcwx'](_0x342a8c, cookiesArr['length']); _0x342a8c++) {
        if (cookiesArr[_0x342a8c]) {
            cookie = cookiesArr[_0x342a8c];
            $['UserName'] = _0x5c408f['karQS'](decodeURIComponent, cookie['match'](/pt_pin=([^; ]+)(?=;?)/) && cookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $['index'] = _0x5c408f['gMXnS'](_0x342a8c, 0x1);
            $['isLogin'] = !![];
            $['nickName'] = '';
            $['jingBeanNum'] = 0x0;
            $['integralCount'] = 0x0;
            $['integer'] = 0x0;
            $['lasNum'] = 0x0;
            $['num'] = 0x0;
            $['beans'] = 0x0;
            $['blockAccount'] = ![];
            message = '';
            await _0x5c408f['ThlMv'](TotalBean);
            console['log']('\n开始【京东账号' + $['index'] + '】' + ($['nickName'] || $['UserName']) + '\x0a');
            if (!$['isLogin']) {
                if (_0x5c408f['aBEnL'](_0x5c408f['JGvap'], _0x5c408f['rqDXh'])) {
                    console['log']('' + JSON['stringify'](err));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {
                    $['msg']($['name'], '【提示】cookie已失效', '京东账号' + $['index'] + ' ' + ($['nickName'] || $['UserName']) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                        'open-url': _0x5c408f['xJJRM']
                    });
                    if ($['isNode']()) {
                        if (_0x5c408f['EzdgQ'](_0x5c408f['aUgbi'], _0x5c408f['pYkaE'])) {
                            if (_0x5c408f['oEETh'](process['env']['JD818_SHARECODES']['indexOf']('\x0a'), -0x1)) {
                                shareCodes = process['env']['JD818_SHARECODES']['split']('\x0a');
                            } else {
                                shareCodes = process['env']['JD818_SHARECODES']['split']('&');
                            }
                        } else {
                            await notify['sendNotify']($['name'] + 'cookie已失效 - ' + $['UserName'], '京东账号' + $['index'] + ' ' + $['UserName'] + '\n请重新登录获取cookie');
                        }
                    }
                    continue;
                }
            }
            await _0x5c408f['ThlMv'](shareCodesFormat);
            await _0x5c408f['wnlwY'](JD818);
        }
    }
    for (let _0x41cca5 = 0x0; _0x5c408f['DHnAE'](_0x41cca5, cookiesArr['length']); _0x41cca5++) {
        if (cookiesArr[_0x41cca5]) {
            cookie = cookiesArr[_0x41cca5];
            $['canHelp'] = !![];
            $['UserName'] = _0x5c408f['karQS'](decodeURIComponent, cookie['match'](/pt_pin=([^; ]+)(?=;?)/) && cookie['match'](/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            if (cookiesArr && _0x5c408f['fAxAx'](cookiesArr['length'], 0x1) && $['canHelp']) {
                if (_0x5c408f['tTCgK'](_0x5c408f['deRbB'], _0x5c408f['NYdEY'])) {
                    _0x5c408f['GNaty'](resolve, data);
                } else {
                    console['log']('\n先自己账号内部相互邀请助力\n');
                    for (let _0x4ad7b0 of $['temp']) {
                        console['log']('\x0a' + $['UserName'] + ' 去参助力 ' + _0x4ad7b0);
                        const _0x218bcf = await _0x5c408f['xTHeg'](toHelp, _0x4ad7b0['trim']());
                        if (_0x5c408f['tTCgK'](_0x218bcf['data']['status'], 0x5)) {
                            console['log']('助力机会已耗尽，跳出助力');
                            $['canHelp'] = ![];
                            break;
                        }
                    }
                }
            }
            if ($['canHelp']) {
                if (_0x5c408f['HBSZZ'](_0x5c408f['ULXkP'], _0x5c408f['ULXkP'])) {
                    var _0x5f55d3 = {
                        'IIgrH': function(_0x5579b1, _0x1dcfcc) {
                            return _0x5c408f['AhlFo'](_0x5579b1, _0x1dcfcc);
                        },
                        'xEkbl': _0x5c408f['AfFnj'],
                        'lKkBJ': function(_0x14f2fc, _0x2f3501) {
                            return _0x5c408f['mjdQp'](_0x14f2fc, _0x2f3501);
                        },
                        'lqMBX': function(_0x5d216d, _0x109a4d) {
                            return _0x5c408f['HBSZZ'](_0x5d216d, _0x109a4d);
                        },
                        'VUaFz': _0x5c408f['TjsZl']
                    };
                    return P = _0x5c408f['mjdQp'](_0x5c408f['AfFnj'], typeof Symbol) && _0x5c408f['xGpJr'](_0x5c408f['TjsZl'], typeof Symbol['iterator']) ? function(_0x5e480e) {
                        return typeof _0x5e480e;
                    } : function(_0x230933) {
                        return _0x230933 && _0x5f55d3['IIgrH'](_0x5f55d3['xEkbl'], typeof Symbol) && _0x5f55d3['lKkBJ'](_0x230933['constructor'], Symbol) && _0x5f55d3['lqMBX'](_0x230933, Symbol['prototype']) ? _0x5f55d3['VUaFz'] : typeof _0x230933;
                    }, _0x5c408f['karQS'](P, t);
                } else {
                    console['log']('\n\n如果有剩余助力机会，则给作者lxk0301以及随机码助力');
                    await _0x5c408f['wnlwY'](doHelp);
                }
            }
        }
    }
    if (allMessage) {
        if (_0x5c408f['HBSZZ'](_0x5c408f['GHJYw'], _0x5c408f['WWqOs'])) {
            if ($['isNode']()) {
                await notify['sendNotify']($['name'], allMessage, {
                    'url': JD_API_HOST
                });
                $['msg']($['name'], '', allMessage);
            }
        } else {
            console['log']('doBrowse异常');
        }
    }
})()['catch'](_0x21efc5 => {
    $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + _0x21efc5 + '!', '');
})['finally'](() => {
    $['done']();
});
async function JD818() {
    var _0x2f4a11 = {
        'PyiBh': function(_0x5f356d, _0x3c3289) {
            return _0x5f356d + _0x3c3289;
        },
        'UoqTL': '10|11|8|5|7|3|4|6|0|9|1|2',
        'SvzjC': function(_0x30b81e) {
            return _0x30b81e();
        },
        'bUnSu': function(_0x513344) {
            return _0x513344();
        },
        'KHixW': function(_0x3e6187) {
            return _0x3e6187();
        },
        'dxaKB': function(_0x47cab1, _0x2f793c) {
            return _0x47cab1(_0x2f793c);
        },
        'mUbZS': function(_0x5f1ee8) {
            return _0x5f1ee8();
        },
        'ilqim': function(_0x18fed8) {
            return _0x18fed8();
        },
        'VdSfb': function(_0x1a0af1, _0x1d178b) {
            return _0x1a0af1 !== _0x1d178b;
        },
        'PtZaY': 'mgFsH',
        'tZzDo': 'FlAXk'
    };
    try {
        var _0x3128d9 = _0x2f4a11['UoqTL']['split']('|'),
            _0x121e02 = 0x0;
        while (!![]) {
            switch (_0x3128d9[_0x121e02++]) {
                case '0':
                    await _0x2f4a11['SvzjC'](getListRank);
                    continue;
                case '1':
                    await _0x2f4a11['SvzjC'](getListJbean);
                    continue;
                case '2':
                    await _0x2f4a11['bUnSu'](showMsg);
                    continue;
                case '3':
                    await _0x2f4a11['bUnSu'](doBrandTask);
                    continue;
                case '4':
                    await _0x2f4a11['KHixW'](doBrowseshopTask);
                    continue;
                case '5':
                    await _0x2f4a11['dxaKB'](indexInfo, !![]);
                    continue;
                case '6':
                    await _0x2f4a11['KHixW'](myRank);
                    continue;
                case '7':
                    await _0x2f4a11['mUbZS'](doHotProducttask);
                    continue;
                case '8':
                    if ($['blockAccount']) return;
                    continue;
                case '9':
                    await _0x2f4a11['mUbZS'](getListIntegral);
                    continue;
                case '10':
                    await _0x2f4a11['mUbZS'](indexInfo);
                    continue;
                case '11':
                    await _0x2f4a11['ilqim'](getHelp);
                    continue;
            }
            break;
        }
    } catch (_0x2986ec) {
        if (_0x2f4a11['VdSfb'](_0x2f4a11['PtZaY'], _0x2f4a11['tZzDo'])) {
            $['logErr'](_0x2986ec);
        } else {
            result = _0x2f4a11['PyiBh'](i, 0x1);
        }
    }
}
async function doHotProducttask() {
    var _0x21dc7c = {
        'brCto': function(_0x4a27aa, _0x8cb537, _0x3d08f6, _0x4df0a2, _0x3e92a6, _0x1b8d9a) {
            return _0x4a27aa(_0x8cb537, _0x3d08f6, _0x4df0a2, _0x3e92a6, _0x1b8d9a);
        },
        'ToqeC': 'hot',
        'InkhE': 'browse',
        'vDXkL': 'browseHotSku',
        'GKjFe': function(_0x279bca, _0x318a91) {
            return _0x279bca(_0x318a91);
        }
    };
    $['hotProductList'] = $['hotProductList']['filter'](_0x505506 => !!_0x505506 && _0x505506['status'] === '1');
    if ($['hotProductList'] && $['hotProductList']['length']) console['log']('开始 【浏览热销手机产品】任务');
    for (let _0x55259c of $['hotProductList']) {
        await _0x21dc7c['brCto'](doBrowse, _0x55259c['id'], '', _0x21dc7c['ToqeC'], _0x21dc7c['InkhE'], _0x21dc7c['vDXkL']);
        await $['wait'](0xc8);
        if ($['browseId']) {
            await _0x21dc7c['GKjFe'](getBrowsePrize, $['browseId']);
        }
    }
}

function doBrowse(_0x3084d3 = '', _0xaa2b93 = '', _0x3fd90f = 'hot', _0x4056e1 = 'browse', _0x1a66fd = 'browseHotSku') {
    var _0x3955c9 = {
        'QoqjX': function(_0x3b17a1, _0x562053) {
            return _0x3b17a1(_0x562053);
        },
        'NujmR': 'date',
        'mfzcV': function(_0x2ef910, _0x2f4429) {
            return _0x2ef910 === _0x2f4429;
        },
        'fOMam': 'BfwIn',
        'KmDqR': function(_0x449095, _0x9f924e) {
            return _0x449095 !== _0x9f924e;
        },
        'rmJeP': 'rYoBh',
        'YPBrD': 'lqunm',
        'eweeO': function(_0x295461, _0x152d79) {
            return _0x295461 === _0x152d79;
        },
        'WuaIT': 'fQjry',
        'MjMEN': 'code',
        'EJoYf': 'BVmnb',
        'gAnTH': 'data',
        'NEqOL': 'browseId',
        'bEKcp': 'DveLl',
        'KsSmz': 'hqbAX',
        'pZaUb': 'apuTr',
        'SUdef': function(_0x36f125) {
            return _0x36f125();
        },
        'zKblS': function(_0x4f2197, _0xef6c5e, _0xb37ede) {
            return _0x4f2197(_0xef6c5e, _0xb37ede);
        },
        'GzthN': '/khc/task/doBrowse'
    };
    return new Promise(_0x594d78 => {
        var _0x49c3af = {
            'sYIEz': function(_0x7a4249, _0x51a924) {
                return _0x3955c9['QoqjX'](_0x7a4249, _0x51a924);
            },
            'fSglf': _0x3955c9['NujmR'],
            'vLlif': function(_0x45ec42, _0x192980) {
                return _0x3955c9['mfzcV'](_0x45ec42, _0x192980);
            },
            'tFdEQ': _0x3955c9['fOMam'],
            'WxeaC': function(_0x507404, _0x297133) {
                return _0x3955c9['KmDqR'](_0x507404, _0x297133);
            },
            'WknCF': _0x3955c9['rmJeP'],
            'KASEF': _0x3955c9['YPBrD'],
            'kbEMA': function(_0x2d04ee, _0x427c68) {
                return _0x3955c9['eweeO'](_0x2d04ee, _0x427c68);
            },
            'dVMhY': _0x3955c9['WuaIT'],
            'NKKvq': _0x3955c9['MjMEN'],
            'gkyxb': _0x3955c9['EJoYf'],
            'mTXJf': _0x3955c9['gAnTH'],
            'zskFK': _0x3955c9['NEqOL'],
            'XOpeo': function(_0x4f7565, _0x3bc078) {
                return _0x3955c9['KmDqR'](_0x4f7565, _0x3bc078);
            },
            'ADVHc': _0x3955c9['bEKcp'],
            'weJLx': _0x3955c9['KsSmz'],
            'ukCMZ': _0x3955c9['pZaUb'],
            'ORDqC': function(_0x1026ae) {
                return _0x3955c9['SUdef'](_0x1026ae);
            }
        };
        const _0x4be1c1 = 'brandId=' + _0xaa2b93 + '&id=' + _0x3084d3 + '&taskMark=' + _0x3fd90f + '&type=' + _0x4056e1 + '&logMark=' + _0x1a66fd;
        const _0xbee7d4 = _0x3955c9['zKblS'](taskPostUrl, _0x3955c9['GzthN'], _0x4be1c1);
        $['post'](_0xbee7d4, (_0x765765, _0x44e9b9, _0x1308e9) => {
            if (_0x49c3af['vLlif'](_0x49c3af['tFdEQ'], _0x49c3af['tFdEQ'])) {
                try {
                    if (_0x49c3af['WxeaC'](_0x49c3af['WknCF'], _0x49c3af['KASEF'])) {
                        if (_0x765765) {
                            console['log']('' + JSON['stringify'](_0x765765));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x49c3af['kbEMA'](_0x49c3af['dVMhY'], _0x49c3af['dVMhY'])) {
                                console['log']('doBrowse 做' + _0x3fd90f + '任务:' + _0x1308e9);
                                _0x1308e9 = JSON['parse'](_0x1308e9);
                                if (_0x1308e9 && _0x49c3af['kbEMA'](_0x1308e9[_0x49c3af['NKKvq']], 0xc8)) {
                                    if (_0x49c3af['kbEMA'](_0x49c3af['gkyxb'], _0x49c3af['gkyxb'])) {
                                        $['browseId'] = _0x1308e9[_0x49c3af['mTXJf']][_0x49c3af['zskFK']] || '';
                                    } else {
                                        shareCodes = process['env']['JD818_SHARECODES']['split']('&');
                                    }
                                } else {
                                    if (_0x49c3af['XOpeo'](_0x49c3af['ADVHc'], _0x49c3af['ADVHc'])) {
                                        console['log']('jingBeanRecord失败：' + JSON['stringify'](_0x1308e9));
                                    } else {
                                        console['log']('doBrowse异常');
                                    }
                                }
                            } else {
                                return typeof t;
                            }
                        }
                    } else {
                        $['updatePkActivityIdRes'] = JSON['parse'](_0x1308e9);
                    }
                } catch (_0x301341) {
                    if (_0x49c3af['kbEMA'](_0x49c3af['weJLx'], _0x49c3af['ukCMZ'])) {
                        $['beans'] += _0x49c3af['sYIEz'](Number, res['data']);
                        console['log'](_0x1308e9['data'][i][_0x49c3af['fSglf']] + '日 【' + res['data'] + '】京豆奖励领取成功');
                    } else {
                        $['logErr'](_0x301341, _0x44e9b9);
                    }
                } finally {
                    _0x49c3af['ORDqC'](_0x594d78);
                }
            } else {
                console['log']('' + JSON['stringify'](_0x765765));
                console['log']($['name'] + ' API请求失败，请检查网路重试');
            }
        });
    });
}

function getBrowsePrize(_0x292d79, _0x2596e1 = '') {
    var _0x1175fe = {
        'BVCuC': 'CookieJD',
        'dpzuK': 'CookieJD2',
        'HBkVL': function(_0x1ab4aa, _0x3699b0) {
            return _0x1ab4aa(_0x3699b0);
        },
        'gWZxj': 'CookiesJD',
        'xsTOr': function(_0x391de8, _0x462c35) {
            return _0x391de8 === _0x462c35;
        },
        'GMiSE': 'QpsvB',
        'bPzET': function(_0x254fbb, _0x1cefd4) {
            return _0x254fbb === _0x1cefd4;
        },
        'QQAgg': 'code',
        'abqcf': 'WkSRA',
        'ZPZXV': 'dGYFK',
        'bYSlp': 'data',
        'bZDiB': 'jingBean',
        'AUIKN': 'ObqBo',
        'nlpQJ': 'MgqYE',
        'Wfpwj': function(_0x424981, _0x2ad9ea, _0x24c6ff) {
            return _0x424981(_0x2ad9ea, _0x24c6ff);
        },
        'YyFXb': '/khc/task/getBrowsePrize'
    };
    return new Promise(_0x1349f7 => {
        var _0x21319c = {
            'JNAsa': _0x1175fe['BVCuC'],
            'mOtVo': _0x1175fe['dpzuK'],
            'WQqHe': function(_0x4ab3a0, _0x113b16) {
                return _0x1175fe['HBkVL'](_0x4ab3a0, _0x113b16);
            },
            'GeZLR': _0x1175fe['gWZxj'],
            'jETHw': function(_0x304722, _0x4051a8) {
                return _0x1175fe['xsTOr'](_0x304722, _0x4051a8);
            },
            'tTJxv': _0x1175fe['GMiSE'],
            'ZdPeC': function(_0x276c02, _0x55a4d0) {
                return _0x1175fe['bPzET'](_0x276c02, _0x55a4d0);
            },
            'sthfa': _0x1175fe['QQAgg'],
            'dhiBO': _0x1175fe['abqcf'],
            'qyFHV': _0x1175fe['ZPZXV'],
            'UBWue': _0x1175fe['bYSlp'],
            'VHrRh': _0x1175fe['bZDiB'],
            'bbLIW': function(_0x224038, _0x4d4ba7) {
                return _0x1175fe['bPzET'](_0x224038, _0x4d4ba7);
            },
            'cnvya': _0x1175fe['AUIKN'],
            'LsWvO': _0x1175fe['nlpQJ'],
            'DLMgR': function(_0x4a2183, _0x4d0519) {
                return _0x1175fe['HBkVL'](_0x4a2183, _0x4d0519);
            }
        };
        const _0x14e2e8 = 'brandId=' + _0x2596e1 + '&browseId=' + _0x292d79;
        const _0x16ce73 = _0x1175fe['Wfpwj'](taskPostUrl, _0x1175fe['YyFXb'], _0x14e2e8);
        $['post'](_0x16ce73, (_0x2818c5, _0x2d68be, _0x5040fb) => {
            var _0x4f9fbb = {
                'GtxkC': _0x21319c['JNAsa'],
                'amsHk': _0x21319c['mOtVo'],
                'ksFwt': function(_0x2422b2, _0x1d3cf6) {
                    return _0x21319c['WQqHe'](_0x2422b2, _0x1d3cf6);
                },
                'JVHcC': _0x21319c['GeZLR']
            };
            try {
                if (_0x2818c5) {
                    console['log']('' + JSON['stringify'](_0x2818c5));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {
                    if (_0x21319c['jETHw'](_0x21319c['tTJxv'], _0x21319c['tTJxv'])) {
                        console['log']('getBrowsePrize 领取奖励 结果:' + _0x5040fb);
                        _0x5040fb = JSON['parse'](_0x5040fb);
                        if (_0x5040fb && _0x21319c['ZdPeC'](_0x5040fb[_0x21319c['sthfa']], 0xc8)) {
                            if (_0x21319c['ZdPeC'](_0x21319c['dhiBO'], _0x21319c['qyFHV'])) {
                                console['log']('往期奖励领取失败：' + JSON['stringify'](res));
                            } else {
                                if (_0x5040fb[_0x21319c['UBWue']][_0x21319c['VHrRh']]) $['beans'] += _0x5040fb[_0x21319c['UBWue']][_0x21319c['VHrRh']];
                            }
                        }
                    } else {
                        $['logErr'](e, _0x2d68be);
                    }
                }
            } catch (_0x192521) {
                $['logErr'](_0x192521, _0x2d68be);
            } finally {
                if (_0x21319c['bbLIW'](_0x21319c['cnvya'], _0x21319c['LsWvO'])) {
                    cookiesArr = [$['getdata'](_0x4f9fbb['GtxkC']), $['getdata'](_0x4f9fbb['amsHk']), ..._0x4f9fbb['ksFwt'](jsonParse, $['getdata'](_0x4f9fbb['JVHcC']) || '[]')['map'](_0x179247 => _0x179247['cookie'])]['filter'](_0x806dae => !!_0x806dae);
                } else {
                    _0x21319c['DLMgR'](_0x1349f7, _0x5040fb);
                }
            }
        });
    });
}
async function doBrandTask() {
    var _0x14818d = {
        'WnQkJ': function(_0x474675, _0x1c7731) {
            return _0x474675(_0x1c7731);
        },
        'tveTM': 'brandId'
    };
    for (let _0x558575 of $['brandList']) {
        await _0x14818d['WnQkJ'](brandTaskInfo, _0x558575[_0x14818d['tveTM']]);
    }
}

function brandTaskInfo(_0x8a4b53) {
    var _0x54de68 = {
        'FmtZF': function(_0x342c74, _0x3103fc) {
            return _0x342c74 === _0x3103fc;
        },
        'YoSlt': 'code',
        'cpdxC': 'data',
        'mwPzT': 'jingBean',
        'aFaQO': function(_0x5560c5, _0x8a15dc) {
            return _0x5560c5(_0x8a15dc);
        },
        'iPExK': function(_0x26184f) {
            return _0x26184f();
        },
        'aekQS': function(_0x47168f, _0xdc8ddf) {
            return _0x47168f !== _0xdc8ddf;
        },
        'kWdPT': 'umXkW',
        'bIMSK': 'YgCFa',
        'IaBlP': 'tHypW',
        'sNScu': function(_0xec56c3, _0x3ec8ac) {
            return _0xec56c3 === _0x3ec8ac;
        },
        'YsRBQ': function(_0x7e335e, _0xd97900) {
            return _0x7e335e !== _0xd97900;
        },
        'zICPo': 'tqQjB',
        'kIHJe': 'IymuX',
        'PSMlL': 'brandId',
        'yriok': 'skuTask',
        'cYynd': 'shopTask',
        'ZkhyP': 'meetingTask',
        'PZrYQ': 'questionTask',
        'fHOLX': '0|2|4|3|1',
        'mPGdZ': 'brandName',
        'WJyWQ': function(_0x538afb, _0x24e2ab, _0xf9ff08) {
            return _0x538afb(_0x24e2ab, _0xf9ff08);
        },
        'RGBfA': 'name',
        'WfsMJ': function(_0x33a2fe, _0x2f0b73, _0x468de2, _0x4e1fc9, _0x311668, _0x24a8a1) {
            return _0x33a2fe(_0x2f0b73, _0x468de2, _0x4e1fc9, _0x311668, _0x24a8a1);
        },
        'CzXnF': 'brand',
        'tvRDm': 'presell',
        'XhJDK': 'browseSku',
        'vGeSX': '4|2|3|0|1',
        'cTfGp': function(_0xe792b0, _0x54e46c, _0x526afc) {
            return _0xe792b0(_0x54e46c, _0x526afc);
        },
        'CJRxx': 'follow',
        'mWORp': 'browseShop',
        'TXaXm': '3|4|0|2|1',
        'bYFDq': 'meeting',
        'JFBEf': 'browseVenue',
        'mpexi': function(_0x565e4a, _0x5c4544, _0x4de98d) {
            return _0x565e4a(_0x5c4544, _0x4de98d);
        },
        'XOtfj': 'result',
        'KnoJH': 'nMNNQ',
        'KsfNU': 'ArYWI',
        'xDZZw': 'question',
        'GEOcX': function(_0x85c8d, _0x461108) {
            return _0x85c8d < _0x461108;
        },
        'LVqFG': 'answers',
        'mVEfi': 'right',
        'qRiuj': 'MaFwq',
        'HacSD': 'Oykvt',
        'JxMsn': function(_0x2e6673, _0xf626fc) {
            return _0x2e6673 + _0xf626fc;
        },
        'RaPuj': function(_0xc9d6b4, _0x5d3954) {
            return _0xc9d6b4 !== _0x5d3954;
        },
        'bcmbU': 'Jaumz',
        'wJKWf': 'RulZI',
        'tzUXz': function(_0x45125b, _0x1320b9, _0x1537c3, _0x16678b) {
            return _0x45125b(_0x1320b9, _0x1537c3, _0x16678b);
        },
        'cXvCd': function(_0x313caf, _0x5f46a9) {
            return _0x313caf !== _0x5f46a9;
        },
        'RvIcu': 'YSbXw',
        'EzQwe': 'NHtES',
        'TahVz': 'kqofz',
        'qdDID': 'glgDN',
        'jagFo': function(_0x852c8d, _0x44a0bb) {
            return _0x852c8d(_0x44a0bb);
        },
        'HoeOK': function(_0x7cc91e) {
            return _0x7cc91e();
        },
        'iLPRi': '/khc/index/brandTaskInfo'
    };
    const _0x57f525 = _0x54de68['mpexi'](taskUrl, _0x54de68['iLPRi'], {
        't': Date['now'](),
        'brandId': _0x8a4b53
    });
    $['skuTask'] = [];
    $['shopTask'] = [];
    $['meetingTask'] = [];
    $['questionTask'] = {};
    return new Promise(_0x327182 => {
        var _0x48cc28 = {
            'OqQXt': function(_0x5689a6) {
                return _0x54de68['HoeOK'](_0x5689a6);
            }
        };
        $['get'](_0x57f525, async (_0x58379e, _0x1bbbb4, _0x125645) => {
            var _0x588ddc = {
                'mAmai': function(_0x49ac0b, _0x20f6ae) {
                    return _0x54de68['FmtZF'](_0x49ac0b, _0x20f6ae);
                },
                'VEfmO': _0x54de68['YoSlt'],
                'kneKy': _0x54de68['cpdxC'],
                'icnwK': _0x54de68['mwPzT'],
                'FcWWm': function(_0x5edc97, _0x2463e2) {
                    return _0x54de68['aFaQO'](_0x5edc97, _0x2463e2);
                },
                'plRAk': function(_0x338c4e) {
                    return _0x54de68['iPExK'](_0x338c4e);
                }
            };
            if (_0x54de68['aekQS'](_0x54de68['kWdPT'], _0x54de68['kWdPT'])) {
                $['logErr'](e, _0x1bbbb4);
            } else {
                try {
                    if (_0x54de68['aekQS'](_0x54de68['bIMSK'], _0x54de68['IaBlP'])) {
                        if (_0x58379e) {
                            console['log']('' + JSON['stringify'](_0x58379e));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            _0x125645 = JSON['parse'](_0x125645);
                            if (_0x54de68['sNScu'](_0x125645['code'], 0xc8)) {
                                if (_0x54de68['YsRBQ'](_0x54de68['zICPo'], _0x54de68['kIHJe'])) {
                                    let _0x8a4b53 = _0x125645[_0x54de68['cpdxC']][_0x54de68['PSMlL']];
                                    $['skuTask'] = _0x125645[_0x54de68['cpdxC']][_0x54de68['yriok']] || [];
                                    $['shopTask'] = _0x125645[_0x54de68['cpdxC']][_0x54de68['cYynd']] || [];
                                    $['meetingTask'] = _0x125645[_0x54de68['cpdxC']][_0x54de68['ZkhyP']] || [];
                                    $['questionTask'] = _0x125645[_0x54de68['cpdxC']][_0x54de68['PZrYQ']] || [];
                                    for (let _0x1a177c of $['skuTask']['filter'](_0x3caa3f => !!_0x3caa3f && _0x3caa3f['status'] !== '4')) {
                                        var _0x4ebc34 = _0x54de68['fHOLX']['split']('|'),
                                            _0x3bb2f9 = 0x0;
                                        while (!![]) {
                                            switch (_0x4ebc34[_0x3bb2f9++]) {
                                                case '0':
                                                    console['log']('\n开始做 品牌手机 【' + _0x125645[_0x54de68['cpdxC']][_0x54de68['mPGdZ']] + '】 任务');
                                                    continue;
                                                case '1':
                                                    if ($['browseId']) await _0x54de68['WJyWQ'](getBrowsePrize, $['browseId'], _0x8a4b53);
                                                    continue;
                                                case '2':
                                                    console['log']('开始浏览 1-F 单品区 任务 ' + _0x1a177c[_0x54de68['RGBfA']]);
                                                    continue;
                                                case '3':
                                                    await $['wait'](0xc8);
                                                    continue;
                                                case '4':
                                                    await _0x54de68['WfsMJ'](doBrowse, _0x1a177c['id'], _0x8a4b53, _0x54de68['CzXnF'], _0x54de68['tvRDm'], _0x54de68['XhJDK']);
                                                    continue;
                                            }
                                            break;
                                        }
                                    }
                                    for (let _0x264c6a of $['shopTask']['filter'](_0x430d97 => !!_0x430d97 && _0x430d97['status'] !== '4')) {
                                        var _0x49748c = _0x54de68['vGeSX']['split']('|'),
                                            _0x4d827e = 0x0;
                                        while (!![]) {
                                            switch (_0x49748c[_0x4d827e++]) {
                                                case '0':
                                                    await $['wait'](0x2774);
                                                    continue;
                                                case '1':
                                                    if ($['browseId']) await _0x54de68['cTfGp'](getBrowsePrize, $['browseId'], _0x8a4b53);
                                                    continue;
                                                case '2':
                                                    console['log']('开始浏览 2-F 专柜区 任务 ' + _0x264c6a[_0x54de68['RGBfA']] + '，需等待10秒');
                                                    continue;
                                                case '3':
                                                    await _0x54de68['WfsMJ'](doBrowse, _0x264c6a['id'], _0x8a4b53, _0x54de68['CzXnF'], _0x54de68['CJRxx'], _0x54de68['mWORp']);
                                                    continue;
                                                case '4':
                                                    console['log']('\n开始做 品牌手机 【' + _0x125645[_0x54de68['cpdxC']][_0x54de68['mPGdZ']] + '】 任务');
                                                    continue;
                                            }
                                            break;
                                        }
                                    }
                                    for (let _0x4354c9 of $['meetingTask']['filter'](_0x2e31cf => !!_0x2e31cf && _0x2e31cf['status'] !== '4')) {
                                        var _0x267ff0 = _0x54de68['TXaXm']['split']('|'),
                                            _0x3a3c89 = 0x0;
                                        while (!![]) {
                                            switch (_0x267ff0[_0x3a3c89++]) {
                                                case '0':
                                                    await _0x54de68['WfsMJ'](doBrowse, _0x4354c9['id'], _0x8a4b53, _0x54de68['CzXnF'], _0x54de68['bYFDq'], _0x54de68['JFBEf']);
                                                    continue;
                                                case '1':
                                                    if ($['browseId']) await _0x54de68['mpexi'](getBrowsePrize, $['browseId'], _0x8a4b53);
                                                    continue;
                                                case '2':
                                                    await $['wait'](0x2904);
                                                    continue;
                                                case '3':
                                                    console['log']('\n开始做 品牌手机 【' + _0x125645[_0x54de68['cpdxC']][_0x54de68['mPGdZ']] + '】 任务');
                                                    continue;
                                                case '4':
                                                    console['log']('开始浏览 3-F 综合区 任务 ' + _0x4354c9[_0x54de68['RGBfA']] + '，需等待10秒');
                                                    continue;
                                            }
                                            break;
                                        }
                                    }
                                    if ($['questionTask']['hasOwnProperty']('id') && _0x54de68['sNScu']($['questionTask'][_0x54de68['XOtfj']], '0')) {
                                        if (_0x54de68['YsRBQ'](_0x54de68['KnoJH'], _0x54de68['KsfNU'])) {
                                            console['log']('\n开始做 品牌手机 【' + _0x125645[_0x54de68['cpdxC']][_0x54de68['mPGdZ']] + '】 任务');
                                            console['log']('开始做答题任务 ' + $['questionTask'][_0x54de68['xDZZw']]);
                                            let _0x334c3e = 0x0;
                                            for (let _0x581955 = 0x0; _0x54de68['GEOcX'](_0x581955, $['questionTask'][_0x54de68['LVqFG']]['length']); _0x581955++) {
                                                if ($['questionTask'][_0x54de68['LVqFG']][_0x581955][_0x54de68['mVEfi']]) {
                                                    if (_0x54de68['YsRBQ'](_0x54de68['qRiuj'], _0x54de68['HacSD'])) {
                                                        _0x334c3e = _0x54de68['JxMsn'](_0x581955, 0x1);
                                                    } else {
                                                        console['log']('doQuestion 领取答题任务奖励 结果:' + _0x125645);
                                                        _0x125645 = JSON['parse'](_0x125645);
                                                        if (_0x125645 && _0x588ddc['mAmai'](_0x125645[_0x588ddc['VEfmO']], 0xc8)) {
                                                            if (_0x125645[_0x588ddc['kneKy']][_0x588ddc['icnwK']]) $['beans'] += _0x125645[_0x588ddc['kneKy']][_0x588ddc['icnwK']];
                                                        }
                                                    }
                                                }
                                            }
                                            if (_0x54de68['YsRBQ'](_0x334c3e, 0x0)) {
                                                if (_0x54de68['RaPuj'](_0x54de68['bcmbU'], _0x54de68['wJKWf'])) {
                                                    await _0x54de68['tzUXz'](doQuestion, _0x8a4b53, $['questionTask']['id'], _0x334c3e);
                                                } else {
                                                    _0x48cc28['OqQXt'](_0x327182);
                                                }
                                            }
                                        } else {
                                            $['logErr'](e, _0x1bbbb4);
                                        }
                                    }
                                } else {
                                    $['logErr'](e, _0x1bbbb4);
                                }
                            } else {
                                if (_0x54de68['cXvCd'](_0x54de68['RvIcu'], _0x54de68['EzQwe'])) {
                                    console['log']('失败：' + JSON['stringify'](_0x125645));
                                } else {
                                    console['log']('' + JSON['stringify'](_0x58379e));
                                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                                }
                            }
                        }
                    } else {
                        _0x588ddc['FcWWm'](_0x327182, _0x125645);
                    }
                } catch (_0x142e2f) {
                    if (_0x54de68['sNScu'](_0x54de68['TahVz'], _0x54de68['qdDID'])) {
                        _0x588ddc['plRAk'](_0x327182);
                    } else {
                        $['logErr'](_0x142e2f, _0x1bbbb4);
                    }
                } finally {
                    _0x54de68['jagFo'](_0x327182, _0x125645);
                }
            }
        });
    });
}

function doQuestion(_0x21546e, _0x50f849, _0x501aca) {
    var _0x7339bf = {
        'pQYvN': function(_0x27321c, _0x4c982e) {
            return _0x27321c === _0x4c982e;
        },
        'WBnvM': 'function',
        'sDwUf': function(_0x369b08, _0xf0a2d9) {
            return _0x369b08 === _0xf0a2d9;
        },
        'KfjZG': function(_0x418212, _0x56902f) {
            return _0x418212 !== _0x56902f;
        },
        'AvoAZ': 'symbol',
        'GLAEQ': function(_0x414c14, _0x27b151) {
            return _0x414c14(_0x27b151);
        },
        'zLFTi': function(_0x42bb9f, _0x1d6bd2) {
            return _0x42bb9f === _0x1d6bd2;
        },
        'AedSV': 'AhrgJ',
        'YufRL': 'KRTmB',
        'jwvsK': 'code',
        'voVpj': 'ARCcM',
        'LaKIN': 'data',
        'AUumj': 'jingBean',
        'rbRIj': 'jLjfQ',
        'cVvpC': 'pLCwE',
        'DcZZJ': 'QVdwG',
        'BhfVP': 'tjbxJ',
        'CvaeB': 'PVlhE',
        'DWMLo': function(_0x26fcf8, _0x10c23d, _0x4f796d) {
            return _0x26fcf8(_0x10c23d, _0x4f796d);
        },
        'QaGEI': '/khc/task/doQuestion'
    };
    return new Promise(_0x2d5895 => {
        var _0x2c0ff2 = {
            'jBBaD': function(_0x5191ac, _0x18b8a3) {
                return _0x7339bf['GLAEQ'](_0x5191ac, _0x18b8a3);
            },
            'VtfKv': function(_0x562bf0, _0x5ab27a) {
                return _0x7339bf['zLFTi'](_0x562bf0, _0x5ab27a);
            },
            'pIKOM': function(_0x682c9c, _0x41e49b) {
                return _0x7339bf['KfjZG'](_0x682c9c, _0x41e49b);
            },
            'hRvnP': _0x7339bf['AedSV'],
            'cFGJG': _0x7339bf['YufRL'],
            'PYUOy': _0x7339bf['jwvsK'],
            'XTSqZ': function(_0x1a2c4c, _0x5a56b9) {
                return _0x7339bf['KfjZG'](_0x1a2c4c, _0x5a56b9);
            },
            'jcSLL': _0x7339bf['voVpj'],
            'uQcMj': _0x7339bf['LaKIN'],
            'pPagG': _0x7339bf['AUumj'],
            'tbHKJ': function(_0x536b46, _0x59ad8d) {
                return _0x7339bf['KfjZG'](_0x536b46, _0x59ad8d);
            },
            'plvRq': _0x7339bf['rbRIj'],
            'wuTdi': _0x7339bf['cVvpC'],
            'ZCzRE': _0x7339bf['DcZZJ'],
            'rdGNK': _0x7339bf['BhfVP'],
            'eslET': function(_0x1be0c5, _0x230710) {
                return _0x7339bf['GLAEQ'](_0x1be0c5, _0x230710);
            }
        };
        if (_0x7339bf['zLFTi'](_0x7339bf['CvaeB'], _0x7339bf['CvaeB'])) {
            const _0x241bc5 = 'brandId=' + _0x21546e + '&questionId=' + _0x50f849 + '&result=' + _0x501aca;
            const _0xe237ee = _0x7339bf['DWMLo'](taskPostUrl, _0x7339bf['QaGEI'], _0x241bc5);
            $['post'](_0xe237ee, (_0x2754b1, _0x1e5a95, _0x24c4f2) => {
                var _0x35fb16 = {
                    'JwNea': function(_0x2c38ec, _0x5adce1) {
                        return _0x2c0ff2['jBBaD'](_0x2c38ec, _0x5adce1);
                    },
                    'KRmXy': function(_0x2ab1a5, _0x4a52ad) {
                        return _0x2c0ff2['VtfKv'](_0x2ab1a5, _0x4a52ad);
                    }
                };
                try {
                    if (_0x2754b1) {
                        if (_0x2c0ff2['pIKOM'](_0x2c0ff2['hRvnP'], _0x2c0ff2['cFGJG'])) {
                            console['log']('' + JSON['stringify'](_0x2754b1));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            _0x35fb16['JwNea'](_0x2d5895, _0x24c4f2);
                        }
                    } else {
                        console['log']('doQuestion 领取答题任务奖励 结果:' + _0x24c4f2);
                        _0x24c4f2 = JSON['parse'](_0x24c4f2);
                        if (_0x24c4f2 && _0x2c0ff2['VtfKv'](_0x24c4f2[_0x2c0ff2['PYUOy']], 0xc8)) {
                            if (_0x2c0ff2['XTSqZ'](_0x2c0ff2['jcSLL'], _0x2c0ff2['jcSLL'])) {
                                console['log']('获取邀请码失败：' + JSON['stringify'](_0x24c4f2));
                                if (_0x35fb16['KRmXy'](_0x24c4f2['code'], 0x3ea)) $['blockAccount'] = !![];
                            } else {
                                if (_0x24c4f2[_0x2c0ff2['uQcMj']][_0x2c0ff2['pPagG']]) $['beans'] += _0x24c4f2[_0x2c0ff2['uQcMj']][_0x2c0ff2['pPagG']];
                            }
                        }
                    }
                } catch (_0x462c44) {
                    if (_0x2c0ff2['tbHKJ'](_0x2c0ff2['plvRq'], _0x2c0ff2['wuTdi'])) {
                        $['logErr'](_0x462c44, _0x1e5a95);
                    } else {
                        $['integralCount'] = _0x24c4f2['data']['integralNum'];
                        message += '累计获得积分：' + $['integralCount'] + '\x0a';
                    }
                } finally {
                    if (_0x2c0ff2['VtfKv'](_0x2c0ff2['ZCzRE'], _0x2c0ff2['rdGNK'])) {
                        shareCodes = process['env']['JD818_SHARECODES']['split']('\x0a');
                    } else {
                        _0x2c0ff2['eslET'](_0x2d5895, _0x24c4f2);
                    }
                }
            });
        } else {
            return t && _0x7339bf['pQYvN'](_0x7339bf['WBnvM'], typeof Symbol) && _0x7339bf['sDwUf'](t['constructor'], Symbol) && _0x7339bf['KfjZG'](t, Symbol['prototype']) ? _0x7339bf['AvoAZ'] : typeof t;
        }
    });
}
async function doBrowseshopTask() {
    var _0x205655 = {
        'OPNMl': function(_0x3f4e3f, _0x9f5d99) {
            return _0x3f4e3f !== _0x9f5d99;
        },
        'Dgjyy': 'AJSFH',
        'wAypp': function(_0x135cd2, _0x586031, _0xae0be2, _0x1c7533, _0x5bb5d5, _0x43a172) {
            return _0x135cd2(_0x586031, _0xae0be2, _0x1c7533, _0x5bb5d5, _0x43a172);
        },
        'vOxuW': 'browseShop',
        'yPOOW': 'browse',
        'sECyS': function(_0x5d5ecd, _0x3a215d) {
            return _0x5d5ecd(_0x3a215d);
        }
    };
    $['browseshopList'] = $['browseshopList']['filter'](_0x5727d3 => !!_0x5727d3 && _0x5727d3['status'] === '6');
    if ($['browseshopList'] && $['browseshopList']['length']) console['log']('\n开始 【逛好货街，做任务】，需等待10秒');
    for (let _0x32b279 of $['browseshopList']) {
        if (_0x205655['OPNMl'](_0x205655['Dgjyy'], _0x205655['Dgjyy'])) {
            console['log']('失败：' + JSON['stringify'](data));
        } else {
            await _0x205655['wAypp'](doBrowse, _0x32b279['id'], '', _0x205655['vOxuW'], _0x205655['yPOOW'], _0x205655['vOxuW']);
            await $['wait'](0x2710);
            if ($['browseId']) {
                await _0x205655['sECyS'](getBrowsePrize, $['browseId']);
            }
        }
    }
}

function indexInfo(_0x17822d = ![]) {
    var _0x4d2cf3 = {
        'gVeqt': function(_0x3ef8ef, _0x4230af) {
            return _0x3ef8ef > _0x4230af;
        },
        'rbjwo': 'data',
        'kRDjp': 'jingBean',
        'LrCIC': function(_0x108e24, _0x59eafe) {
            return _0x108e24 !== _0x59eafe;
        },
        'EhWxq': 'GtaPk',
        'XVeVa': 'wKcmn',
        'jPfzH': function(_0x374317, _0x17655a) {
            return _0x374317 === _0x17655a;
        },
        'SqRHo': 'YitYj',
        'YoCji': 'hotProductList',
        'VneeS': 'brandList',
        'MAHLp': 'browseshopList',
        'IbZLL': 'supportedNums',
        'cBKLL': 'supportNeedNums',
        'INcpQ': 'UxoEd',
        'wlMnV': 'IqEgt',
        'sTOwn': function(_0x3dfdbf) {
            return _0x3dfdbf();
        },
        'RxDtw': function(_0x8225f1, _0x289098, _0x22f417) {
            return _0x8225f1(_0x289098, _0x22f417);
        },
        'sFtkX': '/khc/index/indexInfo'
    };
    const _0x393972 = _0x4d2cf3['RxDtw'](taskUrl, _0x4d2cf3['sFtkX'], {
        't': Date['now']()
    });
    $['hotProductList'] = [];
    $['brandList'] = [];
    $['browseshopList'] = [];
    return new Promise(_0x3df518 => {
        var _0x16ba57 = {
            'GwpDP': function(_0xed73e, _0x36e438) {
                return _0x4d2cf3['gVeqt'](_0xed73e, _0x36e438);
            },
            'NHwox': _0x4d2cf3['rbjwo'],
            'OiEHv': _0x4d2cf3['kRDjp'],
            'DhgKm': function(_0x2cf006, _0x4658b) {
                return _0x4d2cf3['LrCIC'](_0x2cf006, _0x4658b);
            },
            'oXLKr': _0x4d2cf3['EhWxq'],
            'joWSw': _0x4d2cf3['XVeVa'],
            'TBRDs': function(_0x4022aa, _0x337e5b) {
                return _0x4d2cf3['jPfzH'](_0x4022aa, _0x337e5b);
            },
            'aVGCU': function(_0x4e16dd, _0x33d6b3) {
                return _0x4d2cf3['jPfzH'](_0x4e16dd, _0x33d6b3);
            },
            'WmOnK': _0x4d2cf3['SqRHo'],
            'GtOEV': _0x4d2cf3['YoCji'],
            'sTwlw': _0x4d2cf3['VneeS'],
            'LtKUo': _0x4d2cf3['MAHLp'],
            'xFTLC': _0x4d2cf3['IbZLL'],
            'ZmYpx': _0x4d2cf3['cBKLL'],
            'zVsbl': function(_0x46a415, _0x396a05) {
                return _0x4d2cf3['jPfzH'](_0x46a415, _0x396a05);
            },
            'VjPjR': _0x4d2cf3['INcpQ'],
            'mbwjp': _0x4d2cf3['wlMnV'],
            'Rqqdn': function(_0x22c03c) {
                return _0x4d2cf3['sTOwn'](_0x22c03c);
            }
        };
        $['get'](_0x393972, async (_0x1ada38, _0xf3f6d6, _0x5aeb1d) => {
            try {
                if (_0x16ba57['DhgKm'](_0x16ba57['oXLKr'], _0x16ba57['oXLKr'])) {
                    if (process['env']['JD818_SHARECODES']) {
                        if (_0x16ba57['GwpDP'](process['env']['JD818_SHARECODES']['indexOf']('\x0a'), -0x1)) {
                            shareCodes = process['env']['JD818_SHARECODES']['split']('\x0a');
                        } else {
                            shareCodes = process['env']['JD818_SHARECODES']['split']('&');
                        }
                    }
                } else {
                    if (_0x1ada38) {
                        if (_0x16ba57['DhgKm'](_0x16ba57['joWSw'], _0x16ba57['joWSw'])) {
                            console['log']('' + JSON['stringify'](_0x1ada38));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            console['log']('' + JSON['stringify'](_0x1ada38));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        }
                    } else {
                        _0x5aeb1d = JSON['parse'](_0x5aeb1d);
                        if (_0x16ba57['TBRDs'](_0x5aeb1d['code'], 0xc8)) {
                            if (_0x16ba57['aVGCU'](_0x16ba57['WmOnK'], _0x16ba57['WmOnK'])) {
                                $['hotProductList'] = _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['GtOEV']];
                                $['brandList'] = _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['sTwlw']];
                                $['browseshopList'] = _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['LtKUo']];
                                if (_0x17822d) {
                                    console['log']('助力情况：' + _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['xFTLC']] + '/' + _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['ZmYpx']]);
                                    message += '邀请好友助力：' + _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['xFTLC']] + '/' + _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['ZmYpx']] + '\x0a';
                                }
                            } else {
                                _0x5aeb1d = JSON['parse'](_0x5aeb1d);
                            }
                        } else {
                            console['log']('异常：' + JSON['stringify'](_0x5aeb1d));
                        }
                    }
                }
            } catch (_0x249aa5) {
                if (_0x16ba57['zVsbl'](_0x16ba57['VjPjR'], _0x16ba57['mbwjp'])) {
                    if (_0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['OiEHv']]) $['beans'] += _0x5aeb1d[_0x16ba57['NHwox']][_0x16ba57['OiEHv']];
                } else {
                    $['logErr'](_0x249aa5, _0xf3f6d6);
                }
            } finally {
                _0x16ba57['Rqqdn'](_0x3df518);
            }
        });
    });
}

function myRank() {
    var _0x5c9a32 = {
        'oBezU': function(_0x14cb7e, _0x5b2a21) {
            return _0x14cb7e === _0x5b2a21;
        },
        'PPKOh': 'code',
        'qsRsQ': 'data',
        'IUATS': 'status',
        'kgTws': 'jdNums',
        'RbTaQ': function(_0x16d916, _0x45f862) {
            return _0x16d916(_0x45f862);
        },
        'EAsZo': function(_0x1b8d9e) {
            return _0x1b8d9e();
        },
        'cCEOT': 'answers',
        'UsWfM': 'right',
        'KXTQp': function(_0x36efea, _0x104a90) {
            return _0x36efea + _0x104a90;
        },
        'RuOkE': 'EqmeC',
        'xvcPv': 'Tbzat',
        'GNFJC': 'CiDcT',
        'IRGcx': 'yUKQn',
        'ZVdol': function(_0x4a26d6, _0x4aeda5) {
            return _0x4a26d6 === _0x4aeda5;
        },
        'cegKD': 'rKvRh',
        'FJHXz': 'YZiwW',
        'DVQMi': function(_0x1a0079, _0x1fa180) {
            return _0x1a0079 < _0x1fa180;
        },
        'xTBMW': 'date',
        'fcbsb': 'prizeName',
        'XnLMG': function(_0x5da4d0, _0xf7f7c0) {
            return _0x5da4d0 !== _0xf7f7c0;
        },
        'RKndX': 'ybiXk',
        'HwjLN': function(_0x5641f5, _0x45a0f8) {
            return _0x5641f5(_0x45a0f8);
        },
        'SchQE': function(_0x1a323b, _0xe50736) {
            return _0x1a323b === _0xe50736;
        },
        'AMoew': function(_0x2ecdd5, _0x3d5622) {
            return _0x2ecdd5 !== _0x3d5622;
        },
        'HwSIf': 'mAqBd',
        'jChLB': 'vunEu',
        'bjSdE': 'azYbz',
        'FXoNx': 'ulReS',
        'XAWVZ': function(_0x3f16bd, _0x48e364) {
            return _0x3f16bd(_0x48e364);
        },
        'DeHLt': function(_0xff21e7, _0x18e55f) {
            return _0xff21e7 + _0x18e55f;
        },
        'petVg': '07035cabb557f09a5',
        'vnkpC': 'application/json, text/plain, */*',
        'tzzjL': 'gzip, deflate, br',
        'fjMyx': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'fJJDc': 'https://carnivalcity.m.jd.com/',
        'zawZb': 'empty',
        'QTKIR': 'cors',
        'txmlQ': 'same-origin',
        'xwcTk': 'jdapp;android;9.4.4;10;3b78ecc3f490c7ba;network/UNKNOWN;model/M2006J10C;addressid/138543439;aid/3b78ecc3f490c7ba;oaid/7d5870c5a1696881;osVer/29;appBuild/85576;psn/3b78ecc3f490c7ba|541;psq/2;uid/3b78ecc3f490c7ba;adk/;ads/;pap/JA2015_311210|9.2.4|ANDROID 10;osv/10;pv/548.2;jdv/0|iosapp|t_335139774|appshare|CopyURL|1606277982178|1606277986;ref/com.jd.lib.personal.view.fragment.JDPersonalFragment;partner/xiaomi001;apprpd/MyJD_Main;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36',
        'BVnrY': function(_0x156eae, _0x4ad7cb, _0x29cbeb, _0x8e70a5) {
            return _0x156eae(_0x4ad7cb, _0x29cbeb, _0x8e70a5);
        },
        'OPmCx': function(_0x332a0a, _0x2c164c) {
            return _0x332a0a === _0x2c164c;
        },
        'tBxZJ': 'QJYHv',
        'oCqBF': 'OLIWc',
        'uvbDX': function(_0x49b96c, _0x3a3558, _0x26d1c1) {
            return _0x49b96c(_0x3a3558, _0x26d1c1);
        },
        'ibjxO': '/khc/rank/myPastRanks'
    };
    return new Promise(_0x15927e => {
        var _0x3860c6 = {
            'yoiRn': function(_0x458568, _0x5a6349) {
                return _0x5c9a32['KXTQp'](_0x458568, _0x5a6349);
            },
            'klweI': function(_0x2757f1, _0x178c7e) {
                return _0x5c9a32['KXTQp'](_0x2757f1, _0x178c7e);
            },
            'HSGik': function(_0x2e61a5, _0x2d0add) {
                return _0x5c9a32['DeHLt'](_0x2e61a5, _0x2d0add);
            },
            'JgDpy': function(_0x2c7a41, _0x4ad61e) {
                return _0x5c9a32['AMoew'](_0x2c7a41, _0x4ad61e);
            },
            'dXBHv': _0x5c9a32['petVg'],
            'PfLrP': _0x5c9a32['vnkpC'],
            'DHRuS': _0x5c9a32['tzzjL'],
            'lkywj': _0x5c9a32['fjMyx'],
            'pfJnj': _0x5c9a32['fJJDc'],
            'nckQq': _0x5c9a32['zawZb'],
            'zJZdW': _0x5c9a32['QTKIR'],
            'IkNRo': _0x5c9a32['txmlQ'],
            'WgWhF': _0x5c9a32['xwcTk'],
            'zfnWr': function(_0x31eede, _0x529dd8, _0x2744db, _0x20a443) {
                return _0x5c9a32['BVnrY'](_0x31eede, _0x529dd8, _0x2744db, _0x20a443);
            }
        };
        if (_0x5c9a32['OPmCx'](_0x5c9a32['tBxZJ'], _0x5c9a32['oCqBF'])) {
            var _0x407f83 = [];
            for (var _0x4b2767 in t) _0x407f83['push'](_0x3860c6['yoiRn'](_0x3860c6['klweI'](_0x4b2767, '='), t[_0x4b2767]));
            a = _0x407f83['length'] ? _0x3860c6['HSGik'](_0x407f83['join']('&'), i) : i;
        } else {
            const _0x3d9699 = {
                't': Date['now']()
            };
            const _0x15cb89 = _0x5c9a32['uvbDX'](taskUrl, _0x5c9a32['ibjxO'], _0x3d9699);
            $['get'](_0x15cb89, async (_0xba4d34, _0x5df487, _0x12acb3) => {
                var _0x4e5486 = {
                    'lyceZ': function(_0x5941ef, _0x3c6d2c) {
                        return _0x5c9a32['oBezU'](_0x5941ef, _0x3c6d2c);
                    },
                    'XzbBJ': _0x5c9a32['PPKOh'],
                    'dGbfa': _0x5c9a32['qsRsQ'],
                    'IzpvM': _0x5c9a32['IUATS'],
                    'HGLDH': _0x5c9a32['kgTws'],
                    'bMZxL': function(_0xf29029, _0x115574) {
                        return _0x5c9a32['RbTaQ'](_0xf29029, _0x115574);
                    },
                    'zXrnf': function(_0x1d76ac) {
                        return _0x5c9a32['EAsZo'](_0x1d76ac);
                    },
                    'hyZvz': _0x5c9a32['cCEOT'],
                    'vPUUy': _0x5c9a32['UsWfM'],
                    'stLjD': function(_0x37ff11, _0x183ac7) {
                        return _0x5c9a32['KXTQp'](_0x37ff11, _0x183ac7);
                    }
                };
                try {
                    if (_0x5c9a32['oBezU'](_0x5c9a32['RuOkE'], _0x5c9a32['xvcPv'])) {
                        if (_0xba4d34) {
                            console['log']('' + JSON['stringify'](_0xba4d34));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            console['log']('助力结果:' + _0x12acb3);
                            _0x12acb3 = JSON['parse'](_0x12acb3);
                            if (_0x12acb3 && _0x4e5486['lyceZ'](_0x12acb3[_0x4e5486['XzbBJ']], 0xc8)) {
                                if (_0x4e5486['lyceZ'](_0x12acb3[_0x4e5486['dGbfa']][_0x4e5486['IzpvM']], 0x6)) console['log']('助力成功\n');
                                if (_0x12acb3[_0x4e5486['dGbfa']][_0x4e5486['HGLDH']]) $['beans'] += _0x12acb3[_0x4e5486['dGbfa']][_0x4e5486['HGLDH']];
                            }
                        }
                    } else {
                        if (_0xba4d34) {
                            console['log']('' + JSON['stringify'](_0xba4d34));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x5c9a32['oBezU'](_0x5c9a32['GNFJC'], _0x5c9a32['IRGcx'])) {
                                var _0x3178f3 = {
                                    'yQLmP': function(_0x596272, _0x142f03) {
                                        return _0x3860c6['JgDpy'](_0x596272, _0x142f03);
                                    },
                                    'GoQoa': function(_0x9826e, _0x288da0) {
                                        return _0x3860c6['HSGik'](_0x9826e, _0x288da0);
                                    }
                                };
                                const _0x24599e = Date['now']()['toString']();
                                let _0xe2d1fc = _0x3860c6['HSGik'](_0x3860c6['dXBHv'], _0x24599e);
                                let _0x3a3f3f = '';
                                const _0x4f0c83 = Object['keys'](a);
                                _0x4f0c83['map']((_0x345ff7, _0x1fecd6) => {
                                    _0x3a3f3f += _0x345ff7 + '=' + a[_0x345ff7] + (_0x3178f3['yQLmP'](_0x3178f3['GoQoa'](_0x1fecd6, 0x1), _0x4f0c83['length']) ? '&' : '');
                                });
                                return {
                                    'url': '' + JD_API_HOST + t + '?' + _0x3a3f3f,
                                    'headers': {
                                        'accept': _0x3860c6['PfLrP'],
                                        'accept-encoding': _0x3860c6['DHRuS'],
                                        'accept-language': _0x3860c6['lkywj'],
                                        'referer': _0x3860c6['pfJnj'],
                                        'sec-fetch-dest': _0x3860c6['nckQq'],
                                        'sec-fetch-mode': _0x3860c6['zJZdW'],
                                        'sec-fetch-site': _0x3860c6['IkNRo'],
                                        'Cookie': cookie,
                                        'User-Agent': _0x3860c6['WgWhF'],
                                        'sign': _0x3860c6['zfnWr'](za, a, _0xe2d1fc, t)['toString'](),
                                        'timestamp': _0x24599e
                                    }
                                };
                            } else {
                                _0x12acb3 = JSON['parse'](_0x12acb3);
                                if (_0x5c9a32['ZVdol'](_0x12acb3['code'], 0xc8)) {
                                    if (_0x5c9a32['ZVdol'](_0x5c9a32['cegKD'], _0x5c9a32['FJHXz'])) {
                                        _0x4e5486['bMZxL'](_0x15927e, _0x12acb3);
                                    } else {
                                        if (_0x12acb3['data'] && _0x12acb3['data']['length']) {
                                            for (let _0x12fba4 = 0x0; _0x5c9a32['DVQMi'](_0x12fba4, _0x12acb3['data']['length']); _0x12fba4++) {
                                                $['date'] = _0x12acb3['data'][_0x12fba4][_0x5c9a32['xTBMW']];
                                                if (_0x5c9a32['ZVdol'](_0x12acb3['data'][_0x12fba4]['status'], '1')) {
                                                    console['log']('开始领取往期奖励【' + _0x12acb3['data'][_0x12fba4][_0x5c9a32['fcbsb']] + '】');
                                                    let _0x267d34 = await _0x5c9a32['RbTaQ'](saveJbean, $['date']);
                                                    if (_0x267d34 && _0x5c9a32['ZVdol'](_0x267d34['code'], 0xc8)) {
                                                        if (_0x5c9a32['XnLMG'](_0x5c9a32['RKndX'], _0x5c9a32['RKndX'])) {
                                                            console['log']('' + JSON['stringify'](_0xba4d34));
                                                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                                                        } else {
                                                            $['beans'] += _0x5c9a32['HwjLN'](Number, _0x267d34['data']);
                                                            console['log'](_0x12acb3['data'][_0x12fba4][_0x5c9a32['xTBMW']] + '日 【' + _0x267d34['data'] + '】京豆奖励领取成功');
                                                        }
                                                    } else {
                                                        console['log']('往期奖励领取失败：' + JSON['stringify'](_0x267d34));
                                                    }
                                                    await $['wait'](0x1f4);
                                                } else if (_0x5c9a32['SchQE'](_0x12acb3['data'][_0x12fba4]['status'], '3')) {
                                                    if (_0x5c9a32['AMoew'](_0x5c9a32['HwSIf'], _0x5c9a32['jChLB'])) {
                                                        console['log'](_0x12acb3['data'][_0x12fba4][_0x5c9a32['xTBMW']] + '日 【' + _0x12acb3['data'][_0x12fba4][_0x5c9a32['fcbsb']] + '】往期京豆奖励已领取~');
                                                    } else {
                                                        console['log']('' + JSON['stringify'](_0xba4d34));
                                                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                                                    }
                                                } else {
                                                    console['log'](_0x12acb3['data'][_0x12fba4][_0x5c9a32['xTBMW']] + '日 【' + _0x12acb3['data'][_0x12fba4][_0x5c9a32['IUATS']] + '】往期京豆奖励，今日争取进入前30000名哦~');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (_0x55dd0c) {
                    if (_0x5c9a32['AMoew'](_0x5c9a32['bjSdE'], _0x5c9a32['bjSdE'])) {
                        _0x4e5486['zXrnf'](_0x15927e);
                    } else {
                        $['logErr'](_0x55dd0c, _0x5df487);
                    }
                } finally {
                    if (_0x5c9a32['SchQE'](_0x5c9a32['FXoNx'], _0x5c9a32['FXoNx'])) {
                        _0x5c9a32['XAWVZ'](_0x15927e, _0x12acb3);
                    } else {
                        if ($['questionTask'][_0x4e5486['hyZvz']][i][_0x4e5486['vPUUy']]) {
                            result = _0x4e5486['stLjD'](i, 0x1);
                        }
                    }
                }
            });
        }
    });
}

function saveJbean(_0x395f2c) {
    var _0x51b990 = {
        'xeTEM': function(_0x580836, _0x7f5317) {
            return _0x580836 === _0x7f5317;
        },
        'SgDNk': 'code',
        'lawPG': 'data',
        'hSPfL': 'jingBean',
        'trIBy': 'browseId',
        'SGsCZ': function(_0x20f19e, _0x171d28) {
            return _0x20f19e !== _0x171d28;
        },
        'ijZok': 'dKHIS',
        'nCPlG': 'mQujY',
        'QdFvG': function(_0x57cba2, _0x31ea5a) {
            return _0x57cba2 !== _0x31ea5a;
        },
        'ssGsx': 'dUDTh',
        'hPHOo': 'avgEn',
        'Nmpwg': function(_0x18b902, _0x28e80e) {
            return _0x18b902(_0x28e80e);
        },
        'OEAaX': function(_0x1fb7a0, _0x79f48c) {
            return _0x1fb7a0 + _0x79f48c;
        },
        'NpTYD': 'date=',
        'bzcql': function(_0x3461f1, _0x24b324, _0xd4c27c) {
            return _0x3461f1(_0x24b324, _0xd4c27c);
        },
        'OKTrz': '/khc/rank/getRankJingBean'
    };
    return new Promise(_0x285abe => {
        var _0x3072a2 = {
            'bFyWV': function(_0x577cf1, _0x254e1a) {
                return _0x51b990['xeTEM'](_0x577cf1, _0x254e1a);
            },
            'WNqOi': _0x51b990['SgDNk'],
            'zqwCU': _0x51b990['lawPG'],
            'sQXFF': _0x51b990['hSPfL'],
            'APjLS': function(_0x1fc073, _0xaf1f2c) {
                return _0x51b990['xeTEM'](_0x1fc073, _0xaf1f2c);
            },
            'qEtUI': _0x51b990['trIBy'],
            'GTWzD': function(_0x3cf1f0, _0x432728) {
                return _0x51b990['SGsCZ'](_0x3cf1f0, _0x432728);
            },
            'gOjFK': _0x51b990['ijZok'],
            'SpIzr': _0x51b990['nCPlG'],
            'rCazY': function(_0x1293b0, _0x455207) {
                return _0x51b990['QdFvG'](_0x1293b0, _0x455207);
            },
            'Vrcls': _0x51b990['ssGsx'],
            'iPLhB': _0x51b990['hPHOo'],
            'hBVeW': function(_0x1cabc4, _0x38819f) {
                return _0x51b990['Nmpwg'](_0x1cabc4, _0x38819f);
            }
        };
        const _0x156852 = _0x51b990['OEAaX'](_0x51b990['NpTYD'], _0x395f2c);
        const _0x463e01 = _0x51b990['bzcql'](taskPostUrl, _0x51b990['OKTrz'], _0x156852);
        $['post'](_0x463e01, (_0x26fe08, _0x58f6c8, _0x31a21c) => {
            var _0x519697 = {
                'Jemaa': function(_0x10dc72, _0x4d35cf) {
                    return _0x3072a2['APjLS'](_0x10dc72, _0x4d35cf);
                },
                'kpENl': _0x3072a2['WNqOi'],
                'zdVZI': _0x3072a2['zqwCU'],
                'EZKFD': _0x3072a2['qEtUI']
            };
            try {
                if (_0x3072a2['GTWzD'](_0x3072a2['gOjFK'], _0x3072a2['SpIzr'])) {
                    if (_0x26fe08) {
                        console['log']('' + JSON['stringify'](_0x26fe08));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        _0x31a21c = JSON['parse'](_0x31a21c);
                    }
                } else {
                    console['log']('doBrowse 做' + taskMark + '任务:' + _0x31a21c);
                    _0x31a21c = JSON['parse'](_0x31a21c);
                    if (_0x31a21c && _0x519697['Jemaa'](_0x31a21c[_0x519697['kpENl']], 0xc8)) {
                        $['browseId'] = _0x31a21c[_0x519697['zdVZI']][_0x519697['EZKFD']] || '';
                    } else {
                        console['log']('doBrowse异常');
                    }
                }
            } catch (_0x19cb61) {
                $['logErr'](_0x19cb61, _0x58f6c8);
            } finally {
                if (_0x3072a2['rCazY'](_0x3072a2['Vrcls'], _0x3072a2['iPLhB'])) {
                    _0x3072a2['hBVeW'](_0x285abe, _0x31a21c);
                } else {
                    if (_0x26fe08) {
                        console['log']('' + JSON['stringify'](_0x26fe08));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        console['log']('doQuestion 领取答题任务奖励 结果:' + _0x31a21c);
                        _0x31a21c = JSON['parse'](_0x31a21c);
                        if (_0x31a21c && _0x3072a2['bFyWV'](_0x31a21c[_0x3072a2['WNqOi']], 0xc8)) {
                            if (_0x31a21c[_0x3072a2['zqwCU']][_0x3072a2['sQXFF']]) $['beans'] += _0x31a21c[_0x3072a2['zqwCU']][_0x3072a2['sQXFF']];
                        }
                    }
                }
            }
        });
    });
}
async function doHelp() {
    var _0x3d0c03 = {
        'nGlZD': function(_0x4659b0, _0x26696f) {
            return _0x4659b0(_0x26696f);
        },
        'tQMfo': function(_0x49b1ce, _0x2e90ae) {
            return _0x49b1ce === _0x2e90ae;
        }
    };
    console['log']('\n开始助力好友');
    for (let _0x12b911 of $['newShareCodes']) {
        if (!_0x12b911) continue;
        const _0x504d28 = await _0x3d0c03['nGlZD'](toHelp, _0x12b911['trim']());
        if (_0x3d0c03['tQMfo'](_0x504d28['data']['status'], 0x5)) {
            console['log']('助力机会已耗尽，跳出助力');
            break;
        }
    }
}

function toHelp(_0x28b98f = 'b251f579-82ec-4a10-a2be-4621ae4fd73f') {
    var _0x42a6c6 = {
        'QWAVI': function(_0x1b1f99, _0x553ab7) {
            return _0x1b1f99 === _0x553ab7;
        },
        'wsZrN': function(_0x3937b8, _0x199b61) {
            return _0x3937b8 !== _0x199b61;
        },
        'wtLXm': 'hytrZ',
        'HMLRr': 'code',
        'GRapp': function(_0x5a3948, _0x38a77f) {
            return _0x5a3948 !== _0x38a77f;
        },
        'GfgYr': 'fXaGW',
        'Itbws': 'mOnLk',
        'xthQN': 'data',
        'yxqPu': 'status',
        'foGCY': 'jdNums',
        'nRbAq': function(_0x312cdd, _0x292554) {
            return _0x312cdd(_0x292554);
        },
        'nNgMy': function(_0x356227, _0x51ea94) {
            return _0x356227 + _0x51ea94;
        },
        'kDgVN': 'shareId=',
        'sPbSj': function(_0x226de7, _0x2e4734, _0x4885fa) {
            return _0x226de7(_0x2e4734, _0x4885fa);
        },
        'ptJLw': '/khc/task/doSupport'
    };
    return new Promise(_0x125fef => {
        const _0x528727 = _0x42a6c6['nNgMy'](_0x42a6c6['kDgVN'], _0x28b98f);
        const _0x3077eb = _0x42a6c6['sPbSj'](taskPostUrl, _0x42a6c6['ptJLw'], _0x528727);
        $['post'](_0x3077eb, (_0x2fde4d, _0x1d261b, _0x12e66c) => {
            var _0x74bbe1 = {
                'zLdHJ': function(_0x2903a9, _0x4c3e04) {
                    return _0x42a6c6['QWAVI'](_0x2903a9, _0x4c3e04);
                }
            };
            try {
                if (_0x42a6c6['wsZrN'](_0x42a6c6['wtLXm'], _0x42a6c6['wtLXm'])) {
                    _0x12e66c = JSON['parse'](_0x12e66c);
                    if (_0x74bbe1['zLdHJ'](_0x12e66c['code'], 0xc8)) {
                        console['log']('\x0a\x0a' + $['name'] + '互助码每天都变化,旧的不可继续使用');
                        $['log']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】' + _0x12e66c['data']['shareId'] + '\x0a\x0a');
                        $['temp']['push'](_0x12e66c['data']['shareId']);
                    } else {
                        console['log']('获取邀请码失败：' + JSON['stringify'](_0x12e66c));
                        if (_0x74bbe1['zLdHJ'](_0x12e66c['code'], 0x3ea)) $['blockAccount'] = !![];
                    }
                } else {
                    if (_0x2fde4d) {
                        console['log']('' + JSON['stringify'](_0x2fde4d));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        console['log']('助力结果:' + _0x12e66c);
                        _0x12e66c = JSON['parse'](_0x12e66c);
                        if (_0x12e66c && _0x42a6c6['QWAVI'](_0x12e66c[_0x42a6c6['HMLRr']], 0xc8)) {
                            if (_0x42a6c6['GRapp'](_0x42a6c6['GfgYr'], _0x42a6c6['Itbws'])) {
                                if (_0x42a6c6['QWAVI'](_0x12e66c[_0x42a6c6['xthQN']][_0x42a6c6['yxqPu']], 0x6)) console['log']('助力成功\n');
                                if (_0x12e66c[_0x42a6c6['xthQN']][_0x42a6c6['foGCY']]) $['beans'] += _0x12e66c[_0x42a6c6['xthQN']][_0x42a6c6['foGCY']];
                            } else {
                                if (_0x2fde4d) {
                                    console['log']('' + JSON['stringify'](_0x2fde4d));
                                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                                } else {
                                    if (_0x12e66c) {
                                        _0x12e66c = JSON['parse'](_0x12e66c);
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (_0x58669c) {
                $['logErr'](_0x58669c, _0x1d261b);
            } finally {
                _0x42a6c6['nRbAq'](_0x125fef, _0x12e66c);
            }
        });
    });
}

function getHelp() {
    var _0x2425b6 = {
        'cSfHl': function(_0x35cd77, _0x18f3d2) {
            return _0x35cd77 !== _0x18f3d2;
        },
        'OMrgw': 'ollnJ',
        'RCeng': function(_0x41de66, _0x4bea45) {
            return _0x41de66 !== _0x4bea45;
        },
        'kpvre': 'itnYo',
        'KUHKD': 'SStuV',
        'gAqyl': function(_0x16e408, _0x5179ba) {
            return _0x16e408 === _0x5179ba;
        },
        'Repjo': 'ZnMBF',
        'GKyky': function(_0x5241fc, _0x130203) {
            return _0x5241fc === _0x130203;
        },
        'AVDQL': 'JIaXx',
        'bxmtK': function(_0x42c3e0, _0x17dff1) {
            return _0x42c3e0(_0x17dff1);
        },
        'ooNqY': function(_0x32faa8, _0x5cf952, _0x29d074) {
            return _0x32faa8(_0x5cf952, _0x29d074);
        },
        'BAWFk': '/khc/task/getSupport'
    };
    return new Promise(_0x4dcc1e => {
        var _0x2c03d8 = {
            'TDzvd': function(_0x281a6d, _0x387962) {
                return _0x2425b6['bxmtK'](_0x281a6d, _0x387962);
            }
        };
        const _0x4f961b = {
            't': Date['now']()
        };
        const _0x25298b = _0x2425b6['ooNqY'](taskUrl, _0x2425b6['BAWFk'], _0x4f961b);
        $['get'](_0x25298b, async (_0x28c3bc, _0x58bbcd, _0xc3ef47) => {
            try {
                if (_0x2425b6['cSfHl'](_0x2425b6['OMrgw'], _0x2425b6['OMrgw'])) {
                    _0x2c03d8['TDzvd'](_0x4dcc1e, _0xc3ef47);
                } else {
                    if (_0x28c3bc) {
                        if (_0x2425b6['RCeng'](_0x2425b6['kpvre'], _0x2425b6['kpvre'])) {
                            $['integer'] = _0xc3ef47['data']['myRank']['integral'];
                            $['num'] = _0xc3ef47['data']['myRank']['rank'];
                            message += '当前获得积分：' + $['integer'] + '\x0a';
                            message += '当前获得排名：' + $['num'] + '\x0a';
                        } else {
                            console['log']('' + JSON['stringify'](_0x28c3bc));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        }
                    } else {
                        if (_0x2425b6['RCeng'](_0x2425b6['KUHKD'], _0x2425b6['KUHKD'])) {
                            $['logErr'](e, _0x58bbcd);
                        } else {
                            _0xc3ef47 = JSON['parse'](_0xc3ef47);
                            if (_0x2425b6['gAqyl'](_0xc3ef47['code'], 0xc8)) {
                                console['log']('\x0a\x0a' + $['name'] + '互助码每天都变化,旧的不可继续使用');
                                $['log']('【京东账号' + $['index'] + '（' + $['UserName'] + '）的' + $['name'] + '好友互助码】' + _0xc3ef47['data']['shareId'] + '\x0a\x0a');
                                $['temp']['push'](_0xc3ef47['data']['shareId']);
                            } else {
                                if (_0x2425b6['RCeng'](_0x2425b6['Repjo'], _0x2425b6['Repjo'])) {
                                    $['logErr'](e);
                                } else {
                                    console['log']('获取邀请码失败：' + JSON['stringify'](_0xc3ef47));
                                    if (_0x2425b6['GKyky'](_0xc3ef47['code'], 0x3ea)) $['blockAccount'] = !![];
                                }
                            }
                        }
                    }
                }
            } catch (_0x5df475) {
                if (_0x2425b6['RCeng'](_0x2425b6['AVDQL'], _0x2425b6['AVDQL'])) {
                    if (_0xc3ef47['data']['myRank']) {
                        $['integer'] = _0xc3ef47['data']['myRank']['integral'];
                        $['num'] = _0xc3ef47['data']['myRank']['rank'];
                        message += '当前获得积分：' + $['integer'] + '\x0a';
                        message += '当前获得排名：' + $['num'] + '\x0a';
                    }
                    if (_0xc3ef47['data']['lastRank']) {
                        $['lasNum'] = _0xc3ef47['data']['lastRank']['rank'];
                        message += '当前参赛人数：' + $['lasNum'] + '\x0a';
                    }
                } else {
                    $['logErr'](_0x5df475, _0x58bbcd);
                }
            } finally {
                _0x2425b6['bxmtK'](_0x4dcc1e, _0xc3ef47);
            }
        });
    });
}

function getListJbean() {
    var _0x1ac921 = {
        'BADga': function(_0xda4de9, _0x2d3c1e) {
            return _0xda4de9 == _0x2d3c1e;
        },
        'hwxog': 'string',
        'ZVXbS': function(_0x4cf719, _0x2cfb3e) {
            return _0x4cf719 + _0x2cfb3e;
        },
        'CZHGh': 'object',
        'aZkTU': function(_0x41be2c, _0x2e121a) {
            return _0x41be2c(_0x2e121a);
        },
        'vBiwh': function(_0x58c192, _0x320452) {
            return _0x58c192 === _0x320452;
        },
        'yGfWM': 'bNIed',
        'CUayg': 'LkvWl',
        'WpIom': function(_0x195bfb, _0x25896a) {
            return _0x195bfb !== _0x25896a;
        },
        'yKoMy': 'yhbUQ',
        'xnxXG': 'iYLhA',
        'AfWPL': function(_0xdaf3ec, _0x51ddbc) {
            return _0xdaf3ec !== _0x51ddbc;
        },
        'LHcSo': 'hEJgo',
        'jTQaS': 'LzTPA',
        'gzwjI': function(_0xa9f68c, _0x34088b, _0x44eebc) {
            return _0xa9f68c(_0x34088b, _0x44eebc);
        },
        'DjODG': '/khc/record/jingBeanRecord'
    };
    return new Promise(_0x481b2f => {
        var _0x28976d = {
            'cabhD': function(_0xd7b7fe, _0x24e6f9) {
                return _0x1ac921['BADga'](_0xd7b7fe, _0x24e6f9);
            },
            'EVDXY': _0x1ac921['hwxog'],
            'PQDHZ': function(_0x223896, _0x10d176) {
                return _0x1ac921['ZVXbS'](_0x223896, _0x10d176);
            },
            'ahUJR': function(_0x4c334c, _0x23d71b) {
                return _0x1ac921['BADga'](_0x4c334c, _0x23d71b);
            },
            'NHsEo': _0x1ac921['CZHGh'],
            'BfXBW': function(_0x1ff7e9, _0x375fc6) {
                return _0x1ac921['aZkTU'](_0x1ff7e9, _0x375fc6);
            },
            'qvmZj': function(_0x1781eb, _0x42fd28) {
                return _0x1ac921['ZVXbS'](_0x1781eb, _0x42fd28);
            },
            'jOQbI': function(_0x193591, _0x19dc08) {
                return _0x1ac921['vBiwh'](_0x193591, _0x19dc08);
            },
            'auhCq': _0x1ac921['yGfWM'],
            'Jufrt': _0x1ac921['CUayg'],
            'LKZTm': function(_0x4beda6, _0x1b51b9) {
                return _0x1ac921['WpIom'](_0x4beda6, _0x1b51b9);
            },
            'iKngQ': _0x1ac921['yKoMy'],
            'QYIyK': _0x1ac921['xnxXG'],
            'oNyoX': function(_0x2be65f, _0x1370ed) {
                return _0x1ac921['vBiwh'](_0x2be65f, _0x1370ed);
            },
            'MVVvH': function(_0x564627, _0x33afef) {
                return _0x1ac921['AfWPL'](_0x564627, _0x33afef);
            },
            'Ytvle': _0x1ac921['LHcSo'],
            'YGgyE': _0x1ac921['jTQaS'],
            'eqpey': function(_0x588414, _0x3831bb) {
                return _0x1ac921['aZkTU'](_0x588414, _0x3831bb);
            }
        };
        const _0x298fd6 = {
            't': Date['now'](),
            'pageNum': ''
        };
        const _0x4db125 = _0x1ac921['gzwjI'](taskUrl, _0x1ac921['DjODG'], _0x298fd6);
        $['get'](_0x4db125, async (_0x7583ed, _0x49a09b, _0x3368a9) => {
            var _0x8de82f = {
                'jrlkq': function(_0x257d23, _0x2123dd) {
                    return _0x28976d['cabhD'](_0x257d23, _0x2123dd);
                },
                'aZxZF': _0x28976d['EVDXY'],
                'gdofg': function(_0x37383e, _0x58d4e2) {
                    return _0x28976d['PQDHZ'](_0x37383e, _0x58d4e2);
                },
                'LwdYM': function(_0x4aa136, _0x1efa52) {
                    return _0x28976d['ahUJR'](_0x4aa136, _0x1efa52);
                },
                'KcLnL': _0x28976d['NHsEo'],
                'NvpwF': function(_0x183dc8, _0x18b7c7) {
                    return _0x28976d['BfXBW'](_0x183dc8, _0x18b7c7);
                },
                'hvNtm': function(_0x4431ba, _0x1d901f) {
                    return _0x28976d['PQDHZ'](_0x4431ba, _0x1d901f);
                },
                'DDpsD': function(_0x4e96a9, _0x4ac18e) {
                    return _0x28976d['qvmZj'](_0x4e96a9, _0x4ac18e);
                },
                'cOtCp': function(_0x2bf302, _0x57c13b) {
                    return _0x28976d['qvmZj'](_0x2bf302, _0x57c13b);
                }
            };
            try {
                if (_0x28976d['jOQbI'](_0x28976d['auhCq'], _0x28976d['auhCq'])) {
                    if (_0x7583ed) {
                        if (_0x28976d['jOQbI'](_0x28976d['Jufrt'], _0x28976d['Jufrt'])) {
                            console['log']('' + JSON['stringify'](_0x7583ed));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            var _0x49bbf5 = '',
                                _0x1b5f60 = n['split']('?')[0x1] || '';
                            if (t) {
                                if (_0x8de82f['jrlkq'](_0x8de82f['aZxZF'], typeof t)) _0x49bbf5 = _0x8de82f['gdofg'](t, _0x1b5f60);
                                else if (_0x8de82f['LwdYM'](_0x8de82f['KcLnL'], _0x8de82f['NvpwF'](P, t))) {
                                    var _0x5afb51 = [];
                                    for (var _0x53b907 in t) _0x5afb51['push'](_0x8de82f['hvNtm'](_0x8de82f['DDpsD'](_0x53b907, '='), t[_0x53b907]));
                                    _0x49bbf5 = _0x5afb51['length'] ? _0x8de82f['cOtCp'](_0x5afb51['join']('&'), _0x1b5f60) : _0x1b5f60;
                                }
                            } else _0x49bbf5 = _0x1b5f60;
                            if (_0x49bbf5) {
                                var _0x520579 = _0x49bbf5['split']('&')['sort']()['join']('');
                                return $['md5'](_0x8de82f['cOtCp'](_0x520579, e));
                            }
                            return $['md5'](e);
                        }
                    } else {
                        if (_0x28976d['LKZTm'](_0x28976d['iKngQ'], _0x28976d['QYIyK'])) {
                            _0x3368a9 = JSON['parse'](_0x3368a9);
                            if (_0x28976d['oNyoX'](_0x3368a9['code'], 0xc8)) {
                                $['jingBeanNum'] = _0x3368a9['data']['jingBeanNum'] || 0x0;
                                message += '累计获得京豆：' + $['jingBeanNum'] + '🐶\n';
                            } else {
                                console['log']('jingBeanRecord失败：' + JSON['stringify'](_0x3368a9));
                            }
                        } else {
                            $['lasNum'] = _0x3368a9['data']['lastRank']['rank'];
                            message += '当前参赛人数：' + $['lasNum'] + '\x0a';
                        }
                    }
                } else {
                    $['logErr'](e, _0x49a09b);
                }
            } catch (_0x33b30e) {
                if (_0x28976d['MVVvH'](_0x28976d['Ytvle'], _0x28976d['YGgyE'])) {
                    $['logErr'](_0x33b30e, _0x49a09b);
                } else {
                    $['logErr'](_0x33b30e, _0x49a09b);
                }
            } finally {
                _0x28976d['eqpey'](_0x481b2f, _0x3368a9);
            }
        });
    });
}

function getListIntegral() {
    var _0x3d75d0 = {
        'FMRHI': function(_0x40c2bf, _0x18b523) {
            return _0x40c2bf + _0x18b523;
        },
        'YvLzq': function(_0x4310cb, _0x18335e) {
            return _0x4310cb === _0x18335e;
        },
        'uHDXw': 'EiYMb',
        'Ncihn': 'DccNu',
        'PooAV': function(_0x9a1d37, _0x2e76a0) {
            return _0x9a1d37 === _0x2e76a0;
        },
        'ovBFt': function(_0x51150c, _0x1e15d6) {
            return _0x51150c !== _0x1e15d6;
        },
        'giGPn': 'uFkBx',
        'YayqJ': function(_0x5c9702, _0x2a94d5) {
            return _0x5c9702(_0x2a94d5);
        },
        'fxCGX': function(_0x5f314a, _0x4d38a6) {
            return _0x5f314a === _0x4d38a6;
        },
        'ZxahR': 'JcZuI',
        'abdjV': 'mYitY',
        'Fpcna': function(_0x5da416, _0x1c9250, _0x87b78e) {
            return _0x5da416(_0x1c9250, _0x87b78e);
        },
        'fEmjt': '/khc/record/integralRecord'
    };
    return new Promise(_0x1fa9ed => {
        var _0x3c1d40 = {
            'cfUri': function(_0x2f7888, _0x45acce) {
                return _0x3d75d0['FMRHI'](_0x2f7888, _0x45acce);
            },
            'rVbtW': function(_0x17c433, _0x2a5ba5) {
                return _0x3d75d0['YvLzq'](_0x17c433, _0x2a5ba5);
            },
            'MwRhB': _0x3d75d0['uHDXw'],
            'OyDGY': _0x3d75d0['Ncihn'],
            'BUIfJ': function(_0xa6d9d9, _0x4264bf) {
                return _0x3d75d0['PooAV'](_0xa6d9d9, _0x4264bf);
            },
            'szHdM': function(_0x19e1a0, _0x138f63) {
                return _0x3d75d0['ovBFt'](_0x19e1a0, _0x138f63);
            },
            'eAeaN': _0x3d75d0['giGPn'],
            'uAVZc': function(_0x5b81b6, _0x9989ba) {
                return _0x3d75d0['YayqJ'](_0x5b81b6, _0x9989ba);
            }
        };
        if (_0x3d75d0['fxCGX'](_0x3d75d0['ZxahR'], _0x3d75d0['abdjV'])) {
            console['log']('' + JSON['stringify'](err));
            console['log']($['name'] + ' API请求失败，请检查网路重试');
        } else {
            const _0x4d30c1 = {
                't': Date['now'](),
                'pageNum': ''
            };
            const _0xd48fa9 = _0x3d75d0['Fpcna'](taskUrl, _0x3d75d0['fEmjt'], _0x4d30c1);
            $['get'](_0xd48fa9, async (_0x3b0087, _0x4f1f93, _0x38733c) => {
                if (_0x3c1d40['rVbtW'](_0x3c1d40['MwRhB'], _0x3c1d40['OyDGY'])) {
                    if (_0x3b0087) {
                        console['log']('' + JSON['stringify'](_0x3b0087));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        $['updatePkActivityIdRes'] = JSON['parse'](_0x38733c);
                    }
                } else {
                    try {
                        if (_0x3b0087) {
                            console['log']('' + JSON['stringify'](_0x3b0087));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            _0x38733c = JSON['parse'](_0x38733c);
                            if (_0x3c1d40['BUIfJ'](_0x38733c['code'], 0xc8)) {
                                if (_0x3c1d40['szHdM'](_0x3c1d40['eAeaN'], _0x3c1d40['eAeaN'])) {
                                    var _0x37d69e = a['split']('&')['sort']()['join']('');
                                    return $['md5'](_0x3c1d40['cfUri'](_0x37d69e, e));
                                } else {
                                    $['integralCount'] = _0x38733c['data']['integralNum'];
                                    message += '累计获得积分：' + $['integralCount'] + '\x0a';
                                }
                            } else {
                                console['log']('integralRecord失败：' + JSON['stringify'](_0x38733c));
                            }
                        }
                    } catch (_0x2205d2) {
                        $['logErr'](_0x2205d2, _0x4f1f93);
                    } finally {
                        _0x3c1d40['uAVZc'](_0x1fa9ed, _0x38733c);
                    }
                }
            });
        }
    });
}

function getListRank() {
    var _0x15ab4d = {
        'qenWj': function(_0x2aa9cd, _0x1513ed) {
            return _0x2aa9cd == _0x1513ed;
        },
        'qmiKF': 'string',
        'xXmIv': function(_0xfad962, _0x280f5a) {
            return _0xfad962 + _0x280f5a;
        },
        'TyDzF': 'object',
        'NnPXq': function(_0x5a6c4b, _0x2d223c) {
            return _0x5a6c4b(_0x2d223c);
        },
        'VGnVH': function(_0x32d2a9, _0x2968dd) {
            return _0x32d2a9 + _0x2968dd;
        },
        'xZBWt': function(_0x3718f7, _0x43a759) {
            return _0x3718f7 === _0x43a759;
        },
        'ZaUPA': function(_0x45e276, _0xdf9f2f) {
            return _0x45e276 !== _0xdf9f2f;
        },
        'crqhw': 'YXhCv',
        'MbBRv': 'pLCyW',
        'qldJF': 'hhQwF',
        'HPmCY': 'MZiQk',
        'ZhdXT': 'ZEFDY',
        'oIjkW': function(_0x4cc3cf, _0x26f347, _0x2e5eeb) {
            return _0x4cc3cf(_0x26f347, _0x2e5eeb);
        },
        'cfiaE': '/khc/rank/dayRank'
    };
    return new Promise(_0x4d1bc1 => {
        var _0x1dde09 = {
            'Abjce': function(_0x535a14, _0x2c1140) {
                return _0x15ab4d['xZBWt'](_0x535a14, _0x2c1140);
            },
            'fDNZg': function(_0x1faa93, _0x7fcf2e) {
                return _0x15ab4d['ZaUPA'](_0x1faa93, _0x7fcf2e);
            },
            'yEkeF': _0x15ab4d['crqhw'],
            'kdsWE': function(_0xdb9f69, _0x4449fc) {
                return _0x15ab4d['xZBWt'](_0xdb9f69, _0x4449fc);
            },
            'xkBut': _0x15ab4d['MbBRv'],
            'eQwTE': _0x15ab4d['qldJF'],
            'UmBJG': _0x15ab4d['HPmCY'],
            'pvZQm': function(_0x35f001, _0x374ab3) {
                return _0x15ab4d['NnPXq'](_0x35f001, _0x374ab3);
            }
        };
        if (_0x15ab4d['xZBWt'](_0x15ab4d['ZhdXT'], _0x15ab4d['ZhdXT'])) {
            const _0x6228f9 = {
                't': Date['now']()
            };
            const _0x437114 = _0x15ab4d['oIjkW'](taskUrl, _0x15ab4d['cfiaE'], _0x6228f9);
            $['get'](_0x437114, async (_0x112214, _0x11821b, _0x4bae47) => {
                var _0x2de61a = {
                    'woaZw': function(_0x158bbc, _0x59bada) {
                        return _0x1dde09['Abjce'](_0x158bbc, _0x59bada);
                    }
                };
                try {
                    if (_0x112214) {
                        console['log']('' + JSON['stringify'](_0x112214));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        if (_0x1dde09['fDNZg'](_0x1dde09['yEkeF'], _0x1dde09['yEkeF'])) {
                            $['newShareCodes'] = [...new Set([...$['newShareCodes'], ...readShareCodeRes['data'] || []])];
                        } else {
                            _0x4bae47 = JSON['parse'](_0x4bae47);
                            if (_0x1dde09['kdsWE'](_0x4bae47['code'], 0xc8)) {
                                if (_0x1dde09['kdsWE'](_0x1dde09['xkBut'], _0x1dde09['xkBut'])) {
                                    if (_0x4bae47['data']['myRank']) {
                                        $['integer'] = _0x4bae47['data']['myRank']['integral'];
                                        $['num'] = _0x4bae47['data']['myRank']['rank'];
                                        message += '当前获得积分：' + $['integer'] + '\x0a';
                                        message += '当前获得排名：' + $['num'] + '\x0a';
                                    }
                                    if (_0x4bae47['data']['lastRank']) {
                                        $['lasNum'] = _0x4bae47['data']['lastRank']['rank'];
                                        message += '当前参赛人数：' + $['lasNum'] + '\x0a';
                                    }
                                } else {
                                    console['log']('' + JSON['stringify'](_0x112214));
                                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                                }
                            }
                        }
                    }
                } catch (_0x44e1c4) {
                    if (_0x1dde09['fDNZg'](_0x1dde09['eQwTE'], _0x1dde09['eQwTE'])) {
                        _0x4bae47 = JSON['parse'](_0x4bae47);
                        if (_0x2de61a['woaZw'](_0x4bae47['code'], 0xc8)) {
                            if (_0x4bae47['data']['myRank']) {
                                $['integer'] = _0x4bae47['data']['myRank']['integral'];
                                $['num'] = _0x4bae47['data']['myRank']['rank'];
                                message += '当前获得积分：' + $['integer'] + '\x0a';
                                message += '当前获得排名：' + $['num'] + '\x0a';
                            }
                            if (_0x4bae47['data']['lastRank']) {
                                $['lasNum'] = _0x4bae47['data']['lastRank']['rank'];
                                message += '当前参赛人数：' + $['lasNum'] + '\x0a';
                            }
                        }
                    } else {
                        $['logErr'](_0x44e1c4, _0x11821b);
                    }
                } finally {
                    if (_0x1dde09['kdsWE'](_0x1dde09['UmBJG'], _0x1dde09['UmBJG'])) {
                        _0x1dde09['pvZQm'](_0x4d1bc1, _0x4bae47);
                    } else {
                        $['log']('', '❌ ' + $['name'] + ', 失败! 原因: ' + e + '!', '');
                    }
                }
            });
        } else {
            if (_0x15ab4d['qenWj'](_0x15ab4d['qmiKF'], typeof t)) a = _0x15ab4d['xXmIv'](t, i);
            else if (_0x15ab4d['qenWj'](_0x15ab4d['TyDzF'], _0x15ab4d['NnPXq'](P, t))) {
                var _0x558662 = [];
                for (var _0x2a3936 in t) _0x558662['push'](_0x15ab4d['xXmIv'](_0x15ab4d['xXmIv'](_0x2a3936, '='), t[_0x2a3936]));
                a = _0x558662['length'] ? _0x15ab4d['VGnVH'](_0x558662['join']('&'), i) : i;
            }
        }
    });
}

function updateShareCodesCDN(_0x23c47a = 'https://cdn.jsdelivr.net/gh/gitupdate/updateTeam@master/shareCodes/jd_cityShareCodes.json') {
    var _0x3108d1 = {
        'xkpzI': function(_0x16774a, _0x4ba27f) {
            return _0x16774a === _0x4ba27f;
        },
        'UPIqX': 'ygEqu',
        'awiwj': 'tsyLu',
        'kbSVj': function(_0x5f1ee, _0x15518a) {
            return _0x5f1ee !== _0x15518a;
        },
        'rcWQU': 'VuEqB',
        'GkPJz': 'IjkNo',
        'NyNCg': 'YVJYT',
        'LBeVZ': function(_0x48914e) {
            return _0x48914e();
        },
        'rzYXx': function(_0x58c03a, _0x25a489) {
            return _0x58c03a + _0x25a489;
        },
        'mODLi': '07035cabb557f09a5',
        'CvXrE': 'application/json, text/plain, */*',
        'uLBxt': 'gzip, deflate, br',
        'YAMOr': 'zh-cn',
        'utpHq': 'keep-alive',
        'Irsao': 'application/x-www-form-urlencoded',
        'MyCYs': 'carnivalcity.m.jd.com',
        'VKiAj': 'https://carnivalcity.m.jd.com',
        'SpXLA': 'https://carnivalcity.m.jd.com/?lng=113.325695&lat=23.198318&sid=dfb50c19b37544d6ce10759e26c451dw&un_area=19_1601_50258_62858',
        'rvXLn': 'jdapp;iPhone;9.4.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/B28DA848-0DA0-4AAA-AE7E-A6F55695C590;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167588;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'igJMn': function(_0x248450, _0xd267b5, _0x55b972, _0x35e9ce) {
            return _0x248450(_0xd267b5, _0x55b972, _0x35e9ce);
        },
        'mYLEs': function(_0x57bf67, _0x4c1cab) {
            return _0x57bf67 === _0x4c1cab;
        },
        'vkxaI': 'code',
        'aGjwm': 'data',
        'pGnPn': 'status',
        'QLMvO': 'jdNums',
        'WlxlF': 'date',
        'RuZCh': function(_0x1013be, _0x25b3a9) {
            return _0x1013be === _0x25b3a9;
        },
        'HnVva': 'hiFOd',
        'umGQs': function(_0x1f3828, _0x1dc792) {
            return _0x1f3828(_0x1dc792);
        },
        'mFnQb': './USER_AGENTS',
        'YPJzA': 'JDUA',
        'NauGK': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    };
    return new Promise(_0x4c500e => {
        var _0x5df87e = {
            'MlPdl': function(_0x59c352, _0x1441d3) {
                return _0x3108d1['rzYXx'](_0x59c352, _0x1441d3);
            },
            'ARDjS': _0x3108d1['mODLi'],
            'IjEFS': _0x3108d1['CvXrE'],
            'AtmIh': _0x3108d1['uLBxt'],
            'IVovL': _0x3108d1['YAMOr'],
            'TXVTt': _0x3108d1['utpHq'],
            'LzETv': _0x3108d1['Irsao'],
            'mUOOO': _0x3108d1['MyCYs'],
            'UbJIW': _0x3108d1['VKiAj'],
            'weUIM': _0x3108d1['SpXLA'],
            'gFQtF': _0x3108d1['rvXLn'],
            'SxbMY': function(_0x55071f, _0xab4414, _0x9bba0a, _0x67c3c4) {
                return _0x3108d1['igJMn'](_0x55071f, _0xab4414, _0x9bba0a, _0x67c3c4);
            },
            'vFIIP': function(_0x2c7127, _0x4677b6) {
                return _0x3108d1['mYLEs'](_0x2c7127, _0x4677b6);
            },
            'fykGQ': _0x3108d1['vkxaI'],
            'XzHOs': function(_0x50dc52, _0x3ec492) {
                return _0x3108d1['mYLEs'](_0x50dc52, _0x3ec492);
            },
            'dxrDP': _0x3108d1['aGjwm'],
            'VolUO': _0x3108d1['pGnPn'],
            'HmIli': _0x3108d1['QLMvO'],
            'rsrqU': _0x3108d1['WlxlF']
        };
        if (_0x3108d1['RuZCh'](_0x3108d1['HnVva'], _0x3108d1['HnVva'])) {
            $['get']({
                'url': _0x23c47a,
                'headers': {
                    'User-Agent': $['isNode']() ? process['env']['JD_USER_AGENT'] ? process['env']['JD_USER_AGENT'] : _0x3108d1['umGQs'](require, _0x3108d1['mFnQb'])['USER_AGENT'] : $['getdata'](_0x3108d1['YPJzA']) ? $['getdata'](_0x3108d1['YPJzA']) : _0x3108d1['NauGK']
                },
                'timeout': 0x30d40
            }, async (_0x3a3fc9, _0xb97c97, _0x532fc1) => {
                try {
                    if (_0x3108d1['xkpzI'](_0x3108d1['UPIqX'], _0x3108d1['awiwj'])) {
                        console['log']('异常：' + JSON['stringify'](_0x532fc1));
                    } else {
                        if (_0x3a3fc9) {
                            console['log']('' + JSON['stringify'](_0x3a3fc9));
                            console['log']($['name'] + ' API请求失败，请检查网路重试');
                        } else {
                            if (_0x3108d1['kbSVj'](_0x3108d1['rcWQU'], _0x3108d1['GkPJz'])) {
                                $['updatePkActivityIdRes'] = JSON['parse'](_0x532fc1);
                            } else {
                                const _0x59311b = Date['now']()['toString']();
                                let _0x4b4ad0 = _0x5df87e['MlPdl'](_0x5df87e['ARDjS'], _0x59311b);
                                return {
                                    'url': '' + JD_API_HOST + t,
                                    'body': a,
                                    'headers': {
                                        'Accept': _0x5df87e['IjEFS'],
                                        'Accept-Encoding': _0x5df87e['AtmIh'],
                                        'Accept-Language': _0x5df87e['IVovL'],
                                        'Connection': _0x5df87e['TXVTt'],
                                        'Content-Type': _0x5df87e['LzETv'],
                                        'Host': _0x5df87e['mUOOO'],
                                        'Origin': _0x5df87e['UbJIW'],
                                        'Referer': _0x5df87e['weUIM'],
                                        'User-Agent': _0x5df87e['gFQtF'],
                                        'Cookie': cookie,
                                        'sign': _0x5df87e['SxbMY'](za, a, _0x4b4ad0, t)['toString'](),
                                        'timestamp': _0x59311b
                                    }
                                };
                            }
                        }
                    }
                } catch (_0xf05b7e) {
                    if (_0x3108d1['xkpzI'](_0x3108d1['NyNCg'], _0x3108d1['NyNCg'])) {
                        $['logErr'](_0xf05b7e, _0xb97c97);
                    } else {
                        console['log']('助力结果:' + _0x532fc1);
                        _0x532fc1 = JSON['parse'](_0x532fc1);
                        if (_0x532fc1 && _0x5df87e['vFIIP'](_0x532fc1[_0x5df87e['fykGQ']], 0xc8)) {
                            if (_0x5df87e['XzHOs'](_0x532fc1[_0x5df87e['dxrDP']][_0x5df87e['VolUO']], 0x6)) console['log']('助力成功\n');
                            if (_0x532fc1[_0x5df87e['dxrDP']][_0x5df87e['HmIli']]) $['beans'] += _0x532fc1[_0x5df87e['dxrDP']][_0x5df87e['HmIli']];
                        }
                    }
                } finally {
                    _0x3108d1['LBeVZ'](_0x4c500e);
                }
            });
        } else {
            console['log'](data['data'][i][_0x5df87e['rsrqU']] + '日 【' + data['data'][i][_0x5df87e['VolUO']] + '】往期京豆奖励，今日争取进入前30000名哦~');
        }
    });
}

function readShareCode() {
    var _0x2e7a94 = {
        'MqRel': 'data',
        'XKGzP': 'jingBean',
        'RUMdt': function(_0x1c35c1, _0x57761f) {
            return _0x1c35c1 === _0x57761f;
        },
        'YfbNw': 'tDOPO',
        'cfHlA': function(_0x1e740f, _0x2d52d7) {
            return _0x1e740f !== _0x2d52d7;
        },
        'hCfHk': 'MPqAx',
        'zdWeN': function(_0x2b2d98, _0x5d6772) {
            return _0x2b2d98(_0x5d6772);
        },
        'gpEcn': function(_0xc808d6) {
            return _0xc808d6();
        }
    };
    console['log']('开始');
    return new Promise(async _0x1b2c08 => {
        $['get']({
            'url': 'http://jd.turinglabs.net/api/v2/jd/carnivalcity/read/20/',
            'timeout': 0x4e20
        }, (_0x581994, _0x42f17f, _0xe11faa) => {
            var _0x1d2c9f = {
                'JkCTN': _0x2e7a94['MqRel'],
                'OoQUh': _0x2e7a94['XKGzP']
            };
            try {
                if (_0x581994) {
                    if (_0x2e7a94['RUMdt'](_0x2e7a94['YfbNw'], _0x2e7a94['YfbNw'])) {
                        console['log']('' + JSON['stringify'](_0x581994));
                        console['log']($['name'] + ' API请求失败，请检查网路重试');
                    } else {
                        if (_0xe11faa[_0x1d2c9f['JkCTN']][_0x1d2c9f['OoQUh']]) $['beans'] += _0xe11faa[_0x1d2c9f['JkCTN']][_0x1d2c9f['OoQUh']];
                    }
                } else {
                    if (_0x2e7a94['cfHlA'](_0x2e7a94['hCfHk'], _0x2e7a94['hCfHk'])) {
                        $['logErr'](e, _0x42f17f);
                    } else {
                        if (_0xe11faa) {
                            _0xe11faa = JSON['parse'](_0xe11faa);
                        }
                    }
                }
            } catch (_0x171410) {
                $['logErr'](_0x171410, _0x42f17f);
            } finally {
                _0x2e7a94['zdWeN'](_0x1b2c08, _0xe11faa);
            }
        });
        await $['wait'](0x4e20);
        _0x2e7a94['gpEcn'](_0x1b2c08);
    });
}

function shareCodesFormat() {
    var _0x567428 = {
        'AdxIG': function(_0x589408, _0x3eed3b) {
            return _0x589408 === _0x3eed3b;
        },
        'STkvV': function(_0x3c906c, _0x1c4090) {
            return _0x3c906c !== _0x1c4090;
        },
        'TXDfW': 'otdaR',
        'wZEwE': function(_0x4436c2, _0x22d5f0) {
            return _0x4436c2 - _0x22d5f0;
        },
        'jmWsV': function(_0x56d314, _0x1cc28e) {
            return _0x56d314 - _0x1cc28e;
        },
        'HZZNK': function(_0x3c8aae, _0x2637c0) {
            return _0x3c8aae > _0x2637c0;
        },
        'tiLhQ': function(_0x28e0c8, _0x48d627) {
            return _0x28e0c8 - _0x48d627;
        },
        'CncPU': function(_0x190531) {
            return _0x190531();
        },
        'cJbhr': function(_0x47c767, _0x14ce5d) {
            return _0x47c767 === _0x14ce5d;
        },
        'IQyig': function(_0x359aaf) {
            return _0x359aaf();
        }
    };
    return new Promise(async _0x361654 => {
        if (_0x567428['STkvV'](_0x567428['TXDfW'], _0x567428['TXDfW'])) {
            data = JSON['parse'](data);
            if (_0x567428['AdxIG'](data['code'], 0xc8)) {
                $['integralCount'] = data['data']['integralNum'];
                message += '累计获得积分：' + $['integralCount'] + '\x0a';
            } else {
                console['log']('integralRecord失败：' + JSON['stringify'](data));
            }
        } else {
            $['newShareCodes'] = [];
            if ($['shareCodesArr'][_0x567428['wZEwE']($['index'], 0x1)]) {
                $['newShareCodes'] = $['shareCodesArr'][_0x567428['jmWsV']($['index'], 0x1)]['split']('@');
            } else {
                console['log']('由于您第' + $['index'] + '个京东账号未提供shareCode,将采纳本脚本自带的助力码\n');
                const _0x2033ee = _0x567428['HZZNK']($['index'], inviteCodes['length']) ? _0x567428['tiLhQ'](inviteCodes['length'], 0x1) : _0x567428['tiLhQ']($['index'], 0x1);
                $['newShareCodes'] = inviteCodes[_0x2033ee] && inviteCodes[_0x2033ee]['split']('@') || [];
                if ($['updatePkActivityIdRes'] && $['updatePkActivityIdRes']['length']) $['newShareCodes'] = [...$['updatePkActivityIdRes'], ...$['newShareCodes']];
            }
            const _0x5a7890 = await _0x567428['CncPU'](readShareCode);
            if (_0x5a7890 && _0x567428['cJbhr'](_0x5a7890['code'], 0xc8)) {
                $['newShareCodes'] = [...new Set([...$['newShareCodes'], ..._0x5a7890['data'] || []])];
            }
            _0x567428['IQyig'](_0x361654);
        }
    });
}

function requireConfig() {
    var _0x34b910 = {
        'hSqOT': function(_0x4ed24d, _0x92ed05) {
            return _0x4ed24d !== _0x92ed05;
        },
        'oKLPd': 'XDLkr',
        'tBaJe': 'bAfpS',
        'zGVED': function(_0x418f10, _0x1d376e) {
            return _0x418f10 - _0x1d376e;
        },
        'GVXRE': function(_0x55d39d, _0x2f9464) {
            return _0x55d39d + _0x2f9464;
        },
        'zBGRy': function(_0x3b0a29, _0x249322) {
            return _0x3b0a29 === _0x249322;
        },
        'CFBuW': 'UVujW',
        'VIKHu': function(_0x2505e5, _0x4ec941) {
            return _0x2505e5 > _0x4ec941;
        },
        'VKubk': 'ypecI',
        'Xqhtl': 'gEabS',
        'oNSIZ': function(_0x5db5a7) {
            return _0x5db5a7();
        }
    };
    return new Promise(_0x10fdb2 => {
        var _0x5745e7 = {
            'cfovJ': function(_0x35cbb0, _0x1fe9eb) {
                return _0x34b910['zGVED'](_0x35cbb0, _0x1fe9eb);
            },
            'CrrWE': function(_0x2777e5, _0x42a285) {
                return _0x34b910['hSqOT'](_0x2777e5, _0x42a285);
            },
            'OXhKW': function(_0x3bf831, _0x8ec19f) {
                return _0x34b910['GVXRE'](_0x3bf831, _0x8ec19f);
            }
        };
        console['log']('开始获取' + $['name'] + '配置文件\n');
        let _0xd03cd3 = [];
        if ($['isNode']()) {
            if (_0x34b910['zBGRy'](_0x34b910['CFBuW'], _0x34b910['CFBuW'])) {
                if (process['env']['JD818_SHARECODES']) {
                    if (_0x34b910['VIKHu'](process['env']['JD818_SHARECODES']['indexOf']('\x0a'), -0x1)) {
                        _0xd03cd3 = process['env']['JD818_SHARECODES']['split']('\x0a');
                    } else {
                        if (_0x34b910['hSqOT'](_0x34b910['VKubk'], _0x34b910['Xqhtl'])) {
                            _0xd03cd3 = process['env']['JD818_SHARECODES']['split']('&');
                        } else {
                            $['newShareCodes'] = $['shareCodesArr'][_0x5745e7['cfovJ']($['index'], 0x1)]['split']('@');
                        }
                    }
                }
            } else {
                if (err) {
                    console['log']('' + JSON['stringify'](err));
                    console['log']($['name'] + ' API请求失败，请检查网路重试');
                } else {
                    data = JSON['parse'](data);
                }
            }
        }
        console['log']('共' + cookiesArr['length'] + '个京东账号\n');
        $['shareCodesArr'] = [];
        if ($['isNode']()) {
            Object['keys'](_0xd03cd3)['forEach'](_0x2db1fe => {
                if (_0x34b910['hSqOT'](_0x34b910['oKLPd'], _0x34b910['tBaJe'])) {
                    if (_0xd03cd3[_0x2db1fe]) {
                        $['shareCodesArr']['push'](_0xd03cd3[_0x2db1fe]);
                    }
                } else {
                    str += _0x2db1fe + '=' + a[_0x2db1fe] + (_0x5745e7['CrrWE'](_0x5745e7['OXhKW'](index, 0x1), cc['length']) ? '&' : '');
                }
            });
        }
        console['log']('您提供了' + $['shareCodesArr']['length'] + '个账号的' + $['name'] + '助力码\n');
        _0x34b910['oNSIZ'](_0x10fdb2);
    });
}

function taskUrl(_0xb5cb41, _0x25b0d0) {
    var _0x55996d = {
        'mzsNs': function(_0x57abc0, _0x2a1db2) {
            return _0x57abc0(_0x2a1db2);
        },
        'VIItv': function(_0x527b47, _0x3ddd81) {
            return _0x527b47 === _0x3ddd81;
        },
        'EnyYd': 'LwLLv',
        'TxRdU': function(_0x205ed8, _0xccbdc9) {
            return _0x205ed8 !== _0xccbdc9;
        },
        'YhIuy': function(_0x4241db, _0x5b400d) {
            return _0x4241db + _0x5b400d;
        },
        'HflrX': '07035cabb557f09a5',
        'bTsnJ': 'application/json, text/plain, */*',
        'TtMNE': 'gzip, deflate, br',
        'XhFMi': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'ONjJX': 'https://carnivalcity.m.jd.com/',
        'dJIFw': 'empty',
        'McOCJ': 'cors',
        'srnFX': 'same-origin',
        'REinD': 'jdapp;android;9.4.4;10;3b78ecc3f490c7ba;network/UNKNOWN;model/M2006J10C;addressid/138543439;aid/3b78ecc3f490c7ba;oaid/7d5870c5a1696881;osVer/29;appBuild/85576;psn/3b78ecc3f490c7ba|541;psq/2;uid/3b78ecc3f490c7ba;adk/;ads/;pap/JA2015_311210|9.2.4|ANDROID 10;osv/10;pv/548.2;jdv/0|iosapp|t_335139774|appshare|CopyURL|1606277982178|1606277986;ref/com.jd.lib.personal.view.fragment.JDPersonalFragment;partner/xiaomi001;apprpd/MyJD_Main;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36',
        'KCXeA': function(_0x4b5608, _0x33ee14, _0xe45035, _0x17cc1b) {
            return _0x4b5608(_0x33ee14, _0xe45035, _0x17cc1b);
        }
    };
    const _0x945336 = Date['now']()['toString']();
    let _0xdf9a38 = _0x55996d['YhIuy'](_0x55996d['HflrX'], _0x945336);
    let _0x4ecdc4 = '';
    const _0x42cae4 = Object['keys'](_0x25b0d0);
    _0x42cae4['map']((_0x4bc122, _0x3d8a43) => {
        var _0x3722f2 = {
            'MPFem': function(_0x51bc73, _0x39eabd) {
                return _0x55996d['mzsNs'](_0x51bc73, _0x39eabd);
            }
        };
        if (_0x55996d['VIItv'](_0x55996d['EnyYd'], _0x55996d['EnyYd'])) {
            _0x4ecdc4 += _0x4bc122 + '=' + _0x25b0d0[_0x4bc122] + (_0x55996d['TxRdU'](_0x55996d['YhIuy'](_0x3d8a43, 0x1), _0x42cae4['length']) ? '&' : '');
        } else {
            _0x3722f2['MPFem'](resolve, data);
        }
    });
    return {
        'url': '' + JD_API_HOST + _0xb5cb41 + '?' + _0x4ecdc4,
        'headers': {
            'accept': _0x55996d['bTsnJ'],
            'accept-encoding': _0x55996d['TtMNE'],
            'accept-language': _0x55996d['XhFMi'],
            'referer': _0x55996d['ONjJX'],
            'sec-fetch-dest': _0x55996d['dJIFw'],
            'sec-fetch-mode': _0x55996d['McOCJ'],
            'sec-fetch-site': _0x55996d['srnFX'],
            'Cookie': cookie,
            'User-Agent': _0x55996d['REinD'],
            'sign': _0x55996d['KCXeA'](za, _0x25b0d0, _0xdf9a38, _0xb5cb41)['toString'](),
            'timestamp': _0x945336
        }
    };
}

function taskPostUrl(_0x4c37a4, _0x3f3220) {
    var _0x2d124b = {
        'IOZjc': function(_0x51f34f, _0xfd7b82) {
            return _0x51f34f + _0xfd7b82;
        },
        'afrir': '07035cabb557f09a5',
        'DaQFt': 'application/json, text/plain, */*',
        'SnZEa': 'gzip, deflate, br',
        'VdAtA': 'zh-cn',
        'RGEZa': 'keep-alive',
        'TbUVT': 'application/x-www-form-urlencoded',
        'wblBD': 'carnivalcity.m.jd.com',
        'LWnDr': 'https://carnivalcity.m.jd.com',
        'OeLnh': 'https://carnivalcity.m.jd.com/?lng=113.325695&lat=23.198318&sid=dfb50c19b37544d6ce10759e26c451dw&un_area=19_1601_50258_62858',
        'ZmznN': 'jdapp;iPhone;9.4.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/B28DA848-0DA0-4AAA-AE7E-A6F55695C590;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167588;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'mBwrz': function(_0x3f39bc, _0x53af70, _0x1cc090, _0x22e697) {
            return _0x3f39bc(_0x53af70, _0x1cc090, _0x22e697);
        }
    };
    const _0x298ccc = Date['now']()['toString']();
    let _0x3d05ee = _0x2d124b['IOZjc'](_0x2d124b['afrir'], _0x298ccc);
    return {
        'url': '' + JD_API_HOST + _0x4c37a4,
        'body': _0x3f3220,
        'headers': {
            'Accept': _0x2d124b['DaQFt'],
            'Accept-Encoding': _0x2d124b['SnZEa'],
            'Accept-Language': _0x2d124b['VdAtA'],
            'Connection': _0x2d124b['RGEZa'],
            'Content-Type': _0x2d124b['TbUVT'],
            'Host': _0x2d124b['wblBD'],
            'Origin': _0x2d124b['LWnDr'],
            'Referer': _0x2d124b['OeLnh'],
            'User-Agent': _0x2d124b['ZmznN'],
            'Cookie': cookie,
            'sign': _0x2d124b['mBwrz'](za, _0x3f3220, _0x3d05ee, _0x4c37a4)['toString'](),
            'timestamp': _0x298ccc
        }
    };
}

function P(_0x34df85) {
    var _0x40de81 = {
        'XbSBr': function(_0x38c7a0, _0x47a359) {
            return _0x38c7a0 === _0x47a359;
        },
        'VNpRq': 'function',
        'orPuv': function(_0x3c62b8, _0x508098) {
            return _0x3c62b8 !== _0x508098;
        },
        'ERUHc': 'symbol',
        'GcSLt': function(_0xf51f3f, _0x2bcfff) {
            return _0xf51f3f === _0x2bcfff;
        },
        'pHloC': function(_0x14c4ca, _0x38249b) {
            return _0x14c4ca(_0x38249b);
        }
    };
    return P = _0x40de81['XbSBr'](_0x40de81['VNpRq'], typeof Symbol) && _0x40de81['GcSLt'](_0x40de81['ERUHc'], typeof Symbol['iterator']) ? function(_0x34df85) {
        return typeof _0x34df85;
    } : function(_0x34df85) {
        return _0x34df85 && _0x40de81['XbSBr'](_0x40de81['VNpRq'], typeof Symbol) && _0x40de81['XbSBr'](_0x34df85['constructor'], Symbol) && _0x40de81['orPuv'](_0x34df85, Symbol['prototype']) ? _0x40de81['ERUHc'] : typeof _0x34df85;
    }, _0x40de81['pHloC'](P, _0x34df85);
}

function za(_0x1aa07f, _0x38aa5e, _0x563914) {
    var _0x385611 = {
        'vySdf': '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
        'RxZdg': 'https://bean.m.jd.com/bean/signIndex.action',
        'Zywbv': function(_0x5b24fc, _0x5e0ff8) {
            return _0x5b24fc == _0x5e0ff8;
        },
        'mSaHv': 'string',
        'ceDpZ': function(_0x40abcd, _0x33fb13) {
            return _0x40abcd + _0x33fb13;
        },
        'IlZFo': 'object',
        'GPQTu': function(_0x49ff1b, _0x3bc3d6) {
            return _0x49ff1b(_0x3bc3d6);
        },
        'JxsLI': function(_0x5a487f, _0x1d829e) {
            return _0x5a487f !== _0x1d829e;
        },
        'EYLre': 'xZjYb',
        'EbsTV': function(_0x5f24fa, _0x3b01f6) {
            return _0x5f24fa + _0x3b01f6;
        },
        'lYQZp': function(_0x1b970f, _0x1c778c) {
            return _0x1b970f + _0x1c778c;
        },
        'IkJaA': function(_0x2e4d7c, _0x388df8) {
            return _0x2e4d7c + _0x388df8;
        },
        'wrylr': function(_0x5e93ca, _0xb17e03) {
            return _0x5e93ca === _0xb17e03;
        },
        'qvEms': 'zzdoW',
        'tpknA': function(_0x41208a, _0x420925) {
            return _0x41208a + _0x420925;
        }
    };
    var _0x5f0a4e = '',
        _0x124eb8 = _0x563914['split']('?')[0x1] || '';
    if (_0x1aa07f) {
        if (_0x385611['Zywbv'](_0x385611['mSaHv'], typeof _0x1aa07f)) _0x5f0a4e = _0x385611['ceDpZ'](_0x1aa07f, _0x124eb8);
        else if (_0x385611['Zywbv'](_0x385611['IlZFo'], _0x385611['GPQTu'](P, _0x1aa07f))) {
            if (_0x385611['JxsLI'](_0x385611['EYLre'], _0x385611['EYLre'])) {
                $['msg']($['name'], _0x385611['vySdf'], _0x385611['RxZdg'], {
                    'open-url': _0x385611['RxZdg']
                });
                return;
            } else {
                var _0x3afdad = [];
                for (var _0x3773ed in _0x1aa07f) _0x3afdad['push'](_0x385611['EbsTV'](_0x385611['lYQZp'](_0x3773ed, '='), _0x1aa07f[_0x3773ed]));
                _0x5f0a4e = _0x3afdad['length'] ? _0x385611['IkJaA'](_0x3afdad['join']('&'), _0x124eb8) : _0x124eb8;
            }
        }
    } else _0x5f0a4e = _0x124eb8;
    if (_0x5f0a4e) {
        if (_0x385611['wrylr'](_0x385611['qvEms'], _0x385611['qvEms'])) {
            var _0x48a581 = _0x5f0a4e['split']('&')['sort']()['join']('');
            return $['md5'](_0x385611['tpknA'](_0x48a581, _0x38aa5e));
        } else {
            Object['keys'](shareCodes)['forEach'](_0x101a13 => {
                if (shareCodes[_0x101a13]) {
                    $['shareCodesArr']['push'](shareCodes[_0x101a13]);
                }
            });
        }
    }
    return $['md5'](_0x38aa5e);
};
_0xodJ = 'jsjiami.com.v6'


function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1"
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            if (data['retcode'] === 0) {
              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
async function showMsg() {
  let nowTime = new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000;
  if (nowTime > new Date(activeEndTime).getTime()) {
    $.msg($.name, '活动已结束', `该活动累计获得京豆：${$.jbeanCount}个\n请删除此脚本\n咱江湖再见`);
    if ($.isNode()) await notify.sendNotify($.name + '活动已结束', `请删除此脚本\n咱江湖再见`)
  } else {
    if ($.beans) {
      allMessage += `京东账号${$.index} ${$.nickName || $.UserName}\n本次运行获得：${$.beans}京豆\n${message}活动地址：${JD_API_HOST}${$.index !== cookiesArr.length ? '\n\n' : ''}`
    }
    $.msg($.name, `京东账号${$.index} ${$.nickName || $.UserName}`, `${message}具体详情点击弹窗跳转后即可查看`, {"open-url": JD_API_HOST});
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
// prettier-ignore
!function(n){"use strict";function r(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function t(n,r){return n<<r|n>>>32-r}function u(n,u,e,o,c,f){return r(t(r(r(u,n),r(o,f)),c),e)}function e(n,r,t,e,o,c,f){return u(r&t|~r&e,n,r,o,c,f)}function o(n,r,t,e,o,c,f){return u(r&e|t&~e,n,r,o,c,f)}function c(n,r,t,e,o,c,f){return u(r^t^e,n,r,o,c,f)}function f(n,r,t,e,o,c,f){return u(t^(r|~e),n,r,o,c,f)}function i(n,t){n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;var u,i,a,h,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;for(u=0;u<n.length;u+=16)i=l,a=d,h=v,g=C,d=f(d=f(d=f(d=f(d=c(d=c(d=c(d=c(d=o(d=o(d=o(d=o(d=e(d=e(d=e(d=e(d,v=e(v,C=e(C,l=e(l,d,v,C,n[u],7,-680876936),d,v,n[u+1],12,-389564586),l,d,n[u+2],17,606105819),C,l,n[u+3],22,-1044525330),v=e(v,C=e(C,l=e(l,d,v,C,n[u+4],7,-176418897),d,v,n[u+5],12,1200080426),l,d,n[u+6],17,-1473231341),C,l,n[u+7],22,-45705983),v=e(v,C=e(C,l=e(l,d,v,C,n[u+8],7,1770035416),d,v,n[u+9],12,-1958414417),l,d,n[u+10],17,-42063),C,l,n[u+11],22,-1990404162),v=e(v,C=e(C,l=e(l,d,v,C,n[u+12],7,1804603682),d,v,n[u+13],12,-40341101),l,d,n[u+14],17,-1502002290),C,l,n[u+15],22,1236535329),v=o(v,C=o(C,l=o(l,d,v,C,n[u+1],5,-165796510),d,v,n[u+6],9,-1069501632),l,d,n[u+11],14,643717713),C,l,n[u],20,-373897302),v=o(v,C=o(C,l=o(l,d,v,C,n[u+5],5,-701558691),d,v,n[u+10],9,38016083),l,d,n[u+15],14,-660478335),C,l,n[u+4],20,-405537848),v=o(v,C=o(C,l=o(l,d,v,C,n[u+9],5,568446438),d,v,n[u+14],9,-1019803690),l,d,n[u+3],14,-187363961),C,l,n[u+8],20,1163531501),v=o(v,C=o(C,l=o(l,d,v,C,n[u+13],5,-1444681467),d,v,n[u+2],9,-51403784),l,d,n[u+7],14,1735328473),C,l,n[u+12],20,-1926607734),v=c(v,C=c(C,l=c(l,d,v,C,n[u+5],4,-378558),d,v,n[u+8],11,-2022574463),l,d,n[u+11],16,1839030562),C,l,n[u+14],23,-35309556),v=c(v,C=c(C,l=c(l,d,v,C,n[u+1],4,-1530992060),d,v,n[u+4],11,1272893353),l,d,n[u+7],16,-155497632),C,l,n[u+10],23,-1094730640),v=c(v,C=c(C,l=c(l,d,v,C,n[u+13],4,681279174),d,v,n[u],11,-358537222),l,d,n[u+3],16,-722521979),C,l,n[u+6],23,76029189),v=c(v,C=c(C,l=c(l,d,v,C,n[u+9],4,-640364487),d,v,n[u+12],11,-421815835),l,d,n[u+15],16,530742520),C,l,n[u+2],23,-995338651),v=f(v,C=f(C,l=f(l,d,v,C,n[u],6,-198630844),d,v,n[u+7],10,1126891415),l,d,n[u+14],15,-1416354905),C,l,n[u+5],21,-57434055),v=f(v,C=f(C,l=f(l,d,v,C,n[u+12],6,1700485571),d,v,n[u+3],10,-1894986606),l,d,n[u+10],15,-1051523),C,l,n[u+1],21,-2054922799),v=f(v,C=f(C,l=f(l,d,v,C,n[u+8],6,1873313359),d,v,n[u+15],10,-30611744),l,d,n[u+6],15,-1560198380),C,l,n[u+13],21,1309151649),v=f(v,C=f(C,l=f(l,d,v,C,n[u+4],6,-145523070),d,v,n[u+11],10,-1120210379),l,d,n[u+2],15,718787259),C,l,n[u+9],21,-343485551),l=r(l,i),d=r(d,a),v=r(v,h),C=r(C,g);return[l,d,v,C]}function a(n){var r,t="",u=32*n.length;for(r=0;r<u;r+=8)t+=String.fromCharCode(n[r>>5]>>>r%32&255);return t}function h(n){var r,t=[];for(t[(n.length>>2)-1]=void 0,r=0;r<t.length;r+=1)t[r]=0;var u=8*n.length;for(r=0;r<u;r+=8)t[r>>5]|=(255&n.charCodeAt(r/8))<<r%32;return t}function g(n){return a(i(h(n),8*n.length))}function l(n,r){var t,u,e=h(n),o=[],c=[];for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),t=0;t<16;t+=1)o[t]=909522486^e[t],c[t]=1549556828^e[t];return u=i(o.concat(h(r)),512+8*r.length),a(i(c.concat(u),640))}function d(n){var r,t,u="";for(t=0;t<n.length;t+=1)r=n.charCodeAt(t),u+="0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r);return u}function v(n){return unescape(encodeURIComponent(n))}function C(n){return g(v(n))}function A(n){return d(C(n))}function m(n,r){return l(v(n),v(r))}function s(n,r){return d(m(n,r))}function b(n,r,t){return r?t?m(r,n):s(r,n):t?C(n):A(n)}$.md5=b}();
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

# 途虎养车

> 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可

## 配置 (Surge)

```properties
[MITM]
api.tuhu.cn

[Script]
http-request https://api.tuhu.cn/User/GetUserCurrentAndNextGradeInfo script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.Cookie.js
cron "10 0 8 * * *" script-path=https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.js

```

## 配置 (QuanX)

```properties
[MITM]
api.tuhu.cn

[rewrite_local]
# 190及以后版本
https://api.tuhu.cn/User/GetUserCurrentAndNextGradeInfo url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.Cookie.js


[task_local]
10 0 8 * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/tuhu/tuhu.js, enabled=true

```

## 说明

1. 先在浏览器登录 `(先登录! 先登录! 先登录!)`
2. 先把`api.tuhu.cn`加到`[MITM]`
3. 再配置重写规则:
   - Surge: 把两条远程脚本放到`[Script]`
   - QuanX: 把`tuhu.Cookie.js`和`tuhu.js`传到`On My iPhone - Quantumult X - Scripts` (传到 iCloud 相同目录也可, 注意要打开 quanx 的 iCloud 开关)
4. 打开途虎AP：依次打开 我的->每日免费领积分
5. 系统提示: `获取Cookie: 成功`
6. 最后就可以把第 1 条脚本注释掉了

> 第 1 条脚本是用来获取 cookie 的, 用浏览器访问一次获取 cookie 成功后就可以删掉或注释掉了, 但请确保在`登录成功`后再获取 cookie.

> 第 2 条脚本是签到脚本, 每天`08:00:10`执行一次.

## 常见问题

1. 无法写入 Cookie

   - 检查 Surge 系统通知权限放开了没
   - 如果你用的是 Safari, 请尝试在浏览地址栏`手动输入网址`(不要用复制粘贴)

2. 写入 Cookie 成功, 但签到不成功

   - 看看是不是在登录前就写入 Cookie 了
   - 如果是，请确保在登录成功后，再尝试写入 Cookie

3. 为什么有时成功有时失败

   - 很正常，网络问题，哪怕你是手工签到也可能失败（凌晨签到容易拥堵就容易失败）



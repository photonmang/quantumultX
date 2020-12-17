# QQ阅读多账号版

> 代码已同时兼容 QuantumultX,Surge,Loon, 使用同一份签到脚本即可

## 配置 
```properties
############## 圈x

#企鹅读书获取更新body
https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track url script-request-body https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js
https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? url script-request-header https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js

############## loon

//企鹅读书获取更新body
http-request https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js,requires-body=true, tag=企鹅读书获取更新body
//企鹅读书获取时长cookie
http-request https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid? script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js, requires-header=true, tag=企鹅读书获取时长cookie

############## surge

//企鹅读书获取更新body
企鹅读书获取更新body = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/log\/v4\/mqq\/track,script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js, 
//企鹅读书获取时长cookie
企鹅读书获取时长cookie = type=http-request,pattern=https:\/\/mqqapi\.reader\.qq\.com\/mqq\/addReadTimeWithBid?,script-path= https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreadck.js, 


```
## 说明

1. 圈X用户可直接添加重写配置来获取cookie
  - 点击右下角风车-找到重写-点击引用-点击右上角+号-粘贴如下链接
  - https://raw.githubusercontent.com/photonmang/quantumultX/master/config/Cookie.conf
    -  如果出现获取的cookie跑阅读的时候没有时长增加，可能是因为挂V速度较慢导致获取问题，可以替换成如下重写
    -  https://gitee.com/photonmang/quantumult-x/raw/master/qqreadck.conf
  
2. 在构建请求中添加执行脚本，可直接使用本库订阅（请先更新到最新版本圈X）
   - 点击右下角风车-找到构建请求-进去后点击左上角最左边的多文件夹重叠的图标-进入后点击右边的+号-粘贴如下链接
   - 点击右下角风车-找到重写-点击引用-点击右上角+号-粘贴如下链接。并添加QQ阅读自定义账号版的task任务
   https://raw.githubusercontent.com/photonmang/quantumultX/master/config/taskall.json
    - 如暂时无订阅版本圈X并无法进行订阅，可手工在圈X配置页[task]下添加以下执行脚本
    -  */11 * * * * https://raw.githubusercontent.com/photonmang/quantumultX/master/cache/qqreads1.js, tag=QQ阅读自定义账号, img-url=https://raw.githubusercontent.com/Orz-3/task/master/QQ.png, enabled=true

3. 在boxjs订阅本库订阅地址
  - 打开boxjs.net(商店版本boxjs.com），点击订阅-右上角+号-输入如下订阅地址
  - https://raw.githubusercontent.com/photonmang/quantumultX/master/photonmang.boxjs.json

4. 在boxjs中点击应用，找到已添加的本库订阅，点击[QQ阅读多账号自定义版]右边的星星。（会自动收藏到首页）
   - 在点击首页，找到QQ阅读订阅进入，并进行相关配置
   - 第一行请填写需要获取的cookie号数字，如获取第一个账号，填写1
   - 第二行请填写您需要运行的账号数，如3个账号，请填写3
   - 全部设置好后记得一定要点击保存！否则配置不会生效
   
5. QQ阅读的CK获取方法
    - 在boxjs中中间部分填写1，点击保存设置，我们来获取第一个账号。
    - ⚠️cookie获取方法：
      - 进 http://m.q.qq.com/a/s/1f8dd6728bc6193e1fc52478bd73df14  点书库，然后随便找一本书进入阅读，阅读10秒以内请马上返回，这时候会提醒获取到3个更新
      - body更新，url更新，time更新。记得一定要获取三个更新，否则可能执行过程中出现无法获取奖励的问题
    - 特别注意：在boxjs中设置要获取的第一个COOKIE，请记得一定要输入完后点击保存。设置完第一个后再设置第二个，依次类推。

6. 关于1金币问题，一般都是cookie获取的body不完整导致的，如果出现1金币问题，请重新到书库进行更新cookie，哪个账号问题的，请输入对应账号数字进行保存设置后再去获取，以免覆盖掉正常账号。




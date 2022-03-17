// ==UserScript==
// @name Cookie同步
// @namespace https://github.com/iamxiyang/user-script
// @version 0.3.0
// @description 同步另一个站点的Cookie到当前站点，可以在本地启动多个项目开发时方便的共享相同的Cookie
// @author hexiyang
// @homepage https://hexiyang.cn
// @updateURL https://github.com/iamxiyang/user-script/raw/master/sync-cookie.user.js
// @downloadURL https://github.com/iamxiyang/user-script/raw/master/sync-cookie.user.js
// @connect .cn
// @connect .com
// @match http://*/*
// @match https://*/*
// @noframes
// @grant GM_cookie
// @grant GM_getValue
// @grant GM_registerMenuCommand
// ==/UserScript==

// 特别说明：某些站点可能提示无权限操作Cookie，是因为@connect匹配不到，此时需要自己需要匹配规则。看了脚本猫的源码，不支持使用通配符获取权限，是根据域名后缀来匹配的，目前内置了.cn/.com，如需其他站点可以自行修改 @connect

/* ==UserConfig==
config:
  url:
    title: '默认同步的域名'
    description: '如果频繁需要同步一个站点的cookie到其他站点，可以在此配置，不需要每次输入'
    type: text
 ==/UserConfig== */

;(function () {
  'use strict'

  const delAllCookies = () => {
    // 删除当前网址的全部Cookies
    GM_cookie(
      'list',
      {
        domain: window.location.hostname,
      },
      (list) => {
        console.log('delAllCookies获取到的Cookies', list)
        for (let i = 0; i < list.length; i++) {
          GM_cookie('delete', {
            ...list[i],
            url: window.location.origin,
          })
        }
      },
    )
  }

  const syncCookies = () => {
    const defaultDomain = GM_getValue('config.url', '')
    const domain = prompt('请输入Cookie来源站点，不要带域名协议，不要带路径', defaultDomain)
    if (!domain) {
      alert('没有检测到域名，不进行同步')
      return
    }
    GM_cookie(
      'list',
      {
        domain: domain,
      },
      (list) => {
        console.log('syncCookies获取到的Cookies', list)
        if (list.length) {
          // 循环set
          for (let i = 0; i < list.length; i++) {
            GM_cookie('set', {
              ...list[i],
              domain: window.location.hostname,
              url: window.location.origin,
            })
          }
          // GM_cookie是异步的,防止没执行完隔两秒刷新
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      },
    )
  }

  // 注册操作菜单
  GM_registerMenuCommand('清空当前站点Cookies', delAllCookies)
  GM_registerMenuCommand('同步Cookies到当前站点', syncCookies)
})()

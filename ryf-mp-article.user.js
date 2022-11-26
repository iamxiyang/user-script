// ==UserScript==
// @name 阮一峰公众号阅读优化
// @namespace https://github.com/iamxiyang/user-script
// @version 0.0.1
// @description 通过微信公众号阅读阮一峰周刊时，跳转参考链接不方便，通过脚本来优化一下
// @author hexiyang
// @homepage https://hexiyang.cn
// @updateURL https://github.com/iamxiyang/user-script/raw/main/ryf-mp-article.user.js
// @downloadURL https://github.com/iamxiyang/user-script/raw/main/ryf-mp-article.user.js
// @connect mp.weixin.qq.com
// @include *://mp.weixin.qq.com/*
// @include *://mp.weixin.qq.com/*
// @require https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js

// ==/UserScript==
$(function () {
  const main = () => {
    const sups = $('.rich_media_content sup')
    for (let i = 0; i < sups.length; i++) {
      const sup = sups[i]
      const text = $(sup).text()
      if (text[0] !== '[') continue
      const codeEl = $(`.rich_media_content code:contains('${text}')`)
      if (!codeEl) continue
      const codeEmEl = $(codeEl).next('em').length ? $(codeEl).next('em') : $(codeEl).nextUntil('', 'em').eq(0)
      const href = codeEmEl.text()
      if (!href || (!href.startsWith('http') && !href.startsWith('//'))) continue
      $(sup).wrap(`<a href="${href}" target="_blank"></a>`)
    }
  }
  main()
})

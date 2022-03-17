// ==UserScript==
// @name 自动点击PC微博广告的不感兴趣
// @namespace https://github.com/iamxiyang/user-script
// @version 0.2.0
// @description 新版PC微博采取了虚拟列表，使用广告过滤工具会显示很多空白，这个脚本通过监听滚动，自动把可能出现的广告点击x->不感兴趣
// @author hexiyang
// @homepage https://hexiyang.cn
// @updateURL https://github.com/iamxiyang/user-script/raw/master/weibo-ad-script.user.js
// @downloadURL https://github.com/iamxiyang/user-script/raw/master/weibo-ad-script.user.js
// @connect www.weibo.com
// @include *://weibo.com/*
// @include *://www.weibo.com/*
// @require https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @require https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js

// ==/UserScript==
$(function () {
  // debug模式会在控制台输出log
  const IS_DEBUG = true

  // 输出日志
  const log = (content) => {
    if (IS_DEBUG) {
      console.log(content)
    }
  }

  // 微博信息流点击不感兴趣
  const closeWeiboAd = () => {
    // 寻找微博广告

    const ads = $('.vue-recycle-scroller__item-wrapper > div > div > article > div > header > div.woo-box-flex > div > span > div > i')
    if (ads.length > 0) {
      for (let i = 0, len = ads.length; i < len; i++) {
        // log($(ads[i]).attr('title'))
        if ($(ads[i]).attr('title') === '负反馈') {
          $(ads[i]).parents('.morepop_moreIcon_1RvP9').click()
          setTimeout(() => {
            $(parent).find('.woo-pop-wrap-main div').first().click()
            log('已关闭广告1条')
          })
        }
      }
    }
  }

  // 避免在滚动时过分触发
  jQuery(window).on('scroll', _.throttle(closeWeiboAd, 800))
})

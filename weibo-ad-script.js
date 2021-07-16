// ==UserScript==
// @name 自动点击PC微博广告的不感兴趣
// @namespace https://github.com/iamxiyang/user-script
// @version 0.1.0
// @description 新版PC微博采取了虚拟列表技术，直接使用广告过滤工具会显示很多空白，这个脚本通过监听滚动，自动把可能出现的广告点击x->不感兴趣
// @author hexiyang
// @connect www.weibo.com
// @include *://weibo.com/*
// @include *://www.weibo.com/*
// @require https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @require https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js

// ==/UserScript==
$(function () {

  // debug模式会在控制台输出log
  const IS_DEBUG = true;

  /*
  微博广告特征：
  ~weibo.com##.con_ad
  weibo.com###pl_common_ali
  weibo.com##.UG_bn_a
  weibo.com##.pic_ad
  weibo.com##.tag_showTopicL[href^="https://shop.sc.weibo.com/"]
  weibo.com##div[ad-data]
  weibo.com##div[feedtype = "ad"]
  weibo.com# ?#.card-content > ul > li : -abp-has(> p > .icon-txt-recommend)
  weibo.com# ?#.card-wrap : -abp-has(> .card-film > .card-head > .title: -abp-contains(广告))
  weibo.com# ?#.vue-recycle-scroller__item-view : -abp-has(.wbpro-ad-tag: -abp-contains(广告))
  weibo.com# ?#tr : -abp-has(> .td-03 > .icon-txt-recommend)
  特征来源：https://github.com/AdguardTeam/AdguardFilters#adguard-filters
  */

  // 输出日志
  const log = (content) => {
    if (IS_DEBUG) {
      console.log(content)
    }
  }

  // 微博信息流点击不感兴趣
  const closeWeiboAd = () => {
    // 寻找微博广告
    const ads = $('.vue-recycle-scroller__item-view .wbpro-ad-tag:contains("广告")');
    if (ads.length > 0) {
      for (let i = 0, len = ads.length; i < len; i++) {
        const parent = $(ads[0]).parents('.vue-recycle-scroller__item-view');
        $(parent).find('.morepop').click();
        setTimeout(() => {
          $(parent).find('.woo-pop-wrap-main div').first().click();
          log('已关闭广告1条')
        })
      }
    }
  };

  // 避免在滚动时过分触发
  jQuery(window).on('scroll', _.throttle(closeWeiboAd, 800));

});

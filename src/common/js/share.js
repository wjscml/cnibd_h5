import wx from 'weixin-js-sdk'
import {postApi} from '../../api/getApi.js'

export function wxInit (sd) {
  let links = `${window.location.href}`
  let title = sd.title
  let desc = sd.summary
  let imgUrl = sd.thumb
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    })
    // 微信分享菜单测试
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    })
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    })
    wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    })
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      },
      cancel: function () {
      }
    })
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
}

export function share (val) {
  let url = encodeURIComponent(`${window.location.href}`)
  postApi('site.sign', {shareUrl: url}).then(res => {
    if (res.data.errorCode === '0') {
      wx.config({
        debug: false,
        appId: res.data.data.signPackage.appId,
        timestamp: res.data.data.signPackage.timestamp,
        nonceStr: res.data.data.signPackage.nonceStr,
        signature: res.data.data.signPackage.signature,
        jsApiList: [
          'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
        ]
      })
      wxInit(val)
    }
  })
}

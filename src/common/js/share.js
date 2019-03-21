import wx from 'weixin-js-sdk'
import { getSign } from 'api'

export function wxInit (val) {
  let links = `${window.location.href}`
  let title = val.title
  let desc = val.summary
  let imgUrl = val.thumb
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
      // 用户点击了分享后执行的回调函数
      }
    })
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
      // 用户点击了分享后执行的回调函数
      }
    })
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
      // 用户确认分享后执行的回调函数
      },
      cancel: function () {
      // 用户取消分享后执行的回调函数
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
  })
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
}

export function share (val) {
  let url = encodeURIComponent(`${window.location.href}`)
  getSign({ shareUrl: url }).then(res => {
    wx.config({
      debug: false,
      appId: 'wxb5b03bf29736518a',
      timestamp: res.signPackage.timestamp,
      nonceStr: res.signPackage.nonceStr,
      signature: res.signPackage.signature,
      jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'
      ]
    })
    wxInit(val)
  })
}

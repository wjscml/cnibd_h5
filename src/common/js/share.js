import wx from 'weixin-js-sdk'
import {getApi} from '../../api/getApi.js'

export function wxInit (val) {
  let links = `${window.location.href}`
  let title = val.title
  let desc = val.summary
  let imgUrl = val.thumb
  wx.ready(function () {
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl // 分享图标
    }, function (res) {
      // 这里是回调函数
    })
    wx.updateTimelineShareData({
      title: title, // 分享标题
      link: links, // 分享链接
      imgUrl: imgUrl // 分享图标
    }, function (res) {
      // 这里是回调函数
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
  console.log(url)
  getApi(`/sign?share_url=${url}`).then(res => {
    if (res.data.errorCode === 0) {
      wx.config({
        debug: true,
        appId: 'wxb5b03bf29736518a',
        timestamp: res.data.data.signPackage.timestamp,
        nonceStr: res.data.data.signPackage.nonceStr,
        signature: res.data.data.signPackage.signature,
        jsApiList: [
          'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo'
        ]
      })
      wxInit(val)
    }
  })
}

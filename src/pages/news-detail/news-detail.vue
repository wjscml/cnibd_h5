<template>
  <div class="article" v-wechat-title="newsDetails.title">
    <div class="article-header">
        <h1 class="article-title">{{newsDetails.title}}</h1>
        <div class="article-info">
            <div class="author">
                <span class="avatar"><img :src="newsDetails.author_avatar" alt="avatar"></span>
                <span class="name">{{newsDetails.author_name}}</span>
            </div>
            <div class="time">{{newsDetails.publish_time}}</div>
        </div>
    </div>
    <div class="article-content" v-html="newsDetails.content">
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {getApi} from '../../api/getApi.js'

const ERR_OK = 0
export default {
  data () {
    return {
      newsDetails: []
    }
  },
  created () {
  },
  mounted () {
    this.httpGet()
  },
  methods: {
    httpGet () {
      getApi(`/detail-share?article_id=${this.$route.params.id}&share_url=${window.location.href}`).then(res => {
        console.log(window.location.pathname)
        if (res.data.errorCode === ERR_OK) {
          this.newsDetails = res.data.data
          console.log(this.newsDetails)
          wx.config({
            debug: true,
            appId: this.newsDetails.signPackage.appId,
            timestamp: this.newsDetails.signPackage.timestamp,
            nonceStr: this.newsDetails.signPackage.nonceStr,
            signature: this.newsDetails.signPackage.signature,
            jsApiList: [
              'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
            ]
          })
          this.wxInit(this.newsDetails)
        }
      })
    },
    wxInit (sd) {
      let links = `${location.origin}${location.pathname}`
      console.log(links)
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
            alert('分享到朋友圈成功')
          },
          cancel: function () {
            alert('分享失败,您取消了分享!')
          }
        })
        // 微信分享菜单测试
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            alert('成功分享给朋友')
          },
          cancel: function () {
            alert('分享失败,您取消了分享!')
          }
        })
        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            alert('成功分享给QQ')
          },
          cancel: function () {
            alert('分享失败,您取消了分享!')
          }
        })
        wx.onMenuShareWeibo({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            alert('成功分享给朋友')
          },
          cancel: function () {
            alert('分享失败,您取消了分享!')
          }
        })
        wx.onMenuShareQZone({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success: function () {
            alert('成功分享给朋友')
          },
          cancel: function () {
            alert('分享失败,您取消了分享!')
          }
        })
      })
      wx.error(function (res) {
        alert('error')
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;] + ;( U;) ? CPU. + Mac OS X/) // ios终端
    // XXX: 修复iOS版微信HTML5 History兼容性问题
    if (isiOS && to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
.article
  padding: 0 2rem
  background-color #fff
  .article-header
    padding 3rem 0
    .article-title
      font-size: 2rem
      line-height: 3.2rem
      margin-bottom: 2.4rem
      font-weight: bold
      color: #333
    .article-info
      display: flex
      justify-content: space-between
      margin-bottom: 1.5rem
      .author
        font-size 0
        .avatar
          display: inline-block
          vertical-align: top
          line-height 2rem
          img
            width: 2rem
            height: 2rem
            border-radius: 50%
        .name
          display: inline-block
          line-height 2rem
          font-size:1.4rem
          margin-left: 8px
          color: #666
      .time
        display: inline-block
        line-height 2rem
        font-size: 1.4rem
        color: #999
  .article-content
    font-size: 1.6rem
    color: #333
    p
      margin-bottom: 2.4rem
      word-wrap: break-word
      img
        max-width: 100%
        margin: 0 auto
        display: block
    h1,h2
      margin-bottom 2.4rem
      font-size 1.6rem
      color #1f8bee
</style>

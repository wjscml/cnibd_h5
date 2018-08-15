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
    this.httpGet()
  },
  mounted () {

  },
  methods: {
    httpGet () {
      getApi(`/detail-share?article_id=${this.$route.params.id}&share_url=${window.location.href}`).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.newsDetails = res.data.data
          console.log(this.newsDetails.signPackage)
          this.wxInit(this.newsDetails.signPackage)
        }
      })
    },
    wxInit (sd) {
    // alert(window.location.href)
      let links = encodeURIComponent(window.location.href)
      let title = this.newsDetails.title
      let desc = this.newsDetails.summary
      let imgUrl = this.newsDetails.thumb
      wx.config({
        debug: true,
        appId: sd.appId,
        timestamp: sd.timestamp,
        nonceStr: sd.nonceStr,
        signature: sd.signature,
        jsApiList: [
          'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
        ]
      })
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

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
// import wx from 'weixin-js-sdk'
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
        console.log(res.data)
        if (res.data.errorCode === ERR_OK) {
          this.newsDetails = res.data.data
          this.wxInit(this.newsDetails.signPackage)
        }
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

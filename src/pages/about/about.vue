<template>
  <div v-html="about">
  </div>
</template>

<script>
import {getApi} from '../../api/getApi.js'
import {htmlDecode} from '../../common/js/htmlUtil.js'
import wx from 'weixin-js-sdk'
import {wxInit} from '../../common/js/share.js'

const ERR_OK = 0
export default {
  data () {
    return {
      about: ''
    }
  },
  created () {
    this.getAbout()
  },
  mounted () {
    this.share()
  },
  methods: {
    getAbout () {
      getApi('/about').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.about = htmlDecode(res.data.data.content)
        }
      }).catch(error => {
        if (!error.res) {
          this.about = '网络不给力，请稍后重试'
        }
      })
    },
    share () {
      let url = encodeURIComponent(`${window.location.href}`)
      getApi(`/sign?share_url=${url}`).then(res => {
        console.log(res)
        if (res.data.errorCode === ERR_OK) {
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
          wxInit(res.data.data)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.about-content
  padding 4rem 2rem
  background-color #fff
  p
    margin-bottom 1rem
    line-height 2.4rem
    font-size 1.5rem
    color #393a4c
    &:nth-last-child(1)
      margin-bottom 0
    &.title
      padding-left 0.7rem
      margin-bottom 2rem
      border-left 2px solid #1f8bee
      line-height 1.6rem
      font-size 1.6rem
      font-weight 600
      &.contactWrapper
        margin-top 3rem
</style>

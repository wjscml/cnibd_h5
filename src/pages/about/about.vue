<template>
  <div v-html="about">
  </div>
</template>

<script>
import {getApi, postApi} from '../../api/getApi.js'
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
    this.code = this.$route.query.code
    this.wxLogin()
    this.getAbout()
  },
  mounted () {
    this.share()
  },
  methods: {
    wxLogin () {
      postApi('user.wxLogin', {code: this.code}).then(res => {
        console.log(res)
        if (res.data.errorCode === '0') {
          alert('成功登陆！')
          console.log(res.data)
          if (window.history.length <= 1) {
            this.$router.push({path: '/index'})
            return false
          } else {
            this.$router.back()
          }
        } else {
          this.errors.push(res.data.errorMessage)
        }
      })
    },
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

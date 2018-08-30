<template>
  <div id="index">
    <div v-if="slide.length" class="slider-wrapper">
      <slider>
        <div class="slider-item" v-for="(item, index) in slide" :key="index">
          <a :href="item.url" class="slider-pic">
            <img :src="item.thumb">
          </a>
          <p class="slider-info">{{item.title}}</p>
        </div>
      </slider>
    </div>
    <v-news :isFixed="isFixed"></v-news>
  </div>
</template>

<script>
import Slider from '../../components/slider/slider.vue'
import News from '../../components/news/news.vue'
import {getApi} from '../../api/getApi.js'
import wx from 'weixin-js-sdk'
import {wxInit} from '../../common/js/share.js'

const ERR_OK = 0
export default {
  data () {
    return {
      slide: [],
      isFixed: null,
      navTop: 0
    }
  },
  created () {
    this.httpGet()
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
      this.share()
    }, 20)
  },
  methods: {
    httpGet () {
      getApi('/slide').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.slide = res.data.data
        }
      })
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 240) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    _getNewsNavtop () {
      this.navTop = this.$refs.newsWrapper.getBoundingClientRect().top
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
  },
  components: {
    'slider': Slider,
    'v-news': News
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
.slider-wrapper
  height 18rem
  margin-bottom 0.6rem
  .slider
    min-height: 1px
    overflow: hidden
    .slider-group
      overflow: hidden
      height 18rem
      .slider-item
        position relative
        float: left
        .slider-pic
          display block
          img
            width 100%
            height 18rem
        .slider-info
          overflow hidden
          box-sizing border-box
          position absolute
          bottom 0
          left 0
          width 100%
          padding 0 2rem
          line-height 3rem
          font-size 1.6rem
          background-color rgba(0,0,0,0.5)
          color #fff
          text-align center
          white-space nowrap
          text-overflow ellipsis

</style>

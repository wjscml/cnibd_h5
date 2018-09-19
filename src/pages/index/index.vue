<template>
  <div id="index">
    <div v-if="slide.length" class="slider-wrapper" ref="sliderWrapper">
      <slider>
        <div class="slider-item" v-for="(item, index) in slide" :key="index">
          <a :href="item.url" class="slider-pic">
            <img :src="item.thumb" @load="loadImage">
          </a>
          <p class="slider-info">{{item.title}}</p>
        </div>
      </slider>
    </div>
    <div class="news-nav" v-if="newsNav.length" ref="navWrapper">
      <scroll :data="newsNav" :scrollX="scrollX" :scrollY="scrollY" :eventPassthrough="eventPassthrough" ref="navScroll">
        <div class="nav-content" ref="navContent">
          <div class="nav-btn" v-for="(item, index) in newsNav" :key="index" @click="change(index)" ref="navBtn">
            <span :class="{'nav-s':type===index}">{{item.name}}</span>
          </div>
        </div>
        <div class="nav-more-btn" @click="showMoreTab"></div>
      </scroll>
    </div>
    <div style="font-size: 0; line-height: 0" ref="newsMark"></div>
    <scroll @scroll="scroll" @touchToEnd="touchToEnd" @scrollToTop="scrollToTop" @pullingDown="pullingDown" :data="news" :probeType="probeType" :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" class="news-wrapper" ref="newsWrapper">
      <div class="news-content">
        <news-column :news="news" v-for="(item, index) in newsNav" :key="index" v-show="type===index"></news-column>
        <load-tips :tips="tips" :isLoad="isLoad" v-if="news.length"></load-tips>
        <load-tips :tips="downTips" class="pulldown-tips"></load-tips>
      </div>
    </scroll>
    <loading v-show="!news.length" :title="''"></loading>
    <transition name="fade">
      <div class="nav-more-wrapper" v-show="isMoreTab">
        <div>
          <h1 class="title">更多栏目</h1>
          <div class="content">
            <span class="item" v-for="(item, index) in newsNav" :key="index" @click="change(index)">{{item.name}}</span>
          </div>
        </div>
        <div class="close" @click="hideMoreTab"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Slider from '../../components/slider/slider.vue'
import Scroll from '../../components/scroll/scroll.vue'
import NewsColumn from '../../components/news-column/news-column.vue'
import LoadTips from '../../components/load-tips/load-tips.vue'
import Loading from '../../components/loading/loading.vue'
import {getApi} from '../../api/getApi.js'
import {share} from '../../common/js/share.js'

const ERR_OK = 0
export default {
  data () {
    return {
      slide: [],
      scrollH: 0,
      news: [],
      newsNav: [],
      type: 0,
      page: 0,
      tips: '上滑加载更多',
      downTips: '下拉刷新',
      isShow: true,
      isLoad: null,
      isMoreTab: null,
      shareVal: {
        title: '赛恩财经:聚合财经新媒体',
        summary: '赛恩财经，提供全球股票,外汇,期货,债券,基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯,以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  created () {
    this.scrollX = true
    this.scrollY = false
    this.eventPassthrough = 'vertical'
    this.probeType = 3
    this.pullUpLoad = true
    this.pullDownRefresh = true
    this._getSlider()
    this._getNewsNav()
    this._getNews()
  },
  mounted () {
    share(this.shareVal)
  },
  methods: {
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.newsWrapper.refresh()
        this._getNews()
        this.checkLoaded = true
      }
    },
    _getSlider () {
      getApi('/slide').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.slide = res.data.data
        } else {
          this.slide = []
        }
      })
    },
    _getNewsNav () {
      getApi('/categories').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.newsNav = res.data.data
          this.$nextTick(() => {
            let width = 0
            for (let i = 0; i < this.newsNav.length; i++) {
              width += this.$refs.navBtn[i].getBoundingClientRect().width
            }
            this.$refs.navContent.style.width = width + 'px'
          })
        }
      })
    },
    _getNews () {
      getApi(`/list?page=0&type=${this.type}`).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.news = res.data.data
          this.$nextTick(() => {
            this.navHeight = this.$refs.navWrapper.clientHeight
            this.topHeight = this.$refs.newsMark.getBoundingClientRect().top
            this.minTranslateY = this.navHeight - this.topHeight
            this.$refs.newsWrapper.$el.style.top = `${this.topHeight}px`
          })
        } else {
          this.news = []
          this.tips = '暂无数据'
        }
      }).catch(error => {
        if (!error.res) {
          this.news = []
          this.tips = '网络不给力，请稍后重试'
        }
      })
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getApi(`/list?page=${this.page}&type=${this.type}`).then((res) => {
        this.isLoad = false
        if (res.data.errorCode === ERR_OK) {
          this.news = this.news.concat(res.data.data)
          this.tips = '上滑加载更多'
        } else {
          this.tips = '没有更多数据了~'
        }
      }).catch(error => {
        if (!error.res) {
          this.isLoad = false
          this.tips = '网络不给力，请稍后重试'
        }
      })
    },
    change (i) {
      this.type = i
      this.page = 0
      this.scrollCenter(i)
      this.isMoreTab = false
    },
    scroll (pos) {
      this.scrollH = pos.y
    },
    scrollCenter (val) {
      this.$refs.navScroll.scrollToElement(this.$refs.navBtn[val], 300, true, true)
      this.$refs.navScroll.refresh()
    },
    scrollTop () {
      this.$refs.newsWrapper.scrollTo(0, this.minTranslateY, 20)
    },
    touchToEnd () {
      this.loadMore()
    },
    scrollToTop () {
      this.downTips = '松开刷新'
    },
    pullingDown () {
      this.news = []
      this.downTips = '正在刷新'
      setTimeout(() => {
        this._getNews()
        this.downTips = '下拉刷新'
      }, 400)
    },
    showMoreTab () {
      this.isMoreTab = true
    },
    hideMoreTab () {
      this.isMoreTab = false
    }
  },
  watch: {
    type (i) {
      this._getNews()
      this.scrollTop()
    },
    scrollH (newY) {
      if (newY <= 0) {
        let translateY = Math.max(this.minTranslateY, newY)
        this.$refs.navWrapper.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      }
    }
  },
  components: {
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'loading': Loading,
    'slider': Slider,
    'scroll': Scroll
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.slider-wrapper
  height 18rem
  margin-bottom 0.6rem
  .slider
    min-height: 1px
    overflow: hidden
    .slider-group
      overflow: hidden
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
.news-nav
  position relative
  width 100%
  height 4.4rem
  overflow hidden
  z-index 10
  border-1px(rgba(7,17,27,0.1))
  background-color #fff
  .nav-content
    overflow hidden
    padding-right 4rem
    .nav-btn
      float left
      display inline-block
      span
        display inline-block
        line-height 1.6rem
        font-size 1.6rem
        padding 1.4rem 2rem 1.2rem
        border-bottom 0.2rem solid #fff
        &.nav-s
          border-color #1f8bee
          color #1f8bee
  .nav-more-btn
    position absolute
    top 0
    right 0
    width 4rem
    height 4.4rem
    box-shadow -0.1rem 0 1.5rem 0.5rem #fff
    background url(./nav-more.png) no-repeat center
    background-size 4rem 4rem
    background-color #fff
.news-wrapper
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  .news-content
    position relative
    padding 0 2rem
    background-color #fff
    .pulldown-tips
      position absolute
      top -4rem
      left 0
.nav-more-wrapper
  display flex
  flex-direction column
  justify-content space-between
  position fixed
  top 0
  left 0
  width 100%
  height 100vh
  background-color rgba(7,17,27,0.9)
  transition all 0.5s
  backdrop-filter: blur(10px)
  z-index 200
  &.fade-transition
    opacity 1
  &.fade-enter, &.fade-leave
    opacity 0
  .title
    height 4.92rem
    line-height 4.92rem
    font-size 1.6rem
    border-1px(rgba(255,255,255,0.2))
    text-align center
    color #fff
  .content
    padding 0 1rem
    box-sizing border-box
    color #393a4c
    .item
      display inline-block
      width 25.33%
      height 2.8rem
      line-height 2.8rem
      vertical-align middle
      margin 2.4rem 4% 0
      border-radius 1.4rem
      text-align center
      background-color #f8f8f8
  .close
    width 4rem
    height 4rem
    margin 0 auto 7rem
    background url(./icon-close.png) no-repeat center
    background-size 4rem

</style>

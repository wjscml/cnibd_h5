<template>
  <div id="index">
    <div v-if="slide.length" class="slider-wrapper" ref="sliderWrapper">
      <slider>
        <div class="slider-item" v-for="(item, index) in slide" :key="index">
          <a :href="`/site/${item.id}`" class="slider-pic">
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
        <div class="nav-more-btn" @click="showMoreTab"><i class="icon-more"></i></div>
      </scroll>
    </div>
    <div style="font-size: 0; line-height: 0" ref="newsMark"></div>
    <scroll @scroll="scroll" @scroll-end="scrollEnd" @touchToEnd="touchToEnd" @scrollToTop="scrollToTop" @pullingDown="pullingDown" :data="news" :probeType="probeType" :listenScrollEnd="listenScrollEnd" :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" class="news-wrapper" ref="newsWrapper">
      <div class="news-content">
        <news-column :news="news"></news-column>
        <load-tips :tips="tips" :isLoad="isLoad" v-if="news.length"></load-tips>
        <load-tips :tips="downTips" class="pulldown-tips"></load-tips>
      </div>
    </scroll>
    <loading class="loading-container" v-show="!news.length" :title="''"></loading>
    <transition name="fade">
      <div class="nav-more-wrapper" v-show="isMoreTab">
        <div>
          <h1 class="title">更多栏目</h1>
          <div class="content">
            <span class="item" v-for="(item, index) in newsNav" :key="index" @click="change(index)">{{item.name}}</span>
          </div>
        </div>
        <div class="close" @click="hideMoreTab">
          <i class="icon-delete"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Slider from 'components/slider/slider.vue'
import Scroll from 'components/scroll/scroll.vue'
import NewsColumn from 'components/news-column/news-column.vue'
import LoadTips from 'components/load-tips/load-tips.vue'
import Loading from 'components/loading/loading.vue'
import { getSlider, getCategories, getNewsList } from 'api'
import { share } from 'common/js/share.js'
import { saveNewslist, loadNewslist, removeNewslist, saveType, loadType, saveScrollHeight, loadScrollHeight } from 'common/js/cache'

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
        title: document.title,
        summary: '赛恩财经，提供全球股票、外汇、期货、债券、基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (window.history.length <= 1 || from.path !== '/') {
      saveType()
      saveScrollHeight()
    }
    next()
  },
  created () {
    this.scrollX = true
    this.scrollY = false
    this.eventPassthrough = 'vertical'
    this.probeType = 3
    this.pullUpLoad = true
    this.pullDownRefresh = true
    this.listenScrollEnd = true
    this._getSlider()
    this._getNewsNav()
  },
  mounted () {
    share(this.shareVal)
  },
  methods: {
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.newsWrapper.refresh()
        this.firstGetNews()
        this.checkLoaded = true
      }
    },
    _getSlider () {
      getSlider().then(res => {
        this.slide = res.flagSlideArray
      })
    },
    _getNewsNav () {
      getCategories().then(res => {
        this.newsNav = res
        this.$nextTick(() => {
          let width = 0
          for (let i = 0; i < this.newsNav.length; i++) {
            width += this.$refs.navBtn[i].getBoundingClientRect().width
          }
          this.$refs.navContent.style.width = width + 'px'
        })
      })
    },
    _getNews () {
      getNewsList({
        page: 0,
        type: this.type
      }).then(res => {
        this.news = res
        this.$nextTick(() => {
          this.navHeight = this.$refs.navWrapper.getBoundingClientRect().height || this.$refs.navWrapper.clientHeight
          this.topHeight = this.$refs.newsMark.getBoundingClientRect().top
          this.minTranslateY = this.navHeight - this.topHeight
          this.$refs.newsWrapper.$el.style.top = `${this.topHeight}px`
          this.$refs.newsWrapper.scrollTo(0, loadScrollHeight(), 20)
        })
      })
    },
    firstGetNews () {
      this.news = loadNewslist()
      if (loadType().length !== 0) {
        this.type = loadType()
      }
      if (this.news.length === 0) {
        this._getNews()
      } else {
        this.$nextTick(() => {
          this.navHeight = this.$refs.navWrapper.clientHeight
          this.topHeight = this.$refs.newsMark.getBoundingClientRect().top
          this.minTranslateY = this.navHeight - this.topHeight
          this.$refs.newsWrapper.$el.style.top = `${this.topHeight}px`
          this.$refs.newsWrapper.scrollTo(0, loadScrollHeight(), 20)
        })
      }
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getNewsList({
        page: this.page,
        type: this.type
      }).then((res) => {
        this.isLoad = false
        if (res) {
          this.news = this.news.concat(res)
          saveNewslist(this.news)
          this.tips = '上滑加载更多'
        } else {
          this.tips = '没有更多数据了~'
        }
      })
    },
    change (i) {
      this.type = i
      saveType(i)
      this.page = 0
      this.isMoreTab = false
      this.scrollCenter(i)
      removeNewslist()
      this._getNews()
      this.scrollTop()
    },
    scroll (pos) {
      this.scrollH = pos.y
    },
    scrollEnd (pos) {
      saveScrollHeight(pos.y)
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
    padding-right 0.5rem
    width 4rem
    height 4.4rem
    line-height 0
    text-align center
    color #bfbfbf
    box-shadow -0.1rem 0 1.5rem 0.5rem #fff
    background-color #fff
    .icon-more
      line-height 4.4rem
      font-size 1.5rem
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
.loading-container
  margin-top 30%
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
  backdrop-filter: blur(10px)
  z-index 200
  &.fade-enter-active, &.fade-leave-active
     transition all 0.5s ease
  &.fade-enter, &.fade-leave-active
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
    text-align center
    .icon-delete
      line-height 4rem
      font-size 3rem
      color #fff
</style>

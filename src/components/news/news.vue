<template>
  <div id="news">
    <scroll :data="newsNav" :scrollX="scrollX" :scrollY="scrollY" :eventPassthrough="eventPassthrough" class="news-nav" :class="{'isFixed':isFixed}" v-if="newsNav.length" ref="navScroll">
      <div class="nav-content" ref="navContent">
        <div class="nav-btn" v-for="(item, index) in newsNav" :key="index" @click="change(index)" ref="navBtn">
          <span :class="{'nav-s':type===index}">{{item.name}}</span>
        </div>
      </div>
      <div class="nav-more-btn" @click="showMoreTab"></div>
    </scroll>
    <div class="news-wrapper" ref="newsWrapper">
      <news-column :class="{'isFixed':isFixed}" :news="news" v-for="(item, index) in newsNav" :key="index" v-show="type===index"></news-column>
      <div ref="bottomTip">
        <load-tips :tips="tips" :isLoad="isLoad" v-show="newsNav.length"></load-tips>
      </div>
    </div>
    <div class="loading-container" v-show="!newsNav.length">
      <loading></loading>
    </div>
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
import {getApi} from '../../api/getApi.js'
import Scroll from '../../components/scroll/scroll.vue'
import NewsColumn from '../../components/news-column/news-column.vue'
import LoadTips from '../../components/load-tips/load-tips.vue'
import Loading from '../../components/loading/loading.vue'
import Slider from '../../components/slider/slider.vue'

const ERR_OK = 0
export default {
  components: {
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'loading': Loading,
    'slider': Slider,
    'scroll': Scroll
  },
  data () {
    return {
      navTop: Number,
      news: [],
      newsNav: [],
      type: 0,
      page: 0,
      tips: '上滑加载更多',
      isLoad: null,
      isMoreTab: null
    }
  },
  props: {
    isFixed: Boolean
  },
  watch: {
    type (i) {
      this._getNews()
      this.scrollTop()
    },
    isMoreTab (curVal, oldVal) {
      if (curVal === true) {
        this.stop()
      } else {
        this.move()
      }
    }
  },
  created () {
    this.scrollX = true
    this.scrollY = false
    this.eventPassthrough = 'vertical'
    this._getNews()
    this._getNewsNav()
  },
  mounted () {
    setTimeout(() => {
      window.onscroll = this.loadMore
    }, 20)
  },
  methods: {
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
    scrollTop () {
      if (this.isFixed) {
        this.$refs.newsWrapper.scrollIntoView()
      }
    },
    loadMore () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        this.page++
        getApi(`/list?page=${this.page}&type=${this.type}`).then((res) => {
          if (res.data.errorCode === ERR_OK) {
            this.news = this.news.concat(res.data.data)
            this.tips = '正在加载'
            this.isLoad = true
          } else {
            this.tips = '没有更多数据了~'
            this.isLoad = false
          }
        }).catch(error => {
          if (!error.res) {
            this.tips = '网络不给力，请稍后重试'
          }
        })
      }
    },
    change (i) {
      this.type = i
      this.page = 0
      this.scrollCenter(i)
      this.isMoreTab = false
    },
    scrollCenter (val) {
      this.$refs.navScroll.scrollToElement(this.$refs.navBtn[val], 300, true, true)
      this.$refs.navScroll.refresh()
    },
    showMoreTab () {
      this.isMoreTab = true
    },
    hideMoreTab () {
      this.isMoreTab = false
    },
    /** 滑动限制 **/
    stop () {
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false)
    },
    /** 取消滑动限制 **/
    move () {
      var mo = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', mo, false)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.loadMore)
  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
#news
  .news-nav
    position relative
    width 100%
    height 4.4rem
    overflow hidden
    border-1px(rgba(7,17,27,0.1))
    background-color #fff
    &.isFixed
      position fixed
      top 0
      background-color #fff
      z-index 100
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
    padding 0 2rem
    overflow hidden
    background-color #fff
    .isFixed
      margin-top 4.4rem
  .loading-container
    position absolute
    width 100%
    top 60%
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

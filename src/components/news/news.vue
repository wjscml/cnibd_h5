<template>
  <div id="news">
    <div class="news-nav" ref="navWrapper" :class="{'isFixed':isFixed}">
      <div class="nav-content" ref="navContent">
        <div class="nav-btn" v-for="(item, index) in newsNav" :key="index" @click="change(index)" ref="navBtn">
          <span :class="{'nav-s':type===index}">{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="news-wrapper" ref="newsWrapper" :class="{'isFixed':isFixed}">
      <news-column :news="news" v-for="(item, index) in newsNav" :key="index" v-show="type===index"></news-column>
      <div v-show="newsNav.length" class="bottom-tip" ref="bottomTip">
        <img src="./loading.png" v-show="isLoad">
        <span class="loading-hook">{{tips}}</span>
      </div>
    </div>
    <div class="loading-container" v-show="!newsNav.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import {getApi} from '../../api/getApi.js'
import BScroll from 'better-scroll'
import NewsColumn from '../../components/news-column/news-column.vue'
import Loading from '../../components/loading/loading.vue'

const ERR_OK = 0
export default {
  components: {
    'news-column': NewsColumn,
    'loading': Loading
  },
  data () {
    return {
      navTop: Number,
      news: [],
      newsNav: [],
      type: 0,
      page: 0,
      tips: '上滑加载更多',
      isLoad: null
    }
  },
  props: {
    isFixed: Boolean
  },
  watch: {
    type (i) {
      this._getNews()
      this.scrollTop()
    }
  },
  created () {
    this._getNews()
  },
  mounted () {
    setTimeout(() => {
      this._getNewsNav()
      window.addEventListener('scroll', this.loadMore)
    }, 20)
  },
  methods: {
    _getNewsNav () {
      getApi('/categories').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.newsNav = res.data.data
          this.$nextTick(() => {
            let width = 0
            for (let i = 0; i < this.newsNav.length - 1; i++) {
              width += this.$refs.navBtn[i].getBoundingClientRect().width
            }
            this.$refs.navContent.style.width = width + 'px'
            console.log(width)
            this.navScroll = new BScroll(this.$refs.navWrapper, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            })
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
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      var bottomTipHeight = this.$refs.bottomTip.getBoundingClientRect().top
      if (bottomTipHeight < windowHeight) {
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
    width 100%
    height calc(4.2rem+2px)
    overflow hidden
    border-1px(rgba(7,17,27,0.1))
    background-color #fff
    .nav-content
      overflow hidden
      .nav-btn
        float left
        display inline-block
        span
          display inline-block
          line-height 1.6rem
          font-size 1.6rem
          padding 1.4rem 2rem 1.2rem
          border-bottom 2px solid #fff
          &.nav-s
            border-color #1f8bee
            color #1f8bee
    &.isFixed
      position fixed
      top 0
      background-color #fff
      z-index 999
  .news-wrapper
    padding 0 2rem
    overflow hidden
    background-color #fff
    &.isFixed
      padding-top 4.3rem
    .bottom-tip
      height 4rem
      line-height 4rem
      text-align center
      .loading-hook
        font-size 1.2rem
        color #757575
      img
        vertical-align middle
        width 1.4rem
        height 1.4rem
        -webkit-animation: loadingRotate .4s linear infinite forwards
        animation: loadingRotate .4s linear infinite forwards
  .loading-container
    position absolute
    width 100%
    top 60%

</style>

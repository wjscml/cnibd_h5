<template>
  <transition name="slide">
    <div class="columnist-author" v-wechat-title="authorInfo.nickname">
      <div class="top-wrapper" ref="top">
        <div class="avatar">
          <img class="image" :src="authorInfo.avatar" @load="loadTop">
          <i :class="{'vip': authorInfo.is_certificate === 1}"></i>
        </div>
        <div class="text">
          <h1 class="name">{{authorInfo.nickname}}</h1>
          <p class="intro">{{authorInfo.description}}</p>
        </div>
        <div class="back" @click="back" ref="bar">
          <i class="icon-back" :class="{'icon-back-black': isScrollTop}"></i>
        </div>
        <div class="title" v-show="isScrollTop">{{authorInfo.nickname}}</div>
        <div class="background" ref="bgImage">
          <img :src="authorInfo.avatar">
        </div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll @scroll="scroll" @scrollToEnd="scrollToEnd" :data="news" :pullUpLoad="pullUpLoad" :probeType="probeType" :listenScroll="listenScroll" class="list" ref="list">
        <news-column :news="news" class="news-column"></news-column>
        <load-tips :tips="tips" :isLoad="isLoad" v-show="news.length" class="load-tips"></load-tips>
      </scroll>

    </div>
  </transition>
</template>

<script>
import Scroll from '../../components/scroll/scroll.vue'
import NewsColumn from '../../components/news-column/news-column.vue'
import LoadTips from '../../components/load-tips/load-tips.vue'
import {getApi} from '../../api/getApi.js'
import {mapGetters} from 'vuex'
import {share} from '../../common/js/share.js'

const ERR_OK = 0
export default {
  data () {
    return {
      news: [],
      authorInfo: [],
      page: 0,
      tips: '上滑加载更多',
      isLoad: null,
      scrollY: 0,
      isScrollTop: null,
      shareVal: {}
    }
  },
  components: {
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'scroll': Scroll
  },
  computed: {
    ...mapGetters([
      'author'
    ])
  },
  mounted () {
    share(this.shareVal)
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.pullUpLoad = true
    this._getAuthor()
  },
  methods: {
    loadTop () {
      this.$refs.list.refresh()
    },
    _getAuthor () {
      getApi(`/author-publish?page=0&author_id=${this.$route.params.id}`).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.authorInfo = res.data.data.userInfo
          this.$nextTick(() => {
            this.topHeight = this.$refs.top.clientHeight
            this.barHeight = this.$refs.bar.clientHeight
            this.minTranslateY = this.barHeight - this.topHeight
            this.$refs.list.$el.style.top = `${this.topHeight}px`
          })
          this.news = res.data.data.publishArticles

          this.shareVal.title = this.authorInfo.nickname
          this.shareVal.summary = this.authorInfo.description
          this.shareVal.thumb = this.authorInfo.avatar
          share(this.shareVal)
        } else {
          this.tips = '暂无数据'
        }
      }).catch(error => {
        if (!error.res) {
          this.tips = '网络不给力，请稍后重试'
        }
      })
    },
    loadMore () {
      getApi(`/author-publish?page=${this.page}&author_id=${this.$route.params.id}`).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.news = this.news.concat(res.data.data.publishArticles)
        } else {
          this.tips = '没有更多数据了~'
          this.isLoad = false
        }
      }).catch(error => {
        if (!error.res) {
          this.tips = '网络不给力，请稍后重试'
        }
      })
    },
    back () {
      if (window.history.length <= 1) {
        this.$router.push({path: '/columnist'})
        return false
      } else {
        this.$router.back()
      }
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    scrollToEnd () {
      console.log('123')
      this.page++
      this.loadMore()
    }
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
      if (newY > this.minTranslateY) {
        this.isScrollTop = false
      } else {
        this.isScrollTop = true
      }

      let scale = 1
      const percent = Math.abs(newY / this.topHeight)
      if (newY > 0) {
        scale = 1 + percent
      }
      this.$refs.bgImage.style['transform'] = `scale(${scale})`
      let newHeight = this.topHeight * scale
      this.$refs.top.style['height'] = `${newHeight}px`
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.columnist-author
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #fff
  .top-wrapper
    position relative
    overflow hidden
    box-sizing border-box
    padding 1.4rem 2rem
    background-color rgba(7,17,27,0.4)
    .avatar
      position relative
      width 7rem
      height 7rem
      margin 0 auto
      padding 0.4rem
      border 0.1rem solid #e0e0e0
      border-radius 50%
      background-color #f5f5f5
      .image
        width 7rem
        height 7rem
        border-radius 50%
      .vip
        position absolute
        right 0
        bottom 0
        background-image url(../../common/image/vip-steps.png)
    .text
      padding 1.5rem 2rem 0
      text-align center
      color #fff
      .name
        margin-bottom 1rem
        line-height 1.8rem
        font-size 1.8rem
        font-weight 600
      .intro
        line-height 1.8rem
        font-size 1.2rem
    .back
      position absolute
      top 0
      left 0.4rem
      z-index 50
      .icon-back
        display block
        padding 1rem
        width 3rem
        height 3rem
        background url(../../common/image/back.png) no-repeat center
        background-size 3rem
      .icon-back-black
        background-image url(../../common/image/back-b.png)
    .title
      border-1px(rgba(7,17,27,0.1))
      position absolute
      top 0
      left 0
      width 100%
      height 5rem
      line-height 5rem
      font-size 1.8rem
      text-align center
      color #393a4c
      background-color #fff
      z-index 49
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
      img
        width 100%
        height 100%
  .bg-layer
    position relative
    height 100%
    background-color #fff
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    margin-top 1rem
    .news-column
      padding 0 2rem
      padding-bottom 4rem
  .load-tips
    margin-top -4rem
.slide-enter-active,.slide-leave-active
  transition all .3s
.slide-enter,.slide-leave
  transform translate3d(100%, 0, 0)
</style>

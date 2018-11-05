<template>
  <transition name="slide">
    <div class="columnist-author" v-wechat-title="authorInfo.nickname">
      <div class="top-wrapper" ref="top">
        <div class="avatar" :class="{'vip': authorInfo.is_certificate === 1}">
          <img class="image" :src="authorInfo.avatar" @load="loadTop">
        </div>
        <div class="text">
          <h1 class="name">{{authorInfo.nickname}}</h1>
          <p class="intro">{{authorInfo.description}}</p>
        </div>
        <div class="focus">
          <div class="focus-content bg-red"  v-if="!authorInfo.is_follow" @click="toggleFavorite"
            ><i class="icon-add"></i><span>关&nbsp;注</span
          ></div>
          <transition name="focus">
            <div class="focus-content" v-if="authorInfo.is_follow" @click="showConfirm">
              <i class="icon-check"></i><span>已关注</span>
            </div>
          </transition>
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
      <scroll @scroll="scroll" @touchToEnd="touchToEnd" :data="news" :pullUpLoad="pullUpLoad" :probeType="probeType" :listenScroll="listenScroll" class="list" ref="list">
        <div>
          <news-column :news="news" class="news-column"></news-column>
          <load-tips v-if="news.length" :tips="tips" :isLoad="isLoad"></load-tips>
        </div>
      </scroll>
      <confirm @confirm="confirmOK" :text="confirmText" ref="confirm"></confirm>
    </div>
  </transition>
</template>

<script>
import Confirm from '../../components/confirm/confirm'
import Scroll from '../../components/scroll/scroll.vue'
import NewsColumn from '../../components/news-column/news-column.vue'
import LoadTips from '../../components/load-tips/load-tips.vue'
import {postApi} from '../../api/getApi.js'
import {share} from '../../common/js/share.js'
import {mapGetters} from 'vuex'

const ERR_OK = '0'
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
      shareVal: {},
      confirmText: ''
    }
  },
  computed: {
    ...mapGetters([
      'author',
      'loginState'
    ])
  },
  mounted () {
  },
  created () {
    this.direction = 'horizontal'
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
      if (this.loginState && this.loginState.errorCode === ERR_OK) {
        this.params = {
          authorId: this.$route.params.id,
          page: 0,
          session: this.loginState.data.session || this.loginState.data.data.session
        }
        this.getAuthor()
      } else {
        this.params = {
          authorId: this.$route.params.id,
          page: 0
        }
        this.getAuthor()
      }
    },
    getAuthor () {
      postApi('user.authorPublish', this.params).then(res => {
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
          this.authorInfo = this.author
          this.tips = '暂未发表文章'
        }
      }).catch(error => {
        if (!error.res) {
          this.tips = '网络不给力，请稍后重试'
        }
      })
    },
    loadMore () {
      this.tips = '正在加载...'
      this.isLoad = true
      this.page++
      let moreParams = {
        authorId: this.$route.params.id,
        page: this.page
      }
      postApi('user.authorPublish', moreParams).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.news = this.news.concat(res.data.data.publishArticles)
          this.tips = '上滑加载更多'
          this.isLoad = false
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
    touchToEnd () {
      this.loadMore()
    },
    toggleFavorite () {
      if (this.loginState && this.loginState.errorCode === ERR_OK) {
        postApi('user.follow', {
          session: this.loginState.data.session || this.loginState.data.data.session,
          followUserId: this.$route.params.id
        }).then(res => {
          if (res.data.data.action === 1) {
            this.authorInfo.is_follow = 1
          }
          if (res.data.data.action === 2) {
            this.authorInfo.is_follow = 0
          }
        })
      } else {
        this.showConfirm()
      }
    },
    showConfirm () {
      if (this.loginState && this.loginState.errorCode === ERR_OK) {
        this.confirmText = '是否不再关注此作者'
      } else {
        this.confirmText = '登录后方可关注作者'
      }
      this.$refs.confirm.show()
    },
    confirmOK () {
      if (this.loginState && this.loginState.errorCode === ERR_OK) {
        this.toggleFavorite()
      } else {
        this.$router.push('/login')
      }
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
  },
  components: {
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'scroll': Scroll,
    'confirm': Confirm
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
@import "../../common/stylus/vip.styl"
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
      &.vip
        vip(2rem, url(../../common/image/vip-steps.png))
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
    .focus
      position absolute
      top 1.4rem
      right 2rem
      .focus-content
        width 6.6rem
        height 2.8rem
        border-radius 1.4rem
        background-color rgba(7,17,27,.2)
        color #fff
        text-align center
        line-height 0
        &.bg-red
          background-color #ff4343
          &:active
            background-color red
        .icon-add, .icon-check
          display inline-block
          margin-right 0.2rem
          line-height 2.8rem
          font-size 1rem
        span
          display inline-block
          line-height 2.8rem
          font-size 1.2rem
        &.focus-enter-active
          animation focus-zoom 0.4s
    .back
      position absolute
      top 0
      left 0
      z-index 50
      padding 1rem 1rem 1rem 2rem
      width 3rem
      height 3rem
      line-height 0
      .icon-back
        line-height 3rem
        font-size 2.4rem
        color #fff
      .icon-back-black
        color #393a4c
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
    height 70%
    background-color #fff
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    margin-top 1rem
    .news-column
      padding 0 2rem
      background-color #fff
.slide-enter-active,.slide-leave-active
  transition all .3s
.slide-enter,.slide-leave-active
  transform translate3d(100%, 0, 0)
@keyframes focus-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>

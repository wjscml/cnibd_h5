<template>
  <div class="article" v-wechat-title="newsDetails.title" ref="article">
    <div class="article-header">
        <h1 class="article-title">{{newsDetails.title}}</h1>
        <div class="article-info">
            <router-link :to="`/columnist/${newsDetails.author_id}`" tag="div" class="author">
                <span class="avatar"><img :src="newsDetails.author_avatar" @load="loadAvatar"></span>
                <span class="name">{{newsDetails.author_name}}</span>
            </router-link>
            <div class="time">{{newsDetails.publish_time}}</div>
        </div>
    </div>
    <div class="article-content" v-html="newsContent">
    </div>
    <div class="loading-container" v-show="isLoading">
      <loading></loading>
    </div>
    <floating-btn :isShow="isShow" :getClass="!newsDetails.isKeep ? 'icon-favor' : 'icon-favor_fill'" @gotop="gotop" @gonext="gonext" @golast="golast" @toggle="toggleFavorite"></floating-btn>
    <confirm @confirm="goLogin" text="登录后方可收藏本文~" confirmBtnText="去登录" ref="confirm"></confirm>
  </div>
</template>

<script>
import { share } from 'common/js/share.js'
import { getNewsDetail, collectArticle } from 'api'
import { addTableBox } from 'common/js/htmlUtil.js'
import Loading from 'components/loading/loading.vue'
import FloatingBtn from 'components/floating-btn/floating-btn.vue'
import Confirm from 'components/confirm/confirm'
import { mapGetters } from 'vuex'

var scrollTimer
export default {
  data () {
    return {
      newsDetails: [],
      newsContent: '',
      isLoading: true,
      isShow: true
    }
  },
  created () {
    this.httpGet()
  },
  computed: {
    ...mapGetters([
      'loginState'
    ])
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
    }, 20)
  },
  methods: {
    handleScroll () {
      this.isShow = false
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        this.isShow = true
      }, 200)
    },
    httpGet () {
      console.log(this.loginState)
      if (this.loginState && this.loginState.length !== 0) {
        this.params = {
          articleId: this.$route.params.id,
          session: this.loginState.session
        }
        this.getDetail()
      } else {
        this.params = {
          articleId: this.$route.params.id
        }
        this.getDetail()
      }
    },
    getDetail () {
      getNewsDetail(this.params).then(res => {
        // console.log(window.location.pathname)
        this.newsDetails = res
        this.newsContent = addTableBox(res.content)
        share(this.newsDetails)
      })
    },
    loadAvatar () {
      this.isLoading = false
    },
    gotop () {
      this.$refs.article.scrollIntoView()
    },
    gonext () {
      if (this.newsDetails.article_after.length === 0) {
        alert('已经是最后一篇文章啦~')
      } else {
        this.$router.push({ path: `/site/${this.newsDetails.article_after.id}` })
      }
    },
    golast () {
      if (this.newsDetails.article_before.length === 0) {
        alert('已经是第一篇文章啦~')
      } else {
        this.$router.push(`/site/${this.newsDetails.article_before.id}`)
      }
    },
    toggleFavorite () {
      if (this.loginState && this.loginState.length !== 0) {
        collectArticle({
          session: this.loginState.session,
          articleId: this.$route.params.id
        }).then(res => {
          if (res.action === 1) {
            this.newsDetails.isKeep = 1
          }
          if (res.action === 2) {
            this.newsDetails.isKeep = 0
          }
        })
      } else {
        this.$refs.confirm.show()
      }
    },
    goLogin () {
      this.$router.push('/login')
    }
  },
  watch: {
    '$route' (to, from) {
      this.httpGet()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    'loading': Loading,
    'floating-btn': FloatingBtn,
    'confirm': Confirm
  }
}
</script>

<style lang="stylus">
.article
  padding: 0 2rem
  min-height 100vh
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
          font-size 1.4rem
          margin-left: 8px
          color: #666
      .time
        display: inline-block
        line-height 2rem
        font-size: 1.4rem
        color: #999
  .article-content
    padding-bottom 2rem
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
    .table-container
      width: 100%
      overflow-y: auto
      _overflow: auto
      margin: 0 0 1em
      table
        border:0
        border-collapse:collapse
        td,th
          border:1px solid #999
          padding:.5em 1em
      // 添加IOS下滚动条
      &::-webkit-scrollbar
        -webkit-appearance: none
        width: 14px
        height: 14px
      &::-webkit-scrollbar-thumb
        border-radius: 8px
        border: 3px solid #fff
        background-color: rgba(0, 0, 0, .3)
</style>

<template>
  <div class="favor">
    <div class="switches-wrapper">
      <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
    </div>
    <scroll class="list-wrapper" :data="favoriteList" v-if="currentIndex===1" :pullupLoad="pullUpLoad" @touchToEnd="loadMore">
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in favoriteList" :key="index">
          <router-link :to="`/site/${item.id}`" tag="div" class="item-text">
            <h1 class="title">{{item.title}}</h1>
            <p class="author">{{item.author_name}}</p>
          </router-link>
          <div class="item-icon" @click="showConfirm(item, index)">
            <i class="icon-like"></i>
          </div>
        </div>
        <load-tips v-show="favoriteList.length > 5" :tips="tips" :isLoad="isLoad"></load-tips>
      </div>
    </scroll>
    <scroll class="list-wrapper" :data="favoriteColumnist" v-if="currentIndex===0" :pullUpLoad="pullUpLoad" @touchToEnd="loadMore">
      <div class="author-list">
        <div class="author-item" v-for="(item, index) in favoriteColumnist" :key="index">
          <router-link :to="`/columnist/${item.author_id}`" tag="div" class="item-avatar" :class="{'vip': item.is_certificate === 1}">
            <img :src="item.avatar">
          </router-link>
          <router-link :to="`/columnist/${item.author_id}`" tag="div" class="item-text">
            <h1 class="name">{{item.nickname}}</h1>
            <p class="info">{{item.description}}</p>
          </router-link>
          <div class="item-icon" @click="showConfirm(item, index)">
            <i class="icon-like"></i>
          </div>
        </div>
        <load-tips v-show="favoriteColumnist.length > 5" :tips="tips" :isLoad="isLoad"></load-tips>
      </div>
    </scroll>
    <confirm @confirm="deleteFavorite" :text="confirmText" ref="confirm"></confirm>
    <div class="no-result-wrapper" v-show="noResult">
      <i class="icon-no_result"></i>
      <p>{{noResultDesc}}</p>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import Confirm from 'components/confirm/confirm'
import Switches from 'components/switches/switches'
import LoadTips from 'components/load-tips/load-tips.vue'
import { getCollectList, getFocusList, collectArticle, focusAuthor } from 'api'
import { mapGetters } from 'vuex'
import { share } from 'common/js/share.js'

export default {
  data () {
    return {
      favoriteList: [],
      favoriteColumnist: [],
      currentIndex: 0,
      switches: [
        {
          name: '作者'
        },
        {
          name: '文章'
        }
      ],
      currentNews: [],
      currentAuthor: [],
      confirmText: '',
      page: 0,
      tips: '上滑加载更多',
      isLoad: null,
      shareVal: {
        title: document.title,
        summary: '赛恩财经，提供全球股票、外汇、期货、债券、基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  mounted () {
    share(this.shareVal)
  },
  computed: {
    noResult () {
      if (this.currentIndex === 1) {
        return !this.favoriteList.length
      } else {
        return !this.favoriteColumnist.length
      }
    },
    noResultDesc () {
      if (this.currentIndex === 1) {
        return '暂无收藏文章'
      } else {
        return '暂无关注作者'
      }
    },
    ...mapGetters([
      'loginState'
    ])
  },
  created () {
    if (this.loginState && this.loginState !== 0) {
      this.getFavoriteArticle()
      this.getFavoriteColumnist()
      this.pullUpLoad = true
    } else {
      this.$router.push('/login')
      alert('请先登录')
    }
  },
  methods: {
    getFavoriteArticle () {
      getCollectList({
        session: this.loginState.session,
        page: 0
      }).then(res => {
        this.favoriteList = res.publishArticles
      })
    },
    getFavoriteColumnist () {
      getFocusList({
        session: this.loginState.session,
        page: 0
      }).then(res => {
        this.favoriteColumnist = res
      })
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      if (this.currentIndex === 1) {
        getCollectList({
          session: this.loginState.session,
          page: this.page
        }).then((res) => {
          this.isLoad = false
          this.favoriteList = this.favoriteList.concat(res.publishArticles)
          this.tips = '上滑加载更多'
        }).catch(error => {
          if (!error.res) {
            this.isLoad = false
            this.tips = '没有更多文章了~'
          }
        })
      }
      if (this.currentIndex === 0) {
        getFocusList({
          session: this.loginState.session,
          page: this.page
        }).then((res) => {
          console.log(res)
          this.isLoad = false
          if (res.length !== 0) {
            this.favoriteColumnist = this.favoriteColumnist.concat(res)
            this.tips = '上滑加载更多'
          } else {
            this.tips = '没有更多作者了~'
          }
        })
      }
    },
    switchItem (index) {
      this.currentIndex = index
    },
    showConfirm (item, index) {
      this.$refs.confirm.show()
      if (this.currentIndex === 1) {
        this.currentNews = item
        this.confirmText = '是否不再收藏此文章'
        this.articleId = item.id
        this.n = index
      }
      if (this.currentIndex === 0) {
        this.currentAuthor = item
        this.confirmText = `是否不再收藏 "${item.nickname}"`
        this.followUserId = item.author_id
        this.n = index
      }
    },
    deleteFavorite () {
      if (this.currentIndex === 1) {
        collectArticle({
          session: this.loginState.session,
          articleId: this.articleId
        }).then(res => {
          this.favoriteList = this.favoriteList.slice(0, this.n).concat(this.favoriteList.slice(this.n + 1))
          this.getFavoriteArticle()
        })
      }
      if (this.currentIndex === 0) {
        focusAuthor({
          session: this.loginState.session,
          followUserId: this.followUserId
        }).then(res => {
          this.favoriteColumnist = this.favoriteColumnist.slice(0, this.n).concat(this.favoriteColumnist.slice(this.n + 1))
          this.getFavoriteColumnist()
        })
      }
    }
  },
  components: {
    'switches': Switches,
    'confirm': Confirm,
    'scroll': Scroll,
    'load-tips': LoadTips
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/mixin.styl"
@import "~common/stylus/vip.styl"
.favor
  .switches-wrapper
    margin-top -0.1rem
    border-1px(rgba(7,17,27,0.1))
  .list-wrapper
    position fixed
    top 9.9rem
    bottom 0
    width 100%
    overflow hidden
    .news-list
      padding 0 2rem
      background-color #fff
      .news-item
        display flex
        align-items center
        padding 1.6rem 0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-1px(rgba(7,17,27,0))
        .item-text
          flex 1
          .title
            margin-bottom 0.8rem
            height 4rem
            line-height 2rem
            font-size 1.5rem
            font-weight 600
            color #393a4c
            overflow hidden
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
          .author
            line-height 1.2rem
            color #999
            font-size 1.2rem
        .item-icon
          extend-click()
          width 2.4rem
          margin-left 4rem
          text-align center
          font-size 0
          .icon-like
            font-size 2rem
            color #1f8bee
    .author-list
      padding 0 2rem
      background-color #fff
      .author-item
        display flex
        align-items center
        padding 1.6rem 0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-1px(rgba(7,17,27,0))
        .item-avatar
          margin-right 1.4rem
          &.vip
            vip(1.6rem)
          img
            width 5rem
            height 5rem
            border-radius 50%
            border 1px solid rgba(31,139,238,.4)
        .item-text
          flex 1
          .name
            margin-bottom 0.8rem
            height 2rem
            line-height 2rem
            font-size 1.5rem
            font-weight 600
            color #393a4c
            overflow hidden
            display: -webkit-box
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
          .info
            height 1.6rem
            line-height 1.6rem
            color #999
            font-size 1.2rem
            overflow hidden
            display: -webkit-box
            -webkit-line-clamp: 1
            -webkit-box-orient: vertical
        .item-icon
          extend-click()
          width 2.4rem
          margin-left 4rem
          text-align center
          font-size 0
          .icon-like
            font-size 2rem
            color #1f8bee
  .no-result-wrapper
    margin-top 4rem
    text-align center
    color #757575
    .icon-no_result
      font-size 11rem
      color #bfbfbf
</style>

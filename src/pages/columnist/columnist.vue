<template>
  <div class="columnist">
    <scroll class="columnist-wrapper" ref="columnistWrapper" :data="columnist" :pullUpLoad="pullUpLoad" @touchToEnd="loadMore" @scroll-end="scrollEnd">
      <div class="column">
        <div @click="selectAuthor(item)" class="column-item" v-for="(item, index) in columnist" :key="index">
          <div class="avatar" :class="{'vip': item.is_certificate === 1}">
            <img class="image" :src="item.avatar">
          </div>
          <div class="text">
            <h1 class="name">{{item.nickname}}</h1>
            <p class="intro">{{item.description}}</p>
          </div>
        </div>
        <load-tips v-show="columnist.length" :tips="tips" :isLoad="isLoad"></load-tips>
        <loading v-show="!columnist.length" class="loading-container"></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import LoadTips from 'components/load-tips/load-tips.vue'
import Loading from 'components/loading/loading.vue'
import { getColumnist } from 'api'
import { share } from 'common/js/share.js'
import { mapMutations } from 'vuex'
import { saveColumnist, loadColumnist, saveColumnistHeight, loadColumnistHeight } from 'common/js/cache'

export default {
  data () {
    return {
      columnist: [],
      tips: '上滑加载更多',
      isLoad: null,
      page: 0,
      shareVal: {
        title: document.title,
        summary: '赛恩财经，提供全球股票、外汇、期货、债券、基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    saveColumnist()
    saveColumnistHeight()
    next()
  },
  created () {
    this.pullUpLoad = true
    this.firstGetColumnist()
  },
  mounted () {
    share(this.shareVal)
  },
  methods: {
    firstGetColumnist () {
      this.columnist = loadColumnist()
      if (this.columnist.length === 0) {
        this._getColumnist()
      }
    },
    _getColumnist () {
      getColumnist({ page: 0 }).then(res => {
        this.columnist = res
        this.$nextTick(() => {
          this.$refs.columnistWrapper.scrollTo(0, loadColumnistHeight(), 20)
        })
      })
    },
    loadMore () {
      this.tips = '加载中...'
      this.isLoad = true
      this.page++
      getColumnist({ page: this.page }).then((res) => {
        this.isLoad = false
        if (res.length !== 0) {
          this.columnist = this.columnist.concat(res)
          saveColumnist(this.columnist)
          this.tips = '上滑加载更多'
        } else {
          this.tips = '没有更多数据了~'
        }
      })
    },
    scrollEnd (pos) {
      saveColumnistHeight(pos.y)
    },
    selectAuthor (author) {
      this.$router.push({
        path: `/columnist/${author.author_id}`
      })
      this.setAuthor(author)
    },
    ...mapMutations({
      setAuthor: 'SET_AUTHOR'
    })
  },
  components: {
    'load-tips': LoadTips,
    'loading': Loading,
    'scroll': Scroll
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/vip.styl"
.columnist
  .columnist-wrapper
    overflow hidden
    position fixed
    top 5rem
    bottom 0
    left 0
    right 0
    width 100%
    background-color #f5f5f5
    .column
      padding 2rem 2rem 0
      .column-item
        display flex
        padding 2rem 2rem
        margin-bottom 2rem
        border-radius 1rem
        background-color #fff
        .avatar
          flex-shrink 0
          padding 0.4rem
          margin-right 1.6rem
          border 0.1rem solid #e0e0e0
          border-radius 50%
          background-color #f5f5f5
          &.vip
            vip(2rem)
          .image
            width 6rem
            height 6rem
            border-radius 50%
        .text
          font-size 0
          .name
            margin-bottom 1rem
            line-height 2.4rem
            font-size 1.8rem
            font-weight 600
            color #393a4c
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            -webkit-box-orient vertical
          .intro
            height 3.6rem
            line-height 1.8rem
            font-size 1.2rem
            color #999
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
            -webkit-box-orient vertical
    .loading-container
      margin-top 40%
</style>

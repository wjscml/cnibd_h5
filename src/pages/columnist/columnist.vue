<template>
  <div class="columnist">
    <div @click="selectAuthor(item)" class="column" v-for="(item, index) in columnist" :key="index">
      <div class="avatar">
        <img class="image" :src="item.avatar">
        <i :class="{'vip': item.is_certificate === 1}"></i>
      </div>
      <div class="text">
        <h1 class="name">{{item.nickname}}</h1>
        <p class="intro">{{item.description}}</p>
      </div>
    </div>
    <load-tips v-show="columnist.length" :tips="tips" :isLoad="isLoad"></load-tips>
    <loading v-show="!columnist.length" class="loading-container"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import LoadTips from '../../components/load-tips/load-tips.vue'
import Loading from '../../components/loading/loading.vue'
import {getApi} from '../../api/getApi.js'
import {share} from '../../common/js/share.js'
import {mapMutations} from 'vuex'

const ERR_OK = 0
export default {
  data () {
    return {
      columnist: [],
      tips: '上滑加载更多',
      isLoad: null,
      page: 0,
      shareVal: {
        title: '赛恩财经——专栏作家',
        summary: '赛恩财经，提供全球股票,外汇,期货,债券,基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯,以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  components: {
    'load-tips': LoadTips,
    'loading': Loading
  },
  created () {
    this.getColumnist()
  },
  mounted () {
    share(this.shareVal)
    setTimeout(() => {
      window.addEventListener('scroll', this.loadMore)
    }, 20)
  },
  methods: {
    getColumnist () {
      getApi('/author-list?page=0').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.columnist = res.data.data
        }
      })
    },
    loadMore () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        this.page++
        getApi(`/author-list?page=${this.page}`).then((res) => {
          if (res.data.errorCode === ERR_OK) {
            this.columnist = this.columnist.concat(res.data.data)
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
  destroyed () {
    window.removeEventListener('scroll', this.loadMore)
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/vip.styl"
.columnist
  padding 0 2rem
  .column
    display flex
    padding 2rem 2rem
    margin-top 2rem
    border-radius 1rem
    background-color #fff
    .avatar
      flex-shrink 0
      position relative
      padding 0.4rem
      margin-right 1.6rem
      border 0.1rem solid #e0e0e0
      border-radius 50%
      background-color #f5f5f5
      .image
        width 6rem
        height 6rem
        border-radius 50%
      .vip
        position absolute
        right 0
        bottom 0
        background-image url(../../common/image/vip-steps.png)
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
</style>

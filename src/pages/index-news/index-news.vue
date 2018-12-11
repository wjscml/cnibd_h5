<template>
<div>
  <scroll @scroll="scroll" @touchToEnd="touchToEnd" @scrollToTop="scrollToTop" @pullingDown="pullingDown" :data="news" :probeType="probeType" :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" class="news-wrapper" ref="newsWrapper">
    <div class="news-content">
      <news-column :news="news"></news-column>
      <load-tips :tips="tips" :isLoad="isLoad" v-if="news.length"></load-tips>
      <load-tips :tips="downTips" class="pulldown-tips"></load-tips>
    </div>
  </scroll>
  <loading v-show="!news.length" :title="''"></loading>
</div>
</template>

<script>
import NewsColumn from '../../components/news-column/news-column.vue'
import LoadTips from '../../components/load-tips/load-tips.vue'
import Loading from '../../components/loading/loading.vue'
import Scroll from '../../components/scroll/scroll.vue'
import { getApi } from '../../api/getApi.js'
import { share } from '../../common/js/share.js'

const ERR_OK = 0
export default {
  data () {
    return {
      scrollH: 0,
      news: [],
      page: 0,
      tips: '上滑加载更多',
      downTips: '下拉刷新',
      isLoad: null,
      shareVal: {
        title: '赛恩财经:聚合财经新媒体',
        summary: '赛恩财经，提供全球股票,外汇,期货,债券,基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯,以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  props: {
    topHeight: Number,
    navHeight: Number
  },
  created () {
    this.probeType = 3
    this.pullUpLoad = true
    this.pullDownRefresh = true
    this._getNews()
  },
  mounted () {
    share(this.shareVal)
  },
  methods: {
    _getNews () {
      getApi(`/list?page=0&type=${this.$route.params.id}`).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.news = res.data.data
          this.$nextTick(() => {
            this.minTranslateY = this.$route.query.nH - this.$route.query.tH
            this.$refs.newsWrapper.$el.style.top = `${this.$route.query.tH}px`
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
      getApi(`/list?page=${this.page}&type=${this.$route.params.id}`).then((res) => {
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
    scroll (pos) {
      this.scrollH = pos.y
    },
    scrollTop () {
      this.$refs.newsWrapper.scrollTo(0, this.minTranslateY, 300)
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
    }
  },
  watch: {
    '$route' (to, from) {
      this._getNews()
    }
  },
  components: {
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'loading': Loading,
    'scroll': Scroll
  }
}
</script>

<style lang="stylus">
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

</style>

<template>
  <scroll class="suggest" @touchToEnd="searchMore" :data="news" :pullUpLoad="pullUpLoad">
    <div>
      <news-column class="suggest-list" :news="news"></news-column>
      <load-tips class="suggest-tips" :tips="tips" :isLoad="isLoad" v-show="news.length > 5"></load-tips>
    </div>
    <loading v-show="hasMore" :title="title" :hasGif="hasGif"></loading>
  </scroll>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import NewsColumn from 'components/news-column/news-column'
import LoadTips from 'components/load-tips/load-tips.vue'
import Loading from 'components/loading/loading.vue'
import { getSearchList } from 'api'

export default {
  data () {
    return {
      news: [],
      pullUpLoad: true,
      tips: '上滑加载更多',
      page: 0,
      isLoad: null,
      title: '正在载入...',
      hasGif: true,
      hasMore: null
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    ensure: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _getNews () {
      this.hasMore = true
      this.title = '正在载入...'
      this.hasGif = true
      let params = {
        keywords: this.query,
        page: 0
      }
      getSearchList(params).then(res => {
        if (res) {
          this.hasMore = false
          this.news = res
        } else {
          this.news = []
          this.title = '抱歉，未找到相关内容'
          this.hasGif = false
        }
      })
      this.$emit('select')
    },
    searchMore () {
      this.tips = '正在加载...'
      this.isLoad = true
      this.page++
      let moreParams = {
        keywords: this.query,
        page: this.page
      }
      getSearchList(moreParams).then(res => {
        this.isLoad = false
        if (res) {
          this.news = this.news.concat(res)
          this.tips = '上滑加载更多'
        } else {
          this.tips = '没有更多数据了~'
        }
      })
    }
  },
  watch: {
    query (newQuery, oldQuery) {
      if (oldQuery === '') {
        this.news = []
      }
    },
    ensure () {
      if (this.ensure) {
        this.news = []
        this._getNews()
      }
    }
  },
  components: {
    'scroll': Scroll,
    'news-column': NewsColumn,
    'load-tips': LoadTips,
    'loading': Loading
  }
}
</script>

<style lang="stylus">
.suggest
  height 100%
  .suggest-list
    padding 0 2rem
    background-color #fff
  .suggest-tips
    background-color #fff
</style>

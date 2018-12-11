<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange" @keyupEnter="addQuery(query)"></search-box>
      <div class="smart-box" v-show="query && !ensure">
        <div class="smart-box-wrapper">
          <p class="ensure-wrapper" @click="addQuery(query)">搜索“{{query}}”</p>
        </div>
      </div>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <scroll :data="shortcut" class="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.name)" class="item" v-for="(item, index) in hotKey" :key="index">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-delete_all"></i>
              </span>
            </h1>
            <div class="search-list">
              <ul>
                <li @click="addQuery(item)" class="search-item" v-for="item in searchHistory" :key="item">
                  <i class="icon-history"></i>
                  <span class="text">{{item}}</span>
                  <span class="icon" @click.stop="deleteSearchHistory(item)">
                    <i class="icon-delete"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result">
      <suggest @select="saveSearch" :query="query" :ensure="ensure"></suggest>
    </div>
    <confirm @confirm="clearSearchHistory" text="是否清空所有搜索历史" ref="confirm"></confirm>
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import SearchBox from 'components/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import Confirm from 'components/confirm/confirm'
import { getCategories } from 'api'
import { mapActions, mapGetters } from 'vuex'
import { share } from 'common/js/share.js'

export default {
  data () {
    return {
      hotKey: [],
      query: '',
      ensure: false,
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
  created () {
    this._getHotKey()
  },
  computed: {
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    addQuery (query) {
      if (query !== '') {
        this.ensure = true
        this.$refs.searchBox.setQuery(query)
      }
    },
    onQueryChange (newQuery, oldQuery) {
      this.query = newQuery
      if (oldQuery !== '') {
        this.ensure = false
      }
    },
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    deleteOne (item) {
      this.deleteSearchHistory(item)
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    _getHotKey () {
      getCategories().then(res => {
        this.hotKey = res
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        this.ensure = false
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    'scroll': Scroll,
    'search-box': SearchBox,
    'suggest': Suggest,
    'confirm': Confirm
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.search
  padding 2rem 0 3rem
  background-color #fff
  .search-box-wrapper
    position relative
    padding 0 2rem
    .smart-box
      position absolute
      left 0
      top 4.3rem
      width 100%
      z-index 20
      background-color #fff
      .smart-box-wrapper
        margin 0 2rem
        padding 0 1.6rem
        border-radius 0.2rem
        box-shadow 0px 1px 5px #999
        background-color #fff
        .ensure-wrapper
          height 4rem
          line-height 4rem
          color #1f8bee
          white-space: nowrap
          overflow: hidden
  .shortcut-wrapper
    position fixed
    top 13.9rem
    bottom 0
    width 100%
    background-color #fff
    z-index 10
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 2rem 3rem
        .title
          margin-bottom 2rem
          line-height 1.6rem
          font-size 1.4rem
          color #999
        .item
          display inline-block
          padding 0 1.5rem
          margin 0 1rem 1rem 0
          height 3rem
          line-height 3rem
          font-size 1.5rem
          border-radius 2rem
          border 1px solid rgba(7,17,27,0.1)
          color #393a4c
      .search-history
        margin-left 2rem
        .title
          display flex
          align-items center
          padding-right 2rem
          margin-bottom 1rem
          font-size 0
          color #999
          .text
            flex 1
            font-size 1.4rem
          .clear
            extend-click()
            padding-right .17rem
            .icon-delete_all
              font-size 1.7rem
              color #bfbfbf
        .search-list
          .search-item
            position relative
            display flex
            align-items center
            margin-left 2.5rem
            padding-right 2rem
            height 4.4rem
            line-height 0
            font-size 0
            border-1px(rgba(7,17,27,0.1))
            .icon-history
              position absolute
              left -2.5rem
              top 0
              height 4.4rem
              line-height 4.4rem
              font-size 1.5rem
              color #bfbfbf
            .text
              flex 1
              line-height 4.4rem
              font-size 1.5rem
              color #393a4c
              display: -webkit-box
              -webkit-line-clamp: 1
              -webkit-box-orient: vertical
              overflow: hidden
            .icon
              extend-click()
              .icon-delete
                font-size 2rem
                color #bfbfbf
  .search-result
    position fixed
    width 100%
    top 13.9rem
    bottom 0
    overflow hidden
    background-color #fff
</style>

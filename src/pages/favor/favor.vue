<template>
  <div class="favor">
    <div class="switches-wrapper">
      <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
    </div>
    <scroll class="list-wrapper" :data="favoriteList" v-if="currentIndex===1">
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in favoriteList" :key="index">
          <router-link :to="`/site/${item.id}`" tag="div" class="item-text">
            <h1 class="title">{{item.title}}</h1>
            <p class="author">{{item.author_name}}</p>
          </router-link>
          <div class="item-icon" @click="showConfirm(item)">
            <i class="icon-like"></i>
          </div>
        </div>
      </div>
    </scroll>
    <scroll class="list-wrapper" :data="favoriteColumnist" v-if="currentIndex===0">
      <div class="author-list">
        <div class="author-item" v-for="(item, index) in favoriteColumnist" :key="index">
          <router-link :to="`/columnist/${item.author_id}`" tag="div" class="item-avatar">
            <img :src="item.avatar">
          </router-link>
          <router-link :to="`/columnist/${item.author_id}`" tag="div" class="item-text">
            <h1 class="name">{{item.nickname}}</h1>
            <p class="info">{{item.description}}</p>
          </router-link>
          <div class="item-icon" @click="showConfirm(item)">
            <i class="icon-like"></i>
          </div>
        </div>
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
import Scroll from '../../components/scroll/scroll'
import Confirm from '../../components/confirm/confirm'
import Switches from '../../components/switches/switches'
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
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
      confirmText: ''
    }
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
        return '暂无收藏作者'
      }
    },
    ...mapGetters([
      'favoriteList',
      'favoriteColumnist'
    ])
  },
  methods: {
    switchItem (index) {
      this.currentIndex = index
    },
    showConfirm (item) {
      if (this.currentIndex === 1) {
        this.currentNews = item
        this.confirmText = '是否不再收藏此文章'
      }
      if (this.currentIndex === 0) {
        this.currentAuthor = item
        this.confirmText = `是否不再收藏 "${item.nickname}"`
      }
      this.$refs.confirm.show()
    },
    deleteFavorite () {
      if (this.currentIndex === 1) {
        this.deleteFavoriteList(this.currentNews)
      }
      if (this.currentIndex === 0) {
        this.deleteFavoriteColumnist(this.currentAuthor)
      }
    },
    ...mapActions([
      'deleteFavoriteList',
      'deleteFavoriteColumnist'
    ])
  },
  watch: {
    noResult () {
      if (this.favoriteList === []) {
        this.tips = '暂无收藏文章'
        return true
      }
      if (this.favoriteColumnist === []) {
        this.tips = '暂无收藏作者'
        return true
      }
      console.log('this.noResult')
    }
  },
  components: {
    'switches': Switches,
    'confirm': Confirm,
    'scroll': Scroll
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"

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

<template>
<div class="news-column">
  <div class="news-item" v-for="(newsItem, index) in news" :key="index">
    <a :href="newsItem.url"><div class="item-image"><img v-lazy="newsItem.thumb"></div></a>
    <div class="item-txt">
      <a :href="newsItem.url"><h1 class="title">{{newsItem.title}}</h1></a>
      <p class="info">
        <span class="author">{{newsItem.author_name}}</span>
        <span>·</span>
        <span class="time">{{newsItem.publish_time}}</span>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    news: {}
  },
  mounted () {

  },
  methods: {
    newsScroll () {
      this.$nextTick(() => {
        if (this.isFixed) {
          this.sb = true
          this.newsScroll = new BScroll(this.$refs.newsWrapper, {
            click: true,
            pullUpLoad: true
          })
          this.newsScroll.on('scrollEnd', () => {
            console.log(this.newsScroll.y)
            if (this.newsScroll.y <= (this.newsScroll.maxScrollY + 50)) {
              this.loadMore()
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.news-column
  .news-item
    display flex
    padding 1.2rem 0
    border-1px(rgba(7,17,27,0.1))
    .item-image
      flex-shrink 0
      width 9rem
      img
        width 9rem
        height 6rem
    .item-txt
      margin-left 1.5rem
      .title
        margin-bottom 0.8rem
        line-height 2rem
        font-size 1.5rem
        font-weight 600
        color #393a4c
        overflow hidden
        display -webkit-box
        -webkit-line-clamp 2
        text-overflow ellipsis
        -webkit-box-orient vertical
        height 4rem
      .info
        line-height 1.2rem
        color #999
        .author
        .time
          font-size 1.2rem
</style>

<template>
<div class="news-column">
  <div class="news-item" v-for="(newsItem, index) in news" :key="index">
    <router-link tag="div" class="item-image" :to="newsItem.url"><img :src="newsItem.thumb"></router-link>
    <div class="item-txt">
      <router-link tag="h1" class="title" :to="newsItem.url">{{newsItem.title}}</router-link>
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

<style>

</style>

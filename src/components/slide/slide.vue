<template>
  <div class="slide">
    <div class="slide-wrapper">
      <transition-group tag="ul" name="image">
        <router-link tag="li" :to="item.url" class="slide-item" v-for="(item,index) in slide" :key="index" v-show="index===mark" @mouseenter="stop" @mouseleave="move">
          <div class="slide-pic">
            <img :src="item.thumb" alt="">
          </div>
          <p class="slide-info">{{item.title}}</p>
        </router-link>
      </transition-group>
    </div>
  </div>
</template>
<script>
const slideIndex = 3
export default {
  data () {
    return {
      mark: 0,
      timer: null
    }
  },
  props: {
    slide: {}
  },
  methods: {
    autoPlay () {
      this.mark++
      if (this.mark === slideIndex) {
        this.mark = 0
      }
    },
    play () {
      this.timer = setInterval(this.autoPlay, 4000)
    },
    stop () {
      clearInterval(this.timer)
    },
    move () {
      this.timer = setInterval(this.autoPlay, 4000)
    }
  },
  created () {
    this.play()
  },
  computed: {

  }
}
</script>
<style lang="stylus">
@import "../../common/stylus/slide.styl"
.slide
  margin-bottom 0.6rem
  .slide-wrapper
    position relative
    overflow hidden
    width 100%
    height 18rem
    .slide-item
      position absolute
      width 100%
      height 100%
    .slide-pic
      img
        width 100%
        height 18rem
    .slide-info
      overflow hidden
      box-sizing border-box
      position absolute
      bottom 0
      left 0
      width 100%
      padding 0 2rem
      line-height 3rem
      font-size 1.6rem
      background-color rgba(0,0,0,0.5)
      color #fff
      text-align center
      white-space nowrap
      text-overflow ellipsis
</style>

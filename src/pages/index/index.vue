<template>
  <div id="index">
    <div v-if="slide.length" class="slider-wrapper">
      <slider>
        <div class="slider-item" v-for="(item, index) in slide" :key="index">
          <a :href="item.url" class="slider-pic">
            <img :src="item.thumb">
          </a>
          <p class="slider-info">{{item.title}}</p>
        </div>
      </slider>
    </div>
    <v-news :isFixed="isFixed"></v-news>
  </div>
</template>

<script>
import Slider from '../../components/slider/slider.vue'
import News from '../../components/news/news.vue'
import {getApi} from '../../api/getApi.js'

const ERR_OK = 0
export default {
  data () {
    return {
      slide: [],
      isFixed: null,
      navTop: 0
    }
  },
  created () {
    this.httpGet()
  },
  mounted () {
    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
    }, 20)
  },
  methods: {
    httpGet () {
      getApi('/slide').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.slide = res.data.data
        }
      })
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 240) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    _getNewsNavtop () {
      this.navTop = this.$refs.newsWrapper.getBoundingClientRect().top
    }
  },
  components: {
    'slider': Slider,
    'v-news': News
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
.slider-wrapper
  height 18rem
  margin-bottom 0.6rem

</style>

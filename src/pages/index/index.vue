<template>
  <div id="index">
    <v-slide :slide="slide" mark=0></v-slide>
    <div ref="newsBox"></div>
    <v-news :isFixed="isFixed"></v-news>
  </div>
</template>

<script>
import Slide from '../../components/slide/slide.vue'
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
    this.getNavtop()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    httpGet () {
      getApi('/h5/slide').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.slide = res.data.data
          console.log(this.slide)
        }
      })
    },
    getNavtop () {
      this.$nextTick(() => {
        this.navTop = this.$refs.newsBox.getBoundingClientRect().top
      })
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop + 1 >= this.navTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  components: {
    'v-slide': Slide,
    'v-news': News
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">

</style>

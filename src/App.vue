<template>
  <div id="app">
    <div class="app-content">
      <v-header></v-header>
      <router-view></router-view>
    </div>
    <v-footer class="app-footer"></v-footer>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'

export default {
  data () {
    return {
      slide: {}
    }
  },
  created () {
  },
  components: {
    'v-header': Header,
    'v-footer': Footer
  }
}
</script>

<style lang="stylus">
@import "./common/stylus/index.styl"
body
  height 100%
  background-color #f2f2f2
  #app
    height 100%
    .app-content
      min-height 100%
      padding-bottom 7.6rem
    .app-footer
      margin-top -7.6rem
</style>

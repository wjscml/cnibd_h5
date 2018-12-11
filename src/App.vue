<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <div class="app-content">
      <v-header v-if="hasHeader"></v-header>
      <router-view></router-view>
    </div>
    <v-footer class="app-footer"></v-footer>
  </div>
</template>

<script>
import Header from 'components/header/header.vue'
import Footer from 'components/footer/footer.vue'
import Bus from 'common/js/bus.js'

export default {
  data () {
    return {
      slide: {},
      hasHeader: true
    }
  },
  created () {
    Bus.$on('getHasHeader', (data) => {
      this.hasHeader = data
    })
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
    min-height 100%
    display flex
    flex-direction column
    justify-content space-between
    box-sizing border-box
    .app-content
      flex-grow 1

</style>

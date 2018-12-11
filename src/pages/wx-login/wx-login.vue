<template>
  <div class="wx-login">
    <loading title="登陆中..." v-show="!isLogin" class="loading-wrapper"></loading>
    <p class="text" v-show="isLogin">成功登陆！</p>
  </div>
</template>

<script>
import Loading from 'components/loading/loading.vue'
import { getWxLogin } from 'api'
import { mapActions } from 'vuex'

const ERR_OK = '0'
export default {
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    if (this.loginState) {
      this.$router.push('/index')
    } else {
      this.wxLogin()
    }
  },
  methods: {
    wxLogin () {
      getWxLogin({
        code: this.$route.query.code,
        wxBrowser: this.$route.query.state
      }).then(res => {
        this.saveLoginState(res)
        this.isLogin = true
        this.$router.push({ path: '/index' })
      })
    },
    ...mapActions([
      'saveLoginState'
    ])
  },
  components: {
    'loading': Loading
  }
}
</script>

<style lang="stylus">
.wx-login
  display flex
  flex-direction column
  justify-content center
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  background-color #fff
  .text
    text-align center
    color #1f8bee
</style>

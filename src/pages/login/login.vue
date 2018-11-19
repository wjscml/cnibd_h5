<template>
  <div class="login">
    <div class="login-wrapper">
      <header class="login-header">
        <span class="title">登 录</span>
        <div class="btn-close" @click="close">
          <i class="icon-close"></i>
        </div>
      </header>
      <form class="login-form" @submit="checkForm">
        <div class="login-content">
          <div class="input-wrapper" :class="{'error-input': isTel}">
            <input v-model="tel" type="text" placeholder="请输入手机号">
            <i @click="clearTel" v-show="tel" class="icon-dismiss"></i>
          </div>
          <div class="input-wrapper" :class="{'error-input': isPsw}">
            <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="login">
          </div>
        </div>
        <div class="submit" @click="login">登录</div>
        <div class="login-tips">
          <router-link to="/register" tag="span">立即注册</router-link>
          <router-link to="/forget" tag="span">忘记密码</router-link>
        </div>
        <transition name="error">
          <div class="error-wrapper" v-if="errors.length" ref="errorWrapper">
            <p class="error-text" v-for="(error, index) in errors" :key="index" v-if="index == 0">{{error}}</p>
          </div>
        </transition>
      </form>
    </div>
    <div class="login-wx">
      <i class="icon-weixin" @click="wxLogin"></i>
      <p>微信登录</p>
    </div>
    <div class="login-mask" v-if="isLogining">
      <loading class="login-loading" :title="'正在登录...'"></loading>
    </div>
  </div>
</template>

<script>
import Loading from '../../components/loading/loading.vue'
import {postApi} from '../../api/getApi.js'
import {mapActions, mapGetters} from 'vuex'
import {share} from '../../common/js/share.js'

const ERR_OK = '0'
export default {
  data () {
    return {
      errors: [],
      tel: '',
      password: '',
      isTel: false,
      isPsw: false,
      isLogining: false,
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
  computed: {
    ...mapGetters([
      'loginState'
    ])
  },
  created () {
    if (this.loginState && this.loginState.errorCode === ERR_OK) {
      this.$router.back()
    }
    this.isWeiXin()
  },
  methods: {
    isWeiXin () {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {//eslint-disable-line
        return true
      } else {
        return false
      }
    },
    login () {
      this.checkForm()
      if (this.checkForm()) {
        this.toLogin()
      }
    },
    toLogin () {
      this.isLogining = true
      let loginParam = {
        mobileNumber: this.tel,
        password: this.password
      }
      postApi('user.login', loginParam).then(res => {
        this.isLogining = false
        if (res.data.errorCode === ERR_OK) {
          this.errors.push('成功登陆！')
          this.saveLoginState(res.data)
          if (window.history.length <= 1) {
            this.$router.push({path: '/index'})
            return false
          } else {
            this.$router.back()
          }
        } else {
          this.errors.push(res.data.errorMessage)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    checkForm () {
      this.isTel = false
      this.isPsw = false
      if (!this.tel) {
        this.errors.push('请输入手机号码')
        this.isTel = true
      } else if (!this.validTel(this.tel)) {
        this.errors.push('请输入正确的手机号码')
        this.isTel = true
      }
      if (!this.password) {
        this.errors.push('请输入密码')
        this.isPsw = true
      }
      if (!this.errors.length) {
        return true
      } else {
        setTimeout(() => {
          this.errors = []
        }, 4000)
        return false
      }
    },
    validTel (tel) {
      var re = /^[0-9]{11}$/
      return re.test(tel)
    },
    clearTel () {
      this.tel = ''
    },
    close () {
      this.$router.push({path: '/index'})
    },
    ...mapActions([
      'saveLoginState'
    ]),
    wxLogin () {
      let pageUrl = encodeURIComponent('https://www.cnibd.com/wx_login')
      if (this.isWeiXin()) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb5b03bf29736518a&redirect_uri=' + pageUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
      } else {
        window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx70d395942c321a44&redirect_uri=' + pageUrl + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
      }
    }
  },
  components: {
    'loading': Loading
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.login
  display flex
  flex-direction column
  justify-content space-between
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  background-color #fff
  .login-wrapper
    .login-header
      display flex
      align-items center
      padding 0 2rem 0 4.5rem
      height 5rem
      text-align center
      background-color #1f8bee
      color #fff
      .title
        flex 1
        font-size 2rem
      .btn-close
        extend-click()
        font-size 0
        .icon-close
          font-size 2.5rem
    .login-form
      position relative
      padding 3rem 2rem 0
      .login-content
        margin-bottom 7rem
        .input-wrapper
          display flex
          align-items center
          margin-bottom 1rem
          padding 1.6rem 0
          font-size 0
          border-bottom 1px solid rgba(7,17,27,0.1)
          &.error-input
            border-bottom-color #f1403c
          input
            vertical-align top
            font-size 1.6rem
            width 100%
            outline none
            border none
            color #393a4c
            caret-color #1f8bee
          .icon-dismiss
            width 2.2rem
            font-size 1.8rem
            text-align center
            color #bfbfbf
      .login-tips
        padding 1.4rem 0.4rem
        display flex
        align-items center
        justify-content space-between
        span
          font-size 1.4rem
          color #393a4c
      .submit
        width 100%
        outline none
        border none
        height 4rem
        line-height 4rem
        font-size 1.7rem
        border-radius .4rem
        background-color #1f8bee
        color #fff
        text-align center
      .error-wrapper
        position absolute
        top -1rem
        left 0
        width 100%
        opacity 0
        .error-text
          margin 0 2rem
          height 4rem
          line-height 4rem
          border-radius .4rem
          text-align center
          color #fff
          background-color #f1403c
        &.error-enter-active
          animation show-error 4s ease
  .login-wx
    margin-bottom 4rem
    width 100%
    text-align center
    .icon-weixin
      font-size 5rem
      color #04be02
    p
      font-size 1.4rem
      color #393a4c
  .login-mask
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(7,17,27,0.9)
    .login-loading
      margin-top 50%
@keyframes show-error
  0%
    opacity 0
  25%
    opacity 1
  75%
    opacity 1
  100%
    opacity 0
</style>

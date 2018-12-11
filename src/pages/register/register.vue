<template>
  <div class="register">
    <header class="register-header">
      <span class="title">注 册</span>
      <div class="btn-close" @click="close">
        <i class="icon-close"></i>
      </div>
    </header>
    <form class="register-form">
      <div class="register-content">
        <div class="input-wrapper" :class="{'error-input': isTel}">
          <input v-model="tel" type="text" placeholder="请输入手机号">
          <i @click="clearTel" v-show="tel" class="icon-dismiss"></i>
        </div>
        <div class="input-wrapper" :class="{'error-input': isCode}">
          <input v-model="code" type="text" placeholder="请输入验证码">
          <div @click="refreshCode" class="captchaImage">
            <img :src="captchaImage">
          </div>
        </div>
        <div class="input-wrapper" :class="{'error-input': isMobileCode}" v-show="tel && code">
          <input v-model="mobileCode" type="text" placeholder="请输入短信验证码">
          <div class="send-code" v-show="!isSendCode && !isClick" @click="getMobileCode">{{sendText}}</div>
          <div class="send-code" v-show="isClick"><loading title=""></loading></div>
          <div class="send-code send-code-c" v-show="isSendCode">{{count}}s</div>
        </div>
        <div class="input-wrapper" :class="{'error-input': isPsw}">
          <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="register">
        </div>
      </div>
      <div class="register-tips">
        <span>注册即同意 <router-link to="/agreement">《用户注册协议》</router-link></span>
      </div>
      <div class="submit" @click="register">注册</div>
      <div class="under-submit">
        <span>已有账号，<router-link to="/login">立即登录</router-link></span>
      </div>
      <transition name="error">
        <div class="error-wrapper" v-if="errors.length" ref="errorWrapper">
          <p class="error-text" :class="{'correct-text': isCorrect}" >{{errors[0]}}</p>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import Loading from 'components/loading/loading'
import { getRegister, getCaptcha, getMobileCode } from 'api'
import { mapActions, mapGetters } from 'vuex'
import { share } from 'common/js/share.js'

const TIME_COUNT = 60
export default {
  data () {
    return {
      errors: [],
      tel: '',
      password: '',
      code: '',
      mobileCode: '',
      isTel: null,
      isPsw: null,
      isCode: null,
      isMobileCode: null,
      captchaImage: '',
      isClick: false,
      isSendCode: false,
      isCorrect: null,
      sendText: '发送验证码',
      count: '',
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
    if (this.loginState && this.loginState.length !== 0) {
      this.$router.back()
    } else {
      this.getCode()
    }
  },
  methods: {
    register () {
      this.checkForm()
      if (this.checkForm()) {
        this.toRegister()
      }
    },
    toRegister () {
      let registerParam = {
        captchaCodeKey: this.captchaCodeKey,
        captchaCode: this.code,
        mobileNumber: this.tel,
        mobileCode: this.mobileCode,
        password: this.password
      }
      getRegister(registerParam).then(res => {
        if (!res.errorMessage) {
          alert('成功注册！')
          this.saveLoginState(res)
          this.$router.push({ path: '/index' })
        } else {
          this.errors.push(res.errorMessage)
          this.isCorrect = false
        }
      })
    },
    checkSendCode () {
      this.isTel = false
      this.isCode = false
      this.isCorrect = false
      if (!this.tel) {
        this.errors.push('请输入手机号码')
        this.isTel = true
      } else if (!this.validTel(this.tel)) {
        this.errors.push('请输入正确的手机号码')
        this.isTel = true
      }
      if (!this.code) {
        this.errors.push('请输入验证码')
        this.isCode = true
      }
      setTimeout(() => {
        this.errors = []
      }, 4000)
    },
    checkLastInfo () {
      this.isMobileCode = false
      this.isPsw = false
      if (!this.mobileCode) {
        this.errors.push('请输入短信验证码')
        this.isMobileCode = true
      }
      if (!this.password) {
        this.errors.push('请输入密码')
        this.isPsw = true
      } else if (this.password.length < 6 || this.password.length > 18) {
        this.errors.push('请设置6~18位密码')
        this.isPsw = true
      }
    },
    checkForm () {
      this.checkSendCode()
      this.checkLastInfo()
      if (!this.errors.length) {
        return true
      } else {
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
      this.$router.push({ path: '/index' })
    },
    getCode () {
      getCaptcha().then(res => {
        this.captchaImage = res.captchaImage
        this.captchaCodeKey = res.captchaCodeKey
      })
    },
    refreshCode () {
      this.getCode()
    },
    getMobileCode () {
      this.isClick = true
      this.checkSendCode()
      let params = {
        captchaCodeKey: this.captchaCodeKey,
        captchaCode: this.code,
        mobileNumber: this.tel,
        usage: 1
      }
      getMobileCode(params).then(res => {
        this.isClick = false
        if (!res) {
          this.isSendCode = true
          this.errors.push('验证码发送成功！')
          this.isCorrect = true
          if (!this.timer) {
            this.count = TIME_COUNT
            this.isSendCode = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.isSendCode = false
                clearInterval(this.timer)
                this.timer = null
                this.sendText = '重新发送'
              }
            }, 1000)
          }
        } else {
          this.errors.push(res.errorMessage)
          this.isCorrect = false
          this.getCode()
        }
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
@import "../../common/stylus/mixin.styl"
.register
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  background-color #fff
  .register-header
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
  .register-form
    position relative
    padding 3rem 2rem 0
    .register-content
      margin-bottom 7rem
      .input-wrapper
        position relative
        display flex
        align-items center
        margin-bottom 1rem
        height 5rem
        font-size 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        &.error-input
          border-bottom-color #f1403c
        input
          flex 1
          font-size 1.6rem
          outline none
          border none
          caret-color #1f8bee
        .captchaImage
          overflow hidden
          img
            height 4rem
        .send-code
          width 10rem
          font-size 1.4rem
          background-color #ffffff
          color #1f8bee
          outline none
          border none
          text-align center
          &.send-code-c
            color #757575
        .icon-dismiss
          width 2.2rem
          font-size 1.8rem
          text-align center
          color #bfbfbf
    .register-tips
      line-height 4rem
      text-align center
      span
        font-size 1.2rem
        color #757575
        a
          text-decoration underline
    .under-submit
      padding 1.4rem 0.4rem
      display flex
      span
        flex 1
        font-size 1.4rem
        text-align center
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
        &.correct-text
          background-color #04be02
      &.error-enter-active
        animation show-error 4s ease
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

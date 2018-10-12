<template>
  <div class="register">
    <header class="register-header">
      <span class="title">找回密码</span>
      <div class="btn-close" @click="close">
        <i class="icon-close"></i>
      </div>
    </header>
    <form class="register-form" @submit="checkForm">
      <div class="register-content">
        <div class="input-wrapper" :class="{'error-input': isTel}">
          <input v-model="tel" type="text" placeholder="请输入手机号">
          <i @click="clearTel" v-show="tel" class="icon-dismiss"></i>
        </div>
        <div class="input-wrapper" :class="{'error-input': isCode}">
          <input v-model="code" type="text" placeholder="请输入验证码">
          <div @click="refreshCode" class="identify-wrapper">
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <div class="input-wrapper" :class="{'error-input': isMobileCode}">
          <input v-model="mobileCode" type="text" placeholder="请输入短信验证码">
          <button class="send-code">发送验证码</button>
        </div>
        <div class="input-wrapper" :class="{'error-input': isPsw}">
          <input v-model="password" type="password" placeholder="请输入新密码">
        </div>
      </div>
      <button type="submit" class="submit">确认修改</button>
      <transition name="error">
        <div class="error-wrapper" v-if="errors.length" ref="errorWrapper">
          <p class="error-text" v-for="(error, index) in errors" :key="index" v-if="index == 0">{{error}}</p>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import Identify from '../../components/identify/identify'

export default {
  data () {
    return {
      errors: [],
      tel: null,
      password: null,
      code: null,
      mobileCode: null,
      isTel: false,
      isPsw: false,
      isCode: false,
      isMobileCode: false,
      identifyCodes: '234567890ASDFGHJKLZXCVBNMQWERTYUOP',
      identifyCode: ''
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    checkForm (e) {
      this.errors = []
      this.isTel = false
      this.isPsw = false
      if (this.tel && this.password && this.code && this.mobileCode) {
        return true
      }
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
      } else if (this.password.length < 6 || this.password.length > 18) {
        this.errors.push('请设置6~18位密码')
        this.isPsw = true
      }
      if (!this.code) {
        this.errors.push('请输入验证码')
        this.isCode = true
      } else if (this.upperCase(this.code) !== this.identifyCode) {
        this.errors.push('验证码不正确')
        this.isCode = true
      }
      if (!this.mobileCode) {
        this.errors.push('请输入短信验证码')
        this.isMobileCode = true
      }
      if (!this.errors.length) {
        return true
      }
      setTimeout(() => {
        this.errors = []
      }, 4000)
      e.preventDefault()
    },
    validTel (tel) {
      var re = /^[0-9]{11}$/
      return re.test(tel)
    },
    upperCase (str) {
      return str.toUpperCase()
    },
    clearTel () {
      this.tel = ''
    },
    close () {
      this.$router.push({path: '/index'})
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
    }
  },
  components: {
    'identify': Identify
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
        .identify-wrapper
          overflow hidden
        .send-code
          width 10rem
          font-size 1.4rem
          background-color #ffffff
          color #1f8bee
          outline none
          border none
        .icon-dismiss
          width 2.2rem
          font-size 1.8rem
          text-align center
          color #bfbfbf
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

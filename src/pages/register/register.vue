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
        <div class="input-wrapper" :class="{'error-input': isMobileCode}" v-show="true">
          <input v-model="mobileCode" type="text" placeholder="请输入短信验证码">
          <div class="send-code" v-show="!isSendCode" @click="getMobileCode">发送验证码</div>
          <div class="send-code send-code-c" v-show="isSendCode">{{count}}</div>
        </div>
        <div class="input-wrapper" :class="{'error-input': isPsw}">
          <input v-model="password" type="password" placeholder="请输入密码">
        </div>
      </div>
      <div class="register-tips">
        <span>注册即同意 <a>《用户注册协议》</a></span>
      </div>
      <div class="submit" @click="register">注册</div>
      <div class="under-submit">
        <span>已有账号，<router-link to="/login">立即登录</router-link></span>
      </div>
      <transition name="error">
        <div class="error-wrapper" v-if="errors.length" ref="errorWrapper">
          <p class="error-text" :class="{'correct-text': isSendCode}" v-for="(error, index) in errors" :key="index" v-if="index == 0">{{error}}</p>
        </div>
      </transition>
    </form>
  </div>
</template>

<script>
import {postApi} from '../../api/getApi.js'

const ERR_OK = '0'
const TIME_COUNT = 60
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
      captchaImage: '',
      isSendCode: false,
      count: ''
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    register () {
      this.checkForm()
      if (this.checkForm()) {
        this.toRegister()
      }
    },
    toRegister () {
      console.log('zhuce')
    },
    checkSendCode () {
      this.isTel = false
      this.isCode = false
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
      this.$router.push({path: '/index'})
    },
    getCode () {
      postApi('/index?method=user.getCaptcha&format=json').then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.captchaImage = res.data.data.captchaImage
          this.captchaCodeKey = res.data.data.captchaCodeKey
        }

        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
    refreshCode () {
      this.getCode()
    },
    getMobileCode () {
      this.checkSendCode()
      let params = {
        captchaCodeKey: this.captchaCodeKey,
        captchaCode: this.code,
        mobileNumber: this.tel,
        usage: 1
      }
      postApi('/index?method=user.getMobileCode&format=json', params).then(res => {
        if (res.data.errorCode === ERR_OK) {
          this.isSendCode = true
          this.errors.push(res.data.errorMessage)
          let timer = null
          if (!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        } else {
          this.errors.push(res.data.errorMessage)
        }

        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  watch: {
    tel () {
      console.log(this.tel.length)
    }
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
          background-color green
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

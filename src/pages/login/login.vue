<template>
  <div class="login">
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
        </div>
        <div class="input-wrapper" :class="{'error-input': isPsw}">
          <input v-model="password" type="password" placeholder="请输入密码">
        </div>
      </div>
      <button type="submit" class="submit" value="登录">登录</button>
      <div class="login-tips">
        <router-link to="/register" tag="span">立即注册</router-link>
        <span>忘记密码</span>
      </div>
      <transition name="error">
        <div class="error-wrapper" v-if="errors.length" ref="errorWrapper">
          <p class="error-text" v-for="(error, index) in errors" :key="index" v-if="index == 0">{{error}}</p>
        </div>
      </transition>
    </form>
    <div class="login-wx">
      <i class="icon-weixin"></i>
      <p>微信登录</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errors: [],
      tel: null,
      password: null,
      isTel: false,
      isPsw: false
    }
  },
  methods: {
    checkForm (e) {
      this.errors = []
      this.isTel = false
      this.isPsw = false
      if (this.tel && this.password) {
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
    close () {
      this.$router.push({path: '/index'})
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.login
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  width 100%
  background-color #fff
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
    .login-tips
      padding 1rem 0.4rem
      display flex
      align-items center
      justify-content space-between
      span
        font-size 1.6rem
        color #393a4c
    .submit
      width 100%
      outline none
      border none
      height 3.4rem
      line-height 3.4rem
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
        height 3.4rem
        line-height 3.4rem
        border-radius .4rem
        text-align center
        color #fff
        background-color #f1403c
      &.error-enter-active
        animation show-error 4s ease
  .login-wx
    position absolute
    bottom 4rem
    left 0
    width 100%
    text-align center
    .icon-weixin
      font-size 4.4rem
      color #44b549
    p
      font-size 1.6rem
      color #393a4c
@keyframes show-error
  0%
    opacity 0
  33%
    opacity 1
  66%
    opacity 1
  100%
    opacity 0
</style>

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
        <div class="input-wrapper">
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="请输入密码">
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="请输入验证码">

        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="请输入短信验证码">
          <button class="send-code">发送验证码</button>
        </div>
      </div>
      <div class="register-tips">
        <span>注册即同意 <a>《用户注册协议》</a></span>
      </div>
      <button type="submit" class="submit">注册</button>
      <div class="under-submit">
        <span>已有账号，<router-link to="/login">立即登录</router-link></span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    close () {
      this.$router.push({path: '/index'})
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
    padding 2rem
    .register-content
      margin-bottom 7rem
      .input-wrapper
        display flex
        margin-bottom 1rem
        padding 1.6rem 0
        font-size 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        input
          flex 1
          vertical-align top
          font-size 1.6rem
          outline none
          border none
          caret-color #1f8bee
        .send-code
          width 8rem
          font-size 1.4rem
          background-color #ffffff
          color #1f8bee
          outline none
          border none
    .register-tips
      line-height 4rem
      text-align center
      span
        font-size 1.4rem
        color #757575
        a
          text-decoration underline
    .under-submit
      padding 1rem 0.4rem
      display flex
      span
        flex 1
        font-size 1.6rem
        text-align center
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

</style>

<template>
  <div class="header">
    <div class="top-wrapper">
      <router-link to="/index" tag="div" class="logo">
        <img src="./logo.png" alt="logo">
      </router-link>
      <div class="nav">
        <router-link to="/index" class="nav-btn" active-class="nav-btn-s">资讯</router-link>
        <router-link to="/tool" class="nav-btn" active-class="nav-btn-s">工具</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  width 100%
  border-1px(rgba(7,17,27,0.1))
  background-color #fff
  .top-wrapper
    padding 0 2rem
    display flex
    justify-content space-between
    background #fff
    .logo
      line-height 4.92rem
      height 4.92rem
      img
        height 2rem
        vertical-align middle
    .nav
      font-size 0
      .nav-btn
        display inline-block
        padding 0 1.6rem
        line-height 5rem
        height 4.92rem
        font-size 1.6rem
        color #393a4c
        outline none
      .nav-btn-s
        color #1f8bee
</style>

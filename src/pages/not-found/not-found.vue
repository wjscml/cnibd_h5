<template>
  <div class="notfound">
    <div class="notfoundWrapper">
      <div class="tips">
        <img src="./notfoundBg.png" alt="notfound">
        <p>很抱歉<br>您要访问的页面不存在</p>
      </div>
      <router-link to="/index" tag="div" class="goIndex">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.notfound
  position fixed
  top 0
  height 100%
  width 100%
  background-color rgba(0,0,0,0.5)
  .notfoundWrapper
    display flex
    flex-direction column
    justify-content space-between
    box-sizing border-box
    padding 6rem 0
    margin 12rem auto
    width 80%
    height calc(100vh - 24rem)
    border-radius 1rem
    background-color #fff
    .tips
      img
        display block
        margin 0 auto 2rem
        width 17rem
      p
        font-size 1.6rem
        text-align center
        color #393a4c
    .goIndex
      width 14rem
      margin 0 auto
      line-height 3.4rem
      font-size 1.6rem
      text-align center
      border-radius 1.7rem
      background-color #1f8bee
      color #fff

</style>

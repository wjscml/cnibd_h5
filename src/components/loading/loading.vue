<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang="stylus">
.loading
  width: 100%
  text-align: center
  margin-top 25%
  img
    width 24px
    height 24px
  .desc
    line-height: 2.4rem
    font-size 1.2rem
    color #757575
</style>

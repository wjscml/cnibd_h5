<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" type="text">
    <i class="icon-dismiss"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.search-box
  display flex
  box-sizing border-box
  width 100%
  padding 0 0.6rem
  height 4rem
  border 1px solid #e0e0e0
  border-radius 0.6rem
  .icon-search
    width 4rem
    background url(./icon-search.png) no-repeat center
    background-size 4rem
  .box
    flex 1
    line-height 1.8rem
    font-size 1.8rem
    outline none
    border none
  .icon-dismiss
    width 4rem
    background url(./icon-dismiss.png) no-repeat center
    background-size 4rem
</style>

<template>
  <div class="bottom-tip">
      <img class="image" src="./loading.png" v-show="isLoad">
      <span class="loading-hook">{{tips}}</span>
    </div>
</template>

<script>
export default {
  props: {
    isLoad: null,
    tips: ''
  }
}
</script>

<style lang="stylus">
@keyframes loadingRotate
  0%
    -webkit-transform: rotate(0) translateZ(0)
    transform: rotate(0) translateZ(0)
  50%
    -webkit-transform: rotate(180deg) translateZ(0)
    transform: rotate(180deg) translateZ(0)
  100%
    -webkit-transform: rotate(360deg) translateZ(0)
    transform: rotate(360deg) translateZ(0)
.bottom-tip
  height 4rem
  line-height 4rem
  text-align center
  .loading-hook
    font-size 1.2rem
    color #757575
  .image
    vertical-align middle
    width 1.4rem
    height 1.4rem
    animation: loadingRotate .4s linear infinite forwards
</style>

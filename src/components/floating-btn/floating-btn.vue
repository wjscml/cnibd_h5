<template>
  <div class="floating-wrapper" v-show="isShow">
    <div class="floating-btn">
      <transition name="btn">
        <div class="bg-layer" v-show="!isClose">
          <div class="item home-btn" @click="goHome"></div>
          <div class="item last-btn" @click="goLast"></div>
          <div class="item next-btn" @click="goNext"></div>
          <div class="item gotop-btn" @click="goTop"></div>
        </div>
      </transition>
      <div class="add-btn" @click="change" ref="addBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isClose: true
    }
  },
  props: {
    isShow: Boolean
  },
  created () {
  },
  methods: {
    change () {
      this.isClose = !this.isClose
    },
    goTop () {
      this.$emit('gotop')
      this.isClose = !this.isClose
    },
    goHome () {
      this.$router.push({path: '/index'})
      this.isClose = !this.isClose
    },
    goLast () {
      this.$emit('golast')
      this.isClose = !this.isClose
    },
    goNext () {
      this.$emit('gonext')
      this.isClose = !this.isClose
    }
  },
  watch: {
    isClose (newVal) {
      if (newVal === false) {
        this.$refs.addBtn.style['transform'] = 'rotate(-45deg)'
      }
      if (newVal === true) {
        this.$refs.addBtn.style['transform'] = 'rotate(0deg)'
      }
    }
  }
}
</script>

<style lang="stylus">
.floating-wrapper
  position fixed
  bottom 0
  right 0
  box-sizing border-box
  padding 0 2rem 3rem
  width 100%
  .floating-btn
    position relative
    width 100%
    height 4.6rem
    border-radius 2.3rem
    .bg-layer
      position absolute
      top 0
      right 0
      width 100%
      height 4.6rem
      border-radius 2.3rem
      background-color: rgba(31, 139, 238, .8)
      transition all 0.4s
      .item
        float left
        margin-right 1rem
        width 4.6rem
        height 4.6rem
        border-radius 50%
        background no-repeat center
        background-size 4.6rem
        background-color: rgba(31, 139, 238, .4)
        &:active
          background-color #1f8bee
        &.home-btn
          background-image url(./home.png)
        &.gotop-btn
          background-image url(./gotop.png)
        &.last-btn
          background-image url(./last.png)
        &.next-btn
          background-image url(./next.png)
    .btn-transition
      width 100%
      opacity 1
    .btn-enter,.btn-leave
      width 4.6rem
      opacity 0.5
    .add-btn
      float right
      width 4.6rem
      height 4.6rem
      border-radius 50%
      background url(./add.png) no-repeat center
      background-size 4.6rem
      background-color: rgba(31, 139, 238, .8)
      transition all .2s

</style>

<template>
  <div class="floating-wrapper" v-show="isShow">
    <div class="floating-btn">
      <transition name="btn">
        <div class="bg-layer" v-show="!isClose">
          <i class="item icon-nav-home" @click="goHome"></i>
          <i class="item icon-backward" @click="goLast"></i>
          <i class="item icon-forward" @click="goNext"></i>
          <i class="item icon-top" @click="goTop"></i>
          <i class="item" :class="getClass" @click="toggle"></i>
        </div>
      </transition>
      <div class="add-btn" @click="change" ref="addBtn"><i class="icon-add"></i></div>
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
    isShow: {
      type: Boolean,
      default: true
    },
    getClass: {
      type: String,
      default: ''
    }
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
    },
    toggle () {
      this.$emit('toggle')
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
    height 4.2rem
    border-radius 2.1rem
    .bg-layer
      position absolute
      top 0
      right 0
      display flex
      align-items center
      width 100%
      height 4.2rem
      border-radius 2.1rem
      background-color: rgba(31, 139, 238, .7)
      .item
        margin-right 1rem
        width 4.2rem
        line-height 4.2rem
        border-radius 50%
        background-color: rgba(31, 139, 238, .7)
        font-size 2.2rem
        text-align center
        color #fff
        &:active
          background-color #1f8bee
      &.btn-enter, &.btn-leave-active
        width 4.2rem
        opacity 0
      &.btn-enter-active, &.btn-leave-active
        transition all 0.3s ease
    .add-btn
      float right
      width 4.2rem
      height 4.2rem
      font-size 0
      border-radius 50%
      text-align center
      background-color: rgba(31, 139, 238, .8)
      transition all .2s
      &:after
        content ''
        display inline-block
        height 100%
        vertical-align middle
      .icon-add
        display inline-block
        vertical-align middle
        font-size 2.4rem
        color #fff
</style>

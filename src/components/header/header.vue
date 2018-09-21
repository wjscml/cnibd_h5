<template>
  <div class="header" :class="{'noBorder': isNavList}">
    <div class="top-wrapper">
      <div @click="goIndex">
        <img src="./logo.png" alt="logo" class="logo">
      </div>
      <div class="nav-btn" @click="changeNav">
        <i :class="isNavList ? 'icon-close' : 'icon-all'"></i>
      </div>
    </div>
    <transition name="nav">
      <div class="nav-list" v-show="isNavList">
        <transition name="navList">
          <div class="nav-list-wrapper" @click="changeNav" v-show="isNavList">
            <router-link :to="item.link" tag="div" v-for="(item, index) in nav" :key="index" class="nav-item">
              <i :class="item.icon" class="nav-item-icon"></i>
              <span class="nav-item-text">{{item.name}}</span>
            </router-link>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nav: [
        {
          name: '首页',
          link: '/index',
          icon: 'icon-nav-home'
        },
        {
          name: '作者专栏',
          link: '/columnist',
          icon: 'icon-nav-columnist'
        },
        {
          name: '搜索',
          link: '/search',
          icon: 'icon-nav-search'
        },
        {
          name: '计算器',
          link: '/tool',
          icon: 'icon-keyboard'
        }
      ],
      isNavList: false
    }
  },
  methods: {
    changeNav () {
      this.isNavList = !this.isNavList
    },
    goIndex () {
      this.$router.push({path: '/index'})
      this.isNavList = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  width 100%
  border-1px(rgba(7,17,27,0.1))
  background-color #fff
  position relative
  font-size 0
  &.noBorder
    border-1px(rgba(0,0,0,0))
  .top-wrapper
    padding 0 2rem
    height 5rem
    display flex
    align-items center
    justify-content space-between
    background #fff
    .logo
      height 2rem
    .nav-btn
      color #393a4c
      .icon-all
        font-size 2.7rem
      .icon-close
        font-size 2.7rem
  .nav-list
    overflow hidden
    position absolute
    left 0
    right 0
    top 5rem
    bottom 0
    height calc(100vh - 5rem)
    background-color rgba(7,17,27,0.9)
    backdrop-filter: blur(10px)
    z-index 100
    &.nav-enter, &.nav-leave-active
      opacity 0
    &.nav-enter-active, &.nav-leave-active
      transition all .4s ease
    .nav-list-wrapper
      background-color #fff
      border-1px(rgba(7,17,27,0.1))
      &.navList-enter, &.navList-leave-active
        transform translate3d(0, -100%, 0)
      &.navList-enter-active, &.navList-leave-active
        transition all .4s ease
      .nav-item
        display flex
        align-items center
        margin 0 2rem
        height 4.9rem
        border-1px(rgba(7,17,27,0.1))
        color #393a4c
        &:last-child
          border-1px(rgba(0,0,0,0))
        .nav-item-icon
          width 2.2rem
          text-align center
          font-size 2.2rem
        .nav-item-text
          margin-left 1rem
          font-size 1.6rem

</style>

<template>
  <div class="header" :class="{'noBorder': isNavList}">
    <div class="top-wrapper">
      <div @click="goLogin" class="login-btn" v-if="!isLogin && !isNavList">
        <i class="icon-people"></i>
      </div>
      <div @click="changePrivateNav" class="login-btn" v-if="isLogin && !isNavList">
        <img :src="avatar">
      </div>
      <div @click="goIndex">
        <i class="icon-logo"></i>
      </div>
      <div class="nav-btn" @click="changeCommonNav">
        <i :class="isNavList ? 'icon-close' : 'icon-all'"></i>
      </div>
    </div>
    <transition name="nav">
      <div class="nav-list" v-show="isNavList">
          <div class="nav-list-wrapper">
            <div v-for="(item, index) in nav" :key="index" class="nav-item" @click.stop="selectNav(item)">
              <i :class="item.icon" class="nav-item-icon"></i>
              <span class="nav-item-text">{{item.name}}</span>
            </div>
          </div>
      </div>
    </transition>
    <confirm @confirm="logout" text="是否退出登陆" ref="confirm"></confirm>
  </div>
</template>

<script>
import Confirm from '../../components/confirm/confirm'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      nav: [],
      commonNav: [
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
      privateNav: [
        {
          name: '我的收藏',
          link: '/favor',
          icon: 'icon-favor'
        },
        {
          name: '退出登陆',
          icon: 'icon-logout'
        }
      ],
      isNavList: false
    }
  },
  computed: {
    avatar: function () {
      return this.loginState.avatar
    },
    isLogin: function () {
      if (!this.loginState || this.loginState.length === 0) {
        return false
      }
      return true
    },
    ...mapGetters([
      'loginState'
    ])
  },
  methods: {
    changeCommonNav () {
      this.isNavList = !this.isNavList
      if (this.isNavList) {
        this.nav = this.commonNav
      }
    },
    changePrivateNav () {
      this.isNavList = !this.isNavList
      if (this.isNavList) {
        this.nav = this.privateNav
      }
    },
    goIndex () {
      this.$router.push({ path: '/index' })
      this.isNavList = false
    },
    goLogin () {
      this.$router.push({ path: '/login' })
      this.isNavList = false
    },
    selectNav (item) {
      if (item.icon === 'icon-logout') {
        this.$refs.confirm.show()
      } else {
        this.$router.push({ path: item.link })
      }
      this.isNavList = false
    },
    logout () {
      this.saveLoginState()
      this.$router.push({ path: '/index' })
    },
    ...mapActions([
      'saveLoginState'
    ])
  },
  components: {
    'confirm': Confirm
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
    .login-btn
      extend-click()
      width 2.8rem
      color #393a4c
      .icon-people
        font-size 2.5rem
      img
        width 2.8rem
        height 2.8rem
        border-radius 50%
    .icon-logo
      font-size 2.2rem
      color #1f8bee
    .nav-btn
      extend-click()
      width 2.8rem
      text-align right
      color #393a4c
      .icon-all
        font-size 2.5rem
      .icon-close
        font-size 2.5rem
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
    .nav-list-wrapper
      background-color #fff
      border-1px(rgba(7,17,27,0.1))
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
    &.nav-enter, &.nav-leave-active
      opacity 0
      .nav-list-wrapper
        transform translate3d(0, -100%, 0)
    &.nav-enter-active, &.nav-leave-active
      transition all .4s ease
      .nav-list-wrapper
        transition all .4s ease

</style>

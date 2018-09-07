<template>
  <div class="columnist">
    <div @click="selectAuthor(item)" class="column" v-for="(item, index) in columnist" :key="index">
      <div class="avatar">
        <img class="image" :src="item.avatar">
        <i :class="{'vip': item.is_certificate === 1}"></i>
      </div>
      <div class="text">
        <h1 class="name">{{item.nickname}}</h1>
        <p class="intro">{{item.description}}</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getApi} from '../../api/getApi.js'
import {share} from '../../common/js/share.js'
import {mapMutations} from 'vuex'

const ERR_OK = 0
export default {
  data () {
    return {
      columnist: []
    }
  },
  created () {
    this.getColumnist()
  },
  mounted () {
    share()
  },
  methods: {
    getColumnist () {
      getApi('/author-list?page=0').then(res => {
        console.log(res)
        if (res.data.errorCode === ERR_OK) {
          this.columnist = res.data.data
        }
      })
    },
    selectAuthor (author) {
      this.$router.push({
        path: `/columnist/${author.author_id}`
      })
      this.setAuthor(author)
    },
    ...mapMutations({
      setAuthor: 'SET_AUTHOR'
    })
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.columnist
  padding 0 2rem
  .column
    display flex
    padding 2rem 2rem
    margin-top 2rem
    border-radius 1rem
    background-color #fff
    .avatar
      flex-shrink 0
      position relative
      padding 0.4rem
      margin-right 1.6rem
      border 0.1rem solid #e0e0e0
      border-radius 50%
      background-color #f5f5f5
      .image
        width 6rem
        height 6rem
        border-radius 50%
      .vip
        position absolute
        right 0
        bottom 0
        background-image url(../../common/image/vip-steps.png)
    .text
      font-size 0
      .name
        margin-bottom 1rem
        line-height 2.4rem
        font-size 1.8rem
        font-weight 600
        color #393a4c
      .intro
        height 3.6rem
        line-height 1.8rem
        font-size 1.2rem
        color #999
        display -webkit-box
        overflow hidden
        -webkit-line-clamp 2
        text-overflow ellipsis
        -webkit-box-orient vertical

</style>

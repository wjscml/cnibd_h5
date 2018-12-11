<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" @keyup.enter="keyupEnter" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索文章关键字'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    keyupEnter () {
      this.$emit('keyupEnter')
    }
  },
  created () {
    this.$watch('query', (newQuery, oldQuery) => {
      this.$emit('query', newQuery, oldQuery)
    })
  }
}
</script>

<style lang="stylus" scoped>
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 0.6rem
  height 4rem
  background-color #f0f0f0
  border-radius 0.6rem
  .icon-search
    width 4rem
    font-size 2.5rem
    text-align center
    color #393a4c
  .box
    flex 1
    line-height 1.6rem
    font-size 1.6rem
    background-color #f0f0f0
    color #1f8bee
    outline none
    border none
  .icon-dismiss
    width 4rem
    font-size 1.8rem
    text-align center
    color #bfbfbf
</style>

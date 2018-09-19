<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" @focus="focus" v-model="query" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索文章关键字、作者'
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
    focus () {
      this.$emit('focus')
    }
  },
  created () {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>

<style lang="stylus" scoped>
.search-box
  display flex
  box-sizing border-box
  width 100%
  padding 0 0.6rem
  height 4rem
  background-color #f0f0f0
  border-radius 0.6rem
  .icon-search
    width 4rem
    background url(./icon-search.png) no-repeat center
    background-size 4rem
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
    background url(./icon-dismiss.png) no-repeat center
    background-size 4rem
</style>

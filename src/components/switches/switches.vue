<template>
  <div class="switches">
    <div class="switch-content">
      <div class="switch-item" v-for="(item, index) in switches" :key="index" :class="{'active':currentIndex === index}" @click="switchItem(index)">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    switches: {},
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style lang="stylus">
.switches
  box-sizing border-box
  width 100%
  padding 0.5rem 5rem
  height 5rem
  background-color #fff
  .switch-content
    display: flex
    align-items: center
    border-radius .4rem
    border 1px solid #1f8bee
    .switch-item
      flex 1
      text-align: center
      font-size: 1.5rem
      color: #393a4c
      &.active
        background-color #1f8bee
        color: #fff
</style>

<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    eventPassthrough: {
      type: String,
      default: ''
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tips: '下拉刷新'
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.scrollY,
        scrollX: this.scrollX,
        eventPassthrough: this.eventPassthrough
      })
      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos)
        })
      }
      if (this.listenScroll || this.pullUpLoad) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY) {
            this.$emit('scrollToEnd')
          }
        })
        this.scroll.on('touchEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY - 40) {
            this.$emit('touchToEnd')
          }
        })
      }
      if (this.pullDownRefresh) {
        let flag = true
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 50 && flag) {
            flag = false
            this.$emit('scrollToTop')
          } else if (pos.y === 0) {
            flag = true
          }
        })
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.$emit('pullingDown')
          }
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy () {
      this.scroll.destroy()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="stylus">
.pulldown-tips
  width 100%

</style>

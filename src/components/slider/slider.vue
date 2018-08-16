<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from '../../common/js/dom.js'

export default {
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this.dots = new Array(this.children.length)
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 500
        }
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })

      this.slider.on('scrollStart', () => {
        clearTimeout(this.timer)
      })
    },
    _play () {
      let pageIndex = this.currentPageIndex
      if (this.loop) {
        pageIndex += 1
      }
      console.log(pageIndex)
      this.timer = setTimeout(() => {
        this.slider.next(500)
      }, this.interval)
    }
  }
}
</script>
<style lang="stylus">
.slider
  min-height: 1px
  overflow: hidden
  .slider-group
    overflow: hidden
    height 18rem
    .slider-item
      position relative
      float: left
      .slider-pic
        img
          width 100%
          height 18rem
      .slider-info
        overflow hidden
        box-sizing border-box
        position absolute
        bottom 0
        left 0
        width 100%
        padding 0 2rem
        line-height 3rem
        font-size 1.6rem
        background-color rgba(0,0,0,0.5)
        color #fff
        text-align center
        white-space nowrap
        text-overflow ellipsis
</style>

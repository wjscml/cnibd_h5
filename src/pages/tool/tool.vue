<template>
<div class="calculator">
  <h3 class="header">个税计算器</h3>
  <div class="content">
    <input type="number" id="salary" placeholder="请输入工资" v-model.number='bfoIncome'/>
    <p v-show='bfoIncome<1550'><b>您的工资小于最低标准</b></p>
    <div class="list" v-show='bfoIncome>=1550'>
      <ul>
        <li>
          <div>
            <label>养老保险</label>
            <input v-model.number='oldSL'/>
            <b>%</b>
          </div>
          <div>
            <b>{{bfoIncome*oldSL/100}}</b>
          </div>
        </li>
        <li>
          <div>
            <label>医疗保险</label>
            <input v-model.number='ylSL'/>
            <b>%</b>
          </div>
          <div>
            <b>{{bfoIncome*ylSL/100}}</b>
          </div>
        </li>
        <li>
          <div>
            <label>失业保险</label>
            <input v-model.number='sySL' />
            <b>%</b>
          </div>
          <div>
            <b>{{bfoIncome*sySL/100}}</b>
          </div>
        </li>
        <li>
          <div>
            <label>住房公积金</label>
            <input v-model.number='zfSL'/>
            <b>%</b>
          </div>
          <div>
            <b>{{bfoIncome*zfSL/100}}</b>
          </div>
        </li>
        <li>
          <div>
            <label>税前工资</label>
          </div>
          <div>
            <b>{{bfoRes|dataFormatter}}</b>
          </div>
        </li>
        <li>
          <div>
            <label>个人所得税</label>
          </div>
          <div>
            <b>{{grsds|dataFormatter}}</b>
          </div>
        </li>
      </ul>
    </div>
    <div class="result" v-show='bfoIncome>=1550'>
      <div>
        <b>税后工资</b>
      </div>
      <div>
        <b>{{shgz|dataFormatter}}</b>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {share} from '../../common/js/share.js'

export default {
  data () {
    return {
      bfoIncome: Number,
      oldSL: 8,
      ylSL: 2,
      sySL: 1,
      zfSL: 8,
      shareVal: {
        title: '赛恩财经——个税计算器',
        summary: '赛恩财经，提供全球股票,外汇,期货,债券,基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯,以及多种投资工具。',
        thumb: 'https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png'
      }
    }
  },
  mounted () {
    share(this.shareVal)
  },
  computed: {
    bfoRes () {
      return this.bfoIncome * (1 - (this.oldSL + this.ylSL + this.sySL + this.zfSL) / 100)
    },
    grsds () {
      let sl = 0
      let sskcs = 0
      let basIncom = this.bfoRes - 5000
      if (basIncom <= 0) {
        return 0
      }
      if (basIncom <= 1550) {
        sl = 3
        sskcs = 0
      } else if (basIncom <= 4500) {
        sl = 10
        sskcs = 105
      } else if (basIncom <= 9000) {
        sl = 20
        sskcs = 555
      } else if (basIncom <= 35000) {
        sl = 25
        sskcs = 1005
      } else if (basIncom <= 55000) {
        sl = 30
        sskcs = 2755
      } else if (basIncom <= 80000) {
        sl = 35
        sskcs = 5505
      } else {
        sl = 45
        sskcs = 13505
      }
      return basIncom * sl / 100 - sskcs
    },
    shgz () {
      return this.bfoRes - this.grsds
    }
  },
  filters: {
    dataFormatter (v) {
      return (v).toFixed(2)
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.calculator
  min-height calc(100vh - 12.52rem)
  background-color #fff
  color #393a4c
  .header
    line-height 4.92rem
    height 4.92rem
    border-1px(rgba(7,17,27,0.1))
    text-align center
  .content
    padding 0 4rem
    #salary
      box-sizing border-box
      width: 100%
      height: 3.6rem
      line-height 3.6rem
      margin 4rem 0 2rem
      border-radius: 3px
      border: 1px solid #e0e0e0
      outline none
      text-align center
      caret-color: #1f8bee
      &:focus
        border-color #1f8bee
    .list
      border-bottom: 1px solid black
      ul
        li
          display: flex
          justify-content: space-between
          margin: 2rem 1rem
          label
            display inline-block
            width 7rem
          input
            width 4rem
            border: 1px solid #e0e0e0
            outline none
            caret-color: #1f8bee
    .result
      display: flex
      justify-content: space-between
      padding 1.4rem 1rem 2rem

</style>

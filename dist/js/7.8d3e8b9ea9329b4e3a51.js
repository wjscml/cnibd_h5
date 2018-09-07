webpackJsonp([7],{"J/fx":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("dyDs"),i={data:function(){return{bfoIncome:Number,oldSL:8,ylSL:2,sySL:1,zfSL:8,shareVal:{title:"赛恩财经——个税计算器",summary:"赛恩财经，提供全球股票,外汇,期货,债券,基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯,以及多种投资工具。",thumb:"https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png"}}},mounted:function(){Object(n.a)(this.shareVal)},computed:{bfoRes:function(){return this.bfoIncome*(1-(this.oldSL+this.ylSL+this.sySL+this.zfSL)/100)},grsds:function(){var e=0,t=0,o=this.bfoRes-3500;return o<=0?0:(o<=1550?(e=3,t=0):o<=4500?(e=10,t=105):o<=9e3?(e=20,t=555):o<=35e3?(e=25,t=1005):o<=55e3?(e=30,t=2755):o<=8e4?(e=35,t=5505):(e=45,t=13505),o*e/100-t)},shgz:function(){return this.bfoRes-this.grsds}},filters:{dataFormatter:function(e){return e.toFixed(2)}}},s={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"calculator"},[o("h3",{staticClass:"header"},[e._v("个税计算器")]),e._v(" "),o("div",{staticClass:"content"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.bfoIncome,expression:"bfoIncome",modifiers:{number:!0}}],attrs:{type:"number",id:"salary",placeholder:"请输入工资"},domProps:{value:e.bfoIncome},on:{input:function(t){t.target.composing||(e.bfoIncome=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}}),e._v(" "),o("p",{directives:[{name:"show",rawName:"v-show",value:e.bfoIncome<1550,expression:"bfoIncome<1550"}]},[o("b",[e._v("您的工资小于最低标准")])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.bfoIncome>=1550,expression:"bfoIncome>=1550"}],staticClass:"list"},[o("ul",[o("li",[o("div",[o("label",[e._v("养老保险")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.oldSL,expression:"oldSL",modifiers:{number:!0}}],domProps:{value:e.oldSL},on:{input:function(t){t.target.composing||(e.oldSL=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}}),e._v(" "),o("b",[e._v("%")])]),e._v(" "),o("div",[o("b",[e._v(e._s(e.bfoIncome*e.oldSL/100))])])]),e._v(" "),o("li",[o("div",[o("label",[e._v("医疗保险")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.ylSL,expression:"ylSL",modifiers:{number:!0}}],domProps:{value:e.ylSL},on:{input:function(t){t.target.composing||(e.ylSL=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}}),e._v(" "),o("b",[e._v("%")])]),e._v(" "),o("div",[o("b",[e._v(e._s(e.bfoIncome*e.ylSL/100))])])]),e._v(" "),o("li",[o("div",[o("label",[e._v("失业保险")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.sySL,expression:"sySL",modifiers:{number:!0}}],domProps:{value:e.sySL},on:{input:function(t){t.target.composing||(e.sySL=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}}),e._v(" "),o("b",[e._v("%")])]),e._v(" "),o("div",[o("b",[e._v(e._s(e.bfoIncome*e.sySL/100))])])]),e._v(" "),o("li",[o("div",[o("label",[e._v("住房公积金")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.zfSL,expression:"zfSL",modifiers:{number:!0}}],domProps:{value:e.zfSL},on:{input:function(t){t.target.composing||(e.zfSL=e._n(t.target.value))},blur:function(t){e.$forceUpdate()}}}),e._v(" "),o("b",[e._v("%")])]),e._v(" "),o("div",[o("b",[e._v(e._s(e.bfoIncome*e.zfSL/100))])])]),e._v(" "),o("li",[e._m(0),e._v(" "),o("div",[o("b",[e._v(e._s(e._f("dataFormatter")(e.bfoRes)))])])]),e._v(" "),o("li",[e._m(1),e._v(" "),o("div",[o("b",[e._v(e._s(e._f("dataFormatter")(e.grsds)))])])])])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.bfoIncome>=1550,expression:"bfoIncome>=1550"}],staticClass:"result"},[e._m(2),e._v(" "),o("div",[o("b",[e._v(e._s(e._f("dataFormatter")(e.shgz)))])])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("label",[this._v("税前工资")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("label",[this._v("个人所得税")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("b",[this._v("税后工资")])])}]};var r=o("D8HT")(i,s,!1,function(e){o("WOaK")},null,null);t.default=r.exports},WOaK:function(e,t){}});
//# sourceMappingURL=7.8d3e8b9ea9329b4e3a51.js.map
webpackJsonp([7],{RMfo:function(t,e){},"ru+r":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("34v0"),n=i.n(s),o=i("qqiS"),r=i("/gb8"),a=i("EcfS"),u={data:function(){return{isLogin:!1}},created:function(){this.loginState&&"0"===this.loginState.errorCode?this.$router.push("/index"):this.wxLogin()},methods:n()({wxLogin:function(){var t=this;Object(r.b)("user.wxLogin",{code:this.$route.query.code,wxBrowser:this.$route.query.state}).then(function(e){"0"===e.data.errorCode?(t.saveLoginState(e.data),t.isLogin=!0,t.$router.push({path:"/index"})):(alert("登陆失败，请重试！"),t.$router.push({path:"/login"}))})}},Object(a.b)(["saveLoginState"])),components:{loading:o.a}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wx-login"},[e("loading",{directives:[{name:"show",rawName:"v-show",value:!this.isLogin,expression:"!isLogin"}],staticClass:"loading-wrapper",attrs:{title:"登陆中..."}}),this._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:this.isLogin,expression:"isLogin"}],staticClass:"text"},[this._v("成功登陆！")])],1)},staticRenderFns:[]};var h=i("D8HT")(u,c,!1,function(t){i("RMfo")},null,null);e.default=h.exports}});
//# sourceMappingURL=7.d93d92e4993e0d3f4f1e.js.map
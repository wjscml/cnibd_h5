webpackJsonp([10],{"5SCf":function(t,e){},QlWu:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("34v0"),r=s.n(i),o=s("/gb8"),n=s("EcfS"),a=s("dyDs"),l={data:function(){return{errors:[],tel:"",password:"",isTel:!1,isPsw:!1,shareVal:{title:document.title,summary:"赛恩财经，提供全球股票、外汇、期货、债券、基金和数字货币等数十万种金融投资产品的实时行情和新闻资讯以及多种投资工具。",thumb:"https://cnibd.oss-cn-beijing.aliyuncs.com/resource/images/sharelogo.png"}}},mounted:function(){Object(a.a)(this.shareVal)},computed:r()({},Object(n.c)(["loginState"])),created:function(){this.loginState&&"0"===this.loginState.errorCode&&this.$router.back()},methods:r()({login:function(){this.checkForm(),this.checkForm()&&this.toLogin()},toLogin:function(){var t=this,e={mobileNumber:this.tel,password:this.password};Object(o.b)("user.login",e).then(function(e){if("0"===e.data.errorCode){if(alert("成功登陆！"),t.saveLoginState(e.data),window.history.length<=1)return t.$router.push({path:"/index"}),!1;t.$router.back()}else t.errors.push(e.data.errorMessage)}).catch(function(t){console.log(t)})},checkForm:function(){var t=this;return this.isTel=!1,this.isPsw=!1,this.tel?this.validTel(this.tel)||(this.errors.push("请输入正确的手机号码"),this.isTel=!0):(this.errors.push("请输入手机号码"),this.isTel=!0),this.password||(this.errors.push("请输入密码"),this.isPsw=!0),!this.errors.length||(setTimeout(function(){t.errors=[]},4e3),!1)},validTel:function(t){return/^[0-9]{11}$/.test(t)},clearTel:function(){this.tel=""},close:function(){this.$router.push({path:"/index"})}},Object(n.b)(["saveLoginState"]))},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("div",{staticClass:"login-wrapper"},[s("header",{staticClass:"login-header"},[s("span",{staticClass:"title"},[t._v("登 录")]),t._v(" "),s("div",{staticClass:"btn-close",on:{click:t.close}},[s("i",{staticClass:"icon-close"})])]),t._v(" "),s("form",{staticClass:"login-form",on:{submit:t.checkForm}},[s("div",{staticClass:"login-content"},[s("div",{staticClass:"input-wrapper",class:{"error-input":t.isTel}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}}),t._v(" "),s("i",{directives:[{name:"show",rawName:"v-show",value:t.tel,expression:"tel"}],staticClass:"icon-dismiss",on:{click:t.clearTel}})]),t._v(" "),s("div",{staticClass:"input-wrapper",class:{"error-input":t.isPsw}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:t.password},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.login(e):null},input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"submit",on:{click:t.login}},[t._v("登录")]),t._v(" "),s("div",{staticClass:"login-tips"},[s("router-link",{attrs:{to:"/register",tag:"span"}},[t._v("立即注册")]),t._v(" "),s("router-link",{attrs:{to:"/forget",tag:"span"}},[t._v("忘记密码")])],1),t._v(" "),s("transition",{attrs:{name:"error"}},[t.errors.length?s("div",{ref:"errorWrapper",staticClass:"error-wrapper"},t._l(t.errors,function(e,i){return 0==i?s("p",{key:i,staticClass:"error-text"},[t._v(t._s(e))]):t._e()})):t._e()])],1)]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login-wx"},[e("i",{staticClass:"icon-weixin"}),this._v(" "),e("p",[this._v("微信登录")])])}]};var u=s("D8HT")(l,c,!1,function(t){s("5SCf")},null,null);e.default=u.exports}});
//# sourceMappingURL=10.0cab99985502d6a9e04c.js.map
webpackJsonp([5],{"15wR":function(e,t){},"2q8J":function(e,t,n){"use strict";t.b=function(e){var t=document.createElement("div");t.innerHTML=e;var n=t.innerText||t.textContent;return t=null,n},t.a=function(e){return 0===e.length?"":e.replace(/<table/g,'<div class="table-container"><table').replace(/<\/table>/g,"</table></div>")}},Tl0t:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("/gb8"),o=n("2q8J"),r=n("vj8B"),i=n.n(r),c=n("dyDs"),s={data:function(){return{about:""}},created:function(){this.code=this.$route.query.code,this.wxLogin(),this.getAbout()},mounted:function(){this.share()},methods:{wxLogin:function(){var e=this;Object(a.b)("user.wxLogin",{code:this.code}).then(function(t){if(console.log(t),"0"===t.data.errorCode){if(alert("成功登陆！"),console.log(t.data),window.history.length<=1)return e.$router.push({path:"/index"}),!1;e.$router.back()}else e.errors.push(t.data.errorMessage)})},getAbout:function(){var e=this;Object(a.a)("/about").then(function(t){0===t.data.errorCode&&(e.about=Object(o.b)(t.data.data.content))}).catch(function(t){t.res||(e.about="网络不给力，请稍后重试")})},share:function(){var e=encodeURIComponent(""+window.location.href);Object(a.a)("/sign?share_url="+e).then(function(e){console.log(e),0===e.data.errorCode&&(i.a.config({debug:!1,appId:e.data.data.signPackage.appId,timestamp:e.data.data.signPackage.timestamp,nonceStr:e.data.data.signPackage.nonceStr,signature:e.data.data.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),Object(c.b)(e.data.data))})}}},u={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{domProps:{innerHTML:this._s(this.about)}})},staticRenderFns:[]};var d=n("D8HT")(s,u,!1,function(e){n("15wR")},null,null);t.default=d.exports}});
//# sourceMappingURL=5.c52850b883e854ff9499.js.map
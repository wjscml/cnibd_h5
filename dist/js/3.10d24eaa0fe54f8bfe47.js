webpackJsonp([3],{"2q8J":function(t,e,n){"use strict";e.b=function(t){var e=document.createElement("div");e.innerHTML=t;var n=e.innerText||e.textContent;return e=null,n},e.a=function(t){return 0===t.length?"":t.replace(/<table/g,'<div class="table-container"><table').replace(/<\/table>/g,"</table></div>")}},"6NrA":function(t,e){},Tl0t:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/gb8"),o=n("2q8J"),r=n("vj8B"),i=n.n(r),c=n("dyDs"),u={data:function(){return{about:""}},created:function(){this.getAbout()},mounted:function(){this.share()},methods:{getAbout:function(){var t=this;Object(a.a)("/about").then(function(e){0===e.data.errorCode&&(t.about=Object(o.b)(e.data.data.content))}).catch(function(e){e.res||(t.about="网络不给力，请稍后重试")})},share:function(){var t=encodeURIComponent(""+window.location.href);Object(a.a)("/sign?share_url="+t).then(function(t){console.log(t),0===t.data.errorCode&&(i.a.config({debug:!1,appId:t.data.data.signPackage.appId,timestamp:t.data.data.signPackage.timestamp,nonceStr:t.data.data.signPackage.nonceStr,signature:t.data.data.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),Object(c.a)(t.data.data))})}}},s={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{domProps:{innerHTML:this._s(this.about)}})},staticRenderFns:[]};var d=n("D8HT")(u,s,!1,function(t){n("6NrA")},null,null);e.default=d.exports}});
//# sourceMappingURL=3.10d24eaa0fe54f8bfe47.js.map
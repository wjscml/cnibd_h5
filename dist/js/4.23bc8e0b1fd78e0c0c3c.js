webpackJsonp([4],{Tl0t:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("/gb8");var o=n("vj8B"),r=n.n(o),i=n("dyDs"),u={data:function(){return{about:""}},created:function(){this.getAbout()},mounted:function(){this.share()},methods:{getAbout:function(){var t=this;Object(a.a)("/about").then(function(e){0===e.data.errorCode&&(t.about=function(t){var e=document.createElement("div");e.innerHTML=t;var n=e.innerText||e.textContent;return e=null,n}(e.data.data.content))}).catch(function(e){e.res||(t.about="网络不给力，请稍后重试")})},share:function(){var t=encodeURIComponent(""+window.location.href);Object(a.a)("/slide&share_url="+t).then(function(t){console.log(t),0===t.data.errorCode&&(r.a.config({debug:!1,appId:t.data.data.signPackage.appId,timestamp:t.data.data.signPackage.timestamp,nonceStr:t.data.data.signPackage.nonceStr,signature:t.data.data.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),Object(i.a)(t.data.data))})}}},c={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{domProps:{innerHTML:this._s(this.about)}})},staticRenderFns:[]};var s=n("D8HT")(u,c,!1,function(t){n("fzMC")},null,null);e.default=s.exports},fzMC:function(t,e){}});
//# sourceMappingURL=4.23bc8e0b1fd78e0c0c3c.js.map
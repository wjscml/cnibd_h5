webpackJsonp([3],{Iwmd:function(e,t){},XSJt:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("vj8B"),n=a.n(s),i=a("dyDs"),l=a("/gb8"),r=a("2q8J"),o={data:function(){return{newsDetails:[],newsContent:String}},created:function(){},mounted:function(){this.httpGet()},methods:{httpGet:function(){var e=this,t=encodeURIComponent(""+window.location.href);Object(l.a)("/detail-share?article_id="+this.$route.params.id+"&share_url="+t).then(function(t){console.log(window.location.pathname),0===t.data.errorCode&&(e.newsDetails=t.data.data,e.newsContent=Object(r.a)(t.data.data.content),console.log(e.newsDetails),n.a.config({debug:!1,appId:e.newsDetails.signPackage.appId,timestamp:e.newsDetails.signPackage.timestamp,nonceStr:e.newsDetails.signPackage.nonceStr,signature:e.newsDetails.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),Object(i.a)(e.newsDetails))})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.newsDetails.title,expression:"newsDetails.title"}],staticClass:"article"},[a("div",{staticClass:"article-header"},[a("h1",{staticClass:"article-title"},[e._v(e._s(e.newsDetails.title))]),e._v(" "),a("div",{staticClass:"article-info"},[a("div",{staticClass:"author"},[a("span",{staticClass:"avatar"},[a("img",{attrs:{src:e.newsDetails.author_avatar,alt:"avatar"}})]),e._v(" "),a("span",{staticClass:"name"},[e._v(e._s(e.newsDetails.author_name))])]),e._v(" "),a("div",{staticClass:"time"},[e._v(e._s(e.newsDetails.publish_time))])])]),e._v(" "),a("div",{staticClass:"article-content",domProps:{innerHTML:e._s(e.newsContent)}})])},staticRenderFns:[]};var d=a("D8HT")(o,c,!1,function(e){a("Iwmd")},null,null);t.default=d.exports}});
//# sourceMappingURL=3.e11f0f84f6f3fe99b01b.js.map
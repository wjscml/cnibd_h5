webpackJsonp([2],{"2q8J":function(t,e,i){"use strict";e.b=function(t){var e=document.createElement("div");e.innerHTML=t;var i=e.innerText||e.textContent;return e=null,i},e.a=function(t){return 0===t.length?"":t.replace(/<table/g,'<div class="table-container"><table').replace(/<\/table>/g,"</table></div>")}},"6yWk":function(t,e){},Q4BZ:function(t,e){},XSJt:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("34v0"),a=i.n(s),n=i("dyDs"),o=i("/gb8"),l=i("2q8J"),r=i("qqiS"),c={data:function(){return{isClose:!0}},props:{isShow:{type:Boolean,default:!0},getClass:{type:String,default:""}},created:function(){},methods:{change:function(){this.isClose=!this.isClose},goTop:function(){this.$emit("gotop"),this.isClose=!this.isClose},goHome:function(){this.$router.push({path:"/index"}),this.isClose=!this.isClose},goLast:function(){this.$emit("golast"),this.isClose=!this.isClose},goNext:function(){this.$emit("gonext"),this.isClose=!this.isClose},toggle:function(){this.$emit("toggle")}},watch:{isClose:function(t){!1===t&&(this.$refs.addBtn.style.transform="rotate(-45deg)"),!0===t&&(this.$refs.addBtn.style.transform="rotate(0deg)")}}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"floating-wrapper"},[i("div",{staticClass:"floating-btn"},[i("transition",{attrs:{name:"btn"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.isClose,expression:"!isClose"}],staticClass:"bg-layer"},[i("i",{staticClass:"item icon-nav-home",on:{click:t.goHome}}),t._v(" "),i("i",{staticClass:"item icon-backward",on:{click:t.goLast}}),t._v(" "),i("i",{staticClass:"item icon-forward",on:{click:t.goNext}}),t._v(" "),i("i",{staticClass:"item icon-top",on:{click:t.goTop}}),t._v(" "),i("i",{staticClass:"item",class:t.getClass,on:{click:t.toggle}})])]),t._v(" "),i("div",{ref:"addBtn",staticClass:"add-btn",on:{click:t.change}},[i("i",{staticClass:"icon-add"})])],1)])},staticRenderFns:[]};var h,u=i("D8HT")(c,d,!1,function(t){i("Q4BZ")},null,null).exports,g=i("h2NJ"),f=i("EcfS"),v={data:function(){return{article:[],newsDetails:[],newsContent:"",isLoading:!0,isShow:!0}},created:function(){this.httpGet()},computed:a()({},Object(f.c)(["loginState"])),mounted:function(){var t=this;setTimeout(function(){window.addEventListener("scroll",t.handleScroll)},20)},methods:{handleScroll:function(){var t=this;this.isShow=!1,clearTimeout(h),h=setTimeout(function(){t.isShow=!0},200)},httpGet:function(){console.log(this.loginState),0===this.loginState.length&&(this.params={articleId:this.$route.params.id},this.getDetail()),"0"===this.loginState.errorCode&&(this.params={articleId:this.$route.params.id,session:this.loginState.data.session||this.loginState.data.data.session},this.getDetail())},getDetail:function(){var t=this;Object(o.b)("article.getDetail",this.params).then(function(e){"0"===e.data.errorCode&&(t.newsDetails=e.data.data,t.article=e.data.data,t.newsContent=Object(l.a)(e.data.data.content),Object(n.a)(t.newsDetails))})},loadAvatar:function(){this.isLoading=!1},gotop:function(){this.$refs.article.scrollIntoView()},gonext:function(){0===this.newsDetails.article_after.length?alert("已经是最后一篇文章啦~"):this.$router.push({path:"/site/"+this.newsDetails.article_after.id})},golast:function(){0===this.newsDetails.article_before.length?alert("已经是第一篇文章啦~"):this.$router.push("/site/"+this.newsDetails.article_before.id)},toggleFavorite:function(){var t=this;this.loginState&&"0"===this.loginState.errorCode?Object(o.b)("article.keep",{session:this.loginState.data.session||this.loginState.data.data.session,articleId:this.$route.params.id}).then(function(e){"0"===e.data.errorCode&&(1===e.data.data.action&&(t.newsDetails.isKeep=1),2===e.data.data.action&&(t.newsDetails.isKeep=0))}):this.$refs.confirm.show()},goLogin:function(){this.$router.push("/login")}},watch:{$route:function(t,e){this.httpGet()}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},components:{loading:r.a,"floating-btn":u,confirm:g.a}},m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:t.newsDetails.title,expression:"newsDetails.title"}],ref:"article",staticClass:"article"},[i("div",{staticClass:"article-header"},[i("h1",{staticClass:"article-title"},[t._v(t._s(t.newsDetails.title))]),t._v(" "),i("div",{staticClass:"article-info"},[i("router-link",{staticClass:"author",attrs:{to:"/columnist/"+t.newsDetails.author_id,tag:"div"}},[i("span",{staticClass:"avatar"},[i("img",{attrs:{src:t.newsDetails.author_avatar},on:{load:t.loadAvatar}})]),t._v(" "),i("span",{staticClass:"name"},[t._v(t._s(t.newsDetails.author_name))])]),t._v(" "),i("div",{staticClass:"time"},[t._v(t._s(t.newsDetails.publish_time))])],1)]),t._v(" "),i("div",{staticClass:"article-content",domProps:{innerHTML:t._s(t.newsContent)}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"loading-container"},[i("loading")],1),t._v(" "),i("floating-btn",{attrs:{isShow:t.isShow,getClass:t.newsDetails.isKeep?"icon-favor_fill":"icon-favor"},on:{gotop:t.gotop,gonext:t.gonext,golast:t.golast,toggle:t.toggleFavorite}}),t._v(" "),i("confirm",{ref:"confirm",attrs:{text:"登录后方可收藏本文~",confirmBtnText:"去登录"},on:{confirm:t.goLogin}})],1)},staticRenderFns:[]};var w=i("D8HT")(v,m,!1,function(t){i("6yWk")},null,null);e.default=w.exports}});
//# sourceMappingURL=2.48e4f1bd0df3134523d3.js.map
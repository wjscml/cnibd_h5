webpackJsonp([4],{QJr3:function(t,s){},UmzE:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("34v0"),n=e.n(i),r=e("bh5B"),c=e("h2NJ"),a={props:{switches:{},currentIndex:{type:Number,default:0}},methods:{switchItem:function(t){this.$emit("switch",t)}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"switches"},[e("div",{staticClass:"switch-content"},t._l(t.switches,function(s,i){return e("div",{key:i,staticClass:"switch-item",class:{active:t.currentIndex===i},on:{click:function(s){t.switchItem(i)}}},[e("span",[t._v(t._s(s.name))])])}))])},staticRenderFns:[]};var l=e("D8HT")(a,o,!1,function(t){e("QJr3")},null,null).exports,u=e("EcfS"),h={data:function(){return{currentIndex:0,switches:[{name:"作者"},{name:"文章"}],currentNews:[],currentAuthor:[],confirmText:""}},computed:n()({noResult:function(){return 1===this.currentIndex?!this.favoriteList.length:!this.favoriteColumnist.length},noResultDesc:function(){return 1===this.currentIndex?"暂无收藏文章":"暂无收藏作者"}},Object(u.c)(["favoriteList","favoriteColumnist"])),methods:n()({switchItem:function(t){this.currentIndex=t},showConfirm:function(t){1===this.currentIndex&&(this.currentNews=t,this.confirmText="是否不再收藏此文章"),0===this.currentIndex&&(this.currentAuthor=t,this.confirmText='是否不再收藏 "'+t.nickname+'"'),this.$refs.confirm.show()},deleteFavorite:function(){1===this.currentIndex&&this.deleteFavoriteList(this.currentNews),0===this.currentIndex&&this.deleteFavoriteColumnist(this.currentAuthor)}},Object(u.b)(["deleteFavoriteList","deleteFavoriteColumnist"])),watch:{noResult:function(){return this.favoriteList===[]?(this.tips="暂无收藏文章",!0):this.favoriteColumnist===[]?(this.tips="暂无收藏作者",!0):void console.log("this.noResult")}},components:{switches:l,confirm:c.a,scroll:r.a}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"favor"},[e("div",{staticClass:"switches-wrapper"},[e("switches",{attrs:{switches:t.switches,currentIndex:t.currentIndex},on:{switch:t.switchItem}})],1),t._v(" "),1===t.currentIndex?e("scroll",{staticClass:"list-wrapper",attrs:{data:t.favoriteList}},[e("div",{staticClass:"news-list"},t._l(t.favoriteList,function(s,i){return e("div",{key:i,staticClass:"news-item"},[e("router-link",{staticClass:"item-text",attrs:{to:"/site/"+s.id,tag:"div"}},[e("h1",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("p",{staticClass:"author"},[t._v(t._s(s.author_name))])]),t._v(" "),e("div",{staticClass:"item-icon",on:{click:function(e){t.showConfirm(s)}}},[e("i",{staticClass:"icon-like"})])],1)}))]):t._e(),t._v(" "),0===t.currentIndex?e("scroll",{staticClass:"list-wrapper",attrs:{data:t.favoriteColumnist}},[e("div",{staticClass:"author-list"},t._l(t.favoriteColumnist,function(s,i){return e("div",{key:i,staticClass:"author-item"},[e("router-link",{staticClass:"item-avatar",attrs:{to:"/columnist/"+s.author_id,tag:"div"}},[e("img",{attrs:{src:s.avatar}})]),t._v(" "),e("router-link",{staticClass:"item-text",attrs:{to:"/columnist/"+s.author_id,tag:"div"}},[e("h1",{staticClass:"name"},[t._v(t._s(s.nickname))]),t._v(" "),e("p",{staticClass:"info"},[t._v(t._s(s.description))])]),t._v(" "),e("div",{staticClass:"item-icon",on:{click:function(e){t.showConfirm(s)}}},[e("i",{staticClass:"icon-like"})])],1)}))]):t._e(),t._v(" "),e("confirm",{ref:"confirm",attrs:{text:t.confirmText},on:{confirm:t.deleteFavorite}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noResult,expression:"noResult"}],staticClass:"no-result-wrapper"},[e("i",{staticClass:"icon-no_result"}),t._v(" "),e("p",[t._v(t._s(t.noResultDesc))])])],1)},staticRenderFns:[]};var d=e("D8HT")(h,v,!1,function(t){e("fTl4")},null,null);s.default=d.exports},fTl4:function(t,s){}});
//# sourceMappingURL=4.ca92ce2997a3da2bb4b7.js.map
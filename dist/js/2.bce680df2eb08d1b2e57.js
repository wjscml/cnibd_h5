webpackJsonp([2],{"9BuW":function(e,n){},XSJt:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("vj8B"),o=t.n(i),a=t("/gb8"),r={data:function(){return{newsDetails:[]}},created:function(){this.httpGet()},mounted:function(){},methods:{httpGet:function(){var e=this;Object(a.a)("/detail-share?article_id="+this.$route.params.id+"&share_url="+window.location.href.split("#")[0]).then(function(n){console.log(window.location.href.split("#")[0]),0===n.data.errorCode&&(e.newsDetails=n.data.data,console.log(e.newsDetails.signPackage),e.wxInit(e.newsDetails.signPackage))})},wxInit:function(e){var n=encodeURIComponent("http://192.168.31.160:8080/#/site/"+this.$route.params.id),t=this.newsDetails.title,i=this.newsDetails.summary,a=this.newsDetails.thumb;o.a.config({debug:!0,appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),o.a.ready(function(){o.a.onMenuShareTimeline({title:t,desc:i,link:n,imgUrl:a,success:function(){alert("分享到朋友圈成功")},cancel:function(){alert("分享失败,您取消了分享!")}}),o.a.onMenuShareAppMessage({title:t,desc:i,link:n,imgUrl:a,success:function(){alert("成功分享给朋友")},cancel:function(){alert("分享失败,您取消了分享!")}}),o.a.onMenuShareQQ({title:t,desc:i,link:n,imgUrl:a,success:function(){alert("成功分享给QQ")},cancel:function(){alert("分享失败,您取消了分享!")}}),o.a.onMenuShareWeibo({title:t,desc:i,link:n,imgUrl:a,success:function(){alert("成功分享给朋友")},cancel:function(){alert("分享失败,您取消了分享!")}}),o.a.onMenuShareQZone({title:t,desc:i,link:n,imgUrl:a,success:function(){alert("成功分享给朋友")},cancel:function(){alert("分享失败,您取消了分享!")}})}),o.a.error(function(e){alert("error")})}}},s={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.newsDetails.title,expression:"newsDetails.title"}],staticClass:"article"},[t("div",{staticClass:"article-header"},[t("h1",{staticClass:"article-title"},[e._v(e._s(e.newsDetails.title))]),e._v(" "),t("div",{staticClass:"article-info"},[t("div",{staticClass:"author"},[t("span",{staticClass:"avatar"},[t("img",{attrs:{src:e.newsDetails.author_avatar,alt:"avatar"}})]),e._v(" "),t("span",{staticClass:"name"},[e._v(e._s(e.newsDetails.author_name))])]),e._v(" "),t("div",{staticClass:"time"},[e._v(e._s(e.newsDetails.publish_time))])])]),e._v(" "),t("div",{staticClass:"article-content",domProps:{innerHTML:e._s(e.newsDetails.content)}})])},staticRenderFns:[]};var c=t("D8HT")(r,s,!1,function(e){t("9BuW")},null,null);n.default=c.exports},vj8B:function(e,n){var t;t=window,e.exports=function(e,n){function t(n,t,i){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(t),function(e){r(n,e,i)}):c(n,i)}function i(n,t,i){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){i&&i.trigger&&i.trigger(e),r(n,e,t)}):c(n,i||t)}function o(e){return(e=e||{}).appId=P.appId,e.verifyAppId=P.appId,e.verifySignType="sha1",e.verifyTimestamp=P.timestamp+"",e.verifyNonceStr=P.nonceStr,e.verifySignature=P.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function r(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var i=n.errMsg;i||(i=n.err_msg,delete n.err_msg,i=function(e,n){var t=e,i=f[t];i&&(t=i);var o="ok";if(n){var a=n.indexOf(":");"confirm"==(o=n.substring(a+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==t&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=t+":"+o}(e,i),n.errMsg=i),(t=t||{})._complete&&(t._complete(n),delete t._complete),i=n.errMsg||"",P.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var o=i.indexOf(":");switch(i.substring(o+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function s(e){if(e){for(var n=0,t=e.length;n<t;++n){var i=e[n],o=p[i];o&&(e[n]=o)}return e}}function c(e,n){if(!(!P.debug||n&&n.isInnerInvoke)){var t=f[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function d(){return(new Date).getTime()}function l(n){I&&(e.WeixinJSBridge?"preInject"===m.__wxjsjs__isPreInject?m.addEventListener&&m.addEventListener("WeixinJSBridgeReady",n,!1):n():m.addEventListener&&m.addEventListener("WeixinJSBridgeReady",n,!1))}function u(){B.invoke||(B.invoke=function(n,t,i){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(t),i)},B.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var p={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},f=function(){var e={};for(var n in p)e[p[n]]=n;return e}(),m=e.document,g=m.title,h=navigator.userAgent.toLowerCase(),v=navigator.platform.toLowerCase(),S=!(!v.match("mac")&&!v.match("win")),_=-1!=h.indexOf("wxdebugger"),I=-1!=h.indexOf("micromessenger"),w=-1!=h.indexOf("android"),y=-1!=h.indexOf("iphone")||-1!=h.indexOf("ipad"),k=function(){var e=h.match(/micromessenger\/(\d+\.\d+\.\d+)/)||h.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),T={initStartTime:d(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},M={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:y?1:w?2:-1,clientVersion:k,url:encodeURIComponent(location.href)},P={},C={_completes:[]},x={state:0,data:{}};l(function(){T.initEndTime=d()});var A=!1,V=[],B={config:function(e){P=e,c("config",e);var n=!1!==P.check;l(function(){if(n)t(p.config,{verifyJsApiList:s(P.jsApiList)},function(){C._complete=function(e){T.preVerifyEndTime=d(),x.state=1,x.data=e},C.success=function(e){M.isPreVerifyOk=0},C.fail=function(e){C._fail?C._fail(e):x.state=-1};var e=C._completes;return e.push(function(){!function(e){if(!(S||_||P.debug||k<"6.0.2"||M.systemType<0)){var n=new Image;M.appId=P.appId,M.initTime=T.initEndTime-T.initStartTime,M.preVerifyTime=T.preVerifyEndTime-T.preVerifyStartTime,B.getNetworkType({isInnerInvoke:!0,success:function(e){M.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+M.version+"&o="+M.isPreVerifyOk+"&s="+M.systemType+"&c="+M.clientVersion+"&a="+M.appId+"&n="+M.networkType+"&i="+M.initTime+"&p="+M.preVerifyTime+"&u="+M.url;n.src=t}})}}()}),C.complete=function(n){for(var t=0,i=e.length;t<i;++t)e[t]();C._completes=[]},C}()),T.preVerifyStartTime=d();else{x.state=1;for(var e=C._completes,i=0,o=e.length;i<o;++i)e[i]();C._completes=[]}}),u()},ready:function(e){0!=x.state?e():(C._completes.push(e),!I&&P.debug&&e())},error:function(e){k<"6.0.2"||(-1==x.state?e(x.data):C._fail=e)},checkJsApi:function(e){t("checkJsApi",{jsApiList:s(e.jsApiList)},(e._complete=function(e){if(w){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var t in n){var i=f[t];i&&(n[i]=n[t],delete n[t])}return e}(e)},e))},onMenuShareTimeline:function(e){i(p.onMenuShareTimeline,{complete:function(){t("shareTimeline",{title:e.title||g,desc:e.title||g,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){i(p.onMenuShareAppMessage,{complete:function(){t("sendAppMessage",{title:e.title||g,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){i(p.onMenuShareQQ,{complete:function(){t("shareQQ",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){i(p.onMenuShareWeibo,{complete:function(){t("shareWeiboApp",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){i(p.onMenuShareQZone,{complete:function(){t("shareQZone",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){t("startRecord",{},e)},stopRecord:function(e){t("stopRecord",{},e)},onVoiceRecordEnd:function(e){i("onVoiceRecordEnd",e)},playVoice:function(e){t("playVoice",{localId:e.localId},e)},pauseVoice:function(e){t("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){t("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){i("onVoicePlayEnd",e)},uploadVoice:function(e){t("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){t("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){t("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){t("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(w){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e))},getLocation:function(e){},previewImage:function(e){t(p.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){t("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){t("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===A?(A=!0,t("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(A=!1,V.length>0){var n=V.shift();B.getLocalImgData(n)}},e))):V.push(e)},getNetworkType:function(e){t("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var i=n.indexOf(":"),o=n.substring(i+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){t("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},t(p.getLocation,{type:e.type||"wgs84"},(e._complete=function(e){delete e.type},e))},hideOptionMenu:function(e){t("hideOptionMenu",{},e)},showOptionMenu:function(e){t("showOptionMenu",{},e)},closeWindow:function(e){t("closeWindow",{},e=e||{})},hideMenuItems:function(e){t("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){t("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){t("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){t("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){t("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(y){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e))},openAddress:function(e){t(p.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))},openProductSpecificView:function(e){t(p.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,i=[],o=0,a=n.length;o<a;++o){var r=n[o],s={card_id:r.cardId,card_ext:r.cardExt};i.push(s)}t(p.addCard,{card_list:i},(e._complete=function(e){var n=e.card_list;if(n){for(var t=0,i=(n=JSON.parse(n)).length;t<i;++t){var o=n[t];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e))},chooseCard:function(e){t("chooseCard",{app_id:P.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))},openCard:function(e){for(var n=e.cardList,i=[],o=0,a=n.length;o<a;++o){var r=n[o],s={card_id:r.cardId,code:r.code};i.push(s)}t(p.openCard,{card_list:i},e)},consumeAndShareCard:function(e){t(p.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){t(p.chooseWXPay,a(e),e)},openEnterpriseRedPacket:function(e){t(p.openEnterpriseRedPacket,a(e),e)},startSearchBeacons:function(e){t(p.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){t(p.stopSearchBeacons,{},e)},onSearchBeacons:function(e){i(p.onSearchBeacons,e)},openEnterpriseChat:function(e){t("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)},launchMiniProgram:function(e){t("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&e.length>0){var n=e.split("?")[0],t=e.split("?")[1];return n+=".html",void 0!==t?n+"?"+t:n}}(e.path),envVersion:e.envVersion},e)},miniProgram:{navigateBack:function(e){e=e||{},l(function(){t("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){l(function(){t("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){l(function(){t("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){l(function(){t("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){l(function(){t("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){l(function(){t("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(n){l(function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})})}}},L=1,b={};return m.addEventListener("error",function(e){if(!w){var n=e.target,t=n.tagName,i=n.src;if(("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t)&&-1!=i.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=L++,n["wx-id"]=o),b[o])return;b[o]=!0,B.ready(function(){B.getLocalImgData({localId:i,success:function(e){n.src=e.localData}})})}}},!0),m.addEventListener("load",function(e){if(!w){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var i=n["wx-id"];i&&(b[i]=!1)}}},!0),n&&(e.wx=e.jWeixin=B),B}}(t)}});
//# sourceMappingURL=2.bce680df2eb08d1b2e57.js.map
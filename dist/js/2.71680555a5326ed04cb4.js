webpackJsonp([2],{XSJt:function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=i("vj8B"),o=i.n(t),a=i("/gb8"),r={data:function(){return{newsDetails:[]}},created:function(){},mounted:function(){this.httpGet()},methods:{httpGet:function(){var e=this;Object(a.a)("/detail-share?article_id="+this.$route.params.id+"&share_url="+window.location.href).then(function(n){console.log(window.location.pathname),0===n.data.errorCode&&(e.newsDetails=n.data.data,console.log(e.newsDetails),o.a.config({debug:!1,appId:e.newsDetails.signPackage.appId,timestamp:e.newsDetails.signPackage.timestamp,nonceStr:e.newsDetails.signPackage.nonceStr,signature:e.newsDetails.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),e.wxInit(e.newsDetails))})},wxInit:function(e){var n=""+location.origin+location.pathname;console.log(n);var i=e.title,t=e.summary,a=e.thumb;o.a.ready(function(){o.a.onMenuShareTimeline({title:i,desc:t,link:n,imgUrl:a,success:function(){},cancel:function(){}}),o.a.onMenuShareAppMessage({title:i,desc:t,link:n,imgUrl:a,success:function(){},cancel:function(){}}),o.a.onMenuShareQQ({title:i,desc:t,link:n,imgUrl:a,success:function(){},cancel:function(){}}),o.a.onMenuShareWeibo({title:i,desc:t,link:n,imgUrl:a,success:function(){},cancel:function(){}}),o.a.onMenuShareQZone({title:i,desc:t,link:n,imgUrl:a,success:function(){},cancel:function(){}})}),o.a.error(function(e){})}},beforeRouteEnter:function(e,n,i){!!navigator.userAgent.match(/\(i[^;] + ;( U;) ? CPU. + Mac OS X/)&&e.path!==location.pathname?location.assign(e.fullPath):i()}},c={render:function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:e.newsDetails.title,expression:"newsDetails.title"}],staticClass:"article"},[i("div",{staticClass:"article-header"},[i("h1",{staticClass:"article-title"},[e._v(e._s(e.newsDetails.title))]),e._v(" "),i("div",{staticClass:"article-info"},[i("div",{staticClass:"author"},[i("span",{staticClass:"avatar"},[i("img",{attrs:{src:e.newsDetails.author_avatar,alt:"avatar"}})]),e._v(" "),i("span",{staticClass:"name"},[e._v(e._s(e.newsDetails.author_name))])]),e._v(" "),i("div",{staticClass:"time"},[e._v(e._s(e.newsDetails.publish_time))])])]),e._v(" "),i("div",{staticClass:"article-content",domProps:{innerHTML:e._s(e.newsDetails.content)}})])},staticRenderFns:[]};var s=i("D8HT")(r,c,!1,function(e){i("Xkbu")},null,null);n.default=s.exports},Xkbu:function(e,n){},vj8B:function(e,n){var i;i=window,e.exports=function(e,n){function i(n,i,t){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(i),function(e){r(n,e,t)}):s(n,t)}function t(n,i,t){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){t&&t.trigger&&t.trigger(e),r(n,e,i)}):s(n,t||i)}function o(e){return(e=e||{}).appId=P.appId,e.verifyAppId=P.appId,e.verifySignType="sha1",e.verifyTimestamp=P.timestamp+"",e.verifyNonceStr=P.nonceStr,e.verifySignature=P.signature,e}function a(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function r(e,n,i){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var t=n.errMsg;t||(t=n.err_msg,delete n.err_msg,t=function(e,n){var i=e,t=f[i];t&&(i=t);var o="ok";if(n){var a=n.indexOf(":");"confirm"==(o=n.substring(a+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==i&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=i+":"+o}(e,t),n.errMsg=t),(i=i||{})._complete&&(i._complete(n),delete i._complete),t=n.errMsg||"",P.debug&&!i.isInnerInvoke&&alert(JSON.stringify(n));var o=t.indexOf(":");switch(t.substring(o+1)){case"ok":i.success&&i.success(n);break;case"cancel":i.cancel&&i.cancel(n);break;default:i.fail&&i.fail(n)}i.complete&&i.complete(n)}function c(e){if(e){for(var n=0,i=e.length;n<i;++n){var t=e[n],o=p[t];o&&(e[n]=o)}return e}}function s(e,n){if(!(!P.debug||n&&n.isInnerInvoke)){var i=f[e];i&&(e=i),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function d(){return(new Date).getTime()}function l(n){w&&(e.WeixinJSBridge?"preInject"===m.__wxjsjs__isPreInject?m.addEventListener&&m.addEventListener("WeixinJSBridgeReady",n,!1):n():m.addEventListener&&m.addEventListener("WeixinJSBridgeReady",n,!1))}function u(){b.invoke||(b.invoke=function(n,i,t){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(i),t)},b.on=function(n,i){e.WeixinJSBridge&&WeixinJSBridge.on(n,i)})}if(!e.jWeixin){var p={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},f=function(){var e={};for(var n in p)e[p[n]]=n;return e}(),m=e.document,g=m.title,h=navigator.userAgent.toLowerCase(),v=navigator.platform.toLowerCase(),S=!(!v.match("mac")&&!v.match("win")),_=-1!=h.indexOf("wxdebugger"),w=-1!=h.indexOf("micromessenger"),I=-1!=h.indexOf("android"),y=-1!=h.indexOf("iphone")||-1!=h.indexOf("ipad"),k=function(){var e=h.match(/micromessenger\/(\d+\.\d+\.\d+)/)||h.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),T={initStartTime:d(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},M={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:y?1:I?2:-1,clientVersion:k,url:encodeURIComponent(location.href)},P={},C={_completes:[]},x={state:0,data:{}};l(function(){T.initEndTime=d()});var A=!1,V=[],b={config:function(e){P=e,s("config",e);var n=!1!==P.check;l(function(){if(n)i(p.config,{verifyJsApiList:c(P.jsApiList)},function(){C._complete=function(e){T.preVerifyEndTime=d(),x.state=1,x.data=e},C.success=function(e){M.isPreVerifyOk=0},C.fail=function(e){C._fail?C._fail(e):x.state=-1};var e=C._completes;return e.push(function(){!function(e){if(!(S||_||P.debug||k<"6.0.2"||M.systemType<0)){var n=new Image;M.appId=P.appId,M.initTime=T.initEndTime-T.initStartTime,M.preVerifyTime=T.preVerifyEndTime-T.preVerifyStartTime,b.getNetworkType({isInnerInvoke:!0,success:function(e){M.networkType=e.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+M.version+"&o="+M.isPreVerifyOk+"&s="+M.systemType+"&c="+M.clientVersion+"&a="+M.appId+"&n="+M.networkType+"&i="+M.initTime+"&p="+M.preVerifyTime+"&u="+M.url;n.src=i}})}}()}),C.complete=function(n){for(var i=0,t=e.length;i<t;++i)e[i]();C._completes=[]},C}()),T.preVerifyStartTime=d();else{x.state=1;for(var e=C._completes,t=0,o=e.length;t<o;++t)e[t]();C._completes=[]}}),u()},ready:function(e){0!=x.state?e():(C._completes.push(e),!w&&P.debug&&e())},error:function(e){k<"6.0.2"||(-1==x.state?e(x.data):C._fail=e)},checkJsApi:function(e){i("checkJsApi",{jsApiList:c(e.jsApiList)},(e._complete=function(e){if(I){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var i in n){var t=f[i];t&&(n[t]=n[i],delete n[i])}return e}(e)},e))},onMenuShareTimeline:function(e){t(p.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||g,desc:e.title||g,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){t(p.onMenuShareAppMessage,{complete:function(){i("sendAppMessage",{title:e.title||g,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){t(p.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){t(p.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){t(p.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||g,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){t("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){t("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(I){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e))},getLocation:function(e){},previewImage:function(e){i(p.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===A?(A=!0,i("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(A=!1,V.length>0){var n=V.shift();b.getLocalImgData(n)}},e))):V.push(e)},getNetworkType:function(e){i("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var t=n.indexOf(":"),o=n.substring(t+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},i(p.getLocation,{type:e.type||"wgs84"},(e._complete=function(e){delete e.type},e))},hideOptionMenu:function(e){i("hideOptionMenu",{},e)},showOptionMenu:function(e){i("showOptionMenu",{},e)},closeWindow:function(e){i("closeWindow",{},e=e||{})},hideMenuItems:function(e){i("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){i("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){i("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){i("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){i("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(y){var n=e.resultStr;if(n){var i=JSON.parse(n);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))},openAddress:function(e){i(p.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))},openProductSpecificView:function(e){i(p.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,t=[],o=0,a=n.length;o<a;++o){var r=n[o],c={card_id:r.cardId,card_ext:r.cardExt};t.push(c)}i(p.addCard,{card_list:t},(e._complete=function(e){var n=e.card_list;if(n){for(var i=0,t=(n=JSON.parse(n)).length;i<t;++i){var o=n[i];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e))},chooseCard:function(e){i("chooseCard",{app_id:P.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))},openCard:function(e){for(var n=e.cardList,t=[],o=0,a=n.length;o<a;++o){var r=n[o],c={card_id:r.cardId,code:r.code};t.push(c)}i(p.openCard,{card_list:t},e)},consumeAndShareCard:function(e){i(p.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){i(p.chooseWXPay,a(e),e)},openEnterpriseRedPacket:function(e){i(p.openEnterpriseRedPacket,a(e),e)},startSearchBeacons:function(e){i(p.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){i(p.stopSearchBeacons,{},e)},onSearchBeacons:function(e){t(p.onSearchBeacons,e)},openEnterpriseChat:function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)},launchMiniProgram:function(e){i("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&e.length>0){var n=e.split("?")[0],i=e.split("?")[1];return n+=".html",void 0!==i?n+"?"+i:n}}(e.path),envVersion:e.envVersion},e)},miniProgram:{navigateBack:function(e){e=e||{},l(function(){i("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){l(function(){i("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){l(function(){i("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){l(function(){i("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){l(function(){i("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){l(function(){i("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(n){l(function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})})}}},L=1,B={};return m.addEventListener("error",function(e){if(!I){var n=e.target,i=n.tagName,t=n.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=t.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=L++,n["wx-id"]=o),B[o])return;B[o]=!0,b.ready(function(){b.getLocalImgData({localId:t,success:function(e){n.src=e.localData}})})}}},!0),m.addEventListener("load",function(e){if(!I){var n=e.target,i=n.tagName;if(n.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var t=n["wx-id"];t&&(B[t]=!1)}}},!0),n&&(e.wx=e.jWeixin=b),b}}(i)}});
//# sourceMappingURL=2.71680555a5326ed04cb4.js.map
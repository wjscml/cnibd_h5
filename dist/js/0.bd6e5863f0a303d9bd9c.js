webpackJsonp([0],{"/gb8":function(e,n,t){"use strict";var r=t("hs4R"),o=t.n(r).a.create({baseURL:"https://www.cnibd.com/h5"});n.a=function(e){return o({url:e,methods:"get"})}},"1OXq":function(e,n,t){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},"412a":function(e,n,t){"use strict";var r=t("ENhz");e.exports=function(e,n,t,o,i){var a=new Error(e);return r(a,n,t,o,i)}},"5zv1":function(e,n,t){"use strict";var r=t("Vx8W");e.exports=function(e,n){r.forEach(e,function(t,r){r!==n&&r.toUpperCase()===n.toUpperCase()&&(e[n]=t,delete e[r])})}},"B+6K":function(e,n,t){"use strict";var r=t("1OXq");function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var n;this.promise=new Promise(function(e){n=e});var t=this;e(function(e){t.reason||(t.reason=new r(e),n(t.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(n){e=n}),cancel:e}},e.exports=o},BNTF:function(e,n,t){"use strict";e.exports=function(e,n){return function(){for(var t=new Array(arguments.length),r=0;r<t.length;r++)t[r]=arguments[r];return e.apply(n,t)}}},"Dlm/":function(e,n,t){"use strict";var r=t("412a");e.exports=function(e,n,t){var o=t.config.validateStatus;t.status&&o&&!o(t.status)?n(r("Request failed with status code "+t.status,t.config,null,t.request,t)):e(t)}},ENhz:function(e,n,t){"use strict";e.exports=function(e,n,t,r,o){return e.config=n,t&&(e.code=t),e.request=r,e.response=o,e}},FJlf:function(e,n,t){"use strict";var r=t("Vx8W"),o=t("Dlm/"),i=t("iqwc"),a=t("T5bh"),s=t("QJin"),c=t("412a"),u="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||t("xF2L");e.exports=function(e){return new Promise(function(n,f){var d=e.data,l=e.headers;r.isFormData(d)&&delete l["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(e.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var g=e.auth.username||"",v=e.auth.password||"";l.Authorization="Basic "+u(g+":"+v)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var t="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:t,config:e,request:p};o(n,f,r),p=null}},p.onerror=function(){f(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){f(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var w=t("G20X"),y=(e.withCredentials||s(e.url))&&e.xsrfCookieName?w.read(e.xsrfCookieName):void 0;y&&(l[e.xsrfHeaderName]=y)}if("setRequestHeader"in p&&r.forEach(l,function(e,n){void 0===d&&"content-type"===n.toLowerCase()?delete l[n]:p.setRequestHeader(n,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(n){if("json"!==e.responseType)throw n}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),f(e),p=null)}),void 0===d&&(d=null),p.send(d)})}},G20X:function(e,n,t){"use strict";var r=t("Vx8W");e.exports=r.isStandardBrowserEnv()?{write:function(e,n,t,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(n)),r.isNumber(t)&&s.push("expires="+new Date(t).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var n=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},Nkb9:function(e,n,t){"use strict";e.exports=function(e){return function(n){return e.apply(null,n)}}},PK49:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNTYxQjFCQTlDODcxMUU4QUIwRkYxMzAwNjY4QjJBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNTYxQjFCQjlDODcxMUU4QUIwRkYxMzAwNjY4QjJBMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY1NjFCMUI4OUM4NzExRThBQjBGRjEzMDA2NjhCMkEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY1NjFCMUI5OUM4NzExRThBQjBGRjEzMDA2NjhCMkEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bT7mxwAABEdJREFUeNrUWldoFUEUnWwSa1RMFFJQwYa9RYLGRvwwfvljwf6VIGJXFMuHH6IY82GJIEZBhBgjxID6E0WsaKwxFrAkCiIWsGCwYNdzyVm4bt6LZt/ue5sDB2b2vTdzz87cO3dmXlyPwnfGA6SC48HRYD+wJ9gVbM/PP4GvwSfgA7AKvAC+irTjuAgEJINzwFngKGmrmb//TSFl4CHQlSGWi9+kgdvBp+AuvvU4Ny8PzGYbT9lmmp8j0ApcA65VU8PGN77Nc2ANWAc+59Qx/H4G2BscBk6g8a0c7XwGt4IFbNMzAX3AUnCk4/lNsBgsdzEFZApOB/PBzBDtytSs9WIKTQFvOIy/BebyWbHL+Su/2cs2pK276rNM9jklUgF5YAXYkfUv4Ep2esp4B2lrBLiCfRj2WcERciVgIbgPjGe9lg4rzvbLeI8f4A72YU+deI7wwuYKkKErUvXr4Bg6qN+oYV/X1bOicNPJCuOwJerNS3SZyIUoWnjNPqvUSJTQtiYFJHJh6cB6HZV/NNHHR/Zdx3oH2pbYlIBldCbBV3AG+MbEDtL3NOXYYtuqcALSwY2qvo7hMta4Da5X9Q20tZGA1WASy/ccThxrFNEmQxtXOwUkM+bbWMOwFhT8oE16fUrRAmarty9hrNIED5UqjCfR5r8E2NjNVDdo+E3bbMyyBaQzn7ezynITXJQzOhranC4CclQ+LwtHfYAF1KvFTWzOEQFZ6gsXTPChbcwSAX0deXjQoW3sa3EDbuNxCxDwRJV7i4Au6sGLFiBA25hiqfhvPE7aOnMbWsEjFi+TPBtJCT6+qXl2rKaf5fiRkltORR5vTH6yPBA869FItFPlT5YjXU71ONzN8UFEht74WE6v9niEj/ggopeOmiLgkeM4wwRchLbxoQi4ph6M98mhvRQxVpWrLDZkZ59ypNEpwCI68cTCzk4vWlwYrvBha+5BTUBFTKWNgqtiu70fOKy+tMi4O22OhojFqlymNzSlaj0YDk72OR1wIyKXttmr8UEt4C24X315G5gQIBEWbbJxAHzvPJUoVKMwCFwShcTsf0UsB4ewLHcIBaGOVcSZN6n6FnBoAESI4Zsddj0PJUAgJ8/VLLfhHjQ5RiLOgAPAo7RFcMMxlRoJ+A7OBD+o1OKEaXylFA0RMo3vqPRG9sPzaWNYAQI5m5+rGsrm2+gaAxH2CflPGn8/lHeHwnGHE8vG/1KMfEKwgjaZ/xUg2AMuUA314Yq91Li7nnUrQq60ipra0DSFYi7fH5Rj76QzTYqCiP4MLMatAMExprDV6pmsiCdNwzVQno+R6p/XrG4uuuWsvq3jMzmSvAyeNw13CrLHeMWRE0eUG8cUTsPBjGoS609HqtDNfyXSKCQ/wvAqZ5zdIt3ou3HGl4wK3U3DldQV4+40W9LixFiMQLhRGWca/90mieLqmXw9Mw03LfKXm3Oh4npz8UeAAQCJPhDw5IL9IQAAAABJRU5ErkJggg=="},QJin:function(e,n,t){"use strict";var r=t("Vx8W");e.exports=r.isStandardBrowserEnv()?function(){var e,n=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");function o(e){var r=e;return n&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return e=o(window.location.href),function(n){var t=r.isString(n)?o(n):n;return t.protocol===e.protocol&&t.host===e.host}}():function(){return!0}},T5bh:function(e,n,t){"use strict";var r=t("Vx8W"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var n,t,i,a={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),n=r.trim(e.substr(0,i)).toLowerCase(),t=r.trim(e.substr(i+1)),n){if(a[n]&&o.indexOf(n)>=0)return;a[n]="set-cookie"===n?(a[n]?a[n]:[]).concat([t]):a[n]?a[n]+", "+t:t}}),a):a}},TgeX:function(e,n,t){"use strict";var r=t("xej/"),o=t("Vx8W"),i=t("pVhw"),a=t("sQpD");function s(e){this.defaults=e,this.interceptors={request:new i,response:new i}}s.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var n=[a,void 0],t=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){n.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){n.push(e.fulfilled,e.rejected)});n.length;)t=t.then(n.shift(),n.shift());return t},o.forEach(["delete","get","head","options"],function(e){s.prototype[e]=function(n,t){return this.request(o.merge(t||{},{method:e,url:n}))}}),o.forEach(["post","put","patch"],function(e){s.prototype[e]=function(n,t,r){return this.request(o.merge(r||{},{method:e,url:n,data:t}))}}),e.exports=s},Vx8W:function(e,n,t){"use strict";var r=t("BNTF"),o=t("lvVH"),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,n){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),a(e))for(var t=0,r=e.length;t<r;t++)n.call(null,e[t],t,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.call(null,e[o],o,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return s(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:u,merge:function e(){var n={};function t(t,r){"object"==typeof n[r]&&"object"==typeof t?n[r]=e(n[r],t):n[r]=t}for(var r=0,o=arguments.length;r<o;r++)u(arguments[r],t);return n},extend:function(e,n,t){return u(n,function(n,o){e[o]=t&&"function"==typeof n?r(n,t):n}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},"Wo/5":function(e,n){var t,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,u=[],f=!1,d=-1;function l(){f&&c&&(f=!1,c.length?u=c.concat(u):d=-1,u.length&&p())}function p(){if(!f){var e=s(l);f=!0;for(var n=u.length;n;){for(c=u,u=[];++d<n;)c&&c[d].run();d=-1,n=u.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function h(e,n){this.fun=e,this.array=n}function m(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];u.push(new h(e,n)),1!==u.length||f||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},Xu5J:function(e,n){},dyDs:function(e,n,t){"use strict";n.b=a,n.a=function(e){var n=encodeURIComponent(""+window.location.href);Object(i.a)("/sign?share_url="+n).then(function(n){0===n.data.errorCode&&(o.a.config({debug:!1,appId:n.data.data.signPackage.appId,timestamp:n.data.data.signPackage.timestamp,nonceStr:n.data.data.signPackage.nonceStr,signature:n.data.data.signPackage.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]}),console.log(n.data.data),a(e))})};var r=t("vj8B"),o=t.n(r),i=t("/gb8");function a(e){var n=""+window.location.href,t=e.title,r=e.summary,i=e.thumb;o.a.ready(function(){o.a.onMenuShareTimeline({title:t,desc:r,link:n,imgUrl:i,success:function(){},cancel:function(){}}),o.a.onMenuShareAppMessage({title:t,desc:r,link:n,imgUrl:i,success:function(){},cancel:function(){}}),o.a.onMenuShareQQ({title:t,desc:r,link:n,imgUrl:i,success:function(){},cancel:function(){}}),o.a.onMenuShareWeibo({title:t,desc:r,link:n,imgUrl:i,success:function(){},cancel:function(){}}),o.a.onMenuShareQZone({title:t,desc:r,link:n,imgUrl:i,success:function(){},cancel:function(){}})}),o.a.error(function(e){})}},hs4R:function(e,n,t){e.exports=t("k7jl")},iqwc:function(e,n,t){"use strict";var r=t("Vx8W");function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,n,t){if(!n)return e;var i;if(t)i=t(n);else if(r.isURLSearchParams(n))i=n.toString();else{var a=[];r.forEach(n,function(e,n){null!==e&&void 0!==e&&(r.isArray(e)?n+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(n)+"="+o(e))}))}),i=a.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},k7jl:function(e,n,t){"use strict";var r=t("Vx8W"),o=t("BNTF"),i=t("TgeX"),a=t("xej/");function s(e){var n=new i(e),t=o(i.prototype.request,n);return r.extend(t,i.prototype,n),r.extend(t,n),t}var c=s(a);c.Axios=i,c.create=function(e){return s(r.merge(a,e))},c.Cancel=t("1OXq"),c.CancelToken=t("B+6K"),c.isCancel=t("m5+X"),c.all=function(e){return Promise.all(e)},c.spread=t("Nkb9"),e.exports=c,e.exports.default=c},lvVH:function(e,n){function t(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(t(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&t(e.slice(0,0))}(e)||!!e._isBuffer)}},"m5+X":function(e,n,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},nPnO:function(e,n,t){"use strict";var r=t("Vx8W");e.exports=function(e,n,t){return r.forEach(t,function(t){e=t(e,n)}),e}},pVhw:function(e,n,t){"use strict";var r=t("Vx8W");function o(){this.handlers=[]}o.prototype.use=function(e,n){return this.handlers.push({fulfilled:e,rejected:n}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(n){null!==n&&e(n)})},e.exports=o},sQpD:function(e,n,t){"use strict";var r=t("Vx8W"),o=t("nPnO"),i=t("m5+X"),a=t("xej/"),s=t("xmQe"),c=t("t+l6");function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!s(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]}),(e.adapter||a.adapter)(e).then(function(n){return u(e),n.data=o(n.data,n.headers,e.transformResponse),n},function(n){return i(n)||(u(e),n&&n.response&&(n.response.data=o(n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})}},"t+l6":function(e,n,t){"use strict";e.exports=function(e,n){return n?e.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):e}},tL1G:function(e,n,t){"use strict";var r={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"bottom-tip"},[n("img",{directives:[{name:"show",rawName:"v-show",value:this.isLoad,expression:"isLoad"}],staticClass:"image",attrs:{src:t("PK49")}}),this._v(" "),n("span",{staticClass:"loading-hook"},[this._v(this._s(this.tips))])])},staticRenderFns:[]};var o=t("D8HT")({props:{isLoad:null,tips:""}},r,!1,function(e){t("Xu5J")},null,null);n.a=o.exports},vj8B:function(e,n){var t;t=window,e.exports=function(e,n){function t(n,t,r){e.WeixinJSBridge?WeixinJSBridge.invoke(n,o(t),function(e){a(n,e,r)}):c(n,r)}function r(n,t,r){e.WeixinJSBridge?WeixinJSBridge.on(n,function(e){r&&r.trigger&&r.trigger(e),a(n,e,t)}):c(n,r||t)}function o(e){return(e=e||{}).appId=k.appId,e.verifyAppId=k.appId,e.verifySignType="sha1",e.verifyTimestamp=k.timestamp+"",e.verifyNonceStr=k.nonceStr,e.verifySignature=k.signature,e}function i(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function a(e,n,t){"openEnterpriseChat"==e&&(n.errCode=n.err_code),delete n.err_code,delete n.err_desc,delete n.err_detail;var r=n.errMsg;r||(r=n.err_msg,delete n.err_msg,r=function(e,n){var t=e,r=p[t];r&&(t=r);var o="ok";if(n){var i=n.indexOf(":");"confirm"==(o=n.substring(i+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==t&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return n=t+":"+o}(e,r),n.errMsg=r),(t=t||{})._complete&&(t._complete(n),delete t._complete),r=n.errMsg||"",k.debug&&!t.isInnerInvoke&&alert(JSON.stringify(n));var o=r.indexOf(":");switch(r.substring(o+1)){case"ok":t.success&&t.success(n);break;case"cancel":t.cancel&&t.cancel(n);break;default:t.fail&&t.fail(n)}t.complete&&t.complete(n)}function s(e){if(e){for(var n=0,t=e.length;n<t;++n){var r=e[n],o=l[r];o&&(e[n]=o)}return e}}function c(e,n){if(!(!k.debug||n&&n.isInnerInvoke)){var t=p[e];t&&(e=t),n&&n._complete&&delete n._complete,console.log('"'+e+'",',n||"")}}function u(){return(new Date).getTime()}function f(n){S&&(e.WeixinJSBridge?"preInject"===h.__wxjsjs__isPreInject?h.addEventListener&&h.addEventListener("WeixinJSBridgeReady",n,!1):n():h.addEventListener&&h.addEventListener("WeixinJSBridgeReady",n,!1))}function d(){C.invoke||(C.invoke=function(n,t,r){e.WeixinJSBridge&&WeixinJSBridge.invoke(n,o(t),r)},C.on=function(n,t){e.WeixinJSBridge&&WeixinJSBridge.on(n,t)})}if(!e.jWeixin){var l={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},p=function(){var e={};for(var n in l)e[l[n]]=n;return e}(),h=e.document,m=h.title,g=navigator.userAgent.toLowerCase(),v=navigator.platform.toLowerCase(),w=!(!v.match("mac")&&!v.match("win")),y=-1!=g.indexOf("wxdebugger"),S=-1!=g.indexOf("micromessenger"),A=-1!=g.indexOf("android"),I=-1!=g.indexOf("iphone")||-1!=g.indexOf("ipad"),x=function(){var e=g.match(/micromessenger\/(\d+\.\d+\.\d+)/)||g.match(/micromessenger\/(\d+\.\d+)/);return e?e[1]:""}(),T={initStartTime:u(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},b={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:I?1:A?2:-1,clientVersion:x,url:encodeURIComponent(location.href)},k={},E={_completes:[]},M={state:0,data:{}};f(function(){T.initEndTime=u()});var R=!1,B=[],C={config:function(e){k=e,c("config",e);var n=!1!==k.check;f(function(){if(n)t(l.config,{verifyJsApiList:s(k.jsApiList)},function(){E._complete=function(e){T.preVerifyEndTime=u(),M.state=1,M.data=e},E.success=function(e){b.isPreVerifyOk=0},E.fail=function(e){E._fail?E._fail(e):M.state=-1};var e=E._completes;return e.push(function(){!function(e){if(!(w||y||k.debug||x<"6.0.2"||b.systemType<0)){var n=new Image;b.appId=k.appId,b.initTime=T.initEndTime-T.initStartTime,b.preVerifyTime=T.preVerifyEndTime-T.preVerifyStartTime,C.getNetworkType({isInnerInvoke:!0,success:function(e){b.networkType=e.networkType;var t="https://open.weixin.qq.com/sdk/report?v="+b.version+"&o="+b.isPreVerifyOk+"&s="+b.systemType+"&c="+b.clientVersion+"&a="+b.appId+"&n="+b.networkType+"&i="+b.initTime+"&p="+b.preVerifyTime+"&u="+b.url;n.src=t}})}}()}),E.complete=function(n){for(var t=0,r=e.length;t<r;++t)e[t]();E._completes=[]},E}()),T.preVerifyStartTime=u();else{M.state=1;for(var e=E._completes,r=0,o=e.length;r<o;++r)e[r]();E._completes=[]}}),d()},ready:function(e){0!=M.state?e():(E._completes.push(e),!S&&k.debug&&e())},error:function(e){x<"6.0.2"||(-1==M.state?e(M.data):E._fail=e)},checkJsApi:function(e){t("checkJsApi",{jsApiList:s(e.jsApiList)},(e._complete=function(e){if(A){var n=e.checkResult;n&&(e.checkResult=JSON.parse(n))}e=function(e){var n=e.checkResult;for(var t in n){var r=p[t];r&&(n[r]=n[t],delete n[t])}return e}(e)},e))},onMenuShareTimeline:function(e){r(l.onMenuShareTimeline,{complete:function(){t("shareTimeline",{title:e.title||m,desc:e.title||m,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){r(l.onMenuShareAppMessage,{complete:function(){t("sendAppMessage",{title:e.title||m,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){r(l.onMenuShareQQ,{complete:function(){t("shareQQ",{title:e.title||m,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){r(l.onMenuShareWeibo,{complete:function(){t("shareWeiboApp",{title:e.title||m,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){r(l.onMenuShareQZone,{complete:function(){t("shareQZone",{title:e.title||m,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},startRecord:function(e){t("startRecord",{},e)},stopRecord:function(e){t("stopRecord",{},e)},onVoiceRecordEnd:function(e){r("onVoiceRecordEnd",e)},playVoice:function(e){t("playVoice",{localId:e.localId},e)},pauseVoice:function(e){t("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){t("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){r("onVoicePlayEnd",e)},uploadVoice:function(e){t("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){t("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){t("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){t("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(A){var n=e.localIds;n&&(e.localIds=JSON.parse(n))}},e))},getLocation:function(e){},previewImage:function(e){t(l.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){t("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){t("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===R?(R=!0,t("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(R=!1,B.length>0){var n=B.shift();C.getLocalImgData(n)}},e))):B.push(e)},getNetworkType:function(e){t("getNetworkType",{},(e._complete=function(e){e=function(e){var n=e.errMsg;e.errMsg="getNetworkType:ok";var t=e.subtype;if(delete e.subtype,t)e.networkType=t;else{var r=n.indexOf(":"),o=n.substring(r+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){t("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){e=e||{},t(l.getLocation,{type:e.type||"wgs84"},(e._complete=function(e){delete e.type},e))},hideOptionMenu:function(e){t("hideOptionMenu",{},e)},showOptionMenu:function(e){t("showOptionMenu",{},e)},closeWindow:function(e){t("closeWindow",{},e=e||{})},hideMenuItems:function(e){t("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){t("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){t("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){t("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){t("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(I){var n=e.resultStr;if(n){var t=JSON.parse(n);e.resultStr=t&&t.scan_code&&t.scan_code.scan_result}}},e))},openAddress:function(e){t(l.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))},openProductSpecificView:function(e){t(l.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var n=e.cardList,r=[],o=0,i=n.length;o<i;++o){var a=n[o],s={card_id:a.cardId,card_ext:a.cardExt};r.push(s)}t(l.addCard,{card_list:r},(e._complete=function(e){var n=e.card_list;if(n){for(var t=0,r=(n=JSON.parse(n)).length;t<r;++t){var o=n[t];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=n,delete e.card_list}},e))},chooseCard:function(e){t("chooseCard",{app_id:k.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))},openCard:function(e){for(var n=e.cardList,r=[],o=0,i=n.length;o<i;++o){var a=n[o],s={card_id:a.cardId,code:a.code};r.push(s)}t(l.openCard,{card_list:r},e)},consumeAndShareCard:function(e){t(l.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){t(l.chooseWXPay,i(e),e)},openEnterpriseRedPacket:function(e){t(l.openEnterpriseRedPacket,i(e),e)},startSearchBeacons:function(e){t(l.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){t(l.stopSearchBeacons,{},e)},onSearchBeacons:function(e){r(l.onSearchBeacons,e)},openEnterpriseChat:function(e){t("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)},launchMiniProgram:function(e){t("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&e.length>0){var n=e.split("?")[0],t=e.split("?")[1];return n+=".html",void 0!==t?n+"?"+t:n}}(e.path),envVersion:e.envVersion},e)},miniProgram:{navigateBack:function(e){e=e||{},f(function(){t("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){f(function(){t("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){f(function(){t("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){f(function(){t("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){f(function(){t("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){f(function(){t("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(n){f(function(){n({miniprogram:"miniprogram"===e.__wxjs_environment})})}}},N=1,L={};return h.addEventListener("error",function(e){if(!A){var n=e.target,t=n.tagName,r=n.src;if(("IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t)&&-1!=r.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=n["wx-id"];if(o||(o=N++,n["wx-id"]=o),L[o])return;L[o]=!0,C.ready(function(){C.getLocalImgData({localId:r,success:function(e){n.src=e.localData}})})}}},!0),h.addEventListener("load",function(e){if(!A){var n=e.target,t=n.tagName;if(n.src,"IMG"==t||"VIDEO"==t||"AUDIO"==t||"SOURCE"==t){var r=n["wx-id"];r&&(L[r]=!1)}}},!0),n&&(e.wx=e.jWeixin=C),C}}(t)},xF2L:function(e,n,t){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var n,t,i=String(e),a="",s=0,c=r;i.charAt(0|s)||(c="=",s%1);a+=c.charAt(63&n>>8-s%1*8)){if((t=i.charCodeAt(s+=.75))>255)throw new o;n=n<<8|t}return a}},"xej/":function(e,n,t){"use strict";(function(n){var r=t("Vx8W"),o=t("5zv1"),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,n){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=n)}var s,c={adapter:("undefined"!=typeof XMLHttpRequest?s=t("FJlf"):void 0!==n&&(s=t("FJlf")),s),transformRequest:[function(e,n){return o(n,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(n,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(n,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){c.headers[e]={}}),r.forEach(["post","put","patch"],function(e){c.headers[e]=r.merge(i)}),e.exports=c}).call(n,t("Wo/5"))},xmQe:function(e,n,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}}});
//# sourceMappingURL=0.bd6e5863f0a303d9bd9c.js.map
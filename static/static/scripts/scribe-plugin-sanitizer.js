!function(e,n){"function"==typeof define&&define.amd?define("html-janitor",n):"object"==typeof exports?module.exports=n():e.HTMLJanitor=n()}(this,function(){function e(e){var n=e.tags,t=Object.keys(n),r=t.map(function(e){return typeof n[e]}).every(function(e){return"object"===e||"boolean"===e||"function"===e});if(!r)throw new Error("The configuration was invalid");this.config=e}function n(e){return-1!==c.indexOf(e.nodeName)}function t(e){return-1!==u.indexOf(e.nodeName)}function r(e){return document.createTreeWalker(e,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT,null,!1)}function o(e,n,t){return"function"==typeof e.tags[n]?e.tags[n](t):e.tags[n]}function i(e,n){return"undefined"==typeof n?!0:"boolean"==typeof n?!n:!1}function a(e,n,t){var r=e.name.toLowerCase();return n===!0?!1:"function"==typeof n[r]?!n[r](e.value,t):"undefined"==typeof n[r]?!0:n[r]===!1?!0:"string"==typeof n[r]?n[r]!==e.value:!1}var c=["P","LI","TD","TH","DIV","H1","H2","H3","H4","H5","H6","PRE"],u=["A","B","STRONG","I","EM","SUB","SUP","U","STRIKE"];return e.prototype.clean=function(e){var n=document.createElement("div");return n.innerHTML=e,this._sanitize(n),n.innerHTML},e.prototype._sanitize=function(e){var c=r(e),u=c.firstChild();if(u)do if(!u._sanitized)if(u.nodeType!==Node.TEXT_NODE){if(u.nodeType===Node.COMMENT_NODE){e.removeChild(u),this._sanitize(e);break}var l,f=t(u);f&&(l=Array.prototype.some.call(u.childNodes,n));var s=!!e.parentNode,d=n(e)&&n(u)&&s,b=u.nodeName.toLowerCase(),y=o(this.config,b,u),m=f&&l;if(m||i(u,y)||!this.config.keepNestedBlockElements&&d){if("SCRIPT"!==u.nodeName&&"STYLE"!==u.nodeName)for(;u.childNodes.length>0;)e.insertBefore(u.childNodes[0],u);e.removeChild(u),this._sanitize(e);break}for(var p=0;p<u.attributes.length;p+=1){var g=u.attributes[p];a(g,y,u)&&(u.removeAttribute(g.name),p-=1)}this._sanitize(u),u._sanitized=!0}else if(""===u.data.trim()&&(u.previousElementSibling&&n(u.previousElementSibling)||u.nextElementSibling&&n(u.nextElementSibling))){e.removeChild(u),this._sanitize(e);break}while(u=c.nextSibling())},e}),define("lodash-amd/modern/internal/arrayEach",[],function(){function e(e,n){for(var t=-1,r=e.length;++t<r&&n(e[t],t,e)!==!1;);return e}return e}),define("lodash-amd/modern/lang/isObject",[],function(){function e(e){var n=typeof e;return"function"==n||e&&"object"==n||!1}return e}),define("lodash-amd/modern/internal/toObject",["../lang/isObject"],function(e){function n(n){return e(n)?n:Object(n)}return n}),define("lodash-amd/modern/internal/baseFor",["./toObject"],function(e){function n(n,t,r){for(var o=-1,i=e(n),a=r(n),c=a.length;++o<c;){var u=a[o];if(t(i[u],u,i)===!1)break}return n}return n}),define("lodash-amd/modern/internal/isLength",[],function(){function e(e){return"number"==typeof e&&e>-1&&e%1==0&&n>=e}var n=Math.pow(2,53)-1;return e}),define("lodash-amd/modern/internal/baseToString",[],function(){function e(e){return"string"==typeof e?e:null==e?"":e+""}return e}),define("lodash-amd/modern/string/escapeRegExp",["../internal/baseToString"],function(e){function n(n){return n=e(n),n&&r.test(n)?n.replace(t,"\\$&"):n}var t=/[.*+?^${}()|[\]\/\\]/g,r=RegExp(t.source);return n}),define("lodash-amd/modern/internal/isObjectLike",[],function(){function e(e){return e&&"object"==typeof e||!1}return e}),define("lodash-amd/modern/lang/isNative",["../string/escapeRegExp","../internal/isObjectLike"],function(e,n){function t(e){return null==e?!1:c.call(e)==r?u.test(a.call(e)):n(e)&&o.test(e)||!1}var r="[object Function]",o=/^\[object .+?Constructor\]$/,i=Object.prototype,a=Function.prototype.toString,c=i.toString,u=RegExp("^"+e(c).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");return t}),define("lodash-amd/modern/lang/isArguments",["../internal/isLength","../internal/isObjectLike"],function(e,n){function t(t){var i=n(t)?t.length:r;return e(i)&&a.call(t)==o||!1}var r,o="[object Arguments]",i=Object.prototype,a=i.toString;return t}),define("lodash-amd/modern/lang/isArray",["../internal/isLength","./isNative","../internal/isObjectLike"],function(e,n,t){var r="[object Array]",o=Object.prototype,i=o.toString,a=n(a=Array.isArray)&&a,c=a||function(n){return t(n)&&e(n.length)&&i.call(n)==r||!1};return c}),define("lodash-amd/modern/internal/isIndex",[],function(){function e(e,t){return e=+e,t=null==t?n:t,e>-1&&e%1==0&&t>e}var n=Math.pow(2,53)-1;return e}),define("lodash-amd/modern/internal/root",[],function(){var e={"function":!0,object:!0},n=e[typeof exports]&&exports&&!exports.nodeType&&exports,t=e[typeof module]&&module&&!module.nodeType&&module,r=n&&t&&"object"==typeof global&&global,o=e[typeof window]&&window,i=r||o!==(this&&this.window)&&o||this;return i}),define("lodash-amd/modern/support",["./lang/isNative","./internal/root"],function(e,n){var t=/\bthis\b/,r=Object.prototype,o=(o=n.window)&&o.document,i=r.propertyIsEnumerable,a={};return function(){a.funcDecomp=!e(n.WinRTError)&&t.test(function(){return this}),a.funcNames="string"==typeof Function.name;try{a.dom=11===o.createDocumentFragment().nodeType}catch(r){a.dom=!1}try{a.nonEnumArgs=!i.call(arguments,1)}catch(r){a.nonEnumArgs=!0}}(0,0),a}),define("lodash-amd/modern/object/keysIn",["../lang/isArguments","../lang/isArray","../internal/isIndex","../internal/isLength","../lang/isObject","../support"],function(e,n,t,r,o,i){function a(a){if(null==a)return[];o(a)||(a=Object(a));var c=a.length;c=c&&r(c)&&(n(a)||i.nonEnumArgs&&e(a))&&c||0;for(var l=a.constructor,f=-1,s="function"==typeof l&&l.prototype===a,d=Array(c),b=c>0;++f<c;)d[f]=f+"";for(var y in a)b&&t(y,c)||"constructor"==y&&(s||!u.call(a,y))||d.push(y);return d}var c=Object.prototype,u=c.hasOwnProperty;return a}),define("lodash-amd/modern/internal/shimKeys",["../lang/isArguments","../lang/isArray","./isIndex","./isLength","../object/keysIn","../support"],function(e,n,t,r,o,i){function a(a){for(var c=o(a),l=c.length,f=l&&a.length,s=f&&r(f)&&(n(a)||i.nonEnumArgs&&e(a)),d=-1,b=[];++d<l;){var y=c[d];(s&&t(y,f)||u.call(a,y))&&b.push(y)}return b}var c=Object.prototype,u=c.hasOwnProperty;return a}),define("lodash-amd/modern/object/keys",["../internal/isLength","../lang/isNative","../lang/isObject","../internal/shimKeys"],function(e,n,t,r){var o=n(o=Object.keys)&&o,i=o?function(n){if(n)var i=n.constructor,a=n.length;return"function"==typeof i&&i.prototype===n||"function"!=typeof n&&a&&e(a)?r(n):t(n)?o(n):[]}:r;return i}),define("lodash-amd/modern/internal/baseForOwn",["./baseFor","../object/keys"],function(e,n){function t(t,r){return e(t,r,n)}return t}),define("lodash-amd/modern/internal/arrayCopy",[],function(){function e(e,n){var t=-1,r=e.length;for(n||(n=Array(r));++t<r;)n[t]=e[t];return n}return e}),define("lodash-amd/modern/internal/baseForIn",["./baseFor","../object/keysIn"],function(e,n){function t(t,r){return e(t,r,n)}return t}),define("lodash-amd/modern/internal/shimIsPlainObject",["./baseForIn","./isObjectLike"],function(e,n){function t(t){var o;if(!n(t)||a.call(t)!=r||!i.call(t,"constructor")&&(o=t.constructor,"function"==typeof o&&!(o instanceof o)))return!1;var c;return e(t,function(e,n){c=n}),"undefined"==typeof c||i.call(t,c)}var r="[object Object]",o=Object.prototype,i=o.hasOwnProperty,a=o.toString;return t}),define("lodash-amd/modern/lang/isPlainObject",["./isNative","../internal/shimIsPlainObject"],function(e,n){var t="[object Object]",r=Object.prototype,o=r.toString,i=e(i=Object.getPrototypeOf)&&i,a=i?function(r){if(!r||o.call(r)!=t)return!1;var a=r.valueOf,c=e(a)&&(c=i(a))&&i(c);return c?r==c||i(r)==c:n(r)}:n;return a}),define("lodash-amd/modern/lang/isTypedArray",["../internal/isLength","../internal/isObjectLike"],function(e,n){function t(t){return n(t)&&e(t.length)&&T[I.call(t)]||!1}var r="[object Arguments]",o="[object Array]",i="[object Boolean]",a="[object Date]",c="[object Error]",u="[object Function]",l="[object Map]",f="[object Number]",s="[object Object]",d="[object RegExp]",b="[object Set]",y="[object String]",m="[object WeakMap]",p="[object ArrayBuffer]",g="[object Float32Array]",j="[object Float64Array]",h="[object Int8Array]",v="[object Int16Array]",A="[object Int32Array]",O="[object Uint8Array]",E="[object Uint8ClampedArray]",w="[object Uint16Array]",C="[object Uint32Array]",T={};T[g]=T[j]=T[h]=T[v]=T[A]=T[O]=T[E]=T[w]=T[C]=!0,T[r]=T[o]=T[p]=T[i]=T[a]=T[c]=T[u]=T[l]=T[f]=T[s]=T[d]=T[b]=T[y]=T[m]=!1;var N=Object.prototype,I=N.toString;return t}),define("lodash-amd/modern/internal/baseCopy",[],function(){function e(e,n,t){t||(t=n,n={});for(var r=-1,o=t.length;++r<o;){var i=t[r];n[i]=e[i]}return n}return e}),define("lodash-amd/modern/lang/toPlainObject",["../internal/baseCopy","../object/keysIn"],function(e,n){function t(t){return e(t,n(t))}return t}),define("lodash-amd/modern/internal/baseMergeDeep",["./arrayCopy","../lang/isArguments","../lang/isArray","./isLength","../lang/isPlainObject","../lang/isTypedArray","../lang/toPlainObject"],function(e,n,t,r,o,i,a){function c(c,l,f,s,d,b,y){for(var m=b.length,p=l[f];m--;)if(b[m]==p)return void(c[f]=y[m]);var g=c[f],j=d?d(g,p,f,c,l):u,h="undefined"==typeof j;h&&(j=p,r(p.length)&&(t(p)||i(p))?j=t(g)?g:g?e(g):[]:o(p)||n(p)?j=n(g)?a(g):o(g)?g:{}:h=!1),b.push(p),y.push(j),h?c[f]=s(j,p,d,b,y):(j===j?j!==g:g===g)&&(c[f]=j)}var u;return c}),define("lodash-amd/modern/internal/baseMerge",["./arrayEach","./baseForOwn","./baseMergeDeep","../lang/isArray","./isLength","../lang/isObject","./isObjectLike","../lang/isTypedArray"],function(e,n,t,r,o,i,a,c){function u(f,s,d,b,y){if(!i(f))return f;var m=o(s.length)&&(r(s)||c(s));return(m?e:n)(s,function(e,n,r){if(a(e))return b||(b=[]),y||(y=[]),t(f,r,n,u,d,b,y);var o=f[n],i=d?d(o,e,n,f,r):l,c="undefined"==typeof i;c&&(i=e),!m&&"undefined"==typeof i||!c&&(i===i?i===o:o!==o)||(f[n]=i)}),f}var l;return u}),define("lodash-amd/modern/utility/identity",[],function(){function e(e){return e}return e}),define("lodash-amd/modern/internal/bindCallback",["../utility/identity"],function(e){function n(n,t,r){if("function"!=typeof n)return e;if("undefined"==typeof t)return n;switch(r){case 1:return function(e){return n.call(t,e)};case 3:return function(e,r,o){return n.call(t,e,r,o)};case 4:return function(e,r,o,i){return n.call(t,e,r,o,i)};case 5:return function(e,r,o,i,a){return n.call(t,e,r,o,i,a)}}return function(){return n.apply(t,arguments)}}return n}),define("lodash-amd/modern/internal/isIterateeCall",["./isIndex","./isLength","../lang/isObject"],function(e,n,t){function r(r,o,i){if(!t(i))return!1;var a=typeof o;if("number"==a)var c=i.length,u=n(c)&&e(o,c);else u="string"==a&&o in i;if(u){var l=i[o];return r===r?r===l:l!==l}return!1}return r}),define("lodash-amd/modern/internal/createAssigner",["./bindCallback","./isIterateeCall"],function(e,n){function t(t){return function(){var r=arguments,o=r.length,i=r[0];if(2>o||null==i)return i;var a=r[o-2],c=r[o-1],u=r[3];o>3&&"function"==typeof a?(a=e(a,c,5),o-=2):(a=o>2&&"function"==typeof c?c:null,o-=a?1:0),u&&n(r[1],r[2],u)&&(a=3==o?null:a,o=2);for(var l=0;++l<o;){var f=r[l];f&&t(i,f,a)}return i}}return t}),define("lodash-amd/modern/object/merge",["../internal/baseMerge","../internal/createAssigner"],function(e,n){var t=n(e);return t}),define("lodash-amd/modern/internal/initCloneArray",[],function(){function e(e){var n=e.length,r=new e.constructor(n);return n&&"string"==typeof e[0]&&t.call(e,"index")&&(r.index=e.index,r.input=e.input),r}var n=Object.prototype,t=n.hasOwnProperty;return e}),define("lodash-amd/modern/utility/constant",[],function(){function e(e){return function(){return e}}return e}),define("lodash-amd/modern/internal/bufferClone",["../utility/constant","../lang/isNative","./root"],function(e,n,t){function r(e){return i.call(e,0)}var o=n(o=t.ArrayBuffer)&&o,i=n(i=o&&new o(0).slice)&&i,a=Math.floor,c=n(c=t.Uint8Array)&&c,u=function(){try{var e=n(e=t.Float64Array)&&e,r=new e(new o(10),0,1)&&e}catch(i){}return r}(),l=u?u.BYTES_PER_ELEMENT:0;return i||(r=o&&c?function(e){var n=e.byteLength,t=u?a(n/l):0,r=t*l,i=new o(n);if(t){var f=new u(i,0,t);f.set(new u(e,0,t))}return n!=r&&(f=new c(i,r),f.set(new c(e,r))),i}:e(null)),r}),define("lodash-amd/modern/internal/initCloneByTag",["./bufferClone"],function(e){function n(n,j,h){var v=n.constructor;switch(j){case c:return e(n);case t:case r:return new v(+n);case u:case l:case f:case s:case d:case b:case y:case m:case p:var A=n.buffer;return new v(h?e(A):A,n.byteOffset,n.length);case o:case a:return new v(n);case i:var O=new v(n.source,g.exec(n));O.lastIndex=n.lastIndex}return O}var t="[object Boolean]",r="[object Date]",o="[object Number]",i="[object RegExp]",a="[object String]",c="[object ArrayBuffer]",u="[object Float32Array]",l="[object Float64Array]",f="[object Int8Array]",s="[object Int16Array]",d="[object Int32Array]",b="[object Uint8Array]",y="[object Uint8ClampedArray]",m="[object Uint16Array]",p="[object Uint32Array]",g=/\w*$/;return n}),define("lodash-amd/modern/internal/initCloneObject",[],function(){function e(e){var n=e.constructor;return"function"==typeof n&&n instanceof n||(n=Object),new n}return e}),define("lodash-amd/modern/internal/baseClone",["./arrayCopy","./arrayEach","./baseCopy","./baseForOwn","./initCloneArray","./initCloneByTag","./initCloneObject","../lang/isArray","../lang/isObject","../object/keys"],function(e,n,t,r,o,i,a,c,u,l){function f(d,b,y,m,g,j,v){var A;if(y&&(A=g?y(d,m,g):y(d)),"undefined"!=typeof A)return A;if(!u(d))return d;var O=c(d);if(O){if(A=o(d),!b)return e(d,A)}else{var E=U.call(d),w=E==p;if(E!=h&&E!=s&&(!w||g))return M[E]?i(d,E,b):g?d:{};if(A=a(w?{}:d),!b)return t(d,A,l(d))}j||(j=[]),v||(v=[]);for(var C=j.length;C--;)if(j[C]==d)return v[C];return j.push(d),v.push(A),(O?n:r)(d,function(e,n){A[n]=f(e,b,y,n,d,j,v)}),A}var s="[object Arguments]",d="[object Array]",b="[object Boolean]",y="[object Date]",m="[object Error]",p="[object Function]",g="[object Map]",j="[object Number]",h="[object Object]",v="[object RegExp]",A="[object Set]",O="[object String]",E="[object WeakMap]",w="[object ArrayBuffer]",C="[object Float32Array]",T="[object Float64Array]",N="[object Int8Array]",I="[object Int16Array]",S="[object Int32Array]",k="[object Uint8Array]",x="[object Uint8ClampedArray]",L="[object Uint16Array]",F="[object Uint32Array]",M={};M[s]=M[d]=M[w]=M[b]=M[y]=M[C]=M[T]=M[N]=M[I]=M[S]=M[j]=M[h]=M[v]=M[O]=M[k]=M[x]=M[L]=M[F]=!0,M[m]=M[p]=M[g]=M[A]=M[E]=!1;var P=Object.prototype,U=P.toString;return f}),define("lodash-amd/modern/lang/cloneDeep",["../internal/baseClone","../internal/bindCallback"],function(e,n){function t(t,r,o){return r="function"==typeof r&&n(r,o,1),e(t,!0,r)}return t}),define("scribe-plugin-sanitizer",["html-janitor","lodash-amd/modern/object/merge","lodash-amd/modern/lang/cloneDeep"],function(e,n,t){return function(r){var o=n(t(r),{tags:{em:{"class":"scribe-marker"},br:{}}});return function(n){var t=new e(o);n.registerHTMLFormatter("sanitize",t.clean.bind(t))}}});
//# sourceMappingURL=scribe-plugin-sanitizer.min.js.map
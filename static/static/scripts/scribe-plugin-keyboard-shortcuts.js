define("lodash-amd/modern/internals/isNative",[],function(){function n(n){return"function"==typeof n&&t.test(n)}var e=Object.prototype,r=e.toString,t=RegExp("^"+String(r).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$");return n}),define("lodash-amd/modern/internals/objectTypes",[],function(){var n={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1};return n}),define("lodash-amd/modern/objects/isObject",["../internals/objectTypes"],function(n){function e(e){return!(!e||!n[typeof e])}return e}),define("lodash-amd/modern/utilities/noop",[],function(){function n(){}return n}),define("lodash-amd/modern/internals/baseCreate",["./isNative","../objects/isObject","../utilities/noop"],function(n,e){function r(n){return e(n)?t(n):{}}var t=n(t=Object.create)&&t;return t||(r=function(){function n(){}return function(r){if(e(r)){n.prototype=r;var t=new n;n.prototype=null}return t||window.Object()}}()),r}),define("lodash-amd/modern/internals/setBindData",["./isNative","../utilities/noop"],function(n,e){var r={configurable:!1,enumerable:!1,value:null,writable:!1},t=function(){try{var e={},r=n(r=Object.defineProperty)&&r,t=r(e,e,e)&&r}catch(i){}return t}(),i=t?function(n,e){r.value=e,t(n,"__bindData__",r)}:e;return i}),define("lodash-amd/modern/internals/slice",[],function(){function n(n,e,r){e||(e=0),"undefined"==typeof r&&(r=n?n.length:0);for(var t=-1,i=r-e||0,a=Array(0>i?0:i);++t<i;)a[t]=n[e+t];return a}return n}),define("lodash-amd/modern/internals/baseBind",["./baseCreate","../objects/isObject","./setBindData","./slice"],function(n,e,r,t){function i(i){function a(){if(f){var r=t(f);o.apply(r,arguments)}if(this instanceof a){var i=n(u.prototype),s=u.apply(i,r||arguments);return e(s)?s:i}return u.apply(c,r||arguments)}var u=i[0],f=i[2],c=i[4];return r(a,i),a}var a=[],o=a.push;return i}),define("lodash-amd/modern/internals/baseCreateWrapper",["./baseCreate","../objects/isObject","./setBindData","./slice"],function(n,e,r,t){function i(a){function u(){var r=b?d:this;if(s){var a=t(s);o.apply(a,arguments)}if((l||y)&&(a||(a=t(arguments)),l&&o.apply(a,l),y&&a.length<p))return c|=16,i([f,h?c:-4&c,a,null,d,p]);if(a||(a=arguments),m&&(f=r[v]),this instanceof u){r=n(f.prototype);var j=f.apply(r,a);return e(j)?j:r}return f.apply(r,a)}var f=a[0],c=a[1],s=a[2],l=a[3],d=a[4],p=a[5],b=1&c,m=2&c,y=4&c,h=8&c,v=f;return r(u,a),u}var a=[],o=a.push;return i}),define("lodash-amd/modern/objects/isFunction",[],function(){function n(n){return"function"==typeof n}return n}),define("lodash-amd/modern/internals/createWrapper",["./baseBind","./baseCreateWrapper","../objects/isFunction","./slice"],function(n,e,r,t){function i(a,f,c,s,l,d){var p=1&f,b=2&f,m=4&f,y=16&f,h=32&f;if(!b&&!r(a))throw new TypeError;y&&!c.length&&(f&=-17,y=c=!1),h&&!s.length&&(f&=-33,h=s=!1);var v=a&&a.__bindData__;if(v&&v!==!0)return v=t(v),v[2]&&(v[2]=t(v[2])),v[3]&&(v[3]=t(v[3])),!p||1&v[1]||(v[4]=l),!p&&1&v[1]&&(f|=8),!m||4&v[1]||(v[5]=d),y&&o.apply(v[2]||(v[2]=[]),c),h&&u.apply(v[3]||(v[3]=[]),s),v[1]|=f,i.apply(null,v);var j=1==f||17===f?n:e;return j([a,f,c,s,l,d])}var a=[],o=a.push,u=a.unshift;return i}),define("lodash-amd/modern/functions/bind",["../internals/createWrapper","../internals/slice"],function(n,e){function r(r,t){return arguments.length>2?n(r,17,e(arguments,2),null,t):n(r,1,null,null,t)}return r}),define("lodash-amd/modern/utilities/identity",[],function(){function n(n){return n}return n}),define("lodash-amd/modern/support",["./internals/isNative"],function(n){var e=/\bthis\b/,r={};return r.funcDecomp=!n(window.WinRTError)&&e.test(function(){return this}),r.funcNames="string"==typeof Function.name,r}),define("lodash-amd/modern/internals/baseCreateCallback",["../functions/bind","../utilities/identity","./setBindData","../support"],function(n,e,r,t){function i(i,f,c){if("function"!=typeof i)return e;if("undefined"==typeof f||!("prototype"in i))return i;var s=i.__bindData__;if("undefined"==typeof s&&(t.funcNames&&(s=!i.name),s=s||!t.funcDecomp,!s)){var l=u.call(i);t.funcNames||(s=!a.test(l)),s||(s=o.test(l),r(i,s))}if(s===!1||s!==!0&&1&s[1])return i;switch(c){case 1:return function(n){return i.call(f,n)};case 2:return function(n,e){return i.call(f,n,e)};case 3:return function(n,e,r){return i.call(f,n,e,r)};case 4:return function(n,e,r,t){return i.call(f,n,e,r,t)}}return n(i,f)}var a=/^\s*function[ \n\r\t]+\w/,o=/\bthis\b/,u=Function.prototype.toString;return i}),define("lodash-amd/modern/objects/forIn",["../internals/baseCreateCallback","../internals/objectTypes"],function(n,e){var r=function(r,t,i){var a,o=r,u=o;if(!o)return u;if(!e[typeof o])return u;t=t&&"undefined"==typeof i?t:n(t,i,3);for(a in o)if(t(o[a],a,r)===!1)return u;return u};return r}),define("lodash-amd/modern/internals/arrayPool",[],function(){var n=[];return n}),define("lodash-amd/modern/internals/getArray",["./arrayPool"],function(n){function e(){return n.pop()||[]}return e}),define("lodash-amd/modern/internals/maxPoolSize",[],function(){var n=40;return n}),define("lodash-amd/modern/internals/releaseArray",["./arrayPool","./maxPoolSize"],function(n,e){function r(r){r.length=0,n.length<e&&n.push(r)}return r}),define("lodash-amd/modern/internals/baseIsEqual",["../objects/forIn","./getArray","../objects/isFunction","./objectTypes","./releaseArray"],function(n,e,r,t,i){function a(b,h,v,j,g,_){if(v){var w=v(b,h);if("undefined"!=typeof w)return!!w}if(b===h)return 0!==b||1/b==1/h;var O=typeof b,C=typeof h;if(!(b!==b||b&&t[O]||h&&t[C]))return!1;if(null==b||null==h)return b===h;var k=m.call(b),D=m.call(h);if(k==o&&(k=l),D==o&&(D=l),k!=D)return!1;switch(k){case f:case c:return+b==+h;case s:return b!=+b?h!=+h:0==b?1/b==1/h:b==+h;case d:case p:return b==String(h)}var N=k==u;if(!N){var S=y.call(b,"__wrapped__"),E=y.call(h,"__wrapped__");if(S||E)return a(S?b.__wrapped__:b,E?h.__wrapped__:h,v,j,g,_);if(k!=l)return!1;var P=b.constructor,T=h.constructor;if(P!=T&&!(r(P)&&P instanceof P&&r(T)&&T instanceof T)&&"constructor"in b&&"constructor"in h)return!1}var A=!g;g||(g=e()),_||(_=e());for(var B=g.length;B--;)if(g[B]==b)return _[B]==h;var x=0;if(w=!0,g.push(b),_.push(h),N){if(B=b.length,x=h.length,w=x==B,w||j)for(;x--;){var F=B,W=h[x];if(j)for(;F--&&!(w=a(b[F],W,v,j,g,_)););else if(!(w=a(b[x],W,v,j,g,_)))break}}else n(h,function(n,e,r){return y.call(r,e)?(x++,w=y.call(b,e)&&a(b[e],n,v,j,g,_)):void 0}),w&&!j&&n(b,function(n,e,r){return y.call(r,e)?w=--x>-1:void 0});return g.pop(),_.pop(),A&&(i(g),i(_)),w}var o="[object Arguments]",u="[object Array]",f="[object Boolean]",c="[object Date]",s="[object Number]",l="[object Object]",d="[object RegExp]",p="[object String]",b=Object.prototype,m=b.toString,y=b.hasOwnProperty;return a}),define("lodash-amd/modern/internals/shimKeys",["./objectTypes"],function(n){var e=Object.prototype,r=e.hasOwnProperty,t=function(e){var t,i=e,a=[];if(!i)return a;if(!n[typeof e])return a;for(t in i)r.call(i,t)&&a.push(t);return a};return t}),define("lodash-amd/modern/objects/keys",["../internals/isNative","./isObject","../internals/shimKeys"],function(n,e,r){var t=n(t=Object.keys)&&t,i=t?function(n){return e(n)?t(n):[]}:r;return i}),define("lodash-amd/modern/utilities/property",[],function(){function n(n){return function(e){return e[n]}}return n}),define("lodash-amd/modern/functions/createCallback",["../internals/baseCreateCallback","../internals/baseIsEqual","../objects/isObject","../objects/keys","../utilities/property"],function(n,e,r,t,i){function a(a,o,u){var f=typeof a;if(null==a||"function"==f)return n(a,o,u);if("object"!=f)return i(a);var c=t(a),s=c[0],l=a[s];return 1!=c.length||l!==l||r(l)?function(n){for(var r=c.length,t=!1;r--&&(t=e(n[c[r]],a[c[r]],null,!0)););return t}:function(n){var e=n[s];return l===e&&(0!==l||1/l==1/e)}}return a}),define("lodash-amd/modern/objects/forOwn",["../internals/baseCreateCallback","./keys","../internals/objectTypes"],function(n,e,r){var t=function(t,i,a){var o,u=t,f=u;if(!u)return f;if(!r[typeof u])return f;i=i&&"undefined"==typeof a?i:n(i,a,3);for(var c=-1,s=r[typeof u]&&e(u),l=s?s.length:0;++c<l;)if(o=s[c],i(u[o],o,t)===!1)return f;return f};return t}),define("lodash-amd/modern/objects/findKey",["../functions/createCallback","./forOwn"],function(n,e){function r(r,t,i){var a;return t=n(t,i,3),e(r,function(n,e,r){return t(n,e,r)?(a=e,!1):void 0}),a}return r}),define("scribe-plugin-keyboard-shortcuts",["lodash-amd/modern/objects/findKey"],function(n){return function(e){return function(r){r.el.addEventListener("keydown",function(t){var i=n(e,function(n){return n(t)});if(i){var a=r.getCommand(i);t.preventDefault(),a.queryEnabled()&&a.execute()}})}}});//# sourceMappingURL=scribe-plugin-keyboard-shortcuts.min.js.map
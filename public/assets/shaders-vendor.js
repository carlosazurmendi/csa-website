var F0=Object.create;var hi=Object.defineProperty;var z0=Object.getOwnPropertyDescriptor;var U0=Object.getOwnPropertyNames;var R0=Object.getPrototypeOf,M0=Object.prototype.hasOwnProperty;var Ht=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(o){throw t=0,o}},I0=(e,t)=>{for(var o in t)hi(e,o,{get:t[o],enumerable:!0})},V0=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of U0(t))!M0.call(e,a)&&a!==o&&hi(e,a,{get:()=>t[a],enumerable:!(r=z0(t,a))||r.enumerable});return e};var z=(e,t,o)=>(o=e!=null?F0(R0(e)):{},V0(t||!e||!e.__esModule?hi(o,"default",{value:e,enumerable:!0}):o,e));var bu=Ht(G=>{"use strict";var Ir=Symbol.for("react.element"),O0=Symbol.for("react.portal"),D0=Symbol.for("react.fragment"),N0=Symbol.for("react.strict_mode"),T0=Symbol.for("react.profiler"),b0=Symbol.for("react.provider"),G0=Symbol.for("react.context"),L0=Symbol.for("react.forward_ref"),W0=Symbol.for("react.suspense"),Y0=Symbol.for("react.memo"),Q0=Symbol.for("react.lazy"),Fu=Symbol.iterator;function H0(e){return e===null||typeof e!="object"?null:(e=Fu&&e[Fu]||e["@@iterator"],typeof e=="function"?e:null)}var Ru={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Mu=Object.assign,Iu={};function Ko(e,t,o){this.props=e,this.context=t,this.refs=Iu,this.updater=o||Ru}Ko.prototype.isReactComponent={};Ko.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ko.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Vu(){}Vu.prototype=Ko.prototype;function xi(e,t,o){this.props=e,this.context=t,this.refs=Iu,this.updater=o||Ru}var _i=xi.prototype=new Vu;_i.constructor=xi;Mu(_i,Ko.prototype);_i.isPureReactComponent=!0;var zu=Array.isArray,Ou=Object.prototype.hasOwnProperty,yi={current:null},Du={key:!0,ref:!0,__self:!0,__source:!0};function Nu(e,t,o){var r,a={},n=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(n=""+t.key),t)Ou.call(t,r)&&!Du.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(s===1)a.children=o;else if(1<s){for(var l=Array(s),u=0;u<s;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:Ir,type:e,key:n,ref:i,props:a,_owner:yi.current}}function j0(e,t){return{$$typeof:Ir,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Si(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ir}function X0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var Uu=/\/+/g;function vi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?X0(""+e.key):t.toString(36)}function La(e,t,o,r,a){var n=typeof e;(n==="undefined"||n==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(n){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Ir:case O0:i=!0}}if(i)return i=e,a=a(i),e=r===""?"."+vi(i,0):r,zu(a)?(o="",e!=null&&(o=e.replace(Uu,"$&/")+"/"),La(a,t,o,"",function(u){return u})):a!=null&&(Si(a)&&(a=j0(a,o+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(Uu,"$&/")+"/")+e)),t.push(a)),1;if(i=0,r=r===""?".":r+":",zu(e))for(var s=0;s<e.length;s++){n=e[s];var l=r+vi(n,s);i+=La(n,t,o,l,a)}else if(l=H0(e),typeof l=="function")for(e=l.call(e),s=0;!(n=e.next()).done;)n=n.value,l=r+vi(n,s++),i+=La(n,t,o,l,a);else if(n==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Ga(e,t,o){if(e==null)return e;var r=[],a=0;return La(e,r,"","",function(n){return t.call(o,n,a++)}),r}function K0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(o){(e._status===0||e._status===-1)&&(e._status=1,e._result=o)},function(o){(e._status===0||e._status===-1)&&(e._status=2,e._result=o)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var it={current:null},Wa={transition:null},q0={ReactCurrentDispatcher:it,ReactCurrentBatchConfig:Wa,ReactCurrentOwner:yi};function Tu(){throw Error("act(...) is not supported in production builds of React.")}G.Children={map:Ga,forEach:function(e,t,o){Ga(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return Ga(e,function(){t++}),t},toArray:function(e){return Ga(e,function(t){return t})||[]},only:function(e){if(!Si(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};G.Component=Ko;G.Fragment=D0;G.Profiler=T0;G.PureComponent=xi;G.StrictMode=N0;G.Suspense=W0;G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=q0;G.act=Tu;G.cloneElement=function(e,t,o){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Mu({},e.props),a=e.key,n=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(n=t.ref,i=yi.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)Ou.call(t,l)&&!Du.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=o;else if(1<l){s=Array(l);for(var u=0;u<l;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:Ir,type:e.type,key:a,ref:n,props:r,_owner:i}};G.createContext=function(e){return e={$$typeof:G0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:b0,_context:e},e.Consumer=e};G.createElement=Nu;G.createFactory=function(e){var t=Nu.bind(null,e);return t.type=e,t};G.createRef=function(){return{current:null}};G.forwardRef=function(e){return{$$typeof:L0,render:e}};G.isValidElement=Si;G.lazy=function(e){return{$$typeof:Q0,_payload:{_status:-1,_result:e},_init:K0}};G.memo=function(e,t){return{$$typeof:Y0,type:e,compare:t===void 0?null:t}};G.startTransition=function(e){var t=Wa.transition;Wa.transition={};try{e()}finally{Wa.transition=t}};G.unstable_act=Tu;G.useCallback=function(e,t){return it.current.useCallback(e,t)};G.useContext=function(e){return it.current.useContext(e)};G.useDebugValue=function(){};G.useDeferredValue=function(e){return it.current.useDeferredValue(e)};G.useEffect=function(e,t){return it.current.useEffect(e,t)};G.useId=function(){return it.current.useId()};G.useImperativeHandle=function(e,t,o){return it.current.useImperativeHandle(e,t,o)};G.useInsertionEffect=function(e,t){return it.current.useInsertionEffect(e,t)};G.useLayoutEffect=function(e,t){return it.current.useLayoutEffect(e,t)};G.useMemo=function(e,t){return it.current.useMemo(e,t)};G.useReducer=function(e,t,o){return it.current.useReducer(e,t,o)};G.useRef=function(e){return it.current.useRef(e)};G.useState=function(e){return it.current.useState(e)};G.useSyncExternalStore=function(e,t,o){return it.current.useSyncExternalStore(e,t,o)};G.useTransition=function(){return it.current.useTransition()};G.version="18.3.1"});var L=Ht((ux,Gu)=>{"use strict";Gu.exports=bu()});var Ju=Ht($=>{"use strict";function Ai(e,t){var o=e.length;e.push(t);e:for(;0<o;){var r=o-1>>>1,a=e[r];if(0<Ya(a,t))e[r]=t,e[o]=a,o=r;else break e}}function Rt(e){return e.length===0?null:e[0]}function Ha(e){if(e.length===0)return null;var t=e[0],o=e.pop();if(o!==t){e[0]=o;e:for(var r=0,a=e.length,n=a>>>1;r<n;){var i=2*(r+1)-1,s=e[i],l=i+1,u=e[l];if(0>Ya(s,o))l<a&&0>Ya(u,s)?(e[r]=u,e[l]=o,r=l):(e[r]=s,e[i]=o,r=i);else if(l<a&&0>Ya(u,o))e[r]=u,e[l]=o,r=l;else break e}}return t}function Ya(e,t){var o=e.sortIndex-t.sortIndex;return o!==0?o:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Lu=performance,$.unstable_now=function(){return Lu.now()}):(wi=Date,Wu=wi.now(),$.unstable_now=function(){return wi.now()-Wu});var Lu,wi,Wu,bt=[],no=[],J0=1,kt=null,Je=3,ja=!1,zo=!1,Or=!1,Hu=typeof setTimeout=="function"?setTimeout:null,ju=typeof clearTimeout=="function"?clearTimeout:null,Yu=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Bi(e){for(var t=Rt(no);t!==null;){if(t.callback===null)Ha(no);else if(t.startTime<=e)Ha(no),t.sortIndex=t.expirationTime,Ai(bt,t);else break;t=Rt(no)}}function Pi(e){if(Or=!1,Bi(e),!zo)if(Rt(bt)!==null)zo=!0,Fi(Ei);else{var t=Rt(no);t!==null&&zi(Pi,t.startTime-e)}}function Ei(e,t){zo=!1,Or&&(Or=!1,ju(Dr),Dr=-1),ja=!0;var o=Je;try{for(Bi(t),kt=Rt(bt);kt!==null&&(!(kt.expirationTime>t)||e&&!qu());){var r=kt.callback;if(typeof r=="function"){kt.callback=null,Je=kt.priorityLevel;var a=r(kt.expirationTime<=t);t=$.unstable_now(),typeof a=="function"?kt.callback=a:kt===Rt(bt)&&Ha(bt),Bi(t)}else Ha(bt);kt=Rt(bt)}if(kt!==null)var n=!0;else{var i=Rt(no);i!==null&&zi(Pi,i.startTime-t),n=!1}return n}finally{kt=null,Je=o,ja=!1}}var Xa=!1,Qa=null,Dr=-1,Xu=5,Ku=-1;function qu(){return!($.unstable_now()-Ku<Xu)}function Ci(){if(Qa!==null){var e=$.unstable_now();Ku=e;var t=!0;try{t=Qa(!0,e)}finally{t?Vr():(Xa=!1,Qa=null)}}else Xa=!1}var Vr;typeof Yu=="function"?Vr=function(){Yu(Ci)}:typeof MessageChannel<"u"?(ki=new MessageChannel,Qu=ki.port2,ki.port1.onmessage=Ci,Vr=function(){Qu.postMessage(null)}):Vr=function(){Hu(Ci,0)};var ki,Qu;function Fi(e){Qa=e,Xa||(Xa=!0,Vr())}function zi(e,t){Dr=Hu(function(){e($.unstable_now())},t)}$.unstable_IdlePriority=5;$.unstable_ImmediatePriority=1;$.unstable_LowPriority=4;$.unstable_NormalPriority=3;$.unstable_Profiling=null;$.unstable_UserBlockingPriority=2;$.unstable_cancelCallback=function(e){e.callback=null};$.unstable_continueExecution=function(){zo||ja||(zo=!0,Fi(Ei))};$.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Xu=0<e?Math.floor(1e3/e):5};$.unstable_getCurrentPriorityLevel=function(){return Je};$.unstable_getFirstCallbackNode=function(){return Rt(bt)};$.unstable_next=function(e){switch(Je){case 1:case 2:case 3:var t=3;break;default:t=Je}var o=Je;Je=t;try{return e()}finally{Je=o}};$.unstable_pauseExecution=function(){};$.unstable_requestPaint=function(){};$.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var o=Je;Je=e;try{return t()}finally{Je=o}};$.unstable_scheduleCallback=function(e,t,o){var r=$.unstable_now();switch(typeof o=="object"&&o!==null?(o=o.delay,o=typeof o=="number"&&0<o?r+o:r):o=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=o+a,e={id:J0++,callback:t,priorityLevel:e,startTime:o,expirationTime:a,sortIndex:-1},o>r?(e.sortIndex=o,Ai(no,e),Rt(bt)===null&&e===Rt(no)&&(Or?(ju(Dr),Dr=-1):Or=!0,zi(Pi,o-r))):(e.sortIndex=a,Ai(bt,e),zo||ja||(zo=!0,Fi(Ei))),e};$.unstable_shouldYield=qu;$.unstable_wrapCallback=function(e){var t=Je;return function(){var o=Je;Je=t;try{return e.apply(this,arguments)}finally{Je=o}}}});var $u=Ht((fx,Zu)=>{"use strict";Zu.exports=Ju()});var am=Ht(wt=>{"use strict";var Z0=L(),yt=$u();function B(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,o=1;o<arguments.length;o++)t+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sf=new Set,na={};function Wo(e,t){hr(e,t),hr(e+"Capture",t)}function hr(e,t){for(na[e]=t,e=0;e<t.length;e++)sf.add(t[e])}var Zt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$i=Object.prototype.hasOwnProperty,$0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ec={},tc={};function eg(e){return $i.call(tc,e)?!0:$i.call(ec,e)?!1:$0.test(e)?tc[e]=!0:(ec[e]=!0,!1)}function tg(e,t,o,r){if(o!==null&&o.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:o!==null?!o.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function og(e,t,o,r){if(t===null||typeof t>"u"||tg(e,t,o,r))return!0;if(r)return!1;if(o!==null)switch(o.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ut(e,t,o,r,a,n,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=o,this.propertyName=e,this.type=t,this.sanitizeURL=n,this.removeEmptyString=i}var je={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){je[e]=new ut(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];je[t]=new ut(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){je[e]=new ut(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){je[e]=new ut(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){je[e]=new ut(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){je[e]=new ut(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){je[e]=new ut(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){je[e]=new ut(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){je[e]=new ut(e,5,!1,e.toLowerCase(),null,!1,!1)});var Qs=/[\-:]([a-z])/g;function Hs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Qs,Hs);je[t]=new ut(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Qs,Hs);je[t]=new ut(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Qs,Hs);je[t]=new ut(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){je[e]=new ut(e,1,!1,e.toLowerCase(),null,!1,!1)});je.xlinkHref=new ut("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){je[e]=new ut(e,1,!1,e.toLowerCase(),null,!0,!0)});function js(e,t,o,r){var a=je.hasOwnProperty(t)?je[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(og(t,o,a,r)&&(o=null),r||a===null?eg(t)&&(o===null?e.removeAttribute(t):e.setAttribute(t,""+o)):a.mustUseProperty?e[a.propertyName]=o===null?a.type===3?!1:"":o:(t=a.attributeName,r=a.attributeNamespace,o===null?e.removeAttribute(t):(a=a.type,o=a===3||a===4&&o===!0?"":""+o,r?e.setAttributeNS(r,t,o):e.setAttribute(t,o))))}var oo=Z0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ka=Symbol.for("react.element"),Zo=Symbol.for("react.portal"),$o=Symbol.for("react.fragment"),Xs=Symbol.for("react.strict_mode"),es=Symbol.for("react.profiler"),lf=Symbol.for("react.provider"),uf=Symbol.for("react.context"),Ks=Symbol.for("react.forward_ref"),ts=Symbol.for("react.suspense"),os=Symbol.for("react.suspense_list"),qs=Symbol.for("react.memo"),so=Symbol.for("react.lazy"),cf=Symbol.for("react.offscreen"),oc=Symbol.iterator;function Nr(e){return e===null||typeof e!="object"?null:(e=oc&&e[oc]||e["@@iterator"],typeof e=="function"?e:null)}var de=Object.assign,Ui;function Hr(e){if(Ui===void 0)try{throw Error()}catch(o){var t=o.stack.trim().match(/\n( *(at )?)/);Ui=t&&t[1]||""}return`
`+Ui+e}var Ri=!1;function Mi(e,t){if(!e||Ri)return"";Ri=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),n=r.stack.split(`
`),i=a.length-1,s=n.length-1;1<=i&&0<=s&&a[i]!==n[s];)s--;for(;1<=i&&0<=s;i--,s--)if(a[i]!==n[s]){if(i!==1||s!==1)do if(i--,s--,0>s||a[i]!==n[s]){var l=`
`+a[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{Ri=!1,Error.prepareStackTrace=o}return(e=e?e.displayName||e.name:"")?Hr(e):""}function rg(e){switch(e.tag){case 5:return Hr(e.type);case 16:return Hr("Lazy");case 13:return Hr("Suspense");case 19:return Hr("SuspenseList");case 0:case 2:case 15:return e=Mi(e.type,!1),e;case 11:return e=Mi(e.type.render,!1),e;case 1:return e=Mi(e.type,!0),e;default:return""}}function rs(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $o:return"Fragment";case Zo:return"Portal";case es:return"Profiler";case Xs:return"StrictMode";case ts:return"Suspense";case os:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case uf:return(e.displayName||"Context")+".Consumer";case lf:return(e._context.displayName||"Context")+".Provider";case Ks:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case qs:return t=e.displayName||null,t!==null?t:rs(e.type)||"Memo";case so:t=e._payload,e=e._init;try{return rs(e(t))}catch{}}return null}function ag(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rs(t);case 8:return t===Xs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function wo(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ff(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ng(e){var t=ff(e)?"checked":"value",o=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var a=o.get,n=o.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(i){r=""+i,n.call(this,i)}}),Object.defineProperty(e,t,{enumerable:o.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function qa(e){e._valueTracker||(e._valueTracker=ng(e))}function pf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var o=t.getValue(),r="";return e&&(r=ff(e)?e.checked?"true":"false":e.value),e=r,e!==o?(t.setValue(e),!0):!1}function An(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function as(e,t){var o=t.checked;return de({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??e._wrapperState.initialChecked})}function rc(e,t){var o=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;o=wo(t.value!=null?t.value:o),e._wrapperState={initialChecked:r,initialValue:o,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function mf(e,t){t=t.checked,t!=null&&js(e,"checked",t,!1)}function ns(e,t){mf(e,t);var o=wo(t.value),r=t.type;if(o!=null)r==="number"?(o===0&&e.value===""||e.value!=o)&&(e.value=""+o):e.value!==""+o&&(e.value=""+o);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?is(e,t.type,o):t.hasOwnProperty("defaultValue")&&is(e,t.type,wo(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ac(e,t,o){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,o||t===e.value||(e.value=t),e.defaultValue=t}o=e.name,o!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,o!==""&&(e.name=o)}function is(e,t,o){(t!=="number"||An(e.ownerDocument)!==e)&&(o==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+o&&(e.defaultValue=""+o))}var jr=Array.isArray;function cr(e,t,o,r){if(e=e.options,t){t={};for(var a=0;a<o.length;a++)t["$"+o[a]]=!0;for(o=0;o<e.length;o++)a=t.hasOwnProperty("$"+e[o].value),e[o].selected!==a&&(e[o].selected=a),a&&r&&(e[o].defaultSelected=!0)}else{for(o=""+wo(o),t=null,a=0;a<e.length;a++){if(e[a].value===o){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function ss(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(B(91));return de({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nc(e,t){var o=t.value;if(o==null){if(o=t.children,t=t.defaultValue,o!=null){if(t!=null)throw Error(B(92));if(jr(o)){if(1<o.length)throw Error(B(93));o=o[0]}t=o}t==null&&(t=""),o=t}e._wrapperState={initialValue:wo(o)}}function df(e,t){var o=wo(t.value),r=wo(t.defaultValue);o!=null&&(o=""+o,o!==e.value&&(e.value=o),t.defaultValue==null&&e.defaultValue!==o&&(e.defaultValue=o)),r!=null&&(e.defaultValue=""+r)}function ic(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ls(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ja,hf=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,o,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,o,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ja.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ia(e,t){if(t){var o=e.firstChild;if(o&&o===e.lastChild&&o.nodeType===3){o.nodeValue=t;return}}e.textContent=t}var qr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ig=["Webkit","ms","Moz","O"];Object.keys(qr).forEach(function(e){ig.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),qr[t]=qr[e]})});function vf(e,t,o){return t==null||typeof t=="boolean"||t===""?"":o||typeof t!="number"||t===0||qr.hasOwnProperty(e)&&qr[e]?(""+t).trim():t+"px"}function xf(e,t){e=e.style;for(var o in t)if(t.hasOwnProperty(o)){var r=o.indexOf("--")===0,a=vf(o,t[o],r);o==="float"&&(o="cssFloat"),r?e.setProperty(o,a):e[o]=a}}var sg=de({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function us(e,t){if(t){if(sg[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(B(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(B(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(B(61))}if(t.style!=null&&typeof t.style!="object")throw Error(B(62))}}function cs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fs=null;function Js(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ps=null,fr=null,pr=null;function sc(e){if(e=ka(e)){if(typeof ps!="function")throw Error(B(280));var t=e.stateNode;t&&(t=$n(t),ps(e.stateNode,e.type,t))}}function _f(e){fr?pr?pr.push(e):pr=[e]:fr=e}function yf(){if(fr){var e=fr,t=pr;if(pr=fr=null,sc(e),t)for(e=0;e<t.length;e++)sc(t[e])}}function Sf(e,t){return e(t)}function wf(){}var Ii=!1;function Cf(e,t,o){if(Ii)return e(t,o);Ii=!0;try{return Sf(e,t,o)}finally{Ii=!1,(fr!==null||pr!==null)&&(wf(),yf())}}function sa(e,t){var o=e.stateNode;if(o===null)return null;var r=$n(o);if(r===null)return null;o=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(o&&typeof o!="function")throw Error(B(231,t,typeof o));return o}var ms=!1;if(Zt)try{qo={},Object.defineProperty(qo,"passive",{get:function(){ms=!0}}),window.addEventListener("test",qo,qo),window.removeEventListener("test",qo,qo)}catch{ms=!1}var qo;function lg(e,t,o,r,a,n,i,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(o,u)}catch(g){this.onError(g)}}var Jr=!1,Bn=null,Pn=!1,ds=null,ug={onError:function(e){Jr=!0,Bn=e}};function cg(e,t,o,r,a,n,i,s,l){Jr=!1,Bn=null,lg.apply(ug,arguments)}function fg(e,t,o,r,a,n,i,s,l){if(cg.apply(this,arguments),Jr){if(Jr){var u=Bn;Jr=!1,Bn=null}else throw Error(B(198));Pn||(Pn=!0,ds=u)}}function Yo(e){var t=e,o=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(o=t.return),e=t.return;while(e)}return t.tag===3?o:null}function kf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function lc(e){if(Yo(e)!==e)throw Error(B(188))}function pg(e){var t=e.alternate;if(!t){if(t=Yo(e),t===null)throw Error(B(188));return t!==e?null:e}for(var o=e,r=t;;){var a=o.return;if(a===null)break;var n=a.alternate;if(n===null){if(r=a.return,r!==null){o=r;continue}break}if(a.child===n.child){for(n=a.child;n;){if(n===o)return lc(a),e;if(n===r)return lc(a),t;n=n.sibling}throw Error(B(188))}if(o.return!==r.return)o=a,r=n;else{for(var i=!1,s=a.child;s;){if(s===o){i=!0,o=a,r=n;break}if(s===r){i=!0,r=a,o=n;break}s=s.sibling}if(!i){for(s=n.child;s;){if(s===o){i=!0,o=n,r=a;break}if(s===r){i=!0,r=n,o=a;break}s=s.sibling}if(!i)throw Error(B(189))}}if(o.alternate!==r)throw Error(B(190))}if(o.tag!==3)throw Error(B(188));return o.stateNode.current===o?e:t}function Af(e){return e=pg(e),e!==null?Bf(e):null}function Bf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Bf(e);if(t!==null)return t;e=e.sibling}return null}var Pf=yt.unstable_scheduleCallback,uc=yt.unstable_cancelCallback,mg=yt.unstable_shouldYield,dg=yt.unstable_requestPaint,Se=yt.unstable_now,gg=yt.unstable_getCurrentPriorityLevel,Zs=yt.unstable_ImmediatePriority,Ef=yt.unstable_UserBlockingPriority,En=yt.unstable_NormalPriority,hg=yt.unstable_LowPriority,Ff=yt.unstable_IdlePriority,Kn=null,Yt=null;function vg(e){if(Yt&&typeof Yt.onCommitFiberRoot=="function")try{Yt.onCommitFiberRoot(Kn,e,void 0,(e.current.flags&128)===128)}catch{}}var Dt=Math.clz32?Math.clz32:yg,xg=Math.log,_g=Math.LN2;function yg(e){return e>>>=0,e===0?32:31-(xg(e)/_g|0)|0}var Za=64,$a=4194304;function Xr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Fn(e,t){var o=e.pendingLanes;if(o===0)return 0;var r=0,a=e.suspendedLanes,n=e.pingedLanes,i=o&268435455;if(i!==0){var s=i&~a;s!==0?r=Xr(s):(n&=i,n!==0&&(r=Xr(n)))}else i=o&~a,i!==0?r=Xr(i):n!==0&&(r=Xr(n));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,n=t&-t,a>=n||a===16&&(n&4194240)!==0))return t;if((r&4)!==0&&(r|=o&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)o=31-Dt(t),a=1<<o,r|=e[o],t&=~a;return r}function Sg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wg(e,t){for(var o=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,n=e.pendingLanes;0<n;){var i=31-Dt(n),s=1<<i,l=a[i];l===-1?((s&o)===0||(s&r)!==0)&&(a[i]=Sg(s,t)):l<=t&&(e.expiredLanes|=s),n&=~s}}function gs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function zf(){var e=Za;return Za<<=1,(Za&4194240)===0&&(Za=64),e}function Vi(e){for(var t=[],o=0;31>o;o++)t.push(e);return t}function wa(e,t,o){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Dt(t),e[t]=o}function Cg(e,t){var o=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<o;){var a=31-Dt(o),n=1<<a;t[a]=0,r[a]=-1,e[a]=-1,o&=~n}}function $s(e,t){var o=e.entangledLanes|=t;for(e=e.entanglements;o;){var r=31-Dt(o),a=1<<r;a&t|e[r]&t&&(e[r]|=t),o&=~a}}var K=0;function Uf(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Rf,el,Mf,If,Vf,hs=!1,en=[],mo=null,go=null,ho=null,la=new Map,ua=new Map,uo=[],kg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function cc(e,t){switch(e){case"focusin":case"focusout":mo=null;break;case"dragenter":case"dragleave":go=null;break;case"mouseover":case"mouseout":ho=null;break;case"pointerover":case"pointerout":la.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ua.delete(t.pointerId)}}function Tr(e,t,o,r,a,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:o,eventSystemFlags:r,nativeEvent:n,targetContainers:[a]},t!==null&&(t=ka(t),t!==null&&el(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Ag(e,t,o,r,a){switch(t){case"focusin":return mo=Tr(mo,e,t,o,r,a),!0;case"dragenter":return go=Tr(go,e,t,o,r,a),!0;case"mouseover":return ho=Tr(ho,e,t,o,r,a),!0;case"pointerover":var n=a.pointerId;return la.set(n,Tr(la.get(n)||null,e,t,o,r,a)),!0;case"gotpointercapture":return n=a.pointerId,ua.set(n,Tr(ua.get(n)||null,e,t,o,r,a)),!0}return!1}function Of(e){var t=Mo(e.target);if(t!==null){var o=Yo(t);if(o!==null){if(t=o.tag,t===13){if(t=kf(o),t!==null){e.blockedOn=t,Vf(e.priority,function(){Mf(o)});return}}else if(t===3&&o.stateNode.current.memoizedState.isDehydrated){e.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}e.blockedOn=null}function gn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var o=vs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(o===null){o=e.nativeEvent;var r=new o.constructor(o.type,o);fs=r,o.target.dispatchEvent(r),fs=null}else return t=ka(o),t!==null&&el(t),e.blockedOn=o,!1;t.shift()}return!0}function fc(e,t,o){gn(e)&&o.delete(t)}function Bg(){hs=!1,mo!==null&&gn(mo)&&(mo=null),go!==null&&gn(go)&&(go=null),ho!==null&&gn(ho)&&(ho=null),la.forEach(fc),ua.forEach(fc)}function br(e,t){e.blockedOn===t&&(e.blockedOn=null,hs||(hs=!0,yt.unstable_scheduleCallback(yt.unstable_NormalPriority,Bg)))}function ca(e){function t(a){return br(a,e)}if(0<en.length){br(en[0],e);for(var o=1;o<en.length;o++){var r=en[o];r.blockedOn===e&&(r.blockedOn=null)}}for(mo!==null&&br(mo,e),go!==null&&br(go,e),ho!==null&&br(ho,e),la.forEach(t),ua.forEach(t),o=0;o<uo.length;o++)r=uo[o],r.blockedOn===e&&(r.blockedOn=null);for(;0<uo.length&&(o=uo[0],o.blockedOn===null);)Of(o),o.blockedOn===null&&uo.shift()}var mr=oo.ReactCurrentBatchConfig,zn=!0;function Pg(e,t,o,r){var a=K,n=mr.transition;mr.transition=null;try{K=1,tl(e,t,o,r)}finally{K=a,mr.transition=n}}function Eg(e,t,o,r){var a=K,n=mr.transition;mr.transition=null;try{K=4,tl(e,t,o,r)}finally{K=a,mr.transition=n}}function tl(e,t,o,r){if(zn){var a=vs(e,t,o,r);if(a===null)Li(e,t,r,Un,o),cc(e,r);else if(Ag(a,e,t,o,r))r.stopPropagation();else if(cc(e,r),t&4&&-1<kg.indexOf(e)){for(;a!==null;){var n=ka(a);if(n!==null&&Rf(n),n=vs(e,t,o,r),n===null&&Li(e,t,r,Un,o),n===a)break;a=n}a!==null&&r.stopPropagation()}else Li(e,t,r,null,o)}}var Un=null;function vs(e,t,o,r){if(Un=null,e=Js(r),e=Mo(e),e!==null)if(t=Yo(e),t===null)e=null;else if(o=t.tag,o===13){if(e=kf(t),e!==null)return e;e=null}else if(o===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Un=e,null}function Df(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gg()){case Zs:return 1;case Ef:return 4;case En:case hg:return 16;case Ff:return 536870912;default:return 16}default:return 16}}var fo=null,ol=null,hn=null;function Nf(){if(hn)return hn;var e,t=ol,o=t.length,r,a="value"in fo?fo.value:fo.textContent,n=a.length;for(e=0;e<o&&t[e]===a[e];e++);var i=o-e;for(r=1;r<=i&&t[o-r]===a[n-r];r++);return hn=a.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function tn(){return!0}function pc(){return!1}function St(e){function t(o,r,a,n,i){this._reactName=o,this._targetInst=a,this.type=r,this.nativeEvent=n,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(o=e[s],this[s]=o?o(n):n[s]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?tn:pc,this.isPropagationStopped=pc,this}return de(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=tn)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=tn)},persist:function(){},isPersistent:tn}),t}var Cr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rl=St(Cr),Ca=de({},Cr,{view:0,detail:0}),Fg=St(Ca),Oi,Di,Gr,qn=de({},Ca,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:al,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gr&&(Gr&&e.type==="mousemove"?(Oi=e.screenX-Gr.screenX,Di=e.screenY-Gr.screenY):Di=Oi=0,Gr=e),Oi)},movementY:function(e){return"movementY"in e?e.movementY:Di}}),mc=St(qn),zg=de({},qn,{dataTransfer:0}),Ug=St(zg),Rg=de({},Ca,{relatedTarget:0}),Ni=St(Rg),Mg=de({},Cr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ig=St(Mg),Vg=de({},Cr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Og=St(Vg),Dg=de({},Cr,{data:0}),dc=St(Dg),Ng={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Tg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Gg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=bg[e])?!!t[e]:!1}function al(){return Gg}var Lg=de({},Ca,{key:function(e){if(e.key){var t=Ng[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=vn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Tg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:al,charCode:function(e){return e.type==="keypress"?vn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?vn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wg=St(Lg),Yg=de({},qn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gc=St(Yg),Qg=de({},Ca,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:al}),Hg=St(Qg),jg=de({},Cr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xg=St(jg),Kg=de({},qn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),qg=St(Kg),Jg=[9,13,27,32],nl=Zt&&"CompositionEvent"in window,Zr=null;Zt&&"documentMode"in document&&(Zr=document.documentMode);var Zg=Zt&&"TextEvent"in window&&!Zr,Tf=Zt&&(!nl||Zr&&8<Zr&&11>=Zr),hc=" ",vc=!1;function bf(e,t){switch(e){case"keyup":return Jg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Gf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var er=!1;function $g(e,t){switch(e){case"compositionend":return Gf(t);case"keypress":return t.which!==32?null:(vc=!0,hc);case"textInput":return e=t.data,e===hc&&vc?null:e;default:return null}}function eh(e,t){if(er)return e==="compositionend"||!nl&&bf(e,t)?(e=Nf(),hn=ol=fo=null,er=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Tf&&t.locale!=="ko"?null:t.data;default:return null}}var th={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!th[e.type]:t==="textarea"}function Lf(e,t,o,r){_f(r),t=Rn(t,"onChange"),0<t.length&&(o=new rl("onChange","change",null,o,r),e.push({event:o,listeners:t}))}var $r=null,fa=null;function oh(e){$f(e,0)}function Jn(e){var t=rr(e);if(pf(t))return e}function rh(e,t){if(e==="change")return t}var Wf=!1;Zt&&(Zt?(rn="oninput"in document,rn||(Ti=document.createElement("div"),Ti.setAttribute("oninput","return;"),rn=typeof Ti.oninput=="function"),on=rn):on=!1,Wf=on&&(!document.documentMode||9<document.documentMode));var on,rn,Ti;function _c(){$r&&($r.detachEvent("onpropertychange",Yf),fa=$r=null)}function Yf(e){if(e.propertyName==="value"&&Jn(fa)){var t=[];Lf(t,fa,e,Js(e)),Cf(oh,t)}}function ah(e,t,o){e==="focusin"?(_c(),$r=t,fa=o,$r.attachEvent("onpropertychange",Yf)):e==="focusout"&&_c()}function nh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Jn(fa)}function ih(e,t){if(e==="click")return Jn(t)}function sh(e,t){if(e==="input"||e==="change")return Jn(t)}function lh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Tt=typeof Object.is=="function"?Object.is:lh;function pa(e,t){if(Tt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var o=Object.keys(e),r=Object.keys(t);if(o.length!==r.length)return!1;for(r=0;r<o.length;r++){var a=o[r];if(!$i.call(t,a)||!Tt(e[a],t[a]))return!1}return!0}function yc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sc(e,t){var o=yc(e);e=0;for(var r;o;){if(o.nodeType===3){if(r=e+o.textContent.length,e<=t&&r>=t)return{node:o,offset:t-e};e=r}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=yc(o)}}function Qf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Qf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hf(){for(var e=window,t=An();t instanceof e.HTMLIFrameElement;){try{var o=typeof t.contentWindow.location.href=="string"}catch{o=!1}if(o)e=t.contentWindow;else break;t=An(e.document)}return t}function il(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function uh(e){var t=Hf(),o=e.focusedElem,r=e.selectionRange;if(t!==o&&o&&o.ownerDocument&&Qf(o.ownerDocument.documentElement,o)){if(r!==null&&il(o)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in o)o.selectionStart=t,o.selectionEnd=Math.min(e,o.value.length);else if(e=(t=o.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=o.textContent.length,n=Math.min(r.start,a);r=r.end===void 0?n:Math.min(r.end,a),!e.extend&&n>r&&(a=r,r=n,n=a),a=Sc(o,n);var i=Sc(o,r);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),n>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=o;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<t.length;o++)e=t[o],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ch=Zt&&"documentMode"in document&&11>=document.documentMode,tr=null,xs=null,ea=null,_s=!1;function wc(e,t,o){var r=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;_s||tr==null||tr!==An(r)||(r=tr,"selectionStart"in r&&il(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ea&&pa(ea,r)||(ea=r,r=Rn(xs,"onSelect"),0<r.length&&(t=new rl("onSelect","select",null,t,o),e.push({event:t,listeners:r}),t.target=tr)))}function an(e,t){var o={};return o[e.toLowerCase()]=t.toLowerCase(),o["Webkit"+e]="webkit"+t,o["Moz"+e]="moz"+t,o}var or={animationend:an("Animation","AnimationEnd"),animationiteration:an("Animation","AnimationIteration"),animationstart:an("Animation","AnimationStart"),transitionend:an("Transition","TransitionEnd")},bi={},jf={};Zt&&(jf=document.createElement("div").style,"AnimationEvent"in window||(delete or.animationend.animation,delete or.animationiteration.animation,delete or.animationstart.animation),"TransitionEvent"in window||delete or.transitionend.transition);function Zn(e){if(bi[e])return bi[e];if(!or[e])return e;var t=or[e],o;for(o in t)if(t.hasOwnProperty(o)&&o in jf)return bi[e]=t[o];return e}var Xf=Zn("animationend"),Kf=Zn("animationiteration"),qf=Zn("animationstart"),Jf=Zn("transitionend"),Zf=new Map,Cc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ko(e,t){Zf.set(e,t),Wo(t,[e])}for(nn=0;nn<Cc.length;nn++)sn=Cc[nn],kc=sn.toLowerCase(),Ac=sn[0].toUpperCase()+sn.slice(1),ko(kc,"on"+Ac);var sn,kc,Ac,nn;ko(Xf,"onAnimationEnd");ko(Kf,"onAnimationIteration");ko(qf,"onAnimationStart");ko("dblclick","onDoubleClick");ko("focusin","onFocus");ko("focusout","onBlur");ko(Jf,"onTransitionEnd");hr("onMouseEnter",["mouseout","mouseover"]);hr("onMouseLeave",["mouseout","mouseover"]);hr("onPointerEnter",["pointerout","pointerover"]);hr("onPointerLeave",["pointerout","pointerover"]);Wo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wo("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Kr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fh=new Set("cancel close invalid load scroll toggle".split(" ").concat(Kr));function Bc(e,t,o){var r=e.type||"unknown-event";e.currentTarget=o,fg(r,t,void 0,e),e.currentTarget=null}function $f(e,t){t=(t&4)!==0;for(var o=0;o<e.length;o++){var r=e[o],a=r.event;r=r.listeners;e:{var n=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,u=s.currentTarget;if(s=s.listener,l!==n&&a.isPropagationStopped())break e;Bc(a,s,u),n=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,u=s.currentTarget,s=s.listener,l!==n&&a.isPropagationStopped())break e;Bc(a,s,u),n=l}}}if(Pn)throw e=ds,Pn=!1,ds=null,e}function te(e,t){var o=t[ks];o===void 0&&(o=t[ks]=new Set);var r=e+"__bubble";o.has(r)||(ep(t,e,2,!1),o.add(r))}function Gi(e,t,o){var r=0;t&&(r|=4),ep(o,e,r,t)}var ln="_reactListening"+Math.random().toString(36).slice(2);function ma(e){if(!e[ln]){e[ln]=!0,sf.forEach(function(o){o!=="selectionchange"&&(fh.has(o)||Gi(o,!1,e),Gi(o,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ln]||(t[ln]=!0,Gi("selectionchange",!1,t))}}function ep(e,t,o,r){switch(Df(t)){case 1:var a=Pg;break;case 4:a=Eg;break;default:a=tl}o=a.bind(null,t,o,e),a=void 0,!ms||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,o,{capture:!0,passive:a}):e.addEventListener(t,o,!0):a!==void 0?e.addEventListener(t,o,{passive:a}):e.addEventListener(t,o,!1)}function Li(e,t,o,r,a){var n=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;i=i.return}for(;s!==null;){if(i=Mo(s),i===null)return;if(l=i.tag,l===5||l===6){r=n=i;continue e}s=s.parentNode}}r=r.return}Cf(function(){var u=n,g=Js(o),m=[];e:{var d=Zf.get(e);if(d!==void 0){var _=rl,y=e;switch(e){case"keypress":if(vn(o)===0)break e;case"keydown":case"keyup":_=Wg;break;case"focusin":y="focus",_=Ni;break;case"focusout":y="blur",_=Ni;break;case"beforeblur":case"afterblur":_=Ni;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=mc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=Ug;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Hg;break;case Xf:case Kf:case qf:_=Ig;break;case Jf:_=Xg;break;case"scroll":_=Fg;break;case"wheel":_=qg;break;case"copy":case"cut":case"paste":_=Og;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=gc}var v=(t&4)!==0,h=!v&&e==="scroll",c=v?d!==null?d+"Capture":null:d;v=[];for(var f=u,p;f!==null;){p=f;var x=p.stateNode;if(p.tag===5&&x!==null&&(p=x,c!==null&&(x=sa(f,c),x!=null&&v.push(da(f,x,p)))),h)break;f=f.return}0<v.length&&(d=new _(d,y,null,o,g),m.push({event:d,listeners:v}))}}if((t&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",d&&o!==fs&&(y=o.relatedTarget||o.fromElement)&&(Mo(y)||y[$t]))break e;if((_||d)&&(d=g.window===g?g:(d=g.ownerDocument)?d.defaultView||d.parentWindow:window,_?(y=o.relatedTarget||o.toElement,_=u,y=y?Mo(y):null,y!==null&&(h=Yo(y),y!==h||y.tag!==5&&y.tag!==6)&&(y=null)):(_=null,y=u),_!==y)){if(v=mc,x="onMouseLeave",c="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(v=gc,x="onPointerLeave",c="onPointerEnter",f="pointer"),h=_==null?d:rr(_),p=y==null?d:rr(y),d=new v(x,f+"leave",_,o,g),d.target=h,d.relatedTarget=p,x=null,Mo(g)===u&&(v=new v(c,f+"enter",y,o,g),v.target=p,v.relatedTarget=h,x=v),h=x,_&&y)t:{for(v=_,c=y,f=0,p=v;p;p=Jo(p))f++;for(p=0,x=c;x;x=Jo(x))p++;for(;0<f-p;)v=Jo(v),f--;for(;0<p-f;)c=Jo(c),p--;for(;f--;){if(v===c||c!==null&&v===c.alternate)break t;v=Jo(v),c=Jo(c)}v=null}else v=null;_!==null&&Pc(m,d,_,v,!1),y!==null&&h!==null&&Pc(m,h,y,v,!0)}}e:{if(d=u?rr(u):window,_=d.nodeName&&d.nodeName.toLowerCase(),_==="select"||_==="input"&&d.type==="file")var S=rh;else if(xc(d))if(Wf)S=sh;else{S=nh;var w=ah}else(_=d.nodeName)&&_.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(S=ih);if(S&&(S=S(e,u))){Lf(m,S,o,g);break e}w&&w(e,d,u),e==="focusout"&&(w=d._wrapperState)&&w.controlled&&d.type==="number"&&is(d,"number",d.value)}switch(w=u?rr(u):window,e){case"focusin":(xc(w)||w.contentEditable==="true")&&(tr=w,xs=u,ea=null);break;case"focusout":ea=xs=tr=null;break;case"mousedown":_s=!0;break;case"contextmenu":case"mouseup":case"dragend":_s=!1,wc(m,o,g);break;case"selectionchange":if(ch)break;case"keydown":case"keyup":wc(m,o,g)}var C;if(nl)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else er?bf(e,o)&&(P="onCompositionEnd"):e==="keydown"&&o.keyCode===229&&(P="onCompositionStart");P&&(Tf&&o.locale!=="ko"&&(er||P!=="onCompositionStart"?P==="onCompositionEnd"&&er&&(C=Nf()):(fo=g,ol="value"in fo?fo.value:fo.textContent,er=!0)),w=Rn(u,P),0<w.length&&(P=new dc(P,e,null,o,g),m.push({event:P,listeners:w}),C?P.data=C:(C=Gf(o),C!==null&&(P.data=C)))),(C=Zg?$g(e,o):eh(e,o))&&(u=Rn(u,"onBeforeInput"),0<u.length&&(g=new dc("onBeforeInput","beforeinput",null,o,g),m.push({event:g,listeners:u}),g.data=C))}$f(m,t)})}function da(e,t,o){return{instance:e,listener:t,currentTarget:o}}function Rn(e,t){for(var o=t+"Capture",r=[];e!==null;){var a=e,n=a.stateNode;a.tag===5&&n!==null&&(a=n,n=sa(e,o),n!=null&&r.unshift(da(e,n,a)),n=sa(e,t),n!=null&&r.push(da(e,n,a))),e=e.return}return r}function Jo(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pc(e,t,o,r,a){for(var n=t._reactName,i=[];o!==null&&o!==r;){var s=o,l=s.alternate,u=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&u!==null&&(s=u,a?(l=sa(o,n),l!=null&&i.unshift(da(o,l,s))):a||(l=sa(o,n),l!=null&&i.push(da(o,l,s)))),o=o.return}i.length!==0&&e.push({event:t,listeners:i})}var ph=/\r\n?/g,mh=/\u0000|\uFFFD/g;function Ec(e){return(typeof e=="string"?e:""+e).replace(ph,`
`).replace(mh,"")}function un(e,t,o){if(t=Ec(t),Ec(e)!==t&&o)throw Error(B(425))}function Mn(){}var ys=null,Ss=null;function ws(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cs=typeof setTimeout=="function"?setTimeout:void 0,dh=typeof clearTimeout=="function"?clearTimeout:void 0,Fc=typeof Promise=="function"?Promise:void 0,gh=typeof queueMicrotask=="function"?queueMicrotask:typeof Fc<"u"?function(e){return Fc.resolve(null).then(e).catch(hh)}:Cs;function hh(e){setTimeout(function(){throw e})}function Wi(e,t){var o=t,r=0;do{var a=o.nextSibling;if(e.removeChild(o),a&&a.nodeType===8)if(o=a.data,o==="/$"){if(r===0){e.removeChild(a),ca(t);return}r--}else o!=="$"&&o!=="$?"&&o!=="$!"||r++;o=a}while(o);ca(t)}function vo(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function zc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var o=e.data;if(o==="$"||o==="$!"||o==="$?"){if(t===0)return e;t--}else o==="/$"&&t++}e=e.previousSibling}return null}var kr=Math.random().toString(36).slice(2),Wt="__reactFiber$"+kr,ga="__reactProps$"+kr,$t="__reactContainer$"+kr,ks="__reactEvents$"+kr,vh="__reactListeners$"+kr,xh="__reactHandles$"+kr;function Mo(e){var t=e[Wt];if(t)return t;for(var o=e.parentNode;o;){if(t=o[$t]||o[Wt]){if(o=t.alternate,t.child!==null||o!==null&&o.child!==null)for(e=zc(e);e!==null;){if(o=e[Wt])return o;e=zc(e)}return t}e=o,o=e.parentNode}return null}function ka(e){return e=e[Wt]||e[$t],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function rr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(B(33))}function $n(e){return e[ga]||null}var As=[],ar=-1;function Ao(e){return{current:e}}function oe(e){0>ar||(e.current=As[ar],As[ar]=null,ar--)}function ee(e,t){ar++,As[ar]=e.current,e.current=t}var Co={},tt=Ao(Co),dt=Ao(!1),No=Co;function vr(e,t){var o=e.type.contextTypes;if(!o)return Co;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},n;for(n in o)a[n]=t[n];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function gt(e){return e=e.childContextTypes,e!=null}function In(){oe(dt),oe(tt)}function Uc(e,t,o){if(tt.current!==Co)throw Error(B(168));ee(tt,t),ee(dt,o)}function tp(e,t,o){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return o;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(B(108,ag(e)||"Unknown",a));return de({},o,r)}function Vn(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Co,No=tt.current,ee(tt,e),ee(dt,dt.current),!0}function Rc(e,t,o){var r=e.stateNode;if(!r)throw Error(B(169));o?(e=tp(e,t,No),r.__reactInternalMemoizedMergedChildContext=e,oe(dt),oe(tt),ee(tt,e)):oe(dt),ee(dt,o)}var Xt=null,ei=!1,Yi=!1;function op(e){Xt===null?Xt=[e]:Xt.push(e)}function _h(e){ei=!0,op(e)}function Bo(){if(!Yi&&Xt!==null){Yi=!0;var e=0,t=K;try{var o=Xt;for(K=1;e<o.length;e++){var r=o[e];do r=r(!0);while(r!==null)}Xt=null,ei=!1}catch(a){throw Xt!==null&&(Xt=Xt.slice(e+1)),Pf(Zs,Bo),a}finally{K=t,Yi=!1}}return null}var nr=[],ir=0,On=null,Dn=0,At=[],Bt=0,To=null,Kt=1,qt="";function Uo(e,t){nr[ir++]=Dn,nr[ir++]=On,On=e,Dn=t}function rp(e,t,o){At[Bt++]=Kt,At[Bt++]=qt,At[Bt++]=To,To=e;var r=Kt;e=qt;var a=32-Dt(r)-1;r&=~(1<<a),o+=1;var n=32-Dt(t)+a;if(30<n){var i=a-a%5;n=(r&(1<<i)-1).toString(32),r>>=i,a-=i,Kt=1<<32-Dt(t)+a|o<<a|r,qt=n+e}else Kt=1<<n|o<<a|r,qt=e}function sl(e){e.return!==null&&(Uo(e,1),rp(e,1,0))}function ll(e){for(;e===On;)On=nr[--ir],nr[ir]=null,Dn=nr[--ir],nr[ir]=null;for(;e===To;)To=At[--Bt],At[Bt]=null,qt=At[--Bt],At[Bt]=null,Kt=At[--Bt],At[Bt]=null}var _t=null,xt=null,ne=!1,Ot=null;function ap(e,t){var o=Pt(5,null,null,0);o.elementType="DELETED",o.stateNode=t,o.return=e,t=e.deletions,t===null?(e.deletions=[o],e.flags|=16):t.push(o)}function Mc(e,t){switch(e.tag){case 5:var o=e.type;return t=t.nodeType!==1||o.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,_t=e,xt=vo(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,_t=e,xt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(o=To!==null?{id:Kt,overflow:qt}:null,e.memoizedState={dehydrated:t,treeContext:o,retryLane:1073741824},o=Pt(18,null,null,0),o.stateNode=t,o.return=e,e.child=o,_t=e,xt=null,!0):!1;default:return!1}}function Bs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ps(e){if(ne){var t=xt;if(t){var o=t;if(!Mc(e,t)){if(Bs(e))throw Error(B(418));t=vo(o.nextSibling);var r=_t;t&&Mc(e,t)?ap(r,o):(e.flags=e.flags&-4097|2,ne=!1,_t=e)}}else{if(Bs(e))throw Error(B(418));e.flags=e.flags&-4097|2,ne=!1,_t=e}}}function Ic(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;_t=e}function cn(e){if(e!==_t)return!1;if(!ne)return Ic(e),ne=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ws(e.type,e.memoizedProps)),t&&(t=xt)){if(Bs(e))throw np(),Error(B(418));for(;t;)ap(e,t),t=vo(t.nextSibling)}if(Ic(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(B(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var o=e.data;if(o==="/$"){if(t===0){xt=vo(e.nextSibling);break e}t--}else o!=="$"&&o!=="$!"&&o!=="$?"||t++}e=e.nextSibling}xt=null}}else xt=_t?vo(e.stateNode.nextSibling):null;return!0}function np(){for(var e=xt;e;)e=vo(e.nextSibling)}function xr(){xt=_t=null,ne=!1}function ul(e){Ot===null?Ot=[e]:Ot.push(e)}var yh=oo.ReactCurrentBatchConfig;function Lr(e,t,o){if(e=o.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(B(309));var r=o.stateNode}if(!r)throw Error(B(147,e));var a=r,n=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===n?t.ref:(t=function(i){var s=a.refs;i===null?delete s[n]:s[n]=i},t._stringRef=n,t)}if(typeof e!="string")throw Error(B(284));if(!o._owner)throw Error(B(290,e))}return e}function fn(e,t){throw e=Object.prototype.toString.call(t),Error(B(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Vc(e){var t=e._init;return t(e._payload)}function ip(e){function t(c,f){if(e){var p=c.deletions;p===null?(c.deletions=[f],c.flags|=16):p.push(f)}}function o(c,f){if(!e)return null;for(;f!==null;)t(c,f),f=f.sibling;return null}function r(c,f){for(c=new Map;f!==null;)f.key!==null?c.set(f.key,f):c.set(f.index,f),f=f.sibling;return c}function a(c,f){return c=So(c,f),c.index=0,c.sibling=null,c}function n(c,f,p){return c.index=p,e?(p=c.alternate,p!==null?(p=p.index,p<f?(c.flags|=2,f):p):(c.flags|=2,f)):(c.flags|=1048576,f)}function i(c){return e&&c.alternate===null&&(c.flags|=2),c}function s(c,f,p,x){return f===null||f.tag!==6?(f=Ji(p,c.mode,x),f.return=c,f):(f=a(f,p),f.return=c,f)}function l(c,f,p,x){var S=p.type;return S===$o?g(c,f,p.props.children,x,p.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===so&&Vc(S)===f.type)?(x=a(f,p.props),x.ref=Lr(c,f,p),x.return=c,x):(x=kn(p.type,p.key,p.props,null,c.mode,x),x.ref=Lr(c,f,p),x.return=c,x)}function u(c,f,p,x){return f===null||f.tag!==4||f.stateNode.containerInfo!==p.containerInfo||f.stateNode.implementation!==p.implementation?(f=Zi(p,c.mode,x),f.return=c,f):(f=a(f,p.children||[]),f.return=c,f)}function g(c,f,p,x,S){return f===null||f.tag!==7?(f=Do(p,c.mode,x,S),f.return=c,f):(f=a(f,p),f.return=c,f)}function m(c,f,p){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Ji(""+f,c.mode,p),f.return=c,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ka:return p=kn(f.type,f.key,f.props,null,c.mode,p),p.ref=Lr(c,null,f),p.return=c,p;case Zo:return f=Zi(f,c.mode,p),f.return=c,f;case so:var x=f._init;return m(c,x(f._payload),p)}if(jr(f)||Nr(f))return f=Do(f,c.mode,p,null),f.return=c,f;fn(c,f)}return null}function d(c,f,p,x){var S=f!==null?f.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(c,f,""+p,x);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ka:return p.key===S?l(c,f,p,x):null;case Zo:return p.key===S?u(c,f,p,x):null;case so:return S=p._init,d(c,f,S(p._payload),x)}if(jr(p)||Nr(p))return S!==null?null:g(c,f,p,x,null);fn(c,p)}return null}function _(c,f,p,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return c=c.get(p)||null,s(f,c,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ka:return c=c.get(x.key===null?p:x.key)||null,l(f,c,x,S);case Zo:return c=c.get(x.key===null?p:x.key)||null,u(f,c,x,S);case so:var w=x._init;return _(c,f,p,w(x._payload),S)}if(jr(x)||Nr(x))return c=c.get(p)||null,g(f,c,x,S,null);fn(f,x)}return null}function y(c,f,p,x){for(var S=null,w=null,C=f,P=f=0,I=null;C!==null&&P<p.length;P++){C.index>P?(I=C,C=null):I=C.sibling;var E=d(c,C,p[P],x);if(E===null){C===null&&(C=I);break}e&&C&&E.alternate===null&&t(c,C),f=n(E,f,P),w===null?S=E:w.sibling=E,w=E,C=I}if(P===p.length)return o(c,C),ne&&Uo(c,P),S;if(C===null){for(;P<p.length;P++)C=m(c,p[P],x),C!==null&&(f=n(C,f,P),w===null?S=C:w.sibling=C,w=C);return ne&&Uo(c,P),S}for(C=r(c,C);P<p.length;P++)I=_(C,c,P,p[P],x),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?P:I.key),f=n(I,f,P),w===null?S=I:w.sibling=I,w=I);return e&&C.forEach(function(D){return t(c,D)}),ne&&Uo(c,P),S}function v(c,f,p,x){var S=Nr(p);if(typeof S!="function")throw Error(B(150));if(p=S.call(p),p==null)throw Error(B(151));for(var w=S=null,C=f,P=f=0,I=null,E=p.next();C!==null&&!E.done;P++,E=p.next()){C.index>P?(I=C,C=null):I=C.sibling;var D=d(c,C,E.value,x);if(D===null){C===null&&(C=I);break}e&&C&&D.alternate===null&&t(c,C),f=n(D,f,P),w===null?S=D:w.sibling=D,w=D,C=I}if(E.done)return o(c,C),ne&&Uo(c,P),S;if(C===null){for(;!E.done;P++,E=p.next())E=m(c,E.value,x),E!==null&&(f=n(E,f,P),w===null?S=E:w.sibling=E,w=E);return ne&&Uo(c,P),S}for(C=r(c,C);!E.done;P++,E=p.next())E=_(C,c,P,E.value,x),E!==null&&(e&&E.alternate!==null&&C.delete(E.key===null?P:E.key),f=n(E,f,P),w===null?S=E:w.sibling=E,w=E);return e&&C.forEach(function(b){return t(c,b)}),ne&&Uo(c,P),S}function h(c,f,p,x){if(typeof p=="object"&&p!==null&&p.type===$o&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Ka:e:{for(var S=p.key,w=f;w!==null;){if(w.key===S){if(S=p.type,S===$o){if(w.tag===7){o(c,w.sibling),f=a(w,p.props.children),f.return=c,c=f;break e}}else if(w.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===so&&Vc(S)===w.type){o(c,w.sibling),f=a(w,p.props),f.ref=Lr(c,w,p),f.return=c,c=f;break e}o(c,w);break}else t(c,w);w=w.sibling}p.type===$o?(f=Do(p.props.children,c.mode,x,p.key),f.return=c,c=f):(x=kn(p.type,p.key,p.props,null,c.mode,x),x.ref=Lr(c,f,p),x.return=c,c=x)}return i(c);case Zo:e:{for(w=p.key;f!==null;){if(f.key===w)if(f.tag===4&&f.stateNode.containerInfo===p.containerInfo&&f.stateNode.implementation===p.implementation){o(c,f.sibling),f=a(f,p.children||[]),f.return=c,c=f;break e}else{o(c,f);break}else t(c,f);f=f.sibling}f=Zi(p,c.mode,x),f.return=c,c=f}return i(c);case so:return w=p._init,h(c,f,w(p._payload),x)}if(jr(p))return y(c,f,p,x);if(Nr(p))return v(c,f,p,x);fn(c,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,f!==null&&f.tag===6?(o(c,f.sibling),f=a(f,p),f.return=c,c=f):(o(c,f),f=Ji(p,c.mode,x),f.return=c,c=f),i(c)):o(c,f)}return h}var _r=ip(!0),sp=ip(!1),Nn=Ao(null),Tn=null,sr=null,cl=null;function fl(){cl=sr=Tn=null}function pl(e){var t=Nn.current;oe(Nn),e._currentValue=t}function Es(e,t,o){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===o)break;e=e.return}}function dr(e,t){Tn=e,cl=sr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(mt=!0),e.firstContext=null)}function Ft(e){var t=e._currentValue;if(cl!==e)if(e={context:e,memoizedValue:t,next:null},sr===null){if(Tn===null)throw Error(B(308));sr=e,Tn.dependencies={lanes:0,firstContext:e}}else sr=sr.next=e;return t}var Io=null;function ml(e){Io===null?Io=[e]:Io.push(e)}function lp(e,t,o,r){var a=t.interleaved;return a===null?(o.next=o,ml(t)):(o.next=a.next,a.next=o),t.interleaved=o,eo(e,r)}function eo(e,t){e.lanes|=t;var o=e.alternate;for(o!==null&&(o.lanes|=t),o=e,e=e.return;e!==null;)e.childLanes|=t,o=e.alternate,o!==null&&(o.childLanes|=t),o=e,e=e.return;return o.tag===3?o.stateNode:null}var lo=!1;function dl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function up(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Jt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function xo(e,t,o){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Y&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,eo(e,o)}return a=r.interleaved,a===null?(t.next=t,ml(r)):(t.next=a.next,a.next=t),r.interleaved=t,eo(e,o)}function xn(e,t,o){if(t=t.updateQueue,t!==null&&(t=t.shared,(o&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,o|=r,t.lanes=o,$s(e,o)}}function Oc(e,t){var o=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,o===r)){var a=null,n=null;if(o=o.firstBaseUpdate,o!==null){do{var i={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};n===null?a=n=i:n=n.next=i,o=o.next}while(o!==null);n===null?a=n=t:n=n.next=t}else a=n=t;o={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:n,shared:r.shared,effects:r.effects},e.updateQueue=o;return}e=o.lastBaseUpdate,e===null?o.firstBaseUpdate=t:e.next=t,o.lastBaseUpdate=t}function bn(e,t,o,r){var a=e.updateQueue;lo=!1;var n=a.firstBaseUpdate,i=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var l=s,u=l.next;l.next=null,i===null?n=u:i.next=u,i=l;var g=e.alternate;g!==null&&(g=g.updateQueue,s=g.lastBaseUpdate,s!==i&&(s===null?g.firstBaseUpdate=u:s.next=u,g.lastBaseUpdate=l))}if(n!==null){var m=a.baseState;i=0,g=u=l=null,s=n;do{var d=s.lane,_=s.eventTime;if((r&d)===d){g!==null&&(g=g.next={eventTime:_,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,v=s;switch(d=t,_=o,v.tag){case 1:if(y=v.payload,typeof y=="function"){m=y.call(_,m,d);break e}m=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,d=typeof y=="function"?y.call(_,m,d):y,d==null)break e;m=de({},m,d);break e;case 2:lo=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,d=a.effects,d===null?a.effects=[s]:d.push(s))}else _={eventTime:_,lane:d,tag:s.tag,payload:s.payload,callback:s.callback,next:null},g===null?(u=g=_,l=m):g=g.next=_,i|=d;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;d=s,s=d.next,d.next=null,a.lastBaseUpdate=d,a.shared.pending=null}}while(!0);if(g===null&&(l=m),a.baseState=l,a.firstBaseUpdate=u,a.lastBaseUpdate=g,t=a.shared.interleaved,t!==null){a=t;do i|=a.lane,a=a.next;while(a!==t)}else n===null&&(a.shared.lanes=0);Go|=i,e.lanes=i,e.memoizedState=m}}function Dc(e,t,o){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=o,typeof a!="function")throw Error(B(191,a));a.call(r)}}}var Aa={},Qt=Ao(Aa),ha=Ao(Aa),va=Ao(Aa);function Vo(e){if(e===Aa)throw Error(B(174));return e}function gl(e,t){switch(ee(va,t),ee(ha,e),ee(Qt,Aa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ls(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ls(t,e)}oe(Qt),ee(Qt,t)}function yr(){oe(Qt),oe(ha),oe(va)}function cp(e){Vo(va.current);var t=Vo(Qt.current),o=ls(t,e.type);t!==o&&(ee(ha,e),ee(Qt,o))}function hl(e){ha.current===e&&(oe(Qt),oe(ha))}var pe=Ao(0);function Gn(e){for(var t=e;t!==null;){if(t.tag===13){var o=t.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Qi=[];function vl(){for(var e=0;e<Qi.length;e++)Qi[e]._workInProgressVersionPrimary=null;Qi.length=0}var _n=oo.ReactCurrentDispatcher,Hi=oo.ReactCurrentBatchConfig,bo=0,me=null,Re=null,Ne=null,Ln=!1,ta=!1,xa=0,Sh=0;function Ze(){throw Error(B(321))}function xl(e,t){if(t===null)return!1;for(var o=0;o<t.length&&o<e.length;o++)if(!Tt(e[o],t[o]))return!1;return!0}function _l(e,t,o,r,a,n){if(bo=n,me=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,_n.current=e===null||e.memoizedState===null?Ah:Bh,e=o(r,a),ta){n=0;do{if(ta=!1,xa=0,25<=n)throw Error(B(301));n+=1,Ne=Re=null,t.updateQueue=null,_n.current=Ph,e=o(r,a)}while(ta)}if(_n.current=Wn,t=Re!==null&&Re.next!==null,bo=0,Ne=Re=me=null,Ln=!1,t)throw Error(B(300));return e}function yl(){var e=xa!==0;return xa=0,e}function Lt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?me.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function zt(){if(Re===null){var e=me.alternate;e=e!==null?e.memoizedState:null}else e=Re.next;var t=Ne===null?me.memoizedState:Ne.next;if(t!==null)Ne=t,Re=e;else{if(e===null)throw Error(B(310));Re=e,e={memoizedState:Re.memoizedState,baseState:Re.baseState,baseQueue:Re.baseQueue,queue:Re.queue,next:null},Ne===null?me.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function _a(e,t){return typeof t=="function"?t(e):t}function ji(e){var t=zt(),o=t.queue;if(o===null)throw Error(B(311));o.lastRenderedReducer=e;var r=Re,a=r.baseQueue,n=o.pending;if(n!==null){if(a!==null){var i=a.next;a.next=n.next,n.next=i}r.baseQueue=a=n,o.pending=null}if(a!==null){n=a.next,r=r.baseState;var s=i=null,l=null,u=n;do{var g=u.lane;if((bo&g)===g)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:g,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(s=l=m,i=r):l=l.next=m,me.lanes|=g,Go|=g}u=u.next}while(u!==null&&u!==n);l===null?i=r:l.next=s,Tt(r,t.memoizedState)||(mt=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=l,o.lastRenderedState=r}if(e=o.interleaved,e!==null){a=e;do n=a.lane,me.lanes|=n,Go|=n,a=a.next;while(a!==e)}else a===null&&(o.lanes=0);return[t.memoizedState,o.dispatch]}function Xi(e){var t=zt(),o=t.queue;if(o===null)throw Error(B(311));o.lastRenderedReducer=e;var r=o.dispatch,a=o.pending,n=t.memoizedState;if(a!==null){o.pending=null;var i=a=a.next;do n=e(n,i.action),i=i.next;while(i!==a);Tt(n,t.memoizedState)||(mt=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),o.lastRenderedState=n}return[n,r]}function fp(){}function pp(e,t){var o=me,r=zt(),a=t(),n=!Tt(r.memoizedState,a);if(n&&(r.memoizedState=a,mt=!0),r=r.queue,Sl(gp.bind(null,o,r,e),[e]),r.getSnapshot!==t||n||Ne!==null&&Ne.memoizedState.tag&1){if(o.flags|=2048,ya(9,dp.bind(null,o,r,a,t),void 0,null),Te===null)throw Error(B(349));(bo&30)!==0||mp(o,t,a)}return a}function mp(e,t,o){e.flags|=16384,e={getSnapshot:t,value:o},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.stores=[e]):(o=t.stores,o===null?t.stores=[e]:o.push(e))}function dp(e,t,o,r){t.value=o,t.getSnapshot=r,hp(t)&&vp(e)}function gp(e,t,o){return o(function(){hp(t)&&vp(e)})}function hp(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!Tt(e,o)}catch{return!0}}function vp(e){var t=eo(e,1);t!==null&&Nt(t,e,1,-1)}function Nc(e){var t=Lt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_a,lastRenderedState:e},t.queue=e,e=e.dispatch=kh.bind(null,me,e),[t.memoizedState,e]}function ya(e,t,o,r){return e={tag:e,create:t,destroy:o,deps:r,next:null},t=me.updateQueue,t===null?(t={lastEffect:null,stores:null},me.updateQueue=t,t.lastEffect=e.next=e):(o=t.lastEffect,o===null?t.lastEffect=e.next=e:(r=o.next,o.next=e,e.next=r,t.lastEffect=e)),e}function xp(){return zt().memoizedState}function yn(e,t,o,r){var a=Lt();me.flags|=e,a.memoizedState=ya(1|t,o,void 0,r===void 0?null:r)}function ti(e,t,o,r){var a=zt();r=r===void 0?null:r;var n=void 0;if(Re!==null){var i=Re.memoizedState;if(n=i.destroy,r!==null&&xl(r,i.deps)){a.memoizedState=ya(t,o,n,r);return}}me.flags|=e,a.memoizedState=ya(1|t,o,n,r)}function Tc(e,t){return yn(8390656,8,e,t)}function Sl(e,t){return ti(2048,8,e,t)}function _p(e,t){return ti(4,2,e,t)}function yp(e,t){return ti(4,4,e,t)}function Sp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function wp(e,t,o){return o=o!=null?o.concat([e]):null,ti(4,4,Sp.bind(null,t,e),o)}function wl(){}function Cp(e,t){var o=zt();t=t===void 0?null:t;var r=o.memoizedState;return r!==null&&t!==null&&xl(t,r[1])?r[0]:(o.memoizedState=[e,t],e)}function kp(e,t){var o=zt();t=t===void 0?null:t;var r=o.memoizedState;return r!==null&&t!==null&&xl(t,r[1])?r[0]:(e=e(),o.memoizedState=[e,t],e)}function Ap(e,t,o){return(bo&21)===0?(e.baseState&&(e.baseState=!1,mt=!0),e.memoizedState=o):(Tt(o,t)||(o=zf(),me.lanes|=o,Go|=o,e.baseState=!0),t)}function wh(e,t){var o=K;K=o!==0&&4>o?o:4,e(!0);var r=Hi.transition;Hi.transition={};try{e(!1),t()}finally{K=o,Hi.transition=r}}function Bp(){return zt().memoizedState}function Ch(e,t,o){var r=yo(e);if(o={lane:r,action:o,hasEagerState:!1,eagerState:null,next:null},Pp(e))Ep(t,o);else if(o=lp(e,t,o,r),o!==null){var a=lt();Nt(o,e,r,a),Fp(o,t,r)}}function kh(e,t,o){var r=yo(e),a={lane:r,action:o,hasEagerState:!1,eagerState:null,next:null};if(Pp(e))Ep(t,a);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var i=t.lastRenderedState,s=n(i,o);if(a.hasEagerState=!0,a.eagerState=s,Tt(s,i)){var l=t.interleaved;l===null?(a.next=a,ml(t)):(a.next=l.next,l.next=a),t.interleaved=a;return}}catch{}o=lp(e,t,a,r),o!==null&&(a=lt(),Nt(o,e,r,a),Fp(o,t,r))}}function Pp(e){var t=e.alternate;return e===me||t!==null&&t===me}function Ep(e,t){ta=Ln=!0;var o=e.pending;o===null?t.next=t:(t.next=o.next,o.next=t),e.pending=t}function Fp(e,t,o){if((o&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,o|=r,t.lanes=o,$s(e,o)}}var Wn={readContext:Ft,useCallback:Ze,useContext:Ze,useEffect:Ze,useImperativeHandle:Ze,useInsertionEffect:Ze,useLayoutEffect:Ze,useMemo:Ze,useReducer:Ze,useRef:Ze,useState:Ze,useDebugValue:Ze,useDeferredValue:Ze,useTransition:Ze,useMutableSource:Ze,useSyncExternalStore:Ze,useId:Ze,unstable_isNewReconciler:!1},Ah={readContext:Ft,useCallback:function(e,t){return Lt().memoizedState=[e,t===void 0?null:t],e},useContext:Ft,useEffect:Tc,useImperativeHandle:function(e,t,o){return o=o!=null?o.concat([e]):null,yn(4194308,4,Sp.bind(null,t,e),o)},useLayoutEffect:function(e,t){return yn(4194308,4,e,t)},useInsertionEffect:function(e,t){return yn(4,2,e,t)},useMemo:function(e,t){var o=Lt();return t=t===void 0?null:t,e=e(),o.memoizedState=[e,t],e},useReducer:function(e,t,o){var r=Lt();return t=o!==void 0?o(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ch.bind(null,me,e),[r.memoizedState,e]},useRef:function(e){var t=Lt();return e={current:e},t.memoizedState=e},useState:Nc,useDebugValue:wl,useDeferredValue:function(e){return Lt().memoizedState=e},useTransition:function(){var e=Nc(!1),t=e[0];return e=wh.bind(null,e[1]),Lt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,o){var r=me,a=Lt();if(ne){if(o===void 0)throw Error(B(407));o=o()}else{if(o=t(),Te===null)throw Error(B(349));(bo&30)!==0||mp(r,t,o)}a.memoizedState=o;var n={value:o,getSnapshot:t};return a.queue=n,Tc(gp.bind(null,r,n,e),[e]),r.flags|=2048,ya(9,dp.bind(null,r,n,o,t),void 0,null),o},useId:function(){var e=Lt(),t=Te.identifierPrefix;if(ne){var o=qt,r=Kt;o=(r&~(1<<32-Dt(r)-1)).toString(32)+o,t=":"+t+"R"+o,o=xa++,0<o&&(t+="H"+o.toString(32)),t+=":"}else o=Sh++,t=":"+t+"r"+o.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Bh={readContext:Ft,useCallback:Cp,useContext:Ft,useEffect:Sl,useImperativeHandle:wp,useInsertionEffect:_p,useLayoutEffect:yp,useMemo:kp,useReducer:ji,useRef:xp,useState:function(){return ji(_a)},useDebugValue:wl,useDeferredValue:function(e){var t=zt();return Ap(t,Re.memoizedState,e)},useTransition:function(){var e=ji(_a)[0],t=zt().memoizedState;return[e,t]},useMutableSource:fp,useSyncExternalStore:pp,useId:Bp,unstable_isNewReconciler:!1},Ph={readContext:Ft,useCallback:Cp,useContext:Ft,useEffect:Sl,useImperativeHandle:wp,useInsertionEffect:_p,useLayoutEffect:yp,useMemo:kp,useReducer:Xi,useRef:xp,useState:function(){return Xi(_a)},useDebugValue:wl,useDeferredValue:function(e){var t=zt();return Re===null?t.memoizedState=e:Ap(t,Re.memoizedState,e)},useTransition:function(){var e=Xi(_a)[0],t=zt().memoizedState;return[e,t]},useMutableSource:fp,useSyncExternalStore:pp,useId:Bp,unstable_isNewReconciler:!1};function It(e,t){if(e&&e.defaultProps){t=de({},t),e=e.defaultProps;for(var o in e)t[o]===void 0&&(t[o]=e[o]);return t}return t}function Fs(e,t,o,r){t=e.memoizedState,o=o(r,t),o=o==null?t:de({},t,o),e.memoizedState=o,e.lanes===0&&(e.updateQueue.baseState=o)}var oi={isMounted:function(e){return(e=e._reactInternals)?Yo(e)===e:!1},enqueueSetState:function(e,t,o){e=e._reactInternals;var r=lt(),a=yo(e),n=Jt(r,a);n.payload=t,o!=null&&(n.callback=o),t=xo(e,n,a),t!==null&&(Nt(t,e,a,r),xn(t,e,a))},enqueueReplaceState:function(e,t,o){e=e._reactInternals;var r=lt(),a=yo(e),n=Jt(r,a);n.tag=1,n.payload=t,o!=null&&(n.callback=o),t=xo(e,n,a),t!==null&&(Nt(t,e,a,r),xn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var o=lt(),r=yo(e),a=Jt(o,r);a.tag=2,t!=null&&(a.callback=t),t=xo(e,a,r),t!==null&&(Nt(t,e,r,o),xn(t,e,r))}};function bc(e,t,o,r,a,n,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,n,i):t.prototype&&t.prototype.isPureReactComponent?!pa(o,r)||!pa(a,n):!0}function zp(e,t,o){var r=!1,a=Co,n=t.contextType;return typeof n=="object"&&n!==null?n=Ft(n):(a=gt(t)?No:tt.current,r=t.contextTypes,n=(r=r!=null)?vr(e,a):Co),t=new t(o,n),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=oi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=n),t}function Gc(e,t,o,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(o,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(o,r),t.state!==e&&oi.enqueueReplaceState(t,t.state,null)}function zs(e,t,o,r){var a=e.stateNode;a.props=o,a.state=e.memoizedState,a.refs={},dl(e);var n=t.contextType;typeof n=="object"&&n!==null?a.context=Ft(n):(n=gt(t)?No:tt.current,a.context=vr(e,n)),a.state=e.memoizedState,n=t.getDerivedStateFromProps,typeof n=="function"&&(Fs(e,t,n,o),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&oi.enqueueReplaceState(a,a.state,null),bn(e,o,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Sr(e,t){try{var o="",r=t;do o+=rg(r),r=r.return;while(r);var a=o}catch(n){a=`
Error generating stack: `+n.message+`
`+n.stack}return{value:e,source:t,stack:a,digest:null}}function Ki(e,t,o){return{value:e,source:null,stack:o??null,digest:t??null}}function Us(e,t){try{console.error(t.value)}catch(o){setTimeout(function(){throw o})}}var Eh=typeof WeakMap=="function"?WeakMap:Map;function Up(e,t,o){o=Jt(-1,o),o.tag=3,o.payload={element:null};var r=t.value;return o.callback=function(){Qn||(Qn=!0,Gs=r),Us(e,t)},o}function Rp(e,t,o){o=Jt(-1,o),o.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;o.payload=function(){return r(a)},o.callback=function(){Us(e,t)}}var n=e.stateNode;return n!==null&&typeof n.componentDidCatch=="function"&&(o.callback=function(){Us(e,t),typeof r!="function"&&(_o===null?_o=new Set([this]):_o.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),o}function Lc(e,t,o){var r=e.pingCache;if(r===null){r=e.pingCache=new Eh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(o)||(a.add(o),e=Lh.bind(null,e,t,o),t.then(e,e))}function Wc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yc(e,t,o,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(t=Jt(-1,1),t.tag=2,xo(o,t,1))),o.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var Fh=oo.ReactCurrentOwner,mt=!1;function st(e,t,o,r){t.child=e===null?sp(t,null,o,r):_r(t,e.child,o,r)}function Qc(e,t,o,r,a){o=o.render;var n=t.ref;return dr(t,a),r=_l(e,t,o,r,n,a),o=yl(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,to(e,t,a)):(ne&&o&&sl(t),t.flags|=1,st(e,t,r,a),t.child)}function Hc(e,t,o,r,a){if(e===null){var n=o.type;return typeof n=="function"&&!zl(n)&&n.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(t.tag=15,t.type=n,Mp(e,t,n,r,a)):(e=kn(o.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,(e.lanes&a)===0){var i=n.memoizedProps;if(o=o.compare,o=o!==null?o:pa,o(i,r)&&e.ref===t.ref)return to(e,t,a)}return t.flags|=1,e=So(n,r),e.ref=t.ref,e.return=t,t.child=e}function Mp(e,t,o,r,a){if(e!==null){var n=e.memoizedProps;if(pa(n,r)&&e.ref===t.ref)if(mt=!1,t.pendingProps=r=n,(e.lanes&a)!==0)(e.flags&131072)!==0&&(mt=!0);else return t.lanes=e.lanes,to(e,t,a)}return Rs(e,t,o,r,a)}function Ip(e,t,o){var r=t.pendingProps,a=r.children,n=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ee(ur,vt),vt|=o;else{if((o&1073741824)===0)return e=n!==null?n.baseLanes|o:o,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ee(ur,vt),vt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=n!==null?n.baseLanes:o,ee(ur,vt),vt|=r}else n!==null?(r=n.baseLanes|o,t.memoizedState=null):r=o,ee(ur,vt),vt|=r;return st(e,t,a,o),t.child}function Vp(e,t){var o=t.ref;(e===null&&o!==null||e!==null&&e.ref!==o)&&(t.flags|=512,t.flags|=2097152)}function Rs(e,t,o,r,a){var n=gt(o)?No:tt.current;return n=vr(t,n),dr(t,a),o=_l(e,t,o,r,n,a),r=yl(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,to(e,t,a)):(ne&&r&&sl(t),t.flags|=1,st(e,t,o,a),t.child)}function jc(e,t,o,r,a){if(gt(o)){var n=!0;Vn(t)}else n=!1;if(dr(t,a),t.stateNode===null)Sn(e,t),zp(t,o,r),zs(t,o,r,a),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var l=i.context,u=o.contextType;typeof u=="object"&&u!==null?u=Ft(u):(u=gt(o)?No:tt.current,u=vr(t,u));var g=o.getDerivedStateFromProps,m=typeof g=="function"||typeof i.getSnapshotBeforeUpdate=="function";m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==u)&&Gc(t,i,r,u),lo=!1;var d=t.memoizedState;i.state=d,bn(t,r,i,a),l=t.memoizedState,s!==r||d!==l||dt.current||lo?(typeof g=="function"&&(Fs(t,o,g,r),l=t.memoizedState),(s=lo||bc(t,o,s,r,d,l,u))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),i.props=r,i.state=l,i.context=u,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,up(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:It(t.type,s),i.props=u,m=t.pendingProps,d=i.context,l=o.contextType,typeof l=="object"&&l!==null?l=Ft(l):(l=gt(o)?No:tt.current,l=vr(t,l));var _=o.getDerivedStateFromProps;(g=typeof _=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==m||d!==l)&&Gc(t,i,r,l),lo=!1,d=t.memoizedState,i.state=d,bn(t,r,i,a);var y=t.memoizedState;s!==m||d!==y||dt.current||lo?(typeof _=="function"&&(Fs(t,o,_,r),y=t.memoizedState),(u=lo||bc(t,o,u,r,d,y,l)||!1)?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,y,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,y,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),i.props=r,i.state=y,i.context=l,r=u):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return Ms(e,t,o,r,n,a)}function Ms(e,t,o,r,a,n){Vp(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return a&&Rc(t,o,!1),to(e,t,n);r=t.stateNode,Fh.current=t;var s=i&&typeof o.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=_r(t,e.child,null,n),t.child=_r(t,null,s,n)):st(e,t,s,n),t.memoizedState=r.state,a&&Rc(t,o,!0),t.child}function Op(e){var t=e.stateNode;t.pendingContext?Uc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Uc(e,t.context,!1),gl(e,t.containerInfo)}function Xc(e,t,o,r,a){return xr(),ul(a),t.flags|=256,st(e,t,o,r),t.child}var Is={dehydrated:null,treeContext:null,retryLane:0};function Vs(e){return{baseLanes:e,cachePool:null,transitions:null}}function Dp(e,t,o){var r=t.pendingProps,a=pe.current,n=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(n=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),ee(pe,a&1),e===null)return Ps(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(i=r.children,e=r.fallback,n?(r=t.mode,n=t.child,i={mode:"hidden",children:i},(r&1)===0&&n!==null?(n.childLanes=0,n.pendingProps=i):n=ni(i,r,0,null),e=Do(e,r,o,null),n.return=t,e.return=t,n.sibling=e,t.child=n,t.child.memoizedState=Vs(o),t.memoizedState=Is,e):Cl(t,i));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return zh(e,t,i,r,s,a,o);if(n){n=r.fallback,i=t.mode,a=e.child,s=a.sibling;var l={mode:"hidden",children:r.children};return(i&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=So(a,l),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?n=So(s,n):(n=Do(n,i,o,null),n.flags|=2),n.return=t,r.return=t,r.sibling=n,t.child=r,r=n,n=t.child,i=e.child.memoizedState,i=i===null?Vs(o):{baseLanes:i.baseLanes|o,cachePool:null,transitions:i.transitions},n.memoizedState=i,n.childLanes=e.childLanes&~o,t.memoizedState=Is,r}return n=e.child,e=n.sibling,r=So(n,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=o),r.return=t,r.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=r,t.memoizedState=null,r}function Cl(e,t){return t=ni({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function pn(e,t,o,r){return r!==null&&ul(r),_r(t,e.child,null,o),e=Cl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function zh(e,t,o,r,a,n,i){if(o)return t.flags&256?(t.flags&=-257,r=Ki(Error(B(422))),pn(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(n=r.fallback,a=t.mode,r=ni({mode:"visible",children:r.children},a,0,null),n=Do(n,a,i,null),n.flags|=2,r.return=t,n.return=t,r.sibling=n,t.child=r,(t.mode&1)!==0&&_r(t,e.child,null,i),t.child.memoizedState=Vs(i),t.memoizedState=Is,n);if((t.mode&1)===0)return pn(e,t,i,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,n=Error(B(419)),r=Ki(n,r,void 0),pn(e,t,i,r)}if(s=(i&e.childLanes)!==0,mt||s){if(r=Te,r!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|i))!==0?0:a,a!==0&&a!==n.retryLane&&(n.retryLane=a,eo(e,a),Nt(r,e,a,-1))}return Fl(),r=Ki(Error(B(421))),pn(e,t,i,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Wh.bind(null,e),a._reactRetry=t,null):(e=n.treeContext,xt=vo(a.nextSibling),_t=t,ne=!0,Ot=null,e!==null&&(At[Bt++]=Kt,At[Bt++]=qt,At[Bt++]=To,Kt=e.id,qt=e.overflow,To=t),t=Cl(t,r.children),t.flags|=4096,t)}function Kc(e,t,o){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Es(e.return,t,o)}function qi(e,t,o,r,a){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:o,tailMode:a}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=r,n.tail=o,n.tailMode=a)}function Np(e,t,o){var r=t.pendingProps,a=r.revealOrder,n=r.tail;if(st(e,t,r.children,o),r=pe.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Kc(e,o,t);else if(e.tag===19)Kc(e,o,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ee(pe,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(o=t.child,a=null;o!==null;)e=o.alternate,e!==null&&Gn(e)===null&&(a=o),o=o.sibling;o=a,o===null?(a=t.child,t.child=null):(a=o.sibling,o.sibling=null),qi(t,!1,a,o,n);break;case"backwards":for(o=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Gn(e)===null){t.child=a;break}e=a.sibling,a.sibling=o,o=a,a=e}qi(t,!0,o,null,n);break;case"together":qi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Sn(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function to(e,t,o){if(e!==null&&(t.dependencies=e.dependencies),Go|=t.lanes,(o&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(B(153));if(t.child!==null){for(e=t.child,o=So(e,e.pendingProps),t.child=o,o.return=t;e.sibling!==null;)e=e.sibling,o=o.sibling=So(e,e.pendingProps),o.return=t;o.sibling=null}return t.child}function Uh(e,t,o){switch(t.tag){case 3:Op(t),xr();break;case 5:cp(t);break;case 1:gt(t.type)&&Vn(t);break;case 4:gl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;ee(Nn,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ee(pe,pe.current&1),t.flags|=128,null):(o&t.child.childLanes)!==0?Dp(e,t,o):(ee(pe,pe.current&1),e=to(e,t,o),e!==null?e.sibling:null);ee(pe,pe.current&1);break;case 19:if(r=(o&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Np(e,t,o);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ee(pe,pe.current),r)break;return null;case 22:case 23:return t.lanes=0,Ip(e,t,o)}return to(e,t,o)}var Tp,Os,bp,Gp;Tp=function(e,t){for(var o=t.child;o!==null;){if(o.tag===5||o.tag===6)e.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break;for(;o.sibling===null;){if(o.return===null||o.return===t)return;o=o.return}o.sibling.return=o.return,o=o.sibling}};Os=function(){};bp=function(e,t,o,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Vo(Qt.current);var n=null;switch(o){case"input":a=as(e,a),r=as(e,r),n=[];break;case"select":a=de({},a,{value:void 0}),r=de({},r,{value:void 0}),n=[];break;case"textarea":a=ss(e,a),r=ss(e,r),n=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Mn)}us(o,r);var i;o=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var s=a[u];for(i in s)s.hasOwnProperty(i)&&(o||(o={}),o[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(na.hasOwnProperty(u)?n||(n=[]):(n=n||[]).push(u,null));for(u in r){var l=r[u];if(s=a?.[u],r.hasOwnProperty(u)&&l!==s&&(l!=null||s!=null))if(u==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(o||(o={}),o[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(o||(o={}),o[i]=l[i])}else o||(n||(n=[]),n.push(u,o)),o=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(n=n||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(n=n||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(na.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&te("scroll",e),n||s===l||(n=[])):(n=n||[]).push(u,l))}o&&(n=n||[]).push("style",o);var u=n;(t.updateQueue=u)&&(t.flags|=4)}};Gp=function(e,t,o,r){o!==r&&(t.flags|=4)};function Wr(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var o=null;t!==null;)t.alternate!==null&&(o=t),t=t.sibling;o===null?e.tail=null:o.sibling=null;break;case"collapsed":o=e.tail;for(var r=null;o!==null;)o.alternate!==null&&(r=o),o=o.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function $e(e){var t=e.alternate!==null&&e.alternate.child===e.child,o=0,r=0;if(t)for(var a=e.child;a!==null;)o|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)o|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=o,t}function Rh(e,t,o){var r=t.pendingProps;switch(ll(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $e(t),null;case 1:return gt(t.type)&&In(),$e(t),null;case 3:return r=t.stateNode,yr(),oe(dt),oe(tt),vl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(cn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ot!==null&&(Ys(Ot),Ot=null))),Os(e,t),$e(t),null;case 5:hl(t);var a=Vo(va.current);if(o=t.type,e!==null&&t.stateNode!=null)bp(e,t,o,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(B(166));return $e(t),null}if(e=Vo(Qt.current),cn(t)){r=t.stateNode,o=t.type;var n=t.memoizedProps;switch(r[Wt]=t,r[ga]=n,e=(t.mode&1)!==0,o){case"dialog":te("cancel",r),te("close",r);break;case"iframe":case"object":case"embed":te("load",r);break;case"video":case"audio":for(a=0;a<Kr.length;a++)te(Kr[a],r);break;case"source":te("error",r);break;case"img":case"image":case"link":te("error",r),te("load",r);break;case"details":te("toggle",r);break;case"input":rc(r,n),te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!n.multiple},te("invalid",r);break;case"textarea":nc(r,n),te("invalid",r)}us(o,n),a=null;for(var i in n)if(n.hasOwnProperty(i)){var s=n[i];i==="children"?typeof s=="string"?r.textContent!==s&&(n.suppressHydrationWarning!==!0&&un(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(n.suppressHydrationWarning!==!0&&un(r.textContent,s,e),a=["children",""+s]):na.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&te("scroll",r)}switch(o){case"input":qa(r),ac(r,n,!0);break;case"textarea":qa(r),ic(r);break;case"select":case"option":break;default:typeof n.onClick=="function"&&(r.onclick=Mn)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gf(o)),e==="http://www.w3.org/1999/xhtml"?o==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(o,{is:r.is}):(e=i.createElement(o),o==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,o),e[Wt]=t,e[ga]=r,Tp(e,t,!1,!1),t.stateNode=e;e:{switch(i=cs(o,r),o){case"dialog":te("cancel",e),te("close",e),a=r;break;case"iframe":case"object":case"embed":te("load",e),a=r;break;case"video":case"audio":for(a=0;a<Kr.length;a++)te(Kr[a],e);a=r;break;case"source":te("error",e),a=r;break;case"img":case"image":case"link":te("error",e),te("load",e),a=r;break;case"details":te("toggle",e),a=r;break;case"input":rc(e,r),a=as(e,r),te("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=de({},r,{value:void 0}),te("invalid",e);break;case"textarea":nc(e,r),a=ss(e,r),te("invalid",e);break;default:a=r}us(o,a),s=a;for(n in s)if(s.hasOwnProperty(n)){var l=s[n];n==="style"?xf(e,l):n==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&hf(e,l)):n==="children"?typeof l=="string"?(o!=="textarea"||l!=="")&&ia(e,l):typeof l=="number"&&ia(e,""+l):n!=="suppressContentEditableWarning"&&n!=="suppressHydrationWarning"&&n!=="autoFocus"&&(na.hasOwnProperty(n)?l!=null&&n==="onScroll"&&te("scroll",e):l!=null&&js(e,n,l,i))}switch(o){case"input":qa(e),ac(e,r,!1);break;case"textarea":qa(e),ic(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wo(r.value));break;case"select":e.multiple=!!r.multiple,n=r.value,n!=null?cr(e,!!r.multiple,n,!1):r.defaultValue!=null&&cr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Mn)}switch(o){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $e(t),null;case 6:if(e&&t.stateNode!=null)Gp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(B(166));if(o=Vo(va.current),Vo(Qt.current),cn(t)){if(r=t.stateNode,o=t.memoizedProps,r[Wt]=t,(n=r.nodeValue!==o)&&(e=_t,e!==null))switch(e.tag){case 3:un(r.nodeValue,o,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&un(r.nodeValue,o,(e.mode&1)!==0)}n&&(t.flags|=4)}else r=(o.nodeType===9?o:o.ownerDocument).createTextNode(r),r[Wt]=t,t.stateNode=r}return $e(t),null;case 13:if(oe(pe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ne&&xt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)np(),xr(),t.flags|=98560,n=!1;else if(n=cn(t),r!==null&&r.dehydrated!==null){if(e===null){if(!n)throw Error(B(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(B(317));n[Wt]=t}else xr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;$e(t),n=!1}else Ot!==null&&(Ys(Ot),Ot=null),n=!0;if(!n)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=o,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(pe.current&1)!==0?Me===0&&(Me=3):Fl())),t.updateQueue!==null&&(t.flags|=4),$e(t),null);case 4:return yr(),Os(e,t),e===null&&ma(t.stateNode.containerInfo),$e(t),null;case 10:return pl(t.type._context),$e(t),null;case 17:return gt(t.type)&&In(),$e(t),null;case 19:if(oe(pe),n=t.memoizedState,n===null)return $e(t),null;if(r=(t.flags&128)!==0,i=n.rendering,i===null)if(r)Wr(n,!1);else{if(Me!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=Gn(e),i!==null){for(t.flags|=128,Wr(n,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=o,o=t.child;o!==null;)n=o,e=r,n.flags&=14680066,i=n.alternate,i===null?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=i.childLanes,n.lanes=i.lanes,n.child=i.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=i.memoizedProps,n.memoizedState=i.memoizedState,n.updateQueue=i.updateQueue,n.type=i.type,e=i.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),o=o.sibling;return ee(pe,pe.current&1|2),t.child}e=e.sibling}n.tail!==null&&Se()>wr&&(t.flags|=128,r=!0,Wr(n,!1),t.lanes=4194304)}else{if(!r)if(e=Gn(i),e!==null){if(t.flags|=128,r=!0,o=e.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),Wr(n,!0),n.tail===null&&n.tailMode==="hidden"&&!i.alternate&&!ne)return $e(t),null}else 2*Se()-n.renderingStartTime>wr&&o!==1073741824&&(t.flags|=128,r=!0,Wr(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(o=n.last,o!==null?o.sibling=i:t.child=i,n.last=i)}return n.tail!==null?(t=n.tail,n.rendering=t,n.tail=t.sibling,n.renderingStartTime=Se(),t.sibling=null,o=pe.current,ee(pe,r?o&1|2:o&1),t):($e(t),null);case 22:case 23:return El(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(vt&1073741824)!==0&&($e(t),t.subtreeFlags&6&&(t.flags|=8192)):$e(t),null;case 24:return null;case 25:return null}throw Error(B(156,t.tag))}function Mh(e,t){switch(ll(t),t.tag){case 1:return gt(t.type)&&In(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return yr(),oe(dt),oe(tt),vl(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return hl(t),null;case 13:if(oe(pe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(B(340));xr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(pe),null;case 4:return yr(),null;case 10:return pl(t.type._context),null;case 22:case 23:return El(),null;case 24:return null;default:return null}}var mn=!1,et=!1,Ih=typeof WeakSet=="function"?WeakSet:Set,F=null;function lr(e,t){var o=e.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(r){ve(e,t,r)}else o.current=null}function Ds(e,t,o){try{o()}catch(r){ve(e,t,r)}}var qc=!1;function Vh(e,t){if(ys=zn,e=Hf(),il(e)){if("selectionStart"in e)var o={start:e.selectionStart,end:e.selectionEnd};else e:{o=(o=e.ownerDocument)&&o.defaultView||window;var r=o.getSelection&&o.getSelection();if(r&&r.rangeCount!==0){o=r.anchorNode;var a=r.anchorOffset,n=r.focusNode;r=r.focusOffset;try{o.nodeType,n.nodeType}catch{o=null;break e}var i=0,s=-1,l=-1,u=0,g=0,m=e,d=null;t:for(;;){for(var _;m!==o||a!==0&&m.nodeType!==3||(s=i+a),m!==n||r!==0&&m.nodeType!==3||(l=i+r),m.nodeType===3&&(i+=m.nodeValue.length),(_=m.firstChild)!==null;)d=m,m=_;for(;;){if(m===e)break t;if(d===o&&++u===a&&(s=i),d===n&&++g===r&&(l=i),(_=m.nextSibling)!==null)break;m=d,d=m.parentNode}m=_}o=s===-1||l===-1?null:{start:s,end:l}}else o=null}o=o||{start:0,end:0}}else o=null;for(Ss={focusedElem:e,selectionRange:o},zn=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var y=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,h=y.memoizedState,c=t.stateNode,f=c.getSnapshotBeforeUpdate(t.elementType===t.type?v:It(t.type,v),h);c.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(x){ve(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return y=qc,qc=!1,y}function oa(e,t,o){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var n=a.destroy;a.destroy=void 0,n!==void 0&&Ds(t,o,n)}a=a.next}while(a!==r)}}function ri(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var o=t=t.next;do{if((o.tag&e)===e){var r=o.create;o.destroy=r()}o=o.next}while(o!==t)}}function Ns(e){var t=e.ref;if(t!==null){var o=e.stateNode;e.tag,e=o,typeof t=="function"?t(e):t.current=e}}function Lp(e){var t=e.alternate;t!==null&&(e.alternate=null,Lp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Wt],delete t[ga],delete t[ks],delete t[vh],delete t[xh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wp(e){return e.tag===5||e.tag===3||e.tag===4}function Jc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ts(e,t,o){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?o.nodeType===8?o.parentNode.insertBefore(e,t):o.insertBefore(e,t):(o.nodeType===8?(t=o.parentNode,t.insertBefore(e,o)):(t=o,t.appendChild(e)),o=o._reactRootContainer,o!=null||t.onclick!==null||(t.onclick=Mn));else if(r!==4&&(e=e.child,e!==null))for(Ts(e,t,o),e=e.sibling;e!==null;)Ts(e,t,o),e=e.sibling}function bs(e,t,o){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?o.insertBefore(e,t):o.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(bs(e,t,o),e=e.sibling;e!==null;)bs(e,t,o),e=e.sibling}var Qe=null,Vt=!1;function io(e,t,o){for(o=o.child;o!==null;)Yp(e,t,o),o=o.sibling}function Yp(e,t,o){if(Yt&&typeof Yt.onCommitFiberUnmount=="function")try{Yt.onCommitFiberUnmount(Kn,o)}catch{}switch(o.tag){case 5:et||lr(o,t);case 6:var r=Qe,a=Vt;Qe=null,io(e,t,o),Qe=r,Vt=a,Qe!==null&&(Vt?(e=Qe,o=o.stateNode,e.nodeType===8?e.parentNode.removeChild(o):e.removeChild(o)):Qe.removeChild(o.stateNode));break;case 18:Qe!==null&&(Vt?(e=Qe,o=o.stateNode,e.nodeType===8?Wi(e.parentNode,o):e.nodeType===1&&Wi(e,o),ca(e)):Wi(Qe,o.stateNode));break;case 4:r=Qe,a=Vt,Qe=o.stateNode.containerInfo,Vt=!0,io(e,t,o),Qe=r,Vt=a;break;case 0:case 11:case 14:case 15:if(!et&&(r=o.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var n=a,i=n.destroy;n=n.tag,i!==void 0&&((n&2)!==0||(n&4)!==0)&&Ds(o,t,i),a=a.next}while(a!==r)}io(e,t,o);break;case 1:if(!et&&(lr(o,t),r=o.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=o.memoizedProps,r.state=o.memoizedState,r.componentWillUnmount()}catch(s){ve(o,t,s)}io(e,t,o);break;case 21:io(e,t,o);break;case 22:o.mode&1?(et=(r=et)||o.memoizedState!==null,io(e,t,o),et=r):io(e,t,o);break;default:io(e,t,o)}}function Zc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var o=e.stateNode;o===null&&(o=e.stateNode=new Ih),t.forEach(function(r){var a=Yh.bind(null,e,r);o.has(r)||(o.add(r),r.then(a,a))})}}function Mt(e,t){var o=t.deletions;if(o!==null)for(var r=0;r<o.length;r++){var a=o[r];try{var n=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:Qe=s.stateNode,Vt=!1;break e;case 3:Qe=s.stateNode.containerInfo,Vt=!0;break e;case 4:Qe=s.stateNode.containerInfo,Vt=!0;break e}s=s.return}if(Qe===null)throw Error(B(160));Yp(n,i,a),Qe=null,Vt=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(u){ve(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qp(t,e),t=t.sibling}function Qp(e,t){var o=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Mt(t,e),Gt(e),r&4){try{oa(3,e,e.return),ri(3,e)}catch(v){ve(e,e.return,v)}try{oa(5,e,e.return)}catch(v){ve(e,e.return,v)}}break;case 1:Mt(t,e),Gt(e),r&512&&o!==null&&lr(o,o.return);break;case 5:if(Mt(t,e),Gt(e),r&512&&o!==null&&lr(o,o.return),e.flags&32){var a=e.stateNode;try{ia(a,"")}catch(v){ve(e,e.return,v)}}if(r&4&&(a=e.stateNode,a!=null)){var n=e.memoizedProps,i=o!==null?o.memoizedProps:n,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&n.type==="radio"&&n.name!=null&&mf(a,n),cs(s,i);var u=cs(s,n);for(i=0;i<l.length;i+=2){var g=l[i],m=l[i+1];g==="style"?xf(a,m):g==="dangerouslySetInnerHTML"?hf(a,m):g==="children"?ia(a,m):js(a,g,m,u)}switch(s){case"input":ns(a,n);break;case"textarea":df(a,n);break;case"select":var d=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!n.multiple;var _=n.value;_!=null?cr(a,!!n.multiple,_,!1):d!==!!n.multiple&&(n.defaultValue!=null?cr(a,!!n.multiple,n.defaultValue,!0):cr(a,!!n.multiple,n.multiple?[]:"",!1))}a[ga]=n}catch(v){ve(e,e.return,v)}}break;case 6:if(Mt(t,e),Gt(e),r&4){if(e.stateNode===null)throw Error(B(162));a=e.stateNode,n=e.memoizedProps;try{a.nodeValue=n}catch(v){ve(e,e.return,v)}}break;case 3:if(Mt(t,e),Gt(e),r&4&&o!==null&&o.memoizedState.isDehydrated)try{ca(t.containerInfo)}catch(v){ve(e,e.return,v)}break;case 4:Mt(t,e),Gt(e);break;case 13:Mt(t,e),Gt(e),a=e.child,a.flags&8192&&(n=a.memoizedState!==null,a.stateNode.isHidden=n,!n||a.alternate!==null&&a.alternate.memoizedState!==null||(Bl=Se())),r&4&&Zc(e);break;case 22:if(g=o!==null&&o.memoizedState!==null,e.mode&1?(et=(u=et)||g,Mt(t,e),et=u):Mt(t,e),Gt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!g&&(e.mode&1)!==0)for(F=e,g=e.child;g!==null;){for(m=F=g;F!==null;){switch(d=F,_=d.child,d.tag){case 0:case 11:case 14:case 15:oa(4,d,d.return);break;case 1:lr(d,d.return);var y=d.stateNode;if(typeof y.componentWillUnmount=="function"){r=d,o=d.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(v){ve(r,o,v)}}break;case 5:lr(d,d.return);break;case 22:if(d.memoizedState!==null){ef(m);continue}}_!==null?(_.return=d,F=_):ef(m)}g=g.sibling}e:for(g=null,m=e;;){if(m.tag===5){if(g===null){g=m;try{a=m.stateNode,u?(n=a.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"):(s=m.stateNode,l=m.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=vf("display",i))}catch(v){ve(e,e.return,v)}}}else if(m.tag===6){if(g===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(v){ve(e,e.return,v)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;g===m&&(g=null),m=m.return}g===m&&(g=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Mt(t,e),Gt(e),r&4&&Zc(e);break;case 21:break;default:Mt(t,e),Gt(e)}}function Gt(e){var t=e.flags;if(t&2){try{e:{for(var o=e.return;o!==null;){if(Wp(o)){var r=o;break e}o=o.return}throw Error(B(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(ia(a,""),r.flags&=-33);var n=Jc(e);bs(e,n,a);break;case 3:case 4:var i=r.stateNode.containerInfo,s=Jc(e);Ts(e,s,i);break;default:throw Error(B(161))}}catch(l){ve(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Oh(e,t,o){F=e,Hp(e,t,o)}function Hp(e,t,o){for(var r=(e.mode&1)!==0;F!==null;){var a=F,n=a.child;if(a.tag===22&&r){var i=a.memoizedState!==null||mn;if(!i){var s=a.alternate,l=s!==null&&s.memoizedState!==null||et;s=mn;var u=et;if(mn=i,(et=l)&&!u)for(F=a;F!==null;)i=F,l=i.child,i.tag===22&&i.memoizedState!==null?tf(a):l!==null?(l.return=i,F=l):tf(a);for(;n!==null;)F=n,Hp(n,t,o),n=n.sibling;F=a,mn=s,et=u}$c(e,t,o)}else(a.subtreeFlags&8772)!==0&&n!==null?(n.return=a,F=n):$c(e,t,o)}}function $c(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var o=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:et||ri(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!et)if(o===null)r.componentDidMount();else{var a=t.elementType===t.type?o.memoizedProps:It(t.type,o.memoizedProps);r.componentDidUpdate(a,o.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var n=t.updateQueue;n!==null&&Dc(t,n,r);break;case 3:var i=t.updateQueue;if(i!==null){if(o=null,t.child!==null)switch(t.child.tag){case 5:o=t.child.stateNode;break;case 1:o=t.child.stateNode}Dc(t,i,o)}break;case 5:var s=t.stateNode;if(o===null&&t.flags&4){o=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&o.focus();break;case"img":l.src&&(o.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var g=u.memoizedState;if(g!==null){var m=g.dehydrated;m!==null&&ca(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}et||t.flags&512&&Ns(t)}catch(d){ve(t,t.return,d)}}if(t===e){F=null;break}if(o=t.sibling,o!==null){o.return=t.return,F=o;break}F=t.return}}function ef(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var o=t.sibling;if(o!==null){o.return=t.return,F=o;break}F=t.return}}function tf(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var o=t.return;try{ri(4,t)}catch(l){ve(t,o,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(l){ve(t,a,l)}}var n=t.return;try{Ns(t)}catch(l){ve(t,n,l)}break;case 5:var i=t.return;try{Ns(t)}catch(l){ve(t,i,l)}}}catch(l){ve(t,t.return,l)}if(t===e){F=null;break}var s=t.sibling;if(s!==null){s.return=t.return,F=s;break}F=t.return}}var Dh=Math.ceil,Yn=oo.ReactCurrentDispatcher,kl=oo.ReactCurrentOwner,Et=oo.ReactCurrentBatchConfig,Y=0,Te=null,Be=null,He=0,vt=0,ur=Ao(0),Me=0,Sa=null,Go=0,ai=0,Al=0,ra=null,pt=null,Bl=0,wr=1/0,jt=null,Qn=!1,Gs=null,_o=null,dn=!1,po=null,Hn=0,aa=0,Ls=null,wn=-1,Cn=0;function lt(){return(Y&6)!==0?Se():wn!==-1?wn:wn=Se()}function yo(e){return(e.mode&1)===0?1:(Y&2)!==0&&He!==0?He&-He:yh.transition!==null?(Cn===0&&(Cn=zf()),Cn):(e=K,e!==0||(e=window.event,e=e===void 0?16:Df(e.type)),e)}function Nt(e,t,o,r){if(50<aa)throw aa=0,Ls=null,Error(B(185));wa(e,o,r),((Y&2)===0||e!==Te)&&(e===Te&&((Y&2)===0&&(ai|=o),Me===4&&co(e,He)),ht(e,r),o===1&&Y===0&&(t.mode&1)===0&&(wr=Se()+500,ei&&Bo()))}function ht(e,t){var o=e.callbackNode;wg(e,t);var r=Fn(e,e===Te?He:0);if(r===0)o!==null&&uc(o),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(o!=null&&uc(o),t===1)e.tag===0?_h(of.bind(null,e)):op(of.bind(null,e)),gh(function(){(Y&6)===0&&Bo()}),o=null;else{switch(Uf(r)){case 1:o=Zs;break;case 4:o=Ef;break;case 16:o=En;break;case 536870912:o=Ff;break;default:o=En}o=em(o,jp.bind(null,e))}e.callbackPriority=t,e.callbackNode=o}}function jp(e,t){if(wn=-1,Cn=0,(Y&6)!==0)throw Error(B(327));var o=e.callbackNode;if(gr()&&e.callbackNode!==o)return null;var r=Fn(e,e===Te?He:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=jn(e,r);else{t=r;var a=Y;Y|=2;var n=Kp();(Te!==e||He!==t)&&(jt=null,wr=Se()+500,Oo(e,t));do try{bh();break}catch(s){Xp(e,s)}while(!0);fl(),Yn.current=n,Y=a,Be!==null?t=0:(Te=null,He=0,t=Me)}if(t!==0){if(t===2&&(a=gs(e),a!==0&&(r=a,t=Ws(e,a))),t===1)throw o=Sa,Oo(e,0),co(e,r),ht(e,Se()),o;if(t===6)co(e,r);else{if(a=e.current.alternate,(r&30)===0&&!Nh(a)&&(t=jn(e,r),t===2&&(n=gs(e),n!==0&&(r=n,t=Ws(e,n))),t===1))throw o=Sa,Oo(e,0),co(e,r),ht(e,Se()),o;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(B(345));case 2:Ro(e,pt,jt);break;case 3:if(co(e,r),(r&130023424)===r&&(t=Bl+500-Se(),10<t)){if(Fn(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){lt(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Cs(Ro.bind(null,e,pt,jt),t);break}Ro(e,pt,jt);break;case 4:if(co(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var i=31-Dt(r);n=1<<i,i=t[i],i>a&&(a=i),r&=~n}if(r=a,r=Se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dh(r/1960))-r,10<r){e.timeoutHandle=Cs(Ro.bind(null,e,pt,jt),r);break}Ro(e,pt,jt);break;case 5:Ro(e,pt,jt);break;default:throw Error(B(329))}}}return ht(e,Se()),e.callbackNode===o?jp.bind(null,e):null}function Ws(e,t){var o=ra;return e.current.memoizedState.isDehydrated&&(Oo(e,t).flags|=256),e=jn(e,t),e!==2&&(t=pt,pt=o,t!==null&&Ys(t)),e}function Ys(e){pt===null?pt=e:pt.push.apply(pt,e)}function Nh(e){for(var t=e;;){if(t.flags&16384){var o=t.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var r=0;r<o.length;r++){var a=o[r],n=a.getSnapshot;a=a.value;try{if(!Tt(n(),a))return!1}catch{return!1}}}if(o=t.child,t.subtreeFlags&16384&&o!==null)o.return=t,t=o;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function co(e,t){for(t&=~Al,t&=~ai,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var o=31-Dt(t),r=1<<o;e[o]=-1,t&=~r}}function of(e){if((Y&6)!==0)throw Error(B(327));gr();var t=Fn(e,0);if((t&1)===0)return ht(e,Se()),null;var o=jn(e,t);if(e.tag!==0&&o===2){var r=gs(e);r!==0&&(t=r,o=Ws(e,r))}if(o===1)throw o=Sa,Oo(e,0),co(e,t),ht(e,Se()),o;if(o===6)throw Error(B(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ro(e,pt,jt),ht(e,Se()),null}function Pl(e,t){var o=Y;Y|=1;try{return e(t)}finally{Y=o,Y===0&&(wr=Se()+500,ei&&Bo())}}function Lo(e){po!==null&&po.tag===0&&(Y&6)===0&&gr();var t=Y;Y|=1;var o=Et.transition,r=K;try{if(Et.transition=null,K=1,e)return e()}finally{K=r,Et.transition=o,Y=t,(Y&6)===0&&Bo()}}function El(){vt=ur.current,oe(ur)}function Oo(e,t){e.finishedWork=null,e.finishedLanes=0;var o=e.timeoutHandle;if(o!==-1&&(e.timeoutHandle=-1,dh(o)),Be!==null)for(o=Be.return;o!==null;){var r=o;switch(ll(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&In();break;case 3:yr(),oe(dt),oe(tt),vl();break;case 5:hl(r);break;case 4:yr();break;case 13:oe(pe);break;case 19:oe(pe);break;case 10:pl(r.type._context);break;case 22:case 23:El()}o=o.return}if(Te=e,Be=e=So(e.current,null),He=vt=t,Me=0,Sa=null,Al=ai=Go=0,pt=ra=null,Io!==null){for(t=0;t<Io.length;t++)if(o=Io[t],r=o.interleaved,r!==null){o.interleaved=null;var a=r.next,n=o.pending;if(n!==null){var i=n.next;n.next=a,r.next=i}o.pending=r}Io=null}return e}function Xp(e,t){do{var o=Be;try{if(fl(),_n.current=Wn,Ln){for(var r=me.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Ln=!1}if(bo=0,Ne=Re=me=null,ta=!1,xa=0,kl.current=null,o===null||o.return===null){Me=1,Sa=t,Be=null;break}e:{var n=e,i=o.return,s=o,l=t;if(t=He,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,g=s,m=g.tag;if((g.mode&1)===0&&(m===0||m===11||m===15)){var d=g.alternate;d?(g.updateQueue=d.updateQueue,g.memoizedState=d.memoizedState,g.lanes=d.lanes):(g.updateQueue=null,g.memoizedState=null)}var _=Wc(i);if(_!==null){_.flags&=-257,Yc(_,i,s,n,t),_.mode&1&&Lc(n,u,t),t=_,l=u;var y=t.updateQueue;if(y===null){var v=new Set;v.add(l),t.updateQueue=v}else y.add(l);break e}else{if((t&1)===0){Lc(n,u,t),Fl();break e}l=Error(B(426))}}else if(ne&&s.mode&1){var h=Wc(i);if(h!==null){(h.flags&65536)===0&&(h.flags|=256),Yc(h,i,s,n,t),ul(Sr(l,s));break e}}n=l=Sr(l,s),Me!==4&&(Me=2),ra===null?ra=[n]:ra.push(n),n=i;do{switch(n.tag){case 3:n.flags|=65536,t&=-t,n.lanes|=t;var c=Up(n,l,t);Oc(n,c);break e;case 1:s=l;var f=n.type,p=n.stateNode;if((n.flags&128)===0&&(typeof f.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(_o===null||!_o.has(p)))){n.flags|=65536,t&=-t,n.lanes|=t;var x=Rp(n,s,t);Oc(n,x);break e}}n=n.return}while(n!==null)}Jp(o)}catch(S){t=S,Be===o&&o!==null&&(Be=o=o.return);continue}break}while(!0)}function Kp(){var e=Yn.current;return Yn.current=Wn,e===null?Wn:e}function Fl(){(Me===0||Me===3||Me===2)&&(Me=4),Te===null||(Go&268435455)===0&&(ai&268435455)===0||co(Te,He)}function jn(e,t){var o=Y;Y|=2;var r=Kp();(Te!==e||He!==t)&&(jt=null,Oo(e,t));do try{Th();break}catch(a){Xp(e,a)}while(!0);if(fl(),Y=o,Yn.current=r,Be!==null)throw Error(B(261));return Te=null,He=0,Me}function Th(){for(;Be!==null;)qp(Be)}function bh(){for(;Be!==null&&!mg();)qp(Be)}function qp(e){var t=$p(e.alternate,e,vt);e.memoizedProps=e.pendingProps,t===null?Jp(e):Be=t,kl.current=null}function Jp(e){var t=e;do{var o=t.alternate;if(e=t.return,(t.flags&32768)===0){if(o=Rh(o,t,vt),o!==null){Be=o;return}}else{if(o=Mh(o,t),o!==null){o.flags&=32767,Be=o;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Me=6,Be=null;return}}if(t=t.sibling,t!==null){Be=t;return}Be=t=e}while(t!==null);Me===0&&(Me=5)}function Ro(e,t,o){var r=K,a=Et.transition;try{Et.transition=null,K=1,Gh(e,t,o,r)}finally{Et.transition=a,K=r}return null}function Gh(e,t,o,r){do gr();while(po!==null);if((Y&6)!==0)throw Error(B(327));o=e.finishedWork;var a=e.finishedLanes;if(o===null)return null;if(e.finishedWork=null,e.finishedLanes=0,o===e.current)throw Error(B(177));e.callbackNode=null,e.callbackPriority=0;var n=o.lanes|o.childLanes;if(Cg(e,n),e===Te&&(Be=Te=null,He=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||dn||(dn=!0,em(En,function(){return gr(),null})),n=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||n){n=Et.transition,Et.transition=null;var i=K;K=1;var s=Y;Y|=4,kl.current=null,Vh(e,o),Qp(o,e),uh(Ss),zn=!!ys,Ss=ys=null,e.current=o,Oh(o,e,a),dg(),Y=s,K=i,Et.transition=n}else e.current=o;if(dn&&(dn=!1,po=e,Hn=a),n=e.pendingLanes,n===0&&(_o=null),vg(o.stateNode,r),ht(e,Se()),t!==null)for(r=e.onRecoverableError,o=0;o<t.length;o++)a=t[o],r(a.value,{componentStack:a.stack,digest:a.digest});if(Qn)throw Qn=!1,e=Gs,Gs=null,e;return(Hn&1)!==0&&e.tag!==0&&gr(),n=e.pendingLanes,(n&1)!==0?e===Ls?aa++:(aa=0,Ls=e):aa=0,Bo(),null}function gr(){if(po!==null){var e=Uf(Hn),t=Et.transition,o=K;try{if(Et.transition=null,K=16>e?16:e,po===null)var r=!1;else{if(e=po,po=null,Hn=0,(Y&6)!==0)throw Error(B(331));var a=Y;for(Y|=4,F=e.current;F!==null;){var n=F,i=n.child;if((F.flags&16)!==0){var s=n.deletions;if(s!==null){for(var l=0;l<s.length;l++){var u=s[l];for(F=u;F!==null;){var g=F;switch(g.tag){case 0:case 11:case 15:oa(8,g,n)}var m=g.child;if(m!==null)m.return=g,F=m;else for(;F!==null;){g=F;var d=g.sibling,_=g.return;if(Lp(g),g===u){F=null;break}if(d!==null){d.return=_,F=d;break}F=_}}}var y=n.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var h=v.sibling;v.sibling=null,v=h}while(v!==null)}}F=n}}if((n.subtreeFlags&2064)!==0&&i!==null)i.return=n,F=i;else e:for(;F!==null;){if(n=F,(n.flags&2048)!==0)switch(n.tag){case 0:case 11:case 15:oa(9,n,n.return)}var c=n.sibling;if(c!==null){c.return=n.return,F=c;break e}F=n.return}}var f=e.current;for(F=f;F!==null;){i=F;var p=i.child;if((i.subtreeFlags&2064)!==0&&p!==null)p.return=i,F=p;else e:for(i=f;F!==null;){if(s=F,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:ri(9,s)}}catch(S){ve(s,s.return,S)}if(s===i){F=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,F=x;break e}F=s.return}}if(Y=a,Bo(),Yt&&typeof Yt.onPostCommitFiberRoot=="function")try{Yt.onPostCommitFiberRoot(Kn,e)}catch{}r=!0}return r}finally{K=o,Et.transition=t}}return!1}function rf(e,t,o){t=Sr(o,t),t=Up(e,t,1),e=xo(e,t,1),t=lt(),e!==null&&(wa(e,1,t),ht(e,t))}function ve(e,t,o){if(e.tag===3)rf(e,e,o);else for(;t!==null;){if(t.tag===3){rf(t,e,o);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(_o===null||!_o.has(r))){e=Sr(o,e),e=Rp(t,e,1),t=xo(t,e,1),e=lt(),t!==null&&(wa(t,1,e),ht(t,e));break}}t=t.return}}function Lh(e,t,o){var r=e.pingCache;r!==null&&r.delete(t),t=lt(),e.pingedLanes|=e.suspendedLanes&o,Te===e&&(He&o)===o&&(Me===4||Me===3&&(He&130023424)===He&&500>Se()-Bl?Oo(e,0):Al|=o),ht(e,t)}function Zp(e,t){t===0&&((e.mode&1)===0?t=1:(t=$a,$a<<=1,($a&130023424)===0&&($a=4194304)));var o=lt();e=eo(e,t),e!==null&&(wa(e,t,o),ht(e,o))}function Wh(e){var t=e.memoizedState,o=0;t!==null&&(o=t.retryLane),Zp(e,o)}function Yh(e,t){var o=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(o=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(t),Zp(e,o)}var $p;$p=function(e,t,o){if(e!==null)if(e.memoizedProps!==t.pendingProps||dt.current)mt=!0;else{if((e.lanes&o)===0&&(t.flags&128)===0)return mt=!1,Uh(e,t,o);mt=(e.flags&131072)!==0}else mt=!1,ne&&(t.flags&1048576)!==0&&rp(t,Dn,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Sn(e,t),e=t.pendingProps;var a=vr(t,tt.current);dr(t,o),a=_l(null,t,r,e,a,o);var n=yl();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,gt(r)?(n=!0,Vn(t)):n=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,dl(t),a.updater=oi,t.stateNode=a,a._reactInternals=t,zs(t,r,e,o),t=Ms(null,t,r,!0,n,o)):(t.tag=0,ne&&n&&sl(t),st(null,t,a,o),t=t.child),t;case 16:r=t.elementType;e:{switch(Sn(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Hh(r),e=It(r,e),a){case 0:t=Rs(null,t,r,e,o);break e;case 1:t=jc(null,t,r,e,o);break e;case 11:t=Qc(null,t,r,e,o);break e;case 14:t=Hc(null,t,r,It(r.type,e),o);break e}throw Error(B(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:It(r,a),Rs(e,t,r,a,o);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:It(r,a),jc(e,t,r,a,o);case 3:e:{if(Op(t),e===null)throw Error(B(387));r=t.pendingProps,n=t.memoizedState,a=n.element,up(e,t),bn(t,r,null,o);var i=t.memoizedState;if(r=i.element,n.isDehydrated)if(n={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){a=Sr(Error(B(423)),t),t=Xc(e,t,r,o,a);break e}else if(r!==a){a=Sr(Error(B(424)),t),t=Xc(e,t,r,o,a);break e}else for(xt=vo(t.stateNode.containerInfo.firstChild),_t=t,ne=!0,Ot=null,o=sp(t,null,r,o),t.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(xr(),r===a){t=to(e,t,o);break e}st(e,t,r,o)}t=t.child}return t;case 5:return cp(t),e===null&&Ps(t),r=t.type,a=t.pendingProps,n=e!==null?e.memoizedProps:null,i=a.children,ws(r,a)?i=null:n!==null&&ws(r,n)&&(t.flags|=32),Vp(e,t),st(e,t,i,o),t.child;case 6:return e===null&&Ps(t),null;case 13:return Dp(e,t,o);case 4:return gl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=_r(t,null,r,o):st(e,t,r,o),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:It(r,a),Qc(e,t,r,a,o);case 7:return st(e,t,t.pendingProps,o),t.child;case 8:return st(e,t,t.pendingProps.children,o),t.child;case 12:return st(e,t,t.pendingProps.children,o),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,n=t.memoizedProps,i=a.value,ee(Nn,r._currentValue),r._currentValue=i,n!==null)if(Tt(n.value,i)){if(n.children===a.children&&!dt.current){t=to(e,t,o);break e}}else for(n=t.child,n!==null&&(n.return=t);n!==null;){var s=n.dependencies;if(s!==null){i=n.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(n.tag===1){l=Jt(-1,o&-o),l.tag=2;var u=n.updateQueue;if(u!==null){u=u.shared;var g=u.pending;g===null?l.next=l:(l.next=g.next,g.next=l),u.pending=l}}n.lanes|=o,l=n.alternate,l!==null&&(l.lanes|=o),Es(n.return,o,t),s.lanes|=o;break}l=l.next}}else if(n.tag===10)i=n.type===t.type?null:n.child;else if(n.tag===18){if(i=n.return,i===null)throw Error(B(341));i.lanes|=o,s=i.alternate,s!==null&&(s.lanes|=o),Es(i,o,t),i=n.sibling}else i=n.child;if(i!==null)i.return=n;else for(i=n;i!==null;){if(i===t){i=null;break}if(n=i.sibling,n!==null){n.return=i.return,i=n;break}i=i.return}n=i}st(e,t,a.children,o),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,dr(t,o),a=Ft(a),r=r(a),t.flags|=1,st(e,t,r,o),t.child;case 14:return r=t.type,a=It(r,t.pendingProps),a=It(r.type,a),Hc(e,t,r,a,o);case 15:return Mp(e,t,t.type,t.pendingProps,o);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:It(r,a),Sn(e,t),t.tag=1,gt(r)?(e=!0,Vn(t)):e=!1,dr(t,o),zp(t,r,a),zs(t,r,a,o),Ms(null,t,r,!0,e,o);case 19:return Np(e,t,o);case 22:return Ip(e,t,o)}throw Error(B(156,t.tag))};function em(e,t){return Pf(e,t)}function Qh(e,t,o,r){this.tag=e,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pt(e,t,o,r){return new Qh(e,t,o,r)}function zl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hh(e){if(typeof e=="function")return zl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ks)return 11;if(e===qs)return 14}return 2}function So(e,t){var o=e.alternate;return o===null?(o=Pt(e.tag,t,e.key,e.mode),o.elementType=e.elementType,o.type=e.type,o.stateNode=e.stateNode,o.alternate=e,e.alternate=o):(o.pendingProps=t,o.type=e.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=e.flags&14680064,o.childLanes=e.childLanes,o.lanes=e.lanes,o.child=e.child,o.memoizedProps=e.memoizedProps,o.memoizedState=e.memoizedState,o.updateQueue=e.updateQueue,t=e.dependencies,o.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},o.sibling=e.sibling,o.index=e.index,o.ref=e.ref,o}function kn(e,t,o,r,a,n){var i=2;if(r=e,typeof e=="function")zl(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case $o:return Do(o.children,a,n,t);case Xs:i=8,a|=8;break;case es:return e=Pt(12,o,t,a|2),e.elementType=es,e.lanes=n,e;case ts:return e=Pt(13,o,t,a),e.elementType=ts,e.lanes=n,e;case os:return e=Pt(19,o,t,a),e.elementType=os,e.lanes=n,e;case cf:return ni(o,a,n,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case lf:i=10;break e;case uf:i=9;break e;case Ks:i=11;break e;case qs:i=14;break e;case so:i=16,r=null;break e}throw Error(B(130,e==null?e:typeof e,""))}return t=Pt(i,o,t,a),t.elementType=e,t.type=r,t.lanes=n,t}function Do(e,t,o,r){return e=Pt(7,e,r,t),e.lanes=o,e}function ni(e,t,o,r){return e=Pt(22,e,r,t),e.elementType=cf,e.lanes=o,e.stateNode={isHidden:!1},e}function Ji(e,t,o){return e=Pt(6,e,null,t),e.lanes=o,e}function Zi(e,t,o){return t=Pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=o,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function jh(e,t,o,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Vi(0),this.expirationTimes=Vi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Vi(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ul(e,t,o,r,a,n,i,s,l){return e=new jh(e,t,o,s,l),t===1?(t=1,n===!0&&(t|=8)):t=0,n=Pt(3,null,null,t),e.current=n,n.stateNode=e,n.memoizedState={element:r,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},dl(n),e}function Xh(e,t,o){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zo,key:r==null?null:""+r,children:e,containerInfo:t,implementation:o}}function tm(e){if(!e)return Co;e=e._reactInternals;e:{if(Yo(e)!==e||e.tag!==1)throw Error(B(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(gt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(B(171))}if(e.tag===1){var o=e.type;if(gt(o))return tp(e,o,t)}return t}function om(e,t,o,r,a,n,i,s,l){return e=Ul(o,r,!0,e,a,n,i,s,l),e.context=tm(null),o=e.current,r=lt(),a=yo(o),n=Jt(r,a),n.callback=t??null,xo(o,n,a),e.current.lanes=a,wa(e,a,r),ht(e,r),e}function ii(e,t,o,r){var a=t.current,n=lt(),i=yo(a);return o=tm(o),t.context===null?t.context=o:t.pendingContext=o,t=Jt(n,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=xo(a,t,i),e!==null&&(Nt(e,a,i,n),xn(e,a,i)),i}function Xn(e){return e=e.current,e.child?(e.child.tag===5,e.child.stateNode):null}function af(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var o=e.retryLane;e.retryLane=o!==0&&o<t?o:t}}function Rl(e,t){af(e,t),(e=e.alternate)&&af(e,t)}function Kh(){return null}var rm=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ml(e){this._internalRoot=e}si.prototype.render=Ml.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(B(409));ii(e,t,null,null)};si.prototype.unmount=Ml.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Lo(function(){ii(null,e,null,null)}),t[$t]=null}};function si(e){this._internalRoot=e}si.prototype.unstable_scheduleHydration=function(e){if(e){var t=If();e={blockedOn:null,target:e,priority:t};for(var o=0;o<uo.length&&t!==0&&t<uo[o].priority;o++);uo.splice(o,0,e),o===0&&Of(e)}};function Il(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function li(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function nf(){}function qh(e,t,o,r,a){if(a){if(typeof r=="function"){var n=r;r=function(){var u=Xn(i);n.call(u)}}var i=om(t,r,e,0,null,!1,!1,"",nf);return e._reactRootContainer=i,e[$t]=i.current,ma(e.nodeType===8?e.parentNode:e),Lo(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var u=Xn(l);s.call(u)}}var l=Ul(e,0,!1,null,null,!1,!1,"",nf);return e._reactRootContainer=l,e[$t]=l.current,ma(e.nodeType===8?e.parentNode:e),Lo(function(){ii(t,l,o,r)}),l}function ui(e,t,o,r,a){var n=o._reactRootContainer;if(n){var i=n;if(typeof a=="function"){var s=a;a=function(){var l=Xn(i);s.call(l)}}ii(t,i,e,a)}else i=qh(o,t,e,a,r);return Xn(i)}Rf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var o=Xr(t.pendingLanes);o!==0&&($s(t,o|1),ht(t,Se()),(Y&6)===0&&(wr=Se()+500,Bo()))}break;case 13:Lo(function(){var r=eo(e,1);if(r!==null){var a=lt();Nt(r,e,1,a)}}),Rl(e,1)}};el=function(e){if(e.tag===13){var t=eo(e,134217728);if(t!==null){var o=lt();Nt(t,e,134217728,o)}Rl(e,134217728)}};Mf=function(e){if(e.tag===13){var t=yo(e),o=eo(e,t);if(o!==null){var r=lt();Nt(o,e,t,r)}Rl(e,t)}};If=function(){return K};Vf=function(e,t){var o=K;try{return K=e,t()}finally{K=o}};ps=function(e,t,o){switch(t){case"input":if(ns(e,o),t=o.name,o.type==="radio"&&t!=null){for(o=e;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<o.length;t++){var r=o[t];if(r!==e&&r.form===e.form){var a=$n(r);if(!a)throw Error(B(90));pf(r),ns(r,a)}}}break;case"textarea":df(e,o);break;case"select":t=o.value,t!=null&&cr(e,!!o.multiple,t,!1)}};Sf=Pl;wf=Lo;var Jh={usingClientEntryPoint:!1,Events:[ka,rr,$n,_f,yf,Pl]},Yr={findFiberByHostInstance:Mo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zh={bundleType:Yr.bundleType,version:Yr.version,rendererPackageName:Yr.rendererPackageName,rendererConfig:Yr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:oo.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Af(e),e===null?null:e.stateNode},findFiberByHostInstance:Yr.findFiberByHostInstance||Kh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Qr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Qr.isDisabled&&Qr.supportsFiber))try{Kn=Qr.inject(Zh),Yt=Qr}catch{}var Qr;wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jh;wt.createPortal=function(e,t){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Il(t))throw Error(B(200));return Xh(e,t,null,o)};wt.createRoot=function(e,t){if(!Il(e))throw Error(B(299));var o=!1,r="",a=rm;return t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Ul(e,1,!1,null,null,o,!1,r,a),e[$t]=t.current,ma(e.nodeType===8?e.parentNode:e),new Ml(t)};wt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(B(188)):(e=Object.keys(e).join(","),Error(B(268,e)));return e=Af(t),e=e===null?null:e.stateNode,e};wt.flushSync=function(e){return Lo(e)};wt.hydrate=function(e,t,o){if(!li(t))throw Error(B(200));return ui(null,e,t,!0,o)};wt.hydrateRoot=function(e,t,o){if(!Il(e))throw Error(B(405));var r=o!=null&&o.hydratedSources||null,a=!1,n="",i=rm;if(o!=null&&(o.unstable_strictMode===!0&&(a=!0),o.identifierPrefix!==void 0&&(n=o.identifierPrefix),o.onRecoverableError!==void 0&&(i=o.onRecoverableError)),t=om(t,null,e,1,o??null,a,!1,n,i),e[$t]=t.current,ma(e),r)for(e=0;e<r.length;e++)o=r[e],a=o._getVersion,a=a(o._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[o,a]:t.mutableSourceEagerHydrationData.push(o,a);return new si(t)};wt.render=function(e,t,o){if(!li(t))throw Error(B(200));return ui(null,e,t,!1,o)};wt.unmountComponentAtNode=function(e){if(!li(e))throw Error(B(40));return e._reactRootContainer?(Lo(function(){ui(null,null,e,!1,function(){e._reactRootContainer=null,e[$t]=null})}),!0):!1};wt.unstable_batchedUpdates=Pl;wt.unstable_renderSubtreeIntoContainer=function(e,t,o,r){if(!li(o))throw Error(B(200));if(e==null||e._reactInternals===void 0)throw Error(B(38));return ui(e,t,o,!1,r)};wt.version="18.3.1-next-f1338f8080-20240426"});var sm=Ht((mx,im)=>{"use strict";function nm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nm)}catch(e){console.error(e)}}nm(),im.exports=am()});var um=Ht(Vl=>{"use strict";var lm=sm();Vl.createRoot=lm.createRoot,Vl.hydrateRoot=lm.hydrateRoot;var dx});var vm=Ht(di=>{"use strict";var pv=L(),mv=Symbol.for("react.element"),dv=Symbol.for("react.fragment"),gv=Object.prototype.hasOwnProperty,hv=pv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,vv={key:!0,ref:!0,__self:!0,__source:!0};function hm(e,t,o){var r,a={},n=null,i=null;o!==void 0&&(n=""+o),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)gv.call(t,r)&&!vv.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:mv,type:e,key:n,ref:i,props:a,_owner:hv.current}}di.Fragment=dv;di.jsx=hm;di.jsxs=hm});var j=Ht((f2,xm)=>{"use strict";xm.exports=vm()});var ax=z(L(),1),nx=z(um(),1);var P0={};I0(P0,{ColorPanels:()=>Nd,Dithering:()=>Bd,DotGrid:()=>bm,DotOrbit:()=>Om,FlutedGlass:()=>e0,GemSmoke:()=>B0,GodRays:()=>dd,GrainGradient:()=>zd,HalftoneCmyk:()=>C0,HalftoneDots:()=>_0,Heatmap:()=>p0,ImageDithering:()=>l0,LiquidMetal:()=>g0,MeshGradient:()=>km,Metaballs:()=>Xm,NeuroNoise:()=>Rm,PaperTexture:()=>qd,PerlinNoise:()=>od,PulsingBorder:()=>Id,ShaderMount:()=>U,SimplexNoise:()=>Ym,SmokeRing:()=>Em,Spiral:()=>xd,StaticMeshGradient:()=>Ld,StaticRadialGradient:()=>Hd,Swirl:()=>wd,Voronoi:()=>id,Warp:()=>cd,Water:()=>a0,Waves:()=>Zm,colorPanelsMeta:()=>Fr,colorPanelsPresets:()=>Dd,ditheringPresets:()=>Ad,dotGridPresets:()=>Tm,dotOrbitMeta:()=>Ea,dotOrbitPresets:()=>Vm,flutedGlassPresets:()=>$d,gemSmokePresets:()=>A0,getShaderColorFromString:()=>A,godRaysMeta:()=>Ra,godRaysPresets:()=>md,grainGradientMeta:()=>Va,grainGradientPresets:()=>Fd,halftoneCmykPresets:()=>w0,halftoneDotsPresets:()=>x0,heatmapMeta:()=>Na,heatmapPresets:()=>f0,imageDitheringPresets:()=>s0,isPaperShaderElement:()=>Ol,liquidMetalPresets:()=>d0,meshGradientMeta:()=>Pa,meshGradientPresets:()=>Cm,metaballsMeta:()=>Pr,metaballsPresets:()=>jm,neuroNoisePresets:()=>Um,paperTexturePresets:()=>Kd,perlinNoisePresets:()=>td,pulsingBorderMeta:()=>Er,pulsingBorderPresets:()=>Md,simplexNoiseMeta:()=>Fa,simplexNoisePresets:()=>Wm,smokeRingMeta:()=>Br,smokeRingPresets:()=>Pm,spiralPresets:()=>vd,staticMeshGradientMeta:()=>Oa,staticMeshGradientPresets:()=>Gd,staticRadialGradientMeta:()=>Da,staticRadialGradientPresets:()=>Qd,swirlMeta:()=>Ma,swirlPresets:()=>Sd,voronoiMeta:()=>za,voronoiPresets:()=>nd,warpMeta:()=>Ua,warpPresets:()=>ud,waterPresets:()=>r0,wavesPresets:()=>Jm});var ct=z(L(),1);var cm=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;var fm=1920*1080*4,Ba=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=tv();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(t,o,r,a,n=0,i=0,s=2,l=fm,u=[]){if(t?.nodeType===1)this.parentElement=t;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=t.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let d=this.ownerDocument.createElement("style");d.innerHTML=ev,d.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(d)}let g=this.ownerDocument.createElement("canvas");this.canvasElement=g,this.parentElement.prepend(g),this.fragmentShader=o,this.providedUniforms=r,this.mipmaps=u,this.currentFrame=i,this.minPixelRatio=s,this.maxPixelCount=l;let m=g.getContext("webgl2",a);if(!m)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=m,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(n),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}initProgram=()=>{let t=$h(this.gl,cm,this.fragmentShader);t&&(this.program=t)};setupPositionAttribute=()=>{let t=this.gl.getAttribLocation(this.program,"a_position"),o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let t={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([o,r])=>{if(t[o]=this.gl.getUniformLocation(this.program,o),r instanceof HTMLImageElement){let a=`${o}AspectRatio`;t[a]=this.gl.getUniformLocation(this.program,a)}}),this.uniformLocations=t};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([t])=>{if(t?.borderBoxSize[0]){let o=t.devicePixelContentBoxSize?.[0];o!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=o.inlineSize,this.parentDevicePixelHeight=o.blockSize),this.parentWidth=t.borderBoxSize[0].inlineSize,this.parentHeight=t.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let t=0,o=0,r=Math.max(1,window.devicePixelRatio),a=visualViewport?.scale??1;if(this.devicePixelsSupported){let g=Math.max(1,this.minPixelRatio/r);t=this.parentDevicePixelWidth*g*a,o=this.parentDevicePixelHeight*g*a}else{let g=Math.max(r,this.minPixelRatio)*a;if(this.isSafari){let m=ov(this.ownerDocument);g*=Math.max(1,m)}t=Math.round(this.parentWidth)*g,o=Math.round(this.parentHeight)*g}let n=Math.sqrt(this.maxPixelCount)/Math.sqrt(t*o),i=Math.min(1,n),s=Math.round(t*i),l=Math.round(o*i),u=s/Math.round(this.parentWidth);(this.canvasElement.width!==s||this.canvasElement.height!==l||this.renderScale!==u)&&(this.renderScale=u,this.canvasElement.width=s,this.canvasElement.height=l,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=t=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let o=t-this.lastRenderTime;this.lastRenderTime=t,this.currentSpeed!==0&&(this.currentFrame+=o*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(t,o)=>{if(!o.complete||o.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${t} must be fully loaded`);let r=this.textures.get(t);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(t)||this.textureUnitMap.set(t,this.textureUnitMap.size);let a=this.textureUnitMap.get(t);this.gl.activeTexture(this.gl.TEXTURE0+a);let n=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o),this.mipmaps.includes(t)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let i=this.gl.getError();if(i!==this.gl.NO_ERROR||n===null){console.error("Paper Shaders: WebGL error when uploading texture:",i);return}this.textures.set(t,n);let s=this.uniformLocations[t];if(s){this.gl.uniform1i(s,a);let l=`${t}AspectRatio`,u=this.uniformLocations[l];if(u){let g=o.naturalWidth/o.naturalHeight;this.gl.uniform1f(u,g)}}};areUniformValuesEqual=(t,o)=>t===o?!0:Array.isArray(t)&&Array.isArray(o)&&t.length===o.length?t.every((r,a)=>this.areUniformValuesEqual(r,o[a])):!1;setUniformValues=t=>{this.gl.useProgram(this.program),Object.entries(t).forEach(([o,r])=>{let a=r;if(r instanceof HTMLImageElement&&(a=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[o],a))return;this.uniformCache[o]=a;let n=this.uniformLocations[o];if(!n){console.warn(`Uniform location for ${o} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(o,r);else if(Array.isArray(r)){let i=null,s=null;if(r[0]!==void 0&&Array.isArray(r[0])){let l=r[0].length;if(r.every(u=>u.length===l))i=r.flat(),s=l;else{console.warn(`All child arrays must be the same length for ${o}`);return}}else i=r,s=i.length;switch(s){case 2:this.gl.uniform2fv(n,i);break;case 3:this.gl.uniform3fv(n,i);break;case 4:this.gl.uniform4fv(n,i);break;case 9:this.gl.uniformMatrix3fv(n,!1,i);break;case 16:this.gl.uniformMatrix4fv(n,!1,i);break;default:console.warn(`Unsupported uniform array length: ${s}`)}}else typeof r=="number"?this.gl.uniform1f(n,r):typeof r=="boolean"?this.gl.uniform1i(n,r?1:0):console.warn(`Unsupported uniform type for ${o}: ${typeof r}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=t=>{this.currentFrame=t,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(t=1)=>{this.speed=t,this.setCurrentSpeed(this.ownerDocument.hidden?0:t)};setCurrentSpeed=t=>{this.currentSpeed=t,this.rafId===null&&t!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&t===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(t=fm)=>{this.maxPixelCount=t,this.handleResize()};setMinPixelRatio=(t=2)=>{this.minPixelRatio=t,this.handleResize()};setUniforms=t=>{this.setUniformValues(t),this.providedUniforms={...this.providedUniforms,...t},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.setCurrentSpeed(this.ownerDocument.hidden?0:this.speed)};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(t=>{this.gl.deleteTexture(t)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}};function pm(e,t,o){let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function $h(e,t,o){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),a=r?r.precision:null;a&&a<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),o=o.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let n=pm(e,e.VERTEX_SHADER,t),i=pm(e,e.FRAGMENT_SHADER,o);if(!n||!i)return null;let s=e.createProgram();return s?(e.attachShader(s,n),e.attachShader(s,i),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,n),e.detachShader(s,i),e.deleteShader(n),e.deleteShader(i),s):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(n),e.deleteShader(i),null)):null}var ev=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function Ol(e){return"paperShaderMount"in e}function tv(){let e=navigator.userAgent.toLowerCase();return e.includes("safari")&&!e.includes("chrome")&&!e.includes("android")}function ov(e){let t=visualViewport?.scale??1,o=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,a=t*o+r,n=outerWidth/a,i=Math.round(100*n);return i%5===0?i/100:i===33?1/3:i===67?2/3:i===133?4/3:n}var k={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},M={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},R={none:0,contain:1,cover:2};var V=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,X=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,Po=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,ot=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var Ut=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,Ar=`
  vec2 randomGB(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).gb;
  }
`,ie=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,rt=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,mm=`
float fiberRandom(vec2 p) {
  vec2 uv = floor(p) / 100.;
  return texture(u_noiseTexture, fract(uv)).b;
}

float fiberValueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = fiberRandom(i);
  float b = fiberRandom(i + vec2(1.0, 0.0));
  float c = fiberRandom(i + vec2(0.0, 1.0));
  float d = fiberRandom(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float fiberNoiseFbm(in vec2 n, vec2 seedOffset) {
  float total = 0.0, amplitude = 1.;
  for (int i = 0; i < 4; i++) {
    n = rotate(n, .7);
    total += fiberValueNoise(n + seedOffset) * amplitude;
    n *= 2.;
    amplitude *= 0.6;
  }
  return total;
}

float fiberNoise(vec2 uv, vec2 seedOffset) {
  float epsilon = 0.001;
  float n1 = fiberNoiseFbm(uv + vec2(epsilon, 0.0), seedOffset);
  float n2 = fiberNoiseFbm(uv - vec2(epsilon, 0.0), seedOffset);
  float n3 = fiberNoiseFbm(uv + vec2(0.0, epsilon), seedOffset);
  float n4 = fiberNoiseFbm(uv - vec2(0.0, epsilon), seedOffset);
  return length(vec2(n1 - n2, n3 - n4)) / (2.0 * epsilon);
}
`;var Pa={maxColorCount:10},Dl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${Pa.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${V}
${X}
${ot}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${Pa.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var Br={maxColorCount:10,maxNoiseIterations:8},Nl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Br.maxColorCount}];
uniform float u_colorsCount;

uniform float u_thickness;
uniform float u_radius;
uniform float u_innerShape;
uniform float u_noiseScale;
uniform float u_noiseIterations;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${Ut}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
vec2 fbm(vec2 n0, vec2 n1) {
  vec2 total = vec2(0.0);
  float amplitude = .4;
  for (int i = 0; i < ${Br.maxNoiseIterations}; i++) {
    if (i >= int(u_noiseIterations)) break;
    total.x += valueNoise(n0) * amplitude;
    total.y += valueNoise(n1) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}

float getNoise(vec2 uv, vec2 pUv, float t) {
  vec2 pUvLeft = pUv + .03 * t;
  float period = max(abs(u_noiseScale * TWO_PI), 1e-6);
  vec2 pUvRight = vec2(fract(pUv.x / period) * period, pUv.y) + .03 * t;
  vec2 noise = fbm(pUvLeft, pUvRight);
  return mix(noise.y, noise.x, smoothstep(-.25, .25, uv.x));
}

float getRingShape(vec2 uv) {
  float radius = u_radius;
  float thickness = u_thickness;

  float distance = length(uv);
  float ringValue = 1. - smoothstep(radius, radius + thickness, distance);
  ringValue *= smoothstep(radius - pow(u_innerShape, 3.) * thickness, radius, distance);

  return ringValue;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = u_time;

  float cycleDuration = 3.;
  float period2 = 2.0 * cycleDuration;
  float localTime1 = fract((0.1 * t + cycleDuration) / period2) * period2;
  float localTime2 = fract((0.1 * t) / period2) * period2;
  float timeBlend = .5 + .5 * sin(.1 * t * PI / cycleDuration - .5 * PI);

  float atg = atan(shape_uv.y, shape_uv.x) + .001;
  float l = length(shape_uv);
  float radialOffset = .5 * l - inversesqrt(max(1e-4, l));
  vec2 polar_uv1 = vec2(atg, localTime1 - radialOffset) * u_noiseScale;
  vec2 polar_uv2 = vec2(atg, localTime2 - radialOffset) * u_noiseScale;
  
  float noise1 = getNoise(shape_uv, polar_uv1, t);
  float noise2 = getNoise(shape_uv, polar_uv2, t);

  float noise = mix(noise1, noise2, timeBlend);

  shape_uv *= (.8 + 1.2 * noise);

  float ringShape = getRingShape(shape_uv);

  float mixer = ringShape * ringShape * (u_colorsCount - 1.);
  int idxLast = int(u_colorsCount) - 1;
  vec4 gradient = u_colors[idxLast];
  gradient.rgb *= gradient.a;
  for (int i = ${Br.maxColorCount} - 2; i >= 0; i--) {
    float localT = clamp(mixer - float(idxLast - i - 1), 0., 1.);
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * ringShape;
  float opacity = gradient.a * ringShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Tl=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

in vec2 v_patternUV;

out vec4 fragColor;

${X}

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .13;

  float t = .5 * u_time;

  float noise = neuroShape(shape_uv, t);

  noise = (1. + u_brightness) * noise * noise;
  noise = pow(noise, .7 + 6. * u_contrast);
  noise = min(1.4, noise);

  float blend = smoothstep(0.7, 1.4, noise);

  vec4 frontC = u_colorFront;
  frontC.rgb *= frontC.a;
  vec4 midC = u_colorMid;
  midC.rgb *= midC.a;
  vec4 blendFront = mix(midC, frontC, blend);

  float safeNoise = max(noise, 0.0);
  vec3 color = blendFront.rgb * safeNoise;
  float opacity = clamp(blendFront.a * safeNoise, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Ea={maxColorCount:10},bl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Ea.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_spreading;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${X}
${Ut}
${Ar}


vec3 voronoiShape(vec2 uv, float time) {
  vec2 i_uv = floor(uv);
  vec2 f_uv = fract(uv);

  float spreading = .25 * clamp(u_spreading, 0., 1.);

  float minDist = 1.;
  vec2 randomizer = vec2(0.);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 tileOffset = vec2(float(x), float(y));
      vec2 rand = randomGB(i_uv + tileOffset);
      vec2 cellCenter = vec2(.5 + 1e-4);
      cellCenter += spreading * cos(time + TWO_PI * rand);
      cellCenter -= .5;
      cellCenter = rotate(cellCenter, randomR(vec2(rand.x, rand.y)) + .1 * time);
      cellCenter += .5;
      float dist = length(tileOffset + cellCenter - f_uv);
      if (dist < minDist) {
        minDist = dist;
        randomizer = rand;
      }
    }
  }

  return vec3(minDist, randomizer);
}

void main() {

  vec2 shape_uv = v_patternUV;
  shape_uv *= 1.5;

  const float firstFrameOffset = -10.;
  float t = u_time + firstFrameOffset;

  vec3 voronoi = voronoiShape(shape_uv, t) + 1e-4;

  float radius = .25 * clamp(u_size, 0., 1.) - .5 * clamp(u_sizeRange, 0., 1.) * voronoi[2];
  float dist = voronoi[0];
  float edgeWidth = fwidth(dist);
  float dots = 1. - smoothstep(radius - edgeWidth, radius + edgeWidth, dist);

  float shape = voronoi[1];

  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${Ea.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
    localT = round(localT * steps) / steps;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 color = gradient.rgb * dots;
  float opacity = gradient.a * dots;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`;var Gl=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colorFill;
uniform vec4 u_colorStroke;
uniform float u_dotSize;
uniform float u_gapX;
uniform float u_gapY;
uniform float u_strokeWidth;
uniform float u_sizeRange;
uniform float u_opacityRange;
uniform float u_shape;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${rt}

float polygon(vec2 p, float N, float rot) {
  float a = atan(p.x, p.y) + rot;
  float r = TWO_PI / float(N);

  return cos(floor(.5 + a / r) * r - a) * length(p);
}

void main() {

  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  vec2 shape_uv = 100. * v_patternUV;

  vec2 gap = max(abs(vec2(u_gapX, u_gapY)), vec2(1e-6));
  vec2 grid = fract(shape_uv / gap) + 1e-4;
  vec2 grid_idx = floor(shape_uv / gap);
  float sizeRandomizer = .5 + .8 * snoise(2. * vec2(grid_idx.x * 100., grid_idx.y));
  float opacity_randomizer = .5 + .7 * snoise(2. * vec2(grid_idx.y, grid_idx.x));

  vec2 center = vec2(0.5) - 1e-3;
  vec2 p = (grid - center) * vec2(u_gapX, u_gapY);

  float baseSize = u_dotSize * (1. - sizeRandomizer * u_sizeRange);
  float strokeWidth = u_strokeWidth * (1. - sizeRandomizer * u_sizeRange);

  float dist;
  if (u_shape < 0.5) {
    // Circle
    dist = length(p);
  } else if (u_shape < 1.5) {
    // Diamond
    strokeWidth *= 1.5;
    dist = polygon(1.5 * p, 4., .25 * PI);
  } else if (u_shape < 2.5) {
    // Square
    dist = polygon(1.03 * p, 4., 1e-3);
  } else {
    // Triangle
    strokeWidth *= 1.5;
    p = p * 2. - 1.;
    p *= .9;
    p.y = 1. - p.y;
    p.y -= .75 * baseSize;
    dist = polygon(p, 3., 1e-3);
  }

  float edgeWidth = fwidth(dist);
  float shapeOuter = 1. - smoothstep(baseSize - edgeWidth, baseSize + edgeWidth, dist - strokeWidth);
  float shapeInner = 1. - smoothstep(baseSize - edgeWidth, baseSize + edgeWidth, dist);
  float stroke = shapeOuter - shapeInner;

  float dotOpacity = max(0., 1. - opacity_randomizer * u_opacityRange);
  stroke *= dotOpacity;
  shapeInner *= dotOpacity;

  stroke *= u_colorStroke.a;
  shapeInner *= u_colorFill.a;

  vec3 color = vec3(0.);
  color += stroke * u_colorStroke.rgb;
  color += shapeInner * u_colorFill.rgb;
  color += (1. - shapeInner - stroke) * u_colorBack.rgb * u_colorBack.a;

  float opacity = 0.;
  opacity += stroke;
  opacity += shapeInner;
  opacity += (1. - opacity) * u_colorBack.a;

  fragColor = vec4(color, opacity);
}
`,Ll={circle:0,diamond:1,square:2,triangle:3};var Fa={maxColorCount:10},Wl=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${Fa.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${rt}

float getNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

float steppedSmooth(float m, float steps, float softness) {
  float stepT = floor(m * steps) / steps;
  float f = m * steps - floor(m * steps);
  float fw = steps * fwidth(m);
  float smoothed = smoothstep(.5 - softness, min(1., .5 + softness + fw), f);
  return stepT + smoothed / steps;
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .1;

  float t = .2 * u_time;

  float shape = .5 + .5 * getNoise(shape_uv, t);

  bool u_extraSides = true;

  float mixer = shape * (u_colorsCount - 1.);
  if (u_extraSides == true) {
    mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  }

  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${Fa.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    float localM = clamp(mixer - float(i - 1), 0., 1.);
    localM = steppedSmooth(localM, steps, .5 * u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localM);
  }

  if (u_extraSides == true) {
    if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
      float localM = mixer + 1.;
      if (mixer > (u_colorsCount - 1.)) {
        localM = mixer - (u_colorsCount - 1.);
      }
      localM = steppedSmooth(localM, steps, .5 * u_softness);
      vec4 cFst = u_colors[0];
      cFst.rgb *= cFst.a;
      vec4 cLast = u_colors[int(u_colorsCount - 1.)];
      cLast.rgb *= cLast.a;
      gradient = mix(cLast, cFst, localM);
    }
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Pr={maxColorCount:8,maxBallsCount:20},Yl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Pr.maxColorCount}];
uniform float u_colorsCount;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_count;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${Ut}
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  vec2 p0 = vec2(i, 0.0);
  vec2 p1 = vec2(i + 1.0, 0.0);
  return mix(randomR(p0), randomR(p1), u);
}

float getBallShape(vec2 uv, vec2 c, float p) {
  float s = .5 * length(uv - c);
  s = 1. - clamp(s, 0., 1.);
  s = pow(s, p);
  return s;
}

void main() {
  vec2 shape_uv = v_objectUV;

  shape_uv += .5;

  const float firstFrameOffset = 2503.4;
  float t = .2 * (u_time + firstFrameOffset);

  vec3 totalColor = vec3(0.);
  float totalShape = 0.;
  float totalOpacity = 0.;

  for (int i = 0; i < ${Pr.maxBallsCount}; i++) {
    if (i >= int(ceil(u_count))) break;

    float idxFract = float(i) / float(${Pr.maxBallsCount});
    float angle = TWO_PI * idxFract;

    float speed = 1. - .2 * idxFract;
    float noiseX = noise(angle * 10. + float(i) + t * speed);
    float noiseY = noise(angle * 20. + float(i) - t * speed);

    vec2 pos = vec2(.5) + 1e-4 + .9 * (vec2(noiseX, noiseY) - .5);

    int safeIndex = i % int(u_colorsCount + 0.5);
    vec4 ballColor = u_colors[safeIndex];
    ballColor.rgb *= ballColor.a;

    float sizeFrac = 1.;
    if (float(i) > floor(u_count - 1.)) {
      sizeFrac *= fract(u_count);
    }

    float shape = getBallShape(shape_uv, pos, 45. - 30. * u_size * sizeFrac);
    shape *= pow(u_size, .2);
    shape = smoothstep(0., 1., shape);

    totalColor += ballColor.rgb * shape;
    totalShape += shape;
    totalOpacity += ballColor.a * shape;
  }

  totalColor /= max(totalShape, 1e-4);
  totalOpacity /= max(totalShape, 1e-4);

  float edge_width = fwidth(totalShape);
  float finalShape = smoothstep(.4, .4 + edge_width, totalShape);

  vec3 color = totalColor * finalShape;
  float opacity = totalOpacity * finalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Ql=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_proportion;
uniform float u_softness;
uniform float u_octaveCount;
uniform float u_persistence;
uniform float u_lacunarity;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${Po}
${ot}

float hash31(vec3 p) {
  p = fract(p * 0.3183099) + 0.1;
  p += dot(p, p.yzx + 19.19);
  return fract(p.x * (p.y + p.z));
}

vec3 gradientPredefined(float hash) {
  int idx = int(hash * 12.0) % 12;

  if (idx == 0) return vec3(1, 1, 0);
  if (idx == 1) return vec3(-1, 1, 0);
  if (idx == 2) return vec3(1, -1, 0);
  if (idx == 3) return vec3(-1, -1, 0);
  if (idx == 4) return vec3(1, 0, 1);
  if (idx == 5) return vec3(-1, 0, 1);
  if (idx == 6) return vec3(1, 0, -1);
  if (idx == 7) return vec3(-1, 0, -1);
  if (idx == 8) return vec3(0, 1, 1);
  if (idx == 9) return vec3(0, -1, 1);
  if (idx == 10) return vec3(0, 1, -1);
  return vec3(0, -1, -1);// idx == 11
}

float interpolateSafe(float v000, float v001, float v010, float v011,
float v100, float v101, float v110, float v111, vec3 t) {
  t = clamp(t, 0.0, 1.0);

  float v00 = mix(v000, v100, t.x);
  float v01 = mix(v001, v101, t.x);
  float v10 = mix(v010, v110, t.x);
  float v11 = mix(v011, v111, t.x);

  float v0 = mix(v00, v10, t.y);
  float v1 = mix(v01, v11, t.y);

  return mix(v0, v1, t.z);
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec3 position, float seed) {
  position += vec3(seed * 127.1, seed * 311.7, seed * 74.7);

  vec3 i = floor(position);
  vec3 f = fract(position);
  float h000 = hash31(i);
  float h001 = hash31(i + vec3(0, 0, 1));
  float h010 = hash31(i + vec3(0, 1, 0));
  float h011 = hash31(i + vec3(0, 1, 1));
  float h100 = hash31(i + vec3(1, 0, 0));
  float h101 = hash31(i + vec3(1, 0, 1));
  float h110 = hash31(i + vec3(1, 1, 0));
  float h111 = hash31(i + vec3(1, 1, 1));
  vec3 g000 = gradientPredefined(h000);
  vec3 g001 = gradientPredefined(h001);
  vec3 g010 = gradientPredefined(h010);
  vec3 g011 = gradientPredefined(h011);
  vec3 g100 = gradientPredefined(h100);
  vec3 g101 = gradientPredefined(h101);
  vec3 g110 = gradientPredefined(h110);
  vec3 g111 = gradientPredefined(h111);
  float v000 = dot(g000, f - vec3(0, 0, 0));
  float v001 = dot(g001, f - vec3(0, 0, 1));
  float v010 = dot(g010, f - vec3(0, 1, 0));
  float v011 = dot(g011, f - vec3(0, 1, 1));
  float v100 = dot(g100, f - vec3(1, 0, 0));
  float v101 = dot(g101, f - vec3(1, 0, 1));
  float v110 = dot(g110, f - vec3(1, 1, 0));
  float v111 = dot(g111, f - vec3(1, 1, 1));

  vec3 u = fade(f);
  return interpolateSafe(v000, v001, v010, v011, v100, v101, v110, v111, u);
}

float p_noise(vec3 position, int octaveCount, float persistence, float lacunarity) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 10.0;
  float maxValue = 0.0;
  octaveCount = clamp(octaveCount, 1, 8);

  for (int i = 0; i < octaveCount; i++) {
    float seed = float(i) * 0.7319;
    value += perlinNoise(position * frequency, seed) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return value;
}

float get_max_amp(float persistence, float octaveCount) {
  persistence = clamp(persistence * 0.999, 0.0, 0.999);
  octaveCount = clamp(octaveCount, 1.0, 8.0);

  if (abs(persistence - 1.0) < 0.001) {
    return octaveCount;
  }

  return (1.0 - pow(persistence, octaveCount)) / max(1e-4, (1.0 - persistence));
}

void main() {
  vec2 uv = v_patternUV;
  uv *= .5;

  float t = .2 * u_time;

  vec3 p = vec3(uv, t);

  float octCount = floor(u_octaveCount);
  float noise = p_noise(p, int(octCount), u_persistence, u_lacunarity);

  float max_amp = get_max_amp(u_persistence, octCount);
  float noise_normalized = clamp((noise + max_amp) / max(1e-4, (2. * max_amp)) + (u_proportion - .5), 0.0, 1.0);
  float sharpness = clamp(u_softness, 0., 1.);
  float smooth_w = 0.5 * max(fwidth(noise_normalized), 0.001);
  float res = smoothstep(
  .5 - .5 * sharpness - smooth_w,
  .5 + .5 * sharpness + smooth_w,
  noise_normalized
  );

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var za={maxColorCount:5},Hl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${za.maxColorCount}];
uniform float u_colorsCount;

uniform float u_stepsPerColor;
uniform vec4 u_colorGlow;
uniform vec4 u_colorGap;
uniform float u_distortion;
uniform float u_gap;
uniform float u_glow;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${Ar}

vec4 voronoi(vec2 x, float t) {
  vec2 ip = floor(x);
  vec2 fp = fract(x);

  vec2 mg, mr;
  float md = 8.;
  float rand = 0.;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = randomGB(ip + g);
      float raw_hash = o.x;
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      float d = dot(r, r);

      if (d < md) {
        md = d;
        mr = r;
        mg = g;
        rand = raw_hash;
      }
    }
  }

  md = 8.;
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 g = mg + vec2(float(i), float(j));
      vec2 o = randomGB(ip + g);
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      if (dot(mr - r, mr - r) > .00001) {
        md = min(md, dot(.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  return vec4(md, mr, rand);
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= 1.25;

  float t = u_time;

  vec4 voronoiRes = voronoi(shape_uv, t);

  float shape = clamp(voronoiRes.w, 0., 1.);
  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${za.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
    localT = round(localT * steps) / steps;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 cellColor = gradient.rgb;
  float cellOpacity = gradient.a;

  float glows = length(voronoiRes.yz * u_glow);
  glows = pow(glows, 1.5);

  vec3 color = mix(cellColor, u_colorGlow.rgb * u_colorGlow.a, u_colorGlow.a * glows);
  float opacity = cellOpacity + u_colorGlow.a * glows;

  float edge = voronoiRes.x;
  float smoothEdge = .02 / (2. * u_scale) * (1. + .5 * u_gap);
  edge = smoothstep(u_gap - smoothEdge, u_gap + smoothEdge, edge);

  color = mix(u_colorGap.rgb * u_colorGap.a, color, edge);
  opacity = mix(u_colorGap.a, opacity, edge);

  fragColor = vec4(color, opacity);
}
`;var jl=`#version 300 es
precision mediump float;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_shape;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_spacing;
uniform float u_proportion;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${V}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= 4.;

  float wave = .5 * cos(shape_uv.x * u_frequency * TWO_PI);
  float zigzag = 2. * abs(fract(shape_uv.x * u_frequency) - .5);
  float irregular = sin(shape_uv.x * .25 * u_frequency * TWO_PI) * cos(shape_uv.x * u_frequency * TWO_PI);
  float irregular2 = .75 * (sin(shape_uv.x * u_frequency * TWO_PI) + .5 * cos(shape_uv.x * .5 * u_frequency * TWO_PI));

  float offset = mix(zigzag, wave, smoothstep(0., 1., u_shape));
  offset = mix(offset, irregular, smoothstep(1., 2., u_shape));
  offset = mix(offset, irregular2, smoothstep(2., 3., u_shape));
  offset *= 2. * u_amplitude;

  float spacing = (.001 + u_spacing);
  float shape = .5 + .5 * sin((shape_uv.y + offset) * PI / spacing);

  float aa = .0001 + fwidth(shape);
  float dc = 1. - clamp(u_proportion, 0., 1.);
  float e0 = dc - u_softness - aa;
  float e1 = dc + u_softness + aa;
  float res = smoothstep(min(e0, e1), max(e0, e1), shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`;var Ua={maxColorCount:10},Xl=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${Ua.maxColorCount}];
uniform float u_colorsCount;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${X}
float randomG(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomG(i);
  float b = randomG(i + vec2(1.0, 0.0));
  float c = randomG(i + vec2(0.0, 1.0));
  float d = randomG(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}


void main() {
  vec2 uv = v_patternUV;
  uv *= .5;

  const float firstFrameOffset = 118.;
  float t = 0.0625 * (u_time + firstFrameOffset);

  float n1 = valueNoise(uv * 1. + t);
  float n2 = valueNoise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float swirl = u_swirl;
  for (int i = 1; i <= 20; i++) {
    if (i >= int(u_swirlIterations)) break;
    float iFloat = float(i);
    //    swirl *= (1. - smoothstep(.0, .25, length(fwidth(uv))));
    uv.x += swirl / iFloat * cos(t + iFloat * 1.5 * uv.y);
    uv.y += swirl / iFloat * cos(t + iFloat * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);

  float shape = 0.;
  if (u_shape < .5) {
    vec2 checksShape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checksShape_uv.x) * cos(checksShape_uv.y);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripesShape_uv = uv * (2. * u_shapeScale);
    float f = fract(stripesShape_uv.y);
    shape = smoothstep(.0, .55, f) * (1.0 - smoothstep(.45, 1., f));
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float shapeScaling = 5. * (1. - u_shapeScale);
    float e0 = 0.45 - shapeScaling;
    float e1 = 0.55 + shapeScaling;
    shape = smoothstep(min(e0, e1), max(e0, e1), 1.0 - uv.y + 0.3 * (proportion - 0.5));
  }

  float mixer = shape * (u_colorsCount - 1.);
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  float aa = fwidth(shape);
  for (int i = 1; i < ${Ua.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float m = clamp(mixer - float(i - 1), 0.0, 1.0);

    float localMixerStart = floor(m);
    float softness = .5 * u_softness + fwidth(m);
    float smoothed = smoothstep(max(0., .5 - softness - aa), min(1., .5 + softness + aa), m - localMixerStart);
    float stepped = localMixerStart + smoothed;

    m = mix(stepped, m, u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${ie}

  fragColor = vec4(color, opacity);
}
`,Kl={checks:0,stripes:1,edge:2};var Ra={maxColorCount:5},ql=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colorBloom;
uniform vec4 u_colors[${Ra.maxColorCount}];
uniform float u_colorsCount;

uniform float u_density;
uniform float u_spotty;
uniform float u_midSize;
uniform float u_midIntensity;
uniform float u_intensity;
uniform float u_bloom;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${X}
${Ut}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

${Po}

float raysShape(vec2 uv, float r, float freq, float intensity, float radius) {
  float a = atan(uv.y, uv.x);
  vec2 left = vec2(a * freq, r);
  vec2 right = vec2(fract(a / TWO_PI) * TWO_PI * freq, r);
  float n_left = pow(valueNoise(left), intensity);
  float n_right = pow(valueNoise(right), intensity);
  float shape = mix(n_right, n_left, smoothstep(-.15, .15, uv.x));
  return shape;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = .2 * u_time;

  float radius = length(shape_uv);
  float spots = 6.5 * abs(u_spotty);

  float intensity = 4. - 3. * clamp(u_intensity, 0., 1.);

  float delta = 1. - smoothstep(0., 1., radius);

  float midSize = 10. * abs(u_midSize);
  float ms_lo = 0.02 * midSize;
  float ms_hi = max(midSize, 1e-6);
  float middleShape = pow(u_midIntensity, 0.3) * (1. - smoothstep(ms_lo, ms_hi, 3.0 * radius));
  middleShape = pow(middleShape, 5.0);

  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;

  for (int i = 0; i < ${Ra.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 rotatedUV = rotate(shape_uv, float(i) + 1.0);

    float r1 = radius * (1.0 + 0.4 * float(i)) - 3.0 * t;
    float r2 = 0.5 * radius * (1.0 + spots) - 2.0 * t;
    float density = 6. * u_density + step(.5, u_density) * pow(4.5 * (u_density - .5), 4.);
    float f = mix(1.0, 3.0 + 0.5 * float(i), hash11(float(i) * 15.)) * density;

    float ray = raysShape(rotatedUV, r1, 5.0 * f, intensity, radius);
    ray *= raysShape(rotatedUV, r2, 4.0 * f, intensity, radius);
    ray += (1. + 4. * ray) * middleShape;
    ray = clamp(ray, 0.0, 1.0);

    float srcAlpha = u_colors[i].a * ray;
    vec3 srcColor = u_colors[i].rgb * srcAlpha;

    vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * srcColor;
    float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * srcAlpha;

    vec3 addBlendColor = accumColor + srcColor;
    float addBlendAlpha = accumAlpha + srcAlpha;

    accumColor = mix(alphaBlendColor, addBlendColor, u_bloom);
    accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_bloom);
  }

  float overlayAlpha = u_colorBloom.a;
  vec3 overlayColor = u_colorBloom.rgb * overlayAlpha;

  vec3 colorWithOverlay = accumColor + accumAlpha * overlayColor;
  accumColor = mix(accumColor, colorWithOverlay, u_bloom);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;

  vec3 color = accumColor + (1. - accumAlpha) * bgColor;
  float opacity = accumAlpha + (1. - accumAlpha) * u_colorBack.a;
  color = clamp(color, 0., 1.);
  opacity = clamp(opacity, 0., 1.);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Jl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_density;
uniform float u_distortion;
uniform float u_strokeWidth;
uniform float u_strokeCap;
uniform float u_strokeTaper;
uniform float u_noise;
uniform float u_noiseFrequency;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${rt}

void main() {
  vec2 uv = 2. * v_patternUV;

  float t = u_time;
  float l = length(uv);
  float density = clamp(u_density, 0., 1.);
  l = pow(max(l, 1e-6), density);
  float angle = atan(uv.y, uv.x) - t;
  float angleNormalised = angle / TWO_PI;

  angleNormalised += .125 * u_noise * snoise(16. * pow(u_noiseFrequency, 3.) * uv);

  float offset = l + angleNormalised;
  offset -= u_distortion * (sin(4. * l - .5 * t) * cos(PI + l + .5 * t));
  float stripe = fract(offset);

  float shape = 2. * abs(stripe - .5);
  float width = 1. - clamp(u_strokeWidth, .005 * u_strokeTaper, 1.);


  float wCap = mix(width, (1. - stripe) * (1. - step(.5, stripe)), (1. - clamp(l, 0., 1.)));
  width = mix(width, wCap, u_strokeCap);
  width *= (1. - clamp(u_strokeTaper, 0., 1.) * l);

  float fw = fwidth(offset);
  float fwMult = 4. - 3. * (smoothstep(.05, .4, 2. * u_strokeWidth) * smoothstep(.05, .4, 2. * (1. - u_strokeWidth)));
  float pixelSize = mix(fwMult * fw, fwidth(shape), clamp(fw, 0., 1.));
  pixelSize = mix(pixelSize, .002, u_strokeCap * (1. - clamp(l, 0., 1.)));

  float res = smoothstep(width - pixelSize - u_softness, width + pixelSize + u_softness, shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Ma={maxColorCount:10},Zl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Ma.maxColorCount}];
uniform float u_colorsCount;
uniform float u_bandCount;
uniform float u_twist;
uniform float u_center;
uniform float u_proportion;
uniform float u_softness;
uniform float u_noise;
uniform float u_noiseFrequency;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${rt}
${X}

void main() {
  vec2 shape_uv = v_objectUV;

  float l = length(shape_uv);
  l = max(1e-4, l);

  float t = u_time;

  float angle = ceil(u_bandCount) * atan(shape_uv.y, shape_uv.x) + t;
  float angle_norm = angle / TWO_PI;

  float twist = 3. * clamp(u_twist, 0., 1.);
  float offset = pow(l, -twist) + angle_norm;

  float shape = fract(offset);
  shape = 1. - abs(2. * shape - 1.);
  shape += u_noise * snoise(15. * pow(u_noiseFrequency, 2.) * shape_uv);

  float mid = smoothstep(.2, .2 + .8 * u_center, pow(l, twist));
  shape = mix(0., shape, mid);

  float proportion = clamp(u_proportion, 0., 1.);
  float exponent = mix(.25, 1., proportion * 2.);
  exponent = mix(exponent, 10., max(0., proportion * 2. - 1.));
  shape = pow(shape, exponent);

  float mixer = shape * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float outerShape = 0.;
  for (int i = 1; i < ${Ma.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;

    float m = clamp(mixer - float(i - 1), 0., 1.);
    float aa = fwidth(m);
    m = smoothstep(.5 - .5 * u_softness - aa, .5 + .5 * u_softness + aa, m);

    if (i == 1) {
      outerShape = m;
    }

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  float midAA = .1 * fwidth(pow(l, -twist));
  float outerMid = smoothstep(.2, .2 + midAA, pow(l, twist));
  outerShape = mix(0., outerShape, outerMid);

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var $l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${rt}
${V}
${Po}
${ot}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,eu={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},Ia={random:1,"2x2":2,"4x4":3,"8x8":4};var Va={maxColorCount:7},tu=`#version 300 es
precision lowp float;

uniform mediump float u_time;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Va.maxColorCount}];
uniform float u_colorsCount;
uniform float u_softness;
uniform float u_intensity;
uniform float u_noise;
uniform float u_shape;

uniform mediump float u_originX;
uniform mediump float u_originY;
uniform mediump float u_worldWidth;
uniform mediump float u_worldHeight;
uniform mediump float u_fit;

uniform mediump float u_scale;
uniform mediump float u_rotation;
uniform mediump float u_offsetX;
uniform mediump float u_offsetY;

in vec2 v_objectUV;
in vec2 v_patternUV;
in vec2 v_objectBoxSize;
in vec2 v_patternBoxSize;

out vec4 fragColor;

${V}
${rt}
${X}
${Ut}

float valueNoiseR(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
vec4 fbmR(vec2 n0, vec2 n1, vec2 n2, vec2 n3) {
  float amplitude = 0.2;
  vec4 total = vec4(0.);
  for (int i = 0; i < 3; i++) {
    n0 = rotate(n0, 0.3);
    n1 = rotate(n1, 0.3);
    n2 = rotate(n2, 0.3);
    n3 = rotate(n3, 0.3);
    total.x += valueNoiseR(n0) * amplitude;
    total.y += valueNoiseR(n1) * amplitude;
    total.z += valueNoiseR(n2) * amplitude;
    total.z += valueNoiseR(n3) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    n2 *= 1.99;
    n3 *= 1.99;
    amplitude *= 0.6;
  }
  return total;
}

${Po}

vec2 truchet(vec2 uv, float idx){
  idx = fract(((idx - .5) * 2.));
  if (idx > 0.75) {
    uv = vec2(1.0) - uv;
  } else if (idx > 0.5) {
    uv = vec2(1.0 - uv.x, uv.y);
  } else if (idx > 0.25) {
    uv = 1.0 - vec2(1.0 - uv.x, uv.y);
  }
  return uv;
}

void main() {

  const float firstFrameOffset = 7.;
  float t = .1 * (u_time + firstFrameOffset);

  vec2 shape_uv = vec2(0.);
  vec2 grain_uv = vec2(0.);

  float r = u_rotation * PI / 180.;
  float cr = cos(r);
  float sr = sin(r);
  mat2 graphicRotation = mat2(cr, sr, -sr, cr);
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  if (u_shape > 3.5) {
    shape_uv = v_objectUV;
    grain_uv = shape_uv;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    grain_uv -= graphicOffset;
    grain_uv *= v_objectBoxSize;
    grain_uv *= .7;
  } else {
    shape_uv = .5 * v_patternUV;
    grain_uv = 100. * v_patternUV;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    if (u_fit > 0.) {
      vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
      givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
      float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
      vec2 patternBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
      );
      patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
      float patternBoxNoFitBoxWidth = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
      grain_uv /= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
    }
    vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
    grain_uv -= graphicOffset / patternBoxScale;
    grain_uv *= 1.6;
  }


  float shape = 0.;

  if (u_shape < 1.5) {
    // Sine wave

    float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

  } else if (u_shape < 2.5) {
    // Grid (dots)

    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = hash11(stripeIdx * 100.);
    rand = sign(rand - .5) * pow(4. * abs(rand), .3);
    shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);
    shape = pow(abs(shape), 4.);

  } else if (u_shape < 3.5) {
    // Truchet pattern

    float n2 = valueNoiseR(shape_uv * .4 - 3.75 * t);
    shape_uv.x += 10.;
    shape_uv *= .6;

    vec2 tile = truchet(fract(shape_uv), randomR(floor(shape_uv)));

    float distance1 = length(tile);
    float distance2 = length(tile - vec2(1.));

    n2 -= .5;
    n2 *= .1;
    shape = smoothstep(.2, .55, distance1 + n2) * (1. - smoothstep(.45, .8, distance1 - n2));
    shape += smoothstep(.2, .55, distance2 + n2) * (1. - smoothstep(.45, .8, distance2 - n2));

    shape = pow(shape, 1.5);

  } else if (u_shape < 4.5) {
    // Corners

    shape_uv *= .6;
    vec2 outer = vec2(.5);

    vec2 bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * sin(5.25 * t)));
    vec2 tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape = 1. - bl.x * bl.y * tr.x * tr.y;

    shape_uv = -shape_uv;
    bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * cos(5.25 * t)));
    tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape -= bl.x * bl.y * tr.x * tr.y;

    shape = 1. - smoothstep(0., 1., shape);

  } else if (u_shape < 5.5) {
    // Ripple

    shape_uv *= 2.;
    float dist = length(.4 * shape_uv);
    float waves = sin(pow(dist, 1.2) * 5. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Blob

    t *= 2.;

    vec2 f1_traj = .25 * vec2(1.3 * sin(t), .2 + 1.3 * cos(.6 * t + 4.));
    vec2 f2_traj = .2 * vec2(1.2 * sin(-t), 1.3 * sin(1.6 * t));
    vec2 f3_traj = .25 * vec2(1.7 * cos(-.6 * t), cos(-1.6 * t));
    vec2 f4_traj = .3 * vec2(1.4 * cos(.8 * t), 1.2 * sin(-.6 * t - 3.));

    shape = .5 * pow(1. - clamp(0., 1., length(shape_uv + f1_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f2_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f3_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f4_traj)), 5.);

    shape = smoothstep(.0, .9, shape);
    float edge = smoothstep(.25, .3, shape);
    shape = mix(.0, shape, edge);

  } else {
    // Sphere

    shape_uv *= 2.;
    float d = 1. - pow(length(shape_uv), 2.);
    vec3 pos = vec3(shape_uv, sqrt(max(d, 0.)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }

  float baseNoise = snoise(grain_uv * .5);
  vec4 fbmVals = fbmR(
  .002 * grain_uv + 10.,
  .003 * grain_uv,
  .001 * grain_uv,
  rotate(.4 * grain_uv, 2.)
  );
  float grainDist = baseNoise * snoise(grain_uv * .2) - fbmVals.x - fbmVals.y;
  float rawNoise = .75 * baseNoise - fbmVals.w - fbmVals.z;
  float noise = clamp(rawNoise, 0., 1.);

  shape += u_intensity * 2. / u_colorsCount * (grainDist + .5);
  shape += u_noise * 10. / u_colorsCount * noise;

  float aa = fwidth(shape);

  shape = clamp(shape - .5 / u_colorsCount, 0., 1.);
  float totalShape = smoothstep(0., u_softness + 2. * aa, clamp(shape * u_colorsCount, 0., 1.));
  float mixer = shape * (u_colorsCount - 1.);

  int cntStop = int(u_colorsCount) - 1;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${Va.maxColorCount}; i++) {
    if (i > cntStop) break;

    float localT = clamp(mixer - float(i - 1), 0., 1.);
    localT = smoothstep(.5 - .5 * u_softness - aa, .5 + .5 * u_softness + aa, localT);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * totalShape;
  float opacity = gradient.a * totalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`,ou={wave:1,dots:2,truchet:3,corners:4,ripple:5,blob:6,sphere:7};var Er={maxColorCount:5,maxSpots:4},ru=`#version 300 es
precision lowp float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Er.maxColorCount}];
uniform float u_colorsCount;
uniform float u_roundness;
uniform float u_thickness;
uniform float u_marginLeft;
uniform float u_marginRight;
uniform float u_marginTop;
uniform float u_marginBottom;
uniform float u_aspectRatio;
uniform float u_softness;
uniform float u_intensity;
uniform float u_bloom;
uniform float u_spotSize;
uniform float u_spots;
uniform float u_pulse;
uniform float u_smoke;
uniform float u_smokeSize;

uniform sampler2D u_noiseTexture;

in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;

out vec4 fragColor;

${V}

float beat(float time) {
  float first = pow(abs(sin(time * TWO_PI)), 10.);
  float second = pow(abs(sin((time - .15) * TWO_PI)), 10.);

  return clamp(first + 0.6 * second, 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float roundedBox(vec2 uv, vec2 halfSize, float distance, float cornerDistance, float thickness, float softness) {
  float borderDistance = abs(distance);
  float aa = 2. * fwidth(distance);
  float border = 1. - sst(min(mix(thickness, -thickness, softness), thickness + aa), max(mix(thickness, -thickness, softness), thickness + aa), borderDistance);
  float cornerFadeCircles = 0.;
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv + halfSize) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - vec2(-halfSize.x, halfSize.y)) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - vec2(halfSize.x, -halfSize.y)) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - halfSize) / thickness)));
  aa = fwidth(cornerDistance);
  float cornerFade = sst(0., mix(aa, thickness, softness), cornerDistance);
  cornerFade *= cornerFadeCircles;
  border += cornerFade;
  return border;
}

${Ar}

float randomG(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomG(i);
  float b = randomG(i + vec2(1.0, 0.0));
  float c = randomG(i + vec2(0.0, 1.0));
  float d = randomG(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

void main() {
  const float firstFrameOffset = 109.;
  float t = 1.2 * (u_time + firstFrameOffset);

  vec2 borderUV = v_responsiveUV;
  float pulse = u_pulse * beat(.18 * u_time);

  float canvasRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 halfSize = vec2(.5);
  borderUV.x *= max(canvasRatio, 1.);
  borderUV.y /= min(canvasRatio, 1.);
  halfSize.x *= max(canvasRatio, 1.);
  halfSize.y /= min(canvasRatio, 1.);

  float mL = u_marginLeft;
  float mR = u_marginRight;
  float mT = u_marginTop;
  float mB = u_marginBottom;
  float mX = mL + mR;
  float mY = mT + mB;

  if (u_aspectRatio > 0.) {
    float shapeRatio = canvasRatio * (1. - mX) / max(1. - mY, 1e-6);
    float freeX = shapeRatio > 1. ? (1. - mX) * (1. - 1. / max(abs(shapeRatio), 1e-6)) : 0.;
    float freeY = shapeRatio < 1. ? (1. - mY) * (1. - shapeRatio) : 0.;
    mL += freeX * 0.5;
    mR += freeX * 0.5;
    mT += freeY * 0.5;
    mB += freeY * 0.5;
    mX = mL + mR;
    mY = mT + mB;
  }

  float thickness = .5 * u_thickness * min(halfSize.x, halfSize.y);

  halfSize.x *= (1. - mX);
  halfSize.y *= (1. - mY);

  vec2 centerShift = vec2(
  (mL - mR) * max(canvasRatio, 1.) * 0.5,
  (mB - mT) / min(canvasRatio, 1.) * 0.5
  );

  borderUV -= centerShift;
  halfSize -= mix(thickness, 0., u_softness);

  float radius = mix(0., min(halfSize.x, halfSize.y), u_roundness);
  vec2 d = abs(borderUV) - halfSize + radius;
  float outsideDistance = length(max(d, .0001)) - radius;
  float insideDistance = min(max(d.x, d.y), .0001);
  float cornerDistance = abs(min(max(d.x, d.y) - .45 * radius, .0));
  float distance = outsideDistance + insideDistance;

  float borderThickness = mix(thickness, 3. * thickness, u_softness);
  float border = roundedBox(borderUV, halfSize, distance, cornerDistance, borderThickness, u_softness);
  border = pow(border, 1. + u_softness);

  vec2 smokeUV = .3 * u_smokeSize * v_patternUV;
  float smoke = clamp(3. * valueNoise(2.7 * smokeUV + .5 * t), 0., 1.);
  smoke -= valueNoise(3.4 * smokeUV - .5 * t);
  float smokeThickness = thickness + .2;
  smokeThickness = min(.4, max(smokeThickness, .1));
  smoke *= roundedBox(borderUV, halfSize, distance, cornerDistance, smokeThickness, 1.);
  smoke = 30. * smoke * smoke;
  smoke *= mix(0., .5, pow(u_smoke, 2.));
  smoke *= mix(1., pulse, u_pulse);
  smoke = clamp(smoke, 0., 1.);
  border += smoke;

  border = clamp(border, 0., 1.);

  vec3 blendColor = vec3(0.);
  float blendAlpha = 0.;
  vec3 addColor = vec3(0.);
  float addAlpha = 0.;

  float bloom = 4. * u_bloom;
  float intensity = 1. + (1. + 4. * u_softness) * u_intensity;

  float angle = atan(borderUV.y, borderUV.x) / TWO_PI;

  for (int colorIdx = 0; colorIdx < ${Er.maxColorCount}; colorIdx++) {
    if (colorIdx >= int(u_colorsCount)) break;
    float colorIdxF = float(colorIdx);

    vec3 c = u_colors[colorIdx].rgb * u_colors[colorIdx].a;
    float a = u_colors[colorIdx].a;

    for (int spotIdx = 0; spotIdx < ${Er.maxSpots}; spotIdx++) {
      if (spotIdx >= int(u_spots)) break;
      float spotIdxF = float(spotIdx);

      vec2 randVal = randomGB(vec2(spotIdxF * 10. + 2., 40. + colorIdxF));

      float time = (.1 + .15 * abs(sin(spotIdxF * (2. + colorIdxF)) * cos(spotIdxF * (2. + 2.5 * colorIdxF)))) * t + randVal.x * 3.;
      time *= mix(1., -1., step(.5, randVal.y));

      float mask = .5 + .5 * mix(
      sin(t + spotIdxF * (5. - 1.5 * colorIdxF)),
      cos(t + spotIdxF * (3. + 1.3 * colorIdxF)),
      step(mod(colorIdxF, 2.), .5)
      );

      float p = clamp(2. * u_pulse - randVal.x, 0., 1.);
      mask = mix(mask, pulse, p);

      float atg1 = fract(angle + time);
      float spotSize = .05 + .6 * pow(u_spotSize, 2.) + .05 * randVal.x;
      spotSize = mix(spotSize, .1, p);
      float sector = sst(.5 - spotSize, .5, atg1) * (1. - sst(.5, .5 + spotSize, atg1));

      sector *= mask;
      sector *= border;
      sector *= intensity;
      sector = clamp(sector, 0., 1.);

      vec3 srcColor = c * sector;
      float srcAlpha = a * sector;

      blendColor += ((1. - blendAlpha) * srcColor);
      blendAlpha = blendAlpha + (1. - blendAlpha) * srcAlpha;
      addColor += srcColor;
      addAlpha += srcAlpha;
    }
  }

  vec3 accumColor = mix(blendColor, addColor, bloom);
  float accumAlpha = mix(blendAlpha, addAlpha, bloom);
  accumAlpha = clamp(accumAlpha, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  vec3 color = accumColor + (1. - accumAlpha) * bgColor;
  float opacity = accumAlpha + (1. - accumAlpha) * u_colorBack.a;

  ${ie}

  fragColor = vec4(color, opacity);
}`,au={auto:0,square:1};var Fr={maxColorCount:7},nu=`#version 300 es
precision lowp float;

uniform float u_time;
uniform mediump float u_scale;

uniform vec4 u_colors[${Fr.maxColorCount}];
uniform float u_colorsCount;
uniform vec4 u_colorBack;
uniform float u_density;
uniform float u_angle1;
uniform float u_angle2;
uniform float u_length;
uniform bool u_edges;
uniform float u_blur;
uniform float u_fadeIn;
uniform float u_fadeOut;
uniform float u_gradient;

in vec2 v_objectUV;

out vec4 fragColor;

${V}

const float zLimit = .5;

vec2 getPanel(float angle, vec2 uv, float invLength, float aa) {
  float sinA = sin(angle);
  float cosA = cos(angle);

  float denom = sinA - uv.y * cosA;
  if (abs(denom) < .01) return vec2(0.);

  float z = uv.y / denom;

  if (z <= 0. || z > zLimit) return vec2(0.);

  float zRatio = z / zLimit;
  float panelMap = 1. - zRatio;
  float x = uv.x * (cosA * z + 1.) * invLength;

  float zOffset = zRatio - .5;
  float left = -.5 + zOffset * u_angle1;
  float right = .5 - zOffset * u_angle2;
  float blurX = aa + 2. * panelMap * u_blur;

  float leftEdge1 = left - blurX;
  float leftEdge2 = left + .25 * blurX;
  float rightEdge1 = right - .25 * blurX;
  float rightEdge2 = right + blurX;

  float panel = smoothstep(leftEdge1, leftEdge2, x) * (1.0 - smoothstep(rightEdge1, rightEdge2, x));
  panel *= mix(0., panel, smoothstep(0., .01 / max(u_scale, 1e-6), panelMap));

  float midScreen = abs(sinA);
  if (u_edges == true) {
    panelMap = mix(.99, panelMap, panel * clamp(panelMap / (.15 * (1. - pow(midScreen, .1))), 0.0, 1.0));
  } else if (midScreen < .07) {
    panel *= (midScreen * 15.);
  }

  return vec2(panel, panelMap);
}

vec4 blendColor(vec4 colorA, float panelMask, float panelMap) {
  float fade = 1. - smoothstep(.97 - .97 * u_fadeIn, 1., panelMap);

  fade *= smoothstep(-.2 * (1. - u_fadeOut), u_fadeOut, panelMap);

  vec3 blendedRGB = mix(vec3(0.), colorA.rgb, fade);
  float blendedAlpha = mix(0., colorA.a, fade);

  return vec4(blendedRGB, blendedAlpha) * panelMask;
}

void main() {
  vec2 uv = v_objectUV;
  uv *= 1.25;

  float t = .02 * u_time;
  t = fract(t);
  bool reverseTime = (t < 0.5);

  vec3 color = vec3(0.);
  float opacity = 0.;

  float aa = .005 / u_scale;
  int colorsCount = int(u_colorsCount);

  vec4 premultipliedColors[${Fr.maxColorCount}];
  for (int i = 0; i < ${Fr.maxColorCount}; i++) {
    if (i >= colorsCount) break;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    premultipliedColors[i] = c;
  }

  float invLength = 1.5 / max(u_length, .001);

  float totalColorWeight = 0.;
  int panelsNumber = 12;

  float densityNormalizer = 1.;
  if (colorsCount == 4) {
    panelsNumber = 16;
    densityNormalizer = 1.34;
  } else if (colorsCount == 5) {
    panelsNumber = 20;
    densityNormalizer = 1.67;
  } else if (colorsCount == 7) {
    panelsNumber = 14;
    densityNormalizer = 1.17;
  }

  float fPanelsNumber = float(panelsNumber);

  float totalPanelsShape = 0.;
  float panelGrad = 1. - clamp(u_gradient, 0., 1.);

  for (int set = 0; set < 2; set++) {
    bool isForward = (set == 0 && !reverseTime) || (set == 1 && reverseTime);
    if (!isForward) continue;

    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 1) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(t + offset);
      float angleNorm = densityFract / u_density;
      if (densityFract >= .5 || angleNorm >= .3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((.3 - angleNorm) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      if (angleNorm > .5) {
        angleNorm = 0.5;
      }
      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength, aa);
      if (panel[0] <= .001) continue;
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      float panelMap = panel[1];

      int colorIdx = idx % colorsCount;
      int nextColorIdx = (idx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }


    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 0) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(-t + offset);
      float angleNorm = -densityFract / u_density;
      if (densityFract >= .5 || angleNorm < -.3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((angleNorm + .3) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength, aa);
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      if (panelMask <= .001) continue;
      float panelMap = panel[1];

      int colorIdx = (colorsCount - (idx % colorsCount)) % colorsCount;
      if (colorIdx < 0) colorIdx += colorsCount;
      int nextColorIdx = (colorIdx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }
  }

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`;var Oa={maxColorCount:10},iu=`#version 300 es
precision mediump float;

uniform vec4 u_colors[${Oa.maxColorCount}];
uniform float u_colorsCount;

uniform float u_positions;
uniform float u_waveX;
uniform float u_waveXShift;
uniform float u_waveY;
uniform float u_waveYShift;
uniform float u_mixing;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${V}
${X}
${ot}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_waveX * center / i * cos(TWO_PI * u_waveXShift + i * 2. * smoothstep(.0, 1., uv.y));
    uv.y += u_waveY * center / i * cos(TWO_PI * u_waveYShift + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;
  float positionSeed = 25. + .33 * u_positions;

  for (int i = 0; i < ${Oa.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, positionSeed) + mixerGrain;
    float dist = length(uv - pos);
    dist = length(uv - pos);

    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float mixing = pow(u_mixing, .7);
    float power = mix(2., 1., mixing);
    dist = pow(dist, power);

    float w = 1. / (dist + 1e-3);
    float baseSharpness = mix(.0, 8., clamp(w, 0., 1.));
    float sharpness = mix(baseSharpness, 1., mixing);
    w = pow(w, sharpness);
    color += colorFraction * w;
    opacity += opacityFraction * w;
    totalWeight += w;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var Da={maxColorCount:10},su=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Da.maxColorCount}];
uniform float u_colorsCount;

uniform float u_radius;
uniform float u_focalDistance;
uniform float u_focalAngle;
uniform float u_falloff;
uniform float u_mixing;
uniform float u_distortion;
uniform float u_distortionShift;
uniform float u_distortionFreq;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${V}
${X}
${ot}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = 2. * v_objectUV;
  vec2 grainUV = uv * 1000.;

  vec2 center = vec2(0.);
  float angleRad = -radians(u_focalAngle + 90.);
  vec2 focalPoint = vec2(cos(angleRad), sin(angleRad)) * u_focalDistance;
  float radius = u_radius;

  vec2 c_to_uv = uv - center;
  vec2 f_to_uv = uv - focalPoint;
  vec2 f_to_c = center - focalPoint;
  float r = length(c_to_uv);

  float fragAngle = atan(c_to_uv.y, c_to_uv.x);
  float angleDiff = fract((fragAngle - angleRad + PI) / TWO_PI) * TWO_PI - PI;

  float halfAngle = acos(clamp(radius / max(u_focalDistance, 1e-4), 0.0, 1.0));
  float e0 = 0.6 * PI, e1 = halfAngle;
  float lo = min(e0, e1), hi = max(e0, e1);
  float s  = smoothstep(lo, hi, abs(angleDiff));
  float isInSector = (e1 >= e0) ? (1.0 - s) : s;

  float a = dot(f_to_uv, f_to_uv);
  float b = -2.0 * dot(f_to_uv, f_to_c);
  float c = dot(f_to_c, f_to_c) - radius * radius;

  float discriminant = b * b - 4.0 * a * c;
  float t = 1.0;

  if (discriminant >= 0.0) {
    float sqrtD = sqrt(discriminant);
    float div = max(1e-4, 2.0 * a);
    float t0 = (-b - sqrtD) / div;
    float t1 = (-b + sqrtD) / div;
    t = max(t0, t1);
    if (t < 0.0) t = 0.0;
  }

  float dist = length(f_to_uv);
  float normalized = dist / max(1e-4, length(f_to_uv * t));
  float shape = clamp(normalized, 0.0, 1.0);

  float falloffMapped = mix(.2 + .8 * max(0., u_falloff + 1.), mix(1., 15., u_falloff * u_falloff), step(.0, u_falloff));

  float falloffExp = mix(falloffMapped, 1., shape);
  shape = pow(shape, falloffExp);
  shape = 1. - clamp(shape, 0., 1.);


  float outerMask = .002;
  float outer = 1.0 - smoothstep(radius - outerMask, radius + outerMask, r);
  outer = mix(outer, 1., isInSector);

  shape = mix(0., shape, outer);
  shape *= 1. - smoothstep(radius - .01, radius, r);

  float angle = atan(f_to_uv.y, f_to_uv.x);
  shape -= pow(u_distortion, 2.) * shape * pow(abs(sin(PI * clamp(length(f_to_uv) - 0.2 + u_distortionShift, 0.0, 1.0))), 4.0) * (sin(u_distortionFreq * angle) + cos(floor(0.65 * u_distortionFreq) * angle));

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  float mixer = shape * u_colorsCount + mixerGrain;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float outerShape = 0.;
  for (int i = 1; i < ${Da.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;
    float mLinear = clamp(mixer - float(i - 1), 0.0, 1.0);

    float aa = fwidth(mLinear);
    float width = min(u_mixing, 0.5);
    float t = clamp((mLinear - (0.5 - width - aa)) / (2. * width + 2. * aa), 0., 1.);
    float p = mix(2., 1., clamp((u_mixing - 0.5) * 2., 0., 1.));
    float m = t < 0.5
      ? 0.5 * pow(2. * t, p)
      : 1. - 0.5 * pow(2. * (1. - t), p);

    float quadBlend = clamp((u_mixing - 0.5) * 2., 0., 1.);
    m = mix(m, m * m, 0.5 * quadBlend);
    
    if (i == 1) {
      outerShape = m;
    }

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var lu=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_contrast;
uniform float u_roughness;
uniform float u_fiber;
uniform float u_fiberSize;
uniform float u_crumples;
uniform float u_crumpleSize;
uniform float u_folds;
uniform float u_foldCount;
uniform float u_drops;
uniform float u_seed;
uniform float u_fade;

uniform sampler2D u_noiseTexture;

in vec2 v_imageUV;

out vec4 fragColor;

float getUvFrame(vec2 uv) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);

  float left   = smoothstep(0., aax, uv.x);
  float right = 1. - smoothstep(1. - aax, 1., uv.x);
  float bottom = smoothstep(0., aay, uv.y);
  float top = 1. - smoothstep(1. - aay, 1., uv.y);

  return left * right * bottom * top;
}

${V}
${X}
${Ut}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
float fbm(vec2 n) {
  float total = 0.0, amplitude = .4;
  for (int i = 0; i < 3; i++) {
    total += valueNoise(n) * amplitude;
    n *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}


float randomG(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float roughness(vec2 p) {
  p *= .1;
  float o = 0.;
  for (float i = 0.; ++i < 4.; p *= 2.1) {
    vec4 w = vec4(floor(p), ceil(p));
    vec2 f = fract(p);
    o += mix(
    mix(randomG(w.xy), randomG(w.xw), f.y),
    mix(randomG(w.zy), randomG(w.zw), f.y),
    f.x);
    o += .2 / exp(2. * abs(sin(.2 * p.x + .5 * p.y)));
  }
  return o / 3.;
}

${mm}

vec2 randomGB(vec2 p) {
  vec2 uv = floor(p) / 50. + .5;
  return texture(u_noiseTexture, fract(uv)).gb;
}
float crumpledNoise(vec2 t, float pw) {
  vec2 p = floor(t);
  float wsum = 0.;
  float cl = 0.;
  for (int y = -1; y < 2; y += 1) {
    for (int x = -1; x < 2; x += 1) {
      vec2 b = vec2(float(x), float(y));
      vec2 q = b + p;
      vec2 q2 = q - floor(q / 8.) * 8.;
      vec2 c = q + randomGB(q2);
      vec2 r = c - t;
      float w = pow(smoothstep(0., 1., 1. - abs(r.x)), pw) * pow(smoothstep(0., 1., 1. - abs(r.y)), pw);
      cl += (.5 + .5 * sin((q2.x + q2.y * 5.) * 8.)) * w;
      wsum += w;
    }
  }
  return pow(wsum != 0.0 ? cl / wsum : 0.0, .5) * 2.;
}
float crumplesShape(vec2 uv) {
  return crumpledNoise(uv * .25, 16.) * crumpledNoise(uv * .5, 2.);
}


vec2 folds(vec2 uv) {
  vec3 pp = vec3(0.);
  float l = 9.;
  for (float i = 0.; i < 15.; i++) {
    if (i >= u_foldCount) break;
    vec2 rand = randomGB(vec2(i, i * u_seed));
    float an = rand.x * TWO_PI;
    vec2 p = vec2(cos(an), sin(an)) * rand.y;
    float dist = distance(uv, p);
    l = min(l, dist);

    if (l == dist) {
      pp.xy = (uv - p.xy);
      pp.z = dist;
    }
  }
  return mix(pp.xy, vec2(0.), pow(pp.z, .25));
}

float drops(vec2 uv) {
  vec2 iDropsUV = floor(uv);
  vec2 fDropsUV = fract(uv);
  float dropsMinDist = 1.;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 offset = randomGB(iDropsUV + neighbor);
      offset = .5 + .5 * sin(10. * u_seed + TWO_PI * offset);
      vec2 pos = neighbor + offset - fDropsUV;
      float dist = length(pos);
      dropsMinDist = min(dropsMinDist, dropsMinDist*dist);
    }
  }
  return 1. - smoothstep(.05, .09, pow(dropsMinDist, .5));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  vec2 imageUV = v_imageUV;
  vec2 patternUV = v_imageUV - .5;
  patternUV = 5. * (patternUV * vec2(u_imageAspectRatio, 1.));

  vec2 roughnessUv = 1.5 * (gl_FragCoord.xy - .5 * u_resolution) / u_pixelRatio;
  float roughness = roughness(roughnessUv + vec2(1., 0.)) - roughness(roughnessUv - vec2(1., 0.));

  vec2 crumplesUV = fract(patternUV * .02 / u_crumpleSize - u_seed) * 32.;
  float crumples = u_crumples * (crumplesShape(crumplesUV + vec2(.05, 0.)) - crumplesShape(crumplesUV));

  vec2 fiberUV = 2. / u_fiberSize * patternUV;
  float fiber = fiberNoise(fiberUV, vec2(0.));
  fiber = .5 * u_fiber * (fiber - 1.);

  vec2 normal = vec2(0.);
  vec2 normalImage = vec2(0.);

  vec2 foldsUV = patternUV * .12;
  foldsUV = rotate(foldsUV, 4. * u_seed);
  vec2 w = folds(foldsUV);
  foldsUV = rotate(foldsUV + .007 * cos(u_seed), .01 * sin(u_seed));
  vec2 w2 = folds(foldsUV);

  float drops = u_drops * drops(patternUV * 2.);

  float fade = u_fade * fbm(.17 * patternUV + 10. * u_seed);
  fade = clamp(8. * fade * fade * fade, 0., 1.);

  w = mix(w, vec2(0.), fade);
  w2 = mix(w2, vec2(0.), fade);
  crumples = mix(crumples, 0., fade);
  drops = mix(drops, 0., fade);
  fiber *= mix(1., .5, fade);
  roughness *= mix(1., .5, fade);

  normal.xy += u_folds * min(5. * u_contrast, 1.) * 4. * max(vec2(0.), w + w2);
  normalImage.xy += u_folds * 2. * w;

  normal.xy += crumples;
  normalImage.xy += 1.5 * crumples;

  normal.xy += 3. * drops;
  normalImage.xy += .2 * drops;

  normal.xy += u_roughness * 1.5 * roughness;
  normal.xy += fiber;

  normalImage += u_roughness * .75 * roughness;
  normalImage += .2 * fiber;

  vec3 lightPos = vec3(1., 2., 1.);
  float res = dot(normalize(vec3(normal, 9.5 - 9. * pow(u_contrast, .1))), normalize(lightPos));

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  imageUV += .02 * normalImage;
  float frame = getUvFrame(imageUV);
  vec4 image = texture(u_image, imageUV);
  image.rgb += .6 * pow(u_contrast, .4) * (res - .7);

  frame *= image.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);
  opacity = mix(opacity, 1., frame);

  color -= .007 * drops;

  color.rgb = mix(color, image.rgb, frame);

  fragColor = vec4(color, opacity);
}
`;var uu=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_highlights;
uniform float u_layering;
uniform float u_edges;
uniform float u_caustic;
uniform float u_waves;

in vec2 v_imageUV;

out vec4 fragColor;

${V}
${X}
${rt}

float getUvFrame(vec2 uv) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);

  float left   = smoothstep(0., aax, uv.x);
  float right = 1.0 - smoothstep(1. - aax, 1., uv.x);
  float bottom = smoothstep(0., aay, uv.y);
  float top = 1.0 - smoothstep(1. - aay, 1., uv.y);

  return left * right * bottom * top;
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float getCausticNoise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 6; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.1;
  }
  return (N.x + N.y + 1.);
}

void main() {
  vec2 imageUV = v_imageUV;
  vec2 patternUV = v_imageUV - .5;
  patternUV = (patternUV * vec2(u_imageAspectRatio, 1.));
  patternUV /= (.01 + .09 * u_size);

  float t = u_time;

  float wavesNoise = snoise((.3 + .1 * sin(t)) * .1 * patternUV + vec2(0., .4 * t));

  float causticNoise = getCausticNoise(patternUV + u_waves * vec2(1., -1.) * wavesNoise, 2. * t, 1.5);

  causticNoise += u_layering * getCausticNoise(patternUV + 2. * u_waves * vec2(1., -1.) * wavesNoise, 1.5 * t, 2.);
  causticNoise = causticNoise * causticNoise;

  float edgesDistortion = smoothstep(0., .1, imageUV.x);
  edgesDistortion *= smoothstep(0., .1, imageUV.y);
  edgesDistortion *= (smoothstep(1., 1.1, imageUV.x) + (1.0 - smoothstep(.8, .95, imageUV.x)));
  edgesDistortion *= (1.0 - smoothstep(.9, 1., imageUV.y));
  edgesDistortion = mix(edgesDistortion, 1., u_edges);

  float causticNoiseDistortion = .02 * causticNoise * edgesDistortion;

  float wavesDistortion = .1 * u_waves * wavesNoise;

  imageUV += vec2(wavesDistortion, -wavesDistortion);
  imageUV += (u_caustic * causticNoiseDistortion);

  float frame = getUvFrame(imageUV);

  vec4 image = texture(u_image, imageUV);
  vec4 backColor = u_colorBack;
  backColor.rgb *= backColor.a;

  vec3 color = mix(backColor.rgb, image.rgb, image.a * frame);
  float opacity = backColor.a + image.a * frame;

  causticNoise = max(-.2, causticNoise);

  float hightlight = .025 * u_highlights * causticNoise;
  hightlight *= u_colorHighlight.a;
  color = mix(color, u_colorHighlight.rgb, .05 * u_highlights * causticNoise);
  opacity += hightlight;

  color += hightlight * (.5 + .5 * wavesNoise);
  opacity += hightlight * (.5 + .5 * wavesNoise);

  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var cu=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_rotation;

uniform vec4 u_colorBack;
uniform vec4 u_colorShadow;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_shadows;
uniform float u_angle;
uniform float u_stretch;
uniform float u_shape;
uniform float u_distortion;
uniform float u_highlights;
uniform float u_distortionShape;
uniform float u_shift;
uniform float u_blur;
uniform float u_edges;
uniform float u_marginLeft;
uniform float u_marginRight;
uniform float u_marginTop;
uniform float u_marginBottom;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_imageUV;

out vec4 fragColor;

${V}
${X}
${ot}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float getUvFrame(vec2 uv, float softness) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);
  float left   = smoothstep(0., aax + softness, uv.x);
  float right  = 1. - smoothstep(1. - softness - aax, 1., uv.x);
  float bottom = smoothstep(0., aay + softness, uv.y);
  float top    = 1. - smoothstep(1. - softness - aay, 1., uv.y);
  return left * right * bottom * top;
}

const int MAX_RADIUS = 50;
vec4 samplePremultiplied(sampler2D tex, vec2 uv) {
  vec4 c = texture(tex, uv);
  c.rgb *= c.a;
  return c;
}
vec4 getBlur(sampler2D tex, vec2 uv, vec2 texelSize, vec2 dir, float sigma) {
  if (sigma <= .5) return texture(tex, uv);
  int radius = int(min(float(MAX_RADIUS), ceil(3.0 * sigma)));

  float twoSigma2 = 2.0 * sigma * sigma;
  float gaussianNorm = 1.0 / sqrt(TWO_PI * sigma * sigma);

  vec4 sum = samplePremultiplied(tex, uv) * gaussianNorm;
  float weightSum = gaussianNorm;

  for (int i = 1; i <= MAX_RADIUS; i++) {
    if (i > radius) break;

    float x = float(i);
    float w = exp(-(x * x) / twoSigma2) * gaussianNorm;

    vec2 offset = dir * texelSize * x;
    vec4 s1 = samplePremultiplied(tex, uv + offset);
    vec4 s2 = samplePremultiplied(tex, uv - offset);

    sum += (s1 + s2) * w;
    weightSum += 2.0 * w;
  }

  vec4 result = sum / weightSum;
  if (result.a > 0.) {
    result.rgb /= result.a;
  }

  return result;
}

vec2 rotateAspect(vec2 p, float a, float aspect) {
  p.x *= aspect;
  p = rotate(p, a);
  p.x /= aspect;
  return p;
}

float smoothFract(float x) {
  float f = fract(x);
  float w = fwidth(x);

  float edge = abs(f - 0.5) - 0.5;
  float band = smoothstep(-w, w, edge);

  return mix(f, 1.0 - f, band);
}

void main() {

  float patternRotation = -u_angle * PI / 180.;
  float patternSize = mix(200., 5., u_size);

  vec2 uv = v_imageUV;

  vec2 uvMask = gl_FragCoord.xy / u_resolution.xy;
  vec2 sw = vec2(.005);
  vec4 margins = vec4(u_marginLeft, u_marginTop, u_marginRight, u_marginBottom);
  float mask =
  smoothstep(margins[0], margins[0] + sw.x, uvMask.x + sw.x) *
  smoothstep(margins[2], margins[2] + sw.x, 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1], margins[1] + sw.y, uvMask.y + sw.y) *
  smoothstep(margins[3], margins[3] + sw.y, 1.0 - uvMask.y + sw.y);
  float maskOuter =
  smoothstep(margins[0] - sw.x, margins[0], uvMask.x + sw.x) *
  smoothstep(margins[2] - sw.x, margins[2], 1.0 - uvMask.x + sw.x) *
  smoothstep(margins[1] - sw.y, margins[1], uvMask.y + sw.y) *
  smoothstep(margins[3] - sw.y, margins[3], 1.0 - uvMask.y + sw.y);
  float maskStroke = maskOuter - mask;
  float maskInner =
  smoothstep(margins[0] - 2. * sw.x, margins[0], uvMask.x) *
  smoothstep(margins[2] - 2. * sw.x, margins[2], 1.0 - uvMask.x) *
  smoothstep(margins[1] - 2. * sw.y, margins[1], uvMask.y) *
  smoothstep(margins[3] - 2. * sw.y, margins[3], 1.0 - uvMask.y);
  float maskStrokeInner = maskInner - mask;

  uv -= .5;
  uv *= patternSize;
  uv = rotateAspect(uv, patternRotation, u_imageAspectRatio);

  float curve = 0.;
  float patternY = uv.y / u_imageAspectRatio;
  if (u_shape > 4.5) {
    // pattern
    curve = .5 + .5 * sin(.5 * PI * uv.x) * cos(.5 * PI * patternY);
  } else if (u_shape > 3.5) {
    // zigzag
    curve = 10. * abs(fract(.1 * patternY) - .5);
  } else if (u_shape > 2.5) {
    // wave
    curve = 4. * sin(.23 * patternY);
  } else if (u_shape > 1.5) {
    // lines irregular
    curve = .5 + .5 * sin(.5 * uv.x) * sin(1.7 * uv.x);
  } else {
    // lines
  }

  vec2 UvToFract = uv + curve;
  vec2 fractOrigUV = fract(uv);
  vec2 floorOrigUV = floor(uv);

  float x = smoothFract(UvToFract.x);
  float xNonSmooth = fract(UvToFract.x) + .0001;

  float highlightsWidth = 2. * max(.001, fwidth(UvToFract.x));
  highlightsWidth += 2. * maskStrokeInner;
  float highlights = smoothstep(0., highlightsWidth, xNonSmooth);
  highlights *= smoothstep(1., 1. - highlightsWidth, xNonSmooth);
  highlights = 1. - highlights;
  highlights *= u_highlights;
  highlights = clamp(highlights, 0., 1.);
  highlights *= mask;

  float shadows = pow(x, 1.3);
  float distortion = 0.;
  float fadeX = 1.;
  float frameFade = 0.;

  float aa = fwidth(xNonSmooth);
  aa = max(aa, fwidth(uv.x));
  aa = max(aa, fwidth(UvToFract.x));
  aa = max(aa, .0001);

  if (u_distortionShape == 1.) {
    distortion = -pow(1.5 * x, 3.);
    distortion += (.5 - u_shift);

    frameFade = pow(1.5 * x, 3.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
  } else if (u_distortionShape == 2.) {
    distortion = 2. * pow(x, 2.);
    distortion -= (.5 + u_shift);

    frameFade = pow(abs(x - .5), 4.);
    aa = max(.2, aa);
    aa += mix(.2, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion = mix(.5, distortion, fadeX);
    frameFade = mix(1., frameFade, .5 * fadeX);
  } else if (u_distortionShape == 3.) {
    distortion = pow(2. * (xNonSmooth - .5), 6.);
    distortion -= .25;
    distortion -= u_shift;

    frameFade = 1. - 2. * pow(abs(x - .4), 2.);
    aa = .15;
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    frameFade = mix(1., frameFade, fadeX);

  } else if (u_distortionShape == 4.) {
    x = xNonSmooth;
    distortion = sin((x + .25) * TWO_PI);
    shadows = .5 + .5 * asin(distortion) / (.5 * PI);
    distortion *= .5;
    distortion -= u_shift;
    frameFade = .5 + .5 * sin(x * TWO_PI);
  } else if (u_distortionShape == 5.) {
    distortion -= pow(abs(x), .2) * x;
    distortion += .33;
    distortion -= 3. * u_shift;
    distortion *= .33;

    frameFade = .3 * (smoothstep(.0, 1., x));
    shadows = pow(x, 2.5);

    aa = max(.1, aa);
    aa += mix(.1, 0., u_size);
    fadeX = smoothstep(0., aa, xNonSmooth) * smoothstep(1., 1. - aa, xNonSmooth);
    distortion *= fadeX;
  }

  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= (.8 / vec2(length(dudx), length(dudy)));
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.4, .7, grain);
  grain *= u_grainMixer;
  distortion = mix(distortion, 0., grain);

  shadows = min(shadows, 1.);
  shadows += maskStrokeInner;
  shadows *= mask;
  shadows = min(shadows, 1.);
  shadows *= pow(u_shadows, 2.);
  shadows = clamp(shadows, 0., 1.);

  distortion *= 3. * u_distortion;
  frameFade *= u_distortion;

  fractOrigUV.x += distortion;
  floorOrigUV = rotateAspect(floorOrigUV, -patternRotation, u_imageAspectRatio);
  fractOrigUV = rotateAspect(fractOrigUV, -patternRotation, u_imageAspectRatio);

  uv = (floorOrigUV + fractOrigUV) / patternSize;
  uv += pow(maskStroke, 4.);

  uv += vec2(.5);

  uv = mix(v_imageUV, uv, smoothstep(0., .7, mask));
  float blur = mix(0., 50., u_blur);
  blur = mix(0., blur, smoothstep(.5, 1., mask));

  float edgeDistortion = mix(.0, .04, u_edges);
  edgeDistortion += .06 * frameFade * u_edges;
  edgeDistortion *= mask;
  float frame = getUvFrame(uv, edgeDistortion);

  float stretch = 1. - smoothstep(0., .5, xNonSmooth) * smoothstep(1., 1. - .5, xNonSmooth);
  stretch = pow(stretch, 2.);
  stretch *= mask;
  stretch *= getUvFrame(uv, .1 + .05 * mask * frameFade);
  uv.y = mix(uv.y, .5, u_stretch * stretch);

  vec4 image = getBlur(u_image, uv, 1. / u_resolution / u_pixelRatio, vec2(0., 1.), blur);
  image.rgb *= image.a;
  vec4 backColor = u_colorBack;
  backColor.rgb *= backColor.a;
  vec4 highlightColor = u_colorHighlight;
  highlightColor.rgb *= highlightColor.a;
  vec4 shadowColor = u_colorShadow;

  vec3 color = highlightColor.rgb * highlights;
  float opacity = highlightColor.a * highlights;

  shadows = mix(shadows * shadowColor.a, 0., highlights);
  color = mix(color, shadowColor.rgb * shadowColor.a, .5 * shadows);
  color += .5 * pow(shadows, .5) * shadowColor.rgb;
  opacity += shadows;
  color = clamp(color, vec3(0.), vec3(1.));
  opacity = clamp(opacity, 0., 1.);

  color += image.rgb * (1. - opacity) * frame;
  opacity += image.a * (1. - opacity) * frame;

  color += backColor.rgb * (1. - opacity);
  opacity += backColor.a * (1. - opacity);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  grainOverlayStrength *= mask;
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,fu={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},pu={prism:1,lens:2,contour:3,cascade:4,flat:5};var mu=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_type;
uniform float u_pxSize;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_colorSteps;

out vec4 fragColor;


${ot}
${V}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

vec2 getImageUV(vec2 uv) {
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  vec2 imageUV = uv;
  imageUV *= imageBoxScale;
  imageUV += boxOrigin * (imageBoxScale - 1.);
  imageUV += graphicOffset;
  imageUV /= u_scale;
  imageUV.x *= u_imageAspectRatio;
  imageUV = graphicRotation * imageUV;
  imageUV.x /= u_imageAspectRatio;

  imageUV += .5;
  imageUV.y = 1. - imageUV.y;

  return imageUV;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 imageUV = getImageUV(normalizedUV);
  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec4 image = texture(u_image, imageUV);
  float frame = getUvFrame(imageUV, pxSize / u_resolution);

  int type = int(floor(u_type));
  float dithering = 0.0;

  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);
  lum = u_inverted ? (1. - lum) : lum;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), lum);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  float colorSteps = max(floor(u_colorSteps), 1.);
  vec3 color = vec3(0.0);
  float opacity = 1.;

  dithering -= .5;
  float brightness = clamp(lum + dithering / colorSteps, 0.0, 1.0);
  brightness = mix(0.0, brightness, frame);
  brightness = mix(0.0, brightness, image.a);
  float quantLum = floor(brightness * colorSteps + 0.5) / colorSteps;
  quantLum = mix(0.0, quantLum, frame);

  if (u_originalColors == true) {
    vec3 normColor = image.rgb / max(lum, 0.001);
    color = normColor * quantLum;

    float quantAlpha = floor(image.a * colorSteps + 0.5) / colorSteps;
    opacity = mix(quantLum, 1., quantAlpha);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;
    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;
    float hlOpacity = u_colorHighlight.a;

    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));
    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));

    color = fgColor * quantLum;
    opacity = fgOpacity * quantLum;
    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);
  }

  fragColor = vec4(color, opacity);
}
`;var Na={maxColorCount:10},gu=`#version 300 es
precision highp float;

in mediump vec2 v_imageUV;
in mediump vec2 v_objectUV;
out vec4 fragColor;

uniform sampler2D u_image;
uniform float u_time;
uniform mediump float u_imageAspectRatio;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Na.maxColorCount}];
uniform float u_colorsCount;

uniform float u_angle;
uniform float u_noise;
uniform float u_innerGlow;
uniform float u_outerGlow;
uniform float u_contour;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1. - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1. - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float circle(vec2 uv, vec2 c, vec2 r) {
  return 1. - smoothstep(r[0], r[1], length(uv - c));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float shadowShape(vec2 uv, float t, float contour) {
  vec2 scaledUV = uv;

  // base shape tranjectory
  float posY = mix(-1., 2., t);

  // scaleX when it's moving down
  scaledUV.y -= .5;
  float mainCircleScale = sst(0., .8, posY) * lst(1.4, .9, posY);
  scaledUV *= vec2(1., 1. + 1.5 * mainCircleScale);
  scaledUV.y += .5;

  // base shape
  float innerR = .4;
  float outerR = 1. - .3 * (sst(.1, .2, t) * (1. - sst(.2, .5, t)));
  float s = circle(scaledUV, vec2(.5, posY - .2), vec2(innerR, outerR));
  float shapeSizing = sst(.2, .3, t) * sst(.6, .3, t);
  s = pow(s, 1.4);
  s *= 1.2;

  // flat gradient to take over the shadow shape
  float topFlattener = 0.;
  {
    float pos = posY - uv.y;
    float edge = 1.2;
    topFlattener = lst(-.4, 0., pos) * (1. - sst(.0, edge, pos));
    topFlattener = pow(topFlattener, 3.);
    float topFlattenerMixer = (1. - sst(.0, .3, pos));
    s = mix(topFlattener, s, topFlattenerMixer);
  }

  // apple right circle
  {
    float visibility = sst(.6, .7, t) * (1. - sst(.8, .9, t));
    float angle = -2. -t * TWO_PI;
    float rightCircle = circle(uv, vec2(.95 - .2 * cos(angle), .4 - .1 * sin(angle)), vec2(.15, .3));
    rightCircle *= visibility;
    s = mix(s, 0., rightCircle);
  }

  // apple top circle
  {
    float topCircle = circle(uv, vec2(.5, .19), vec2(.05, .25));
    topCircle += 2. * contour * circle(uv, vec2(.5, .19), vec2(.2, .5));
    float visibility = .55 * sst(.2, .3, t) * (1. - sst(.3, .45, t));
    topCircle *= visibility;
    s = mix(s, 0., topCircle);
  }

  float leafMask = circle(uv, vec2(.53, .13), vec2(.08, .19));
  leafMask = mix(leafMask, 0., 1. - sst(.4, .54, uv.x));
  leafMask = mix(0., leafMask, sst(.0, .2, uv.y));
  leafMask *= (sst(.5, 1.1, posY) * sst(1.5, 1.3, posY));
  s += leafMask;

  // apple bottom circle
  {
    float visibility = sst(.0, .4, t) * (1. - sst(.6, .8, t));
    s = mix(s, 0., visibility * circle(uv, vec2(.52, .92), vec2(.09, .25)));
  }

  // random balls that are invisible if apple logo is selected
  {
    float pos = sst(.0, .6, t) * (1. - sst(.6, 1., t));
    s = mix(s, .5, circle(uv, vec2(.0, 1.2 - .5 * pos), vec2(.1, .3)));
    s = mix(s, .0, circle(uv, vec2(1., .5 + .5 * pos), vec2(.1, .3)));

    s = mix(s, 1., circle(uv, vec2(.95, .2 + .2 * sst(.3, .4, t) * sst(.7, .5, t)), vec2(.07, .22)));
    s = mix(s, 1., circle(uv, vec2(.95, .2 + .2 * sst(.3, .4, t) * (1. - sst(.5, .7, t))), vec2(.07, .22)));
    s /= max(1e-4, sst(1., .85, uv.y));
  }

  s = clamp(0., 1., s);
  return s;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).g;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).g;

  return sum / norm;
}

void main() {
  vec2 uv = v_objectUV + .5;
  uv.y = 1. - uv.y;

  vec2 imgUV = v_imageUV;
  imgUV -= .5;
  imgUV *= 0.5714285714285714;
  imgUV += .5;
  float imgSoftFrame = getImgFrame(imgUV, .03);

  vec4 img = texture(u_image, imgUV);
  vec2 dudx = dFdx(imgUV);
  vec2 dudy = dFdy(imgUV);

  if (img.a == 0.) {
    fragColor = u_colorBack;
    return;
  }

  float t = .1 * u_time;
  t -= .3;

  float tCopy = t + 1. / 3.;
  float tCopy2 = t + 2. / 3.;

  t = mod(t, 1.);
  tCopy = mod(tCopy, 1.);
  tCopy2 = mod(tCopy2, 1.);

  vec2 animationUV = imgUV - vec2(.5);
  float angle = -u_angle * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  animationUV = vec2(
  animationUV.x * cosA - animationUV.y * sinA,
  animationUV.x * sinA + animationUV.y * cosA
  ) + vec2(.5);

  float shape = img[0];

  img[1] = blurEdge3x3(u_image, imgUV, dudx, dudy, 8., img[1]);

  float outerBlur = 1. - mix(1., img[1], shape);
  float innerBlur = mix(img[1], 0., shape);
  float contour = mix(img[2], 0., shape);

  outerBlur *= imgSoftFrame;

  float shadow = shadowShape(animationUV, t, innerBlur);
  float shadowCopy = shadowShape(animationUV, tCopy, innerBlur);
  float shadowCopy2 = shadowShape(animationUV, tCopy2, innerBlur);

  float inner = .8 + .8 * innerBlur;
  inner = mix(inner, 0., shadow);
  inner = mix(inner, 0., shadowCopy);
  inner = mix(inner, 0., shadowCopy2);

  inner *= mix(0., 2., u_innerGlow);

  inner += (u_contour * 2.) * contour;
  inner = min(1., inner);
  inner *= (1. - shape);

  float outer = 0.;
  {
    t *= 3.;
    t = mod(t - .1, 1.);

    outer = .9 * pow(outerBlur, .8);
    float y = mod(animationUV.y - t, 1.);
    float animatedMask = sst(.3, .65, y) * (1. - sst(.65, 1., y));
    animatedMask = .5 + animatedMask;
    outer *= animatedMask;
    outer *= mix(0., 5., pow(u_outerGlow, 2.));
    outer *= imgSoftFrame;
  }

  inner = pow(inner, 1.2);
  float heat = clamp(inner + outer, 0., 1.);

  heat += (.005 + .35 * u_noise) * (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  float mixer = heat * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  float outerShape = 0.;
  for (int i = 1; i < ${Na.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;
    float m = clamp(mixer - float(i - 1), 0., 1.);
    if (i == 1) {
      outerShape = m;
    }
    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  color += .02 * (fract(sin(dot(uv + 1., vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, opacity);
}
`;function ci(e){let t=document.createElement("canvas"),o=1e3;return new Promise((r,a)=>{let n=new Image;n.crossOrigin="anonymous",n.addEventListener("load",()=>{(typeof e=="string"?e.endsWith(".svg"):e.type==="image/svg+xml")&&(n.width=o,n.height=o);let i=n.naturalWidth/n.naturalHeight,s=Math.floor(o*.15),l=Math.ceil(s*2.5),u=o,g=o;i>1?g=Math.floor(o/i):u=Math.floor(o*i),t.width=u+2*l,t.height=g+2*l;let m=t.getContext("2d",{willReadFrequently:!0});if(!m)throw new Error("Failed to get canvas 2d context");m.fillStyle="white",m.fillRect(0,0,t.width,t.height),m.drawImage(n,l,l,u,g);let{width:d,height:_}=t,v=m.getImageData(0,0,d,_).data,h=d*_,c=new Uint8ClampedArray(h);for(let E=0;E<h;E++){let D=E*4,b=v[D]??0,ue=v[D+1]??0,ae=v[D+2]??0;c[E]=.299*b+.587*ue+.114*ae|0}let f=s,p=Math.max(1,Math.round(.12*s)),x=5,S=du(c,d,_,f,3),w=du(c,d,_,p,3),C=du(c,d,_,x,1),P=m.createImageData(d,_),I=P.data;for(let E=0;E<h;E++){let D=E*4;I[D]=C[E]??0,I[D+1]=S[E]??0,I[D+2]=w[E]??0,I[D+3]=255}m.putImageData(P,0,0),t.toBlob(E=>{if(!E){a(new Error("Failed to create PNG blob"));return}r({blob:E})},"image/png")}),n.addEventListener("error",()=>{a(new Error("Failed to load image"))}),n.src=typeof e=="string"?e:URL.createObjectURL(e)})}function dm(e,t,o,r){if(r<=0)return e.slice();let a=new Uint8ClampedArray(t*o),n=new Uint32Array(t*o);for(let i=0;i<o;i++){let s=0;for(let l=0;l<t;l++){let u=i*t+l,g=e[u]??0;s+=g,n[u]=s+(i>0?n[u-t]??0:0)}}for(let i=0;i<o;i++){let s=Math.max(0,i-r),l=Math.min(o-1,i+r);for(let u=0;u<t;u++){let g=Math.max(0,u-r),m=Math.min(t-1,u+r),d=l*t+m,_=l*t+(g-1),y=(s-1)*t+m,v=(s-1)*t+(g-1),h=n[d]??0,c=g>0?n[_]??0:0,f=s>0?n[y]??0:0,p=g>0&&s>0?n[v]??0:0,x=h-c-f+p,S=(m-g+1)*(l-s+1);a[i*t+u]=Math.round(x/S)}}return a}function du(e,t,o,r,a){if(r<=0||a<=1)return dm(e,t,o,r);let n=e,i=e;for(let s=0;s<a;s++)i=dm(n,t,o,r),n=i;return i}var hu=`#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform vec2 u_resolution;
uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorTint;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_angle;

uniform float u_shape;
uniform bool u_isImage;

in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_imageUV;

out vec4 fragColor;

${V}
${X}
${rt}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {

  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  if (u_isImage == true) {
    bump = smoothstep(.2, .8, bump);
  }
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));

  // Tint color is applied with color burn blending
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).r;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).r;

  return sum / norm;
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  vec2 uv = v_imageUV;
  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec4 img = textureGrad(u_image, uv, dudx, dudy);

  if (u_isImage == false) {
    uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
  }

  float cycleWidth = u_repetition;
  float edge = 0.;
  float contOffset = 1.;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = (-u_angle + 70.) * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  rotatedUV = vec2(
  rotatedUV.x * cosA - rotatedUV.y * sinA,
  rotatedUV.x * sinA + rotatedUV.y * cosA
  ) + vec2(.5);

  if (u_isImage == true) {
    float edgeRaw = img.r;
    edge = blurEdge3x3(u_image, uv, dudx, dudy, 6., edgeRaw);
    edge = pow(edge, 1.6);
    edge *= mix(0.0, 1.0, smoothstep(0.0, 0.4, u_contour));
  } else {
    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);

      uv = v_responsiveUV;
      if (ratio > 1.) {
        uv.y /= ratio;
      } else {
        uv.x *= ratio;
      }
      uv += .5;
      uv.y = 1. - uv.y;

      cycleWidth *= 2.;
      contOffset = 1.5;

    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * t));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;

      uv *= .8;
      cycleWidth *= 1.6;

    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    edge = mix(smoothstep(.9 - 2. * fwidth(edge), .9, edge), edge, smoothstep(0.0, 0.4, u_contour));

  }

  float opacity = 0.;
  if (u_isImage == true) {
    opacity = img.g;
    float frame = getImgFrame(v_imageUV, 0.);
    opacity *= frame;
  } else {
    opacity = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    if (u_shape < 2.) {
      edge = 1.2 * edge;
    } else if (u_shape < 5.) {
      edge = 1.8 * pow(edge, 1.5);
    }
  }

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;
  float diagTLtoBR = rotatedUV.x + rotatedUV.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);


  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  edge += (1. - edge) * u_distortion * noise;

  direction += diagBLtoTR;
  float contour = 0.;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - edge) * bump);

  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));

  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;


  float colorDispersion = (1. - bump);
  colorDispersion = clamp(colorDispersion, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;

  float dispersionBlue = colorDispersion;
  dispersionBlue *= 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = 0.;
  float rExtraBlur = 0.;
  float gExtraBlur = 0.;
  if (u_isImage == true) {
    float softness = 0.05 * u_softness;
    blur = softness + .5 * smoothstep(1., 10., u_repetition) * smoothstep(.0, 1., edge);
    float smallCanvasT = 1.0 - smoothstep(100., 500., min(u_resolution.x, u_resolution.y));
    blur += smallCanvasT * smoothstep(.0, 1., edge);
    rExtraBlur = softness * (0.05 + .1 * (u_shiftRed / 20.) * bump);
    gExtraBlur = softness * 0.05 / max(0.001, abs(1. - diagBLtoTR));
  } else {
    blur = u_softness / 15. + .3 * contour;
  }

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r) + rExtraBlur, bump, u_colorTint.r);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g) + gExtraBlur, bump, u_colorTint.g);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${ie}

  fragColor = vec4(color, opacity);
}
`,Qo={measurePerformance:!1,workingSize:512,iterations:40};function fi(e){let t=document.createElement("canvas"),o=t.getContext("2d"),r=typeof e=="string"&&e.startsWith("blob:");return new Promise((a,n)=>{if(!e||!o){n(new Error("Invalid file or canvas context"));return}let i=r&&fetch(e).then(u=>u.headers.get("Content-Type")),s=new Image;s.crossOrigin="anonymous";let l=performance.now();s.onload=async()=>{let u,g=await i;g?u=g==="image/svg+xml":typeof e=="string"?u=e.endsWith(".svg")||e.startsWith("data:image/svg+xml"):u=e.type==="image/svg+xml";let m=s.width||s.naturalWidth,d=s.height||s.naturalHeight;if(u){let T=m/d;m>d?(m=4096,d=4096/T):(d=4096,m=4096*T),s.width=m,s.height=d}let _=Math.min(m,d),v=Qo.workingSize/_,h=Math.round(m*v),c=Math.round(d*v);Qo.measurePerformance&&(console.log("[Processing Mode]"),console.log(`  Original: ${m}\xD7${d}`),console.log(`  Working: ${h}\xD7${c} (${(v*100).toFixed(1)}% scale)`),v<1&&console.log(`  Speedup: ~${Math.round(1/(v*v))}\xD7`)),t.width=m,t.height=d;let f=document.createElement("canvas");f.width=h,f.height=c;let p=f.getContext("2d");p.drawImage(s,0,0,h,c);let x=performance.now(),w=p.getImageData(0,0,h,c).data,C=new Uint8Array(h*c),P=new Uint8Array(h*c),I=0;for(let N=0,T=0;N<w.length;N+=4,T++){let De=w[N+3]===0?0:1;C[T]=De,I+=De}let E=[],D=[];for(let N=0;N<c;N++)for(let T=0;T<h;T++){let J=N*h+T;if(!C[J])continue;let De=!1;T===0||T===h-1||N===0||N===c-1?De=!0:De=!C[J-1]||!C[J+1]||!C[J-h]||!C[J+h]||!C[J-h-1]||!C[J-h+1]||!C[J+h-1]||!C[J+h+1],De?(P[J]=1,E.push(J)):D.push(J)}Qo.measurePerformance&&(console.log(`[Mask Building] Time: ${(performance.now()-x).toFixed(2)}ms`),console.log(`  Shape pixels: ${I} / ${h*c} (${(I/(h*c)*100).toFixed(1)}%)`),console.log(`  Interior pixels: ${D.length}`),console.log(`  Boundary pixels: ${E.length}`));let b=rv(C,P,new Uint32Array(D),new Uint32Array(E),h,c),ue=performance.now(),ae=av(b,C,P,h,c);Qo.measurePerformance&&console.log(`[Poisson Solve] Time: ${(performance.now()-ue).toFixed(2)}ms`);let ce=0,Ue;for(let N=0;N<D.length;N++){let T=D[N];ae[T]>ce&&(ce=ae[T])}let Ct=document.createElement("canvas");Ct.width=h,Ct.height=c;let ao=Ct.getContext("2d"),We=ao.createImageData(h,c);for(let N=0;N<c;N++)for(let T=0;T<h;T++){let J=N*h+T,De=J*4;if(!C[J])We.data[De]=255,We.data[De+1]=255,We.data[De+2]=255,We.data[De+3]=0;else{let Xo=255*(1-ae[J]/ce);We.data[De]=Xo,We.data[De+1]=Xo,We.data[De+2]=Xo,We.data[De+3]=255}}ao.putImageData(We,0,0),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(Ct,0,0,h,c,0,0,m,d);let Ye=o.getImageData(0,0,m,d),jo=document.createElement("canvas");jo.width=m,jo.height=d;let Fo=jo.getContext("2d");Fo.drawImage(s,0,0,m,d);let Ta=Fo.getImageData(0,0,m,d);for(let N=0;N<Ye.data.length;N+=4){let T=Ta.data[N+3],J=Ye.data[N+3];T===0?(Ye.data[N]=255,Ye.data[N+1]=0):(Ye.data[N]=J===0?0:Ye.data[N],Ye.data[N+1]=T),Ye.data[N+2]=255,Ye.data[N+3]=255}o.putImageData(Ye,0,0),Ue=Ye,t.toBlob(N=>{if(!N){n(new Error("Failed to create PNG blob"));return}if(Qo.measurePerformance){let T=performance.now()-l;if(console.log(`[Total Processing Time] ${T.toFixed(2)}ms`),v<1){let J=T*Math.pow(m*d/(h*c),1.5);console.log(`[Estimated time at full resolution] ~${J.toFixed(0)}ms`),console.log(`[Time saved] ~${(J-T).toFixed(0)}ms (${Math.round(J/T)}\xD7 faster)`)}}a({imageData:Ue,pngBlob:N})},"image/png")},s.onerror=()=>n(new Error("Failed to load image")),s.src=typeof e=="string"?e:URL.createObjectURL(e)})}function rv(e,t,o,r,a,n){let i=o.length,s=new Int32Array(i*4);for(let l=0;l<i;l++){let u=o[l],g=u%a,m=Math.floor(u/a);s[l*4+0]=g<a-1&&e[u+1]?u+1:-1,s[l*4+1]=g>0&&e[u-1]?u-1:-1,s[l*4+2]=m>0&&e[u-a]?u-a:-1,s[l*4+3]=m<n-1&&e[u+a]?u+a:-1}return{interiorPixels:o,boundaryPixels:r,pixelCount:i,neighborIndices:s}}function av(e,t,o,r,a){let n=Qo.iterations,i=.01,s=new Float32Array(r*a),{interiorPixels:l,neighborIndices:u,pixelCount:g}=e,m=performance.now(),d=1.9,_=[],y=[];for(let v=0;v<g;v++){let h=l[v],c=h%r,f=Math.floor(h/r);(c+f)%2===0?_.push(v):y.push(v)}for(let v=0;v<n;v++){for(let h of _){let c=l[h],f=u[h*4+0],p=u[h*4+1],x=u[h*4+2],S=u[h*4+3],w=0;f>=0&&(w+=s[f]),p>=0&&(w+=s[p]),x>=0&&(w+=s[x]),S>=0&&(w+=s[S]);let C=(i+w)/4;s[c]=d*C+(1-d)*s[c]}for(let h of y){let c=l[h],f=u[h*4+0],p=u[h*4+1],x=u[h*4+2],S=u[h*4+3],w=0;f>=0&&(w+=s[f]),p>=0&&(w+=s[p]),x>=0&&(w+=s[x]),S>=0&&(w+=s[S]);let C=(i+w)/4;s[c]=d*C+(1-d)*s[c]}}if(Qo.measurePerformance){let v=performance.now()-m;console.log(`[Optimized Poisson Solver (SOR \u03C9=${d})]`),console.log(`  Working size: ${r}\xD7${a}`),console.log(`  Iterations: ${n}`),console.log(`  Time: ${v.toFixed(2)}ms`),console.log(`  Interior pixels processed: ${g}`),console.log(`  Speed: ${(n*g/(v*1e3)).toFixed(2)} Mpixels/sec`)}return s}var vu={none:0,circle:1,daisy:2,diamond:3,metaballs:4};var xu=`#version 300 es
precision mediump float;

uniform float u_rotation;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_radius;
uniform float u_contrast;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_grainSize;
uniform float u_grid;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_type;

in vec2 v_imageUV;

out vec4 fragColor;

${V}
${X}
${ot}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float getCircle(vec2 uv, float r, float baseR) {
  r = mix(.25 * baseR, 0., r);
  float d = length(uv - .5);
  float aa = fwidth(d);
  return 1. - smoothstep(r - aa, r + aa, d);
}

float getCell(vec2 uv) {
  float insideX = step(0.0, uv.x) * (1.0 - step(1.0, uv.x));
  float insideY = step(0.0, uv.y) * (1.0 - step(1.0, uv.y));
  return insideX * insideY;
}

float getCircleWithHole(vec2 uv, float r, float baseR) {
  float cell = getCell(uv);

  r = mix(.75 * baseR, 0., r);
  float rMod = mod(r, .5);

  float d = length(uv - .5);
  float aa = fwidth(d);
  float circle = 1. - smoothstep(rMod - aa, rMod + aa, d);
  if (r < .5) {
    return circle;
  } else {
    return cell - circle;
  }
}

float getGooeyBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = .3;
  if (u_grid == 1.) {
    sizeRadius = .42;
  }
  sizeRadius = mix(sizeRadius * baseR, 0., r);
  d = 1. - sst(0., sizeRadius, d);

  d = pow(d, 2. + baseR);
  return d;
}

float getSoftBall(vec2 uv, float r, float baseR) {
  float d = length(uv - .5);
  float sizeRadius = clamp(baseR, 0., 1.);
  sizeRadius = mix(.5 * sizeRadius, 0., r);
  d = 1. - lst(0., sizeRadius, d);
  float powRadius = 1. - lst(0., 2., baseR);
  d = pow(d, 4. + 3. * powRadius);
  return d;
}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

float sigmoid(float x, float k) {
  return 1.0 / (1.0 + exp(-k * (x - 0.5)));
}

float getLumAtPx(vec2 uv, float contrast) {
  vec4 tex = texture(u_image, uv);
  vec3 color = vec3(
  sigmoid(tex.r, contrast),
  sigmoid(tex.g, contrast),
  sigmoid(tex.b, contrast)
  );
  float lum = dot(vec3(0.2126, 0.7152, 0.0722), color);
  lum = mix(1., lum, tex.a);
  lum = u_inverted ? (1. - lum) : lum;
  return lum;
}

float getLumBall(vec2 p, vec2 pad, vec2 inCellOffset, float contrast, float baseR, float stepSize, out vec4 ballColor) {
  p += inCellOffset;
  vec2 uv_i = floor(p);
  vec2 uv_f = fract(p);
  vec2 samplingUV = (uv_i + .5 - inCellOffset) * pad + vec2(.5);
  float outOfFrame = getUvFrame(samplingUV, pad * stepSize);

  float lum = getLumAtPx(samplingUV, contrast);
  ballColor = texture(u_image, samplingUV);
  ballColor.rgb *= ballColor.a;
  ballColor *= outOfFrame;

  float ball = 0.;
  if (u_type == 0.) {
    // classic
    ball = getCircle(uv_f, lum, baseR);
  } else if (u_type == 1.) {
    // gooey
    ball = getGooeyBall(uv_f, lum, baseR);
  } else if (u_type == 2.) {
    // holes
    ball = getCircleWithHole(uv_f, lum, baseR);
  } else if (u_type == 3.) {
    // soft
    ball = getSoftBall(uv_f, lum, baseR);
  }

  return ball * outOfFrame;
}


void main() {

  float stepMultiplier = 1.;
  if (u_type == 0.) {
    // classic
    stepMultiplier = 2.;
  } else if (u_type == 1. || u_type == 3.) {
    // gooey & soft
    stepMultiplier = 6.;
  }

  float cellsPerSide = mix(300., 7., pow(u_size, .7));
  cellsPerSide /= stepMultiplier;
  float cellSizeY = 1. / cellsPerSide;
  vec2 pad = cellSizeY * vec2(1. / u_imageAspectRatio, 1.);
  if (u_type == 1. && u_grid == 1.) {
    // gooey diagonal grid works differently
    pad *= .7;
  }

  vec2 uv = v_imageUV;
  uv -= vec2(.5);
  uv /= pad;

  float contrast = mix(0., 15., pow(u_contrast, 1.5));
  float baseRadius = u_radius;
  if (u_originalColors == true) {
    contrast = mix(.1, 4., pow(u_contrast, 2.));
    baseRadius = 2. * pow(.5 * u_radius, .3);
  }

  float totalShape = 0.;
  vec3 totalColor = vec3(0.);
  float totalOpacity = 0.;

  vec4 ballColor;
  float shape;
  float stepSize = 1. / stepMultiplier;
  for (float x = -0.5; x < 0.5; x += stepSize) {
    for (float y = -0.5; y < 0.5; y += stepSize) {
      vec2 offset = vec2(x, y);

      if (u_grid == 1.) {
        float rowIndex = floor((y + .5) / stepSize);
        float colIndex = floor((x + .5) / stepSize);
        if (stepSize == 1.) {
          rowIndex = floor(uv.y + y + 1.);
          if (u_type == 1.) {
            colIndex = floor(uv.x + x + 1.);
          }
        }
        if (u_type == 1.) {
          if (mod(rowIndex + colIndex, 2.) == 1.) {
            continue;
          }
        } else {
          if (mod(rowIndex, 2.) == 1.) {
            offset.x += .5 * stepSize;
          }
        }
      }

      shape = getLumBall(uv, pad, offset, contrast, baseRadius, stepSize, ballColor);
      totalColor   += ballColor.rgb * shape;
      totalShape   += shape;
      totalOpacity += shape;
    }
  }

  const float eps = 1e-4;

  totalColor /= max(totalShape, eps);
  totalOpacity /= max(totalShape, eps);

  float finalShape = 0.;
  if (u_type == 0.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 1.) {
    float aa = fwidth(totalShape);
    float th = .5;
    finalShape = smoothstep(th - aa, th + aa, totalShape);
  } else if (u_type == 2.) {
    finalShape = min(1., totalShape);
  } else if (u_type == 3.) {
    finalShape = totalShape;
  }

  vec2 grainSize = mix(2000., 200., u_grainSize) * vec2(1., 1. / u_imageAspectRatio);
  vec2 grainUV = v_imageUV - .5;
  grainUV *= grainSize;
  grainUV += .5;
  float grain = valueNoise(grainUV);
  grain = smoothstep(.55, .7 + .2 * u_grainMixer, grain);
  grain *= u_grainMixer;
  finalShape = mix(finalShape, 0., grain);

  vec3 color = vec3(0.);
  float opacity = 0.;

  if (u_originalColors == true) {
    color = totalColor * finalShape;
    opacity = totalOpacity * finalShape;

    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    color = color + bgColor * (1. - opacity);
    opacity = opacity + u_colorBack.a * (1. - opacity);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;

    color = fgColor * finalShape;
    opacity = fgOpacity * finalShape;
    color += bgColor * (1. - opacity);
    opacity += bgOpacity * (1. - opacity);
  }

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .5 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,_u={classic:0,gooey:1,holes:2,soft:3},yu={square:0,hex:1};var Su=`#version 300 es
precision mediump float;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform vec4 u_colorBack;
uniform vec4 u_colorC;
uniform vec4 u_colorM;
uniform vec4 u_colorY;
uniform vec4 u_colorK;
uniform float u_size;
uniform float u_minDot;
uniform float u_contrast;
uniform float u_grainSize;
uniform float u_grainMixer;
uniform float u_grainOverlay;
uniform float u_gridNoise;
uniform float u_softness;
uniform float u_floodC;
uniform float u_floodM;
uniform float u_floodY;
uniform float u_floodK;
uniform float u_gainC;
uniform float u_gainM;
uniform float u_gainY;
uniform float u_gainK;
uniform float u_type;
uniform sampler2D u_noiseTexture;

in vec2 v_imageUV;
out vec4 fragColor;

const float shiftC = -.5;
const float shiftM = -.25;
const float shiftY = .2;
const float shiftK = 0.;

// Precomputed sin/cos for rotation angles (15\xB0, 75\xB0, 0\xB0, 45\xB0)
const float cosC = 0.9659258;  const float sinC = 0.2588190;   // 15\xB0
const float cosM = 0.2588190;  const float sinM = 0.9659258;   // 75\xB0
const float cosY = 1.0;        const float sinY = 0.0;         // 0\xB0
const float cosK = 0.7071068;  const float sinK = 0.7071068;   // 45\xB0

${V}

vec2 randomRG(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).rg;
}
vec3 hash23(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.3183099, 0.3678794, 0.3141592)) + 0.1;
  p3 += dot(p3, p3.yzx + 19.19);
  return fract(vec3(p3.x * p3.y, p3.y * p3.z, p3.z * p3.x));
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

vec3 valueNoise3(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  vec3 a = hash23(i);
  vec3 b = hash23(i + vec2(1.0, 0.0));
  vec3 c = hash23(i + vec2(0.0, 1.0));
  vec3 d = hash23(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  vec3 x1 = mix(a, b, u.x);
  vec3 x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float getUvFrame(vec2 uv, vec2 pad) {
  float left   = smoothstep(-pad.x, 0., uv.x);
  float right  = smoothstep(1. + pad.x, 1., uv.x);
  float bottom = smoothstep(-pad.y, 0., uv.y);
  float top    = smoothstep(1. + pad.y, 1., uv.y);

  return left * right * bottom * top;
}

vec4 RGBAtoCMYK(vec4 rgba) {
  float k = 1. - max(max(rgba.r, rgba.g), rgba.b);
  float denom = 1. - k;
  vec3 cmy = vec3(0.);
  if (denom > 1e-5) {
    cmy = (1. - rgba.rgb - vec3(k)) / denom;
  }
  return vec4(cmy, k) * rgba.a;
}

vec3 applyContrast(vec3 rgb) {
  return clamp((rgb - 0.5) * u_contrast + 0.5, 0.0, 1.0);
}

// Single-component CMYK extractors with contrast built-in, alpha-aware
float getCyan(vec4 rgba) {
  vec3 c = clamp((rgba.rgb - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  float maxRGB = max(max(c.r, c.g), c.b);
  return (maxRGB > 1e-5 ? (maxRGB - c.r) / maxRGB : 0.) * rgba.a;
}
float getMagenta(vec4 rgba) {
  vec3 c = clamp((rgba.rgb - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  float maxRGB = max(max(c.r, c.g), c.b);
  return (maxRGB > 1e-5 ? (maxRGB - c.g) / maxRGB : 0.) * rgba.a;
}
float getYellow(vec4 rgba) {
  vec3 c = clamp((rgba.rgb - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  float maxRGB = max(max(c.r, c.g), c.b);
  return (maxRGB > 1e-5 ? (maxRGB - c.b) / maxRGB : 0.) * rgba.a;
}
float getBlack(vec4 rgba) {
  vec3 c = clamp((rgba.rgb - 0.5) * u_contrast + 0.5, 0.0, 1.0);
  return (1. - max(max(c.r, c.g), c.b)) * rgba.a;
}

vec2 cellCenterPos(vec2 uv, vec2 cellOffset, float channelIdx) {
  vec2 cellCenter = floor(uv) + .5 + cellOffset;
  return cellCenter + (randomRG(cellCenter + channelIdx * 50.) - .5) * u_gridNoise;
}

vec2 gridToImageUV(vec2 cellCenter, float cosA, float sinA, float shift, vec2 pad) {
  vec2 uvGrid = mat2(cosA, -sinA, sinA, cosA) * (cellCenter - shift);
  return uvGrid * pad + 0.5;
}

void colorMask(vec2 pos, vec2 cellCenter, float rad, float transparency, float grain, float channelAddon, float channelgain, float generalComp, bool isJoined, inout float outMask) {
  float dist = length(pos - cellCenter);

  float radius = rad;
  radius *= (1. + generalComp);
  radius += (.15 + channelgain * radius);
  radius = max(0., radius);
  radius = mix(0., radius, transparency);
  radius += channelAddon;
  radius *= (1. - grain);

  float mask = 1. - sst(0., radius, dist);
  if (isJoined) {
    // ink or sharp (joined)
    mask = pow(mask, 1.2);
  } else {
    // dots (separate)
    mask = sst(.5 - .5 * u_softness, .51 + .49 * u_softness, mask);
  }

  mask *= mix(1., mix(.5, 1., 1.5 * radius), u_softness);
  outMask += mask;
}

vec3 applyInk(vec3 paper, vec3 inkColor, float cov) {
  vec3 inkEffect = mix(vec3(1.0), inkColor, clamp(cov, 0.0, 1.0));
  return paper * inkEffect;
}

void main() {
  vec2 uv = v_imageUV;

  float cellsPerSide = mix(400.0, 7.0, pow(u_size, 0.7));
  float cellSizeY = 1.0 / cellsPerSide;
  vec2 pad = cellSizeY * vec2(1.0 / u_imageAspectRatio, 1.0);
  vec2 uvGrid = (uv - .5) / pad;
  float insideImageBox = getUvFrame(uv, pad);

  float generalComp = .1 * u_softness + .1 * u_gridNoise + .1 * (1. - step(0.5, u_type)) * (1.5 - u_softness);

  vec2 uvC = mat2(cosC, sinC, -sinC, cosC) * uvGrid + shiftC;
  vec2 uvM = mat2(cosM, sinM, -sinM, cosM) * uvGrid + shiftM;
  vec2 uvY = mat2(cosY, sinY, -sinY, cosY) * uvGrid + shiftY;
  vec2 uvK = mat2(cosK, sinK, -sinK, cosK) * uvGrid + shiftK;

  vec2 grainSize = mix(2000., 200., u_grainSize) * vec2(1., 1. / u_imageAspectRatio);
  vec2 grainUV = (v_imageUV - .5) * grainSize + .5;
  vec3 noiseValues = valueNoise3(grainUV);
  float grain = sst(.55, 1., noiseValues.r);
  grain *= u_grainMixer;

  vec4 outMask = vec4(0.);
  bool isJoined = u_type > 0.5;

  if (u_type < 1.5) {
    // dots or ink: per-cell color sampling
    for (int dy = -1; dy <= 1; dy++) {
      for (int dx = -1; dx <= 1; dx++) {
        vec2 cellOffset = vec2(float(dx), float(dy));

        vec2 cellCenterC = cellCenterPos(uvC, cellOffset, 0.);
        vec4 texC = texture(u_image, gridToImageUV(cellCenterC, cosC, sinC, shiftC, pad));
        colorMask(uvC, cellCenterC, getCyan(texC), insideImageBox * texC.a, grain, u_floodC, u_gainC, generalComp, isJoined, outMask[0]);

        vec2 cellCenterM = cellCenterPos(uvM, cellOffset, 1.);
        vec4 texM = texture(u_image, gridToImageUV(cellCenterM, cosM, sinM, shiftM, pad));
        colorMask(uvM, cellCenterM, getMagenta(texM), insideImageBox * texM.a, grain, u_floodM, u_gainM, generalComp, isJoined, outMask[1]);

        vec2 cellCenterY = cellCenterPos(uvY, cellOffset, 2.);
        vec4 texY = texture(u_image, gridToImageUV(cellCenterY, cosY, sinY, shiftY, pad));
        colorMask(uvY, cellCenterY, getYellow(texY), insideImageBox * texY.a, grain, u_floodY, u_gainY, generalComp, isJoined, outMask[2]);

        vec2 cellCenterK = cellCenterPos(uvK, cellOffset, 3.);
        vec4 texK = texture(u_image, gridToImageUV(cellCenterK, cosK, sinK, shiftK, pad));
        colorMask(uvK, cellCenterK, getBlack(texK), insideImageBox * texK.a, grain, u_floodK, u_gainK, generalComp, isJoined, outMask[3]);
      }
    }
  } else {
    // sharp: direct px color sampling
    vec4 tex = texture(u_image, uv);
    tex.rgb = applyContrast(tex.rgb);
    insideImageBox *= tex.a;
    vec4 cmykOriginal = RGBAtoCMYK(tex);
    for (int dy = -1; dy <= 1; dy++) {
      for (int dx = -1; dx <= 1; dx++) {
        vec2 cellOffset = vec2(float(dx), float(dy));

        colorMask(uvC, cellCenterPos(uvC, cellOffset, 0.), cmykOriginal.x, insideImageBox, grain, u_floodC, u_gainC, generalComp, isJoined, outMask[0]);
        colorMask(uvM, cellCenterPos(uvM, cellOffset, 1.), cmykOriginal.y, insideImageBox, grain, u_floodM, u_gainM, generalComp, isJoined, outMask[1]);
        colorMask(uvY, cellCenterPos(uvY, cellOffset, 2.), cmykOriginal.z, insideImageBox, grain, u_floodY, u_gainY, generalComp, isJoined, outMask[2]);
        colorMask(uvK, cellCenterPos(uvK, cellOffset, 3.), cmykOriginal.w, insideImageBox, grain, u_floodK, u_gainK, generalComp, isJoined, outMask[3]);
      }
    }
  }

  float shape;

  float C = outMask[0];
  float M = outMask[1];
  float Y = outMask[2];
  float K = outMask[3];

  if (isJoined) {
    // ink or sharp: apply threshold for joined dots
    float th = .5;
    float sLeft = th * u_softness;
    float sRight = (1. - th) * u_softness + .01;
    C = smoothstep(th - sLeft - fwidth(C), th + sRight, C);
    M = smoothstep(th - sLeft - fwidth(M), th + sRight, M);
    Y = smoothstep(th - sLeft - fwidth(Y), th + sRight, Y);
    K = smoothstep(th - sLeft - fwidth(K), th + sRight, K);
  }

  C *= u_colorC.a;
  M *= u_colorM.a;
  Y *= u_colorY.a;
  K *= u_colorK.a;

  vec3 ink = vec3(1.);
  ink = applyInk(ink, u_colorK.rgb, K);
  ink = applyInk(ink, u_colorC.rgb, C);
  ink = applyInk(ink, u_colorM.rgb, M);
  ink = applyInk(ink, u_colorY.rgb, Y);

  shape = clamp(max(max(C, M), max(Y, K)), 0., 1.);

  vec3 color = u_colorBack.rgb * u_colorBack.a;

  float opacity = u_colorBack.a;
  color = mix(color, ink, shape);
  opacity += shape;
  opacity = clamp(opacity, 0., 1.);

  float grainOverlay = mix(noiseValues.g, noiseValues.b, .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .5 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`,wu={dots:0,ink:1,sharp:2};var Cu={maxColorCount:6},ku=`#version 300 es
precision mediump float;

in mediump vec2 v_imageUV;
in mediump vec2 v_objectUV;
in mediump vec2 v_responsiveUV;
in mediump vec2 v_responsiveBoxGivenSize;
out vec4 fragColor;

// Image
uniform sampler2D u_image;
uniform float u_imageAspectRatio;

// Canvas
uniform vec2 u_resolution;
uniform float u_time;

// Colors
uniform vec4 u_colors[${Cu.maxColorCount}];
uniform float u_colorsCount;
uniform vec4 u_colorBack;
uniform vec4 u_colorInner;

// Effect controls
uniform float u_innerDistortion;
uniform float u_outerDistortion;
uniform float u_outerGlow;
uniform float u_innerGlow;
uniform float u_offset;
uniform float u_angle;
uniform float u_size;

// Shape controls
uniform float u_shape;
uniform bool u_isImage;

${V}
${X}

// 9x9 Gaussian blur on R and G channels
vec2 gaussBlur9x9RG(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = max(radius, 0.0) * texel;
  // Pascal's row 8: sum = 256, 2D norm = 65536
  const float k[9] = float[9](1.0, 8.0, 28.0, 56.0, 70.0, 56.0, 28.0, 8.0, 1.0);
  vec2 sum = vec2(0.0);

  for (int j = -4; j <= 4; ++j) {
    float wy = k[j + 4];
    for (int i = -4; i <= 4; ++i) {
      float w = k[i + 4] * wy;
      vec2 off = vec2(float(i) * r.x, float(j) * r.y);
      sum += w * texture(tex, uv + off).rg;
    }
  }

  return sum / 65536.0;
}

float sst(float a, float b, float x) {
  return smoothstep(a, b, x);
}

void main() {
  float time = u_time;

  float roundness = 0.;
  float imgAlpha = 0.;

  if (u_isImage == true) {
    // Image sampling (UV scaled inward to account for padding)
    vec2 imageUV = v_imageUV;
    imageUV -= .5;
    imageUV *= .95;
    imageUV += .5;

    vec2 dudx = dFdx(v_imageUV);
    vec2 dudy = dFdy(v_imageUV);

    // Blurred image: x = roundness, y = alpha
    vec2 blurred = gaussBlur9x9RG(u_image, imageUV, dudx, dudy, 10.);
    roundness = 1. - blurred.x;
    vec2 texelA = 1.0 / vec2(textureSize(u_image, 0));
    const float k3[3] = float[3](1.0, 2.0, 1.0);
    for (int j = -1; j <= 1; ++j) {
      for (int i = -1; i <= 1; ++i) {
        imgAlpha += k3[i + 1] * k3[j + 1] * texture(u_image, imageUV + vec2(float(i) * texelA.x, float(j) * texelA.y)).g;
      }
    }
    imgAlpha /= 16.0;
  } else {
    vec2 uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
    float edge = 0.;

    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * time));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;
    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(time * speed + fi * 1.23) + dir2 * cos(time * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    imgAlpha = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    roundness = 1. - edge;
  }

// Smoke UV setup
  vec2 smokeUV = v_objectUV;
  smokeUV = rotate(smokeUV, u_angle * PI / 180.);
  smokeUV *= mix(4., 1., u_size);

  // Two swirl paths: inner (shape-masked) and outer (free), each with independent distortion
  vec2 innerUV = smokeUV;
  vec2 outerUV = smokeUV;

  // Vertical displacement \u2014 applied independently to inner and outer
  innerUV.y += u_innerDistortion * (1. - sst(0., 1., length(.4 * innerUV)));
  innerUV.y -= .4 * u_innerDistortion;
  innerUV.y += .7 * u_offset * roundness;

  outerUV.y += u_outerDistortion * (1. - sst(0., 1., length(.4 * outerUV)));
  outerUV.y -= .4 * u_outerDistortion;

  float innerSwirl = u_innerDistortion * roundness;
  float outerSwirl = u_outerDistortion;

  for (int i = 1; i < 5; i++) {
    float fi = float(i);

    float stretchIn = max(length(dFdx(innerUV)), length(dFdy(innerUV)));
    float dampenIn = 1. / (1. + stretchIn * 8.);
    float sIn = innerSwirl * dampenIn;
    innerUV.x += sIn / fi * cos(time + fi * 2.9 * innerUV.y);
    innerUV.y += sIn / fi * cos(time + fi * 1.5 * innerUV.x);

    float stretchOut = max(length(dFdx(outerUV)), length(dFdy(outerUV)));
    float dampenOut = 1. / (1. + stretchOut * 8.);
    float sOut = outerSwirl * dampenOut;
    outerUV.x += sOut / fi * cos(time + fi * 2.9 * outerUV.y);
    outerUV.y += sOut / fi * cos(time + fi * 1.5 * outerUV.x);
  }

  // Smoke shapes from swirl fields
  float innerShape = exp(-1.5 * dot(innerUV, innerUV));
  float outerShape = exp(-1.5 * dot(outerUV, outerUV));

  // Visibility masks
  float outerMask = pow(u_outerGlow, 2.) * (1. - imgAlpha);
  float innerMask = (.01 + .99 * u_innerGlow) * imgAlpha;

  innerShape *= innerMask;
  outerShape *= outerMask;

  // Color gradient
  float mixer = (innerShape + outerShape) * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float smokeMask = 0.;
  for (int i = 1; i < ${Cu.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;

    float m = sst(0., 1., clamp(mixer - float(i - 1), 0., 1.));
    if (i == 1) smokeMask = m;

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  // Compositing (premultiplied alpha, front-to-back)
  vec3 color = gradient.rgb * smokeMask;
  float opacity = gradient.a * smokeMask;

  float innerOpacity = u_colorInner.a * imgAlpha;
  vec3 innerColor = u_colorInner.rgb * innerOpacity;
  color += innerColor * (1.0 - opacity);
  opacity += innerOpacity * (1.0 - opacity);

  vec3 backColor = u_colorBack.rgb * u_colorBack.a;
  color += backColor * (1.0 - opacity);
  opacity += u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`,Ho={measurePerformance:!1,workingSize:512,iterations:32};function pi(e){let t=document.createElement("canvas"),o=t.getContext("2d"),r=typeof e=="string"&&e.startsWith("blob:");return new Promise((a,n)=>{if(!e||!o){n(new Error("Invalid file or canvas context"));return}let i=r&&fetch(e).then(u=>u.headers.get("Content-Type")),s=new Image;s.crossOrigin="anonymous";let l=performance.now();s.onload=async()=>{let u,g=await i;g?u=g==="image/svg+xml":typeof e=="string"?u=e.endsWith(".svg")||e.startsWith("data:image/svg+xml"):u=e.type==="image/svg+xml";let m=s.width||s.naturalWidth,d=s.height||s.naturalHeight;if(u){let Z=m/d;m>d?(m=4096,d=4096/Z):(d=4096,m=4096*Z),s.width=m,s.height=d}let _=Math.min(m,d),v=Ho.workingSize/_,h=Math.round(m*v),c=Math.round(d*v);Ho.measurePerformance&&(console.log("[Processing Mode]"),console.log(`  Original: ${m}\xD7${d}`),console.log(`  Working: ${h}\xD7${c} (${(v*100).toFixed(1)}% scale)`),v<1&&console.log(`  Speedup: ~${Math.round(1/(v*v))}\xD7`)),t.width=m,t.height=d;let f=.025,p=Math.ceil(h*f),x=Math.ceil(c*f),S=h-2*p,w=c-2*x,C=document.createElement("canvas");C.width=h,C.height=c;let P=C.getContext("2d");P.drawImage(s,p,x,S,w);let I=performance.now(),D=P.getImageData(0,0,h,c).data,b=new Uint8Array(h*c),ue=new Uint8Array(h*c),ae=0;for(let W=0,Z=0;W<D.length;W+=4,Z++){let nt=D[W+3]===0?0:1;b[Z]=nt,ae+=nt}let ce=[],Ue=[];for(let W=0;W<c;W++)for(let Z=0;Z<h;Z++){let fe=W*h+Z;if(!b[fe])continue;let nt=!1;Z===0||Z===h-1||W===0||W===c-1?nt=!0:nt=!b[fe-1]||!b[fe+1]||!b[fe-h]||!b[fe+h]||!b[fe-h-1]||!b[fe-h+1]||!b[fe+h-1]||!b[fe+h+1],nt?(ue[fe]=1,ce.push(fe)):Ue.push(fe)}Ho.measurePerformance&&(console.log(`[Mask Building] Time: ${(performance.now()-I).toFixed(2)}ms`),console.log(`  Shape pixels: ${ae} / ${h*c} (${(ae/(h*c)*100).toFixed(1)}%)`),console.log(`  Interior pixels: ${Ue.length}`),console.log(`  Boundary pixels: ${ce.length}`));let Ct=nv(b,ue,new Uint32Array(Ue),new Uint32Array(ce),h,c),ao=performance.now(),We=iv(Ct,b,ue,h,c);Ho.measurePerformance&&console.log(`[Poisson Solve] Time: ${(performance.now()-ao).toFixed(2)}ms`);let Ye=0,jo;for(let W=0;W<Ue.length;W++){let Z=Ue[W];We[Z]>Ye&&(Ye=We[Z])}let Fo=document.createElement("canvas");Fo.width=h,Fo.height=c;let Ta=Fo.getContext("2d"),N=Ta.createImageData(h,c);for(let W=0;W<c;W++)for(let Z=0;Z<h;Z++){let fe=W*h+Z,nt=fe*4;if(!b[fe])N.data[nt]=255,N.data[nt+1]=255,N.data[nt+2]=255,N.data[nt+3]=0;else{let gi=255*(1-We[fe]/Ye);N.data[nt]=gi,N.data[nt+1]=gi,N.data[nt+2]=gi,N.data[nt+3]=255}}Ta.putImageData(N,0,0),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(Fo,0,0,h,c,0,0,m,d);let T=o.getImageData(0,0,m,d),J=Math.ceil(m*f),De=Math.ceil(d*f),ba=document.createElement("canvas");ba.width=m,ba.height=d;let Xo=ba.getContext("2d");Xo.drawImage(s,J,De,m-2*J,d-2*De);let E0=Xo.getImageData(0,0,m,d);for(let W=0;W<T.data.length;W+=4){let Z=E0.data[W+3],fe=T.data[W+3];Z===0?(T.data[W]=255,T.data[W+1]=0):(T.data[W]=fe===0?0:T.data[W],T.data[W+1]=Z),T.data[W+2]=255,T.data[W+3]=255}o.putImageData(T,0,0),jo=T,t.toBlob(W=>{if(!W){n(new Error("Failed to create PNG blob"));return}if(Ho.measurePerformance){let Z=performance.now()-l;if(console.log(`[Total Processing Time] ${Z.toFixed(2)}ms`),v<1){let fe=Z*Math.pow(m*d/(h*c),1.5);console.log(`[Estimated time at full resolution] ~${fe.toFixed(0)}ms`),console.log(`[Time saved] ~${(fe-Z).toFixed(0)}ms (${Math.round(fe/Z)}\xD7 faster)`)}}a({imageData:jo,pngBlob:W})},"image/png")},s.onerror=()=>n(new Error("Failed to load image")),s.src=typeof e=="string"?e:URL.createObjectURL(e)})}function nv(e,t,o,r,a,n){let i=o.length,s=new Int32Array(i*4);for(let l=0;l<i;l++){let u=o[l],g=u%a,m=Math.floor(u/a);s[l*4+0]=g<a-1&&e[u+1]?u+1:-1,s[l*4+1]=g>0&&e[u-1]?u-1:-1,s[l*4+2]=m>0&&e[u-a]?u-a:-1,s[l*4+3]=m<n-1&&e[u+a]?u+a:-1}return{interiorPixels:o,boundaryPixels:r,pixelCount:i,neighborIndices:s}}function iv(e,t,o,r,a){let n=Ho.iterations,i=.01,s=new Float32Array(r*a),{interiorPixels:l,neighborIndices:u,pixelCount:g}=e,m=performance.now(),d=1.9,_=[],y=[];for(let h=0;h<g;h++){let c=l[h],f=c%r,p=Math.floor(c/r);(f+p)%2===0?_.push(h):y.push(h)}for(let h=0;h<n;h++){for(let c of _){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0;p>=0&&(C+=s[p]),x>=0&&(C+=s[x]),S>=0&&(C+=s[S]),w>=0&&(C+=s[w]);let P=(i+C)/4;s[f]=d*P+(1-d)*s[f]}for(let c of y){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0;p>=0&&(C+=s[p]),x>=0&&(C+=s[x]),S>=0&&(C+=s[S]),w>=0&&(C+=s[w]);let P=(i+C)/4;s[f]=d*P+(1-d)*s[f]}}let v=new Float32Array(r*a);for(let h=0;h<3;h++){v.set(s);for(let c=0;c<g;c++){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0,P=0;p>=0&&(C+=v[p],P++),x>=0&&(C+=v[x],P++),S>=0&&(C+=v[S],P++),w>=0&&(C+=v[w],P++),s[f]=P>0?(v[f]+C/P)*.5:v[f]}}if(Ho.measurePerformance){let h=performance.now()-m;console.log(`[Optimized Poisson Solver (SOR \u03C9=${d})]`),console.log(`  Working size: ${r}\xD7${a}`),console.log(`  Iterations: ${n}`),console.log(`  Time: ${h.toFixed(2)}ms`),console.log(`  Interior pixels processed: ${g}`),console.log(`  Speed: ${(n*g/(h*1e3)).toFixed(2)} Mpixels/sec`)}return s}var Au={none:0,circle:1,daisy:2,diamond:3,metaballs:4};function A(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:Bu;if(typeof e!="string")return Bu;let t,o,r,a=1;if(e.startsWith("#"))[t,o,r,a]=sv(e);else if(e.startsWith("rgb"))[t,o,r,a]=lv(e);else if(e.startsWith("hsl"))[t,o,r,a]=cv(uv(e));else return console.error("Unsupported color format",e),Bu;return[mi(t,0,1),mi(o,0,1),mi(r,0,1),mi(a,0,1)]}function sv(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(n=>n+n).join("")),e.length===6&&(e=e+"ff");let t=parseInt(e.slice(0,2),16)/255,o=parseInt(e.slice(2,4),16)/255,r=parseInt(e.slice(4,6),16)/255,a=parseInt(e.slice(6,8),16)/255;return[t,o,r,a]}function lv(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0")/255,parseInt(t[2]??"0")/255,parseInt(t[3]??"0")/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function uv(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0"),parseInt(t[2]??"0"),parseInt(t[3]??"0"),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function cv(e){let[t,o,r,a]=e,n=t/360,i=o/100,s=r/100,l,u,g;if(o===0)l=u=g=s;else{let m=(y,v,h)=>(h<0&&(h+=1),h>1&&(h-=1),h<.16666666666666666?y+(v-y)*6*h:h<.5?v:h<.6666666666666666?y+(v-y)*(.6666666666666666-h)*6:y),d=s<.5?s*(1+i):s+i-s*i,_=2*s-d;l=m(_,d,n+1/3),u=m(_,d,n),g=m(_,d,n-1/3)}return[l,u,g,a]}var mi=(e,t,o)=>Math.min(Math.max(e,t),o),Bu=[0,0,0,1];function we(){if(typeof window>"u")return;let e=new Image;return e.src=fv,e}var fv="data:image/png;base64,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";var Pu="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";var zr=z(L(),1);function gm(e){let t=zr.useRef(void 0),o=zr.useCallback(r=>{let a=e.map(n=>{if(n!=null){if(typeof n=="function"){let i=n,s=i(r);return typeof s=="function"?s:()=>{i(null)}}return n.current=r,()=>{n.current=null}}});return()=>{a.forEach(n=>n?.())}},e);return zr.useMemo(()=>e.every(r=>r==null)?null:r=>{t.current&&(t.current(),t.current=void 0),r!=null&&(t.current=o(r))},e)}function Eu(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}var ym=z(j(),1);async function _m(e){let t={},o=[],r=n=>{try{return n.startsWith("/")||new URL(n),!0}catch{return!1}},a=n=>{try{return n.startsWith("/")?!1:new URL(n,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([n,i])=>{if(typeof i=="string"){let s=i||Pu;if(!r(s)){console.warn(`Uniform "${n}" has invalid URL "${s}". Skipping image loading.`);return}let l=new Promise((u,g)=>{let m=new Image;a(s)&&(m.crossOrigin="anonymous"),m.onload=()=>{Eu(m),t[n]=m,u()},m.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${s}`),g()},m.src=s});o.push(l)}else i instanceof HTMLImageElement&&Eu(i),t[n]=i}),await Promise.all(o),t}var U=(0,ct.forwardRef)(function({fragmentShader:t,uniforms:o,webGlContextAttributes:r,speed:a=0,frame:n=0,width:i,height:s,minPixelRatio:l,maxPixelCount:u,mipmaps:g,style:m,...d},_){let[y,v]=(0,ct.useState)(!1),h=(0,ct.useRef)(null),c=(0,ct.useRef)(null),f=(0,ct.useRef)(r);(0,ct.useEffect)(()=>((async()=>{let S=await _m(o);h.current&&!c.current&&(c.current=new Ba(h.current,t,S,f.current,a,n,l,u,g),v(!0))})(),()=>{c.current?.dispose(),c.current=null}),[t]),(0,ct.useEffect)(()=>{let x=!1;return(async()=>{let w=await _m(o);x||c.current?.setUniforms(w)})(),()=>{x=!0}},[o,y]),(0,ct.useEffect)(()=>{c.current?.setSpeed(a)},[a,y]),(0,ct.useEffect)(()=>{c.current?.setMaxPixelCount(u)},[u,y]),(0,ct.useEffect)(()=>{c.current?.setMinPixelRatio(l)},[l,y]),(0,ct.useEffect)(()=>{c.current?.setFrame(n)},[n,y]);let p=gm([h,_]);return(0,ym.jsx)("div",{ref:p,style:i!==void 0||s!==void 0?{width:typeof i=="string"&&isNaN(+i)===!1?+i:i,height:typeof s=="string"&&isNaN(+s)===!1?+s:s,...m}:m,...d})});U.displayName="ShaderMount";var Sm=z(L(),1);function O(e,t){for(let o in e){if(o==="colors"){let r=Array.isArray(e.colors),a=Array.isArray(t.colors);if(!r||!a){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((n,i)=>n===t.colors?.[i]))return!1;continue}if(Object.is(e[o],t[o])===!1)return!1}return!0}var wm=z(j(),1),Xe={name:"Default",params:{...k,speed:1,frame:0,colors:["#e0eaff","#241d9a","#f75092","#9f50d3"],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}},xv={name:"Purple",params:{...k,speed:.6,frame:0,colors:["#aaa7d7","#3c2b8e"],distortion:1,swirl:1,grainMixer:0,grainOverlay:0}},_v={name:"Beach",params:{...k,speed:.1,frame:0,colors:["#bcecf6","#00aaff","#00f7ff","#ffd447"],distortion:.8,swirl:.35,grainMixer:0,grainOverlay:0}},yv={name:"Ink",params:{...k,speed:1,frame:0,colors:["#ffffff","#000000"],distortion:1,swirl:.2,rotation:90,grainMixer:0,grainOverlay:0}},Cm=[Xe,yv,xv,_v],km=(0,Sm.memo)(function({speed:t=Xe.params.speed,frame:o=Xe.params.frame,colors:r=Xe.params.colors,distortion:a=Xe.params.distortion,swirl:n=Xe.params.swirl,grainMixer:i=Xe.params.grainMixer,grainOverlay:s=Xe.params.grainOverlay,fit:l=Xe.params.fit,rotation:u=Xe.params.rotation,scale:g=Xe.params.scale,originX:m=Xe.params.originX,originY:d=Xe.params.originY,offsetX:_=Xe.params.offsetX,offsetY:y=Xe.params.offsetY,worldWidth:v=Xe.params.worldWidth,worldHeight:h=Xe.params.worldHeight,...c}){let f={u_colors:r.map(A),u_colorsCount:r.length,u_distortion:a,u_swirl:n,u_grainMixer:i,u_grainOverlay:s,u_fit:R[l],u_rotation:u,u_scale:g,u_offsetX:_,u_offsetY:y,u_originX:m,u_originY:d,u_worldWidth:v,u_worldHeight:h};return(0,wm.jsx)(U,{...c,speed:t,frame:o,fragmentShader:Dl,uniforms:f})},O);var Am=z(L(),1);var Bm=z(j(),1),Ie={name:"Default",params:{...k,speed:.5,frame:0,colorBack:"#000000",colors:["#ffffff"],noiseScale:3,noiseIterations:8,radius:.25,thickness:.65,innerShape:.7,scale:.8}},Sv={name:"Solar",params:{...k,speed:1,frame:0,colorBack:"#000000",colors:["#ffffff","#ffca0a","#fc6203","#fc620366"],noiseScale:2,noiseIterations:3,radius:.4,thickness:.8,innerShape:4,scale:2,offsetY:1}},wv={name:"Line",params:{...k,frame:0,colorBack:"#000000",colors:["#4540a4","#1fe8ff"],noiseScale:1.1,noiseIterations:2,radius:.38,thickness:.01,innerShape:.88,speed:4}},Cv={name:"Cloud",params:{...k,frame:0,colorBack:"#81ADEC",colors:["#ffffff"],noiseScale:3,noiseIterations:10,radius:.5,thickness:.65,innerShape:.85,speed:.5,scale:2.5}},Pm=[Ie,wv,Sv,Cv],Em=(0,Am.memo)(function({speed:t=Ie.params.speed,frame:o=Ie.params.frame,colorBack:r=Ie.params.colorBack,colors:a=Ie.params.colors,noiseScale:n=Ie.params.noiseScale,thickness:i=Ie.params.thickness,radius:s=Ie.params.radius,innerShape:l=Ie.params.innerShape,noiseIterations:u=Ie.params.noiseIterations,fit:g=Ie.params.fit,scale:m=Ie.params.scale,rotation:d=Ie.params.rotation,originX:_=Ie.params.originX,originY:y=Ie.params.originY,offsetX:v=Ie.params.offsetX,offsetY:h=Ie.params.offsetY,worldWidth:c=Ie.params.worldWidth,worldHeight:f=Ie.params.worldHeight,...p}){let x={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_noiseScale:n,u_thickness:i,u_radius:s,u_innerShape:l,u_noiseIterations:u,u_noiseTexture:we(),u_fit:R[g],u_scale:m,u_rotation:d,u_offsetX:v,u_offsetY:h,u_originX:_,u_originY:y,u_worldWidth:c,u_worldHeight:f};return(0,Bm.jsx)(U,{...p,speed:t,frame:o,fragmentShader:Nl,uniforms:x})},O);var Fm=z(L(),1);var zm=z(j(),1),Ke={name:"Default",params:{...M,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#47a6ff",colorBack:"#000000",brightness:.05,contrast:.3}},kv={name:"Sensation",params:{...M,speed:1,frame:0,colorFront:"#00c8ff",colorMid:"#fbff00",colorBack:"#8b42ff",brightness:.19,contrast:.12,scale:3}},Av={name:"Bloodstream",params:{...M,speed:1,frame:0,colorFront:"#ff0000",colorMid:"#ff0000",colorBack:"#ffffff",brightness:.24,contrast:.17,scale:.7}},Bv={name:"Ghost",params:{...M,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#000000",colorBack:"#ffffff",brightness:0,contrast:1,scale:.55}},Um=[Ke,kv,Av,Bv],Rm=(0,Fm.memo)(function({speed:t=Ke.params.speed,frame:o=Ke.params.frame,colorFront:r=Ke.params.colorFront,colorMid:a=Ke.params.colorMid,colorBack:n=Ke.params.colorBack,brightness:i=Ke.params.brightness,contrast:s=Ke.params.contrast,fit:l=Ke.params.fit,scale:u=Ke.params.scale,rotation:g=Ke.params.rotation,originX:m=Ke.params.originX,originY:d=Ke.params.originY,offsetX:_=Ke.params.offsetX,offsetY:y=Ke.params.offsetY,worldWidth:v=Ke.params.worldWidth,worldHeight:h=Ke.params.worldHeight,...c}){let f={u_colorFront:A(r),u_colorMid:A(a),u_colorBack:A(n),u_brightness:i,u_contrast:s,u_fit:R[l],u_scale:u,u_rotation:g,u_offsetX:_,u_offsetY:y,u_originX:m,u_originY:d,u_worldWidth:v,u_worldHeight:h};return(0,zm.jsx)(U,{...c,speed:t,frame:o,fragmentShader:Tl,uniforms:f})},O);var Mm=z(L(),1);var Im=z(j(),1),be={name:"Default",params:{...M,speed:1.5,frame:0,colorBack:"#000000",colors:["#ffc96b","#ff6200","#ff2f00","#421100","#1a0000"],size:1,sizeRange:0,spreading:1,stepsPerColor:4}},Pv={name:"Shine",params:{...M,speed:.1,frame:0,colors:["#ffffff","#006aff","#fff675"],colorBack:"#000000",stepsPerColor:4,size:.3,sizeRange:.2,spreading:1,scale:.4}},Ev={name:"Bubbles",params:{...M,speed:.4,frame:0,colors:["#D0D2D5"],colorBack:"#989CA4",stepsPerColor:2,size:.9,sizeRange:.7,spreading:1,scale:1.64}},Fv={name:"Hallucinatory",params:{...M,speed:5,frame:0,colors:["#000000"],colorBack:"#ffe500",stepsPerColor:2,size:.65,sizeRange:0,spreading:.3,scale:.5}},Vm=[be,Ev,Pv,Fv],Om=(0,Mm.memo)(function({speed:t=be.params.speed,frame:o=be.params.frame,colorBack:r=be.params.colorBack,colors:a=be.params.colors,size:n=be.params.size,sizeRange:i=be.params.sizeRange,spreading:s=be.params.spreading,stepsPerColor:l=be.params.stepsPerColor,fit:u=be.params.fit,scale:g=be.params.scale,rotation:m=be.params.rotation,originX:d=be.params.originX,originY:_=be.params.originY,offsetX:y=be.params.offsetX,offsetY:v=be.params.offsetY,worldWidth:h=be.params.worldWidth,worldHeight:c=be.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_size:n,u_sizeRange:i,u_spreading:s,u_stepsPerColor:l,u_noiseTexture:we(),u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,Im.jsx)(U,{...f,speed:t,frame:o,fragmentShader:bl,uniforms:p})},O);var Dm=z(L(),1);var Nm=z(j(),1),Pe={name:"Default",params:{...M,colorBack:"#000000",colorFill:"#ffffff",colorStroke:"#ffaa00",size:2,gapX:32,gapY:32,strokeWidth:0,sizeRange:0,opacityRange:0,shape:"circle"}},zv={name:"Triangles",params:{...M,colorBack:"#ffffff",colorFill:"#ffffff",colorStroke:"#808080",size:5,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"triangle"}},Uv={name:"Tree line",params:{...M,colorBack:"#f4fce7",colorFill:"#052e19",colorStroke:"#000000",size:8,gapX:20,gapY:90,strokeWidth:0,sizeRange:1,opacityRange:.6,shape:"circle"}},Rv={name:"Wallpaper",params:{...M,colorBack:"#204030",colorFill:"#000000",colorStroke:"#bd955b",size:9,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"diamond"}},Tm=[Pe,zv,Uv,Rv],bm=(0,Dm.memo)(function({colorBack:t=Pe.params.colorBack,colorFill:o=Pe.params.colorFill,colorStroke:r=Pe.params.colorStroke,size:a=Pe.params.size,gapX:n=Pe.params.gapX,gapY:i=Pe.params.gapY,strokeWidth:s=Pe.params.strokeWidth,sizeRange:l=Pe.params.sizeRange,opacityRange:u=Pe.params.opacityRange,shape:g=Pe.params.shape,fit:m=Pe.params.fit,scale:d=Pe.params.scale,rotation:_=Pe.params.rotation,originX:y=Pe.params.originX,originY:v=Pe.params.originY,offsetX:h=Pe.params.offsetX,offsetY:c=Pe.params.offsetY,worldWidth:f=Pe.params.worldWidth,worldHeight:p=Pe.params.worldHeight,maxPixelCount:x=6016*3384,...S}){let w={u_colorBack:A(t),u_colorFill:A(o),u_colorStroke:A(r),u_dotSize:a,u_gapX:n,u_gapY:i,u_strokeWidth:s,u_sizeRange:l,u_opacityRange:u,u_shape:Ll[g],u_fit:R[m],u_scale:d,u_rotation:_,u_offsetX:h,u_offsetY:c,u_originX:y,u_originY:v,u_worldWidth:f,u_worldHeight:p};return(0,Nm.jsx)(U,{...S,maxPixelCount:x,fragmentShader:Gl,uniforms:w})},O);var Gm=z(L(),1);var Lm=z(j(),1),ft={name:"Default",params:{...M,scale:.6,speed:.5,frame:0,colors:["#4449CF","#FFD1E0","#F94446","#FFD36B","#FFFFFF"],stepsPerColor:2,softness:0}},Mv={name:"Bubblegum",params:{...M,speed:2,frame:0,colors:["#ffffff","#ff9e9e","#5f57ff","#00f7ff"],stepsPerColor:1,softness:1,scale:1.6}},Iv={name:"Spots",params:{...M,speed:.6,frame:0,colors:["#ff7b00","#f9ffeb","#320d82"],stepsPerColor:1,softness:0,scale:1}},Vv={name:"First contact",params:{...M,speed:2,frame:0,colors:["#e8cce6","#120d22","#442c44","#e6baba","#fff5f5"],stepsPerColor:2,softness:0,scale:.2}},Wm=[ft,Iv,Vv,Mv],Ym=(0,Gm.memo)(function({speed:t=ft.params.speed,frame:o=ft.params.frame,colors:r=ft.params.colors,stepsPerColor:a=ft.params.stepsPerColor,softness:n=ft.params.softness,fit:i=ft.params.fit,scale:s=ft.params.scale,rotation:l=ft.params.rotation,originX:u=ft.params.originX,originY:g=ft.params.originY,offsetX:m=ft.params.offsetX,offsetY:d=ft.params.offsetY,worldWidth:_=ft.params.worldWidth,worldHeight:y=ft.params.worldHeight,...v}){let h={u_colors:r.map(A),u_colorsCount:r.length,u_stepsPerColor:a,u_softness:n,u_fit:R[i],u_scale:s,u_rotation:l,u_offsetX:m,u_offsetY:d,u_originX:u,u_originY:g,u_worldWidth:_,u_worldHeight:y};return(0,Lm.jsx)(U,{...v,speed:t,frame:o,fragmentShader:Wl,uniforms:h})},O);var Qm=z(L(),1);var Hm=z(j(),1),at={name:"Default",params:{...k,scale:1,speed:1,frame:0,colorBack:"#000000",colors:["#6e33cc","#ff5500","#ffc105","#ffc800","#f585ff"],count:10,size:.83}},Ov={name:"Ink Drops",params:{...k,scale:1,speed:2,frame:0,colorBack:"#ffffff00",colors:["#000000"],count:18,size:.1}},Dv={name:"Background",params:{...k,speed:.5,frame:0,colors:["#ae00ff","#00ff95","#ffc105"],colorBack:"#2a273f",count:13,size:.81,scale:4,rotation:0,offsetX:-.3}},Nv={name:"Solar",params:{...k,speed:1,frame:0,colors:["#ffc800","#ff5500","#ffc105"],colorBack:"#102f84",count:7,size:.75,scale:1}},jm=[at,Ov,Nv,Dv],Xm=(0,Qm.memo)(function({speed:t=at.params.speed,frame:o=at.params.frame,colorBack:r=at.params.colorBack,colors:a=at.params.colors,size:n=at.params.size,count:i=at.params.count,fit:s=at.params.fit,rotation:l=at.params.rotation,scale:u=at.params.scale,originX:g=at.params.originX,originY:m=at.params.originY,offsetX:d=at.params.offsetX,offsetY:_=at.params.offsetY,worldWidth:y=at.params.worldWidth,worldHeight:v=at.params.worldHeight,...h}){let c={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_size:n,u_count:i,u_noiseTexture:we(),u_fit:R[s],u_rotation:l,u_scale:u,u_offsetX:d,u_offsetY:_,u_originX:g,u_originY:m,u_worldWidth:y,u_worldHeight:v};return(0,Hm.jsx)(U,{...h,speed:t,frame:o,fragmentShader:Yl,uniforms:c})},O);var Km=z(L(),1);var qm=z(j(),1),Ge={name:"Default",params:{...M,scale:.6,colorFront:"#ffbb00",colorBack:"#000000",shape:0,frequency:.5,amplitude:.5,spacing:1.2,proportion:.1,softness:0}},Tv={name:"Groovy",params:{...M,scale:5,rotation:90,colorFront:"#fcfcee",colorBack:"#ff896b",shape:3,frequency:.2,amplitude:.25,spacing:1.17,proportion:.57,softness:0}},bv={name:"Tangled up",params:{...M,scale:.5,rotation:0,colorFront:"#133a41",colorBack:"#c2d8b6",shape:2.07,frequency:.44,amplitude:.57,spacing:1.05,proportion:.75,softness:0}},Gv={name:"Ride the wave",params:{...M,scale:1.7,rotation:0,colorFront:"#fdffe6",colorBack:"#1f1f1f",shape:2.25,frequency:.2,amplitude:1,spacing:1.25,proportion:1,softness:0}},Jm=[Ge,Tv,bv,Gv],Zm=(0,Km.memo)(function({colorFront:t=Ge.params.colorFront,colorBack:o=Ge.params.colorBack,shape:r=Ge.params.shape,frequency:a=Ge.params.frequency,amplitude:n=Ge.params.amplitude,spacing:i=Ge.params.spacing,proportion:s=Ge.params.proportion,softness:l=Ge.params.softness,fit:u=Ge.params.fit,scale:g=Ge.params.scale,rotation:m=Ge.params.rotation,offsetX:d=Ge.params.offsetX,offsetY:_=Ge.params.offsetY,originX:y=Ge.params.originX,originY:v=Ge.params.originY,worldWidth:h=Ge.params.worldWidth,worldHeight:c=Ge.params.worldHeight,maxPixelCount:f=6016*3384,...p}){let x={u_colorFront:A(t),u_colorBack:A(o),u_shape:r,u_frequency:a,u_amplitude:n,u_spacing:i,u_proportion:s,u_softness:l,u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:d,u_offsetY:_,u_originX:y,u_originY:v,u_worldWidth:h,u_worldHeight:c};return(0,qm.jsx)(U,{...p,fragmentShader:jl,uniforms:x})},O);var $m=z(L(),1);var ed=z(j(),1),xe={name:"Default",params:{...M,speed:.5,frame:0,colorBack:"#632ad5",colorFront:"#fccff7",proportion:.35,softness:.1,octaveCount:1,persistence:1,lacunarity:1.5}},Lv={name:"Nintendo Water",params:{...M,scale:1/.2,speed:.4,frame:0,colorBack:"#2d69d4",colorFront:"#d1eefc",proportion:.42,softness:0,octaveCount:2,persistence:.55,lacunarity:1.8}},Wv={name:"Moss",params:{...M,scale:1/.15,speed:.02,frame:0,colorBack:"#05ff4a",colorFront:"#262626",proportion:.65,softness:.35,octaveCount:6,persistence:1,lacunarity:2.55}},Yv={name:"Worms",params:{...M,scale:.9,speed:0,frame:0,colorBack:"#ffffff00",colorFront:"#595959",proportion:.5,softness:0,octaveCount:1,persistence:1,lacunarity:1.5}},td=[xe,Lv,Wv,Yv],od=(0,$m.memo)(function({speed:t=xe.params.speed,frame:o=xe.params.frame,colorFront:r=xe.params.colorFront,colorBack:a=xe.params.colorBack,proportion:n=xe.params.proportion,softness:i=xe.params.softness,octaveCount:s=xe.params.octaveCount,persistence:l=xe.params.persistence,lacunarity:u,fit:g=xe.params.fit,worldWidth:m=xe.params.worldWidth,worldHeight:d=xe.params.worldHeight,scale:_=xe.params.scale,rotation:y=xe.params.rotation,originX:v=xe.params.originX,originY:h=xe.params.originY,offsetX:c=xe.params.offsetX,offsetY:f=xe.params.offsetY,...p}){let x={u_colorBack:A(a),u_colorFront:A(r),u_proportion:n,u_softness:i??xe.params.softness,u_octaveCount:s??xe.params.octaveCount,u_persistence:l??xe.params.persistence,u_lacunarity:u??xe.params.lacunarity,u_fit:R[g],u_scale:_,u_rotation:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:m,u_worldHeight:d};return(0,ed.jsx)(U,{...p,speed:t,frame:o,fragmentShader:Ql,uniforms:x})},O);var rd=z(L(),1);var ad=z(j(),1),Ve={name:"Default",params:{...M,speed:.5,frame:0,colors:["#ff8247","#ffe53d"],stepsPerColor:3,colorGlow:"#ffffff",colorGap:"#2e0000",distortion:.4,gap:.04,glow:0,scale:.5}},Qv={name:"Cells",params:{...M,scale:.5,speed:.5,frame:0,colors:["#ffffff"],stepsPerColor:1,colorGlow:"#ffffff",colorGap:"#000000",distortion:.5,gap:.03,glow:.8}},Hv={name:"Bubbles",params:{...M,scale:.75,speed:.5,frame:0,colors:["#83c9fb"],stepsPerColor:1,colorGlow:"#ffffff",colorGap:"#ffffff",distortion:.4,gap:0,glow:1}},jv={name:"Lights",params:{...M,scale:3.3,speed:.5,frame:0,colors:["#fffffffc","#bbff00","#00ffff"],colorGlow:"#ff00d0",colorGap:"#ff00d0",stepsPerColor:2,distortion:.38,gap:0,glow:1}},nd=[Ve,jv,Qv,Hv],id=(0,rd.memo)(function({speed:t=Ve.params.speed,frame:o=Ve.params.frame,colors:r=Ve.params.colors,stepsPerColor:a=Ve.params.stepsPerColor,colorGlow:n=Ve.params.colorGlow,colorGap:i=Ve.params.colorGap,distortion:s=Ve.params.distortion,gap:l=Ve.params.gap,glow:u=Ve.params.glow,fit:g=Ve.params.fit,scale:m=Ve.params.scale,rotation:d=Ve.params.rotation,originX:_=Ve.params.originX,originY:y=Ve.params.originY,offsetX:v=Ve.params.offsetX,offsetY:h=Ve.params.offsetY,worldWidth:c=Ve.params.worldWidth,worldHeight:f=Ve.params.worldHeight,...p}){let x={u_colors:r.map(A),u_colorsCount:r.length,u_stepsPerColor:a,u_colorGlow:A(n),u_colorGap:A(i),u_distortion:s,u_gap:l,u_glow:u,u_noiseTexture:we(),u_fit:R[g],u_scale:m,u_rotation:d,u_offsetX:v,u_offsetY:h,u_originX:_,u_originY:y,u_worldWidth:c,u_worldHeight:f};return(0,ad.jsx)(U,{...p,speed:t,frame:o,fragmentShader:Hl,uniforms:x})},O);var sd=z(L(),1);var ld=z(j(),1),Ee={name:"Default",params:{...M,rotation:0,speed:1,frame:0,colors:["#121212","#9470ff","#121212","#8838ff"],proportion:.45,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:"checks"}},Xv={name:"Cauldron Pot",params:{...M,scale:.9,rotation:160,speed:10,frame:0,colors:["#a7e58b","#324472","#0a180d"],proportion:.64,softness:1.5,distortion:.2,swirl:.86,swirlIterations:7,shapeScale:.6,shape:"edge"}},Kv={name:"Live Ink",params:{...M,scale:1.2,rotation:44,offsetY:-.3,speed:2.5,frame:0,colors:["#111314","#9faeab","#f3fee7","#f3fee7"],proportion:.05,softness:0,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.28,shape:"checks"}},qv={name:"Kelp",params:{...M,scale:.8,rotation:50,speed:20,frame:0,colors:["#dbff8f","#404f3e","#091316"],proportion:.67,softness:0,distortion:0,swirl:.2,swirlIterations:3,shapeScale:1,shape:"stripes"}},Jv={name:"Nectar",params:{...M,scale:2,offsetY:.6,rotation:0,speed:4.2,frame:0,colors:["#151310","#d3a86b","#f0edea"],proportion:.24,softness:1,distortion:.21,swirl:.57,swirlIterations:10,shapeScale:.75,shape:"edge"}},Zv={name:"Passion",params:{...M,scale:2.5,rotation:1.35,speed:3,frame:0,colors:["#3b1515","#954751","#ffc085"],proportion:.5,softness:1,distortion:.09,swirl:.9,swirlIterations:6,shapeScale:.25,shape:"checks"}},ud=[Ee,Xv,Kv,qv,Jv,Zv],cd=(0,sd.memo)(function({speed:t=Ee.params.speed,frame:o=Ee.params.frame,colors:r=Ee.params.colors,proportion:a=Ee.params.proportion,softness:n=Ee.params.softness,distortion:i=Ee.params.distortion,swirl:s=Ee.params.swirl,swirlIterations:l=Ee.params.swirlIterations,shapeScale:u=Ee.params.shapeScale,shape:g=Ee.params.shape,fit:m=Ee.params.fit,scale:d=Ee.params.scale,rotation:_=Ee.params.rotation,originX:y=Ee.params.originX,originY:v=Ee.params.originY,offsetX:h=Ee.params.offsetX,offsetY:c=Ee.params.offsetY,worldWidth:f=Ee.params.worldWidth,worldHeight:p=Ee.params.worldHeight,...x}){let S={u_colors:r.map(A),u_colorsCount:r.length,u_proportion:a,u_softness:n,u_distortion:i,u_swirl:s,u_swirlIterations:l,u_shapeScale:u,u_shape:Kl[g],u_noiseTexture:we(),u_scale:d,u_rotation:_,u_fit:R[m],u_offsetX:h,u_offsetY:c,u_originX:y,u_originY:v,u_worldWidth:f,u_worldHeight:p};return(0,ld.jsx)(U,{...x,speed:t,frame:o,fragmentShader:Xl,uniforms:S})},O);var fd=z(L(),1);var pd=z(j(),1),Ce={name:"Default",params:{...k,offsetX:0,offsetY:-.55,colorBack:"#000000",colorBloom:"#0000ff",colors:["#a600ff6e","#6200fff0","#ffffff","#33fff5"],density:.3,spotty:.3,midIntensity:.4,midSize:.2,intensity:.8,bloom:.4,speed:.75,frame:0}},$v={name:"Warp",params:{...k,colorBack:"#000000",colorBloom:"#222288",colors:["#ff47d4","#ff8c00","#ffffff"],density:.45,spotty:.15,midIntensity:.4,midSize:.33,intensity:.79,bloom:.4,speed:2,frame:0}},e1={name:"Linear",params:{...k,offsetX:.2,offsetY:-.8,colorBack:"#000000",colorBloom:"#eeeeee",colors:["#ffffff1f","#ffffff3d","#ffffff29"],density:.41,spotty:.25,midSize:.1,midIntensity:.75,intensity:.79,bloom:1,speed:.5,frame:0}},t1={name:"Ether",params:{...k,offsetX:-.6,colorBack:"#090f1d",colorBloom:"#ffffff",colors:["#148effa6","#c4dffebe","#232a47"],density:.03,spotty:.77,midSize:.1,midIntensity:.6,intensity:.6,bloom:.6,speed:1,frame:0}},md=[Ce,$v,e1,t1],dd=(0,fd.memo)(function({speed:t=Ce.params.speed,frame:o=Ce.params.frame,colorBloom:r=Ce.params.colorBloom,colorBack:a=Ce.params.colorBack,colors:n=Ce.params.colors,density:i=Ce.params.density,spotty:s=Ce.params.spotty,midIntensity:l=Ce.params.midIntensity,midSize:u=Ce.params.midSize,intensity:g=Ce.params.intensity,bloom:m=Ce.params.bloom,fit:d=Ce.params.fit,scale:_=Ce.params.scale,rotation:y=Ce.params.rotation,originX:v=Ce.params.originX,originY:h=Ce.params.originY,offsetX:c=Ce.params.offsetX,offsetY:f=Ce.params.offsetY,worldWidth:p=Ce.params.worldWidth,worldHeight:x=Ce.params.worldHeight,...S}){let w={u_colorBloom:A(r),u_colorBack:A(a),u_colors:n.map(A),u_colorsCount:n.length,u_density:i,u_spotty:s,u_midIntensity:l,u_midSize:u,u_intensity:g,u_bloom:m,u_noiseTexture:we(),u_fit:R[d],u_scale:_,u_rotation:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,pd.jsx)(U,{...S,speed:t,frame:o,fragmentShader:ql,uniforms:w})},O);var gd=z(L(),1);var hd=z(j(),1),_e={name:"Default",params:{...M,scale:1,colorBack:"#001429",colorFront:"#79D1FF",density:1,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:0,noiseFrequency:0,softness:0,speed:1,frame:0}},o1={name:"Droplet",params:{...M,colorBack:"#effafe",colorFront:"#bf40a0",density:.9,distortion:0,strokeWidth:.75,strokeTaper:.18,strokeCap:1,noise:.74,noiseFrequency:.33,softness:.02,speed:1,frame:0}},r1={name:"Jungle",params:{...M,scale:1.3,density:.5,colorBack:"#a0ef2a",colorFront:"#288b18",distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:1,noiseFrequency:.25,softness:0,speed:.75,frame:0}},a1={name:"Swirl",params:{...M,scale:.45,colorBack:"#b3e6d9",colorFront:"#1a2b4d",density:.2,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:0,noiseFrequency:.3,softness:.5,speed:1,frame:0}},vd=[_e,r1,o1,a1],xd=(0,gd.memo)(function({speed:t=_e.params.speed,frame:o=_e.params.frame,colorBack:r=_e.params.colorBack,colorFront:a=_e.params.colorFront,density:n=_e.params.density,distortion:i=_e.params.distortion,strokeWidth:s=_e.params.strokeWidth,strokeTaper:l=_e.params.strokeTaper,strokeCap:u=_e.params.strokeCap,noiseFrequency:g=_e.params.noiseFrequency,noise:m=_e.params.noise,softness:d=_e.params.softness,fit:_=_e.params.fit,rotation:y=_e.params.rotation,scale:v=_e.params.scale,originX:h=_e.params.originX,originY:c=_e.params.originY,offsetX:f=_e.params.offsetX,offsetY:p=_e.params.offsetY,worldWidth:x=_e.params.worldWidth,worldHeight:S=_e.params.worldHeight,...w}){let C={u_colorBack:A(r),u_colorFront:A(a),u_density:n,u_distortion:i,u_strokeWidth:s,u_strokeTaper:l,u_strokeCap:u,u_noiseFrequency:g,u_noise:m,u_softness:d,u_fit:R[_],u_scale:v,u_rotation:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,hd.jsx)(U,{...w,speed:t,frame:o,fragmentShader:Jl,uniforms:C})},O);var _d=z(L(),1);var yd=z(j(),1),ke={name:"Default",params:{...k,speed:.32,frame:0,colorBack:"#330000",colors:["#ffd1d1","#ff8a8a","#660000"],bandCount:4,twist:.1,center:.2,proportion:.5,softness:0,noiseFrequency:.4,noise:.2}},n1={name:"Opening",params:{...k,offsetX:-.4,offsetY:1,speed:.5,frame:0,colorBack:"#ff8b61",colors:["#fefff0","#ffd8bd","#ff8b61"],bandCount:2,twist:.3,center:.2,proportion:.5,softness:0,noiseFrequency:0,noise:0,scale:1}},i1={name:"007",params:{...k,speed:1,frame:0,colorBack:"#E9E7DA",colors:["#000000"],bandCount:5,twist:.3,center:0,proportion:0,softness:0,noiseFrequency:.5,noise:0}},s1={name:"Candy",params:{...k,speed:1,frame:0,colorBack:"#ffcd66",colors:["#6bbceb","#d7b3ff","#ff9fff"],bandCount:2,twist:.15,center:.2,proportion:.5,softness:1,noiseFrequency:.5,noise:0}},Sd=[ke,i1,n1,s1],wd=(0,_d.memo)(function({speed:t=ke.params.speed,frame:o=ke.params.frame,colorBack:r=ke.params.colorBack,colors:a=ke.params.colors,bandCount:n=ke.params.bandCount,twist:i=ke.params.twist,center:s=ke.params.center,proportion:l=ke.params.proportion,softness:u=ke.params.softness,noiseFrequency:g=ke.params.noiseFrequency,noise:m=ke.params.noise,fit:d=ke.params.fit,rotation:_=ke.params.rotation,scale:y=ke.params.scale,originX:v=ke.params.originX,originY:h=ke.params.originY,offsetX:c=ke.params.offsetX,offsetY:f=ke.params.offsetY,worldWidth:p=ke.params.worldWidth,worldHeight:x=ke.params.worldHeight,...S}){let w={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_bandCount:n,u_twist:i,u_center:s,u_proportion:l,u_softness:u,u_noiseFrequency:g,u_noise:m,u_fit:R[d],u_scale:y,u_rotation:_,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,yd.jsx)(U,{...S,speed:t,frame:o,fragmentShader:Zl,uniforms:w})},O);var Cd=z(L(),1);var kd=z(j(),1),qe={name:"Default",params:{...M,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},l1={name:"Sine Wave",params:{...M,speed:1,frame:0,colorBack:"#730d54",colorFront:"#00becc",shape:"wave",type:"4x4",size:11,scale:1.2}},u1={name:"Bugs",params:{...M,speed:1,frame:0,colorBack:"#000000",colorFront:"#008000",shape:"dots",type:"random",size:9}},c1={name:"Ripple",params:{...k,speed:1,frame:0,colorBack:"#603520",colorFront:"#c67953",shape:"ripple",type:"2x2",size:3}},f1={name:"Swirl",params:{...k,speed:1,frame:0,colorBack:"#00000000",colorFront:"#47a8e1",shape:"swirl",type:"8x8",size:2}},p1={name:"Warp",params:{...k,speed:1,frame:0,colorBack:"#301c2a",colorFront:"#56ae6c",shape:"warp",type:"4x4",size:2.5}},Ad=[qe,p1,l1,c1,u1,f1],Bd=(0,Cd.memo)(function({speed:t=qe.params.speed,frame:o=qe.params.frame,colorBack:r=qe.params.colorBack,colorFront:a=qe.params.colorFront,shape:n=qe.params.shape,type:i=qe.params.type,pxSize:s,size:l=s===void 0?qe.params.size:s,fit:u=qe.params.fit,scale:g=qe.params.scale,rotation:m=qe.params.rotation,originX:d=qe.params.originX,originY:_=qe.params.originY,offsetX:y=qe.params.offsetX,offsetY:v=qe.params.offsetY,worldWidth:h=qe.params.worldWidth,worldHeight:c=qe.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colorFront:A(a),u_shape:eu[n],u_type:Ia[i],u_pxSize:l,u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,kd.jsx)(U,{...f,speed:t,frame:o,fragmentShader:$l,uniforms:p})});var Pd=z(L(),1);var Ed=z(j(),1),Le={name:"Default",params:{...k,speed:1,frame:0,colorBack:"#000000",colors:["#7300ff","#eba8ff","#00bfff","#2a00ff"],softness:.5,intensity:.5,noise:.25,shape:"corners"}},m1={name:"Wave",params:{...M,speed:1,frame:0,colorBack:"#000a0f",colors:["#c4730b","#bdad5f","#d8ccc7"],softness:.7,intensity:.15,noise:.5,shape:"wave"}},d1={name:"Dots",params:{...M,scale:.6,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f0000","#0080ff","#f2ebc9","#33cc33"],softness:1,intensity:1,noise:.7,shape:"dots"}},g1={name:"Truchet",params:{...M,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f2200","#eabb7c","#39b523"],softness:0,intensity:.2,noise:1,shape:"truchet"}},h1={name:"Ripple",params:{...k,scale:.5,speed:1,frame:0,colorBack:"#140a00",colors:["#6f2d00","#88ddae","#2c0b1d"],softness:.5,intensity:.5,noise:.5,shape:"ripple"}},v1={name:"Blob",params:{...k,scale:1.3,speed:1,frame:0,colorBack:"#0f0e18",colors:["#3e6172","#a49b74","#568c50"],softness:0,intensity:.15,noise:.5,shape:"blob"}},Fd=[Le,m1,d1,g1,h1,v1],zd=(0,Pd.memo)(function({speed:t=Le.params.speed,frame:o=Le.params.frame,colorBack:r=Le.params.colorBack,colors:a=Le.params.colors,softness:n=Le.params.softness,intensity:i=Le.params.intensity,noise:s=Le.params.noise,shape:l=Le.params.shape,fit:u=Le.params.fit,scale:g=Le.params.scale,rotation:m=Le.params.rotation,originX:d=Le.params.originX,originY:_=Le.params.originY,offsetX:y=Le.params.offsetX,offsetY:v=Le.params.offsetY,worldWidth:h=Le.params.worldWidth,worldHeight:c=Le.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_softness:n,u_intensity:i,u_noise:s,u_shape:ou[l],u_noiseTexture:we(),u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,Ed.jsx)(U,{...f,speed:t,frame:o,fragmentShader:tu,uniforms:p})});var Ud=z(L(),1);var Rd=z(j(),1),q={name:"Default",params:{...k,speed:1,frame:0,scale:.6,colorBack:"#000000",colors:["#0dc1fd","#d915ef","#ff3f2ecc"],roundness:.25,thickness:.1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",softness:.75,intensity:.2,bloom:.25,spots:5,spotSize:.5,pulse:.25,smoke:.3,smokeSize:.6}},x1={name:"Circle",params:{...k,aspectRatio:"square",scale:.6,speed:1,frame:0,colorBack:"#000000",colors:["#0dc1fd","#d915ef","#ff3f2ecc"],roundness:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,thickness:0,softness:.75,intensity:.2,bloom:.45,spots:3,spotSize:.4,pulse:.5,smoke:1,smokeSize:0}},_1={name:"Northern lights",params:{...k,speed:.18,scale:1.1,frame:0,colors:["#4c4794","#774a7d","#12694a","#0aff78","#4733cc"],colorBack:"#0c182c",roundness:0,thickness:1,softness:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",intensity:.1,bloom:.2,spots:4,spotSize:.25,pulse:0,smoke:.32,smokeSize:.5}},y1={name:"Solid line",params:{...k,speed:1,frame:0,colors:["#81ADEC"],colorBack:"#00000000",roundness:0,thickness:.05,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",softness:0,intensity:0,bloom:.15,spots:4,spotSize:1,pulse:0,smoke:0,smokeSize:0}},Md=[q,x1,_1,y1],Id=(0,Ud.memo)(function({speed:t=q.params.speed,frame:o=q.params.frame,colors:r=q.params.colors,colorBack:a=q.params.colorBack,roundness:n=q.params.roundness,thickness:i=q.params.thickness,aspectRatio:s=q.params.aspectRatio,softness:l=q.params.softness,bloom:u=q.params.bloom,intensity:g=q.params.intensity,spots:m=q.params.spots,spotSize:d=q.params.spotSize,pulse:_=q.params.pulse,smoke:y=q.params.smoke,smokeSize:v=q.params.smokeSize,margin:h,marginLeft:c=h??q.params.marginLeft,marginRight:f=h??q.params.marginRight,marginTop:p=h??q.params.marginTop,marginBottom:x=h??q.params.marginBottom,fit:S=q.params.fit,rotation:w=q.params.rotation,scale:C=q.params.scale,originX:P=q.params.originX,originY:I=q.params.originY,offsetX:E=q.params.offsetX,offsetY:D=q.params.offsetY,worldWidth:b=q.params.worldWidth,worldHeight:ue=q.params.worldHeight,...ae}){let ce={u_colorBack:A(a),u_colors:r.map(A),u_colorsCount:r.length,u_roundness:n,u_thickness:i,u_marginLeft:c,u_marginRight:f,u_marginTop:p,u_marginBottom:x,u_aspectRatio:au[s],u_softness:l,u_intensity:g,u_bloom:u,u_spots:m,u_spotSize:d,u_pulse:_,u_smoke:y,u_smokeSize:v,u_noiseTexture:we(),u_fit:R[S],u_rotation:w,u_scale:C,u_offsetX:E,u_offsetY:D,u_originX:P,u_originY:I,u_worldWidth:b,u_worldHeight:ue};return(0,Rd.jsx)(U,{...ae,speed:t,frame:o,fragmentShader:ru,uniforms:ce})},O);var Vd=z(L(),1);var Od=z(j(),1),ge={name:"Default",params:{...k,speed:.5,frame:0,colors:["#ff9d00","#fd4f30","#809bff","#6d2eff","#333aff","#f15cff","#ffd557"],colorBack:"#000000",angle1:0,angle2:0,length:1.1,edges:!1,blur:0,fadeIn:1,fadeOut:.3,gradient:0,density:3,scale:.8}},S1={name:"Glass",params:{...k,rotation:112,speed:1,frame:0,colors:["#00cfff","#ff2d55","#34c759","#af52de"],colorBack:"#ffffff00",angle1:.3,angle2:.3,length:1,edges:!0,blur:.25,fadeIn:.85,fadeOut:.3,gradient:0,density:1.6}},w1={name:"Gradient",params:{...k,speed:.5,frame:0,colors:["#f2ff00","#00000000","#00000000","#5a0283","#005eff"],colorBack:"#8ffff2",angle1:.4,angle2:.4,length:3,edges:!1,blur:.5,fadeIn:1,fadeOut:.39,gradient:.78,density:1.65,scale:1.72,rotation:270,offsetX:.18}},C1={name:"Opening",params:{...k,speed:2,frame:0,colors:["#00ffff"],colorBack:"#570044",angle1:-1,angle2:-1,length:.52,edges:!1,blur:0,fadeIn:0,fadeOut:1,gradient:0,density:2.21,scale:2.32,rotation:360,offsetX:-.3,offsetY:.6}},Dd=[ge,S1,w1,C1],Nd=(0,Vd.memo)(function({speed:t=ge.params.speed,frame:o=ge.params.frame,colors:r=ge.params.colors,colorBack:a=ge.params.colorBack,angle1:n=ge.params.angle1,angle2:i=ge.params.angle2,length:s=ge.params.length,edges:l=ge.params.edges,blur:u=ge.params.blur,fadeIn:g=ge.params.fadeIn,fadeOut:m=ge.params.fadeOut,density:d=ge.params.density,gradient:_=ge.params.gradient,fit:y=ge.params.fit,scale:v=ge.params.scale,rotation:h=ge.params.rotation,originX:c=ge.params.originX,originY:f=ge.params.originY,offsetX:p=ge.params.offsetX,offsetY:x=ge.params.offsetY,worldWidth:S=ge.params.worldWidth,worldHeight:w=ge.params.worldHeight,...C}){let P={u_colors:r.map(A),u_colorsCount:r.length,u_colorBack:A(a),u_angle1:n,u_angle2:i,u_length:s,u_edges:l,u_blur:u,u_fadeIn:g,u_fadeOut:m,u_density:d,u_gradient:_,u_fit:R[y],u_scale:v,u_rotation:h,u_offsetX:p,u_offsetY:x,u_originX:c,u_originY:f,u_worldWidth:S,u_worldHeight:w};return(0,Od.jsx)(U,{...C,speed:t,frame:o,fragmentShader:nu,uniforms:P})},O);var Td=z(L(),1);var bd=z(j(),1),Ae={name:"Default",params:{...k,rotation:270,speed:0,frame:0,colors:["#ffad0a","#6200ff","#e2a3ff","#ff99fd"],positions:2,waveX:1,waveXShift:.6,waveY:1,waveYShift:.21,mixing:.93,grainMixer:0,grainOverlay:0}},k1={name:"Sea",params:{...k,speed:0,frame:0,colors:["#013b65","#03738c","#a3d3ff","#f2faef"],positions:0,waveX:.53,waveXShift:0,waveY:.95,waveYShift:.64,mixing:.5,grainMixer:0,grainOverlay:0}},A1={name:"1960s",params:{...k,speed:0,frame:0,colors:["#000000","#082400","#b1aa91","#8e8c15"],positions:42,waveX:.45,waveXShift:0,waveY:1,waveYShift:0,mixing:0,grainMixer:.37,grainOverlay:.78}},B1={name:"Sunset",params:{...k,speed:0,frame:0,colors:["#264653","#9c2b2b","#f4a261","#ffffff"],positions:0,waveX:.6,waveXShift:.7,waveY:.7,waveYShift:.7,mixing:.5,grainMixer:0,grainOverlay:0}},Gd=[Ae,A1,B1,k1],Ld=(0,Td.memo)(function({speed:t=Ae.params.speed,frame:o=Ae.params.frame,colors:r=Ae.params.colors,positions:a=Ae.params.positions,waveX:n=Ae.params.waveX,waveXShift:i=Ae.params.waveXShift,waveY:s=Ae.params.waveY,waveYShift:l=Ae.params.waveYShift,mixing:u=Ae.params.mixing,grainMixer:g=Ae.params.grainMixer,grainOverlay:m=Ae.params.grainOverlay,fit:d=Ae.params.fit,rotation:_=Ae.params.rotation,scale:y=Ae.params.scale,originX:v=Ae.params.originX,originY:h=Ae.params.originY,offsetX:c=Ae.params.offsetX,offsetY:f=Ae.params.offsetY,worldWidth:p=Ae.params.worldWidth,worldHeight:x=Ae.params.worldHeight,...S}){let w={u_colors:r.map(A),u_colorsCount:r.length,u_positions:a,u_waveX:n,u_waveXShift:i,u_waveY:s,u_waveYShift:l,u_mixing:u,u_grainMixer:g,u_grainOverlay:m,u_fit:R[d],u_rotation:_,u_scale:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,bd.jsx)(U,{...S,speed:t,frame:o,fragmentShader:iu,uniforms:w})},O);var Wd=z(L(),1);var Yd=z(j(),1),se={name:"Default",params:{...k,scale:1,speed:0,frame:0,colorBack:"#000000",colors:["#00bbff","#00ffe1","#ffffff"],radius:.8,focalDistance:.99,focalAngle:0,falloff:.24,mixing:.5,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},P1={name:"Cross Section",params:{...k,scale:1,speed:0,frame:0,colorBack:"#3d348b",colors:["#7678ed","#f7b801","#f18701","#37a066"],radius:1,focalDistance:0,focalAngle:0,falloff:0,mixing:0,distortion:1,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},E1={name:"Radial",params:{...k,scale:1,speed:0,frame:0,colorBack:"#264653",colors:["#9c2b2b","#f4a261","#ffffff"],radius:1,focalDistance:0,focalAngle:0,falloff:0,mixing:1,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},F1={name:"Lo-Fi",params:{...k,speed:0,frame:0,colorBack:"#2e1f27",colors:["#d72638","#3f88c5","#f49d37"],radius:1,focalDistance:0,focalAngle:0,falloff:.9,mixing:.7,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:1,grainOverlay:.5}},Qd=[se,F1,P1,E1],Hd=(0,Wd.memo)(function({speed:t=se.params.speed,frame:o=se.params.frame,colorBack:r=se.params.colorBack,colors:a=se.params.colors,radius:n=se.params.radius,focalDistance:i=se.params.focalDistance,focalAngle:s=se.params.focalAngle,falloff:l=se.params.falloff,grainMixer:u=se.params.grainMixer,mixing:g=se.params.mixing,distortion:m=se.params.distortion,distortionShift:d=se.params.distortionShift,distortionFreq:_=se.params.distortionFreq,grainOverlay:y=se.params.grainOverlay,fit:v=se.params.fit,rotation:h=se.params.rotation,scale:c=se.params.scale,originX:f=se.params.originX,originY:p=se.params.originY,offsetX:x=se.params.offsetX,offsetY:S=se.params.offsetY,worldWidth:w=se.params.worldWidth,worldHeight:C=se.params.worldHeight,...P}){let I={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_radius:n,u_focalDistance:i,u_focalAngle:s,u_falloff:l,u_mixing:g,u_distortion:m,u_distortionShift:d,u_distortionFreq:_,u_grainMixer:u,u_grainOverlay:y,u_fit:R[v],u_rotation:h,u_scale:c,u_offsetX:x,u_offsetY:S,u_originX:f,u_originY:p,u_worldWidth:w,u_worldHeight:C};return(0,Yd.jsx)(U,{...P,speed:t,frame:o,fragmentShader:su,uniforms:I})},O);var jd=z(L(),1);var Xd=z(j(),1),re={name:"Default",params:{...k,fit:"cover",scale:.6,speed:0,frame:0,colorFront:"#9fadbc",colorBack:"#ffffff",contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}},z1={name:"Abstract",params:{...k,fit:"cover",speed:0,frame:0,scale:.6,colorFront:"#00eeff",colorBack:"#ff0a81",contrast:.85,roughness:0,fiber:.1,fiberSize:.2,crumples:0,crumpleSize:.3,folds:1,foldCount:3,fade:0,drops:.2,seed:2.2}},U1={name:"Cardboard",params:{...k,fit:"cover",speed:0,frame:0,scale:.6,colorFront:"#c7b89e",colorBack:"#999180",contrast:.4,roughness:0,fiber:.35,fiberSize:.14,crumples:.7,crumpleSize:.1,folds:0,foldCount:1,fade:0,drops:.1,seed:1.6}},R1={name:"Details",params:{...k,speed:0,frame:0,fit:"cover",scale:3,colorFront:"#00000000",colorBack:"#00000000",contrast:0,roughness:1,fiber:.27,fiberSize:.22,crumples:1,crumpleSize:.5,folds:1,foldCount:15,fade:0,drops:0,seed:6}},Kd=[re,U1,z1,R1],qd=(0,jd.memo)(function({speed:t=re.params.speed,frame:o=re.params.frame,colorFront:r=re.params.colorFront,colorBack:a=re.params.colorBack,image:n="",contrast:i=re.params.contrast,roughness:s=re.params.roughness,fiber:l=re.params.fiber,crumples:u=re.params.crumples,folds:g=re.params.folds,drops:m=re.params.drops,seed:d=re.params.seed,fiberScale:_,fiberSize:y=_===void 0?re.params.fiberSize:.2/_,crumplesScale:v,crumpleSize:h=v===void 0?re.params.crumpleSize:.2/v,blur:c,fade:f=c===void 0?re.params.fade:c,foldsNumber:p,foldCount:x=p===void 0?re.params.foldCount:p,fit:S=re.params.fit,scale:w=re.params.scale,rotation:C=re.params.rotation,originX:P=re.params.originX,originY:I=re.params.originY,offsetX:E=re.params.offsetX,offsetY:D=re.params.offsetY,worldWidth:b=re.params.worldWidth,worldHeight:ue=re.params.worldHeight,...ae}){let ce=typeof window<"u"&&{u_noiseTexture:we()},Ue={u_image:n,u_colorFront:A(r),u_colorBack:A(a),u_contrast:i,u_roughness:s,u_fiber:l,u_fiberSize:y,u_crumples:u,u_crumpleSize:h,u_foldCount:x,u_folds:g,u_fade:f,u_drops:m,u_seed:d,...ce,u_fit:R[S],u_scale:w,u_rotation:C,u_offsetX:E,u_offsetY:D,u_originX:P,u_originY:I,u_worldWidth:b,u_worldHeight:ue};return(0,Xd.jsx)(U,{...ae,speed:t,frame:o,fragmentShader:lu,mipmaps:["u_image"],uniforms:Ue})},O);var Jd=z(L(),1);var Zd=z(j(),1),H={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:.25,size:.5,angle:0,distortionShape:"prism",highlights:.1,shape:"lines",distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}},M1={name:"Waves",params:{...k,fit:"cover",scale:1.2,speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:0,size:.9,angle:0,distortionShape:"contour",highlights:0,shape:"wave",distortion:.5,shift:0,blur:.1,edges:.5,stretch:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:.05}},I1={name:"Abstract",params:{...k,fit:"cover",scale:4,speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:0,size:.7,angle:30,distortionShape:"flat",highlights:0,shape:"linesIrregular",distortion:1,shift:0,blur:1,edges:.5,stretch:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:.1,grainOverlay:.1}},V1={name:"Folds",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:.4,size:.4,angle:0,distortionShape:"cascade",highlights:0,shape:"lines",distortion:.75,shift:0,blur:.25,edges:.5,stretch:0,margin:.1,marginLeft:.1,marginRight:.1,marginTop:.1,marginBottom:.1,grainMixer:0,grainOverlay:0}},$d=[H,I1,M1,V1],e0=(0,Jd.memo)(function({speed:t=H.params.speed,frame:o=H.params.frame,colorBack:r=H.params.colorBack,colorShadow:a=H.params.colorShadow,colorHighlight:n=H.params.colorHighlight,image:i="",shadows:s=H.params.shadows,angle:l=H.params.angle,distortion:u=H.params.distortion,distortionShape:g=H.params.distortionShape,highlights:m=H.params.highlights,shape:d=H.params.shape,shift:_=H.params.shift,blur:y=H.params.blur,edges:v=H.params.edges,margin:h,marginLeft:c=h??H.params.marginLeft,marginRight:f=h??H.params.marginRight,marginTop:p=h??H.params.marginTop,marginBottom:x=h??H.params.marginBottom,grainMixer:S=H.params.grainMixer,grainOverlay:w=H.params.grainOverlay,stretch:C=H.params.stretch,count:P,size:I=P===void 0?H.params.size:Math.pow(1/(P*1.6),1/6)/.7-.5,fit:E=H.params.fit,scale:D=H.params.scale,rotation:b=H.params.rotation,originX:ue=H.params.originX,originY:ae=H.params.originY,offsetX:ce=H.params.offsetX,offsetY:Ue=H.params.offsetY,worldWidth:Ct=H.params.worldWidth,worldHeight:ao=H.params.worldHeight,...We}){let Ye={u_image:i,u_colorBack:A(r),u_colorShadow:A(a),u_colorHighlight:A(n),u_shadows:s,u_size:I,u_angle:l,u_distortion:u,u_shift:_,u_blur:y,u_edges:v,u_stretch:C,u_distortionShape:pu[g],u_highlights:m,u_shape:fu[d],u_marginLeft:c,u_marginRight:f,u_marginTop:p,u_marginBottom:x,u_grainMixer:S,u_grainOverlay:w,u_fit:R[E],u_scale:D,u_rotation:b,u_offsetX:ce,u_offsetY:Ue,u_originX:ue,u_originY:ae,u_worldWidth:Ct,u_worldHeight:ao};return(0,Zd.jsx)(U,{...We,speed:t,frame:o,fragmentShader:cu,mipmaps:["u_image"],uniforms:Ye})});var t0=z(L(),1);var o0=z(j(),1),Fe={name:"Default",params:{...k,scale:.8,speed:1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:.07,layering:.5,edges:.8,waves:.3,caustic:.1,size:1}},O1={name:"Abstract",params:{...k,fit:"cover",scale:3,speed:1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:0,layering:0,edges:1,waves:1,caustic:.4,size:.15}},D1={name:"Streaming",params:{...k,fit:"contain",scale:.4,speed:2,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:0,layering:0,edges:0,waves:.5,caustic:0,size:.5}},N1={name:"Slow-mo",params:{...k,fit:"cover",scale:1,speed:.1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:.4,layering:0,edges:0,waves:0,caustic:.2,size:.7}},r0=[Fe,N1,O1,D1],a0=(0,t0.memo)(function({speed:t=Fe.params.speed,frame:o=Fe.params.frame,colorBack:r=Fe.params.colorBack,colorHighlight:a=Fe.params.colorHighlight,image:n="",highlights:i=Fe.params.highlights,layering:s=Fe.params.layering,waves:l=Fe.params.waves,edges:u=Fe.params.edges,caustic:g=Fe.params.caustic,effectScale:m,size:d=m===void 0?Fe.params.size:10/9/m-1/9,fit:_=Fe.params.fit,scale:y=Fe.params.scale,rotation:v=Fe.params.rotation,originX:h=Fe.params.originX,originY:c=Fe.params.originY,offsetX:f=Fe.params.offsetX,offsetY:p=Fe.params.offsetY,worldWidth:x=Fe.params.worldWidth,worldHeight:S=Fe.params.worldHeight,...w}){let C={u_image:n,u_colorBack:A(r),u_colorHighlight:A(a),u_highlights:i,u_layering:s,u_waves:l,u_edges:u,u_caustic:g,u_size:d,u_fit:R[_],u_rotation:v,u_scale:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,o0.jsx)(U,{...w,speed:t,frame:o,fragmentShader:uu,mipmaps:["u_image"],uniforms:C})},O);var n0=z(L(),1);var i0=z(j(),1),ze={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#94ffaf",colorBack:"#000c38",colorHighlight:"#eaff94",type:"8x8",size:2,colorSteps:2,originalColors:!1,inverted:!1}},T1={name:"Retro",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#eeeeee",colorBack:"#5452ff",colorHighlight:"#eeeeee",type:"2x2",size:3,colorSteps:1,originalColors:!0,inverted:!1}},b1={name:"Noise",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#a2997c",colorBack:"#000000",colorHighlight:"#ededed",type:"random",size:1,colorSteps:1,originalColors:!1,inverted:!1}},G1={name:"Natural",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#ffffff",colorBack:"#000000",colorHighlight:"#ffffff",type:"8x8",size:2,colorSteps:5,originalColors:!0,inverted:!1}},s0=[ze,b1,T1,G1],l0=(0,n0.memo)(function({speed:t=ze.params.speed,frame:o=ze.params.frame,colorFront:r=ze.params.colorFront,colorBack:a=ze.params.colorBack,colorHighlight:n=ze.params.colorHighlight,image:i="",type:s=ze.params.type,colorSteps:l=ze.params.colorSteps,originalColors:u=ze.params.originalColors,inverted:g=ze.params.inverted,pxSize:m,size:d=m===void 0?ze.params.size:m,fit:_=ze.params.fit,scale:y=ze.params.scale,rotation:v=ze.params.rotation,originX:h=ze.params.originX,originY:c=ze.params.originY,offsetX:f=ze.params.offsetX,offsetY:p=ze.params.offsetY,worldWidth:x=ze.params.worldWidth,worldHeight:S=ze.params.worldHeight,...w}){let C={u_image:i,u_colorFront:A(r),u_colorBack:A(a),u_colorHighlight:A(n),u_type:Ia[s],u_pxSize:d,u_colorSteps:l,u_originalColors:u,u_inverted:g,u_fit:R[_],u_rotation:v,u_scale:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,i0.jsx)(U,{...w,speed:t,frame:o,fragmentShader:mu,uniforms:C})},O);var Eo=z(L(),1);var ro="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";var L1=e=>typeof e=="object"&&typeof e.then=="function",u0=[];function W1(e,t){if(e===t)return!0;if(!e||!t)return!1;let o=e.length;if(t.length!==o)return!1;for(let r=0;r<o;r++)if(e[r]!==t[r])return!1;return!0}function Y1(e,t=null){t===null&&(t=[e]);for(let r of u0)if(W1(t,r.keys)){if(Object.prototype.hasOwnProperty.call(r,"error"))throw r.error;if(Object.prototype.hasOwnProperty.call(r,"response"))return r.response;throw r.promise}let o={keys:t,promise:(L1(e)?e:e(...t)).then(r=>{o.response=r}).catch(r=>o.error=r)};throw u0.push(o),o.promise}var Ur=(e,t)=>Y1(e,t);var c0=z(j(),1),Oe={name:"Default",params:{...k,scale:.75,speed:1,frame:0,contour:.5,angle:0,noise:0,innerGlow:.5,outerGlow:.5,colorBack:"#000000",colors:["#11206a","#1f3ba2","#2f63e7","#6bd7ff","#ffe679","#ff991e","#ff4c00"]}},Q1={name:"Sepia",params:{...k,scale:.75,speed:.5,frame:0,contour:.5,angle:0,noise:.75,innerGlow:.5,outerGlow:.5,colorBack:"#000000",colors:["#997F45","#ffffff"]}},f0=[Oe,Q1],p0=(0,Eo.memo)(function({speed:t=Oe.params.speed,frame:o=Oe.params.frame,image:r="",contour:a=Oe.params.contour,angle:n=Oe.params.angle,noise:i=Oe.params.noise,innerGlow:s=Oe.params.innerGlow,outerGlow:l=Oe.params.outerGlow,colorBack:u=Oe.params.colorBack,colors:g=Oe.params.colors,suspendWhenProcessingImage:m=!1,fit:d=Oe.params.fit,offsetX:_=Oe.params.offsetX,offsetY:y=Oe.params.offsetY,originX:v=Oe.params.originX,originY:h=Oe.params.originY,rotation:c=Oe.params.rotation,scale:f=Oe.params.scale,worldHeight:p=Oe.params.worldHeight,worldWidth:x=Oe.params.worldWidth,...S}){let w=typeof r=="string"?r:r.src,[C,P]=(0,Eo.useState)(ro),I;m&&typeof window<"u"?I=Ur(()=>ci(w).then(D=>URL.createObjectURL(D.blob)),[w,"heatmap"]):I=C,(0,Eo.useLayoutEffect)(()=>{if(m)return;if(!w){P(ro);return}let D,b=!0;return ci(w).then(ue=>{b&&(D=URL.createObjectURL(ue.blob),P(D))}),()=>{b=!1}},[w,m]);let E=(0,Eo.useMemo)(()=>({u_image:I,u_contour:a,u_angle:n,u_noise:i,u_innerGlow:s,u_outerGlow:l,u_colorBack:A(u),u_colors:g.map(A),u_colorsCount:g.length,u_fit:R[d],u_offsetX:_,u_offsetY:y,u_originX:v,u_originY:h,u_rotation:c,u_scale:f,u_worldHeight:p,u_worldWidth:x}),[t,o,a,n,i,s,l,g,u,I,d,_,y,v,h,c,f,p,x]);return(0,c0.jsx)(U,{...S,speed:t,frame:o,fragmentShader:gu,mipmaps:["u_image"],uniforms:E})},O);var Rr=z(L(),1);var m0=z(j(),1),ye={name:"Default",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#AAAAAC",colorTint:"#ffffff",distortion:.07,repetition:2,shiftRed:.3,shiftBlue:.3,contour:.4,softness:.1,angle:70,shape:"diamond"}},H1={name:"Noir",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorTint:"#606060",softness:.45,repetition:1.5,shiftRed:0,shiftBlue:0,distortion:0,contour:0,angle:90,shape:"diamond"}},j1={name:"Backdrop",params:{...k,speed:1,frame:0,scale:1,colorBack:"#AAAAAC",colorTint:"#ffffff",softness:.05,repetition:1.5,shiftRed:.3,shiftBlue:.3,distortion:.1,contour:.4,shape:"none",angle:90,worldWidth:0,worldHeight:0}},X1={name:"Stripes",params:{...k,speed:1,frame:0,scale:.6,colorBack:"#000000",colorTint:"#2c5d72",softness:.8,repetition:6,shiftRed:1,shiftBlue:-1,distortion:.4,contour:.4,shape:"circle",angle:0}},d0=[ye,H1,j1,X1],g0=(0,Rr.memo)(function({colorBack:t=ye.params.colorBack,colorTint:o=ye.params.colorTint,speed:r=ye.params.speed,frame:a=ye.params.frame,image:n="",contour:i=ye.params.contour,distortion:s=ye.params.distortion,softness:l=ye.params.softness,repetition:u=ye.params.repetition,shiftRed:g=ye.params.shiftRed,shiftBlue:m=ye.params.shiftBlue,angle:d=ye.params.angle,shape:_=ye.params.shape,suspendWhenProcessingImage:y=!1,fit:v=ye.params.fit,scale:h=ye.params.scale,rotation:c=ye.params.rotation,originX:f=ye.params.originX,originY:p=ye.params.originY,offsetX:x=ye.params.offsetX,offsetY:S=ye.params.offsetY,worldWidth:w=ye.params.worldWidth,worldHeight:C=ye.params.worldHeight,...P}){let I=typeof n=="string"?n:n.src,[E,D]=(0,Rr.useState)(ro),b;y&&typeof window<"u"&&I?b=Ur(()=>fi(I).then(ae=>URL.createObjectURL(ae.pngBlob)),[I,"liquid-metal"]):b=E,(0,Rr.useLayoutEffect)(()=>{if(y)return;if(!I){D(ro);return}let ae,ce=!0;return fi(I).then(Ue=>{ce&&(ae=URL.createObjectURL(Ue.pngBlob),D(ae))}),()=>{ce=!1}},[I,y]);let ue={u_colorBack:A(t),u_colorTint:A(o),u_image:b,u_contour:i,u_distortion:s,u_softness:l,u_repetition:u,u_shiftRed:g,u_shiftBlue:m,u_angle:d,u_isImage:!!n,u_shape:vu[_],u_fit:R[v],u_scale:h,u_rotation:c,u_offsetX:x,u_offsetY:S,u_originX:f,u_originY:p,u_worldWidth:w,u_worldHeight:C};return(0,m0.jsx)(U,{...P,speed:r,frame:a,fragmentShader:hu,mipmaps:["u_image"],uniforms:ue})});var h0=z(L(),1);var v0=z(j(),1),le={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#f2f1e8",colorFront:"#2b2b2b",size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:"hex",type:"gooey"}},K1={name:"LED screen",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#000000",colorFront:"#29ff7b",size:.5,radius:1.5,contrast:.3,originalColors:!1,inverted:!1,grainMixer:0,grainOverlay:0,grainSize:.5,grid:"square",type:"soft"}},q1={name:"Mosaic",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#000000",colorFront:"#b2aeae",size:.6,radius:2,contrast:.01,originalColors:!0,inverted:!1,grainMixer:0,grainOverlay:0,grainSize:.5,grid:"hex",type:"classic"}},J1={name:"Round and square",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#141414",colorFront:"#ff8000",size:.8,radius:1,contrast:1,originalColors:!1,inverted:!0,grainMixer:.05,grainOverlay:.3,grainSize:.5,grid:"square",type:"holes"}},x0=[le,K1,q1,J1],_0=(0,h0.memo)(function({speed:t=le.params.speed,frame:o=le.params.frame,colorFront:r=le.params.colorFront,colorBack:a=le.params.colorBack,image:n="",size:i=le.params.size,radius:s=le.params.radius,contrast:l=le.params.contrast,originalColors:u=le.params.originalColors,inverted:g=le.params.inverted,grainMixer:m=le.params.grainMixer,grainOverlay:d=le.params.grainOverlay,grainSize:_=le.params.grainSize,grid:y=le.params.grid,type:v=le.params.type,fit:h=le.params.fit,scale:c=le.params.scale,rotation:f=le.params.rotation,originX:p=le.params.originX,originY:x=le.params.originY,offsetX:S=le.params.offsetX,offsetY:w=le.params.offsetY,worldWidth:C=le.params.worldWidth,worldHeight:P=le.params.worldHeight,...I}){let E={u_image:n,u_colorFront:A(r),u_colorBack:A(a),u_size:i,u_radius:s,u_contrast:l,u_originalColors:u,u_inverted:g,u_grainMixer:m,u_grainOverlay:d,u_grainSize:_,u_grid:yu[y],u_type:_u[v],u_fit:R[h],u_rotation:f,u_scale:c,u_offsetX:S,u_offsetY:w,u_originX:p,u_originY:x,u_worldWidth:C,u_worldHeight:P};return(0,v0.jsx)(U,{...I,speed:t,frame:o,fragmentShader:xu,uniforms:E})},O);var y0=z(L(),1);var S0=z(j(),1),Q={name:"Default",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#fbfaf5",colorC:"#00b4ff",colorM:"#fc519f",colorY:"#ffd800",colorK:"#231f20",size:.2,contrast:1,softness:1,grainSize:.5,grainMixer:0,grainOverlay:0,gridNoise:.2,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:.3,gainM:0,gainY:.2,gainK:0,type:"ink"}},Z1={name:"Drops",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#eeefd7",colorC:"#00b2ff",colorM:"#fc4f4f",colorY:"#ffd900",colorK:"#231f20",size:.88,contrast:1.15,softness:0,grainSize:.01,grainMixer:.05,grainOverlay:.25,gridNoise:.5,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:1,gainM:.44,gainY:-1,gainK:0,type:"ink"}},$1={name:"Newspaper",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#f2f1e8",colorC:"#7a7a75",colorM:"#7a7a75",colorY:"#7a7a75",colorK:"#231f20",size:.01,contrast:2,softness:.2,grainSize:0,grainMixer:0,grainOverlay:.2,gridNoise:.6,floodC:0,floodM:0,floodY:0,floodK:.1,gainC:-.17,gainM:-.45,gainY:-.45,gainK:0,type:"dots"}},ex={name:"Vintage",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#fffaf0",colorC:"#59afc5",colorM:"#d8697c",colorY:"#fad85c",colorK:"#2d2824",size:.2,contrast:1.25,softness:.4,grainSize:.5,grainMixer:.15,grainOverlay:.1,gridNoise:.45,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:.3,gainM:0,gainY:.2,gainK:0,type:"sharp"}},w0=[Q,Z1,$1,ex],C0=(0,y0.memo)(function({speed:t=Q.params.speed,frame:o=Q.params.frame,colorBack:r=Q.params.colorBack,colorC:a=Q.params.colorC,colorM:n=Q.params.colorM,colorY:i=Q.params.colorY,colorK:s=Q.params.colorK,image:l="",size:u=Q.params.size,contrast:g=Q.params.contrast,softness:m=Q.params.softness,grainSize:d=Q.params.grainSize,grainMixer:_=Q.params.grainMixer,grainOverlay:y=Q.params.grainOverlay,gridNoise:v=Q.params.gridNoise,floodC:h=Q.params.floodC,floodM:c=Q.params.floodM,floodY:f=Q.params.floodY,floodK:p=Q.params.floodK,gainC:x=Q.params.gainC,gainM:S=Q.params.gainM,gainY:w=Q.params.gainY,gainK:C=Q.params.gainK,type:P=Q.params.type,fit:I=Q.params.fit,scale:E=Q.params.scale,rotation:D=Q.params.rotation,originX:b=Q.params.originX,originY:ue=Q.params.originY,offsetX:ae=Q.params.offsetX,offsetY:ce=Q.params.offsetY,worldWidth:Ue=Q.params.worldWidth,worldHeight:Ct=Q.params.worldHeight,...ao}){let We={u_image:l,u_noiseTexture:we(),u_colorBack:A(r),u_colorC:A(a),u_colorM:A(n),u_colorY:A(i),u_colorK:A(s),u_size:u,u_contrast:g,u_softness:m,u_grainSize:d,u_grainMixer:_,u_grainOverlay:y,u_gridNoise:v,u_floodC:h,u_floodM:c,u_floodY:f,u_floodK:p,u_gainC:x,u_gainM:S,u_gainY:w,u_gainK:C,u_type:wu[P],u_fit:R[I],u_rotation:D,u_scale:E,u_offsetX:ae,u_offsetY:ce,u_originX:b,u_originY:ue,u_worldWidth:Ue,u_worldHeight:Ct};return(0,S0.jsx)(U,{...ao,speed:t,frame:o,fragmentShader:Su,uniforms:We})},O);var Mr=z(L(),1);var k0=z(j(),1),he={name:"Default",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#f0efea",colorInner:"#fafaf5",colors:["#333333","#e7e6df"],outerGlow:.55,innerGlow:1,innerDistortion:.8,outerDistortion:.6,offset:0,angle:0,size:.8,shape:"diamond"}},tx={name:"Fluorescent",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorInner:"#000000",colors:["#2fb64c","#cdff61","#ffffff"],outerGlow:0,innerGlow:1,innerDistortion:1,outerDistortion:.8,offset:0,angle:0,size:.8,shape:"diamond"}},ox={name:"Fire",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorInner:"#000000",colors:["#fe5b16","#f7ff61","#ffffff"],outerGlow:1,innerGlow:.65,innerDistortion:.6,outerDistortion:.8,offset:0,angle:0,size:.8,shape:"diamond"}},rx={name:"Infrared",params:{...k,scale:.6,speed:.5,frame:0,colorBack:"#cd28dc",colorInner:"#00000000",colors:["#ff9900","#fff67a","#dcff52","#00ffbb","#0077ff"],outerGlow:1,innerGlow:1,innerDistortion:1,outerDistortion:1,offset:.2,angle:0,size:1,shape:"diamond"}},A0=[he,ox,tx,rx],B0=(0,Mr.memo)(function({colorBack:t=he.params.colorBack,colors:o=he.params.colors,speed:r=he.params.speed,frame:a=he.params.frame,image:n="",innerDistortion:i=he.params.innerDistortion,outerDistortion:s=he.params.outerDistortion,outerGlow:l=he.params.outerGlow,innerGlow:u=he.params.innerGlow,colorInner:g=he.params.colorInner,offset:m=he.params.offset,angle:d=he.params.angle,size:_=he.params.size,shape:y=he.params.shape,suspendWhenProcessingImage:v=!1,fit:h=he.params.fit,scale:c=he.params.scale,rotation:f=he.params.rotation,originX:p=he.params.originX,originY:x=he.params.originY,offsetX:S=he.params.offsetX,offsetY:w=he.params.offsetY,worldWidth:C=he.params.worldWidth,worldHeight:P=he.params.worldHeight,...I}){let E=typeof n=="string"?n:n.src,[D,b]=(0,Mr.useState)(ro),ue;v&&typeof window<"u"&&E?ue=Ur(()=>pi(E).then(ce=>URL.createObjectURL(ce.pngBlob)),[E,"gemSmoke"]):ue=D,(0,Mr.useLayoutEffect)(()=>{if(v)return;if(!E){b(ro);return}let ce,Ue=!0;return pi(E).then(Ct=>{Ue&&(ce=URL.createObjectURL(Ct.pngBlob),b(ce))}),()=>{Ue=!1}},[E,v]);let ae={u_colors:o.map(A),u_colorsCount:o.length,u_colorBack:A(t),u_image:ue,u_innerDistortion:i,u_outerDistortion:s,u_outerGlow:l,u_innerGlow:u,u_colorInner:A(g),u_offset:m,u_angle:d,u_size:_,u_isImage:!!n,u_shape:Au[y],u_fit:R[h],u_scale:c,u_rotation:f,u_offsetX:S,u_offsetY:w,u_originX:p,u_originY:x,u_worldWidth:C,u_worldHeight:P};return(0,k0.jsx)(U,{...I,speed:r,frame:a,fragmentShader:ku,mipmaps:["u_image"],uniforms:ae})},O);var export_React=ax.default;var export_createRoot=nx.createRoot;export{P0 as Paper,export_React as React,export_createRoot as createRoot};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

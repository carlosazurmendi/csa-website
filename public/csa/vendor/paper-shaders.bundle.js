var z0=Object.create;var La=Object.defineProperty;var U0=Object.getOwnPropertyDescriptor;var R0=Object.getOwnPropertyNames;var M0=Object.getPrototypeOf,I0=Object.prototype.hasOwnProperty;var V0=(e,t,o)=>t in e?La(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var jt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),O0=(e,t)=>{for(var o in t)La(e,o,{get:t[o],enumerable:!0})},D0=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of R0(t))!I0.call(e,a)&&a!==o&&La(e,a,{get:()=>t[a],enumerable:!(r=U0(t,a))||r.enumerable});return e};var z=(e,t,o)=>(o=e!=null?z0(M0(e)):{},D0(t||!e||!e.__esModule?La(o,"default",{value:e,enumerable:!0}):o,e));var O=(e,t,o)=>V0(e,typeof t!="symbol"?t+"":t,o);var Gu=jt(L=>{"use strict";var Vr=Symbol.for("react.element"),N0=Symbol.for("react.portal"),T0=Symbol.for("react.fragment"),b0=Symbol.for("react.strict_mode"),G0=Symbol.for("react.profiler"),L0=Symbol.for("react.provider"),W0=Symbol.for("react.context"),Y0=Symbol.for("react.forward_ref"),Q0=Symbol.for("react.suspense"),H0=Symbol.for("react.memo"),j0=Symbol.for("react.lazy"),zu=Symbol.iterator;function X0(e){return e===null||typeof e!="object"?null:(e=zu&&e[zu]||e["@@iterator"],typeof e=="function"?e:null)}var Mu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Iu=Object.assign,Vu={};function qo(e,t,o){this.props=e,this.context=t,this.refs=Vu,this.updater=o||Mu}qo.prototype.isReactComponent={};qo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};qo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ou(){}Ou.prototype=qo.prototype;function _i(e,t,o){this.props=e,this.context=t,this.refs=Vu,this.updater=o||Mu}var yi=_i.prototype=new Ou;yi.constructor=_i;Iu(yi,qo.prototype);yi.isPureReactComponent=!0;var Uu=Array.isArray,Du=Object.prototype.hasOwnProperty,Si={current:null},Nu={key:!0,ref:!0,__self:!0,__source:!0};function Tu(e,t,o){var r,a={},n=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(n=""+t.key),t)Du.call(t,r)&&!Nu.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(s===1)a.children=o;else if(1<s){for(var l=Array(s),u=0;u<s;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:Vr,type:e,key:n,ref:i,props:a,_owner:Si.current}}function K0(e,t){return{$$typeof:Vr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function wi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Vr}function q0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var Ru=/\/+/g;function xi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?q0(""+e.key):t.toString(36)}function Ya(e,t,o,r,a){var n=typeof e;(n==="undefined"||n==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(n){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Vr:case N0:i=!0}}if(i)return i=e,a=a(i),e=r===""?"."+xi(i,0):r,Uu(a)?(o="",e!=null&&(o=e.replace(Ru,"$&/")+"/"),Ya(a,t,o,"",function(u){return u})):a!=null&&(wi(a)&&(a=K0(a,o+(!a.key||i&&i.key===a.key?"":(""+a.key).replace(Ru,"$&/")+"/")+e)),t.push(a)),1;if(i=0,r=r===""?".":r+":",Uu(e))for(var s=0;s<e.length;s++){n=e[s];var l=r+xi(n,s);i+=Ya(n,t,o,l,a)}else if(l=X0(e),typeof l=="function")for(e=l.call(e),s=0;!(n=e.next()).done;)n=n.value,l=r+xi(n,s++),i+=Ya(n,t,o,l,a);else if(n==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Wa(e,t,o){if(e==null)return e;var r=[],a=0;return Ya(e,r,"","",function(n){return t.call(o,n,a++)}),r}function J0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(o){(e._status===0||e._status===-1)&&(e._status=1,e._result=o)},function(o){(e._status===0||e._status===-1)&&(e._status=2,e._result=o)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var st={current:null},Qa={transition:null},Z0={ReactCurrentDispatcher:st,ReactCurrentBatchConfig:Qa,ReactCurrentOwner:Si};function bu(){throw Error("act(...) is not supported in production builds of React.")}L.Children={map:Wa,forEach:function(e,t,o){Wa(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return Wa(e,function(){t++}),t},toArray:function(e){return Wa(e,function(t){return t})||[]},only:function(e){if(!wi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};L.Component=qo;L.Fragment=T0;L.Profiler=G0;L.PureComponent=_i;L.StrictMode=b0;L.Suspense=Q0;L.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z0;L.act=bu;L.cloneElement=function(e,t,o){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Iu({},e.props),a=e.key,n=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(n=t.ref,i=Si.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)Du.call(t,l)&&!Nu.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=o;else if(1<l){s=Array(l);for(var u=0;u<l;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:Vr,type:e.type,key:a,ref:n,props:r,_owner:i}};L.createContext=function(e){return e={$$typeof:W0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:L0,_context:e},e.Consumer=e};L.createElement=Tu;L.createFactory=function(e){var t=Tu.bind(null,e);return t.type=e,t};L.createRef=function(){return{current:null}};L.forwardRef=function(e){return{$$typeof:Y0,render:e}};L.isValidElement=wi;L.lazy=function(e){return{$$typeof:j0,_payload:{_status:-1,_result:e},_init:J0}};L.memo=function(e,t){return{$$typeof:H0,type:e,compare:t===void 0?null:t}};L.startTransition=function(e){var t=Qa.transition;Qa.transition={};try{e()}finally{Qa.transition=t}};L.unstable_act=bu;L.useCallback=function(e,t){return st.current.useCallback(e,t)};L.useContext=function(e){return st.current.useContext(e)};L.useDebugValue=function(){};L.useDeferredValue=function(e){return st.current.useDeferredValue(e)};L.useEffect=function(e,t){return st.current.useEffect(e,t)};L.useId=function(){return st.current.useId()};L.useImperativeHandle=function(e,t,o){return st.current.useImperativeHandle(e,t,o)};L.useInsertionEffect=function(e,t){return st.current.useInsertionEffect(e,t)};L.useLayoutEffect=function(e,t){return st.current.useLayoutEffect(e,t)};L.useMemo=function(e,t){return st.current.useMemo(e,t)};L.useReducer=function(e,t,o){return st.current.useReducer(e,t,o)};L.useRef=function(e){return st.current.useRef(e)};L.useState=function(e){return st.current.useState(e)};L.useSyncExternalStore=function(e,t,o){return st.current.useSyncExternalStore(e,t,o)};L.useTransition=function(){return st.current.useTransition()};L.version="18.3.1"});var W=jt((cx,Lu)=>{"use strict";Lu.exports=Gu()});var Zu=jt(ee=>{"use strict";function Bi(e,t){var o=e.length;e.push(t);e:for(;0<o;){var r=o-1>>>1,a=e[r];if(0<Ha(a,t))e[r]=t,e[o]=a,o=r;else break e}}function Mt(e){return e.length===0?null:e[0]}function Xa(e){if(e.length===0)return null;var t=e[0],o=e.pop();if(o!==t){e[0]=o;e:for(var r=0,a=e.length,n=a>>>1;r<n;){var i=2*(r+1)-1,s=e[i],l=i+1,u=e[l];if(0>Ha(s,o))l<a&&0>Ha(u,s)?(e[r]=u,e[l]=o,r=l):(e[r]=s,e[i]=o,r=i);else if(l<a&&0>Ha(u,o))e[r]=u,e[l]=o,r=l;else break e}}return t}function Ha(e,t){var o=e.sortIndex-t.sortIndex;return o!==0?o:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Wu=performance,ee.unstable_now=function(){return Wu.now()}):(Ci=Date,Yu=Ci.now(),ee.unstable_now=function(){return Ci.now()-Yu});var Wu,Ci,Yu,Gt=[],io=[],$0=1,At=null,Ze=3,Ka=!1,Uo=!1,Dr=!1,ju=typeof setTimeout=="function"?setTimeout:null,Xu=typeof clearTimeout=="function"?clearTimeout:null,Qu=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Pi(e){for(var t=Mt(io);t!==null;){if(t.callback===null)Xa(io);else if(t.startTime<=e)Xa(io),t.sortIndex=t.expirationTime,Bi(Gt,t);else break;t=Mt(io)}}function Ei(e){if(Dr=!1,Pi(e),!Uo)if(Mt(Gt)!==null)Uo=!0,zi(Fi);else{var t=Mt(io);t!==null&&Ui(Ei,t.startTime-e)}}function Fi(e,t){Uo=!1,Dr&&(Dr=!1,Xu(Nr),Nr=-1),Ka=!0;var o=Ze;try{for(Pi(t),At=Mt(Gt);At!==null&&(!(At.expirationTime>t)||e&&!Ju());){var r=At.callback;if(typeof r=="function"){At.callback=null,Ze=At.priorityLevel;var a=r(At.expirationTime<=t);t=ee.unstable_now(),typeof a=="function"?At.callback=a:At===Mt(Gt)&&Xa(Gt),Pi(t)}else Xa(Gt);At=Mt(Gt)}if(At!==null)var n=!0;else{var i=Mt(io);i!==null&&Ui(Ei,i.startTime-t),n=!1}return n}finally{At=null,Ze=o,Ka=!1}}var qa=!1,ja=null,Nr=-1,Ku=5,qu=-1;function Ju(){return!(ee.unstable_now()-qu<Ku)}function ki(){if(ja!==null){var e=ee.unstable_now();qu=e;var t=!0;try{t=ja(!0,e)}finally{t?Or():(qa=!1,ja=null)}}else qa=!1}var Or;typeof Qu=="function"?Or=function(){Qu(ki)}:typeof MessageChannel<"u"?(Ai=new MessageChannel,Hu=Ai.port2,Ai.port1.onmessage=ki,Or=function(){Hu.postMessage(null)}):Or=function(){ju(ki,0)};var Ai,Hu;function zi(e){ja=e,qa||(qa=!0,Or())}function Ui(e,t){Nr=ju(function(){e(ee.unstable_now())},t)}ee.unstable_IdlePriority=5;ee.unstable_ImmediatePriority=1;ee.unstable_LowPriority=4;ee.unstable_NormalPriority=3;ee.unstable_Profiling=null;ee.unstable_UserBlockingPriority=2;ee.unstable_cancelCallback=function(e){e.callback=null};ee.unstable_continueExecution=function(){Uo||Ka||(Uo=!0,zi(Fi))};ee.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ku=0<e?Math.floor(1e3/e):5};ee.unstable_getCurrentPriorityLevel=function(){return Ze};ee.unstable_getFirstCallbackNode=function(){return Mt(Gt)};ee.unstable_next=function(e){switch(Ze){case 1:case 2:case 3:var t=3;break;default:t=Ze}var o=Ze;Ze=t;try{return e()}finally{Ze=o}};ee.unstable_pauseExecution=function(){};ee.unstable_requestPaint=function(){};ee.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var o=Ze;Ze=e;try{return t()}finally{Ze=o}};ee.unstable_scheduleCallback=function(e,t,o){var r=ee.unstable_now();switch(typeof o=="object"&&o!==null?(o=o.delay,o=typeof o=="number"&&0<o?r+o:r):o=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=o+a,e={id:$0++,callback:t,priorityLevel:e,startTime:o,expirationTime:a,sortIndex:-1},o>r?(e.sortIndex=o,Bi(io,e),Mt(Gt)===null&&e===Mt(io)&&(Dr?(Xu(Nr),Nr=-1):Dr=!0,Ui(Ei,o-r))):(e.sortIndex=a,Bi(Gt,e),Uo||Ka||(Uo=!0,zi(Fi))),e};ee.unstable_shouldYield=Ju;ee.unstable_wrapCallback=function(e){var t=Ze;return function(){var o=Ze;Ze=t;try{return e.apply(this,arguments)}finally{Ze=o}}}});var ec=jt((px,$u)=>{"use strict";$u.exports=Zu()});var nm=jt(Ct=>{"use strict";var eg=W(),St=ec();function B(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,o=1;o<arguments.length;o++)t+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var lf=new Set,ia={};function Yo(e,t){vr(e,t),vr(e+"Capture",t)}function vr(e,t){for(ia[e]=t,e=0;e<t.length;e++)lf.add(t[e])}var $t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),es=Object.prototype.hasOwnProperty,tg=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,tc={},oc={};function og(e){return es.call(oc,e)?!0:es.call(tc,e)?!1:tg.test(e)?oc[e]=!0:(tc[e]=!0,!1)}function rg(e,t,o,r){if(o!==null&&o.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:o!==null?!o.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ag(e,t,o,r){if(t===null||typeof t>"u"||rg(e,t,o,r))return!0;if(r)return!1;if(o!==null)switch(o.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ct(e,t,o,r,a,n,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=o,this.propertyName=e,this.type=t,this.sanitizeURL=n,this.removeEmptyString=i}var Xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Xe[e]=new ct(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Xe[t]=new ct(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Xe[e]=new ct(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Xe[e]=new ct(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Xe[e]=new ct(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Xe[e]=new ct(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Xe[e]=new ct(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Xe[e]=new ct(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Xe[e]=new ct(e,5,!1,e.toLowerCase(),null,!1,!1)});var Hs=/[\-:]([a-z])/g;function js(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Hs,js);Xe[t]=new ct(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Hs,js);Xe[t]=new ct(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hs,js);Xe[t]=new ct(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Xe[e]=new ct(e,1,!1,e.toLowerCase(),null,!1,!1)});Xe.xlinkHref=new ct("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Xe[e]=new ct(e,1,!1,e.toLowerCase(),null,!0,!0)});function Xs(e,t,o,r){var a=Xe.hasOwnProperty(t)?Xe[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ag(t,o,a,r)&&(o=null),r||a===null?og(t)&&(o===null?e.removeAttribute(t):e.setAttribute(t,""+o)):a.mustUseProperty?e[a.propertyName]=o===null?a.type===3?!1:"":o:(t=a.attributeName,r=a.attributeNamespace,o===null?e.removeAttribute(t):(a=a.type,o=a===3||a===4&&o===!0?"":""+o,r?e.setAttributeNS(r,t,o):e.setAttribute(t,o))))}var ro=eg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ja=Symbol.for("react.element"),$o=Symbol.for("react.portal"),er=Symbol.for("react.fragment"),Ks=Symbol.for("react.strict_mode"),ts=Symbol.for("react.profiler"),uf=Symbol.for("react.provider"),cf=Symbol.for("react.context"),qs=Symbol.for("react.forward_ref"),os=Symbol.for("react.suspense"),rs=Symbol.for("react.suspense_list"),Js=Symbol.for("react.memo"),lo=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var ff=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var rc=Symbol.iterator;function Tr(e){return e===null||typeof e!="object"?null:(e=rc&&e[rc]||e["@@iterator"],typeof e=="function"?e:null)}var ge=Object.assign,Ri;function jr(e){if(Ri===void 0)try{throw Error()}catch(o){var t=o.stack.trim().match(/\n( *(at )?)/);Ri=t&&t[1]||""}return`
`+Ri+e}var Mi=!1;function Ii(e,t){if(!e||Mi)return"";Mi=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),n=r.stack.split(`
`),i=a.length-1,s=n.length-1;1<=i&&0<=s&&a[i]!==n[s];)s--;for(;1<=i&&0<=s;i--,s--)if(a[i]!==n[s]){if(i!==1||s!==1)do if(i--,s--,0>s||a[i]!==n[s]){var l=`
`+a[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=s);break}}}finally{Mi=!1,Error.prepareStackTrace=o}return(e=e?e.displayName||e.name:"")?jr(e):""}function ng(e){switch(e.tag){case 5:return jr(e.type);case 16:return jr("Lazy");case 13:return jr("Suspense");case 19:return jr("SuspenseList");case 0:case 2:case 15:return e=Ii(e.type,!1),e;case 11:return e=Ii(e.type.render,!1),e;case 1:return e=Ii(e.type,!0),e;default:return""}}function as(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case er:return"Fragment";case $o:return"Portal";case ts:return"Profiler";case Ks:return"StrictMode";case os:return"Suspense";case rs:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case cf:return(e.displayName||"Context")+".Consumer";case uf:return(e._context.displayName||"Context")+".Provider";case qs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Js:return t=e.displayName||null,t!==null?t:as(e.type)||"Memo";case lo:t=e._payload,e=e._init;try{return as(e(t))}catch{}}return null}function ig(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return as(t);case 8:return t===Ks?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Co(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function pf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function sg(e){var t=pf(e)?"checked":"value",o=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var a=o.get,n=o.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(i){r=""+i,n.call(this,i)}}),Object.defineProperty(e,t,{enumerable:o.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Za(e){e._valueTracker||(e._valueTracker=sg(e))}function mf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var o=t.getValue(),r="";return e&&(r=pf(e)?e.checked?"true":"false":e.value),e=r,e!==o?(t.setValue(e),!0):!1}function Pn(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ns(e,t){var o=t.checked;return ge({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??e._wrapperState.initialChecked})}function ac(e,t){var o=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;o=Co(t.value!=null?t.value:o),e._wrapperState={initialChecked:r,initialValue:o,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function df(e,t){t=t.checked,t!=null&&Xs(e,"checked",t,!1)}function is(e,t){df(e,t);var o=Co(t.value),r=t.type;if(o!=null)r==="number"?(o===0&&e.value===""||e.value!=o)&&(e.value=""+o):e.value!==""+o&&(e.value=""+o);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ss(e,t.type,o):t.hasOwnProperty("defaultValue")&&ss(e,t.type,Co(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function nc(e,t,o){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,o||t===e.value||(e.value=t),e.defaultValue=t}o=e.name,o!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,o!==""&&(e.name=o)}function ss(e,t,o){(t!=="number"||Pn(e.ownerDocument)!==e)&&(o==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+o&&(e.defaultValue=""+o))}var Xr=Array.isArray;function fr(e,t,o,r){if(e=e.options,t){t={};for(var a=0;a<o.length;a++)t["$"+o[a]]=!0;for(o=0;o<e.length;o++)a=t.hasOwnProperty("$"+e[o].value),e[o].selected!==a&&(e[o].selected=a),a&&r&&(e[o].defaultSelected=!0)}else{for(o=""+Co(o),t=null,a=0;a<e.length;a++){if(e[a].value===o){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function ls(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(B(91));return ge({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ic(e,t){var o=t.value;if(o==null){if(o=t.children,t=t.defaultValue,o!=null){if(t!=null)throw Error(B(92));if(Xr(o)){if(1<o.length)throw Error(B(93));o=o[0]}t=o}t==null&&(t=""),o=t}e._wrapperState={initialValue:Co(o)}}function gf(e,t){var o=Co(t.value),r=Co(t.defaultValue);o!=null&&(o=""+o,o!==e.value&&(e.value=o),t.defaultValue==null&&e.defaultValue!==o&&(e.defaultValue=o)),r!=null&&(e.defaultValue=""+r)}function sc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function hf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function us(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?hf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $a,vf=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,o,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,o,r,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($a=$a||document.createElement("div"),$a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function sa(e,t){if(t){var o=e.firstChild;if(o&&o===e.lastChild&&o.nodeType===3){o.nodeValue=t;return}}e.textContent=t}var Jr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lg=["Webkit","ms","Moz","O"];Object.keys(Jr).forEach(function(e){lg.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jr[t]=Jr[e]})});function xf(e,t,o){return t==null||typeof t=="boolean"||t===""?"":o||typeof t!="number"||t===0||Jr.hasOwnProperty(e)&&Jr[e]?(""+t).trim():t+"px"}function _f(e,t){e=e.style;for(var o in t)if(t.hasOwnProperty(o)){var r=o.indexOf("--")===0,a=xf(o,t[o],r);o==="float"&&(o="cssFloat"),r?e.setProperty(o,a):e[o]=a}}var ug=ge({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cs(e,t){if(t){if(ug[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(B(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(B(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(B(61))}if(t.style!=null&&typeof t.style!="object")throw Error(B(62))}}function fs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ps=null;function Zs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ms=null,pr=null,mr=null;function lc(e){if(e=Aa(e)){if(typeof ms!="function")throw Error(B(280));var t=e.stateNode;t&&(t=ti(t),ms(e.stateNode,e.type,t))}}function yf(e){pr?mr?mr.push(e):mr=[e]:pr=e}function Sf(){if(pr){var e=pr,t=mr;if(mr=pr=null,lc(e),t)for(e=0;e<t.length;e++)lc(t[e])}}function wf(e,t){return e(t)}function Cf(){}var Vi=!1;function kf(e,t,o){if(Vi)return e(t,o);Vi=!0;try{return wf(e,t,o)}finally{Vi=!1,(pr!==null||mr!==null)&&(Cf(),Sf())}}function la(e,t){var o=e.stateNode;if(o===null)return null;var r=ti(o);if(r===null)return null;o=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(o&&typeof o!="function")throw Error(B(231,t,typeof o));return o}var ds=!1;if($t)try{Jo={},Object.defineProperty(Jo,"passive",{get:function(){ds=!0}}),window.addEventListener("test",Jo,Jo),window.removeEventListener("test",Jo,Jo)}catch{ds=!1}var Jo;function cg(e,t,o,r,a,n,i,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(o,u)}catch(g){this.onError(g)}}var Zr=!1,En=null,Fn=!1,gs=null,fg={onError:function(e){Zr=!0,En=e}};function pg(e,t,o,r,a,n,i,s,l){Zr=!1,En=null,cg.apply(fg,arguments)}function mg(e,t,o,r,a,n,i,s,l){if(pg.apply(this,arguments),Zr){if(Zr){var u=En;Zr=!1,En=null}else throw Error(B(198));Fn||(Fn=!0,gs=u)}}function Qo(e){var t=e,o=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(o=t.return),e=t.return;while(e)}return t.tag===3?o:null}function Af(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uc(e){if(Qo(e)!==e)throw Error(B(188))}function dg(e){var t=e.alternate;if(!t){if(t=Qo(e),t===null)throw Error(B(188));return t!==e?null:e}for(var o=e,r=t;;){var a=o.return;if(a===null)break;var n=a.alternate;if(n===null){if(r=a.return,r!==null){o=r;continue}break}if(a.child===n.child){for(n=a.child;n;){if(n===o)return uc(a),e;if(n===r)return uc(a),t;n=n.sibling}throw Error(B(188))}if(o.return!==r.return)o=a,r=n;else{for(var i=!1,s=a.child;s;){if(s===o){i=!0,o=a,r=n;break}if(s===r){i=!0,r=a,o=n;break}s=s.sibling}if(!i){for(s=n.child;s;){if(s===o){i=!0,o=n,r=a;break}if(s===r){i=!0,r=n,o=a;break}s=s.sibling}if(!i)throw Error(B(189))}}if(o.alternate!==r)throw Error(B(190))}if(o.tag!==3)throw Error(B(188));return o.stateNode.current===o?e:t}function Bf(e){return e=dg(e),e!==null?Pf(e):null}function Pf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pf(e);if(t!==null)return t;e=e.sibling}return null}var Ef=St.unstable_scheduleCallback,cc=St.unstable_cancelCallback,gg=St.unstable_shouldYield,hg=St.unstable_requestPaint,we=St.unstable_now,vg=St.unstable_getCurrentPriorityLevel,$s=St.unstable_ImmediatePriority,Ff=St.unstable_UserBlockingPriority,zn=St.unstable_NormalPriority,xg=St.unstable_LowPriority,zf=St.unstable_IdlePriority,Jn=null,Qt=null;function _g(e){if(Qt&&typeof Qt.onCommitFiberRoot=="function")try{Qt.onCommitFiberRoot(Jn,e,void 0,(e.current.flags&128)===128)}catch{}}var Nt=Math.clz32?Math.clz32:wg,yg=Math.log,Sg=Math.LN2;function wg(e){return e>>>=0,e===0?32:31-(yg(e)/Sg|0)|0}var en=64,tn=4194304;function Kr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Un(e,t){var o=e.pendingLanes;if(o===0)return 0;var r=0,a=e.suspendedLanes,n=e.pingedLanes,i=o&268435455;if(i!==0){var s=i&~a;s!==0?r=Kr(s):(n&=i,n!==0&&(r=Kr(n)))}else i=o&~a,i!==0?r=Kr(i):n!==0&&(r=Kr(n));if(r===0)return 0;if(t!==0&&t!==r&&!(t&a)&&(a=r&-r,n=t&-t,a>=n||a===16&&(n&4194240)!==0))return t;if(r&4&&(r|=o&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)o=31-Nt(t),a=1<<o,r|=e[o],t&=~a;return r}function Cg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kg(e,t){for(var o=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,n=e.pendingLanes;0<n;){var i=31-Nt(n),s=1<<i,l=a[i];l===-1?(!(s&o)||s&r)&&(a[i]=Cg(s,t)):l<=t&&(e.expiredLanes|=s),n&=~s}}function hs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Uf(){var e=en;return en<<=1,!(en&4194240)&&(en=64),e}function Oi(e){for(var t=[],o=0;31>o;o++)t.push(e);return t}function Ca(e,t,o){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Nt(t),e[t]=o}function Ag(e,t){var o=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<o;){var a=31-Nt(o),n=1<<a;t[a]=0,r[a]=-1,e[a]=-1,o&=~n}}function el(e,t){var o=e.entangledLanes|=t;for(e=e.entanglements;o;){var r=31-Nt(o),a=1<<r;a&t|e[r]&t&&(e[r]|=t),o&=~a}}var q=0;function Rf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Mf,tl,If,Vf,Of,vs=!1,on=[],go=null,ho=null,vo=null,ua=new Map,ca=new Map,co=[],Bg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fc(e,t){switch(e){case"focusin":case"focusout":go=null;break;case"dragenter":case"dragleave":ho=null;break;case"mouseover":case"mouseout":vo=null;break;case"pointerover":case"pointerout":ua.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ca.delete(t.pointerId)}}function br(e,t,o,r,a,n){return e===null||e.nativeEvent!==n?(e={blockedOn:t,domEventName:o,eventSystemFlags:r,nativeEvent:n,targetContainers:[a]},t!==null&&(t=Aa(t),t!==null&&tl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Pg(e,t,o,r,a){switch(t){case"focusin":return go=br(go,e,t,o,r,a),!0;case"dragenter":return ho=br(ho,e,t,o,r,a),!0;case"mouseover":return vo=br(vo,e,t,o,r,a),!0;case"pointerover":var n=a.pointerId;return ua.set(n,br(ua.get(n)||null,e,t,o,r,a)),!0;case"gotpointercapture":return n=a.pointerId,ca.set(n,br(ca.get(n)||null,e,t,o,r,a)),!0}return!1}function Df(e){var t=Io(e.target);if(t!==null){var o=Qo(t);if(o!==null){if(t=o.tag,t===13){if(t=Af(o),t!==null){e.blockedOn=t,Of(e.priority,function(){If(o)});return}}else if(t===3&&o.stateNode.current.memoizedState.isDehydrated){e.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var o=xs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(o===null){o=e.nativeEvent;var r=new o.constructor(o.type,o);ps=r,o.target.dispatchEvent(r),ps=null}else return t=Aa(o),t!==null&&tl(t),e.blockedOn=o,!1;t.shift()}return!0}function pc(e,t,o){vn(e)&&o.delete(t)}function Eg(){vs=!1,go!==null&&vn(go)&&(go=null),ho!==null&&vn(ho)&&(ho=null),vo!==null&&vn(vo)&&(vo=null),ua.forEach(pc),ca.forEach(pc)}function Gr(e,t){e.blockedOn===t&&(e.blockedOn=null,vs||(vs=!0,St.unstable_scheduleCallback(St.unstable_NormalPriority,Eg)))}function fa(e){function t(a){return Gr(a,e)}if(0<on.length){Gr(on[0],e);for(var o=1;o<on.length;o++){var r=on[o];r.blockedOn===e&&(r.blockedOn=null)}}for(go!==null&&Gr(go,e),ho!==null&&Gr(ho,e),vo!==null&&Gr(vo,e),ua.forEach(t),ca.forEach(t),o=0;o<co.length;o++)r=co[o],r.blockedOn===e&&(r.blockedOn=null);for(;0<co.length&&(o=co[0],o.blockedOn===null);)Df(o),o.blockedOn===null&&co.shift()}var dr=ro.ReactCurrentBatchConfig,Rn=!0;function Fg(e,t,o,r){var a=q,n=dr.transition;dr.transition=null;try{q=1,ol(e,t,o,r)}finally{q=a,dr.transition=n}}function zg(e,t,o,r){var a=q,n=dr.transition;dr.transition=null;try{q=4,ol(e,t,o,r)}finally{q=a,dr.transition=n}}function ol(e,t,o,r){if(Rn){var a=xs(e,t,o,r);if(a===null)Wi(e,t,r,Mn,o),fc(e,r);else if(Pg(a,e,t,o,r))r.stopPropagation();else if(fc(e,r),t&4&&-1<Bg.indexOf(e)){for(;a!==null;){var n=Aa(a);if(n!==null&&Mf(n),n=xs(e,t,o,r),n===null&&Wi(e,t,r,Mn,o),n===a)break;a=n}a!==null&&r.stopPropagation()}else Wi(e,t,r,null,o)}}var Mn=null;function xs(e,t,o,r){if(Mn=null,e=Zs(r),e=Io(e),e!==null)if(t=Qo(e),t===null)e=null;else if(o=t.tag,o===13){if(e=Af(t),e!==null)return e;e=null}else if(o===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Mn=e,null}function Nf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vg()){case $s:return 1;case Ff:return 4;case zn:case xg:return 16;case zf:return 536870912;default:return 16}default:return 16}}var po=null,rl=null,xn=null;function Tf(){if(xn)return xn;var e,t=rl,o=t.length,r,a="value"in po?po.value:po.textContent,n=a.length;for(e=0;e<o&&t[e]===a[e];e++);var i=o-e;for(r=1;r<=i&&t[o-r]===a[n-r];r++);return xn=a.slice(e,1<r?1-r:void 0)}function _n(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function rn(){return!0}function mc(){return!1}function wt(e){function t(o,r,a,n,i){this._reactName=o,this._targetInst=a,this.type=r,this.nativeEvent=n,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(o=e[s],this[s]=o?o(n):n[s]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?rn:mc,this.isPropagationStopped=mc,this}return ge(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=rn)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=rn)},persist:function(){},isPersistent:rn}),t}var kr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},al=wt(kr),ka=ge({},kr,{view:0,detail:0}),Ug=wt(ka),Di,Ni,Lr,Zn=ge({},ka,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Lr&&(Lr&&e.type==="mousemove"?(Di=e.screenX-Lr.screenX,Ni=e.screenY-Lr.screenY):Ni=Di=0,Lr=e),Di)},movementY:function(e){return"movementY"in e?e.movementY:Ni}}),dc=wt(Zn),Rg=ge({},Zn,{dataTransfer:0}),Mg=wt(Rg),Ig=ge({},ka,{relatedTarget:0}),Ti=wt(Ig),Vg=ge({},kr,{animationName:0,elapsedTime:0,pseudoElement:0}),Og=wt(Vg),Dg=ge({},kr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ng=wt(Dg),Tg=ge({},kr,{data:0}),gc=wt(Tg),bg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Lg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Lg[e])?!!t[e]:!1}function nl(){return Wg}var Yg=ge({},ka,{key:function(e){if(e.key){var t=bg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=_n(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nl,charCode:function(e){return e.type==="keypress"?_n(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_n(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qg=wt(Yg),Hg=ge({},Zn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hc=wt(Hg),jg=ge({},ka,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nl}),Xg=wt(jg),Kg=ge({},kr,{propertyName:0,elapsedTime:0,pseudoElement:0}),qg=wt(Kg),Jg=ge({},Zn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zg=wt(Jg),$g=[9,13,27,32],il=$t&&"CompositionEvent"in window,$r=null;$t&&"documentMode"in document&&($r=document.documentMode);var eh=$t&&"TextEvent"in window&&!$r,bf=$t&&(!il||$r&&8<$r&&11>=$r),vc=" ",xc=!1;function Gf(e,t){switch(e){case"keyup":return $g.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var tr=!1;function th(e,t){switch(e){case"compositionend":return Lf(t);case"keypress":return t.which!==32?null:(xc=!0,vc);case"textInput":return e=t.data,e===vc&&xc?null:e;default:return null}}function oh(e,t){if(tr)return e==="compositionend"||!il&&Gf(e,t)?(e=Tf(),xn=rl=po=null,tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return bf&&t.locale!=="ko"?null:t.data;default:return null}}var rh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _c(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!rh[e.type]:t==="textarea"}function Wf(e,t,o,r){yf(r),t=In(t,"onChange"),0<t.length&&(o=new al("onChange","change",null,o,r),e.push({event:o,listeners:t}))}var ea=null,pa=null;function ah(e){ep(e,0)}function $n(e){var t=ar(e);if(mf(t))return e}function nh(e,t){if(e==="change")return t}var Yf=!1;$t&&($t?(nn="oninput"in document,nn||(bi=document.createElement("div"),bi.setAttribute("oninput","return;"),nn=typeof bi.oninput=="function"),an=nn):an=!1,Yf=an&&(!document.documentMode||9<document.documentMode));var an,nn,bi;function yc(){ea&&(ea.detachEvent("onpropertychange",Qf),pa=ea=null)}function Qf(e){if(e.propertyName==="value"&&$n(pa)){var t=[];Wf(t,pa,e,Zs(e)),kf(ah,t)}}function ih(e,t,o){e==="focusin"?(yc(),ea=t,pa=o,ea.attachEvent("onpropertychange",Qf)):e==="focusout"&&yc()}function sh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $n(pa)}function lh(e,t){if(e==="click")return $n(t)}function uh(e,t){if(e==="input"||e==="change")return $n(t)}function ch(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var bt=typeof Object.is=="function"?Object.is:ch;function ma(e,t){if(bt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var o=Object.keys(e),r=Object.keys(t);if(o.length!==r.length)return!1;for(r=0;r<o.length;r++){var a=o[r];if(!es.call(t,a)||!bt(e[a],t[a]))return!1}return!0}function Sc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wc(e,t){var o=Sc(e);e=0;for(var r;o;){if(o.nodeType===3){if(r=e+o.textContent.length,e<=t&&r>=t)return{node:o,offset:t-e};e=r}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Sc(o)}}function Hf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Hf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function jf(){for(var e=window,t=Pn();t instanceof e.HTMLIFrameElement;){try{var o=typeof t.contentWindow.location.href=="string"}catch{o=!1}if(o)e=t.contentWindow;else break;t=Pn(e.document)}return t}function sl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function fh(e){var t=jf(),o=e.focusedElem,r=e.selectionRange;if(t!==o&&o&&o.ownerDocument&&Hf(o.ownerDocument.documentElement,o)){if(r!==null&&sl(o)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in o)o.selectionStart=t,o.selectionEnd=Math.min(e,o.value.length);else if(e=(t=o.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=o.textContent.length,n=Math.min(r.start,a);r=r.end===void 0?n:Math.min(r.end,a),!e.extend&&n>r&&(a=r,r=n,n=a),a=wc(o,n);var i=wc(o,r);a&&i&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),n>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=o;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<t.length;o++)e=t[o],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ph=$t&&"documentMode"in document&&11>=document.documentMode,or=null,_s=null,ta=null,ys=!1;function Cc(e,t,o){var r=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;ys||or==null||or!==Pn(r)||(r=or,"selectionStart"in r&&sl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ta&&ma(ta,r)||(ta=r,r=In(_s,"onSelect"),0<r.length&&(t=new al("onSelect","select",null,t,o),e.push({event:t,listeners:r}),t.target=or)))}function sn(e,t){var o={};return o[e.toLowerCase()]=t.toLowerCase(),o["Webkit"+e]="webkit"+t,o["Moz"+e]="moz"+t,o}var rr={animationend:sn("Animation","AnimationEnd"),animationiteration:sn("Animation","AnimationIteration"),animationstart:sn("Animation","AnimationStart"),transitionend:sn("Transition","TransitionEnd")},Gi={},Xf={};$t&&(Xf=document.createElement("div").style,"AnimationEvent"in window||(delete rr.animationend.animation,delete rr.animationiteration.animation,delete rr.animationstart.animation),"TransitionEvent"in window||delete rr.transitionend.transition);function ei(e){if(Gi[e])return Gi[e];if(!rr[e])return e;var t=rr[e],o;for(o in t)if(t.hasOwnProperty(o)&&o in Xf)return Gi[e]=t[o];return e}var Kf=ei("animationend"),qf=ei("animationiteration"),Jf=ei("animationstart"),Zf=ei("transitionend"),$f=new Map,kc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ao(e,t){$f.set(e,t),Yo(t,[e])}for(ln=0;ln<kc.length;ln++)un=kc[ln],Ac=un.toLowerCase(),Bc=un[0].toUpperCase()+un.slice(1),Ao(Ac,"on"+Bc);var un,Ac,Bc,ln;Ao(Kf,"onAnimationEnd");Ao(qf,"onAnimationIteration");Ao(Jf,"onAnimationStart");Ao("dblclick","onDoubleClick");Ao("focusin","onFocus");Ao("focusout","onBlur");Ao(Zf,"onTransitionEnd");vr("onMouseEnter",["mouseout","mouseover"]);vr("onMouseLeave",["mouseout","mouseover"]);vr("onPointerEnter",["pointerout","pointerover"]);vr("onPointerLeave",["pointerout","pointerover"]);Yo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yo("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mh=new Set("cancel close invalid load scroll toggle".split(" ").concat(qr));function Pc(e,t,o){var r=e.type||"unknown-event";e.currentTarget=o,mg(r,t,void 0,e),e.currentTarget=null}function ep(e,t){t=(t&4)!==0;for(var o=0;o<e.length;o++){var r=e[o],a=r.event;r=r.listeners;e:{var n=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],l=s.instance,u=s.currentTarget;if(s=s.listener,l!==n&&a.isPropagationStopped())break e;Pc(a,s,u),n=l}else for(i=0;i<r.length;i++){if(s=r[i],l=s.instance,u=s.currentTarget,s=s.listener,l!==n&&a.isPropagationStopped())break e;Pc(a,s,u),n=l}}}if(Fn)throw e=gs,Fn=!1,gs=null,e}function oe(e,t){var o=t[As];o===void 0&&(o=t[As]=new Set);var r=e+"__bubble";o.has(r)||(tp(t,e,2,!1),o.add(r))}function Li(e,t,o){var r=0;t&&(r|=4),tp(o,e,r,t)}var cn="_reactListening"+Math.random().toString(36).slice(2);function da(e){if(!e[cn]){e[cn]=!0,lf.forEach(function(o){o!=="selectionchange"&&(mh.has(o)||Li(o,!1,e),Li(o,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[cn]||(t[cn]=!0,Li("selectionchange",!1,t))}}function tp(e,t,o,r){switch(Nf(t)){case 1:var a=Fg;break;case 4:a=zg;break;default:a=ol}o=a.bind(null,t,o,e),a=void 0,!ds||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,o,{capture:!0,passive:a}):e.addEventListener(t,o,!0):a!==void 0?e.addEventListener(t,o,{passive:a}):e.addEventListener(t,o,!1)}function Wi(e,t,o,r,a){var n=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(i===4)for(i=r.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===a||l.nodeType===8&&l.parentNode===a))return;i=i.return}for(;s!==null;){if(i=Io(s),i===null)return;if(l=i.tag,l===5||l===6){r=n=i;continue e}s=s.parentNode}}r=r.return}kf(function(){var u=n,g=Zs(o),m=[];e:{var d=$f.get(e);if(d!==void 0){var _=al,y=e;switch(e){case"keypress":if(_n(o)===0)break e;case"keydown":case"keyup":_=Qg;break;case"focusin":y="focus",_=Ti;break;case"focusout":y="blur",_=Ti;break;case"beforeblur":case"afterblur":_=Ti;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=dc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=Mg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Xg;break;case Kf:case qf:case Jf:_=Og;break;case Zf:_=qg;break;case"scroll":_=Ug;break;case"wheel":_=Zg;break;case"copy":case"cut":case"paste":_=Ng;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=hc}var v=(t&4)!==0,h=!v&&e==="scroll",c=v?d!==null?d+"Capture":null:d;v=[];for(var f=u,p;f!==null;){p=f;var x=p.stateNode;if(p.tag===5&&x!==null&&(p=x,c!==null&&(x=la(f,c),x!=null&&v.push(ga(f,x,p)))),h)break;f=f.return}0<v.length&&(d=new _(d,y,null,o,g),m.push({event:d,listeners:v}))}}if(!(t&7)){e:{if(d=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",d&&o!==ps&&(y=o.relatedTarget||o.fromElement)&&(Io(y)||y[eo]))break e;if((_||d)&&(d=g.window===g?g:(d=g.ownerDocument)?d.defaultView||d.parentWindow:window,_?(y=o.relatedTarget||o.toElement,_=u,y=y?Io(y):null,y!==null&&(h=Qo(y),y!==h||y.tag!==5&&y.tag!==6)&&(y=null)):(_=null,y=u),_!==y)){if(v=dc,x="onMouseLeave",c="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(v=hc,x="onPointerLeave",c="onPointerEnter",f="pointer"),h=_==null?d:ar(_),p=y==null?d:ar(y),d=new v(x,f+"leave",_,o,g),d.target=h,d.relatedTarget=p,x=null,Io(g)===u&&(v=new v(c,f+"enter",y,o,g),v.target=p,v.relatedTarget=h,x=v),h=x,_&&y)t:{for(v=_,c=y,f=0,p=v;p;p=Zo(p))f++;for(p=0,x=c;x;x=Zo(x))p++;for(;0<f-p;)v=Zo(v),f--;for(;0<p-f;)c=Zo(c),p--;for(;f--;){if(v===c||c!==null&&v===c.alternate)break t;v=Zo(v),c=Zo(c)}v=null}else v=null;_!==null&&Ec(m,d,_,v,!1),y!==null&&h!==null&&Ec(m,h,y,v,!0)}}e:{if(d=u?ar(u):window,_=d.nodeName&&d.nodeName.toLowerCase(),_==="select"||_==="input"&&d.type==="file")var S=nh;else if(_c(d))if(Yf)S=uh;else{S=sh;var w=ih}else(_=d.nodeName)&&_.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(S=lh);if(S&&(S=S(e,u))){Wf(m,S,o,g);break e}w&&w(e,d,u),e==="focusout"&&(w=d._wrapperState)&&w.controlled&&d.type==="number"&&ss(d,"number",d.value)}switch(w=u?ar(u):window,e){case"focusin":(_c(w)||w.contentEditable==="true")&&(or=w,_s=u,ta=null);break;case"focusout":ta=_s=or=null;break;case"mousedown":ys=!0;break;case"contextmenu":case"mouseup":case"dragend":ys=!1,Cc(m,o,g);break;case"selectionchange":if(ph)break;case"keydown":case"keyup":Cc(m,o,g)}var C;if(il)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else tr?Gf(e,o)&&(P="onCompositionEnd"):e==="keydown"&&o.keyCode===229&&(P="onCompositionStart");P&&(bf&&o.locale!=="ko"&&(tr||P!=="onCompositionStart"?P==="onCompositionEnd"&&tr&&(C=Tf()):(po=g,rl="value"in po?po.value:po.textContent,tr=!0)),w=In(u,P),0<w.length&&(P=new gc(P,e,null,o,g),m.push({event:P,listeners:w}),C?P.data=C:(C=Lf(o),C!==null&&(P.data=C)))),(C=eh?th(e,o):oh(e,o))&&(u=In(u,"onBeforeInput"),0<u.length&&(g=new gc("onBeforeInput","beforeinput",null,o,g),m.push({event:g,listeners:u}),g.data=C))}ep(m,t)})}function ga(e,t,o){return{instance:e,listener:t,currentTarget:o}}function In(e,t){for(var o=t+"Capture",r=[];e!==null;){var a=e,n=a.stateNode;a.tag===5&&n!==null&&(a=n,n=la(e,o),n!=null&&r.unshift(ga(e,n,a)),n=la(e,t),n!=null&&r.push(ga(e,n,a))),e=e.return}return r}function Zo(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ec(e,t,o,r,a){for(var n=t._reactName,i=[];o!==null&&o!==r;){var s=o,l=s.alternate,u=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&u!==null&&(s=u,a?(l=la(o,n),l!=null&&i.unshift(ga(o,l,s))):a||(l=la(o,n),l!=null&&i.push(ga(o,l,s)))),o=o.return}i.length!==0&&e.push({event:t,listeners:i})}var dh=/\r\n?/g,gh=/\u0000|\uFFFD/g;function Fc(e){return(typeof e=="string"?e:""+e).replace(dh,`
`).replace(gh,"")}function fn(e,t,o){if(t=Fc(t),Fc(e)!==t&&o)throw Error(B(425))}function Vn(){}var Ss=null,ws=null;function Cs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ks=typeof setTimeout=="function"?setTimeout:void 0,hh=typeof clearTimeout=="function"?clearTimeout:void 0,zc=typeof Promise=="function"?Promise:void 0,vh=typeof queueMicrotask=="function"?queueMicrotask:typeof zc<"u"?function(e){return zc.resolve(null).then(e).catch(xh)}:ks;function xh(e){setTimeout(function(){throw e})}function Yi(e,t){var o=t,r=0;do{var a=o.nextSibling;if(e.removeChild(o),a&&a.nodeType===8)if(o=a.data,o==="/$"){if(r===0){e.removeChild(a),fa(t);return}r--}else o!=="$"&&o!=="$?"&&o!=="$!"||r++;o=a}while(o);fa(t)}function xo(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Uc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var o=e.data;if(o==="$"||o==="$!"||o==="$?"){if(t===0)return e;t--}else o==="/$"&&t++}e=e.previousSibling}return null}var Ar=Math.random().toString(36).slice(2),Yt="__reactFiber$"+Ar,ha="__reactProps$"+Ar,eo="__reactContainer$"+Ar,As="__reactEvents$"+Ar,_h="__reactListeners$"+Ar,yh="__reactHandles$"+Ar;function Io(e){var t=e[Yt];if(t)return t;for(var o=e.parentNode;o;){if(t=o[eo]||o[Yt]){if(o=t.alternate,t.child!==null||o!==null&&o.child!==null)for(e=Uc(e);e!==null;){if(o=e[Yt])return o;e=Uc(e)}return t}e=o,o=e.parentNode}return null}function Aa(e){return e=e[Yt]||e[eo],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ar(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(B(33))}function ti(e){return e[ha]||null}var Bs=[],nr=-1;function Bo(e){return{current:e}}function re(e){0>nr||(e.current=Bs[nr],Bs[nr]=null,nr--)}function te(e,t){nr++,Bs[nr]=e.current,e.current=t}var ko={},ot=Bo(ko),gt=Bo(!1),To=ko;function xr(e,t){var o=e.type.contextTypes;if(!o)return ko;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},n;for(n in o)a[n]=t[n];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ht(e){return e=e.childContextTypes,e!=null}function On(){re(gt),re(ot)}function Rc(e,t,o){if(ot.current!==ko)throw Error(B(168));te(ot,t),te(gt,o)}function op(e,t,o){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return o;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(B(108,ig(e)||"Unknown",a));return ge({},o,r)}function Dn(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ko,To=ot.current,te(ot,e),te(gt,gt.current),!0}function Mc(e,t,o){var r=e.stateNode;if(!r)throw Error(B(169));o?(e=op(e,t,To),r.__reactInternalMemoizedMergedChildContext=e,re(gt),re(ot),te(ot,e)):re(gt),te(gt,o)}var Kt=null,oi=!1,Qi=!1;function rp(e){Kt===null?Kt=[e]:Kt.push(e)}function Sh(e){oi=!0,rp(e)}function Po(){if(!Qi&&Kt!==null){Qi=!0;var e=0,t=q;try{var o=Kt;for(q=1;e<o.length;e++){var r=o[e];do r=r(!0);while(r!==null)}Kt=null,oi=!1}catch(a){throw Kt!==null&&(Kt=Kt.slice(e+1)),Ef($s,Po),a}finally{q=t,Qi=!1}}return null}var ir=[],sr=0,Nn=null,Tn=0,Bt=[],Pt=0,bo=null,qt=1,Jt="";function Ro(e,t){ir[sr++]=Tn,ir[sr++]=Nn,Nn=e,Tn=t}function ap(e,t,o){Bt[Pt++]=qt,Bt[Pt++]=Jt,Bt[Pt++]=bo,bo=e;var r=qt;e=Jt;var a=32-Nt(r)-1;r&=~(1<<a),o+=1;var n=32-Nt(t)+a;if(30<n){var i=a-a%5;n=(r&(1<<i)-1).toString(32),r>>=i,a-=i,qt=1<<32-Nt(t)+a|o<<a|r,Jt=n+e}else qt=1<<n|o<<a|r,Jt=e}function ll(e){e.return!==null&&(Ro(e,1),ap(e,1,0))}function ul(e){for(;e===Nn;)Nn=ir[--sr],ir[sr]=null,Tn=ir[--sr],ir[sr]=null;for(;e===bo;)bo=Bt[--Pt],Bt[Pt]=null,Jt=Bt[--Pt],Bt[Pt]=null,qt=Bt[--Pt],Bt[Pt]=null}var yt=null,_t=null,ie=!1,Dt=null;function np(e,t){var o=Et(5,null,null,0);o.elementType="DELETED",o.stateNode=t,o.return=e,t=e.deletions,t===null?(e.deletions=[o],e.flags|=16):t.push(o)}function Ic(e,t){switch(e.tag){case 5:var o=e.type;return t=t.nodeType!==1||o.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,yt=e,_t=xo(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,yt=e,_t=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(o=bo!==null?{id:qt,overflow:Jt}:null,e.memoizedState={dehydrated:t,treeContext:o,retryLane:1073741824},o=Et(18,null,null,0),o.stateNode=t,o.return=e,e.child=o,yt=e,_t=null,!0):!1;default:return!1}}function Ps(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Es(e){if(ie){var t=_t;if(t){var o=t;if(!Ic(e,t)){if(Ps(e))throw Error(B(418));t=xo(o.nextSibling);var r=yt;t&&Ic(e,t)?np(r,o):(e.flags=e.flags&-4097|2,ie=!1,yt=e)}}else{if(Ps(e))throw Error(B(418));e.flags=e.flags&-4097|2,ie=!1,yt=e}}}function Vc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;yt=e}function pn(e){if(e!==yt)return!1;if(!ie)return Vc(e),ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Cs(e.type,e.memoizedProps)),t&&(t=_t)){if(Ps(e))throw ip(),Error(B(418));for(;t;)np(e,t),t=xo(t.nextSibling)}if(Vc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(B(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var o=e.data;if(o==="/$"){if(t===0){_t=xo(e.nextSibling);break e}t--}else o!=="$"&&o!=="$!"&&o!=="$?"||t++}e=e.nextSibling}_t=null}}else _t=yt?xo(e.stateNode.nextSibling):null;return!0}function ip(){for(var e=_t;e;)e=xo(e.nextSibling)}function _r(){_t=yt=null,ie=!1}function cl(e){Dt===null?Dt=[e]:Dt.push(e)}var wh=ro.ReactCurrentBatchConfig;function Wr(e,t,o){if(e=o.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(B(309));var r=o.stateNode}if(!r)throw Error(B(147,e));var a=r,n=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===n?t.ref:(t=function(i){var s=a.refs;i===null?delete s[n]:s[n]=i},t._stringRef=n,t)}if(typeof e!="string")throw Error(B(284));if(!o._owner)throw Error(B(290,e))}return e}function mn(e,t){throw e=Object.prototype.toString.call(t),Error(B(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Oc(e){var t=e._init;return t(e._payload)}function sp(e){function t(c,f){if(e){var p=c.deletions;p===null?(c.deletions=[f],c.flags|=16):p.push(f)}}function o(c,f){if(!e)return null;for(;f!==null;)t(c,f),f=f.sibling;return null}function r(c,f){for(c=new Map;f!==null;)f.key!==null?c.set(f.key,f):c.set(f.index,f),f=f.sibling;return c}function a(c,f){return c=wo(c,f),c.index=0,c.sibling=null,c}function n(c,f,p){return c.index=p,e?(p=c.alternate,p!==null?(p=p.index,p<f?(c.flags|=2,f):p):(c.flags|=2,f)):(c.flags|=1048576,f)}function i(c){return e&&c.alternate===null&&(c.flags|=2),c}function s(c,f,p,x){return f===null||f.tag!==6?(f=Zi(p,c.mode,x),f.return=c,f):(f=a(f,p),f.return=c,f)}function l(c,f,p,x){var S=p.type;return S===er?g(c,f,p.props.children,x,p.key):f!==null&&(f.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===lo&&Oc(S)===f.type)?(x=a(f,p.props),x.ref=Wr(c,f,p),x.return=c,x):(x=Bn(p.type,p.key,p.props,null,c.mode,x),x.ref=Wr(c,f,p),x.return=c,x)}function u(c,f,p,x){return f===null||f.tag!==4||f.stateNode.containerInfo!==p.containerInfo||f.stateNode.implementation!==p.implementation?(f=$i(p,c.mode,x),f.return=c,f):(f=a(f,p.children||[]),f.return=c,f)}function g(c,f,p,x,S){return f===null||f.tag!==7?(f=No(p,c.mode,x,S),f.return=c,f):(f=a(f,p),f.return=c,f)}function m(c,f,p){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Zi(""+f,c.mode,p),f.return=c,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ja:return p=Bn(f.type,f.key,f.props,null,c.mode,p),p.ref=Wr(c,null,f),p.return=c,p;case $o:return f=$i(f,c.mode,p),f.return=c,f;case lo:var x=f._init;return m(c,x(f._payload),p)}if(Xr(f)||Tr(f))return f=No(f,c.mode,p,null),f.return=c,f;mn(c,f)}return null}function d(c,f,p,x){var S=f!==null?f.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(c,f,""+p,x);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ja:return p.key===S?l(c,f,p,x):null;case $o:return p.key===S?u(c,f,p,x):null;case lo:return S=p._init,d(c,f,S(p._payload),x)}if(Xr(p)||Tr(p))return S!==null?null:g(c,f,p,x,null);mn(c,p)}return null}function _(c,f,p,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return c=c.get(p)||null,s(f,c,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ja:return c=c.get(x.key===null?p:x.key)||null,l(f,c,x,S);case $o:return c=c.get(x.key===null?p:x.key)||null,u(f,c,x,S);case lo:var w=x._init;return _(c,f,p,w(x._payload),S)}if(Xr(x)||Tr(x))return c=c.get(p)||null,g(f,c,x,S,null);mn(f,x)}return null}function y(c,f,p,x){for(var S=null,w=null,C=f,P=f=0,I=null;C!==null&&P<p.length;P++){C.index>P?(I=C,C=null):I=C.sibling;var E=d(c,C,p[P],x);if(E===null){C===null&&(C=I);break}e&&C&&E.alternate===null&&t(c,C),f=n(E,f,P),w===null?S=E:w.sibling=E,w=E,C=I}if(P===p.length)return o(c,C),ie&&Ro(c,P),S;if(C===null){for(;P<p.length;P++)C=m(c,p[P],x),C!==null&&(f=n(C,f,P),w===null?S=C:w.sibling=C,w=C);return ie&&Ro(c,P),S}for(C=r(c,C);P<p.length;P++)I=_(C,c,P,p[P],x),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?P:I.key),f=n(I,f,P),w===null?S=I:w.sibling=I,w=I);return e&&C.forEach(function(N){return t(c,N)}),ie&&Ro(c,P),S}function v(c,f,p,x){var S=Tr(p);if(typeof S!="function")throw Error(B(150));if(p=S.call(p),p==null)throw Error(B(151));for(var w=S=null,C=f,P=f=0,I=null,E=p.next();C!==null&&!E.done;P++,E=p.next()){C.index>P?(I=C,C=null):I=C.sibling;var N=d(c,C,E.value,x);if(N===null){C===null&&(C=I);break}e&&C&&N.alternate===null&&t(c,C),f=n(N,f,P),w===null?S=N:w.sibling=N,w=N,C=I}if(E.done)return o(c,C),ie&&Ro(c,P),S;if(C===null){for(;!E.done;P++,E=p.next())E=m(c,E.value,x),E!==null&&(f=n(E,f,P),w===null?S=E:w.sibling=E,w=E);return ie&&Ro(c,P),S}for(C=r(c,C);!E.done;P++,E=p.next())E=_(C,c,P,E.value,x),E!==null&&(e&&E.alternate!==null&&C.delete(E.key===null?P:E.key),f=n(E,f,P),w===null?S=E:w.sibling=E,w=E);return e&&C.forEach(function(G){return t(c,G)}),ie&&Ro(c,P),S}function h(c,f,p,x){if(typeof p=="object"&&p!==null&&p.type===er&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Ja:e:{for(var S=p.key,w=f;w!==null;){if(w.key===S){if(S=p.type,S===er){if(w.tag===7){o(c,w.sibling),f=a(w,p.props.children),f.return=c,c=f;break e}}else if(w.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===lo&&Oc(S)===w.type){o(c,w.sibling),f=a(w,p.props),f.ref=Wr(c,w,p),f.return=c,c=f;break e}o(c,w);break}else t(c,w);w=w.sibling}p.type===er?(f=No(p.props.children,c.mode,x,p.key),f.return=c,c=f):(x=Bn(p.type,p.key,p.props,null,c.mode,x),x.ref=Wr(c,f,p),x.return=c,c=x)}return i(c);case $o:e:{for(w=p.key;f!==null;){if(f.key===w)if(f.tag===4&&f.stateNode.containerInfo===p.containerInfo&&f.stateNode.implementation===p.implementation){o(c,f.sibling),f=a(f,p.children||[]),f.return=c,c=f;break e}else{o(c,f);break}else t(c,f);f=f.sibling}f=$i(p,c.mode,x),f.return=c,c=f}return i(c);case lo:return w=p._init,h(c,f,w(p._payload),x)}if(Xr(p))return y(c,f,p,x);if(Tr(p))return v(c,f,p,x);mn(c,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,f!==null&&f.tag===6?(o(c,f.sibling),f=a(f,p),f.return=c,c=f):(o(c,f),f=Zi(p,c.mode,x),f.return=c,c=f),i(c)):o(c,f)}return h}var yr=sp(!0),lp=sp(!1),bn=Bo(null),Gn=null,lr=null,fl=null;function pl(){fl=lr=Gn=null}function ml(e){var t=bn.current;re(bn),e._currentValue=t}function Fs(e,t,o){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===o)break;e=e.return}}function gr(e,t){Gn=e,fl=lr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(dt=!0),e.firstContext=null)}function zt(e){var t=e._currentValue;if(fl!==e)if(e={context:e,memoizedValue:t,next:null},lr===null){if(Gn===null)throw Error(B(308));lr=e,Gn.dependencies={lanes:0,firstContext:e}}else lr=lr.next=e;return t}var Vo=null;function dl(e){Vo===null?Vo=[e]:Vo.push(e)}function up(e,t,o,r){var a=t.interleaved;return a===null?(o.next=o,dl(t)):(o.next=a.next,a.next=o),t.interleaved=o,to(e,r)}function to(e,t){e.lanes|=t;var o=e.alternate;for(o!==null&&(o.lanes|=t),o=e,e=e.return;e!==null;)e.childLanes|=t,o=e.alternate,o!==null&&(o.childLanes|=t),o=e,e=e.return;return o.tag===3?o.stateNode:null}var uo=!1;function gl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function cp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Zt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function _o(e,t,o){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Q&2){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,to(e,o)}return a=r.interleaved,a===null?(t.next=t,dl(r)):(t.next=a.next,a.next=t),r.interleaved=t,to(e,o)}function yn(e,t,o){if(t=t.updateQueue,t!==null&&(t=t.shared,(o&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,o|=r,t.lanes=o,el(e,o)}}function Dc(e,t){var o=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,o===r)){var a=null,n=null;if(o=o.firstBaseUpdate,o!==null){do{var i={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};n===null?a=n=i:n=n.next=i,o=o.next}while(o!==null);n===null?a=n=t:n=n.next=t}else a=n=t;o={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:n,shared:r.shared,effects:r.effects},e.updateQueue=o;return}e=o.lastBaseUpdate,e===null?o.firstBaseUpdate=t:e.next=t,o.lastBaseUpdate=t}function Ln(e,t,o,r){var a=e.updateQueue;uo=!1;var n=a.firstBaseUpdate,i=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var l=s,u=l.next;l.next=null,i===null?n=u:i.next=u,i=l;var g=e.alternate;g!==null&&(g=g.updateQueue,s=g.lastBaseUpdate,s!==i&&(s===null?g.firstBaseUpdate=u:s.next=u,g.lastBaseUpdate=l))}if(n!==null){var m=a.baseState;i=0,g=u=l=null,s=n;do{var d=s.lane,_=s.eventTime;if((r&d)===d){g!==null&&(g=g.next={eventTime:_,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var y=e,v=s;switch(d=t,_=o,v.tag){case 1:if(y=v.payload,typeof y=="function"){m=y.call(_,m,d);break e}m=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,d=typeof y=="function"?y.call(_,m,d):y,d==null)break e;m=ge({},m,d);break e;case 2:uo=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,d=a.effects,d===null?a.effects=[s]:d.push(s))}else _={eventTime:_,lane:d,tag:s.tag,payload:s.payload,callback:s.callback,next:null},g===null?(u=g=_,l=m):g=g.next=_,i|=d;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;d=s,s=d.next,d.next=null,a.lastBaseUpdate=d,a.shared.pending=null}}while(!0);if(g===null&&(l=m),a.baseState=l,a.firstBaseUpdate=u,a.lastBaseUpdate=g,t=a.shared.interleaved,t!==null){a=t;do i|=a.lane,a=a.next;while(a!==t)}else n===null&&(a.shared.lanes=0);Lo|=i,e.lanes=i,e.memoizedState=m}}function Nc(e,t,o){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=o,typeof a!="function")throw Error(B(191,a));a.call(r)}}}var Ba={},Ht=Bo(Ba),va=Bo(Ba),xa=Bo(Ba);function Oo(e){if(e===Ba)throw Error(B(174));return e}function hl(e,t){switch(te(xa,t),te(va,e),te(Ht,Ba),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:us(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=us(t,e)}re(Ht),te(Ht,t)}function Sr(){re(Ht),re(va),re(xa)}function fp(e){Oo(xa.current);var t=Oo(Ht.current),o=us(t,e.type);t!==o&&(te(va,e),te(Ht,o))}function vl(e){va.current===e&&(re(Ht),re(va))}var me=Bo(0);function Wn(e){for(var t=e;t!==null;){if(t.tag===13){var o=t.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hi=[];function xl(){for(var e=0;e<Hi.length;e++)Hi[e]._workInProgressVersionPrimary=null;Hi.length=0}var Sn=ro.ReactCurrentDispatcher,ji=ro.ReactCurrentBatchConfig,Go=0,de=null,Me=null,Te=null,Yn=!1,oa=!1,_a=0,Ch=0;function $e(){throw Error(B(321))}function _l(e,t){if(t===null)return!1;for(var o=0;o<t.length&&o<e.length;o++)if(!bt(e[o],t[o]))return!1;return!0}function yl(e,t,o,r,a,n){if(Go=n,de=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Sn.current=e===null||e.memoizedState===null?Ph:Eh,e=o(r,a),oa){n=0;do{if(oa=!1,_a=0,25<=n)throw Error(B(301));n+=1,Te=Me=null,t.updateQueue=null,Sn.current=Fh,e=o(r,a)}while(oa)}if(Sn.current=Qn,t=Me!==null&&Me.next!==null,Go=0,Te=Me=de=null,Yn=!1,t)throw Error(B(300));return e}function Sl(){var e=_a!==0;return _a=0,e}function Wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Te===null?de.memoizedState=Te=e:Te=Te.next=e,Te}function Ut(){if(Me===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=Me.next;var t=Te===null?de.memoizedState:Te.next;if(t!==null)Te=t,Me=e;else{if(e===null)throw Error(B(310));Me=e,e={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},Te===null?de.memoizedState=Te=e:Te=Te.next=e}return Te}function ya(e,t){return typeof t=="function"?t(e):t}function Xi(e){var t=Ut(),o=t.queue;if(o===null)throw Error(B(311));o.lastRenderedReducer=e;var r=Me,a=r.baseQueue,n=o.pending;if(n!==null){if(a!==null){var i=a.next;a.next=n.next,n.next=i}r.baseQueue=a=n,o.pending=null}if(a!==null){n=a.next,r=r.baseState;var s=i=null,l=null,u=n;do{var g=u.lane;if((Go&g)===g)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:g,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(s=l=m,i=r):l=l.next=m,de.lanes|=g,Lo|=g}u=u.next}while(u!==null&&u!==n);l===null?i=r:l.next=s,bt(r,t.memoizedState)||(dt=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=l,o.lastRenderedState=r}if(e=o.interleaved,e!==null){a=e;do n=a.lane,de.lanes|=n,Lo|=n,a=a.next;while(a!==e)}else a===null&&(o.lanes=0);return[t.memoizedState,o.dispatch]}function Ki(e){var t=Ut(),o=t.queue;if(o===null)throw Error(B(311));o.lastRenderedReducer=e;var r=o.dispatch,a=o.pending,n=t.memoizedState;if(a!==null){o.pending=null;var i=a=a.next;do n=e(n,i.action),i=i.next;while(i!==a);bt(n,t.memoizedState)||(dt=!0),t.memoizedState=n,t.baseQueue===null&&(t.baseState=n),o.lastRenderedState=n}return[n,r]}function pp(){}function mp(e,t){var o=de,r=Ut(),a=t(),n=!bt(r.memoizedState,a);if(n&&(r.memoizedState=a,dt=!0),r=r.queue,wl(hp.bind(null,o,r,e),[e]),r.getSnapshot!==t||n||Te!==null&&Te.memoizedState.tag&1){if(o.flags|=2048,Sa(9,gp.bind(null,o,r,a,t),void 0,null),be===null)throw Error(B(349));Go&30||dp(o,t,a)}return a}function dp(e,t,o){e.flags|=16384,e={getSnapshot:t,value:o},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.stores=[e]):(o=t.stores,o===null?t.stores=[e]:o.push(e))}function gp(e,t,o,r){t.value=o,t.getSnapshot=r,vp(t)&&xp(e)}function hp(e,t,o){return o(function(){vp(t)&&xp(e)})}function vp(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!bt(e,o)}catch{return!0}}function xp(e){var t=to(e,1);t!==null&&Tt(t,e,1,-1)}function Tc(e){var t=Wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:e},t.queue=e,e=e.dispatch=Bh.bind(null,de,e),[t.memoizedState,e]}function Sa(e,t,o,r){return e={tag:e,create:t,destroy:o,deps:r,next:null},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.lastEffect=e.next=e):(o=t.lastEffect,o===null?t.lastEffect=e.next=e:(r=o.next,o.next=e,e.next=r,t.lastEffect=e)),e}function _p(){return Ut().memoizedState}function wn(e,t,o,r){var a=Wt();de.flags|=e,a.memoizedState=Sa(1|t,o,void 0,r===void 0?null:r)}function ri(e,t,o,r){var a=Ut();r=r===void 0?null:r;var n=void 0;if(Me!==null){var i=Me.memoizedState;if(n=i.destroy,r!==null&&_l(r,i.deps)){a.memoizedState=Sa(t,o,n,r);return}}de.flags|=e,a.memoizedState=Sa(1|t,o,n,r)}function bc(e,t){return wn(8390656,8,e,t)}function wl(e,t){return ri(2048,8,e,t)}function yp(e,t){return ri(4,2,e,t)}function Sp(e,t){return ri(4,4,e,t)}function wp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Cp(e,t,o){return o=o!=null?o.concat([e]):null,ri(4,4,wp.bind(null,t,e),o)}function Cl(){}function kp(e,t){var o=Ut();t=t===void 0?null:t;var r=o.memoizedState;return r!==null&&t!==null&&_l(t,r[1])?r[0]:(o.memoizedState=[e,t],e)}function Ap(e,t){var o=Ut();t=t===void 0?null:t;var r=o.memoizedState;return r!==null&&t!==null&&_l(t,r[1])?r[0]:(e=e(),o.memoizedState=[e,t],e)}function Bp(e,t,o){return Go&21?(bt(o,t)||(o=Uf(),de.lanes|=o,Lo|=o,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,dt=!0),e.memoizedState=o)}function kh(e,t){var o=q;q=o!==0&&4>o?o:4,e(!0);var r=ji.transition;ji.transition={};try{e(!1),t()}finally{q=o,ji.transition=r}}function Pp(){return Ut().memoizedState}function Ah(e,t,o){var r=So(e);if(o={lane:r,action:o,hasEagerState:!1,eagerState:null,next:null},Ep(e))Fp(t,o);else if(o=up(e,t,o,r),o!==null){var a=ut();Tt(o,e,r,a),zp(o,t,r)}}function Bh(e,t,o){var r=So(e),a={lane:r,action:o,hasEagerState:!1,eagerState:null,next:null};if(Ep(e))Fp(t,a);else{var n=e.alternate;if(e.lanes===0&&(n===null||n.lanes===0)&&(n=t.lastRenderedReducer,n!==null))try{var i=t.lastRenderedState,s=n(i,o);if(a.hasEagerState=!0,a.eagerState=s,bt(s,i)){var l=t.interleaved;l===null?(a.next=a,dl(t)):(a.next=l.next,l.next=a),t.interleaved=a;return}}catch{}finally{}o=up(e,t,a,r),o!==null&&(a=ut(),Tt(o,e,r,a),zp(o,t,r))}}function Ep(e){var t=e.alternate;return e===de||t!==null&&t===de}function Fp(e,t){oa=Yn=!0;var o=e.pending;o===null?t.next=t:(t.next=o.next,o.next=t),e.pending=t}function zp(e,t,o){if(o&4194240){var r=t.lanes;r&=e.pendingLanes,o|=r,t.lanes=o,el(e,o)}}var Qn={readContext:zt,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useInsertionEffect:$e,useLayoutEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useMutableSource:$e,useSyncExternalStore:$e,useId:$e,unstable_isNewReconciler:!1},Ph={readContext:zt,useCallback:function(e,t){return Wt().memoizedState=[e,t===void 0?null:t],e},useContext:zt,useEffect:bc,useImperativeHandle:function(e,t,o){return o=o!=null?o.concat([e]):null,wn(4194308,4,wp.bind(null,t,e),o)},useLayoutEffect:function(e,t){return wn(4194308,4,e,t)},useInsertionEffect:function(e,t){return wn(4,2,e,t)},useMemo:function(e,t){var o=Wt();return t=t===void 0?null:t,e=e(),o.memoizedState=[e,t],e},useReducer:function(e,t,o){var r=Wt();return t=o!==void 0?o(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ah.bind(null,de,e),[r.memoizedState,e]},useRef:function(e){var t=Wt();return e={current:e},t.memoizedState=e},useState:Tc,useDebugValue:Cl,useDeferredValue:function(e){return Wt().memoizedState=e},useTransition:function(){var e=Tc(!1),t=e[0];return e=kh.bind(null,e[1]),Wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,o){var r=de,a=Wt();if(ie){if(o===void 0)throw Error(B(407));o=o()}else{if(o=t(),be===null)throw Error(B(349));Go&30||dp(r,t,o)}a.memoizedState=o;var n={value:o,getSnapshot:t};return a.queue=n,bc(hp.bind(null,r,n,e),[e]),r.flags|=2048,Sa(9,gp.bind(null,r,n,o,t),void 0,null),o},useId:function(){var e=Wt(),t=be.identifierPrefix;if(ie){var o=Jt,r=qt;o=(r&~(1<<32-Nt(r)-1)).toString(32)+o,t=":"+t+"R"+o,o=_a++,0<o&&(t+="H"+o.toString(32)),t+=":"}else o=Ch++,t=":"+t+"r"+o.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Eh={readContext:zt,useCallback:kp,useContext:zt,useEffect:wl,useImperativeHandle:Cp,useInsertionEffect:yp,useLayoutEffect:Sp,useMemo:Ap,useReducer:Xi,useRef:_p,useState:function(){return Xi(ya)},useDebugValue:Cl,useDeferredValue:function(e){var t=Ut();return Bp(t,Me.memoizedState,e)},useTransition:function(){var e=Xi(ya)[0],t=Ut().memoizedState;return[e,t]},useMutableSource:pp,useSyncExternalStore:mp,useId:Pp,unstable_isNewReconciler:!1},Fh={readContext:zt,useCallback:kp,useContext:zt,useEffect:wl,useImperativeHandle:Cp,useInsertionEffect:yp,useLayoutEffect:Sp,useMemo:Ap,useReducer:Ki,useRef:_p,useState:function(){return Ki(ya)},useDebugValue:Cl,useDeferredValue:function(e){var t=Ut();return Me===null?t.memoizedState=e:Bp(t,Me.memoizedState,e)},useTransition:function(){var e=Ki(ya)[0],t=Ut().memoizedState;return[e,t]},useMutableSource:pp,useSyncExternalStore:mp,useId:Pp,unstable_isNewReconciler:!1};function Vt(e,t){if(e&&e.defaultProps){t=ge({},t),e=e.defaultProps;for(var o in e)t[o]===void 0&&(t[o]=e[o]);return t}return t}function zs(e,t,o,r){t=e.memoizedState,o=o(r,t),o=o==null?t:ge({},t,o),e.memoizedState=o,e.lanes===0&&(e.updateQueue.baseState=o)}var ai={isMounted:function(e){return(e=e._reactInternals)?Qo(e)===e:!1},enqueueSetState:function(e,t,o){e=e._reactInternals;var r=ut(),a=So(e),n=Zt(r,a);n.payload=t,o!=null&&(n.callback=o),t=_o(e,n,a),t!==null&&(Tt(t,e,a,r),yn(t,e,a))},enqueueReplaceState:function(e,t,o){e=e._reactInternals;var r=ut(),a=So(e),n=Zt(r,a);n.tag=1,n.payload=t,o!=null&&(n.callback=o),t=_o(e,n,a),t!==null&&(Tt(t,e,a,r),yn(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var o=ut(),r=So(e),a=Zt(o,r);a.tag=2,t!=null&&(a.callback=t),t=_o(e,a,r),t!==null&&(Tt(t,e,r,o),yn(t,e,r))}};function Gc(e,t,o,r,a,n,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,n,i):t.prototype&&t.prototype.isPureReactComponent?!ma(o,r)||!ma(a,n):!0}function Up(e,t,o){var r=!1,a=ko,n=t.contextType;return typeof n=="object"&&n!==null?n=zt(n):(a=ht(t)?To:ot.current,r=t.contextTypes,n=(r=r!=null)?xr(e,a):ko),t=new t(o,n),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ai,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=n),t}function Lc(e,t,o,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(o,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(o,r),t.state!==e&&ai.enqueueReplaceState(t,t.state,null)}function Us(e,t,o,r){var a=e.stateNode;a.props=o,a.state=e.memoizedState,a.refs={},gl(e);var n=t.contextType;typeof n=="object"&&n!==null?a.context=zt(n):(n=ht(t)?To:ot.current,a.context=xr(e,n)),a.state=e.memoizedState,n=t.getDerivedStateFromProps,typeof n=="function"&&(zs(e,t,n,o),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&ai.enqueueReplaceState(a,a.state,null),Ln(e,o,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function wr(e,t){try{var o="",r=t;do o+=ng(r),r=r.return;while(r);var a=o}catch(n){a=`
Error generating stack: `+n.message+`
`+n.stack}return{value:e,source:t,stack:a,digest:null}}function qi(e,t,o){return{value:e,source:null,stack:o??null,digest:t??null}}function Rs(e,t){try{console.error(t.value)}catch(o){setTimeout(function(){throw o})}}var zh=typeof WeakMap=="function"?WeakMap:Map;function Rp(e,t,o){o=Zt(-1,o),o.tag=3,o.payload={element:null};var r=t.value;return o.callback=function(){jn||(jn=!0,Ls=r),Rs(e,t)},o}function Mp(e,t,o){o=Zt(-1,o),o.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;o.payload=function(){return r(a)},o.callback=function(){Rs(e,t)}}var n=e.stateNode;return n!==null&&typeof n.componentDidCatch=="function"&&(o.callback=function(){Rs(e,t),typeof r!="function"&&(yo===null?yo=new Set([this]):yo.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),o}function Wc(e,t,o){var r=e.pingCache;if(r===null){r=e.pingCache=new zh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(o)||(a.add(o),e=Yh.bind(null,e,t,o),t.then(e,e))}function Yc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Qc(e,t,o,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(t=Zt(-1,1),t.tag=2,_o(o,t,1))),o.lanes|=1),e)}var Uh=ro.ReactCurrentOwner,dt=!1;function lt(e,t,o,r){t.child=e===null?lp(t,null,o,r):yr(t,e.child,o,r)}function Hc(e,t,o,r,a){o=o.render;var n=t.ref;return gr(t,a),r=yl(e,t,o,r,n,a),o=Sl(),e!==null&&!dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,oo(e,t,a)):(ie&&o&&ll(t),t.flags|=1,lt(e,t,r,a),t.child)}function jc(e,t,o,r,a){if(e===null){var n=o.type;return typeof n=="function"&&!Ul(n)&&n.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(t.tag=15,t.type=n,Ip(e,t,n,r,a)):(e=Bn(o.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(n=e.child,!(e.lanes&a)){var i=n.memoizedProps;if(o=o.compare,o=o!==null?o:ma,o(i,r)&&e.ref===t.ref)return oo(e,t,a)}return t.flags|=1,e=wo(n,r),e.ref=t.ref,e.return=t,t.child=e}function Ip(e,t,o,r,a){if(e!==null){var n=e.memoizedProps;if(ma(n,r)&&e.ref===t.ref)if(dt=!1,t.pendingProps=r=n,(e.lanes&a)!==0)e.flags&131072&&(dt=!0);else return t.lanes=e.lanes,oo(e,t,a)}return Ms(e,t,o,r,a)}function Vp(e,t,o){var r=t.pendingProps,a=r.children,n=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},te(cr,xt),xt|=o;else{if(!(o&1073741824))return e=n!==null?n.baseLanes|o:o,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,te(cr,xt),xt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=n!==null?n.baseLanes:o,te(cr,xt),xt|=r}else n!==null?(r=n.baseLanes|o,t.memoizedState=null):r=o,te(cr,xt),xt|=r;return lt(e,t,a,o),t.child}function Op(e,t){var o=t.ref;(e===null&&o!==null||e!==null&&e.ref!==o)&&(t.flags|=512,t.flags|=2097152)}function Ms(e,t,o,r,a){var n=ht(o)?To:ot.current;return n=xr(t,n),gr(t,a),o=yl(e,t,o,r,n,a),r=Sl(),e!==null&&!dt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,oo(e,t,a)):(ie&&r&&ll(t),t.flags|=1,lt(e,t,o,a),t.child)}function Xc(e,t,o,r,a){if(ht(o)){var n=!0;Dn(t)}else n=!1;if(gr(t,a),t.stateNode===null)Cn(e,t),Up(t,o,r),Us(t,o,r,a),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var l=i.context,u=o.contextType;typeof u=="object"&&u!==null?u=zt(u):(u=ht(o)?To:ot.current,u=xr(t,u));var g=o.getDerivedStateFromProps,m=typeof g=="function"||typeof i.getSnapshotBeforeUpdate=="function";m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||l!==u)&&Lc(t,i,r,u),uo=!1;var d=t.memoizedState;i.state=d,Ln(t,r,i,a),l=t.memoizedState,s!==r||d!==l||gt.current||uo?(typeof g=="function"&&(zs(t,o,g,r),l=t.memoizedState),(s=uo||Gc(t,o,s,r,d,l,u))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),i.props=r,i.state=l,i.context=u,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,cp(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:Vt(t.type,s),i.props=u,m=t.pendingProps,d=i.context,l=o.contextType,typeof l=="object"&&l!==null?l=zt(l):(l=ht(o)?To:ot.current,l=xr(t,l));var _=o.getDerivedStateFromProps;(g=typeof _=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==m||d!==l)&&Lc(t,i,r,l),uo=!1,d=t.memoizedState,i.state=d,Ln(t,r,i,a);var y=t.memoizedState;s!==m||d!==y||gt.current||uo?(typeof _=="function"&&(zs(t,o,_,r),y=t.memoizedState),(u=uo||Gc(t,o,u,r,d,y,l)||!1)?(g||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,y,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,y,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),i.props=r,i.state=y,i.context=l,r=u):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return Is(e,t,o,r,n,a)}function Is(e,t,o,r,a,n){Op(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return a&&Mc(t,o,!1),oo(e,t,n);r=t.stateNode,Uh.current=t;var s=i&&typeof o.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=yr(t,e.child,null,n),t.child=yr(t,null,s,n)):lt(e,t,s,n),t.memoizedState=r.state,a&&Mc(t,o,!0),t.child}function Dp(e){var t=e.stateNode;t.pendingContext?Rc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Rc(e,t.context,!1),hl(e,t.containerInfo)}function Kc(e,t,o,r,a){return _r(),cl(a),t.flags|=256,lt(e,t,o,r),t.child}var Vs={dehydrated:null,treeContext:null,retryLane:0};function Os(e){return{baseLanes:e,cachePool:null,transitions:null}}function Np(e,t,o){var r=t.pendingProps,a=me.current,n=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(n=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),te(me,a&1),e===null)return Es(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,n?(r=t.mode,n=t.child,i={mode:"hidden",children:i},!(r&1)&&n!==null?(n.childLanes=0,n.pendingProps=i):n=si(i,r,0,null),e=No(e,r,o,null),n.return=t,e.return=t,n.sibling=e,t.child=n,t.child.memoizedState=Os(o),t.memoizedState=Vs,e):kl(t,i));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return Rh(e,t,i,r,s,a,o);if(n){n=r.fallback,i=t.mode,a=e.child,s=a.sibling;var l={mode:"hidden",children:r.children};return!(i&1)&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=wo(a,l),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?n=wo(s,n):(n=No(n,i,o,null),n.flags|=2),n.return=t,r.return=t,r.sibling=n,t.child=r,r=n,n=t.child,i=e.child.memoizedState,i=i===null?Os(o):{baseLanes:i.baseLanes|o,cachePool:null,transitions:i.transitions},n.memoizedState=i,n.childLanes=e.childLanes&~o,t.memoizedState=Vs,r}return n=e.child,e=n.sibling,r=wo(n,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=o),r.return=t,r.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=r,t.memoizedState=null,r}function kl(e,t){return t=si({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function dn(e,t,o,r){return r!==null&&cl(r),yr(t,e.child,null,o),e=kl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rh(e,t,o,r,a,n,i){if(o)return t.flags&256?(t.flags&=-257,r=qi(Error(B(422))),dn(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(n=r.fallback,a=t.mode,r=si({mode:"visible",children:r.children},a,0,null),n=No(n,a,i,null),n.flags|=2,r.return=t,n.return=t,r.sibling=n,t.child=r,t.mode&1&&yr(t,e.child,null,i),t.child.memoizedState=Os(i),t.memoizedState=Vs,n);if(!(t.mode&1))return dn(e,t,i,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,n=Error(B(419)),r=qi(n,r,void 0),dn(e,t,i,r)}if(s=(i&e.childLanes)!==0,dt||s){if(r=be,r!==null){switch(i&-i){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|i)?0:a,a!==0&&a!==n.retryLane&&(n.retryLane=a,to(e,a),Tt(r,e,a,-1))}return zl(),r=qi(Error(B(421))),dn(e,t,i,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Qh.bind(null,e),a._reactRetry=t,null):(e=n.treeContext,_t=xo(a.nextSibling),yt=t,ie=!0,Dt=null,e!==null&&(Bt[Pt++]=qt,Bt[Pt++]=Jt,Bt[Pt++]=bo,qt=e.id,Jt=e.overflow,bo=t),t=kl(t,r.children),t.flags|=4096,t)}function qc(e,t,o){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Fs(e.return,t,o)}function Ji(e,t,o,r,a){var n=e.memoizedState;n===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:o,tailMode:a}:(n.isBackwards=t,n.rendering=null,n.renderingStartTime=0,n.last=r,n.tail=o,n.tailMode=a)}function Tp(e,t,o){var r=t.pendingProps,a=r.revealOrder,n=r.tail;if(lt(e,t,r.children,o),r=me.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&qc(e,o,t);else if(e.tag===19)qc(e,o,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(te(me,r),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(o=t.child,a=null;o!==null;)e=o.alternate,e!==null&&Wn(e)===null&&(a=o),o=o.sibling;o=a,o===null?(a=t.child,t.child=null):(a=o.sibling,o.sibling=null),Ji(t,!1,a,o,n);break;case"backwards":for(o=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Wn(e)===null){t.child=a;break}e=a.sibling,a.sibling=o,o=a,a=e}Ji(t,!0,o,null,n);break;case"together":Ji(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Cn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function oo(e,t,o){if(e!==null&&(t.dependencies=e.dependencies),Lo|=t.lanes,!(o&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(B(153));if(t.child!==null){for(e=t.child,o=wo(e,e.pendingProps),t.child=o,o.return=t;e.sibling!==null;)e=e.sibling,o=o.sibling=wo(e,e.pendingProps),o.return=t;o.sibling=null}return t.child}function Mh(e,t,o){switch(t.tag){case 3:Dp(t),_r();break;case 5:fp(t);break;case 1:ht(t.type)&&Dn(t);break;case 4:hl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;te(bn,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(te(me,me.current&1),t.flags|=128,null):o&t.child.childLanes?Np(e,t,o):(te(me,me.current&1),e=oo(e,t,o),e!==null?e.sibling:null);te(me,me.current&1);break;case 19:if(r=(o&t.childLanes)!==0,e.flags&128){if(r)return Tp(e,t,o);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),te(me,me.current),r)break;return null;case 22:case 23:return t.lanes=0,Vp(e,t,o)}return oo(e,t,o)}var bp,Ds,Gp,Lp;bp=function(e,t){for(var o=t.child;o!==null;){if(o.tag===5||o.tag===6)e.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break;for(;o.sibling===null;){if(o.return===null||o.return===t)return;o=o.return}o.sibling.return=o.return,o=o.sibling}};Ds=function(){};Gp=function(e,t,o,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Oo(Ht.current);var n=null;switch(o){case"input":a=ns(e,a),r=ns(e,r),n=[];break;case"select":a=ge({},a,{value:void 0}),r=ge({},r,{value:void 0}),n=[];break;case"textarea":a=ls(e,a),r=ls(e,r),n=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Vn)}cs(o,r);var i;o=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var s=a[u];for(i in s)s.hasOwnProperty(i)&&(o||(o={}),o[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ia.hasOwnProperty(u)?n||(n=[]):(n=n||[]).push(u,null));for(u in r){var l=r[u];if(s=a?.[u],r.hasOwnProperty(u)&&l!==s&&(l!=null||s!=null))if(u==="style")if(s){for(i in s)!s.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(o||(o={}),o[i]="");for(i in l)l.hasOwnProperty(i)&&s[i]!==l[i]&&(o||(o={}),o[i]=l[i])}else o||(n||(n=[]),n.push(u,o)),o=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(n=n||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(n=n||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ia.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&oe("scroll",e),n||s===l||(n=[])):(n=n||[]).push(u,l))}o&&(n=n||[]).push("style",o);var u=n;(t.updateQueue=u)&&(t.flags|=4)}};Lp=function(e,t,o,r){o!==r&&(t.flags|=4)};function Yr(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var o=null;t!==null;)t.alternate!==null&&(o=t),t=t.sibling;o===null?e.tail=null:o.sibling=null;break;case"collapsed":o=e.tail;for(var r=null;o!==null;)o.alternate!==null&&(r=o),o=o.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function et(e){var t=e.alternate!==null&&e.alternate.child===e.child,o=0,r=0;if(t)for(var a=e.child;a!==null;)o|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)o|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=o,t}function Ih(e,t,o){var r=t.pendingProps;switch(ul(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return et(t),null;case 1:return ht(t.type)&&On(),et(t),null;case 3:return r=t.stateNode,Sr(),re(gt),re(ot),xl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(pn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Dt!==null&&(Qs(Dt),Dt=null))),Ds(e,t),et(t),null;case 5:vl(t);var a=Oo(xa.current);if(o=t.type,e!==null&&t.stateNode!=null)Gp(e,t,o,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(B(166));return et(t),null}if(e=Oo(Ht.current),pn(t)){r=t.stateNode,o=t.type;var n=t.memoizedProps;switch(r[Yt]=t,r[ha]=n,e=(t.mode&1)!==0,o){case"dialog":oe("cancel",r),oe("close",r);break;case"iframe":case"object":case"embed":oe("load",r);break;case"video":case"audio":for(a=0;a<qr.length;a++)oe(qr[a],r);break;case"source":oe("error",r);break;case"img":case"image":case"link":oe("error",r),oe("load",r);break;case"details":oe("toggle",r);break;case"input":ac(r,n),oe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!n.multiple},oe("invalid",r);break;case"textarea":ic(r,n),oe("invalid",r)}cs(o,n),a=null;for(var i in n)if(n.hasOwnProperty(i)){var s=n[i];i==="children"?typeof s=="string"?r.textContent!==s&&(n.suppressHydrationWarning!==!0&&fn(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(n.suppressHydrationWarning!==!0&&fn(r.textContent,s,e),a=["children",""+s]):ia.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&oe("scroll",r)}switch(o){case"input":Za(r),nc(r,n,!0);break;case"textarea":Za(r),sc(r);break;case"select":case"option":break;default:typeof n.onClick=="function"&&(r.onclick=Vn)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=hf(o)),e==="http://www.w3.org/1999/xhtml"?o==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(o,{is:r.is}):(e=i.createElement(o),o==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,o),e[Yt]=t,e[ha]=r,bp(e,t,!1,!1),t.stateNode=e;e:{switch(i=fs(o,r),o){case"dialog":oe("cancel",e),oe("close",e),a=r;break;case"iframe":case"object":case"embed":oe("load",e),a=r;break;case"video":case"audio":for(a=0;a<qr.length;a++)oe(qr[a],e);a=r;break;case"source":oe("error",e),a=r;break;case"img":case"image":case"link":oe("error",e),oe("load",e),a=r;break;case"details":oe("toggle",e),a=r;break;case"input":ac(e,r),a=ns(e,r),oe("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=ge({},r,{value:void 0}),oe("invalid",e);break;case"textarea":ic(e,r),a=ls(e,r),oe("invalid",e);break;default:a=r}cs(o,a),s=a;for(n in s)if(s.hasOwnProperty(n)){var l=s[n];n==="style"?_f(e,l):n==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&vf(e,l)):n==="children"?typeof l=="string"?(o!=="textarea"||l!=="")&&sa(e,l):typeof l=="number"&&sa(e,""+l):n!=="suppressContentEditableWarning"&&n!=="suppressHydrationWarning"&&n!=="autoFocus"&&(ia.hasOwnProperty(n)?l!=null&&n==="onScroll"&&oe("scroll",e):l!=null&&Xs(e,n,l,i))}switch(o){case"input":Za(e),nc(e,r,!1);break;case"textarea":Za(e),sc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Co(r.value));break;case"select":e.multiple=!!r.multiple,n=r.value,n!=null?fr(e,!!r.multiple,n,!1):r.defaultValue!=null&&fr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Vn)}switch(o){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return et(t),null;case 6:if(e&&t.stateNode!=null)Lp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(B(166));if(o=Oo(xa.current),Oo(Ht.current),pn(t)){if(r=t.stateNode,o=t.memoizedProps,r[Yt]=t,(n=r.nodeValue!==o)&&(e=yt,e!==null))switch(e.tag){case 3:fn(r.nodeValue,o,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&fn(r.nodeValue,o,(e.mode&1)!==0)}n&&(t.flags|=4)}else r=(o.nodeType===9?o:o.ownerDocument).createTextNode(r),r[Yt]=t,t.stateNode=r}return et(t),null;case 13:if(re(me),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ie&&_t!==null&&t.mode&1&&!(t.flags&128))ip(),_r(),t.flags|=98560,n=!1;else if(n=pn(t),r!==null&&r.dehydrated!==null){if(e===null){if(!n)throw Error(B(318));if(n=t.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(B(317));n[Yt]=t}else _r(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;et(t),n=!1}else Dt!==null&&(Qs(Dt),Dt=null),n=!0;if(!n)return t.flags&65536?t:null}return t.flags&128?(t.lanes=o,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||me.current&1?Ie===0&&(Ie=3):zl())),t.updateQueue!==null&&(t.flags|=4),et(t),null);case 4:return Sr(),Ds(e,t),e===null&&da(t.stateNode.containerInfo),et(t),null;case 10:return ml(t.type._context),et(t),null;case 17:return ht(t.type)&&On(),et(t),null;case 19:if(re(me),n=t.memoizedState,n===null)return et(t),null;if(r=(t.flags&128)!==0,i=n.rendering,i===null)if(r)Yr(n,!1);else{if(Ie!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Wn(e),i!==null){for(t.flags|=128,Yr(n,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=o,o=t.child;o!==null;)n=o,e=r,n.flags&=14680066,i=n.alternate,i===null?(n.childLanes=0,n.lanes=e,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=i.childLanes,n.lanes=i.lanes,n.child=i.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=i.memoizedProps,n.memoizedState=i.memoizedState,n.updateQueue=i.updateQueue,n.type=i.type,e=i.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),o=o.sibling;return te(me,me.current&1|2),t.child}e=e.sibling}n.tail!==null&&we()>Cr&&(t.flags|=128,r=!0,Yr(n,!1),t.lanes=4194304)}else{if(!r)if(e=Wn(i),e!==null){if(t.flags|=128,r=!0,o=e.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),Yr(n,!0),n.tail===null&&n.tailMode==="hidden"&&!i.alternate&&!ie)return et(t),null}else 2*we()-n.renderingStartTime>Cr&&o!==1073741824&&(t.flags|=128,r=!0,Yr(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(o=n.last,o!==null?o.sibling=i:t.child=i,n.last=i)}return n.tail!==null?(t=n.tail,n.rendering=t,n.tail=t.sibling,n.renderingStartTime=we(),t.sibling=null,o=me.current,te(me,r?o&1|2:o&1),t):(et(t),null);case 22:case 23:return Fl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?xt&1073741824&&(et(t),t.subtreeFlags&6&&(t.flags|=8192)):et(t),null;case 24:return null;case 25:return null}throw Error(B(156,t.tag))}function Vh(e,t){switch(ul(t),t.tag){case 1:return ht(t.type)&&On(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Sr(),re(gt),re(ot),xl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return vl(t),null;case 13:if(re(me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(B(340));_r()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return re(me),null;case 4:return Sr(),null;case 10:return ml(t.type._context),null;case 22:case 23:return Fl(),null;case 24:return null;default:return null}}var gn=!1,tt=!1,Oh=typeof WeakSet=="function"?WeakSet:Set,F=null;function ur(e,t){var o=e.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(r){xe(e,t,r)}else o.current=null}function Ns(e,t,o){try{o()}catch(r){xe(e,t,r)}}var Jc=!1;function Dh(e,t){if(Ss=Rn,e=jf(),sl(e)){if("selectionStart"in e)var o={start:e.selectionStart,end:e.selectionEnd};else e:{o=(o=e.ownerDocument)&&o.defaultView||window;var r=o.getSelection&&o.getSelection();if(r&&r.rangeCount!==0){o=r.anchorNode;var a=r.anchorOffset,n=r.focusNode;r=r.focusOffset;try{o.nodeType,n.nodeType}catch{o=null;break e}var i=0,s=-1,l=-1,u=0,g=0,m=e,d=null;t:for(;;){for(var _;m!==o||a!==0&&m.nodeType!==3||(s=i+a),m!==n||r!==0&&m.nodeType!==3||(l=i+r),m.nodeType===3&&(i+=m.nodeValue.length),(_=m.firstChild)!==null;)d=m,m=_;for(;;){if(m===e)break t;if(d===o&&++u===a&&(s=i),d===n&&++g===r&&(l=i),(_=m.nextSibling)!==null)break;m=d,d=m.parentNode}m=_}o=s===-1||l===-1?null:{start:s,end:l}}else o=null}o=o||{start:0,end:0}}else o=null;for(ws={focusedElem:e,selectionRange:o},Rn=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,h=y.memoizedState,c=t.stateNode,f=c.getSnapshotBeforeUpdate(t.elementType===t.type?v:Vt(t.type,v),h);c.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(x){xe(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return y=Jc,Jc=!1,y}function ra(e,t,o){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var n=a.destroy;a.destroy=void 0,n!==void 0&&Ns(t,o,n)}a=a.next}while(a!==r)}}function ni(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var o=t=t.next;do{if((o.tag&e)===e){var r=o.create;o.destroy=r()}o=o.next}while(o!==t)}}function Ts(e){var t=e.ref;if(t!==null){var o=e.stateNode;switch(e.tag){case 5:e=o;break;default:e=o}typeof t=="function"?t(e):t.current=e}}function Wp(e){var t=e.alternate;t!==null&&(e.alternate=null,Wp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Yt],delete t[ha],delete t[As],delete t[_h],delete t[yh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yp(e){return e.tag===5||e.tag===3||e.tag===4}function Zc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Yp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bs(e,t,o){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?o.nodeType===8?o.parentNode.insertBefore(e,t):o.insertBefore(e,t):(o.nodeType===8?(t=o.parentNode,t.insertBefore(e,o)):(t=o,t.appendChild(e)),o=o._reactRootContainer,o!=null||t.onclick!==null||(t.onclick=Vn));else if(r!==4&&(e=e.child,e!==null))for(bs(e,t,o),e=e.sibling;e!==null;)bs(e,t,o),e=e.sibling}function Gs(e,t,o){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?o.insertBefore(e,t):o.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Gs(e,t,o),e=e.sibling;e!==null;)Gs(e,t,o),e=e.sibling}var He=null,Ot=!1;function so(e,t,o){for(o=o.child;o!==null;)Qp(e,t,o),o=o.sibling}function Qp(e,t,o){if(Qt&&typeof Qt.onCommitFiberUnmount=="function")try{Qt.onCommitFiberUnmount(Jn,o)}catch{}switch(o.tag){case 5:tt||ur(o,t);case 6:var r=He,a=Ot;He=null,so(e,t,o),He=r,Ot=a,He!==null&&(Ot?(e=He,o=o.stateNode,e.nodeType===8?e.parentNode.removeChild(o):e.removeChild(o)):He.removeChild(o.stateNode));break;case 18:He!==null&&(Ot?(e=He,o=o.stateNode,e.nodeType===8?Yi(e.parentNode,o):e.nodeType===1&&Yi(e,o),fa(e)):Yi(He,o.stateNode));break;case 4:r=He,a=Ot,He=o.stateNode.containerInfo,Ot=!0,so(e,t,o),He=r,Ot=a;break;case 0:case 11:case 14:case 15:if(!tt&&(r=o.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var n=a,i=n.destroy;n=n.tag,i!==void 0&&(n&2||n&4)&&Ns(o,t,i),a=a.next}while(a!==r)}so(e,t,o);break;case 1:if(!tt&&(ur(o,t),r=o.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=o.memoizedProps,r.state=o.memoizedState,r.componentWillUnmount()}catch(s){xe(o,t,s)}so(e,t,o);break;case 21:so(e,t,o);break;case 22:o.mode&1?(tt=(r=tt)||o.memoizedState!==null,so(e,t,o),tt=r):so(e,t,o);break;default:so(e,t,o)}}function $c(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var o=e.stateNode;o===null&&(o=e.stateNode=new Oh),t.forEach(function(r){var a=Hh.bind(null,e,r);o.has(r)||(o.add(r),r.then(a,a))})}}function It(e,t){var o=t.deletions;if(o!==null)for(var r=0;r<o.length;r++){var a=o[r];try{var n=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:He=s.stateNode,Ot=!1;break e;case 3:He=s.stateNode.containerInfo,Ot=!0;break e;case 4:He=s.stateNode.containerInfo,Ot=!0;break e}s=s.return}if(He===null)throw Error(B(160));Qp(n,i,a),He=null,Ot=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(u){xe(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Hp(t,e),t=t.sibling}function Hp(e,t){var o=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(It(t,e),Lt(e),r&4){try{ra(3,e,e.return),ni(3,e)}catch(v){xe(e,e.return,v)}try{ra(5,e,e.return)}catch(v){xe(e,e.return,v)}}break;case 1:It(t,e),Lt(e),r&512&&o!==null&&ur(o,o.return);break;case 5:if(It(t,e),Lt(e),r&512&&o!==null&&ur(o,o.return),e.flags&32){var a=e.stateNode;try{sa(a,"")}catch(v){xe(e,e.return,v)}}if(r&4&&(a=e.stateNode,a!=null)){var n=e.memoizedProps,i=o!==null?o.memoizedProps:n,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&n.type==="radio"&&n.name!=null&&df(a,n),fs(s,i);var u=fs(s,n);for(i=0;i<l.length;i+=2){var g=l[i],m=l[i+1];g==="style"?_f(a,m):g==="dangerouslySetInnerHTML"?vf(a,m):g==="children"?sa(a,m):Xs(a,g,m,u)}switch(s){case"input":is(a,n);break;case"textarea":gf(a,n);break;case"select":var d=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!n.multiple;var _=n.value;_!=null?fr(a,!!n.multiple,_,!1):d!==!!n.multiple&&(n.defaultValue!=null?fr(a,!!n.multiple,n.defaultValue,!0):fr(a,!!n.multiple,n.multiple?[]:"",!1))}a[ha]=n}catch(v){xe(e,e.return,v)}}break;case 6:if(It(t,e),Lt(e),r&4){if(e.stateNode===null)throw Error(B(162));a=e.stateNode,n=e.memoizedProps;try{a.nodeValue=n}catch(v){xe(e,e.return,v)}}break;case 3:if(It(t,e),Lt(e),r&4&&o!==null&&o.memoizedState.isDehydrated)try{fa(t.containerInfo)}catch(v){xe(e,e.return,v)}break;case 4:It(t,e),Lt(e);break;case 13:It(t,e),Lt(e),a=e.child,a.flags&8192&&(n=a.memoizedState!==null,a.stateNode.isHidden=n,!n||a.alternate!==null&&a.alternate.memoizedState!==null||(Pl=we())),r&4&&$c(e);break;case 22:if(g=o!==null&&o.memoizedState!==null,e.mode&1?(tt=(u=tt)||g,It(t,e),tt=u):It(t,e),Lt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!g&&e.mode&1)for(F=e,g=e.child;g!==null;){for(m=F=g;F!==null;){switch(d=F,_=d.child,d.tag){case 0:case 11:case 14:case 15:ra(4,d,d.return);break;case 1:ur(d,d.return);var y=d.stateNode;if(typeof y.componentWillUnmount=="function"){r=d,o=d.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(v){xe(r,o,v)}}break;case 5:ur(d,d.return);break;case 22:if(d.memoizedState!==null){tf(m);continue}}_!==null?(_.return=d,F=_):tf(m)}g=g.sibling}e:for(g=null,m=e;;){if(m.tag===5){if(g===null){g=m;try{a=m.stateNode,u?(n=a.style,typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"):(s=m.stateNode,l=m.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=xf("display",i))}catch(v){xe(e,e.return,v)}}}else if(m.tag===6){if(g===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(v){xe(e,e.return,v)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;g===m&&(g=null),m=m.return}g===m&&(g=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:It(t,e),Lt(e),r&4&&$c(e);break;case 21:break;default:It(t,e),Lt(e)}}function Lt(e){var t=e.flags;if(t&2){try{e:{for(var o=e.return;o!==null;){if(Yp(o)){var r=o;break e}o=o.return}throw Error(B(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(sa(a,""),r.flags&=-33);var n=Zc(e);Gs(e,n,a);break;case 3:case 4:var i=r.stateNode.containerInfo,s=Zc(e);bs(e,s,i);break;default:throw Error(B(161))}}catch(l){xe(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Nh(e,t,o){F=e,jp(e,t,o)}function jp(e,t,o){for(var r=(e.mode&1)!==0;F!==null;){var a=F,n=a.child;if(a.tag===22&&r){var i=a.memoizedState!==null||gn;if(!i){var s=a.alternate,l=s!==null&&s.memoizedState!==null||tt;s=gn;var u=tt;if(gn=i,(tt=l)&&!u)for(F=a;F!==null;)i=F,l=i.child,i.tag===22&&i.memoizedState!==null?of(a):l!==null?(l.return=i,F=l):of(a);for(;n!==null;)F=n,jp(n,t,o),n=n.sibling;F=a,gn=s,tt=u}ef(e,t,o)}else a.subtreeFlags&8772&&n!==null?(n.return=a,F=n):ef(e,t,o)}}function ef(e){for(;F!==null;){var t=F;if(t.flags&8772){var o=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:tt||ni(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!tt)if(o===null)r.componentDidMount();else{var a=t.elementType===t.type?o.memoizedProps:Vt(t.type,o.memoizedProps);r.componentDidUpdate(a,o.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var n=t.updateQueue;n!==null&&Nc(t,n,r);break;case 3:var i=t.updateQueue;if(i!==null){if(o=null,t.child!==null)switch(t.child.tag){case 5:o=t.child.stateNode;break;case 1:o=t.child.stateNode}Nc(t,i,o)}break;case 5:var s=t.stateNode;if(o===null&&t.flags&4){o=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&o.focus();break;case"img":l.src&&(o.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var g=u.memoizedState;if(g!==null){var m=g.dehydrated;m!==null&&fa(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}tt||t.flags&512&&Ts(t)}catch(d){xe(t,t.return,d)}}if(t===e){F=null;break}if(o=t.sibling,o!==null){o.return=t.return,F=o;break}F=t.return}}function tf(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var o=t.sibling;if(o!==null){o.return=t.return,F=o;break}F=t.return}}function of(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var o=t.return;try{ni(4,t)}catch(l){xe(t,o,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(l){xe(t,a,l)}}var n=t.return;try{Ts(t)}catch(l){xe(t,n,l)}break;case 5:var i=t.return;try{Ts(t)}catch(l){xe(t,i,l)}}}catch(l){xe(t,t.return,l)}if(t===e){F=null;break}var s=t.sibling;if(s!==null){s.return=t.return,F=s;break}F=t.return}}var Th=Math.ceil,Hn=ro.ReactCurrentDispatcher,Al=ro.ReactCurrentOwner,Ft=ro.ReactCurrentBatchConfig,Q=0,be=null,Pe=null,je=0,xt=0,cr=Bo(0),Ie=0,wa=null,Lo=0,ii=0,Bl=0,aa=null,mt=null,Pl=0,Cr=1/0,Xt=null,jn=!1,Ls=null,yo=null,hn=!1,mo=null,Xn=0,na=0,Ws=null,kn=-1,An=0;function ut(){return Q&6?we():kn!==-1?kn:kn=we()}function So(e){return e.mode&1?Q&2&&je!==0?je&-je:wh.transition!==null?(An===0&&(An=Uf()),An):(e=q,e!==0||(e=window.event,e=e===void 0?16:Nf(e.type)),e):1}function Tt(e,t,o,r){if(50<na)throw na=0,Ws=null,Error(B(185));Ca(e,o,r),(!(Q&2)||e!==be)&&(e===be&&(!(Q&2)&&(ii|=o),Ie===4&&fo(e,je)),vt(e,r),o===1&&Q===0&&!(t.mode&1)&&(Cr=we()+500,oi&&Po()))}function vt(e,t){var o=e.callbackNode;kg(e,t);var r=Un(e,e===be?je:0);if(r===0)o!==null&&cc(o),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(o!=null&&cc(o),t===1)e.tag===0?Sh(rf.bind(null,e)):rp(rf.bind(null,e)),vh(function(){!(Q&6)&&Po()}),o=null;else{switch(Rf(r)){case 1:o=$s;break;case 4:o=Ff;break;case 16:o=zn;break;case 536870912:o=zf;break;default:o=zn}o=tm(o,Xp.bind(null,e))}e.callbackPriority=t,e.callbackNode=o}}function Xp(e,t){if(kn=-1,An=0,Q&6)throw Error(B(327));var o=e.callbackNode;if(hr()&&e.callbackNode!==o)return null;var r=Un(e,e===be?je:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Kn(e,r);else{t=r;var a=Q;Q|=2;var n=qp();(be!==e||je!==t)&&(Xt=null,Cr=we()+500,Do(e,t));do try{Lh();break}catch(s){Kp(e,s)}while(!0);pl(),Hn.current=n,Q=a,Pe!==null?t=0:(be=null,je=0,t=Ie)}if(t!==0){if(t===2&&(a=hs(e),a!==0&&(r=a,t=Ys(e,a))),t===1)throw o=wa,Do(e,0),fo(e,r),vt(e,we()),o;if(t===6)fo(e,r);else{if(a=e.current.alternate,!(r&30)&&!bh(a)&&(t=Kn(e,r),t===2&&(n=hs(e),n!==0&&(r=n,t=Ys(e,n))),t===1))throw o=wa,Do(e,0),fo(e,r),vt(e,we()),o;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(B(345));case 2:Mo(e,mt,Xt);break;case 3:if(fo(e,r),(r&130023424)===r&&(t=Pl+500-we(),10<t)){if(Un(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){ut(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ks(Mo.bind(null,e,mt,Xt),t);break}Mo(e,mt,Xt);break;case 4:if(fo(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var i=31-Nt(r);n=1<<i,i=t[i],i>a&&(a=i),r&=~n}if(r=a,r=we()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Th(r/1960))-r,10<r){e.timeoutHandle=ks(Mo.bind(null,e,mt,Xt),r);break}Mo(e,mt,Xt);break;case 5:Mo(e,mt,Xt);break;default:throw Error(B(329))}}}return vt(e,we()),e.callbackNode===o?Xp.bind(null,e):null}function Ys(e,t){var o=aa;return e.current.memoizedState.isDehydrated&&(Do(e,t).flags|=256),e=Kn(e,t),e!==2&&(t=mt,mt=o,t!==null&&Qs(t)),e}function Qs(e){mt===null?mt=e:mt.push.apply(mt,e)}function bh(e){for(var t=e;;){if(t.flags&16384){var o=t.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var r=0;r<o.length;r++){var a=o[r],n=a.getSnapshot;a=a.value;try{if(!bt(n(),a))return!1}catch{return!1}}}if(o=t.child,t.subtreeFlags&16384&&o!==null)o.return=t,t=o;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function fo(e,t){for(t&=~Bl,t&=~ii,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var o=31-Nt(t),r=1<<o;e[o]=-1,t&=~r}}function rf(e){if(Q&6)throw Error(B(327));hr();var t=Un(e,0);if(!(t&1))return vt(e,we()),null;var o=Kn(e,t);if(e.tag!==0&&o===2){var r=hs(e);r!==0&&(t=r,o=Ys(e,r))}if(o===1)throw o=wa,Do(e,0),fo(e,t),vt(e,we()),o;if(o===6)throw Error(B(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Mo(e,mt,Xt),vt(e,we()),null}function El(e,t){var o=Q;Q|=1;try{return e(t)}finally{Q=o,Q===0&&(Cr=we()+500,oi&&Po())}}function Wo(e){mo!==null&&mo.tag===0&&!(Q&6)&&hr();var t=Q;Q|=1;var o=Ft.transition,r=q;try{if(Ft.transition=null,q=1,e)return e()}finally{q=r,Ft.transition=o,Q=t,!(Q&6)&&Po()}}function Fl(){xt=cr.current,re(cr)}function Do(e,t){e.finishedWork=null,e.finishedLanes=0;var o=e.timeoutHandle;if(o!==-1&&(e.timeoutHandle=-1,hh(o)),Pe!==null)for(o=Pe.return;o!==null;){var r=o;switch(ul(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&On();break;case 3:Sr(),re(gt),re(ot),xl();break;case 5:vl(r);break;case 4:Sr();break;case 13:re(me);break;case 19:re(me);break;case 10:ml(r.type._context);break;case 22:case 23:Fl()}o=o.return}if(be=e,Pe=e=wo(e.current,null),je=xt=t,Ie=0,wa=null,Bl=ii=Lo=0,mt=aa=null,Vo!==null){for(t=0;t<Vo.length;t++)if(o=Vo[t],r=o.interleaved,r!==null){o.interleaved=null;var a=r.next,n=o.pending;if(n!==null){var i=n.next;n.next=a,r.next=i}o.pending=r}Vo=null}return e}function Kp(e,t){do{var o=Pe;try{if(pl(),Sn.current=Qn,Yn){for(var r=de.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Yn=!1}if(Go=0,Te=Me=de=null,oa=!1,_a=0,Al.current=null,o===null||o.return===null){Ie=1,wa=t,Pe=null;break}e:{var n=e,i=o.return,s=o,l=t;if(t=je,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,g=s,m=g.tag;if(!(g.mode&1)&&(m===0||m===11||m===15)){var d=g.alternate;d?(g.updateQueue=d.updateQueue,g.memoizedState=d.memoizedState,g.lanes=d.lanes):(g.updateQueue=null,g.memoizedState=null)}var _=Yc(i);if(_!==null){_.flags&=-257,Qc(_,i,s,n,t),_.mode&1&&Wc(n,u,t),t=_,l=u;var y=t.updateQueue;if(y===null){var v=new Set;v.add(l),t.updateQueue=v}else y.add(l);break e}else{if(!(t&1)){Wc(n,u,t),zl();break e}l=Error(B(426))}}else if(ie&&s.mode&1){var h=Yc(i);if(h!==null){!(h.flags&65536)&&(h.flags|=256),Qc(h,i,s,n,t),cl(wr(l,s));break e}}n=l=wr(l,s),Ie!==4&&(Ie=2),aa===null?aa=[n]:aa.push(n),n=i;do{switch(n.tag){case 3:n.flags|=65536,t&=-t,n.lanes|=t;var c=Rp(n,l,t);Dc(n,c);break e;case 1:s=l;var f=n.type,p=n.stateNode;if(!(n.flags&128)&&(typeof f.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(yo===null||!yo.has(p)))){n.flags|=65536,t&=-t,n.lanes|=t;var x=Mp(n,s,t);Dc(n,x);break e}}n=n.return}while(n!==null)}Zp(o)}catch(S){t=S,Pe===o&&o!==null&&(Pe=o=o.return);continue}break}while(!0)}function qp(){var e=Hn.current;return Hn.current=Qn,e===null?Qn:e}function zl(){(Ie===0||Ie===3||Ie===2)&&(Ie=4),be===null||!(Lo&268435455)&&!(ii&268435455)||fo(be,je)}function Kn(e,t){var o=Q;Q|=2;var r=qp();(be!==e||je!==t)&&(Xt=null,Do(e,t));do try{Gh();break}catch(a){Kp(e,a)}while(!0);if(pl(),Q=o,Hn.current=r,Pe!==null)throw Error(B(261));return be=null,je=0,Ie}function Gh(){for(;Pe!==null;)Jp(Pe)}function Lh(){for(;Pe!==null&&!gg();)Jp(Pe)}function Jp(e){var t=em(e.alternate,e,xt);e.memoizedProps=e.pendingProps,t===null?Zp(e):Pe=t,Al.current=null}function Zp(e){var t=e;do{var o=t.alternate;if(e=t.return,t.flags&32768){if(o=Vh(o,t),o!==null){o.flags&=32767,Pe=o;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ie=6,Pe=null;return}}else if(o=Ih(o,t,xt),o!==null){Pe=o;return}if(t=t.sibling,t!==null){Pe=t;return}Pe=t=e}while(t!==null);Ie===0&&(Ie=5)}function Mo(e,t,o){var r=q,a=Ft.transition;try{Ft.transition=null,q=1,Wh(e,t,o,r)}finally{Ft.transition=a,q=r}return null}function Wh(e,t,o,r){do hr();while(mo!==null);if(Q&6)throw Error(B(327));o=e.finishedWork;var a=e.finishedLanes;if(o===null)return null;if(e.finishedWork=null,e.finishedLanes=0,o===e.current)throw Error(B(177));e.callbackNode=null,e.callbackPriority=0;var n=o.lanes|o.childLanes;if(Ag(e,n),e===be&&(Pe=be=null,je=0),!(o.subtreeFlags&2064)&&!(o.flags&2064)||hn||(hn=!0,tm(zn,function(){return hr(),null})),n=(o.flags&15990)!==0,o.subtreeFlags&15990||n){n=Ft.transition,Ft.transition=null;var i=q;q=1;var s=Q;Q|=4,Al.current=null,Dh(e,o),Hp(o,e),fh(ws),Rn=!!Ss,ws=Ss=null,e.current=o,Nh(o,e,a),hg(),Q=s,q=i,Ft.transition=n}else e.current=o;if(hn&&(hn=!1,mo=e,Xn=a),n=e.pendingLanes,n===0&&(yo=null),_g(o.stateNode,r),vt(e,we()),t!==null)for(r=e.onRecoverableError,o=0;o<t.length;o++)a=t[o],r(a.value,{componentStack:a.stack,digest:a.digest});if(jn)throw jn=!1,e=Ls,Ls=null,e;return Xn&1&&e.tag!==0&&hr(),n=e.pendingLanes,n&1?e===Ws?na++:(na=0,Ws=e):na=0,Po(),null}function hr(){if(mo!==null){var e=Rf(Xn),t=Ft.transition,o=q;try{if(Ft.transition=null,q=16>e?16:e,mo===null)var r=!1;else{if(e=mo,mo=null,Xn=0,Q&6)throw Error(B(331));var a=Q;for(Q|=4,F=e.current;F!==null;){var n=F,i=n.child;if(F.flags&16){var s=n.deletions;if(s!==null){for(var l=0;l<s.length;l++){var u=s[l];for(F=u;F!==null;){var g=F;switch(g.tag){case 0:case 11:case 15:ra(8,g,n)}var m=g.child;if(m!==null)m.return=g,F=m;else for(;F!==null;){g=F;var d=g.sibling,_=g.return;if(Wp(g),g===u){F=null;break}if(d!==null){d.return=_,F=d;break}F=_}}}var y=n.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var h=v.sibling;v.sibling=null,v=h}while(v!==null)}}F=n}}if(n.subtreeFlags&2064&&i!==null)i.return=n,F=i;else e:for(;F!==null;){if(n=F,n.flags&2048)switch(n.tag){case 0:case 11:case 15:ra(9,n,n.return)}var c=n.sibling;if(c!==null){c.return=n.return,F=c;break e}F=n.return}}var f=e.current;for(F=f;F!==null;){i=F;var p=i.child;if(i.subtreeFlags&2064&&p!==null)p.return=i,F=p;else e:for(i=f;F!==null;){if(s=F,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:ni(9,s)}}catch(S){xe(s,s.return,S)}if(s===i){F=null;break e}var x=s.sibling;if(x!==null){x.return=s.return,F=x;break e}F=s.return}}if(Q=a,Po(),Qt&&typeof Qt.onPostCommitFiberRoot=="function")try{Qt.onPostCommitFiberRoot(Jn,e)}catch{}r=!0}return r}finally{q=o,Ft.transition=t}}return!1}function af(e,t,o){t=wr(o,t),t=Rp(e,t,1),e=_o(e,t,1),t=ut(),e!==null&&(Ca(e,1,t),vt(e,t))}function xe(e,t,o){if(e.tag===3)af(e,e,o);else for(;t!==null;){if(t.tag===3){af(t,e,o);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(yo===null||!yo.has(r))){e=wr(o,e),e=Mp(t,e,1),t=_o(t,e,1),e=ut(),t!==null&&(Ca(t,1,e),vt(t,e));break}}t=t.return}}function Yh(e,t,o){var r=e.pingCache;r!==null&&r.delete(t),t=ut(),e.pingedLanes|=e.suspendedLanes&o,be===e&&(je&o)===o&&(Ie===4||Ie===3&&(je&130023424)===je&&500>we()-Pl?Do(e,0):Bl|=o),vt(e,t)}function $p(e,t){t===0&&(e.mode&1?(t=tn,tn<<=1,!(tn&130023424)&&(tn=4194304)):t=1);var o=ut();e=to(e,t),e!==null&&(Ca(e,t,o),vt(e,o))}function Qh(e){var t=e.memoizedState,o=0;t!==null&&(o=t.retryLane),$p(e,o)}function Hh(e,t){var o=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(o=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(t),$p(e,o)}var em;em=function(e,t,o){if(e!==null)if(e.memoizedProps!==t.pendingProps||gt.current)dt=!0;else{if(!(e.lanes&o)&&!(t.flags&128))return dt=!1,Mh(e,t,o);dt=!!(e.flags&131072)}else dt=!1,ie&&t.flags&1048576&&ap(t,Tn,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Cn(e,t),e=t.pendingProps;var a=xr(t,ot.current);gr(t,o),a=yl(null,t,r,e,a,o);var n=Sl();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ht(r)?(n=!0,Dn(t)):n=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,gl(t),a.updater=ai,t.stateNode=a,a._reactInternals=t,Us(t,r,e,o),t=Is(null,t,r,!0,n,o)):(t.tag=0,ie&&n&&ll(t),lt(null,t,a,o),t=t.child),t;case 16:r=t.elementType;e:{switch(Cn(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Xh(r),e=Vt(r,e),a){case 0:t=Ms(null,t,r,e,o);break e;case 1:t=Xc(null,t,r,e,o);break e;case 11:t=Hc(null,t,r,e,o);break e;case 14:t=jc(null,t,r,Vt(r.type,e),o);break e}throw Error(B(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Vt(r,a),Ms(e,t,r,a,o);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Vt(r,a),Xc(e,t,r,a,o);case 3:e:{if(Dp(t),e===null)throw Error(B(387));r=t.pendingProps,n=t.memoizedState,a=n.element,cp(e,t),Ln(t,r,null,o);var i=t.memoizedState;if(r=i.element,n.isDehydrated)if(n={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=n,t.memoizedState=n,t.flags&256){a=wr(Error(B(423)),t),t=Kc(e,t,r,o,a);break e}else if(r!==a){a=wr(Error(B(424)),t),t=Kc(e,t,r,o,a);break e}else for(_t=xo(t.stateNode.containerInfo.firstChild),yt=t,ie=!0,Dt=null,o=lp(t,null,r,o),t.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(_r(),r===a){t=oo(e,t,o);break e}lt(e,t,r,o)}t=t.child}return t;case 5:return fp(t),e===null&&Es(t),r=t.type,a=t.pendingProps,n=e!==null?e.memoizedProps:null,i=a.children,Cs(r,a)?i=null:n!==null&&Cs(r,n)&&(t.flags|=32),Op(e,t),lt(e,t,i,o),t.child;case 6:return e===null&&Es(t),null;case 13:return Np(e,t,o);case 4:return hl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=yr(t,null,r,o):lt(e,t,r,o),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Vt(r,a),Hc(e,t,r,a,o);case 7:return lt(e,t,t.pendingProps,o),t.child;case 8:return lt(e,t,t.pendingProps.children,o),t.child;case 12:return lt(e,t,t.pendingProps.children,o),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,n=t.memoizedProps,i=a.value,te(bn,r._currentValue),r._currentValue=i,n!==null)if(bt(n.value,i)){if(n.children===a.children&&!gt.current){t=oo(e,t,o);break e}}else for(n=t.child,n!==null&&(n.return=t);n!==null;){var s=n.dependencies;if(s!==null){i=n.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(n.tag===1){l=Zt(-1,o&-o),l.tag=2;var u=n.updateQueue;if(u!==null){u=u.shared;var g=u.pending;g===null?l.next=l:(l.next=g.next,g.next=l),u.pending=l}}n.lanes|=o,l=n.alternate,l!==null&&(l.lanes|=o),Fs(n.return,o,t),s.lanes|=o;break}l=l.next}}else if(n.tag===10)i=n.type===t.type?null:n.child;else if(n.tag===18){if(i=n.return,i===null)throw Error(B(341));i.lanes|=o,s=i.alternate,s!==null&&(s.lanes|=o),Fs(i,o,t),i=n.sibling}else i=n.child;if(i!==null)i.return=n;else for(i=n;i!==null;){if(i===t){i=null;break}if(n=i.sibling,n!==null){n.return=i.return,i=n;break}i=i.return}n=i}lt(e,t,a.children,o),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,gr(t,o),a=zt(a),r=r(a),t.flags|=1,lt(e,t,r,o),t.child;case 14:return r=t.type,a=Vt(r,t.pendingProps),a=Vt(r.type,a),jc(e,t,r,a,o);case 15:return Ip(e,t,t.type,t.pendingProps,o);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Vt(r,a),Cn(e,t),t.tag=1,ht(r)?(e=!0,Dn(t)):e=!1,gr(t,o),Up(t,r,a),Us(t,r,a,o),Is(null,t,r,!0,e,o);case 19:return Tp(e,t,o);case 22:return Vp(e,t,o)}throw Error(B(156,t.tag))};function tm(e,t){return Ef(e,t)}function jh(e,t,o,r){this.tag=e,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Et(e,t,o,r){return new jh(e,t,o,r)}function Ul(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xh(e){if(typeof e=="function")return Ul(e)?1:0;if(e!=null){if(e=e.$$typeof,e===qs)return 11;if(e===Js)return 14}return 2}function wo(e,t){var o=e.alternate;return o===null?(o=Et(e.tag,t,e.key,e.mode),o.elementType=e.elementType,o.type=e.type,o.stateNode=e.stateNode,o.alternate=e,e.alternate=o):(o.pendingProps=t,o.type=e.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=e.flags&14680064,o.childLanes=e.childLanes,o.lanes=e.lanes,o.child=e.child,o.memoizedProps=e.memoizedProps,o.memoizedState=e.memoizedState,o.updateQueue=e.updateQueue,t=e.dependencies,o.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},o.sibling=e.sibling,o.index=e.index,o.ref=e.ref,o}function Bn(e,t,o,r,a,n){var i=2;if(r=e,typeof e=="function")Ul(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case er:return No(o.children,a,n,t);case Ks:i=8,a|=8;break;case ts:return e=Et(12,o,t,a|2),e.elementType=ts,e.lanes=n,e;case os:return e=Et(13,o,t,a),e.elementType=os,e.lanes=n,e;case rs:return e=Et(19,o,t,a),e.elementType=rs,e.lanes=n,e;case ff:return si(o,a,n,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case uf:i=10;break e;case cf:i=9;break e;case qs:i=11;break e;case Js:i=14;break e;case lo:i=16,r=null;break e}throw Error(B(130,e==null?e:typeof e,""))}return t=Et(i,o,t,a),t.elementType=e,t.type=r,t.lanes=n,t}function No(e,t,o,r){return e=Et(7,e,r,t),e.lanes=o,e}function si(e,t,o,r){return e=Et(22,e,r,t),e.elementType=ff,e.lanes=o,e.stateNode={isHidden:!1},e}function Zi(e,t,o){return e=Et(6,e,null,t),e.lanes=o,e}function $i(e,t,o){return t=Et(4,e.children!==null?e.children:[],e.key,t),t.lanes=o,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Kh(e,t,o,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oi(0),this.expirationTimes=Oi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oi(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Rl(e,t,o,r,a,n,i,s,l){return e=new Kh(e,t,o,s,l),t===1?(t=1,n===!0&&(t|=8)):t=0,n=Et(3,null,null,t),e.current=n,n.stateNode=e,n.memoizedState={element:r,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},gl(n),e}function qh(e,t,o){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:$o,key:r==null?null:""+r,children:e,containerInfo:t,implementation:o}}function om(e){if(!e)return ko;e=e._reactInternals;e:{if(Qo(e)!==e||e.tag!==1)throw Error(B(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ht(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(B(171))}if(e.tag===1){var o=e.type;if(ht(o))return op(e,o,t)}return t}function rm(e,t,o,r,a,n,i,s,l){return e=Rl(o,r,!0,e,a,n,i,s,l),e.context=om(null),o=e.current,r=ut(),a=So(o),n=Zt(r,a),n.callback=t??null,_o(o,n,a),e.current.lanes=a,Ca(e,a,r),vt(e,r),e}function li(e,t,o,r){var a=t.current,n=ut(),i=So(a);return o=om(o),t.context===null?t.context=o:t.pendingContext=o,t=Zt(n,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=_o(a,t,i),e!==null&&(Tt(e,a,i,n),yn(e,a,i)),i}function qn(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function nf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var o=e.retryLane;e.retryLane=o!==0&&o<t?o:t}}function Ml(e,t){nf(e,t),(e=e.alternate)&&nf(e,t)}function Jh(){return null}var am=typeof reportError=="function"?reportError:function(e){console.error(e)};function Il(e){this._internalRoot=e}ui.prototype.render=Il.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(B(409));li(e,t,null,null)};ui.prototype.unmount=Il.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Wo(function(){li(null,e,null,null)}),t[eo]=null}};function ui(e){this._internalRoot=e}ui.prototype.unstable_scheduleHydration=function(e){if(e){var t=Vf();e={blockedOn:null,target:e,priority:t};for(var o=0;o<co.length&&t!==0&&t<co[o].priority;o++);co.splice(o,0,e),o===0&&Df(e)}};function Vl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ci(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function sf(){}function Zh(e,t,o,r,a){if(a){if(typeof r=="function"){var n=r;r=function(){var u=qn(i);n.call(u)}}var i=rm(t,r,e,0,null,!1,!1,"",sf);return e._reactRootContainer=i,e[eo]=i.current,da(e.nodeType===8?e.parentNode:e),Wo(),i}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var u=qn(l);s.call(u)}}var l=Rl(e,0,!1,null,null,!1,!1,"",sf);return e._reactRootContainer=l,e[eo]=l.current,da(e.nodeType===8?e.parentNode:e),Wo(function(){li(t,l,o,r)}),l}function fi(e,t,o,r,a){var n=o._reactRootContainer;if(n){var i=n;if(typeof a=="function"){var s=a;a=function(){var l=qn(i);s.call(l)}}li(t,i,e,a)}else i=Zh(o,t,e,a,r);return qn(i)}Mf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var o=Kr(t.pendingLanes);o!==0&&(el(t,o|1),vt(t,we()),!(Q&6)&&(Cr=we()+500,Po()))}break;case 13:Wo(function(){var r=to(e,1);if(r!==null){var a=ut();Tt(r,e,1,a)}}),Ml(e,1)}};tl=function(e){if(e.tag===13){var t=to(e,134217728);if(t!==null){var o=ut();Tt(t,e,134217728,o)}Ml(e,134217728)}};If=function(e){if(e.tag===13){var t=So(e),o=to(e,t);if(o!==null){var r=ut();Tt(o,e,t,r)}Ml(e,t)}};Vf=function(){return q};Of=function(e,t){var o=q;try{return q=e,t()}finally{q=o}};ms=function(e,t,o){switch(t){case"input":if(is(e,o),t=o.name,o.type==="radio"&&t!=null){for(o=e;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<o.length;t++){var r=o[t];if(r!==e&&r.form===e.form){var a=ti(r);if(!a)throw Error(B(90));mf(r),is(r,a)}}}break;case"textarea":gf(e,o);break;case"select":t=o.value,t!=null&&fr(e,!!o.multiple,t,!1)}};wf=El;Cf=Wo;var $h={usingClientEntryPoint:!1,Events:[Aa,ar,ti,yf,Sf,El]},Qr={findFiberByHostInstance:Io,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ev={bundleType:Qr.bundleType,version:Qr.version,rendererPackageName:Qr.rendererPackageName,rendererConfig:Qr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ro.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Bf(e),e===null?null:e.stateNode},findFiberByHostInstance:Qr.findFiberByHostInstance||Jh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Hr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Hr.isDisabled&&Hr.supportsFiber))try{Jn=Hr.inject(ev),Qt=Hr}catch{}var Hr;Ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$h;Ct.createPortal=function(e,t){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vl(t))throw Error(B(200));return qh(e,t,null,o)};Ct.createRoot=function(e,t){if(!Vl(e))throw Error(B(299));var o=!1,r="",a=am;return t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Rl(e,1,!1,null,null,o,!1,r,a),e[eo]=t.current,da(e.nodeType===8?e.parentNode:e),new Il(t)};Ct.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(B(188)):(e=Object.keys(e).join(","),Error(B(268,e)));return e=Bf(t),e=e===null?null:e.stateNode,e};Ct.flushSync=function(e){return Wo(e)};Ct.hydrate=function(e,t,o){if(!ci(t))throw Error(B(200));return fi(null,e,t,!0,o)};Ct.hydrateRoot=function(e,t,o){if(!Vl(e))throw Error(B(405));var r=o!=null&&o.hydratedSources||null,a=!1,n="",i=am;if(o!=null&&(o.unstable_strictMode===!0&&(a=!0),o.identifierPrefix!==void 0&&(n=o.identifierPrefix),o.onRecoverableError!==void 0&&(i=o.onRecoverableError)),t=rm(t,null,e,1,o??null,a,!1,n,i),e[eo]=t.current,da(e),r)for(e=0;e<r.length;e++)o=r[e],a=o._getVersion,a=a(o._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[o,a]:t.mutableSourceEagerHydrationData.push(o,a);return new ui(t)};Ct.render=function(e,t,o){if(!ci(t))throw Error(B(200));return fi(null,e,t,!1,o)};Ct.unmountComponentAtNode=function(e){if(!ci(e))throw Error(B(40));return e._reactRootContainer?(Wo(function(){fi(null,null,e,!1,function(){e._reactRootContainer=null,e[eo]=null})}),!0):!1};Ct.unstable_batchedUpdates=El;Ct.unstable_renderSubtreeIntoContainer=function(e,t,o,r){if(!ci(o))throw Error(B(200));if(e==null||e._reactInternals===void 0)throw Error(B(38));return fi(e,t,o,!1,r)};Ct.version="18.3.1-next-f1338f8080-20240426"});var lm=jt((dx,sm)=>{"use strict";function im(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(im)}catch(e){console.error(e)}}im(),sm.exports=nm()});var cm=jt(Ol=>{"use strict";var um=lm();Ol.createRoot=um.createRoot,Ol.hydrateRoot=um.hydrateRoot;var gx});var xm=jt(hi=>{"use strict";var dv=W(),gv=Symbol.for("react.element"),hv=Symbol.for("react.fragment"),vv=Object.prototype.hasOwnProperty,xv=dv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_v={key:!0,ref:!0,__self:!0,__source:!0};function vm(e,t,o){var r,a={},n=null,i=null;o!==void 0&&(n=""+o),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)vv.call(t,r)&&!_v.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:gv,type:e,key:n,ref:i,props:a,_owner:xv.current}}hi.Fragment=hv;hi.jsx=vm;hi.jsxs=vm});var X=jt((m2,_m)=>{"use strict";_m.exports=xm()});var pw=z(W(),1),ix=z(cm(),1);var E0={};O0(E0,{ColorPanels:()=>Td,Dithering:()=>Pd,DotGrid:()=>Gm,DotOrbit:()=>Dm,FlutedGlass:()=>t0,GemSmoke:()=>P0,GodRays:()=>gd,GrainGradient:()=>Ud,HalftoneCmyk:()=>k0,HalftoneDots:()=>y0,Heatmap:()=>m0,ImageDithering:()=>u0,LiquidMetal:()=>h0,MeshGradient:()=>Am,Metaballs:()=>Km,NeuroNoise:()=>Mm,PaperTexture:()=>Jd,PerlinNoise:()=>rd,PulsingBorder:()=>Vd,ShaderMount:()=>U,SimplexNoise:()=>Qm,SmokeRing:()=>Fm,Spiral:()=>_d,StaticMeshGradient:()=>Wd,StaticRadialGradient:()=>jd,Swirl:()=>Cd,Voronoi:()=>sd,Warp:()=>fd,Water:()=>n0,Waves:()=>$m,colorPanelsMeta:()=>zr,colorPanelsPresets:()=>Nd,ditheringPresets:()=>Bd,dotGridPresets:()=>bm,dotOrbitMeta:()=>Fa,dotOrbitPresets:()=>Om,flutedGlassPresets:()=>e0,gemSmokePresets:()=>B0,getShaderColorFromString:()=>A,godRaysMeta:()=>Ma,godRaysPresets:()=>dd,grainGradientMeta:()=>Oa,grainGradientPresets:()=>zd,halftoneCmykPresets:()=>C0,halftoneDotsPresets:()=>_0,heatmapMeta:()=>Ta,heatmapPresets:()=>p0,imageDitheringPresets:()=>l0,isPaperShaderElement:()=>Dl,liquidMetalPresets:()=>g0,meshGradientMeta:()=>Ea,meshGradientPresets:()=>km,metaballsMeta:()=>Er,metaballsPresets:()=>Xm,neuroNoisePresets:()=>Rm,paperTexturePresets:()=>qd,perlinNoisePresets:()=>od,pulsingBorderMeta:()=>Fr,pulsingBorderPresets:()=>Id,simplexNoiseMeta:()=>za,simplexNoisePresets:()=>Ym,smokeRingMeta:()=>Pr,smokeRingPresets:()=>Em,spiralPresets:()=>xd,staticMeshGradientMeta:()=>Da,staticMeshGradientPresets:()=>Ld,staticRadialGradientMeta:()=>Na,staticRadialGradientPresets:()=>Hd,swirlMeta:()=>Ia,swirlPresets:()=>wd,voronoiMeta:()=>Ua,voronoiPresets:()=>id,warpMeta:()=>Ra,warpPresets:()=>cd,waterPresets:()=>a0,wavesPresets:()=>Zm});var ft=z(W(),1);var fm=`#version 300 es
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
}`;var pm=1920*1080*4,Pa=class{constructor(t,o,r,a,n=0,i=0,s=2,l=pm,u=[]){O(this,"parentElement");O(this,"canvasElement");O(this,"gl");O(this,"program",null);O(this,"uniformLocations",{});O(this,"fragmentShader");O(this,"rafId",null);O(this,"lastRenderTime",0);O(this,"currentFrame",0);O(this,"speed",0);O(this,"currentSpeed",0);O(this,"providedUniforms");O(this,"mipmaps",[]);O(this,"hasBeenDisposed",!1);O(this,"resolutionChanged",!0);O(this,"textures",new Map);O(this,"minPixelRatio");O(this,"maxPixelCount");O(this,"isSafari",rv());O(this,"uniformCache",{});O(this,"textureUnitMap",new Map);O(this,"ownerDocument");O(this,"initProgram",()=>{let t=tv(this.gl,fm,this.fragmentShader);t&&(this.program=t)});O(this,"setupPositionAttribute",()=>{let t=this.gl.getAttribLocation(this.program,"a_position"),o=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0)});O(this,"setupUniforms",()=>{let t={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([o,r])=>{if(t[o]=this.gl.getUniformLocation(this.program,o),r instanceof HTMLImageElement){let a=`${o}AspectRatio`;t[a]=this.gl.getUniformLocation(this.program,a)}}),this.uniformLocations=t});O(this,"renderScale",1);O(this,"parentWidth",0);O(this,"parentHeight",0);O(this,"parentDevicePixelWidth",0);O(this,"parentDevicePixelHeight",0);O(this,"devicePixelsSupported",!1);O(this,"resizeObserver",null);O(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([t])=>{if(t?.borderBoxSize[0]){let o=t.devicePixelContentBoxSize?.[0];o!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=o.inlineSize,this.parentDevicePixelHeight=o.blockSize),this.parentWidth=t.borderBoxSize[0].inlineSize,this.parentHeight=t.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});O(this,"handleVisualViewportChange",()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()});O(this,"handleResize",()=>{let t=0,o=0,r=Math.max(1,window.devicePixelRatio),a=visualViewport?.scale??1;if(this.devicePixelsSupported){let g=Math.max(1,this.minPixelRatio/r);t=this.parentDevicePixelWidth*g*a,o=this.parentDevicePixelHeight*g*a}else{let g=Math.max(r,this.minPixelRatio)*a;if(this.isSafari){let m=av(this.ownerDocument);g*=Math.max(1,m)}t=Math.round(this.parentWidth)*g,o=Math.round(this.parentHeight)*g}let n=Math.sqrt(this.maxPixelCount)/Math.sqrt(t*o),i=Math.min(1,n),s=Math.round(t*i),l=Math.round(o*i),u=s/Math.round(this.parentWidth);(this.canvasElement.width!==s||this.canvasElement.height!==l||this.renderScale!==u)&&(this.renderScale=u,this.canvasElement.width=s,this.canvasElement.height=l,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});O(this,"render",t=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let o=t-this.lastRenderTime;this.lastRenderTime=t,this.currentSpeed!==0&&(this.currentFrame+=o*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});O(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});O(this,"setTextureUniform",(t,o)=>{if(!o.complete||o.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${t} must be fully loaded`);let r=this.textures.get(t);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(t)||this.textureUnitMap.set(t,this.textureUnitMap.size);let a=this.textureUnitMap.get(t);this.gl.activeTexture(this.gl.TEXTURE0+a);let n=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o),this.mipmaps.includes(t)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let i=this.gl.getError();if(i!==this.gl.NO_ERROR||n===null){console.error("Paper Shaders: WebGL error when uploading texture:",i);return}this.textures.set(t,n);let s=this.uniformLocations[t];if(s){this.gl.uniform1i(s,a);let l=`${t}AspectRatio`,u=this.uniformLocations[l];if(u){let g=o.naturalWidth/o.naturalHeight;this.gl.uniform1f(u,g)}}});O(this,"areUniformValuesEqual",(t,o)=>t===o?!0:Array.isArray(t)&&Array.isArray(o)&&t.length===o.length?t.every((r,a)=>this.areUniformValuesEqual(r,o[a])):!1);O(this,"setUniformValues",t=>{this.gl.useProgram(this.program),Object.entries(t).forEach(([o,r])=>{let a=r;if(r instanceof HTMLImageElement&&(a=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[o],a))return;this.uniformCache[o]=a;let n=this.uniformLocations[o];if(!n){console.warn(`Uniform location for ${o} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(o,r);else if(Array.isArray(r)){let i=null,s=null;if(r[0]!==void 0&&Array.isArray(r[0])){let l=r[0].length;if(r.every(u=>u.length===l))i=r.flat(),s=l;else{console.warn(`All child arrays must be the same length for ${o}`);return}}else i=r,s=i.length;switch(s){case 2:this.gl.uniform2fv(n,i);break;case 3:this.gl.uniform3fv(n,i);break;case 4:this.gl.uniform4fv(n,i);break;case 9:this.gl.uniformMatrix3fv(n,!1,i);break;case 16:this.gl.uniformMatrix4fv(n,!1,i);break;default:console.warn(`Unsupported uniform array length: ${s}`)}}else typeof r=="number"?this.gl.uniform1f(n,r):typeof r=="boolean"?this.gl.uniform1i(n,r?1:0):console.warn(`Unsupported uniform type for ${o}: ${typeof r}`)})});O(this,"getCurrentFrame",()=>this.currentFrame);O(this,"setFrame",t=>{this.currentFrame=t,this.lastRenderTime=performance.now(),this.render(performance.now())});O(this,"setSpeed",(t=1)=>{this.speed=t,this.setCurrentSpeed(this.ownerDocument.hidden?0:t)});O(this,"setCurrentSpeed",t=>{this.currentSpeed=t,this.rafId===null&&t!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&t===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});O(this,"setMaxPixelCount",(t=pm)=>{this.maxPixelCount=t,this.handleResize()});O(this,"setMinPixelRatio",(t=2)=>{this.minPixelRatio=t,this.handleResize()});O(this,"setUniforms",t=>{this.setUniformValues(t),this.providedUniforms={...this.providedUniforms,...t},this.render(performance.now())});O(this,"handleDocumentVisibilityChange",()=>{this.setCurrentSpeed(this.ownerDocument.hidden?0:this.speed)});O(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(t=>{this.gl.deleteTexture(t)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if(t?.nodeType===1)this.parentElement=t;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=t.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let d=this.ownerDocument.createElement("style");d.innerHTML=ov,d.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(d)}let g=this.ownerDocument.createElement("canvas");this.canvasElement=g,this.parentElement.prepend(g),this.fragmentShader=o,this.providedUniforms=r,this.mipmaps=u,this.currentFrame=i,this.minPixelRatio=s,this.maxPixelCount=l;let m=g.getContext("webgl2",a);if(!m)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=m,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(n),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function mm(e,t,o){let r=e.createShader(t);return r?(e.shaderSource(r,o),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function tv(e,t,o){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),a=r?r.precision:null;a&&a<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),o=o.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let n=mm(e,e.VERTEX_SHADER,t),i=mm(e,e.FRAGMENT_SHADER,o);if(!n||!i)return null;let s=e.createProgram();return s?(e.attachShader(s,n),e.attachShader(s,i),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,n),e.detachShader(s,i),e.deleteShader(n),e.deleteShader(i),s):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(n),e.deleteShader(i),null)):null}var ov=`@layer paper-shaders {
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
}`;function Dl(e){return"paperShaderMount"in e}function rv(){let e=navigator.userAgent.toLowerCase();return e.includes("safari")&&!e.includes("chrome")&&!e.includes("android")}function av(e){let t=visualViewport?.scale??1,o=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,a=t*o+r,n=outerWidth/a,i=Math.round(100*n);return i%5===0?i/100:i===33?1/3:i===67?2/3:i===133?4/3:n}var k={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},M={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},R={none:0,contain:1,cover:2};var V=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,K=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,Eo=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,rt=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var Rt=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,Br=`
  vec2 randomGB(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).gb;
  }
`,se=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,at=`
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
`,dm=`
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
`;var Ea={maxColorCount:10},Nl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${Ea.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${V}
${K}
${rt}

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

  for (int i = 0; i < ${Ea.maxColorCount}; i++) {
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
`;var Pr={maxColorCount:10,maxNoiseIterations:8},Tl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Pr.maxColorCount}];
uniform float u_colorsCount;

uniform float u_thickness;
uniform float u_radius;
uniform float u_innerShape;
uniform float u_noiseScale;
uniform float u_noiseIterations;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${Rt}
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
  for (int i = 0; i < ${Pr.maxNoiseIterations}; i++) {
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
  for (int i = ${Pr.maxColorCount} - 2; i >= 0; i--) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var bl=`#version 300 es
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

${K}

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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Fa={maxColorCount:10},Gl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Fa.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_spreading;

in vec2 v_patternUV;

out vec4 fragColor;

${V}
${K}
${Rt}
${Br}


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
  for (int i = 1; i < ${Fa.maxColorCount}; i++) {
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
`;var Ll=`#version 300 es
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
${at}

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
`,Wl={circle:0,diamond:1,square:2,triangle:3};var za={maxColorCount:10},Yl=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${za.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${at}

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
  for (int i = 1; i < ${za.maxColorCount}; i++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Er={maxColorCount:8,maxBallsCount:20},Ql=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Er.maxColorCount}];
uniform float u_colorsCount;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_count;

in vec2 v_objectUV;

out vec4 fragColor;

${V}
${Rt}
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

  for (int i = 0; i < ${Er.maxBallsCount}; i++) {
    if (i >= int(ceil(u_count))) break;

    float idxFract = float(i) / float(${Er.maxBallsCount});
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Hl=`#version 300 es
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
${Eo}
${rt}

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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Ua={maxColorCount:5},jl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${Ua.maxColorCount}];
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
${Br}

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
  for (int i = 1; i < ${Ua.maxColorCount}; i++) {
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
`;var Xl=`#version 300 es
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
`;var Ra={maxColorCount:10},Kl=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${Ra.maxColorCount}];
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
${K}
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
  for (int i = 1; i < ${Ra.maxColorCount}; i++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`,ql={checks:0,stripes:1,edge:2};var Ma={maxColorCount:5},Jl=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colorBloom;
uniform vec4 u_colors[${Ma.maxColorCount}];
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
${K}
${Rt}
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

${Eo}

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

  for (int i = 0; i < ${Ma.maxColorCount}; i++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Zl=`#version 300 es
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
${at}

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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Ia={maxColorCount:10},$l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Ia.maxColorCount}];
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
${at}
${K}

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
  for (int i = 1; i < ${Ia.maxColorCount+1}; i++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var eu=`#version 300 es
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

${at}
${V}
${Eo}
${rt}

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
`,tu={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},Va={random:1,"2x2":2,"4x4":3,"8x8":4};var Oa={maxColorCount:7},ou=`#version 300 es
precision lowp float;

uniform mediump float u_time;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Oa.maxColorCount}];
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
${at}
${K}
${Rt}

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

${Eo}

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
  for (int i = 1; i < ${Oa.maxColorCount}; i++) {
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
`,ru={wave:1,dots:2,truchet:3,corners:4,ripple:5,blob:6,sphere:7};var Fr={maxColorCount:5,maxSpots:4},au=`#version 300 es
precision lowp float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Fr.maxColorCount}];
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

${Br}

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

  for (int colorIdx = 0; colorIdx < ${Fr.maxColorCount}; colorIdx++) {
    if (colorIdx >= int(u_colorsCount)) break;
    float colorIdxF = float(colorIdx);

    vec3 c = u_colors[colorIdx].rgb * u_colors[colorIdx].a;
    float a = u_colors[colorIdx].a;

    for (int spotIdx = 0; spotIdx < ${Fr.maxSpots}; spotIdx++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}`,nu={auto:0,square:1};var zr={maxColorCount:7},iu=`#version 300 es
precision lowp float;

uniform float u_time;
uniform mediump float u_scale;

uniform vec4 u_colors[${zr.maxColorCount}];
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

  vec4 premultipliedColors[${zr.maxColorCount}];
  for (int i = 0; i < ${zr.maxColorCount}; i++) {
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

  ${se}

  fragColor = vec4(color, opacity);
}
`;var Da={maxColorCount:10},su=`#version 300 es
precision mediump float;

uniform vec4 u_colors[${Da.maxColorCount}];
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
${K}
${rt}

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

  for (int i = 0; i < ${Da.maxColorCount}; i++) {
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
`;var Na={maxColorCount:10},lu=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Na.maxColorCount}];
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
${K}
${rt}

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
  for (int i = 1; i < ${Na.maxColorCount+1}; i++) {
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
`;var uu=`#version 300 es
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
${K}
${Rt}
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

${dm}

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
`;var cu=`#version 300 es
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
${K}
${at}

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
`;var fu=`#version 300 es
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
${K}
${rt}

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
`,pu={lines:1,linesIrregular:2,wave:3,zigzag:4,pattern:5},mu={prism:1,lens:2,contour:3,cascade:4,flat:5};var du=`#version 300 es
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


${rt}
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
`;var Ta={maxColorCount:10},hu=`#version 300 es
precision highp float;

in mediump vec2 v_imageUV;
in mediump vec2 v_objectUV;
out vec4 fragColor;

uniform sampler2D u_image;
uniform float u_time;
uniform mediump float u_imageAspectRatio;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Ta.maxColorCount}];
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
  for (int i = 1; i < ${Ta.maxColorCount+1}; i++) {
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
`;function pi(e){let t=document.createElement("canvas"),o=1e3;return new Promise((r,a)=>{let n=new Image;n.crossOrigin="anonymous",n.addEventListener("load",()=>{(typeof e=="string"?e.endsWith(".svg"):e.type==="image/svg+xml")&&(n.width=o,n.height=o);let i=n.naturalWidth/n.naturalHeight,s=Math.floor(o*.15),l=Math.ceil(s*2.5),u=o,g=o;i>1?g=Math.floor(o/i):u=Math.floor(o*i),t.width=u+2*l,t.height=g+2*l;let m=t.getContext("2d",{willReadFrequently:!0});if(!m)throw new Error("Failed to get canvas 2d context");m.fillStyle="white",m.fillRect(0,0,t.width,t.height),m.drawImage(n,l,l,u,g);let{width:d,height:_}=t,v=m.getImageData(0,0,d,_).data,h=d*_,c=new Uint8ClampedArray(h);for(let E=0;E<h;E++){let N=E*4,G=v[N]??0,ce=v[N+1]??0,ne=v[N+2]??0;c[E]=.299*G+.587*ce+.114*ne|0}let f=s,p=Math.max(1,Math.round(.12*s)),x=5,S=gu(c,d,_,f,3),w=gu(c,d,_,p,3),C=gu(c,d,_,x,1),P=m.createImageData(d,_),I=P.data;for(let E=0;E<h;E++){let N=E*4;I[N]=C[E]??0,I[N+1]=S[E]??0,I[N+2]=w[E]??0,I[N+3]=255}m.putImageData(P,0,0),t.toBlob(E=>{if(!E){a(new Error("Failed to create PNG blob"));return}r({blob:E})},"image/png")}),n.addEventListener("error",()=>{a(new Error("Failed to load image"))}),n.src=typeof e=="string"?e:URL.createObjectURL(e)})}function gm(e,t,o,r){if(r<=0)return e.slice();let a=new Uint8ClampedArray(t*o),n=new Uint32Array(t*o);for(let i=0;i<o;i++){let s=0;for(let l=0;l<t;l++){let u=i*t+l,g=e[u]??0;s+=g,n[u]=s+(i>0?n[u-t]??0:0)}}for(let i=0;i<o;i++){let s=Math.max(0,i-r),l=Math.min(o-1,i+r);for(let u=0;u<t;u++){let g=Math.max(0,u-r),m=Math.min(t-1,u+r),d=l*t+m,_=l*t+(g-1),y=(s-1)*t+m,v=(s-1)*t+(g-1),h=n[d]??0,c=g>0?n[_]??0:0,f=s>0?n[y]??0:0,p=g>0&&s>0?n[v]??0:0,x=h-c-f+p,S=(m-g+1)*(l-s+1);a[i*t+u]=Math.round(x/S)}}return a}function gu(e,t,o,r,a){if(r<=0||a<=1)return gm(e,t,o,r);let n=e,i=e;for(let s=0;s<a;s++)i=gm(n,t,o,r),n=i;return i}var vu=`#version 300 es
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
${K}
${at}

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

  ${se}

  fragColor = vec4(color, opacity);
}
`,Ho={measurePerformance:!1,workingSize:512,iterations:40};function mi(e){let t=document.createElement("canvas"),o=t.getContext("2d"),r=typeof e=="string"&&e.startsWith("blob:");return new Promise((a,n)=>{if(!e||!o){n(new Error("Invalid file or canvas context"));return}let i=r&&fetch(e).then(u=>u.headers.get("Content-Type")),s=new Image;s.crossOrigin="anonymous";let l=performance.now();s.onload=async()=>{let u,g=await i;g?u=g==="image/svg+xml":typeof e=="string"?u=e.endsWith(".svg")||e.startsWith("data:image/svg+xml"):u=e.type==="image/svg+xml";let m=s.width||s.naturalWidth,d=s.height||s.naturalHeight;if(u){let b=m/d;m>d?(m=4096,d=4096/b):(d=4096,m=4096*b),s.width=m,s.height=d}let _=Math.min(m,d),v=Ho.workingSize/_,h=Math.round(m*v),c=Math.round(d*v);Ho.measurePerformance&&(console.log("[Processing Mode]"),console.log(`  Original: ${m}\xD7${d}`),console.log(`  Working: ${h}\xD7${c} (${(v*100).toFixed(1)}% scale)`),v<1&&console.log(`  Speedup: ~${Math.round(1/(v*v))}\xD7`)),t.width=m,t.height=d;let f=document.createElement("canvas");f.width=h,f.height=c;let p=f.getContext("2d");p.drawImage(s,0,0,h,c);let x=performance.now(),w=p.getImageData(0,0,h,c).data,C=new Uint8Array(h*c),P=new Uint8Array(h*c),I=0;for(let T=0,b=0;T<w.length;T+=4,b++){let Ne=w[T+3]===0?0:1;C[b]=Ne,I+=Ne}let E=[],N=[];for(let T=0;T<c;T++)for(let b=0;b<h;b++){let Z=T*h+b;if(!C[Z])continue;let Ne=!1;b===0||b===h-1||T===0||T===c-1?Ne=!0:Ne=!C[Z-1]||!C[Z+1]||!C[Z-h]||!C[Z+h]||!C[Z-h-1]||!C[Z-h+1]||!C[Z+h-1]||!C[Z+h+1],Ne?(P[Z]=1,E.push(Z)):N.push(Z)}Ho.measurePerformance&&(console.log(`[Mask Building] Time: ${(performance.now()-x).toFixed(2)}ms`),console.log(`  Shape pixels: ${I} / ${h*c} (${(I/(h*c)*100).toFixed(1)}%)`),console.log(`  Interior pixels: ${N.length}`),console.log(`  Boundary pixels: ${E.length}`));let G=nv(C,P,new Uint32Array(N),new Uint32Array(E),h,c),ce=performance.now(),ne=iv(G,C,P,h,c);Ho.measurePerformance&&console.log(`[Poisson Solve] Time: ${(performance.now()-ce).toFixed(2)}ms`);let fe=0,Re;for(let T=0;T<N.length;T++){let b=N[T];ne[b]>fe&&(fe=ne[b])}let kt=document.createElement("canvas");kt.width=h,kt.height=c;let no=kt.getContext("2d"),Ye=no.createImageData(h,c);for(let T=0;T<c;T++)for(let b=0;b<h;b++){let Z=T*h+b,Ne=Z*4;if(!C[Z])Ye.data[Ne]=255,Ye.data[Ne+1]=255,Ye.data[Ne+2]=255,Ye.data[Ne+3]=0;else{let Ko=255*(1-ne[Z]/fe);Ye.data[Ne]=Ko,Ye.data[Ne+1]=Ko,Ye.data[Ne+2]=Ko,Ye.data[Ne+3]=255}}no.putImageData(Ye,0,0),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(kt,0,0,h,c,0,0,m,d);let Qe=o.getImageData(0,0,m,d),Xo=document.createElement("canvas");Xo.width=m,Xo.height=d;let zo=Xo.getContext("2d");zo.drawImage(s,0,0,m,d);let ba=zo.getImageData(0,0,m,d);for(let T=0;T<Qe.data.length;T+=4){let b=ba.data[T+3],Z=Qe.data[T+3];b===0?(Qe.data[T]=255,Qe.data[T+1]=0):(Qe.data[T]=Z===0?0:Qe.data[T],Qe.data[T+1]=b),Qe.data[T+2]=255,Qe.data[T+3]=255}o.putImageData(Qe,0,0),Re=Qe,t.toBlob(T=>{if(!T){n(new Error("Failed to create PNG blob"));return}if(Ho.measurePerformance){let b=performance.now()-l;if(console.log(`[Total Processing Time] ${b.toFixed(2)}ms`),v<1){let Z=b*Math.pow(m*d/(h*c),1.5);console.log(`[Estimated time at full resolution] ~${Z.toFixed(0)}ms`),console.log(`[Time saved] ~${(Z-b).toFixed(0)}ms (${Math.round(Z/b)}\xD7 faster)`)}}a({imageData:Re,pngBlob:T})},"image/png")},s.onerror=()=>n(new Error("Failed to load image")),s.src=typeof e=="string"?e:URL.createObjectURL(e)})}function nv(e,t,o,r,a,n){let i=o.length,s=new Int32Array(i*4);for(let l=0;l<i;l++){let u=o[l],g=u%a,m=Math.floor(u/a);s[l*4+0]=g<a-1&&e[u+1]?u+1:-1,s[l*4+1]=g>0&&e[u-1]?u-1:-1,s[l*4+2]=m>0&&e[u-a]?u-a:-1,s[l*4+3]=m<n-1&&e[u+a]?u+a:-1}return{interiorPixels:o,boundaryPixels:r,pixelCount:i,neighborIndices:s}}function iv(e,t,o,r,a){let n=Ho.iterations,i=.01,s=new Float32Array(r*a),{interiorPixels:l,neighborIndices:u,pixelCount:g}=e,m=performance.now(),d=1.9,_=[],y=[];for(let v=0;v<g;v++){let h=l[v],c=h%r,f=Math.floor(h/r);(c+f)%2===0?_.push(v):y.push(v)}for(let v=0;v<n;v++){for(let h of _){let c=l[h],f=u[h*4+0],p=u[h*4+1],x=u[h*4+2],S=u[h*4+3],w=0;f>=0&&(w+=s[f]),p>=0&&(w+=s[p]),x>=0&&(w+=s[x]),S>=0&&(w+=s[S]);let C=(i+w)/4;s[c]=d*C+(1-d)*s[c]}for(let h of y){let c=l[h],f=u[h*4+0],p=u[h*4+1],x=u[h*4+2],S=u[h*4+3],w=0;f>=0&&(w+=s[f]),p>=0&&(w+=s[p]),x>=0&&(w+=s[x]),S>=0&&(w+=s[S]);let C=(i+w)/4;s[c]=d*C+(1-d)*s[c]}}if(Ho.measurePerformance){let v=performance.now()-m;console.log(`[Optimized Poisson Solver (SOR \u03C9=${d})]`),console.log(`  Working size: ${r}\xD7${a}`),console.log(`  Iterations: ${n}`),console.log(`  Time: ${v.toFixed(2)}ms`),console.log(`  Interior pixels processed: ${g}`),console.log(`  Speed: ${(n*g/(v*1e3)).toFixed(2)} Mpixels/sec`)}return s}var xu={none:0,circle:1,daisy:2,diamond:3,metaballs:4};var _u=`#version 300 es
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
${K}
${rt}

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
`,yu={classic:0,gooey:1,holes:2,soft:3},Su={square:0,hex:1};var wu=`#version 300 es
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
`,Cu={dots:0,ink:1,sharp:2};var ku={maxColorCount:6},Au=`#version 300 es
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
uniform vec4 u_colors[${ku.maxColorCount}];
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
${K}

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
  for (int i = 1; i < ${ku.maxColorCount+1}; i++) {
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
`,jo={measurePerformance:!1,workingSize:512,iterations:32};function di(e){let t=document.createElement("canvas"),o=t.getContext("2d"),r=typeof e=="string"&&e.startsWith("blob:");return new Promise((a,n)=>{if(!e||!o){n(new Error("Invalid file or canvas context"));return}let i=r&&fetch(e).then(u=>u.headers.get("Content-Type")),s=new Image;s.crossOrigin="anonymous";let l=performance.now();s.onload=async()=>{let u,g=await i;g?u=g==="image/svg+xml":typeof e=="string"?u=e.endsWith(".svg")||e.startsWith("data:image/svg+xml"):u=e.type==="image/svg+xml";let m=s.width||s.naturalWidth,d=s.height||s.naturalHeight;if(u){let $=m/d;m>d?(m=4096,d=4096/$):(d=4096,m=4096*$),s.width=m,s.height=d}let _=Math.min(m,d),v=jo.workingSize/_,h=Math.round(m*v),c=Math.round(d*v);jo.measurePerformance&&(console.log("[Processing Mode]"),console.log(`  Original: ${m}\xD7${d}`),console.log(`  Working: ${h}\xD7${c} (${(v*100).toFixed(1)}% scale)`),v<1&&console.log(`  Speedup: ~${Math.round(1/(v*v))}\xD7`)),t.width=m,t.height=d;let f=.025,p=Math.ceil(h*f),x=Math.ceil(c*f),S=h-2*p,w=c-2*x,C=document.createElement("canvas");C.width=h,C.height=c;let P=C.getContext("2d");P.drawImage(s,p,x,S,w);let I=performance.now(),N=P.getImageData(0,0,h,c).data,G=new Uint8Array(h*c),ce=new Uint8Array(h*c),ne=0;for(let Y=0,$=0;Y<N.length;Y+=4,$++){let it=N[Y+3]===0?0:1;G[$]=it,ne+=it}let fe=[],Re=[];for(let Y=0;Y<c;Y++)for(let $=0;$<h;$++){let pe=Y*h+$;if(!G[pe])continue;let it=!1;$===0||$===h-1||Y===0||Y===c-1?it=!0:it=!G[pe-1]||!G[pe+1]||!G[pe-h]||!G[pe+h]||!G[pe-h-1]||!G[pe-h+1]||!G[pe+h-1]||!G[pe+h+1],it?(ce[pe]=1,fe.push(pe)):Re.push(pe)}jo.measurePerformance&&(console.log(`[Mask Building] Time: ${(performance.now()-I).toFixed(2)}ms`),console.log(`  Shape pixels: ${ne} / ${h*c} (${(ne/(h*c)*100).toFixed(1)}%)`),console.log(`  Interior pixels: ${Re.length}`),console.log(`  Boundary pixels: ${fe.length}`));let kt=sv(G,ce,new Uint32Array(Re),new Uint32Array(fe),h,c),no=performance.now(),Ye=lv(kt,G,ce,h,c);jo.measurePerformance&&console.log(`[Poisson Solve] Time: ${(performance.now()-no).toFixed(2)}ms`);let Qe=0,Xo;for(let Y=0;Y<Re.length;Y++){let $=Re[Y];Ye[$]>Qe&&(Qe=Ye[$])}let zo=document.createElement("canvas");zo.width=h,zo.height=c;let ba=zo.getContext("2d"),T=ba.createImageData(h,c);for(let Y=0;Y<c;Y++)for(let $=0;$<h;$++){let pe=Y*h+$,it=pe*4;if(!G[pe])T.data[it]=255,T.data[it+1]=255,T.data[it+2]=255,T.data[it+3]=0;else{let vi=255*(1-Ye[pe]/Qe);T.data[it]=vi,T.data[it+1]=vi,T.data[it+2]=vi,T.data[it+3]=255}}ba.putImageData(T,0,0),o.imageSmoothingEnabled=!0,o.imageSmoothingQuality="high",o.drawImage(zo,0,0,h,c,0,0,m,d);let b=o.getImageData(0,0,m,d),Z=Math.ceil(m*f),Ne=Math.ceil(d*f),Ga=document.createElement("canvas");Ga.width=m,Ga.height=d;let Ko=Ga.getContext("2d");Ko.drawImage(s,Z,Ne,m-2*Z,d-2*Ne);let F0=Ko.getImageData(0,0,m,d);for(let Y=0;Y<b.data.length;Y+=4){let $=F0.data[Y+3],pe=b.data[Y+3];$===0?(b.data[Y]=255,b.data[Y+1]=0):(b.data[Y]=pe===0?0:b.data[Y],b.data[Y+1]=$),b.data[Y+2]=255,b.data[Y+3]=255}o.putImageData(b,0,0),Xo=b,t.toBlob(Y=>{if(!Y){n(new Error("Failed to create PNG blob"));return}if(jo.measurePerformance){let $=performance.now()-l;if(console.log(`[Total Processing Time] ${$.toFixed(2)}ms`),v<1){let pe=$*Math.pow(m*d/(h*c),1.5);console.log(`[Estimated time at full resolution] ~${pe.toFixed(0)}ms`),console.log(`[Time saved] ~${(pe-$).toFixed(0)}ms (${Math.round(pe/$)}\xD7 faster)`)}}a({imageData:Xo,pngBlob:Y})},"image/png")},s.onerror=()=>n(new Error("Failed to load image")),s.src=typeof e=="string"?e:URL.createObjectURL(e)})}function sv(e,t,o,r,a,n){let i=o.length,s=new Int32Array(i*4);for(let l=0;l<i;l++){let u=o[l],g=u%a,m=Math.floor(u/a);s[l*4+0]=g<a-1&&e[u+1]?u+1:-1,s[l*4+1]=g>0&&e[u-1]?u-1:-1,s[l*4+2]=m>0&&e[u-a]?u-a:-1,s[l*4+3]=m<n-1&&e[u+a]?u+a:-1}return{interiorPixels:o,boundaryPixels:r,pixelCount:i,neighborIndices:s}}function lv(e,t,o,r,a){let n=jo.iterations,i=.01,s=new Float32Array(r*a),{interiorPixels:l,neighborIndices:u,pixelCount:g}=e,m=performance.now(),d=1.9,_=[],y=[];for(let h=0;h<g;h++){let c=l[h],f=c%r,p=Math.floor(c/r);(f+p)%2===0?_.push(h):y.push(h)}for(let h=0;h<n;h++){for(let c of _){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0;p>=0&&(C+=s[p]),x>=0&&(C+=s[x]),S>=0&&(C+=s[S]),w>=0&&(C+=s[w]);let P=(i+C)/4;s[f]=d*P+(1-d)*s[f]}for(let c of y){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0;p>=0&&(C+=s[p]),x>=0&&(C+=s[x]),S>=0&&(C+=s[S]),w>=0&&(C+=s[w]);let P=(i+C)/4;s[f]=d*P+(1-d)*s[f]}}let v=new Float32Array(r*a);for(let h=0;h<3;h++){v.set(s);for(let c=0;c<g;c++){let f=l[c],p=u[c*4+0],x=u[c*4+1],S=u[c*4+2],w=u[c*4+3],C=0,P=0;p>=0&&(C+=v[p],P++),x>=0&&(C+=v[x],P++),S>=0&&(C+=v[S],P++),w>=0&&(C+=v[w],P++),s[f]=P>0?(v[f]+C/P)*.5:v[f]}}if(jo.measurePerformance){let h=performance.now()-m;console.log(`[Optimized Poisson Solver (SOR \u03C9=${d})]`),console.log(`  Working size: ${r}\xD7${a}`),console.log(`  Iterations: ${n}`),console.log(`  Time: ${h.toFixed(2)}ms`),console.log(`  Interior pixels processed: ${g}`),console.log(`  Speed: ${(n*g/(h*1e3)).toFixed(2)} Mpixels/sec`)}return s}var Bu={none:0,circle:1,daisy:2,diamond:3,metaballs:4};function A(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:Pu;if(typeof e!="string")return Pu;let t,o,r,a=1;if(e.startsWith("#"))[t,o,r,a]=uv(e);else if(e.startsWith("rgb"))[t,o,r,a]=cv(e);else if(e.startsWith("hsl"))[t,o,r,a]=pv(fv(e));else return console.error("Unsupported color format",e),Pu;return[gi(t,0,1),gi(o,0,1),gi(r,0,1),gi(a,0,1)]}function uv(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(n=>n+n).join("")),e.length===6&&(e=e+"ff");let t=parseInt(e.slice(0,2),16)/255,o=parseInt(e.slice(2,4),16)/255,r=parseInt(e.slice(4,6),16)/255,a=parseInt(e.slice(6,8),16)/255;return[t,o,r,a]}function cv(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0")/255,parseInt(t[2]??"0")/255,parseInt(t[3]??"0")/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function fv(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0"),parseInt(t[2]??"0"),parseInt(t[3]??"0"),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function pv(e){let[t,o,r,a]=e,n=t/360,i=o/100,s=r/100,l,u,g;if(o===0)l=u=g=s;else{let m=(y,v,h)=>(h<0&&(h+=1),h>1&&(h-=1),h<.16666666666666666?y+(v-y)*6*h:h<.5?v:h<.6666666666666666?y+(v-y)*(.6666666666666666-h)*6:y),d=s<.5?s*(1+i):s+i-s*i,_=2*s-d;l=m(_,d,n+1/3),u=m(_,d,n),g=m(_,d,n-1/3)}return[l,u,g,a]}var gi=(e,t,o)=>Math.min(Math.max(e,t),o),Pu=[0,0,0,1];function Ce(){if(typeof window>"u")return;let e=new Image;return e.src=mv,e}var mv="data:image/png;base64,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";var Eu="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";var Ur=z(W(),1);function hm(e){let t=Ur.useRef(void 0),o=Ur.useCallback(r=>{let a=e.map(n=>{if(n!=null){if(typeof n=="function"){let i=n,s=i(r);return typeof s=="function"?s:()=>{i(null)}}return n.current=r,()=>{n.current=null}}});return()=>{a.forEach(n=>n?.())}},e);return Ur.useMemo(()=>e.every(r=>r==null)?null:r=>{t.current&&(t.current(),t.current=void 0),r!=null&&(t.current=o(r))},e)}function Fu(e){if(e.naturalWidth<1024&&e.naturalHeight<1024){if(e.naturalWidth<1||e.naturalHeight<1)return;let t=e.naturalWidth/e.naturalHeight;e.width=Math.round(t>1?1024*t:1024),e.height=Math.round(t>1?1024:1024/t)}}var Sm=z(X(),1);async function ym(e){let t={},o=[],r=n=>{try{return n.startsWith("/")||new URL(n),!0}catch{return!1}},a=n=>{try{return n.startsWith("/")?!1:new URL(n,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([n,i])=>{if(typeof i=="string"){let s=i||Eu;if(!r(s)){console.warn(`Uniform "${n}" has invalid URL "${s}". Skipping image loading.`);return}let l=new Promise((u,g)=>{let m=new Image;a(s)&&(m.crossOrigin="anonymous"),m.onload=()=>{Fu(m),t[n]=m,u()},m.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${s}`),g()},m.src=s});o.push(l)}else i instanceof HTMLImageElement&&Fu(i),t[n]=i}),await Promise.all(o),t}var U=(0,ft.forwardRef)(function({fragmentShader:t,uniforms:o,webGlContextAttributes:r,speed:a=0,frame:n=0,width:i,height:s,minPixelRatio:l,maxPixelCount:u,mipmaps:g,style:m,...d},_){let[y,v]=(0,ft.useState)(!1),h=(0,ft.useRef)(null),c=(0,ft.useRef)(null),f=(0,ft.useRef)(r);(0,ft.useEffect)(()=>((async()=>{let S=await ym(o);h.current&&!c.current&&(c.current=new Pa(h.current,t,S,f.current,a,n,l,u,g),v(!0))})(),()=>{c.current?.dispose(),c.current=null}),[t]),(0,ft.useEffect)(()=>{let x=!1;return(async()=>{let w=await ym(o);x||c.current?.setUniforms(w)})(),()=>{x=!0}},[o,y]),(0,ft.useEffect)(()=>{c.current?.setSpeed(a)},[a,y]),(0,ft.useEffect)(()=>{c.current?.setMaxPixelCount(u)},[u,y]),(0,ft.useEffect)(()=>{c.current?.setMinPixelRatio(l)},[l,y]),(0,ft.useEffect)(()=>{c.current?.setFrame(n)},[n,y]);let p=hm([h,_]);return(0,Sm.jsx)("div",{ref:p,style:i!==void 0||s!==void 0?{width:typeof i=="string"&&isNaN(+i)===!1?+i:i,height:typeof s=="string"&&isNaN(+s)===!1?+s:s,...m}:m,...d})});U.displayName="ShaderMount";var wm=z(W(),1);function D(e,t){for(let o in e){if(o==="colors"){let r=Array.isArray(e.colors),a=Array.isArray(t.colors);if(!r||!a){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((n,i)=>n===t.colors?.[i]))return!1;continue}if(Object.is(e[o],t[o])===!1)return!1}return!0}var Cm=z(X(),1),Ke={name:"Default",params:{...k,speed:1,frame:0,colors:["#e0eaff","#241d9a","#f75092","#9f50d3"],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}},yv={name:"Purple",params:{...k,speed:.6,frame:0,colors:["#aaa7d7","#3c2b8e"],distortion:1,swirl:1,grainMixer:0,grainOverlay:0}},Sv={name:"Beach",params:{...k,speed:.1,frame:0,colors:["#bcecf6","#00aaff","#00f7ff","#ffd447"],distortion:.8,swirl:.35,grainMixer:0,grainOverlay:0}},wv={name:"Ink",params:{...k,speed:1,frame:0,colors:["#ffffff","#000000"],distortion:1,swirl:.2,rotation:90,grainMixer:0,grainOverlay:0}},km=[Ke,wv,yv,Sv],Am=(0,wm.memo)(function({speed:t=Ke.params.speed,frame:o=Ke.params.frame,colors:r=Ke.params.colors,distortion:a=Ke.params.distortion,swirl:n=Ke.params.swirl,grainMixer:i=Ke.params.grainMixer,grainOverlay:s=Ke.params.grainOverlay,fit:l=Ke.params.fit,rotation:u=Ke.params.rotation,scale:g=Ke.params.scale,originX:m=Ke.params.originX,originY:d=Ke.params.originY,offsetX:_=Ke.params.offsetX,offsetY:y=Ke.params.offsetY,worldWidth:v=Ke.params.worldWidth,worldHeight:h=Ke.params.worldHeight,...c}){let f={u_colors:r.map(A),u_colorsCount:r.length,u_distortion:a,u_swirl:n,u_grainMixer:i,u_grainOverlay:s,u_fit:R[l],u_rotation:u,u_scale:g,u_offsetX:_,u_offsetY:y,u_originX:m,u_originY:d,u_worldWidth:v,u_worldHeight:h};return(0,Cm.jsx)(U,{...c,speed:t,frame:o,fragmentShader:Nl,uniforms:f})},D);var Bm=z(W(),1);var Pm=z(X(),1),Ve={name:"Default",params:{...k,speed:.5,frame:0,colorBack:"#000000",colors:["#ffffff"],noiseScale:3,noiseIterations:8,radius:.25,thickness:.65,innerShape:.7,scale:.8}},Cv={name:"Solar",params:{...k,speed:1,frame:0,colorBack:"#000000",colors:["#ffffff","#ffca0a","#fc6203","#fc620366"],noiseScale:2,noiseIterations:3,radius:.4,thickness:.8,innerShape:4,scale:2,offsetY:1}},kv={name:"Line",params:{...k,frame:0,colorBack:"#000000",colors:["#4540a4","#1fe8ff"],noiseScale:1.1,noiseIterations:2,radius:.38,thickness:.01,innerShape:.88,speed:4}},Av={name:"Cloud",params:{...k,frame:0,colorBack:"#81ADEC",colors:["#ffffff"],noiseScale:3,noiseIterations:10,radius:.5,thickness:.65,innerShape:.85,speed:.5,scale:2.5}},Em=[Ve,kv,Cv,Av],Fm=(0,Bm.memo)(function({speed:t=Ve.params.speed,frame:o=Ve.params.frame,colorBack:r=Ve.params.colorBack,colors:a=Ve.params.colors,noiseScale:n=Ve.params.noiseScale,thickness:i=Ve.params.thickness,radius:s=Ve.params.radius,innerShape:l=Ve.params.innerShape,noiseIterations:u=Ve.params.noiseIterations,fit:g=Ve.params.fit,scale:m=Ve.params.scale,rotation:d=Ve.params.rotation,originX:_=Ve.params.originX,originY:y=Ve.params.originY,offsetX:v=Ve.params.offsetX,offsetY:h=Ve.params.offsetY,worldWidth:c=Ve.params.worldWidth,worldHeight:f=Ve.params.worldHeight,...p}){let x={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_noiseScale:n,u_thickness:i,u_radius:s,u_innerShape:l,u_noiseIterations:u,u_noiseTexture:Ce(),u_fit:R[g],u_scale:m,u_rotation:d,u_offsetX:v,u_offsetY:h,u_originX:_,u_originY:y,u_worldWidth:c,u_worldHeight:f};return(0,Pm.jsx)(U,{...p,speed:t,frame:o,fragmentShader:Tl,uniforms:x})},D);var zm=z(W(),1);var Um=z(X(),1),qe={name:"Default",params:{...M,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#47a6ff",colorBack:"#000000",brightness:.05,contrast:.3}},Bv={name:"Sensation",params:{...M,speed:1,frame:0,colorFront:"#00c8ff",colorMid:"#fbff00",colorBack:"#8b42ff",brightness:.19,contrast:.12,scale:3}},Pv={name:"Bloodstream",params:{...M,speed:1,frame:0,colorFront:"#ff0000",colorMid:"#ff0000",colorBack:"#ffffff",brightness:.24,contrast:.17,scale:.7}},Ev={name:"Ghost",params:{...M,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#000000",colorBack:"#ffffff",brightness:0,contrast:1,scale:.55}},Rm=[qe,Bv,Pv,Ev],Mm=(0,zm.memo)(function({speed:t=qe.params.speed,frame:o=qe.params.frame,colorFront:r=qe.params.colorFront,colorMid:a=qe.params.colorMid,colorBack:n=qe.params.colorBack,brightness:i=qe.params.brightness,contrast:s=qe.params.contrast,fit:l=qe.params.fit,scale:u=qe.params.scale,rotation:g=qe.params.rotation,originX:m=qe.params.originX,originY:d=qe.params.originY,offsetX:_=qe.params.offsetX,offsetY:y=qe.params.offsetY,worldWidth:v=qe.params.worldWidth,worldHeight:h=qe.params.worldHeight,...c}){let f={u_colorFront:A(r),u_colorMid:A(a),u_colorBack:A(n),u_brightness:i,u_contrast:s,u_fit:R[l],u_scale:u,u_rotation:g,u_offsetX:_,u_offsetY:y,u_originX:m,u_originY:d,u_worldWidth:v,u_worldHeight:h};return(0,Um.jsx)(U,{...c,speed:t,frame:o,fragmentShader:bl,uniforms:f})},D);var Im=z(W(),1);var Vm=z(X(),1),Ge={name:"Default",params:{...M,speed:1.5,frame:0,colorBack:"#000000",colors:["#ffc96b","#ff6200","#ff2f00","#421100","#1a0000"],size:1,sizeRange:0,spreading:1,stepsPerColor:4}},Fv={name:"Shine",params:{...M,speed:.1,frame:0,colors:["#ffffff","#006aff","#fff675"],colorBack:"#000000",stepsPerColor:4,size:.3,sizeRange:.2,spreading:1,scale:.4}},zv={name:"Bubbles",params:{...M,speed:.4,frame:0,colors:["#D0D2D5"],colorBack:"#989CA4",stepsPerColor:2,size:.9,sizeRange:.7,spreading:1,scale:1.64}},Uv={name:"Hallucinatory",params:{...M,speed:5,frame:0,colors:["#000000"],colorBack:"#ffe500",stepsPerColor:2,size:.65,sizeRange:0,spreading:.3,scale:.5}},Om=[Ge,zv,Fv,Uv],Dm=(0,Im.memo)(function({speed:t=Ge.params.speed,frame:o=Ge.params.frame,colorBack:r=Ge.params.colorBack,colors:a=Ge.params.colors,size:n=Ge.params.size,sizeRange:i=Ge.params.sizeRange,spreading:s=Ge.params.spreading,stepsPerColor:l=Ge.params.stepsPerColor,fit:u=Ge.params.fit,scale:g=Ge.params.scale,rotation:m=Ge.params.rotation,originX:d=Ge.params.originX,originY:_=Ge.params.originY,offsetX:y=Ge.params.offsetX,offsetY:v=Ge.params.offsetY,worldWidth:h=Ge.params.worldWidth,worldHeight:c=Ge.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_size:n,u_sizeRange:i,u_spreading:s,u_stepsPerColor:l,u_noiseTexture:Ce(),u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,Vm.jsx)(U,{...f,speed:t,frame:o,fragmentShader:Gl,uniforms:p})},D);var Nm=z(W(),1);var Tm=z(X(),1),Ee={name:"Default",params:{...M,colorBack:"#000000",colorFill:"#ffffff",colorStroke:"#ffaa00",size:2,gapX:32,gapY:32,strokeWidth:0,sizeRange:0,opacityRange:0,shape:"circle"}},Rv={name:"Triangles",params:{...M,colorBack:"#ffffff",colorFill:"#ffffff",colorStroke:"#808080",size:5,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"triangle"}},Mv={name:"Tree line",params:{...M,colorBack:"#f4fce7",colorFill:"#052e19",colorStroke:"#000000",size:8,gapX:20,gapY:90,strokeWidth:0,sizeRange:1,opacityRange:.6,shape:"circle"}},Iv={name:"Wallpaper",params:{...M,colorBack:"#204030",colorFill:"#000000",colorStroke:"#bd955b",size:9,gapX:32,gapY:32,strokeWidth:1,sizeRange:0,opacityRange:0,shape:"diamond"}},bm=[Ee,Rv,Mv,Iv],Gm=(0,Nm.memo)(function({colorBack:t=Ee.params.colorBack,colorFill:o=Ee.params.colorFill,colorStroke:r=Ee.params.colorStroke,size:a=Ee.params.size,gapX:n=Ee.params.gapX,gapY:i=Ee.params.gapY,strokeWidth:s=Ee.params.strokeWidth,sizeRange:l=Ee.params.sizeRange,opacityRange:u=Ee.params.opacityRange,shape:g=Ee.params.shape,fit:m=Ee.params.fit,scale:d=Ee.params.scale,rotation:_=Ee.params.rotation,originX:y=Ee.params.originX,originY:v=Ee.params.originY,offsetX:h=Ee.params.offsetX,offsetY:c=Ee.params.offsetY,worldWidth:f=Ee.params.worldWidth,worldHeight:p=Ee.params.worldHeight,maxPixelCount:x=6016*3384,...S}){let w={u_colorBack:A(t),u_colorFill:A(o),u_colorStroke:A(r),u_dotSize:a,u_gapX:n,u_gapY:i,u_strokeWidth:s,u_sizeRange:l,u_opacityRange:u,u_shape:Wl[g],u_fit:R[m],u_scale:d,u_rotation:_,u_offsetX:h,u_offsetY:c,u_originX:y,u_originY:v,u_worldWidth:f,u_worldHeight:p};return(0,Tm.jsx)(U,{...S,maxPixelCount:x,fragmentShader:Ll,uniforms:w})},D);var Lm=z(W(),1);var Wm=z(X(),1),pt={name:"Default",params:{...M,scale:.6,speed:.5,frame:0,colors:["#4449CF","#FFD1E0","#F94446","#FFD36B","#FFFFFF"],stepsPerColor:2,softness:0}},Vv={name:"Bubblegum",params:{...M,speed:2,frame:0,colors:["#ffffff","#ff9e9e","#5f57ff","#00f7ff"],stepsPerColor:1,softness:1,scale:1.6}},Ov={name:"Spots",params:{...M,speed:.6,frame:0,colors:["#ff7b00","#f9ffeb","#320d82"],stepsPerColor:1,softness:0,scale:1}},Dv={name:"First contact",params:{...M,speed:2,frame:0,colors:["#e8cce6","#120d22","#442c44","#e6baba","#fff5f5"],stepsPerColor:2,softness:0,scale:.2}},Ym=[pt,Ov,Dv,Vv],Qm=(0,Lm.memo)(function({speed:t=pt.params.speed,frame:o=pt.params.frame,colors:r=pt.params.colors,stepsPerColor:a=pt.params.stepsPerColor,softness:n=pt.params.softness,fit:i=pt.params.fit,scale:s=pt.params.scale,rotation:l=pt.params.rotation,originX:u=pt.params.originX,originY:g=pt.params.originY,offsetX:m=pt.params.offsetX,offsetY:d=pt.params.offsetY,worldWidth:_=pt.params.worldWidth,worldHeight:y=pt.params.worldHeight,...v}){let h={u_colors:r.map(A),u_colorsCount:r.length,u_stepsPerColor:a,u_softness:n,u_fit:R[i],u_scale:s,u_rotation:l,u_offsetX:m,u_offsetY:d,u_originX:u,u_originY:g,u_worldWidth:_,u_worldHeight:y};return(0,Wm.jsx)(U,{...v,speed:t,frame:o,fragmentShader:Yl,uniforms:h})},D);var Hm=z(W(),1);var jm=z(X(),1),nt={name:"Default",params:{...k,scale:1,speed:1,frame:0,colorBack:"#000000",colors:["#6e33cc","#ff5500","#ffc105","#ffc800","#f585ff"],count:10,size:.83}},Nv={name:"Ink Drops",params:{...k,scale:1,speed:2,frame:0,colorBack:"#ffffff00",colors:["#000000"],count:18,size:.1}},Tv={name:"Background",params:{...k,speed:.5,frame:0,colors:["#ae00ff","#00ff95","#ffc105"],colorBack:"#2a273f",count:13,size:.81,scale:4,rotation:0,offsetX:-.3}},bv={name:"Solar",params:{...k,speed:1,frame:0,colors:["#ffc800","#ff5500","#ffc105"],colorBack:"#102f84",count:7,size:.75,scale:1}},Xm=[nt,Nv,bv,Tv],Km=(0,Hm.memo)(function({speed:t=nt.params.speed,frame:o=nt.params.frame,colorBack:r=nt.params.colorBack,colors:a=nt.params.colors,size:n=nt.params.size,count:i=nt.params.count,fit:s=nt.params.fit,rotation:l=nt.params.rotation,scale:u=nt.params.scale,originX:g=nt.params.originX,originY:m=nt.params.originY,offsetX:d=nt.params.offsetX,offsetY:_=nt.params.offsetY,worldWidth:y=nt.params.worldWidth,worldHeight:v=nt.params.worldHeight,...h}){let c={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_size:n,u_count:i,u_noiseTexture:Ce(),u_fit:R[s],u_rotation:l,u_scale:u,u_offsetX:d,u_offsetY:_,u_originX:g,u_originY:m,u_worldWidth:y,u_worldHeight:v};return(0,jm.jsx)(U,{...h,speed:t,frame:o,fragmentShader:Ql,uniforms:c})},D);var qm=z(W(),1);var Jm=z(X(),1),Le={name:"Default",params:{...M,scale:.6,colorFront:"#ffbb00",colorBack:"#000000",shape:0,frequency:.5,amplitude:.5,spacing:1.2,proportion:.1,softness:0}},Gv={name:"Groovy",params:{...M,scale:5,rotation:90,colorFront:"#fcfcee",colorBack:"#ff896b",shape:3,frequency:.2,amplitude:.25,spacing:1.17,proportion:.57,softness:0}},Lv={name:"Tangled up",params:{...M,scale:.5,rotation:0,colorFront:"#133a41",colorBack:"#c2d8b6",shape:2.07,frequency:.44,amplitude:.57,spacing:1.05,proportion:.75,softness:0}},Wv={name:"Ride the wave",params:{...M,scale:1.7,rotation:0,colorFront:"#fdffe6",colorBack:"#1f1f1f",shape:2.25,frequency:.2,amplitude:1,spacing:1.25,proportion:1,softness:0}},Zm=[Le,Gv,Lv,Wv],$m=(0,qm.memo)(function({colorFront:t=Le.params.colorFront,colorBack:o=Le.params.colorBack,shape:r=Le.params.shape,frequency:a=Le.params.frequency,amplitude:n=Le.params.amplitude,spacing:i=Le.params.spacing,proportion:s=Le.params.proportion,softness:l=Le.params.softness,fit:u=Le.params.fit,scale:g=Le.params.scale,rotation:m=Le.params.rotation,offsetX:d=Le.params.offsetX,offsetY:_=Le.params.offsetY,originX:y=Le.params.originX,originY:v=Le.params.originY,worldWidth:h=Le.params.worldWidth,worldHeight:c=Le.params.worldHeight,maxPixelCount:f=6016*3384,...p}){let x={u_colorFront:A(t),u_colorBack:A(o),u_shape:r,u_frequency:a,u_amplitude:n,u_spacing:i,u_proportion:s,u_softness:l,u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:d,u_offsetY:_,u_originX:y,u_originY:v,u_worldWidth:h,u_worldHeight:c};return(0,Jm.jsx)(U,{...p,fragmentShader:Xl,uniforms:x})},D);var ed=z(W(),1);var td=z(X(),1),_e={name:"Default",params:{...M,speed:.5,frame:0,colorBack:"#632ad5",colorFront:"#fccff7",proportion:.35,softness:.1,octaveCount:1,persistence:1,lacunarity:1.5}},Yv={name:"Nintendo Water",params:{...M,scale:1/.2,speed:.4,frame:0,colorBack:"#2d69d4",colorFront:"#d1eefc",proportion:.42,softness:0,octaveCount:2,persistence:.55,lacunarity:1.8}},Qv={name:"Moss",params:{...M,scale:1/.15,speed:.02,frame:0,colorBack:"#05ff4a",colorFront:"#262626",proportion:.65,softness:.35,octaveCount:6,persistence:1,lacunarity:2.55}},Hv={name:"Worms",params:{...M,scale:.9,speed:0,frame:0,colorBack:"#ffffff00",colorFront:"#595959",proportion:.5,softness:0,octaveCount:1,persistence:1,lacunarity:1.5}},od=[_e,Yv,Qv,Hv],rd=(0,ed.memo)(function({speed:t=_e.params.speed,frame:o=_e.params.frame,colorFront:r=_e.params.colorFront,colorBack:a=_e.params.colorBack,proportion:n=_e.params.proportion,softness:i=_e.params.softness,octaveCount:s=_e.params.octaveCount,persistence:l=_e.params.persistence,lacunarity:u,fit:g=_e.params.fit,worldWidth:m=_e.params.worldWidth,worldHeight:d=_e.params.worldHeight,scale:_=_e.params.scale,rotation:y=_e.params.rotation,originX:v=_e.params.originX,originY:h=_e.params.originY,offsetX:c=_e.params.offsetX,offsetY:f=_e.params.offsetY,...p}){let x={u_colorBack:A(a),u_colorFront:A(r),u_proportion:n,u_softness:i??_e.params.softness,u_octaveCount:s??_e.params.octaveCount,u_persistence:l??_e.params.persistence,u_lacunarity:u??_e.params.lacunarity,u_fit:R[g],u_scale:_,u_rotation:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:m,u_worldHeight:d};return(0,td.jsx)(U,{...p,speed:t,frame:o,fragmentShader:Hl,uniforms:x})},D);var ad=z(W(),1);var nd=z(X(),1),Oe={name:"Default",params:{...M,speed:.5,frame:0,colors:["#ff8247","#ffe53d"],stepsPerColor:3,colorGlow:"#ffffff",colorGap:"#2e0000",distortion:.4,gap:.04,glow:0,scale:.5}},jv={name:"Cells",params:{...M,scale:.5,speed:.5,frame:0,colors:["#ffffff"],stepsPerColor:1,colorGlow:"#ffffff",colorGap:"#000000",distortion:.5,gap:.03,glow:.8}},Xv={name:"Bubbles",params:{...M,scale:.75,speed:.5,frame:0,colors:["#83c9fb"],stepsPerColor:1,colorGlow:"#ffffff",colorGap:"#ffffff",distortion:.4,gap:0,glow:1}},Kv={name:"Lights",params:{...M,scale:3.3,speed:.5,frame:0,colors:["#fffffffc","#bbff00","#00ffff"],colorGlow:"#ff00d0",colorGap:"#ff00d0",stepsPerColor:2,distortion:.38,gap:0,glow:1}},id=[Oe,Kv,jv,Xv],sd=(0,ad.memo)(function({speed:t=Oe.params.speed,frame:o=Oe.params.frame,colors:r=Oe.params.colors,stepsPerColor:a=Oe.params.stepsPerColor,colorGlow:n=Oe.params.colorGlow,colorGap:i=Oe.params.colorGap,distortion:s=Oe.params.distortion,gap:l=Oe.params.gap,glow:u=Oe.params.glow,fit:g=Oe.params.fit,scale:m=Oe.params.scale,rotation:d=Oe.params.rotation,originX:_=Oe.params.originX,originY:y=Oe.params.originY,offsetX:v=Oe.params.offsetX,offsetY:h=Oe.params.offsetY,worldWidth:c=Oe.params.worldWidth,worldHeight:f=Oe.params.worldHeight,...p}){let x={u_colors:r.map(A),u_colorsCount:r.length,u_stepsPerColor:a,u_colorGlow:A(n),u_colorGap:A(i),u_distortion:s,u_gap:l,u_glow:u,u_noiseTexture:Ce(),u_fit:R[g],u_scale:m,u_rotation:d,u_offsetX:v,u_offsetY:h,u_originX:_,u_originY:y,u_worldWidth:c,u_worldHeight:f};return(0,nd.jsx)(U,{...p,speed:t,frame:o,fragmentShader:jl,uniforms:x})},D);var ld=z(W(),1);var ud=z(X(),1),Fe={name:"Default",params:{...M,rotation:0,speed:1,frame:0,colors:["#121212","#9470ff","#121212","#8838ff"],proportion:.45,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:"checks"}},qv={name:"Cauldron Pot",params:{...M,scale:.9,rotation:160,speed:10,frame:0,colors:["#a7e58b","#324472","#0a180d"],proportion:.64,softness:1.5,distortion:.2,swirl:.86,swirlIterations:7,shapeScale:.6,shape:"edge"}},Jv={name:"Live Ink",params:{...M,scale:1.2,rotation:44,offsetY:-.3,speed:2.5,frame:0,colors:["#111314","#9faeab","#f3fee7","#f3fee7"],proportion:.05,softness:0,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.28,shape:"checks"}},Zv={name:"Kelp",params:{...M,scale:.8,rotation:50,speed:20,frame:0,colors:["#dbff8f","#404f3e","#091316"],proportion:.67,softness:0,distortion:0,swirl:.2,swirlIterations:3,shapeScale:1,shape:"stripes"}},$v={name:"Nectar",params:{...M,scale:2,offsetY:.6,rotation:0,speed:4.2,frame:0,colors:["#151310","#d3a86b","#f0edea"],proportion:.24,softness:1,distortion:.21,swirl:.57,swirlIterations:10,shapeScale:.75,shape:"edge"}},e1={name:"Passion",params:{...M,scale:2.5,rotation:1.35,speed:3,frame:0,colors:["#3b1515","#954751","#ffc085"],proportion:.5,softness:1,distortion:.09,swirl:.9,swirlIterations:6,shapeScale:.25,shape:"checks"}},cd=[Fe,qv,Jv,Zv,$v,e1],fd=(0,ld.memo)(function({speed:t=Fe.params.speed,frame:o=Fe.params.frame,colors:r=Fe.params.colors,proportion:a=Fe.params.proportion,softness:n=Fe.params.softness,distortion:i=Fe.params.distortion,swirl:s=Fe.params.swirl,swirlIterations:l=Fe.params.swirlIterations,shapeScale:u=Fe.params.shapeScale,shape:g=Fe.params.shape,fit:m=Fe.params.fit,scale:d=Fe.params.scale,rotation:_=Fe.params.rotation,originX:y=Fe.params.originX,originY:v=Fe.params.originY,offsetX:h=Fe.params.offsetX,offsetY:c=Fe.params.offsetY,worldWidth:f=Fe.params.worldWidth,worldHeight:p=Fe.params.worldHeight,...x}){let S={u_colors:r.map(A),u_colorsCount:r.length,u_proportion:a,u_softness:n,u_distortion:i,u_swirl:s,u_swirlIterations:l,u_shapeScale:u,u_shape:ql[g],u_noiseTexture:Ce(),u_scale:d,u_rotation:_,u_fit:R[m],u_offsetX:h,u_offsetY:c,u_originX:y,u_originY:v,u_worldWidth:f,u_worldHeight:p};return(0,ud.jsx)(U,{...x,speed:t,frame:o,fragmentShader:Kl,uniforms:S})},D);var pd=z(W(),1);var md=z(X(),1),ke={name:"Default",params:{...k,offsetX:0,offsetY:-.55,colorBack:"#000000",colorBloom:"#0000ff",colors:["#a600ff6e","#6200fff0","#ffffff","#33fff5"],density:.3,spotty:.3,midIntensity:.4,midSize:.2,intensity:.8,bloom:.4,speed:.75,frame:0}},t1={name:"Warp",params:{...k,colorBack:"#000000",colorBloom:"#222288",colors:["#ff47d4","#ff8c00","#ffffff"],density:.45,spotty:.15,midIntensity:.4,midSize:.33,intensity:.79,bloom:.4,speed:2,frame:0}},o1={name:"Linear",params:{...k,offsetX:.2,offsetY:-.8,colorBack:"#000000",colorBloom:"#eeeeee",colors:["#ffffff1f","#ffffff3d","#ffffff29"],density:.41,spotty:.25,midSize:.1,midIntensity:.75,intensity:.79,bloom:1,speed:.5,frame:0}},r1={name:"Ether",params:{...k,offsetX:-.6,colorBack:"#090f1d",colorBloom:"#ffffff",colors:["#148effa6","#c4dffebe","#232a47"],density:.03,spotty:.77,midSize:.1,midIntensity:.6,intensity:.6,bloom:.6,speed:1,frame:0}},dd=[ke,t1,o1,r1],gd=(0,pd.memo)(function({speed:t=ke.params.speed,frame:o=ke.params.frame,colorBloom:r=ke.params.colorBloom,colorBack:a=ke.params.colorBack,colors:n=ke.params.colors,density:i=ke.params.density,spotty:s=ke.params.spotty,midIntensity:l=ke.params.midIntensity,midSize:u=ke.params.midSize,intensity:g=ke.params.intensity,bloom:m=ke.params.bloom,fit:d=ke.params.fit,scale:_=ke.params.scale,rotation:y=ke.params.rotation,originX:v=ke.params.originX,originY:h=ke.params.originY,offsetX:c=ke.params.offsetX,offsetY:f=ke.params.offsetY,worldWidth:p=ke.params.worldWidth,worldHeight:x=ke.params.worldHeight,...S}){let w={u_colorBloom:A(r),u_colorBack:A(a),u_colors:n.map(A),u_colorsCount:n.length,u_density:i,u_spotty:s,u_midIntensity:l,u_midSize:u,u_intensity:g,u_bloom:m,u_noiseTexture:Ce(),u_fit:R[d],u_scale:_,u_rotation:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,md.jsx)(U,{...S,speed:t,frame:o,fragmentShader:Jl,uniforms:w})},D);var hd=z(W(),1);var vd=z(X(),1),ye={name:"Default",params:{...M,scale:1,colorBack:"#001429",colorFront:"#79D1FF",density:1,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:0,noiseFrequency:0,softness:0,speed:1,frame:0}},a1={name:"Droplet",params:{...M,colorBack:"#effafe",colorFront:"#bf40a0",density:.9,distortion:0,strokeWidth:.75,strokeTaper:.18,strokeCap:1,noise:.74,noiseFrequency:.33,softness:.02,speed:1,frame:0}},n1={name:"Jungle",params:{...M,scale:1.3,density:.5,colorBack:"#a0ef2a",colorFront:"#288b18",distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:1,noiseFrequency:.25,softness:0,speed:.75,frame:0}},i1={name:"Swirl",params:{...M,scale:.45,colorBack:"#b3e6d9",colorFront:"#1a2b4d",density:.2,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:0,noiseFrequency:.3,softness:.5,speed:1,frame:0}},xd=[ye,n1,a1,i1],_d=(0,hd.memo)(function({speed:t=ye.params.speed,frame:o=ye.params.frame,colorBack:r=ye.params.colorBack,colorFront:a=ye.params.colorFront,density:n=ye.params.density,distortion:i=ye.params.distortion,strokeWidth:s=ye.params.strokeWidth,strokeTaper:l=ye.params.strokeTaper,strokeCap:u=ye.params.strokeCap,noiseFrequency:g=ye.params.noiseFrequency,noise:m=ye.params.noise,softness:d=ye.params.softness,fit:_=ye.params.fit,rotation:y=ye.params.rotation,scale:v=ye.params.scale,originX:h=ye.params.originX,originY:c=ye.params.originY,offsetX:f=ye.params.offsetX,offsetY:p=ye.params.offsetY,worldWidth:x=ye.params.worldWidth,worldHeight:S=ye.params.worldHeight,...w}){let C={u_colorBack:A(r),u_colorFront:A(a),u_density:n,u_distortion:i,u_strokeWidth:s,u_strokeTaper:l,u_strokeCap:u,u_noiseFrequency:g,u_noise:m,u_softness:d,u_fit:R[_],u_scale:v,u_rotation:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,vd.jsx)(U,{...w,speed:t,frame:o,fragmentShader:Zl,uniforms:C})},D);var yd=z(W(),1);var Sd=z(X(),1),Ae={name:"Default",params:{...k,speed:.32,frame:0,colorBack:"#330000",colors:["#ffd1d1","#ff8a8a","#660000"],bandCount:4,twist:.1,center:.2,proportion:.5,softness:0,noiseFrequency:.4,noise:.2}},s1={name:"Opening",params:{...k,offsetX:-.4,offsetY:1,speed:.5,frame:0,colorBack:"#ff8b61",colors:["#fefff0","#ffd8bd","#ff8b61"],bandCount:2,twist:.3,center:.2,proportion:.5,softness:0,noiseFrequency:0,noise:0,scale:1}},l1={name:"007",params:{...k,speed:1,frame:0,colorBack:"#E9E7DA",colors:["#000000"],bandCount:5,twist:.3,center:0,proportion:0,softness:0,noiseFrequency:.5,noise:0}},u1={name:"Candy",params:{...k,speed:1,frame:0,colorBack:"#ffcd66",colors:["#6bbceb","#d7b3ff","#ff9fff"],bandCount:2,twist:.15,center:.2,proportion:.5,softness:1,noiseFrequency:.5,noise:0}},wd=[Ae,l1,s1,u1],Cd=(0,yd.memo)(function({speed:t=Ae.params.speed,frame:o=Ae.params.frame,colorBack:r=Ae.params.colorBack,colors:a=Ae.params.colors,bandCount:n=Ae.params.bandCount,twist:i=Ae.params.twist,center:s=Ae.params.center,proportion:l=Ae.params.proportion,softness:u=Ae.params.softness,noiseFrequency:g=Ae.params.noiseFrequency,noise:m=Ae.params.noise,fit:d=Ae.params.fit,rotation:_=Ae.params.rotation,scale:y=Ae.params.scale,originX:v=Ae.params.originX,originY:h=Ae.params.originY,offsetX:c=Ae.params.offsetX,offsetY:f=Ae.params.offsetY,worldWidth:p=Ae.params.worldWidth,worldHeight:x=Ae.params.worldHeight,...S}){let w={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_bandCount:n,u_twist:i,u_center:s,u_proportion:l,u_softness:u,u_noiseFrequency:g,u_noise:m,u_fit:R[d],u_scale:y,u_rotation:_,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,Sd.jsx)(U,{...S,speed:t,frame:o,fragmentShader:$l,uniforms:w})},D);var kd=z(W(),1);var Ad=z(X(),1),Je={name:"Default",params:{...M,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}},c1={name:"Sine Wave",params:{...M,speed:1,frame:0,colorBack:"#730d54",colorFront:"#00becc",shape:"wave",type:"4x4",size:11,scale:1.2}},f1={name:"Bugs",params:{...M,speed:1,frame:0,colorBack:"#000000",colorFront:"#008000",shape:"dots",type:"random",size:9}},p1={name:"Ripple",params:{...k,speed:1,frame:0,colorBack:"#603520",colorFront:"#c67953",shape:"ripple",type:"2x2",size:3}},m1={name:"Swirl",params:{...k,speed:1,frame:0,colorBack:"#00000000",colorFront:"#47a8e1",shape:"swirl",type:"8x8",size:2}},d1={name:"Warp",params:{...k,speed:1,frame:0,colorBack:"#301c2a",colorFront:"#56ae6c",shape:"warp",type:"4x4",size:2.5}},Bd=[Je,d1,c1,p1,f1,m1],Pd=(0,kd.memo)(function({speed:t=Je.params.speed,frame:o=Je.params.frame,colorBack:r=Je.params.colorBack,colorFront:a=Je.params.colorFront,shape:n=Je.params.shape,type:i=Je.params.type,pxSize:s,size:l=s===void 0?Je.params.size:s,fit:u=Je.params.fit,scale:g=Je.params.scale,rotation:m=Je.params.rotation,originX:d=Je.params.originX,originY:_=Je.params.originY,offsetX:y=Je.params.offsetX,offsetY:v=Je.params.offsetY,worldWidth:h=Je.params.worldWidth,worldHeight:c=Je.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colorFront:A(a),u_shape:tu[n],u_type:Va[i],u_pxSize:l,u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,Ad.jsx)(U,{...f,speed:t,frame:o,fragmentShader:eu,uniforms:p})});var Ed=z(W(),1);var Fd=z(X(),1),We={name:"Default",params:{...k,speed:1,frame:0,colorBack:"#000000",colors:["#7300ff","#eba8ff","#00bfff","#2a00ff"],softness:.5,intensity:.5,noise:.25,shape:"corners"}},g1={name:"Wave",params:{...M,speed:1,frame:0,colorBack:"#000a0f",colors:["#c4730b","#bdad5f","#d8ccc7"],softness:.7,intensity:.15,noise:.5,shape:"wave"}},h1={name:"Dots",params:{...M,scale:.6,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f0000","#0080ff","#f2ebc9","#33cc33"],softness:1,intensity:1,noise:.7,shape:"dots"}},v1={name:"Truchet",params:{...M,speed:1,frame:0,colorBack:"#0a0000",colors:["#6f2200","#eabb7c","#39b523"],softness:0,intensity:.2,noise:1,shape:"truchet"}},x1={name:"Ripple",params:{...k,scale:.5,speed:1,frame:0,colorBack:"#140a00",colors:["#6f2d00","#88ddae","#2c0b1d"],softness:.5,intensity:.5,noise:.5,shape:"ripple"}},_1={name:"Blob",params:{...k,scale:1.3,speed:1,frame:0,colorBack:"#0f0e18",colors:["#3e6172","#a49b74","#568c50"],softness:0,intensity:.15,noise:.5,shape:"blob"}},zd=[We,g1,h1,v1,x1,_1],Ud=(0,Ed.memo)(function({speed:t=We.params.speed,frame:o=We.params.frame,colorBack:r=We.params.colorBack,colors:a=We.params.colors,softness:n=We.params.softness,intensity:i=We.params.intensity,noise:s=We.params.noise,shape:l=We.params.shape,fit:u=We.params.fit,scale:g=We.params.scale,rotation:m=We.params.rotation,originX:d=We.params.originX,originY:_=We.params.originY,offsetX:y=We.params.offsetX,offsetY:v=We.params.offsetY,worldWidth:h=We.params.worldWidth,worldHeight:c=We.params.worldHeight,...f}){let p={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_softness:n,u_intensity:i,u_noise:s,u_shape:ru[l],u_noiseTexture:Ce(),u_fit:R[u],u_scale:g,u_rotation:m,u_offsetX:y,u_offsetY:v,u_originX:d,u_originY:_,u_worldWidth:h,u_worldHeight:c};return(0,Fd.jsx)(U,{...f,speed:t,frame:o,fragmentShader:ou,uniforms:p})});var Rd=z(W(),1);var Md=z(X(),1),J={name:"Default",params:{...k,speed:1,frame:0,scale:.6,colorBack:"#000000",colors:["#0dc1fd","#d915ef","#ff3f2ecc"],roundness:.25,thickness:.1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",softness:.75,intensity:.2,bloom:.25,spots:5,spotSize:.5,pulse:.25,smoke:.3,smokeSize:.6}},y1={name:"Circle",params:{...k,aspectRatio:"square",scale:.6,speed:1,frame:0,colorBack:"#000000",colors:["#0dc1fd","#d915ef","#ff3f2ecc"],roundness:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,thickness:0,softness:.75,intensity:.2,bloom:.45,spots:3,spotSize:.4,pulse:.5,smoke:1,smokeSize:0}},S1={name:"Northern lights",params:{...k,speed:.18,scale:1.1,frame:0,colors:["#4c4794","#774a7d","#12694a","#0aff78","#4733cc"],colorBack:"#0c182c",roundness:0,thickness:1,softness:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",intensity:.1,bloom:.2,spots:4,spotSize:.25,pulse:0,smoke:.32,smokeSize:.5}},w1={name:"Solid line",params:{...k,speed:1,frame:0,colors:["#81ADEC"],colorBack:"#00000000",roundness:0,thickness:.05,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",softness:0,intensity:0,bloom:.15,spots:4,spotSize:1,pulse:0,smoke:0,smokeSize:0}},Id=[J,y1,S1,w1],Vd=(0,Rd.memo)(function({speed:t=J.params.speed,frame:o=J.params.frame,colors:r=J.params.colors,colorBack:a=J.params.colorBack,roundness:n=J.params.roundness,thickness:i=J.params.thickness,aspectRatio:s=J.params.aspectRatio,softness:l=J.params.softness,bloom:u=J.params.bloom,intensity:g=J.params.intensity,spots:m=J.params.spots,spotSize:d=J.params.spotSize,pulse:_=J.params.pulse,smoke:y=J.params.smoke,smokeSize:v=J.params.smokeSize,margin:h,marginLeft:c=h??J.params.marginLeft,marginRight:f=h??J.params.marginRight,marginTop:p=h??J.params.marginTop,marginBottom:x=h??J.params.marginBottom,fit:S=J.params.fit,rotation:w=J.params.rotation,scale:C=J.params.scale,originX:P=J.params.originX,originY:I=J.params.originY,offsetX:E=J.params.offsetX,offsetY:N=J.params.offsetY,worldWidth:G=J.params.worldWidth,worldHeight:ce=J.params.worldHeight,...ne}){let fe={u_colorBack:A(a),u_colors:r.map(A),u_colorsCount:r.length,u_roundness:n,u_thickness:i,u_marginLeft:c,u_marginRight:f,u_marginTop:p,u_marginBottom:x,u_aspectRatio:nu[s],u_softness:l,u_intensity:g,u_bloom:u,u_spots:m,u_spotSize:d,u_pulse:_,u_smoke:y,u_smokeSize:v,u_noiseTexture:Ce(),u_fit:R[S],u_rotation:w,u_scale:C,u_offsetX:E,u_offsetY:N,u_originX:P,u_originY:I,u_worldWidth:G,u_worldHeight:ce};return(0,Md.jsx)(U,{...ne,speed:t,frame:o,fragmentShader:au,uniforms:fe})},D);var Od=z(W(),1);var Dd=z(X(),1),he={name:"Default",params:{...k,speed:.5,frame:0,colors:["#ff9d00","#fd4f30","#809bff","#6d2eff","#333aff","#f15cff","#ffd557"],colorBack:"#000000",angle1:0,angle2:0,length:1.1,edges:!1,blur:0,fadeIn:1,fadeOut:.3,gradient:0,density:3,scale:.8}},C1={name:"Glass",params:{...k,rotation:112,speed:1,frame:0,colors:["#00cfff","#ff2d55","#34c759","#af52de"],colorBack:"#ffffff00",angle1:.3,angle2:.3,length:1,edges:!0,blur:.25,fadeIn:.85,fadeOut:.3,gradient:0,density:1.6}},k1={name:"Gradient",params:{...k,speed:.5,frame:0,colors:["#f2ff00","#00000000","#00000000","#5a0283","#005eff"],colorBack:"#8ffff2",angle1:.4,angle2:.4,length:3,edges:!1,blur:.5,fadeIn:1,fadeOut:.39,gradient:.78,density:1.65,scale:1.72,rotation:270,offsetX:.18}},A1={name:"Opening",params:{...k,speed:2,frame:0,colors:["#00ffff"],colorBack:"#570044",angle1:-1,angle2:-1,length:.52,edges:!1,blur:0,fadeIn:0,fadeOut:1,gradient:0,density:2.21,scale:2.32,rotation:360,offsetX:-.3,offsetY:.6}},Nd=[he,C1,k1,A1],Td=(0,Od.memo)(function({speed:t=he.params.speed,frame:o=he.params.frame,colors:r=he.params.colors,colorBack:a=he.params.colorBack,angle1:n=he.params.angle1,angle2:i=he.params.angle2,length:s=he.params.length,edges:l=he.params.edges,blur:u=he.params.blur,fadeIn:g=he.params.fadeIn,fadeOut:m=he.params.fadeOut,density:d=he.params.density,gradient:_=he.params.gradient,fit:y=he.params.fit,scale:v=he.params.scale,rotation:h=he.params.rotation,originX:c=he.params.originX,originY:f=he.params.originY,offsetX:p=he.params.offsetX,offsetY:x=he.params.offsetY,worldWidth:S=he.params.worldWidth,worldHeight:w=he.params.worldHeight,...C}){let P={u_colors:r.map(A),u_colorsCount:r.length,u_colorBack:A(a),u_angle1:n,u_angle2:i,u_length:s,u_edges:l,u_blur:u,u_fadeIn:g,u_fadeOut:m,u_density:d,u_gradient:_,u_fit:R[y],u_scale:v,u_rotation:h,u_offsetX:p,u_offsetY:x,u_originX:c,u_originY:f,u_worldWidth:S,u_worldHeight:w};return(0,Dd.jsx)(U,{...C,speed:t,frame:o,fragmentShader:iu,uniforms:P})},D);var bd=z(W(),1);var Gd=z(X(),1),Be={name:"Default",params:{...k,rotation:270,speed:0,frame:0,colors:["#ffad0a","#6200ff","#e2a3ff","#ff99fd"],positions:2,waveX:1,waveXShift:.6,waveY:1,waveYShift:.21,mixing:.93,grainMixer:0,grainOverlay:0}},B1={name:"Sea",params:{...k,speed:0,frame:0,colors:["#013b65","#03738c","#a3d3ff","#f2faef"],positions:0,waveX:.53,waveXShift:0,waveY:.95,waveYShift:.64,mixing:.5,grainMixer:0,grainOverlay:0}},P1={name:"1960s",params:{...k,speed:0,frame:0,colors:["#000000","#082400","#b1aa91","#8e8c15"],positions:42,waveX:.45,waveXShift:0,waveY:1,waveYShift:0,mixing:0,grainMixer:.37,grainOverlay:.78}},E1={name:"Sunset",params:{...k,speed:0,frame:0,colors:["#264653","#9c2b2b","#f4a261","#ffffff"],positions:0,waveX:.6,waveXShift:.7,waveY:.7,waveYShift:.7,mixing:.5,grainMixer:0,grainOverlay:0}},Ld=[Be,P1,E1,B1],Wd=(0,bd.memo)(function({speed:t=Be.params.speed,frame:o=Be.params.frame,colors:r=Be.params.colors,positions:a=Be.params.positions,waveX:n=Be.params.waveX,waveXShift:i=Be.params.waveXShift,waveY:s=Be.params.waveY,waveYShift:l=Be.params.waveYShift,mixing:u=Be.params.mixing,grainMixer:g=Be.params.grainMixer,grainOverlay:m=Be.params.grainOverlay,fit:d=Be.params.fit,rotation:_=Be.params.rotation,scale:y=Be.params.scale,originX:v=Be.params.originX,originY:h=Be.params.originY,offsetX:c=Be.params.offsetX,offsetY:f=Be.params.offsetY,worldWidth:p=Be.params.worldWidth,worldHeight:x=Be.params.worldHeight,...S}){let w={u_colors:r.map(A),u_colorsCount:r.length,u_positions:a,u_waveX:n,u_waveXShift:i,u_waveY:s,u_waveYShift:l,u_mixing:u,u_grainMixer:g,u_grainOverlay:m,u_fit:R[d],u_rotation:_,u_scale:y,u_offsetX:c,u_offsetY:f,u_originX:v,u_originY:h,u_worldWidth:p,u_worldHeight:x};return(0,Gd.jsx)(U,{...S,speed:t,frame:o,fragmentShader:su,uniforms:w})},D);var Yd=z(W(),1);var Qd=z(X(),1),le={name:"Default",params:{...k,scale:1,speed:0,frame:0,colorBack:"#000000",colors:["#00bbff","#00ffe1","#ffffff"],radius:.8,focalDistance:.99,focalAngle:0,falloff:.24,mixing:.5,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},F1={name:"Cross Section",params:{...k,scale:1,speed:0,frame:0,colorBack:"#3d348b",colors:["#7678ed","#f7b801","#f18701","#37a066"],radius:1,focalDistance:0,focalAngle:0,falloff:0,mixing:0,distortion:1,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},z1={name:"Radial",params:{...k,scale:1,speed:0,frame:0,colorBack:"#264653",colors:["#9c2b2b","#f4a261","#ffffff"],radius:1,focalDistance:0,focalAngle:0,falloff:0,mixing:1,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}},U1={name:"Lo-Fi",params:{...k,speed:0,frame:0,colorBack:"#2e1f27",colors:["#d72638","#3f88c5","#f49d37"],radius:1,focalDistance:0,focalAngle:0,falloff:.9,mixing:.7,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:1,grainOverlay:.5}},Hd=[le,U1,F1,z1],jd=(0,Yd.memo)(function({speed:t=le.params.speed,frame:o=le.params.frame,colorBack:r=le.params.colorBack,colors:a=le.params.colors,radius:n=le.params.radius,focalDistance:i=le.params.focalDistance,focalAngle:s=le.params.focalAngle,falloff:l=le.params.falloff,grainMixer:u=le.params.grainMixer,mixing:g=le.params.mixing,distortion:m=le.params.distortion,distortionShift:d=le.params.distortionShift,distortionFreq:_=le.params.distortionFreq,grainOverlay:y=le.params.grainOverlay,fit:v=le.params.fit,rotation:h=le.params.rotation,scale:c=le.params.scale,originX:f=le.params.originX,originY:p=le.params.originY,offsetX:x=le.params.offsetX,offsetY:S=le.params.offsetY,worldWidth:w=le.params.worldWidth,worldHeight:C=le.params.worldHeight,...P}){let I={u_colorBack:A(r),u_colors:a.map(A),u_colorsCount:a.length,u_radius:n,u_focalDistance:i,u_focalAngle:s,u_falloff:l,u_mixing:g,u_distortion:m,u_distortionShift:d,u_distortionFreq:_,u_grainMixer:u,u_grainOverlay:y,u_fit:R[v],u_rotation:h,u_scale:c,u_offsetX:x,u_offsetY:S,u_originX:f,u_originY:p,u_worldWidth:w,u_worldHeight:C};return(0,Qd.jsx)(U,{...P,speed:t,frame:o,fragmentShader:lu,uniforms:I})},D);var Xd=z(W(),1);var Kd=z(X(),1),ae={name:"Default",params:{...k,fit:"cover",scale:.6,speed:0,frame:0,colorFront:"#9fadbc",colorBack:"#ffffff",contrast:.3,roughness:.4,fiber:.3,fiberSize:.2,crumples:.3,crumpleSize:.35,folds:.65,foldCount:5,fade:0,drops:.2,seed:5.8}},R1={name:"Abstract",params:{...k,fit:"cover",speed:0,frame:0,scale:.6,colorFront:"#00eeff",colorBack:"#ff0a81",contrast:.85,roughness:0,fiber:.1,fiberSize:.2,crumples:0,crumpleSize:.3,folds:1,foldCount:3,fade:0,drops:.2,seed:2.2}},M1={name:"Cardboard",params:{...k,fit:"cover",speed:0,frame:0,scale:.6,colorFront:"#c7b89e",colorBack:"#999180",contrast:.4,roughness:0,fiber:.35,fiberSize:.14,crumples:.7,crumpleSize:.1,folds:0,foldCount:1,fade:0,drops:.1,seed:1.6}},I1={name:"Details",params:{...k,speed:0,frame:0,fit:"cover",scale:3,colorFront:"#00000000",colorBack:"#00000000",contrast:0,roughness:1,fiber:.27,fiberSize:.22,crumples:1,crumpleSize:.5,folds:1,foldCount:15,fade:0,drops:0,seed:6}},qd=[ae,M1,R1,I1],Jd=(0,Xd.memo)(function({speed:t=ae.params.speed,frame:o=ae.params.frame,colorFront:r=ae.params.colorFront,colorBack:a=ae.params.colorBack,image:n="",contrast:i=ae.params.contrast,roughness:s=ae.params.roughness,fiber:l=ae.params.fiber,crumples:u=ae.params.crumples,folds:g=ae.params.folds,drops:m=ae.params.drops,seed:d=ae.params.seed,fiberScale:_,fiberSize:y=_===void 0?ae.params.fiberSize:.2/_,crumplesScale:v,crumpleSize:h=v===void 0?ae.params.crumpleSize:.2/v,blur:c,fade:f=c===void 0?ae.params.fade:c,foldsNumber:p,foldCount:x=p===void 0?ae.params.foldCount:p,fit:S=ae.params.fit,scale:w=ae.params.scale,rotation:C=ae.params.rotation,originX:P=ae.params.originX,originY:I=ae.params.originY,offsetX:E=ae.params.offsetX,offsetY:N=ae.params.offsetY,worldWidth:G=ae.params.worldWidth,worldHeight:ce=ae.params.worldHeight,...ne}){let fe=typeof window<"u"&&{u_noiseTexture:Ce()},Re={u_image:n,u_colorFront:A(r),u_colorBack:A(a),u_contrast:i,u_roughness:s,u_fiber:l,u_fiberSize:y,u_crumples:u,u_crumpleSize:h,u_foldCount:x,u_folds:g,u_fade:f,u_drops:m,u_seed:d,...fe,u_fit:R[S],u_scale:w,u_rotation:C,u_offsetX:E,u_offsetY:N,u_originX:P,u_originY:I,u_worldWidth:G,u_worldHeight:ce};return(0,Kd.jsx)(U,{...ne,speed:t,frame:o,fragmentShader:uu,mipmaps:["u_image"],uniforms:Re})},D);var Zd=z(W(),1);var $d=z(X(),1),j={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:.25,size:.5,angle:0,distortionShape:"prism",highlights:.1,shape:"lines",distortion:.5,shift:0,blur:0,edges:.25,stretch:0,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:0}},V1={name:"Waves",params:{...k,fit:"cover",scale:1.2,speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:0,size:.9,angle:0,distortionShape:"contour",highlights:0,shape:"wave",distortion:.5,shift:0,blur:.1,edges:.5,stretch:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:0,grainOverlay:.05}},O1={name:"Abstract",params:{...k,fit:"cover",scale:4,speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:0,size:.7,angle:30,distortionShape:"flat",highlights:0,shape:"linesIrregular",distortion:1,shift:0,blur:1,edges:.5,stretch:1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,grainMixer:.1,grainOverlay:.1}},D1={name:"Folds",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#00000000",colorShadow:"#000000",colorHighlight:"#ffffff",shadows:.4,size:.4,angle:0,distortionShape:"cascade",highlights:0,shape:"lines",distortion:.75,shift:0,blur:.25,edges:.5,stretch:0,margin:.1,marginLeft:.1,marginRight:.1,marginTop:.1,marginBottom:.1,grainMixer:0,grainOverlay:0}},e0=[j,O1,V1,D1],t0=(0,Zd.memo)(function({speed:t=j.params.speed,frame:o=j.params.frame,colorBack:r=j.params.colorBack,colorShadow:a=j.params.colorShadow,colorHighlight:n=j.params.colorHighlight,image:i="",shadows:s=j.params.shadows,angle:l=j.params.angle,distortion:u=j.params.distortion,distortionShape:g=j.params.distortionShape,highlights:m=j.params.highlights,shape:d=j.params.shape,shift:_=j.params.shift,blur:y=j.params.blur,edges:v=j.params.edges,margin:h,marginLeft:c=h??j.params.marginLeft,marginRight:f=h??j.params.marginRight,marginTop:p=h??j.params.marginTop,marginBottom:x=h??j.params.marginBottom,grainMixer:S=j.params.grainMixer,grainOverlay:w=j.params.grainOverlay,stretch:C=j.params.stretch,count:P,size:I=P===void 0?j.params.size:Math.pow(1/(P*1.6),1/6)/.7-.5,fit:E=j.params.fit,scale:N=j.params.scale,rotation:G=j.params.rotation,originX:ce=j.params.originX,originY:ne=j.params.originY,offsetX:fe=j.params.offsetX,offsetY:Re=j.params.offsetY,worldWidth:kt=j.params.worldWidth,worldHeight:no=j.params.worldHeight,...Ye}){let Qe={u_image:i,u_colorBack:A(r),u_colorShadow:A(a),u_colorHighlight:A(n),u_shadows:s,u_size:I,u_angle:l,u_distortion:u,u_shift:_,u_blur:y,u_edges:v,u_stretch:C,u_distortionShape:mu[g],u_highlights:m,u_shape:pu[d],u_marginLeft:c,u_marginRight:f,u_marginTop:p,u_marginBottom:x,u_grainMixer:S,u_grainOverlay:w,u_fit:R[E],u_scale:N,u_rotation:G,u_offsetX:fe,u_offsetY:Re,u_originX:ce,u_originY:ne,u_worldWidth:kt,u_worldHeight:no};return(0,$d.jsx)(U,{...Ye,speed:t,frame:o,fragmentShader:fu,mipmaps:["u_image"],uniforms:Qe})});var o0=z(W(),1);var r0=z(X(),1),ze={name:"Default",params:{...k,scale:.8,speed:1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:.07,layering:.5,edges:.8,waves:.3,caustic:.1,size:1}},N1={name:"Abstract",params:{...k,fit:"cover",scale:3,speed:1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:0,layering:0,edges:1,waves:1,caustic:.4,size:.15}},T1={name:"Streaming",params:{...k,fit:"contain",scale:.4,speed:2,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:0,layering:0,edges:0,waves:.5,caustic:0,size:.5}},b1={name:"Slow-mo",params:{...k,fit:"cover",scale:1,speed:.1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:.4,layering:0,edges:0,waves:0,caustic:.2,size:.7}},a0=[ze,b1,N1,T1],n0=(0,o0.memo)(function({speed:t=ze.params.speed,frame:o=ze.params.frame,colorBack:r=ze.params.colorBack,colorHighlight:a=ze.params.colorHighlight,image:n="",highlights:i=ze.params.highlights,layering:s=ze.params.layering,waves:l=ze.params.waves,edges:u=ze.params.edges,caustic:g=ze.params.caustic,effectScale:m,size:d=m===void 0?ze.params.size:10/9/m-1/9,fit:_=ze.params.fit,scale:y=ze.params.scale,rotation:v=ze.params.rotation,originX:h=ze.params.originX,originY:c=ze.params.originY,offsetX:f=ze.params.offsetX,offsetY:p=ze.params.offsetY,worldWidth:x=ze.params.worldWidth,worldHeight:S=ze.params.worldHeight,...w}){let C={u_image:n,u_colorBack:A(r),u_colorHighlight:A(a),u_highlights:i,u_layering:s,u_waves:l,u_edges:u,u_caustic:g,u_size:d,u_fit:R[_],u_rotation:v,u_scale:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,r0.jsx)(U,{...w,speed:t,frame:o,fragmentShader:cu,mipmaps:["u_image"],uniforms:C})},D);var i0=z(W(),1);var s0=z(X(),1),Ue={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#94ffaf",colorBack:"#000c38",colorHighlight:"#eaff94",type:"8x8",size:2,colorSteps:2,originalColors:!1,inverted:!1}},G1={name:"Retro",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#eeeeee",colorBack:"#5452ff",colorHighlight:"#eeeeee",type:"2x2",size:3,colorSteps:1,originalColors:!0,inverted:!1}},L1={name:"Noise",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#a2997c",colorBack:"#000000",colorHighlight:"#ededed",type:"random",size:1,colorSteps:1,originalColors:!1,inverted:!1}},W1={name:"Natural",params:{...k,fit:"cover",speed:0,frame:0,colorFront:"#ffffff",colorBack:"#000000",colorHighlight:"#ffffff",type:"8x8",size:2,colorSteps:5,originalColors:!0,inverted:!1}},l0=[Ue,L1,G1,W1],u0=(0,i0.memo)(function({speed:t=Ue.params.speed,frame:o=Ue.params.frame,colorFront:r=Ue.params.colorFront,colorBack:a=Ue.params.colorBack,colorHighlight:n=Ue.params.colorHighlight,image:i="",type:s=Ue.params.type,colorSteps:l=Ue.params.colorSteps,originalColors:u=Ue.params.originalColors,inverted:g=Ue.params.inverted,pxSize:m,size:d=m===void 0?Ue.params.size:m,fit:_=Ue.params.fit,scale:y=Ue.params.scale,rotation:v=Ue.params.rotation,originX:h=Ue.params.originX,originY:c=Ue.params.originY,offsetX:f=Ue.params.offsetX,offsetY:p=Ue.params.offsetY,worldWidth:x=Ue.params.worldWidth,worldHeight:S=Ue.params.worldHeight,...w}){let C={u_image:i,u_colorFront:A(r),u_colorBack:A(a),u_colorHighlight:A(n),u_type:Va[s],u_pxSize:d,u_colorSteps:l,u_originalColors:u,u_inverted:g,u_fit:R[_],u_rotation:v,u_scale:y,u_offsetX:f,u_offsetY:p,u_originX:h,u_originY:c,u_worldWidth:x,u_worldHeight:S};return(0,s0.jsx)(U,{...w,speed:t,frame:o,fragmentShader:du,uniforms:C})},D);var Fo=z(W(),1);var ao="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";var Y1=e=>typeof e=="object"&&typeof e.then=="function",c0=[];function Q1(e,t){if(e===t)return!0;if(!e||!t)return!1;let o=e.length;if(t.length!==o)return!1;for(let r=0;r<o;r++)if(e[r]!==t[r])return!1;return!0}function H1(e,t=null){t===null&&(t=[e]);for(let r of c0)if(Q1(t,r.keys)){if(Object.prototype.hasOwnProperty.call(r,"error"))throw r.error;if(Object.prototype.hasOwnProperty.call(r,"response"))return r.response;throw r.promise}let o={keys:t,promise:(Y1(e)?e:e(...t)).then(r=>{o.response=r}).catch(r=>o.error=r)};throw c0.push(o),o.promise}var Rr=(e,t)=>H1(e,t);var f0=z(X(),1),De={name:"Default",params:{...k,scale:.75,speed:1,frame:0,contour:.5,angle:0,noise:0,innerGlow:.5,outerGlow:.5,colorBack:"#000000",colors:["#11206a","#1f3ba2","#2f63e7","#6bd7ff","#ffe679","#ff991e","#ff4c00"]}},j1={name:"Sepia",params:{...k,scale:.75,speed:.5,frame:0,contour:.5,angle:0,noise:.75,innerGlow:.5,outerGlow:.5,colorBack:"#000000",colors:["#997F45","#ffffff"]}},p0=[De,j1],m0=(0,Fo.memo)(function({speed:t=De.params.speed,frame:o=De.params.frame,image:r="",contour:a=De.params.contour,angle:n=De.params.angle,noise:i=De.params.noise,innerGlow:s=De.params.innerGlow,outerGlow:l=De.params.outerGlow,colorBack:u=De.params.colorBack,colors:g=De.params.colors,suspendWhenProcessingImage:m=!1,fit:d=De.params.fit,offsetX:_=De.params.offsetX,offsetY:y=De.params.offsetY,originX:v=De.params.originX,originY:h=De.params.originY,rotation:c=De.params.rotation,scale:f=De.params.scale,worldHeight:p=De.params.worldHeight,worldWidth:x=De.params.worldWidth,...S}){let w=typeof r=="string"?r:r.src,[C,P]=(0,Fo.useState)(ao),I;m&&typeof window<"u"?I=Rr(()=>pi(w).then(N=>URL.createObjectURL(N.blob)),[w,"heatmap"]):I=C,(0,Fo.useLayoutEffect)(()=>{if(m)return;if(!w){P(ao);return}let N,G=!0;return pi(w).then(ce=>{G&&(N=URL.createObjectURL(ce.blob),P(N))}),()=>{G=!1}},[w,m]);let E=(0,Fo.useMemo)(()=>({u_image:I,u_contour:a,u_angle:n,u_noise:i,u_innerGlow:s,u_outerGlow:l,u_colorBack:A(u),u_colors:g.map(A),u_colorsCount:g.length,u_fit:R[d],u_offsetX:_,u_offsetY:y,u_originX:v,u_originY:h,u_rotation:c,u_scale:f,u_worldHeight:p,u_worldWidth:x}),[t,o,a,n,i,s,l,g,u,I,d,_,y,v,h,c,f,p,x]);return(0,f0.jsx)(U,{...S,speed:t,frame:o,fragmentShader:hu,mipmaps:["u_image"],uniforms:E})},D);var Mr=z(W(),1);var d0=z(X(),1),Se={name:"Default",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#AAAAAC",colorTint:"#ffffff",distortion:.07,repetition:2,shiftRed:.3,shiftBlue:.3,contour:.4,softness:.1,angle:70,shape:"diamond"}},X1={name:"Noir",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorTint:"#606060",softness:.45,repetition:1.5,shiftRed:0,shiftBlue:0,distortion:0,contour:0,angle:90,shape:"diamond"}},K1={name:"Backdrop",params:{...k,speed:1,frame:0,scale:1,colorBack:"#AAAAAC",colorTint:"#ffffff",softness:.05,repetition:1.5,shiftRed:.3,shiftBlue:.3,distortion:.1,contour:.4,shape:"none",angle:90,worldWidth:0,worldHeight:0}},q1={name:"Stripes",params:{...k,speed:1,frame:0,scale:.6,colorBack:"#000000",colorTint:"#2c5d72",softness:.8,repetition:6,shiftRed:1,shiftBlue:-1,distortion:.4,contour:.4,shape:"circle",angle:0}},g0=[Se,X1,K1,q1],h0=(0,Mr.memo)(function({colorBack:t=Se.params.colorBack,colorTint:o=Se.params.colorTint,speed:r=Se.params.speed,frame:a=Se.params.frame,image:n="",contour:i=Se.params.contour,distortion:s=Se.params.distortion,softness:l=Se.params.softness,repetition:u=Se.params.repetition,shiftRed:g=Se.params.shiftRed,shiftBlue:m=Se.params.shiftBlue,angle:d=Se.params.angle,shape:_=Se.params.shape,suspendWhenProcessingImage:y=!1,fit:v=Se.params.fit,scale:h=Se.params.scale,rotation:c=Se.params.rotation,originX:f=Se.params.originX,originY:p=Se.params.originY,offsetX:x=Se.params.offsetX,offsetY:S=Se.params.offsetY,worldWidth:w=Se.params.worldWidth,worldHeight:C=Se.params.worldHeight,...P}){let I=typeof n=="string"?n:n.src,[E,N]=(0,Mr.useState)(ao),G;y&&typeof window<"u"&&I?G=Rr(()=>mi(I).then(ne=>URL.createObjectURL(ne.pngBlob)),[I,"liquid-metal"]):G=E,(0,Mr.useLayoutEffect)(()=>{if(y)return;if(!I){N(ao);return}let ne,fe=!0;return mi(I).then(Re=>{fe&&(ne=URL.createObjectURL(Re.pngBlob),N(ne))}),()=>{fe=!1}},[I,y]);let ce={u_colorBack:A(t),u_colorTint:A(o),u_image:G,u_contour:i,u_distortion:s,u_softness:l,u_repetition:u,u_shiftRed:g,u_shiftBlue:m,u_angle:d,u_isImage:!!n,u_shape:xu[_],u_fit:R[v],u_scale:h,u_rotation:c,u_offsetX:x,u_offsetY:S,u_originX:f,u_originY:p,u_worldWidth:w,u_worldHeight:C};return(0,d0.jsx)(U,{...P,speed:r,frame:a,fragmentShader:vu,mipmaps:["u_image"],uniforms:ce})});var v0=z(W(),1);var x0=z(X(),1),ue={name:"Default",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#f2f1e8",colorFront:"#2b2b2b",size:.5,radius:1.25,contrast:.4,originalColors:!1,inverted:!1,grainMixer:.2,grainOverlay:.2,grainSize:.5,grid:"hex",type:"gooey"}},J1={name:"LED screen",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#000000",colorFront:"#29ff7b",size:.5,radius:1.5,contrast:.3,originalColors:!1,inverted:!1,grainMixer:0,grainOverlay:0,grainSize:.5,grid:"square",type:"soft"}},Z1={name:"Mosaic",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#000000",colorFront:"#b2aeae",size:.6,radius:2,contrast:.01,originalColors:!0,inverted:!1,grainMixer:0,grainOverlay:0,grainSize:.5,grid:"hex",type:"classic"}},$1={name:"Round and square",params:{...k,fit:"cover",speed:0,frame:0,colorBack:"#141414",colorFront:"#ff8000",size:.8,radius:1,contrast:1,originalColors:!1,inverted:!0,grainMixer:.05,grainOverlay:.3,grainSize:.5,grid:"square",type:"holes"}},_0=[ue,J1,Z1,$1],y0=(0,v0.memo)(function({speed:t=ue.params.speed,frame:o=ue.params.frame,colorFront:r=ue.params.colorFront,colorBack:a=ue.params.colorBack,image:n="",size:i=ue.params.size,radius:s=ue.params.radius,contrast:l=ue.params.contrast,originalColors:u=ue.params.originalColors,inverted:g=ue.params.inverted,grainMixer:m=ue.params.grainMixer,grainOverlay:d=ue.params.grainOverlay,grainSize:_=ue.params.grainSize,grid:y=ue.params.grid,type:v=ue.params.type,fit:h=ue.params.fit,scale:c=ue.params.scale,rotation:f=ue.params.rotation,originX:p=ue.params.originX,originY:x=ue.params.originY,offsetX:S=ue.params.offsetX,offsetY:w=ue.params.offsetY,worldWidth:C=ue.params.worldWidth,worldHeight:P=ue.params.worldHeight,...I}){let E={u_image:n,u_colorFront:A(r),u_colorBack:A(a),u_size:i,u_radius:s,u_contrast:l,u_originalColors:u,u_inverted:g,u_grainMixer:m,u_grainOverlay:d,u_grainSize:_,u_grid:Su[y],u_type:yu[v],u_fit:R[h],u_rotation:f,u_scale:c,u_offsetX:S,u_offsetY:w,u_originX:p,u_originY:x,u_worldWidth:C,u_worldHeight:P};return(0,x0.jsx)(U,{...I,speed:t,frame:o,fragmentShader:_u,uniforms:E})},D);var S0=z(W(),1);var w0=z(X(),1),H={name:"Default",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#fbfaf5",colorC:"#00b4ff",colorM:"#fc519f",colorY:"#ffd800",colorK:"#231f20",size:.2,contrast:1,softness:1,grainSize:.5,grainMixer:0,grainOverlay:0,gridNoise:.2,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:.3,gainM:0,gainY:.2,gainK:0,type:"ink"}},ex={name:"Drops",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#eeefd7",colorC:"#00b2ff",colorM:"#fc4f4f",colorY:"#ffd900",colorK:"#231f20",size:.88,contrast:1.15,softness:0,grainSize:.01,grainMixer:.05,grainOverlay:.25,gridNoise:.5,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:1,gainM:.44,gainY:-1,gainK:0,type:"ink"}},tx={name:"Newspaper",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#f2f1e8",colorC:"#7a7a75",colorM:"#7a7a75",colorY:"#7a7a75",colorK:"#231f20",size:.01,contrast:2,softness:.2,grainSize:0,grainMixer:0,grainOverlay:.2,gridNoise:.6,floodC:0,floodM:0,floodY:0,floodK:.1,gainC:-.17,gainM:-.45,gainY:-.45,gainK:0,type:"dots"}},ox={name:"Vintage",params:{...k,scale:1,fit:"cover",speed:0,frame:0,colorBack:"#fffaf0",colorC:"#59afc5",colorM:"#d8697c",colorY:"#fad85c",colorK:"#2d2824",size:.2,contrast:1.25,softness:.4,grainSize:.5,grainMixer:.15,grainOverlay:.1,gridNoise:.45,floodC:.15,floodM:0,floodY:0,floodK:0,gainC:.3,gainM:0,gainY:.2,gainK:0,type:"sharp"}},C0=[H,ex,tx,ox],k0=(0,S0.memo)(function({speed:t=H.params.speed,frame:o=H.params.frame,colorBack:r=H.params.colorBack,colorC:a=H.params.colorC,colorM:n=H.params.colorM,colorY:i=H.params.colorY,colorK:s=H.params.colorK,image:l="",size:u=H.params.size,contrast:g=H.params.contrast,softness:m=H.params.softness,grainSize:d=H.params.grainSize,grainMixer:_=H.params.grainMixer,grainOverlay:y=H.params.grainOverlay,gridNoise:v=H.params.gridNoise,floodC:h=H.params.floodC,floodM:c=H.params.floodM,floodY:f=H.params.floodY,floodK:p=H.params.floodK,gainC:x=H.params.gainC,gainM:S=H.params.gainM,gainY:w=H.params.gainY,gainK:C=H.params.gainK,type:P=H.params.type,fit:I=H.params.fit,scale:E=H.params.scale,rotation:N=H.params.rotation,originX:G=H.params.originX,originY:ce=H.params.originY,offsetX:ne=H.params.offsetX,offsetY:fe=H.params.offsetY,worldWidth:Re=H.params.worldWidth,worldHeight:kt=H.params.worldHeight,...no}){let Ye={u_image:l,u_noiseTexture:Ce(),u_colorBack:A(r),u_colorC:A(a),u_colorM:A(n),u_colorY:A(i),u_colorK:A(s),u_size:u,u_contrast:g,u_softness:m,u_grainSize:d,u_grainMixer:_,u_grainOverlay:y,u_gridNoise:v,u_floodC:h,u_floodM:c,u_floodY:f,u_floodK:p,u_gainC:x,u_gainM:S,u_gainY:w,u_gainK:C,u_type:Cu[P],u_fit:R[I],u_rotation:N,u_scale:E,u_offsetX:ne,u_offsetY:fe,u_originX:G,u_originY:ce,u_worldWidth:Re,u_worldHeight:kt};return(0,w0.jsx)(U,{...no,speed:t,frame:o,fragmentShader:wu,uniforms:Ye})},D);var Ir=z(W(),1);var A0=z(X(),1),ve={name:"Default",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#f0efea",colorInner:"#fafaf5",colors:["#333333","#e7e6df"],outerGlow:.55,innerGlow:1,innerDistortion:.8,outerDistortion:.6,offset:0,angle:0,size:.8,shape:"diamond"}},rx={name:"Fluorescent",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorInner:"#000000",colors:["#2fb64c","#cdff61","#ffffff"],outerGlow:0,innerGlow:1,innerDistortion:1,outerDistortion:.8,offset:0,angle:0,size:.8,shape:"diamond"}},ax={name:"Fire",params:{...k,scale:.6,speed:1,frame:0,colorBack:"#000000",colorInner:"#000000",colors:["#fe5b16","#f7ff61","#ffffff"],outerGlow:1,innerGlow:.65,innerDistortion:.6,outerDistortion:.8,offset:0,angle:0,size:.8,shape:"diamond"}},nx={name:"Infrared",params:{...k,scale:.6,speed:.5,frame:0,colorBack:"#cd28dc",colorInner:"#00000000",colors:["#ff9900","#fff67a","#dcff52","#00ffbb","#0077ff"],outerGlow:1,innerGlow:1,innerDistortion:1,outerDistortion:1,offset:.2,angle:0,size:1,shape:"diamond"}},B0=[ve,ax,rx,nx],P0=(0,Ir.memo)(function({colorBack:t=ve.params.colorBack,colors:o=ve.params.colors,speed:r=ve.params.speed,frame:a=ve.params.frame,image:n="",innerDistortion:i=ve.params.innerDistortion,outerDistortion:s=ve.params.outerDistortion,outerGlow:l=ve.params.outerGlow,innerGlow:u=ve.params.innerGlow,colorInner:g=ve.params.colorInner,offset:m=ve.params.offset,angle:d=ve.params.angle,size:_=ve.params.size,shape:y=ve.params.shape,suspendWhenProcessingImage:v=!1,fit:h=ve.params.fit,scale:c=ve.params.scale,rotation:f=ve.params.rotation,originX:p=ve.params.originX,originY:x=ve.params.originY,offsetX:S=ve.params.offsetX,offsetY:w=ve.params.offsetY,worldWidth:C=ve.params.worldWidth,worldHeight:P=ve.params.worldHeight,...I}){let E=typeof n=="string"?n:n.src,[N,G]=(0,Ir.useState)(ao),ce;v&&typeof window<"u"&&E?ce=Rr(()=>di(E).then(fe=>URL.createObjectURL(fe.pngBlob)),[E,"gemSmoke"]):ce=N,(0,Ir.useLayoutEffect)(()=>{if(v)return;if(!E){G(ao);return}let fe,Re=!0;return di(E).then(kt=>{Re&&(fe=URL.createObjectURL(kt.pngBlob),G(fe))}),()=>{Re=!1}},[E,v]);let ne={u_colors:o.map(A),u_colorsCount:o.length,u_colorBack:A(t),u_image:ce,u_innerDistortion:i,u_outerDistortion:s,u_outerGlow:l,u_innerGlow:u,u_colorInner:A(g),u_offset:m,u_angle:d,u_size:_,u_isImage:!!n,u_shape:Bu[y],u_fit:R[h],u_scale:c,u_rotation:f,u_offsetX:S,u_offsetY:w,u_originX:p,u_originY:x,u_worldWidth:C,u_worldHeight:P};return(0,A0.jsx)(U,{...I,speed:r,frame:a,fragmentShader:Au,mipmaps:["u_image"],uniforms:ne})},D);var export_createRoot=ix.createRoot;export{E0 as Paper,pw as React,export_createRoot as createRoot};

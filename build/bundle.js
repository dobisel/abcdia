var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function l(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e,n,l){if(t){const o=s(t,e,n,l);return t[0](o)}}function s(t,e,n,l){return t[1]&&l?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](l(e))):n.ctx}function c(t,e,n,l,o,r,i){const c=function(t,e,n,l){if(t[2]&&l){const o=t[2](l(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let l=0;l<n;l+=1)t[l]=e.dirty[l]|o[l];return t}return e.dirty|o}return e.dirty}(e,l,o,r);if(c){const o=s(e,n,l,i);t.p(o,c)}}function a(t){return null==t?"":t}function u(e){return e&&o(e.destroy)?e.destroy:t}let d,f,h=!1;function m(t,e,n,l){for(;t<e;){const o=t+(e-t>>1);n(o)<=l?t=o+1:e=o}return t}function p(t,e){h?(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;const e=t.childNodes,n=new Int32Array(e.length+1),l=new Int32Array(e.length);n[0]=-1;let o=0;for(let t=0;t<e.length;t++){const r=m(1,o+1,(t=>e[n[t]].claim_order),e[t].claim_order)-1;l[t]=n[r]+1;const i=r+1;n[i]=t,o=Math.max(i,o)}const r=[],i=[];let s=e.length-1;for(let t=n[o]+1;0!=t;t=l[t-1]){for(r.push(e[t-1]);s>=t;s--)i.push(e[s]);s--}for(;s>=0;s--)i.push(e[s]);r.reverse(),i.sort(((t,e)=>t.claim_order-e.claim_order));for(let e=0,n=0;e<i.length;e++){for(;n<r.length&&i[e].claim_order>=r[n].claim_order;)n++;const l=n<r.length?r[n]:null;t.insertBefore(i[e],l)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild),e!==t.actual_end_child?t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling):e.parentNode!==t&&t.appendChild(e)}function g(t,e,n){h&&!n?p(t,e):(e.parentNode!==t||n&&e.nextSibling!==n)&&t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function x(t){return document.createElement(t)}function w(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function b(t){return document.createTextNode(t)}function y(){return b(" ")}function _(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function j(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function z(t,e,n){t.setAttributeNS("http://www.w3.org/1999/xlink",e,n)}function k(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function C(t,e,n,l){t.style.setProperty(e,n,l?"important":"")}function M(){if(void 0===d){d=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){d=!0}}return d}function S(t){f=t}function E(){if(!f)throw new Error("Function called outside component initialization");return f}function A(t){E().$$.on_mount.push(t)}function T(){const t=E();return(e,n)=>{const l=t.$$.callbacks[e];if(l){const o=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);l.slice().forEach((e=>{e.call(t,o)}))}}}const W=[],B=[],N=[],L=[],I=Promise.resolve();let q=!1;function H(t){N.push(t)}let D=!1;const F=new Set;function P(){if(!D){D=!0;do{for(let t=0;t<W.length;t+=1){const e=W[t];S(e),X(e.$$)}for(S(null),W.length=0;B.length;)B.pop()();for(let t=0;t<N.length;t+=1){const e=N[t];F.has(e)||(F.add(e),e())}N.length=0}while(W.length);for(;L.length;)L.pop()();q=!1,D=!1,F.clear()}}function X(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const O=new Set;let J;function R(t,e){t&&t.i&&(O.delete(t),t.i(e))}function G(t,e,n,l){if(t&&t.o){if(O.has(t))return;O.add(t),J.c.push((()=>{O.delete(t),l&&(n&&t.d(1),l())})),t.o(e)}}const K="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function Q(t){t&&t.c()}function U(t,n,r,i){const{fragment:s,on_mount:c,on_destroy:a,after_update:u}=t.$$;s&&s.m(n,r),i||H((()=>{const n=c.map(e).filter(o);a?a.push(...n):l(n),t.$$.on_mount=[]})),u.forEach(H)}function V(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Y(t,e){-1===t.$$.dirty[0]&&(W.push(t),q||(q=!0,I.then(P)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Z(e,o,r,i,s,c,a=[-1]){const u=f;S(e);const d=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:o.context||[]),callbacks:n(),dirty:a,skip_bound:!1};let m=!1;if(d.ctx=r?r(e,o.props||{},((t,n,...l)=>{const o=l.length?l[0]:n;return d.ctx&&s(d.ctx[t],d.ctx[t]=o)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](o),m&&Y(e,t)),n})):[],d.update(),m=!0,l(d.before_update),d.fragment=!!i&&i(d.ctx),o.target){if(o.hydrate){h=!0;const t=function(t){return Array.from(t.childNodes)}(o.target);d.fragment&&d.fragment.l(t),t.forEach($)}else d.fragment&&d.fragment.c();o.intro&&R(e.$$.fragment),U(e,o.target,o.anchor,o.customElement),h=!1,P()}S(u)}class tt{$destroy(){V(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function et(e){let n,l,o,r,i,s,c,a,u,d;return{c(){n=w("svg"),l=w("defs"),o=w("symbol"),r=w("path"),i=w("symbol"),s=w("path"),c=w("symbol"),a=w("path"),u=w("symbol"),d=w("path"),j(r,"d","M17.362 16.438l8.339 8.483c-2.125 1.908-4.925 3.079-8.006 3.079-6.627 0-12-5.373-12-12s5.373-12 12-12c3.38 0 6.428 1.402 8.609 3.65l-8.942 8.788zM18.174 7.958c-0.828 0-1.499 0.672-1.499 1.5 0 0.829 0.671 1.5 1.499 1.5 0.829 0 1.501-0.671 1.501-1.5 0-0.828-0.672-1.5-1.501-1.5z"),j(o,"id","icon-pacman"),j(o,"viewBox","0 0 32 32"),j(s,"d","M14 22h4v4h-4zM22 8c1.105 0 2 0.895 2 2v6l-6 4h-4v-2l6-4v-2h-10v-4h12zM16 3c-3.472 0-6.737 1.352-9.192 3.808s-3.808 5.72-3.808 9.192c0 3.472 1.352 6.737 3.808 9.192s5.72 3.808 9.192 3.808c3.472 0 6.737-1.352 9.192-3.808s3.808-5.72 3.808-9.192c0-3.472-1.352-6.737-3.808-9.192s-5.72-3.808-9.192-3.808zM16 0v0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16z"),j(i,"id","icon-question"),j(i,"viewBox","0 0 32 32"),j(a,"d","M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z"),j(c,"id","icon-github"),j(c,"viewBox","0 0 32 32"),j(d,"d","M32 18v-12h-6v-2c0-1.1-0.9-2-2-2h-22c-1.1 0-2 0.9-2 2v6c0 1.1 0.9 2 2 2h22c1.1 0 2-0.9 2-2v-2h4v8h-18v4h-1c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-10c0-0.552-0.448-1-1-1h-1v-2h18zM24 6h-22v-2h22v2z"),j(u,"id","icon-paint"),j(u,"viewBox","0 0 32 32"),j(n,"aria-hidden","true"),C(n,"position","absolute"),C(n,"width","0"),C(n,"height","0"),C(n,"overflow","hidden"),j(n,"version","1.1"),j(n,"xmlns","http://www.w3.org/2000/svg"),j(n,"xmlns:xlink","http://www.w3.org/1999/xlink")},m(t,e){g(t,n,e),p(n,l),p(l,o),p(o,r),p(l,i),p(i,s),p(l,c),p(c,a),p(l,u),p(u,d)},p:t,i:t,o:t,d(t){t&&$(n)}}}class nt extends tt{constructor(t){super(),Z(this,t,null,et,r,{})}}function lt(t){let e,n,l;return{c(){e=w("svg"),n=w("use"),z(n,"xlink:href",l="#icon-"+t[2]),j(e,"class","svelte-16o62x8")},m(t,l){g(t,e,l),p(e,n)},p(t,e){4&e&&l!==(l="#icon-"+t[2])&&z(n,"xlink:href",l)},d(t){t&&$(e)}}}function ot(t){let e,n,l;return{c(){e=x("span"),n=b(t[1]),j(e,"class",l=a(null==t[2]?"lpad":"")+" svelte-16o62x8")},m(t,l){g(t,e,l),p(e,n)},p(t,o){2&o&&k(n,t[1]),4&o&&l!==(l=a(null==t[2]?"lpad":"")+" svelte-16o62x8")&&j(e,"class",l)},d(t){t&&$(e)}}}function rt(e){let n,l,o,r,i,s=e[2]&&lt(e),c=e[1]&&ot(e);return{c(){n=x("a"),s&&s.c(),l=y(),c&&c.c(),j(n,"class",o=a(e[3])+" svelte-16o62x8"),j(n,"id",e[4]),j(n,"style",e[5]),j(n,"href",e[0])},m(t,o){g(t,n,o),s&&s.m(n,null),p(n,l),c&&c.m(n,null),r||(i=_(n,"click",e[6]),r=!0)},p(t,[e]){t[2]?s?s.p(t,e):(s=lt(t),s.c(),s.m(n,l)):s&&(s.d(1),s=null),t[1]?c?c.p(t,e):(c=ot(t),c.c(),c.m(n,null)):c&&(c.d(1),c=null),8&e&&o!==(o=a(t[3])+" svelte-16o62x8")&&j(n,"class",o),16&e&&j(n,"id",t[4]),32&e&&j(n,"style",t[5]),1&e&&j(n,"href",t[0])},i:t,o:t,d(t){t&&$(n),s&&s.d(),c&&c.d(),r=!1,i()}}}function it(t,e,n){let{title:l=""}=e,{target:o}=e,{icon:r}=e,{cssClass:i=""}=e,{id:s=""}=e,{style:c=""}=e;const a=T();return null!=o&&o.startsWith("/")&&(o="/adia"+o),t.$$set=t=>{"title"in t&&n(1,l=t.title),"target"in t&&n(0,o=t.target),"icon"in t&&n(2,r=t.icon),"cssClass"in t&&n(3,i=t.cssClass),"id"in t&&n(4,s=t.id),"style"in t&&n(5,c=t.style)},[o,l,r,i,s,c,function(){a("click",{text:"Hello!"})}]}class st extends tt{constructor(t){super(),Z(this,t,it,rt,r,{title:1,target:0,icon:2,cssClass:3,id:4,style:5})}}function ct(e){let n,l,o,r,i;return{c(){n=x("a"),l=w("svg"),o=w("use"),r=y(),i=x("h1"),i.textContent="ADia Live Demo",z(o,"xlink:href","#icon-pacman"),j(l,"class","svelte-1h70g4h"),j(i,"class","svelte-1h70g4h"),j(n,"href",e[0]),j(n,"class","svelte-1h70g4h")},m(t,e){g(t,n,e),p(n,l),p(l,o),p(n,r),p(n,i)},p(t,[e]){1&e&&j(n,"href",t[0])},i:t,o:t,d(t){t&&$(n)}}}function at(t,e,n){let{target:l}=e;return null!=l&&l.startsWith("/")&&(l="/adia"+l),t.$$set=t=>{"target"in t&&n(0,l=t.target)},[l]}class ut extends tt{constructor(t){super(),Z(this,t,at,ct,r,{target:0})}}const dt=[{name:"comment",pattern:/\s*#.*\n/},{name:"return",pattern:/(?<==> *).+ *(?=$)/},{name:"multilinepipe",pattern:/(?<=:) ?\|/},{name:"text1",pattern:/(?<=:) *.+(?==>)/},{name:"text2",pattern:/(?<=:) *.+(?=$)/},{name:"diagram",pattern:/diagram/},{name:"attr",pattern:/version|author/},{name:"sequence",pattern:/sequence/},{name:"moduleattrattr",pattern:/(?<=\.)title/},{name:"moduleattrmodule",pattern:/^\w+(?=\.)/},{name:"notemodulefirst",pattern:/(?<=@)\w+/},{name:"notemodulesecond",pattern:/(?<=@.*~\s)\w+/},{name:"caller",pattern:/(?<=^\s*)\w+\s*(?=->)/},{name:"callee",pattern:/(?<=->)\s*\w+\s*(?=:|\n)/},{name:"keyword",pattern:/(?<=^\s*)(if|elif|else|for|while)(?=:|\n)/},{name:"keyop",pattern:/(->|=>|~|@|\.)/},{name:"op",pattern:/[:!\$%\^&*\(\)+=_\]\[\}\{;"'?/\\<>,~-]/},{name:"whitespace",pattern:/\s/},{name:"other",pattern:/\S+/}];function ft(t,e){const n=t.childNodes,l=function(t){let e,n=[];for(let t=0;t<dt.length;t++){let e=dt[t];n.push(`(?<${e.name}>${e.pattern.source})`)}const l=new RegExp(n.join("|"),"gmi"),o=[];for(const n of t.matchAll(l))for(let t in n.groups)e=n.groups[t],null!=e&&o.push({name:t,text:e});return o}(e.value);var o,r,i;for(o=0;o<l.length&&o<n.length&&l[o]===n[o].textContent;o++);for(;l.length<n.length;)t.removeChild(n[o]);for(r=l.length-1,i=n.length-1;o<i&&l[r]===n[i].textContent;r--,i--);for(;o<=i;o++){const t=l[o];n[o].className=t.name,n[o].textContent=n[o].innerText=t.text}for(var s=n[o]||null;o<=r;o++){var c=document.createElement("span");const e=l[o];c.className=e.name,c.textContent=c.innerText=e.text,t.insertBefore(c,s)}}function ht(e){let n,o,r,i,s,c;return{c(){n=x("div"),o=x("pre"),r=y(),i=x("textarea"),j(o,"class","pad1 highlight svelte-yvy37q"),j(i,"class","pad1 svelte-yvy37q"),j(i,"spellcheck","false"),j(i,"wrap","off"),i.value="# Live Demo\n\ndiagram: Foo\nauthor: Alice\nversion: 0.1\n\n# First section\nsequence: Hello\nfoo.title: Foo\n\n@foo: Say Hello\nfoo -> bar: helloworld -> Hi\n  @foo ~ baz: |\n    lorem ipsum\n  for: each item\n    bar -> baz: Hello()\n\n# Second section\nsequence: Bye\n\nfoo -> bar: Bye()\n  if: baz is there\n    bar -> baz: Bye()",j(n,"id","sourceParent"),j(n,"class","svelte-yvy37q")},m(t,l){g(t,n,l),p(n,o),p(n,r),p(n,i),s||(c=[u(e[2].call(null,o)),u(e[1].call(null,i)),_(i,"input",e[3]),_(i,"scroll",e[0])],s=!0)},p:t,i:t,o:t,d(t){t&&$(n),s=!1,l(c)}}}function mt(t){const e=T();let n,l,o;function r(){let t=l.value;localStorage.setItem("editorText",t),e("change",{text:t})}function i(){clearTimeout(o),ft(n,l),o=setTimeout(r,1e3)}return A((function(){let t=localStorage.getItem("editorText");null!=t&&t.trim().length>0&&(l.value=t),i()})),[function(t){n.scrollLeft=t.srcElement.scrollLeft},function(t){l=t},function(t){n=t},i]}class pt extends tt{constructor(t){super(),Z(this,t,mt,ht,r,{})}}const{window:gt}=K;function $t(t){let e,n,o,r,s,a,u,d,f,h,m,v,w,b,z,k,S;H(t[12]);const E=t[11].default,A=i(E,t,t[10],null);return r=new st({props:{icon:"question",style:"float: right",target:"/about"}}),d=new pt({}),d.$on("change",t[9]),{c(){e=x("div"),n=x("nav"),A&&A.c(),o=y(),Q(r.$$.fragment),s=y(),a=x("div"),u=x("div"),Q(d.$$.fragment),h=y(),m=x("div"),v=y(),w=x("div"),b=x("textarea"),j(n,"class","svelte-brbs8x"),C(u,"--left-size",t[5]),j(u,"class","left svelte-brbs8x"),H((()=>t[14].call(u))),j(m,"class","separator svelte-brbs8x"),j(b,"class","pad1 svelte-brbs8x"),j(b,"spellcheck","false"),b.disabled=!0,b.value=t[4],C(w,"--right-size",t[6]),j(w,"class","right svelte-brbs8x"),j(a,"class","wrapper svelte-brbs8x"),j(e,"class","main-wrapper svelte-brbs8x")},m(l,i){g(l,e,i),p(e,n),A&&A.m(n,null),p(n,o),U(r,n,null),p(e,s),p(e,a),p(a,u),U(d,u,null),t[13](u),f=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=x("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const l=M();let o;return l?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=_(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{o=_(n.contentWindow,"resize",e)}),p(t,n),()=>{(l||o&&n.contentWindow)&&o(),$(n)}}(u,t[14].bind(u)),p(a,h),p(a,m),p(a,v),p(a,w),p(w,b),t[15](w),z=!0,k||(S=[_(gt,"resize",t[12]),_(m,"mousedown",t[7]),_(m,"mouseup",t[8])],k=!0)},p(t,[e]){A&&A.p&&(!z||1024&e)&&c(A,E,t,t[10],z?e:-1,null,null),(!z||16&e)&&(b.value=t[4])},i(t){z||(R(A,t),R(r.$$.fragment,t),R(d.$$.fragment,t),z=!0)},o(t){G(A,t),G(r.$$.fragment,t),G(d.$$.fragment,t),z=!1},d(n){n&&$(e),A&&A.d(n),V(r),V(d),t[13](null),f(),t[15](null),k=!1,l(S)}}}function vt(t,e,n){let l,o,r,i,s,{$$slots:c={},$$scope:a}=e,u=localStorage.getItem("leftSize")?`${localStorage.getItem("leftSize")}%`:"20%",d=localStorage.getItem("leftSize")?100-Math.round(localStorage.getItem("leftSize"))+"%":"80%",f="";function h(t){if(t.clientX!==l.e.clientX){let e=t.clientX-l.e.clientX;e=Math.min(Math.max(e,-l.leftWidth),l.rightWidth),n(0,o.style.width=l.leftWidth+e+"px",o),n(1,r.style.width=l.rightWidth-e+"px",r)}}return t.$$set=t=>{"$$scope"in t&&n(10,a=t.$$scope)},[o,r,i,s,f,u,d,function(t){l={e:t,leftWidth:o.offsetWidth,rightWidth:r.offsetWidth},window.addEventListener("mousemove",h)},function(){localStorage.setItem("leftSize",Math.round(s/(i-14)*100)),window.removeEventListener("mousemove",h)},function t(e){if(null==window.adiaDiagram)return void setTimeout((function(){t(e)}),200);let l=e.detail.text;l.trim().length<=0?n(4,f=""):n(4,f=window.adiaDiagram(l))},a,c,function(){n(2,i=gt.innerWidth)},function(t){B[t?"unshift":"push"]((()=>{o=t,n(0,o)}))},function(){s=this.clientWidth,n(3,s)},function(t){B[t?"unshift":"push"]((()=>{r=t,n(1,r)}))}]}class xt extends tt{constructor(t){super(),Z(this,t,vt,$t,r,{})}}function wt(t,e,n){const l=t.slice();return l[7]=e[n],l}function bt(t,e,n){const l=t.slice();return l[10]=e[n],l[12]=n,l}function yt(t,e,n){const l=t.slice();return l[10]=e[n],l[12]=n,l}function _t(t,e,n){const l=t.slice();return l[10]=e[n],l[12]=n,l}function jt(t){let e,n,l,o,r,i,s,c=t[10]+"",a=0==t[12]&&function(t){let e;return{c(){e=x("i"),e.textContent="(latest)"},m(t,n){g(t,e,n)},d(t){t&&$(e)}}}();return{c(){e=x("li"),n=x("a"),l=b("v"),o=b(c),r=y(),a&&a.c(),s=y(),j(n,"href",i=t[3]+"/docs/"+t[10]+"/html/")},m(t,i){g(t,e,i),p(e,n),p(n,l),p(n,o),p(n,r),a&&a.m(n,null),p(e,s)},p(t,e){2&e&&c!==(c=t[10]+"")&&k(o,c),2&e&&i!==(i=t[3]+"/docs/"+t[10]+"/html/")&&j(n,"href",i)},d(t){t&&$(e),a&&a.d()}}}function zt(t){let e,n,l,o,r,i,s,c=t[10]+"",a=0==t[12]&&function(t){let e;return{c(){e=x("i"),e.textContent="(latest)"},m(t,n){g(t,e,n)},d(t){t&&$(e)}}}();return{c(){e=x("li"),n=x("a"),l=b("adia.bundle-"),o=b(c),r=b(".js\n        "),a&&a.c(),s=y(),j(n,"href",i=t[3]+"/jsdist/"+t[10]+"/adia.bundle-"+t[10]+".js")},m(t,i){g(t,e,i),p(e,n),p(n,l),p(n,o),p(n,r),a&&a.m(n,null),p(e,s)},p(t,e){1&e&&c!==(c=t[10]+"")&&k(o,c),1&e&&i!==(i=t[3]+"/jsdist/"+t[10]+"/adia.bundle-"+t[10]+".js")&&j(n,"href",i)},d(t){t&&$(e),a&&a.d()}}}function kt(t){let e,n,l,o,r,i,s,c,a,u,d,f,h,m,v=t[10]+"",w=t[10]+"",_=0==t[12]&&function(t){let e;return{c(){e=x("i"),e.textContent="(latest)"},m(t,n){g(t,e,n)},d(t){t&&$(e)}}}();return{c(){e=x("li"),n=x("a"),l=b("adia-"),o=b(v),r=b(".js"),s=y(),c=x("a"),a=b("adia.lib-"),u=b(w),d=b(".js"),h=y(),_&&_.c(),m=y(),j(n,"href",i=t[3]+"/jsdist/"+t[10]+"/adia-"+t[10]+".js"),j(c,"href",f=t[3]+"/jsdist/"+t[10]+"/adia-"+t[10]+".js")},m(t,i){g(t,e,i),p(e,n),p(n,l),p(n,o),p(n,r),p(e,s),p(e,c),p(c,a),p(c,u),p(c,d),p(e,h),_&&_.m(e,null),p(e,m)},p(t,e){1&e&&v!==(v=t[10]+"")&&k(o,v),1&e&&i!==(i=t[3]+"/jsdist/"+t[10]+"/adia-"+t[10]+".js")&&j(n,"href",i),1&e&&w!==(w=t[10]+"")&&k(u,w),1&e&&f!==(f=t[3]+"/jsdist/"+t[10]+"/adia-"+t[10]+".js")&&j(c,"href",f)},d(t){t&&$(e),_&&_.d()}}}function Ct(e){let n,l,o,r,i=e[7]+"";return{c(){n=x("li"),l=x("a"),o=b(i),r=y(),j(l,"href",e[7])},m(t,e){g(t,n,e),p(n,l),p(l,o),p(n,r)},p:t,d(t){t&&$(n)}}}function Mt(t){let e,n,l,o,r,s,a,u,d,f,h,m,w,b,_,z,k,C,M,S,E,A,T,W,B,N,L,I,q,H,D;const F=t[5].default,P=i(F,t,t[4],null);o=new st({props:{icon:"paint",style:"float: right",target:"/"}});let X=t[1],O=[];for(let e=0;e<X.length;e+=1)O[e]=jt(_t(t,X,e));let J=t[0],K=[];for(let e=0;e<J.length;e+=1)K[e]=zt(yt(t,J,e));let Y=t[0],Z=[];for(let e=0;e<Y.length;e+=1)Z[e]=kt(bt(t,Y,e));let tt=t[2],et=[];for(let e=0;e<tt.length;e+=1)et[e]=Ct(wt(t,tt,e));return{c(){e=x("div"),n=x("nav"),P&&P.c(),l=y(),Q(o.$$.fragment),r=y(),s=x("div"),a=x("h4"),a.innerHTML="About\n    <hr/>",u=y(),d=x("p"),d.innerHTML='ADia live demo page <i>version: 1.5.0</i> using javascript and \n    <a href="https://brython.info">Brython</a>.',f=y(),h=x("h4"),h.innerHTML="Documentation\n    <hr/>",m=y(),w=x("ul");for(let t=0;t<O.length;t+=1)O[t].c();b=y(),_=x("h4"),_.innerHTML="Javascript releases\n    <hr/>",z=y(),k=x("div"),C=x("h5"),C.textContent="Bundle",M=y(),S=x("ul");for(let t=0;t<K.length;t+=1)K[t].c();E=y(),A=x("div"),T=x("h5"),T.textContent="Brython Module",W=y(),B=x("ul");for(let t=0;t<Z.length;t+=1)Z[t].c();N=y(),L=x("h4"),L.innerHTML="Source Codes\n    <hr/>",I=y(),q=x("div"),H=x("ul");for(let t=0;t<et.length;t+=1)et[t].c();j(a,"class","all10 svelte-1ar4c3c"),j(d,"class","all10 svelte-1ar4c3c"),j(h,"class","all10 svelte-1ar4c3c"),j(w,"class","all10 svelte-1ar4c3c"),j(_,"class","all10 svelte-1ar4c3c"),j(S,"class","all10 svelte-1ar4c3c"),j(k,"class","sm10 md3 lg3 xg3 svelte-1ar4c3c"),j(B,"class","all10 svelte-1ar4c3c"),j(A,"class","sm10 md7 lg7 xg7 svelte-1ar4c3c"),j(L,"class","all10 svelte-1ar4c3c"),j(q,"class","all10 svelte-1ar4c3c"),j(s,"id","about"),j(s,"class","sm10 md10 lg8 xg6 svelte-1ar4c3c"),j(e,"class","main-wrapper")},m(t,i){g(t,e,i),p(e,n),P&&P.m(n,null),p(n,l),U(o,n,null),p(e,r),p(e,s),p(s,a),p(s,u),p(s,d),p(s,f),p(s,h),p(s,m),p(s,w);for(let t=0;t<O.length;t+=1)O[t].m(w,null);p(s,b),p(s,_),p(s,z),p(s,k),p(k,C),p(k,M),p(k,S);for(let t=0;t<K.length;t+=1)K[t].m(S,null);p(s,E),p(s,A),p(A,T),p(A,W),p(A,B);for(let t=0;t<Z.length;t+=1)Z[t].m(B,null);p(s,N),p(s,L),p(s,I),p(s,q),p(q,H);for(let t=0;t<et.length;t+=1)et[t].m(H,null);D=!0},p(t,[e]){if(P&&P.p&&(!D||16&e)&&c(P,F,t,t[4],D?e:-1,null,null),10&e){let n;for(X=t[1],n=0;n<X.length;n+=1){const l=_t(t,X,n);O[n]?O[n].p(l,e):(O[n]=jt(l),O[n].c(),O[n].m(w,null))}for(;n<O.length;n+=1)O[n].d(1);O.length=X.length}if(9&e){let n;for(J=t[0],n=0;n<J.length;n+=1){const l=yt(t,J,n);K[n]?K[n].p(l,e):(K[n]=zt(l),K[n].c(),K[n].m(S,null))}for(;n<K.length;n+=1)K[n].d(1);K.length=J.length}if(9&e){let n;for(Y=t[0],n=0;n<Y.length;n+=1){const l=bt(t,Y,n);Z[n]?Z[n].p(l,e):(Z[n]=kt(l),Z[n].c(),Z[n].m(B,null))}for(;n<Z.length;n+=1)Z[n].d(1);Z.length=Y.length}if(4&e){let n;for(tt=t[2],n=0;n<tt.length;n+=1){const l=wt(t,tt,n);et[n]?et[n].p(l,e):(et[n]=Ct(l),et[n].c(),et[n].m(H,null))}for(;n<et.length;n+=1)et[n].d(1);et.length=tt.length}},i(t){D||(R(P,t),R(o.$$.fragment,t),D=!0)},o(t){G(P,t),G(o.$$.fragment,t),D=!1},d(t){t&&$(e),P&&P.d(t),V(o),v(O,t),v(K,t),v(Z,t),v(et,t)}}}function St(t,e,n){let{$$slots:l={},$$scope:o}=e;let r=[],i=[];return A((async()=>{try{let[t,e]=await Promise.all([fetch("/adia/jsdist/index.json?count=10").then((t=>t.json())),fetch("/adia/docs/index.json?count=9").then((t=>t.json()))]);n(0,r=t),n(1,i=e)}catch(t){}})),t.$$set=t=>{"$$scope"in t&&n(4,o=t.$$scope)},[r,i,["https://github.com/pylover/adia","https://github.com/pylover/adia-live"],"/adia",o,l]}class Et extends tt{constructor(t){super(),Z(this,t,St,Mt,r,{})}}function At(e){let n;return{c(){n=x("h3"),n.textContent="Not Found !"},m(t,e){g(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}class Tt extends tt{constructor(t){super(),Z(this,t,null,At,r,{})}}function Wt(e){let n,l,o,r;return n=new ut({props:{target:"/"}}),o=new st({props:{icon:"github",style:"float: right",target:"https://github.com/pylover/adia"}}),{c(){Q(n.$$.fragment),l=y(),Q(o.$$.fragment)},m(t,e){U(n,t,e),g(t,l,e),U(o,t,e),r=!0},p:t,i(t){r||(R(n.$$.fragment,t),R(o.$$.fragment,t),r=!0)},o(t){G(n.$$.fragment,t),G(o.$$.fragment,t),r=!1},d(t){V(n,t),t&&$(l),V(o,t)}}}function Bt(t){let e,n,o,r,i;e=new nt({});var s=t[0].component;function c(t){return{props:{$$slots:{default:[Wt]},$$scope:{ctx:t}}}}return s&&(o=new s(c(t))),{c(){Q(e.$$.fragment),n=y(),o&&Q(o.$$.fragment),r=b("")},m(t,l){U(e,t,l),g(t,n,l),o&&U(o,t,l),g(t,r,l),i=!0},p(t,[e]){const n={};if(32&e&&(n.$$scope={dirty:e,ctx:t}),s!==(s=t[0].component)){if(o){J={r:0,c:[],p:J};const t=o;G(t.$$.fragment,1,0,(()=>{V(t,1)})),J.r||l(J.c),J=J.p}s?(o=new s(c(t)),Q(o.$$.fragment),R(o.$$.fragment,1),U(o,r.parentNode,r)):o=null}else s&&o.$set(n)},i(t){i||(R(e.$$.fragment,t),o&&R(o.$$.fragment,t),i=!0)},o(t){G(e.$$.fragment,t),o&&G(o.$$.fragment,t),i=!1},d(t){V(e,t),t&&$(n),t&&$(r),o&&V(o,t)}}}function Nt(t,e,n){const l=[{title:"Adia",component:xt,path:"/"},{title:"About",component:Et,path:"/about"}],o={title:"Not Found",component:Tt};let r=l.findIndex((t=>"/adia"+t.path==window.location.pathname)),i=l[r];return i=r<0?o:l[r],[i]}return new class extends tt{constructor(t){super(),Z(this,t,Nt,Bt,r,{})}}({target:document.body,props:{title:"ADia!"}})}();
//# sourceMappingURL=bundle.js.map

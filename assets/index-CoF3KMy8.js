(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();var W,h,he,H,te,de,j,ve,G,q,Z,M={},me=[],$e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,J=Array.isArray;function $(_,e){for(var t in e)_[t]=e[t];return _}function Q(_){_&&_.parentNode&&_.parentNode.removeChild(_)}function He(_,e,t){var o,r,n,c={};for(n in e)n=="key"?o=e[n]:n=="ref"?r=e[n]:c[n]=e[n];if(arguments.length>2&&(c.children=arguments.length>3?W.call(arguments,2):t),typeof _=="function"&&_.defaultProps!=null)for(n in _.defaultProps)c[n]===void 0&&(c[n]=_.defaultProps[n]);return U(_,c,o,r,null)}function U(_,e,t,o,r){var n={type:_,props:e,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++he,__i:-1,__u:0};return r==null&&h.vnode!=null&&h.vnode(n),n}function F(_){return _.children}function D(_,e){this.props=_,this.context=e}function C(_,e){if(e==null)return _.__?C(_.__,_.__i+1):null;for(var t;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null)return t.__e;return typeof _.type=="function"?C(_):null}function ge(_){var e,t;if((_=_.__)!=null&&_.__c!=null){for(_.__e=_.__c.base=null,e=0;e<_.__k.length;e++)if((t=_.__k[e])!=null&&t.__e!=null){_.__e=_.__c.base=t.__e;break}return ge(_)}}function ne(_){(!_.__d&&(_.__d=!0)&&H.push(_)&&!O.__r++||te!==h.debounceRendering)&&((te=h.debounceRendering)||de)(O)}function O(){var _,e,t,o,r,n,c,s;for(H.sort(j);_=H.shift();)_.__d&&(e=H.length,o=void 0,n=(r=(t=_).__v).__e,c=[],s=[],t.__P&&((o=$({},r)).__v=r.__v+1,h.vnode&&h.vnode(o),X(t.__P,o,r,t.__n,t.__P.namespaceURI,32&r.__u?[n]:null,c,n??C(r),!!(32&r.__u),s),o.__v=r.__v,o.__.__k[o.__i]=o,ke(c,o,s),o.__e!=n&&ge(o)),H.length>e&&H.sort(j));O.__r=0}function ye(_,e,t,o,r,n,c,s,u,l,p){var i,a,f,y,w,b,d=o&&o.__k||me,v=e.length;for(u=Ce(t,e,d,u),i=0;i<v;i++)(f=t.__k[i])!=null&&(a=f.__i===-1?M:d[f.__i]||M,f.__i=i,b=X(_,f,a,r,n,c,s,u,l,p),y=f.__e,f.ref&&a.ref!=f.ref&&(a.ref&&ee(a.ref,null,f),p.push(f.ref,f.__c||y,f)),w==null&&y!=null&&(w=y),4&f.__u||a.__k===f.__k?u=be(f,u,_):typeof f.type=="function"&&b!==void 0?u=b:y&&(u=y.nextSibling),f.__u&=-7);return t.__e=w,u}function Ce(_,e,t,o){var r,n,c,s,u,l=e.length,p=t.length,i=p,a=0;for(_.__k=[],r=0;r<l;r++)(n=e[r])!=null&&typeof n!="boolean"&&typeof n!="function"?(s=r+a,(n=_.__k[r]=typeof n=="string"||typeof n=="number"||typeof n=="bigint"||n.constructor==String?U(null,n,null,null,null):J(n)?U(F,{children:n},null,null,null):n.constructor===void 0&&n.__b>0?U(n.type,n.props,n.key,n.ref?n.ref:null,n.__v):n).__=_,n.__b=_.__b+1,c=null,(u=n.__i=Fe(n,t,s,i))!==-1&&(i--,(c=t[u])&&(c.__u|=2)),c==null||c.__v===null?(u==-1&&a--,typeof n.type!="function"&&(n.__u|=4)):u!==s&&(u==s-1?a--:u==s+1?a++:(u>s?a--:a++,n.__u|=4))):n=_.__k[r]=null;if(i)for(r=0;r<p;r++)(c=t[r])!=null&&!(2&c.__u)&&(c.__e==o&&(o=C(c)),we(c,c));return o}function be(_,e,t){var o,r;if(typeof _.type=="function"){for(o=_.__k,r=0;o&&r<o.length;r++)o[r]&&(o[r].__=_,e=be(o[r],e,t));return e}_.__e!=e&&(e&&_.type&&!t.contains(e)&&(e=C(_)),t.insertBefore(_.__e,e||null),e=_.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType===8);return e}function Fe(_,e,t,o){var r=_.key,n=_.type,c=t-1,s=t+1,u=e[t];if(u===null||u&&r==u.key&&n===u.type&&!(2&u.__u))return t;if((typeof n!="function"||n===F||r)&&o>(u!=null&&!(2&u.__u)?1:0))for(;c>=0||s<e.length;){if(c>=0){if((u=e[c])&&!(2&u.__u)&&r==u.key&&n===u.type)return c;c--}if(s<e.length){if((u=e[s])&&!(2&u.__u)&&r==u.key&&n===u.type)return s;s++}}return-1}function re(_,e,t){e[0]==="-"?_.setProperty(e,t??""):_[e]=t==null?"":typeof t!="number"||$e.test(e)?t:t+"px"}function A(_,e,t,o,r){var n;e:if(e==="style")if(typeof t=="string")_.style.cssText=t;else{if(typeof o=="string"&&(_.style.cssText=o=""),o)for(e in o)t&&e in t||re(_.style,e,"");if(t)for(e in t)o&&t[e]===o[e]||re(_.style,e,t[e])}else if(e[0]==="o"&&e[1]==="n")n=e!==(e=e.replace(ve,"$1")),e=e.toLowerCase()in _||e==="onFocusOut"||e==="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),_.l||(_.l={}),_.l[e+n]=t,t?o?t.u=o.u:(t.u=G,_.addEventListener(e,n?Z:q,n)):_.removeEventListener(e,n?Z:q,n);else{if(r=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in _)try{_[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!=="-"?_.removeAttribute(e):_.setAttribute(e,e=="popover"&&t==1?"":t))}}function oe(_){return function(e){if(this.l){var t=this.l[e.type+_];if(e.t==null)e.t=G++;else if(e.t<t.u)return;return t(h.event?h.event(e):e)}}}function X(_,e,t,o,r,n,c,s,u,l){var p,i,a,f,y,w,b,d,v,S,P,L,N,_e,T,B,R,x=e.type;if(e.constructor!==void 0)return null;128&t.__u&&(u=!!(32&t.__u),n=[s=e.__e=t.__e]),(p=h.__b)&&p(e);e:if(typeof x=="function")try{if(d=e.props,v="prototype"in x&&x.prototype.render,S=(p=x.contextType)&&o[p.__c],P=p?S?S.props.value:p.__:o,t.__c?b=(i=e.__c=t.__c).__=i.__E:(v?e.__c=i=new x(d,P):(e.__c=i=new D(d,P),i.constructor=x,i.render=Ne),S&&S.sub(i),i.props=d,i.state||(i.state={}),i.context=P,i.__n=o,a=i.__d=!0,i.__h=[],i._sb=[]),v&&i.__s==null&&(i.__s=i.state),v&&x.getDerivedStateFromProps!=null&&(i.__s==i.state&&(i.__s=$({},i.__s)),$(i.__s,x.getDerivedStateFromProps(d,i.__s))),f=i.props,y=i.state,i.__v=e,a)v&&x.getDerivedStateFromProps==null&&i.componentWillMount!=null&&i.componentWillMount(),v&&i.componentDidMount!=null&&i.__h.push(i.componentDidMount);else{if(v&&x.getDerivedStateFromProps==null&&d!==f&&i.componentWillReceiveProps!=null&&i.componentWillReceiveProps(d,P),!i.__e&&(i.shouldComponentUpdate!=null&&i.shouldComponentUpdate(d,i.__s,P)===!1||e.__v===t.__v)){for(e.__v!==t.__v&&(i.props=d,i.state=i.__s,i.__d=!1),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(E){E&&(E.__=e)}),L=0;L<i._sb.length;L++)i.__h.push(i._sb[L]);i._sb=[],i.__h.length&&c.push(i);break e}i.componentWillUpdate!=null&&i.componentWillUpdate(d,i.__s,P),v&&i.componentDidUpdate!=null&&i.__h.push(function(){i.componentDidUpdate(f,y,w)})}if(i.context=P,i.props=d,i.__P=_,i.__e=!1,N=h.__r,_e=0,v){for(i.state=i.__s,i.__d=!1,N&&N(e),p=i.render(i.props,i.state,i.context),T=0;T<i._sb.length;T++)i.__h.push(i._sb[T]);i._sb=[]}else do i.__d=!1,N&&N(e),p=i.render(i.props,i.state,i.context),i.state=i.__s;while(i.__d&&++_e<25);i.state=i.__s,i.getChildContext!=null&&(o=$($({},o),i.getChildContext())),v&&!a&&i.getSnapshotBeforeUpdate!=null&&(w=i.getSnapshotBeforeUpdate(f,y)),s=ye(_,J(B=p!=null&&p.type===F&&p.key==null?p.props.children:p)?B:[B],e,t,o,r,n,c,s,u,l),i.base=e.__e,e.__u&=-161,i.__h.length&&c.push(i),b&&(i.__E=i.__=null)}catch(E){if(e.__v=null,u||n!=null)if(E.then){for(e.__u|=u?160:128;s&&s.nodeType===8&&s.nextSibling;)s=s.nextSibling;n[n.indexOf(s)]=null,e.__e=s}else for(R=n.length;R--;)Q(n[R]);else e.__e=t.__e,e.__k=t.__k;h.__e(E,e,t)}else n==null&&e.__v===t.__v?(e.__k=t.__k,e.__e=t.__e):s=e.__e=Se(t.__e,e,t,o,r,n,c,u,l);return(p=h.diffed)&&p(e),128&e.__u?void 0:s}function ke(_,e,t){for(var o=0;o<t.length;o++)ee(t[o],t[++o],t[++o]);h.__c&&h.__c(e,_),_.some(function(r){try{_=r.__h,r.__h=[],_.some(function(n){n.call(r)})}catch(n){h.__e(n,r.__v)}})}function Se(_,e,t,o,r,n,c,s,u){var l,p,i,a,f,y,w,b=t.props,d=e.props,v=e.type;if(v==="svg"?r="http://www.w3.org/2000/svg":v==="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),n!=null){for(l=0;l<n.length;l++)if((f=n[l])&&"setAttribute"in f==!!v&&(v?f.localName===v:f.nodeType===3)){_=f,n[l]=null;break}}if(_==null){if(v===null)return document.createTextNode(d);_=document.createElementNS(r,v,d.is&&d),s&&(h.__m&&h.__m(e,n),s=!1),n=null}if(v===null)b===d||s&&_.data===d||(_.data=d);else{if(n=n&&W.call(_.childNodes),b=t.props||M,!s&&n!=null)for(b={},l=0;l<_.attributes.length;l++)b[(f=_.attributes[l]).name]=f.value;for(l in b)if(f=b[l],l!="children"){if(l=="dangerouslySetInnerHTML")i=f;else if(!(l in d)){if(l=="value"&&"defaultValue"in d||l=="checked"&&"defaultChecked"in d)continue;A(_,l,null,f,r)}}for(l in d)f=d[l],l=="children"?a=f:l=="dangerouslySetInnerHTML"?p=f:l=="value"?y=f:l=="checked"?w=f:s&&typeof f!="function"||b[l]===f||A(_,l,f,b[l],r);if(p)s||i&&(p.__html===i.__html||p.__html===_.innerHTML)||(_.innerHTML=p.__html),e.__k=[];else if(i&&(_.innerHTML=""),ye(_,J(a)?a:[a],e,t,o,v==="foreignObject"?"http://www.w3.org/1999/xhtml":r,n,c,n?n[0]:t.__k&&C(t,0),s,u),n!=null)for(l=n.length;l--;)Q(n[l]);s||(l="value",v==="progress"&&y==null?_.removeAttribute("value"):y!==void 0&&(y!==_[l]||v==="progress"&&!y||v==="option"&&y!==b[l])&&A(_,l,y,b[l],r),l="checked",w!==void 0&&w!==_[l]&&A(_,l,w,b[l],r))}return _}function ee(_,e,t){try{if(typeof _=="function"){var o=typeof _.__u=="function";o&&_.__u(),o&&e==null||(_.__u=_(e))}else _.current=e}catch(r){h.__e(r,t)}}function we(_,e,t){var o,r;if(h.unmount&&h.unmount(_),(o=_.ref)&&(o.current&&o.current!==_.__e||ee(o,null,e)),(o=_.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(n){h.__e(n,e)}o.base=o.__P=null}if(o=_.__k)for(r=0;r<o.length;r++)o[r]&&we(o[r],e,t||typeof _.type!="function");t||Q(_.__e),_.__c=_.__=_.__e=void 0}function Ne(_,e,t){return this.constructor(_,t)}function Ee(_,e,t){var o,r,n,c;e===document&&(e=document.documentElement),h.__&&h.__(_,e),r=(o=typeof t=="function")?null:e.__k,n=[],c=[],X(e,_=(!o&&t||e).__k=He(F,null,[_]),r||M,M,e.namespaceURI,!o&&t?[t]:r?null:e.firstChild?W.call(e.childNodes):null,n,!o&&t?t:r?r.__e:e.firstChild,o,c),ke(n,_,c)}W=me.slice,h={__e:function(_,e,t,o){for(var r,n,c;e=e.__;)if((r=e.__c)&&!r.__)try{if((n=r.constructor)&&n.getDerivedStateFromError!=null&&(r.setState(n.getDerivedStateFromError(_)),c=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(_,o||{}),c=r.__d),c)return r.__E=r}catch(s){_=s}throw _}},he=0,D.prototype.setState=function(_,e){var t;t=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=$({},this.state),typeof _=="function"&&(_=_($({},t),this.props)),_&&$(t,_),_!=null&&this.__v&&(e&&this._sb.push(e),ne(this))},D.prototype.forceUpdate=function(_){this.__v&&(this.__e=!0,_&&this.__h.push(_),ne(this))},D.prototype.render=F,H=[],de=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,j=function(_,e){return _.__v.__b-e.__v.__b},O.__r=0,ve=/(PointerCapture)$|Capture$/i,G=0,q=oe(!1),Z=oe(!0);var Me=0;function k(_,e,t,o,r,n){e||(e={});var c,s,u=e;"ref"in e&&(c=e.ref,delete e.ref);var l={type:_,props:u,key:t,ref:c,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Me,__i:-1,__u:0,__source:r,__self:n};if(typeof _=="function"&&(c=_.defaultProps))for(s in c)u[s]===void 0&&(u[s]=c[s]);return h.vnode&&h.vnode(l),l}var z,m,V,ie,K=0,xe=[],g=h,ce=g.__b,le=g.__r,se=g.diffed,ue=g.__c,fe=g.unmount,ae=g.__;function Le(_,e){g.__h&&g.__h(m,_,K||e),K=0;var t=m.__H||(m.__H={__:[],__h:[]});return _>=t.__.length&&t.__.push({}),t.__[_]}function Te(_){return K=1,Ae(Pe,_)}function Ae(_,e,t){var o=Le(z++,2);if(o.t=_,!o.__c&&(o.__=[Pe(void 0,e),function(s){var u=o.__N?o.__N[0]:o.__[0],l=o.t(u,s);u!==l&&(o.__N=[l,o.__[1]],o.__c.setState({}))}],o.__c=m,!m.u)){var r=function(s,u,l){if(!o.__c.__H)return!0;var p=o.__c.__H.__.filter(function(a){return!!a.__c});if(p.every(function(a){return!a.__N}))return!n||n.call(this,s,u,l);var i=o.__c.props!==s;return p.forEach(function(a){if(a.__N){var f=a.__[0];a.__=a.__N,a.__N=void 0,f!==a.__[0]&&(i=!0)}}),n&&n.call(this,s,u,l)||i};m.u=!0;var n=m.shouldComponentUpdate,c=m.componentWillUpdate;m.componentWillUpdate=function(s,u,l){if(this.__e){var p=n;n=void 0,r(s,u,l),n=p}c&&c.call(this,s,u,l)},m.shouldComponentUpdate=r}return o.__N||o.__}function Ue(){for(var _;_=xe.shift();)if(_.__P&&_.__H)try{_.__H.__h.forEach(I),_.__H.__h.forEach(Y),_.__H.__h=[]}catch(e){_.__H.__h=[],g.__e(e,_.__v)}}g.__b=function(_){m=null,ce&&ce(_)},g.__=function(_,e){_&&e.__k&&e.__k.__m&&(_.__m=e.__k.__m),ae&&ae(_,e)},g.__r=function(_){le&&le(_),z=0;var e=(m=_.__c).__H;e&&(V===m?(e.__h=[],m.__h=[],e.__.forEach(function(t){t.__N&&(t.__=t.__N),t.i=t.__N=void 0})):(e.__h.forEach(I),e.__h.forEach(Y),e.__h=[],z=0)),V=m},g.diffed=function(_){se&&se(_);var e=_.__c;e&&e.__H&&(e.__H.__h.length&&(xe.push(e)!==1&&ie===g.requestAnimationFrame||((ie=g.requestAnimationFrame)||De)(Ue)),e.__H.__.forEach(function(t){t.i&&(t.__H=t.i),t.i=void 0})),V=m=null},g.__c=function(_,e){e.some(function(t){try{t.__h.forEach(I),t.__h=t.__h.filter(function(o){return!o.__||Y(o)})}catch(o){e.some(function(r){r.__h&&(r.__h=[])}),e=[],g.__e(o,t.__v)}}),ue&&ue(_,e)},g.unmount=function(_){fe&&fe(_);var e,t=_.__c;t&&t.__H&&(t.__H.__.forEach(function(o){try{I(o)}catch(r){e=r}}),t.__H=void 0,e&&g.__e(e,t.__v))};var pe=typeof requestAnimationFrame=="function";function De(_){var e,t=function(){clearTimeout(o),pe&&cancelAnimationFrame(e),setTimeout(_)},o=setTimeout(t,100);pe&&(e=requestAnimationFrame(t))}function I(_){var e=m,t=_.__c;typeof t=="function"&&(_.__c=void 0,t()),m=e}function Y(_){var e=m;_.__c=_.__(),m=e}function Pe(_,e){return typeof e=="function"?e(_):e}const Ie="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='27.68'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20296'%3e%3cpath%20fill='%23673AB8'%20d='m128%200l128%2073.9v147.8l-128%2073.9L0%20221.7V73.9z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M34.865%20220.478c17.016%2021.78%2071.095%205.185%20122.15-34.704c51.055-39.888%2080.24-88.345%2063.224-110.126c-17.017-21.78-71.095-5.184-122.15%2034.704c-51.055%2039.89-80.24%2088.346-63.224%20110.126Zm7.27-5.68c-5.644-7.222-3.178-21.402%207.573-39.253c11.322-18.797%2030.541-39.548%2054.06-57.923c23.52-18.375%2048.303-32.004%2069.281-38.442c19.922-6.113%2034.277-5.075%2039.92%202.148c5.644%207.223%203.178%2021.403-7.573%2039.254c-11.322%2018.797-30.541%2039.547-54.06%2057.923c-23.52%2018.375-48.304%2032.004-69.281%2038.441c-19.922%206.114-34.277%205.076-39.92-2.147Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M220.239%20220.478c17.017-21.78-12.169-70.237-63.224-110.126C105.96%2070.464%2051.88%2053.868%2034.865%2075.648c-17.017%2021.78%2012.169%2070.238%2063.224%20110.126c51.055%2039.889%20105.133%2056.485%20122.15%2034.704Zm-7.27-5.68c-5.643%207.224-19.998%208.262-39.92%202.148c-20.978-6.437-45.761-20.066-69.28-38.441c-23.52-18.376-42.74-39.126-54.06-57.923c-10.752-17.851-13.218-32.03-7.575-39.254c5.644-7.223%2019.999-8.261%2039.92-2.148c20.978%206.438%2045.762%2020.067%2069.281%2038.442c23.52%2018.375%2042.739%2039.126%2054.06%2057.923c10.752%2017.85%2013.218%2032.03%207.574%2039.254Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M127.552%20167.667c10.827%200%2019.603-8.777%2019.603-19.604c0-10.826-8.776-19.603-19.603-19.603c-10.827%200-19.604%208.777-19.604%2019.603c0%2010.827%208.777%2019.604%2019.604%2019.604Z'%3e%3c/path%3e%3c/svg%3e",Oe="/thesis-frontend/vite.svg";function We(){const[_,e]=Te(0);return k(F,{children:[k("div",{children:[k("a",{href:"https://vite.dev",target:"_blank",children:k("img",{src:Oe,class:"logo",alt:"Vite logo"})}),k("a",{href:"https://preactjs.com",target:"_blank",children:k("img",{src:Ie,class:"logo preact",alt:"Preact logo"})})]}),k("h1",{children:"Vite + Preact"}),k("div",{class:"card",children:[k("button",{onClick:()=>e(t=>t+1),children:["count is ",_]}),k("p",{children:["Edit ",k("code",{children:"src/app.jsx"})," and save to test HMR"]})]}),k("p",{children:["Check out"," ",k("a",{href:"https://preactjs.com/guide/v10/getting-started#create-a-vite-powered-preact-app",target:"_blank",children:"create-preact"}),", the official Preact + Vite starter"]}),k("p",{class:"read-the-docs",children:"Click on the Vite and Preact logos to learn more"})]})}Ee(k(We,{}),document.getElementById("app"));
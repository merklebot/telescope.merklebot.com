(function(e){function t(t){for(var a,r,c=t[0],i=t[1],u=t[2],l=0,p=[];l<c.length;l++)r=c[l],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&p.push(s[r][0]),s[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==s[c]&&(a=!1)}a&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},s={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-3aa17dd8":"eb5ce500","chunk-58b4af49":"aec1d4c8","chunk-a41c70ae":"d8e71ce2","chunk-34995a90":"33acef37","chunk-675cd95a":"d05b9d24","chunk-d618418c":"a0f628b0"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-3aa17dd8":1,"chunk-58b4af49":1,"chunk-a41c70ae":1,"chunk-34995a90":1,"chunk-675cd95a":1,"chunk-d618418c":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-3aa17dd8":"ad8fe492","chunk-58b4af49":"2d9f2a52","chunk-a41c70ae":"66af501d","chunk-34995a90":"9a0bfc5a","chunk-675cd95a":"21488fd9","chunk-d618418c":"92be9d0b"}[e]+".css",s=i.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var u=o[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===s))return t()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){u=p[c],l=u.getAttribute("data-href");if(l===a||l===s)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete r[e],d.parentNode.removeChild(d),n(o)},d.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[e]=0})));var a=s[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,n){a=s[e]=[t,n]}));t.push(a[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var p=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=s[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",p.name="ChunkLoadError",p.type=a,p.request=r,n[1](p)}s[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var p=0;p<u.length;p++)t(u[p]);var d=l;o.push([1,"chunk-vendors"]),n()})({0:function(e,t){},"034f":function(e,t,n){"use strict";n("85ec")},1:function(e,t,n){e.exports=n("56d7")},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},2:function(e,t){},"28c7":function(e,t,n){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"51e2":function(e,t,n){"use strict";n("e187")},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("5530"),r=n("b85c"),s=n("1da1"),o=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("e9c4"),n("d3b7"),n("2b0e")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Layout",[n("router-view")],1)},i=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("fragment",[n("Header"),n("main",{attrs:{role:"main"}},[e._t("default")],2)],1)},l=[],p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",{staticClass:"header",attrs:{role:"banner"}},["success"===e.$store.state.app.checkoutStatus?n("div",{staticClass:"header-top msg-green"},[n("div",{staticClass:"layout-narrow"},[e._v(" Payment successful! Please wait for your "),n("a",{attrs:{href:"#step-2"},on:{click:function(t){return t.preventDefault(),e.jump("#step-2")}}},[e._v("$STRGZN")]),e._v(" tokens ~ 1 minute ")])]):e._e(),"error"===e.$store.state.app.checkoutStatus?n("div",{staticClass:"header-top msg-red"},[n("div",{staticClass:"layout-narrow"},[e._v(" Payment error, please "),n("a",{attrs:{href:e.$discord,target:"_blank",rel:"noopener noreferrer"}},[e._v("contact us")])])]):e._e(),n("div",{staticClass:"header-content"},[n("router-link",{staticClass:"toplink",attrs:{to:{name:"checkout"}}},[e._v("Online telescope")]),n("nav",{staticClass:"nav-g"},[n("details",{staticClass:"nav-expand",attrs:{tabindex:"0"}},[n("summary",{staticClass:"icon"},[e._v("?")]),n("div",{staticClass:"nav-expand-content"},[n("h4",[e._v("Have a question?")]),n("p",[e._v("Please contact us by "),n("a",{attrs:{href:e.$discord,target:"_blank",rel:"noopener noreferrer"}},[e._v("Discord")]),e._v(".")])])]),e._m(0)])],1)])},d=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("details",{staticClass:"nav-expand",attrs:{tabindex:"0"}},[n("summary",{staticClass:"icon"},[e._v("i")]),n("div",{staticClass:"nav-expand-content"},[n("h4",[e._v("First Beyond the Sky")]),n("p",[e._v("This digital experience explores the interconnection of realverse and metaverse. ")]),n("p",[n("a",{attrs:{href:"https://medium.com/merklebot/mint-nfts-with-telescope-in-chile-371eb773189",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learn more")])]),n("h4",[e._v("Technologies used")]),n("p",[e._v("Blockchain, "),n("a",{attrs:{href:"https://robonomics.network/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Robonomics")]),e._v(", "),n("a",{attrs:{href:"https://kusama.network/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kusama")]),e._v(", "),n("a",{attrs:{href:"https://ipfs.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("IPFS")]),e._v(", "),n("a",{attrs:{href:"https://www.rmrk.app/",target:"_blank",rel:"noopener noreferrer"}},[e._v("RMRK")])])])])}],f=(n("159b"),{methods:{jump:function(e){window.scrollTo({top:document.querySelector(e).offsetTop,behavior:"smooth"})}},mounted:function(){document.body.onclick=function(e){var t=e.target.closest('details[tabindex="0"]');document.body.querySelectorAll('details[tabindex="0"]').forEach((function(e){e!==t&&(e.open=!1)}))}}}),h=f,m=(n("8a29"),n("2877")),v=Object(m["a"])(h,p,d,!1,null,"59ed4e26",null),b=v.exports,g={name:"Layout",components:{Header:b}},_=g,k=Object(m["a"])(_,u,l,!1,null,null,null),y=k.exports,S={name:"App",components:{Layout:y}},O=S,w=(n("034f"),Object(m["a"])(O,c,i,!1,null,null,null)),x=w.exports,C=n("8c4f"),j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"banner",class:e.service.status},[n("div",{staticClass:"banner-top",class:e.dayTimeClass},[n("div",{staticClass:"banner-top-content"},[n("h1",[e._v("Connecting Universe to Metaverse!")]),e._m(0),"start"===e.$store.state.app.status?[n("span",{staticClass:"loader"})]:"start clicked"===e.$store.state.app.status||"extension error"===e.$store.state.app.status?[n("Button",{nativeOn:{click:function(t){return e.jump("#start")}}},[e._v("Start")])]:e.$store.state.app.account?[n("div",[n("Button",{attrs:{size:"medium",color:"orange"},nativeOn:{click:function(t){return e.jump("#step-2")}}},[e._v("Get access")])],1),n("div",[e._v("or")]),n("div",[n("Button",{attrs:{href:"https://singular.rmrk.app/space/"+e.$store.state.app.account+"?tab=owned&owner=yes",size:"medium",color:"green",target:"_blank",rel:"noopener noreferrer"}},[e._v(" Check your NFT ")])],1)]:e._e(),e._m(1)],2),n("div",{staticClass:"banner-top-art",attrs:{"aria-hidden":"true"}},[n("Stars"),n("img",{staticClass:"cloud cloud-1",attrs:{"aria-hidden":"true",src:"i/cloud-1.png"}}),n("img",{staticClass:"cloud cloud-2",attrs:{"aria-hidden":"true",src:"i/cloud-2.png"}}),n("img",{staticClass:"cloud cloud-3",attrs:{"aria-hidden":"true",src:"i/cloud-3.png"}}),n("div",{staticClass:"banner-grass"}),n("img",{staticClass:"banner-stone",attrs:{"aria-hidden":"true",src:"i/banner-stone.png"}}),n("img",{staticClass:"banner-sights",attrs:{"aria-hidden":"true",src:"i/banner-sights.png"}})],1)]),n("div",{staticClass:"banner-bottom"},[n("div",{staticClass:"layout-narrow"},[n("div",{staticClass:"service-status"},[e._v("Telescope "+e._s(e.service.status))]),n("div",{staticClass:"service-message"},[e._v(e._s(e.service.message))])])])]),e._m(2),n("section",{staticClass:"section-blue-mid",attrs:{id:"step-1"}},[n("div",{staticClass:"layout-narrow"},[n("h3",[e._v("1. Create or choose your account")]),e._m(3),"start"===e.$store.state.app.status?n("section",[n("Button",{nativeOn:{click:function(t){return e.$store.commit("setAppStatus","start clicked")}}},[e._v("Connect account")])],1):n("section",["start clicked"===e.$store.state.app.status?[n("span",{staticClass:"loader"}),n("i",[e._v("Checking Polkadot.js extension")])]:e._e(),"extension error"===e.$store.state.app.status?[n("p",{staticClass:"error-title"},[e._v(e._s(e.$store.state.polkadot.message))]),n("p",{staticClass:"error-text"},["NOT_FOUND_EXTENSION"===e.$store.state.polkadot.message?[e._v(" Please install "),n("a",{attrs:{href:"https://polkadot.js.org/extension/",target:"_blank"}},[e._v("Polkadot.js extension")]),e._v(", create and add Web3 account. Then reload this page. ")]:"accounts not found"===e.$store.state.polkadot.message?[e._v(" Please create an account or switch on account's visibility in "),n("a",{attrs:{href:"https://polkadot.js.org/extension/",target:"_blank"}},[e._v("Polkadot.js extension")]),e._v(". Then reload this page. ")]:[e._v(" Polkadot.js extension error, please try to reload page, if error still occurs "),n("a",{attrs:{href:e.$discord,target:"_blank",rel:"noopener noreferrer"}},[e._v("contact us")])]],2)]:e._e(),"extension ready"===e.$store.state.app.status?[n("form",[n("p",[n("select",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],staticClass:"container-full",on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.account=t.target.multiple?n:n[0]}}},e._l(e.$store.state.polkadot.accounts,(function(t,a){return n("option",{key:a,domProps:{value:t.address}},[e._v(" "+e._s(t.meta.name)+" – "+e._s(e.addressShort(t.address))+" ")])})),0)])])]:e._e()],2)])]),n("section",{staticClass:"section-blue-dark p-b-0",attrs:{id:"step-2"}},[e._m(4),n("section",{staticClass:"tokenSection layout-sm"},[n("div",{staticClass:"tokenSection-info"},[n("h4",[e._v(" Your balance "),n("span",{class:{"text-green":e.$store.state.app.balance>0}},[e._v(e._s(e.$store.state.app.balance)+" $STRGZN")]),"success"===e.$store.state.app.checkoutStatus?n("div",{staticClass:"text-green"},[e._v(" Payment successful!"),n("br"),e._v(" Please wait for your $STRGZN tokens"),n("br"),e._v(" ~ 1 minute ")]):e._e(),"error"===e.$store.state.app.checkoutStatus?n("div",{staticClass:"text-red"},[e._v("Payment error, please "),n("a",{attrs:{href:e.$discord,target:"_blank",rel:"noopener noreferrer"}},[e._v("contact us")])]):e._e()]),n("p",[e._v("1 $STRGZN = "+e._s(e.pricePerToken)+" USD")]),n("p",[e._v("1 space NFT = 25 $STRGZN")])]),n("div",{staticClass:"tokenSection-form"},[n("h4",[e._v("Purchase tokens")]),"extension ready"!==e.$store.state.app.status?n("p",{staticClass:"error-title text-small"},[e._v(" Please "),n("a",{attrs:{href:"#step-1"},on:{click:function(t){return t.preventDefault(),e.jump("#step-1")}}},[e._v("connect your Polkadot account")])]):e._e(),n("form",{class:{disabled:"extension ready"!==e.$store.state.app.status},on:{submit:function(t){return t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[n("div",{staticClass:"inputNumbers m-b-space"},[n("div",{staticClass:"less",on:{click:function(t){return e.setQuantity(-e.pricePerNftInUsd)}}},[e._v("-")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.quantity,expression:"quantity",modifiers:{number:!0}}],attrs:{type:"number",value:"quantity",required:""},domProps:{value:e.quantity},on:{input:function(t){t.target.composing||(e.quantity=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}}),n("div",{staticClass:"more",on:{click:function(t){return e.setQuantity(e.pricePerNftInUsd)}}},[e._v("+")])]),n("h5",[e._v("Total: "+e._s(e.totalPaymentUSD)+" USD")]),n("Button",{staticClass:"container-full",attrs:{size:"medium",disabled:!e.checkoutStatus}},[n("span",{staticClass:"text"},[e._v("Pay with")]),n("img",{staticClass:"label",attrs:{alt:"Stripe",src:"i/stripe.svg"}})])],1)])])]),n("astronomicalObjectCard")],1)},T=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"layout-narrow"},[n("p",[e._v("Connect to our autonomous telescope in the dark night of Atacama desert in Chile, select an astronomical object and mint unique NFTs in a few clicks.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"banner-telescope",attrs:{"aria-hidden":"true"}},[n("img",{staticClass:"banner-telescope-pod-1",attrs:{"aria-hidden":"true",src:"i/banner-telescope-pod-1.png"}}),n("img",{staticClass:"banner-telescope-pod-2",attrs:{"aria-hidden":"true",src:"i/banner-telescope-pod-2.png"}}),n("img",{staticClass:"banner-telescope-head",attrs:{"aria-hidden":"true",src:"i/banner-telescope-head.png"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section-blue",attrs:{id:"start"}},[n("div",{staticClass:"layout-narrow"},[n("h2",[e._v("Follow the steps and mint your nft Of astronomical object")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticClass:"hyphens"},[e._v(" We use "),n("a",{attrs:{href:"https://polkadot.js.org/extension/",target:"_blank"}},[e._v("Polkadot.js extension")]),e._v(" to manage user accounts. Here is the "),n("a",{attrs:{href:"https://medium.com/merklebot/how-to-create-an-account-using-polkadot-js-extension-bd02a0953946",target:"_blank"}},[e._v("initial setup guide.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"layout-narrow"},[n("h3",[e._v("2. Get telescope tokens")]),n("p",{staticClass:"hyphens"},[e._v(" Our telescope only accepts special $STRGZN tokens and you can buy them below using your credit card. ")])])}],P=(n("3ca3"),n("ddb0"),n("b680"),n("fb6a"),n("caad"),n("2532"),n("7424")),E=n("db49"),N=Stripe(E["a"].STRIPE_KEY),I=N,R={components:{astronomicalObjectCard:function(){return n.e("chunk-58b4af49").then(n.bind(null,"d4e6"))},Button:function(){return n.e("chunk-a41c70ae").then(n.bind(null,"e0dab"))},Stars:function(){return n.e("chunk-3aa17dd8").then(n.bind(null,"09be"))}},data:function(){return{error:null,pricePerToken:(E["a"].PRICE_PER_STRGZN_CENTS/100).toFixed(),quantity:2*E["a"].PRICE_PER_NFT_STRGZNS,pricePerNftInUsd:E["a"].PRICE_PER_NFT_STRGZNS*E["a"].PRICE_PER_STRGZN_CENTS/100,dayTimeClass:null,checkoutStatus:!0}},computed:{service:function(){return this.$store.state.service},totalPaymentUSD:function(){return(this.quantity*this.pricePerToken).toFixed(2)},account:{get:function(){return this.$store.state.app.account},set:function(e){this.$store.dispatch("setAccountActive",e)}}},methods:{setQuantity:function(e){if(this.quantity+e>=E["a"].MIN_TOKENS_BUY&&this.quantity+e<=E["a"].MAX_TOKENS_BUY)return this.quantity+=e},addressShort:function(e){return e.slice(0,6)+"..."+e.slice(-4)},handleSubmit:function(){this.checkoutStatus=!1,this.account&&this.checkout(this.account,this.quantity)},checkout:function(e,t){var n=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.proccess=!0,a.prev=1,a.next=4,Object(P["a"])({account:e,quantity:t});case 4:return r=a.sent,a.next=7,I.redirectToCheckout({sessionId:r.id});case 7:s=a.sent,s.error&&console.error(s.error.message),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](1),console.log("Checkout error:",a.t0);case 14:n.proccess=!1,n.checkoutStatus=!0;case 16:case"end":return a.stop()}}),a,null,[[1,11]])})))()},jump:function(e){window.scrollTo({top:document.querySelector(e).offsetTop,behavior:"smooth"})},dayTime:function(){if(this.service.message){if(this.service.message.includes("Daytime"))return"day";if(this.service.message.includes("Night"))return"night";if(this.service.message.includes("cloudy"))return"cloudy"}}},mounted:function(){this.dayTimeClass=this.dayTime(),this.$store.dispatch("onMount",this.$route)},watch:{service:function(){this.dayTimeClass=this.dayTime()}}},$=R,A=(n("db62"),Object(m["a"])($,j,T,!1,null,"76a59438",null)),F=A.exports;o["a"].use(C["a"]);var U=new C["a"]({routes:[{path:"/",name:"checkout",component:F},{path:"*",redirect:"/"}]}),B=(n("4de4"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{class:[{"container-full":e.fullWidth},e.size?"btn-"+e.size:null,"btn-"+e.color],on:{click:function(t){return e.$emit("click",t)}}},[e._t("default")],2)}),M=[],q={props:{fullWidth:{type:Boolean,default:!1},size:{type:String,validator:function(e){return["big","sm"].includes(e)},require:!1},color:{type:String,validator:function(e){return["green","blue"].includes(e)},default:"blue"}}},L=q,G=Object(m["a"])(L,B,M,!1,null,null,null),D=G.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{on:{click:function(t){return e.up(!e.flag)}}},[e.flag?[e._v("–")]:[e._v("+")]],2)},H=[],Z={model:{prop:"value",event:"toggle"},props:{value:{type:Boolean,default:!0},id:String},data:function(){return{flag:this.value}},created:function(){if(this.id){var e=localStorage.getItem("toogle:".concat(this.id));"true"===e?this.up(!0):"false"===e&&this.up(!1)}},methods:{up:function(e){this.flag=e,this.$emit("toggle",this.flag),this.id&&localStorage.setItem("toogle:".concat(this.id),this.flag)}}},K=Z,V=Object(m["a"])(K,z,H,!1,null,null,null),W=V.exports,X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"section-light"},[e._t("default")],2)},J=[],Y={},Q=Object(m["a"])(Y,X,J,!1,null,null,null),ee=Q.exports,te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Card",[n("div",{staticClass:"window-head"},[n("span",{domProps:{innerHTML:e._s(e.title)}}),n("Toggle",{staticClass:"window-head-toggle",attrs:{id:e.id},model:{value:e.isShow,callback:function(t){e.isShow=t},expression:"isShow"}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"window-content"},[e._t("default")],2)])},ne=[],ae={props:["title","id"],components:{Card:ee,Toggle:W},data:function(){return{isShow:!0}}},re=ae,se=Object(m["a"])(re,te,ne,!1,null,null,null),oe=se.exports,ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"form-section-title"},[e._v(e._s(e.title))]),e._t("default")],2)},ie=[],ue={props:{title:String}},le=ue,pe=Object(m["a"])(le,ce,ie,!1,null,null,null),de=pe.exports,fe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-item form-line-label"},[e._t("default")],2)},he=[],me={},ve=Object(m["a"])(me,fe,he,!1,null,null,null),be=ve.exports,ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",[e._t("default"),e._v(": "),e.isError?n("span",{staticClass:"input-msg"},[e._v(e._s(e.msgError))]):e._e()],2)},_e=[],ke={props:{msgError:{type:String,default:"Check if data correct, please."},isError:{type:Boolean,default:!1}}},ye=ke,Se=Object(m["a"])(ye,ge,_e,!1,null,null,null),Oe=Se.exports,we=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.paginatedData,(function(t,a){return n("div",{key:a},[e._t("default",null,{item:t})],2)})),n("div",{staticClass:"pagination"},[n("button",{attrs:{disabled:0===e.pageNumber},on:{click:e.prevPage}},[e._v("Previous")]),n("b",[e._v(e._s(e.pageCount>0?e.pageNumber+1:0)+" / "+e._s(e.pageCount))]),n("button",{attrs:{disabled:e.pageNumber>=e.pageCount-1},on:{click:e.nextPage}},[e._v(" Next ")])])],2)},xe=[],Ce=(n("a9e3"),{props:{listData:{type:Array,required:!0},currentPage:{type:Number,required:!1,default:0},size:{type:Number,required:!1,default:1}},data:function(){return{pageNumber:this.currentPage}},watch:{currentPage:function(e){this.pageNumber=e}},computed:{pageCount:function(){var e=this.listData.length,t=this.size;return Math.ceil(e/t)},paginatedData:function(){var e=this.pageNumber*this.size,t=e+this.size;return this.listData.slice(e,t)}},methods:{nextPage:function(){this.pageNumber++,this.$emit("page",this.pageNumber)},prevPage:function(){this.pageNumber--,this.$emit("page",this.pageNumber)}}}),je=Ce,Te=(n("51e2"),Object(m["a"])(je,we,xe,!1,null,"f5fce9e0",null)),Pe=Te.exports,Ee=(n("99af"),function(e){return e.slice(0,6)+"..."+e.slice(-4)});function Ne(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"address",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,a="etherscan.io";""===t&&(t="address");var r="";return 4===n&&(r="rinkeby."),a=r+a,"https://".concat(a,"/").concat(t,"/").concat(e)}function Ie(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ipfs",n="ipfs.io";return""===t&&(t="ipfs"),"https://".concat(n,"/").concat(t,"/").concat(e)}o["a"].component("Button",D),o["a"].component("Toggle",W),o["a"].component("Card",ee),o["a"].component("CardToggle",oe),o["a"].component("FormSection",de),o["a"].component("FormField",be),o["a"].component("FormFieldLabel",Oe),o["a"].component("Pagination",Pe),o["a"].filter("labelAddress",Ee),o["a"].filter("urlChainExplorer",Ne),o["a"].filter("urlIpfsExplorer",Ie);var Re=n("3f08"),$e=n("2f62"),Ae=n("342d"),Fe=n.n(Ae),Ue=n("ef36");console.log("App info:",JSON.stringify(E["a"].APP_INFO)),o["a"].use(Re["a"].Plugin),o["a"].use($e["a"]),o["a"].use(Fe.a);var Be=new $e["a"].Store({state:{service:{message:null,status:null},telescope:[],astronomicalObjects:[],polkadot:{message:"init",api:null,accounts:null},app:{status:"start",account:localStorage.account?localStorage.account:null,balance:0,balanceUnsubscribe:null,email:localStorage.email?localStorage.email:null,checkoutStatus:!1}},mutations:{setIsTelescopeFree:function(e,t){e.telescope=t},setEmail:function(e,t){e.app.email=t,localStorage.setItem("email",e.app.email)},setAppStatus:function(e,t){e.app.status=t},setServiceStatus:function(e,t){e.service=t,console.log("[Vuex setServiceStatus]:",{status:e.service.status,message:e.service.message})},setAstronomicalObjects:function(e,t){e.astronomicalObjects=t,console.log("[Vuex setAstronomicalObjects]:",t)},setPolkadotInfo:function(e,t){e.polkadot=t},setAppInfo:function(e,t){e.app=t},setCheckoutStatus:function(e,t){e.app.checkoutStatus=t}},actions:{setAccountActive:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function n(){var s,o,c,i,u,l;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=e.state,o=e.commit,c=!1,s.polkadot.accounts){i=Object(r["a"])(s.polkadot.accounts);try{for(i.s();!(u=i.n()).done;)l=u.value,l.address==t&&(c=!0)}catch(p){i.e(p)}finally{i.f()}}if(!c){n.next=11;break}return o("setAppInfo",Object(a["a"])(Object(a["a"])({},s.app),{},{account:t})),s.app.account=t,localStorage.setItem("account",s.app.account),s.app.balanceUnsubscribe&&s.app.balanceUnsubscribe(),n.next=10,s.polkadot.api.query.assets.account(E["a"].ID_ASSET,s.app.account,(function(e){var t=e.balance;o("setAppInfo",Object(a["a"])(Object(a["a"])({},s.app),{},{balance:t.toNumber()}))}));case 10:s.app.balanceUnsubscribe=n.sent;case 11:case"end":return n.stop()}}),n)})))()},polkadotConnect:function(e){return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,r,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,r=e.dispatch,s=e.commit,t.prev=1,o=Object(Ue["c"])(),o.on("error",(function(){s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"provider not connected"})),s("setAppInfo",Object(a["a"])(Object(a["a"])({},n.app),{},{status:"extension error"}))})),o.on("connect",(function(){s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"provider connected"}))})),t.next=7,Object(Ue["b"])();case 7:return n.polkadot.api=t.sent,n.polkadot.api?s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"api connected"})):(s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"api not connected"})),s("setAppInfo",Object(a["a"])(Object(a["a"])({},n.app),{},{status:"extension error"}))),t.t0=s,t.t1=a["a"],t.t2=Object(a["a"])({},n.polkadot),t.t3={},t.next=15,Object(Ue["a"])(n.polkadot.api);case 15:t.t4=t.sent,t.t5={accounts:t.t4},t.t6=(0,t.t1)(t.t2,t.t3,t.t5),(0,t.t0)("setPolkadotInfo",t.t6),n.polkadot.accounts.length>0?s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"accounts found"})):(s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:"accounts not found"})),s("setAppInfo",Object(a["a"])(Object(a["a"])({},n.app),{},{status:"extension error"}))),t.next=26;break;case 22:t.prev=22,t.t7=t["catch"](1),s("setPolkadotInfo",Object(a["a"])(Object(a["a"])({},n.polkadot),{},{message:t.t7.message})),s("setAppInfo",Object(a["a"])(Object(a["a"])({},n.app),{},{status:"extension error"}));case 26:return t.prev=26,"extension error"!==n.app.status&&s("setAppInfo",Object(a["a"])(Object(a["a"])({},n.app),{},{status:"extension ready"})),n.app.account?r("setAccountActive",n.app.account):r("setAccountActive",n.polkadot.accounts[0].address),t.finish(26);case 30:case"end":return t.stop()}}),t,null,[[1,22,26,30]])})))()},setServiceStatus:function(e,t){var n=e.commit;n("setServiceStatus",t)},setAstronomicalObjects:function(e,t){var n=e.commit;n("setAstronomicalObjects",t)},setIsTelescopeFree:function(e,t){var n=e.commit;n("setIsTelescopeFree",t)},onMount:function(e,t){var n=e.commit,a=e.state;t.query.checkout&&(n("setCheckoutStatus",t.query.checkout),setTimeout((function(){"success"===a.app.checkoutStatus&&n("setCheckoutStatus",!1)}),5e4))}}});o["a"].config.productionTip=!1,o["a"].prototype.$discord="https://discord.com/invite/5UWNGNaAUf",new o["a"]({router:U,render:function(e){return e(x)},store:Be,created:function(){var e=this;this.$store.dispatch("polkadotConnect");var t=function(){var n=Object(s["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(P["f"])(e.$store.state.service.status,e.$store.state.service.message,E["a"].API_SERVER_LONG_POLLING_TIMEOUT);case 2:return a=n.sent,e.$store.dispatch("setServiceStatus",a),n.next=6,new Promise((function(e){return setTimeout(e,5e3)}));case 6:return n.next=8,t();case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();t(),Object(P["d"])().then((function(t){e.$store.dispatch("setAstronomicalObjects",t)}));var n=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(P["d"])(E["a"].API_SERVER_LONG_POLLING_TIMEOUT);case 2:return a=t.sent,e.$store.dispatch("setAstronomicalObjects",a),t.next=6,new Promise((function(e){return setTimeout(e,5e3)}));case 6:return t.next=8,n();case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();n(),Object(P["e"])().then((function(t){e.$store.dispatch("setIsTelescopeFree",t)}));var a=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(e){return setTimeout(e,1e3)}));case 2:return t.next=4,Object(P["e"])(E["a"].API_SERVER_LONG_POLLING_TIMEOUT,e.$store.state.telescope);case 4:n=t.sent,e.$store.dispatch("setIsTelescopeFree",n);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();a()}}).$mount("#app")},"5ede":function(e,t,n){},6:function(e,t){},7:function(e,t){},7424:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"e",(function(){return h})),n.d(t,"c",(function(){return v})),n.d(t,"b",(function(){return g}));var a=n("1da1"),r=(n("96cf"),n("99af"),n("bc3a")),s=n.n(r),o=n("db49"),c=s.a.create({baseURL:o["a"].API_SERVER,headers:{"X-App-Info":"version=".concat(o["a"].APP_INFO.VERSION,"; commit=").concat(o["a"].APP_INFO.COMMIT_HASH)}});function i(e){return u.apply(this,arguments)}function u(){return u=Object(a["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.post("checkout",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function l(){return p.apply(this,arguments)}function p(){return p=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n,a,r,s=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=s.length>0&&void 0!==s[0]?s[0]:null,n=s.length>1&&void 0!==s[1]?s[1]:null,a=s.length>2&&void 0!==s[2]?s[2]:6e5,a/=1e3,e.next=6,c.get("status/update",{params:{status_known:t,message_known:n,timeout:a}});case 6:return r=e.sent,e.abrupt("return",r.data);case 8:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function d(){return f.apply(this,arguments)}function f(){return f=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n,a=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:0,t/=1e3,e.next=4,c.get("catalogs/beyond-the-sky",{headers:{Prefer:"wait=".concat(t)}});case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function h(){return m.apply(this,arguments)}function m(){return m=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n,a,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:0,n=r.length>1?r[1]:void 0,t/=1e3,e.next=5,c.get("telescopes/1/is_free",{params:{known_is_free:n},headers:{Prefer:"wait=".concat(t)}});case 5:return a=e.sent,e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}function v(){return b.apply(this,arguments)}function b(){return b=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.get("price");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}function g(e,t){return _.apply(this,arguments)}function _(){return _=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.post("nft/orders",{customer:{account_address:t},astronomical_object:{catalog_name:n}});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}},8:function(e,t){},"85ec":function(e,t,n){},"8a29":function(e,t,n){"use strict";n("28c7")},9:function(e,t){},9224:function(e){e.exports=JSON.parse('{"name":"dapp","version":"0.1.0","private":true,"scripts":{"serve":"vue-cli-service serve","serve-osx":"npx kill-port 8080 && vue-cli-service serve --port 8080","build":"vue-cli-service build","lint":"vue-cli-service lint"},"dependencies":{"@polkadot/api":"^6.12.1","@polkadot/extension-dapp":"^0.41.2","@polkadot/ui-keyring":"^0.86.7","axios":"^0.21.1","core-js":"^3.20.1","moment-timezone":"^0.5.34","stripe":"^8.195.0","vue":"^2.6.11","vue-fragment":"^1.5.2","vue-head":"^2.2.0","vue-markdown-render":"^1.1.2","vue-moment":"^4.1.0","vue-router":"^3.5.1","vuex":"^3.6.2"},"devDependencies":{"@vue/cli-plugin-babel":"~4.5.0","@vue/cli-plugin-eslint":"~4.5.0","@vue/cli-service":"~4.5.0","babel-eslint":"^10.1.0","eslint":"^6.7.2","eslint-plugin-vue":"^6.2.2","markdown-image-loader":"^2.0.1","node-sass":"^7.0.1","pug":"^3.0.2","pug-plain-loader":"^1.1.0","sass-loader":"^12.4.0","style-loader":"^3.3.1","vue-template-compiler":"^2.6.11"},"eslintConfig":{"root":true,"env":{"node":true},"extends":["plugin:vue/essential","eslint:recommended"],"parserOptions":{"parser":"babel-eslint"},"rules":{},"globals":{"Stripe":true}},"browserslist":["> 1%","last 2 versions","not dead"]}')},db49:function(e,t,n){"use strict";var a;t["a"]={APP_INFO:{VERSION:n("9224").version,COMMIT_HASH:"4cd55af"},API_SERVER:"https://api.merklebot.com/beyond-the-sky",API_SERVER_LONG_POLLING_TIMEOUT:null!==(a=6e5)&&void 0!==a?a:6e5,STRIPE_KEY:"pk_live_51IvSZKJXrK78CsUSfSb5Jyjo3AkjZ2k6ZMr0c8miMMIcWcQiBKtCapD5ho2Bk45MjMh3QTlpLamkrOiG9gMJzMh100iGhW3ehO",TYPEFORM_ID:"qiVH1bjz",PRICE_PER_STRGZN_CENTS:parseInt("100"),PRICE_PER_NFT_STRGZNS:parseInt("25"),ID_ASSET:"1607",SUBSTRATE:{url:"wss://statemine-rpc.polkadot.io",types:{},keyring:{isDevelopment:!1,type:"sr25519"}},ACCESS_TOKEN_RECV_ACCOUNT:"Gecm9tRWX5sFzttHLB2j6PurJBeNM3oLHABvztnqXCnmHwZ",MIN_TOKENS_BUY:1,MAX_TOKENS_BUY:1e3}},db62:function(e,t,n){"use strict";n("5ede")},e187:function(e,t,n){},ef36:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return _})),n.d(t,"d",(function(){return k}));var a=n("5530"),r=(n("d4ec"),n("bee2"),n("1da1")),s=(n("96cf"),n("d3b7"),n("b64b"),n("99af"),n("d81d"),n("159b"),n("25f0"),n("ec14")),o=n("22a5"),c=n("0b67"),i=n("077d"),u=(n("26af"),n("db49")),l=null,p=null;function d(){return l||(l=new s["a"](u["a"].SUBSTRATE.url),l)}function f(){return h.apply(this,arguments)}function h(){return h=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!p){e.next=2;break}return e.abrupt("return",p);case 2:return e.next=4,o["a"].create({provider:d(),types:u["a"].SUBSTRATE.types});case 4:return p=e.sent,e.abrupt("return",p);case 6:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}function m(){return new Promise((function(e,t){var n=setTimeout((function(){return clearTimeout(n),clearInterval(a),t(new Error("NOT_FOUND_EXTENSION"))}),3e3),a=setInterval((function(){if(Object.keys(window.injectedWeb3).length>0)return clearTimeout(n),clearInterval(a),e()}),100)}))}var v=!1;function b(e){return g.apply(this,arguments)}function g(){return g=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m();case 2:return e.next=4,Object(i["b"])("robonomics");case 4:if(n=e.sent,0!==n.length){e.next=7;break}throw new Error("NOT_FOUND_EXTENSION");case 7:return e.next=9,Object(i["a"])();case 9:return r=e.sent,s=r.map((function(e){var t=e.address,n=e.meta;return{address:t,meta:n}})),c["a"].loadAll(Object(a["a"])({genesisHash:t.genesisHash,ss58Format:t.registry.chainSS58},u["a"].SUBSTRATE.keyring),s),v=!0,e.abrupt("return",c["a"].getPairs());case 14:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}function _(e){return v?c["a"].getPairs():b(e)}function k(e,t,n,a){return y.apply(this,arguments)}function y(){return y=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,a,r){var s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["c"])(t);case 2:return s=e.sent,o=p.tx.utility.batch([p.tx.assets.transfer(a,n,r)]),e.prev=4,e.next=7,o.signAndSend(t,{signer:s.signer},(function(e){e.status.isInBlock?e.events.forEach((function(t){var n=t.event,a=n.method,r=n.section;"system"===r&&"ExtrinsicFailed"===a?console.log("ExtrinsicFailed",{block:e.status.asInBlock.toString(),tx:o.hash.toString()}):"system"===r&&"ExtrinsicSuccess"===a&&console.log(null,{block:e.status.asInBlock.toString(),tx:o.hash.toString()})})):e.status.isFinalized&&console.log("Asset send tx is finalized")}));case 7:return e.abrupt("return",!0);case 10:e.prev=10,e.t0=e["catch"](4),console.log("Asset send error:",e.t0);case 13:return e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[4,10]])}))),y.apply(this,arguments)}}});
//# sourceMappingURL=app.cee41dd9.js.map
webpackJsonp([2],{"+Vy2":function(t,e,s){"use strict";var i=s("7QTg"),o={name:"BSwiper",components:{swiper:i.swiper},props:{direction:{type:String,default:"horizontal",validator:function(t){return["horizontal","vertical"].indexOf(t)>-1}},interval:{type:Number,default:3e3,validator:function(t){return t>=0}},loop:{type:Boolean,default:!0},pagination:{type:Boolean,default:!0},slidersArr:{type:Array,default:function(){return[]}}},data:function(){return{keyId:Math.random()}},watch:{slidersArr:function(t){0!==t.length&&(this.swiperOptions.loop=!(t.length<=1)&&this.loop,this.keyId=Math.random())}},created:function(){this.init()},methods:{init:function(){this.swiperOptions={watchOverflow:!0,direction:this.direction,autoplay:!!this.interval&&{deplay:this.interval,disableOnInteraction:!1},slidesPerView:1,loop:!(this.slidersArr.length<=1)&&this.loop,pagination:{el:this.pagination?".swiper-pagination":null}}}}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("swiper",{key:this.keyId,attrs:{options:this.swiperOptions}},[this._t("default"),this._v(" "),this.pagination?e("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"}):this._e()],2)},staticRenderFns:[]};var r=s("VU/8")(o,n,!1,function(t){s("2Mhd")},"data-v-5c83d286",null);e.a=r.exports},"1z84":function(t,e){},"2Mhd":function(t,e){},"3U2T":function(t,e){},Cdx3:function(t,e,s){var i=s("sB3e"),o=s("lktj");s("uqUo")("keys",function(){return function(t){return o(i(t))}})},CgFv:function(t,e,s){t.exports=s.p+"static/img/404.ed7cf35.png"},DusS:function(t,e){},MfKZ:function(t,e){},Mver:function(t,e){},fZjL:function(t,e,s){t.exports={default:s("jFbC"),__esModule:!0}},jFbC:function(t,e,s){s("Cdx3"),t.exports=s("FeBl").Object.keys},taF9:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("//Fk"),o=s.n(i),n=s("cQcd"),r=s("T452"),a=s("9EIA"),c="horizontal",l=!0,d=3e3,u=!0,p="on",v="加载中...",f=!1,h=!0,m={name:"ProductHeader",components:{BNavbar:s("8ViO").a},data:function(){return{visible:!0}},methods:{show:function(){this.visible=!0},hide:function(){this.visible=!1},goBack:function(){this.$router.back()}}},_={render:function(){var t=this.$createElement,e=this._self._c||t;return e("BNavbar",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"header"},[e("i",{staticClass:"iconfont icon-back",attrs:{slot:"left"},on:{click:this.goBack},slot:"left"}),this._v(" "),e("div",{staticClass:"product-headerC",attrs:{slot:"center"},slot:"center"},[this._v("商品详情")]),this._v(" "),e("i",{staticClass:"iconfont icon-cart",attrs:{slot:"right"},slot:"right"})])},staticRenderFns:[]};var C=s("VU/8")(m,_,!1,function(t){s("3U2T")},"data-v-7fd7620b",null).exports,g=s("+Vy2"),b=s("7QTg"),w=s("G8er"),k={name:"ProductSwiper",components:{BSwipper:g.a,swiperSlide:b.swiperSlide,BLoading:w.a},props:{slidersArr:{type:Array,default:function(){return[s("CgFv")]}}},created:function(){this.init()},methods:{init:function(){this.direction=c,this.loop=l,this.interval=d,this.pagination=u,this.indicator=p,this.text=v,this.inline=f}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swiper"},[t.slidersArr.length?s("BSwipper",{attrs:{slidersArr:t.slidersArr,loop:t.loop,interval:t.interval,pagination:t.pagination}},t._l(t.slidersArr,function(t,e){return s("swiper-slide",{key:e},[s("a",{staticClass:"slider-link",attrs:{href:"javascript:;",alt:""}},[s("img",{staticClass:"slider-pic",attrs:{src:t,alt:""}})])])}),1):s("BLoading",{attrs:{indicator:t.indicator,text:t.text,inline:t.inline}})],1)},staticRenderFns:[]};var T=s("VU/8")(k,y,!1,function(t){s("1z84")},"data-v-7132ea4c",null).exports,B=s("fZjL"),x=s.n(B),F={name:"ProductContent",data:function(){return{productdetail:{},isRender:!0}},props:{contents:{type:Object,default:function(){return{}}}},created:function(){this.productdetail=this.contents,0===x()(this.productdetail).length&&(this.isRender=!1)},methods:{}},I={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isRender?s("div",{staticClass:"product-content"},[s("div",{staticClass:"product-decs"},[s("p",{staticClass:"product-decs-top"},[s("span",{staticClass:"product-price"},[t._v("￥"),s("b",{staticClass:"product-priceNum"},[t._v(t._s(t.productdetail.content.priceText))])]),s("span",{staticClass:"product-salecount"},[t._v(t._s(t.productdetail.content.sellCount)+"件已售")])]),t._v(" "),s("h3",{staticClass:"product-decs-name"},[t._v(t._s(t.productdetail.content.title))]),t._v(" "),s("p",{staticClass:"product-decs-bottom"},[s("span",{staticClass:"product-del"},[t._v(t._s(t.productdetail.content.postage))]),s("span",{staticClass:"product-del"},[t._v("月销量"+t._s(t.productdetail.content.soldCount)+"件")]),s("span",{staticClass:"product-del"},[t._v(t._s(t.productdetail.content.from))])])]),t._v(" "),s("div",{staticClass:"product-comment"},[s("p",{staticClass:"product-comment-top"},[t._v("商品评价("+t._s(t.productdetail.content.review.totalCount)+")")]),t._v(" "),s("ul",{staticClass:"product-comment-category"},t._l(t.productdetail.content.review.keywords,function(e){return s("li",{key:e.attribute,staticClass:"product-comment-category-item"},[t._v(t._s(e.word)),s("span",{staticClass:"comment-num"},[t._v("("+t._s(e.count)+")")])])}),0),t._v(" "),s("ul",{staticClass:"product-comment-list"},[s("li",{staticClass:"product-comment-list-item"},[s("p",{staticClass:"commenter-info"},[s("img",{staticClass:"commenter-img",attrs:{src:t.productdetail.content.review.rateList[0].headPic}}),s("span",{staticClass:"commenter-name"},[t._v(t._s(t.productdetail.content.review.rateList[0].userName))])]),t._v(" "),s("p",{staticClass:"comment-content"},[t._v(t._s(t.productdetail.content.review.rateList[0].content))]),t._v(" "),s("p",{staticClass:"comment-others"},[s("time",[t._v(t._s(t.productdetail.content.review.rateList[0].dateTime))]),s("span",[t._v(t._s(t.productdetail.content.review.rateList[0].skuInfo))])])])])]),t._v(" "),s("div",{staticClass:"product-store"},[s("div",{staticClass:"product-store-top"},[s("img",{staticClass:"product-store-img",attrs:{src:t.productdetail.content.seller.shopIcon}}),t._v(" "),s("p",{staticClass:"product-store-info"},[s("span",{staticClass:"product-store-name"},[t._v(t._s(t.productdetail.content.seller.shopName))]),s("span",{staticClass:"product-store-brand"},[t._v("天猫")])]),t._v(" "),s("span",{staticClass:"product-store-btn"},[t._v("全部宝贝")]),t._v(" "),s("span",{staticClass:"product-store-btn"},[t._v("进店逛逛")])]),t._v(" "),s("div",{staticClass:"product-store-bottom"},t._l(t.productdetail.content.seller.evaluates,function(e){return s("span",{key:e.title},[t._v(t._s(e.title)+" "),s("b",[t._v(t._s(e.score))]),t._v(" "),s("i",{staticClass:"myiconfont"},[t._v(t._s(e.levelText))])])}),0)])]):t._e()},staticRenderFns:[]};var P=s("VU/8")(F,I,!1,function(t){s("vfz8")},"data-v-05f0cac5",null).exports,S=s("wef4"),O={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"product-footer"},[s("li",{staticClass:"product-footer-item"},[s("i",{staticClass:"iconfont icon-service"}),s("span",[t._v("店铺")])]),t._v(" "),s("li",{staticClass:"product-footer-item"},[s("i",{staticClass:"iconfont icon-service"}),s("span",[t._v("客服")])]),t._v(" "),s("li",{staticClass:"product-footer-item"},[s("i",{staticClass:"iconfont icon-service"}),s("span",[t._v("收藏")])]),t._v(" "),s("li",{staticClass:"product-footer-item cart-btn"},[s("span",[t._v("加入购物车")])]),t._v(" "),s("li",{staticClass:"product-footer-item grab-btn"},[s("span",[t._v("马上抢")])])])}]};var j=s("VU/8")({name:"ProductFooter"},O,!1,function(t){s("DusS")},null,null).exports,A=s("22O3"),$={name:"Product",components:{BScroll:a.a,BBacktop:S.a,ProductHeader:C,ProductSwiper:T,ProductContent:P,ProductFooter:j},data:function(){return{isBacktopVisible:!1,isHeaderTransition:!1,productId:"",slidersArr:[],contents:{},keyId:Math.random()}},created:function(){this.init()},watch:{productId:function(t){this.productId=this.$route.params.id,A.a.remove("mall-product-CONTENT-keyword-key"),console.log(this.$route.params.id),this.keyId=Math.random(),this.getProductData(this.productId)}},methods:{init:function(){this.scrollbar=h,this.productId=this.$route.params.id,this.getProductData(this.productId)},getProductData:function(t){var e=this;return function(t){console.log(t);var e={api:"mtop.taobao.detail.getdetail",ttid:"2017@taobao_h5_6.6.0",data:'{"itemNumId":"'+t+'"}',appKey:12574478,dataType:"jsonp",type:"jsonp",v:"6.0"};return Object(n.a)("https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/",e,r.d).then(function(t){if(console.log(t),(t=t.data).apiStack&&t.item){var e=JSON.parse(t.apiStack[0].value);console.log(e);var i={content:{}};return i.content.priceText=e.price.price.priceText,i.content.soldCount=e.vertical.jhs.soldCount,i.content.title=e.item.title,i.content.postage=e.delivery.postage,i.content.sellCount=e.item.sellCount,i.content.from=e.delivery.from,t.rate&&(i.content.review={},i.content.review.totalCount=t.rate.totalCount,i.content.review.keywords=t.rate.keywords||[],i.content.review.rateList=t.rate.rateList||[]),t.seller&&(i.content.seller={},i.content.seller.shopIcon=t.seller.shopIcon,i.content.seller.shopName=t.seller.shopName,i.content.seller.creditLevelIcon=t.seller.creditLevelIcon,i.content.seller.evaluates=t.seller.evaluates),i.slider=t.item.images||[s("CgFv")],console.log(i),i}throw new Error("没有成功获取到数据！")}).catch(function(t){t&&console.log(t)}).then(function(t){return new o.a(function(e){setTimeout(function(){e(t)},1e3)})})}(t).then(function(t){if(console.log(t),!t||!t.slider)return e.slidersArr=[s("CgFv")],void console.log(e.slidersArr);e.slidersArr=t.slider,e.contents=t,A.a.set("mall-product-CONTENT-keyword-key",t),console.log(e.contents)})},backToTop:function(){this.$refs.scroll&&this.$refs.scroll.scrollToTop()},changeHeaderStatus:function(t){t>0?this.$refs.productHeader.hide():(this.$refs.productHeader.show(),this.isHeaderTransition=-t>100)}}},N={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"product"},[s("header",{staticClass:"g-header-container"},[s("ProductHeader",{ref:"productHeader",class:{"header-transition":t.isHeaderTransition}})],1),t._v(" "),s("BScroll",{ref:"scroll",attrs:{scrollbar:t.scrollbar}},[s("div",{staticClass:"product-wrapper"},[s("ProductSwiper",{attrs:{slidersArr:t.slidersArr}}),t._v(" "),s("ProductContent",{attrs:{contents:t.contents}})],1)]),t._v(" "),s("div",{staticClass:"g-backtop-container"},[s("BBacktop",{attrs:{visible:t.isBacktopVisible},on:{backtop:t.backToTop}})],1),t._v(" "),s("footer",{staticClass:"g-footer-container"},[s("ProductFooter")],1),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var E=s("VU/8")($,N,!1,function(t){s("Mver")},"data-v-1478cf32",null);e.default=E.exports},uqUo:function(t,e,s){var i=s("kM2E"),o=s("FeBl"),n=s("S82l");t.exports=function(t,e){var s=(o.Object||{})[t]||Object[t],r={};r[t]=e(s),i(i.S+i.F*n(function(){s(1)}),"Object",r)}},vfz8:function(t,e){},wef4:function(t,e,s){"use strict";var i={name:"BBacktop",props:{visible:{type:Boolean,default:!1}},methods:{backToTop:function(){this.$emit("backtop")}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"backtop"}},[e("a",{directives:[{name:"show",rawName:"v-show",value:this.visible,expression:"visible"}],staticClass:"backtop",attrs:{href:"javascript:;"},on:{click:this.backToTop}},[e("i",{staticClass:"iconfont icon-backtop"})])])},staticRenderFns:[]};var n=s("VU/8")(i,o,!1,function(t){s("MfKZ")},"data-v-0bdd2295",null);e.a=n.exports}});
//# sourceMappingURL=2.25394f84e0f7ffe79a7a.js.map
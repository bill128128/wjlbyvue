webpackJsonp([9],{"5kgN":function(t,e){},EiZN:function(t,e){},HoKc:function(t,e){},S9xs:function(t,e){},uqI3:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o("CWUh"),a=o("IchT"),i=o("Gu7T"),n=o.n(i),r=(o("Au9i"),{name:"allRecord",data:function(){return{list:[],info:{page:1,status:0},stype:"",allLoaded:!1,bottomStatus:"",loading:!1}},created:function(){this.loadMore()},beforeMount:function(){this.$indicator.open("数据加载中")},methods:{loadMore:function(){var t=this;console.log("111111111111111111111111111");var e=parseInt(window.localStorage.getItem("shopType"));this.stype=1==e?1:2==e?2:3,console.log("stype",this.stype),this.allLoaded=!0,console.log("获取数据的page",this.info.page),setTimeout(function(){t.$store.dispatch("conversionRecord/getConversionRecord",[t.info,t.stype]).then(function(){if(200==t.$store.state.conversionRecord.recordCode){t.$indicator.close();var e=t.$store.state.conversionRecord.recordList;e.length<=0?t.$toast({message:"没有更多数据"}):(t.list=[].concat(n()(t.list),n()(e)),t.info.page++),t.$refs.loadmore.onBottomLoaded(),t.allLoaded=!1}else t.$toast({message:t.$store.state.conversionRecord.recordMsg})}).catch(function(t){console.log("错误")})},1e3)},handleBottomChange:function(t){this.bottomStatus=t},sureDeliveryGoods:function(t){var e=this;this.$store.dispatch("conversionRecord/makeSureDeliveryGoods",t).then(function(){200==e.$store.state.conversionRecord.makeSureDeliveryGoodsCode?(e.$toast({message:e.$store.state.conversionRecord.makeSureDeliveryGoodsMsg}),e.getRecordList()):e.$toast({message:e.$store.state.conversionRecord.makeSureDeliveryGoodsMsg})}).catch(function(t){console.log("确认收货获取接口失败")})},gotoProductDetails:function(t){window.localStorage.setItem("pid",t),window.localStorage.setItem("ptype",this.stype),this.$router.push("/shop/productDetail")}}}),c={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticStyle:{overflow:"scroll"},attrs:{id:"allRecord"}},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[o("ul",{staticClass:"coversionRecordList"},t._l(t.list,function(e,s){return o("li",{key:s,staticClass:"coversionRecordItem",on:{click:function(o){t.gotoProductDetails(e.goods_id)}}},[o("div",{staticClass:"item1"},[o("span",{staticClass:"orderCount"},[t._v("订单号："+t._s(e.ordersn))]),t._v(" "),o("span",{staticClass:"status"},[t._v(t._s(e.delivery))])]),t._v(" "),o("div",{staticClass:"item2"},[o("img",{attrs:{src:e.goods_img,alt:""}}),t._v(" "),o("ul",{staticClass:"goodsList"},[o("li",{staticClass:"total"},[t._v("合计\n                                "),1==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e(),t._v(" "),1==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e()]:t._e(),t._v(" "),2==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(Number(e.total_price)+Number(e.total_score)))]),t._v(" "),o("b",[t._v("复购积分")])]):t._e()]:t._e()],2),t._v(" "),o("li",[t._v(t._s(e.goods_title))]),t._v(" "),o("li",[t._v("共"+t._s(e.goods_num)+"件商品 "),2==e.is_events?o("b",{staticStyle:{color:"#7a7acc","font-size":".32rem"}},[t._v("(寄卖商品)")]):t._e()])])]),t._v(" "),o("div",{staticClass:"item3"},[o("span",[t._v(t._s(e.order_info))]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:"待收货"==e.delivery,expression:"item.delivery == '待收货'"}],on:{click:function(o){t.sureDeliveryGoods(e.id)}}},[t._v("确认收货")])])])}))])],1)},staticRenderFns:[]};var l=o("VU/8")(r,c,!1,function(t){o("HoKc")},"data-v-ee7bbcf0",null).exports,d={data:function(){return{list:[],info:{page:1,status:1},stype:"",allLoaded:!1,loading:!1,bottomStatus:""}},created:function(){this.loadMore()},beforeMount:function(){this.$indicator.open("数据加载中")},methods:{loadMore:function(){var t=this,e=parseInt(window.localStorage.getItem("shopType"));this.stype=1==e?1:2==e?2:3,console.log("stype",this.stype),this.allLoaded=!0,console.log("请求数据了33333"),setTimeout(function(){t.$store.dispatch("conversionRecord/getConversionRecord",[t.info,t.stype]).then(function(){if(200==t.$store.state.conversionRecord.recordCode){t.$indicator.close();var e=t.$store.state.conversionRecord.recordList;e.length<=0?t.$toast({message:"没有更多数据"}):(t.list=[].concat(n()(t.list),n()(e)),t.info.page++),t.$refs.loadmore.onBottomLoaded(),t.allLoaded=!1}else t.$toast({message:t.$store.state.conversionRecord.recordMsg})}).catch(function(t){console.log("错误")})},1e3)},handleBottomChange:function(t){this.bottomStatus=t},gotoProductDetails:function(t){window.localStorage.setItem("pid",t),window.localStorage.setItem("ptype",this.stype),this.$router.push("/shop/productDetail")}}},v={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"sendGoodsRecord"}},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[o("ul",{staticClass:"coversionRecordList"},t._l(t.list,function(e,s){return o("li",{key:s,staticClass:"coversionRecordItem",on:{click:function(o){t.gotoProductDetails(e.goods_id)}}},[o("div",{staticClass:"item1"},[o("span",{staticClass:"orderCount"},[t._v("订单号："+t._s(e.ordersn))]),t._v(" "),o("span",{staticClass:"status"},[t._v(t._s(e.delivery))])]),t._v(" "),o("div",{staticClass:"item2"},[o("img",{attrs:{src:e.goods_img,alt:""}}),t._v(" "),o("ul",{staticClass:"goodsList"},[o("li",{staticClass:"total"},[t._v("合计\n                                "),1==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e(),t._v(" "),1==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e()]:t._e(),t._v(" "),2==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(Number(e.total_price)+Number(e.total_score)))]),t._v(" "),o("b",[t._v("复购积分")])]):t._e()]:t._e()],2),t._v(" "),o("li",[t._v(t._s(e.goods_title))]),t._v(" "),o("li",[t._v("共"+t._s(e.goods_num)+"件商品 "),2==e.is_events?o("b",{staticStyle:{color:"#7a7acc","font-size":".32rem"}},[t._v("(寄卖商品)")]):t._e()])])]),t._v(" "),o("div",{staticClass:"item3"},[o("span",[t._v(t._s(e.order_info)+" \n                        ")]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:"待收货"==e.delivery,expression:"item.delivery == '待收货'"}]},[t._v("确认收货")])])])}))])],1)},staticRenderFns:[]};var _=o("VU/8")(d,v,!1,function(t){o("EiZN")},"data-v-948fc95a",null).exports,u={data:function(){return{list:[],info:{page:1,status:2},stype:"",allLoaded:!1,loading:!1,bottomStatus:""}},created:function(){this.loadMore()},beforeMount:function(){this.$indicator.open("数据加载中")},methods:{loadMore:function(){var t=this,e=parseInt(window.localStorage.getItem("shopType"));this.stype=1==e?1:2==e?2:3,console.log("stype",this.stype),this.allLoaded=!0,console.log("请求数据了344444"),setTimeout(function(){t.$store.dispatch("conversionRecord/getConversionRecord",[t.info,t.stype]).then(function(){if(200==t.$store.state.conversionRecord.recordCode){t.$indicator.close();var e=t.$store.state.conversionRecord.recordList;e.length<=0?t.$toast({message:"没有更多数据"}):(t.list=[].concat(n()(t.list),n()(e)),t.info.page++),t.$refs.loadmore.onBottomLoaded(),t.allLoaded=!1}else t.$toast({message:t.$store.state.conversionRecord.recordMsg})}).catch(function(t){console.log("错误")})},1e3)},handleBottomChange:function(t){this.bottomStatus=t},sureDeliveryGoods:function(t){var e=this;this.$store.dispatch("conversionRecord/makeSureDeliveryGoods",t).then(function(){1==e.$store.state.conversionRecord.makeSureDeliveryGoodsCode?(e.$toast({message:e.$store.state.conversionRecord.makeSureDeliveryGoodsMsg}),e.list=[],e.getRecordList()):e.$toast({message:e.$store.state.conversionRecord.makeSureDeliveryGoodsMsg})}).catch(function(t){console.log("确认收货获取接口失败")})},gotoProductDetails:function(t){window.localStorage.setItem("pid",t),window.localStorage.setItem("ptype",this.stype),this.$router.push("/shop/productDetail")}}},p={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"waitGoodsRecord"}},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[o("ul",{staticClass:"coversionRecordList"},t._l(t.list,function(e,s){return o("li",{key:s,staticClass:"coversionRecordItem",on:{click:function(o){t.gotoProductDetails(e.goods_id)}}},[o("div",{staticClass:"item1"},[o("span",{staticClass:"orderCount"},[t._v("订单号："+t._s(e.ordersn))]),t._v(" "),o("span",{staticClass:"status"},[t._v(t._s(e.delivery))])]),t._v(" "),o("div",{staticClass:"item2"},[o("img",{attrs:{src:e.goods_img,alt:""}}),t._v(" "),o("ul",{staticClass:"goodsList"},[o("li",{staticClass:"total"},[t._v("合计\n                                "),1==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e(),t._v(" "),1==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e()]:t._e(),t._v(" "),2==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(Number(e.total_price)+Number(e.total_score)))]),t._v(" "),o("b",[t._v("复购积分")])]):t._e()]:t._e()],2),t._v(" "),o("li",[t._v(t._s(e.goods_title))]),t._v(" "),o("li",[t._v("共"+t._s(e.goods_num)+"件商品 "),2==e.is_events?o("b",{staticStyle:{color:"#7a7acc","font-size":".32rem"}},[t._v("(寄卖商品)")]):t._e()])])]),t._v(" "),o("div",{staticClass:"item3"},[o("span",[t._v(t._s(e.order_info)+" \n                        ")]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:"待收货"==e.delivery,expression:"item.delivery == '待收货'"}],on:{click:function(o){o.stopPropagation(),t.sureDeliveryGoods(e.id)}}},[t._v("确认收货")])])])}))])],1)},staticRenderFns:[]};var m=o("VU/8")(u,p,!1,function(t){o("5kgN")},"data-v-65cb9e9a",null).exports,g={data:function(){return{list:[],info:{page:1,status:3},stype:"",allLoaded:!1,bottomStatus:"",loading:!1}},created:function(){this.loadMore()},beforeMount:function(){this.$indicator.open("数据加载中")},methods:{loadMore:function(){var t=this,e=parseInt(window.localStorage.getItem("shopType"));this.stype=1==e?1:2==e?2:3,console.log("stype",this.stype),this.allLoaded=!0,console.log("请求数据了22222222222"),setTimeout(function(){t.$store.dispatch("conversionRecord/getConversionRecord",[t.info,t.stype]).then(function(){if(200==t.$store.state.conversionRecord.recordCode){t.$indicator.close();var e=t.$store.state.conversionRecord.recordList;e.length<=0?t.$toast({message:"没有更多数据"}):(t.list=[].concat(n()(t.list),n()(e)),t.info.page++),t.$refs.loadmore.onBottomLoaded(),t.allLoaded=!1}else t.$toast({message:t.$store.state.conversionRecord.recordMsg})}).catch(function(t){console.log("错误")})},1e3)},gotoProductDetails:function(t){window.localStorage.setItem("pid",t),window.localStorage.setItem("ptype",this.stype),this.$router.push("/shop/productDetail")}}},f={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"completeRecord"}},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1}},[o("ul",{staticClass:"coversionRecordList"},t._l(t.list,function(e,s){return o("li",{key:s,staticClass:"coversionRecordItem",on:{click:function(o){t.gotoProductDetails(e.goods_id)}}},[o("div",{staticClass:"item1"},[o("span",{staticClass:"orderCount"},[t._v("订单号："+t._s(e.ordersn))]),t._v(" "),o("span",{staticClass:"status"},[t._v(t._s(e.delivery))])]),t._v(" "),o("div",{staticClass:"item2"},[o("img",{attrs:{src:e.goods_img,alt:""}}),t._v(" "),o("ul",{staticClass:"goodsList"},[o("li",{staticClass:"total"},[t._v("合计\n                                "),1==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e(),t._v(" "),1==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(e.total_score))]),t._v(" "),o("b",[t._v("购物积分")])]):t._e()]:t._e(),t._v(" "),2==e.int_type?[2==t.stype?o("span",[o("span",[t._v(t._s(Number(e.total_price)+Number(e.total_score)))]),t._v(" "),o("b",[t._v("复购积分")])]):t._e()]:t._e()],2),t._v(" "),o("li",[t._v(t._s(e.goods_title))]),t._v(" "),o("li",[t._v("共"+t._s(e.goods_num)+"件商品 "),2==e.is_events?o("b",{staticStyle:{color:"#7a7acc","font-size":".32rem"}},[t._v("(寄卖商品)")]):t._e()])])]),t._v(" "),o("div",{staticClass:"item3"},[o("span",[t._v(t._s(e.order_info)+" \n                        ")]),t._v(" "),o("button",{directives:[{name:"show",rawName:"v-show",value:"待收货"==e.delivery,expression:"item.delivery == '待收货'"}]},[t._v("确认收货")])])])}))])],1)},staticRenderFns:[]};var h=o("VU/8")(g,f,!1,function(t){o("zZcw")},"data-v-6ae47cd3",null).exports,y={data:function(){return{title:"兑换记录",selectTab:["全部","待发货","待收货","已完成"],activeTab:0,tabView:"select1",pageindex:0}},components:{top:s.a,select1:l,select2:_,select3:m,select4:h,foot:a.a},created:function(){this.isOverdue()},methods:{isOverdue:function(){var t=this;this.$store.dispatch("isLogin/isLogin").then(function(){4e4==t.$store.state.isLogin.code&&(t.$toast({message:t.$store.state.isLogin.msg}),setInterval(function(){t.$router.push("/login")},2e3),window.localStorage.removeItem("date"))}).catch(function(t){console.log(t)})},chanageActiveTab:function(t){this.activeTab=t,this.tabView="select"+(t+1)}}},b={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"conversionRecord"}},[o("top",{attrs:{message:t.title}}),t._v(" "),o("div",{staticClass:"container"},[o("div",{staticClass:"select_box"},[o("ul",{staticClass:"select_list"},t._l(t.selectTab,function(e,s){return o("li",{key:s,class:{active:s==t.activeTab},on:{click:function(e){t.chanageActiveTab(s)}}},[t._v(t._s(e))])}))]),t._v(" "),o("keep-alive",[o(t.tabView,{tag:"component"})],1)],1),t._v(" "),o("foot",{attrs:{pageindex:t.pageindex}})],1)},staticRenderFns:[]};var $=o("VU/8")(y,b,!1,function(t){o("S9xs")},"data-v-d5ee0644",null);e.default=$.exports},zZcw:function(t,e){}});
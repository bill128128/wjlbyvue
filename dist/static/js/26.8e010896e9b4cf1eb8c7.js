webpackJsonp([26],{"/TZx":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAvCAYAAAAWymHTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNzU3OTcxNkMzRTAxMUU4QTg2MkVGQjNDNEM2NTUxMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNzU3OTcxN0MzRTAxMUU4QTg2MkVGQjNDNEM2NTUxMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY3NTc5NzE0QzNFMDExRThBODYyRUZCM0M0QzY1NTEyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3NTc5NzE1QzNFMDExRThBODYyRUZCM0M0QzY1NTEyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ejuTdgAAAUtJREFUeNq82L0OAUEUBeAhIqKgUlEq6SR6b+FZNN7FG6hEIRIajUQohUa3lZpknSWStdnZ+blnTHISOyv5zGbcmVkVx/EEeSAbpIUodkoJoJSqqE87ISMkUsRWRvap6x6yQlpMJBlOBznHv+3IfHTfD0Gh9EUwKNsRBMrrpEO6G1So6CYNMn1BBzWZiA7auUC2v0YEuTxbb8h1pnhBPvPeGfL9FztBkpqUQFcbSFphu8jNBDHWCyPEWscLIeaGQQuV3hKvdZE10k71LVSALdA4M5oHeyRDZIk0Un0z5ggGyD0zijlSZQF9JMoDWLOrEGAgRkCKWAESJA9YITVWFdYBddZ6klc6CgFXxAtwQbwBW0QE2CC68l1n7SCtllbprv7CAFzOJ96A7UlLBNicGcWA6fR7YABf5C/n+F1I4K/vVqbIE9mGAJL2EmAA29jVGS7nybMAAAAASUVORK5CYII="},MeoK:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("d06Y"),i=s.n(o),r=s("CWUh"),n=s("IchT"),a=(s("mtWM"),s("BEg3")),d={data:function(){return{pageindex:0,title:"确认订单",msgLength:0,msg:"",is_default:0,consignee:"",mobile:"",provinceid:0,cityid:0,districtid:0,address:{},pro:[],city:[],dis:[],info:{count:0,id:0,type:0,addressid:0,addressstr:"",proname:"",cityname:"",disname:"",addressdetail:"",self_lifting:1,or_number:0},prodetail:{},product:{},totalprice:0,totalscore:0,payCoverShow:!1,orderid:0,address_type:!0,getProInfo:"",fromType:"",isHaveAddress:1}},components:{top:r.a,foot:n.a},watch:{msg:function(e){/[^\d]/g.test(e)?this.msg=this.msg.replace(/[^\d]/g,""):this.msgLength=e.length}},created:function(){this.isOverdue(),this.info.count=window.localStorage.getItem("pcount"),this.info.id=window.localStorage.getItem("pid"),this.info.type=window.localStorage.getItem("ptype"),this.backMacksureOrder(),this.fromShoppingCart(),this.getaddresslist()},methods:{fromShoppingCart:function(){switch(window.localStorage.getItem("ptype")){case"1":this.getProInfo=JSON.parse(window.sessionStorage.getItem("retailShoppingProduct")),console.log(this.getProInfo);break;case"2":this.getProInfo=JSON.parse(window.sessionStorage.getItem("wholeShoppingProduct")),console.log(this.getProInfo);break;case"3":this.getProInfo=JSON.parse(window.sessionStorage.getItem("giftShoppingProduct")),console.log(this.getProInfo)}},isOverdue:function(){var e=this;this.$store.dispatch("isLogin/isLogin").then(function(){4e4==e.$store.state.isLogin.code&&(e.$toast({message:e.$store.state.isLogin.msg}),setInterval(function(){e.$router.push("/login")},2e3),window.localStorage.removeItem("date"))}).catch(function(e){console.log(e)})},showpassword:function(){console.log(this.msg)},showPayCover:function(){this.payCoverShow=!0},hidePayCover:function(){this.payCoverShow=!1},payframe:function(e){e.stopPropagation(),this.payCoverShow=!0},focus:function(){this.$refs.pwd.focus()},getaddresslist:function(){var e=this;this.$store.dispatch("defaddress/getdefaultaddress").then(function(){200==e.$store.state.defaddress.code?(e.address=e.$store.state.defaddress.address,e.provinceid=e.address.address.province,e.cityid=e.address.address.city,e.districtid=e.address.address.district,e.info.addressstr=e.address.address.address,e.mobile=e.address.address.mobile,e.consignee=e.address.address.consignee,e.info.addressid=e.address.address.id,e.is_default=e.address.is_default,e.info.proname=e.getproFromJson(),e.info.cityname=e.getcityFromJson(),e.info.disname=e.getdisFromJson(),e.info.addressdetail=e.info.proname+e.info.cityname+e.info.disname+e.info.addressstr,window.localStorage.setItem("addressid",e.info.addressid)):e.$toast({message:e.$store.state.defaddress.msg})}).catch(function(t){e.$toast({message:"您没有填写收货地址"}),e.isHaveAddress=0})},getproFromJson:function(){var e=this.provinceid.toString(),t=i.a.filter(function(t){return t.id==e});return this.pro=t[0].city,t[0].name},getcityFromJson:function(){var e=this.cityid.toString(),t=this.pro.filter(function(t){return t.id==e});return this.city=t[0].district,t[0].name},getdisFromJson:function(){var e=this.districtid.toString();return this.city.filter(function(t){return t.id==e})[0].name},goaddresslist:function(){window.sessionStorage.setItem("fromMakesureOrder","1"),this.$router.push("/shop/shippingAddressList")},orderConfirm:function(){var e=this;this.$store.dispatch("makesureOrder/getprodetail",this.info).then(function(){200==e.$store.state.makesureOrder.code?(e.prodetail=e.$store.state.makesureOrder.product,0==e.prodetail.address_type?e.address_type=!1:e.address_type=!0,e.getaddresslist(),e.product=e.$store.state.makesureOrder.prode,e.totalprice=parseFloat(e.product.price)*parseInt(e.info.count),e.totalscore=parseFloat(e.product.score)*parseInt(e.info.count)):e.$toast({message:e.$store.state.makesureOrder.msg})}).catch(function(e){console.log(e)})},doOrder:function(){var e=this;if(0==this.isHaveAddress)return this.$toast({message:"您没有填写收货地址"}),!1;console.log(this.info,this.getProInfo),this.$store.dispatch("shoppingCart/onlineBuy",[this.info,this.getProInfo]).then(function(){200==e.$store.state.shoppingCart.onlineBuy.code?(window.sessionStorage.removeItem("retailShoppingProduct"),window.sessionStorage.removeItem("shoppingCartRetail"),e.orderid=e.$store.state.makesureOrder.orderid,e.$toast({message:e.$store.state.shoppingCart.onlineBuy.msg}),setTimeout(function(){e.$router.replace("/")},1e3)):e.$toast({message:e.$store.state.shoppingCart.onlineBuy.msg})}).catch(function(e){console.log(e)})},doWholeOrder:function(){var e=this;this.$store.dispatch("shoppingCart/wholeOnlineBuy",[this.info,this.getProInfo]).then(function(){200==e.$store.state.shoppingCart.wholeOnlineBuy.code?(window.sessionStorage.removeItem("wholeShoppingProduct"),window.sessionStorage.removeItem("shoppingCartWhole"),e.$toast({message:e.$store.state.shoppingCart.wholeOnlineBuy.msg}),setTimeout(function(){e.$router.replace("/")},1e3)):e.$toast({message:e.$store.state.shoppingCart.wholeOnlineBuy.msg})}).catch(function(e){console.log(e)})},doGiftOrder:function(){var e=this;if(0==this.isHaveAddress)return this.$toast({message:"您没有填写收货地址"}),!1;this.$indicator.open("下单中");var t=window.localStorage.getItem("date");this.$axios.post(a.a+"/finance/Giftpay/PlaceOrder",{accessToken:t,id:this.getProInfo.pid,type:this.getProInfo.ptype,number:this.getProInfo.stringPnumber,address_id:this.info.addressid,strProvince:this.info.proname,strCity:this.info.cityname,strDistrict:this.info.disname,strTwon:this.info.addressstr,self_lifting:this.info.self_lifting,or_number:this.getProInfo.moduleCount}).then(function(t){e.$indicator.close(),console.log(t.data),200==t.data.code&&(window.sessionStorage.removeItem("shoppingCartGift"),window.sessionStorage.removeItem("giftShoppingProduct"),setTimeout(function(){e.$router.replace("/")},1e3)),e.$toast({message:t.data.msg})}).catch(function(e){console.log(e)})},payOrder:function(){var e=this;this.$store.dispatch("makesureOrder/payOrder",[this.orderid,this.msg]).then(function(t){200==e.$store.state.makesureOrder.paycode?(e.$toast({message:e.$store.state.makesureOrder.paymsg}),window.localStorage.setItem("orderid",e.orderid),setTimeout(function(){e.$router.push("/paySuccess")},2e3)):e.$toast({message:e.$store.state.makesureOrder.paymsg}),e.msg=""})},backMacksureOrder:function(){1==window.sessionStorage.getItem("fromShippingAddress")&&(this.address_type=!0)}}},c={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"makeSureOrder"}},[o("top",{attrs:{message:e.title}}),e._v(" "),o("div",{staticClass:"container"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!e.address_type,expression:"!address_type"}],staticClass:"info",staticStyle:{"text-align":"center","font-size":"0.37rem"},on:{click:e.goaddresslist}},[e._v("+ 添加收货地址")]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.address_type,expression:"address_type"}],staticClass:"info",on:{click:e.goaddresslist}},[o("div",{staticClass:"info_name"},[o("span",[e._v("收件人：")]),e._v(" "),o("span",[e._v(e._s(e.consignee))]),e._v(" "),o("span",[e._v(e._s(e.mobile))])]),e._v(" "),o("div",{staticClass:"address"},[o("span",[e._v("收货地址："+e._s(e.info.addressdetail))]),e._v(" "),o("img",{attrs:{src:s("/TZx"),alt:"more"}})])]),e._v(" "),o("div",{staticClass:"pay"},[1==this.getProInfo.ptype?[o("p",[o("b",[e._v("支付："+e._s(this.getProInfo.total)+"购物积分")])]),e._v(" "),o("button",{staticClass:"submit",on:{click:e.doOrder}},[e._v("确认")])]:e._e(),e._v(" "),2==this.getProInfo.ptype?[1==this.getProInfo.intType?o("p",[e._v("\n                        支付："+e._s(this.getProInfo.total/10*2)+"购物积分\n                    ")]):e._e(),e._v(" "),2==this.getProInfo.intType?o("p",[e._v("\n                        支付："+e._s(this.getProInfo.total/5*2)+"复购积分\n                    ")]):e._e(),e._v(" "),o("button",{staticClass:"submit",on:{click:e.doWholeOrder}},[e._v("确认")])]:e._e(),e._v(" "),3==this.getProInfo.ptype?[o("p",[o("b",[e._v("支付："+e._s(this.getProInfo.total)+"礼品积分")])]),e._v(" "),o("button",{staticClass:"submit",on:{click:e.doGiftOrder}},[e._v("确认支付")])]:e._e()],2)]),e._v(" "),o("transition",{attrs:{name:"fade"}}),e._v(" "),o("foot",{attrs:{pageindex:e.pageindex}})],1)},staticRenderFns:[]};var g=s("VU/8")(d,c,!1,function(e){s("PWyO")},"data-v-7aa81392",null);t.default=g.exports},PWyO:function(e,t){}});
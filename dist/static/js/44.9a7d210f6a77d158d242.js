webpackJsonp([44],{BVQe:function(t,e){},VGME:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("Au9i");var a=s("CWUh"),n=s("IchT"),i={name:"myCard",data:function(){return{title:"我的银行卡",pageIndex:2,bankList:[]}},components:{top:a.a,foot:n.a},created:function(){this.isOverdue(),this.getBankList()},methods:{isOverdue:function(){var t=this;this.$store.dispatch("isLogin/isLogin").then(function(){4e4==t.$store.state.isLogin.code&&(t.$toast({message:t.$store.state.isLogin.msg}),setInterval(function(){t.$router.push("/login")},2e3),window.localStorage.removeItem("date"))}).catch(function(t){console.log(t)})},getBankList:function(){var t=this;this.$store.dispatch("myCard/getBankList").then(function(){200==t.$store.state.myCard.code?t.bankList=t.$store.state.myCard.list:t.$toast({message:t.$store.state.myCard.msg})}).catch(function(t){console.log(t)})},deleteSection:function(t){var e=this;this.$store.dispatch("myCard/removeCard",t).then(function(){1==e.$store.state.myCard.delcode?(e.$toast({message:e.$store.state.myCard.delmsg}),e.getBankList()):e.$toast({message:e.$store.state.myCard.delmsg})}).catch(function(t){console.log(t)})},addBankCard:function(){this.$router.push("/addCard")}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"myCard"}},[s("top",{attrs:{message:t.title}}),t._v(" "),s("div",{staticClass:"container"},[s("ul",{staticClass:"cardList"},t._l(t.bankList,function(e,a){return s("li",{key:a},[s("mt-cell-swipe",{attrs:{right:[{content:"删除",style:{background:"#596487",color:"#fff",width:"2rem",textAlign:"center",fontSize:"0.43rem",lineHeight:"2.88rem"},handler:function(){return t.deleteSection(e.id)}}]}},[s("div",{staticClass:"con"},[s("div",{staticClass:"cardTitle"},[t._v(t._s(e.bank_name))]),t._v(" "),s("p",[t._v(t._s(e.bank_card))])])])],1)})),t._v(" "),s("div",{staticClass:"btn",on:{click:t.addBankCard}},[t._v("+添加银行卡")])]),t._v(" "),s("foot",{attrs:{pageindex:t.pageIndex}})],1)},staticRenderFns:[]};var r=s("VU/8")(i,o,!1,function(t){s("BVQe")},"data-v-9f237952",null);e.default=r.exports}});
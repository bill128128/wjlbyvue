webpackJsonp([39],{"6NQZ":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o("Au9i");var s=o("CWUh"),a=(o("IchT"),{name:"conversionDetai",data:function(){return{title:"互转积分明细",pageList:[],allLoaded:!1,pageVal:0,pnum:9,pageindex:0}},components:{top:s.a,indexApp:indexApp},mounted:function(){this.loadPageList()},created:function(){this.isOverdue()},methods:{isOverdue:function(){var t=this;this.$store.dispatch("isLogin/isLogin").then(function(){4e4==t.$store.state.isLogin.code&&(t.$toast({message:t.$store.state.isLogin.msg}),setInterval(function(){t.$router.push("/login")},2e3),window.localStorage.removeItem("date"))}).catch(function(t){console.log(t)})},loadBottom:function(){this.loadPageList(),this.allLoaded=!0,this.$refs.loadmore.onBottomLoaded()},loadPageList:function(){for(var t=1,e=[];t<this.pnum;t++)e.push(t);this.pnum+=8,this.pageList=this.pageList.concat(e)},goback:function(){this.$router.go(-1)}}}),i={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"conversionDetai"}},[o("top",{attrs:{message:t.title,notes:t.notes}}),t._v(" "),o("div",{staticClass:"container"},[o("mt-loadmore",{ref:"loadmore",attrs:{"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded,"auto-fill":!1,bottomDistance:"180"}},[o("ul",{staticClass:"list"},t._l(t.pageList,function(e){return o("li",[o("div",{staticClass:"left"},[o("div",{staticClass:"name"},[o("span",[t._v(t._s(e))]),t._v("("+t._s(e)+")")]),t._v(" "),o("div",{staticClass:"time"},[t._v("2018.09.30")])]),t._v(" "),o("div",{staticClass:"count"},[t._v(t._s(e))])])}))])],1),t._v(" "),o("foot",{attrs:{pageindex:t.pageindex}})],1)},staticRenderFns:[]};var n=o("VU/8")(a,i,!1,function(t){o("Mvqh")},"data-v-bc304d48",null);e.default=n.exports},Mvqh:function(t,e){}});
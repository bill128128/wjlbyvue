webpackJsonp([71],{BSMi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("CWUh"),o=a("IchT"),i=(a("Au9i"),{name:"addpartnerList",data:function(){return{title:"添加伙伴记录",allLoaded:!1,pagesize:1,list:[],pageindex:0,pageval:5,bottomDistance:150}},created:function(){this.isOverdue(),this.gopartnerlist()},components:{top:s.a,foot:o.a},methods:{loadBottom:function(){this.pagesize++,this.gopartnerlist(),this.$refs.loadmore.onBottomLoaded()},loadTop:function(){this.pagesize--,this.pagesize<=1&&(this.pagesize=1,this.allLoaded=!0),this.gopartnerlist(),this.$refs.loadmore.onTopLoaded()},gopartnerlist:function(){var t=this;this.$store.dispatch("addpartner/goPartnerList",this.pagesize).then(function(){200==t.$store.state.addpartner.listcode?(t.allLoaded=!1,t.pageval==t.$store.state.addpartner.partnerlist.length?t.list=t.$store.state.addpartner.partnerlist:(t.list=t.$store.state.addpartner.partnerlist,t.allLoaded=!0)):t.$toast({message:t.$store.state.addpartner.addpartnermsg})}).catch(function(t){alert("输入错误")})},isOverdue:function(){var t=this;this.$store.dispatch("isLogin/isLogin").then(function(){4e4==t.$store.state.isLogin.code&&(t.$toast({message:t.$store.state.isLogin.msg}),setInterval(function(){t.$router.push("/login")},2e3),window.localStorage.removeItem("date"))}).catch(function(t){console.log(t)})}}}),n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"addpartnerList"}},[a("top",{attrs:{message:t.title}}),t._v(" "),a("mt-loadmore",{ref:"loadmore",staticClass:"container",attrs:{"top-method":t.loadTop,"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded,"auto-fill":!1,bottomDistance:t.bottomDistance}},[a("ul",t._l(t.list,function(e,s){return a("li",{key:s},[a("span",{staticClass:"user"},[t._v(t._s(e.username))]),t._v(" "),a("span",{staticClass:"time"},[t._v(t._s(e.time))])])}))]),t._v(" "),a("foot",{attrs:{pageindex:t.pageindex}})],1)},staticRenderFns:[]};var r=a("VU/8")(i,n,!1,function(t){a("XDvj")},"data-v-2dbef894",null);e.default=r.exports},XDvj:function(t,e){}});
webpackJsonp([40],{"J7/+":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("Gu7T"),o=e.n(s),n=(e("Au9i"),e("CWUh")),a=e("IchT"),c={name:"noticeList",components:{top:n.a,foot:a.a},data:function(){return{title:"新闻列表",page:1,list:[],allLoaded:!1,pageindex:0,pageval:10,bottomDistance:150,loading:!0}},created:function(){this.noticelists()},methods:{loadBottom:function(){this.loading=!0,this.info.page++,this.getProductList(this.info)},noticelists:function(){var t=this;this.$store.dispatch("home/noticeList",this.page).then(function(){200==t.$store.state.home.noticelistcode?t.pageval==t.$store.state.home.noticelist.length?(t.loading=!1,t.list=[].concat(o()(t.list),o()(t.$store.state.home.noticelist))):0==t.$store.state.home.noticelist.length?t.loading=!0:(t.list=[].concat(o()(t.list),o()(t.$store.state.home.noticelist)),t.loading=!0):t.$toast({message:t.$store.state.home.noticelistmsg})}).catch(function(t){alert(t)})},goToNotice:function(t){this.$router.push({name:"notice",params:{id:t.id}}),window.localStorage.setItem("noticeid",t.id)},gotoSrc:function(t){this.$router.push(t)},checkgologin:function(t){var i=window.localStorage.getItem("date");null==i||"undefined"==i?(this.$toast({message:"请先登录"}),this.$router.push("/login")):this.$router.push(t)}}},l={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{attrs:{id:"noticeList"}},[s("top",{attrs:{message:t.title}}),t._v(" "),s("div",{staticClass:"container"},[s("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadBottom,expression:"loadBottom"}],staticClass:"newlist",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"0"}},t._l(t.list,function(i,e){return s("li",{key:e,on:{click:function(e){t.goToNotice(i)}}},[s("p",{staticClass:"p1"},[t._v("\n\t\t\t\t\t\t"+t._s(i.title)+"\n\t\t\t\t\t")]),t._v(" "),s("p",{staticClass:"p1",domProps:{innerHTML:t._s(i.description)}},[t._v(t._s(i.description))]),t._v(" "),s("p",{staticClass:"p1"},[s("span",[t._v(t._s(i.create_time))])])])}))]),t._v(" "),s("footer",{staticClass:"w100"},[s("ul",{staticClass:"footer_list"},[s("li",{staticClass:"active",on:{click:function(i){t.gotoSrc("/")}}},[s("img",{attrs:{src:e("cuRM")}}),t._v(" "),s("h4",[t._v("首页")])])])])],1)},staticRenderFns:[]};var r=e("VU/8")(c,l,!1,function(t){e("d2nj")},"data-v-b241567a",null);i.default=r.exports},d2nj:function(t,i){}});
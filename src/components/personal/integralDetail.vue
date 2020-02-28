<template>
	<div id="integralDetail">
		<top :message="title" :notes="notes"></top>
	    <div class="container">
	    	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"  bottomDistance=180>
				<ul class="list">
					<li v-for="num in pageList">
						<div class="left">
							<div class="name"><span>{{num}}</span>({{num}})</div>
							<div class="time">2018.09.30</div>
						</div>
						<div class="count">{{num}}</div>
					</li>
				</ul>
			</mt-loadmore>	
	    </div>		    
	    <indexApp></indexApp>
	</div>
</template>
<script>
  import {Loadmore} from 'mint-ui';
  import top from '../common/top'
  import indexApp from "../common/index"
  export default {
  	name:"integralDetail",
    data:function() {
      return {
      	title:'注册积分明细',
        pageList:[],
        allLoaded: false,
		pageVal: 0,
		pnum : 9,
      }
    },
    components:{
    	top,indexApp
    },
    mounted:function(){
        this.isOverdue();
        this.loadPageList();  //初次访问查询列表
    },
    methods:{
        isOverdue(){  //判断是否过期
            this.$store.dispatch('isLogin/isLogin').then(()=>{
                if(this.$store.state.isLogin.code == 40000){
                    this.$toast({
                        message:this.$store.state.isLogin.msg,
                    });
                    setInterval(() => {
                        this.$router.push("/login");
                    },2000)
                    window.localStorage.removeItem("date");
                }
            }).catch((e)=>{
                console.log(e);
            })
        },
        loadBottom: function(){
        	//this.pageVal++;   
        	this.loadPageList();
        	this.allLoaded = true;
            this.$refs.loadmore.onBottomLoaded();
            //this.loadPageList();
            //this.more();
        },
        loadPageList: function(){
            var i = 1,list0 = [];
            for(i ; i < this.pnum;i ++){
                list0.push(i);
            }          
            this.pnum+=8;
            this.pageList =  this.pageList.concat(list0);
        },
    },
} 
</script>
<style scoped>
	@import url("../../../static/css/common.css");
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
</style>
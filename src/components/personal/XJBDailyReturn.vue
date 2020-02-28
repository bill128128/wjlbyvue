<template>
    <!-- 掌聚宝每日返还 -->
    <div id="XJBDailyReturn">
    	<top :message='title'/>
        <div class="container">
        	<main class="main_available">
	            <div class="item">
	                <div class="count">{{member_score}}</div>
	                <h3>当前掌聚宝总数</h3>
	            </div>
	            <div class="item">
	                <div class="count">{{bill_sum}}</div>
	                <h3>返还总额</h3>
	            </div>
	        </main>
	        <main>
	        	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
	        		
	            <ul class="list">
	                <li style="margin-top:0.27rem;" v-for="(item,index) in list" :key="index">
	                    <div class="left">
	                        <div class="name"><span>{{item.al_be_release_score}}</span></div>
	                         <div class="time">{{item.time}}</div>
	                    </div>
	                    <div class="count">{{item.this_amount}}</div>
	                </li>
	            </ul>
	            </mt-loadmore>
	        </main>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
	import top from '../common/top'
    import foot from '../common/index'
	import { Loadmore } from 'mint-ui';
	export default{
		name:'XJBDailyReturn',
		data(){
			return{
				title:'可提现掌聚宝每日返还明细',
				list:[],
				member_score:'',
				bill_sum:'',
				page:1,
				pageval:5,
				allLoaded:false,//是否加载完毕
				bottomDistance:150,
				pageindex:2,
			}
		},
		components:{
			top,foot,
		},
		created(){
			this.isOverdue();
			this.getlist();
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
			 	this.page ++;
			 	this.getlist();			 	
				this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadTop: function(){
            	this.page --;
            	if(this.page<=1){
            		this.page = 1;
            		this.allLoaded = true;
            	}
            	this.getlist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
			getlist(){
				this.$store.dispatch('XJBDailyReturn/dailyreturn',this.page).then(()=>{
					if(this.$store.state.XJBDailyReturn.code == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.XJBDailyReturn.list.length){
							this.list = this.$store.state.XJBDailyReturn.list;
						}else{
							this.list = this.$store.state.XJBDailyReturn.list;
							this.allLoaded = true;
						}						
						//this.list = this.list.concat(this.$store.state.ZJBDailyReturn.list);
						this.member_score = this.$store.state.XJBDailyReturn.member_score;
						this.bill_sum = this.$store.state.XJBDailyReturn.bill_sum;
					}else{
						this.$toast({
							message:this.$store.state.XJBDailyReturn.msg,
						});
					}
				}).catch((e) => {              
					  //alert(e);
				});
			},
			
		}
	}
</script>
<style scoped>
	@import url("../../../static/css/common.css");
	.main_available{height:3.6rem;position: relative;}
    .main_available .item{  width:50%  }
    .main_available .item:first-child .count{color:#fff;}
    .agent_detail{
        width: 2.14rem;
	    height: 0.75rem;
	    background-color: #ffbb33;
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        position: absolute;
        top:65%;
        left:50%;
        margin-left:-1.07rem;
        border:0;
        outline:0;
        font-size:0.37rem;
        color:#fff;
    }
    .list_title{
        font-size:0.37rem;
        color:#fff;
    }
    .list_title span{
    	color: #7a7acc;
    	float: right;
    }
    .list_title span img{
    	width: .53rem;
    	height: .52rem;
    	margin-left: .3rem;
    	margin-right: .2rem;
    }
</style>

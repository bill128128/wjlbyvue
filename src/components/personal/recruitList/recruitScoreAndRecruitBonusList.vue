<template>
	<div id="recruitScoreAndRecruitBonusList">
		<div class="content">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
				<ul class="list">
					<li class="li" v-for="(item,index) in list" :key="index">
						<ul class="ul1">
							<li>
								<p class="p1">{{item.total}}</p>
								<p class="p3">租赁积分</p>
							</li>
							<li>
								<p class="p1">{{item.money}}</p>
								<p class="p3">招募积分支出</p>
							</li>
							<li>
								<p class="p1">{{item.integral}}</p>
								<p class="p3">红利支出</p>
							</li>
						</ul>
						<ul class="ul2">						
							<li>{{item.create_time}}</li>
						</ul>
					</li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	export default{
		name:'recruitScoreAndRecruitBonusList',
		data(){
			return{
				list:[
				],//接收数组
				allLoaded:false,
				pagesize:1,
				type:2,
				bottomDistance:150,
			}
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
			 	this.pagesize ++;
			 	this.getlist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
            loadTop: function(){
            	this.pagesize --;
            	if(this.pagesize<=1){
            		this.pagesize = 1;
            		this.allLoaded = true;
            	}
            	this.getlist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
            getlist(){
            	this.$store.dispatch('recruitList/getRecruitList',this.type).then(()=>{
					if(this.$store.state.recruitList.recruitListcode == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.recruitList.frozenScoreBill.length){
							this.list = this.$store.state.recruitList.frozenScoreBill;
						}else{
							this.list = this.$store.state.recruitList.frozenScoreBill;
							this.allLoaded = true;
						}
						
					}else{
						this.$toast({
							message:this.$store.state.recruitList.recruitListmsg,
						});
					}
				}).catch((e) => {              
						alert(输入错误);
					});  
            }
		},
	}
</script>

<style scoped>
	.content{
		width: 9.2rem;
		margin: 0 auto;
		overflow-y: scroll;
	}
	.content .list{
		display: flex;
		height: auto;
		width: 9.2rem;
		margin: 0 auto;
		flex-wrap: wrap;
		margin-top: .5rem;
	}
	.content .list .li{
		width: 9.2rem;
		height: 3.47rem;
		background-image: linear-gradient(-90deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin-bottom: .3rem;
		padding: .4rem;
	}
	.content .list .li .ul1{
		height: 1.8rem;
		border-bottom:1px solid #657299 ;
		display: flex;
	}
	.content .list .li .ul1 li{
		height: 1.8rem;
		text-align: center;
		width: 50%;
	}
	.content .list .li .ul1 li .p1{
		font-size: 0.47rem;
		color: #ffbb33;
		padding-bottom: .2rem;
	}
	.content .list .li .ul1 li .p3{
		font-size: 0.32rem;
		color: #000;
	}
	.content .list .li .ul2{
		padding-top: .08rem;
		height: .8rem;
		display: flex;
	}
	.content .list .li .ul2 li{
		width: 100%;
		height: 0.8rem;
		font-size: 0.32rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.8rem;
		letter-spacing: 0rem;
		color: #99a3bf;
		text-align: right;
	}
</style>
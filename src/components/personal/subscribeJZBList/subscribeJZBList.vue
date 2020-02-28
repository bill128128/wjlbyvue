<template>
	<div id="subscribeJZBList">
		<top :message="title"></top>
		<div class="content">
			<div class="box">
				<p class="p1">{{this.$store.state.subscribeJZBList.subscribeJZBListrelease_score}}</p>
				<p class="p2">可提现掌聚宝总额</p>
			</div>
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul class="list">
					<li class="li" v-for="(item,index) in bill" :key="index">
						<ul class="ul1">
							<li>
								<p class="p1">{{item.quantity}}</p>
								<p class="p3">认购提现掌聚宝</p>
							</li>
							<li>
								<p class="p2">{{item.member_money}}</p>
								<p class="p3">{{item.type_title}}</p>
							</li>
						</ul>
						<ul class="ul2">
							<li>认购类型：{{item.is_upgrade}}</li>
							<li>{{item.create_time}}</li>
						</ul>
					</li>				
				</ul>
			</mt-loadmore>
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../../common/top'
	import foot from '../../common/index'
	import { Loadmore } from 'mint-ui';
	export default{
		name:'subscribeJZBList',
		components:{
			top,foot
		},
		data(){
			return{
				title:'认购明细',
				page:1,//当前页数
				bill:[],//接收数组
				allLoaded:false,
				pageindex:0,
				pageval : 10,
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
			 	this.page ++;
			 	this.getlist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
			getlist(){
				this.$store.dispatch('subscribeJZBList/getsubscribeJZBListDetail',this.page).then(()=>{
					if(this.$store.state.subscribeJZBList.subscribeJZBListcode == 200){
						if(this.pageval == this.$store.state.subscribeJZBList.subscribeJZBListbill.length){
							this.bill = this.bill.concat(this.$store.state.subscribeJZBList.subscribeJZBListbill);
						}else{
							this.bill = this.bill.concat(this.$store.state.subscribeJZBList.subscribeJZBListbill);
							this.allLoaded = true;
						}
						
					}else{
						this.$toast({
							message:this.$store.state.subscribeJZBList.subscribeJZBListmsg,
						});
					}
				}).catch((e) => {              
						alert(输入错误);
					});  
			},
		}
	}
</script>

<style scoped>
	.content{
		width: 9.2rem;
		margin: 0 auto;
		position: relative;
		top: 1.4rem;
		overflow-y: scroll;
	}
	/*个人信息*/
	.content .box{
		width: 9.2rem;
		height: 3.33rem;
		background: url('../../../../static/img/subscribeJZB_bg.png') no-repeat;
		background-size: cover;
		border-radius: 0.13rem;
		margin-top:0.4rem;
	}
	.content .box .p1{
		text-align: center;
		color: #ffbb33;
		font-size: .64rem;
		padding-top: .8rem;
		font-weight: bold;
	}
	.content .box .p2{
		text-align: center;
		color: #fff;
		font-size: .32rem;
		padding-top: .2rem;
	}
	.content .list{
		display: flex;
		height: auto;
		width: 9.2rem;
		margin: 0 auto;
		flex-wrap: wrap;
		margin: .4rem 0 1rem;
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
		font-size: 0.64rem;
		color: #ffbb33;
		padding-bottom: .2rem;
	}
	.content .list .li .ul1 li .p2{
		font-size: 0.64rem;
		color: #fff;
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
		width: 50%;
		height: 0.8rem;
		font-size: 0.32rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.8rem;
		letter-spacing: 0rem;
		color: #99a3bf;
		text-align: center;
	}
</style>
// 直推奖明细
<template>
	<div id="directPrize">
		<top :message="title"></top>
		<div class="container">
			<main>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
					<ul class="list">
						<li v-for="(item,index) in list" :key="index">
							<div class="left">
								<div class="name"><span>{{item.username}}</span>(用户)</div>
								<div class="time">{{item.create_time}}</div>
							</div>
							<div class="count">
								<div>
									{{item.sum}}
									<span>(总计奖励)</span>
								</div>
								<div>
									<div class="button"  @click="goToDetail(item)">详情</div>
								</div>								
							</div>							
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
		name:'directPrize',
		components:{
	    	top,foot
	    },
		data(){
			return{
				title:'直推奖明细',
				info:{
					page:1,//分页数
				},
				list:[],
				allLoaded:false,//是否加载完毕
				pageindex:2,
				pageval:5,
				bottomDistance:150,
			}
		},
		created(){
			this.isOverdue();
			this.getin();
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
			goToDetail(item){ //跳转页面
				this.$router.push({name:'directPrizeList',params:{member_id:item.member_id}});
				window.localStorage.setItem('ztjid',item.member_id);
			},
			loadBottom(){
			 	this.info.page ++;
			 	this.getin();			 	
			 	this.$refs.loadmore.onBottomLoaded();
			},
			loadTop: function(){
            	this.info.page --;
            	if(this.info.page<=1){
            		this.info.page = 1;
            		this.allLoaded = true;
            	}
            	this.getin();           	
            	this.$refs.loadmore.onTopLoaded();
            },
			getin(){
				this.$store.dispatch('directPrizeList/getDirectPrizeList',this.info.page).then(() => {
					if(this.$store.state.directPrizeList.code == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.directPrizeList.rewardList.length){
							this.list = this.$store.state.directPrizeList.rewardList;
						}else{
							this.list = this.$store.state.directPrizeList.rewardList;
							this.allLoaded = true;
						}
						//this.list = this.list.concat(this.$store.state.directPrizeList.rewardList);
					}else{
						this.$toast({
							messatge:this.$store.state.directPrizeList.msg
						})
					}

				}).catch((e)=> {
					//alert("error")
				})
			}
		}
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
    .button{
    	width: 1.33rem !important;
		height: 0.64rem;
		background-color: #ffbb33;
		border-radius: 0.08rem;
		color: #FFF;
		font-size: .32rem;
		line-height: .64rem;
		text-align: center;
		margin-top: .2rem;
		float: right;
    }
    .count{
    	display: flex;
    	flex-wrap: wrap;
    	justify-content: flex-end;
    	text-align: right;
    }
    .count div{
    	width: 100%;
    	
    }
    .count span{
    	color: #000;
    	font-size: .32rem;
    	padding-left: .2rem;
    }
</style>
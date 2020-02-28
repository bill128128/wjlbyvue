<template>
	<div id="myPartner">
		<top :message='title'></top>
		<div class="container">
			<main class="main_available">
                <div class="item">
                    <div class="count1">{{partner}}</div>
                    <h3>合伙人总数</h3>
                </div>
                <div class="item">
                    <div class="count1">{{member_sum}}</div>
                    <h3>直推人总数</h3>
                </div>
                <div class="item">
                    <div class="count">{{profit}}</div>
                    <h3>累计奖励</h3>
                </div>
            </main>
            
            <main>
            	<ul class="list">
					<router-link to="/directPrize">
						<li>
							<div class="left">
								<div class="name">{{reward_sum_money}}<span>(直推奖)</span></div>
							</div>
							<div class="count"><img src="../../../static/img/right.png"></div>
						</li>
					</router-link>
            		<li @click="goToSrc('/managementAwardList')">
            			<div class="left">
            				<div class="name">{{share_profit}}<span>(管理奖)</span></div>
            			</div>
            			<div class="count"><img src="../../../static/img/right.png"></div>
            		</li>
            		<li @click="goToSrc('/agentRewardList')">
            			<div class="left">
            				<div class="name">{{agency_profit}}<span>(代理奖)</span></div>
            			</div>
            			<div class="count"><img src="../../../static/img/right.png"></div>
            		</li>
            	</ul>
            </main>
            
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../common/top'
	import foot from '../common/index'
	export default{
		name:'myPartner',
		components:{
			top,foot
		},
		data(){
			return{
				title:'我的伙伴',	
				pageindex:2,
			}
		},
		computed:{
			partner(){
				return this.$store.state.mypartner.partner;
			},
			member_sum(){
				return this.$store.state.mypartner.member_sum;
			},
			profit(){
				return this.$store.state.mypartner.profit;
			},
			reward_sum_money(){
				return this.$store.state.mypartner.reward_sum_money;
			},
			share_profit(){
				return this.$store.state.mypartner.share_profit;
			},
			agency_profit(){
				return this.$store.state.mypartner.agency_profit;
			},
		},
		created(){
			this.isOverdue();
			this.$store.dispatch('mypartner/getMyPartner').then(()=>{
				if(this.$store.state.mypartner.mypartnercode==200){
					// this.$toast({
					// 	message:this.$store.state.mypartner.mypartnermsg,
					// });
				}
			}).catch((e) => {              
					//alert(输入错误);
				});
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
			goToSrc(src){
				this.$router.push(src);
			}
		}
	}
</script>

<style scoped>
	@import url("../../../static/css/common");
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
    .name{
        color: #ffbb33 !important;
        font-size: 0.48rem !important;
    }
    .name span{
    	color: #000 !important;
    	font-size: .32rem !important;
    	padding-left: .2rem;
    }
    .count img{
    	width: .2rem;
    	height: .37rem;
    }
    .main_available .item{
        width:33.33%;
    } 
</style>
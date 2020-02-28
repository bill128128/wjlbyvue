<template>
	<div id="myCard">
		<top :message="title"></top>
		<div class="container">
			<ul class="cardList">
				<li v-for="(item,index) in bankList" :key="index">
					<mt-cell-swipe   
						:right="[      
							{       
								content: '删除',       
								style: { background: '#596487', color: '#fff', width:'2rem',textAlign:'center',fontSize:'0.43rem',lineHeight:'2.88rem'},       
								handler: () => deleteSection(item.id)      
							}     
						]">
						<div class="con">
							<div class="cardTitle">{{item.bank_name}}</div>
							<p>{{item.bank_card}}</p>
						</div>						
					</mt-cell-swipe>  
				</li>
				
			</ul>
			<div class="btn" @click="addBankCard">+添加银行卡</div>
		</div>
		<foot :pageindex="pageIndex"></foot>
	</div>
</template>

<script>
	import { CellSwipe } from 'mint-ui'
	import top from '../../common/top'
	import foot from '../../common/index'
	export default{
		name:'myCard',
		data(){
			return{
				title:'我的银行卡',
				pageIndex:2,
				bankList:[],
			}
		},
		components:{
			top,foot,
		},
		created(){
			this.isOverdue();
			this.getBankList();
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
			getBankList(){
				this.$store.dispatch('myCard/getBankList').then(()=>{
					if(this.$store.state.myCard.code == 200){
						this.bankList = this.$store.state.myCard.list;
					}else{
						this.$toast({
							message:this.$store.state.myCard.msg,
						})
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			deleteSection(id){
				this.$store.dispatch('myCard/removeCard',id).then(()=>{
					if(this.$store.state.myCard.delcode == 1){
						this.$toast({
							message:this.$store.state.myCard.delmsg,
						});
						this.getBankList();
					}else{
						this.$toast({
							message:this.$store.state.myCard.delmsg,
						})
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			addBankCard(){
				this.$router.push('/addCard');
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../../../../static/css/common.css");
	.container{
		padding: 0.6rem;
		
	}
	.mint-cell{width:100%; height: 100%;
		background: transparent;
	}
	.mint-cell-wrapper{
		    background-size: 120% 0px;
	}
	.mint-cell-value{width:100%; height: 100%;}
	.cardList{
		width: 100%;
		margin-bottom: 1rem;
		li{
			background: url(../../../../static/img/cardbg.png) no-repeat center;
			background-size: cover;
			width: 100%;
			height: 3rem;
			box-shadow: 0rem 0rem 1rem 0rem 
				rgba(31, 31, 51, 0.2);
			border-radius: 0.13rem;
			margin-bottom: 0.5rem;
			.con{
				width:8rem;
				height: 3rem;
				padding: 0.8rem 0.6rem 0.8rem 0.5rem;
				.cardTitle{
					color: #ffbb33;
					font-size: 0.37rem;
				}
				p{
					color: #fff;
					font-size: 0.5rem;
					line-height: 1rem;
					padding: 0.5rem 0 0 0.5rem;
				}
			}
			
		}
	}
	.btn{
		width: 5rem;
		height: 1rem;
		margin: 0 auto;
		background-color: #ffbb33;
		color: #fff;
		font-size: 0.4rem;
		text-align: center;
		line-height: 1rem;
		border-radius: 0.13rem;
	}
</style>
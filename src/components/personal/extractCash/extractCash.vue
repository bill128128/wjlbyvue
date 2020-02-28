<template>
	<div id="extractCash">
		<top :message="title" :notes='notes'></top>
		<div class="container">
			<div class="extract">
				<!-- <div class="total">
					当前可提现现金宝余额为：<span>{{cashInfo.money_score}}</span>
				</div> -->
				<!-- <div class="selectType">
					<label>
						<input name="extractWay" type='radio' value='1' v-model="cash.type">转到银行卡
					</label>
					<label>
						<input name="extractWay" type='radio' value='2' v-model="cash.type">转购物积分
					</label>
				</div> -->
				<div class="total">
					当前可提现佣金积分为：<span>{{cashInfo.money_score}}</span>
				</div>
				<div class="money" style='margin-bottom:1rem'>金额:
					<input v-model="cash.count" type="number" placeholder="请输入提现金额" />
				</div>
				<!-- <div class="tips">提现金额为100的整数倍</div> -->
				<!-- <div class="bank">
					<p>到账银行卡：{{cashInfo.user_card.bank_name}}{{cashInfo.user_card.bank_card}}</p>
					<span><img src="../../../../static/img/more_b.png"></span>
				</div> -->
				<router-link to='/myCard'>
					<div class='addCard' v-if='this.showBank == 0'>+添加银行卡</div>
				</router-link>
				<template v-if='this.cash.type == 1'>
					<div class="selected select_count" v-if="this.showBank == 1" v-show="!isShowSlectWayMenu">
						<div class="placeholder" @click="showSelectMenu"><span>到账银行卡：{{bankname}}({{bankcard | formatBankCard}})</span></div>
							<span class="icon"><img src="../../../../static/img/down.png" alt="icon" v-show="!isShowSelectMenu"/></span>
							<span class="icon"><img src="../../../../static/img/up.png" alt="icon" v-show="isShowSelectMenu"/></span>
						<ul class="select_menu" v-show="isShowSelectMenu">
							<li v-for="(item,index) in bankList" :key='index' @click="selectBankName(item)">{{item.bank_name}}({{item.bank_card}})</li>
						</ul>
					</div>
				</template>
				<!-- <div style="width: 6.8rem; height: 6rem;" v-show="!answerShow"></div> -->
				<div class="tips">您的提现金额将在T+3天打到您的指定账户</div>
				<div class="do" @click="exCash">提现</div>
				<!-- <div class="explain">
					<div class="title">说明:</div>
						您新进投资后，每日释放的现金宝可提现提现时间为：早9:00 ~晚18:00
				</div> -->
			</div>
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../../common/top'
	import foot from '../../common/index'
	export default{
		name:'extractCash',
		data(){
			return{
				title:'提现',
				pageindex:2,
				notes:'提现记录',
				bankname:'',
				bankcard:'',
				cashInfo:{},//接收初始加载信息
				showBank:0,
				bankList:[],
				isShowSelectMenu:false,     //默认不展示选择下拉菜单
				isShowSlectWayMenu:false,   //默认不展示转出方式下拉菜单
				answerShow:true,
				cash:{
					bankid:0,
					count:'',
					type:1
				},
				way:'',//默认提现方式
				selectBank:true ,
			}
		},
		components:{
			top,foot,
		},
		created(){
			this.isOverdue();
			this.getBankList();
			this.getInfo();
		},
		methods:{
			showSelectMenu(){   //显示和隐藏认购选择下拉菜单
				console.log(this.isShowSelectMenu);
                this.isShowSelectMenu = !  this.isShowSelectMenu;
                this.answerShow = !this.answerShow;
            },
            SelectCount(index){ //将认购选择的数量填写到上面
                this.userInfo.placeholder = this.problemlist[index].title;
                this.isShowSelectMenu = ! this.isShowSelectMenu;
                this.answerShow = true;
                //this.userInfo.problemid = this.problemlist[index].id;
                //console.log(this.userInfo.problemid);
            },
            showSelectWayMenu(){    //显示和隐藏转出方式下拉擦弹
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu ;
            },
            selectBankName(item){
            	this.bankname = item.bank_name;
            	this.bankcard = item.bank_card;
            	this.cash.bankid = item.id;
            	this.isShowSelectMenu = !  this.isShowSelectMenu;
            	this.answerShow = !this.answerShow;
            },
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
						if(this.$store.state.myCard.list == undefined){							
							this.$toast({
								message:'您还没有默认银行卡，请添加！'
							});
							// setTimeout(()=>{
							// 	this.$router.push('/addCard');
							// },2000);
							this.showBank = 0;
						}else{
							this.showBank = 1;
						}
						for(let i=0; i<this.bankList.length; i++){
							if(this.bankList[i].is_default == 1){
								this.bankname = this.bankList[i].bank_name;
								this.bankcard = this.bankList[i].bank_card;
								this.cash.bankid = this.bankList[i].id;
							}
						}
					}else{
						this.$toast({
							message:this.$store.state.myCard.msg,
						})
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			getInfo(){
				this.$store.dispatch('extractCash/loadexcash').then(()=>{
					if(this.$store.state.extractCash.code == 200){
						this.cashInfo = this.$store.state.extractCash.cashInfo;
//						if(this.cashInfo.user_card == null){
//							this.showBank = 0;
//							this.$toast({
//								message:'您还没有默认银行卡，请添加！'
//							});
//							setTimeout(()=>{
//								this.$router.push('/addCard');
//							},1000);
//						}else{
//							this.showBank = 1;
//						}
					}else{
						this.$toast({
							message:this.$store.state.extractCash.msg,
						})
					}
				}).catch((e)=>{
					console.log(e);
				})
			},
			golist(){
            	this.$router.push('/withdrawRecord');
            },
            exCash(){
				// console.log(this.cash);
				if(this.showBank == 0){
					this.$toast({message:'您还没有添加银行卡'});
					return false ;
				}
	           	var total = parseInt(this.cashInfo.money_score);
	           	var count = parseInt(this.cash.count);
	           	if(count>total){
	           		this.$toast({
	           			message:'不能大于提现总额'
	           		})
	           		return false;
	           	}
	           	// if((count%100) !=0){
	           	// 	this.$toast({
	           	// 		message:'请输入100的整数倍'
	           	// 	})
	           	// 	return false;
	           	// }
	           	if(count<=0){
	           		this.$toast({
	           			message:'请输入大于0的正整数'
	           		})
	           		return false;
				}
	           	this.$store.dispatch('extractCash/exCash',this.cash).then(()=>{
	           		console.log(this.$store.state.extractCash.ecode);
	           		if(this.$store.state.extractCash.ecode == 1){
	           			this.$toast({message:this.$store.state.extractCash.emsg});
	           			setTimeout(()=>{
	           				this.$router.go(0);
	           			},1000)
	           		}else{
	           			this.$toast({message:this.$store.state.extractCash.emsg});
	           		}
	           	}).catch((e)=>{
	           		console.log(e);
	           	})
		   },
			showSelectMenu(){   //显示和隐藏认购选择下拉菜单
				this.isShowSelectMenu = !  this.isShowSelectMenu;
			},
			selectWayFunction(index){   //将转出方式填写在上面
                this.way = this.selectWay[index].title;
                this.info.type = this.selectWay[index].id;
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu;
            },
		},
		filters:{
			formatBankCard(card){
				if(card !== null || card !==''){
        			card = card.slice(-4);
        			 return card;
        		}
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../../../../static/css/common.css");
	.addCard{
		// width: 5rem;
		height: 1rem;
		margin: 0 auto;
		background-color: #ffbb33;
		color: #fff;
		font-size: 0.4rem;
		text-align: center;
		line-height: 1rem;
		border-radius: 0.13rem;
	}
	.selectType{
		font-size:.37rem;
		color:#fff;
		padding:.2rem 0 ;
		display: flex;
		label{
			width:50%;
		}
	}
	.selected{
	    display: block;
	    width: 100%;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    box-sizing: border-box;
	    background: rgba(255,255,255,0.5);
	    margin: 0 auto 0.8rem;
	    border-radius: 0.13rem;
	    color: #666;
	    font-size: 0.37rem;
	    border:0;
	    outline:0;
	    position: relative;
	}
	.selected .placeholder{
	    padding:0 0.2rem;
		color:#333;
		height:100%;
		box-sizing: border-box;
	}
	.selected .placeholder span{
		overflow: hidden;
		display: inline-block;
		white-space: nowrap; 
		text-overflow:ellipsis; 
		width: 90%;
	}
	.selected .icon img{
	    position: absolute;
	    width:0.32rem;
	    height:0.2rem;
	    top:50%;
	    margin-top:-0.1rem;
	    right:0.3rem;
	}
	.selected .select_menu{
	    width:100%;
	    padding:0 0.27rem;
	    box-sizing: border-box;
	    background-color:#A3A9BA;
	    z-index: 1000;
	    border-radius:0.13rem;
	    text-align:center;
	    display: none;
	    height: 6rem;
	    overflow: auto;	    
	}
	.selected .select_menu li{
	    border-bottom:1px solid #999;
	}
	.selected .select_menu{ display:block; }
	.extract{
		width: 9.2rem;
		background-image: linear-gradient(90deg, 
			#596487 0%, 
			#384466 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		padding: 0.8rem;
	}
	.total{
		color: #fff;
		font-size: 0.32rem;
		margin-bottom: 0.53rem;
		span{
			color: #FFBB33;
		}
	}
	.money{
		width: 100%;
		height: 1rem;
		background: #A3A9BA;
		border-radius: 0.13rem;
		padding: 0.2rem;
		font-size: 0.37rem;
		input{
			background-color: transparent;
		}
	}
	.tips{
		color: #99a3bf;
		padding-top: 0.3rem;
		padding-bottom: 1rem;
	}
	.bank{
		width: 100%;
		height: 1rem;
		background: #A3A9BA;
		border-radius: 0.13rem;
		padding: 0.2rem;
		font-size: 0.37rem;
		display: flex;
		justify-content: space-between;
		img{
			width: 0.2rem;
			height: 0.37rem;
		}
	}
	.do{
		width: 3.2rem;
		height: 0.96rem;
		background-color: #ffbb33;
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin: 0 auto;
		color: #fff;
		font-size: 0.43rem;
		font-weight: bold;
		line-height: 0.96rem;
		text-align: center;
		margin-bottom: 1rem;
	}
	.explain{
		width: 7.6rem;
		height: 2.4rem;
		border-radius: 0.05rem;
		border: solid 0.03rem #99a3bf;
		margin: 0 auto;
		padding: 0.43rem;
		font-size: 0.32re;
		color: #99a3bf;
		line-height: 0.5rem;
		.title{
			font-size: 0.37rem;
			color: #fff;
			padding-bottom: 0.2rem;
		}
		
	}
</style>
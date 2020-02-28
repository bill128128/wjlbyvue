<template>
	<div id="productDetail">
		<div class="top">
			<div class="img" @click="goback">
				<img src="../../../../static/img/left.png">
			</div>			
		</div>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for="(item,index) in detail.img" :key='index'><img :src='item' style="height:100%"></div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="fenye">
		    	<div class="title"></div>
		    	<div class="swiper-pagination"></div>
		    </div>		    
		</div>
		<div class="container">
			<div class="info">
				<!-- <p class="p1">
					<b v-if="detail.price != 0">{{this.detail.price}}<span>招募积分</span> +</b>{{this.detail.score}} <span v-if="info.ptype == 1">招募红利</span><span v-if="info.ptype == 2">消费红利</span></p> -->
				<p class='p1' v-if='info.ptype == 1'>
					{{this.detail.score}} <span >购物积分</span>
				</p>
				<p class='p1' v-if='info.ptype == 2'>
					<!-- {{this.detail.score}} <span >购物券</span>+ -->
					{{this.detail.score}} <span >购物积分</span>
				</p>
				<p class='p1' v-if='info.ptype == 3'>
					{{this.detail.score}} <span >礼品积分</span>
				</p>
				<p>{{this.detail.title}}</p>
				<p>共{{this.detail.stock}}件<span class="span">快递：免运费</span></p>
			</div>
			<div class="count">
				购买数量
				<div class="num">
					<!-- <span @click="countSubtract" class="jian">-</span> -->
					<span class="jian">-</span>
	                <input type="number" placeholder="数量" v-model="info.sellCount" id="count" readonly>
					<span>+</span>
	                <!-- <span @click="countAdd">+</span>				 -->
				</div>                
			</div>
			<div class="shoppingCart text" @click='addShoppingCart'>
				<span>加入购物车</span>
				<img src="../../../../static/img/shoppingCart.png" alt="shoppingCart" class='shoppingCartImg'>
			</div>
			<div class="shoppingCart text" @click='goShoppingCart()'>
				<span>到购物车结算</span>
				<img src="../../../../static/img/total.png" alt="shoppingCart" class='shoppingCartImg'>
			</div>
			<div class="text">
				<div class="title">包邮区域:</div>
				<p v-html="detail.sub_explain">{{detail.sub_explain}}</p>
			</div>
			<div class="text">
				<div class="title2">商品详情</div>
				<p v-html="detail.contents">{{detail.contents}}</p>
			</div>
			<!-- <div class="exchange">
				<button :class="zitiShow? 'active':''" @click="changeShow(),downLine()">线下自提</button>
				<button :class="duihuanShow? 'active':''" @click="exchange(),changeShow()">线上兑换</button>
			</div>			 -->
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>
<script>
	import foot from '../../common/index'
	import Swiper from 'swiper';
	import isLogin from '../../../../static/js/islogin'  //判断是否登录过期
	export default{
		name:'productDetail',
		data(){
			return{
				pageindex:0,
				detail:{},
				info:{
					sellCount:1,
					pid:0,
					ptype:0,
				},
				zitiShow:false,
				duihuanShow:true,
			}
		},
		components:{
			foot,
		},
		created(){
			this.getProDetail();
			this.info.ptype = window.localStorage.getItem('ptype');
		},
		methods:{
			goShoppingCart(){  //去购物车结算
				this.$router.push({name:'shoppingCart',params:{type:this.info.ptype}}) ;
			},
			changeShow(){//线上兑换和线下自提切换
				this.zitiShow = !this.zitiShow;
				this.duihuanShow = !this.duihuanShow;
			},
			countAdd(){ //+卖出数量
				if(this.info.sellCount>=this.detail.stock){
					this.info.sellCount = this.detail.stock;
				}else{
					this.info.sellCount = this.info.sellCount -0 + 1 ;
				}               
            },
            countSubtract(){    //-卖出数量
                if(this.info.sellCount<=1){
                    this.info.sellCount = 1 ;
                }else{
                    this.info.sellCount = this.info.sellCount - 1 ;
                }
            },
            goback(){//返回上一页
            	this.$router.go(-1);
            },
            getProDetail(){//获取商品详情
            	this.info.pid = window.localStorage.getItem('pid');
            	this.info.ptype = window.localStorage.getItem('ptype');
            	this.$store.dispatch('productDetail/getProductDetail',this.info).then(()=>{
            		if(this.$store.state.productDetail.code == 200){
						this.detail = this.$store.state.productDetail.prodata;
						// this.$set(this.detail,'buyCount',''); //给对象添加一个count属性
            			this.$nextTick(function(){
            				var mySwiper = new Swiper ('.swiper-container', {
							    loop: true,
							    autoplay:2000,
							    // 如果需要分页器
							    pagination: {
							        el: '.swiper-pagination',
							        type: 'fraction',
							    },							    
							});
            			})
            		}else{
            			this.$toast({
            				message:this.$store.state.productDetail.msg
            			});
            		}
            	}).catch((e)=>{
            		console.log(e);
            	});
            },
            exchange(){     //线上兑换
            	if(this.info.sellCount == 0 || this.info.sellCount == ''){
            		this.$toast({
            			message:'请输入购买数量',
            		});
            	}else if(this.info.sellCount<0){
            		this.$toast({
            			message:'购买数量不能为负数',
            		});
            	}else if(this.info.sellCount>this.detail.stock){
            		this.$toast({
            			message:'购买数量不能大于库存量',
            		});
            	}else{
					console.log(this.info.ptype);
					let productDetails = [] ;
					let obj = {} ;
					this.$set(obj,this.info.pid,this.info.sellCount) ;
					productDetails.push(obj);
            		this.$store.dispatch('exchange/exchange',this.info).then(()=>{
						isLogin.isLogin(this.$store.state.exchange.code,this);
            			if(this.$store.state.exchange.code == 200){
            				this.$router.push({name:'makeSureOrder',params:{item:this.info}});
            				window.localStorage.setItem('pcount',this.info.sellCount);
            			}else{
            				this.$toast({
		            			message:this.$store.state.exchange.msg,
		            		});
            			}
            		}).catch((e)=>{
	            		console.log(e);
	            	});
            	}
            },
            downLine(){    //线下自提
            	if(this.info.sellCount == 0 || this.info.sellCount == ''){
            		this.$toast({
            			message:'请输入购买数量',
            		});
            	}else if(this.info.sellCount<0){
            		this.$toast({
            			message:'购买数量不能为负数',
            		});
            	}else if(this.info.sellCount>this.detail.stock){
            		this.$toast({
            			message:'购买数量不能大于库存量',
            		});
            	}else{
            		this.$store.dispatch('exchange/exchange',this.info).then(()=>{
						isLogin.isLogin(this.$store.state.exchange.code,this);
            			if(this.$store.state.exchange.code == 200){
            				this.$router.push({name:'downLinePay',params:{item:this.info}});
            				window.localStorage.setItem('pcount',this.info.sellCount);
            			}else{
            				this.$toast({
		            			message:this.$store.state.exchange.msg,
		            		});
            			}
            		}).catch((e)=>{
	            		console.log(e);
	            	});
            	}
			},
			addShoppingCart(){  //加入购物车
				this.detail.buyCount = this.info.sellCount ;
				// console.log(this.detail);
				// console.log(this.info.ptype);
				switch(this.info.ptype){
					case '1' :  
						this.func('shoppingCartRetail') ;
						break ;
					case '2' : 
						this.func('shoppingCartWhole') ;
						break ;
					case '3' :
						this.func('shoppingCartGift') ;
						break ;
				}
			},
			func(sessionInfo){  //添加购物车公用函数
				var shoppingCartSession = JSON.parse(window.sessionStorage.getItem(sessionInfo));
				// 看session中是否存储了字段 ,如果没有改字段说明购物车中没有商品,不用查是否保存重复
				if(shoppingCartSession == '' || shoppingCartSession == null || shoppingCartSession == undefined){
					shoppingCartSession = [] ;
					shoppingCartSession.push(this.detail);
					window.sessionStorage.setItem(sessionInfo,JSON.stringify(shoppingCartSession));
					if(window.sessionStorage.getItem(sessionInfo) != null){
						this.$toast({message:'添加成功'})
					}else{
						this.$toast({message:'添加失败'})
					}
					// console.log('现在的购物车');
					// console.log(shoppingCartSession);
				}else{
					// this.detail['buyCount'] = this.info.sellCount ;
					for(let i = 0 ; i < shoppingCartSession.length ; i++){
						if(shoppingCartSession[i]['id'] == this.detail.id){
							shoppingCartSession[i] = {} ;
							console.log(this.detail);
							shoppingCartSession[i] = this.detail ;
							this.$toast({message:'添加成功'}) ;
							window.sessionStorage.setItem(sessionInfo,JSON.stringify(shoppingCartSession));
							return shoppingCartSession ;
						}
					}
					this.$toast({message:'添加成功'}) ;
					shoppingCartSession.push(this.detail);
					// console.log('现在的购物车');
					// console.log(shoppingCartSession);
					window.sessionStorage.setItem(sessionInfo,JSON.stringify(shoppingCartSession));
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../../../../static/css/common.css");
	.fenye{
		position: absolute;
		bottom: 0;
		background: #fff;
		opacity: 0.4;
		width: 100%;
		height: 1.33rem;
		z-index: 20;
		display: flex;
		justify-content: space-between;
		.title{
			font-size:0.4rem;
			line-height:1.33rem;
			padding-left:0.4rem;
			width:85%;
			overflow:hidden;
			white-space: nowrap;
			text-overflow:ellipsis;
		}
	}
	.top {
		position: absolute;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 9;
	}
	.top .img{
		position:absolute;
		width: .64rem;
		height: .64rem;
		left:0.4rem;
		margin-top: .5rem;
		background: black;
		border-radius: 50%;
		padding-top: .1rem;
	}
	.top .img img{
		width: .21rem;
		height: .4rem;
		vertical-align: top;
	}
	.swiper-container {
        width: 100%;
        height: 10rem;
    }
    .container{
    	top: .3rem;
    	z-index: 9;
    }
    .info{
    	width: 9.2rem;
		background-image: linear-gradient(-30deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin-bottom: .3rem;
		color: white;
		padding: .4rem;
		font-size: .37rem;
		p{
			padding: .13rem 0;
			span{
				font-size: .37rem;
				color: #7A7ACC;
			}
			.span{
				float: right;
			}
		}
		.p1{
			color: #FFBB33;
			font-size: .64rem;			
		}
    }
    .count{
    	width: 9.2rem;
		background-image: linear-gradient(90deg, 
			#596487 0%, 
			#384466 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin-bottom: .3rem;
		color: white;
		padding: 0.4rem;
		font-size: .37rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	.num{
		float: right;
		color: #666;
		width:2.3rem;
		height:0.64rem;
		display: flex;
		span{
			width: 0.64rem;
			height: 0.64rem;
			line-height:0.64rem;
			background-color: #9da3b4;
			border-radius: 0.03rem;
			text-align: center;
			display: inline-block;
		}
			.jian{
				background-color: #798199;
			}
			input{
				width: 0.95rem;
				background-color: #9da3b4;
				border-radius: 0.03rem;
				height: .64rem;
				line-height:0.64rem;
				display: inline-block;
				margin: 0 1px;
				text-align: center;
			}
		}
    }
    .text{
    	width: 9.2rem;
		background-image: linear-gradient(90deg, 
			#596487 0%, 
			#384466 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin-bottom: .3rem;
		color: white;
		padding: 0.4rem;
		font-size: .37rem;
		.title{
			font-size: .43rem;
			margin-bottom: .4rem;
		}
		.title2{
			font-size: .43rem;
			margin-bottom: .4rem;
			text-align: center;
		}
		p{
			color: #99a3bf;
		}
	}
	.shoppingCart{
		img{
			width:.6rem;
			height:.5rem;
		}
		display: flex;
		justify-content: space-between;
	}
    .exchange{
    	display: flex;
    	justify-content: space-between;
    	position: fixed;
    	bottom: 1.5rem;
    	width: 9.2rem;
    	button{
	    	width: 45%;
			height: 0.96rem;
			background: #FFFFFF;
			box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
				rgba(31, 31, 51, 0.2);
			border-radius: 0.13rem;
			color: #ffbb33;
			font-size: 0.43rem;
	    }
	    button.active{	    	
	    	background-color: #ffbb33;
	    	color: white;
	    }
    }    
</style>
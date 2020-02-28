<template>
	<div id="orderConfirm">
		<top :message='title'></top>
		<div class="container">
			<div class="address">
				<p>收件人：丽丽<span>18911895689</span></p>
				<p class="p">
					收货地址：北京市东城区香谢里南街丽影广B区北京市东城区香谢里南街丽影广B区
				</p>
			</div>
			<div class="text">
				<div class="top">
					<img src="" alt="">
					<div class="detail">
						<div class="title">
							￥10+1000 <span>招募红利</span>
						</div>
						<p>加拿大原瓶进口VQA葡萄酒 派利特瑞酒庄维x2</p>
						<p class="p">包邮</p>
					</div>
				</div>
				<div class="bottom">
					合计金额：<span class="span1">￥20+2000 </span><span class="span2">招募红利</span>
				</div>
			</div>
			<div class="text2">
				<p>实付款：<span>￥20.00</span></p>
				<div class="button" @click="showPopup">确认兑换</div>
			</div>
			<!--下侧弹出框-->
			<mt-popup v-model="popupVisible" position="bottom">
				<div class="title">支付金额</div>
				<div class="price">
					金额：<span>￥20.00</span>
				</div>
				<div class="pay">
					<h2>选择支付方式</h2>
					<ul>
						<li>
							<img src="../../../../static/img/zfb.png">
							<div class="info">
								<p class="p1">支付宝支付</p>
								<p class="p2">推荐您优先使用支付宝</p>
							</div>
							<img src="../../../../static/img/moreright.png">
						</li>
						<li>
							<img src="../../../../static/img/wxzf.png">
							<div class="info">
								<p class="p1">微信支付</p>
								<p class="p2">方便快捷,支付无忧</p>
							</div>
							<img src="../../../../static/img/moreright.png">
						</li>
					</ul>
				</div>
			</mt-popup>
		</div>
	</div>
</template>

<script>
	import top from '../../common/top'
	export default{
		name:'orderConfirm',
		components:{
			top
		},
		data(){
			return{
				title:'确认订单',
				popupVisible:false,
			}
		},
		methods:{
			showPopup:function(){
				this.popupVisible = true;
			}
		}
	}
</script>

<style scoped lang="less">
@import url("../../../../static/css/common.css");
	.address{
		background-image: url('../../../../static/img/orderConfirmbg.png');
		background-size: cover;
		width: 9.2rem;
		height: 2.6rem;
		padding: 0.4rem;
		color: #fefefe;
		font-size: 0.37rem;
		margin-bottom: 0.3rem;
		p{
			padding:0.13rem 0;
			span{
				margin-left:2rem;
			}
		}
		.p{
			font-size: 0.32rem;
			line-height: .48rem;
		}
	}
	.text{
		width: 9.2rem;
		background-image: linear-gradient(-90deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		padding: 0.4rem;
		color: #fefefe;
		font-size: 0.32rem;
		margin-bottom: 0.3rem;
		.top{
			border-bottom: 1px solid #313859;
			padding: 0.13rem 0;
			display: flex;
        	justify-content: space-between;
        	margin-bottom:.3rem;
			img{
				width:2rem;
		        height:2rem;
		        border-radius: 0.13rem;
		        border:1px solid #fff;
		        margin-right:0.27rem;
		        margin-bottom: .4rem;
			}
			.detail{
				width: 6rem;
				.title{
					color: #FFBB33;
					font-size: .43rem;
					span{
						font-size: .32rem;
						color: #7a7acc;
					}
				}
				p{
					line-height: .48rem;
				}
				.p{
					text-align: right;
				}
			}
		}
		.bottom{
			text-align: right;
			.span1{
				color: #FFBB33;
				font-size: 0.43rem;
			}
			.span2{
				color:#7A7ACC;
			}
		}
	}
	.text2{
		width: 9.2rem;
		background-image: linear-gradient(-90deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		padding: 1.06rem 0.4rem 1.06rem 0.4rem;
		color: #fefefe;
		font-size: 0.43rem;
		margin-bottom: 0.3rem;
		p{
			width: 3.35rem;
			margin: 0 auto;
			margin-bottom: 0.5rem;
			span{
				color: #FFBB33;
			}	
		}
		.button{
			width: 3.2rem;
			height: 0.96rem;
			background-color: #ffbb33;
			box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
				rgba(31, 31, 51, 0.2);
			border-radius: 0.13rem;
			color: white;
			margin: 0 auto;
			text-align: center;
			line-height: 0.96rem;
		}
	}
	.mint-popup{
		width: 100% !important;
		border-radius: 0;
		padding: 0;
		border-top-left-radius: 0.13rem;
		border-top-right-radius: 0.13rem;
		color: #333;
		.title{
			padding: 1rem;
			width: 4rem;
			margin: 0 auto;			
			font-size: .43rem;
		}
		.price{
			padding-bottom: 1rem;
			border-bottom: 1px solid #e6e6e6;
			text-align: center;
			font-size: .43rem;
			span{
				color: #FFBB33;
				font-size: 0.6rem;
			}
		}
		.pay{
			padding: 1rem;
			font-size: 0.37rem;
			h2{
				font-size: 0.37rem;
			}
			ul{
				padding: .4rem;
				li{
					display: flex;
					justify-content: space-between;
					flex-wrap: nowrap;
					padding-bottom: .5rem;
					margin-bottom: .5rem;
					img{
						width: 1rem;
						height: 1rem;
					}
					.info{
						width: 5.2rem;
						padding-left: .5rem;
						.p1{
							font-size: .4rem;
						}
						.p2{
							font-size: .37rem;
							color: #999;
						}
					}
				}
				li:first-child{
					border-bottom: 1px solid #e6e6e6;
				}
			}
		}
				
	}
</style>
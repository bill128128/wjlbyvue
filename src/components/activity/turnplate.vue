<template>
	<div id="trunplate">
		<div class="top">
			<img src="../../assets/left.png" @click="goback">
			新用户玩转盘
		</div>
		<div class="container">
			<div class="conts">
				<div class="box">
					<div class="pointer" @click="getwinnum()">
					</div>
					<div class="boxbg" :style="{transform:rotate_angle,transition:rotate_transition}">
						<div class="turn">
							<div :class="{'wheel-bg6':true}">
								<div class="prize-list">
									<ul class="ulOne" :class="{'win':indexa===0&&prize_list.length==3}">
										<li v-for="(item,index) in arrOne" :class="{'win':index===indexa}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
									</ul>
									<ul class="ulTwo" :class="{'win':indexa===arrOne.length-1}">
										<li v-for="(item,index) in arrTwo" :class="{'win':index===indexb}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
										<li v-if="prize_list.length==3" :class="{'win':indexb===0}" style="border:none;z-index:4; transform: rotate(329deg)"></li>
									</ul>
									<div></div>
								</div>
								<div class="prize-list">
									<div class="prize-item" v-for="(item,index) in prize_list" :key="index" :style="{transform:item.troter,width:item.width}">
										<p>{{item.prizeName}}</p>
											
										<div class="prize-name">
											{{item.prizeType}}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hjlist">
				<p>您还有 <span>{{count}}</span>次抽奖机会</p>
				<div class="zjtitle">
					<b v-if="count===0">我的奖品:{{hjtext}}<span>获奖时间:{{hjdate}}</span></b>
					<b v-if="count===1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您有一次抽奖机会，快去抽奖吧！</span></b>
				</div>
				<div class="gztitle">活动规则</div>				
				<ul class="ul">
				    <li>一等奖</li><li>400招募积分</li>
					<li>二等奖</li><li>350招募积分</li>
					<li>三等奖</li><li>300招募积分</li>
					<li>四等奖</li><li>250招募积分</li>
					<li>五等奖</li><li>200招募积分</li>
					<li>六等奖</li><li>150招募积分</li>
					<li>七等奖</li><li>100招募积分</li>
				</ul>				
			</div>					
			<div class="popup" v-show="toast_control" @click="toast_control=false" @touchmove.prevent>
				<div class="popbg"></div>
				<div class="popbox">
					<p>恭喜您！抽中<br><b>{{wintitle}}</b><br></p>
				</div>				
			</div>	
			<p class="p1">中奖后，您的奖励积分将计入招募积分总额中</p>
		</div>
		
	</div>	
</template>
<script>
	export default {
		data() {
			return {
				count:1,//抽奖次数
				hjdate:'',//获奖时间
				hjtext:'',//获奖内容
				winnum: 0, //中奖的下标
				wintitle:'',//中奖的标题
				indexa: '', //中奖的下标在第一个ul下li的index下标，背景变深颜色
				indexb: '', //中奖的下标在第二个ul下li的index下标，背景变深颜色
				toast_control: false, //抽奖结果和活动规则弹出框控制器
				click_flag: true, //是否可以旋转抽奖
				start_rotating_degree: 0, //转盘初始旋转角度
				rotate_angle: 0, //转盘将要旋转的角度
				start_rotating_degree_pointer: 0, //指针初始旋转角度
				rotate_angle_pointer: 0, //指针将要旋转的度数
				rotate_transition: "", //初始化选中的过度属性控制
				rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
				prize_list: [
					{
						prizeType: 400, // 奖品类型
						prizeName: "一等奖", // 奖品名称
					},
					{
						prizeType: 100,
						prizeName: "七等奖",
					},
					{
						prizeType: 350,
						prizeName: "二等奖",
					},
			        {
			        	prizeType: 100,
			            prizeName: "七等奖"
			        },
			        {
			        	prizeType: 300,
			            prizeName: "三等奖"
			        },
			        {
			        	prizeType: 100,
			            prizeName: "七等奖"
			        },
			        {
			        	prizeType: 250,
			            prizeName: "四等奖"
			        },
			        {
			        	prizeType: 100,
			            prizeName: "七等奖"
			        },
			        {
			        	prizeType: 200,
			            prizeName: "五等奖"
			        },
			        {
			        	prizeType: 100,
			            prizeName: "七等奖"
			        },
			        {
			        	prizeType: 150,
			            prizeName: "六等奖"
			        },
			        {
			        	prizeType: 100,
			            prizeName: "七等奖"
			        },
				], //奖品列表
				arrOne: [],
				arrTwo: [],
				shopUid: '',
				userinfo: '',
				prizeinfo: {
					isGet: '',
					prizeInfos: [{
						validTime: '',
						invalidTime: '',
						type: ''
					}]
				}, //中奖优惠券或实物的信息
				hasPrize: {}, //抽奖之后弹出框信息
				num:'0',
				
			}
		},
		created() {
			let _this = this;
			_this.setSan();
			//_this.getwinnum();
			_this.getpersoninfo();
		},
		computed:{
			defaultOption () {
		        return {
		          step: 1, //数值越大速度滚动越快
		          hoverStop: true, //是否开启鼠标悬停stop
		          direction: 1, // 0向下 1向上 2向左 3向右
		          waitTime: 1000 //单步运动停止的时间(默认值1000ms)
		        }
		  },		   
		},
		methods: {			
			chou() {
				let _this = this;	
				_this.indexa = '';
				_this.indexb = '';	
				
				//console.log(_this.nums)
				if(_this.winnum == 7){
					var arr = [1,3,5,7,9,11];
					var temp = (Math.random()*arr.length) >> 0;						
					_this.winnum = arr[temp];
					//alert(_this.winnum);						
					_this.rotating(_this.winnum);
				}else{
					_this.winnum = _this.winnum+ (_this.winnum-2);						
					_this.rotating(_this.winnum);
				};									
				
				
			},
			setSan() {
				let _this = this;
				_this.arrOne = [];
				_this.arrTwo = [];
				_this.rotate_angle = "rotate(" + Math.floor(-360 * 100 / _this.prize_list.length) / 200 + "deg)";
				_this.start_rotating_degree = Math.floor(-360 * 100 / _this.prize_list.length) / 200;
				for(var i = 0; i < _this.prize_list.length; i++) {
					_this.prize_list[i].troter = "rotate(" + Math.floor(360 * 100 / _this.prize_list.length) / 100 * (0.5 + Number(i)) + "deg) translateX(-50%)"
					_this.prize_list[i].width = Math.floor(3.14 * 5.6 / this.prize_list.length) + "rem"
					var item = {
						value: _this.prize_list[i].name,
						zIndex: Number(i) + 1,
						deg: "rotate(" + Math.floor(360 * 100 / this.prize_list.length) * i / 100 + "deg)",
						degnum: i,
					}
					if(i < _this.prize_list.length / 2) {
						_this.arrOne.push(item);
					} else {
						_this.arrTwo.push(item);
					}
				}
			},
			rotating(index) { //转盘转动函数，index值为中奖的下标，后台会返回中奖的id，这边会首先for循环判断中奖的下标
				let _this = this;
				_this.rotate_transition = "transform 6s cubic-bezier(0.25,0.1,0.01,1)";
				if(!_this.click_flag) return;
				var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
				var during_time = 5; // 默认为1s
				var result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
				var rand_circle = 6; // 附加多转几圈，2-3
				_this.click_flag = false; // 旋转结束前，不允许再次触发
				if(type == 0) {
					if(this.start_rotating_degree < 0) {
						this.start_rotating_degree = 0
					} else {
						this.start_rotating_degree = this.start_rotating_degree - Math.floor(360 * 100 / _this.prize_list.length) / 200 -Math.floor(360 * 100 / this.prize_list.length) * _this.nums / 100;
					}
					var rotate_angle = this.start_rotating_degree + 360 * 10 + Math.floor(-360 * 100 / this.prize_list.length) / 200 - Math.floor(360 * 100 / this.prize_list.length) * result_index / 100;
					this.start_rotating_degree = rotate_angle;
					_this.rotate_angle = "rotate(" + rotate_angle + "deg)";
					// 旋转结束后，不允许再次触发
					setTimeout(function() {
						_this.click_flag = false;						
						if(_this.winnum < _this.prize_list.length / 2) {
							_this.indexb = '';
							_this.indexa = _this.winnum;
						} else {
							_this.indexa = '';
							_this.indexb = _this.winnum - (_this.arrOne.length);
						}
						setTimeout(function() {
							_this.game_over();
							_this.getpersoninfo();
						}, 100);
					}, during_time * 1000 + 1500); // 延时，保证转盘转完
				}
			},
			game_over() {
				let _this = this;
				_this.prizetype = 1
				if(_this.prizetype != -1) {
					_this.toast_control = true;
				} else {
					Alert.show("奖品已领完，下次请早到哦！")
				}
				var obj = {};
					obj = {
						type: 1,
						words1: '恭喜您！',
						words2: "获得" + _this.wintitle,
						words3: ''
					}
				_this.hasPrize = obj;
			},
			getwinnum(){
				if(this.count == 1){
					this.$store.dispatch('turnplate/getresult').then(()=>{
						if(this.$store.state.turnplate.code == 200){
							//this.$set(this,'winnum',this.$store.state.turnplate.result.id)
							this.nums=Number(this.prize_list.length - 1)-Number(this.winnum);
							this.winnum = this.$store.state.turnplate.result.id;	
							this.wintitle = this.$store.state.turnplate.result.prize;
							this.chou();
						}else{
							this.click_flag=false;
							this.$toast({
								message:this.$store.state.turnplate.msg,
							});
						}
					}).catch((e) => {              
						//console.log(e);
					});
				}else{
					this.$toast({
						message:"每位用户只有一次抽奖机会，您已经抽过奖了！"
					});
				}				
			},
			goback(){
				this.$router.go(-1);
			},
			getpersoninfo(){
				this.$store.dispatch('turnplate/getpersoninfo').then(()=>{
					if(this.$store.state.turnplate.pcode == 200){
						this.count = this.$store.state.turnplate.presult.number;
						this.hjdate = this.$store.state.turnplate.presult.time;
						this.hjtext = this.$store.state.turnplate.presult.prize;
					}else{
						this.$toast({
							message:this.$store.state.turnplate.pmsg,
						});
					}
				}).catch((e) => {              
					//console.log(e);
				});
			}
		},
	}
</script>
<style scoped lang="less">
	.top {
		position: fixed;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    background:url("../../../static/img/trunplatetitle.png") no-repeat;
	    background-size:cover;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 99;
	}
	.top img{
		position:absolute;
		width: .21rem;
		height: .4rem;
		left:0.3rem;
		margin-top: .5rem;
	}
	.top span{
		position: absolute;
		right:.3rem;
		font-size:0.37rem;
	}
	
	.container {
		width: 100%;
		height: 23rem;
		background: url('../../../static/img/turnplatebg.png') no-repeat center;
		position: relative;
		top: 1.4rem;
		background-size: 100%;
		background-size: cover;
		overflow: hidden;
		.p1{
			width: 100%;
			height: 3.8rem;
			background:url(../../../static/img/turnplatecloud.png) no-repeat center ;
			background-size: cover;
			position: absolute;
			bottom: 0;
			color: white;
			text-align: center;
			padding-top: 3rem;
		}
		.hjlist{
			position: absolute;
			top: 11rem;
			width:100%;
			margin:0 auto;
			overflow:hidden;
			transition: all 0.5s;
			padding:.4rem;
			text-align:center;
			color:#f0dc62;
			font-size:.37rem;
			.zjtitle{
				width: 9rem;
				height: 1.4rem;
				background: url('../../../static/img/turnplatetitle.png') no-repeat center;
				background-size: cover;
				margin: 0 auto;
				color: #e30000;
				line-height: 1.4rem;
				margin-bottom: .2rem;
				font-weight: bold;
				text-align: left;
				padding-left: 1.3rem;
				span{
					font-size: 0.24rem;
					color: #ff8400;
					font-weight: normal;
					margin-left: .2rem;
				}
			}
			.gztitle{
				width: 3.56rem;
				height: 0.68rem;
				background-color: #ff7e00;
				border-radius:.33rem ;
				margin: 0 auto;
				color: #fff;
				font-size: 0.4rem;
				line-height: 0.68rem;
				margin-bottom: .2rem;
			}
			p{				
				color: #FFFFFF;
				margin: 0 auto;
				margin-bottom:.2rem;
				span{
					color: #f0dc62;
				}
			}
			.ul{
				width: 9.2rem;
				height: 6.67rem;
				display: flex;
				margin: 0 auto;
				background: url(../../../static/img/turnplateulbg.png) no-repeat center;
				color: #fff;
				text-align: center;
				background-size: cover;
				padding: .8rem 1.8rem;
				flex-wrap: wrap;
				li{
					width: 50%;
					text-align: left;
					height: .4rem;
					line-height: .4rem;
					padding-left: .5rem;
				}
			}
			
			
		}
		.conts {
			/*min-height: 11.5rem;*/
			position: absolute;
			top: 4.5rem;
			left: 50%;
			margin-left: -3.1rem;
			.activitytime {
				height: 0.5rem;
				width: 100%;
				position: absolute;
				.timebg {
					width: 100%;
					height: 100%;
					background: #000000;
					opacity: 0.3;
					position: absolute;
					left: 0;
					top: 0;
				}
				.time {
					color: #ffffff;
					line-height: 0.5rem;
					padding-left: 0.2rem;
					font-size: 0.24rem;
					position: relative;
					z-index: 2;
				}
			}
			.rule {
				height: 0.69rem;
				margin-bottom: 2.37rem;
				position: relative;
				.ruletop {
					width: 1.35rem;
					height: 0.46rem;
					position: absolute;
					right: 0;
					bottom: 3px;
					.rulebg {
						height: 100%;
						width: 100%;
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						background: #1201d5;
						opacity: 0.3;
						border-top-left-radius: 0.23rem;
						border-bottom-left-radius: 0.23rem;
					}
					.ruletitle {
						text-align: center;
						line-height: 0.46rem;
						font-size: 0.24rem;
						color: #fff;
						position: relative;
						z-index: 3;
						border-top-left-radius: 0.23rem;
						border-bottom-left-radius: 0.23rem;
						border-bottom: 3px solid #1201d5;
					}
				}
			}
			.title {
				height: 0.46rem;
				text-align: center;
				color: #464ff4;
				font-size: 0.28rem;
				line-height: 0.46rem;
				font-weight: 700;
				margin-bottom: 0.24rem;
			}
			.box {
				width: 6.68rem;
				height: 6.67rem;
				margin: auto;
				position: relative;
				overflow: hidden;
				.pointer {
					width: 1.81rem;
					height: 2.07rem;
					position: absolute;
					top: 50%;
					left: 50%;
					z-index: 20;
					transform: translate(-55%, -60%);
					background: url('../../../static/img/pointer.png')bottom center no-repeat;
					background-size: 100%;
					p {
						font-size: 0.36rem;
						color: #ff4027;
						font-weight: 700;
						text-align: center;
					}
					p:first-of-type {
						margin-top: 0.6rem;
					}
				}
				.boxbg {
					width: 6.41rem;
					height: 6.41rem;
					background: url('../../../static/img/box.png') top center no-repeat;
					background-size: 100%;
					padding: 0.41rem;
					.turn {
						width: 5.59rem;
						height: 5.59rem;
						border-radius: 50%;
						overflow: hidden;
						.slice {
							box-sizing: border-box;
							border: 1px solid #ffd8ad;
						}
						.win {
							background: #fff4c9!important;
						}
						.wheel-bg6 {
							width: 100%;
							height: 100%;
							position: relative;
							div {
								text-align: center;
							}
							.prize-list {
								width: 100%;
								height: 100%;
								position: absolute;
								ul {
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									border-radius: 50%;
									overflow: hidden;
									margin: 0;
									padding: 0;
									li {
										position: absolute;
										top: 0px;
										left: 50%;
										width: 50%;
										height: 50%;
										transform-origin: 0 100%;
										overflow: hidden;
										cursor: pointer;
										box-sizing: border-box;
										border-left: 1px solid #ffd8ae;
										
									}
									li:nth-child(2n){
										background: #fbdb00;
									}
									li:nth-child(2n-1){
										background: #faca00;
									}
								}
								.ulOne {
									clip: rect(0, 5.6rem, 5.6rem, 2.8rem);
								}
								.ulTwo {
									clip: rect(0, 2.8rem, 5.6rem, 0);
								}
								.prize-item {
									position: absolute;
									top: 0;
									z-index: 12;
									height: 2.8rem;
									left: 50%;
									transform: translateX(-50%);
									transform-origin: 0 100%;
									p {
										padding-top: 0.1rem;
										text-align: center;
										height: 0.5rem;
										color: #e30000;
										font-size: 0.21rem;
										margin-bottom: 0.2rem;
									}
									.prize-name {
										background-color: #e30000;
										font-size: 0.21rem;
										color: #fff;
										width: 0.8rem;
										height: 0.4rem;
										margin: 0 auto;
										span{
											font-size: 0.15rem;
										}
									}
								}
							}
						}
					}
				}
				.money {
					position: absolute;
					width: 0.57rem;
					height: 0.55rem;
					top: 2.17rem;
					right: -0.2rem;
				}
			}
			.prizebox {
				margin: 0.3rem;
				position: relative;
				border-radius: 4px;
				overflow: hidden;
				padding: 0 0.27rem 0.28rem;
				.prizebg {
					position: absolute;
					border-radius: 4px;
					background: #fff;
					height: 100%;
					width: 100%;
					top: 0;
					left: 0;
					opacity: 0.2;
				}
				.pri {
					.titname {
						color: #fff;
						font-size: 0.32rem;
						text-align: center;
						margin: 0.07rem;
						span {
							img {
								width: 1.51rem;
								height: 0.14rem;
								margin: 0 0.2rem 0.03rem;
							}
						}
						.xuanz {
							img {
								transform: rotate(180deg);
							}
						}
					}
					.prizez {
						width: 100%;
						border: 1px solid #fa54a7;
						border-radius: 4px;
						background: #fff;
						display: flex;
						.couponleft {
							padding-left: 0.3rem;
							width: 3.9rem;
							position: relative;
							height: 100%;
							.iconright {
								div {
									line-height: 1.1;
								}
								.couponname {
									font-size: 0.32rem;
									color: #333333;
									margin: 0.45rem 0 0.2rem;
								}
								.timevalidity {
									font-size: 0.24rem;
									color: #999999;
									margin-bottom: 0.2rem;
								}
								.timevalidity:last-of-type {
									margin-bottom: 0.45rem;
								}
							}
						}
						.couponright {
							flex: 1;
							line-height: 1.2rem;
							text-align: center;
							font-size: 0.24rem;
							color: #ff4745;
							vertical-align: top;
							position: relative;
							.money {
								position: relative;
								bottom: 0.02rem;
								margin-right: 0.02rem;
							}
							.moneynum {
								font-size: 0.5rem;
							}
							a {
								position: absolute;
								left: 0;
								right: 0;
								bottom: 0.3rem;
								width: 1.5rem;
								height: 0.54rem;
								color: #fff;
								background: #ff4745;
								border-radius: 2px;
								line-height: 0.54rem;
								text-align: center;
								font-size: 0.28rem;
								margin: auto;
								display: block;
							}
							.tel {
								bottom: 0;
								top: 0;
							}
							div {
								position: absolute;
								right: -0.2rem;
								top: 0;
								bottom: 0;
								margin: auto;
								width: 1.28rem;
								height: 1.28rem;
								img {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}
			}
		}
		.popup {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 300;
			top: 0;
			left: 0;
			.popbg {
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.7;
			}
			.popbox {
				width: 9.17rem;
				height: 15.48rem;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: auto;
				background: url('../../../static/img/turnplatepop.png') top center no-repeat;
				background-size: 100%;
				text-align: center;
				p{
					width: 5rem;
					height: 4rem;
					margin: 0 auto;
					font-size: 0.64rem;
					color: #ffff11;
					position: absolute;
					top: 6.69rem;
					left: 2rem;
					z-index: 10000;
					b{
						font-size: 1rem;
					}
				}
			}
			.activityrule {
				width: 5.54rem;
				height: 6.32rem;
				position: absolute;
				top: 20%;
				left: 0;
				right: 0;
				margin: auto;
				background: url('../../../static/img/rulebg.png') top center no-repeat;
				background-size: 100%;
				.rulecnt {
					padding: 1.3rem 0.77rem 0;
					p {
						font-size: 0.24rem;
						line-height: 0.4rem;
						text-align: justify;
						color: #333333;
					}
					p:last-of-type {
						color: #ff4928;
					}
				}
			}
			.close {
				width: 0.5rem;
				height: 0.5rem;
				background: url('../../../static/img/close.png') top center no-repeat;
				background-size: 100%;
				position: absolute;
				top: 75%;
				left: 0;
				right: 0;
				margin: auto;
			}
		}
	}
</style>
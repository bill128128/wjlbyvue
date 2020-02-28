<template>
    <!-- 确认收获 -->
    <div id="makeSureOrder">
        <top :message="title"/>
        <div class="container">
            <!-- 商品信息 -->
            <div class="commodity_information">
                <div class="commodity">
                    <div class="goods">
                        <img :src="product.avatar" alt="商品缩略图">
                    </div>
                    <ul class="goods_info">
                        <li><span>{{product.price}}</span>招募积分<span>+{{product.score}}</span>&nbsp;<b v-if="info.type == 1">招募红利</b><b v-if="info.type == 2">消费红利</b></li>
                        <li>{{product.title}}</li>
                        <li>
                            <span>×{{info.count}}</span>
                            <span>包邮</span>
                        </li>
                    </ul>
                </div>
                <div class="total">
                    <span>合计金额：&nbsp;</span>
                    <span>{{totalscore}}&nbsp;</span>
                    <span v-if="info.type == 1">招募红利</span><span v-if="info.type == 2">消费红利</span>
                </div>
            </div>
            <div class="pay">
                <p>实付招募积分：<span>{{totalprice}}</span></p>
                <button class="submit" @click="doOrder">确认兑换</button>
            </div>
        </div>
        <transition name="fade">
	        <div class="payCover" v-show="payCoverShow" @click="hidePayCover">
	            <div class="payFrame" @click="payframe">
	                <div class="payCount">
	                    <h2>支付</h2>
	                    <h2>招募积分：<span>{{totalprice}}</span></h2>
	                    <h2><b v-if="info.type==1">招募红利</b><b v-if="info.type==2">消费红利</b>：<span>{{totalscore}}</span></h2>
	                </div>
	                <div class="payPwd">
	                    支付密码：
	                     <!--<input ref="pwd" type="password" maxlength="6" v-model="msg" class="realInput"/>-->
	                     <!--<div class="pwd-wrap" @click="focus">
	                     	<div class="item" v-for="i in 6">{{msg[i-1]}}</div>
	                        <input type="number" v-model="msg" maxlength="6" class="realInput" autofocus="autofocus" />
	                    </div>-->
	                    <div class="pwd-wrap">
					        <div class="item" v-for="i in 6">{{msg[i-1]}}</div>
					        <input v-model="msg" maxlength="6" type="password" autofocus="autofocus"/>
					    </div>
	                </div>
	                <button class="surePay" @click="payOrder">确认支付</button>
	            </div>
	        </div>
        </transition>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
	import threeLevelAddress from './region.json'
    import top from '../common/top'
    import foot from '../common/index'
    export default{
        data(){
            return{
            	pageindex:0,
                title:'线下自提',
                msgLength:0,
                msg:'',            
                info:{
                	count:0,//购买数量
                	id:0,//商品编号
                	type:0,//商品种类
	                self_lifting:2,//线上为1  线下为2
                },
                prodetail:{},//全部详情
                product:{},//商品详情
                totalprice:0,//总招募积分
                totalscore:0,//总红利
                payCoverShow:false,
                orderid:0,//订单编号                
            }
        },
        components:{
            top,foot
        },
        watch:{
            msg(curVal){
                if(/[^\d]/g.test(curVal)){
                this.msg = this.msg.replace(/[^\d]/g,'');
                }else{
                    this.msgLength = curVal.length;
                }
            },
        },
        created(){
            this.isOverdue();
        	this.info.count = window.localStorage.getItem('pcount');
        	this.info.id = window.localStorage.getItem('pid');
        	this.info.type = window.localStorage.getItem('ptype');
        	this.orderConfirm();
        	//this.getproFromJson();
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
        	showpassword(){
        		console.log(this.msg);
        	},
        	showPayCover(){
        		this.payCoverShow = true;
        	},
        	hidePayCover(){
        		this.payCoverShow = false;
        	},
        	payframe(event){
        		event.stopPropagation();
        		this.payCoverShow = true;
        	},
            focus(){
                this.$refs.pwd.focus();
            },
            orderConfirm(){
            	this.$store.dispatch('makesureOrder/getprodetail',this.info).then(()=>{
            		if(this.$store.state.makesureOrder.code == 200){
            			this.prodetail = this.$store.state.makesureOrder.product;           			           			
        				this.product = this.$store.state.makesureOrder.prode;
        				this.totalprice = parseFloat(this.product.price)* parseInt(this.info.count);
        				//console.log(this.totalprice);
        				this.totalscore = parseFloat(this.product.score)* parseInt(this.info.count);
            		}else{
            			this.$toast({
        					message: this.$store.state.makesureOrder.msg,
        				});
            		}
            	}).catch((e)=>{
	            		console.log(e);
	            	});
            },
            doOrder(){
            	this.$store.dispatch('makesureOrder/doDownLine',this.info).then(()=>{
            		if(this.$store.state.makesureOrder.docode == 200){
            			this.orderid = this.$store.state.makesureOrder.orderid;
            			//console.log(this.orderid);
            			this.$toast({
            				message:this.$store.state.makesureOrder.domsg,
            			});
            			this.payCoverShow = true;
            		}else{
            			this.$toast({
            				message:this.$store.state.makesureOrder.domsg,
            			});
            		}
            	}).catch((e) => {              
					  console.log(e);
				});
            },
            payOrder(){
            	this.$store.dispatch('makesureOrder/payOrder',[this.orderid,this.msg]).then((res)=>{
            		if(this.$store.state.makesureOrder.paycode == 200){
            			this.$toast({
            				message:this.$store.state.makesureOrder.paymsg,
            			});
            			window.localStorage.setItem('orderid',this.orderid);
            			setTimeout(()=>{
            				this.$router.push('/paySuccess');
            			},2000);
            		}else{
            			this.$toast({
            				message:this.$store.state.makesureOrder.paymsg,
            			});
            		}
            		this.msg='';
            	})
            }
        },
    }
</script>
<style scoped>
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
    /* 支付弹出窗口 */
    .payCover{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.7);
        z-index:99;
        overflow: hidden;
    }
    .payFrame{
        width:100%;
        height:12.2rem;
        background-color:#fff;
        border-radius: 0.13rem 0.13rem 0rem 0rem;
        z-index:10000;
        position: absolute;
        bottom:0;
        left:0;
    }
    .payCount{
        text-align:center;
        padding-top:1.2rem;
        border-bottom: 0.01rem solid  #e6e6e6;
    }
    .payCount h2{
        font-size:0.43rem;
        text-align:center;
        font-weight: normal;
        margin-bottom:0.4rem;
        color:#333;
    }
    .payCount h2 span{
        font-size:0.7rem;
        color:#ff5500;
    }
    .payCount h2 b{
    	font-weight: normal;
    }
    .payCount h2:last-child{margin-bottom:0.6rem;}
    .payPwd{
        padding:0.4rem;
        font-size:0.37rem;
        color:#333;
    }
    .realInput{
        position: absolute;
        z-index: 1;
        opacity: 0;
    }
    .pwd-wrap{
        width:7.57rem;
        height:1.28rem;
        line-height:1.28rem;
        padding-bottom: 1px;
        margin: 0.8rem auto;
        background: #fff;
        border:1px solid #ddd;
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        cursor: pointer;
        flex-wrap: nowrap;
    }


		.item {
		  flex-basis: 16.6%;
		  font-size: 1rem;
		  text-align: center;
		  line-height: 1.2rem;
		}
		.item:not(:last-of-type) {
		  border-right: 1px solid #ddd;
		}
		
		input {
		  position: absolute;
		  height: 1rem;
		  opacity: 0;
		  left: 0;
		  width: 6rem;
		}
    .pwd-wrap li{
        text-align: center;
        -webkit-box-flex: 1;
        flex: 1;
        -webkit-flex: 1;
        border-right:1px solid #ddd ;
    }
    .pwd-wrap li:last-child{border:0}
     /*.pwd-wrap li input{
        height:1rem;
        width: 1rem;
        border-radius:50% ;
        background: #000;
        display: inline-block;
        border: none;
        outline: none;
    }*/
    .surePay{
        width:4.27rem;
        height:1.07rem;
        line-height:1.07rem;
        background-color: #ffbb33;
        border-radius: 0.13rem;
        font-size:0.43rem;
        text-align:center;
        color:#fff;
        border:0;
        outline:0;
        display: block;
        margin:0 auto;
    }
    /* 确认订单 */
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
        color: #fefefe;
    }
    /* 收件人信息 */
    .info{
        width:100%;
        padding:0.53rem 0.4rem;
        background:url("../../../static/img/order_bg.png") no-repeat;
        background-size:cover;
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        margin:0.4rem auto 0.27rem;
    }
    .info_name{ font-size:0.37rem; margin-bottom:0.2rem;}
    .info_name span:last-child{ margin-left:0.8rem; }
    .address{
        font-size:0.32rem;
        line-height:0.48rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .address img{
        width:0.2rem;
        height:0.37rem;
        margin-left:0.4rem;
    }
    /* 商品信息 */
    .commodity_information{
        width:100%;
        padding:0.53rem .4rem;
        background-image: linear-gradient(-90deg, #384466 0%,#596487 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        margin-bottom:0.27rem;
    }
    .commodity{
        display:flex;
        border-bottom:1px solid  #313859;
        padding-bottom:0.4rem;
    }
    .goods img{
        width:1.97rem;
        height:1.97rem;
        margin-right:0.27rem;
    }
    .goods_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size:0.32rem;
        overflow: hidden;
    }
    .goods_info li:first-child{
        font-size:0.32rem;
        color:#7a7acc
    }
    .goods_info li:first-child span{
        font-size:0.43rem;
        color:#ffbb33;
    }
    .goods_info li:nth-child(2){
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .goods_info li:last-child{
        display:flex;
        justify-content: space-between;
    }
    /* 总计 */
    .total{
        margin:0.4rem 0 0;
        text-align:right;
        font-size:0.32rem;
    }
    .total span:nth-child(2){
        font-size:0.43rem;
        color:#ffbb33;
    }
    /* 确认兑换 */
    .pay{
        width:100%;
        padding:1rem 0;
        background-image: linear-gradient(-90deg,#384466 0%, #596487 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        text-align: center;
    }
    .pay p{
        font-size:0.43rem;
        text-align:center;
    }
    .pay p span{
        font-size:0.53rem;
        color:#ffbb33;
    }
    .submit{
        width: 3.2rem;
	    height: 0.96rem;
	    background-color: #ffbb33;
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        border:0;
        outline:0;
        margin:0.5rem auto 0;
        font-size: .43rem;
    }
</style>


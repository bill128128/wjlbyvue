<template>
    <!-- 确认收获 -->
    <div id="makeSureOrder">
        <top :message="title"/>
        <div class="container">
            <!-- 收件人信息 -->
            <div class="info" style="text-align:center;font-size:0.37rem;" v-show="!address_type" @click="goaddresslist">+&nbsp;添加收货地址</div>
            <div class="info"  @click="goaddresslist" v-show="address_type">
                <div class="info_name">
                    <span>收件人：</span>
                    <span>{{consignee}}</span>
                    <span>{{mobile}}</span>
                </div>
                <div class="address">
                    <span>收货地址：{{info.addressdetail}}</span>
                    <img src="../../../static/img/more.png" alt="more">
                </div>
            </div>
            <div class="pay">
                <!-- <p><b v-if="totalprice!=0">实付:&nbsp;招募积分:<span>{{totalprice}}</span>&nbsp;+</b>&nbsp;<b v-if="info.type == 1">招募红利</b><b v-if="info.type == 2">消费红利</b>:<span>{{totalscore}}</span></p> -->
                <template v-if='this.getProInfo.ptype == 1'>
                    <p>
                        <b>支付：{{this.getProInfo.total}}购物积分</b>
                    </p>
                    <button class="submit" @click="doOrder">确认</button>
                </template>
                <template v-if='this.getProInfo.ptype == 2'>
                    <p v-if='this.getProInfo.intType == 1'>
                        <!-- 支付：{{this.getProInfo.total/10*2}}购物券+{{this.getProInfo.total/10*2}}购物积分 -->
                        支付：{{this.getProInfo.total/10*2}}购物积分
                    </p>
                    <p v-if='this.getProInfo.intType == 2'>
                        支付：{{this.getProInfo.total/5*2}}复购积分
                    </p>
                    <button class="submit" @click="doWholeOrder">确认</button>
                </template>
                <template v-if='this.getProInfo.ptype == 3'>
                    <p>
                        <b>支付：{{this.getProInfo.total}}礼品积分</b> 
                    </p>
                    <button class="submit" @click='doGiftOrder'>确认支付</button>
                </template>
            </div> 
        </div>
        <transition name="fade">
	        <!-- <div class="payCover" v-show="payCoverShow" @click="hidePayCover">
	            <div class="payFrame" @click="payframe">
	                <div class="payCount">
	                    <h2>支付</h2>
                        <div class="count">
                            <h2 v-if="totalprice!=0">招募积分<span>{{totalprice}}</span></h2>&nbsp;&nbsp;+&nbsp;&nbsp;
	                        <h2><b v-if="info.type==1">招募红利</b><b v-if="info.type==2">消费红利</b><span>{{totalscore}}</span></h2>
                        </div>
	                </div>
	                <div class="payPwd">
	                    支付密码：
	                     <input ref="pwd" type="password" maxlength="6" v-model="msg" class="realInput"/>
	                     <div class="pwd-wrap" @click="focus">
	                     	<div class="item" v-for="i in 6">{{msg[i-1]}}</div>
	                        <input type="number" v-model="msg" maxlength="6" class="realInput" autofocus="autofocus" />
	                    </div>
	                    <div class="pwd-wrap">
					        <div class="item" v-for="i in 6">{{msg[i-1]}}</div>
					        <input v-model="msg" maxlength="6" type="password" autofocus="autofocus"/>
					    </div>
	                </div>
	                <button class="surePay" @click="payOrder">确认支付</button>
	            </div>
	        </div> -->
        </transition>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
	import threeLevelAddress from './region.json'
    import top from '../common/top'
    import foot from '../common/index'
    import axios from 'axios'
    import {api} from '../../constans/index.js'
    export default{
        data(){
            return{
            	pageindex:0,
                title:'确认订单',
                msgLength:0,
                msg:'',
                is_default:0,//是否默认  0不是  1是默认
                consignee:'',//收货人
                mobile:'',//电话
                provinceid:0,//接收省id
                cityid:0,//接收市id
                districtid:0,//接收区县id
                
                address:{},//地址对象
                pro:[],//省数组
                city:[],//市数组
                dis:[],//区县数组               
                info:{
                	count:0,//购买数量
                	id:0,//商品编号
                	type:0,//商品种类
                	addressid:0,//地址id
                	addressstr:'',//接收地址部分
                	proname:'',
	                cityname:'',
	                disname:'',
	                addressdetail:'',//地址详细信息
	                self_lifting:1,//线上为1  线下为2
					or_number:0
                },
                prodetail:{},//全部详情
                product:{},//商品详情
                totalprice:0,//总招募积分
                totalscore:0,//总红利
                payCoverShow:false,
                orderid:0,//订单编号   
                address_type:true,//是否有收货地址     
                getProInfo:'', // 从购物车页面带过来的参数  
                fromType:'', //从哪个商城过来的   
                isHaveAddress:1, 
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
        	// this.getaddresslist();  //获取默认收货地址
        	this.info.count = window.localStorage.getItem('pcount');
        	this.info.id = window.localStorage.getItem('pid');
        	this.info.type = window.localStorage.getItem('ptype');
        	// this.orderConfirm();
            //this.getproFromJson();
            this.backMacksureOrder(); //判断是否是从地址选择页面跳转回来的
            // 从购物车页面过来的
            this.fromShoppingCart();
            this.getaddresslist();
        },
        methods:{
            // 从购物车页面
            fromShoppingCart(){
                let ptype = window.localStorage.getItem('ptype');
                // console.log(ptype);
                switch(ptype){ //不同的商城
                    case '1' :
                        this.getProInfo = JSON.parse(window.sessionStorage.getItem('retailShoppingProduct'));
                        console.log(this.getProInfo);
                        break ;
                    case '2' :
                        this.getProInfo = JSON.parse(window.sessionStorage.getItem('wholeShoppingProduct'));
                        console.log(this.getProInfo);
                        break ;
                    case '3' :
                        this.getProInfo = JSON.parse(window.sessionStorage.getItem('giftShoppingProduct'));
                        console.log(this.getProInfo);
                        break ;
                }
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
            getaddresslist(){ //获取默认收货地址
            	this.$store.dispatch('defaddress/getdefaultaddress').then(()=>{
            		if(this.$store.state.defaddress.code == 200){
            			this.address = this.$store.state.defaddress.address;
            			this.provinceid = this.address.address.province;
            			this.cityid = this.address.address.city;
            			this.districtid = this.address.address.district;
            			this.info.addressstr = this.address.address.address;
            			this.mobile = this.address.address.mobile;
            			this.consignee = this.address.address.consignee;
            			this.info.addressid = this.address.address.id;
            			this.is_default = this.address.is_default;
            			this.info.proname = this.getproFromJson();
            			this.info.cityname = this.getcityFromJson();
            			this.info.disname = this.getdisFromJson();
            			//console.log(proname+cityname+disname);
            			this.info.addressdetail = this.info.proname+this.info.cityname+this.info.disname+this.info.addressstr;
            			//console.log(this.info.addressdetail);
            			window.localStorage.setItem('addressid',this.info.addressid);
            		}else{
            			this.$toast({
	            			message:this.$store.state.defaddress.msg,
	            		});
            		}
            	}).catch((e)=>{
                    // console.log(e);
                    this.$toast({message:'您没有填写收货地址'}) ;
                    this.isHaveAddress = 0 ; 
                });
            },
            getproFromJson(){           	
            	var pid = this.provinceid.toString();
            	var newArr = threeLevelAddress.filter(function(p){
					return p.id == pid;
				});
				this.pro = newArr[0].city;
				//console.log(newArr[0].name);
				return newArr[0].name;				
            },
            getcityFromJson(){
            	var cid = this.cityid.toString();
            	var cnewArr = this.pro.filter(function(c){
					return c.id == cid;
				});
				this.city = cnewArr[0].district;
				return cnewArr[0].name;
            },
            getdisFromJson(){
            	var did = this.districtid.toString();
            	var newArr = this.city.filter(function(p){
					return p.id == did;
				});
				return newArr[0].name;	
            },
            goaddresslist(){       //跳转添加收货地址列表页面
                window.sessionStorage.setItem("fromMakesureOrder",'1');  //从确认订单也跳转到收货地址页
                this.$router.push('/shop/shippingAddressList');
            },
            orderConfirm(){  
            	this.$store.dispatch('makesureOrder/getprodetail',this.info).then(()=>{
            		if(this.$store.state.makesureOrder.code == 200){
            			this.prodetail = this.$store.state.makesureOrder.product;           			
            			if(this.prodetail.address_type == 0){
                            this.address_type = false ;
                            // console.log("没有默认地址")                            
            			}else{
                            this.address_type = true ;
                            // console.log("有默认地址");                            
            			}
            			this.getaddresslist();
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
            doOrder(){  //零售商城 - 确认兑换
                // console.log('111');
                // console.log(this.info);
                if(this.isHaveAddress == 0){
                    this.$toast({message:'您没有填写收货地址'}) ;
                    return false ;
                }
                console.log(this.info,this.getProInfo) ;
            	this.$store.dispatch('shoppingCart/onlineBuy',[this.info,this.getProInfo]).then(()=>{
            		if(this.$store.state.shoppingCart.onlineBuy.code == 200){
                        window.sessionStorage.removeItem('retailShoppingProduct') ;
                        window.sessionStorage.removeItem('shoppingCartRetail') ;
            			this.orderid = this.$store.state.makesureOrder.orderid;
            			//console.log(this.orderid);
            			this.$toast({
            				message:this.$store.state.shoppingCart.onlineBuy.msg,
                        });
                        setTimeout(() => {
                            this.$router.replace('/');
                        },1000)
            			// this.payCoverShow = true;
            		}else{
            			this.$toast({
            				message:this.$store.state.shoppingCart.onlineBuy.msg,
            			});
            		}
            	}).catch((e) => {              
					  console.log(e);
				});
            },
            doWholeOrder(){  //批发商城 - 确认兑换
                this.$store.dispatch('shoppingCart/wholeOnlineBuy',[this.info,this.getProInfo]).then(()=>{
            		if(this.$store.state.shoppingCart.wholeOnlineBuy.code == 200){
                        window.sessionStorage.removeItem('wholeShoppingProduct') ;
                        window.sessionStorage.removeItem('shoppingCartWhole') ;
            			this.$toast({
            				message:this.$store.state.shoppingCart.wholeOnlineBuy.msg,
                        });
                        setTimeout(() => {
                            this.$router.replace('/');
                        },1000)
            		}else{
            			this.$toast({
            				message:this.$store.state.shoppingCart.wholeOnlineBuy.msg,
            			});
            		}
            	}).catch((e) => {              
					  console.log(e);
				});
            },
            doGiftOrder(){  //礼品商城 - 确认兑换
                if(this.isHaveAddress == 0){
                    this.$toast({message:'您没有填写收货地址'}) ;
                    return false ;
                }
                this.$indicator.open('下单中') ;
                let token = window.localStorage.getItem('date') ;
                this.$axios.post(api + '/finance/Giftpay/PlaceOrder',{
                    accessToken:token,
                    id:this.getProInfo.pid,
                    type:this.getProInfo.ptype,
                    number:this.getProInfo.stringPnumber,
                    address_id:this.info.addressid,
                    strProvince:this.info.proname,
                    strCity:this.info.cityname,
                    strDistrict:this.info.disname,
                    strTwon:this.info.addressstr,
                    self_lifting:this.info.self_lifting,
					or_number:this.getProInfo.moduleCount,
                }).then(res => {
                    this.$indicator.close() ;
                    console.log(res.data) ;
                    if(res.data.code == 200){
                        window.sessionStorage.removeItem('shoppingCartGift') ;
                        window.sessionStorage.removeItem('giftShoppingProduct') ;
                        setTimeout(() => {
                            this.$router.replace('/');
                        },1000)
                    }
                    this.$toast({message:res.data.msg}) ;
                }).catch(e => {
                    console.log(e) ;
                })
            },
            payOrder(){
                // console.log('222');
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
            },
            backMacksureOrder(){   //判断是否是从选择地址页面返回
                if(window.sessionStorage.getItem("fromShippingAddress") == 1){  //是从添加地址页面跳回的
                    // console.log("yes");
                    this.address_type = true ;
                }else{
                    // console.log("no");
                }
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
        height:10.2rem;
        background-color:#fff;
        border-radius: 0.13rem 0.13rem 0rem 0rem;
        z-index:10000;
        position: absolute;
        bottom:0;
        left:0;
    }
    .payCount{
        text-align:center;
        padding:0.8rem 0;
        border-bottom: 0.01rem solid  #e6e6e6;
    }
    .payCount .count{
        display:flex;
        justify-content: center;
        align-items: center;
        padding-top:0.2rem;
    }
    .payCount h2{
        font-size:0.43rem;
        text-align:center;
        font-weight: normal;
        color:#333;
    }
    .payCount h2 span{
        font-size:0.7rem;
        color:#ff5500;
    }
    .payCount h2 b{
    	font-weight: normal;
    }
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
    .total span:nth-child(4){
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
    .pay b{
    	font-weight: normal;
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


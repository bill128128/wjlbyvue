<template>
    <div id="personalPage">
        <div class="personal">
            <header>个人中心</header>
            <div class="container">
                 <!-- 姓名和等级 -->
                <div class="personal_info">
                    <span><img :src="allData.avatar" alt=""></span>
                    <ul class="name">
                        <li>{{allData.nickname}}</li>
                        <li>
                            <img :src="allData.gradeImg" alt="">
                            <span>{{allData.member_grade}}</span>
                            <span>(用户编号：{{allData.number}})</span>
                        </li>
                        <li>
                            
                        </li>
                    </ul>
                </div>
                <!-- 直推奖 -->
                <ul class="straight_push_prize">
                    <li>
                        <p class="count">{{allData.memberSum}}</p>
                        <p>今日推荐人数</p>
                    </li>
                    <!-- <li>
                        <p class="count">{{allData.tody_sum}}</p>
                        <p>今日直推奖</p>
                    </li>
                    <li>
                        <p class="count">{{allData.cast_money}}</p>
                        <p>今日最高奖励值</p>
                    </li> -->
                </ul>
                <!-- 可用积分、掌聚宝等 -->
                <main class="main_available">
                    <!-- <div class="item">
                        <div class="count">{{allData.frozen_score}}</div>
                        <h3>招募积分</h3>
                        <router-link to="/recruitScoreList">
                            <button class="recruitScoreList">明细</button>
                        </router-link>
                    </div> -->
                    <!-- <div class="item">
                        <div class="count">{{allData.release_score}}</div>
                        <h3>可用掌聚宝</h3>
                    </div>
                    <div class="item">
                        <div class="count">{{allData.lease_score}}</div>
                        <h3>租赁积分</h3>
                    </div> -->
                    <div class="item">
                        <div class="count">{{allData.shop_int}}</div>
                        <h3>购物积分</h3>
                        <button class="recruitScoreList" @click='toMemberPoint'>拨分</button>
                    </div>
                    <div class="item">
                        <div class="count">{{allData.shop_coupon}}</div>
                        <h3>购物券</h3>
                    </div>
                    <div class="item">
                        <div class="count">{{allData.comm_int}}</div>
                        <h3>佣金积分</h3>
                        <router-link to="/extractCash">
                            <button class="recruitScoreList">提现</button>
                        </router-link>
                    </div>
                </main>
                <main class="main_available">
                    <div class="item">
                        <div class="count">{{allData.repeat_int}}</div>
                        <h3>复购积分</h3>
                        <router-link to="/extractCash">
                            <!-- <button class="recruitScoreList">提现</button> -->
                        </router-link>
                    </div>
                    <div class="item">
                        <div class="count">{{allData.gift_int}}</div>
                        <h3>礼品积分</h3>
                    </div>
                    <div class="item">
                        <div class="count">{{allData.success_money}}</div>
                        <h3>提现成功总额</h3>
                    </div>
                </main>
                <!-- <main class="main_availables">
                	<div class="top">
                		<div class="item">
	                        <div class="count">{{allData.be_money_score}}</div>
	                        <h3>掌聚宝</h3>
	                    </div>
	                    <div class="item">
	                        <div class="count">{{allData.money_score}}</div>
	                        <h3>提现掌聚宝</h3>
	                    </div>
	                    <div class="item">
	                        <div class="count">{{allData.success_money}}</div>
	                        <h3>成功提现掌聚宝</h3>
	                    </div>
                	</div>
                    <div class="bottom" @click="goToSrc('/extractCash')">提现</div>
                </main> -->
                <!-- 红利 -->
                <!-- <ul class="dividend">
                    <li class="dividend_item">
                        <h3>消费红利</h3>
                        <p>{{allData.purchase_score}}</p>
                        <button @click="openShop">兑换</button>
                    </li>
                    <li class="dividend_item">
                        <h3>招募红利</h3>
                        <p>{{allData.blush_score}}</p>
                        <button @click="openShop">兑换</button>
                    </li>
                </ul> -->
                <!-- 我的所有功能 -->
                <ul class="my_function">
                    <!-- <router-link to='/myPartner'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_mytead.png" alt="我的伙伴" class="icon">
                                <span>我的伙伴</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link> -->
                    <router-link to='/QRCode'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_code.png" alt="我的二维码" class="icon">
                                <span>我的二维码</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to='/myCode'>
                        <li>
                            <div>
                                <img src="../../../static/img/zjbreturn_icon.png" alt="我的code码" class="icon">
                                <span>我的复投码</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <li @click='gotoRecord(1)'>
                        <div>
                            <img src="../../../static/img/icon_conversion_record.png" alt="兑换记录" class="icon">
                            <span>零售商城记录</span>
                        </div>
                        <div>
                            <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                        </div>
                    </li>
                    <li @click='gotoRecord(2)'>
                        <div>
                            <img src="../../../static/img/icon_conversion_record.png" alt="兑换记录" class="icon">
                            <span>批发商城记录</span>
                        </div>
                        <div>
                            <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                        </div>
                    </li>
                    <li @click='gotoRecord(3)'>
                        <div>
                            <img src="../../../static/img/icon_conversion_record.png" alt="兑换记录" class="icon">
                            <span>积分商城记录</span>
                        </div>
                        <div>
                            <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                        </div>
                    </li>
                    <router-link to="/shop/shippingAddressList">
                        <li>
                            <div>
                                <img src="../../../static/img/icon_address.png" alt="收货地址" class="icon">
                                <span>收货地址</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to="/myCard">
                        <li>
                            <div>
                                <img src="../../../static/img/bankcard.png" alt="收货地址" class="icon">
                                <span>我的银行卡</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to="/line">
                        <li>
                            <div>
                                <img src="../../../static/img/xjb.png" alt="收货地址" class="icon">
                                <span>我的排线图</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to='/managerList'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_contact.png" alt="管理奖列表" class="icon">
                                <span>管理奖列表</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to='/changePwd'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_repsd.png" alt="修改密码" class="icon">
                                <span>修改密码</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <router-link to='/phoneCertify'>
                        <li>
                            <div>
                                <img src="../../../static/img/modifyPwd_icon.png" alt="找回交易密码" class="icon">
                                <span>找回交易密码</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link>
                    <!-- <router-link to='/uploadDocument'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_contact.png" alt="上传充值凭证" class="icon">
                                <span>上传充值凭证</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link> -->
                    <!-- <router-link to='/addContactWay'>
                        <li>
                            <div>
                                <img src="../../../static/img/icon_contact.png" alt="联系方式" class="icon">
                                <span>联系方式</span>
                            </div>
                            <div>
                                <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                            </div>
                        </li>
                    </router-link> -->
                    <!-- <li @click="help">
                        <div>
                            <img src="../../../static/img/icon_code.png" alt="联系客服" class="icon">
                            <span>联系客服</span>
                        </div>
                        <div>
                            <img src="../../../static/img/more.png" alt="more" class="icon_more ">  
                        </div>
                    </li> -->
                </ul>
                <!-- 退出登录 -->
                <div style="text-align:center;">
                    <button class="exit" @click="quit">退出登录</button>
                </div>
            </div>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
    import top from '../common/top'
    import foot from '../common/index'
    import { MessageBox } from 'mint-ui'
    export default{
        data(){
            return{
                title:'个人中心',
                pageindex:2,
                allData:'',
            }
        },
        components:{
           foot
        },
        created(){
            this.isOverdue(); //测试是否过期
            this.allData = "" ;
            this.getInfo();
            let mobile = window.localStorage.getItem("is_mobile");
            let problem = window.localStorage.getItem("is_problem");
            if(mobile == 0 || problem == 0 ){                    
                this.$toast({message:'您未设置个人信息，请先重新登录设置您的用户信息'});
                this.cancleForce();
                setTimeout(()=>{
                	 this.$router.push('/login');
                },2000)
               
            }
        },
        methods:{
            toMemberPoint(){  //去管理员拨分页面
                let isAdmin = window.localStorage.getItem('is_points') ;  //判断是否是管理员
                if(Number(isAdmin)){
                    this.$router.push({path:'/memberPoint',query:{userInfo:JSON.stringify(this.allData)}}) ;
                }else{
                    // this.$toast({message:'您没有给下级拨分的权限'})
                    this.$messagebox.alert('您没有给下级拨分的权限');
                }
            },
            gotoRecord(type){  //去看购物记录
                window.localStorage.setItem('shopType',type);
                this.$router.push('/shop/conversionRecord') ;
            },
            getInfo(){  //获取用户信息
                this.$store.dispatch('personal/personalInfo').then(()=>{
                    if(this.$store.state.personal.personalcode == 200){
                        this.allData = this.$store.state.personal.personalData; 
                        // console.log(this.allData);
                    }else{
                        this.$toast({
                            message:this.$store.state.personal.personalmsg,
                        });
                    }
                }).catch((e) => {              
                        
                });
            },
        	quit(){  //退出登录
    			MessageBox.confirm('',{
				  title: '温馨提示',
				  message: '确定退出登录吗?',
				  showCancelButton: true
				}).then(action=>{
					if(action=='confirm'){
						this.cancle();
						this.$router.push('/login');
					}
				}).catch(err=>{
					
					}
				);
           },
            help(){
            	window.location.href='http://p.qiao.baidu.com/cps/chat?siteId=12509258&userId=26304880';
            },
            goToSrc(src){
                this.$router.push(src);
            },
            openShop(){
                this.$router.push('/shop/index');
            },
            cancle(){
            	this.$store.dispatch('cancle/cancle').then(()=>{
            		if(this.$store.state.cancle.code == 200){
            			window.localStorage.removeItem('date');
            			this.$toast({
            				message:this.$store.state.cancle.msg,
            			});
            		}else{
            			this.$toast({
            				message:this.$store.state.cancle.msg,
            			});
            		}
            	}).catch((e)=> {
					console.log("error");
				})
            },
            cancleForce(){//强制退出设置密保问题
            	this.$store.dispatch('cancle/cancle').then(()=>{
            		if(this.$store.state.cancle.code == 200){
            			window.localStorage.removeItem('date');
            			
            		}else{
            			this.$toast({
            				message:this.$store.state.cancle.msg,
            			});
            		}
            	}).catch((e)=> {
					console.log("error");
				})
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
			}
        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    [v-cloak] {
            display: none !important;
        }
    #personalPage{color:#fff;}
    .personal{
        width:100%;
        height:6.9rem;
        background:url("../../../static/img/personal_info_bg.png") no-repeat;
        background-size:cover;
        position: absolute;
        top:0;
    }
    header{
        width:100%;
        height:1.4rem;
        line-height:1.4rem;
        text-align:center;
        font-size:0.45rem;
        position:fixed;
        top:0;
        left:0;
        background:url("../../../static/img/person_bg.png") no-repeat;
        background-size:cover;
        z-index:1000;
    }
    .personal_info{
        display: flex;
        /* margin:0rem 0 0.6rem 1.3rem; */
    }
    .personal_info>span>img{
        width:1.6rem;
        height:1.6rem;
        margin-right:0.4rem;
        border-radius: 0.13rem;
    }
    .personal_info .name{
        height:100%;
    }
    .personal_info .name li{ height:0.8rem; line-height:0.8rem; }
    .personal_info .name li:first-child{ font-size:0.5rem;}
    .personal_info .name img{
        width:0.53rem;
        height:0.53rem;
    }
    .personal_info .name li:last-child{
        display: flex;
        align-items: center;
    }
    .personal_info .name li:last-child span{
         font-size:0.37rem;
        line-height:0.8rem;
        color: #313859;
        margin-left:0.16rem;
    }
    /* 直推奖 */
    .straight_push_prize{
        display: flex;
        width:100%;
        justify-content: space-around;
        text-align:center;
        color: #fefefe;
        font-size:0.32rem;
    }
    .straight_push_prize li .count{
        font-size:0.43rem;
        color: #ffbb33;
        margin-bottom:0.1rem;
    }
    /* 可用积分、掌聚宝等 */
    .main_available{ height:2.8rem; }
    .main_available .count{ margin:0.5rem auto 0.15rem; font-size: .5rem;}
    .main_available .item{ width:33.33%; }
    .main_availables{ height:2.8rem; }
    .main_availables .top .count{ margin:0.5rem auto 0.15rem; font-size: .5rem;}
    .main_availables .top .item{ width:33.33%; }
    .main_availables{
    width:9.2rem;
    height:3.4rem;
    margin:0.4rem auto;
    background:url(../../../static/img/xjbmx.png) no-repeat;
    background-size:cover;
   
    border-radius: 0.13rem;
}
.main_availables .top{
	 display: flex;
}
.main_availables .bottom{
	 width: 1.87rem;
	 height: 0.64rem;
	 margin: 0 auto;
	 text-align: center;
	 line-height: 0.64rem;
	 font-size: 0.32rem;
	 color: #fff;
	 background: #ff5500;
	 margin-top: 0.6rem;
	 border-radius: 0.13rem;
}
.main_availables .top .item{text-align:center;}
.main_availables .top .count{
    font-size:0.47rem;
    color:#ff5500;
    margin:0.5rem auto 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.main_availables .top .count1{
    font-size:0.47rem;
    color:#fff;
    margin:1rem auto 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.main_availables .top h3{
    color:#fefefe;
    font-size:0.32rem;
}
    /* 红利:消费红利+招募红利 */
    .container{margin-top:.5rem;overflow: hidden;}
    .dividend{
        width:9.5rem;
        display: flex;
    }
    .dividend_item{
        width:4.45rem;
        height:3rem;;
        margin-right:0.3rem;
        background-size:cover;
        box-sizing: border-box;
        padding:0.4rem;
        font-size:0.32rem;
    }
    .dividend_item:first-child{
        background:url("../../../static/img/personal_bg1.png") no-repeat;
        background-size:cover;
    }
    .dividend_item:last-child{
        background:url("../../../static/img/personal_bg2.png") no-repeat;
        background-size:cover;
    }
    .dividend_item p{
        font-size:0.64rem;
        margin:0.1rem 0;
        text-align:center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .dividend_item button{
        width: 1.87rem;
	    height: 0.64rem;
	    background-color: #ffbb33;
        border-radius: 0.08rem;
        border:0;
        outline:0;
        margin-left:0.89rem;
    }
    /* 我的所有功能 */
    .my_function li{
        width:100%;
        height:1.6rem;
        box-sizing: border-box;
        background-image: linear-gradient(90deg,#596487 0%,#384466 100%);
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        margin-top:0.27rem;
        padding:0 0.4rem;
        display: flex;
        align-items: center;
        font-size:0.37rem;
        justify-content: space-between;
    }
    .my_function .icon{
        width:0.75rem;
        height:0.75rem;
    }
    .my_function .icon_more{
        width:0.2rem;
    }
    .my_function a{
    	color: #fff !important;
    }
    /* 退出登录 */
    .exit{
        width: 8.4rem;
        height: 1.07rem;
        line-height:1.07rem;
	    background-color: #ffbb33;
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        font-size:0.43rem;
        text-align:center;
        margin:0.8rem auto ;
    }
    .recruitScoreList{
        color:#fff;
        padding:0.05rem 0.2rem;
        background-color:#ffbb33;
        font-size:0.32rem;
        border-radius: 0.1rem;
        margin-top:0.2rem;
    }
</style>


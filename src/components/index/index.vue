<template>
    <div id="index">
        <!-- 1:top -->
        <div class="top">
			{{title}}			
		</div>
		<!-- 2:轮播图 -->  
        <div class="mySwiper w100">
            <div class="swipe-wrapper ">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in banner" :key='index'>
                            <img :src="item.avatar" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">                  	
            <!-- 3:function -->
            <div class="functions bx">
                <!-- 3.1列表icon -->
                <ul class="menu_list">
                    <ul>
                        <!-- <li @click="checkgologin('/addpartner',0)">
                            <img src="../../../static/img/add_partner_icon.png" alt="添加伙伴">
                            <h4>招募伙伴</h4>
                        </li> -->
                        <!-- <li @click="checkgologin('/conversionAssets',0)">
                            <img src="../../../static/img/transfer_assets.png" alt="互转资产">
                            <h4>互转资产</h4>
                        </li> -->
                        <!-- <li @click="checkgologin('/subscribeJZB',0)">
                            <img src="../../../static/img/transfer_zjb_icon.png" alt="认购掌聚宝">
                            <h4>我要认购</h4>
                        </li> -->
                        <!-- <li @click="checkgologin('/recruit',0)">
                            <img src="../../../static/img/recruiting_icon.png" alt="我要招募">
                            <h4>我要续购</h4>
                        </li> -->
                    </ul>
                    <ul>
                        <!-- <li @click="checkgologin('/shop/index',1)">
                            <img src="../../../static/img/exchange_icon.png" alt="我要兑换">
                            <h4>我要兑换</h4>
                        </li>
                        <li @click="checkgologin('/turnplate',0)">
                            <img src="../../../static/img/activity_icon.png" alt="活动">
                            <h4>活动</h4>
                        </li> -->
                        <li @click="checkgologin('/retailShop/index',1)">
                            <img src="../../../static/img/activity_icon.png" alt="零售商城">
                            <h4>零售商城</h4>
                        </li>
                        <li  @click="checkgologin('/wholesaleShop/index',1)">
                            <img src="../../../static/img/exchange_icon.png" alt="批发商城">
                            <h4>批发商城</h4>
                        </li>
                        <li @click="checkgologin('/giftShop/index',1)">
                            <img src="../../../static/img/transfer_zjb_icon.png" alt="礼品商城">
                            <h4>礼品商城</h4>
                        </li>   
                        <li @click="checkgologin('/personalPage',0)">
                            <img src="../../../static/img/transfer_assets.png" alt="个人中心">
                            <h4>个人中心</h4>
                        </li>
                        <!-- <li @click="checkgologin('/knowAboutUs',1)">
                            <img src="../../../static/img/knowabout_us_icon.png" alt="了解我们">
                            <h4>了解我们</h4>
                        </li>                         -->
                    </ul>
                </ul>
                <!-- 3.2广告图 -->
                <div class="advertising">
                    <!-- <router-link :to="activity.click_url"> -->
                        <img :src="activity.avatar" :alt="activity.title">
                    <!-- </router-link> -->
                </div>
            </div>
            <!-- 4:公告 -->
            <div class="announcement">
                <h3>
                    <span>新闻</span>
                    <span><router-link to="/noticeList">更多></router-link></span>
                </h3>
                <ul class="announcement_list">
                    <li v-for="(item,index) in announcementList" v-bind:key="index">
                        <div @click="goToSrc(item)" class="content">{{item.title}}</div>
                        <div class="time">{{item.create_time}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 5:footer -->
        <footer class="wd100">
            <ul class="footer_list">
                <li class="active">
                    <img src="../../../static/img/footer_index_icon_active.png">
                    <h4>首页</h4>
                </li>
                <!-- <li @click="checkgologin('/transaction/index',0)">
                        <img src="../../../static/img/footer_trade_icon.png">
                        <h4>交易</h4>
                </li> -->
                <!-- <li @click="checkgologin('/personalPage',0)">
                    <img src="../../../static/img/footer_my_icon.png">
                    <h4>我的</h4>
                </li> -->
            </ul>
        </footer>
        <!--活动遮罩层 -->
        <!--<transition name="slide-fade">
        	<div class="activityCover" v-if="activityShow" @touchmove.prevent >       	
	        	<div class="fade">
	        		<div class="activityFrame" @click="checkgologin('/turnplate',0)">
		        		<img src="../../../static/img/activity.png">
		        	</div>
		        	<div class="line"></div>
		        	<div class="close" @click="close">
		        		<img src="../../../static/img/close.png">
		        	</div>
	        	</div>        	
        	</div>
        </transition>-->
    </div>
</template>

<script>
    import top from "../common/top"
    import Swiper from 'swiper'
    import { MessageBox } from 'mint-ui';
    export default{
        name:'index',
        components:{
    	    top
        },
        data(){
            return{
                title:'首页',
                pageindex:0,
                activityShow:false,
                count:0,
            }
        },
        computed:{
        	//banner图数组
            banner(){
            	return this.$store.state.home.banner;
            },
            //公告数组
            announcementList(){
            	return this.$store.state.home.notice;
            },
            //广告数组
            activity(){
            	return this.$store.state.home.activity;
            }
        },
        created(){
                
//             if(JSON.parse(localStorage.getItem('messagebox')) == "" || JSON.parse(localStorage.getItem('messagebox')) == null){
//                 this.$messagebox({
// 	                title: '温馨提示：系统升级为2.0版本',
// 	                message: '更新内容：更换标题名词、添加首页模块、交易模块、添加联系方式等，详细内容请看首页新闻列表。',
//                 })
//             }
//             localStorage.setItem('messagebox','200');		

//				if(window.localStorage.getItem('activityid') == "" || window.localStorage.getItem('activityid') == null || window.localStorage.getItem('activityid') == undefined){
//					this.activityShow = true;
//					window.localStorage.setItem('activityid',200);
//				}else{
//					this.activityShow = false;
//				}
				//this.getpersoninfo();			
        	//页面加载完毕调用接口函数
        	this.$store.dispatch('home/home').then(()=>{       		
        		if(this.$store.state.home.homecode==200){
        			this.$nextTick(function(){
            				var mySwiper = new Swiper ('.swiper-container', {
							    direction: 'horizontal',
				                loop: true,
				                speed:500,
				                autoplay: true,
				                delay:3000,
				                slidesPerView: "auto",
				                centeredSlides:true,
				                spaceBetween: 10,
							    // 如果需要分页器
							    pagination: {
							        el: '.swiper-pagination',
							        clickable: true,							        
							    },							    
							});							
            		});
            		
				}else{
					this.$toast({
						message:this.$store.state.home.homemsg,
					});
				}
			}).catch((e) => {              
                //console.log(e);
            });
        },
        methods:{
        	close(){
        		this.activityShow = false;
        	},
        	goToSrc(item){
                this.$router.push({name:'notice',params:{id:item.id}});
                window.localStorage.setItem('noticeid',item.id);
            },
            changeIndex(index){
                this.footerIndexNum = index ;
                for(let i =0 ; i < this.footer_list.length ; i ++){
                    this.footer_list[i].active = false;
                }
                this.footer_list[index].active = true ;
            },
            //点击进入首页
            goindex(){
            	this.$router.push('/index/index');
            },
            //封装判断是否登录
            checkgologin(uri,type){
                if(type == 0){   //type为0，不登陆不可以打开页面
                    this.$store.dispatch('isLogin/isLogin').then(() => {
                        if(this.$store.state.isLogin.code == 40000){
                            this.$toast({
                                message:this.$store.state.isLogin.msg
                            });
                            setTimeout(() => {
                                this.$router.push('/login');
                            },1000)
                            window.localStorage.removeItem("date");
                        }else if(this.$store.state.isLogin.code == 200){
                            this.$router.push(uri);
                        }
                    })
                }else if(type == 1){ //type==1不登陆也可以打开页面
                    this.$router.push(uri);
                }
            },
//          getpersoninfo(){           	
//				this.$store.dispatch('turnplate/getpersoninfo').then(()=>{
//					if(this.$store.state.turnplate.pcode == 200){
//						this.count = this.$store.state.turnplate.presult.number;
//					}else{
//						this.$toast({
//							message:this.$store.state.turnplate.pmsg,
//						});
//					}
//				}).catch((e) => {              
//					//console.log(e);
//				});
//			},
        }
    }
</script>
<style scoped>
    @import "../../../static/css/common";
    #index{
    	width: 10rem;
        overflow-x: hidden; 
        margin:0 auto ;
    }
    .activityCover{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.7);
        z-index:99;
        overflow: auto;
    }
    .activityFrame{
    	width: 8rem;
    	height: 8rem;
    	position: absolute;
    	left: 50%;
    	top:50%;
    	margin-left: -4rem;
    	margin-top: -6rem;
    }
    .line{
    	width: 1px;
    	height: 1rem;
    	background-color: #fff;
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	margin-top: 2rem;
    	opacity: 0.5;
    }
    .close{
    	width: 1rem;
    	height: 1rem;
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	margin-left: -0.5rem;
    	margin-top: 3rem;
    }
    .slide-fade-enter-active {
	    transition: all .3s ease;
	}
	.slide-fade-leave-active {
	    transition: all .3s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	    transform: translateY(-10rem);
	    opacity: 0;
	}
    .top {
		position: fixed;
        top: 0;
        left:0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    background:url("../../../static/img/index-header-bg.png") no-repeat;
	    background-size:cover;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 88;
	}
    #index{color:#fff;}
    .w100{ width:100%; position: relative; top: 1.6rem; margin-bottom: 0.2rem;}
    .wd100{ width:100%;}
    h1,h2,h3,h4,h5,h6{ font-weight:normal; }
    .container{
    	/*position: relative;
        top: 1.4rem;*/
        /* overflow-y:scroll;
        -webkit-overflow-scrolling:touch; */
    }
    /* 2:轮播图 */
   .swiper-container {
	    width: 100%;
	    height: 4.67rem;
	    overflow: visible!important;
	}
	.swiper-container .swiper-wrapper .swiper-slide{ width: 8.4rem;}
	.swiper-container .swiper-wrapper .swiper-slide img{width: 100%; height: 4.67rem;}
	.swiper-container .swiper-wrapper .swiper-slide-prev{ margin-top: 0.46rem; height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-prev img{ height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-next{ margin-top: 0.46rem; height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-next img{ height: 3.75rem!important;}
	.swiper-container .swiper-wrapper .swiper-slide-active{ width: 8.4rem;}
    .swipe-wrapper{
        width: 100%;
        height: 4.67rem;
    }
    .swipe-wrapper{ height: 4.67rem; }
    .swipe-wrapper img{
        width:100%;
        height:100%;
    }
    .mint-swipe-item.swip-item-1.item{
        padding:0 0.2rem;
    }
    /* 3:function */
    .functions{
        width:9.2rem;
        margin:0.4rem auto 0.53rem;
        box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        background-color: #384466;
        overflow: hidden;
        padding:0.53rem;
    }
    /* 3.1功能列表 */
    .menu_list>ul{
        display: flex;
    }
    .menu_list>ul:first-child{
        justify-content: space-between;
    }
    .menu_list>ul:nth-child(2){
        width:50%;
        justify-content: space-between;
    }
    .menu_list{
        width:8.6rem;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
    .menu_list li{
        margin:0 0.44rem 0.53rem 0;
        text-align:center;
    }
    .menu_list a{
    	color: #fff;
    }
    .menu_list li img{
        width:1.7rem;
        height:1.7rem;
    }
    .menu_list h4{
        font-size:0.32rem;
        line-height:0.4rem;
    }
    /* 3.2:广告图 */
    .advertising img{
        width:8.4rem;
        height:2.13rem;
        margin:0 atuo;
    }
    /* 4:公告列表 */
    .announcement{
        width:9.2rem;
        box-sizing: border-box;
        margin:0 auto;
    }
    .announcement h3{
        display: flex;
        justify-content: space-between;
        font-size:0.4rem;
    }
    .announcement h3 span a{
        font-size:0.37rem;
        color: #7a7acc;
        font-size:0.37rem;
    }
    .announcement_list{
        margin:0.39rem auto;
        
    }
    .announcement_list a{
    	color: #fff;
        margin:0.39rem auto 1rem;
    }
    .announcement_list li{
        width:100%;
        box-sizing: border-box;
        padding:0.53rem 0.4rem;
        background-image: linear-gradient(90deg,#596487 0%, #384466 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        margin-bottom:0.27rem;
    }
    .content{
        font-size:0.37rem;
        line-height:0.8rem;
    }
    .time{
        font-size:0.32rem;
        color:#999;
        text-align: right;
    }
	footer{
		width: 100%;
        height:1.3rem;
        position: fixed;
        bottom:0;
        left:0;
        background-color: #313859;
	    box-shadow: 0 -0.01rem 0.03rem 0 rgba(255, 255, 255, 0.4);
    }
    .footer_list{
        height:100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .footer_list img{
        width:0.6rem;
        height:0.6rem;
    }
    .footer_list h4{
        font-size:0.27rem;
        text-align:center;
        color:#7a7acc;
    }
    .footer_list li.active h4{
        color:#fff;
    }
    
</style>

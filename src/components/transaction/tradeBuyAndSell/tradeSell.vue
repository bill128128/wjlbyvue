<template>
    <div id="tradeSell">
        <div class="container">
            <!-- 表单 -->
            <form action="" class="form">
                <div class="value">最新价：<span>{{new_price}}</span></div>
                <label for="" class="count_input">
                    <span @click="countSubtract">-</span>
                    <input type="number" placeholder="卖出量" v-model="info.sellCount" id="count">
                    <span @click="countAdd">+</span>
                </label>
                <!--<label for="">服务费：<span>{{service}}</span></label>-->
                <div class="tip">
                	共扣除您<span>{{info.sellCount}}</span>的掌聚宝积分。
                </div>
                <div class="selected">
                    <div class="placeholder" @click="showContactMenu">联系方式：<span>{{info.selectWayText}}</span></div>
                    <span class="icon">
                        <img src="../../../../static/img/down.png" v-show="!isShowContactMenu">
                        <img src="../../../../static/img/up.png" v-show="isShowContactMenu">
                    </span>
                    <ul class="select_menu" v-show="isShowContactMenu">
                        <li v-for="(item,index) in contactWay" :key="index" @click="selectWay(index)">{{item.way}}:{{item.count}}</li>
                    </ul>
                </div>	
                <div class="tip">联系方式，方便购买委托用户与您联系。</div>
                <div class="tc"><button @click="sell" type="" class="submit" value="卖出">卖出</button></div>
            </form>	
            <div class="trade_list" :class="{min_height:isShowTradeListActive}">
                <h3>
                    <span>挂卖记录</span>
                    <span>
                        <span @click="showTradeListActive">{{tradeListActive}}</span>
                        <span class="triangle" v-show="isShowTradeListActive"></span>
                        <img src="../../../../static/img/upicon.png" alt="up" v-show="isShowTradeListActive">
                        <img src="../../../../static/img/downicon.png" alt="down" v-show="!isShowTradeListActive">
                        <ul class="all_active_menu" v-show="isShowTradeListActive">
                            <li v-for="(item,index) in allActiveMenu" :key='index' @click="changeTradeActive(index),tabChange('select' + (index + 1))">
                                <span>{{item.text}}</span>
                                <span :class="{active:item.activeStatus == true}"></span>
                            </li>
                        </ul>
                    </span>
                </h3>
                <!-- <keep-alive> 
			        <component v-bind:is="tabView"></component>
			    </keep-alive> -->
                <!-- 挂卖记录 -->
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
	                <ul class="trade_list_menu">
	                    <li class="item" v-for="(item,index) in list" :key="index" >
	                        <ul class="infomation">
	                            <li>
	                                <p class="count">{{item.code}}</p>
	                                <p class="text">代码</p>
	                            </li>
	                            <li>
	                                <p class="count">{{item.business}}</p>
	                                <p class="text">委托人</p>
	                            </li>
	                            <li>
	                                <p class="count">{{item.open_price}}</p>
	                                <p class="text">开盘价</p>
	                            </li>
	                            <li>
	                                <p class="count">{{item.total}}</p>
	                                <p class="text">挂卖数量</p>
	                            </li>
	                        </ul>
	                        <div class="trade_time">
	                            <div>
	                                <span class="time">{{item.time}}</span>
	                            </div>
	                            <ul class="buttons">
	                                <li class="bg" v-show="item.status == 1" @click="clickComplete(item.out_id)">成交</li>
	                                <li class="bg" v-show="item.status == 1" @click="clickReject(item.out_id)">驳回</li>
	                                <li class="bg" v-show="item.status == 4" @click="clickWidthdraw(item.out_id,item.status)">撤回</li>
	                                <li class="status">
	                                    <button>{{item.status_msg}}</button>
	                                </li>
	                            </ul>
	                        </div>
	                    </li>
	                </ul>
                </mt-loadmore>
            </div>       
        </div>	
    </div>
</template>

<script>
	// import select1 from './all'
	// import select2 from './selling'
	// import select3 from './toBeConfirm'
	// import select4 from './rejected'
	// import select5 from './revoked'
	// import select6 from './completed'
	import { Loadmore } from 'mint-ui';
    export default{
        name:'tradeSell',
        data(){
            return{
            	tabView: 'select1',
                title:'交易',
                tabList:['买入','卖出'],
                activeTabIndex:1,
                contactWay:[ //联系方式
                    {
                        way:'电话号',
                        count:'',
                        contact:'contact_tel',
                    },
                    {
                        way:'微信号',
                        count:'',
                        contact:'contact_weixin',
                    },
                    {
                        way:'QQ号',
                        count:'',
                        contact:'contact_qq',
                    }
                ],
                isShowContactMenu:false,  //默认不展示下拉菜单
                new_price:'',
                info:{ //卖出数量
                	sellCount:0, //卖出数量初始化
                	selectWayMode:'',
                	selectWayText:'请选择您的联系方式',
                    serviceCount:0, //初始化总服务费为0,
                    contactMsg:''
                },
                contactCont:[], //联系方式列表
                allActiveMenu:[ //挂卖记录
                    {
                        text:'全部',
                        activeStatus:true,
                    },
                    {
                        text:'待确定',
                        activeStatus:false,
                    },
                    {
                        text:'已驳回',
                        activeStatus:false,
                    },
                    {
                        text:'已成交',
                        activeStatus:false,
                    },
                    {
                        text:'挂卖中',
                        activeStatus:false,
                    },
                    {
                        text:'已撤回',
                        activeStatus:false,
                    },
                    {
                        text:'已完成',
                         activeStatus:false,
                    }
                ],
                isShowTradeListActive:false, //默认不展示全部的状态
                tradeListActive:'全部', //默认完成状态
                list:[], //挂卖记录
                listType:0, //0:全部 1：待确定；2：已驳回；3：已成交；4：挂卖中；5：已撤回；6：已完成）
                page:1, //分页
                allLoaded:false,//是否加载完毕
                pageval:5,
                bottomDistance:150,
            }
        },
        components:{
            top
            // ,select1,select2,select3,select4,select5,select6,
        },
        computed:{
            service:function(){
                this.info.serviceCount = 0;
                //return this.info.serviceCount.toFixed(1);
            },
            totalCount:function(){
                return this.info.sellCount - 0 + this.info.serviceCount;
            },
            
        },
        created(){
        	this.getContact();
        	this.selllist(); //加载全部卖出记录
        },
        methods:{
        	loadBottom: function(){
			 	this.page ++;
			 	this.selllist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
             loadTop: function(){
            	this.page --;
            	if(this.page<=1){
            		this.page = 1;
            		this.allLoaded = true;
            	}
            	this.selllist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
        	tabChange:function(tab){
		        this.tabView = tab;
		    },
            // handleInput(e){ //禁止输入小数
            //     e.target.value=e.target.value.replace(/[^\d]/g,'');
            // },
            changeTab(index){
                this.activeTabIndex = index ;
            },
            showContactMenu(){  //显示联系方式下拉菜单
                this.isShowContactMenu = ! this.isShowContactMenu;
            },
            selectWay(index){   //选择联系方式
                if(this.contactWay[0].count ==''&& this.contactWay[1].count == '' && this.contactWay[2].count == ''){
        			this.$toast({
        				message:"您还没有联系方式，即将跳转到添加联系方式页面"
        			});
        			setTimeout(()=>{
        				this.$router.push('/addContactWay');
        			},2000);
            	}else{
            		this.info.selectWayText = this.contactWay[index].count;
	                this.info.selectWayMode = this.contactWay[index].contact;
	                this.isShowContactMenu = false;
            	}
            },
            showTradeListActive(){  //显示全部状态下拉菜单
                this.isShowTradeListActive = ! this.isShowTradeListActive ;
            },
            changeTradeActive(index){   //选中卖出记录的状态   
                this.isShowTradeListActive = false ;
                this.tradeListActive = this.allActiveMenu[index].text;
                for(let i=0;i<this.allActiveMenu.length;i++){
                    this.allActiveMenu[i].activeStatus = false ;
                }
                this.allActiveMenu[index].activeStatus = true ;
                this.listType = index ;
                this.list = [] ;
                this.selllist();
            },
            countAdd(){ //+卖出数量
                this.info.sellCount = this.info.sellCount -0 + 10 ;
            },
            countSubtract(){    //-卖出数量
                if(10>=this.info.sellCount>0){
                    this.info.sellCount = 0 ;
                }else if(this.info.sellCount>10){
                    this.info.sellCount = this.info.sellCount - 10 ;
                }
            },
            getContact(){
            	this.$store.dispatch('addContactWay/getContactWay').then(()=>{
            		if(this.$store.state.addContactWay.getcode == 200){
            			this.contactWay[0].count = this.$store.state.addContactWay.gettel;
            			this.contactWay[1].count = this.$store.state.addContactWay.getweixin;
                        this.contactWay[2].count = this.$store.state.addContactWay.getqq;
            		}else{
            			this.$toast({
							message:this.$store.state.addContactWay.getmsg,
						});
            		}
            	}).catch((e) => {              
					// alert("输入错误111");
				});
            },
            sell(e){
            	e.preventDefault();
            	if(this.info.sellCount == 0 || this.info.sellCount == ''){
            		this.$toast({
						message:'请输入卖出数量',
					});
            	}else if(this.info.sellCount <0 || this.info.sellCount<10){
            		this.$toast({
						message:'卖出数量为10的正整数倍',
					});
            	}else if(this.info.sellCount%10 !== 0){
            		this.$toast({
						message:'卖出数量为10的正整数倍',
					});
            	}else if(this.info.selectWayText == "" || this.info.selectWayText =='请选择您的联系方式' ){
                    this.$toast({
                        message:'联系方式不能为空'
                    });
                }else{
                    // if(this.selectWayMode == "contact_tel"){
                    //     this.contactMsg = '电话';
                    // }else if(this.selectWayMode == "contact_weixin"){
                    //     this.contactMsg = '微信';
                    // }else if(this.selectWayMode == "contact_qq"){
                    //     this.contactMsg = 'QQ';
                    // }
            		this.$store.dispatch('tradeSell/sell',this.info).then(()=>{
//                      console.log(this.info);
	            		if (this.$store.state.tradeSell.code == 200) {
	            			this.$toast({
								message:'挂卖成功！',
							});
							this.info.sellCount = 0;
							this.info.serviceCount = 0;
                            this.info.selectWayText = '';
                            this.list=[];
                            this.selllist();
                            
                        } else if(this.$store.state.tradeSell.code == 201){
                            this.$toast({message:this.$store.state.tradeSell.msg})
                        }else{
	            			this.$toast({
								message:this.$store.state.tradeSell.msg,
							});
	            		}
	            	}).catch((e) => {              
						//alert("错误222");
					});
            	}
            	
            },
            selllist(){ //全部卖出记录
				this.$store.dispatch('tradeSell/selllist',[this.page,this.listType]).then(()=>{
					if(this.$store.state.tradeSell.sellcode == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.tradeSell.list.length){
							this.list = this.$store.state.tradeSell.list;
						}else{
							this.list = this.$store.state.tradeSell.list;
							this.allLoaded = true;
						}
                        this.new_price = this.$store.state.tradeSell.new_price;
					}else{
						this.$toast({
							message:this.$store.state.tradeSell.sellmsg,
						});
					}
				}).catch((e) => {              
					// alert("错误333");
                });
            },
            clickComplete(out_id){ //点击完成
                this.$store.dispatch('tradeAction/clickComplete',out_id).then(() => {
                    if(this.$store.state.tradeAction.successCode == 200){
                       this.$toast({message:this.$store.state.tradeAction.successMsg,});
                       this.list=[];
                       this.selllist();
                    }else{
                        this.$toast({message:this.$store.state.tradeAction.successMsg})
                    }
                }).catch(e => {
                    // alert("错误444");
                })
            },
            clickReject(out_id){ //点击驳回
                this.$store.dispatch('tradeAction/clickReject',out_id).then(() => {
                    if(this.$store.state.tradeAction.rejectCode == 200){
                       this.$toast({message:this.$store.state.tradeAction.rejectMsg,});
                       this.list=[];
                       this.selllist();
                    }else{
                        this.$toast({message:this.$store.state.tradeAction.rejectMsg})
                    }
                }).catch(e => {
                    // alert("错误555");
                })
            },
            clickWidthdraw(out_id,status){ //点击撤回
                this.$store.dispatch('tradeAction/clickWidthdraw',out_id).then(() => {
                    if(this.$store.state.tradeAction.withdrawCode == 200){
                        this.$toast({message:this.$store.state.tradeAction.withdrawMsg,});
                        this.list=[];
                        this.selllist();
                    }else{
                        this.$toast({message:this.$store.state.tradeAction.withdrawMsg})
                    }
                }).catch(e => {
                    // alert("错误666");
                })
            }
        }
    }
</script>

<style scoped>
    @import url("../../../../static/css/common.css");
    .select_list li{ width:50%; }
    .container{top:0;}
    /* form */
    .new_value{
        font-size:0.32rem;
        color:#fff;
        margin:0 auto 0.5rem;
    }
    form{
        width:100%;
        padding:0.8rem 0;
        margin:0.4rem auto 0.7rem;
    }
    form label{
        width:6.8rem;
        height:0.96rem;
        line-height:0.96rem;
        margin-bottom:0.4rem;
    }
    form .submit{ width:3.2rem; height:0.96rem;line-height:0.96rem;}
    .count_input{
        border:1px solid #313859;
        display: flex;
        padding:0;
    }
    .count_input span{
        width:16%;
        text-align:center;
        font-size:0.37rem;
        color:#666;
    }
    .count_input input{
        border:1px solid #313859;
        border-top:0;
        border-bottom:0;
    }
    .count_input input{ text-align:center; }
    /* 扣除提示信息 */
    .tip{
        width:6.8rem;
        margin:0 auto 0.4rem;
        font-size:0.32rem;
        color: #99a3bf;
        text-align: justify;
        line-height:0.48rem;
    }
    /* 下拉菜单 */
    .selected{
        height:0.96rem;
        line-height:0.96rem;
        margin-bottom:0.4rem;
    }
    .selected .select_menu{ display: block; }
    .placeholder span{ color:#666; }
    .trade_list h3{ display: flex; justify-content: space-between; }
    .trade_list h3 img{ width:0.27rem; }
    /* 卖出记录全部状态下拉 */
    .triangle{
        position: absolute;
        top:0.45rem;
        left:0;
        width:0;
        height:0;
        border-width:0 0.2rem 0.2rem;
        border-style:solid;
        border-color:transparent transparent  #9fa5b6;
    }
    .trade_list h3 span:last-child{position: relative;}
    .all_active_menu{
        position: absolute;
        top:0.6rem;
        right:0;
        width:3.2rem;
        box-sizing: border-box;
        padding:0 0.25rem;
        background-color: #9fa5b6;
        border-radius: 0.13rem; 
        font-size:0.37rem;
        color:#666; 
    }
    .all_active_menu li{
        padding:0.3rem 0.27rem;
        border-bottom:1px solid #8c8c8c;
        display: flex;
        justify-content: space-between;
    }   
    /* 选中状态后面打勾 */
    .all_active_menu .active{ color:#fff; }
    .all_active_menu .active::before{ content:'√' }
    .min_height{ height:6rem; }
    .buttons{display: flex;}
    .buttons .bg{margin-right:0.2rem}
</style>

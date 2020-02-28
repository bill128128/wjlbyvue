<template>
    <div id="agentRewardList">
        <top :message="title"/>
        <div class="container">
             <!-- 2:分段选择器 -->
            <div class="tab" style="border-bottom:1px solid #666;height:1.2rem;box-sizing:border-box;">
                <ul class="tab_list">
                    <li v-for="(item,index) in tabList" :key="index" :class="{active:activeTabIndex == index}" @click="changeTab(index),tabChange('select' + (index + 1))">{{item}}</li>
                </ul>
            </div>
            <!-- 3:代理人数 -->
            <keep-alive> 
		        <component v-bind:is="tabView"></component>
		    </keep-alive> 
            <!-- 4:个人代理奖励 -->
            <div class="list_title">个人代理奖励<span>{{changeDataVal}}<img src="../../../static/img/rl.png" @click="openPicker"></span></div>
            <!-- 时间选择器 -->
            <mt-datetime-picker 
                ref="picker" 
                type="date"
                year-format="{value}年"
                month-format="{value}月"
                date-format="{value}日"
                v-model="dataVal"
                @confirm="handleConfirm">
            </mt-datetime-picker>
            <main>
                <ul class="list">
                    <li style="margin-top:0.27rem;" v-for="(item,index) in agentList" :key="index">
                        <div class="left">
                            <div>
                                <span style="margin-right:0.4rem;">招募红利：<span style="color:#fff">{{item.blush_score}}</span></span>
                                <span>消费红利：<span style="color:#fff">{{item.purchase_score}}</span></span>
                            </div>
                            <div class="time">{{item.time}} </div>
                        </div>
                        <div>
                            总收益：
                            <div class="count">{{item.profit}}</div>
                        </div>
                    </li>
                </ul>
            </main>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
    import top from '../common/top'
    import foot from "../common/index"
    import select1 from './agentRewardList/provincialAgentList'
	import select2 from './agentRewardList/municipalAgentList'
	import select3 from './agentRewardList/countyLeveAgentList'
	import select4 from './agentRewardList/levelingAgentList'
    export default{
        data(){
            return{
            	tabView: 'select1',
                title:'代理奖明细',
                tabList:['省级代理','市级代理','县级代理','平级代理'],
                activeTabIndex:0,
                pageindex:2,
                page:1,
                agentList:[],
                dataVal:new Date(),
                handler:function(e){e.preventDefault();},
            }
        },
        components:{
            top,select1,select2,select3,select4,foot
            // ,indexApp
        },
        computed:{
            changeDataVal(){
                const y = this.dataVal.getFullYear();
                let m = this.dataVal.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = this.dataVal.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        },
        //侦听属性
        watch:{
            signReasonVisible:function(newvs,oldvs){//picker关闭没有回调函数，所以侦听该属性替代
                if(newvs){
                    this.closeTouch();
                }else{
                    this.openTouch();
                }
            }
        },
        created(){
            this.isOverdue();
            this.getagentRewardList();
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
            /*解决iphone页面层级相互影响滑动的问题*/    
            closeTouch:function(){        
                document.getElementById("agentRewardList").addEventListener('touchmove',this.handler,{passive:false}); //阻止默认事件   
            },    
            openTouch:function(){        
                document.getElementById("agentRewardList").removeEventListener('touchmove', this.handler,{passive:false}); //打开默认事件     
            },
            openPicker(){
                this.$refs.picker.open();//打开日期选择器
                this.closeTouch();//关闭默认事件
            },
            
            handleConfirm(value){
                this.agentList = [] ;
            	this.getagentRewardList();
                this.$refs.picker.close();//关闭日期选择
                this.openTouch();//打开默认事件
            },
            changeTab(index){
                this.activeTabIndex = index;
            },
            tabChange:function(tab){
		        this.tabView = tab;
            },
            getagentRewardList(){
                this.$store.dispatch('agentRewardList/getagentRewardList',[this.page,this.changeDataVal]).then(()=>{
                    if(this.$store.state.agentRewardList.code == 200){
                        this.agentList = this.agentList.concat(this.$store.state.agentRewardList.agencybill);
                    }else{
                        this.$toast({message:this.$store.state.agentRewardList.msg})
                    }
                }).catch((e)=> {
                    alert("error")
                })
            }
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/common");
    .container{
        position: relative;
        top:1.4rem;
        min-height:100vh;
    }
     /* 2:分段选择器 */
    .tab_list{
        width:100%;
        height:1.2rem;
        overflow-x:auto;
        white-space:nowrap;
    }
    .tab_list li{
        width:30%;
        display:inline-block;
        text-align:center;
        height:1.2rem;
        line-height:1.2rem;
        font-size:0.37rem;
        color:#fff;
        box-sizing: border-box;
    }
    .tab_list li.active{
        border-bottom:2px solid #ffbb33;
        color:#ffbb33;
    }
    .main_available{height:4.6rem;position: relative;}
    .main_available .item{  width:50%  }
    .main_available .item:first-child .count{color:#fff;}
    .agent_detail{
        width: 2.14rem;
	    height: 0.75rem;
	    background-color: #ffbb33;
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        position: absolute;
        top:65%;
        left:50%;
        margin-left:-1.07rem;
        border:0;
        outline:0;
        font-size:0.37rem;
        color:#fff;
    }
     .list_title{
        font-size:0.37rem;
        color:#fff;
        margin-bottom:0.2rem;
    }
    .list_title span{
    	color: #7a7acc;
    	float: right;
    }
    .list_title span img{
    	width: .53rem;
    	height: .52rem;
    	margin-left: .3rem;
    	margin-right: .2rem;
    }
</style>


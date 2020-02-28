<template>
	<div id="agentRewardDetail">
		<top :message="title"></top>
	    <div class="container">
	    	<div class="tab">
                <ul class="tab_list">
                    <li v-for="(item,index) in tabList" :key="index" :class="{active:activeTabIndex == index}" @click="changeTab(index),tabChange('select' + (index + 1))">{{item}}</li>
                </ul>
            </div>
	    	<keep-alive> 
		        <component v-bind:is="tabView"></component>
		    </keep-alive> 
	    </div>		    
	    <foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../common/top'
	import foot from "../common/index"
	import select1 from './agentRewardDetail/provincialAgentDetail'
	import select2 from './agentRewardDetail/municipalAgentDetail'
	import select3 from './agentRewardDetail/countyLeveAgentDetail'
	import select4 from './agentRewardDetail/levelingAgentDetail'
	export default{
		name:'agentRewardDefault',
		data(){
			return{
				tabView: 'select1',
				title:'代理奖详情',
                tabList:['省级代理','市级代理','县级代理','平级代理'],
                activeTabIndex:0,
                pageList:[],
		        allLoaded: false,
				pageVal: 0,
				pnum : 9,
				pageindex:2,
			}
		},
        components:{
            top,select1,select2,select3,select4,foot
            // indexApp,
        },
        created(){
            this.isOverdue();
            // console.log(this.$route.params);
            let activeIndex = this.$route.params.agentListType;
            this.tabView = 'select' + activeIndex ;
            this.activeTabIndex = (activeIndex-1) ;
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
            changeTab(index){
                this.activeTabIndex = index;
            },
            tabChange:function(tab){
		        this.tabView = tab;
		    }
        }
	}
</script>

<style scoped>
	@import url("../../../static/css/common.css");
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
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
</style>
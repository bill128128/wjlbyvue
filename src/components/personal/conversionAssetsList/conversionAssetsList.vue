<template>
    <div id="conversionAssetsListList">
        <top :message="title"></top>
        <div class="container">
            <!-- 2:分段选择器 -->
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
	// import select1 from './moveRecruitScoreList' //招募积分明细
	import select1 from './moveRecruitBonusList' //招募红利明细
	import select2 from './moveTenancyScoreList' //租赁积分明细
	import select3 from './moveJZBList' //掌聚宝明细
	import top from '../../common/top'
	import foot from '../../common/index'
    export default{
        name:'conversionAssetsListList',
        data(){
            return{
            	tabView: 'select1',
            	title:'互转资产记录',
                tabList:['招募红利明细','租赁积分明细','掌聚宝明细'],
                activeTabIndex:0,
                pageindex:0,
                
            }
        },
        components:{
			top,select1,select2,select3,foot
        },
        created(){
            this.isOverdue();
//          let paramsList = this.$route.params ;
//          this.activeTabIndex = paramsList.tabIndex ;
//          this.tabView = 'select' + (this.activeTabIndex + 1 )
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
    @import url("../../../../static/css/common");
    .container{
    	position: relative;
    	max-height:calc(100% - 1.8rem);
        width:9.2rem;
        margin:0 auto;
        overflow: scroll;
        top: 1.4rem;
    }
    /* 2:分段选择器 可拉动*/
    .tab_list{
        width:100%;
        height:1.2rem;
        overflow-x:auto;
        white-space:nowrap;
        border-bottom: 1px solid #666;
    }
    .tab_list li{
        width:33.33%;
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
</style>


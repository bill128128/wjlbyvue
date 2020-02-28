<template>
    <div id="myTenancyScoreList">
        <top :message="title"/>
        <div class="container">
            <!-- 分段选择器 -->
            <div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in tabList" :key="index" @click="changeActiveTab(index),changeTabContent('select'+(index+1))" :class="{active:activeTabIndex == index}">{{item}}</li>
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
    import foot from '../common/index'
    import select1 from './recruitList/recruitScoreAndRecruitBonusList' //招募明细:使用招募积分+招募红利
    import select2 from './conversionAssetsList/moveTenancyScoreList' //招募积分互转
    import select3 from '../../components/personal/subscribeJZBList/subscribeJZBList_my' //认购掌聚宝明细-使用租赁积分
    export default{
        name:'myTenancyScoreList',
        data(){
            return{
                title:'租赁积分明细',
                tabList:['我要招募明细','互转明细','认购掌聚宝明细'],
                activeTabIndex:0,
                tabView:'select1',
                pageindex:2
            }
        },
        components:{
            top,select1,select2,select3,foot
        },
        created(){
            this.isOverdue();
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
            changeActiveTab(index){
                this.activeTabIndex = index ;
            },
            changeTabContent(info){
                this.tabView = info ;
            }
        }
    }
</script>
<style scoped>
    @import url('../../../static/css/common');
    .select_box .select_list li{width:33.33%;}
</style>


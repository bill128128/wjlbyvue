<template>
    <!-- 我的页面-点击可用掌聚宝-显示明细  每日返还得+互转得 -->
    <div id="myAvailableZJBList">
        <top :message='title'/>
        <div class="container">
            <!-- 分段选择器 -->
            <!-- <div class="select_box">
                <ul class="select_list">
                    <li v-for='(item,index) in tabList' :key="index" @click="changeActiveTab(index),changeTabContent('select'+(index+1))" :class="{active:activeTabIndex == index}">{{item}}</li>
                </ul>
            </div>  -->
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
    import top from '../common/top'
    import foot from '../common/index'
    import select1 from './ZJBDailyReturn'
    import select2 from './conversionAssetsList/moveJZBList'
    export default{
        name:'myAvailableZJBList',
        data(){
            return{
                title:'每日返还明细',
                // tabList:['每日返还明细'],
                // activeTabIndex:0,
                tabView:'select1',
                pageindex:2,
            }
        },
        components:{
            top,select2,select1,foot
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
            // changeActiveTab(index){
            //     this.activeTabIndex = index ;
            // },
            // changeTabContent(info){
            //     this.tabView = info ;
            // }
        }
    }
</script>
<style scoped>
    @import url('../../../static/css/common');
    .select_box .select_list li{width:50%;}
</style>

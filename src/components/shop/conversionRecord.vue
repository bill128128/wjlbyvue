<template>
    <!-- 零售商城 - 兑换记录 -->
    <div id="conversionRecord">
        <top :message="title"/>
        <div class="container">
            <!-- 分段选择器 -->
            <div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in selectTab" :key="index" :class="{active:index == activeTab}" @click="chanageActiveTab(index)">{{item}}</li>
                </ul>
            </div>
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
import select1 from './conversionRecord/allRecord' //全部记录
import select2 from './conversionRecord/sendGoodsRecord' //代发货
import select3 from './conversionRecord/waitGoodsRecord' //代收货
import select4 from './conversionRecord/completeRecord' //已完成
    export default{
        data(){
            return{
                title:'兑换记录',
                selectTab:['全部','待发货','待收货','已完成'],
                activeTab:0, //默认分段选择器选中第一个
                tabView:'select1',
                pageindex:0,
            }
        },
        components:{
            top,select1,select2,select3,select4,foot,
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
            chanageActiveTab(index){ //切换分段选择器
                this.activeTab = index ;
                this.tabView = 'select' + ( index + 1 );
            }
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/common");
    .select_box .select_list li{width:25%;}
    .container{padding-bottom:1rem;}
</style>



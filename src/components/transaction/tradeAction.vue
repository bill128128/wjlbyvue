<template>
    <div id="tradeAction">
        <top :message="title" />
        <div class="container">
            <!-- 分段选择器 -->
            <div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in tabList" :key="index" :class="{active:activeTabIndex == index}" @click="changeTab(index),changeTabContent(index)">{{item}}</li>
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
    import select1 from './tradeBuyAndSell/tradePurchase'
    import select2 from './tradeBuyAndSell/tradeSell'
    export default{
        name:'tradeAction',
        data(){
            return{
            	pageindex:1,
                tabView:'select1',
                title:'交易',
                tabList:[
                    '买入','卖出'
                ],
                activeTabIndex:0,
            }
        },
        created(){
            this.isOverdue();
            //    let paramsList = this.$route.params;
            //    this.activeTabIndex = paramsList.activeIndex;
            //    this.tabView = 'select'+(this.activeTabIndex + 1);
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
               this.activeTabIndex = index ;
            },
            changeTabContent(index){
                this.tabView = 'select'+(index + 1) ;
            }
        },
        components:{
            top,select1,select2,foot
        }
    }
</script>

<style scoped>
    @import "../../../static/css/common";
    .container{
        position:relative;
        top:1.4rem;
        margin-bottom:0;
    }
    .select_list li{ width:50%; }
</style>


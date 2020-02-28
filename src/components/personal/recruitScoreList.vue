<template>
    <div id="recruitScoreList">
        <top :message="title"/>
        <div class="container">
            <!-- 分段选择器 -->
            <div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in tabList" :key="index" :class="{active:tabListActive == index}" @click="changeActiveTab(index)">{{item}}</li>
                </ul>
            </div>
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import top from '../common/top'
    import select1 from './recruitScoreList/obtain' //获取
    import select2 from './recruitScoreList/consumption' //获取
    export default{
        name:'recruitScoreList', //招募积分列表
        data(){
            return{
                title:'招募积分明细',
                tabList:['获取','消耗'],
                tabListActive:0,
                tabView:'select1'
            }
        },
        components:{
            top,select1,select2
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
                this.tabListActive = index ;
                this.tabView = 'select' + (index+1) ;
            }
        }
    }
</script>
<style scoped>
    @import url('../../../static/css/common');
    .select_box .select_list li{width:50%;}
</style>


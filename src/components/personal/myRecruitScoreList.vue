<template>
    <!-- 我的页面-点击招募积分-招募积分明细 -->
    <div id="myRecruitScoreList">
        <top :message="title"/>
        <!-- 招募积分认购掌聚宝明细列表 -->
        <keep-alive> 
            <component v-bind:is="tabView"></component>
        </keep-alive> 
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
    import top from '../common/top'
    import foot from '../common/index'
    import subscribeJZBList_my from '../../components/personal/subscribeJZBList/subscribeJZBList_my1' //认购掌聚宝明细页面-使用招募积分认购
    export default{
        name:'myRecruitScoreList',
        data(){
            return{
                title:'招募积分明细',
                tabView:subscribeJZBList_my,
                pageindex:2,
            }
        },
        components:{
            top,subscribeJZBList_my,foot
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
        }
    }
</script>

<style scoped>
    @import url('../../../static/css/common');
    .select_box .select_list li{width:100%;}
</style>


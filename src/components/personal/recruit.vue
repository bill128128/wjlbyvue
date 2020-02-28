<template>
    <div id="recruit">
        <top :message="title" :notes="record"></top>
        <div class="container">
            <!-- 分段选择器 -->
            <div class="select_box">
                <ul class="select_list">
                    <li v-for="(item,index) in tab" :key="index" @click="changeActive(index),tabChange('select' + (index + 1))" :class="{active:index == tabIndex}">{{item}}</li>
                </ul>
            </div>
            <!-- 可用招募积分+可用招募红利 -->
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
    import select1 from './recruit/recruitScoreAndRecruitBonus'
    // import select2 from './recruit/JZBAndRecruitBonus'
    import select2 from './recruit/recruitScoreAndZJB'
    export default{
        name:'recruit',
        data(){
            return{
            	tabView: 'select1',
                title:'我要续购',
                record:'明细',
                tab:['招募积分+招募红利','招募积分+掌聚宝'],    //tab
                // tab:['招募积分+招募红利','掌聚宝+招募红利'],    //tab
                tabIndex:0,  //tab默认选中第一个
                pageindex:0,
                
            }
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
            changeActive(index){    //tab切换
                this.tabIndex = index ;
            },
            tabChange:function(tab){
		        this.tabView = tab;
		    },
		    golist(){
                this.$router.push({
                    name:'recruitList',
                    params:{
                        tabIndex:this.tabIndex
                    }
                });
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
        position: relative;
        top:1.4rem;
    }
    /* 分段选择器 */
    .select_list li{ width:50%; }
    .main_available .item{  width:50%;  }
    /* form */
    .selected .select_menu{ display:block }
    input{
        border:0;
        outline:0;
        background:transparent;
    }
    .tip{
        font-size:0.32rem;
        color: #99a3bf;
        width:6.8rem;
        margin:0 auto;
        text-align:justify;
        line-height:0.5rem;
    }
</style>


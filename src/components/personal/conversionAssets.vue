<template>
    <!-- 互转资产 -->
    <div id="conversionAssets">
        <top :message="title" :notes="notes"></top>
        <div class="container">
            <!-- 2:tab -->
            <div class="select_box">
                <ul class="select_list">
                    <li  v-for="(item,index) in tab" v-bind:key='index'  @click="tabIndex(index),tabChange('select' + (index + 1))" :class="{active:index == num}">{{item}}</li>
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
	// import select1 from './conversionAssets/moveRecruitScore' //转招募积分
	import select1 from './conversionAssets/moveRecruitBonus' //转招募红利
	import select2 from './conversionAssets/moveTenancyScore' //转租赁积分
	import select3 from './conversionAssets/moveJZB' //转掌聚宝
    export default{
        name:'conversionAssets',
        data(){
            return{
            	tabView:'select1',
                tab:['转招募红利','转租赁积分','转掌聚宝'],
                num:0,
                title:'互转资产',
                notes:'明细',
                pageindex:0,
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
            // 切换tab标签,改变样式
            tabIndex(index){
                this.num = index;
                
            },
            //tab标签切换
            tabChange:function(tab){
		        this.tabView = tab;
		    },
		    golist(){
		    	this.$router.push({
                    name:'conversionAssetsList',
                    params:{
                        tabIndex:this.num
                    }
                });
		    }

        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
        
    }
    .select_box .select_list li{
        /* width:25%; */
        width:33.33%;
    }
    .main_available .item{
        width:100%;
    } 
    /* 表单 */
    form{margin-bottom:1.5rem;}
    form .submit{ margin-top:0.15rem;}
</style>





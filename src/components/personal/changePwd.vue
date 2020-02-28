<template>
    <div id="changePwd">
        <top :message="title"/>
        <div class="container">
            <!-- 分段选择器 -->
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
    import select1 from './changePwd/changeLoginPwd'
	import select2 from './changePwd/changePayPwd'
    export default{
    	name:'changePwd',
        data(){
            return{
            	tabView: 'select1',
                title:"修改密码",
                tab:['修改登录密码','修改交易密码'],
                num:0,
                pageindex:2,
            }
        },
        components:{
            top,select1,select2,foot
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
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/common");
    #changePwd{
        background:url("../../../static/img/bg.png") no-repeat;
        background-size:cover;
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
    .select_list li{ width:50%; }
    form{margin-top:0.53rem;}
    form label{ width:6.8rem; }
    form label input{width:63%;}
    form button.submit{margin-top:0.27rem;}
</style>


<template>
    <div id="retrievePwd">
        <top :message="title"/>
        <div class="container">
            <form action="" class="form">
                <label for="">用户名：
                    <input type="text" placeholder="请输入您的用户名" v-model="userInfo.realname">
                </label>
                <label for="">手机号：
                    <input type="text" placeholder="请输您的手机号" v-model="userInfo.phone">
                </label>
                <label for="" style="position:relative">验证码：
                    <input type="text" placeholder="请输入验证码" v-model="userInfo.verify">
                    <button class="get_code" @click="settime">获取验证码</button>
                </label>
                <label for="">登录密码：
                    <input type="text" placeholder="请重新设置您的登录密码" v-model="userInfo.password">
                </label>
                <label for="">确认密码：
                    <input type="text" placeholder="请再次输入您的登录密码" v-model="userInfo.repassword">
                </label>
                <div class="tc">
                    <button class="submit" @click="zhpassword">确定</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import top from '../common/top'
    export default{
        data(){
            return{
                title:'找回密码',
                userInfo:{
					phone:'',
					verify:'',
					realname:'',
					password:'',
					repassword:'',
				},
            }
        },
        components:{
            top
        },
        methods:{
            checkEmpty(info){
                if(info == null || info == ""){
                    this.$toast({
                        message:'手机号不能为空'
                    })
                    return false;
                }else{
                    return true ;
                }
            },
        	settime:function(e){
                console.log(this.userInfo.phone);
                if(this.checkEmpty(this.userInfo.phone) == false) return false;
				e.preventDefault();
				this.$store.dispatch('getVerify/regetVerify',this.userInfo.phone).then(() => {
					console.log(this.$store.state.getVerify.zhcode);
					if(this.$store.state.getVerify.zhcode==200){
						var val = e.target;
                        var num = 60;
                        var timer = setInterval(function(){	
                            num --;
                            val.innerHTML = num+"秒倒计时";
                            val.disabled = 'disabled';
                            val.style.backgroundColor = "#cccccc";
                            if(num<=0){
                                val.disabled = '';
                                val.style.backgroundColor = "#ffbb33";
                                val.innerHTML = "获取验证码";
                                clearInterval(timer);
                            }
                        },1000)
						this.$toast({
							message:this.$store.state.getVerify.zhmsg+'有效时间为30分钟',
						});
					}else{
						this.$toast({
                            message:this.$store.state.getVerify.zhmsg,
						});
					}
					          
				}).catch((e) => {              
					alert(输入错误);
				})
			},
			zhpassword(e){
				e.preventDefault();
				this.$store.dispatch('retrievePwd/zhpassword',this.userInfo).then(()=>{
					if(this.$store.state.retrievePwd.retrievepwdcode == 200){
						this.$toast({
                            message:this.$store.state.retrievePwd.retrievepwdmsg,
						});
						this.$router.push('/login');
					}else{
						this.$toast({
                            message:this.$store.state.retrievePwd.retrievepwdmsg,
						});
					}
				})
           },
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/common");
    #retrievePwd{
        position: fixed;
        width:100%;
        height:100%;
        background:url("../../../static/img/bg.png") no-repeat;
        background-size:cover;
    }
    .container{margin-bottom:0;}
    form{margin-top:0.4rem;}
    .get_code{
        padding:0 0.15rem;
        height:0.76rem;
        line-height:0.76rem;
        background-color: #ffbb33;
        border-radius: 0.13rem;
        font-size:0.37rem;
        color:#fff;
        position: absolute;
        top:50%;
        right:0.25rem;
        margin-top:-0.38rem;
    }
    form button.submit{margin-top:0.2rem;}
</style>


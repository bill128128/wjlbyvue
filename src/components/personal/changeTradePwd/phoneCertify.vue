<template>
    <div id="phoneCertify">
        <top :message="title"/>
        <div class="container">
            <form action="" class="form">
                <label for="">
                    用户名：<input type="text" placeholder="请填写本账户用户名" v-model="userInfo.userName">
                </label>
                <label for="">
                    手机号：<input type="text" placeholder="请填写该账号绑定的手机号" v-model="userInfo.userMobile">
                </label>
                <label for="" class="code">
                    验证码：<input type="text" placeholder="请输入验证码" v-model="userInfo.code">
                    <button class="getCode" @click="setTime">{{getCode}}</button>
                </label>
                <button class="submit" @click="submit">下一步</button>
            </form>	      
        </div>
    </div>
</template>
<script>
    import top from '../../common/top'
    export default{
        data(){
            return{
                title:'手机验证',
                getCode:'获取验证码',
                userInfo:{
                    userName:'',
                    userMobile:'',
                    code:''
                },
                time:60
            }   
        },
        components:{
            top,
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
            setTime(e){   //发送验证码
            	e.preventDefault();
                this.$store.dispatch('changeTradePwd/getCode',this.userInfo.userMobile).then(() => {
                    if(this.$store.state.changeTradePwd.getcodeCode == 200){
                        this.$toast({
                            message:this.$store.state.changeTradePwd.getcodeMsg+',有效时间为30分钟'
                        });
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
                    }else{
                        this.$toast({
                            message:this.$store.state.changeTradePwd.getcodeMsg
                        })
                    }
                }).catch((e) => {              
					console.log(e);
				})	
            },
            submit(){     //提交信息进行下一步
                this.$store.dispatch('changeTradePwd/phoneCertify',this.userInfo).then(() => {
                    if(this.$store.state.changeTradePwd.phoneCertifyCode == 200){
                        setTimeout(() => {
                            this.$router.push("/indentifyCertify");
                        },1000)
                        window.sessionStorage.setItem('mobile',this.userInfo.userMobile);
                    }else{
                        this.$toast({
                            message:this.$store.state.changeTradePwd.phoneCertifyMsg
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped>
    @import url('../../../../static/css/common');
    #phoneCertify{
        background:url("../../../../static/img/addpartnerbg.png") no-repeat;
        background-size:cover;
        min-height:100vh;
    }
    form{
        margin-top:0.4rem;
    }
    .code{
        position: relative;
    }
    .getCode{
        width:2.33rem;
        height:0.76rem;
        text-align:center;
        line-height:0.75rem;
        background-color: #ffbb33;
        border-radius: 0.13rem;
        color:#fff;
        font-size:0.37rem;
        position: absolute;
        top:50%;
        margin-top:-0.38rem;
        right:0.27rem;;
    }
    form .submit{
        display: block;
        margin-top:2.65rem;
    }
</style>


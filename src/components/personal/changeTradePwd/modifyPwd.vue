<template>
    <div id="modifyPwd">
        <!-- 修改交易密码 -->
        <top :message="title"/>
        <div class="container">
            <form>
                <label for="">
                    交易密码：<input type="text" v-model="tradePwd" placeholder="请输入新的交易密码">
                </label>
                <label for="">
                    确认密码：<input type="text" v-model="againPwd" placeholder="请再次输入交易密码">
                </label>
                <button class="submit" @click="submit">修改完成</button>
            </form>
        </div>
    </div>
</template>
<script>
    import top from '../../common/top'
    export default{
        name:'modifyPwd',
        data(){
            return{
                title:'重置交易密码',
                tradePwd:'',
                againPwd:''
            }
        },
        components:{
            top
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
            submit(){  //下一步进行提交
                var mobile = window.sessionStorage.getItem('mobile');
                //console.log(mobile);
                this.$store.dispatch('changeTradePwd/modifyPwd',[this.tradePwd,this.againPwd,mobile]).then(() => {
                    if(this.$store.state.changeTradePwd.modifyPwdCode == 200){
                        this.$toast({
                            message:this.$store.state.changeTradePwd.modifyPwdMsg
                        })
                        setTimeout(() => {
                            this.$router.push('/personalPage');
                        },1000)
                    }else{
                        this.$toast({
                            message:this.$store.state.changeTradePwd.modifyPwdMsg
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped>
    @import url('../../../../static/css/common');
    #modifyPwd{
        background:url('../../../../static/img/addpartnerbg.png') no-repeat;
        background-size:cover;
        min-height:100vh;
    }
    form{margin-top:0.4rem;height:13.5rem;}
    form label input{color:#666;}
    form .submit{
        display: block;
        margin:2.67rem auto 0 ;
    }
</style>


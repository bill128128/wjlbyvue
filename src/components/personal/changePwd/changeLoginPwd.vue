<template>
    <div id="changeLoginPwd">

            <form action="" class="form">
                 <label for="">原登录密码：
                    <input type="password" placeholder="请输入登录密码" v-model="pwdInfo.oldpwd" name="oldpwd">
                    </label>
                <label for="">新密码：
                    <input type="password" placeholder="请输入新密码" v-model="pwdInfo.newpwd" name='password'>
                </label>
                <label for="">确认新密码：
                    <input type="password" placeholder="请再次输入新密码" v-model="pwdInfo.repwd" name="repassword">
                </label>
                <div class="tc">
                    <button class="submit" @click="changepwd">修改完成</button>
                </div>
            </form> 
    </div>
</template>

<script>
    export default{
    	name:'changeLoginPwd',
        data(){
            return{
            	pwdInfo:{
            		oldpwd:'',
	            	newpwd:'',
	            	repwd:'',
	            	type:1
            	},
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
        	changepwd:function(e){
                e.preventDefault();
        		this.$store.dispatch('changePwd/changeloginpwd',this.pwdInfo).then(()=>{
        			if(this.$store.state.changePwd.loginpwdcode == 200){
        				this.$toast({
        					message: this.$store.state.changePwd.loginpwdmsg,
        				});
          				window.localStorage.removeItem('date');
                          this.$router.push('/login');
        			}else{
        				this.$toast({
        					message: this.$store.state.changePwd.loginpwdmsg,
        				});
        			}
        		}).catch((e) => {              
						alert(输入错误);
					});  
        	}
        }
    }
</script>
<style scoped>
    @import url("../../../../static/css/common");
    #changePwd{
        background:url("../../../../static/img/bg.png") no-repeat;
        background-size:cover;
    }
    .select_list li{ width:50%; }
    form{margin-top:0.53rem;}
    form label{ width:6.8rem; }
    form label input{width:63%;}
    form button.submit{margin-top:0.27rem;}
</style>


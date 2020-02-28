<template>
<div>
	<div id="loginbox">
		<div class="logo">
			<div class="circle">
				<div class="logoimg">
					<img src="../../assets/logo.png" />
				</div>
			</div>
		</div>
		<div class="login">
			<div class="title">登&nbsp;&nbsp;&nbsp;录</div>
			<form>
				<div>
					<label>登录名：</label>
					<input v-model="loginForm.name" v-validate="'required|alpha_num'" type="text" name="name" placeholder="请输入用户名" autocomplete="off" />
				</div>
				<span v-show="errors.has('name')" v-cloak> {{ errors.first('name') }} </span>
				<div>
					<label>密&nbsp;&nbsp;&nbsp;码：</label>
					<input v-model="loginForm.password" v-validate="'required|min:6'" type="password" name="password" placeholder="请输入密码" autocomplete="off">
				</div>
				<span v-show="errors.has('password')" v-cloak> {{ errors.first('password') }} </span>
				<button @click="doLogin">登录</button>
			</form>
			<p class="register" @click="goretrievePwd"> <a>忘记密码</a></p>
		</div>
	</div>
</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		name:"login",
		data(){
			return{
				loginForm: {
		          name: '',
		          password: ''
		       },
			}
		},
		created(){
			
		},
		methods:{
			login:function(e){
				e.preventDefault();
				this.$router.push({
					path:'Bindmobile'
				});
			},
			doLogin:function(e){
				e.preventDefault();
				this.$store.dispatch('login/doLogin', this.loginForm).then(() => {
					if(this.$store.state.login.code==200){						
						this.checkLogin();
					}else{
						this.$toast({
							message:this.$store.state.login.msg,
						});
					}					          
				}).catch((e) => {              
					alert(输入错误);
				})
			},
			checkLogin:function(){
				if(this.$store.state.login.is_mobile==1){
					this.$router.push({name:'index',
						params:{
							accessToken:this.$store.state.login.token,
						}
				});
				}else{
					this.$router.push({name:'Bindmobile',
						params:{
							accessToken:this.$store.state.login.token,
						}
					});
				}
			},
			goretrievePwd:function(){
				this.$router.push('/retrievePwd');
			}
		}
	}
</script>

<style scoped>
/*登录页面*/
#loginbox {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background:url(../../assets/bg.png) no-repeat center;
  background-size: contain;
  height: 100%;
  overflow: scroll;
}
/*logo区域*/
#loginbox .logo {
  position: absolute;
  background-color: #2f3c66;
  border-radius: 50%;
  left: 50%;
  margin-left: -1.6rem;
  top: 1.71rem;
  width: 3.2rem;
  height: 3.2rem;
}
#loginbox .logo .circle {
  position: absolute;
  background-color: #2f4376;
  border-radius: 50%;
  margin-left: -1.34rem;
  top: 0.27rem;
  left: 50%;
  width: 2.67rem;
  height: 2.67rem;
}
#loginbox .logo .circle .logoimg {
  position: absolute;
  width: 2.13rem;
  height: 2.13rem;
  border-radius: 50%;
  top: 0.27rem;
  left: 50%;
  margin-left: -1.06rem;
}
#loginbox .logo .circle .logoimg img {
  width: 100%;
  height: 100%;
}
  /*login区域*/
#loginbox .login {
  position: absolute;
  background-color: #596487;
  background: -moz-linear-gradient(top, #596487, #394466);
  background: -o-linear-gradient(top, #596487, #394466);
  background: -webkit-gradient(linear, 0 0, 0 bottom, from(#596487), to(#394466));
  border-radius: 5px;
  width: 8.4rem;
  height: 9.53;
  left: 50%;
  margin-left:-4.2rem ;
  top: 6rem;
}
#loginbox .login .title {
  color: white;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.53rem;
  text-align: center;
}
#loginbox .login form {
  width: 6.8rem;
  margin: 0 auto;
  font-size: 0.37rem;
}
#loginbox .login form span{
		color: red;
		display: block;
		height: .53rem;
		line-height: .53rem;
		margin-top: -1rem;
		margin-bottom: .5rem;

	}
#loginbox .login form div {
  position: relative;
  background-color: #a3a9ba;
  border-radius: 7px;
  width: 6.8rem;
  height: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 1.5rem;
  padding: 0 10px 0 10px;
}
#loginbox .login form div label {
  position: absolute;
  left: 5px;
  width: 2rem;
}
#loginbox .login form div input {
  background-color: transparent;
  border: none;
  position: absolute;
  width: 4.8rem;
  left: 2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  outline: none;
  color: #737478;
}
#loginbox .login form div input::-webkit-input-placeholder,
#loginbox .login form div textarea::-webkit-input-placeholder {
  color: #737478;
}
#loginbox .login form div input:-moz-placeholder,
#loginbox .login form div textarea:-moz-placeholder {
  color: #737478;
}
#loginbox .login form div input::-moz-placeholder,
#loginbox .login form div textarea::-moz-placeholder {
  color: #737478;
}
#loginbox .login form div input:-ms-input-placeholder,
#loginbox .login form div textarea:-ms-input-placeholder {
  color: #737478;
}
#loginbox .login form button {
  background-color: #ffbb33;
  cursor: pointer;
  border: none;
  color: white;
  width: 5.33rem;
  margin: .25rem 0.5rem 1.33rem 0.5rem;
  height: 1.07rem;
  line-height: 1.07rem;
  border-radius: 7px;
}
#loginbox .login .register{
	text-align: right;
	padding-bottom: 1rem;
	padding-right: 1rem;
	color: white;
	font-size: .35rem;
}
#loginbox .login .register a{
	color: white;
}
</style>
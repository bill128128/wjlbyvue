<template>
	<div>
		<div>
			<div class="top">
				用户设置
			</div>
		</div>
		<div id="loginbox">
			
			<div class="login">
				<form v-if="is_mobile==0">
					<div>
						<label>手机号：</label>
						<input v-model="userInfo.phone" v-validate="'required|phone'" type="text" name="phone" placeholder="请输入手机号" autocomplete="off" />
					</div>
					<div>
						<label>验证码：</label>
						<input v-model="userInfo.verify" name="verify" class="input" type="text" placeholder="请输入验证码" autocomplete="off" />
						<button id="checknumbtn" type="button" @click="settime">获取验证码</button>
					</div>
					<div>
						<label>真实姓名：</label>
						<input v-model="userInfo.realname" v-validate="'required'"  type="text" name="realname" placeholder="请输入真实姓名" autocomplete="off" />
					</div>
					<div>
						<label>交易密码：</label>
						<input v-model="userInfo.password" v-validate="'required|min:6'" type="password" name="password" placeholder="请输入交易密码" autocomplete="off" />
					</div>
					<div>
						<label>确认密码：</label>
						<input v-model="userInfo.repassword" v-validate="'required|confirmed:password'" type="password" name="repassword" placeholder="请确认交易密码" autocomplete="off" />
					</div>					
				</form>
				<div class="old">
					<p class="p1">身份认证信息</p>
					<p class="p2">请您认真选择、填写，若您忘记了交易密码，在找回交易密码时需要鉴定身份认证信息。</p>
					<div class="selected select_count">
						<div class="placeholder" @click="showSelectMenu"><span>{{userInfo.placeholder}}</span></div>
							<span class="icon"><img src="../../../static/img/down.png" alt="icon" v-show="!isShowSelectMenu"/></span>
	                        <span class="icon"><img src="../../../static/img/up.png" alt="icon" v-show="isShowSelectMenu"/></span>
						<ul class="select_menu" v-show="isShowSelectMenu">
							<li v-for="(item,index) in problemlist" :key="index" @click="SelectCount(index)">{{item.title}}</li>
						</ul>
					</div>
					<div style="width: 6.8rem; height: 6rem;" v-show="!answerShow"></div>
					<form style="padding-top: 0;" v-show="answerShow">
						<div>
							<label>答案：</label>
							<input type="text" name="realname" v-model="userInfo.answer" placeholder="请输入密保答案" autocomplete="off" />
						</div>
						<button @click="bindmobile">提交</button>
					</form>
				</div>				
			</div>
		</div>
	</div>
</template>
<script>
	import top from '../common/top'
	export default{
		name:"bindmobile",
		data(){
			return{
				userInfo:{
					phone:'',
					verify:'',
					realname:'',
					password:'',
					repassword:'',
					placeholder:'您的驾驶证后6位是？',
					answer:'',
					problemid:1,
					is_problem:0,
				},
				title: '用户设置',
				isShowSelectMenu:false,     //默认不展示选择下拉菜单
				isShowSlectWayMenu:false,   //默认不展示转出方式下拉菜单
				problemlist:[],
				answerShow:true,
				is_mobile:0,
				problemstu:0,
				data_list:'',
			}
		},
		components:{
			top
		},
		mounted(){
			//console.log(this.$route.params.accessToken);
			//console.log(this.$store.state.getVerify.verifycode);
			this.isOverdue();
			this.getproblemList();
			this.problemstu = window.localStorage.getItem('is_problem');
			this.is_mobile = window.localStorage.getItem('is_mobile');
			if(this.problemstu == 0 && this.is_mobile == 0){
				this.userInfo.is_problem = 0;
			}else if(this.problemstu ==0 && this.is_mobile == 1){
				this.userInfo.is_problem = 1;
			}
		},
		created(){
			// this.isOverdue()
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
			showSelectMenu(){   //显示和隐藏认购选择下拉菜单
                this.isShowSelectMenu = !  this.isShowSelectMenu;
                this.answerShow = !this.answerShow;
            },
            SelectCount(index){ //将认购选择的数量填写到上面
                this.userInfo.placeholder = this.problemlist[index].title;
                this.isShowSelectMenu = ! this.isShowSelectMenu;
                this.answerShow = true;
                this.userInfo.problemid = this.problemlist[index].id;
                console.log(this.userInfo.problemid);
            },
            showSelectWayMenu(){    //显示和隐藏转出方式下拉擦弹
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu ;
            },
			goback:function(){
				this.$router.go(-1);	
			},
			checkEmpty(info,value){ //验证不为空
				if(value == "" || value == null ){
					this.$toast({message:'请正确填写'+info})
					return false ;
				}else{
					return true ;
				}
			},
			checkEmpty(info,value,reg){ //验证格式
				if(!reg.test(value)){
					this.$toast({message:info+'格式不正确'})
				}
			},
			settime:function(e){   //发送验证码
				e.preventDefault();
				this.$store.dispatch('getVerify/acgetVerify',this.userInfo.phone).then(() => {
					if(this.$store.state.getVerify.verifycode==200){
						this.$toast({
							message:this.$store.state.getVerify.verifymsg+'有效时间为30分钟',
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
							message:'请正确输入手机号',
						});
					}					          
				}).catch((e) => {              
					console.log(e);
				})			 	
			},
			bindmobile(e){     //验证
				e.preventDefault();
				console.log(this.userInfo);
				if(this.is_mobile == 0 ){
					this.$store.dispatch('getVerify/bindmobile',this.userInfo).then(()=>{
						if(this.$store.state.getVerify.bindcode==200){
							this.$toast({
								message:this.$store.state.getVerify.bindmsg,
							});
							this.$router.push('/login');
						}else{
							this.$toast({
								message:this.$store.state.getVerify.bindmsg,
							});
						}
					}).catch((e)=>{
						console.log(e);
					})
				}else{
					this.$store.dispatch('getVerify/bindmobileOld',this.userInfo).then(()=>{
						if(this.$store.state.getVerify.bindoldcode==200){
							this.$toast({
								message:this.$store.state.getVerify.bindoldmsg,
							});
							this.$router.push('/login');
						}else{
							this.$toast({
								message:this.$store.state.getVerify.bindoldmsg,
							});
						}
					}).catch((e)=>{
						console.log(e);
					})
				}				
			},
			getproblemList(){
				this.$store.dispatch('bindmobile/getproblemlist').then(()=>{
					if(this.$store.state.bindmobile.code==200){
						this.problemlist = this.$store.state.bindmobile.problemlist;
					}else{
						this.$toast({
							message:this.$store.state.bindmobile.msg,
						});
					}
				}).catch((e)=>{
					console.log(e);
				})
			},
		}
	}
</script>

<style scoped>
	.top {
		position: fixed;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    background:url("../../../static/img/index-header-bg.png") no-repeat;
	    background-size:cover;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 9999;
	}
	.top img{
		position:absolute;
		width: .21rem;
		height: .4rem;
		left:0.3rem;
		margin-top: .5rem;
	}
	.top span{
		position: absolute;
		right:.3rem;
		font-size:0.37rem;
	}
	.old{
		
	}
	.old p{
		font-size: 0.37rem;
		color: #fff;
		padding: .2rem 0.8rem .4rem 0.8rem;
	}
	.old .p1{
		margin-top: -.4rem;
	}
	.old .p2{
		color: #99a3bf;
	}
	.selected{
	    display: block;
	    width: 6.8rem;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    box-sizing: border-box;
	    background: rgba(255,255,255,0.5);
	    margin: 0 auto 0.8rem;
	    border-radius: 0.13rem;
	    color: #666;
	    font-size: 0.37rem;
	    border:0;
	    outline:0;
	    position: relative;
	}
	.selected .placeholder{
	    padding:0 0.2rem;
		color:#333;
		height:100%;
		box-sizing: border-box;
	}
	.selected .placeholder span{
		overflow: hidden;
		display: inline-block;
		white-space: nowrap; 
		text-overflow:ellipsis; 
		width: 90%;
	}
	.selected .icon img{
	    position: absolute;
	    width:0.32rem;
	    height:0.2rem;
	    top:50%;
	    margin-top:-0.1rem;
	    right:0.3rem;
	}
	.selected .select_menu{
	    width:6.8rem;
	    padding:0 0.27rem;
	    box-sizing: border-box;
	    background-color:#A3A9BA;
	    z-index: 1000;
	    border-radius:0.13rem;
	    text-align:center;
	    display: none;
	    height: 6rem;
	    overflow: auto;	    
	}
	.selected .select_menu li{
	    border-bottom:1px solid #999;
	}
	.selected .select_menu{ display:block; }
	#loginbox {
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  width: 100%;
	  background: url(../../../static/img/bg.png) no-repeat center;
	  background-size: cover;
	  height: 100%;
	  overflow: auto;
	}
	#loginbox .login {
	  position: absolute;
	  background-color: #596487;
	  background: -moz-linear-gradient(top, #596487, #394466);
	  background: -o-linear-gradient(top, #596487, #394466);
	  background: -webkit-gradient(linear, 0 0, 0 bottom, from(#596487), to(#394466));
	  border-radius: 5px;
	  width: 8.4rem;
	  left: 50%;
	  margin-left: -4.2rem;
	  top: 2rem;
	  padding-top: 0.8rem;
	  overflow: auto;
	  margin-bottom: .5rem;
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
	  position: relative;
	  z-index: 10;
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
	border-radius:0.13rem;
	width: 6.8rem;
	height: 1.2rem;
	line-height: 1.2rem;
	margin-bottom: 0.8rem;
	padding: 0 10px 0 10px;
	z-index: 1;
	}
	#loginbox .login form div label {
	position: absolute;
	left: 0.25rem;
	width: 2rem;
	color:#333;
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
	color: #666;
	}
	#loginbox .login form div input::-webkit-input-placeholder,
	#loginbox .login form div textarea::-webkit-input-placeholder {
	color: #666;
	}
	#loginbox .login form div input:-moz-placeholder,
	#loginbox .login form div textarea:-moz-placeholder {
	color: #666;
	}
	#loginbox .login form div input::-moz-placeholder,
	#loginbox .login form div textarea::-moz-placeholder {
	color: #666;
	}
	#loginbox .login form div input:-ms-input-placeholder,
	#loginbox .login form div textarea:-ms-input-placeholder {
	color: #666;
	}
	#loginbox .login form div button {
		position: absolute;
		right: 0.2rem;
		top:50%;
		background-color: #ffbb33;
		cursor: pointer;
		border: none;
		color: white;
		width: 2.3rem;
		height: .8rem;
		line-height:0.8rem;
		line-height: .8rem;
		border-radius: 7px;
		margin:-0.4rem 0 0 0;
	}
	#loginbox .login button {
		background-color: #ffbb33;
		cursor: pointer;
		border: none;
		color: white;
		width: 5.33rem;
		margin: .15rem 0.5rem 1.33rem 0.7rem;
		height: 1.07rem;
		line-height: 1.07rem;
		border-radius: 7px;
	}
	
</style>
<template>
    <div id="loginNew">
    	<div class="top">
			<img src="../../assets/left.png" @click="goback">
			{{title}}
		</div>
        <div class="container">
            <form action="" class="form" autocomplete="off">
                <!-- logo -->
                <div class="logobox">
                    <div class="logo2"></div>
                    <div class="logo1"></div>
                    <img src="../../../static/img/logo.png" alt="logo" class="logo">
                </div>
                <h3 class="tc">登&nbsp;&nbsp;录</h3>
                <label for="">登录名：
                    <input type="text" placeholder="请输入用户名" v-model="loginForm.name" autocomplete="off">
                </label>
                <label for="">密码：
                    <input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off">                    
                </label>
                <router-link to="/retrievePwd">
                    <p class="forgetPwd">忘记密码</p>
                </router-link>
                <div class="tc">
                    <button class="submit" @click="doLogin">登录</button>
                </div>
                
            </form>		
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import top from '../common/top'
    export default{
        name:'loginNew',
        data(){
            return{
                loginForm:{
                    name:'',
                    password:'',
                    
                },
                title:'登录',
                is_mobile:0,
                is_problem:0,
                is_points:0, //判断是否是管理员 - 是否有给下级拨分
            }
        },
        components:{
        	top,
        },
        methods:{
            checkEmpty(info,text){   //判断不为空
                if(info == null || info == ""){
                    this.$toast({message:text+'不能为空'})
                    return false;
                }
            },
            goback(){
            	this.$router.push('index/index');
            },
            checkLogin(){ //判定登录的用户是否绑定过手机号
                if(this.$store.state.loginNew.is_mobile == 1 && this.$store.state.loginNew.is_problem == 1){
                    this.$router.push({
                        name:'index',
                        params:{
                            accessToken:this.$store.state.loginNew.accseeToken,
                        }
                    })
                }else{
                    this.$router.push({
                        name:'Bindmobile',
                        params:{
                            accessToken:this.$store.state.loginNew.accessToken
                        }
                    })
                }
            },
            doLogin(e){
                if(this.checkEmpty(this.loginForm.name,'用户名') == false) return false;
                if(this.checkEmpty(this.loginForm.password,'密码') == false) return false;
                e.preventDefault();
                this.$store.dispatch('loginNew/doLogin',this.loginForm).then(() =>{
                    if(this.$store.state.loginNew.code == 200 ){
                    	this.is_mobile = this.$store.state.loginNew.is_mobile;
                    	this.is_problem = this.$store.state.loginNew.is_problem;
                    	this.is_points = this.$store.state.loginNew.is_points;
                    	// console.log(this.is_mobile+'sdfs'+this.is_problem);
                    	window.localStorage.setItem('is_mobile',this.is_mobile);
                        window.localStorage.setItem('is_problem',this.is_problem);
                        window.localStorage.setItem('is_points',this.is_points);
                        this.checkLogin(); // 登录成功跳转
                    }else{
                        this.$toast({
                            message:this.$store.state.loginNew.msg
                        })
                    }
                })
            },
           
        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    #login{
        position: fixed;
        width:100%;
        height:100%;
        background:url("../../../static/img/bg.png") no-repeat;
        background-size:cover;
    }
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
    /* logo */
    form{padding-top:4.5rem;padding:4.5rem 0 2rem;}
    form label{width:6.8rem;}
    button.submit{margin-top:0.3rem;}
    .logobox{
        width: 2.4rem;
        height:2.4rem;
        position: absolute;
        top:1.33rem;
        left:50%;
        margin-left:-1.2rem;
    }
    .logo2,.logo1,.logo{
        /* border-radius: 50%; */
        position:absolute;
        top:50%;
        left:50%;
    }
    /* .logo2{
        width: 2.4rem;
        height:2.4rem;
        background-color: rgba(51,119,255,0.2);
        margin-left:-1.2rem;
        margin-top:-1.2rem;
    }
    .logo1{
        width:2.14rem;
        height:2.14rem;
        margin-left:-1.07rem;
        margin-top:-1.07rem;
        background-color: rgba(51,119,255,0.3);
    } */
    .logo{
        width:1.86rem;
        height:1.86rem;
        margin-left:-0.93rem;
        margin-top:-0.93rem;
    }
    .forgetPwd{
        width:6.2rem;
        margin: 0 auto;
        font-size:0.37rem;
        color:#999;
        text-align:right;
        margin-top: -.5rem;
        margin-bottom: .5rem;
    }
</style>


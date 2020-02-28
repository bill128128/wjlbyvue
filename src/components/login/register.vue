<template>
    <div id="register">
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
                <h3 class="tc">注&nbsp;&nbsp;册</h3>
                <label for="">用户名:
                    <input type="text" placeholder="请输入用户名" v-model="loginForm.name" autocomplete="off">
                </label>
                <label for="">密码：
                    <input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off">                    
                </label>
                <label for="">确认密码：
                    <input type="password" placeholder="请再次输入密码" v-model="loginForm.rePwd" autocomplete="off">                    
                </label>
                <label for="">推荐人：
                    <input type="text" v-model="loginForm.referees" autocomplete="off" readonly>                    
                </label>
                <div class="tc">
                    <button class="submit" @click.once="register">注册</button>
                </div>
            </form>		
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import top from '../common/top'
    export default{
        name:'register',
        data(){
            return{
                loginForm:{
                    name:'',
                    password:'',
                    rePwd:'',
                    referees:'',//推荐人
                },
                title:'登录',
                // is_mobile:0,
                // is_problem:0,
            }
        },
        components:{
        	top,
        },
        created(){
            this.getUrl();
        },
        methods:{
            getUrl(){  //获取地址中的number 等于的值
                // let url = 'http://www.pjzrsr.com/?from=singlemessage#/register?number=48560772' ;
                // let url = 'http://123.207.34.249/#/register?number=48560772&nsukey=Bjm%2FWLURLgPgcfTxA7fD9cYelJbRBMfnfTu0h8Fwqj9H7wCyybXNMZcmzotlTCMKuuzTqgqtpozaYndWl6SlqOM0lOLSP2amZUv91sktHaXzp%2B63IFEPVUqj%2F3vD2MXTDyg8q5khPxs%2FUlF8ZXLLg0B9UraguiXUEdbHY1sgtjNkST0%2Beu23t5Nb9w27id2SahpgpiCgTM3l5%2BYIW5n4iw%3D%3D' ;
                let url = window.location.href ;
                let num = url.indexOf('?number=');
                this.loginForm.referees = url.substr(num+8,16);
                // url = url.substr(num+1); //从?之后开始截取
                // let arr = url.split('&');//通过&进行分割
                // let resultArr = [] 
                // for(let i = 0 ; i<arr.length ; i++){
                //     let arr1 = arr[i].split('=') ;
                //     let obj = {} ;
                //     this.$set(obj,arr1[0],arr1[1]); 
                //     resultArr.push(obj);
                // }
                // this.loginForm.referees = resultArr[0].number;
            },
            checkEmpty(info,text){   //判断不为空
                if(info == null || info == ""){
                    this.$toast({message:text+'不能为空'})
                    return false;
                }
            },
            goback(){
            	this.$router.push('index/index');
            },
            register(e){
                if(this.checkEmpty(this.loginForm.name,'用户名') == false) return false;
                if(this.checkEmpty(this.loginForm.password,'密码') == false) return false;
                if(this.checkEmpty(this.loginForm.rePwd,'确认密码') == false) return false;
                if(this.loginForm.password != this.loginForm.rePwd){
                    this.$toast({message:'两次输入得密码不一样'})
                     return false ;
                }
                e.preventDefault();
                this.$Indicator.open('注册中');
                this.$store.dispatch('register/register',this.loginForm).then(() =>{
                    console.log(this.loginForm);
                    let backMsg = this.$store.state.register.msg ;
                    if(this.$store.state.register.code == 200 ){
                        this.$Indicator.close() ;
                        this.$toast({
                            message:backMsg
                        })
                    	setTimeout(() => {
                            this.$router.replace('/login');
                        },2000)
                    }else{
                        this.$toast({
                            message:backMsg
                        })
                    }
                })
            },
           
        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    #register{
        /* position: fixed; */
        width:100%;
        height:100%;
        background:url("../../../static/img/bg.png") no-repeat;
        background-size:cover;
    }
    #register .container{
        padding-bottom:0;
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


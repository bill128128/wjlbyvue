<template>
    <div id="QRCode">
        <top :message="title"/>
        <div class="container">
            <!-- 我的推荐码 -->
            <div class="recommended_code">
                
            </div>
            <div class="code">
                <img :src="src" alt="">
            </div>
            <div class="text">
                扫描上面二维码 可注册成为会员<br>
                注册成功后成为您团队中的一员
            </div>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
    import top from '../common/top'
    import foot from '../common/index'
    export default{
        data(){
            return{
                title:'我的二维码',
                src:'',
                pageindex:2,
            }
        },
        components:{
            top,foot
        },
        created(){
            this.isOverdue();
        	this.$store.dispatch('QRCode/getQRcode').then(()=>{
        		if(this.$store.state.QRCode.QRcode == 200){
        			this.src = this.$store.state.QRCode.QRimg;
        		}else{
        			this.$toast({
						message:this.$store.state.QRCode.QRmsg,
					});
        		}
        	}).catch((e) => {              
                alert(输入错误);
            }); 
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
        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    .container{
        position: relative;
        top:1.4rem;
        width:8.4rem;
        margin-top:1.4rem;
        background-color: #ffffff;
	    box-shadow: 0rem 0.13rem 0.13rem 0.01rem rgba(0, 0, 0, 0.1);
        border-radius: 0.13rem;
        padding:0.3rem 0.4rem 0.8rem;;
        box-sizing: border-box;
    }
    .recommended_code{
        height:1.4rem;
        line-height:1.4rem;
        border-bottom:1px solid #e6e6e6;
        font-size:0.37rem;
        color:#999;
        text-align:center;
    }
    .recommended_code span{
        color:#333;
    }
    .code{
        text-align:center;
        border-bottom:1px solid #e6e6e6;
        margin-bottom:0.5rem;
    }
    .code img{
        width:6.77rem;
        height:6.77rem;
        margin:0.5rem auto;
    }
    .text{
        font-size:0.32rem;
        color:#999;
        text-align: center;
    }
</style>


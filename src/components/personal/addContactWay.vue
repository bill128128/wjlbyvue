<template>
    <div id="addContactWay">
        <top :message="title"/>
        <div class="container">
            <form action="" class="form">
                <label for="">手机号：
                    <input type="number" placeholder="请输入其它手机号" v-model="coninfo.telephone">
                </label>
                <label for="">微信号：
                    <input type="text" placeholder="请输入您的微信号" v-model="coninfo.weixin">
                </label>
                <label for="">QQ号：
                    <input type="text" placeholder="请输入您的QQ号" v-model="coninfo.qq">
                </label>
                <div class="tc">
                    <button class="submit" @click="add">立即保存</button>
                </div>
                <!-- 文字说明 -->
                <div class="text">
                    当您点击交易-卖出（需添加您的联系方式方便买家联系您）或其它使用场景；<br><br>
                    为了保护您的隐私，您可以选择填写备用手机号、微信号、QQ号。
                </div>
            </form>
            
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
    import top from '../common/top'
    import foot from '../common/index'
    export default{
    	name:'addContactWay',
        data(){
            return{
                title:'添加联系方式',
                coninfo:{
                	telephone:'',
                	weixin:'',
                	qq:'',
                	default:'1',
                	
                },
                pageindex:2,
            }
        },
        components:{
            top,foot
        },
        created(){
            this.isOverdue();
            this.getContact();
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
        	add(e){
                if(this.coninfo.telephone!="" || this.coninfo.weixin!="" || this.coninfo.qq!=""){
                    e.preventDefault();
                    if(this.$store.state.addContactWay.getdata.length>0){
                        this.$toast({
                            message:'该账号已绑定联系方式！',
                        });
                    }else{
                        this.$store.dispatch('addContactWay/addContactWay',this.coninfo).then(()=>{
                            if(this.$store.state.addContactWay.addContactWaycode == 200){
                                this.$toast({
                                    message:'添加成功！',
                                });
                                this.$router.push('personalPage');
                            }else{
                                this.$toast({
                                    message:this.$store.state.addContactWay.addContactWaymsg,
                                });
                            }
                        }).catch((e) => {              
                            alert(输入错误);
                        })
                    }
                }else{
                    this.$toast({message:'请填写一个联系方式'})
                }
        	},
        	getContact(){        		
            	this.$store.dispatch('addContactWay/getContactWay').then(()=>{
            		if(this.$store.state.addContactWay.getcode == 200){            			
            			this.coninfo.telephone = this.$store.state.addContactWay.gettel;
            			this.coninfo.weixin = this.$store.state.addContactWay.getweixin;
            			this.coninfo.qq = this.$store.state.addContactWay.getqq;
            		}else{
            			this.$toast({
							message:this.$store.state.addContactWay.getmsg,
						});
            		}
            	}).catch((e) => {              
					
				});
            },
        }
    }
</script>
<style scoped>
    @import url("../../../static/css/common");
    #addContactWay{background:url("../../../static/img/bg.png");background-size:cover;}
    form{margin-top:0.7rem;}
    form label{width:6.8rem;}
    form button.submit{margin-top:0.53rem;}
    .text{
        width:7.6rem;
        box-sizing: border-box;
        border:1px solid #99a3bf;
        margin:0.8rem auto 0;
        padding:0.4rem;
        font-size:0.37rem;
        color: #99a3bf;
    }
</style>


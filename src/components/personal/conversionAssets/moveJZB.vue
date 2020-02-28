<template>
	<!-- 转掌聚宝 -->
	<div id="moveJZB">
		<main class="main_available">
            <div class="item">
                <div class="count">{{score}}</div>
                <h3>{{title}}</h3>
            </div>
        </main>
        <!-- 4:表单 -->
        <form action="" class="form">
            <label for="">转出用户：
                <input type="text" v-model="info.turnOut" placeholder="输入接受积分会员用户名">
            </label>
            <label for="">转出数量：
                <input type="text" v-model="info.quantity" placeholder="请输入大于等于100的数值">
            </label>
            <label for="">交易密码：
                <input type="password" v-model="info.password" placeholder="在此输入交易密码">
            </label>
            <div class="tc" @click="moveNow"><button type="" class="submit">立即转出</button></div>
        </form>	
	</div>
</template>

<script>
	export default{
		name:'moveJZB',
		components:{
			
		},
		data(){
			return{
				title:'可转可用掌聚宝',
				info:{
					type:3,
					turnOut:'',//转出账户
					quantity:'',//转出数量
					password:'',//支付密码
				},
				score:'',
				title:'',
			}
		},
		created(){
			this.isOverdue();
			this.$store.dispatch('conversionAssets/getConversionList').then(()=>{
				if(this.$store.state.conversionAssets.conversionAssetscode==200){
					this.conversionlist = this.$store.state.conversionAssets.conversionAssetslist;
					for(var i = 0; i<this.datalist.length;i++){
						if(this.datalist[i].type==3){
							this.score=this.datalist[i].score;
							this.title=this.datalist[i].title;
						}
					}
				}else{
					this.$toast({
						message:this.$store.state.conversionAssets.conversionAssetsmsg,
					});
				}
			}).catch((e) => {              
					alert(输入错误);
				});
		},
		computed:{
			datalist(){
				return this.$store.state.conversionAssets.conversionAssetslist;
			}
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
			moveNow:function(e){
				e.preventDefault();
				this.$store.dispatch('conversionAssets/getConversionAssets',this.info).then(()=>{
					if(this.$store.state.conversionAssets.conversionAssetscode==200){
						this.$toast({
							message:this.$store.state.conversionAssets.conversionAssetsmsg,
						});
						 setTimeout(() => {
                            this.$router.go(0)
                        },2000)
					}else{
						this.$toast({
							message:this.$store.state.conversionAssets.conversionAssetsmsg,
						});
					}
				}).catch((e) => {              
					alert(输入错误);
				});
			},
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common");
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
    .select_box .select_list li{
        width:25%;
    }
    .main_available .item{
        width:100%;
    } 
    /* 表单 */
	form{margin-bottom:1.8rem;}
    form .submit{ margin-top:0.15rem;}
	form label input{
		padding:0;
		height:100%;
	}
</style>
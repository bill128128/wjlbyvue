<template>
	<div>
		<div id="addpartner">
			<top :message="title" :notes="notes"></top>
			<div class="container">
				<form action="" class="form">
					<h3 class="tc">添加您的新伙伴</h3>
					<label for="">用户名：
						<input v-model="partnerInfo.name" type="text" name="name" placeholder="请输入下级用户名" autocomplete="off" @focus="hideFooter">
					</label>
					<label for="">密码：
						<input v-model="partnerInfo.password"  type="password" name="password" placeholder="请输入6-16位登录密码" autocomplete="off">
					</label>
					<label for="">确认密码：
						<input v-model="partnerInfo.repassword" type="password" name="repassword" placeholder="请再次输入登录密码" autocomplete="off">
					</label>
					<div class="tc"><button type="button" @click="addpartner" class="submit">添加</button></div>
				</form>		
			</div>
		</div>
		<foot :pageindex="pageindex" v-show='hidshow'></foot>
	</div>
</template>

<script>
	import top from '../common/top'
	import foot from '../common/index'
	import isLogin from '../../../static/js/islogin' 
	export default{
		data(){
			return{
				title:'招募伙伴',
				partnerInfo:{
					name:'',
					password:'',
					repassword:''
				},
				notes:'明细',
				pageindex:0,
				showFooter:true,
				docmHeight: '0',  //默认屏幕高度
        		showHeight:  '0',  //实时屏幕高度
        		hidshow:true,  //显示或者隐藏footer,
      			isResize:false //默认屏幕高度是否已获取
			}
		},
		components:{
			top,foot
		},
		mounted(){
			// window.onresize监听页面高度的变化
			window.onresize = ()=>{
				console.log("屏幕高度："+this.docmHeight,"实时屏幕高度"+ this.showHeight);
				return(()=>{
					if (!this.isResize) {
						//默认屏幕高度
						this.docmHeight = document.documentElement.clientHeight 
						this.isResize = true
                    }
					//实时屏幕高度
                    this.showHeight = document.body.clientHeight 
				})()
		    }
		},
		watch:{
			showHeight:function() {
				if(this.docmHeight < this.showHeight){
					this.hidshow = false 
		        }else{
					this.hidshow = true
		        }
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
			hideFooter(){
				this.showFooter = false ;
			},
			addpartner:function(e){
				e.preventDefault();
				this.$store.dispatch('addpartner/addpartner',this.partnerInfo).then(()=>{
					if(this.$store.state.addpartner.addpartnercode==200){
						this.$toast({
							message:this.$store.state.addpartner.addpartnermsg,
						});
						this.$router.replace('/addpartner');
						this.partnerInfo.name='';
						this.partnerInfo.password='';
						this.partnerInfo.repassword='';
					}else{
						this.$toast({
							message:this.$store.state.addpartner.addpartnermsg,
						})
					}
				}).catch((e)=>{
					alert('输入错误');
				})
			},
			golist(){
				this.$router.push('/addpartnerList');
			},
			// isLogin(){  //判断是否登录过期
			// 	this.$store.dispatch('isLogin/isLogin').then(() => {
			// 		if(this.$store.state.isLogin.code == 40000){
			// 			this.$router.push('/login');
			// 		}
			// 	}).catch(e => {
			// 		alert(e);
			// 	})
			// }
		}
	}
</script>

<style scoped>
	@import url("../../../static/css/common");
	#addpartner{
		/* position:fixed; */
		min-height:95vh;
		top:0;
		width:100%;
		height:100%;
		background:url("../../../static/img/addpartnerbg.png") no-repeat;
		background-size:cover;
	}
	.container{ margin-top:1.4rem; }
	button.submit{margin-top:0.27rem;}
</style>
// 直推奖详情
<template>
	<div id="#directPrizeList">
		<top :message="title"></top>
		<div class="container">
			<main>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
				<ul class="list">
					<li v-for="(item,index) in list" :key="index">
						<div class="left">
							<div class="name"><span>{{item.cast_type}}</span>(奖励来源)</div>
							<div class="time">{{item.create_time}}</div>
						</div>
						<div class="count">{{item.profit}}</div>
					</li>
				</ul>
				</mt-loadmore>
			</main>
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../../common/top'
	import foot from '../../common/index'
	export default{
		name:'directPrizeList',
		components:{
			top,foot
		},
		data(){
			return{
				title:'直推奖详情',
				list:[],
				pageindex:2,
				ztjid:0,
				page:1,
				pageval:5,
				allLoaded:false,
				bottomDistance:150,
			}
		},
		created(){
			this.isOverdue();
			this.getlist();
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
			loadBottom(){
			 	this.page ++;
			 	this.getlist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
			},
			loadTop: function(){
            	this.page --;
            	if(this.page<=1){
            		this.page = 1;
            		this.allLoaded = true;
            	}
            	this.getlist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
			getlist(){
				this.ztjid = window.localStorage.getItem('ztjid');
				this.$store.dispatch('directPrizeDetail/getDirectPrizeDetail',[this.ztjid,this.page]).then((res) => {
					if(this.$store.state.directPrizeDetail.code == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.directPrizeDetail.list.length){
							this.list = this.$store.state.directPrizeDetail.list;
						}else{
							this.list = this.$store.state.directPrizeDetail.list;
							this.allLoaded = true;
						}						
					}else{
						this.$toast({
							message:this.$store.state.directPrizeDetail.msg
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common.css");
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
</style>
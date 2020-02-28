// 管理奖明细
<template>
    <div id="managementAwardList">
        <top :message='title'/>
        <div class="container">
			<main>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>				
					<ul class="list">
					<li v-for="item in list">
						<div class="left">
							<div class="name"><span>{{item.sum}}</span>(总计奖励)</div>
							<!-- <div class="time"><span>{{item.create_time | formatDate}}</span>(团队)</div> -->
							<div class="time">{{item.username}}&nbsp;(团队)</div>
						</div>
						<div class="count">
							<!-- <div>
								{{item.sum}}
								<span>(总计奖励)</span>
							</div> -->
							<div>
								<div class="button"  @click="goToSrc(item)">详情</div>
							</div>								
						</div>							
					</li>
				</ul>
				</mt-loadmore>
			</main>	
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
                title:'管理奖明细',
                list:[],
                pageindex:2,
                pagesize:1,
                pageval:5,
                allLoaded:false,//是否加载完毕
                bottomDistance:150,
            }
        },
        components:{
            top,foot
        },
        created(){
			this.isOverdue();
			this.getmanagerlist();
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
            goToSrc(item){
				this.$router.push({name:'managementAwardListDetail'});
				window.localStorage.setItem('managementListId',item.id);
            },
            loadBottom: function(){
			 	this.pagesize ++;
			 	this.getmanagerlist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
            loadTop: function(){
            	this.pagesize --;
            	if(this.pagesize<=1){
            		this.pagesize = 1;
            		this.allLoaded = true;
            	}
            	this.getmanagerlist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
            getmanagerlist(){
            	this.$store.dispatch('managementAwardList/getmanagerlist',this.pagesize).then(()=>{
            		this.allLoaded = false;
            		if(this.$store.state.managementAwardList.code == 200){
            			if(this.pageval == this.$store.state.managementAwardList.list.length){
							this.list= this.$store.state.managementAwardList.list;
							console.log(this.list);
            			}else{
							this.list= this.$store.state.managementAwardList.list;
            				this.allLoaded = true;
            			}
            		}else{
            			this.$toast({
            				message:this.$store.state.managementAwardList.msg,
            			});
            		}
            	}).catch((e)=> {
					//alert("error")
				})
            }
        },
        filters:{
        	formatDate (time){
        		if(time !== null || time !==''){
        			time = time.substring(0,10);
        			 return time;
        		}
        	}
        },
    }
</script>

<style scoped>
    @import url('../../../static/css/common');
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
	.list .count{
		display: flex;
		align-items: center;
	}
    .button{
    	width: 1.33rem !important;
		height: 0.64rem;
		background-color: #ffbb33;
		border-radius: 0.08rem;
		color: #FFF;
		font-size: .32rem;
		line-height: .64rem;
		text-align: center;
		float: right;
    }
    .count{
    	display: flex;
    	flex-wrap: wrap;
    	justify-content: flex-end;
    	text-align: right;
    }
    .count div{
    	width: 100%;
    }
    .count span{
    	color: #000;
    	font-size: .32rem;
    	padding-left: .2rem;
    }
	.list .left .name>span{
		color:#ffbb33;
	}
	.list .left .time{
		font-size:0.32rem;
		color:#2e2e4d;
	}
	.list .left .time>span{
		font-size:0.37rem;
		color:#fff;
		margin-right:0.2rem;
	}	
</style>


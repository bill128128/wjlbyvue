<template>
	<div id="municipalAgentList">
		<main class="main_available">
            <div class="item">
                <div class="count">{{this.$store.state.agentRewardList.city.number}}</div>
                <h3>代理人数</h3>
            </div>
            <div class="item">
                <div class="count">{{this.$store.state.agentRewardList.city.Int}}</div>
                <h3>总计代理奖励</h3>
            </div>
            <button class="agent_detail" @click="goToDetail()">详情</button>
        </main>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	export default{
		name:'municipalAgentList',
		data(){
			return{
				agentList:[],
                info:{},
                dataVal:new Date(),
                page:1,
                agentListType:2//状态，1：省，2：市，3：县，4：平级
			}
		},
		mounted(){
            this.getagentRewardList();
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
            // 跳转详情页面
            goToDetail(){
                this.$router.push({
                    name:'agentRewardDetail',
                    params:{agentListType:this.agentListType}
                })
            },
            getagentRewardList(){
            	this.$store.dispatch('agentRewardList/getagentRewardList',this.page).then(() =>{
                    if(this.$store.state.agentRewardList.code == 200){
                        this.agentList = this.agentList.concat(this.$store.state.agentRewardList.city);
                    }else{
                        this.$toast({message:this.$store.state.agentRewardList.msg})
                    }
                }).catch((e)=>{
                    alert("error");
                })
            }
        },
	}
</script>

<style scoped>
	@import url("../../../../static/css/common");
	.main_available{height:4.6rem;position: relative;}
    .main_available .item{  width:50%  }
    .main_available .item:first-child .count{color:#fff;}
    .agent_detail{
        width: 2.14rem;
	    height: 0.75rem;
	    background-color: #ffbb33;
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        position: absolute;
        top:65%;
        left:50%;
        margin-left:-1.07rem;
        border:0;
        outline:0;
        font-size:0.37rem;
        color:#fff;
    }
    .list_title{
        font-size:0.37rem;
        color:#fff;
    }
    .list_title span{
    	color: #7a7acc;
    	float: right;
    }
    .list_title span img{
    	width: .53rem;
    	height: .52rem;
    	margin-left: .3rem;
    	margin-right: .2rem;
    }
</style>
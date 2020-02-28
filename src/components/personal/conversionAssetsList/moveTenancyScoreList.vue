<template>
    <!-- 转租赁积分明细 -->
	<div id="moveTenancyScoreList">
		<!-- 3:button -->
            <ul class="btn">
                <li :class='{active:activeButton == index}' v-for="(item,index) in button" :key="index" @click="changeButton(index),tabChange('select' + (index + 1))">{{item}}</li>
            </ul>
            <!-- 4:list列表明细 -->
            <keep-alive> 
		        <component v-bind:is="tabView"></component>
		    </keep-alive> 
	</div>
</template>

<script>
	import select1 from './inandout/moveTenancyScoreListin'
	import select2 from './inandout/moveTenancyScoreListout'
	export default{
		name:'moveTenancyScoreList',
		data(){
			return{
				button:['转入','转出'],
                activeButton:0,
				tabView: 'select1',
			}
		},
		components:{
			select1,select2
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
			changeButton(index){
                this.activeButton = index;
            },
            tabChange:function(tab){
		      this.tabView = tab;
		    }
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common");
    .container{
    	position: relative;
    	max-height:calc(100% - 1.8rem);
        width:9.2rem;
        margin:0 auto;
        overflow: scroll;
        top: 1.4rem;
    }
    /* 3:button */
    .btn{
        display:flex;
        margin:0.4rem 0;
        justify-content: flex-end;
    }
    .btn li{
        width: 1.87rem;
        height: 0.75rem;
        line-height:0.75rem;
	    background-color:#384466;
        border-radius: 0.08rem;
        text-align:center;
        color: #7a7acc;
        font-size: 0.37rem;
        margin-left:0.4rem;
    }
    .btn li.active{
        background-color: #ffbb33;
        color:#fff;
    }
    /* 4:list列表明细 */
    .item{
        background-image: linear-gradient(-90deg,#384466 0%,#596487 100%);
        box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        padding:0.4rem;
        box-sizing: border-box;
        margin-bottom:0.3rem;
    }
    .user_info{
        display: flex;
        justify-content: space-between;
    }
    .user_info span:first-child{
        color:#2e2e4d;
        font-size:0.32rem;
        line-height:0.48rem;
    }
    .user_info span:first-child .user{
        color:#fff;
        font-size:0.43rem;
    }
    .count{
        color: #ffbb33;
        font-size:0.48rem;
    }
    .time{
        font-size:0.32rem;
        color:#999;
        line-height:0.5rem;
    }
</style>
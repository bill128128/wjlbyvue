<template>
    <!-- 转招募积分明细 -->
	<div id="moveRecruitScoreList">
		<!-- 3:button -->
            <ul class="btn">
                <li :class='{active:activeButton == index}' v-for="(item,index) in button" :key="index" @click="changeButton(index)">{{item}}</li>
            </ul>
            <!-- 4:list列表明细 -->
            <ul class="list_menu">
                <li class="item" v-for="(item,index) in list" v-bind:key="index">
                    <div class="user_info">
                        <span><span  class="user">{{item.user}}</span>&nbsp;&nbsp;(转出用户)</span>
                        <span class="count">{{item.count}}</span>
                    </div>
                    <div class="time">{{item.time}}</div>
                </li>
            </ul>
	</div>
</template>

<script>
	export default{
		name:'moveRecruitScoreList',
		data(){
			return{
				button:['转入','转出'],
                activeButton:0,
				list:[
                    {
                        id:1,
                        user:'ngf1',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:2,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:3,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:4,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:5,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:6,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:7,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:8,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:9,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:10,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:11,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:12,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:13,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:14,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:15,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:16,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:17,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:18,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:19,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                    {
                        id:20,
                        user:'ngf',
                        count:'2000',
                        time:'2018.08.10  09.20'
                    },
                ],
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
			changeButton(index){
                this.activeButton = index;
           },
           
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common");
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
    .list_menu{margin-bottom:2rem;}
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
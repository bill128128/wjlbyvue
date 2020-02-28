// 消耗
<template>
    <div id="consumption">
        <ul class="btn">
            <li v-for="(item,index) in btnList" :key="index" :class="{active:btnActive == index}" @click="changeActiveBtn(index)">{{item}}</li>
        </ul>
        <ul class="list">
            <li v-for="(item,index) in sonList" :key="index">
                <span class="count"> <span>{{item.amount}}</span>({{item.type}})</span>
                <span class="time">{{item.time}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'consumption', //消耗
        data(){
            return{
                btnList:['认购','续购'],
                btnActive:0,    //默认激活按钮
                list:[],
                sonList:[], //认购列表或者续购列表
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
            changeActiveBtn(index){
                this.btnActive = index ;
                this.sonList = [] ;
                if(index == 0)
                    this.sonList = this.list[0].convert ;
                else
                    this.sonList = this.list[0].cast ;
            },
            getList:function(){			
				this.$store.dispatch('recruitScoreList/getList').then(()=>{
					if(this.$store.state.recruitScoreList.recruitScoreListCode == 200){
                        this.list = this.list.concat(this.$store.state.recruitScoreList.list);
                        this.sonList = this.list[0].convert ;
					}else{
						this.$toast({
							message:this.$store.state.recruitScoreList.recruitScoreListMsg,
						});
					}
				}).catch((e)=>{
					alert('输入错误');
				})
			}
        },
        created(){
            this.getList();
        }
    }
</script>
<style scoped>
    ul{
        width:9.2rem;
        margin:0.4rem auto;
    }
    .list li{
        width:100%;
        height:1.6rem;
        background-image: linear-gradient(90deg,#596487 0%,#384466 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 0.4rem;
        font-size:0.32rem;
        color:#1f1f33;
        margin-bottom:0.27rem;
    }
    .btn{
        display: flex;
        justify-content:flex-end;
    }
    .btn li{
        width: 1.87rem;
	    height: 0.75rem;
	    background-color: #384466;
	    border-radius: 0.08rem;
        font-size:0.37rem;
        color:#7a7acc;
        line-height:0.75rem;
        text-align:center;
    }
    .btn li:first-child{
        margin-right:0.4rem;
    }
    .btn li.active{
        color:#fff;
        background-color:#ffbb33;
    }
    .count>span{
        font-size:0.48rem;
        color:#ffbb33;
        margin-right:0.2rem;
    }
    .time{
        color:#999;
    }
</style>


// 获取
<template>
    <div id="obtain">
        <ul>
            <li v-for="(item,index) in obtainList" :key="index">
                <span class="count"> <span>{{item.amount}}</span>({{item.type}})</span>
                <span class="time">{{item.time}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'obtain', //获取
        data(){
            return{
                list:[], //所有列表
                obtainList:[]  //获取列表
            }
        },
        created(){
            this.isOverdue();
            this.getList();
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
            getList:function(){			
				this.$store.dispatch('recruitScoreList/getList').then(()=>{
					if(this.$store.state.recruitScoreList.recruitScoreListCode == 200){
                        this.list = this.list.concat(this.$store.state.recruitScoreList.list);
                        this.obtainList = this.list[0].obtain ;
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
    }
</script>
<style scoped>
    ul{
        width:9.2rem;
        margin:0.4rem auto;
    }
    li{
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
    .count>span{
        font-size:0.48rem;
        color:#ffbb33;
        margin-right:0.2rem;
    }
    .time{
        color:#999;
    }
</style>


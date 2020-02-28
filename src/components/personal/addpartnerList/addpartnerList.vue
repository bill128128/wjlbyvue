<template>
    <div id="addpartnerList">
        <top :message="title"></top>
        <mt-loadmore class="container" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :bottomDistance='bottomDistance'>
        	<ul>
	            <li v-for="(item,index) in list" v-bind:key="index">
	                <span class="user">{{item.username}}</span>
	                <span class="time">{{item.time}}</span>
	            </li>
	        </ul>
        </mt-loadmore>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
	import top from '../../common/top'
	import foot from '../../common/index'
	import { Loadmore } from 'mint-ui';
    export default{
    	name:'addpartnerList',
        data(){
            return{
            	title:'添加伙伴记录', //本页标题
            	allLoaded:false,//是否加载完毕
            	pagesize:1,//请求分页数
                list:[], //接收列表
                pageindex:0,
                pageval:5,
                bottomDistance:150,
            }
        },
		created(){
            this.isOverdue();
            this.gopartnerlist();
		},
		
        components:{
			top,foot
		},
        methods:{
			loadBottom: function(){
			 	this.pagesize ++;
			 	this.gopartnerlist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
            loadTop: function(){
            	this.pagesize --;
            	if(this.pagesize<=1){
            		this.pagesize = 1;
            		this.allLoaded = true;
            	}
            	this.gopartnerlist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
            //调用api加载列表
			gopartnerlist:function(){			
				this.$store.dispatch('addpartner/goPartnerList',this.pagesize).then(()=>{
					if(this.$store.state.addpartner.listcode == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.addpartner.partnerlist.length){
							this.list = this.$store.state.addpartner.partnerlist;
						}else{
							this.list = this.$store.state.addpartner.partnerlist;
							this.allLoaded = true;
						}						
					}else{
						this.$toast({
							message:this.$store.state.addpartner.addpartnermsg,
						});
					}
				}).catch((e)=>{
					alert('输入错误');
				})
            },
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
			}
        }
    }
</script>
<style scoped>
    .container{
    	max-height:calc(100% - 2rem);
        width:9.2rem;
        margin:0 auto;
        overflow: scroll;
        position: relative;
        top: 1.4rem;
    }
    .back{
        float:left;
        width:0.25rem;
        height:100%;
        margin-left:0.4rem;
    }
    .back img{
        width:100%;
    }
    ul{
        width:9.2rem;
        margin:0.4rem auto 1rem;
    }
    li{
        width:100%;
        height: 1.6rem;
        line-height:1.6rem;
	    background-image: linear-gradient(90deg,#596487 0%,#384466 100%);
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        padding:0 0.4rem;
        box-sizing:border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom:0.27rem;
    }
    .user{
        font-size:0.42rem;
        color:#fff;
    }
    .time{
        font-size:0.32rem;
        color:#999;
    }
</style>


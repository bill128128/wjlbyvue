<template>
	<div id="moveJZBListout">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
            <!-- 4:list列表明细 -->
            <ul class="list_menu">
                <li class="item" v-for="(item,index) in list" v-bind:key="index">
                    <div class="user_info">
                        <span><span  class="user">{{item.nickname}}</span>&nbsp;&nbsp;(转出用户)</span>
                        <span class="count">{{item.quantity}}</span>
                    </div>
                    <div class="time">{{item.create_time}}</div>
                </li>
            </ul>
        </mt-loadmore>     
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	export default{
		name:'moveJZBListout',
		data(){
			return{
				info:{
					page:1,  //分页数
					wiring:1, //2转入  1转出
					type:3,  //2招募红利  3转掌聚宝  4租赁积分
				},
                list:[],
				allLoaded:false,//是否加载完毕
				pageval :10,
				bottomDistance:150,
			}
		},
		created(){
            this.isOverdue();
			this.getout();
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
			loadBottom: function(){
			 	this.info.page ++;
			 	this.getout();			 	
			 	this.$refs.loadmore.onBottomLoaded();

            },
            loadTop: function(){
            	this.info.page --;
            	if(this.info.page<=1){
            		this.info.page = 1;
            		this.allLoaded = true;
            	}
            	this.getout();           	
            	this.$refs.loadmore.onTopLoaded();
            },
            getout(){
           	this.$store.dispatch('conversionAssetsList/getConversionAssetsoutDetail',this.info).then(()=>{
					if(this.$store.state.conversionAssetsList.conversionAssetsListcode == 200){
						this.allLoaded = false;
						if(this.pageval == this.$store.state.conversionAssetsList.conversionAssetsListlist.length){
							this.list = this.$store.state.conversionAssetsList.conversionAssetsListlist;
						}else{
							this.list = this.$store.state.conversionAssetsList.conversionAssetsListlist;
							this.allLoaded= true;
						}
						//this.list = this.list.concat(this.$store.state.conversionAssetsList.conversionAssetsListlist);					
					}else{
						this.$toast({
							message:this.$store.state.conversionAssetsList.conversionAssetsListmsg,
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
	@import url("../../../../../static/css/common");
    .container{
    	position: relative;
    	max-height:calc(100% - 1.8rem);
        width:9.2rem;
        margin:0 auto;
        overflow: scroll;
        top: 1.4rem;
    }
    /* 2:分段选择器 */
    .tab_list{
        width:100%;
        height:1.2rem;
        overflow-x:auto;
        white-space:nowrap;
    }
    .tab_list li{
        width:30%;
        display:inline-block;
        text-align:center;
        height:1.2rem;
        line-height:1.2rem;
        font-size:0.37rem;
        color:#fff;
        box-sizing: border-box;
    }
    .tab_list li.active{
        border-bottom:2px solid #ffbb33;
        color:#ffbb33;
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
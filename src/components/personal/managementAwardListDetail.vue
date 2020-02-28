// 管理奖详情
<template>
    <div id="managementAwardListDetail">
       <top :message="title"></top>
		<div class="container">
				<div class="tabItem">
	                <slot></slot>
	            </div>
				<vScroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
				<ul>
					<li v-for="(item,index) in listdata" v-bind:key="index">
		                <span class="user">{{item.sum}}<b>(总计奖励)</b></span>
		                <span class="time">{{item.time | formatDate}}</span>
		            </li>
				</ul>
				</vScroll>
		</div>
		<foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
	import vScroll from '../common/lodemore'
    import top from '../common/top'
    import foot from '../common/index'
    export default{
        name:'managementAwardListDetail',
        data(){
            return{
                title:'管理奖详情',
//              list:[],
                pageindex:2,
//              pagesize:1,
//              pageval:5,
//              allLoaded:false,//是否加载完毕
//				bottomDistance:150,
				// timer:'' //明细列表的id
				counter: 1, //当前页
                num: 15, // 一页显示多少条
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                scrollData: {
                    noFlag: false //暂无更多数据显示
                },
            }
        },
        components:{
           vScroll,top,foot,
        },
        computed:{
        	timer(){
				let timer = window.localStorage.getItem('managementListId');
        		timer = timer.substring(0,10);
        		return timer;
        	}
        },
        created(){
			this.isOverdue();
        	this.loaddata();
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
//      	loadBottom: function(){
//			 	this.pagesize ++;
//			 	this.loaddata();			 	
//			 	this.$refs.loadmore.onBottomLoaded();
//          },
//          loadTop: function(){
//          	this.pagesize --;
//          	if(this.pagesize<=1){
//          		this.pagesize = 1;
//          		this.allLoaded = true;
//          	}
//          	this.loaddata();           	
//          	this.$refs.loadmore.onTopLoaded();
//          },
        	loaddata(){
        		this.$store.dispatch('managementAwardListDetail/getmanagerlistDetail',[this.timer,this.counter]).then(()=>{
        			if(this.$store.state.managementAwardListDetail.code == 200){
        				this.listdata = this.listdata.concat(this.$store.state.managementAwardListDetail.list);
                        if(this.$store.state.managementAwardListDetail.list.length == 0){
                            let more = this.$el.querySelector('.load-more')
                            more.style.display = 'none'; //隐藏加载条
                            //走完数据调用方法
                            this.scrollData.noFlag = true;
                        }
        			}else{
        				this.$toast({
        					message:this.$store.state.managementAwardListDetail.msg,
        				});
        			}
        		}).catch((e)=> {
					//alert("error")
				})
        	},
        	onRefresh(done) {
                this.listdata = []
                this.counter = 1;
                this.loaddata();
                done()
                // this.onInfinite(done)
            },
            onInfinite(done) {
                if(this.scrollData.noFlag){
                    //console.log("111")
                }else{
                    this.counter ++;
                    this.loaddata();
                    done();
                }
            },
            
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
    @import url("../../../static/css/common.css");
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:0 !important;
        overflow: auto;
        min-height: 100vh;
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
        font-size: 0.43rem;
    }
    .user{
        font-size:0.48rem;
        color:#ffbb33;
    }
    .user b{
    	font-size: 0.32rem;
    	color: #1f1f33;
    	font-weight: normal;
    	margin-left: .2rem;
    }
    .time{
        font-size:0.32rem;
        color:#999;
    }
</style>


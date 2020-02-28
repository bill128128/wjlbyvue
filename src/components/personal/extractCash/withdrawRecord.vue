<template>
	<div id="withdrawRecord">
		<top :message="title"></top>
		<div class="container">
			<!-- <vScroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData"> -->
			<ul class="lists">
                <li v-for="(item,index) in list" v-bind:key="index">
                    <div>
                        <span class="count">{{item.money_score}}</span>
                        <span class="cardName">{{item.bank_name}}({{item.bank_card}})</span>
                    </div>
                    <div>
                        <span class="time">{{item.create_time | formatDate}}</span>
                        <span class="status" v-if="item.status==1">申请中（<b v-if='item.card_type == 1'>提现到银行卡</b><b v-if='item.card_type == 2'>提现到购物积分</b>）</span>
                        <span class="status" v-if="item.status==2">已完成（<b v-if='item.card_type == 1'>提现到银行卡</b><b v-if='item.card_type == 2'>提现到购物积分</b>）</span>
                        <span class="status" v-if="item.status==3">已驳回（<b v-if='item.card_type == 1'>提现到银行卡</b><b v-if='item.card_type == 2'>提现到购物积分</b>）</span>
                    </div>
                </li>
            </ul>
            <!-- </vScroll> -->
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import vScroll from '../../common/lodemore'
	import top from '../../common/top'
	import foot from '../../common/index'
	export default{
		name:'withdrawRecord',
		data(){
			return{
				title:'提现记录',
				pageindex:2,
				list:[],
				counter:1,
				scrollData: {
                    noFlag: false //暂无更多数据显示
                },
			}
		},
		components:{
			top,foot,vScroll
		},
		created(){
			this.isOverdue();
			this.getList();
		},
		methods:{
			getList(){
				this.$store.dispatch('withdrawRecord/getCashList',this.counter).then(()=>{
					if(this.$store.state.withdrawRecord.code == 200){
						this.list = this.list.concat(this.$store.state.withdrawRecord.list);
						// if(this.$store.state.withdrawRecord.list.length < 5){
                        //     let more = this.$el.querySelector('.load-more')
                        //     more.style.display = 'none'; //隐藏加载条
                        //     //走完数据调用方法
                        //     this.scrollData.noFlag = true;
                        // }
					}else{
        				this.$toast({
        					message:this.$store.state.withdrawRecord.msg,
        				});
        			}
				}).catch((e)=> {
					//alert("error")
				})
			},
			onRefresh(done) {
                this.list = [];
                this.counter = 1;
                this.getList();
                done()
                // this.onInfinite(done)
            },
            onInfinite(done) {
                if(this.scrollData.noFlag){
                    //console.log("111")
                }else{
                    this.counter ++;
                    this.getList();
                    done();
                }
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

<style scoped lang="less">
	@import url("../../../../static/css/common.css");
	@baseColor:#4d4d4d;
    @countColor:#ffbb33;
    @lightColor:#999;
    .container{
    	min-height: 90vh;
    }
	.lists{
		width:9.2rem;
        margin:0.4rem auto 1rem;       
        li{
            padding:0.3rem 0.3rem;
            background-image: linear-gradient(-90deg, #384466 0%, #596487 100%);
		    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
		    border-radius: 0.13rem;
		    margin:0 auto 0.27rem;
		    color: #fff;
            div:first-child{
                margin-bottom:0.2rem;
            }
            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .count{
                    font-size:0.48rem;
                    color:@countColor;
                }
                .time,.status{
                    color:@lightColor;
                    font-size:0.32rem;
                }
            }
        }
        li:last-child{
            border:0;
        }
    } 
</style>

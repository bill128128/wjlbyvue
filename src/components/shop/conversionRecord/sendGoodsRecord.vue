<template>
    <div id="sendGoodsRecord">
        <!-- 代发货记录 -->
		<mt-loadmore 
			:bottom-method="loadMore" 
			:bottom-all-loaded="allLoaded" 
			ref="loadmore"
			:auto-fill="false"
		>
            <ul class="coversionRecordList">
                <li class="coversionRecordItem" v-for="(item,index) in list" :key="index" @click="gotoProductDetails(item.goods_id)">
                    <div class="item1">
                        <span class="orderCount">订单号：{{item.ordersn}}</span>
                        <span class="status">{{item.delivery}}</span>
                    </div>
                    <div class="item2">
                        <img :src="item.goods_img" alt="">
                        <ul class="goodsList">
                            <li class="total">合计
                                <span v-if='stype == 1'>
                                    <!-- <span>{{item.total_price}}</span>招募积分+<span>{{item.total_score}}</span>
                                    <b v-if="item.goods_type == 1">招募红利</b> 
                                    <b v-if="item.goods_type == 2">消费红利</b>  -->
                                    <span>{{item.total_score}}</span>
                                    <b>购物积分</b>
                                </span>
                                <template v-if='item.int_type == 1'>
                                    <span v-if='stype == 2'>
                                        <!-- <span>{{item.total_price}}</span>
                                        <b>购物券</b> -->
                                        <span>{{item.total_score}}</span>
                                        <b>购物积分</b>
                                    </span>
                                </template>
                                <template  v-if='item.int_type == 2'>
                                    <span v-if='stype == 2'>
                                        <span>{{Number(item.total_price)+Number(item.total_score)}}</span>
                                        <b>复购积分</b>
                                    </span>
                                </template>
                            </li>
                            <li>{{item.goods_title}}</li>
                            <li>共{{item.goods_num}}件商品 <b style='color: #7a7acc;font-size:.32rem;' v-if='item.is_events == 2'>(寄卖商品)</b> </li>
                        </ul>
                    </div>
                    <div class="item3">
                        <span>{{item.order_info}} 
                        </span>
                        <button v-show="item.delivery == '待收货'">确认收货</button>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[],
                info:{
                   page:1, //分页 
                   status:1 //所属类型：0为全部，1待发货，2待收货，3已完成
                },
                stype:'',//1：零售 2：批发
                allLoaded:false,
				loading:false,
				bottomStatus:'',
            }
        },
        created(){
			this.loadMore() ;
		},
		beforeMount(){
			this.$indicator.open('数据加载中') ;
		},
        methods:{
           	loadMore(){
				let shopType = parseInt(window.localStorage.getItem('shopType')) ;
				this.stype = (shopType == 1 ? 1 : ( shopType == 2 ? 2 : 3)) ;
				console.log('stype',this.stype) ;
				this.allLoaded = true ;
				console.log('请求数据了33333');
				setTimeout(() => {
					this.$store.dispatch('conversionRecord/getConversionRecord',[this.info,this.stype]).then(()=>{
						if(this.$store.state.conversionRecord.recordCode == 200){
							this.$indicator.close() ;
							let backList = this.$store.state.conversionRecord.recordList ;
							if(backList.length <= 0){
								this.$toast({message:'没有更多数据'})
							}else{
								this.list = [...this.list,...backList] ;
								this.info.page ++ ;	
							}
							this.$refs.loadmore.onBottomLoaded();
							this.allLoaded = false ;
						}else{
							this.$toast({
								message:this.$store.state.conversionRecord.recordMsg,
							});
						}
					}).catch((e) => {              
						console.log("错误");
					});
				},1000)
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
            gotoProductDetails(productId){  //去商品详情页
                window.localStorage.setItem("pid",productId);
                window.localStorage.setItem('ptype',this.stype);
                this.$router.push("/shop/productDetail");
            }
        }
    }
</script>
<style scoped>
    @import url('../../../../static/css/common');
</style>


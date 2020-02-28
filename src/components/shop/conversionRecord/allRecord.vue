<template>
    <!-- 全部 -->
    <div id="allRecord" style='overflow:scroll'>
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
                            <li>共{{item.goods_num}}件商品 <b style='color: #7a7acc;font-size:.32rem;' v-if='item.is_events == 2'>(寄卖商品)</b></li>
                        </ul>
                    </div>
                    <div class="item3">
                        <span>{{item.order_info}}</span>
                        <button v-show="item.delivery == '待收货'"  @click="sureDeliveryGoods(item.id)">确认收货</button>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    import {Loadmore} from 'mint-ui'
    export default{
        name:'allRecord', //全部记录
        data(){
            return{
                list:[],
                info:{
                   page:1, //分页 
                   status:0, //所属类型：0为全部，1待发货，2待收货，3已完成
                //    shopType:'' ,//1：零售 2：批发
                },
                stype:'',//1：零售 2：批发 3:积分
                allLoaded:false,
                bottomStatus:'',
            	loading:false,
            }
        },
        created(){
            // this.getRecordList();
			// this.info.shopType = window.localStorage.getItem('shopType');
            this.loadMore() ;
		},
		beforeMount(){
			this.$indicator.open('数据加载中') ;
		},
        methods:{
			loadMore(){
                console.log('111111111111111111111111111')
				let shopType = parseInt(window.localStorage.getItem('shopType')) ;
				this.stype = (shopType == 1 ? 1 : ( shopType == 2 ? 2 : 3)) ;
				console.log('stype',this.stype) ;
                this.allLoaded = true ;
                console.log('获取数据的page',this.info.page)
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
            // getRecordList(){ //获取记录列表
            //     if(window.localStorage.getItem('shopType') == '1'){
            //         this.stype = 1 ;
            //     }else if(window.localStorage.getItem('shopType') == '2'){
            //         this.stype = 2 ;
            //     }else{
            //         this.stype = 3 ;
            //     }
            //    	this.$store.dispatch('conversionRecord/getConversionRecord',[this.info,this.stype]).then(()=>{
            //         if(this.$store.state.conversionRecord.recordCode == 200){
            //             this.allLoaded = false;
			// 			if(this.pageval == this.$store.state.conversionRecord.recordList.length){
			// 				this.list = this.$store.state.conversionRecord.recordList;
			// 			}else{
			// 				this.list = this.$store.state.conversionRecord.recordList;
			// 				this.allLoaded = true;
			// 			}			
            //             // this.list = this.$store.state.conversionRecord.recordList ;
            //         }else{
            //             this.$toast({
            //                 message:this.$store.state.conversionRecord.recordMsg,
            //             });
            //         }
            //     }).catch((e) => {              
            //         console.log("错误");
            //     });
            // },
            // loadBottom(){  //加载更多
            //     this.info.page ++;
			//  	this.getRecordList();			 	
			// 	this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            // },
            // loadTop: function(){  //加载更过
            // 	this.info.page --;
            // 	if(this.info.page<=1){
            // 		this.info.page = 1;
            // 		this.allLoaded = true;
            // 	}
            // 	this.getRecordList();           	
            // 	this.$refs.loadmore.onTopLoaded();
            // },
            sureDeliveryGoods(goodsId){  //确认收货
                this.$store.dispatch('conversionRecord/makeSureDeliveryGoods',goodsId)
                .then(() => {
                    if(this.$store.state.conversionRecord.makeSureDeliveryGoodsCode == 200){
                        this.$toast({message:this.$store.state.conversionRecord.makeSureDeliveryGoodsMsg});
                        this.getRecordList();
                    }else{
                        this.$toast({message:this.$store.state.conversionRecord.makeSureDeliveryGoodsMsg})
                    }
                }).catch( e => {
                    console.log("确认收货获取接口失败")
                })
            },
            gotoProductDetails(productId){  //去商品详情页
                window.localStorage.setItem("pid",productId);
                window.localStorage.setItem("ptype",this.stype);
        		// window.localStorage.setItem('ptype',this.info.type);
                this.$router.push("/shop/productDetail");
            }
        }
    }
</script>
<style scoped> 
    @import url('../../../../static/css/common');
</style>


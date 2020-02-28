<template>
    <!-- 批发商城首页 -->
    <div id="shopIndex">
    	<!--头部-->
    	<top :message='title' :notes='notes'></top>
    	<div class="container">
    		<!--搜索-->
    		<div class="search">
    			<img src="../../../static/img/search.png" />
    			<input type="search" placeholder="搜索商品" v-model="info.keyword" @keypress="getsearchlist" />
    		</div>
    		<!--分类-->
    		<div class="select_box">
    			<ul class="select_list">
    				<!-- <li :class="info.type==1?'active':''" @click="changetype(1),getrecruitlist(info)">招募红利商品</li> -->
    				<!-- <li :class="info.type==2?'active':''" @click="changetype(2),getconsumeproductlist(info)">消费红利商品</li> -->
    				<li @click='gotoShoppingCart(2)'>批发商城购物车</li>
					<li></li>
					<li>分类<span class="triangle_border_down"  @click="showClassify"></span>
    					<transition name="fade">
	    					<div class="classify" v-show="classifyShow">
	    						<span class="triangle_border_up"></span>
	    						<ul class="classifyList">
	    							<li @click="getalllist(info)">全部</li>
	    							<li v-for="(item,index) in categoryList" :key='index'>
	    								<div  @click="iconChange(index)"><b @click="changecategory(item.id),getbycategorylist(index)">{{item.title}}</b><img src="../../../static/img/top.png" v-show='item.iconShow'><img src="../../../static/img/bottom.png"  v-show='!item.iconShow'></div>
	    								<ul class="detailList" v-show="item.iconShow">
	    									<li :class="info.category==childItem.id?'active':''" @click="changecategory(childItem.id),getbycategorylist(childIndex)" v-for="(childItem,childIndex) in item.children" :key="childIndex">{{childItem.title}}</li>	    									
	    								</ul>
	    							</li>
	    						</ul>
	    						<div class="clear"></div>
	    					</div>
    					</transition>
    				</li>
    				<div class="clear"></div>
    			</ul>
    			<div class="clear"></div>
    		</div>
    		<!--拥有积分及购买导航-->
    		<ul class="btn">
    			<!-- <li v-if="info.type == 1"><b @click="checkScore">{{this.$store.state.shopIndex.memberInt}}</b><span>招募红利</span></li>
    			<li v-if="info.type == 2"><b @click="checkScore">{{this.$store.state.shopIndex.memberInt}}</b><span>消费红利</span></li> -->
    			<!-- <li>
                    购物券
                </li>
                <li>
    				<ul class="btn1">
    					<li :class="canrecruit ? 'active': '' " @click="changecanrecruit"><b @click="canexchange(info)">可兑商品</b></li>
    				</ul> -->
    			<!-- </li> -->
    		</ul>
    		<main>
    			<!--<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>-->
    			<ul class="product" v-infinite-scroll = "loadBottom" infinite-scroll-disabled = 'loading' infinite-scroll-distance = '0'>
    				<li v-for="(item,index) in proList" :key="index" @click="goproductdetail(item)">
    					<img :src="item.avatar">          
    					<!-- <p class="price" v-if="item.price !=0">{{item.price}}<span>招募积分</span></p>
    					<p class="price">{{item.score}}<span v-if="info.type==1">招募红利</span><span v-if="info.type==2">消费红利</span></p> -->
    					<!-- <p class='price'>{{item.score}}<span>购物券</span></p> -->
    					<p class='price'>{{item.score}}<span>购物积分</span></p>
                        <p class="info">{{item.title}}</p>
    				</li>
    			</ul>
    			<!--</mt-loadmore>-->
    		</main>
    	</div>
    	<foot :pageindex='pageindex'></foot>
    </div>
</template>

<script>
//	import { Loadmore } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import top from '../common/top'
	import foot from '../common/index'
    export default{
        name:'retailShopIndex',
        data(){
            return{
                title:'批发商城',
                notes:'兑换记录',
                pageindex:0,
                classifyShow:false,
                canrecruit:false,
                bottomDistance:50,
                pageval:4,
                allLoaded:false,
                info:{
                	type:2,
                	category:0,
                	keyword:'',
                	page:1,
                	int:'',
                },
                categoryList:[],//分类数组
                proList:[],//商品数组
                loading:true,
            }
        },
        components:{
        	top,foot
        },
        created(){
        	this.getcategoryList();
        	this.getProductList(this.info);
        },
        methods:{
			gotoShoppingCart(type){  //去购物车
				this.$router.push({name:'shoppingCart',params:{type:type}})
			},
        	golist(){
				window.localStorage.setItem('shopType',2);
        		this.$router.push('/shop/conversionRecord');
        	},
        	goproductdetail:function(item){
        		this.$router.push({name:'productDetail',params:{id:item.id}});
        		window.localStorage.setItem('pid',item.id);
        		window.localStorage.setItem('ptype',this.info.type);
        	},
        	loadBottom: function(){
        		this.loading = true;
			 	this.info.page ++;
			 	this.getProductList(this.info);			 	
				//this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
        	checkScore:function(){
        		if(this.$store.state.shopIndex.memberInt == '请登录'){
        			this.$toast({
        				message:'请登录',
        			});
        			this.$router.push('/login');
        		}else{
        			
        		}
        	},
        	showClassify:function(){
        		this.classifyShow = !this.classifyShow;
        	},
        	iconChange:function(index){
        		this.categoryList[index].iconShow = !this.categoryList[index].iconShow;
        	},
        	changecanrecruit:function(){
        		this.canrecruit = !this.canrecruit;
        	},
        	changetype:function(a){
        		this.info.type = a;
        	},
        	changecategory:function(a){
        		this.info.category = a;
        	},
        	getcategoryList:function(){
        		this.$store.dispatch('categoryList/getcategoryList').then(()=>{
        			if(this.$store.state.categoryList.code == 200){
        				this.categoryList = this.$store.state.categoryList.list;
        				for(let i=0; i<this.categoryList.length;i++){
        					this.$set(this.categoryList[i],'iconShow',false);
        				}
        			}else{
        				this.$toast({
        					message:this.$store.state.categoryList.msg,
        				});
        			}
        		}).catch((e)=>{
            		console.log(e);
            	});
        	},
        	getProductList:function(info){
        		this.$store.dispatch('shopIndex/getShopIndex',info).then(()=>{
        			if(this.$store.state.shopIndex.code == 200){
        				if(this.pageval==this.$store.state.shopIndex.dataList.length){
        					this.loading = false;
        					this.proList = [...this.proList,...this.$store.state.shopIndex.dataList];        					
        				}else if(this.$store.state.shopIndex.dataList.length == 0){
        					
        					this.loading = true;
        				}
        				else{
        					this.proList = [...this.proList,...this.$store.state.shopIndex.dataList];        					
							this.loading = true;
        				}
        				//this.info.int = this.$store.state.shopIndex.memberInt;
        				//this.proList = this.proList.concat(this.$store.state.shopIndex.dataList);
        			}else{
        				this.$toast({
        					message:this.$store.state.shopIndex.msg,
        				});
        			}
        		}).catch((e)=>{
            		console.log(e);
            	});
        	},
        	//招募红利搜索
        	getrecruitlist:function(info){
        		this.info.int = '';
        		this.info.type = 1;
        		this.info.page = 1;
        		this.info.category = 0;
        		this.proList = [];       		
        		this.getProductList(info);
        	},
        	//消费红利搜索
        	getconsumeproductlist:function(info){
        		this.info.int = '';
        		this.info.type = 2;
        		this.info.page = 1;
        		this.info.category = 0;
        		this.proList = [];       		
        		this.getProductList(info);
        	},
        	//输入搜索
        	getsearchlist:function(event){
        		this.info.int = '';
        		this.info.page = 1;
        		this.info.category = 0;
        		if(event.keyCode == 13){
					event.preventDefault();
					this.proList=[];
					this.getProductList(this.info);
					this.info.keyword = '';
				}
        	},
        	//查看全部
        	getalllist:function(info){
        		this.info.int = '';
        		this.info.page = 1;
        		this.info.category = 0;
        		this.proList = [];       		
        		this.getProductList(info);
        		this.classifyShow = false;
        	},
        	//分类搜索
        	getbycategorylist:function(event){
        		event.stopPropagation;
        		this.info.int = '';
        		this.info.page = 1;
        		this.proList = [];       		
        		this.getProductList(this.info);
        		this.classifyShow = false;
        	},
        	//可兑换搜索
        	getbymemberintlist:function(info){       		
        		this.info.int = this.$store.state.shopIndex.memberInt;
        		if(this.info.int == "请登录"){
        			this.$toast({
        				message:'您还没有登录不能查询！请登录',
        			});
        			setTimeout(()=>{
        				this.$router.push('/login');
        			},2000)
        		}else{
        			this.info.page = 1;
        			this.proList = []; 
	        		this.getProductList(this.info);
	        		  
        		}        		
        	},
        	//可兑换搜索
        	canexchange:function(info){
        		if(!this.canrecruit){
        			setTimeout(()=>{
        				this.getbymemberintlist(info);
        			},1000);
        			
        		}else{
        			setTimeout(()=>{
        				this.getalllist(info);
        			},1000);
        			
        		}
        	},
//      	scrollToBottom: function () {
//			    this.$nextTick(() => {
//				    var container = this.$el.querySelector(".product");
//			        container.scrollTop = container.scrollHeight;
//			    });
//			}
        },
//      mounted () {    // 添加滚动事件，检测滚动到页面底部    
//			// 注册scroll事件并监听
//	      window.addEventListener('scroll', () => {
//	        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//	        //判断是否滚动到底部
//	        if (scrollTop + window.innerHeight + 0>= document.body.offsetHeight) { //0 表示距离底部多少的距离的开始触发loadmore效果
//	          if (!this.loading) { //防止多次加载	
//	          	this.info.page += 1
//	            this.getProductList(this.info);
//	            //this.getconsumeproductlist(this.info);
//	          }
//	        }
//	      })
//		},        
    }
</script>

<style scoped lang="less">
	@import url("../../../static/css/common.css");
	.container{
		min-height: 15rem;
	}
	.fade-enter-active, .fade-leave-active {
	    transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	    opacity: 0
	}
	.search{
		width: 9.2rem;
		height: 0.85rem;
		background-color: #a3a9ba;
		border-radius: 0.13rem;
		padding: 0 .27rem;
		display: flex;
		align-items: center;
	}
	.search img{
		width: .47rem;
    	height: .47rem;
	}
	.search input{
		background-color: #a3a9ba;
		height: .8rem;
		padding: 0 .3rem;
		width: 80%;
		color: #666;
	}
	.select_list li{
		width: 33%;
		position: relative;
	}
	.classify{
		width: 9.2rem;
		padding: .4rem;
		background-color: #b8bdcc;
		border-radius: 0.13rem;
		position: absolute;
		top: 1.2rem;
		right: -0.1rem;
		.classifyList{
			display: flex;
			flex-wrap: wrap;
			li{
				width: 100%;
				border-bottom: 1px solid #99a3bf;
				color: white;
				font-size: .37rem;
				text-align: left;
				height: auto !important;
				img{
					width: .35rem;
					height: .19rem;
					float: right;
					margin-top: .4rem;
					margin-right: .3rem;
				}
				.detailList{
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					li{
						width: 2.13rem;
						height: 0.85rem;
						background-color: #313859 ;
						border-radius: 0.13rem;
						color: #7a7acc;
						text-align: center;
						border: none;
						margin-bottom: .2rem;
						line-height: .85rem;
						float: none !important;
						margin-right: .2rem;
					}
					li.active{
						background-color: #ffbb33;
						color: #fff;
					}
				}
			}
			li:last-child{
				border: none;
			}
		}
	}
	/*.detailList{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.detailList li.active{
		width: 2.13rem;
		height: 0.85rem;
		background-color: #ffbb33 !important;
		border-radius: 0.13rem;
		color: #fff !important;
	}
	.detailList li{
		width: 2.13rem !important;
		height: 0.85rem !important;
		background-color: #313859 !important;
		border-radius: 0.13rem;
		color: #7a7acc !important;
		text-align: center;
		border: none;
		margin-bottom: .2rem;
		line-height: .85rem !important;
	}
	.classifyList{
		display: flex;
		flex-wrap: wrap;
	}
	.classifyList li{
		width: 100%;
		border-bottom: 1px solid #99a3bf;
		color: white;
		font-size: .37rem;
		text-align: left !important;
	}
	.classifyList li img{
		width: .35rem;
		height: .19rem;
		float: right;
		margin-top: .4rem;
		margin-right: .3rem;
	}
	.classifyList li:last-child{
		border: none;
	}*/
	.triangle_border_down{
	    width:0;
	    height:0;
	    border-width: .19rem .19rem 0;
	    border-style:solid;
	    border-color:#fff transparent transparent;/*白 透明 透明 */
	    margin-left: .2rem;
	    display: inline-block;
	}
	.triangle_border_up{
	    width:0;
	    height:0;
	    border-width:0 .19rem .19rem;
	    border-style:solid;
	    border-color:transparent transparent #a1a6b7;/*透明 透明 灰 */
	    margin-left: .2rem;
	    display: inline-block;
	    position: absolute;
	    right: 1rem;
	    top: -.2rem;
	    z-index: 100;
	}
	.btn{
		display: flex;
		justify-content: center;
		margin: 0.4rem 0;
	}
	.btn li{
		width: 50%;
		color: #FFBB33;
		font-size: .47rem;
	}
	.btn li span{
		font-size: .37rem;
		color: #7a7acc;
		display: inline-block;
		margin-left: .2rem;
	}
	.btn1{
		display: flex;
		justify-content: flex-end;
	}
	.btn1 li{
		width: 1.87rem;
	    height: 0.75rem;
	    line-height: 0.75rem;
	    background-color: #384466;
	    border-radius: 0.08rem;
	    text-align: center;
	    color: #7a7acc;
	    font-size: 0.37rem;
	    margin-left: 0.4rem;
	}
	.btn1 .active{
		background-color: #ffbb33;
    	color: #fff;
	}
	.product{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.product li{
		width: 4.45rem;
		margin-bottom: .3rem;
		background-image: linear-gradient(-30deg, 
		#384466 0%, 
		#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
	}
	.product li img{
		width: 4.45rem;
		height: 4.45rem;
		background-color: #b5bac8;
		border-radius: 0.13rem 0.13rem 0rem 0rem;
	}
	.product li .price{
		color: #FFBB33;
		font-size: .43rem;
		margin: .2rem 0;
		padding-left: .4rem;
	}
	.product li .price span{
		color: #7a7acc;
		font-size: .32rem;
		display: inline-block;
		margin-left: .2rem;
	}
	.product li .info{
	    color: #fff;
	    font-size: 0.32rem;
	    margin-bottom: 0.4rem;
	    padding: 0 0.4rem;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
</style>

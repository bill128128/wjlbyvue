<template>
    <div id="tradePurchase">
        <!-- 搜索表单 -->
        <form action="" class="form">
            <div class="value">
                最新价：<span>{{new_price}}</span>  <button @click="goselllist">点击查看售卖列表</button>
            </div>
            <label for="">              
                	代码：<input type="text" placeholder="请输入购买代码" v-model="info.searchbuyCode" />
                    <span class="emptyCode" @click="emptyCode">×</span>
            </label>
            <label for="">买入量：<input type="number" placeholder="请输入的数量" v-model="info.count"></label>
            <div class="tc">
                <button type="" @click="buy" class="submit">买入</button>
            </div>
        </form>	
        <!-- 记录 -->
        <div class="trade_list">
            <h3>买入记录</h3>
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false" :bottomDistance='bottomDistance'>
            <ul class="trade_list_menu">
                <li class="item" v-for="item in list">
                    <ul class="infomation">
                        <li>
                            <p class="count">{{item.code}}</p>
                            <p class="text">代码</p>
                        </li>
                        <li>
                            <p class="count">{{item.username}}</p>
                            <p class="text">委托人</p>
                        </li>
                        <li>
                            <p class="count">{{item.open_price}}</p>
                            <p class="text">开盘价</p>
                        </li>
                        <li>
                            <p class="count">{{item.buy_number}}</p>
                            <p class="text">购买数量</p>
                        </li>
                    </ul>
                    <ul class="trade_time">
                        <li class="time">{{item.create_time | formart}}</li>
                        <li class="status">
                            <button>{{item.status_msg}}</button>
                        </li>
                    </ul>
                </li>
            </ul>
            </mt-loadmore>
        </div>
    </div> 
</template>

<script>
	import { Loadmore } from 'mint-ui';
    export default{
        name:'tradePurchase',
        data(){
            return{
                info:{
               		code:'',
                    count:'',
                    searchbuyCode:localStorage.getItem('searchbuy') // 搜索的代码
                },
                page:1,
                list:[],
                new_price:'',
                allLoaded:false,//是否加载完毕
                pageval:5,
                bottomDistance:150,
            }
        },
        created(){
            this.buylist();
        },
        methods:{
            emptyCode(){
                this.info.searchbuyCode = "" ;
            },
        	goselllist(e){
        		e.preventDefault();
        		this.$router.push('/searchBuy');
            },
            checkEmpty(info,value){
                if(value == "" || value == null){
                    this.$toast({message:info+'不能为空'})
                    return false;
                }
                return true ;
            },
        	buy(e){
        		e.preventDefault();
                if(this.checkEmpty('代码',this.info.searchbuyCode) == false ) return false ;
                if(this.checkEmpty('买入量',this.info.count) == false) return false;
        		this.$store.dispatch('tradePurchase/buy',this.info).then(()=>{
        			if (this.$store.state.tradePurchase.code == 200) {
        				this.$toast({
							message:this.$store.state.tradePurchase.msg,
						});

						setTimeOut(()=>{
							this.$router.go(0);
						},2000);
        			}else if(this.$store.state.tradePurchase.code == 201){
        				this.$toast({
							message:this.$store.state.tradePurchase.msg,
						});
						setTimeOut(()=>{
							this.$router.go(0);
						},2000);
        			}
        			else{
        				this.$toast({
							message:this.$store.state.tradePurchase.msg,
						});
        			}
        		}).catch((e)=>{
                    // alert("error");
                })
        	},
        	buylist(){
        		this.$store.dispatch('tradePurchase/buylist',this.page).then(()=>{
                    if (this.$store.state.tradePurchase.buycode == 200){
                    	this.allLoaded = false;
        				if(this.pageval == this.$store.state.tradePurchase.list.length){
        					this.list = this.$store.state.tradePurchase.list;
        				}else{
        					this.list = this.$store.state.tradePurchase.list;
        					this.allLoaded = true;
        				}
        				//this.list = this.list.concat(this.$store.state.tradePurchase.list);
        				this.new_price = this.$store.state.tradePurchase.new_price;
        			}else{
        				this.$toast({
							message:this.$store.state.tradePurchase.buymsg,
						});
        			}
        		}).catch((e)=>{
                    // alert("error");
                })
        	},
        	loadBottom: function(){
			 	this.page ++;
			 	this.buylist();			 	
			 	this.$refs.loadmore.onBottomLoaded();
            },
            loadTop: function(){
            	this.page --;
            	if(this.page<=1){
            		this.page = 1;
            		this.allLoaded = true;
            	}
            	this.buylist();           	
            	this.$refs.loadmore.onTopLoaded();
            },
        },
        filters:{
        	formart(time){
        		time = time.substring(0,10);
        		return time;
        	}
        }
    }
</script>

<style scoped>
    @import "../../../../static/css/common";
    .container{
        position:relative;
        top:1.4rem;
        margin-bottom:0;
    }
    .select_list li{ width:50%; }
    .value button{
    	float: right;
    	background: #ffbb33;
    	border-radius: 0.13rem;
    	font-size:.37rem ;
        height: .6rem;
        line-height:0.6rem;
    }
    /* form表单 */
    form{  
        width:9.2rem;
         margin-top:0.4rem; 
         padding:0.8rem;
    }
    form .submit{ 
        width:3.2rem;
        margin:0;
    }
    form label{ 
         width:6.8rem;
         height:0.96rem;
         line-height:0.96rem;
         line-height:0.96rem;
    }
    form .submit{height:0.96rem;line-height:0.96rem;}
    .time{
        white-space: nowrap;
        line-height:0.64rem;
    }
    .search_box{font-size:0.32rem;color:#666;}
    .search{
        width:0.37rem;
        height:0.37rem;
    }
    .emptyCode{
        font-size:0.4rem;
        margin-left:0.2rem;
    }
</style>


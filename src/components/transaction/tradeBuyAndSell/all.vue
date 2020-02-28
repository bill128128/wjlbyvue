<template>
	<div id="all">
		<ul class="trade_list_menu">
            <li class="item" v-for="(item,index) in list" :key="index">
                <ul class="infomation">
                    <li>
                        <p class="count">{{item.code}}</p>
                        <p class="text">代码</p>
                    </li>
                    <li>
                        <p class="count">{{item.business}}</p>
                        <p class="text">委托人</p>
                    </li>
                    <li>
                        <p class="count">{{item.open_price}}</p>
                        <p class="text">开盘价</p>
                    </li>
                    <li>
                        <p class="count">{{item.total}}</p>
                        <p class="text">挂卖数量</p>
                    </li>
                </ul>
                <div class="trade_time">
                    <div>
                        <span class="time">{{item.time | formart}}</span>
                    </div>
                    <ul class="buttons">
                        <li class="bg" v-show="item.status == 1">成交</li>
                        <li class="bg" v-show="item.status == 1">驳回</li>
                        <li class="bg" v-show="item.status == 4">撤回</li>
                        <li class="status">
                            <button>{{item.status_msg}}</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
	export default{
		name:'all',
		data(){
			return{
				//page:1,
				list:[],
			}
		},
		created(){
			this.selllist();
		},
		methods:{
			selllist(){
				this.$store.dispatch('tradeSell/selllist',this.page).then(()=>{
					if(this.$store.state.tradeSell.sellcode == 200){
						this.list = this.list.concat(this.$store.state.tradeSell.list);
					}else{
						this.$toast({
							message:this.$store.state.tradeSell.sellmsg,
						});
					}
				}).catch((e) => {              
					// alert(输入错误);
				});
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
	@import url("../../../../static/css/common.css");
    .buttons{display: flex;}
    .buttons .bg{margin-right:0.2rem}
</style>
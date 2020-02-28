<template>
	<div id="searchBuy">
		<header>
			<div class="top">
				<div class="head-icon" @click="goback">
					<img src="../../assets/left.png">
				</div>
				<div class="search">
					<img src="../../../static/img/search.png" />
					<form  @submit.prevent action="#">
						<input type="search" placeholder="搜索代码" v-model="datacode" @keypress="searchbuy" />
					</form>
				</div>
			</div>	
		</header>
		<div class="content">
			<ul class="list">
				<li class="li" v-for="(item,index) in list" :key="index">
					<ul class="ul1" @click="changeThisItem(item.code)">
						<li>
							<p class="p2">{{item.code}}</p>
							<p class="p3">代码</p>
						</li>
						<li>
							<p class="p2">{{item.username}}</p>
							<p class="p3">委托人</p>
						</li>
						<li>
							<p class="p1">{{item.open_price}}</p>
							<p class="p3">开盘价</p>
						</li>
						<li>
							<p class="p1">{{item.surplus}}</p>
							<p class="p3">委托量</p>
						</li>
					</ul>
					<ul class="ul2">						
						<li @click="showpopup(index)"><img src="../../../static/img/txl.png"><span>{{item.create_time}}</span></li>
						<!--遮罩层 -->
					</ul>
					<mt-popup v-model="item.popupVisible" popup-transition="popup-fade" ><p class="p5">{{item.contact_msg}}:{{item.contact_mode}}<br><br></p>
					<p @click="hide(index)" class="p6" v-clipboard:copy="item.contact_mode" v-clipboard:success="onCopy" v-clipboard:error="onError">
						复制联系方式
					</p>
					</mt-popup>
				</li>

			</ul>
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import top from '../common/top'
    import foot from '../common/index'
	import { Popup } from 'mint-ui';
	export default {
		name:'searchBuy',
		data(){
			return{
				datacode:'',
				list:[],
				contact_mode:'',
				message:'搜索买入',
				pageindex:1,
				code:'',
			}
		},
		components:{
			top,foot,
		},
		created(){
			this.isOverdue();
			this.searchlist();
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
			onCopy: function (e,index) {
				this.$toast({
					message:'复制成功联系方式为:' + e.text,
				});
				//alert(index);
				// this.list[index].popupVisible = false;
		    },
		    hide(index){
		    	this.list[index].popupVisible = false;
		    },
		    onError: function (e) {
		      this.$toast({
				message:'复制失败 ',
			  });
		    },
			goback(){
				this.$router.go(-1);
			},
			searchbuy(event){
				if(event.keyCode == 13){
					event.preventDefault();
					this.searchlist();
				}				
			},
			searchlist(){
				this.$store.dispatch('searchbuy/getsearchbuylist',this.datacode).then(()=>{
					if(this.$store.state.searchbuy.code == 200){
						this.list = this.$store.state.searchbuy.list;
						for(let i=0; i<this.list.length; i++){
							this.$set(this.list[i],'popupVisible',false)
							this.code = this.$store.state.searchbuy.list.code ; 
						}
						if(this.list.length<=0){
							this.$toast({
								message:'目前没有挂卖信息',
							});
							setTimeout(() => {
                           		 this.$router.go(-1);
                        	},2000)
						}
					}else{
						this.$toast({
							message:'输入代码错误',
						});
					}
				}).catch((e)=> {
					// alert(e)
				})
			},
			showpopup(index){				
				this.list[index].popupVisible = true;
				//console.log(index,this.list[index].popupVisible);
			},
			changeThisItem(info){ //选中代码跳转
				this.$router.push('/tradeAction')
				localStorage.setItem('searchbuy',info);
			}
		}
	}
</script>

<style scoped>
	header{
		width:100%;
		background:url("../../../static/img/index-header-bg.png") no-repeat;
		background-size:cover;
	}
	.top {
		width:9.2rem;
		margin: 0 auto;
	    height:1.4rem;
	    line-height:1.4rem;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
		z-index: 9999;
		background-size:cover;
	}
	.top .head-icon {
	  display: inline-block;
	  color: #FFFFFF;
	  float: left;
	}
	.top .head-icon img {
	  width: 0.2rem;
	  height: .4rem;
		}
	.content{
		width: 9.2rem;
		margin: 0 auto;
		position: relative;
	}
	.search{
		width: 8.67rem;
		height: 0.75rem;
		background-color: #a3a9ba;
		border-radius: 0.13rem;
		float: right;
		margin-top: .4rem;
		padding:0 .27rem;
		display: flex;
		align-items: center;
	}
	.search img{
		width: .37rem;
		height: .37rem;
	}
	.search form{
		display: flex;
		align-items: center;
	}
	.search form input{
		background-color: #a3a9ba;
		border: none;
		outline: none;
		width: 7.67rem;
		color: #666;
		padding-left:0.2rem;
		font-size:.37rem;
		color:#666;
	}
	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
		font-size:.37rem;
		color:#666;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		font-size:.37rem;
		color:#666;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
		font-size:.37rem;
		color:#666;
	}
	:-ms-input-placeholder { /* Internet Explorer 10-11 */
		font-size:.37rem;
		color:#666;
	}
	.content .list{
		display: flex;
		height: auto;
		width: 9.2rem;
		margin: 0 auto;
		flex-wrap: wrap;
		margin: .3rem 0 1.4rem;
	}
	.content .list .li{
		width: 9.2rem;
		height: 3.47rem;
		background-image: linear-gradient(-90deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		margin-bottom: .3rem;
		padding: .4rem;
	}
	.content .list .li .ul1{
		box-sizing: border-box;
		padding-top:0.2rem;
		height: 1.8rem;
		border-bottom:1px solid #657299 ;
		display: flex;
	}
	.content .list .li .ul1 li{
		height: 1.8rem;
		text-align: center;
		width: 25%;
	}
	.content .list .li .ul1 li .p1{
		font-size: 0.43rem;
		color: #ffbb33;
		padding-bottom: .2rem;
	}
	.content .list .li .ul1 li .p2{
		font-size: 0.43rem;
		color: #fff;
		padding-bottom: .2rem;
	}
	.content .list .li .ul1 li .p3{
		font-size: 0.32rem;
		color: #000;
	}
	.content .list .li .ul2{
		padding-top: .08rem;
		height: .8rem;
		display: flex;
	}
	.content .list .li .ul2 li{
		width: 100%;
		height: 0.8rem;
		font-size: 0.32rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.8rem;
		letter-spacing: 0rem;
		color: #99a3bf;
		text-align: right;
	}
	.content .list .li .ul2 li img{
		width: .51rem;
		height: .53rem;
		float: left;
		line-height: .8rem;
		margin-top: .2rem;
	}
	
	.mint-popup{
		width: 85% !important;
		background-color: #fff !important;
		color: #ffbb33 !important;
		font-size: .37rem !important;
		font-weight: bold !important;
		height: 3rem !important;	
	}
	.p5{
		text-align:  center;
		color: #999;
		font-size: .43rem;
		margin-bottom: .2rem;
		margin-top: .4rem;
		border-bottom: 1px solid #ddd;
		font-weight: normal;
	}
	.p6{
		text-align:center ;
		color: #26a2ff;
		font-size: .43rem;
		font-weight: normal;
	}
	
</style>
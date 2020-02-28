<template>
	<div id="noticeList">
		<top :message="title"></top>
		<div class="container">
			<ul class="newlist" v-infinite-scroll = "loadBottom" infinite-scroll-disabled = 'loading' infinite-scroll-distance = '0'>
				<li v-for="(item,index) in list" :key="index" @click="goToNotice(item)">
					<p class="p1">
						{{item.title}}
					</p>
					<p class="p1" v-html="item.description">{{item.description}}</p>
					<p class="p1"><span>{{item.create_time}}</span></p>
				</li>
			</ul>
		</div>
		<footer class="w100">
            <ul class="footer_list">
                <li class="active" @click='gotoSrc("/")'>
                    <img src="../../../../static/img/footer_index_icon_active.png">
                    <h4>首页</h4>
                </li>
                 <!-- <li @click="checkgologin('/transaction/index')">
                    <img src="../../../../static/img/footer_trade_icon.png">
                    <h4>交易</h4>
                </li>
                 <li @click="checkgologin('/personalPage')">
                    <img src="../../../../static/img/footer_my_icon.png">
                    <h4>我的</h4>
                </li> -->
            </ul>
        </footer>
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	import top from '../../common/top'
    import foot from "../../common/index"
	export default{
		name:'noticeList',
		components:{
			top,foot
		},
		data(){
			return{
				title:'新闻列表',
				page:1,
				list:[],
				allLoaded: false,
				pageindex:0,
				pageval:10,
				bottomDistance:150,
				loading:true,
			}
		},
		created(){
			this.noticelists();
		},
		methods:{
			loadBottom: function(){
        		this.loading = true;
			 	this.info.page ++;
			 	this.getProductList(this.info);			 	
				//this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            
			noticelists(){
				this.$store.dispatch('home/noticeList',this.page).then(()=>{
					if(this.$store.state.home.noticelistcode == 200){
						if(this.pageval == this.$store.state.home.noticelist.length){
							this.loading = false;
							this.list=[...this.list,...this.$store.state.home.noticelist];
						}else if(this.$store.state.home.noticelist.length == 0){
							this.loading = true;
						}
						else{
							this.list=[...this.list,...this.$store.state.home.noticelist];
							this.loading = true;
						}
						
						
					}else{
						this.$toast({
							message:this.$store.state.home.noticelistmsg,
						});
					}
				}).catch((e)=>{
					alert(e);
				});

			},
			goToNotice(item){ //去公告详情页
				this.$router.push({name:'notice',params:{id:item.id}});
				window.localStorage.setItem('noticeid',item.id);
			},
			gotoSrc(src){
				this.$router.push(src);
			},
			checkgologin(uri){
            	const token = window.localStorage.getItem('date');
            	if(token==null || token=='undefined'){
            		this.$toast({
            			message:'请先登录',
            		});
            		this.$router.push('/login')
            	}else{
            		this.$router.push(uri);
            	}
            },
		}
	}
</script>
<style scoped>
	@import url("../../../../static/css/common.css");
	.container{
		width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.8rem;
	}
	.newlist{
		margin-bottom:1.8rem;
		overflow-y:scroll;
	}
	.newlist li{
		width: 9.2rem;
	    background-image: linear-gradient(-90deg, #384466 0%, #596487 100%);
	    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
	    margin:0 auto 0.27rem;
	    display: flex;
	    box-sizing: border-box;
	    justify-content: space-between;
	    padding:0.4rem;
	    color: white;
	    font-size:.37rem;
	   
	    flex-wrap: wrap;
	}
	.newlist li .p1{
		width: 100%;
		padding-bottom: .2rem;
	}
	.newlist li .p1 a{
		color: #fff;
	}
	.newlist li span{
		color: #999;
		font-size: .32rem;
		text-align: right;
		display: block;
		float: right;
	}
	footer{
		width: 100%;
        height:1.3rem;
        position: fixed;
        bottom:0;
        left:0;
        background-color: #313859;
	    box-shadow: 0 -0.01rem 0.03rem 0 rgba(255, 255, 255, 0.4);
    }
    .footer_list{
        height:100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .footer_list img{
        width:0.6rem;
        height:0.6rem;
    }
    .footer_list h4{
        font-size:0.27rem;
        text-align:center;
        color:#7a7acc;
    }
    .footer_list li.active h4{
        color:#fff;
    }
</style>
<template>
	<div id="notice">
		<top :message='title'></top>
		<div class="container">
			<div class="intro">
				<h2>{{noticetitle}}</h2>
				<div v-html="noticecontent">{{noticecontent}}</div>
			</div>
		</div>
		<footer class="w100">
            <ul class="footer_list">
                <li class="active">
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
	import top from '../../common/top'
    import foot from "../../common/index"
	export default{
		name:'notice',
		components:{
			top,foot
		},
		data(){
			return{
				title:'详情',
				noticetitle:'',  //公告标题
				noticecontent:'', //公告内容
				pageindex:0,
				noticeid:0
			}
		},
		created(){
			//加载完毕调用接口
			this.noticeid = window.localStorage.getItem('noticeid');
			this.$store.dispatch('home/noticeDetail',this.noticeid).then(()=>{
				if(this.$store.state.home.noticeDetailcode == 200){
					this.noticetitle = this.$store.state.home.noticetitle;
					this.noticecontent = this.$store.state.home.noticecontents;
				}else{
					this.$toast({
						message:this.$store.state.home.mtgetnoticeDetailmsg,
					});
				}
			}).catch((e) => {              
					alert(输入错误);
				});
		},
		methods:{
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
	.intro{
		width: 9.2rem;
		/*height: 10.24rem;*/
		background-image: linear-gradient(-90deg, 
			#384466 0%, 
			#596487 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
		padding: 0.6rem;
	}
	.intro img{
		width: 100%;
		height: 100%;
	}
	.intro h2{
		color: white;
		text-align: center;
		margin-bottom: .5rem;
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
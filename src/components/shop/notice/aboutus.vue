<template>
	<div id="aboutus">
		<top :message='title'></top>
		<div class="container">
			<div class="intro">
				
				<div v-html="aboutuscontent">{{aboutuscontent}}</div>
			</div>
		</div>
		<footer class="w100">
            <ul class="footer_list">
                <li class="active">
                    <img src="../../../../static/img/footer_index_icon_active.png">
                    <h4>首页</h4>
                </li>
                 <li @click="checkgologin('/transaction/index')">
                    <img src="../../../../static/img/footer_trade_icon.png">
                    <h4>交易</h4>
                </li>
                 <li @click="checkgologin('/personalPage')">
                    <img src="../../../../static/img/footer_my_icon.png">
                    <h4>我的</h4>
                </li>
            </ul>
        </footer>
	</div>
</template>

<script>
	import top from '../../common/top'
    import foot from "../../common/index"
	export default{
		name:'aboutus',
		components:{
			top,foot
		},
		data(){
			return{
				title:'了解我们',
				aboutustitle:'',//标题
				aboutuscontent:'',//内容
				pageindex:0,
			}
		},
		created(){
			//页面加载完毕调用vuex中的接口函数
			this.$store.dispatch('aboutus/aboutUs').then(()=>{
				if(this.$store.state.aboutus.aboutuscode == 200){
					this.aboutustitle = this.$store.state.aboutus.aboutustitle;
					this.aboutuscontent = this.$store.state.aboutus.aboutuscontent;
				}else{
					this.$toast({
						message:this.$store.state.aboutus.aboutusmsg,
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
        top:1.4rem;
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
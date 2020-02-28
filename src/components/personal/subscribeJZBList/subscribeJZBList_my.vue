<template>
    <!-- 我的页面中，招募积分明细 模块 -->
	<div id="subscribeJZBList_my">
		<div class="container">
			<div class="content">
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"  bottomDistance=180>
				<ul class="list">
					<li class="li">
						<ul class="ul1">
							<li>
								<p class="p1">1000</p>
								<p class="p3">认购掌聚宝</p>
							</li>
							<li>
								<p class="p2">1000</p>
								<p class="p3">招募积分</p>
							</li>
						</ul>
						<ul class="ul2">
							<li>认购类型：转出</li>
							<li>2018.1.3</li>
						</ul>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		</div>
		
	</div>
</template>

<script>
	import top from '../../common/top'
	import { Loadmore } from 'mint-ui';
	export default{
		name:'subscribeJZBList_my',
		data(){
			return{
				page:1,//当前页数
				bill:[],//接收数组
				allLoaded:false
			}
		},
	}
</script>

<style scoped>
	.container{width:9.2rem;position: relative;margin:0 auto;overflow-y: scroll;}
	/* .content{
		width: 9.2rem;
		margin: 0 auto;
		overflow-y: scroll;
	} */
	/*个人信息*/
	.content .box{
		width: 9.2rem;
		height: 3.33rem;
		background: url('../../../../static/img/subscribeJZB_bg.png') no-repeat;
		background-size: cover;
		border-radius: 0.13rem;
		margin-top:0.4rem;
	}
	.content .box .p1{
		text-align: center;
		color: #ffbb33;
		font-size: .64rem;
		padding-top: .8rem;
		font-weight: bold;
	}
	.content .box .p2{
		text-align: center;
		color: #fff;
		font-size: .32rem;
		padding-top: .2rem;
	}
	.content .list{
		display: flex;
		height: auto;
		width: 9.2rem;
		margin: 0 auto;
		flex-wrap: wrap;
		margin: .4rem 0 1rem;
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
		height: 1.8rem;
		border-bottom:1px solid #657299 ;
		display: flex;
	}
	.content .list .li .ul1 li{
		height: 1.8rem;
		text-align: center;
		width: 50%;
	}
	.content .list .li .ul1 li .p1{
		font-size: 0.64rem;
		color: #ffbb33;
		padding-bottom: .2rem;
	}
	.content .list .li .ul1 li .p2{
		font-size: 0.64rem;
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
		width: 50%;
		height: 0.8rem;
		font-size: 0.32rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.8rem;
		letter-spacing: 0rem;
		color: #99a3bf;
		text-align: center;
	}
</style>
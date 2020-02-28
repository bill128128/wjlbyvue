<template>
	<div id="recruitProduct">
		<ul class="btn">
			<li>2000<span>招募红利</span></li>
			<li>
				<ul class="btn1">
					<li class="active">可兑商品</li>
					<li>可兑商品</li>
				</ul>
			</li>
		</ul>
		<main>
			<ul class="product">
				<li>
					<img src="../../../dist/static/img/photo.png">
					<p class="price">1000<span>招募积分</span></p>
					<p class="price">1000<span>招募红利</span></p>
					<p class="info">雪蛤胶囊清除血液垃……</p>
				</li>
				<li>
					<img src="../../../dist/static/img/photo.png">
					<p class="price">1000<span>招募积分</span></p>
					<p class="price">1000<span>招募红利</span></p>
					<p class="info">雪蛤胶囊清除血液垃……</p>
				</li>
				<li>
					<img src="../../../dist/static/img/photo.png">
					<p class="price">1000<span>招募积分</span></p>
					<p class="price">1000<span>招募红利</span></p>
					<p class="info">雪蛤胶囊清除血液垃……</p>
				</li>
				<li>
					<img src="../../../dist/static/img/photo.png">
					<p class="price">1000<span>招募积分</span></p>
					<p class="price">1000<span>招募红利</span></p>
					<p class="info">雪蛤胶囊清除血液垃……</p>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
	export default{
		name:'recruitProduct',
		data(){
			return{
				
			}
		},
	}
</script>

<style scoped>
	.btn{
		display: flex;
		justify-content: center;
		margin: 0.4rem 0;
	}
	.btn li{
		width: 50%;
		color: #FFBB33;
		font-size: .53rem;
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
	.btn1 li.active{
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
		font-size: .32rem;
		margin-bottom: .4rem;
		padding-left: .4rem;
	}
</style>
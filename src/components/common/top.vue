<template>
	<div>
		<div class="top">
			<img src="../../assets/left.png" @click="goback">
			{{message}}
			<span @click="golist">{{notes}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'top',
		data(){
			return{
				
			}
		},
		props:['message','notes','url'],
		methods:{
			goback:function(){
				this.$router.go(-1);
			},
			golist:function(){
				this.$parent.golist();
			}
		}
	}
</script>

<style scoped>
	.top {
		position: fixed;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    background:url("../../../static/img/index-header-bg.png") no-repeat;
	    background-size:cover;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 1000;
	}
	.top img{
		position:absolute;
		width: .21rem;
		height: .4rem;
		left:0.3rem;
		margin-top: .5rem;
	}
	.top span{
		position: absolute;
		right:.3rem;
		font-size:0.37rem;
	}
</style>
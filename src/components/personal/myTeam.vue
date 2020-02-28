<template>
	<div>
		<top :message="title"></top>
		<div class="team">
			<p class="p1">{{num}}</p>
			<p class="p2">团队人数</p>
		</div>
	</div>
</template>

<script>
	import top from '../common/top'
	export default{
		name:'myTeam',
		components:{
			top
		},
		data(){
			return{
				title:'我的团队',
				num:'2000',
				
			}
		}
	}
</script>

<style scoped>
	.team{
		position: absolute;
		left: 50%;
		top: 2rem;
		margin-left: -4.5rem;
		width: 9rem;
		height: 3rem;
		background: url(../../../static/img/teambg.png) no-repeat center;
		background-size:contain ;
		background-size:100% ;
		border-radius: 7px;
	}
	.team .p1{
		padding-top:.6rem ;
		padding-bottom: .3rem;
		color: #ffbb33;
		font-size: .8rem;
		font-weight:bold ;
		text-align: center;
	}
	.team .p2{
		color: white;
		text-align: center;
	}
</style>
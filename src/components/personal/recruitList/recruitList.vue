<template>
	<div>
		<top :message="title"></top>
		<div class="container">
			<div class="select_box">
				<ul class="tab select_list">
					<li v-for="(item,index) in tab" v-bind:key='index'  @click="tabIndex(index),tabChange('select' + (index + 1))" :class="{active:index == num}">{{item}}</li>
				</ul>
			</div>
			<keep-alive>
				<component v-bind:is="tabView"></component>
			</keep-alive>
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import top from '../../common/top'
	import foot from '../../common/index'
	import select1 from './recruitScoreAndRecruitBonusList' //招募积分+招募红利
	import select2 from './JZBAndRecruitBonusList' // 掌聚宝+招募红利
	export default{
		name:'recruitList',
		data(){
			return{
				tabView: 'select1',
				tab:['招募积分+招募红利','掌聚宝+招募积分'],
                num:0,
                title:'我要续购明细',
                pageindex:0,
			}
		},
		components:{
        	top,select1,select2,foot,
		},
		created(){
			this.isOverdue();
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
            // 切换tab标签,改变样式
            tabIndex(index){
                this.num = index ;
            },
            tabChange:function(tab){
		        this.tabView = tab;
		    }
        }
	}
</script>

<style scoped>
	@import "../../../../static/css/common";
	.select_list li{width:50%;}
	.tab{
        height:1.2rem;
        line-height:1.2rem;
        box-sizing: border-box;
        display:flex;
        border-bottom:1px solid #666;
        position: relative;
        top: 1.4rem;
    }
    .tab li{
        width:50%;
        text-align: center;
        font-size:0.37rem;
        color:#fff;
       height:1.2rem;
    }
    .tab li.active{
        color:#ffbb33;
        border-bottom:2px solid #ffbb33;
    }
	.content{
		width: 9.2rem;
		margin: 0 auto;
		position: relative;
		top: 2.5rem;
		overflow-y: scroll;
	}
	.content .list{
		display: flex;
		height: auto;
		width: 9.2rem;
		margin: 0 auto;
		flex-wrap: wrap;
		margin-top: .5rem;
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
		font-size: 0.47rem;
		color: #ffbb33;
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
</style>
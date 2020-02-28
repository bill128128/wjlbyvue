<template>
	<div>
		<keep-alive>
		<footer class="w100">
            <ul class="footer_list">
                <li  @click="switchTo('/index/index')">
                	<img :src="'/index/index' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页">
                	<h4 :class="{on: '/index/index' === $route.path}">首页</h4>
                </li>
                <li  @click="switchTo('/transaction/index')">
                	<img :src="'/transaction/index' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="交易">
                	<h4 :class="{on: '/transaction/index' === $route.path}">交易</h4>
                </li>
                <li  @click="switchTo('/personalPage')">
                	<img :src="'/personalPage' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="我的">
                	<h4 :class="{on: '/personalPage' === $route.path}">我的</h4>
                </li>
            </ul>
        </footer>
        </keep-alive>
	</div>
</template>

<script>
	
	export default{
		name: 'index',
		data(){
			return{
				footerIndexNum:0,
				tabBarImgArr:[   //图片切换
			        {normal: require('../../../static/img/footer_index_icon.png'), selected: require('../../../static/img/footer_index_icon_active.png')},
			        {normal: require('../../../static/img/footer_trade_icon.png'), selected: require('../../../static/img/footer_trade_icon_active.png')},
			        {normal: require('../../../static/img/footer_my_icon.png'), selected: require('../../../static/img/footer_my_icon_active.png')},
			      ]
			}
		},
		methods:{
			changeIndex(index){
                this.footerIndexNum = index ;
                for(let i =0 ; i < this.footer_list.length ; i ++){
                    this.footer_list[i].active = false;
                }
                this.footer_list[index].active = true ;
                this.$router.push(this.footer_list[index].url);
            },
			switchTo(path){
		      this.$router.replace(path);
		    }
		}
		
	}
</script>

<style scoped>
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
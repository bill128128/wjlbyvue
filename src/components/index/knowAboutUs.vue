<template>
    <div id="knowAboutUs">
        <top :message="title"></top>
        <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" tag="div">
            <!-- 两个半圆 -->
            <keep-alive>
                <component :is="circleActiveView"></component>
            </keep-alive>
            <div class="textBox" :class="[{animated : contentActive},{fadeInDownBig : contentActive},{show : contentActive}]">
                <div class="textBoxBg1"></div>
                <div class="textBoxBg2"></div>
                <div class="textBoxBg3">
                    <keep-alive> 
                        <component v-bind:is="textBoxActiveView" :content="content"></component>
                    </keep-alive>  
                </div>
            </div>
            <div class="titleBox" :class="[{animated : contentActive},{fadeInUpBig : contentActive},{show : contentActive}]">
                <keep-alive>
                    <component :is="titleBoxActiveView" :content="content"></component>
                </keep-alive>
            </div>
        </v-touch>
		<foot :pageindex="pageindex"></foot>
    </div>
</template>
<script>
	import top from '../common/top'
	import foot from '../common/index'
    import VueTouch from 'vue-touch'
    import content1 from './knowAboutUs/introductionContent' //公司介绍 - 内容
    import title1 from './knowAboutUs/introductionTitle'     //公司介绍 - 标题
    import circle1 from './knowAboutUs/introductionCircle'   //公司介绍 - 半圆

    import content2 from './knowAboutUs/valueContent'        //未来价值 - 内容
    import title2 from './knowAboutUs/valueTitle'            //未来价值 - 标题
    import circle2 from './knowAboutUs/valueCircle'          //未来价值 - 半圆

    import content3 from './knowAboutUs/teamContent'         //管理团队 - 内容
    import title3 from './knowAboutUs/teamTitle'             //管理团队 - 标题
    import circle3 from './knowAboutUs/teamCircle'           //管理团队 - 半圆
    export default{
        name:'knowAboutUs',
        data(){
            return{
                contentActive:false,
                textBoxActiveView:'content1', //内容默认加载第一个
                titleBoxActiveView:'title1',  //标题默认加载第一个
                circleActiveView:'circle1',   //半圆默认加载第一个
                activeIndex:1,                //默认激活第一个
                title:'了解我们',
                pageindex:0,
                content:[],   //获取的内容 - 图片内容标题等
            }
        },
        components:{
            content1,title1,circle1,
            content2,title2,circle2,
            content3,title3,circle3,
            top,foot,
        },
        created(){
            setTimeout(() => {   //内容加动态样式
                this.contentActive = true ;
            },500);
            this.getContent();
        },
        methods:{
            onSwipeLeft(){            //左滑动
                if(this.activeIndex < 3){
                    this.activeIndex += 1 ;
                    this.tabContentTitle(this.activeIndex);
                }else{
                    this.activeIndex = 1 ;
                    this.tabContentTitle(this.activeIndex);
                }
                
            },
            onSwipeRight(){           //右滑动
                if(this.activeIndex > 1){
                    this.activeIndex -= 1 ;
                    this.tabContentTitle(this.activeIndex);
                }else{
                    this.activeIndex = 3 ;
                    this.tabContentTitle(this.activeIndex);
                }
            },
            goBack(){                 //返回上一页
                this.$router.go(-1);
            },
            tabContentTitle(index){
                this.textBoxActiveView = 'content' + index ;
                this.titleBoxActiveView = 'title' + index ;
                this.circleActiveView = 'circle' + index ;
            },
            getContent(){            //获取内容
                this.$store.dispatch('knowAboutUs/getContent').then(() => {
					if(this.$store.state.knowAboutUs.code==200){
                        this.content = this.$store.state.knowAboutUs.list;
					}else{
						this.$toast({
							message:this.$store.state.knowAboutUs.msg,
						});
					}					          
				}).catch((e) => {              
					alert(输入错误);
				})
            }
        }
    }
</script>
<style scoped> 
    @import url('../../../static/css/animate.min');
    #knowAboutUs{
        width:100%;
        min-height:100vh;
        background:url('../../../static/img/knowAboutUs_bg.png') no-repeat;
        background-size:cover;
        position: relative;
        top:0;
    }
    /* header */
    .top {
		position: fixed;
		top: 0;
		width:100%;
	    height:1.4rem;
	    line-height:1.4rem;
	    background-size:cover;
	    font-size:0.45rem;
	    color:#fff;
	    text-align: center;
	    z-index: 9999;
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
    /* 内容 */
    .textBox{
        width:7.34rem;
        min-height:2rem;
        position: absolute;
        top:2.84rem;
        left:50%;
        margin-left:-3.67rem;
        display: none;
    }
    .textBoxBg1,.textBoxBg2,.textBoxBg3{
        background-image: linear-gradient(-40deg, 
		#384466 0%, 
		#596487 100%);
	    box-shadow: 0rem -0.13rem 0.5rem 0.03rem 
		rgba(31, 31, 51, 0.15);
        border-radius: 0.13rem;
        position: absolute;
        left:50%;
    }
    .textBoxBg1{
        width: 6.28rem;
        height: 8.28rem;
        top:0;
        margin-left:-3.14rem;
        opacity: 0.5;
    }
    .textBoxBg2{
        width: 6.8rem;
        height: 7.87rem;
        top:0.4rem;
        margin-left:-3.4rem;
        opacity: 0.7;
    }
    .textBoxBg3{
        width:7.34rem;
        height:7.47rem;
        top:0.8rem;
        margin-left:-3.67rem;
        box-sizing: border-box;
        padding:0.6rem;
        color:#fff;
        font-size:0.37rem;
        text-align: center;
    }
    .titleBox{
        width:8.4rem;
        height:4.27rem;
        background-size:cover;
        position: absolute;
        top:10.93rem;
        left:50%;
        margin-left:-4.2rem;
        background-image: linear-gradient(-40deg,#384466 0%,#596487 100%);
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
	    border-radius: 0.13rem;
        display: none;
    }
    .show{ display: block; }
</style>

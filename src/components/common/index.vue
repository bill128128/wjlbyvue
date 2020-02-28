<template>
	<div>
		<footer class="w100">
            <ul class="footer_list">
                <li v-for="(item,index) in  footer_list" :key='index' >
                	<router-link :to="{path:item.url}">
	                    <img :src="index===pageindex ? item.iconSrcActive : item.iconSrc" :alt="item.title">
	                    <h4 :class="index===pageindex ? item.fontshow : item.fonthide">{{item.title}}</h4>
                    </router-link>
                </li>
            </ul>
        </footer>
	</div>
</template>

<script>
	
	export default{
		name: 'index',
		props:['pageindex'],
		data(){
			return{
				footerIndexNum:0,
                footer_list:[
                    {
                        index:0,
                        title:'首页',
                        fontshow:'fontshow',
                        fonthide:'fonthide',
                        iconSrc:'./static/img/footer_index_icon.png',
                        iconSrcActive:'./static/img/footer_index_icon_active.png',
                        active:true,
                        // url:'/index/index'
                        url:'/'
                    },
                    // {
                    //     index:1,
                    //     title:'交易',
                    //     fontshow:'fontshow',
                    //     fonthide:'fonthide',
                    //     iconSrc:'./static/img/footer_trade_icon.png',
                    //     iconSrcActive:'./static/img/footer_trade_icon_active.png',
                    //     active:false,
                    //     url:'/transaction/index'
                    // },
                    // {
                    //     // index:2,
                    //     index:1,
                    //     title:'我的',
                    //     fontshow:'fontshow',
                    //     fonthide:'fonthide',
                    //     iconSrc:'./static/img/footer_my_icon.png',
                    //     iconSrcActive:'./static/img/footer_my_icon_active.png',
                    //     active:false,
                    //     url:'/personalPage'
                    // }
                ],
                isOriginHei: true,
                screenHeight: document.documentElement.clientHeight,        //此处也可能是其他获取方法
                originHeight: document.documentElement.clientHeight,
			}
		},
		methods:{
			changeIndex(index){
                this.footerIndexNum = index ;
                for(let i =0 ; i < this.footer_list.length ; i ++){
                    this.footer_list[i].active = false;
                }
                this.footer_list[index].active = true ;
            },
		},
		 mounted() {
            let self = this;
            window.onresize = function() {
                return (function(){
                    self.screenHeight = document.documentElement.clientHeight;
                })()
            }
        },
        screenHeight (val) {
            if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
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
	    z-index: 10000;
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
    .footer_list .fonthide{
        font-size:0.27rem;
        text-align:center;
        color:#7a7acc;
    }
    .footer_list .fontshow {
        font-size:0.27rem;
        text-align:center;
        color:#fff;
    }
    .footer_list li.active h4{
        color:#fff;
    }


</style>
<template>
	<div>
		<keep-alive>
		<footer class="w100">
            <ul class="footer_list">
                <li v-for="(item,index) in  footer_list" :key='index' :class="{active:index == footerIndexNum}" @click="changeIndex(index)">
                    <img :src="item.iconSrc" :alt="item.title" v-show="!item.active">
                    <img :src="item.iconSrcActive" alt="item.title" v-show="item.active">
                    <h4>{{item.title}}</h4>
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
                footer_list:[
                    {
                        index:0,
                        title:'首页',
                        iconSrc:'../../../static/img/footer_index_icon.png',
                        iconSrcActive:'../../../static/img/footer_index_icon_active.png',
                        active:true,
                        url:'/index/index'
                    },
                    {
                        index:1,
                        title:'交易',
                        iconSrc:'../../../static/img/footer_trade_icon.png',
                        iconSrcActive:'../../../static/img/footer_trade_icon_active.png',
                        active:false,
                        url:'/transaction/index'
                    },
                    {
                        index:2,
                        title:'我的',
                        iconSrc:'../../../static/img/footer_my_icon.png',
                        iconSrcActive:'../../../static/img/footer_my_icon_active.png',
                        active:false,
                        url:'/personalPage'
                    }
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
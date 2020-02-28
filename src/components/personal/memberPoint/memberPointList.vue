<template>
    <div id='memberPointList'>
        <top :message="title"/>
        <div class="container">
            <div class="loadmore" style="overflow:scroll;">
                <mt-loadmore
                    :bottom-method="loadMore"
                    @bottom-status-change="handleBottomChange"
                    :bottom-all-loaded="allLoaded"
                    ref="loadmore"
                    :auto-fill='false'
                >
                    <ul class="lists">
                        <li v-for="(item,index) in list" :key="index">
                            <div>
                                <span class="count">拨分数量：123456</span>
                                <span class="cardName">被拨分人：1234455</span>
                                <span class="status">拨分时间：2019-04-09 12:05:04</span>
                            </div>
                            
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import top from '../../common/top'
import { api } from '../../../constans/index.js'
export default {
    name:'memberPointList',
    data(){
        return{
            title:'拨分记录',
            list:[],
			allLoaded:false, //false：加载未完成,可以继续加载；true：加载完成，不能继续加载
			bottomStatus:'',
			loading:false,
			page:1,
        }
    },
    components:{
        top
    },
    beforeMount(){
		this.$Indicator.open('数据加载中');
    },
    created(){
        this.loadMore();
    },
    methods:{
        loadMore(){ 
			var me = this;
      		console.log("请求数据了");
			me.allLoaded = true; // 若数据已全部获取完毕，不允许在继续加载
			setTimeout(() => {
				let token = window.localStorage.getItem('date') ;
				this.$axios.get(api+'/finance/user/pointsList',{
					params:{
						accessToken:token,
						page:this.page
					}
				}).then(res => {
					var me = this;
                    let backdata = res.data ;
                    console.log('返回的数据',res.data);
					if(backdata.code == 200){
						this.$Indicator.close() ;
						this.list = [...this.list,...backdata.list] ;
						this.page ++ ;
						if(backdata.list.length <= 0){
                            this.$toast({message:'没有更多数据了'})
						} 
					}
					me.$refs.loadmore.onBottomLoaded();
					me.allLoaded = false;
				}).catch(e => {
					console.log(e) ;
				})
			},1000)
		},
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
    }
}
</script>
<style lang="less" scoped>
    @import url('../../../../static/css/common.css');
    @baseColor:#4d4d4d;
    @countColor:#ffbb33;
    @lightColor:#999;
    .lists{
		width:9.2rem;
        margin:0.4rem auto 1rem;       
        li{
            padding:0.3rem 0.3rem;
            background-image: linear-gradient(-90deg, #384466 0%, #596487 100%);
		    box-shadow: 0 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
		    border-radius: 0.13rem;
		    margin:0 auto 0.27rem;
		    color: #fff;
            div:first-child{
                margin-bottom:0.2rem;
            }
            div{
                display: flex;
                flex-flow: column;
                text-align: left;
                span{padding:.2rem 0;}
                .count{
                    font-size:0.4rem;
                    color:@countColor;
                }
                .time,.status{
                    color:@lightColor;
                    font-size:0.37rem;
                }
            }
        }
        li:last-child{
            border:0;
        }
    } 
</style>



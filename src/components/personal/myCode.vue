<template>
    <div id='myCode'>
        <top :message='title'/>
        <div class="container">
			<div class="loadmore" style="margin-bottom:80px;overflow:scroll;">
				<mt-loadmore
					:bottom-method="loadMore"
					@bottom-status-change="handleBottomChange"
					:bottom-all-loaded="allLoaded"
					ref="loadmore"
					:auto-fill='false'
				>
					<ul class="addressList">
						<li v-for='(item,index) in list' :key='index'>
							<div class="info">
								<div class="userInfo">
									<span>{{item.round}}</span>
									<span>{{item.down}}</span>
								</div>
								<div>
									<div class="address">购物倍数：{{item.number}}</div>
									<div class="address">报单原来数量：{{item.or_number}}</div>
								</div>
								
							</div>
							<div class="status">
								<span>复投码：{{item.code}}</span>
								<div class="btns" v-if='item.is_copy == 1' @click='copyCode(item.code)'>复制</div>
							</div>
						</li>
					</ul>
				</mt-loadmore>
			</div>
        </div>
    </div>
</template>
<script>
import top from '../common/top'
import { Loadmore } from 'mint-ui';
export default {
    name:'myCode',
    data(){
        return{
            title:'我的复投码',
            page:1,//分页
            list:[],
			allLoaded:false, //false：加载未完成,可以继续加载；true：加载完成，不能继续加载
            bottomStatus:'',
            loading:false,
        }
    },
    components:{
        top
    },
    created(){
        // this.getList();
        this.loadMore() ;
	},
	beforeMount(){
		this.$indicator.open('数据加载中');
	},
    methods:{
		loadMore(){
			console.log("请求数据了");
			this.allLoaded = true;
			setTimeout(() => {
                var me = this ;
				this.$store.dispatch('myCode/getList',this.page).then(()=>{
					let backCode = this.$store.state.myCode.code ;
                    let backList = this.$store.state.myCode.list ;
                    this.$indicator.close() ;
					if(backCode == 200){
						this.list = [...this.list,...backList] ;
						if(backList.length <= 0){
							this.$toast({message:'没有更多数据'})
						}else{
							this.page ++ ;
						}
					}else{
						this.$toast({message:this.$store.state.myCode.msg})
					}
					me.$refs.loadmore.onBottomLoaded();
                    me.allLoaded = false;
					
				}).catch((e)=>{
					console.log(e);
				})
			},1000)
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        copyCode(code){  //复制code
            console.log(code);
            window.sessionStorage.setItem('myCode',code);
            if(window.sessionStorage.getItem('myCode') == undefined){
                this.$toast({
                    message:'复制失败，请重新复制'
                })
            }else{
                this.$toast({message:'成功复制：'+code})
            }
        }
    }
}
</script>
<style scoped>
    @import url('../../../static/css/common.css');
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.8rem;
        box-sizing: border-box;
        overflow-y: scroll;
        margin-bottom:2rem;
    }
    .pageBox{
        display: flex;
        color:#fff;
        font-size:.37rem;
        justify-content: center;
    }
    .pageBox span{
        border: solid 0.03rem #1f1f33;
        border-radius: .13rem;
        padding:.2rem .4rem;
    }
    .pageBox span:first-child{
        margin-right:.4rem;
    }
    .addressList li{
        width: 9.2rem;
        background:url('../../../static/img/address_bg.png') no-repeat;
        background-size:cover;
        border-radius: 0.13rem;
        padding:0.5rem 0.4rem 0.3rem ;
        box-sizing: border-box;
        font-size:0.37rem;
        color:#fefefe;
        margin-bottom:0.4rem;
    }
    .addressList .info{
        padding-bottom:0.4rem;
        border-bottom:0.01rem solid #313859;
    }
    .userInfo{
        display: flex;
        justify-content: space-between;
    }
    .address{
        margin-top:0.3rem;
        font-size:0.32rem;
        line-height:0.48rem;
    }
    .default{ float:left; }
    .status{
        display: flex;
        justify-content: space-between;
        margin-top:.3rem;
    }
    .btns {
        padding:0 .3rem;
        height: 0.75rem;
        line-height:0.69rem;
	    border-radius: 0.08rem;
        background-color: #ffbb33;
        font-size:0.37rem;
        color:#fff;
        outline:0;
        box-sizing: border-box;
    }
    .btns button:first-child{
        margin-right:0.53rem;
    }
    .addAddressBtn{
        width: 5.33rem;
        height: 1.07rem;
        line-height:1.07rem;
	    background-color: #ffbb33;
    	box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        border:0;
        outline:0;
        font-size:0.43rem;
        color:#fff;
        margin:1.07rem auto 0;
        text-align:center;
    }
</style>




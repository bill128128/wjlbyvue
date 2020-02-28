<template>
    <div id="paySuccess">
        <div class="success">√</div>
        <p>支付成功</p>
        <div class="pay">
            实付：<span>{{totalPrice}}</span><b>招募积分</b>+<span>{{totalScore}}</span><b v-if="type==1">招募红利</b><b v-if="type==2">消费红利</b>
        </div>
        <ul>
            <li @click="buymore">兑换更多</li>
            <li @click="seerecord">查看订单</li>
        </ul>
    </div>
</template>
<script>
    export default{
    	name:'paySuccess',
        data(){
            return{
				orderid:0,
				totalPrice:0,
				totalScore:0,
				type:0,
            }
        },
        created(){
        	this.orderid = window.localStorage.getItem('orderid');
        	
        	this.payDetail();
        },
        methods:{
        	buymore(){
        		this.$router.push('/shop/index');
        	},
        	seerecord(){
        		this.$router.push('/shop/conversionRecord');
        	},
        	payDetail(){
        		this.$store.dispatch('paySuccess/getPayDetail',this.orderid).then(()=>{
        			if(this.$store.state.paySuccess.code == 200){
        				this.totalPrice = this.$store.state.paySuccess.prodata.total_price;
        				this.totalScore = this.$store.state.paySuccess.prodata.total_score;
        				this.type = this.$store.state.paySuccess.prodata.goods_type;
        			}else{
        				this.$toast({
            				message:this.$store.state.paySuccess.msg,
            			});
        			}
        		}).catch((e)=>{
        			console.log(e);
        		})
        	}
        }
    }
</script>
<style scoped>
    body,html{font-family: "Microsoft YaHei";}
    .success{
        width:1.97rem;
        height:1.97rem;
        line-height:1.87rem;
        text-align:center;
        border-radius: 50%;
        box-sizing: border-box;
        border:0.05rem solid #ffbb33;
        margin:2.13rem auto 0.4rem;
        font-size:0.8rem;
        color:#ffbb33;
    }
    p,.pay{
        font-size:0.64rem;
        color:#fff;
        text-align:center;
    }
    .pay{
    	font-size:0.5rem;
        color:#ffbb33;
        margin:2.4rem auto 3rem;
    }
    .pay b{
    	font-weight: normal;
    	color:#7A7ACC ;
    	font-size: .37rem;
    }
    ul{
        width:6.14rem;
        display: flex;
        justify-content: space-between;
        margin:0 auto;
    }
    li{
        width: 2.67rem;
        height: 1.07rem;
        line-height:1.07rem;
	    background-color: #ffbb33;
        border-radius: 0.13rem;
        color:#fff;
        font-size:0.43rem;
        text-align:center;
    }
</style>


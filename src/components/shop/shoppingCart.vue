<template>
    <!-- 购物车 -->
    <div id='shoppingCart'>
        <top :message="title"/>
        <div class="container">
            <ul class="coversionRecordList">
                <li class="coversionRecordItem" v-for='item in list' @click.prevent="goproductdetail(item)">
                    <div class="item2">
                        <img :src="item.img[0]" alt="">
                        <ul class='goodsList'>
                            <li class="total">
                                <template v-if='type == 1'>
                                    <span>￥{{item.score}}&nbsp;</span>购物积分
                                </template>
                                <template v-if='type == 2'>
                                    <!-- <span>￥{{item.score}}</span>购物券 <span>+{{item.score}}</span>购物积分 -->
                                    <span>{{item.score}}</span>购物积分
                                </template>
                                <template v-if='type == 3'>
                                    <span>￥{{item.score}}&nbsp;</span>礼品积分
                                </template>
                            </li>
                            <li>{{item.title}}</li>
                            <li class='deleteBtn'>
                                <span>共{{item.buyCount}}件商品</span>
                                <!-- <span>共1件商品</span> -->
                                <span class='btn' @click.stop='touchin(item.id)'>删除</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="buy">
            <div class='buyContent'>
                <div v-if='this.type == 1'>
                    <span>总计&nbsp;:&nbsp;{{this.total}}购物积分</span>
                </div>
                <div v-if='this.type == 2'>
                    <span v-if='this.info.intType == 1'>总计&nbsp;:&nbsp;{{this.total/10*2}}购物卷 + {{this.total/10*2}}购物积分</span>
                    <!-- <span v-if='this.info.intType == 1'>总计&nbsp;:&nbsp;{{this.total/10*2}}购物积分</span> -->
                    <span v-if='this.info.intType == 2'>总计&nbsp;:&nbsp;{{this.total/10*2*2}}复购积分</span>
                </div>
                <div v-if='this.type == 3'>
                    <span>总计&nbsp;:&nbsp;{{this.total}}礼品积分</span>
                </div>
            </div>
            <div class="countBox">
                <div style='color:#FFBB33;font-size:.37rem;'>倍数：</div>
                <span @click='changeCount(1)'>-</span>
                <input type="number" class='countBoxNum' min='0' v-model="info.moduleCount" @keyup="changeNumber">
                <span @click='changeCount(2)'>+</span>
            </div>
            <div class='selectBox'>
                <div class='selectWay' v-if='type == 2'>
					<div @click='selectWayItem(item.value,index)' class="selectWayItem" :class="{'active':selectWayItemActive == index}" v-for='(item,index) in pifaWay' :key='index' >{{item.title}}</div>
                    <div class='codeBox' v-if='selectWayItemActive == 1' @click='pauseCode'>{{info.myCode}}</div>
                </div>
                <div class='selectWay'>
                    <!-- <label>
						<input name="buyWay" type='radio' value='1' v-model="info.selfLifting">&nbsp;线上邮寄
					</label>
					<label>
						<input name="buyWay" type='radio' value='2' v-model="info.selfLifting">&nbsp;线下自提
					</label>
                    <label v-if='type == 2'>
						<input name="buyWay" type='radio' value='3' v-model="info.selfLifting">&nbsp;寄卖
					</label> -->
                    <div class="buyWay" :class="{'active':isActive == index}" v-for='(item,index) in selectWay1' :key='index' v-if='type == 1 || type == 3' @click='selectWay(item.value,index)'>{{item.title}}</div>
                    <div class="buyWay" :class="{'active':isActive == index}" v-for='(item,index) in selectWay2' :key='index' v-if='type == 2' @click='selectWay(item.value,index)'>{{item.title}}</div>
				</div>
            </div>
            <div class="buyButton" style='padding:.2rem .4rem .4rem;display:flex;justify-content:center'>
                <span class='buyBtn' @click='buy()' style='flex-grow:1'>结算</span>
            </div>
            
        </div>
    </div>
</template>
<script>
import top from '../common/top'
import { Checklist } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {api} from '../../constans/index.js'
import axios from 'axios'
export default {
    name:'shoppingCart',
    inject:['reload'],  //注入
    data(){
        return{
            selectWay1:[
                {
                    value:1,
                    title:'线上邮寄'
                },
                {
                    value:2,
                    title:'线下自提'
                }
            ],
            selectWay2:[
                {
                    value:3,
                    title:'寄卖'
                },
                {
                    value:1,
                    title:'线上邮寄'
                },
                {
                    value:2,
                    title:'线下自提'
                },
                
            ],
            pifaWay:[
                {
                    value:1,
                    // title:'购物券+购物积分'
                    title:'购物积分'
                },
                {
                    value:2,
                    title:'复购积分'
                }
            ],
            title:'购物车',
            list:[],
            type:'', //从哪个商城跳转到购物车的 1:零售商城 2:批发商城 3:礼品商城
            total:0,
			othertotol:0,
			sumOrder:0,
            info:{
                ptype:'',//从哪个商城跳转到购物车的 1:零售商城 2:批发商城 3:礼品商城
                intType:1, //批发商城 - 购分+购券/复购积分
                selfLifting:1, //线上，线下，寄卖
                pnumber:[],//数量+pid
                pid:'',
                stringPnumber:'' ,
                moduleCount:1,//新增 - 整体数量
                myCode:'点击粘贴您的复投码',//没有code
            },
            isActive:0, 
            selectWayItemActive:0,
           
        }
    },
    components:{
        top
    },
    created(){
        this.type = Number(this.$route.params.type) ;
        this.getContent();
        this.getTotal();
        if(this.type == 2){
            this.info.selfLifting = 3 ;
        };
		this.getCheckPid();
    },
    computed:{
    },
    methods:{
        // refresh(){
        //     console.log('刷新下') ;
        //     this.reload();  //刷新当前页
        // },
        changeNumber(){
            let str = '' + this.info.moduleCount;
            if (str.indexOf('.') != -1) {
                let arr = str.split('');
                arr.splice(arr.length - 1);
                let str2 = arr.join('');
                this.info.moduleCount = +str2;
            }
        },
        pauseCode(){  //粘贴code码
            let myCode = window.sessionStorage.getItem('myCode') ;
            if(myCode == undefined || myCode == "" ){
                this.$toast({message:'您还没有复制复投码，请到个人中心去复制'});
                setTimeout(() => {
                    this.$router.push('/myCode');
                },1000)
            }else{
                this.info.myCode = myCode ;
            }
        },
        changeCount(num){  //加减数量
            switch(num){
                case 1 :
                    // console.log('减少')
                    if(this.info.moduleCount <=1 ){
                        this.info.moduleCount = 1 ;
                    }else{
                        this.info.moduleCount -- ;
                    }
                    break;
                case 2 : 
                    // console.log('相加')
                    this.info.moduleCount ++ ;
                    break;
            }
			var sum = this.checkPid();
			this.total = sum;
        },
		checkPid(){ //判断商品id是不是11
			var sum = 0;
			var count = this.info.moduleCount;
			for (var i=0 ; i<this.list.length;i++) {
				var elevenScore = parseFloat(this.list[i].score);
				if(this.list[i].id == 11){		
					if(this.sumOrder<=0 && count==1){
						elevenScore = elevenScore * (2-1) * count
					}else if(this.sumOrder<=0 && count >1){
						elevenScore = elevenScore * 2 * count - elevenScore;
					}
					else{						
						elevenScore = elevenScore * 2 * count;
						//console.log(this.sumOrder);						
					}
					//console.log(elevenScore);
					//掉用接口接收购买了几个再计算积分																					
				}else{
					elevenScore = elevenScore * count;
				}
				sum += elevenScore;						
			}
			//console.log(sum);
			return sum;
		},
        selectWayItem(value,index){ //批发商城 - 选择购分+购券/复购积分
            // console.log(value,index);
            this.selectWayItemActive = index ;
            this.info.intType = value ;
        },
        selectWay(selfLiftingVal,index){  //选择线上、线下、寄卖
            if(this.type == 1 || this.type == 3){  //零售商城
                this.info.selfLifting = selfLiftingVal ;
                this.isActive = index ;
            }else{  //批发商城 - 新需求  不允许选择线上、线下，但是显示
                this.info.selfLifting = 3 ;
                this.isActive = 0 ;
            }
        },
		getCheckPid(){
			this.$store.dispatch('checkPid/checkPid').then(()=>{
				if(this.$store.state.checkPid.code == 200){
					this.sumOrder = this.$store.state.checkPid.sumOrder;
					console.log("sumOrder的值为："+JSON.stringify(this.$store.state.checkPid.sumOrder));					
					this.total = this.checkPid();
				}
			}).catch((e)=>{
				console.log(e);
			})	
		},
        gotoProductDetails(productId){  //去商品详情页
            window.localStorage.setItem("pid",productId);
            this.$router.push("/shop/productDetail");
        },
        // 删除该商品
        touchin(pid){  
            // console.log(this.list);
            clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
            this.Loop = setTimeout(function() {
                // alert('是否确认删除')
                MessageBox.confirm('确定删除该商品？').then(action => {
                    console.log('yes');
                    this.list = this.list.filter(i => {
                        return i.id != pid ;
                    })
                    this.total = 0 ;
                    if(this.list == null || this.list == '' || this.list == undefined ){
                    }else{
                        for(let i = 0 ; i < this.list.length ; i++){
                            this.total += parseFloat(this.list[i].score);
                        }
                    }
                    // console.log('删除之后');
                    // console.log(this.list);
                    // console.log(this.type);
                    if(this.type == 1){
                        window.sessionStorage.setItem('shoppingCartRetail',JSON.stringify(this.list)) ;
                    }else if(this.type == 2){
                        window.sessionStorage.setItem('shoppingCartWhole',JSON.stringify(this.list)) ;
                    }else if(this.type == 3){
                        window.sessionStorage.setItem('shoppingCartGift',JSON.stringify(this.list)) ;
                    }
                    this.$toast({message:'删除成功'});
                    this.getTotal();
                }).catch(() => {
                    // console.log('no');
                });
            }.bind(this), 0);
        },
        getContent(){  //在session中获取放入购物车得商品
            if(this.type == 1){
                this.list = JSON.parse(window.sessionStorage.getItem('shoppingCartRetail'));
                // console.log(this.list) ;
            }else if(this.type == 2){
                this.list = JSON.parse(window.sessionStorage.getItem('shoppingCartWhole'));
            }else if(this.type == 3){
                this.list = JSON.parse(window.sessionStorage.getItem('shoppingCartGift'));
            }
            if(this.list == null || this.list == '' || this.list == undefined ){
            }else{
                for(let i = 0 ; i < this.list.length ; i++){
                    this.total += parseFloat(this.list[i].score*this.list[i].buyCount);
					this.othertotol += parseFloat(this.list[i].score*this.list[i].buyCount);
                }
            }
        },
        goproductdetail:function(item){  //去商品详情
            this.$router.push({name:'productDetail',params:{id:item.id}});
            window.localStorage.setItem('pid',item.id);
            window.localStorage.setItem('ptype',this.type);
        },
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
        buy(){  //结算
            // console.log(this.total);
            // console.log(this.type);
            this.isOverdue(); //测试是否过期
            if(this.total == 0){
                this.$toast({message:'您没有需要支付的商品'}) ;
                return false ;
            }
            // console.log(typeof this.type) ;
            console.log('信息',this.info);
            console.log('商城类型',this.type);
            switch(this.type){
                case 1 :  //零售商城
                    console.log('零售商城') ;
                    if(this.total == 3000){
                    }else{
                        this.$toast({message:'商品总额必须为3000分'});
                        return false ;
                    }
                    // console.log(typeof this.info.selfLifting) ;
                    switch(this.info.selfLifting){  //线下，线上，寄卖
                        case 2 :   //线下自提
                            console.log('线下') ;
                            this.pinInfo();
                            console.log(this.info) ;
                            this.$messagebox.confirm('是否确认下单?').then(action => {
                                this.$Indicator.open('下单中') ;
                                this.$store.dispatch('shoppingCart/downlineBuy',[this.info,this.type]).then(()=>{
                                    let backMsg = this.$store.state.shoppingCart.downlineBuy.msg ;
                                    if(this.$store.state.shoppingCart.downlineBuy.code == 200){
                                        window.sessionStorage.removeItem('shoppingCartRetail') ;
                                        this.$Indicator.close() ;
                                        this.reload();
                                        this.$toast({message:backMsg}) ;
                                    }else{
                                        this.$toast({message:backMsg}) ;
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }).catch(() => {})
                            
                            break;
                        case 1 : 
                            this.pinInfo();
                            let proInfo = window.sessionStorage.setItem('retailShoppingProduct',JSON.stringify(this.info))
                            this.$router.push({name:'makeSureOrder',params:{proInfo:proInfo}}) ;
                            break ;
                        case '3' :
                            //console.log('333');
                            break ;
                    }
                    break ;
                case 2 : //批发商城
                console.log(this.total) ;
                    if(this.total == 3000){
                        
                    }else{
                        switch(this.info.intType){
                            case 1 :
                                this.$toast({message:'商品总额必须是600购物积分+600购物券'}) ;
                                // this.$toast({message:'商品总额必须是600购物积分'}) ;
                                return false ;
                                break ;
                            case 2 :
                                this.$toast({message:'商品总额必须是1200复购积分'}) ;
                                return false ;
                                break ;
                        }
                        
                    }
                    // console.log(this.info.intType,this.info.selfLifting) ;
                    // return false ;
                    if(this.info.intType == 2 && this.info.myCode == '点击粘贴您的复投码'){
                        this.$toast({message:'请粘贴您的复投码'});
                        return false;
                    }
                    switch(this.info.selfLifting){
                        case 1 : //线上
                            this.pinInfo();
                            let proInfo = window.sessionStorage.setItem('wholeShoppingProduct',JSON.stringify(this.info))
                            this.$router.push({name:'makeSureOrder'}) ;
                            break ;
                        case 2 : //线下自提
                            this.pinInfo();
                            this.$messagebox.confirm('是否确认下单?').then(action => {
                                this.$Indicator.open('下单中') ;
                                this.$store.dispatch('shoppingCart/wholeDownlineBuy',[this.info,this.type]).then(()=>{
                                    let backMsg = this.$store.state.shoppingCart.wholeDownlineBuy.msg ;
                                    if(this.$store.state.shoppingCart.wholeDownlineBuy.code == 200){
                                        this.$Indicator.close();
                                        window.sessionStorage.removeItem('shoppingCartWhole') ;
                                        this.reload();
                                        this.$toast({message:backMsg}) ;
                                    }else{
                                        this.$toast({message:backMsg}) ;
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }).catch(() => {})
                            break ;
                        case 3 : 
                            // console.log(this.info,this.type);
                            this.pinInfo();
                            this.$messagebox.confirm('是否确认下单?').then(action => {
                                this.$Indicator.open('下单中') ;
                                this.$store.dispatch('shoppingCart/sell',[this.info,this.type]).then(()=>{
                                    let backMsg = this.$store.state.shoppingCart.sell.msg ;
                                    if(this.$store.state.shoppingCart.sell.code == 200){
                                        this.$Indicator.close();
                                        window.sessionStorage.removeItem('shoppingCartWhole') ;
                                        this.reload();
                                        this.$toast({message:backMsg}) ;
                                    }else{
                                        this.$toast({message:backMsg}) ;
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }).catch(() => {})
                            break ;
                    }
                    break ;
                case 3 : //礼品商城
                    switch(this.info.selfLifting){
                        case 1 : //线上邮寄
                            this.pinInfo() ;
                            let proInfo = window.sessionStorage.setItem('giftShoppingProduct',JSON.stringify(this.info)) ;
                            this.$router.push({name:'makeSureOrder',params:{proInfo:proInfo}}) ;
                            break ;
                        case 2 : //线下自提
                            this.pinInfo() ;
                            console.log(this.info);
                            this.$messagebox.confirm('是否确认下单?').then(action => {
                                this.$indicator.open('下单中') ;
                                let token = window.localStorage.getItem('date')
                                this.$axios.post(api + '/finance/Giftpay/PlaceUnderOrder' , {
                                    accessToken:token,
                                    id:this.info.pid,
                                    type:this.info.ptype,
                                    number:this.info.stringPnumber,
                                    self_lifting:this.info.selfLifting,
									or_number:this.info.moduleCount,
                                }).then(res => {
                                    //console.log(res.data);
                                    this.$indicator.close();
                                    if(res.data.code == 200){
                                        window.sessionStorage.removeItem('shoppingCartGift') ;
                                        this.reload();
                                    }
                                    this.$toast(res.data.msg) ;
                                }).catch(e => {
                                    console.log(e) ;
                                })
                            }).catch(() => {})
                            break ;
                    }
            }
        },
        getTotal(){  //计算总数
            this.total = 0 ;
            if(this.list == null || this.list == '' || this.list == undefined ){
            }else{
                for(let i = 0 ; i < this.list.length ; i++){
                    this.total += parseFloat(this.list[i].score*this.list[i].buyCount);
                }
                // for(let i = 0 ; i < this.list.length ; i++){
                //     this.total += parseFloat(this.list[i].score) ;
                // }

                // 新增 ：一个整个购物城选择数量的功能
                // this.total = this.total * this.info.moduleCount ;
            }
            // console.log(this.total)
        },
        pinInfo(){  //将list数据拼接好传给后端
            this.info.pnumber = [] ;
            this.info.pid = [] ;
            this.info.result = [] ;
            this.info.stringPnumber = '' ;
            for(let i = 0 ; i < this.list.length ; i++){
                for(let j = 0 ; j < this.info.pid.length ; j++){
                    if(this.info.pid[i] == this.list[i]['id']) ;
                }
                this.info.pid.push(this.list[i]['id']) ;
                let obj = {} ;
                this.$set(obj,this.list[i]['id'],this.list[i]['buyCount']) ;
                this.info.pnumber.push(obj);
            }
            for(let m = 0 ; m < this.info.pnumber.length ; m++){
                this.info.result.push(Object.keys(this.info.pnumber[m])+ ":" + this.info.pnumber[m][Object.keys(this.info.pnumber[m])]);
            }
            this.info.stringPnumber = this.info.result.join(',') ;
            // console.log(this.info.stringPnumber) ;
            this.info.ptype = this.type ;
            this.info.total = this.total ;
            window.localStorage.setItem('ptype',this.type);
            // console.log(this.info);
        }
    }
}
</script>
<style scoped>
    @import url('../../../static/css/common');
    .select_box .select_list li{width:25%;}
    .container{padding-bottom:5rem;}
    /* .coversionRecordItem .item1{border-bottom: 0.01rem solid #313859;padding-bottom:.2rem} */
    .coversionRecordItem .item2{
        margin-bottom:.3rem;
    }
    .checkbox{
        width:.5rem;
        height:.5rem;
    }
    .countBox{
        padding:0 .4rem;
        color: #666;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .countBox span{
        width: 1rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background-color: #9da3b4;
        border-radius: 0.03rem;
        text-align: center;
    }
    .countBox .countBoxNum{
        background-color: #9da3b4;
        border-radius: 0.03rem;
        height: 0.64rem;
        line-height: 0.64rem;
        display: inline-block;
        margin: 0 1px;
        text-align: center;
    }
    .buy{
        width:100%;
        /* height:2.8rem; */
        position: fixed;
        bottom:0;
        font-size:.4rem;
        color:#FFBB33;
        background-image: linear-gradient(-90deg,#384466 0%,#596487 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .selectBox{
        font-size:.32rem;
    }
    .selectBox .codeBox{
        border: solid 0.03rem #1f1f33;
        color:#fff;
        padding:0 .4rem;
        border-radius: .13rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .selectBox .selectWay{
        padding:.2rem .4rem;
        display: flex;
    }
    .selectBox .selectWay .buyWay{
        background-color: #313859;
        color: #7a7acc;
        border-radius: 0.13rem;
        margin-right: 0.2rem;
        padding:.1rem .2rem;
    }
    .selectWayItem{
        background-color: #313859;
        color: #7a7acc;
        border-radius: 0.13rem;
        margin-right: 0.2rem;
        padding:.1rem .2rem;
    }
    .selectWayItem.active{
        background-color: #ffbb33;
        color: #fff;
    }
    .selectBox .selectWay .buyWay.active{
        background-color: #ffbb33;
        color: #fff;
    }
    .buyContent{
        width:9.2rem;
        /* height:1.4rem; */
        padding:.2rem 0;
        margin:0 auto ;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* .selectWay label{
        width:50%;
    } */
    .buyBtn{
        color:#fff;
        background-color:#FFBB33;
        padding:.2rem .4rem;
        border-radius: .13rem;
        flex-grow:1;
        text-align:center;
        width:2rem;
    }
    .deleteBtn{
        display: flex;
        justify-content: space-between;
    }
    .deleteBtn .btn{
        background-color:#FFBB33;
        padding:.05rem .2rem ;
    }
</style>

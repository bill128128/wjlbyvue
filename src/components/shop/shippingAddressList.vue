<template>
    <!-- 收货地址列表 -->
    <div id="shippingAddressList">
        <header>
            <img src="../../../static/img/back.png" alt="back" @click="back">
            收货地址
        </header>
        <div class="container">
            <ul class="addressList">
                <li v-for='(item,index) in list' :key="index">
                    <div class="info">
                         <div class="userInfo">
                            <span>收件人：{{item.consignee}}</span>
                            <span>{{item.mobile}}</span>
                        </div>
                        <div class="address">收货地址：{{item.address_detail}}</div>
                    </div>
                    <div class="status">
                        <span class="default" v-show="item.type == 1">默认</span>
                        <div class="btns">
                            <button @click.prevent="deleteAddress(item.address_id)">删除</button>
                            <button @click.prevent="modefyAddress(item)">编辑</button>
                        </div>
                    </div>
                </li>
            </ul>
            <router-link to="/shop/addAddress">
                <div class="addAddressBtn">+添加收货地址</div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import top from '../common/top'
    export default{
        name:'shippingAddressList',
        data(){
            return{
                title:'收货地址',
                list:[]
            }
        },
        components:{
            top,
        },
        created(){
            this.isOverdue();
            this.getAddressList();
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
            getAddressList(){           //获取地址列表
                this.$store.dispatch('address/getAddressList').then(() => {
                    if(this.$store.state.address.getListCode == 200){
                        this.list = this.$store.state.address.list;
                    }else{
                        this.$toast({message:this.$store.state.address.getListMsg})
                    }
                }).catch(e => {
                    console.log("获取地址列表失败");
                })
            },
            deleteAddress(addressId){   //删除地址
                this.$store.dispatch('address/deleteAddress',addressId).then(() => {
                    if(this.$store.state.address.deleteListCode == 200){
                        this.$toast({message:this.$store.state.address.deleteListMsg})
                        this.getAddressList();
                    }else{
                        this.$toast({message:this.$store.state.address.deleteListMsg})
                    }
                }).catch(e => {
                    console.log("删除失败");
                })
            },
            modefyAddress(item){        //修改地址
                localStorage.setItem('address',JSON.stringify(item));
                this.$router.push('/shop/modifyAddress');
            },
            // selectAddress(info){        //点击地址，选择信息作为收货地址
            //     // console.log(JSON.stringify(info))
            //     let isfromMakesureOrder = window.sessionStorage.getItem("fromMakesureOrder");
            //     if(isfromMakesureOrder == 1){   // == 1 是从确定订单页面进入
            //         window.sessionStorage.setItem('userAddressInfo',JSON.stringify(info));
            //         window.sessionStorage.removeItem("fromMakesureOrder");
            //         this.$router.push('/makeSureOrder');
            //         window.sessionStorage.setItem('fromShippingAddress','1');
            //     }else{
            //         // console.log("从收货地址页面进入的")
            //     }
            // },
            back(){   //返回上一页或者指定页面
                let isfromMakesureOrder = window.sessionStorage.getItem("fromMakesureOrder");
                if(isfromMakesureOrder == 1){   // == 1 是从确定订单页面进入
                    this.$router.push("/makeSureOrder");
                    window.sessionStorage.removeItem("fromMakesureOrder");
                }else{
                    // console.log("从收货地址页面进入")
                    this.$router.push("/personalPage");
                }
            }
        }
    }
</script>
<style scoped>
    header{
        position: fixed;
        top: 0;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
        background: url('../../../static/img/index-header-bg.png') no-repeat;
        background-size: cover;
        font-size: 0.45rem;
        color: #fff;
        text-align: center;
        z-index: 9999;
    }
    header img{
        width:0.21rem;
        height:0.4rem;
        position: absolute;
        top:50%;
        margin-top:-0.2rem;
        left:0.3rem;
    }
    .container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.8rem;
        box-sizing: border-box;
        overflow-y: scroll;
        margin-bottom:2rem;
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
    .userInfo span:first-child{ margin-right:0.8rem; }
    .address{
        margin-top:0.3rem;
        font-size:0.32rem;
        line-height:0.48rem;
    }
    .default{ float:left; }
    .btns{
        margin-top:0.3rem;
        display: flex;
        justify-content: flex-end;
    }
    .btns button{
        width: 1.6rem;
        height: 0.75rem;
        line-height:0.69rem;
	    border-radius: 0.08rem;
        border: solid 0.03rem #1f1f33;
        background-color: transparent;
        font-size:0.37rem;
        color:#1f1f33;
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


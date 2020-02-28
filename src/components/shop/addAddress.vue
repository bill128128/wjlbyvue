<template>
    <!-- 添加收货地址 -->
    <div id="addAddress">
        <header class="top">
			<img src="../../../static/img/back.png" @click="goBack">
            添加收货地址
            <span @click="addNewAddress">保存</span>
        </header>
        <form action="" class="form">
            <label>
                收货人：<input type="text" placeholder="请输入收货人姓名" v-model="info.userName">
            </label>
            <label>
                手机号：<input type="text" placeholder="请输入联系人手机号" v-model="info.userMobile">
            </label>
            <label class='area'>
                <div class="select" @click="showRegion">
                    所在区域：
                    <input type="text" v-model="region" readonly>
                    <img src="../../../static/img/more_b.png" alt="more" >
                </div>
                <div class="bottom">
                    详细地址：<input type="text" placeholder="请输入详细收货地址" v-model="detailsAddress">
                </div>
            </label>
            <label class="address">
                设为默认地址
                <mt-switch v-model="value"></mt-switch>
            </label>
        </form>
        <mt-popup v-model="regionVisible"  position="bottom" class="mtPopup">
            <div class="button">
                <span @click="sure">确定</span>
                <span @click="cancel">取消</span>
            </div>
            <mt-picker valueKey="name" :visibleItemCount="5" @change="addressChange" :slots="myAddressSlots"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import top from '../common/top'
    import { Switch } from 'mint-ui';
    import { Popup } from 'mint-ui';
    import { Picker } from 'mint-ui';
    import threeLevelAddress from './region.json'
    export default{
        data(){
            return{
                value:true,    //是否设置为默认地址
                region:'',     //三级地址
                regionText:'北京市 北京市 东城区', 
                province:'',   //省
                city:'',       //市
                county:'',     //县
                regionVisible:false, //地址选择器弹框是否可见
                regionInit:false,//禁止地区选择器自动初始化，picker组件会默认进行初始化，导致一进入页面就会默认选中一个初始3级地址
                //picker组件插槽
                myAddressSlots: [
                    {
                        flex: 1,
                        values: this.getProvinceArr(), //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    },
                    {
                        flex: 1,
                        values: this.getCityArr("北京市"),
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '',
                        className: 'slot4'
                    },
                    {
                        flex: 1,
                        values: this.getCountyArr("北京市","北京市"),
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                info:{
                    userName:'',   //姓名
                    userMobile:'', //手机号
                    type:1,        //设置为默认
                },
                detailsAddress:'', //详细地址
                // 传给后台的省市县的ID值
                provinceId:'',
                cityId:'',
                countyId:'',
            }
        },
        created(){
            this.isOverdue();
            this.getCountyArr("北京市","北京市");
            this.getProvinceArr();
        },
        computed:{
            isType(){
                return this.value ;
            }
        },
        watch:{
           isType(){
               if(this.value) this.info.type = 1;
               else this.info.type = 0;
            } 
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
            showRegion(){ //显示
                this.regionVisible = true ;
            },
            addressChange(picker,values){ //picker组件的change事件，进行取值赋值
                if(this.regionInit){
                    this.regionText = values[0].name + " " + values[1].name + " " + values[2].name;
                    this.province = values[0].name ;
                    this.city = values[1].name ;
                    this.county = values[2].name ;
                    //给市、县赋值
                    picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
                    picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
                }else{
                    this.regionInit = true ;
                }
            },
            getProvinceArr(){ //遍历json，返回省级对象数组
                let provinceArr = [];
                threeLevelAddress.forEach(function (provs) {
                    let obj = {};
                    obj.name = provs.name;
                    obj.id = provs.id;
                    provinceArr.push(obj);
                });
                // console.table(provinceArr) ;
                return provinceArr;
            },
            getCityArr(province){ //遍历json，返回市级对象数组
                let cityArr = [];
                threeLevelAddress.forEach(function(provs){
                    if(provs.name == province){
                        provs.city.forEach(function(cities){
                            let obj = {} ;
                            obj.name = cities.name ;
                            obj.id = cities.id ;
                            cityArr.push(obj);
                        })
                    }
                })
                // console.table(cityArr);
                return cityArr;
            },
            getCountyArr(province,city){ //遍历json，返回区县级对象数组
                let countyArr = [];
                threeLevelAddress.forEach(function(provs){
                    if(provs.name == province){
                        provs.city.forEach(function(cities){
                            if(cities.name == city){
                                cities.district.forEach(function(district){
                                    let obj = {};
                                    obj.name = district.name ;
                                    obj.id = district.id ;
                                    countyArr.push(obj);
                                })
                            }
                        })
                    }
                })
                // console.table(countyArr);
                return countyArr;
            },
            getProvinceId(province){ //获取省级对应的id
                let provinceId = this.getProvinceArr();
                for(let i = 0 ; i<provinceId.length ; i++){
                    if(provinceId[i].name == province){
                       return(provinceId[i].id)
                    }
                }
            },
            getCityid(province,city){    //获取市级对应的id
                let cityId = this.getCityArr(province);
                for(let i = 0 ;i < cityId.length ; i++){
                    if(cityId[i].name == city){
                        return(cityId[i].id)
                    }
                }
            },
            getCountyId(province,city,county){
                let countyId = this.getCountyArr(province,city);
                for(let i = 0 ; i < countyId.length ; i++){
                    if(countyId[i].name == county){
                        return (countyId[i].id)
                    }
                }
            },
            sure(){ //选中地区
                this.region = this.regionText ;
                this.regionVisible = false ;
            },
            cancel(){ //取消选择区域
                this.regionVisible = false ;
            },
            addNewAddress(){ //添加新的收货地址
                this.provinceId = this.getProvinceId(this.province);
                this.cityId = this.getCityid(this.province,this.city);
                this.countyId = this.getCountyId(this.province,this.city,this.county);
                this.$store.dispatch('address/addNewAddress',[this.info,this.provinceId,this.cityId,this.countyId,this.detailsAddress]).then(() => {
                    if(this.$store.state.address.addNewAddressCode == 200){
                        this.$toast({message:this.$store.state.address.addNewAddressMsg})
                        setTimeout(() => {
                            this.$router.push('/shop/shippingAddressList');
                        },2000)
                    }else{
                        this.$toast({message:this.$store.state.address.addNewAddressMsg})
                    }
                }).catch(e => {
                   console.log("添加新的收货地址失败")
                })
            },
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
    @import url('../../../static/css/common');
    #addAddress{
        width:100%;
        min-height:100vh;
        background:url('../../../static/img/addpartnerbg.png') no-repeat;
        background-size:cover;
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
    form{
        position: relative;
        top:3.09rem;
    }
    .area{height:100%;}
    .area .select{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:0.01rem solid #999;
    }
    .area img{
        width:0.2rem;
        height:0.37rem;
    }
    .address{
        display: flex;
        justify-content: space-between;
    }
    form .mint-switch{
        width:1.36rem;
        background:transparent;
        margin:0;
        padding:0;
        display: flex;
        align-items: center;
    }
    .mint-switch-core::before{background-color:transparent;}
    /* 三级地区弹出框样式 */
    .mtPopup{
        width:100%;
        border-radius: 0.13rem 0.13rem 0 0; /*左上 - 右上 - 右下 - 左下*/
    }
    .mint-popup{padding:0;}
    .button{
        width:100%;
        height:1.2rem;
        line-height:1.2rem;
        display: flex;
        justify-content: center;
        background-color: #b8bdcc;
    }
    .button span{
        width:50%;
        text-align:center;
        font-size:0.37rem;
    }
</style>

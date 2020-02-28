<template>
    <div id='managerList'>
        <top :message='title'/>
        <div class="container">
            <div class="dataPicker">
                <!-- <div @click='openPicker' class='curData' >
                    <span>当前选择的时间：{{selectedValue}}</span>
                    <span><img src="../../../static/img/datetimepickerbt.png" alt=""></span>
                </div>  -->
                <!-- <div @touchmove.prevent>
                    <mt-datetime-picker
                        lockScroll="true"
                        ref="datePicker"
                        type="date"
                        v-model="pickerValue"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        @confirm="dateConfirm()">
                    </mt-datetime-picker>
                </div> -->
                
            </div>
            <div class="loadmore" style="overflow:scroll;">
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
                                    <span>奖励金额：{{item.comm_int}}</span>
                                    <span>奖励比例：{{item.comm_ratio}}</span>
                                </div>
                                <div class="address">奖励时间：{{item.time}}</div>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
        <foot/>
    </div>
</template>
<script>
import top from '../common/top'
import foot from '../common/index'
import {api} from '../../constans/index.js'
export default {
    name:'managerList',
    data(){
        return{
            title:'管理奖列表',
            list:[],
            page:1,//分页
            allLoaded:false, //false：加载未完成,可以继续加载；true：加载完成，不能继续加载
			bottomStatus:'',
			loading:false,
            page:1,
            pickerValue:null,
            selectedValue:new Date().toLocaleDateString()//默认是当前日期
        }
    },
    components:{
        top,foot
    },
    beforeMount(){
        this.$Indicator.open('数据加载中');
    },
    created(){
        this.loadMore();
    },
    methods:{
        openPicker(){  //打开时间选择
            if (this.selectedValue) {
                this.pickerValue = this.selectedValue
            } else {
                this.pickerValue = new Date().toLocaleDateString()
            }
            this.$refs.datePicker.open();
        },
        dateConfirm(){
            console.log('选择器的时间',this.pickerValue) ;
            this.selectedValue = this.pickerValue.toLocaleDateString() ;
        },
        loadMore(){   //加载更多数据
			var me = this;
      		console.log("请求数据了");
			me.allLoaded = true; // 若数据已全部获取完毕，不允许在继续加载
			setTimeout(() => {
				let token = window.localStorage.getItem('date') ;
				this.$axios.get(api+'/finance/user/agencybill',{
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
                            this.$toast({message:'没有更多数据'})
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
<style lang="less">
    #managerList{
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
        .curData{
            color:#fff;
            font-size:.37rem;
            background: url(/static/img/address_bg.6c7109b.png) no-repeat center;
            padding:20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                img{
                    width:.6rem;
                }
            }
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
            color:#FFBB33;
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
    }
</style>



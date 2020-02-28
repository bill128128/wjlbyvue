// 兑换记录
import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced: true,
    state:{
        recordCode:'', //返回状态码
        recordMsg:'', //返回信息
        recordList:'', //接收返回的数组
        // 确认订单
        makeSureDeliveryGoodsCode:'',
        makeSureDeliveryGoodsMsg:''
    },

    mutations: {
        getrecordCode(state,data){
            state.recordCode = data ;
        },
        getrecordMsg(state,data){
            state.recordMsg = data ;
        },
        getrecordList(state,data){
            state.recordList = data ;
        },
        getmakeSureDeliveryGoodsCode(state,data){
            state.makeSureDeliveryGoodsCode = data ;
        },
        getmakeSureDeliveryGoodsMsg(state,data){
            state.makeSureDeliveryGoodsMsg = data ;
        }
    },

    actions:{
        getConversionRecord:function({commit},info){
            console.log(info);
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/ShopPay/orderList',{
					params:{
                        accessToken:token,
						page:info[0].page,
                        status:info[0].status,
                        type:info[1]
					}
				}).then((res)=>{
                    const data = res.data;
                    console.log(data);
					commit('getrecordCode',data.code);
    				commit('getrecordMsg',data.msg);
    				commit('getrecordList',data.data.dataList);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
        },
        makeSureDeliveryGoods({commit},goodsId){
            return new Promise((resolve,reject) => {
                axios.post(api+'/finance/ShopPay/collectGoods',{
                    accessToken : token,
                    id : goodsId
                }).then((res) => {
                    const data = res.data ;
                    // console.log(data);
                    commit('getmakeSureDeliveryGoodsCode',data.code);
                    commit('getmakeSureDeliveryGoodsMsg',data.msg);
                    resolve(res);
                }).catch( error => {
                    reject(error);
                })
            })
        }
    }
}
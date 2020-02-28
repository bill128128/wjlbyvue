import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
        msg:'',//提示信息
        sumOrder:0,
    },
    mutations:{
    	mtCode(state,data){
            state.code = data ;
        },
        mtMsg(state,data){
            state.msg = data ;
        },
        mtSumOrder(state,data){
            state.sumOrder = data ;
        },
    },
    actions:{
        checkPid:function({commit},info){  //获取列表数据
    		return new Promise((resovle,reject)=>{
                let token = window.localStorage.getItem('date') ;
    			axios.get(api+'/finance/Giftpay/sumOrder',{
    				params:{
                        accessToken:token,
                        id:11,
                        type:3
                    }
    			}).then((res)=>{
                    const data = res.data;
					//console.log(data);
    				commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtSumOrder',data.sumOrder);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    }
}
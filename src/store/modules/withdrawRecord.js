import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	list:[],//提现列表
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetlist(state,data){
    		state.list = data;
    	},
    },
    actions:{
    	getCashList:function({commit},counter){
    		return new Promise((resovle,reject)=>{
    			let page = counter;
    			axios.get(api+'/finance/user/CashList?accessToken='+token).then((res)=>{
					const data = res.data;
					console.log(data);
    				commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetlist',data.list);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    }
}
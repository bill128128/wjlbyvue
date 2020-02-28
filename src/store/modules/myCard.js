import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	list:[],//列表
    	delcode:0,
    	delmsg:'',
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
    	mtgetdelcode(state,data){
    		state.delcode = data;
    	},
    	mtgetdelmsg(state,data){
    		state.delmsg = data;
    	},
    },
    actions:{
    	getBankList:function({commit}){
    		return new Promise((resovle,reject)=>{
    			axios.get(api+'/finance/Bank/getBankList?accessToken='+token).then((res)=>{
    				const data = res.data;
    				console.log(data);
    				commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetlist',data.data);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    	removeCard:function({commit},id){
    		return new Promise((resovle,reject)=>{
    			let bankid = id;
    			axios.post(api+'/finance/Bank/deleteBankCard',{
    				accessToken:token,
    				bank_id:bankid,
    			}).then((res)=>{
    				const data = res.data;
    				commit('mtgetdelcode',data.code);
					commit('mtgetdelmsg',data.msg);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	}
    }
}
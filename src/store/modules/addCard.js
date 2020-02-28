import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    },
    actions:{
    	addCard:function({commit},info){
    		return new Promise((resovle,reject)=>{
    			let username = info.username;
    			let card_id = info.card_id;
    			let bank_name = info.bank_name;
    			let bank_card = info.bank_card;
    			let bank_open = info.bank_open;
    			let bank_mobile = info.bank_mobile;
    			let is_default = info.is_default;
    			axios.post(api+'/finance/Bank/verifyBankCard?accessToken='+token,{
    				username:username,
    				card_id:card_id,
    				bank_name,bank_name,
    				bank_card:bank_card,
    				bank_open:bank_open,
    				bank_mobile:bank_mobile,
    				is_default:is_default,
    			}).then((res)=>{
    				const data = res.data;
    				commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    }
}
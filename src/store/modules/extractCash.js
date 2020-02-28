import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	cashInfo:{},
    	ecode:0,
    	emsg:'',
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetcashInfo(state,data){
    		state.cashInfo = data;
    	},
    	mtgetecode(state,data){
    		state.ecode = data;
    	},
    	mtgetemsg(state,data){
    		state.emsg = data;
    	},
    },
    actions:{
    	loadexcash:function({commit}){
    		return new Promise((resovle,reject)=>{
    			axios.get(api+'/finance/user/memberWith?accessToken='+token).then((res)=>{
    				const data = res.data;
    				commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetcashInfo',data.userInfo);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    	exCash:function({commit},info){
    		return new Promise((resovle,reject)=>{
    			let card_id = info.bankid;
				let money_score = info.count;
				let card_type = info.type ;
    			axios.post(api+'/finance/user/addCash?accessToken='+token,{
    				card_id:card_id,
					money_score:money_score,
					card_type:card_type
    			}).then((res)=>{
    				const data = res.data;
    				commit('mtgetecode',data.code);
					commit('mtgetemsg',data.msg);
					resovle(res);
    			}).catch((e)=>{
	    			console.log(e);
	    		})
    		})
    	}
    }
}
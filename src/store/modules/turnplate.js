import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,
		msg:'',
		result:{},
		pcode:0,
		pmsg:'',
		presult:{},
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetresult(state,data){
	  		state.result = data;
	  	},
	  	mtgetpcode(state,data){
	  		state.pcode = data;
	  	},
	  	mtgetpmsg(state,data){
	  		state.pmsg = data;
	  	},
	  	mtgetpresult(state,data){
	  		state.presult = data;
	  	},
	},
	actions:{
		getresult:function({commit}){
			return new Promise((resovle,reject)=>{
				axios.post(api+'/finance/Lottery/index?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetresult',data.data.result);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		},
		getpersoninfo:function({commit}){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/Lottery/userLottery?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetpcode',data.code);
					commit('mtgetpmsg',data.msg);
					commit('mtgetpresult',data.data.result);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		}
	}
}

import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0,
		msg:'',
		address:{},
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetaddress(state,data){
	  		state.address = data;
	  	},
	},
	actions:{
		getdefaultaddress:function({commit}){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/ShopPay/defAddress?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetaddress',data.data);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		}
	}
}

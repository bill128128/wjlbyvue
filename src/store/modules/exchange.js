import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0,
		msg:'',
		detail:{},
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetdetail(state,data){
	  		state.detail = data;
	  	},
	},
	actions:{
		exchange:function({commit},info){
			console.log(info);
			return new Promise((resovle,reject)=>{
				const id = info.pid;
				const type = info.ptype;
				const number = info.sellCount;
				axios.get(api+'/finance/ShopPay/confirmOrder?accessToken='+token,{
					params:{
						id:id,
						type:type,
						number:number,
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetdetail',data.data);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		}
	}
}

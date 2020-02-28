import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,//状态码
		msg:'',//返回信息
		prodata:{},//商品详情对象		
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetprodata(state,data){
	  		state.prodata = data;
	  	},
	},
	actions:{
		getPayDetail:function({commit},orderid){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/Shoppay/paySuccess?accessToken='+token+'&id='+orderid).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetprodata',data.data.memberOrder);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		},
	}
}

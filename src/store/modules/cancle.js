import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
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
		cancle:function({commit}){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/user/cancel?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}

import axios from 'axios'
import {api} from '../../constans'
export default{
	namespaced:true,
	state:{
		code:0,//状态码
		msg:'',//提示信息
		list:[],//接收数组
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
		getList:function({commit},info){
            let token = window.localStorage.getItem('date');
			return new Promise((resovle,reject)=>{
                axios.get(api+'/finance/score/releaseBill?accessToken='+token+'&page='+info).then((res)=>{
                    const data = res.data;
                    console.log(data);
					commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
    				commit('mtgetlist',data.bill);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}

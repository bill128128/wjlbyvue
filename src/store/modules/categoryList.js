import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,
		msg:'',
		list:[],
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
		getcategoryList:function({commit}){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/Shop/categoryList').then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetlist',data.data.list);
					resovle(res);
				}).catch(error => {
        			  reject(error) 
        		});
			})
		}
	}
}

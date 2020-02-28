// import {api,isHaveParams} from '../../constans'
import {api,isEmpety} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced: true, 
	state:{
		code:0,
		msg:'',
		problemlist:[],
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetproblemlist(state,data){
	  		state.problemlist = data;
	  	},
	},
	actions:{
		getproblemlist:function({commit}){
			return new Promise((resovle,reject)=>{
				const token = window.localStorage.getItem("date");
				axios.get(api+'/finance/user/problemList?accessToken='+token).then((res)=>{
					// let data = res.data;
					// isHaveParams(data,[['code',1],['msg',1],['data_list',2,'data']]);
					// return false ;
					const data = isEmpety(res.data,[['code',1],['msg',1],['data.data_list',2]]);
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetproblemlist',data.data.data_list);
					resovle(res);
				}).catch(error => {
        			  reject(error); 
        		});
			})
		}
	}
}

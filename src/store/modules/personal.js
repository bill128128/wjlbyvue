import {api} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		personalcode:'',   //个人中心返回状态码
		personalmsg:'',    //个人中心提示信息
		personalData:''    //所有数据
	},
	mutations:{
		getpersonalcode(state,data){
			state.personalcode = data ;
		},
		getpersonalmsg(state,data){
			state.personalmsg = data ;
		},
		getpersonalData(state,data){
			state.personalData = data ;
		}
	},
	actions:{
		//个人中心信息方法
		personalInfo:function({commit}){
			return new Promise((resolve,reject)=>{
				const token = window.localStorage.getItem("date");
				axios.get(api+'/finance/user/index?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('getpersonalcode',data.code);
					commit('getpersonalmsg',data.msg);
					commit("getpersonalData",data.data);
					resolve(res);
				}).catch(error => {
					reject(error) 
	        	});
			});
		},
	}
	
}

import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		loginpwdcode:0,
		loginpwdmsg:'',
		paypwdcode:0,
		paypwdmsg:'',
	},
	mutations:{
		mtgetloginpwdcode(state,data){
			state.loginpwdcode = data;
		},
		mtgetloginpwdmsg(state,data){
			state.loginpwdmsg = data;
		},
		mtgetpaypwdcode(state,data){
			state.paypwdcode = data;
		},
		mtgetpaypwdmsg(state,data){
			state.paypwdmsg = data;
		},
	},
	actions:{
		changeloginpwd:function({commit},pwdInfo){
			return new Promise((resolve,reject)=>{
				const olpassword = pwdInfo.oldpwd;
				const password = pwdInfo.newpwd;
				const repassword = pwdInfo.repwd;
				const type = pwdInfo.type;
				axios.post(api+'/finance/user/modPass?accessToken='+token,{
					olpassword:olpassword,
					password:password,
					repassword:repassword,
					type:type,
				}).then((res)=>{
					const data = res.data;
					commit('mtgetloginpwdcode',data.code);
					commit('mtgetloginpwdmsg',data.msg);
					resolve(res); 
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
	}
}

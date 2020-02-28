import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		retrievepwdcode:0,
		retrievepwdmsg:'',
	},
	mutations:{
		mtgetretrievepwdcode(state,data){
			state.retrievepwdcode = data;
		},
		mtgetretrievepwdmsg(state,data){
			state.retrievepwdmsg = data;
		},
		
	},
	actions:{
		zhpassword:function({commit},userInfo){
			const mobile = userInfo.phone;
	    	const verify = userInfo.verify;
	    	const nickname = userInfo.realname;
	    	const password = userInfo.password;
	    	const repassword = userInfo.repassword;
			return axios.post(api+'/finance/index/setPassword',{
    			mobile:mobile,
    			verify:verify,
    			username:nickname,
    			password:password,
    			repassword:repassword,
	    	}).then((res)=>{
	    		const data =res.data;
	    		console.log(data);
	    		commit('mtgetretrievepwdcode',data.code);
	    		commit('mtgetretrievepwdmsg',data.msg);
	    	}).catch(error=>{
	    		console.log(res.data.code);
	    	})
		},
	}
}

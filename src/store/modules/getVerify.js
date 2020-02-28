import {api} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
     verifycode:'', //验证码
     verifymsg:'' ,//验证码返回信息
     verifyexpiring:'',//过期时间
     bindcode:'',//绑定状态码
     bindmsg:'',//绑定返回信息
     zhcode:0,
     zhmsg:'',
     zhsj:'',
     bindoldcode:'',//绑定状态码
     bindoldmsg:'',//绑定返回信息
  },

  mutations: { //同步方法代替构造器
    mtgetVerifycode(state,data){
	    state.verifycode = data;
	},
	mtverifymsg(state,data){
		state.verifymsg = data;
	},
	mtverifyexpiring(state,data){
		state.verifyexpiring = data;
	},
	mtbindcode(state,data){
		state.bindcode = data;
	},
	mtbindmsg(state,data){
		state.bindmsg = data;
	},
	mtbindoldcode(state,data){
		state.bindoldcode = data;
	},
	mtbindoldmsg(state,data){
		state.bindoldmsg = data;
	},
	mtzhcode(state,data){
		state.zhcode = data;
	},
	mtzhmsg(state,data){
		state.zhmsg = data;
	},
	mtzhsj(state,data){
		state.zhsj = data;
	},
  },

  actions: { //异步方法->外部使用的方法
  	//获取验证码
    acgetVerify({commit,state},mobile){   		
    	const token = window.localStorage.getItem("date");
    	return axios.get(api+'/finance/user/getVerify?mobile='+mobile+'&accessToken='+token).then((res)=>{
    		commit('mtgetVerifycode', res.data.code);
    		commit('mtverifymsg',res.data.msg);
    		commit('mtverifyexpiring',res.data.data.expiring_in);
    	}).catch(error=>{
    		//console.log(res.data.code);
    	});
    },
    //绑定手机
    bindmobile:function({commit},userInfo){
    	const mobile = userInfo.phone;
    	const verify = userInfo.verify;
    	const nickname = userInfo.realname;
    	const pay_password = userInfo.password;
    	const repassword = userInfo.repassword;
    	const is_problem = userInfo.is_problem;
    	const problem = userInfo.problemid;
			const problem_pass = userInfo.answer;
			const token = window.localStorage.getItem("date");
    	return axios.post(api+'/finance/user/mobile?accessToken='+token,{
    			mobile:mobile,
    			verify:verify,
    			nickname:nickname,
    			pay_password:pay_password,
    			repassword:repassword,
    			is_problem:is_problem,
    			problem:problem,
    			problem_pass:problem_pass,
    	}
    ).then((res)=>{
    		commit('mtbindcode', res.data.code);
    		commit('mtbindmsg',res.data.msg);
    	}).catch(error=>{
    		//console.log(res.data.code);
    	})
    },
    bindmobileOld:function({commit},userInfo){
    	const is_problem = userInfo.is_problem;
    	const problem = userInfo.problemid;
			const problem_pass = userInfo.answer;
			const token = window.localStorage.getItem("date");
    	return axios.post(api+'/finance/user/mobile?accessToken='+token,{
    			is_problem:is_problem,
    			problem:problem,
    			problem_pass:problem_pass,
    	}
    ).then((res)=>{
    		commit('mtbindoldcode', res.data.code);
    		commit('mtbindoldmsg',res.data.msg);
    	}).catch(error=>{
    		//console.log(res.data.code);
    	})
    },
    regetVerify({commit,state},mobile){   		
    	return axios.get(api+'/finance/index/getPwVerify?mobile='+mobile).then((res)=>{
    		commit('mtzhcode', res.data.code);
    		commit('mtzhmsg',res.data.msg);
    		commit('mtzhsj',res.data.data.expiring_in);
    	}).catch(error=>{
    		//console.log(res.data.code);
    	});
    },
    
   }
};
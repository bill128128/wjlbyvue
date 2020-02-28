import {api,token} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
     name:'', //用户名
     token: '',//token
     msg:'', //返回信息
     code:0, //返回状态码
     is_mobile:0, //验证是否已经绑定手机
     is_problem:0,  //判断是否设置密保问题，0未设置，1已设置
  },

  mutations: { //同步方法代替构造器
    SET_CODE: (state, code) => {            
    	state.code = code;     
    },
    SET_TOKEN: (state, token) => {  
    	state.token = token;           
    	window.localStorage.setItem('date',token);  
    },
    SET_MSG: (state, msg) => {            
    	state.msg = msg;     
    },
		SET_IS_MOBILE: (state, is_mobile) => {            
    	state.is_mobile = is_mobile;
    	window.localStorage.setItem('is_mobile',is_mobile);
    },
    SET_IS_PROBLEM: (state, is_problem) => {            
    	state.is_problem = is_problem;
    	window.localStorage.setItem('is_problem',is_problem);  
    },
  },

  actions: { //异步方法->外部使用的方法
  	//登录验证方法
  		doLogin:function({commit},userInfo){
  			  const name = userInfo.name;
        	const password = userInfo.password;
        	return new Promise((resolve, reject) => {              
	        	axios.get(api+'/finance/index/login',{
						params:{
							loginId:name,
							password:password
						}
					}).then(response => {  
	        		const data = response.data.data;  
	        		console.log('1234',data);
	        		commit('SET_TOKEN', data.accessToken);
	        		commit('SET_MSG', response.data.msg);
	        		commit('SET_CODE', response.data.code);
	        		commit('SET_IS_MOBILE', data.is_mobile);
	        		commit('SET_IS_PROBLEM', data.is_problem);
	        		resolve(response); 
					}).catch(error => {
	        			reject(error) 
	        		})
        	})

  		},    
  	}
};
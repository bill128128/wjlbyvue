import {api,token} from '../../../constans/index'
import axios from 'axios'
export default {
    namespaced: true,
    state: {
        code:'',
        msg:'',
    },
    mutations: { //同步方法代替构造器
        SET_CODE: (state, code) => {            
            state.code = code;     
        },
        SET_MSG: (state, msg) => {            
            state.msg = msg;     
        },
    },

  actions: { //异步方法->外部使用的方法
  	//登录验证方法
  		register:function({commit},userInfo){
        	return new Promise((resolve, reject) => {              
	        	axios.post(api+'/index/index/reg',{
                    username:userInfo.name,
                    password:userInfo.password,
                    repassword:userInfo.rePwd,
                    number:userInfo.referees
                }).then(response => {  
                    const data = response.data;  
                    console.log(data);
                    commit('SET_CODE', data.code);
                    commit('SET_MSG', data.msg);
                    resolve(response); 
                }).catch(error => {
                    reject(error) 
                })
        	})

  		},    
  	}
};
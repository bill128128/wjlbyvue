import {api,token} from '../../constans'
import axios from 'axios'
export default {
    namespaced: true,
    state: {
        msg:'', //返回信息
        code:0, //返回状态码
        list:[],
    },
    mutations: { //同步方法代替构造器
        getMsg(state,data){
            state.msg = data ;
        },
        getCode(state,data){
            state.code = data ;
        },
        getList(state,data){
            state.list = data ;
        }
    },
    actions: { //异步方法->外部使用的方法
        //登录验证方法
        getContent:function({commit}){
            return new Promise((resolve, reject) => {              
                axios.get(api+'/index/Message/aboutUs').then(response => {  
                    const data = response.data;  
                    commit('getMsg', data.msg);
                    commit('getCode', data.code);
                    commit('getList', data.data_list);
                    resolve(response); 
                    }).catch(error => {
                        reject(error) 
                    })
            })

        },    
    }
};
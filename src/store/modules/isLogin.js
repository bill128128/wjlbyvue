//是否登录过期
import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
import { rejects } from 'assert';
export default{
    namespaced: true,
    state:{
        code:'',
        msg:''
    },
    mutations:{
        getCode(state,data){
            state.code = data ;
        },
        getMsg(state,data){
            state.msg = data ;
        }
    },
    actions:{
        isLogin({commit}){
            return new Promise((resolve,reject) => {
                let token = window.localStorage.getItem('date');               
                axios.get(api+'/finance/user/IsOverdue?accessToken='+token).then((res) => {
                    const data = res.data ;
                    //console.log(data);
                    commit('getCode',data.code);
                    commit('getMsg',data.msg);
                    resolve(res); 
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}
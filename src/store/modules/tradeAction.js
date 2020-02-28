import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced:true,
    status:{
        successCode:'',//成交code
        successMsg:'',
        rejectCode:'',//驳回code
        rejectMsg:'',
        withdrawCode:'',//撤回
        withdrawMsg:''
    },
    mutations: {
        setsuccessCode(state,data){
            state.successCode = data ;
        },
        setsuccessMsg(state,data){
            state.successMsg = data ;
        },
        setrejectCode(state,data){
            state.rejectCode = data ;
        },
        setrejectMsg(state,data){
            state.rejectMsg = data ;
        },
        setwithdrawCode(state,data){
            state.withdrawCode = data ;
        },
        setwithdrawMsg(state,data){
            state.withdrawMsg = data ;
        }
    },
    actions:{
        clickComplete:function({commit},out_id){
			return new Promise((resolve,reject) =>{
				axios.get(api+'/finance/transaction/Deal?accessToken='+token+'&into_id='+out_id).then((res) => {
                    const data =res.data;
                    commit('setsuccessCode',data.code);
                    commit('setsuccessMsg',data.msg);
                    resolve(res);
				})
			}).catch((error) => {
                reject(error) ;
            })
        },
        clickReject:function({commit},into_id){
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/transaction/Reject?accessToken='+token+'&into_id='+into_id).then((res) => {
                    const data = res.data ;
                    commit('setrejectCode',data.code);
                    commit('setrejectMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        clickWidthdraw:function({commit},out_id){
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/transaction/withdraw?accessToken='+token+'&out_id='+out_id).then((res) => {
                    const data = res.data ;
                    // console.log(data);
                    commit('setwithdrawCode',data.code);
                    commit('setwithdrawMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
    }
}
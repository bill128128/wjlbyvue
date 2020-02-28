import {api} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
        recruitScoreListCode:'', //招募积分
        recruitScoreListMsg:'',
        list:[],
    },
    mutations:{
        getrecruitScoreListCode(state,data){
            state.recruitScoreListCode = data ;
        },
        getrecruitScoreListMsg(state,data){
            state.recruitScoreListMsg = data ;
        },
        getlist(state,data){
            state.list = data ;
        }
    },
    actions:{
        getList:function({commit}){
            return new Promise((resovle,reject) => {
                const token = window.localStorage.getItem('date');
                axios.get(api+'/finance/score/frozenBill?accessToken='+token).then((res)=>{
                    const data = res.data;
                    commit('getrecruitScoreListCode',data.code);
                    commit('getrecruitScoreListMsg',data.msg);
                    commit('getlist',data.data);
                    resovle(res);
                }).catch(error => {
                    reject(error) 
                });
            });
        }
    }
}
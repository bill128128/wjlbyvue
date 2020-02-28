// 直推奖详情
import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
        code:'',
        msg:'',
        list:[], //接收得数组
    },
    mutations: {
        getCode(state,data){
            state.code = data ;
        },
        getMsg(state,data){
            state.msg = data ;
        },
        getList(state,data){
            state.list = data ;
        }
    },
    actions:{
        getDirectPrizeDetail({commit},info){
            return new Promise((resolve,reject) => {
                const member_id = info[0];
                const page = info[1];
                axios.get(api+'/finance/team/rewardList',{
                	params:{
                		accessToken:token,
                		member_id:member_id,
                		page:page,
                	}
                }).then((res) => {
                    const data = res.data ;
                    commit('getCode',data.code);
                    commit('getMsg',data.msg);
                    commit('getList',data.data.reward);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
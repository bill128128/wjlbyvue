// 直推奖明细
import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
        code:'', //状态码
        msg:'', //信息
        rewardList:[] //接收所有信息得数组
    },
    mutations: {
        getCode(state,data){
            state.code = data ;
        },
        getMsg(state,data){
            state.msg = data ;
        },
        getRewardList(state,data){
            state.rewardList = data ;
        }
    },
    actions:{
        getDirectPrizeList:function({commit},page){ //获取列表
            return new Promise ((resovle,reject) => {
                axios.get(api+'/finance/team/rewardDetailed?accessToken='+token+'&page='+page).then((res) =>{
                    const data = res.data ;
                    commit('getCode',data.code);
                    commit('getMsg',data.msg);
                    commit('getRewardList',data.data.reward);
                    resovle(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}
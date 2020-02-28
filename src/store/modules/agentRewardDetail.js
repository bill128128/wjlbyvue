import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	list:[] //列表
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
		mtgetlist(state,data){
			state.list = data ;
		}
    },
    actions:{
    	getagentRewardDetail({commit},info){
    		return new Promise((resovle,reject)=>{
				let timer = info[0];
				let type = info[1];
    			axios.get(api+'/finance/team/agencyDetailed',{
					params:{
						accessToken:token,
						type:type,
						time:timer
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
					commit('mtgetlist',data.data.data);
					// console.log(timer);
					// console.log(data);
    				resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	}
    }
}
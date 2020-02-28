import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	pro:{},//省级代理信息
    	city:{},//市级代理信息
    	county:{},//县级代理信息
		level:{},//平级代理信息
		agencybill:[],//个人奖励列表
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetpro(state,data){
    		state.pro = data;
    	},
    	mtgetcity(state,data){
    		state.city = data;
    	},
    	mtgetcounty(state,data){
    		state.county = data;
    	},
    	mtgetlevel(state,data){
    		state.level = data;
		},
		mtgetagencybill(state,data){
			state.agencybill = data ;
		}
    },
    actions:{
    	getagentRewardList({commit},info){
    		return new Promise((resovle,reject)=>{
    			axios.get(api+'/finance/team/agencyList',{
					params:{
						accessToken:token,
						page:info[0],
						time:info[1]
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetpro',data.Pmember[1]);
					commit('mtgetcity',data.Pmember[2]);
					commit('mtgetcounty',data.Pmember[3]);
					commit('mtgetlevel',data.Pmember[4]);
					commit('mtgetagencybill',data.agencybill);
    				resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
		}
    }
}
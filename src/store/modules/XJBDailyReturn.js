import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,//状态码
		msg:'',//提示信息
		member_score:'',//用户当前掌聚宝总数
		bill_sum:'',//总共返还总额
		list:[],//接收数组
	},
	mutations:{
		mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetmember_score(state,data){
    		state.member_score = data;
    	},
    	mtgetbill_sum(state,data){
    		state.bill_sum = data;
    	},
    	mtgetlist(state,data){
    		state.list = data;
    	},
	},
	actions:{
		dailyreturn:function({commit},info){
			const page = info[0];
			const limit = info[1];
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/Score/moneyReleaseBill?accessToken='+token+'&page='+info).then((res)=>{
					const data = res.data;
					//console.log(data);
					commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
    				commit('mtgetmember_score',data.member_score);
    				commit('mtgetbill_sum',data.bill_sum);
    				commit('mtgetlist',data.bill);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}

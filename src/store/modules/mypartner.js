import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		partner:'', //团队人数
		member_sum:'',//直推人数
		profit:'',//累计奖励
		reward_sum_money:'',//直推奖
		share_profit:'',//管理奖总金额
		agency_profit:'', //代理奖总金额
		mypartnercode:0,//返回状态码
		mypartnermsg:'' //返回提示信息
	},
	mutations:{
		mtgetpartner:function(state,data){
			state.partner = data;
		},
		mtgetmember_sum:function(state,data){
			state.member_sum = data;
		},
		mtgetprofit:function(state,data){
			state.profit = data;
		},
		mtgetreward_sum_money:function(state,data){
			state.reward_sum_money = data;
		},
		mtgetshare_profit:function(state,data){
			state.share_profit = data;
		},
		mtgetagency_profit:function(state,data){
			state.agency_profit = data;
		},
		mtgetmypartnercode:function(state,data){
			state.mypartnercode = data;
		},
		mtgetmypartnermsg:function(state,data){
			state.mypartnermsg = data;
		}
	},
	actions:{
		//获取我的伙伴方法
		getMyPartner:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/team/index?accessToken='+token).then(res=>{
					const data = res.data;
					commit('mtgetpartner',data.data.partner);
					commit('mtgetmember_sum',data.data.member_sum);
					commit('mtgetprofit',data.data.profit);
					commit('mtgetreward_sum_money',data.data.reward_sum_money);
					commit('mtgetshare_profit',data.data.share_profit);
					commit('mtgetagency_profit',data.data.agency_profit);
					commit('mtgetmypartnercode',data.code);
					commit('mtgetmypartnermsg',data.msg);
					resolve(res); 
				}).catch(error => {
	        			reject(error) 
	        	});
			});
		},
	}
}
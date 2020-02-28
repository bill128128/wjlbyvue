import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		recruitListcode:0,//返回状态码
		recruitListmsg:'', //返回提示信息
		frozenScoreBill:[],//招募积分兑充数组
		releaseScoreBill:[],//掌聚宝兑充数组
	},
	mutations:{
		mtgetrecruitListcode:function(state,data){
			state.recruitListcode = data;
		},
		mtgetrecruitListmsg:function(state,data){
			state.recruitListmsg = data;
		},
		mtgetfrozenScoreBill:function(state,data){
			state.frozenScoreBill = data;
		},
		mtgetreleaseScoreBill:function(state,data){
			state.releaseScoreBill = data;
		}
	},
	actions:{
		//获取招募信息方法
		getRecruitList:function({commit},info,page){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/score/castbill?accessToken='+token,{
					params:{
						type:info,
						page:page,
					}
				}).then(res=>{
					const data = res.data;
					commit('mtgetfrozenScoreBill',data.data.frozenScoreBill);
					commit('mtgetrecruitListmsg',data.msg);
					commit('mtgetrecruitListcode',data.code);
					resolve(res); 
				}).catch(error => {
	        			reject(error) 
	        	});
			});
		},
		
	}
}

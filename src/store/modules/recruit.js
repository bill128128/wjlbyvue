import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		release_score:'',//掌聚宝积分
		blush_score:'',  //招募红利
		frozen_score:'', //招募积分
		recruitcode:0,//返回状态码
		recruitmsg:'', //返回提示信息
		changecode:0, //兑充状态码
		changemsg:'', //兑充提示信息
	},
	mutations:{
		mtgetrelease_score:function(state,data){
			state.release_score = data;
		},
		mtgetblush_score:function(state,data){
			state.blush_score = data;
		},
		mtgetfrozen_score:function(state,data){
			state.frozen_score = data;
		},
		mtgetrecruitcode:function(state,data){
			state.recruitcode = data;
		},
		mtgetrecruitmsg:function(state,data){
			state.recruitmsg = data;
		},
		mtgetchangecode:function(state,data){
			state.changecode = data;
		},
		mtgetchangemsg:function(state,data){
			state.changemsg = data;
		}
	},
	actions:{
		//获取招募信息方法
		getRecruitScore:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/Blush/BlushScore?accessToken='+token).then(res=>{
					const data = res.data;
					commit('mtgetrelease_score',data.data.release_score);
					commit('mtgetblush_score',data.data.blush_score);
					commit('mtgetfrozen_score',data.data.frozen_score);
					commit('mtgetrecruitcode',data.code);
					commit('mtgetrecruitmsg',data.msg);
					resolve(res); 
				}).catch(error => {
	        			reject(error) 
	        	});
			});
		},
		
		//积分兑充
		scorechange:function({commit},info){
			return new Promise((resolve,reject)=>{
				const blushScore = info.leaseIntegralCount;
				const type = info.type;
				const frozenScore = info.frozenScore;
				axios.post(api+'/finance/Blush/BlushLeaseScore?accessToken='+token,{
					blushScore:blushScore,
					frozenScore:frozenScore,
					type:type
				}).then((res)=>{
					const data = res.data;
					commit('mtgetchangecode',data.code);
					commit('mtgetchangemsg',data.msg);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		}
	}
}

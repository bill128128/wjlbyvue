import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		subscribeJZBcode:0,//状态码
		subscribeJZBmsg:'',//提示信息
		subscribeJZBcast_type:'',//用户类型
		subscribeJZBfrozen_score:'',//招募积分
		subscribeJZBlease_score:'',//租赁积分
		checkcode:0,
		checkmsg:'',
	},
	mutations:{
		mtgetsubscribeJZBcode(state,data){
			state.subscribeJZBcode = data;
		},
		mtgetsubscribeJZBmsg(state,data){
			state.subscribeJZBmsg = data;
		},
		mtgetsubscribeJZBcast_type(state,data){
			state.subscribeJZBcast_type = data;
		},
		mtgetsubscribeJZBfrozen_score(state,data){
			state.subscribeJZBfrozen_score = data;
		},
		mtgetsubscribeJZBlease_score(state,data){
			state.subscribeJZBlease_score = data;
		},
		mtgetcheckcode(state,data){
			state.checkcode = data;
		},
		mtgetcheckmsg(state,data){
			state.checkmsg = data;
		},
	},
	actions:{
		//获取基础信息
		getsubscribeJZBInfo:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/score/releaseScore?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetsubscribeJZBcode',data.code);
					commit('mtgetsubscribeJZBmsg',data.msg);
					commit('mtgetsubscribeJZBcast_type',data.cast_type);
					commit('mtgetsubscribeJZBfrozen_score',data.frozen_score);
					commit('mtgetsubscribeJZBlease_score',data.lease_score);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
		checksubscribeJZB:function({commit},info){
			return new Promise((resolve,reject)=>{
				const quantity = info.placeholder;
				const type = info.type;
				const TransferOrUpgrade = info.checkid;
				axios.post(api+'/finance/score/moneyConvert?accessToken='+token,{
					quantity:quantity,
					type:type,
					TransferOrUpgrade,TransferOrUpgrade
				}).then((res)=>{
					const data = res.data;
					commit('mtgetcheckcode',data.code);
					commit('mtgetcheckmsg',data.msg);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
//		checksubscribeJZB:function({commit},info){
//			return new Promise((resolve,reject)=>{
//				const quantity = info.placeholder;
//				const type = info.type;
//				const TransferOrUpgrade = info.checkid;
//				axios.post(api+'/finance/score/convert?accessToken='+token,{
//					quantity:quantity,
//					type:type,
//					TransferOrUpgrade,TransferOrUpgrade
//				}).then((res)=>{
//					const data = res.data;
//					commit('mtgetcheckcode',data.code);
//					commit('mtgetcheckmsg',data.msg);
//					resolve(res);
//				}).catch(error => {
//	        			reject(error) 
//	        	});
//			})
//		},
	}
}
import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		subscribeJZBListcode:0,//状态码
		subscribeJZBListmsg:'',//提示信息
		subscribeJZBListdata:'',//用户信息数组
		subscribeJZBListbill:'',//列表数组
		subscribeJZBListrelease_score:'',//当前掌聚宝积分

	},
	mutations:{
		mtgetsubscribeJZBListcode(state,data){
			state.subscribeJZBListcode = data;
		},
		mtgetsubscribeJZBListmsg(state,data){
			state.subscribeJZBListmsg = data;
		},
		mtgetsubscribeJZBListdata(state,data){
			state.subscribeJZBListdata = data;
		},
		mtgetsubscribeJZBListbill(state,data){
			state.subscribeJZBListbill = data;
		},
		mtgetsubscribeJZBListrelease_score(state,data){
			state.subscribeJZBListrelease_score = data;
		},
	},
	actions:{
		//获取基础信息
		getsubscribeJZBListDetail:function({commit},page){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/score/moneyConvertBill?accessToken='+token+'&page='+page).then((res)=>{
					const data = res.data;
					commit('mtgetsubscribeJZBListcode',data.code);
					commit('mtgetsubscribeJZBListmsg',data.msg);
					commit('mtgetsubscribeJZBListdata',data.data);
					commit('mtgetsubscribeJZBListbill',data.data.bill);
					commit('mtgetsubscribeJZBListrelease_score',data.data.release_score);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
		checksubscribeJZBList:function({commit},info){
			return new Promise((resolve,reject)=>{
				const quantity = info.placeholder;
				const type = info.type;
				const TransferOrUpgrade = info.checkid;
				axios.post(api+'/finance/score/convert?accessToken='+token,{
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
	}
}
import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
	namespaced:true,
	state:{
		code:0,//状态码
		msg:'',//提示信息
		sellcode:0,//状态码
		sellmsg:'',//提示信息
		list:[],//数组
		new_price:'',
	},
	mutations:{
		mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetsellcode(state,data){
    		state.sellcode = data;
    	},
    	mtgetsellmsg(state,data){
    		state.sellmsg = data;
    	},
    	mtgetlist(state,data){
    		state.list = data;
    	},
    	mtgetnew_price(state,data){
    		state.new_price = data;
    	},
	},
	actions:{
		sell:function({commit},info){
			return new Promise((resovle,reject)=>{
				const total = info.sellCount;
				const service = info.serviceCount;
				const contact = info.selectWayMode;
				axios.get(api+'/finance/transaction/transactionOut?accessToken='+token,{
					params:{
						total:total,
						service:service,
						contact:contact,
						// contact_msg:info.selectWayText,
						contact_mode:info.selectWayText,
						contact_msg:info.selectWayMode
					}
				}).then((res)=>{
					const data = res.data;
					commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		},
		selllist:function({commit},infoList){
			let page = infoList[0];
			let type = infoList[1];
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/transaction/outRecord?accessToken='+token+'&page='+page+'&type='+type).then((res)=>{
					const data = res.data;
					commit('mtgetsellcode',data.code);
    				commit('mtgetsellmsg',data.msg);
    				commit('mtgetlist',data.data.out_list);
    				commit('mtgetnew_price',data.data.new_price);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		},
	}
}

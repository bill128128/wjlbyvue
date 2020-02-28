import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,//状态码
		msg:'',//提示信息
		buycode:0,//状态码
		buymsg:'',//提示信息
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
    	mtgetbuycode(state,data){
    		state.buycode = data;
    	},
    	mtgetbuymsg(state,data){
    		state.buymsg = data;
    	},
    	mtgetlist(state,data){
    		state.list = data;
    	},
    	mtgetnew_price(state,data){
    		state.new_price = data;
    	},

	},
	actions:{
		buy:function({commit},info){
			return new Promise((resovle,reject)=>{
				const code = info.searchbuyCode;
				const number = info.count;
				axios.get(api+'/finance/transaction/transactionInto?accessToken='+token,{
					params:{
						code:code,
						number:number,
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
		buylist:function({commit},page){
			return new Promise((resovle,reject)=>{
				axios.get(api+'/finance/transaction/intoRecord?accessToken='+token+'&page='+page).then((res)=>{
					const data = res.data;
					commit('mtgetbuycode',data.code);
    				commit('mtgetbuymsg',data.msg);
    				commit('mtgetlist',data.data.into_list);
    				commit('mtgetnew_price',data.data.new_price);
    				resovle(res);
				}).catch(error => {
                    reject(error);
                })
			})
		}
	}
}

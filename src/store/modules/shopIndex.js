import {api,getApi,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true,
	state:{
		code:0,//状态码
		msg:'',//返回提示信息
		dataList:[],//商品数组
		memberInt:'',//判断是否登录
		type:0,//商品类型
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetdataList(state,data){
	  		state.dataList = data;
	  	},
	  	mtgetmemberInt(state,data){
	  		state.memberInt = data;
	  	},
	  	mtgettype(state,data){
	  		state.type = data;
	  	},
	},
	actions:{
		getShopIndex:function({commit},info){
			const type = info.type;
			const keyword = info.keyword;
			const int = info.int;
			const page = info.page;
			const category = info.category;
//			console.log('type:'+type+'keyword:'+keyword+'int:'+int+'page:'+page+'category:'+category);
//			let apiUrl = api+'/finance/shop?accessToken='+token;
//			let params = {
//						type:type,
//						keyword:keyword,
//						int:int,
//						page:page,
//						category:category,
//				}
//			let getData = getApi(apiUrl,params);
//				getData.then((res)=>{
//					let data = res.data;
//					console.log(data.data.data_list);
//					commit('mtgetcode',data.code);
//					commit('mtgetmsg',data.msg);
//					commit('mtgetdataList',data.data.data_list);
//					commit('mtgetmemberInt',data.data.member_int);
//					commit('mtgettype',data.data.type);
//				})
//				getData.catch((data)=>{
//					console.log(data.data.data_list);
//					commit('mtgetcode',data.code);
//					commit('mtgetmsg',data.msg);
//					commit('mtgetdataList',data.data.data_list);
//					commit('mtgetmemberInt',data.data.member_int);
//					commit('mtgettype',data.data.type);
//				})
			return new Promise((resovle,reject)=>{
				const token = window.localStorage.getItem("date");
				axios.get(api+'/finance/shop?accessToken='+token,{
					params:{
						type:type,
						keyword:keyword,
						int:int,
						page:page,
						category:category,
					}
				}).then((res)=>{
					const data = res.data;
					console.log(data);
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetdataList',data.data.data_list);
					commit('mtgetmemberInt',data.data.member_int);
					commit('mtgettype',data.data.type);
					resovle(res);
				}).catch(error => {
        			  reject(error) 
        		});
			})
		}
	}
}

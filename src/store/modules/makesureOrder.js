import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		code:0,
		msg:'',
		product:{},
		prode:{},
		docode:0,
		domsg:'',
		orderid:0,
		paycode:0,
		paymsg:'',
	},
	mutations:{
		mtgetcode(state,data){
	  		state.code = data;
	  	},
	  	mtgetmsg(state,data){
	  		state.msg = data;
	  	},
	  	mtgetproduct(state,data){
	  		state.product = data;
	  	},
	  	mtgetprode(state,data){
	  		state.prode = data;
	  	},
	  	mtgetdocode(state,data){
	  		state.docode = data;
	  	},
	  	mtgetdomsg(state,data){
	  		state.domsg = data;
	  	},
	  	mtgetorderid(state,data){
	  		state.orderid = data;
	  	},
	  	mtgetpaycode(state,data){
	  		state.paycode = data;
	  	},
	  	mtgetpaymsg(state,data){
	  		state.paymsg = data;
	  	},
	},
	actions:{
		getprodetail:function({commit},info){			
			return new Promise((resovle,reject)=>{
				const id = info.id;
				const number = info.count;
				const type = info.type;
				axios.get(api+'/finance/ShopPay/confirmOrder?accessToken='+token,{
					params:{
						id:id,
						number:number,
						type:type,
					}
				}).then((res)=>{
					const data = res.data;
					//console.log(data);
					commit('mtgetcode',data.code);
					commit('mtgetmsg',data.msg);
					commit('mtgetproduct',data.data);
					commit('mtgetprode',data.data.detail);
					resovle(res);
				}).catch(error => {
	    			  reject(error); 
	    		});
			})			
		},
		doOrder:function({commit},info){
			return new Promise((resovle,reject)=>{
				const id = info.id;
				const number = info.count;
				const type = info.type;
				const address_id = info.addressid;
				const strProvince = info.proname;
				const strCity = info.cityname;
				const strDistrict = info.disname;
				const strTwon = info.addressstr;	
				const self_lifting = info.self_lifting;
				//console.log('id:'+id+ 'number:'+number +'type:'+type +'address_id:'+address_id);
				axios.post(api+'/finance/ShopPay/PlaceOrder?accessToken='+token,{
					id:id,
					number:number,
					type:type,
					address_id:address_id,
					strProvince:strProvince,
					strCity:strCity,
					strDistrict:strDistrict,
					strTwon:strTwon,
					self_lifting:self_lifting,
				}).then((res)=>{
					const data = res.data;
					commit('mtgetdocode',data.code);
					commit('mtgetdomsg',data.msg);
					commit('mtgetorderid',data.orderId);
					resovle(res);
				}).catch(error => {
	    			  reject(error); 
	    		});
			})
		},
		doDownLine:function({commit},info){
			return new Promise((resovle,reject)=>{
				const id = info.id;
				const number = info.count;
				const type = info.type;
				const self_lifting = info.self_lifting;
				//console.log('id:'+id+ 'number:'+number +'type:'+type +'address_id:'+address_id);
				axios.post(api+'/finance/ShopPay/PlaceUnderOrder?accessToken='+token,{
					id:id,
					number:number,
					type:type,
					self_lifting:self_lifting,
				}).then((res)=>{
					const data = res.data;
					commit('mtgetdocode',data.code);
					commit('mtgetdomsg',data.msg);
					commit('mtgetorderid',data.orderId);
					resovle(res);
				}).catch(error => {
	    			  reject(error); 
	    		});
			})
		},
		payOrder:function({commit},info){
			return new Promise((resovle,reject)=>{
				const orderId = info[0];
				const pay_password = info[1];
				//console.log(orderId+pay_password);
				axios.post(api+'/finance/ShopPay/orderPay?accessToken='+token,{
					orderId:orderId,
					pay_password:pay_password,
				}).then((res)=>{
					const data = res.data;
					commit('mtgetpaycode',data.code);
					commit('mtgetpaymsg',data.msg);
					resovle(res);
				}).catch(error => {
	    			  reject(error); 
	    		});
			})
		}
	}
}

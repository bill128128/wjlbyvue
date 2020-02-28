import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced: true, 
	state:{
		QRcode:0,
		QRmsg:'',
		QRimg:'',
	},
	mutations:{
		mtgetQRcode(state,data){
			state.QRcode = data;
		},
		mtgetQRmsg(state,data){
			state.QRmsg = data;
		},
		mtgetQRimg(state,data){
			state.QRimg = data;
		},
	},
	actions:{
		getQRcode:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/user/getCode?accessToken='+token).then((res)=>{
					const data = res.data;
					commit('mtgetQRcode',data.code);
					commit('mtgetQRmsg',data.msg);
					commit('mtgetQRimg',data.data.image);
					resolve(res);
				}).catch(error => {
	        			reject(error);
	        	});
			})
		}
	}
}

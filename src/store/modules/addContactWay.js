import {api,token} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state:{
  	addContactWaycode:0,
  	addContactWaymsg:'',
  	getcode:0,
  	getmsg:'',
  	getdata:[],
  	gettel:'',
  	getweixin:'',
  	getqq:'',
  	getcont:{},
  },
  mutations:{
  	mtgetaddContactWaycode(state,data){
  		state.addContactWaycode = data;
  	},
  	mtgetaddContactWaymsg(state,data){
  		state.addContactWaymsg = data;
  	},
  	mtgetgetcode(state,data){
  		state.getcode = data;
  	},
  	mtgetgetmsg(state,data){
  		state.getmsg = data;
  	},
  	mtgetgetdata(state,data){
  		state.getdata = data;
  	},
  	mtgetgettel(state,data){
  		state.gettel = data;
  	},
  	mtgetgetweixin(state,data){
  		state.getweixin = data;
  	},
  	mtgetgetqq(state,data){
  		state.getqq = data;
  	},
  	mtgetgetcont(state,data){
  		state.getcont = data;
  	},
  },
  actions:{
  	addContactWay:function({commit},info){
  		return new Promise((resolve,reject)=>{
	  		const telephone = info.telephone;
	  		const weixin = info.weixin;
	  		const qq = info.qq;
	  		const defaults = info.default;
	  		axios.post(api+'/finance/user/addContact?accessToken='+token,{
	  			contact_tel:telephone,
	  			contact_weixin:weixin,
	  			contact_qq:qq,
	  			default:defaults,
	  		}).then((res)=>{
	  			const data = res.data;
	  			commit('mtgetaddContactWaycode',data.code);
	  			commit('mtgetaddContactWaymsg',data.msg);
	  			resolve(res);
	  		}).catch(error => {
        			reject(error) 
        	});
  		})
  	},
  	getContactWay:function({commit}){
  		return new Promise((resolve,reject)=>{
  			axios.get(api+'/finance/user/contactList?accessToken='+token).then((res)=>{
  				const data = res.data;
  				commit('mtgetgetcode',data.code);
	  			commit('mtgetgetmsg',data.msg);
	  			commit('mtgetgetdata',data.data);
	  			commit('mtgetgettel',data.data.cont.contact_tel);
	  			commit('mtgetgetweixin',data.data.cont.contact_weixin);
	  			commit('mtgetgetqq',data.data.cont.contact_qq);
	  			commit('mtgetgetcont',data.data.cont);
	  			resolve(res);
  			}).catch(error => {
        			reject(error) 
        	});
  		})
  	},
  }
}
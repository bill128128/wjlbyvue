import {api,token} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    addpartnercode:0,//返回状态码
    addpartnermsg:'',//提示信息
    username:'',//用户名
    create_time: '',//创建时间
    listcode:'',//列表返回状态码
    listmsg:'',//列表提示信息
    viewtitle:'',//标题
    partnerlist:[]//接收数组
  },

  mutations: { //同步方法代替构造器
    mtgetaddpartnercode(state,data){
    	state.addpartnercode = data;
    },
    mtgetaddpartnermsg(state,data){
    	state.addpartnermsg = data;
    },
    mtgetusername(state,data){
    	state.username = data;
    },
    mtgetcreate_time(state,data){
    	state.create_time = data;
    },
    mtgetlistcode(state,data){
    	state.listcode = data;
    },
    mtgetlistmsg(state,data){
    	state.listmsg = data;
    },
    mtgetpartnerlist(state,data){
    	state.partnerlist = data;
    },
  },

  actions: { //异步方法->外部使用的方法
  	//添加伙伴方法
    addpartner:function({commit},partnerInfo){
    	const username = partnerInfo.name;
    	const password = partnerInfo.password;
    	const repassword = partnerInfo.repassword;
    	return axios.get(api+'/finance/user/addPartners?accessToken='+token,{
    		params: {
    			username:username,
    			password:password,
    			repassword:repassword
    		}}).then((res)=>{
    			commit('mtgetaddpartnercode', res.data.code);
    			commit('mtgetaddpartnermsg', res.data.msg);
    		}).catch(error=>{
	    	})
    },
    //添加伙伴记录函数
    goPartnerList:function({commit},pagesize){
    	return axios.get(api+'/finance/user/partnersList?accessToken='+token+'&page='+pagesize).then((res)=>{
    			commit('mtgetpartnerlist', res.data.data.list);      			
    			commit('mtgetlistcode', res.data.code);
    			commit('mtgetlistmsg', res.data.msg);
    	}).catch(error=>{
	    		console.log(res.data.code);
	    	})
    }
  }
 };

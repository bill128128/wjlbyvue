import {api,token} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
     conversionAssetscode:'', //返回状态码
     conversionAssetsmsg:'', //提示信息
     conversionAssetslist:[], //互转资产接收数组
  },

  mutations: { //同步方法代替构造器
    mtgetconversionAssetscode(state,data){
    	state.conversionAssetscode = data;
    },
    mtgetconversionAssetsmsg(state,data){
    	state.conversionAssetsmsg = data;
    },
    mtgetconversionAssetslist(state,data){
    	state.conversionAssetslist = data;
    },
  },

  actions: { //异步方法->外部使用的方法
  	//转出函数
    getConversionAssets:function({commit},info){
    	return new Promise((resovle,reject)=>{
    		const type = info.type;
    		const turnOut = info.turnOut;
    		const quantity = info.quantity;
				const password = info.password;
    		axios.post(api+'/finance/score/assets',{
    				type:type,
    				turnOut:turnOut,
    				quantity:quantity,
					password:password,
					accessToken:token
    		}).then((res)=>{
				const data = res.data;
    			commit('mtgetconversionAssetscode',data.code);
    			commit('mtgetconversionAssetsmsg',data.msg);
    			resovle(res);
    		}).catch(error => {
					reject(error) 
	        	});
    	});
    },
    //获取列表函数
    getConversionList:function({commit}){
    	return new Promise((resovle,reject)=>{
    		axios.get(api+'/finance/score/assetsList?accessToken='+token).then((res)=>{
				const data = res.data;
    			commit('mtgetconversionAssetscode',data.code);
    			commit('mtgetconversionAssetsmsg',data.msg);
    			commit('mtgetconversionAssetslist',data.data);
    			resovle(res);
    		}).catch(error => {
	        			reject(error) 
	        	});
    	})
    }
   }
};
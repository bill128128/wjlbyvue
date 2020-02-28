import {api,token} from '../../constans'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
     conversionAssetsListcode:'',//互转资产明细返回状态码
     conversionAssetsListmsg:'',//提示信息
     conversionAssetsListlist:[],//接收数组
  },

  mutations: { //同步方法代替构造器
    mtgetconversionAssetsListcode(state,data){
    	state.conversionAssetsListcode = data;
    },
    mtgetconversionAssetsListmsg(state,data){
    	state.conversionAssetsListmsg = data;
    },
    mtgetconversionAssetsListlist(state,data){
    	state.conversionAssetsListlist = data;
    },
  },

  actions: { //异步方法->外部使用的方法
  	//转入函数
    getConversionAssetsinDetail:function({commit},info){
    	return new Promise((resovle,reject)=>{
    		axios.get(api+'/finance/score/assetsBill?accessToken='+token,{
    			params:{
    				page : info.page,
    				wiring : info.wiring,
    				type:info.type,
    			}
    		}).then((res)=>{
    			const data = res.data;
    			commit('mtgetconversionAssetsListcode',data.code);
    			commit('mtgetconversionAssetsListmsg',data.msg);
    			commit('mtgetconversionAssetsListlist',data.frozen_score);
    			resovle(res);
    		}).catch(error => {
	        			reject(error) 
	        	});
    	})
    },
    //转出函数
    getConversionAssetsoutDetail:function({commit},info){
    	return new Promise((resovle,reject)=>{
    		axios.get(api+'/finance/score/assetsBill?accessToken='+token,{
    			params:{
    				page : info.page,
    				wiring : info.wiring,
    				type:info.type,
    			}
    		}).then((res)=>{
    			const data = res.data;
    			commit('mtgetconversionAssetsListcode',data.code);
    			commit('mtgetconversionAssetsListmsg',data.msg);
    			commit('mtgetconversionAssetsListlist',data.frozen_score);
    			resovle(res);
    		}).catch(error => {
	        			reject(error) 
	        	});
    	})
    },
   }
};
import {api,token} from '../../constans'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
    	msg:'',//提示信息
    	list:[],//接收数组
    },
    mutations:{
    	mtgetcode(state,data){
    		state.code = data;
    	},
    	mtgetmsg(state,data){
    		state.msg = data;
    	},
    	mtgetlist(state,data){
    		state.list = data;
    	},
    },
    actions:{
    	getmanagerlistDetail:function({commit},info){
    		return new Promise((resovle,reject)=>{
    			const member_id = info[0];
    			const page = info[1];
    			axios.get(api+'/finance/team/shareDetailed?accessToken='+token,{
    				params:{
    					member_id:member_id,
    					page:page,
    				}
    			}).then((res)=>{
    				const data = res.data;
    				commit('mtgetcode',data.code);
    				commit('mtgetmsg',data.msg);
    				commit('mtgetlist',data.data.share);
    				resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	}
    }
}
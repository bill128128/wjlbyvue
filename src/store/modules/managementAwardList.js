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
    	getmanagerlist:function({commit},page){
    		return new Promise((resovle,reject)=>{
    			axios.get(api+'/finance/team/shareList?accessToken='+token+'&page='+page).then((res)=>{
					const data = res.data;
					console.log(data);
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
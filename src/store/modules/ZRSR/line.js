import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
        msg:'',//提示信息
        list:'',
    },
    mutations:{
    	mtCode(state,data){
            state.code = data ;
        },
        mtMsg(state,data){
            state.msg = data ;
        },
        mtList(state,data){
            state.list = data ;
        },
    },
    actions:{
        getContent:function({commit},info){  //获取列表数据
    		return new Promise((resovle,reject)=>{
                let token = window.localStorage.getItem('date') ;
    			axios.get(api+'/finance/user/Dendrogram',{
    				params:{
                        accessToken:token,
                        status:'look',
                        subid:info
                    }
    			}).then((res)=>{
                    const data = res.data;
                    console.log(data);
    				commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					commit('mtList',data.list);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    }
}
import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
    namespaced: true,
    state:{
    	code:0,//状态码
        msg:'',//提示信息
    },
    mutations:{
    	mtCode(state,data){
            state.code = data ;
        },
        mtMsg(state,data){
            state.msg = data ;
        },
    },
    actions:{
        submit:function({commit},info){  //提交信息
    		return new Promise((resovle,reject)=>{
                let token = window.localStorage.getItem('date') ;
                let objInfo = {
                    accessToken:token,
                    hid_money:info[0],  //充值金额
                    img:info[1], //图片的base64
                }
                axios.post(api+'/finance/user/insertRecharge',objInfo)
                .then((res)=>{
                    const data = res.data;
                    console.log(data);
    				commit('mtCode',data.code);
					commit('mtMsg',data.msg);
					resovle(res);
    			}).catch(error => {
                    reject(error);
                })
    		})
    	},
    }
}
import {api,token} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		aboutuscode:0, //返回状态码
		aboutusmsg:'', //提示信息
		aboutustitle:'',//标题
		aboutuscontent:'',//内容
	},
	mutations:{//同步方法给属性赋值
		mtgetaboutuscode(state,data){
			state.aboutuscode=data;
		},
		mtgetaboutustitle(state,data){
			state.aboutustitle=data;
		},
		mtgetaboutusmsg(state,data){
			state.aboutusmsg=data;
		},
		mtgetaboutuscontent(state,data){
			state.aboutuscontent=data;
		},
	},
	actions:{//异步调用接口
		aboutUs:function({commit}){
			return new Promise((resolve,rejectg)=>{
				axios.get(api+'/index/Message/aboutUs').then((res)=>{
					const data = res.data;
					commit('mtgetaboutuscode',data.code);
					commit('mtgetaboutusmsg',data.msg);
					commit('mtgetaboutustitle',data.info.title);
					commit('mtgetaboutuscontent',data.info.contents);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
	}
}
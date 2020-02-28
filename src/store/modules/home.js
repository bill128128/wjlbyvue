import {api} from '../../constans'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
		banner:[],//轮播图数组
		homecode:0,//返回状态码
		homemsg:'',//返回提示信息
		notice:[], //公告数组
		activity:[],//广告数组
		noticetitle:'',//公告标题
		noticecreat_time:'',//公告创建时间
		noticecontents:'',//公告内容
		noticeDetailcode:0,//公告详情状态码
		noticeDetailmsg:'',//公告详情提示信息
		noticelist:[],//公告列表
		noticelistcode:0,//公告列表状态码
		noticelistmsg:'',//公告列表提示信息
	},
	mutations:{
		mtgetbanner(state,data){
			state.banner=data;
		},
		mtgethomecode(state,data){
			state.homecode=data;
		},
		mtgethomemsg(state,data){
			state.homemsg=data;
		},
		mtgetnotice(state,data){
			state.notice=data;
		},
		mtgetactivity(state,data){
			state.activity=data;
		},
		mtgetnoticetitle(state,data){
			state.noticetitle=data;
		},
		mtgetnoticecreat_time(state,data){
			state.noticecreat_time=data;
		},
		mtgetnoticeid(state,data){
			state.noticeid=data;
		},
		mtgetnoticelist(state,data){
			state.noticelist=data;
		},
		mtgetnoticecontents(state,data){
			state.noticecontents=data;
		},
		mtgetnoticeDetailcode(state,data){
			state.noticeDetailcode=data;
		},
		mtgetnoticeDetailmsg(state,data){
			state.noticeDetailmsg=data;
		},
		mtgetnoticelistcode(state,data){
			state.noticelistcode=data;
		},
		mtgetnoticelistmsg(state,data){
			state.noticelistmsg=data;
		},
	},
	actions:{
		//首页接口函数
		home:function({commit}){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index').then((res)=>{
					const data = res.data;
					commit('mtgetbanner',data.banner);
					commit('mtgetnotice',data.news);
					commit('mtgetactivity',data.activity);
					commit('mtgethomecode',res.data.code);
					commit('mtgethomemsg',data.msg);
					resolve(res); 
				}).catch(error => {
					reject(error) 
	        	});
			});
		},
		//公告详情接口函数
		noticeDetail:function({commit},id){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index/message/infoMessage?message_id='+id).then((res)=>{
					const data = res.data;
					commit('mtgetnoticetitle',data.info.title);
					commit('mtgetnoticecontents',data.info.contents);
					commit('mtgetnoticeDetailcode',res.data.code);
					commit('mtgetnoticeDetailmsg',res.data.msg);
					resolve(res); 
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		},
		//公告列表接口函数
		noticeList:function({commit},page){
			return new Promise((resolve,reject)=>{
				axios.get(api+'/index/message/MessageList?page='+page).then((res)=>{
					const data = res.data;
					commit('mtgetnoticelist',data.list);
					commit('mtgetnoticelistcode',data.code);
					commit('mtgetnoticelistmsg',data.msg);
					resolve(res);
				}).catch(error => {
	        			reject(error) 
	        	});
			})
		}
	}
}

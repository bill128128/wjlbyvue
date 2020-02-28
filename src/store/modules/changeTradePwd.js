import {api,token} from '../../constans'
import axios from 'axios'
export default {
    namespaced: true,
    state:{
        getcodeCode:'',       // 获取手机验证码
        getcodeMsg:'',
        phoneCertifyCode:'',  //1 手机验证
        phoneCertifyMsg:'',
        getProblemListCode:'',// 获取密保问题列表
        getProblemListMsg:'',
        getProblemList:[],
        idCertifyCode:'',      //2 身份认证
        idCertifyMsg:'',       
        modifyPwdCode:'',      //3 重置交易密码
        modifyPwdMsg:''
    },
    mutations: { //同步方法代替构造器
        mtgetcodeCode(state,data){
            state.getcodeCode = data ;
        },
        mtgetcodeMsg(state,data){
            state.getcodeMsg = data ;
        },
        mtphoneCertifyCode(state,data){
            state.phoneCertifyCode = data ;
        },
        mtphoneCertifyMsg(state,data){
            state.phoneCertifyMsg = data ;
        },
        mtgetProblemListCode(state,data){
            state.getProblemListCode = data ;
        },
        mtgetProblemListMsg(state,data){
            state.getProblemListMsg = data ;
        },
        mtgetProblemList(state,data){
            state.getProblemList = data ;
        },
        mtidCertifyCode(state,data){
            state.idCertifyCode = data ;
        },
        mtidCertifyMsg(state,data){
            state.idCertifyMsg = data ;
        },
        mtmodifyPwdCode(state,data){
            state.modifyPwdCode = data ;
        },
        mtmodifyPwdMsg(state,data){
            state.modifyPwdMsg = data ;
        }
    },
    actions: { //异步方法->外部使用的方法

        
        getCode({commit},mobile){   // 获取短信验证码
            return new Promise((resolve,reject)=>{
				axios.get(api+'/finance/Backpassword/getVerify',{
                    params:{
                        accessToken:token,
                        mobile:mobile
                    }
                }).then(res => {
                    const data = res.data;
					commit('mtgetcodeCode',data.code);
					commit('mtgetcodeMsg',data.msg);
					resolve(res); 
				}).catch(error => {
                    reject(error) 
	        	});
			});
        },
        phoneCertify({commit},userInfo){   // 修改交易密码 - 1 手机验证
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/Backpassword/BackPassMobile',{
                    params:{
                        accessToken:token,
                        username:userInfo.userName,
                        mobile:userInfo.userMobile,
                        verify:userInfo.code
                    }
                }).then(res => {
                    const data = res.data ;
                    commit('mtphoneCertifyCode',data.code);
                    commit('mtphoneCertifyMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        getProblemList({commit}){  // 身份验证 - 获取密保问题列表
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/user/problemList?accessToken='+token).then(res => {
                    const data = res.data ;
                    commit('mtgetProblemListCode',data.code);
                    commit('mtgetProblemListMsg',data.msg);
                    commit('mtgetProblemList',data.data.data_list);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        idCertify({commit},problemInfo){   //密保问题验证
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/Backpassword/Authentication',{
                    params:{
                        accessToken:token,
                        problem:problemInfo[0],
                        problem_pass:problemInfo[1]
                    }
                }).then(res => {
                    const data = res.data ;
                    commit('mtidCertifyCode',data.code);
                    commit('mtidCertifyMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        modifyPwd({commit},pwd){   //重置修改密码
            return new Promise((resolve,reject) => {
                axios.post(api+'/finance/Backpassword/EidtPayPassword',{
                    accessToken:token,
                    pay_password:pwd[0],
                    repassword:pwd[1],
                    mobile:pwd[2]
                }).then(res => {
                    const data = res.data ;
                    commit('mtmodifyPwdCode',data.code);
                    commit('mtmodifyPwdMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
};
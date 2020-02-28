import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced: true, //vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    state:{
        code:'', //状态吗 200(成功);404(失败)
        msg:'', //提示语
        accseeToken:'',  //token
        is_mobile:0,   //判断是否手机号是否存在 (存在1 不存在0)
        is_problem:0,  //判断是否设置密保问题，0未设置，1已设置
        is_points:0, //判断是否是管理员，是否有给下级拨分的功能
    },
    mutations:{ //同步方法代替构造器
        setCode:(state,data) => {
            state.code = data ;
        },
        setMsg:(state,data) => {
            state.msg = data ;
        },
        setAccessToken:(state,data) => {
            state.accseeToken = data ;
            window.localStorage.setItem('date',data);
        },
        setIsMobile:(state,data) => {
            state.is_mobile = data ;
        },
        setIsProblem:(state,data) => {
            state.is_problem = data ;
        },
        setIsPoint:(state,data) => {
            state.is_points = data ;
        }
    },
    actions:{   //异步方法:外部使用的方法
        doLogin:function({commit},userInfo){
            const name = userInfo.name.trim();
            const pwd = userInfo.password.trim();
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/index/login',{
                    params:{
                        loginId:name,
                        password:pwd
                    }
                }).then(res => {
                    const data = res.data;
                    // console.log('登陆放回的数据',data);
                    commit ('setCode',data.code);
                    commit ('setMsg',data.msg);
                    commit ('setAccessToken',data.data.accessToken);
                    commit ('setIsMobile',data.data.is_mobile);
                    commit ('setIsProblem',data.data.is_problem);
                    commit ('setIsPoint',data.data.is_points);
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
import {api} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced:true,
    status:{
        //获取最近价格表参数
        priceListCode:'', 
        priceListMsg:'',
        list:[],

        //获取每日开始时间和结束时间参数
        tractionTimeCode:'', 
        tractionTimeMsg:'',
        tractionTimeList:[],

        // 获取每天的交易量
        tradeCountCode:'',
        tradeCountMsg:'',
        tradeCountList:'',
    },
    mutations: {
        setpriceListCode(state,data){
            state.priceListCode = data ;
        },
        setpriceListMsg(state,data){
            state.priceListMsg = data ;
        },
        setList(state,data){
            state.list = data; 
        },
        settractionTimeCode(state,data){
            state.tractionTimeCode = data ;
        },
        settractionTimeMsg(state,data){
            state.tractionTimeMsg = data ;
        },
        settractionTimeList(state,data){
            state.tractionTimeList = data ;
        },
        settradeCountCode(state,data){
            state.tradeCountCode = data ;
        },
        settradeCountMsg(state,data){
            state.tradeCountMsg = data ;
        },
        settradeCountList(state,data){
            state.tradeCountList = data ;
        },
        settotalCount(state,data){
            state.totalCount = data ;
        }
    },
    actions:{
        getPriceList({commit},time){//获取最近价格列表
            return new Promise((resolve,reject) => {
            	const token = window.localStorage.getItem('date');
                axios.get(api+'/finance/Transaction/getPrice?time='+time+'&accessToken='+token).then((res) => {
                    const data = res.data ;
                    commit('setpriceListCode',data.code);
                    commit('setpriceListMsg',data.msg);
                    commit('setList',data.data.info);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        getTractionTime({commit}){//获取交易时间
            return new Promise((resolve,reject) => {
            	const token = window.localStorage.getItem('date');
                axios.get(api+'/finance/Transaction/getTransactionTime?accessToken='+token).then((res) => {
                    const data = res.data ;
                    commit('settractionTimeCode',data.code);
                    commit('settractionTimeMsg',data.msg);
                    commit('settractionTimeList',data.data);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        getTradeCount({commit}){//获取交易总量
            return new Promise((resolve,reject) => {
            	const token = window.localStorage.getItem('date');
                axios.get(api+'/finance/Transaction/transactionTotal?accessToken='+token).then((res) => {
                    const data = res.data ;
                    commit('settradeCountCode',data.code);
                    commit('settradeCountMsg',data.msg);
                    commit('settradeCountList',data.data.list);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}


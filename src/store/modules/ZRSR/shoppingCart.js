import {api,token} from '../../../constans/index'
import axios from 'axios'
export default{
	namespaced:true,
	state:{
        /*
            零售商城
        */
        onlineBuy:{
            code:'',
            msg:'',
        },
        downlineBuy:{
            code:'',
            msg:''
        },
        wholeOnlineBuy:{
            code:'',
            msg:'',
        },
        wholeDownlineBuy:{
            code:'',
            msg:''
        },
        sell:{
            code:'',
            msg:''
        }
	},
    mutations:{//同步方法给属性赋值
        setOnlineBuyCode(state,data){
            state.onlineBuy.code = data ;
        },
        setOnlineBuyMsg(state,data){
            state.onlineBuy.msg = data ;
        },
        setDownlineBuyCode(state,data){
            state.downlineBuy.code = data ;
        },
        setDownlineBuyMsg(state,data){
            state.downlineBuy.msg = data ;
        },
        setWholeOnlineBuyCode(state,data){
            state.wholeOnlineBuy.code = data ;
        },
        setWholeOnlineBuyMsg(state,data){
            state.wholeOnlineBuy.msg = data
        },
        setWholeDownlineBuyCode(state,data){
            state.wholeDownlineBuy.code = data ;
        },
        setWholeDownlineBuyMsg(state,data){
            state.wholeDownlineBuy.msg = data ;
        },
        setSellCode(state,data){
            state.sell.code = data ; 
        },
        setSellMsg(state,data){
            state.sell.msg = data ;
        }
	},
	actions:{//异步调用接口
        onlineBuy:function({commit},info){  //零售商城 - 线上商品下单
            let token  = window.localStorage.getItem('date');
            // console.log(info[1].moduleCount);
            return new Promise(resolve => {
                axios.post(api+'/finance/ShopPay/PlaceOrder',{
                    accessToken:token,
                    id:info[1].pid,
                    type:info[1].ptype,
                    number:info[1].stringPnumber,
                    address_id:info[0].addressid,
                    strProvince:info[0].proname,
                    strCity:info[0].cityname,
                    strDistrict:info[0].disname,
                    strTwon:info[0].addressdetail,
                    self_lifting:info[1].selfLifting,
                    or_number:info[1].moduleCount,
                    // int_type:info[1].intType
                }).then(res => {
                    const data = res.data ;
                    console.log(data);
                    commit('setOnlineBuyCode',data.code);
                    commit('setOnlineBuyMsg',data.msg);
                    resolve(res) ;
                }).catch(error => {
                    console.log(error) ;
                })
            })
        },
        downlineBuy:function({commit},info){  //零售商城 - 线下商品下单
            let token  = window.localStorage.getItem('date');
            // console.log(info[0].moduleCount);
            // return false;
            return new Promise(resolve => {
                axios.post(api+'/finance/ShopPay/PlaceUnderOrder',{
                    accessToken:token,
                    id:info[0].pid,
                    type:info[1],
                    number:info[0].stringPnumber,
                    self_lifting:info[0].selfLifting,
                    or_number:info[0].moduleCount,
                    // int_type:info[0].intType
                }).then(res => {
                    const data = res.data ;
                    console.log(data);
                    commit('setDownlineBuyCode',data.code);
                    commit('setDownlineBuyMsg',data.msg);
                    resolve(res) ;
                }).catch(error => {
                    console.log(error) ;
                })
            })
        },
        wholeOnlineBuy:function({commit},info){  //批发商城 - 线上下单
            let token  = window.localStorage.getItem('date');
            // console.log(info);
            return new Promise(resolve => {
                axios.post(api+'/finance/Wholesale/PlaceOrder',{
                    accessToken:token,
                    id:info[1].pid,
                    type:info[1].ptype,
                    number:info[1].stringPnumber,
                    address_id:info[0].addressid,
                    strProvince:info[0].proname,
                    strCity:info[0].cityname,
                    strDistrict:info[0].disname,
                    strTwon:info[0].addressdetail,
                    self_lifting:info[1].selfLifting,
                    is_events:1,
                    int_type:info[1].intType,
                    or_number:info[1].moduleCount,
                    code:info[1].myCode
                }).then(res => {
                    const data = res.data ;
                    console.log(data);
                    commit('setWholeOnlineBuyCode',data.code);
                    commit('setWholeOnlineBuyMsg',data.msg);
                    resolve(res) ;
                }).catch(error => {
                    console.log(error) ;
                })
            })
        },
        wholeDownlineBuy:function({commit},info){  //批发商城 - 线下商品下单
            let token  = window.localStorage.getItem('date');
            // console.log(info[0].moduleCount) 
            // return ;
            return new Promise(resolve => {
                axios.post(api+'/finance/Wholesale/PlaceUnderOrder',{
                    accessToken:token,
                    id:info[0].pid,
                    type:info[1],
                    number:info[0].stringPnumber,
                    self_lifting:info[0].selfLifting,
                    int_type:info[0].intType,
                    is_events:1,
                    or_number:info[0].moduleCount,
                    code:info[0].myCode
                }).then(res => {
                    const data = res.data ;
                    console.log(data);
                    commit('setWholeDownlineBuyCode',data.code);
                    commit('setWholeDownlineBuyMsg',data.msg);
                    resolve(res) ;
                }).catch(error => {
                    console.log(error) ;
                })
            })
        },
        sell:function({commit},info){  //批发商城 - 寄卖
            let token  = window.localStorage.getItem('date');
            console.log(info);
            return new Promise(resolve => {
                axios.post(api+'/finance/Wholesale/PlaceUnderOrder',{
                    accessToken:token,
                    id:info[0].pid,
                    type:info[1],
                    number:info[0].stringPnumber,
                    self_lifting:info[0].selfLifting,
                    int_type:info[0].intType,
                    is_events:2,
                    or_number:info[0].moduleCount,
                    code:info[0].myCode
                }).then(res => {
                    const data = res.data ;
                    console.log(data);
                    commit('setSellCode',data.code);
                    commit('setSellMsg',data.msg);
                    resolve(res) ;
                }).catch(error => {
                    console.log(error) ;
                })
            })
        }
	}
}
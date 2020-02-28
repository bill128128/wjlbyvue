import {api,token} from '../../constans'
import axios from 'axios'
import { resolve } from 'url';
export default{
    namespaced: true,
    state:{
        //收货地址列表
        getListCode:'',        
        getListMsg:'',
        list:[],
        //删除收货地址
        deleteListCode:'',    
        deleteListMsg:'',
        //添加收货地址
        addNewAddressCode:'',  
        addNewAddressMsg:'',
        addNewAddressList:'',
        //修改地址
        modifyAddressCode:'', 
        modifyAddressMsg:'',
    },
    mutations:{
        // 获取收货地址
        mtgetListCode(state,data){
            state.getListCode = data ;
        },
        mtgetListMsg(state,data){
            state.getListMsg = data ;
        },
        mtlist(state,data){
            state.list = data ;
        },
        // 删除收货地址
        mtdeleteListCode(state,data){
            state.deleteListCode = data ;
        },
        mtdeleteListMsg(state,data){
            state.deleteListMsg = data ;
        },
        // 添加收货地址
        mtaddNewAddressCode(state,data){
            state.addNewAddressCode = data ;
        },
        mtaddNewAddressMsg(state,data){
            state.addNewAddressMsg = data ;
        },
        mtaddNewAddressList(state,data){
            state.addNewAddressList = data ;
        },
        //修改地址
        mtmodifyAddressCode(state,data){
            state.modifyAddressCode = data ;
        },
        mtmodifyAddressMsg(state,data){
            state.modifyAddressMsg = data ;
        }
    },
    actions:{
        getAddressList({commit}){           //获取收货地址列表
            return new Promise((resolve,reject) => {
                axios.get(api+'/finance/Address/getList?accessToken='+token).then((res) => {
                    const data = res.data;
                    commit('mtgetListCode',data.code);
                    commit('mtgetListMsg',data.msg);
                    commit('mtlist',data.data);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        deleteAddress({commit},addressId){ //删除收货地址
            return new Promise((resolve,reject) => {
                axios.post(api+'/finance/Address/delAddress',{
                    accessToken : token ,
                    address_id : addressId
                }).then((res) => {
                    const data = res.data ;
                    commit ('mtdeleteListCode',data.code);
                    commit ('mtdeleteListMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject (error) ;
                })
            })
        },
        addNewAddress({commit},info){      //新增收货地址
            return new Promise((resolve,reject) => {
                axios.post(api+'/finance/Address/addAddress',{
                    accessToken : token ,
                    consignee : info[0].userName,
                    mobile : info[0].userMobile,
                    province : info[1],
                    city : info[2],
                    district : info[3],
                    address : info[4],
                    type : info[0].type
                }).then((res) => {
                    const data = res.data;
                    commit('mtaddNewAddressCode',data.code); 
                    commit('mtaddNewAddressMsg',data.msg); 
                    commit('mtaddNewAddressList',data.data); 
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        modifyAddress({commit},info){      //修改收货地址
            return new Promise((resolve,reject) => {
                axios.post(api+'/finance/Address/editAddress',{
                    accessToken : token,
                    address_id : info[0].userId,
                    consignee : info[0].userName,
                    mobile : info[0].userMobile,
                    province : info[1],
                    city : info[2],
                    district : info[3],
                    address : info[4],
                    type : info[0].type
                }).then((res) => {
                    const data = res.data ;
                    commit('mtmodifyAddressCode',data.code);
                    commit('mtmodifyAddressMsg',data.msg);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
}
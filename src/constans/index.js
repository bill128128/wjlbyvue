import axios from 'axios'
//线上api
//export const api = 'http://192.168.1.151'
// export const api = 'http://51bpbpz.cn'
// export const api = 'http://114.115.248.66'
// export const api = 'http://123.207.34.249' //测试
 export const api = 'http://api.pjzrsr.com' //正式
// export const api = 'http://192.168.1.4'

//线下api
//export const api = 'http://56test.jjzbest.com'
//export let token = window.localStorage.getItem('date');

export let token = window.localStorage.getItem('date');
let timer = setInterval(()=>{
	return token = window.localStorage.getItem('date');
},2000);

// export let isHaveParams = function(data,array){
// 	for(let i=0; i<array.length; i++){
// 		if(data[array[i]] == undefined){
// 			data[array[i]] = "" ;
// 		}
// 	}
// 	console.log()
// 	return data ;
// }

// export let isHaveParams = function(data,array){
// 	// console.table(array);
// 	for(let i=0 ; i<array.length; i++){
// 		if(array[i][1] == 1){
// 			if(data[array[i][0]]== undefined){
// 				data[arry[i][0]] = ""
// 			}
// 		}else{
// 			// console.log(data[array[i][2]][array[i][0]]);
// 			if(data[array[i][2]][array[i][0]] == undefined){
// 				data[array[i][2]][array[i][0]] = "" ;
// 			}else{
// 				console.log("111");
// 			}
// 		}
// 	}
// 	console.log(data);
// 	// return data ;
// }
export function isEmpety(datas,arr){
	for(var i=0; i<arr.length;i++){
		if(arr[i][1]==1){
			if(!datas.hasOwnProperty(arr[i][0])){
				datas[arr[i][0]]=='';	
			}
		}
		if(arr[i][1]==2){
			var strArr = arr[i][0].toString().split('.');     			
			if(!datas.hasOwnProperty(strArr[0])){
				datas[strArr[0]]={};
			} 
			if(!datas[strArr[0]].hasOwnProperty(strArr[1])){
				datas[strArr[0]][strArr[1]]=[];
			}
		}   		
	}
	//console.log(datas);
	return datas;
}
//get请求
export function getApi(url,params={}){
	class Processor { constructor(result) { return result } };
	return new Promise((resolve,reject) => {
		const prm = axios.get(url,{params:params});
	    prm.then(result => {
	      resolve(new Processor(result));
	    }).catch(result => {
	      reject(new Processor(result));
	    })
    })
}
//post请求
export function postApi(url,data = {}){   
	return new Promise((resolve,reject) => {
     	axios.post(url,data).then(res => {
        	resolve(res.data);
     	}).catch(err => {
		   reject(err);
		})
   })
 }
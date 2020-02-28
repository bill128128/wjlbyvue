import Vue from 'vue'
import {api} from '../constans'
import axios from 'axios'
import Router from 'vue-router'
import liulian from './liulian'
import nieguofu from './nieguofu'
import xiaofeng from './xiaofeng'
Vue.use(Router)
var routes = new Set([...xiaofeng, ...liulian, ...nieguofu]);
const router =  new Router({
   	routes,
});
router.beforeEach((to,from,next)=>{
	let token = window.localStorage.getItem('date');
//	console.log(to);//到达的路由
//	console.log(next);//管道中，可以跳转到其他路由
//	console.log(from);//离开的路由
//	let mobile = window.localStorage.getItem("is_mobile");
//  let problem = window.localStorage.getItem("is_problem");
//  console.log(mobile);
//  if(mobile == 0 || problem == 0 ){
//      next('/bindmobile');
//  }else{
//  	next();
//  }
	next();
})
export default router;

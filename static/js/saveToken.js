const STORAGE_KEY = 'token';
export default:{
	fetch(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY || '[]'));
	},
	save(items){
		window.localStorage.setItem(JSON.stringify(items));
	}

}
//用法:存储为js文件,在组件中import该js文件

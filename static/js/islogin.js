export default{
    isLogin(code,vue){
        if(code == 40000){
            setTimeout(() => {
                vue.$router.push('/login');
            },1000)
            window.localStorage.removeItem("date");
        }
    },   
}


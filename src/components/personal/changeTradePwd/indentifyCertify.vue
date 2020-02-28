<template>
    <div id="indentifyCertify">
        <top :message='title'/>
        <!-- 下拉选框 -->
        <div class="container">
            <form action="">
                <div class="content">请您认真选择，为了防止他人冒充，只有选择与详细信息页面中选择相一致的问提与您填写的答案，才可通过份认证。</div>
                <div class="selected">
                    <div class="placeholder" @click="showMenu">{{answer}}</div>
                    <span class="icon">
                        <img src="../../../../static/img/down.png" alt="down">
                    </span>
                    <ul class="select_menu" v-if="isShowSelectMenu"> 
                        <li v-for="(item,index) in problemList" :key="index" @click="selectProblem(index)">{{item.title}}</li>
                    </ul>
                </div>
                <label>
                    答：<input type="text" v-model="problemAnswer">
                </label>
                <button class="submit" @click="submit">下一步</button>
            </form>
        </div>
    </div>
</template>
<script>
    import top from '../../common/top'
    export default{
        name:'indentifyCertify',
        data(){
            return{
                title:'身份认证',
                problemList:[],
                answer:'',
                isShowSelectMenu:false, //是否显示下拉菜单，默认不显示
                selectItemId:1,  //默认选中下标为1的问题
                problemAnswer:''
            }
        },
        created(){
            this.isOverdue();
            this.getProblemList();
        },
        methods:{
            isOverdue(){  //判断是否过期
				this.$store.dispatch('isLogin/isLogin').then(()=>{
					if(this.$store.state.isLogin.code == 40000){
						this.$toast({
							message:this.$store.state.isLogin.msg,
						});
						setInterval(() => {
							this.$router.push("/login");
						},2000)
						window.localStorage.removeItem("date");
					}
				}).catch((e)=>{
					console.log(e);
				})
			},
            getProblemList(){     //获取问题列表
                this.$store.dispatch('changeTradePwd/getProblemList').then(() => {
                    if(this.$store.state.changeTradePwd.getProblemListCode == 200){
                        this.problemList = this.$store.state.changeTradePwd.getProblemList;
                        this.answer = this.problemList[0].title ;
                    }else{
                        this.$toast({
                            message:this.$store.state.changeTradePwd.getProblemListMsg
                        })
                    }
                })
            }, 
            selectProblem(index){   //选择问题
                this.answer = this.problemList[index].title ;
                this.isShowSelectMenu = false ;
                this.selectItemId = index +1 ;
            },
            showMenu(){  //显示下拉菜单
                this.isShowSelectMenu = !this.isShowSelectMenu ;
            },
            submit(){  //下一步进行提交
                this.$store.dispatch('changeTradePwd/idCertify',[this.selectItemId,this.problemAnswer]).then(() => {
                    if(this.$store.state.changeTradePwd.idCertifyCode == 200){
                        this.$toast({
                            message:this.$store.state.changeTradePwd.idCertifyMsg
                        })
                        setTimeout(() => {
                            this.$router.push('/modifyPwd')
                        },1000)
                    }else{
                        this.$toast({
                            message:this.$store.state.changeTradePwd.idCertifyMsg
                        })
                    }
                })
            }
        },
        components:{
            top
        }
    }
</script>
<style scoped>
    @import url('../../../../static/css/common');
    #indentifyCertify{
        background:url("../../../../static/img/addpartnerbg.png") no-repeat;
        background-size:cover;
        min-height:100vh;
        top:0;
    }
    form{margin-top:0.4rem;height:13.5rem;}
    .content{
        width:6.8rem;
        color:#99a3bf;
        font-size:0.37rem;
        line-height:0.56rem;
        margin:0 auto 0.5rem;;
    }
    .selected .select_menu{
        height:8rem;
        overflow-y:scroll; 
        display: block;
    }
    form .submit{
        display: block;
        margin:1.32rem auto 0;
    }
</style>

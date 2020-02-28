<template>
	<div id="JZBAndRecruitBonus">
		<div class="main_available">
            <div class="item">
                <div class="count">{{release_score}}</div>
                <h3>掌聚宝积分</h3>
            </div>
            <div class="item">
                <div class="count">{{blush_score}}</div>
                <h3>可用招募红利</h3>
            </div>
        </div>
        <!-- 表单 -->
        <form action="">
                <div class="selected">
                    <div class="placeholder" @click="showleaseIntegralMenu">租赁积分：<span>{{info.leaseIntegralCount}}</span></div>
                    <span class="icon"><img src="../../../../static/img/down.png" alt="icon" v-show="!isShowleaseIntegral"/></span>
                    <span class="icon"><img src="../../../../static/img/up.png" v-show="isShowleaseIntegral"/></span>
                    <ul class="select_menu" v-show="isShowleaseIntegral">
                        <li v-for="(item,index) in leaseIntegral" :key="index" @click="selectCount(index)">{{item}}</li>
                    </ul>
                </div>
                <div class="placeholderDiv" v-show="isShowleaseIntegral"></div>
                <div class="selected" v-show="!isShowleaseIntegral">
                    <div class="placeholder">掌聚宝：
                        <input type="text" class="count" value="" v-model="info.frozenScore">
                    </div>
                </div>
                <div class="tip">掌聚宝需大于或等于您所选兑充金额的50%，且为100的整数倍。</div>
                <div class="submit" @click="changeScore">立即招募</div>
        </form>
	</div>
</template>

<script>
	export default{
		name:'JZBAndRecruitBonus',
		data(){
			return{
				isShowleaseIntegral:false,  //默认不显示租赁积分的下拉菜单
                leaseIntegral:[1000,5000,10000,50000,100000],   //租赁积分
                info:{
                	leaseIntegralCount:'',   //租赁积分默认空
                	frozenScore:"",
                	type:3
                }
			}
		},
		computed:{
			release_score(){
				return this.$store.state.recruit.release_score;
			},
			blush_score(){
				return this.$store.state.recruit.blush_score;
			}			
		},
		created(){
            this.isOverdue();
			this.$store.dispatch('recruit/getRecruitScore').then(()=>{
				if(this.$store.state.recruit.recruitcode==200){
					// this.$toast({
					// 	message:this.$store.state.recruit.recruitmsg,
					// });
				}else{
					this.$toast({
						message:this.$store.state.recruit.recruitmsg,
					});
				}
			}).catch((e) => {              
					alert(输入错误);
				});
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
			showleaseIntegralMenu(){    //租赁积分下拉菜单
                this.isShowleaseIntegral = !this.isShowleaseIntegral;
            },
            selectCount(index){  //选择租赁积分的数量
                this.info.leaseIntegralCount = this.leaseIntegral[index];
                this.isShowleaseIntegral = false ;
            },
            changeScore:function(){
                if(this.info.leaseIntegralCount == "" || this.info.leaseIntegralCount ==null){
                    this.$toast({message:'请选择租赁积分'})
                    return false
                }else if(this.info.frozenScore > this.info.leaseIntegralCount){
                    this.$toast({message:'填写的掌聚宝积分数量不能大于租赁积分'})
                    return false;
                }else if(this.info.leaseIntegralCount-this.info.frozenScore>this.blush_score){
                    this.$toast({message:'可用招募红利不足'})
                    return false;
                }
            	this.$store.dispatch('recruit/scorechange',this.info).then(()=>{
            		if(this.$store.state.recruit.changecode == 200){
            			this.$toast({
							message:this.$store.state.recruit.changemsg,
                        });
                        setTimeout(() => {
                            this.$router.go(0)
                        },2000)
            		}else{
            			this.$toast({
							message:this.$store.state.recruit.changemsg,
						});
            		}
            	}).catch((e) => {              
					alert(输入错误);
				});
            },
		}
	}
</script>

<style scoped>
	@import "../../../../static/css/common";
    .container{
        position: relative;
        top:1.4rem;
    }
    /* 分段选择器 */
    .select_box .select_list{margin-top:0.6rem;}
    .select_list li{ width:50%; }
    .main_available .item{  width:50%;  }
    /* form */
    .selected .select_menu{ display:block }
    input{
        border:0;
        outline:0;
        background:transparent;
    }
    .tip{
        font-size:0.32rem;
        color: #99a3bf;
        width:6.8rem;
        margin:0 auto;
        text-align:justify;
        line-height:0.5rem;
    }
     input.count{
    	width: 55%;
    }
</style>
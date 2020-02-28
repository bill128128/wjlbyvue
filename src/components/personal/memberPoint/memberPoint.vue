<template>
    <div id='memberPoint'>
        <top :message="title" :notes='notes'/>
        <div class="container">
            <div class="member">
                <div class="total">当前可拨购物积分总额：<span>{{shopPoint}}</span></div>
                <div class="money">
                    <span style='flex-wrap: nowrap;'>被拨分用户:</span> 
					<input v-model="allInfo.name" type="text" placeholder="请输入用户名称" />
				</div>
                <div class="money">拨分额度:
					<input v-model="allInfo.count" type="number" placeholder="请输入拨分额度" />
				</div>
                <div class="button" @click='submit'>拨分</div>
            </div>
        </div>
    </div>
</template>
<script>
import top from '../../common/top'
import { api } from '../../../constans/index.js'
export default {
    name:'memberPoint',
    data(){
        return{
            title:'管理员拨分',
            userInfo:'',
            shopPoint:'',//购物积分
            allInfo:{
                name:null,
                count:null
            },
            notes:'拨分记录'
        }
    },
    components:{
        top
    },
    beforeMount(){
    },
    created(){
        this.userInfo =  JSON.parse(this.$route.query.userInfo)  ;
        console.log(this.userInfo) ;
        this.getInfo() ;
    } ,
    methods:{
        golist(){  //去记录页面
            this.$router.push('/memberPointList');
        },
        getInfo(){  //获取用户积分
            let token = window.localStorage.getItem('date') ;
            this.$axios.get(api+'/finance/user/memberShopint',{
                params:{
                    accessToken:token,
                }
            }).then(res => {
                if(res.data.code == 200){
                    this.shopPoint = res.data.info ;
                }else{
                    this.$toast({message:res.data.msg})
                }
            }).catch(e => {
                console.log(e) ;
            })
        },
        submit(){
            if(this.allInfo.name == null || this.allInfo.name == '' || this.allInfo.name.split(" ").join("").length == 0){
                this.$toast({message:'请填写被拨分下级用户名称'})
                return false ;
            }
            if(this.allInfo.count == null || this.allInfo.count == ''){
                this.$toast({message:'请填写拨分额度'})
                return false ;
            }
            if(parseFloat(this.allInfo.count) > parseFloat(this.shopPoint)){
                this.$toast({message:'您可拨购物积分不足'})
                return false ;
            }
            console.log() ;
            let token = window.localStorage.getItem('date') ;
            this.$messagebox.confirm('您是否要给' + this.allInfo.name + '拨' + this.allInfo.count + '分').then(action => {
                this.$Indicator.open('拨分中') ;
                this.$axios.post(api+'/finance/user/memberPoints',{
                    accessToken:token,
                    shop_int:this.allInfo.count,
                    username:this.allInfo.name
                }).then(res => {
                    this.$Indicator.close();
                    console.log(res.data) ;
                    if(res.data.code == 200){
                        this.allInfo.count = null ;
                        this.allInfo.name = null ;
                        this.getInfo();
                    }
                    this.$toast({message:res.data.msg})
                }).catch(e => {
                    console.log(e) ;
                })
            }).catch(() => {})
        }
    }
}
</script>
<style lang="less" scoped>
    @import url('../../../../static/css/common.css');
    .member{
        width: 9.2rem;
		background-image: linear-gradient(90deg, 
			#596487 0%, 
			#384466 100%);
		box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
			rgba(31, 31, 51, 0.2);
		border-radius: 0.13rem;
        padding: 0.8rem;
        margin-top:1rem ;
        .total{
            color: #fff;
            font-size: 0.32rem;
            margin-bottom: 0.53rem;
            span{
                color: #FFBB33;
            }
        }
        .money{
            width: 100%;
            height: 1rem;
            background: #A3A9BA;
            border-radius: 0.13rem;
            padding: 0.2rem;
            font-size: 0.37rem;
            display: flex;
            align-items: center;
            margin-bottom:1rem;
            input{
                background-color: transparent;
            }
        }
        .button{
            width: 3.2rem;
            height: 0.96rem;
            background-color: #ffbb33;
            -webkit-box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
            box-shadow: 0rem 0.13rem 0.5rem 0.03rem rgba(31, 31, 51, 0.2);
            border-radius: 0.13rem;
            margin: 0 auto;
            color: #fff;
            font-size: 0.43rem;
            font-weight: bold;
            line-height: 0.96rem;
            text-align: center;
            margin-bottom: 1rem;
        }
    }
</style>

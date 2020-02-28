<template>
    <div id='uploadDocument'>
        <top :message='title'/>
        <div class="container">
            <label class='number'>
                充值金额：<input type="number" v-model="number">
            </label>
            <div class="addPic">
                <div class="addText">请您上传一张充值凭证：</div>
                <label @change="uploadPhoto($event)">
                    <div class="add" v-if='!haveImg'>+</div>
                    <img :src="imgUrl" alt="" class='thumbnail' v-if='haveImg'>
                    <input type="file" accept="image/*" capture="camera" id="filepicker" hidden>
                </label>
            </div>
            <div class="btn" @click='submitInfo'>提交凭证信息</div>
        </div>
        <foot />
    </div>
</template>
<script>
import top from '../common/top'
import foot from '../common/index'
import { Indicator } from 'mint-ui';
export default {
    name:'uploadDocument',
    data(){
        return{
            title:'上传充值凭证',
            number:'',
            haveImg:false,//照片是否上传成功
            imgUrl:'',
            submit:''
        }
    },
    components:{
        top,foot
    },
    created(){
    },
    methods:{
        uploadPhoto(e){
            var me = this ;
            var file = document.getElementById("filepicker").files[0];
            var reader = new FileReader() ;  //本地预览
            reader.readAsDataURL(file) ;  //base64;
            reader.onload = function(){
                me.submit = reader.result ;
                me.imgUrl = window.URL.createObjectURL(file) ;
                me.haveImg = true ;
            }
        },
        submitInfo(){
            // console.log('提交',this.submit)
            if(this.number == '' || this.number == null){
                this.$toast({message:'请填写您充值的金额'})
                return false ;
            }else if(this.submit == "" || this.haveImg == false){
                this.$toast({message:'请您上传一张充值凭证'})
                return false ;
            }else{
                this.$store.dispatch('upload/submit',[this.number,this.submit]).then(()=>{
                    let backCode = this.$store.state.upload.code ;
                    let backMsg = this.$store.state.upload.msg ;
                    // Indicator.open({
                    //     text: '加载中...',
                    //     spinnerType: 'fading-circle'
                    // })
                    if(backCode == 1){
                        this.$toast({message:backMsg})
                        setTimeout(() => {
                            this.$router.push('/personalPage')
                        },1000)
                    }else{
                        this.$toast({message:backMsg})
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }
        }

    }
}
</script>
<style lang="less">
    @import url('../../../static/css/common.css');
    #uploadDocument{
        .container{
            width:9.2rem;
            margin:0 auto;
            position: relative;
            top:1.8rem;
            box-sizing: border-box;
            overflow-y: scroll;
            margin-bottom:2rem;
            font-size:.37rem;
            label.number{
                width: 100%;
                background: #A3A9BA;
                padding: 0.3rem;
                font-size: 0.37rem;
                display: flex;
                align-items: center;
                border-radius: 0.13rem;
                height:1rem;
                input{
                    background-color:transparent;
                }
            }
            .addPic{
                width:100%;
                margin:.5rem 0 ;
                .addText{
                    margin-bottom:.5rem;
                    color:#fff;
                }
                .add{
                    width:3rem;
                    height:3rem;
                    line-height:3rem;
                    text-align:center;
                    background-color:#A3A9BA;
                    font-size:.7rem;
                    color:#313859;
                    margin:0 auto;
                }
                .thumbnail{
                    width:4rem;
                    margin:0 auto ;
                    display: block;
                    padding:.2rem;
                    border:1px solid #A3A9BA;
                }
            }
            .btn{
                width:80%;
                height: 0.96rem;
                line-height:.96rem;
                background-color: #ffbb33;
                font-size: 0.43rem;
                margin:1rem auto ;
                position: fixed;
                bottom:1rem;
                left:50%;
                margin-left:-40%;
                text-align:center;
                color:#fff;
                border-radius: .13rem;
            }
        }
    }
</style>



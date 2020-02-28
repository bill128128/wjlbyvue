// 关于我们 - 公司介绍内容部分
<template>
    <div id="introductionContent" class="animated zoomIn">
        <h3>{{content.title}}</h3>
        <div class="content" v-html="content.contents">
            {{content.contents}}
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                content:''
            }
        },
        methods:{
            getContent(){
                this.$store.dispatch('knowAboutUs/getContent').then(() => {
					if(this.$store.state.knowAboutUs.code==200){
                        this.content = this.$store.state.knowAboutUs.list[0] ;
					}else{
						this.$toast({
							message:this.$store.state.knowAboutUs.msg,
						});
					}					          
				}).catch((e) => {              
					alert(输入错误);
				})
            }
        },
        created(){
            this.getContent();
        }
    }
</script>
<style scoped>
    @import url('../../../../static/css/animate.min');
    h3{
        font-weight: normal;
        font-size:0.45rem;
        margin-bottom:0.4rem;
    }
    .content{ line-height:0.56rem; text-align:justify;}
</style>

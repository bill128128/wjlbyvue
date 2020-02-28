<template>
    <div id="startPage">
        <div class="logo">
            <span><img src="../../../static/img/startpage_logo.png" alt="logo"></span>
            <span><img src="../../../static/img/startpage_logo1.png" alt="logo_text"></span>
        </div>
        <div class="btn tc bounce animated infinite" @click="goLogin"><img src="../../../static/img/startpage_go.png" alt="go"></div>
        <div class="title tc">共享租赁&nbsp;&nbsp;&nbsp;财富天下</div>
        <div class="count">{{content}}s</div>
    </div>
</template>

<script>
    import "../../../static/js/flexible"
    export default{
        name:'startPage',
        data(){
            return {
                content:0, //显示的内容
                totalTime:5, //记录具体倒计时的时间
            }
        },
        methods:{
			goLogin:function(){
                if(JSON.parse(localStorage.getItem('guideCode')) == "" || JSON.parse(localStorage.getItem('guideCode')) == null){
                    this.$router.push('/guide/guideguidAddPartner');
                }else{
                    this.$router.push('/index/index');
                }
			},
			countdown(){
				this.content --;
			}
        },
        mounted(){
			this.content = 5;
			setInterval(
				this.countdown,1000);
       },
       watch:{
       		'content':function(newVal,oldVal){
       			if(newVal==0){
                    if(JSON.parse(localStorage.getItem('guideCode')) == "" || JSON.parse(localStorage.getItem('guideCode')) == null){
                        this.$router.push('/guide/guideguidAddPartner');
                    }else{
                        this.$router.push('/index/index');
                    }
		        }
       		}
       }
    }
</script>

<style scoped>
    #startPage{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: url("../../../static/img/startpage_bg.png") no-repeat;
        background-size:cover;
        background-color:#313859;
    }
    .tc{  text-align:center;  }
    .logo{
        margin:3.67rem auto 6.5rem;
        height:1.76rem;
        text-align: center;
    }
    .logo span:first-child img{ width:1.76rem;  }
    .logo span:last-child img{  width:4.27rem;  }
    .btn img{
        width:2rem;
        height:2rem;
    }
    .title{
        font-size: 0.64rem;
        color: #3577ff;
        margin-top:1rem;
    }
    .count{
        position: fixed;
        top:0.5rem;
        right:0.5rem;
        color:#fff;
        border-radius: 50%;
        width:1.33rem;
        height:0.64rem;
        line-height:0.64rem;
        text-align:center;
        background-color:rgba(255,255,255,0.5);
        border-radius: 0.32rem;
        font-size:0.37rem;
    }
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }
    .animated.infinite {
        animation-iteration-count: infinite;
    }
    .bounce {
        animation-name: bounce;
        transform-origin: center bottom;
    }
    @keyframes bounce {
        from, 20%, 53%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
        }

        40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -10px, 0);
        }

        70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -10px, 0);
        }

        90% {
            transform: translate3d(0,-4px,0);
        }
    }
</style>


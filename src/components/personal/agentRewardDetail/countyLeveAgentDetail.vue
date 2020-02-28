<template>
	<!-- 县级代理详情 -->
	<div id="countyLeveAgentDetail">
		<div class="timer">
			<span class="riqi">{{changeDataVal}}</span>
			<span class="riqiimg"><img src="../../../../static/img/rl.png" @click="openPicker"></span>
		</div>
		<!-- 时间选择器 -->
        <mt-datetime-picker 
            ref="picker" 
            type="date"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            v-model="dataVal"
            @confirm="handleConfirm">
        </mt-datetime-picker>
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :bottomDistance='bottomDistance'>
			<ul class="list">
				<li v-for="(item,index) in pageList" :key="index">
					<div class="left">
						<div class="name"><span>{{item.username}}</span>(用户)</div>
						<div class="time">{{item.time}}</div>
					</div>
					<div class="count">{{item.int}}</div>
				</li>
			</ul>
		</mt-loadmore>	
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	export default{
		name:'countyLeveAgentDetail',
		data(){
			return{
				pageList:[],
		        allLoaded: false,
				pageVal: 0,
				pnum : 9,
				dataVal:new Date(),
				handler:function(e){e.preventDefault();},
				bottomDistance:150,
			}
		},
		 //侦听属性
        watch:{
            signReasonVisible:function(newvs,oldvs){//picker关闭没有回调函数，所以侦听该属性替代
                if(newvs){
                    this.closeTouch();
                }else{
                    this.openTouch();
                }
            }
        },
		computed:{
            changeDataVal(){
                const y = this.dataVal.getFullYear();
                let m = this.dataVal.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = this.dataVal.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            }
        },
		created(){
			this.isOverdue();
			this.getagentRewardDetail();  //初次访问查询列表
	    },
		methods:{
			/*解决iphone页面层级相互影响滑动的问题*/    
            closeTouch:function(){        
                document.getElementById("countyLeveAgentDetail").addEventListener('touchmove',this.handler,{passive:false}); //阻止默认事件   
            },    
            openTouch:function(){        
                document.getElementById("countyLeveAgentDetail").removeEventListener('touchmove', this.handler,{passive:false}); //打开默认事件     
			},
	        openPicker(){
				this.$refs.picker.open();//打开日期选择器
				this.closeTouch();//关闭默认事件
            },
            handleConfirm(value){
                this.$refs.picker.close();//关闭日期选择
				this.getagentRewardDetail();
				this.openTouch();//打开默认事件
            },
			loadBottom: function(){
	        	//this.pageVal++;   
	        	this.loadPageList();
	        	this.allLoaded = true;
	            this.$refs.loadmore.onBottomLoaded();
	            //this.loadPageList();
	            //this.more();
	        },
	        loadPageList: function(){
	            var i = 1,list0 = [];
	            for(i ; i < this.pnum;i ++){
	                list0.push(i);
	            }          
	            this.pnum+=8;
				this.pageList =  this.pageList.concat(list0);
			},
            getagentRewardDetail:function(){
            	this.$store.dispatch('agentRewardDetail/getagentRewardDetail',[this.changeDataVal,this.agentType]).then(()=>{
					// console.log(this.pageList);
					if(this.$store.state.agentRewardDetail.code == 200){
	        			this.pageList = this.$store.state.agentRewardDetail.list;
	        		}else{
	        			this.$toast({
	        				message:this.$store.state.agentRewardList.msg,
	        			});
	        		}
	        	}).catch((e)=> {
					alert(e);
				})
			},
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
			}
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common.css");
	.container{
        position: relative;
        top:1.4rem;
		min-height:100vh;
    }
     /* 2:分段选择器 */
    .tab_list{
        width:100%;
        height:1.2rem;
        overflow-x:auto;
        white-space:nowrap;
    }
    .tab_list li{
        width:30%;
        display:inline-block;
        text-align:center;
        height:1.2rem;
        line-height:1.2rem;
        font-size:0.37rem;
        color:#fff;
        box-sizing: border-box;
    }
    .tab_list li.active{
        border-bottom:2px solid #ffbb33;
        color:#ffbb33;
    }
	.container{
        width:9.2rem;
        margin:0 auto;
        position: relative;
        top:1.4rem;
    }
    .timer{
    	width: 9.2rem;
    	padding: .4rem;
    	margin: 0 auto;
    	display: flex;
    	color:#7a7acc;
    }
    .timer .riqi{
    	width: 50%;
    	text-align: left;
    }
    .timer .riqiimg{
    	width: 50%;
    }
    .timer .riqiimg img{
    	width: .53rem;
    	height: .52rem;
    	text-align: right;
    	float: right;
    }
</style>
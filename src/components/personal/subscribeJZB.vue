<template>
    <div id="subscribeJZB">
        <top :message="title" :notes="notes"></top>
        <div class="container">
            <main class="main_available">
                <div class="item">
                    <div class="count">{{cast_type}}</div>
                    <h3>用户级别</h3>
                </div>
                <div class="item">
                    <div class="count">{{frozen_score}}</div>
                    <h3>可用招募积分</h3>
                </div>
                <div class="item">
                    <div class="count">{{lease_score}}</div>
                    <h3>可用租赁积分</h3>
                </div>
            </main>		
                <form action="">
                    <div class="selected select_way">
                        <div class="placeholder" @click="showSelectWayMenu">认购类型：<span>{{way}}</span></div>
                        <span class="icon"><img src="../../../static/img/down.png" alt="icon"/></span>
                        <ul class="select_menu" v-show="isShowSlectWayMenu">
                            <li v-for="(item,index) in selectWay" :key="index" @click="selectWayFunction(index)">{{item.title}}</li>
                        </ul>
                    </div>
                     <div class="placeholderDiv" v-show='isShowSlectWayMenu'></div>
                    <div class="selected select_count" v-show="!isShowSlectWayMenu">
                        <div class="placeholder" @click="showSelectMenu">认购提现掌聚宝数量：<span>{{info.placeholder}}</span></div>
                        <span class="icon"><img src="../../../static/img/down.png" alt="icon" v-show="!isShowSelectMenu"/></span>
                        <span class="icon"><img src="../../../static/img/up.png" alt="icon" v-show="isShowSelectMenu"/></span>
                        <ul class="select_menu" v-show="isShowSelectMenu">
                            <li v-for="(item,index) in selectCount" :key="index" @click="SelectCount(index)">{{item}}</li>
                        </ul>
                    </div>
                    <div class="submit" @click="checkLevel">立即认购</div>
                    <div class="intro">
                        <ul class="intro_list">
                            <li v-for="(item,index) in intro" :key="index">
                                <h3>{{item.id}}、{{item.title}}</h3>
                                <div class="text_content">{{item.content}}</div>
                            </li>
                        </ul>
                    </div>
                </form>
        </div>
        <foot :pageindex="pageindex"></foot>
    </div>
</template>

<script>
    import top from '../common/top';
    import foot from '../common/index';
    import { MessageBox } from 'mint-ui';
    import isLogin from '../../../static/js/islogin' ;
    export default{
        name:'subscribeJZB',
        data(){
            return{
                title:'我要认购',
                notes:'明细',
                cast_type:'',//用户类型
                frozen_score:'',//招募积分
                lease_score:'',//租赁积分
                isShowSelectMenu:false,     //默认不展示选择下拉菜单
                selectCount:[1000,5000,10000,50000,100000],     
                pageindex:0,
                isShowSlectWayMenu:false,   //默认不展示转出方式下拉菜单
                selectWay:[
                	{
                		title:'招募积分',
                		id:1
                	},
                	{
                		title:'租赁积分',
                		id:2
                	}
                ],
                way:'', //转出方式默认为空
                
                intro:[
                    {
                        id:1,
                        title:'选择认购的类型：',
                        content:'认购提现掌聚宝分为2种方式：使用招募积分、租赁积分认购。选择您要认购的方式。'
                    },
                    {
                        id:2,
                        title:'选择认购的数量',
                        content:'认购提现掌聚宝数量分别为1000、5000、10000、50000、100000。当您所选认购数量大于用户级别数量，可选升级为相应的用户级别。您所选的认购数量需小于或等于你所拥有的招募积分或租赁积分。'
                    }
                ],
                info:{
                	type:0, //认购类型id
                	placeholder:'',//认购选择默认为0
                	checkid:0,
                }
            }
        },
        created(){
            this.isOverdue();
        	this.$store.dispatch('subscribeJZB/getsubscribeJZBInfo').then(()=>{
                isLogin.isLogin(this.$store.state.subscribeJZB.subscribeJZBcode,this);
        		if(this.$store.state.subscribeJZB.subscribeJZBcode == 200){
        			this.cast_type = this.$store.state.subscribeJZB.subscribeJZBcast_type;
        			this.frozen_score = this.$store.state.subscribeJZB.subscribeJZBfrozen_score;
        			this.lease_score = this.$store.state.subscribeJZB.subscribeJZBlease_score;
        		}else{
        			this.$toast({
						message:this.$store.state.subscribeJZB.subscribeJZBmsg,
					});
        		}
        	}).catch((e) => {              
                alert(输入错误);
            });
        },
        components:{
        	top,foot
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
            showSelectMenu(){   //显示和隐藏认购选择下拉菜单
                this.isShowSelectMenu = !  this.isShowSelectMenu;
            },
            SelectCount(index){ //将认购选择的数量填写到上面
                this.info.placeholder = this.selectCount[index];
                this.isShowSelectMenu = ! this.isShowSelectMenu;
            },
            showSelectWayMenu(){    //显示和隐藏转出方式下拉擦弹
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu ;
            },
            selectWayFunction(index){   //将转出方式填写在上面
                this.way = this.selectWay[index].title;
                this.info.type = this.selectWay[index].id;
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu;
            },
            golist(){
            	this.$router.push('/subscribeJZBList');
            },
            buy:function(){
            	
            	this.$store.dispatch('subscribeJZB/checksubscribeJZB',this.info).then(()=>{
            		if(this.$store.state.subscribeJZB.checkcode == 1){
            			this.$toast({
							message:this.$store.state.subscribeJZB.checkmsg,
                        });
                        setTimeout(() => {
                            this.$router.go(0);
                        },1000);
            		}else{
            			this.$toast({
							message:this.$store.state.subscribeJZB.checkmsg,
						});
            		}
            	}).catch((e) => {              
					alert(输入错误);
				});          	
            },
            checkLevel:function(e){
            	e.preventDefault();
                if(this.way == "" || this.way == null){
                    this.$toast({
                        message:'请选择认购类型'
                    })
                }else if(this.info.placeholder == 0 ){
                    this.$toast({
                        message:'请选择认购数量'
                    })
                }else if(this.cast_type == 5000 || this.cast_type == 50000){
            		if(this.info.placeholder == 5000 || this.info.placeholder == 50000){
            			if(this.cast_type == this.info.placeholder){
            				MessageBox.confirm('',{
							    title: '温馨提示',
							    message: '您是否需要升级到'+this.info.placeholder*2+'的等级',
							    showCancelButton: true,
							    confirmButtonText:'升级',
							    cancelButtonText:'转出'
							}).then(action=>{
								if(action=='confirm'){
									this.info.checkid = 2;
									this.buy();
								}
							}).catch(err=>{
								if(err=='cancel'){
									this.info.checkid = 1;
									this.buy();
								}
							});
            			}else{
	        				this.buy();
	        			}
	            		
	            	}else{
	            		this.buy();
	            	}
            		
            	}else{
            		this.buy();
            	}
            	
            },
        }
    }
</script>

<style scoped>
    @import url("../../../static/css/common");
    .container{
        position:relative;
        top:1.4rem;
        margin-bottom:1.8rem;
    }
    .main_available .item{
        width:33.33%;
    }
    .selected .select_menu{ display:block; }
    form .submit{  margin-top:1.33rem; }
    /* 文字介绍 */
    .intro{
        width: 7.6rem;
	    border: solid 0.01rem #99a3bf;
        padding:0.4rem;
        box-sizing: border-box;
        margin:1.07rem auto 0;
    }
    .intro h2{
        font-size:0.4rem;
        color:#fff;
        font-weight: normal;
        margin-bottom:0.4rem;
    }
    .intro h4{
        font-size:0.35rem;
        color:#99a3bf;
        font-weight: normal;
        margin-bottom:0.4rem;
    }
    .intro_list h3{
        margin:0.3rem 0;
        color:#fff;
        font-size:0.4rem;
        font-weight: normal;
    }
    .intro_list .text_content{
        font-size:0.35rem;
        color: #99a3bf;
        text-align:justify;
        line-height: .56rem;
    }
    .main_available .item:first-child .count{
        color:#fff;
    }
</style>


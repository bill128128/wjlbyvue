<template>
	<div id="addCard">
		<top :message="title"></top>
		<div class="containers">
			<div class="bg">
				<form action="" class="form">
					<label for="">姓名：
						<input type="text" v-model="bankinfo.username" name="name" placeholder="请输入您的真实姓名" autocomplete="off">
					</label>
					<label for="">身份证号：
						<input type="text" v-model="bankinfo.card_id" name="cardid" placeholder="请输入18位身份证号" autocomplete="off">
					</label>
					<p>请绑定本人银行卡</p>
					<div class="selected select_count">
						<div class="placeholder" @click="showSelectMenu"><span>{{bankinfo.bank_name}}</span></div>
							<span class="icon"><img src="../../../../static/img/down.png" alt="icon" v-show="!isShowSelectMenu"/></span>
	                        <span class="icon"><img src="../../../../static/img/up.png" alt="icon" v-show="isShowSelectMenu"/></span>
						<ul class="select_menu" v-show="isShowSelectMenu">
							<li v-for="(item,index) in bankNameList" :key='index' @click="selectBankName(item)">{{item}}</li>
						</ul>
					</div>
					<div style="width: 6.8rem; height: 6rem;" v-show="!answerShow"></div>
					<label for="">银行卡号：
						<input type="text" v-model="bankinfo.bank_card" name="text" placeholder="请输入银行卡号" autocomplete="off">
					</label>
					<label for="">开户行：
						<input type="text" v-model="bankinfo.bank_open" name="text" placeholder="请输入开户行地址" autocomplete="off">
					</label>
					<label for="">手机号：
						<input type="text" v-model="bankinfo.bank_mobile" name="text" placeholder="请输入银行预留手机号" autocomplete="off">
					</label>
					<label for="" class="def">是否设置为默认银行：
						<mt-switch v-model="value"></mt-switch>
					</label>
					<div class="tc"><button type="button" class="submit" @click="subCard">提交</button></div>
				</form>		
			</div>	
		</div>
		<foot :pageindex="pageindex"></foot>
	</div>
</template>

<script>
	import { Switch } from 'mint-ui';
	import top from '../../common/top'
	import foot from '../../common/index'
	export default{
		name:'addCard',
		inject:['reload'], //注入刷新
		data(){
			return{
				value:true,
				title:'添加银行卡',
				pageindex:2,
				isShowSelectMenu:false,     //默认不展示选择下拉菜单
				isShowSlectWayMenu:false,   //默认不展示转出方式下拉菜单
				answerShow:true,
				bankinfo:{
					username:'',//用户名
					card_id:'',//身份证号
					bank_name:'中国工商银行',//银行卡名称
					bank_card:'',//银行卡号
					bank_open:'',//开户行
					bank_mobile:'',//预留手机号
					is_default:0,//是否默认银行卡 1默认  0不默认
				},
				bankNameList:[
					'中国工商银行','招商银行','中国农业银行','中国建设银行','中国银行','中国民生银行','中国光大银行','中信银行','交通银行','兴业银行','上海浦东发展银行','华夏银行','深圳发展银行','广东发展银行','中国邮政储蓄银行','北京银行','宁波银行'
				]
			}
		},
		components:{
			top,foot,
		},
		created(){
			this.isOverdue();
			if(this.value){
				this.bankinfo.is_default = 1;
			}else{
				this.bankinfo.is_default = 0;
			}
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
				console.log(this.isShowSelectMenu);
                this.isShowSelectMenu = !  this.isShowSelectMenu;
                this.answerShow = !this.answerShow;
            },
            SelectCount(index){ //将认购选择的数量填写到上面
                this.userInfo.placeholder = this.problemlist[index].title;
                this.isShowSelectMenu = ! this.isShowSelectMenu;
                this.answerShow = true;
                //this.userInfo.problemid = this.problemlist[index].id;
                //console.log(this.userInfo.problemid);
            },
            showSelectWayMenu(){    //显示和隐藏转出方式下拉擦弹
                this.isShowSlectWayMenu = ! this.isShowSlectWayMenu ;
            },
            selectBankName(bankname){
            	this.bankinfo.bank_name = bankname;
            	this.isShowSelectMenu = !  this.isShowSelectMenu;
            	this.answerShow = !this.answerShow;
            },
            subCard(){
            	if(this.checkEmpty(this.bankinfo.username,'真实姓名') == false) return false;
            	if(this.checkEmpty(this.bankinfo.card_id,'身份证号') == false) return false;
            	if(this.checkEmpty(this.bankinfo.bank_name,'银行名称') == false) return false;
            	if(this.checkEmpty(this.bankinfo.bank_card,'银行卡号') == false) return false;
            	if(this.checkEmpty(this.bankinfo.bank_open,'开户行地址') == false) return false;
            	if(this.checkEmpty(this.bankinfo.bank_mobile,'银行预留手机号') == false) return false;
            	this.checkCardid();
            	this.checkMobile();
            	this.$store.dispatch('addCard/addCard',this.bankinfo).then(()=>{
            		if(this.$store.state.addCard.code == 1){
            			this.$toast({
            				message:this.$store.state.addCard.msg,
            			});
            			setTimeout(()=>{
            				this.$router.go(-1);
            			},1000);
            		}else{
            			this.$toast({
            				message:this.$store.state.addCard.msg,
            			})
            		}
            	}).catch((e)=>{
					console.log(e);
				})
            	
            },
            checkEmpty(info,tip){
            	if(info == '' || info ==null){
            		this.$toast({
            			message: tip+'不能为空',
            		});
            		return false;
            	}else{
            		return true;
            	}
            },
            checkCardid(){
            	let re;
            	re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            	if(re.test(this.bankinfo.card_id)===false){
            		this.$toast({
            			message:'请正确填写身份证号码',
            		});
            		return false;
            	}else{
            		return true;
            	}
            },
            checkMobile(){
            	let re;
            	re = /^(1[358][0-9]{9})$/;
            	if(re.test(this.bankinfo.bank_mobile)===false){
            		this.$toast({
            			message:'请正确填写手机号码',
            		});
            		return false;
            	}else{
            		return true;
            	}
            },
		}
	}
</script>

<style scoped lang="less">
	@import url("../../../../static/css/common.css");
	.bg{
		width: 100%;
		height: 17.95rem;
		p{
			color:#fff;
			padding-left: 0.75rem;
			padding-bottom: 0.3rem;
		}
	}
	.def{
		 display: flex;
        justify-content: space-between;
	}
	.mint-switch{
        width:1.36rem;
        background:transparent;
        margin:0;
        padding:0;
        display: flex;
        align-items: center;
    }
    .mint-switch-core::before{background-color:transparent;}
	.selected{
	    display: block;
	    width: 6.8rem;
	    height: 1.2rem;
	    line-height: 1.2rem;
	    box-sizing: border-box;
	    background: rgba(255,255,255,0.5);
	    margin: 0 auto 0.8rem;
	    border-radius: 0.13rem;
	    color: #666;
	    font-size: 0.37rem;
	    border:0;
	    outline:0;
	    position: relative;
	}
	.selected .placeholder{
	    padding:0 0.2rem;
		color:#333;
		height:100%;
		box-sizing: border-box;
	}
	.selected .placeholder span{
		overflow: hidden;
		display: inline-block;
		white-space: nowrap; 
		text-overflow:ellipsis; 
		width: 90%;
	}
	.selected .icon img{
	    position: absolute;
	    width:0.32rem;
	    height:0.2rem;
	    top:50%;
	    margin-top:-0.1rem;
	    right:0.3rem;
	}
	.selected .select_menu{
	    width:6.8rem;
	    padding:0 0.27rem;
	    box-sizing: border-box;
	    background-color:#A3A9BA;
	    z-index: 1000;
	    border-radius:0.13rem;
	    text-align:center;
	    display: none;
	    height: 6rem;
	    overflow: auto;	    
	}
	.selected .select_menu li{
	    border-bottom:1px solid #999;
	}
	.selected .select_menu{ display:block; }
	.input{
		width: 2.5rem;
		display: inline-block;
	}
	.btn{
		background-color: #ffbb33;
		cursor: pointer;
		border: none;
		color: white;
		width: 2.2rem;
		height: .8rem;
		line-height:0.8rem;
		line-height: .8rem;
		border-radius: 7px;
		margin:-0.4rem 0 0 0;
	}
</style>
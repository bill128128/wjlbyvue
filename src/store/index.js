import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import login from './modules/login.js'
import bindmobile from './modules/bindmobile.js'
import addpartner from './modules/addpartner.js'
import conversionAssets from './modules/conversionAssets.js'
//import myteam from './modules/myteam.js'
import getVerify from './modules/getVerify.js'
import recruit from './modules/recruit.js'
import recruitList from './modules/recruitList.js'
import mypartner from './modules/mypartner.js'
import home from './modules/home.js'
import personal from './modules/personal.js'
import conversionAssetsList from './modules/conversionAssetsList.js'
import aboutus from './modules/aboutus.js'
import subscribeJZB from './modules/subscribeJZB.js'
import subscribeJZBList from './modules/subscribeJZBList.js'
import changePwd from './modules/changePwd.js'
import addContactWay from './modules/addContactWay.js'
import retrievePwd from './modules/retrievePwd.js'
import QRCode from './modules/QRCode.js'
import cancle from './modules/cancle.js'//退出登录
import directPrizeList from './modules/directPrizeList' //直推奖明细
import directPrizeDetail from './modules/directPrizeDetail' //直推奖详情
import agentRewardList from './modules/agentRewardList.js' //代理奖明细
import agentRewardDetail from './modules/agentRewardDetail.js' //代理奖详情
import managementAwardList from './modules/managementAwardList.js'//管理奖明细列表
import managementAwardListDetail from './modules/managementAwardListDetail.js'//管理奖明细详情
import searchbuy from './modules/searchbuy.js'//管理奖明细详情
// loginNew
import loginNew from './modules/loginNew'
import tradeSell from './modules/tradeSell.js'//卖出
import tradePurchase from './modules/tradePurchase.js'//买入
import ZJBDailyReturn from './modules/ZJBDailyReturn.js'//每日返还掌聚宝
import XJBDailyReturn from './modules/XJBDailyReturn.js'//每日返还可提现掌聚宝
import tradeAction from './modules/tradeAction.js' //成交，驳回，撤回
import tradeIndex from './modules/tradeIndex.js' //交易首页
// 商城部分
import conversionRecord from './modules/conversionRecord.js' //商城兑换记录
import productDetail from './modules/productDetail.js' //商品详情
import address	from './modules/address' //收货地址
import categoryList from './modules/categoryList.js' //获取分类
import shopIndex from './modules/shopIndex.js' //商城首页
import exchange from './modules/exchange.js' //立即兑换
import defaddress from './modules/defaddress.js' //默认地址
import makesureOrder from './modules/makesureOrder.js' //确认订单
import paySuccess from './modules/paySuccess.js' //支付成功
import turnplate from './modules/turnplate.js' //转盘活动
import recruitScoreList from './modules/recruitScoreList' //招募积分明细
import isLogin	from './modules/isLogin' //判定登录是否过期
import changeTradePwd from './modules/changeTradePwd'  //找回交易密码
import knowAboutUs from './modules/knowAboutUs' //了解我们
import scroll from './modules/scroll' //了解我们
import myCard from './modules/myCard' //我的银行卡
import addCard from './modules/addCard'//添加银行卡
import extractCash from './modules/extractCash'//提现
import withdrawRecord from './modules/withdrawRecord'//提现列表

// 中融商融
import shoppingCart from './modules/ZRSR/shoppingCart'  //购物车
import register from './modules/ZRSR/register'  //注册
import myCode from './modules/ZRSR/myCode' //复投码
import line from './modules/ZRSR/line'
import managerList from './modules/ZRSR/managerList'  //管理奖列表
import upload from './modules/ZRSR/uploadDocument'  //上传充值凭证
import checkPid from './modules/ZRSR/checkPid'  //购物车
Vue.use(Vuex)
Vue.prototype.$axios = axios
export default new Vuex.Store({
	modules:{
		bindmobile,
		addpartner:addpartner,
		conversionAssets,
		getVerify,
		recruit,
		recruitList,
		mypartner,
		home,
		personal,
		conversionAssetsList,
		aboutus,
		subscribeJZB,
		loginNew,
		subscribeJZBList,
		changePwd,
		addContactWay,
		retrievePwd,
		QRCode,
		directPrizeList,
		directPrizeDetail,
		agentRewardList,
		agentRewardDetail,
		managementAwardList,
		managementAwardListDetail,
		searchbuy,
		cancle,
		tradeSell,
		tradePurchase,
		ZJBDailyReturn,
		tradeAction,
		tradeIndex,
		conversionRecord,
		productDetail,
		address,
		categoryList,
		shopIndex,
		exchange,
		defaddress,
		makesureOrder,
		paySuccess,
		turnplate,
		recruitScoreList,
		isLogin,
		changeTradePwd,
		knowAboutUs,
		scroll,
		myCard,
		addCard,
		extractCash,
		withdrawRecord,
		XJBDailyReturn,
		shoppingCart,
		register,
		myCode,
		line,
		managerList,
		upload,
		checkPid,
	},

});

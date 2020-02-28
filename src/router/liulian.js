export default [
    {
        path: '/',//首页
        name: 'index',
        component: resolve => require(['../components/index/index'], resolve)
    },
    {
        path:'/addpartnerList',//添加伙伴记录页
        name:'addpartnerList',
        component:resolve => require(['../components/personal/addpartnerList/addpartnerList.vue'], resolve)
    },
    {
        path:'/conversionAssetsList',//互转资产明细页
        name:'conversionAssetsList',
        component:resolve => require(['../components/personal/conversionAssetsList/conversionAssetsList.vue'], resolve)
    },
    {
        path:'/conversionAssets',//互转资产页
        name:'conversionAssets',
        component:resolve => require(['../components/personal/conversionAssets.vue'], resolve)
    },
    {
        path:'/subscribeJZB',//认购掌聚宝页
        name:'subscribeJZB',
        component:resolve => require(['../components/personal/subscribeJZB.vue'], resolve)
    },
    {
        path:'/recruit', //我要招募页
        name:'recruit',
        component:resolve => require(['../components/personal/recruit.vue'], resolve)
    },
    {
        path:'/tradeAction', //交易买入卖出
        name:'tradeAction',
        component:resolve => require(['../components/transaction/tradeAction.vue'], resolve)
    },
    {
        path:'/agentRewardList', //代理奖明细
        name:'agentRewardList',
        component:resolve => require(['../components/personal/agentRewardList.vue'], resolve)
    },
    {
        path:'/personalPage',    //个人中心我的
        name:'personalPage',
        component:resolve => require(['../components/personal/personalPage.vue'], resolve)
    },
    {
        path:'/QRCode', //我的二维码
        name:'QRCode',
        component:resolve => require(['../components/personal/QRCode.vue'], resolve)
    },
    {
        path:'/changePwd',   //修改密码
        name:'changePwd',
        component:resolve => require(['../components/personal/changePwd.vue'], resolve)
    },
    {
        path:'/addContactWay', //添加联系方式
        name:'addContactWay',
        component:resolve => require(['../components/personal/addContactWay.vue'], resolve)
    },
    {
        path:'/retrievePwd', //忘记密码——找回密码
        name:'retrievePwd',
        component:resolve => require(['../components/login/retrievePwd.vue'], resolve)
    },
    {
        path:'/paySuccess', //支付成功
        name:'paySuccess',
        component:resolve => require(['../components/shop/pay/paySuccess.vue'], resolve)
    },
    {
        path:'/myRecruitScoreList', // 我的页面-招募积分明细
        name:'myRecruitScoreList',
        component:resolve => require(['../components/personal/myRecruitScoreList.vue'], resolve) 
    },
    {
        path:'/myAvailableZJBList',//我的页面-可用掌聚宝明细
        name:'myAvailableZJBList',
        component:resolve => require(['../components/personal/myAvailableZJBList.vue'], resolve) 
    },
    {
        path:'/myTenancyScoreList',//我的页面-租赁积分明细
        name:'myTenancyScoreList',
        component:resolve => require(['../components/personal/myTenancyScoreList.vue'], resolve)   
    },
    {
        path:'/managementAwardList',//管理奖明细
        name:'managementAwardList',
        component:resolve => require(['../components/personal/managementAwardList.vue'], resolve)   
    },
    {
        path:'/managementAwardListDetail',//管理奖详情
        name:'managementAwardListDetail',
        component:resolve => require(['../components/personal/managementAwardListDetail.vue'], resolve)   
    },
    {
        path: '/transaction/index', //交易首页
        name: 'transactionLogin',
        component: resolve => require(['../components/transaction/index'], resolve),
    },
//  {
//      path:'/agentRewardDetail', //代理详情
//      name:'agentRewardDetail',
//      component: resolve => require(['../components/personal/agentRewardDetail.vue'], resolve),
//  },


    // 积分商城部分
    {
        path:'/shop/conversionRecord', //兑换记录
        name:'conversionRecord',
        component :resolve => require(['../components/shop/conversionRecord.vue'],resolve)
    },
    {
        path:'/shop/shippingAddressList', //收货地址列表
        name:'shippingAddressList',
        component :resolve => require(['../components/shop/shippingAddressList.vue'],resolve)
    },
    {
        path:'/shop/addAddress', // 添加收货地址
        name:'addAddress',
        component:resolve => require(['../components/shop/addAddress.vue'],resolve)
    },
    {
        path:'/makeSureOrder',//确认订单
        name:'makeSureOrder',
        component:resolve => require(['../components/shop/makeSureOrder.vue'], resolve)
    },
    {
        path:'/shop/modifyAddress', //修改收货地址
        name:'modifyAddress',
        component:resolve => require(['../components/shop/modifyAddress.vue'], resolve)
    },

    // 首页功能引导
    {
        path:'/guide/guideguidAddPartner', //首页功能引导 - 1 招募伙伴
        name:'guideguidAddPartner',
        component :resolve => require(['../components/guide/guideAddPartner.vue'],resolve)
    },
    {
        path:'/guide/guideConversionAssets', //首页功能引导 - 2 互转资产
        name:'guideConversionAssets', 
        component :resolve => require(['../components/guide/guideConversionAssets.vue'],resolve)
    },
    {
        path:'/guide/guideSubscribe', //首页功能引导 - 3 我要认购
        name:'guideSubscribe',
        component :resolve => require(['../components/guide/guideSubscribe.vue'],resolve)
    },
    {
        path:'/guide/guideRecruit', //首页功能引导 - 4 我要续购
        name:'guideRecruit',
        component :resolve => require(['../components/guide/guideRecruit.vue'],resolve)
    },
    {
        path:'/guide/guideNews', //首页功能引导 - 5 新闻
        name:'guideNews',
        component :resolve => require(['../components/guide/guideNews.vue'],resolve)
    },
    {
        path:'/guide/guideTrade', //首页功能引导 - 6 交易
        name:'guideTrade',
        component:resolve => require (['../components/guide/guideTrade.vue'],resolve)
    },
    {
        path:'/knowAboutUs', //了解我们
        name:'knowAboutUs',
        component:resolve => require (['../components/index/knowAboutUs.vue'],resolve)
    },
    {
        path:'/recruitScoreList', //招募积分列表
        name:'recruitScoreList',
        component:resolve => require(['../components/personal/recruitScoreList.vue'],resolve)
    },
    //修改交易密码 - 3步 手机认证 身份认证 重置交易密码
    {
        path:'/phoneCertify',  //手机认证
        name:'phoneCertify',
        component:resolve => require(['../components/personal/changeTradePwd/phoneCertify.vue'],resolve)
    },
    {
        path:'/indentifyCertify',  //身份认证
        name:'indentifyCertify',
        component:resolve => require(['../components/personal/changeTradePwd/indentifyCertify.vue'],resolve)
    },
    {
        path:'/modifyPwd',  //修改交易密码
        name:'modifyPwd',
        component:resolve => require(['../components/personal/changeTradePwd/modifyPwd.vue'],resolve)
    },
    //中融项目
    {
        path:'/retailShop/index',  //零售商城首页
        name:'retailShopIndex',
        component:resolve => require(['../components/retailShop/index'],resolve)
    },
    {
        path:'/wholesaleShop/index',  //批发商城首页
        name:'wholesaleShopIndex',
        component:resolve => require(['../components/wholesaleShop/index'],resolve)
    },
    {
        path:'/giftShop/index', //礼品商城首页
        name:'giftShopIndex',
        component:resolve => require(['../components/giftShop/index.vue'],resolve)
    },
    {
		path:'/shoppingCart/:type', //购物车
		name:'shoppingCart',
		component: resolve => require(['../components/shop/shoppingCart.vue'],resolve)
    },
    {
		path:'/register', //注册
		name:'register',
		component: resolve => require(['../components/login/register.vue'],resolve)
    },
    {
        path:'/myCode', //购物车中可以复制的code码
        name:'myCode',
        component:resolve => require(['../components/personal/myCode.vue'],resolve)
    },
    {
        path:'/line', //排线图
        name:'myLine',
        component:resolve => require(['../components/personal/myLine.vue'],resolve)
    },
    {
        path:'/managerList', //管理奖列表
        name:'managerList',
        component:resolve => require(['../components/personal/managerList.vue'],resolve)
    },
    {
        path:'/uploadDocument', //上传充值凭证
        name:'uploadDocument',
        component:resolve => require(['../components/personal/uploadDocument.vue'],resolve)
    },
    {
        path:'/memberPoint',//管理员拨分
        name:'memberPoint',
        component:resolve => require(['../components/personal/memberPoint/memberPoint.vue'],resolve)
    },
    {
        path:'/memberPointList', //管理员拨分记录
        name:'memberPointList',
        component:resolve => require(['../components/personal/memberPoint/memberPointList.vue'],resolve)
    }
]  
export default [
	{
      path: '/list', //加载更多
      name: 'list',
      component: resolve => require(['../components/common/list.vue'], resolve),
    },
    {
      path: '/login', //登录
      name: 'Login',
      component: resolve => require(['../components/login/loginNew.vue'], resolve),
    },
    // {
    //   path: '/personal', //旧版-个人中心
    //   name: 'Personal',
    //   component: resolve => require(['../components/personal/index'], resolve),
    // },
    {
    	path: '/bindmobile', //用户设置
    	name: 'Bindmobile',
    	component: resolve => require(['../components/login/bindmobile'], resolve),
    },
    {
    	path: '/addpartner', //添加伙伴
    	name: 'Addpartner',
    	component: resolve => require(['../components/personal/addpartner'], resolve),
//  	children:[
//  		{
//  			path:'addpartnerList',
//  			name:'addpartnerList',
//  			component: resolve => require(['../components/personal/addpartnerList/addpartnerList'], resolve),
//  		}
//  	]
    },
    {
    	path: '/integralDetail', //注册积分明细
    	name: 'IntegralDetail',
    	component: resolve => require(['../components/personal/integralDetail'], resolve),
    },
    {
    	path: '/conversionDetail', //互转积分明细
    	name: 'ConversionDetail',
    	component: resolve => require(['../components/personal/conversionDetail'], resolve),
    },
    {
    	path: '/myteam', //我的团队
    	name: 'MyTeam',
    	component: resolve => require(['../components/personal/myTeam'], resolve),
    },
    {
    	path: '/recruitList', //我要招募明细  
    	name: 'recruitList',
    	component: resolve => require(['../components/personal/recruitList/recruitList'], resolve),
    },
    {
    	path: '/searchBuy', //搜索买入
    	name: 'searchBuy',
    	component: resolve => require(['../components/transaction/searchBuy'], resolve),
    },
    {
    	path: '/myPartner', //我的合伙人
    	name: 'myPartner',
    	component: resolve => require(['../components/personal/myPartner'], resolve),
    },
    {
    	path: '/subscribeJZBList', //认购掌聚宝明细
    	name: 'subscribeJZBList',
    	component: resolve => require(['../components/personal/subscribeJZBList/subscribeJZBList'], resolve),
    },
    {
    	path: '/directPrizeList', //直推奖详情
    	name: 'directPrizeList',
    	component: resolve => require(['../components/personal/directPrizeList/directPrizeList'], resolve),
    },
    {
    	path: '/directPrize', //直推奖明细
    	name: 'directPrize',
    	component: resolve => require(['../components/personal/directPrize'], resolve),
    },
    {
    	path: '/notice', //公告详情
    	name: 'notice',
    	component: resolve => require(['../components/shop/notice/notice'], resolve),
    },
    {
    	path: '/aboutus',
    	name: 'aboutus',
    	component: resolve => require(['../components/shop/notice/aboutus'], resolve),
    },
    {
    	path: '/noticeList', //新闻公告
    	name: 'noticeList',
    	component: resolve => require(['../components/shop/notice/noticeList'], resolve),
    },
    {
    	path: '/agentRewardDetail', //代理奖详情
    	name: 'agentRewardDetail',
    	component: resolve => require(['../components/personal/agentRewardDetail'], resolve),
    },
    {
        path:'/zjbmrfh',//我的页面-可用掌聚宝明细
        name:'zjbmrfh',
        component:resolve => require(['../components/personal/ZJBDailyReturn2.vue'], resolve) 
    },
    //积分商城部分
    {
    	path: '/shop/index', //商城首页
    	name: 'shopIndex',
    	component: resolve => require(['../components/shop/index'], resolve),
    },
    {
    	path: '/shop/productDetail', //商品详情页面
    	name: 'productDetail',
    	component: resolve => require(['../components/shop/product/productDetail'], resolve),
    },{
    	path: '/shop/downLinePay', //线下支付
    	name: 'downLinePay',
    	component: resolve => require(['../components/shop/downLinePay'], resolve),
    },
    //活动部分
    {
    	path: '/turntable', //活动大转盘
    	name: 'turntable',
    	component: resolve => require(['../components/activity/turntable'], resolve),
    },
    {
    	path: '/turnplate', //活动大转盘
    	name: 'turnplate',
    	component: resolve => require(['../components/activity/turnplate'], resolve),
    },
    //提现功能区
    {
    	path: '/myCard', //我的银行卡
    	name: 'myCard',
    	component: resolve => require(['../components/personal/extractCash/myCard'], resolve),
    },
    {
    	path: '/addCard', //添加银行卡
    	name: 'addCard',
    	component: resolve => require(['../components/personal/extractCash/addCard'], resolve),
    },
    {
    	path: '/extractCash', //提现
    	name: 'extractCash',
    	component: resolve => require(['../components/personal/extractCash/extractCash'], resolve),
    },
    {
    	path: '/withdrawRecord', //提现记录
    	name: 'withdrawRecord',
    	component: resolve => require(['../components/personal/extractCash/withdrawRecord'], resolve),
    },
    {
    	path: '/XJBDailyReturn', //现金宝每日返还
    	name: 'XJBDailyReturn',
    	component: resolve => require(['../components/personal/XJBDailyReturn'], resolve),
	},
]

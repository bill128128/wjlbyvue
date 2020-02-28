export default [
//  {
//      path: '/transaction/index', //交易首页
//      name: 'transactionLogin',
//      component: resolve => require(['../components/transaction/index'], resolve),
//  },
    {
        path: '/transaction/purchase',  //交易买入卖出
        name: 'transactionPurchase',
        component: resolve => require(['../components/transaction/purchase'], resolve),
    },
]
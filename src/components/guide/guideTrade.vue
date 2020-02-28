<template>
<!-- 首页功能引导 - 6交易 -->
    <div id="guideTrade">
        <div class="guidecover">
            <router-link to="/index/index">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item1">
                            <img src="../../../static/img/guideTrade_bg.png" alt="addPartner">
                            <!-- <h2>招募伙伴</h2> -->
                        </li>
                        <li class="item2">
                            <h2>招募红利可挂卖 <br>买入&nbsp;卖出&nbsp;查看记录</h2>
                            <button>知道了</button>
                        </li>
                    </ul>
                    <img src="../../../static/img/arrow.png" alt="arrow"  class="arrow">
                </div>
            </router-link>
        </div>
    </div>
</template>
<style scoped> 
    @import url("../../../static/css/common");
    #guideTrade{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
    .guidContainer{
        margin:0;
        position: absolute;
        bottom:0.2rem;
    }
    .item1 img{
        position:relative;
        top:0.5rem;
    }
    .guidContainer .arrow{
        width: 1.84rem;
        height: 1.63rem;
        top: 1.2rem;
        left: 4.75rem;
    }
    .guidContainer .icon{
        margin-left:3.7rem;
    }
    .guidContainer .item2{
        text-align: center;
        position: relative;
        bottom: 0.37rem;
    }
    .guidContainer .book{
        height: 1.9rem;
        margin-left: 7rem;
    }
</style>


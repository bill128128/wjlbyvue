<template>
    <!-- 引导层 - 2互转资产 -->
    <div id="guideConversionAssets">
        <router-link to="/guide/guideSubscribe">
            <div class="guidecover">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item1">
                            <img src="../../../static/img/hzzc.png" alt="addPartner">
                            <h2>互转资产</h2>
                        </li>
                        <li class="item2">
                            <h2>提供积分上下互转 <br>查看转入、转出记录</h2>
                            <button>知道了</button>
                        </li>
                    </ul>
                    <img src="../../../static/img/arrow.png" alt="arrow"  class="arrow">
                </div>
            </div>
        </router-link>
    </div>
</template>
<style scoped>
    @import url("../../../static/css/common");
    #guideConversionAssets{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
    .guidContainer{
        position: relative;
        left:2.1rem;
    }
</style>


<template>
    <!-- 引导层 - 3我要认购 -->
    <div id="guideSubscribe">
        <div class="guidecover">
            <router-link to="/guide/guideRecruit">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item2">
                            <h2>提供资产认购 <br>查看认购记录</h2>
                            <button>知道了</button>
                        </li>
                        <li class="item1">
                            <img src="../../../static/img/transfer_zjb_icon.png" alt="addPartner">
                            <h2>我要认购</h2>
                        </li>
                    </ul>
                    <img src="../../../static/img/arrow_left.png" alt="arrow"  class="arrow">
                </div>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    @import url("../../../static/css/common");
     #guideSubscribe{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
    .guidContainer{
        position: relative;
        left:1.7rem;
    }
    .guidContainer .book{ margin-left: 1rem; }
    .guidContainer .arrow{
        width:0.97rem;
        height:1.21rem;
        left: 3.6rem;
    }
</style>


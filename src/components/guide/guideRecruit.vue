<template>
    <!-- 引导层 - 4我要续购 -->
    <div id="guideRecruit">
        <div class="guidecover">
            <router-link to="/guide/guideNews">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item2">
                            <h2>续购租赁积分 <br>查看续购记录</h2>
                            <button>知道了</button>
                        </li>
                        <li class="item1">
                            <img src="../../../static/img/recruiting_icon.png" alt="addPartner">
                            <h2>我要续购</h2>
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
     #guideRecruit{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
    .guidContainer{
        position: relative;
        left:3.9rem;
    }
    .guidContainer .book{ margin-left: 1rem; }
    .guidContainer .arrow{
        width:0.97rem;
        height:1.21rem;
        left: 3.6rem;
    }
</style>


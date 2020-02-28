<template>
<!-- 首页功能引导 - 5新闻 -->
    <div id="guideNews">
        <div class="guidecover">
            <router-link to="/guide/guideTrade">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item1">
                            <img src="../../../static/img/guide_news.png" alt="addPartner">
                            <!-- <h2>招募伙伴</h2> -->
                        </li>
                        <li class="item2">
                            <h2>提供系统新增功能、 <br>说明与平台公告</h2>
                            <button>知道了</button>
                        </li>
                    </ul>
                    <img src="../../../static/img/arrow.png" alt="arrow"  class="arrow">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
</script>
<style scoped> 
    @import url("../../../static/css/common");
    #guideNews{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
    .guidContainer{
        margin:0;
        position: absolute;
        bottom:1.45rem;
    }
    .item1 img{
        position:relative;
        top:0.5rem;
    }
    .guidContainer .arrow{
        width: 1.84rem;
        height: 1.63rem;
        top: 0.8rem;
        left: 1.05rem;
    }
    .guidContainer .icon{
        margin-left:0;
    }
</style>


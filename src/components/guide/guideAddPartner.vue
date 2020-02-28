<template>
<!-- 首页功能引导 - 1招募伙伴 -->
    <div id="guideAddPartner">
        <div class="guidecover">
            <router-link to="/guide/guideConversionAssets">
                <div class="guidContainer">
                    <div class="book"><img src="../../../static/img/guide_icon.png" alt=""></div>
                    <ul class="icon">
                        <li class="item1">
                            <img src="../../../static/img/add_partner_icon.png" alt="addPartner">
                            <h2>招募伙伴</h2>
                        </li>
                        <li class="item2">
                            <h2>为新伙伴注册账号 <br>查看添加记录</h2>
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
    export default{
        name:'guideAddPartner',
        created(){
            localStorage.setItem('guideCode','200');
        }
    }
</script>
<style scoped> 
    @import url("../../../static/css/common");
    #guideAddPartner{
        background:url("../../../static/img/guide_bg.png") no-repeat;
        background-size:cover;
        width:100%;
        min-height:100vh;
    }
</style>


// 关于我们 - 管理团队 圆环
<template>
    <div id="teamCircle">
        <div class="circle">
            <img src="../../../../static/img/circle3_left.png" alt="" class="animated bounceInLeft">
            <img src="../../../../static/img/circle3_right.png" alt="" class="animated bounceInRight ">
        </div>
    </div>
</template>
<style scoped>
    @import url('../../../../static/css/animate.min');
    /* 两个半圆 */
    .circle img:first-child{
        width:2rem;
        height:3.6rem;
        position: absolute;
        bottom:1.05rem;
        left:0;
        z-index: 1000;
    }
    .circle img:last-child{
        width:1.05rem;
        height:2.16rem;
        position: absolute;
        top:3.31rem;
        right:0;
        z-index: 1000;
    }
</style>

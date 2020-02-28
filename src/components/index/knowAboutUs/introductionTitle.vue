// 关于我们 - 公司介绍标题部分
<template>
    <div id="introductionTitle">
        <img :src="content.length && content[0].avatar" alt="公司介绍">
    </div>
</template>
<script>
    export default{
        props:['content']
    }
</script>
<style scoped>
    img{width:100%;height:100%;}
</style>



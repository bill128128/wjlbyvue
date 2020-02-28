// 关于我们 - 管理团队标题部分
<template>
    <div id="teamTitle">
        <img :src="content[2].avatar" alt="teamTitle">
    </div>
</template>
<script>
    export default{
        props:['content']
    }
</script>
<style scoped>
    img{width:100%; height:100%; }
</style>

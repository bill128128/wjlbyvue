// 关于我们 - 未来价值标题部分
<template>
    <div id="valueTitle">
        <img :src="content[1].avatar" alt="valueTitle">
    </div>
</template>
<script>
    export default{
        props:['content']
    }
</script>
<style scoped>
    img{ width:100%; height:100% }
</style>


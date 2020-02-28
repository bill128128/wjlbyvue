<template> 
    <!-- 未完成- -->
    <div id="purchase">
        <top :message="title"></top>
        <div id="latestrice">最新价：{{ latestrice }}</div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="purchase">{{ purchase }}</mt-tab-item>
            <mt-tab-item id="sellout">{{ sellout }}</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="purchase">
                <input type="submit" name="submit" value="代码">
                <input type="text" name="buyVolume" value="" placeholder="请输入你的属性"   >
                <input type="submit" name="submit" value="买入">
            </mt-tab-container-item>
            <mt-tab-container-item id="sellout">
                <input type="text">
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import top from '../common/top'
    export default {
        name: 'purchase',

        data(){
            return {
                title:'交易',
                purchase:'买入',
                sellout:'卖出',
                latestrice:27.20,
            }
        },
        computed: {
            selected: {
                set (v) {
                    this.$router.replace({ query: { ...this.$route.query,  status: v } })
                },
                get () {
                    return this.$route.query.status
                }
            }
        },
        components:{
            top,
        },
        created(){
            this.isOverdue();
        },
        methods:{
            isOverdue(){  //判断是否过期
				this.$store.dispatch('isLogin/isLogin').then(()=>{
					if(this.$store.state.isLogin.code == 40000){
						this.$toast({
							message:this.$store.state.isLogin.msg,
						});
						setInterval(() => {
							this.$router.push("/login");
						},2000)
						window.localStorage.removeItem("date");
					}
				}).catch((e)=>{
					console.log(e);
				})
			},
        }
    }

</script>
<style>
    #latestrice{
        color:#fff;
        margin: 1rem 0 0 1rem;
    }
</style>
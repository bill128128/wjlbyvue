<template>
    <div id="list">
         <div class="contSingleList">
            <div class="tabItem">
                <slot></slot>
            </div>
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
                <ul class="listItem">
                    <li v-for="(item,index) in listdata" :key="index">
                        {{item.time}}
                    </li>
                </ul>
            </v-scroll>
        </div>
    </div>
</template>
<script>
    import vScroll from './lodemore'
    export default{
        name:'list',
        data(){
            return{
                counter: 1, //当前页
                num: 15, // 一页显示多少条
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                scrollData: {
                    noFlag: false //暂无更多数据显示
                },
            }
        },
        components: {
            'v-scroll': vScroll
        },
        created(){
            this.getlist();
        },
        methods:{
            getlist(){
				this.$store.dispatch('scroll/getList',this.counter).then(()=>{
                    console.log(this.counter);
					if(this.$store.state.scroll.code == 200){
                        this.listdata = this.listdata.concat(this.$store.state.scroll.list);
                        if(this.$store.state.scroll.list.length == 0){
                            let more = this.$el.querySelector('.load-more')
                            more.style.display = 'none'; //隐藏加载条
                            //走完数据调用方法
                            this.scrollData.noFlag = true;
                        }
					}else{
						this.$toast({
							message:this.$store.state.scroll.msg
						});
					}
				}).catch((e) => {              
                    //alert(e);
				});
            },
            onRefresh(done) {
                this.listdata = []
                this.counter = 1;
                this.getlist();
                done()
                // this.onInfinite(done)
            },
            onInfinite(done) {
                if(this.scrollData.noFlag){
                    console.log("111")
                }else{
                    this.counter ++;
                    this.getlist();
                    done();
                }
            }		
        }
    }
</script>
<style scoped>
    .listItem{
        width:100%;
    }
    .listItem li{
        width:100%;
        height:2rem;
        border:1px solid red;
        box-sizing: border-box;
        text-align:center;
    }
</style>


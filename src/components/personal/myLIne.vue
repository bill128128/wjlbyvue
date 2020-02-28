<template>
  <div id="myLine">
    <top :message="title"/>
    <div class="container">
        <el-tree :data="getAllData" :props="defaultProps" @node-click="handleNodeClick" style='background-color:transparent;color:#ffbb33;'></el-tree>
    </div>
  </div>
</template>
<script>
import top from "../common/top";
import { Loadmore } from "mint-ui";
import { Tree } from 'element-ui';
export default {
    name: "myLine",
    data() {
        return {
            title:'我的排线图',
            originData:[],
            defaultProps: {
                children: "list",
                label: "title"
            }
        };
    },
    computed:{
        getAllData(){
            let myData = this.originData ; 
            return myData ;
        }
        
    },
    components: {
        top,
    },
    created() {
        this.getContent('');
    },
    methods: {
        getContent(userId) {
            this.$store.dispatch("line/getContent",userId)
            .then(() => {
                if (this.$store.state.line.code == 200) {
                    console.log('获取到的下级',this.$store.state.line.list)
                    if(userId == ''){
                        this.originData = this.$store.state.line.list;
                    }else{
                        var me = this ;
                        pinList(this.originData) ;
                        function pinList(data){
                            data.forEach(item => {
                                if(item.id == userId){
                                    me.$set(item,'list',me.$store.state.line.list) ;
                                }else{
                                    pinList(item.list);
                                }
                            })
                        }
                        
                        
                    }
                    console.log( this.originData) ;
                } else {
                    this.$toast({
                    message: this.$store.state.line.msg
                    });
                }
            })
            .catch(e => {
                console.log(e);
            });
        },
        handleNodeClick(data){
            console.log(data.id);
            this.getContent(data.id)
        }
    }
};
</script>
<style scoped>
@import url("../../../static/css/common");
.container {
  font-size: 0.37rem;
  color: #fff;
  line-height: 0.7rem;
}
.el-tree-node__content:hover{
    background-color:transparent;
    color:red;
}
</style>





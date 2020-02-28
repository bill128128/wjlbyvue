<template>
    <div id="transction">
        <top :message="title"></top>
        <div id="assets">
            <div class="titleAccets">总资产</div>
            <div class="totalAccets">{{ totalAccets }}</div>
            <ul class="btn">
                <li v-for="(item,index) in btnList" :key="index" @click="goToTradeAction('/tradeAction',index)">{{item}}</li>
            </ul>
            </div>
        <div id="time"><span class="i_time">{{ i_time }}</span><span class="day_time">{{ day_time }}</span></div>
        <div id="chartPrice" @click="showNumber"></div>
        <div id="chartNumber"></div>
        <!--<footer class="w100">
            <ul class="footer_list">
                <li @click="goindex">
                    <img src="../../../static/img/footer_index_icon.png">
                    <h4>首页</h4>
                </li>
                 <li class="active">
                    <img src="../../../static/img/footer_trade_icon_active.png">
                    <h4>交易</h4>
                </li>
                 <li @click="checkgologin('/personalPage')">
                    <img src="../../../static/img/footer_my_icon.png">
                    <h4>我的</h4>
                </li>
            </ul>
        </footer>-->
        <foot :pageindex='pageindex'></foot>
    </div>
</template>
<script>
    import top from '../common/top'
    import foot from '../common/index'
    export default {
        name: 'index',
        data(){
            return {
                selected: '1',
                title:'交易',
                totalAccets:'',
                i_time:'30分钟',
                day_time:'',
                btnList:['交易'],
                // 最近价格折线图
                xData:[],
                yData:[], //纵坐标得数据
                // 每天卖出数量柱状图
                XData:[],
                YData:[],
                newPrice:20,
                pageindex:1,
                start_time:'', //交易开始时间
                end_time:'', //交易结束时间
                request_time:'',//间隔时间(分钟)
                labelShow:false
            }
        },
        components:{
            top,foot
        },
        created(){
            this.isOverdue();
            this.getTractionTime();
            this.getTradeCount();
            var _this = this ;
            var newData = new Date(); //当前时间
            var hour = newData.getHours(); //小时
            var minute = newData.getMinutes(); //分钟
            newData = _this.changeTime(hour+":"+minute); //当前时间换算成m
            var start_time = _this.changeTime("9:00"); //开始时间换算成分
            var end_time = _this.changeTime("17:00");
            var fistSendTime ="";
            var lastSendTime ="";
            if(newData>=start_time && newData<=end_time){
                if(minute>30){
                    fistSendTime = hour + ":31" ;
                    lastSendTime = (hour + 1) + ":01";
                    //请求接口获取fistSendTime时间的数据
                    this.getPriceList(fistSendTime);
                }else{
                    fistSendTime = hour + ":01" ;
                    lastSendTime = hour + ":31" ;
                    //请求接口获取fistSendTime时间的数据
                    this.getPriceList(fistSendTime);

                }
                // 每秒定时器
                var timer = setInterval(function(){
                    newData = new Date();
                    var m = newData.getMinutes() < 10 ? "0" + newData.getMinutes() : newData.getMinutes();
                    var h = newData.getHours();
                    newData =_this.changeTime(h+":"+m);
                    if(newData == _this.changeTime(lastSendTime)){
                        // 请求接口，获取lastSendTime
                        _this.getPriceList(lastSendTime);
                        // console.log("请求接口获取"+lastSendTime+"时间的数据");
                        if(m>30){
                            lastSendTime = (h+1) + ":01" ;
                        }else{
                            lastSendTime = h + ":31" 
                        }
                        // console.log("下次请求时间"+lastSendTime) ;
                    }
                },60000)
            }else{
                //请求接口，获取当天18：00的数据
                this.getPriceList("17:00");
            }
        },
        mounted(){
            this.drawLine(); //画折线图
            this.drawChart();//画柱状图
        },
        methods: {
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
            showNumber(){ //点击价格表显示和隐藏数据
                this.labelShow = !this.labelShow;
                this.drawLine();
            },
        	goindex(){
        		this.$router.push('/index/index');
        	},
        	checkgologin(uri){
            	const token = window.localStorage.getItem('date');
            	if(token==null || token=='undefined'){
            		this.$toast({
            			message:'请先登录',
            		});
            		this.$router.push('/login')
            	}else{
            		this.$router.push(uri);
            	}
            },
            // 跳转买入卖出
            goToTradeAction(src){
                const token = window.localStorage.getItem('date');
            	if(token==null || token=='undefined'){
            		this.$toast({
            			message:'请先登录',
            		});
            		this.$router.push('/login')
            	}else{
            		this.$router.push('/tradeAction');
            	}
            },
            drawLine(){
                let myChart = echarts.init(document.getElementById('chartPrice'));
                let option = {
                     title: {
                        text: '最近价格表',
                        textStyle:{
                            color:'#ccc',
                            fontStyle:'normal',
                            fontSize:'0.3rem',
                        }
                    },
                     dataZoom: {
                        start: 30
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xData,
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        splitLine:{ //网格线
                            show: true, 
                            lineStyle:{
                                color:'#5A668D',
                                type:'dotted'
                            }
                        },
                        axisLabel:{ //横坐标文字过长
                            show:true,
                        } 
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        splitLine:{//网格线
                            show: true, 
                            lineStyle:{
                                color:'#5A668D',
                                type:'dotted'
                            }
                        },
                    },
                    series: [
                        {
                            data: this.yData,
                            type: 'line',
                            symbolSize: 1,   //折线点的大
                            itemStyle: {        
                                normal: {
                                    color: "#fff",//折线点的颜色  
                                    lineStyle: {
                                        color: "#386db3"//折线的颜色   
                                    },
                                    label:{show:this.labelShow,position:top}
                                }
                            },
                            markPoint : {	          		
                                symbolSize:30,	          		
                                itemStyle:{	          			 
                                    normal:{	          				
                                        label:{ 	          					
                                            show: true,                                  
                                            color: '#000',//气泡中字体颜色	          			
                                        }	          			 
                                    }	          		
                                },	                
                                data : [	                   
                                    {type : 'max', name: '最大值'},	                    
                                    {type : 'min', name: '最小值'}	                
                                ]	           
                            } 
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'slider',
                            xAxisIndex: 0,
                            filterMode: 'empty'
                        },
                        {
                            type: 'inside',
                            xAxisIndex: 0,
                            filterMode: 'empty'
                        },
                    ],
                };
                myChart.setOption(option);
            },
            drawChart(){
                var myChart =  myChart = echarts.init(document.getElementById('chartNumber'));
                var dataAxis = this.XData;
                var data =  this.YData;
                var yMax = 500;
                var dataShadow = [];
                for (var i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }
                let option = {
                    title: {
                        text: '每日销量',
                        textStyle:{
                            color:'#ccc',
                            fontStyle:'normal',
                            fontSize:'0.27rem',
                        }
                    },
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        // axisLabel:{ //横坐标文字过长
                        //     show:true,
                        //     interval: 1,//标签设置为全部显示
                        // } 
                    },
                    yAxis: {
                        splitLine:{ //网格线
                            show: true, 
                            lineStyle:{
                                color:'#5A668D',
                                type:'dotted'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                    },
                    dataZoom: [{type: 'inside'}],
                    series: [				
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            barGap:'-100%',
                            barCategoryGap:'40%',
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    ),
                                    label:{
                                        show: true, //开启显示
                                        position: 'top', //在上方显示,
                                        textStyle:{ //数值样式
                                            color:'#fff',
                                        }
                                    }
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: data
                        }
                    ]
                };

                myChart.setOption(option);

            },
            getTractionTime(){ //获取交易时间
                this.$store.dispatch('tradeIndex/getTractionTime').then(() => {
					if(this.$store.state.tradeIndex.tractionTimeCode == 200){	
                        this.start_time =this.$store.state.tradeIndex.tractionTimeList.start_time;
                        this.end_time = this.$store.state.tradeIndex.tractionTimeList.end_time;
                        this.request_time = this.$store.state.tradeIndex.tractionTimeList.request_time;
                        this.day_time = this.$store.state.tradeIndex.tractionTimeList.now ;
                        this.totalAccets = this.$store.state.tradeIndex.tractionTimeList.total;
					}else{
						this.$toast({
							message:this.$store.state.tradeIndex.tractionTimeMsg,
						});
					}					          
				}).catch((e) => {              
					//console.log("输入错误111");
				})
            },
            getPriceList(time){ //获取最近价格数据
                 this.$store.dispatch('tradeIndex/getPriceList',time).then(() => {
					if(this.$store.state.tradeIndex.priceListCode == 200){	
                        var priceList = this.$store.state.tradeIndex.list ;
                        for(let i=0; i<priceList.length; i++){
                            this.xData.push(priceList[i].time);
                            this.yData.push(priceList[i].new_price);
                        }
                        this.drawLine(); //画折线图
					}else{
						this.$toast({
							message:this.$store.state.tradeIndex.priceListMsg,
						});
					}					          
				}).catch((e) => {              
					// alert("最近价格表获取失败");
				})
            },
            changeTime(info){ //将时间换算成分
                let h = info.split(":")[0];
                let m = info.split(":")[1];
                return h*60 + Number(m) ;
            },
            getTradeCount(){ //获取交易数量
                this.$store.dispatch('tradeIndex/getTradeCount').then(() => {
					if(this.$store.state.tradeIndex.tradeCountCode == 200){	
                        let countList = this.$store.state.tradeIndex.tradeCountList;
                        for(var i=0; i<countList.length; i++){
                            // this.$set(this.XData,0,countList[i].time);
                            this.XData.push(countList[i].time);
                            this.YData.push(countList[i].num);
                        }
                        this.drawChart();//画柱状图
					}else{
						this.$toast({
							message:this.$store.state.tradeIndex.tradeCountList,
						});
					}					          
				}).catch((e) => {              
					//console.log("输入错误");
				})
            },
        }
    }
</script>
<style scoped>
    #assets{
        height: 4.1rem;
        width: 9.2rem;
        margin:1.4rem auto 0;
        background:url("../../../static/img/transaction-assets-bg.png") no-repeat;
        background-size:cover;
        text-align: center;
    }
    #assets .titleAccets{
        height: 1.1rem;
        font-size: 0.3rem;
        line-height: 1.7rem;
        letter-spacing: 0rem;
        color: #acbae6;
    }
    #assets .totalAccets{
        height: 0.9rem;
        font-size: 0.6rem;
        line-height: 0.9rem;
        letter-spacing: 0rem;
        color: #ffffff;
    }
    /* 按钮 */
    .btn{
        display: flex;
        justify-content: center;
        margin-top:0.5rem;
    }
    .btn li{
        width:2.13rem;
        height:0.75rem;
        line-height:0.75rem;
        background-color: #ffbb33;
        border-radius: 0.13rem;
        font-size:0.32rem;
        color:#fff;
    }
    /* .btn li:first-child{
        margin-right:2.07rem;
    } */
    #time {
        width: 9.2rem;
        color: #ffffff;
        font-size: 0.4rem;
        margin: 0.7rem auto 0;
    }
    #time .i_time{
        width: 1.1rem;
        height: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0rem;
        color: #ffffff;
        margin-left:0.4rem;
    }
    #time .day_time{
        width: 2.5rem;
        height: 0.3rem;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.4rem;
        letter-spacing: 0rem;
        color: #999999;
        float: right;
        margin-right:0.4rem;
    }
    #chartPrice,#chartNumber{
        width:9.2rem;
        height:5.33rem;
        background-color: #465480;
	    box-shadow: 0rem 0.13rem 0.5rem 0.03rem 
		rgba(31, 31, 51, 0.2);
        border-radius: 0.13rem;
        margin:0.3rem auto ;
        padding:0.2rem 0.1rem ;
        box-sizing: border-box;
    }
    #chartNumber{
        margin-bottom:1.8rem;
    }
    footer{
		width: 100%;
        height:1.3rem;
        position: fixed;
        bottom:0;
        left:0;
        background-color: #313859;
	    box-shadow: 0 -0.01rem 0.03rem 0 rgba(255, 255, 255, 0.4);
    }
    .footer_list{
        height:100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .footer_list img{
        width:0.6rem;
        height:0.6rem;
    }
    .footer_list h4{
        font-size:0.27rem;
        text-align:center;
        color:#7a7acc;
    }
    .footer_list li.active h4{
        color:#fff;
    }
</style>

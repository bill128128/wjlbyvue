<template>
	<div id="selling">
		<ul class="trade_list_menu">
            <li class="item">
                <ul class="infomation">
                    <li>
                        <p class="count">2b0012</p>
                        <p class="text">代码</p>
                    </li>
                    <li>
                        <p class="count">Liping</p>
                        <p class="text">委托人</p>
                    </li>
                    <li>
                        <p class="count">1111bo</p>
                        <p class="text">开盘价</p>
                    </li>
                    <li>
                        <p class="count">1111bo</p>
                        <p class="text">委托数量</p>
                    </li>
                </ul>
                <ul class="trade_time">
                    <li class="time">2018.08.10  09.20</li>
                    <li class="status">
                        <button class="status_action">成交</button>
                    </li>
                </ul>
            </li>
        </ul>
	</div>
</template>

<script>
	export default{
		name:'selling',
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	@import url("../../../../static/css/common.css");
    .select_list li{ width:50%; }
    .container{top:0;}
    /* form */
    .new_value{
        font-size:0.32rem;
        color:#fff;
        margin:0 auto 0.5rem;
    }
    form{
        width:100%;
        padding:0.8rem 0;
        margin:0.4rem auto 0.7rem;
    }
    form label{
        width:6.8rem;
        height:0.96rem;
        line-height:0.96rem;
        margin-bottom:0.4rem;
    }
    form .submit{ width:3.2rem; height:0.96rem; }
    .count_input{
        border:1px solid #313859;
        display: flex;
        padding:0;
    }
    .count_input span{
        width:16%;
        text-align:center;
        font-size:0.37rem;
        color:#666;
    }
    .count_input input{
        border:1px solid #313859;
        border-top:0;
        border-bottom:0;
    }
    .count_input input{ text-align:center; }
    /* 扣除提示信息 */
    .tip{
        width:6.8rem;
        margin:0 auto 0.4rem;
        font-size:0.32rem;
        color: #99a3bf;
        text-align: justify;
        line-height:0.48rem;
    }
    /* 下拉菜单 */
    .selected{
        height:0.96rem;
        line-height:0.96rem;
        margin-bottom:0.4rem;
    }
    .selected .select_menu{ display: block; }
    .placeholder span{ color:#666; }
    .trade_list h3{ display: flex; justify-content: space-between; }
    .trade_list h3 img{ width:0.27rem; }
    /* 卖出记录全部状态下拉 */
    .triangle{
        position: absolute;
        top:0.45rem;
        left:0;
        width:0;
        height:0;
        border-width:0 0.2rem 0.2rem;
        border-style:solid;
        border-color:transparent transparent  #9fa5b6;
    }
    .trade_list h3 span:last-child{position: relative;}
    .all_active_menu{
        position: absolute;
        top:0.6rem;
        right:0;
        width:3.2rem;
        box-sizing: border-box;
        padding:0 0.25rem;
        background-color: #9fa5b6;
        border-radius: 0.13rem; 
        font-size:0.37rem;
        color:#666; 
    }
    .all_active_menu li{
        padding:0.3rem 0.27rem;
        border-bottom:1px solid #8c8c8c;
        display: flex;
        justify-content: space-between;
    }   
    /* 选中状态后面打勾 */
    .all_active_menu .active{ color:#fff; }
    .all_active_menu .active::before{ content:'√' }
    .min_height{ height:6rem; }
</style>
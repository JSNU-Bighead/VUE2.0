<template>
    <div>
        <transition name="slider" mode="out-in" @after-leave="showFn">
            <div class="notif-item" v-if="showNotice">
                <div class="notif-head">
                    <i class="fa fa-volume-down"></i>
                    <span v-text="curNoticeObj.title"></span>
                </div>
                <div class="notif-right">
                    <div class="notif-content">
                        <div class="content" v-html="curNoticeObj.content"></div>
                    </div>
                </div>
                <em class="fa fa-close" v-on:click="removeFn"></em>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'notice',
        data(){
            return {
                noticeList:[
                    {
                        title:'个人批量支付单--线上线下支付分开录入',
                        content:'<h2>个人批量支付单--线上线下支付分开录入</h2><div><p><b>上线时间：3/2日</b></p><p><b>定义：</b><br></p><p>线上支付：推送资金平台的支付为线上支付</p><p>线下支付：不推送资金平台的支付为线下支付</p><p><b>背景：</b></p><p>用户录入多个支付公司，可能涉及多个出纳审批，并且可能多个出纳不属于同一个部门。</p><p><b>目的：</b></p><p>&nbsp; 为避免用户录单后，需和多个部门的出纳沟通的不便，也便于区分单据是否需推送资金平台。</div>'
                    },
                    {
                        title:'增值税专用发票扫码入账功能上线通知',
                        content:'<h2>增值税专用发票扫码入账功能上线通知</h2><div><p><b>上线时间：</b>2017年4月11日</p><p><b>目的：</b>1、提高总账费用部的账务处理效率&nbsp;&nbsp;&nbsp; </p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2、减轻同事发票台账登记的工作量&nbsp;&nbsp;&nbsp; </p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3、避免费用的涉税损失</p><p><b>功能简介：</b>通过扫描发票上的二维码，系统自动识别开票日期、发票号码、未税金额，选择开票税率后，系统自动生成待抵扣进项税额凭证。同时提供“待抵扣进项税查询”报表方便同事检验未收到发票的情况。</p><p>&nbsp;</p><p><b>若您对此功能有疑问，请联系财务信息组-周余43989</b></p></div>'
                    }
                ],//消息列表
                curNoticeObj:{},//当前消息
                showNotice: false
            }
        },
        methods:{
            getNoticeListFn(){
                //TODO 获取未读消息
            },
            showFn(){
                if(this.noticeList.length){
                    this.curNoticeObj = this.noticeList.shift();
                    this.showNotice = true;
                }
            },
            removeFn(){
                this.showNotice = false;
                //TODO 存储已读信息
            }
        },
        mounted(){
            this.showFn();
        }
    }
</script>
<style>
    /*动画效果*/
    .slider-enter-active{
        animation: slide-in .5s ease-out;
    }
    .slider-leave-active {
        animation: slide-out .5s ease-out;
    }
    @keyframes slide-in {
      0% {
        bottom: 180px;
        opacity: 0;
      }
      100% {
        bottom: 60px;
        opacity: 1;
      }
    }
    @keyframes slide-out {
      0% {
        bottom: 60px;
        opacity: 1;
      }
      100% {
        bottom: -60px;
        opacity: 0;
      }
    }
    /*消息框样式*/
    .notif-item {
        position: fixed;
        right: 15px;
        bottom: 60px;
        opacity: 1;
        width: 350px;
        border: 1px solid #fafafa;
        box-shadow: 0 0 5px rgba(0, 0, 0, .15);
        min-height: 70px;
        border: 1px solid #ddd;
        background: #fff;
        z-index: 9;
    }

    .notif-item.active {
        display: block;
    }

    .notif-icon {
        margin-top: 8px;
        margin-left: 10px;
        width: 80%;
        height: 80%;
    }

    .notif-head {
        padding: 7px 10px;
        font-size: 14px;
        background-color: #1ab394;
        color: #fff;
    }

    .notif-head i {
        display: inline-block;
        font-size: 14px;
        width: 14px;
        line-height: inherit;
        text-align: center;
    }

    .notif-content {
        padding: 10px;
        font-size: 10px;
    }

    .notif-content .linkBtn {
        cursor: pointer;
        color: #1ab394;
    }

    .notif-content .content a {
        font-weight: 700;
    }

    .notif-item em.fa {
        position: absolute;
        right: 8px;
        top: 8px;
        cursor: pointer;
        color: #E7E7E7;
    }

    .notif-item em.fa:hover {
        color: #fff;
    }
    .notif-item p {
        margin: 0;
    }
    .notif-item h1, .notif-item h2, .notif-item h3, .notif-item h4, .notif-item h5, .notif-item h6{
        margin: 0 0 10px 0;
    }
</style>

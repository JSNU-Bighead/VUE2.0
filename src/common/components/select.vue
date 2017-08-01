<template>
    <div class="select-wrapper" v-on:clicko="hideFn">
        <div id="input-wrapper" class="input-wrapper" :class="{'disabled':disabled}" v-on:click="showFn" ref="inputBox">
            <p class="input-box" v-text="inputText"></p>
            <i class="fa fa-angle-down" v-if="inputText==''"></i>
            <i class="fa fa-close" v-else @click="clearFn"></i>
        </div>
        <div class="drop-down" v-if="show" ref="drop">
            <div class="search-wrapper input-wrapper">
                <i class="fa fa-search"></i>
                <input type="text" class="input-search" placeholder="请输入筛选条件" v-model="searchText" @keyup="searchFn">
            </div>
            <ul  v-if="curList.length" class="drop-down-items">
                <li class="drop-down-item" v-bind:class="{'selected': value==item[valueKey]}" v-for="item in curFilteredList" v-bind:value="item[valueKey]" v-text="item[optionKey]" v-on:click="selectFn(item)"></li>
            </ul>
            <div v-else class="no-result">没有结果</div>
            <template v-if="limitLength < curList.length">
                <div class="drop-down-btn" v-show="curLimitLength == limitLength" v-on:click="curLimitLength = curList.length">更多</div>
                <div class="drop-down-btn" v-show="curLimitLength == curList.length" v-on:click="curLimitLength = limitLength">收起</div>
            </template>
        </div>
    </div>
</template>
<script>
    import {Popper} from '../lib/popper.js'
    export default { 
        name: 'Select',
        props:{
            value: null,
            list: {
                type: Array,
                required:true
            },
            limitLength:{
                required:false,
                default: 10
            },
            valueKey:{
                type: String,
                required:true
            },
            optionKey:{
                type: String,
                required:true
            },
            disabled:{
                type: Boolean,
                required: false,
                default: false
            }
        },
        data(){
            return {
                show:false,
                curList:[],//未经curLimitLength过滤
                inputText:'',
                curLimitLength: 10,
                searchText:'',
                popperObj:{}
            }
        },
        computed:{
            curFilteredList(){ //经curLimitLength过滤
                return this.curList.slice(0,this.curLimitLength);
            }
        },
        methods:{
            selectFn(item){
                this.$emit('input',item[this.valueKey])
                this.hideFn();
            },
            showFn(){
                if (this.disabled) return;
                this.show = true;
                this.$nextTick(()=>{
                    document.body.appendChild(this.$refs.drop)
                    this.buildPopperFn();
                })
                document.addEventListener('click', this.listenFn, true);
            },
            hideFn(){
                if(!this.show) return;
                this.show = false;
                this.searchText = '';
                this.curList = this.list.concat();
                this.popperObj.destroy();
                document.removeEventListener('click', this.listenFn, true);
            },
            listenFn(event){
                var domList = [this.$el];
                domList.filter(($el)=>{
                    if(this.$refs.drop){
                        return !($el.contains(event.target) || this.$refs.drop.contains(event.target));
                    } else {
                        return true;
                    }
                }).forEach(($el)=>{
                    var e = new Event('clicko');
                    e.clickTarget = event.target
                    $el.dispatchEvent(e);
                })
            },
            buildPopperFn(){
                var referenceElement = this.$refs.inputBox;
                var onPopper = this.$refs.drop;
                this.popperObj = new Popper(referenceElement, onPopper, {
                    placement: 'bottom-start',
                    modifiers:{
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: document.body,
                        },
                        flip: {
                            enabled: true,
                            boundariesElement: document.body
                        },
                    }
                });
            },
            getInputTextFn(){
                var matchList = this.list.filter((item)=>{
                    return this.value == item[this.valueKey]
                });
                if(matchList.length){
                    this.inputText = matchList[0][this.optionKey]
                    this.$emit('change',matchList[0])
                } else {
                    this.inputText = '';
                    this.$emit('change',{})
                }
            },
            searchFn(){
                var matchList = this.list.filter((item)=>{
                    return item[this.optionKey].indexOf(this.searchText) != -1
                })
                if(matchList.length){
                    this.curList = matchList;
                } else {
                    this.curList = [];
                }
            },
            clearFn(){
                this.$emit('input','')
                this.$emit('change',{})
            }
        },
        created(){
            this.curLimitLength = this.limitLength;
            this.getInputTextFn();
            this.curList = this.list.concat();
        },
        watch: {
            'list': function () {
                this.searchFn();
                this.getInputTextFn();
            },
            'value': function(){
                this.getInputTextFn();
            }
        }
    }
</script>
<style>
    .select-wrapper{
        width: 100%;
    }
    .select-wrapper > .input-wrapper{
        width: 100%;
        background: #fff;
        max-width: 175px;
    }
    .drop-down{
        display: inline-block;
        margin-top: 5px;
        margin-bottom: 5px; 
        font-size: 13px;
        background: #fff;
        z-index: 20;
        border: 1px solid #c9c9c9;
        box-shadow: 0 0 18px -7px rgba(0,0,0,.42);
    }        
    .input-wrapper{
        position: relative;
    }
    .input-wrapper{
        display: inline-block;
        height: 22px;
        line-height: 22px;
        border: 1px solid #c9c9c9;
        border-radius: 3px;
        vertical-align: middle;
        box-sizing: content-box;
    }
    .input-wrapper.disabled{
        background: #ececec;
    }
    .input-box{
        box-sizing: border-box;
        color: #444;
        font-size: 1em;
        vertical-align: text-top;
        font-size: 12px;
        padding: 0 20px 0 10px;
        width: 100%;  
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .input-wrapper i{
        z-index: 1;
        color: #888;
        display: inline-block;
        position: absolute;
        line-height: 26px;
        margin-top: -13px;
        top: 50%;
        left: 0;
        margin-left: .75em;
    }
    .input-wrapper i.fa{
        left: auto;
        right: 0;
        margin-right: .85em;
    }
    .input-wrapper i.fa-close{
        cursor:pointer;
        font-size: 12px;
    }
    .input-wrapper i.fa-close:hover{
        color: #666;
    }
    .search-wrapper{
        display: block;
        height: 28px;
        line-height: 28px;
        padding-left: 14px;
        border: none;
        border-bottom: 1px dashed #c9c9c9;
    }
    .input-search{
        outline: none;
        border: none;
        font-family: tahoma, "Microsoft YaHei", "Hiragino Sans GB", Arial, sans-serif;
    }
    .drop-down-items{
        display: block;
        min-width: 100px;
        max-height: 210px;
        overflow: auto;
        background: #fff;
        border-radius: 2px;
        padding: 0 3px;
        color: #333;
        z-index: 1
    }
    .drop-down-items::-webkit-scrollbar { width: 4px; height: 10px;}
    .drop-down-items::-webkit-scrollbar-thumb { background: #aaa; border-radius: 2px;}
    .drop-down-items::-webkit-scrollbar-track { background: #f3f3f3;}
    .drop-down-item{
        display: block;
        margin: 0;
        padding: 0;
        padding: 6px 30px 6px 15px;
        line-height: 1.8;
        position: relative;
        cursor: pointer;
        box-shadow: inset 0 0 0 2px #fff,inset 0 0 0 2px #fff;
        border-radius: 5px;
    }
    .drop-down-item:hover{
        background-color: #f6f5f5;
        outline: 0;
    }
    .drop-down-item.selected{
        font-weight: 700;
    }
    .drop-down-item.selected:after{
        content: "";
        display: inline-block;
        transform: rotate(40deg);
        width: 5px;
        height: 10px;
        border-width: 0 2px 2px 0;
        border-style: solid;
        border-color: #27ab8d;
        position: absolute;
        top: 50%;
        right: 12px;
        margin-top: -7px;
    }
    div.no-result{
        height: 35px;
        line-height: 35px;
        color: #666;
        padding: 0 10px;
    }
    .drop-down-btn{
        text-align: center;
        height: 28px;
        line-height: 28px;
        color:#666;
        border-top: 1px dashed #c9c9c9;
        cursor: pointer;
    }
    .drop-down-btn:hover{
        background-color: #f6f5f5;
    }
</style>
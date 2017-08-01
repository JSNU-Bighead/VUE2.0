<template>
    <div style="display:inline-block;">
        <slot>
            <div class="btn" @click="showFn">查看文件</div>
        </slot>
        <div class="viewer-modal-wrapper" v-if="show" ref="viewer">
            <div class="viewer-modal">
                <div class="close" @click="closeFn"></div>
                <div class="viewer-content-wrapper" ref="content">
                    <div class="viewer-content-item" v-for="(item,$index) in viewerList" v-if="$index == currentNav">
                        <template v-if="item.isImage">
                            <div class="viewer-imgbar" :style="{marginTop: item.marginTop + 'px'}" :key="item.filePath">
                                <img class="drag-able" v-bind:src="item.filePath" v-on:mousedown="startMoveFn" v-on:mouseup="endMoveFn" v-on:mousewheel="mouseWheelFn" v-on:DOMMouseScroll="mouseWheelFn" @load="marginInitFn($event,$index)" :style="{transform:item.transform}">
                            </div>
                            <div class="viewer-tool" v-on:mouseenter="endMoveFn">
                                <ul>
                                    <li v-on:click="resetFn"></li>
                                    <li v-on:click="bigerFn"></li>
                                    <li v-on:click="smallerFn"></li>
                                    <li v-on:click="turnLeftFn"></li>
                                    <li v-on:click="turnRightFn"></li>
                                    <li v-on:click="turnUpDownFn"></li>
                                    <li v-on:click="turnLeftRightFn"></li>
                                </ul>
                            </div>
                        </template>
                        <iframe v-else-if="item.isPDF" v-bind:src="item.filePath" :key="item.filePath"></iframe>
                        <div v-else class="cant-wrapper" :key="item.filePath">
                            <div class="cant-icon"></div>
                            <p class="cant-text">
                                抱歉，此文件暂不能预览。
                                <a :href="item.filePath" style="color:#f7822e">点击下载...</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="viewer-nav-wrapper" ref="nav">
                    <ul class="viewer-nav-list">
                        <li v-for="(item,$index) in viewerList" v-bind:class="{current: $index == currentNav}" v-on:click="moveFn($index)">
                            <span v-if="!item.isImage" class="file-type" v-text="item.fileType" v-bind:title="item.fileName"></span>
                            <img v-else v-bind:src="item.filePath" v-bind:title="item.fileName">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../viewer/viewer.css'
    export default {
        name: 'viewer',
        data() {
            return {
                show: false,
                currentNav: 0,
                transformObj: {
                    x: 1,
                    y: 1,
                    deg: 0
                },
                mousePos: {}
            }
        },
        props:{
            viewerList:{
                type: Array,
                required: true
            }
        },
        methods: {
            showFn() {
                this.$emit('open')
                this.show = true;
                document.querySelector("body").style.overflow = 'hidden';
                this.$nextTick(()=>{
                    document.body.appendChild(this.$refs.viewer)
                })
            },
            closeFn() {
                this.resetFn();
                this.currentNav = 0;
                document.querySelector("body").style.overflow = 'auto';
                this.show = false;
                this.$emit('closed')
            },
            marginInitFn(e,index){
                let imgBar = e.target.parentNode;
                let marginTop = (this.$refs.content.clientHeight - 40 - imgBar.clientHeight) / 2;
                marginTop = marginTop > 0 ? marginTop : 0;
                this.$set(this.viewerList[index],'marginTop',marginTop)
            },
            moveFn(index){
                this.resetFn();
                if(this.$refs.nav){
                    this.currentNav = index;
                    let defaultMargin = this.$refs.nav.clientWidth,
                        currentMargin = defaultMargin / 2 - 44 * index;
                    this.$refs.nav.querySelector('.viewer-nav-list').style.marginLeft = currentMargin + 'px';
                }
            },
            //图片操作
            resetFn() {
                this.transformObj.x = 1;
                this.transformObj.y = 1;
                this.transformObj.deg = 0;
                this.transformFn(this.transformObj)
            },
            bigerFn(){
                if (Math.abs(this.transformObj.x) > 3) return;
                if (this.transformObj.x > 0) {
                    this.transformObj.x += .1;
                } else {
                    this.transformObj.x -= .1;
                }
                if (this.transformObj.y > 0) {
                    this.transformObj.y += .1;
                } else {
                    this.transformObj.y -= .1;
                }

                this.transformFn(this.transformObj)
            },
            smallerFn(){
                if (Math.abs(this.transformObj.x) < 0.2) return;
                if (this.transformObj.x > 0) {
                    this.transformObj.x -= .1;
                } else {
                    this.transformObj.x += .1;
                }
                if (this.transformObj.y > 0) {
                    this.transformObj.y -= .1;
                } else {
                    this.transformObj.y += .1;
                }
                this.transformFn(this.transformObj)
            },
            turnRightFn() {
                this.transformObj.deg += 90;
                this.transformFn(this.transformObj)
            },
            turnLeftFn() {
                this.transformObj.deg -= 90;
                this.transformFn(this.transformObj)
            },
            turnUpDownFn() {
                this.transformObj.y = -this.transformObj.y;
                this.transformFn(this.transformObj)
            },
            turnLeftRightFn() {
                this.transformObj.x = -this.transformObj.x;
                this.transformFn(this.transformObj)
            },
            transformFn(transformObj) {
                let transform = 'scale(' + transformObj.x + ',' + transformObj.y + ')' + 'rotate(' + transformObj.deg + 'deg)';
                this.$set(this.viewerList[this.currentNav],'transform',transform)
            },
            //滚轮事件
            mouseWheelFn() {
                let e = window.event,
                    down = true;
                    down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;
                if (down) {
                    this.smallerFn();
                } else {
                    this.bigerFn()
                }
            },
            //拖拽功能
            startMoveFn(){
                this.mousePos = this.getMousePosFn();
                document.addEventListener('mousemove',this.listenFn)
            },
            listenFn(e){
                this.movingFn(e)
            },
            getMousePosFn() {
                let e = window.event;
                return {
                    x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
                };
            },
            getImgPosFn() {
                let bar = this.$refs.content.querySelector('.viewer-imgbar');
                return {
                    top: parseInt(window.getComputedStyle(bar,null)['top'].replace('px','')),
                    left: parseInt(window.getComputedStyle(bar,null)['left'].replace('px',''))
                }
            },
            movingFn(e) {
                e.preventDefault();
                let curMousePos = this.getMousePosFn(),
                    curImgPos = this.getImgPosFn(),
                    left = curImgPos.left + (curMousePos.x - this.mousePos.x),
                    top = curImgPos.top + (curMousePos.y - this.mousePos.y),
                    bar = this.$refs.content.querySelector('.viewer-imgbar');
                this.mousePos = curMousePos;
                bar.style.left = left + 'px';
                bar.style.top = top + 'px';
            },
            endMoveFn(){
                document.removeEventListener('mousemove',this.listenFn)
            }
        },
        mounted(){
            window.onresize = function() {
                if(!this.show) return;
                this.moveFn(this.currentNav);
                let imgBar = this.$refs.content.querySelector('img');   
                if(imgBar){
                    this.resetFn();
                    let marginTop = (this.$refs.content.clientHeight - 40 - imgBar.clientHeight) / 2;
                    marginTop = marginTop > 0 ? marginTop : 0;
                    this.$set(this.viewerList[this.currentNav],'marginTop',marginTop)
                }
            }.bind(this);
        }
    }
</script>
<style>
    .btn{
        cursor: pointer;
        white-space: nowrap;
        color: rgba(0,0,0,.8);
        border: none;
        background: #27ab8d;
        border-color: #27ab8d;
        border-radius: 3px;
        vertical-align: middle;
        font-size: 12px;
        font-family: 'microsoft yahei';
        height: 24px;
        line-height: 22px;
        padding: 0 1em;
        min-width: 24px;
        position: relative;
        border-width: 1px;
        border-style: solid;
        color: #fff;

    }
</style>

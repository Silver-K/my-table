<template>
    <div class="container" :style="{ height: `${height}px` }">
        <div class="thead">
            <div class="item" :style="column" v-for="(each, index) in header" :key="each.id || index">
                {{ each.label || each }}
            </div>
        </div>
        <div :class="{ xcolor, tbody: true }" @mousewheel="handleScroll">
            <div class="virtual-scroll" v-show="data.length > 5" @mouseleave="handleRelease">
                <div ref="scroller" class="inner-scroller" :style="{ height: `${(5 / data.length) * 0.8 * height}px`}" @mousedown="handlePress" @mouseup="handleRelease" @mousemove="handleMove"></div>
            </div>
            <div class="row" v-for="(each, index) in viewData" :key="each.id || index">
                <div class="col" :style="column" v-for="(item, cidx) in header" :key="item.id || cidx">
                    <slot :row="each" :name="item">
                         {{ each[item.label || item] }}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { debounce } from '@/utils/index.js'
    export default {
        name: '',
        props: {
            // 表格数据
            data: {
                type: Array,
                required: true
            },
            // 表头
            header: {
                type: Array,
                default: () => (
                    Array(this.data.length).fill(null).map((i, n) => n+1)
                )
            },
            // 隔行上色
            xcolor: {
                type: Boolean,
                default: false
            },
            // 列样式
            column: {
                type: String,
                default: 'flex: 1'
            },
            // 表格高度
            height: {
                type: Number,
                default: 300
            }
        },
        data () {
            return {
                start: 0,
                mousedown: false,
                my: 0,
                offY: 0
            }
        },
        computed: {
            viewData: {
                get() {
                    return this.data.filter((e, i) => (i >= this.start && i<= this.start + 4))
                }
            }
        },
        components: {

        },
        created () {

        },
        mounted () {

        },
        watch: {
            data: {
                deep: true,
                handler(nval) {
                    if (this.start + 5 > this.data.length) {
                        this.start = this.data.length - 5
                        this.start = this.start > 0 ? this.start : 0
                    }
                    this.$refs.scroller.style.top = `${(1 / nval.length) * 0.8 * this.height * this.start}px`
                }
            }
        },
        methods: {
            handleScroll(e) {
                const event = {
                    0: () => {
                        this.setView(1)
                    },
                    1: () => {
                        this.setView(-1)
                    }
                }
                debounce(event[Number(e.wheelDelta > 0)], 15)()
            },
            setView(y) {
                if (y > 0 && this.start + 5 >= this.data.length) return;
                if (y< 0 && this.start === 0) return;
                this.start += y
                this.$refs.scroller.style.top = `${(1 / this.data.length) * 0.8 * this.height * this.start}px`
            },
            handlePress(e) {
                this.mousedown = true
                // 滚动条盒子到页面顶部的距离
                this.my = e.pageY - e.offsetY - e.target.offsetTop
                this.offY = e.offsetY
            },
            handleMove(e) {
                if (!this.mousedown) return
                debounce(() => {
                    const top = e.pageY - this.my - this.offY
                    this.start = Math.ceil(top / ((1 / this.data.length) * 0.8 * this.height))
                    if (this.start < 0 ) {
                        this.start = 0
                    } else if (this.start + 5 > this.data.length) {
                        this.start = this.data.length - 5
                    }
                    this.$refs.scroller.style.top = `${ (1 / this.data.length) * 0.8 * this.height * this.start }px`
                }, 15)()
            },
            handleRelease() {
                this.mousedown = false
            }
        }
    }
</script>
<style scoped>
    .container {
        overflow: hidden;
        font-size: 18px;
    }
    .thead {
        display: flex;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        height: 20%;
        background-color: rgba(200, 200, 200, .2);
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
    .thead>.item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .tbody {
        overflow: hidden;
        position: relative;
        height: 80%;  
    }
    .tbody:hover .virtual-scroll {
        width: 5px;
    }
    .virtual-scroll {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 0;
        background-color: rgba(250, 250, 250, .1);
        transition: width .35s;
    }
    .virtual-scroll:hover {
        width: 15px !important;
    }
    .inner-scroller {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(150, 150, 150, .7);
        border-radius: 25px;
        transition: top .15s;
    }
    .row {
        display: flex;
        height: 20%;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
    .xcolor .row:nth-child(2n) {
        background-color: rgba(200, 234, 205, .5);
    }
    .row .col {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>
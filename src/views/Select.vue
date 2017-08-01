<template>
    <div style="padding:20px;">
        <v-select :list="list" v-model.number="code" :limit-length="4" value-key="code" option-key="name" @change="changeFn"></v-select>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[
                    {
                        code: 1,
                        name: '福利费'
                    },
                    {
                        code: 2,
                        name: '加班费'
                    },
                    {
                        code: 3,
                        name: '劳务费'
                    },
                    {
                        code: 4,
                        name: '车船费'
                    },
                    {
                        code: 5,
                        name: '过节费'
                    },
                    {
                        code: 6,
                        name: '水酒费'
                    },
                    {
                        code: 7,
                        name: '教材费'
                    },
                    {
                        code: 8,
                        name: '办公费'
                    },
                    {
                        code: 9,
                        name: '保护费'
                    },
                ],
                code: 9
            }
        },
        methods:{
            changeFn(item){
                console.log(item)
            }
        }
    }
</script>
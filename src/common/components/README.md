# vue 2.0 组件 使用文档
## select 组件
`<v-select :list="list" v-model.number="code" :limit-length="4" value-key="code" option-key="name" @change="changeFn"></v-select>`
### list: 下拉数据源
### v-model: 实例中绑定的值
### limitLength: 下拉最多显示多少项
### vauleKey: 下拉每一项绑定的值
### optionKey: 下拉展示的值
### change: 绑定值变化出发的事件，传出下拉项为第一个参数


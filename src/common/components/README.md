# vue 2.0 组件 使用文档
## select 组件

`<v-select :list="list" v-model.number="code" value-key="code" option-key="name" :limit-length="4"></v-select>`

### API of Select
`<v-viewer :viewer-list="viewerData"></v-viewer>`
`new Vue({
    data:{
        viewerData: [
            {
                fileName: "柯基犬.jpeg",
                filePath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501388665141&di=39690311e5f9a0c4cbe6f69a8bfa57af&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201510%2F27%2F20151027185454_wVz3i.jpeg",
                fileType:"JPEG"
            },
            {
                fileName:"download_SalaryCertificate201703241123414010.pdf",
                filePath:"https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf",
                fileType:"PDF"
            },
            {
                fileName: "柯基犬.jpg",
                filePath:"https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=f685709bf303738dde4a0b248b20d76c/77c6a7efce1b9d16b27e955af6deb48f8c54644b.jpg",
                fileType:"JPG"
            },
        ]
    }
})`

#### 属性

|属性名      | 类型  |默认值   |描述                |
|-----------|-------|---------|-------------------|
|list       |Array  |required |选项数据            |
|valueKey   |String |required |选项绑定的值         |
|optionKey  |String |required |选项中展示的文字内容  |
|disabled   |Boolean|false    |下拉是否可用         |
|limitLength|Number |Infinity |下拉最多显示多少项   |

#### 事件

|事件名 |参数                              |描述                                                                   |
|-------|---------------------------------|-----------------------------------------------------------------------|
|input  |value：当前选中的值，由vauleKey决定|选项发生改变时触发                                                       |
|change |item：当前选中的选项对象           |和input同时触发，不同的是 change 始终返回的是选项对象，不受 valueKey 的影响 |

## viewer 组件

### API of Viewer

#### 属性

|属性名      | 类型  |默认值   |描述                |
|-----------|-------|---------|-------------------|
|viewerList |Array  |required |文件数组            |

### 数组字段

|字段名      | 类型  |默认值   |描述           |
|-----------|-------|---------|--------------|
|fileName   |String |''       |文件名称       |
|fileType   |String |required |文件类型       |
|filePath   |String |required |可访问文件路径  |




# vue 2.0 组件 使用文档
## select 组件

`<v-select :list="list" v-model.number="code" value-key="code" option-key="name" :limit-length="4"></v-select>`

### API of Select

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
|fileNme    |String |''       |文件名称       |
|fileType   |String |required |文件类型       |
|filePath   |String |required |可访问文件路径  |




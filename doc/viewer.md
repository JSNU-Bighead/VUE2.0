## viewer 组件

`<v-viewer :viewer-list="viewerData"></v-viewer>`

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

### 方法

|方法名      |描述           |
|-----------|--------------|
|showFn     |查看文件       |
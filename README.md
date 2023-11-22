# situation-awareness

## 项目启动
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 开发规范

1. 注释尽量详尽，至少保证每个函数或method有单行作用注释
2. 单个组件的template代码、script代码、style代码皆放于该组件的vue文件中即可

### 关于接口调用

1. 前后端分离，所有API使用Restful规范，另：Get\Delete请求使用query传参、Put\Post请求使用json格式的body传参
2. API回包皆为json格式，都包含：`code`字段作为返回码，为0代表成功；`msg`字段作为错误时的错误原因，可以直接向用户展示
3. `.vue`文件中不要出现任何URL或axios相关代码，前端的**所有**API调用代码和URL归到`src/api`目录下，各模块请**分别创建**自己的js文件，每个API创建一个调用函数，返回一个promise
4. 除文件上传下载以外的所有API，统一使用`src/api/basic.js`提供的axios实例来作为调用器，该调用器已提供超时控制、未知错误处理等

API调用示例：
```js
// 调用函数： src/api/topo.js

import {axios} from "@/api/basic";
export const NetTopologyURL = "/cmdb/Jtopo"
// 更改拓扑图API
export function changeNetTopology(topology, id = "") {
    return axios.post(NetTopologyURL, {'topology_json': topology, "topology_id": id})
}

// --------------------------------------

// 使用函数： src/views/NetworkTopology.vue

import {changeNetTopology} from "@/api/topo";
// 保存网络拓扑图（一个method）
saveNetTopology(cb = ()=>{}) {
    const loading = this.$loading({lock: true, fullscreen: true})
    let data = this.editor.getSavedTopology()
    changeNetTopology(data, this.id).then(response => {
        this.$message.success("保存成功")
        cb() // 回调
    }).catch(response => {
        this.$message.error("保存失败："+response.data.msg)
    }).finally(loading.close)
}
```

### 关于组件

1. 项目使用ElementUI作为组件库，已全局注册，所有组件可以不import直接使用
2. 可能复用的组件请全部收归到`src/components`目录下相应类别的目录中。单独一提：所有弹窗内表单，全部收归到`src/components/form`目录下，初始数据参数命名为`data`，在成功提交表单时抛出`success`事件

src目录结构：

```
├─api // 所有API调用
├─assets // 所有静态资源
├─components // 所有可复用组件
│  ├─common  // 公用组件
│  ├─content // 页面结构组件，例如Bar、Nav
│  ├─form    // 弹窗内表单组件
│ 
├─router // vue-router
├─static // 拓扑图所用历史遗留目录，请勿改动！
├─store  // Vuex
└─views  // 所有页面
    ├─asset // 资产相关页面
```

### 关于版本管理

1. 主干开发
2. 每个commit尽量只包含对一个vue文件的更改
3. 更改已有vue文件script前请与该模块的原负责人事先沟通，保证无冲突或兼容性问题
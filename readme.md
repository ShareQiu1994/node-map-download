# Node.js node-map-download

> 源码 github 地址在此，记得点星：
> https://github.com/ShareQiu1994/node-map-download

> 本库参考了[nodemap_spider](https://github.com/brandonxiang/nodemap_spider)，这个库的灵感来自 nodemap_spider，这个库它同样 nodejs 实现，本库基于这个库的基础上做了一些修改。感谢 brandonxiang 大佬。

## 用法

1.硬编码，修改 index.js 文件内容。

2.修改配置 src 目录下 config.js 的瓦片地址。

3.运行 node index.js。

```
procesLatlng(50.8475729536539,-13.7109375,26.4312280645064,126.73828125,3,"tianditu_cia","tianditu_cia","png")
procesLatlng(85.05112878, -180, -85.05112878, 180, 3, "tianditu_img","tianditu_img","jpg");

```

- 参数一： 西北角维度
- 参数二： 西北角经度
- 参数三： 东南角维度
- 参数四： 东南角经度
- 参数五： 级别
- 参数六： 输出文件名
- 参数七： 地图类型
- 参数七： 文件后缀

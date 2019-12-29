const config = {
  URL: {
    default: "http://61.144.226.124:9001/map/GISDATA/WORKNET/{z}/{y}/{x}.png",
    google:
      "http://mt2.google.cn/vt/lyrs=s&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}",
    gaode:
      "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    tianditu_img:
      "http://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=62147d72236f51ff10c1926f1f0fd4b7",
    tianditu_cia:
      "http://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=62147d72236f51ff10c1926f1f0fd4b7"
  }
};

module.exports = config;

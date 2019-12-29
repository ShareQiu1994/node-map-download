const { procesLatlng, processTilenum } = require("./src/node-spider");

// procesLatlng(
//   50.8475729536539,
//   -13.7109375,
//   26.4312280645064,
//   126.73828125,
//   3,
//   "tianditu_cia",
//   "tianditu_cia",
//   "png"
// );

procesLatlng(
  85.05112878,
  -180,
  -85.05112878,
  180,
  3,
  "tianditu_img",
  "tianditu_img",
  "jpg"
);

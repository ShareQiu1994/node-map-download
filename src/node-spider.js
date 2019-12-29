const fs = require("fs");
const path = require("path");
const request = require("request");
const headers = require("./utils/headers");
const { URL } = require("./config/config");

/**
 * Get the map by latitude and longitude of four corners
 *
 * @param {Number} north Latitude for Northwest
 * @param {Number} west Longitude for Northwest
 * @param {Number} south Latitude for Sourtheast
 * @param {Number} east Longitude for Sourtheast
 * @param {Number} zoom Zoom
 * @param {String} output output filename
 * @param {String} maptype type
 */
const procesLatlng = function(
  north,
  west,
  south,
  east,
  zoom,
  output,
  maptype,
  suffix
) {
  output = output || "mosaic";
  maptype = maptype || "default";
  var left_top = latlng2tilenum(north, west, zoom);
  var right_bottom = latlng2tilenum(south, east, zoom);
  processTilenum(
    left_top[0],
    right_bottom[0],
    left_top[1],
    right_bottom[1],
    zoom,
    output,
    maptype,
    suffix
  );
};

/**
 * Get the map by x-axis and y axis of four corners
 *
 * @param {Number} left x-axis for Northwest
 * @param {Number} right y-axis for Northwest
 * @param {Number} top x-axis for Sourtheast
 * @param {Number} bottom y-axis for Northeast
 * @param {Number} zoom Zoom
 * @param {String} output output filename
 * @param {String} maptype type
 */
const processTilenum = function(
  left,
  right,
  top,
  bottom,
  zoom,
  output,
  maptype,
  suffix
) {
  output = output || "mosaic";
  maptype = maptype || "default";
  checkout(left, right, top, bottom, zoom, output, maptype, suffix);
};

const _download = function(x, y, z, filename, maptype) {
  var url = URL[maptype].format({ x: x, y: y, z: z, s: random(1, 4) });
  var pathname = path.dirname(filename);
  mkdirsSync(pathname);
  if (!fs.existsSync(filename)) {
    request(
      {
        url: url,
        headers: headers,
        encoding: "binary"
      },
      (err, response) => {
        if (err) {
          return err;
        }
        fs.writeFileSync(filename, response.body, "binary");
      }
    );
  }
};

const latlng2tilenum = function(lat_deg, lng_deg, zoom) {
  var n = Math.pow(2, zoom);
  var xtile = ((lng_deg + 180) / 360) * n;
  var lat_rad = (lat_deg / 180) * Math.PI;
  var ytile =
    ((1 - Math.log(Math.tan(lat_rad) + 1 / Math.cos(lat_rad)) / Math.PI) / 2) *
    n;
  // 当范围为全球瓦片时;
  if (xtile < 0) xtile = 0;
  if (xtile >= 1 << zoom) xtile = (1 << zoom) - 1;
  if (ytile < 0) ytile = 0;
  if (ytile >= 1 << zoom) ytile = (1 << zoom) - 1;
  return [Math.floor(xtile), Math.floor(ytile)];
};

const random = function(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const checkout = function(
  left,
  right,
  top,
  bottom,
  z,
  filename,
  maptype,
  suffix
) {
  maptype = maptype || "default";
  var tasks = [];
  for (let x = left; x < right + 1; x++) {
    for (let y = top; y < bottom + 1; y++) {
      tasks.push(checkoutSingle(x, y, z, filename, maptype, suffix));
    }
  }
};

const checkoutSingle = function(x, y, z, filename, maptype, suffix) {
  var pathname = `tiles/{filename}/{z}/{x}/{y}.${suffix}`.format({
    x: x,
    y: y,
    z: z,
    filename: filename
  });
  var abspath = path.resolve(pathname);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(abspath)) {
      _download(x, y, z, pathname, maptype);
    } else {
      fs.stat(abspath, function(err, stats) {
        if (err) {
          _download(x, y, z, pathname, maptype);
          reject(err);
          return;
        }
        if (!stats.size) {
          fs.unlinkSync(path);
          _download(x, y, z, pathname, maptype);
        }
      });
    }
    resolve();
  });
};

String.prototype.format = function(json) {
  var temp = this;
  for (var key in json) {
    temp = temp.replace("{" + key + "}", json[key]);
  }
  return temp;
};

Number.prototype.toRad = function() {
  return (this * Math.PI) / 180;
};
const mkdirsSync = function(dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp;
    dirpath.split("/").forEach(function(dirname) {
      if (pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      } else {
        pathtmp = dirname;
      }
      if (!fs.existsSync(pathtmp)) {
        if (!fs.mkdirSync(pathtmp, mode)) {
          return false;
        }
      }
    });
  }
  return true;
};

module.exports = {
  procesLatlng,
  processTilenum
};

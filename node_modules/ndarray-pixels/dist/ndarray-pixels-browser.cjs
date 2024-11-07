var ndarray = require('ndarray');
var ops = require('ndarray-ops');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ndarray__default = /*#__PURE__*/_interopDefaultLegacy(ndarray);
var ops__default = /*#__PURE__*/_interopDefaultLegacy(ops);

function getPixelsInternal(buffer, mimeType) {
  // Warn for Data URIs, URLs, and file paths. Support removed in v3.
  if (!(buffer instanceof Uint8Array)) {
    throw new Error('[ndarray-pixels] Input must be Uint8Array or Buffer.');
  }
  var blob = new Blob([buffer], {
    type: mimeType
  });
  var path = URL.createObjectURL(blob);
  // Decode image with Canvas API.
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      URL.revokeObjectURL(path);
      var canvas = new OffscreenCanvas(img.width, img.height);
      var context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      var pixels = context.getImageData(0, 0, img.width, img.height);
      resolve(ndarray__default["default"](new Uint8Array(pixels.data), [img.width, img.height, 4], [4, 4 * img.width, 1], 0));
    };
    img.onerror = function (err) {
      URL.revokeObjectURL(path);
      reject(err);
    };
    img.src = path;
  });
}

function putPixelData(array, data, frame) {
  if (frame === void 0) {
    frame = -1;
  }
  if (array.shape.length === 4) {
    return putPixelData(array.pick(frame), data, 0);
  } else if (array.shape.length === 3) {
    if (array.shape[2] === 3) {
      ops__default["default"].assign(ndarray__default["default"](data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), array);
      ops__default["default"].assigns(ndarray__default["default"](data, [array.shape[0] * array.shape[1]], [4], 3), 255);
    } else if (array.shape[2] === 4) {
      ops__default["default"].assign(ndarray__default["default"](data, [array.shape[0], array.shape[1], 4], [4, array.shape[0] * 4, 1]), array);
    } else if (array.shape[2] === 1) {
      ops__default["default"].assign(ndarray__default["default"](data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), ndarray__default["default"](array.data, [array.shape[0], array.shape[1], 3], [array.stride[0], array.stride[1], 0], array.offset));
      ops__default["default"].assigns(ndarray__default["default"](data, [array.shape[0] * array.shape[1]], [4], 3), 255);
    } else {
      throw new Error('[ndarray-pixels] Incompatible array shape.');
    }
  } else if (array.shape.length === 2) {
    ops__default["default"].assign(ndarray__default["default"](data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), ndarray__default["default"](array.data, [array.shape[0], array.shape[1], 3], [array.stride[0], array.stride[1], 0], array.offset));
    ops__default["default"].assigns(ndarray__default["default"](data, [array.shape[0] * array.shape[1]], [4], 3), 255);
  } else {
    throw new Error('[ndarray-pixels] Incompatible array shape.');
  }
  return data;
}

/** Creates readable stream from given OffscreenCanvas and options. */
var streamCanvas = function streamCanvas(canvas, options) {
  try {
    return Promise.resolve(canvas.convertToBlob(options)).then(function (blob) {
      return Promise.resolve(blob.arrayBuffer()).then(function (ab) {
        return new Uint8Array(ab);
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var savePixelsInternal = function savePixelsInternal(pixels, options) {
  try {
    // Create OffscreenCanvas and write pixel data.
    var canvas = new OffscreenCanvas(pixels.shape[0], pixels.shape[1]);
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    putPixelData(pixels, imageData.data);
    context.putImageData(imageData, 0, 0);
    return streamCanvas(canvas, options);
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Decodes image data to an `ndarray`.
 *
 * MIME type is optional when given a path or URL, and required when given a Uint8Array.
 *
 * Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
 * the necessary support in Canvas 2D.
 *
 * @param data
 * @param mimeType `image/jpeg`, `image/png`, etc.
 * @returns
 */
/**
 * Encodes an `ndarray` as image data in the given format.
 *
 * If the source `ndarray` was constructed manually with default stride, use
 * `ndarray.transpose(1, 0)` to reshape it and ensure an identical result from getPixels(). For an
 * ndarray created by getPixels(), this isn't necessary.
 *
 * Accepts `image/png` or `image/jpeg` in Node.js, and additional formats on browsers with
 * the necessary support in Canvas 2D.
 *
 * @param pixels ndarray of shape W x H x 4.
 * @param typeOrOptions object with encoding options or just the type
 * @param typeOrOptions.type target format (`image/jpeg`, `image/png`, `image/webp`, etc.)
 * @param typeOrOptions.quality quality as a number from 0 to 1, inclusive
 * @returns
 */
var savePixels = function savePixels(pixels, typeOrOptions) {
  try {
    var options;
    if (typeof typeOrOptions === 'string') {
      options = {
        type: typeOrOptions,
        quality: undefined
      };
    } else {
      options = {
        type: typeOrOptions.type,
        quality: typeOrOptions.quality
      };
    }
    return Promise.resolve(savePixelsInternal(pixels, options));
  } catch (e) {
    return Promise.reject(e);
  }
};
var getPixels = function getPixels(data, mimeType) {
  try {
    return Promise.resolve(getPixelsInternal(data, mimeType));
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.getPixels = getPixels;
exports.savePixels = savePixels;
//# sourceMappingURL=ndarray-pixels-browser.cjs.map

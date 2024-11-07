import ndarray from 'ndarray';
import ops from 'ndarray-ops';

function getPixelsInternal(buffer, mimeType) {
  // Warn for Data URIs, URLs, and file paths. Support removed in v3.
  if (!(buffer instanceof Uint8Array)) {
    throw new Error('[ndarray-pixels] Input must be Uint8Array or Buffer.');
  }
  const blob = new Blob([buffer], {
    type: mimeType
  });
  const path = URL.createObjectURL(blob);
  // Decode image with Canvas API.
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      URL.revokeObjectURL(path);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      const pixels = context.getImageData(0, 0, img.width, img.height);
      resolve(ndarray(new Uint8Array(pixels.data), [img.width, img.height, 4], [4, 4 * img.width, 1], 0));
    };
    img.onerror = err => {
      URL.revokeObjectURL(path);
      reject(err);
    };
    img.src = path;
  });
}

function putPixelData(array, data, frame = -1) {
  if (array.shape.length === 4) {
    return putPixelData(array.pick(frame), data, 0);
  } else if (array.shape.length === 3) {
    if (array.shape[2] === 3) {
      ops.assign(ndarray(data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), array);
      ops.assigns(ndarray(data, [array.shape[0] * array.shape[1]], [4], 3), 255);
    } else if (array.shape[2] === 4) {
      ops.assign(ndarray(data, [array.shape[0], array.shape[1], 4], [4, array.shape[0] * 4, 1]), array);
    } else if (array.shape[2] === 1) {
      ops.assign(ndarray(data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), ndarray(array.data, [array.shape[0], array.shape[1], 3], [array.stride[0], array.stride[1], 0], array.offset));
      ops.assigns(ndarray(data, [array.shape[0] * array.shape[1]], [4], 3), 255);
    } else {
      throw new Error('[ndarray-pixels] Incompatible array shape.');
    }
  } else if (array.shape.length === 2) {
    ops.assign(ndarray(data, [array.shape[0], array.shape[1], 3], [4, 4 * array.shape[0], 1]), ndarray(array.data, [array.shape[0], array.shape[1], 3], [array.stride[0], array.stride[1], 0], array.offset));
    ops.assigns(ndarray(data, [array.shape[0] * array.shape[1]], [4], 3), 255);
  } else {
    throw new Error('[ndarray-pixels] Incompatible array shape.');
  }
  return data;
}

async function savePixelsInternal(pixels, options) {
  // Create OffscreenCanvas and write pixel data.
  const canvas = new OffscreenCanvas(pixels.shape[0], pixels.shape[1]);
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  putPixelData(pixels, imageData.data);
  context.putImageData(imageData, 0, 0);
  return streamCanvas(canvas, options);
}
/** Creates readable stream from given OffscreenCanvas and options. */
async function streamCanvas(canvas, options) {
  const blob = await canvas.convertToBlob(options);
  const ab = await blob.arrayBuffer();
  return new Uint8Array(ab);
}

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
async function getPixels(data, mimeType) {
  return getPixelsInternal(data, mimeType);
}
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
async function savePixels(pixels, typeOrOptions) {
  let options;
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
  return savePixelsInternal(pixels, options);
}

export { getPixels, savePixels };
//# sourceMappingURL=ndarray-pixels-browser.modern.js.map

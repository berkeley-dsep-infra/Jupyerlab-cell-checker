import ndarray from 'ndarray';
import sharp from 'sharp';
import ops from 'ndarray-ops';

async function getPixelsInternal(buffer, _mimeType) {
  // Warn for Data URIs, URLs, and file paths. Support removed in v3.
  if (!(buffer instanceof Uint8Array)) {
    throw new Error('[ndarray-pixels] Input must be Uint8Array or Buffer.');
  }
  const {
    data,
    info
  } = await sharp(buffer).ensureAlpha().raw().toBuffer({
    resolveWithObject: true
  });
  return ndarray(new Uint8Array(data), [info.width, info.height, 4], [4, 4 * info.width | 0, 1], 0);
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
  const [width, height, channels] = pixels.shape;
  const data = putPixelData(pixels, new Uint8Array(width * height * channels));
  const {
    type,
    quality
  } = options;
  const format = (type != null ? type : 'image/png').replace('image/', '');
  const sharpOptions = {
    // Applicable to most formats.
    // Where used, an integer between 1 and 100
    quality: typeof quality === 'number' ? Math.round(1 + quality * 99) : undefined,
    // applicable to some formats, notably webp, avif
    lossless: quality === 1,
    // if this flag is true or unset, sharp interprets the `quality` flag to mean
    // that we want lossy color quantization.
    palette: false
  };
  return sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  }).toFormat(format, sharpOptions).toBuffer();
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
  return getPixelsInternal(data);
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
//# sourceMappingURL=ndarray-pixels-node.modern.js.map

import { NdArray } from 'ndarray';
import type { ImageEncodeOptions } from './common';
export declare function savePixelsInternal(pixels: NdArray<Uint8Array | Uint8ClampedArray>, options: ImageEncodeOptions): Promise<Uint8Array>;

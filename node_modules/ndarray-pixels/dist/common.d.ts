import { NdArray } from 'ndarray';
export interface ImageEncodeOptions {
    type?: string;
    quality?: number;
}
export declare function putPixelData(array: NdArray<Uint8Array | Uint8ClampedArray>, data: Uint8Array | Uint8ClampedArray, frame?: number): Uint8Array | Uint8ClampedArray;

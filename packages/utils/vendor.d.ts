/**
 * Ambient declarations for the two capture-examples dependencies that ship no
 * types and have no @types package. Narrow on purpose: these describe only the
 * surface capture-examples.ts actually touches, so an upgrade that changes
 * something we use fails the typecheck instead of silently passing as `any`.
 */

declare module 'pngjs' {
  export interface PNGImage {
    readonly data: Uint8Array
    readonly width: number
    readonly height: number
  }
  export const PNG: {
    sync: { read(buffer: Buffer): PNGImage }
  }
}

declare module 'gifenc' {
  export interface GifEncoder {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options: { palette: number[][]; delay: number },
    ): void
    finish(): void
    bytes(): Uint8Array
  }
  const gifenc: {
    GIFEncoder(): GifEncoder
    quantize(data: Uint8Array, maxColors: number): number[][]
    applyPalette(data: Uint8Array, palette: number[][]): Uint8Array
  }
  export default gifenc
}

/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} arr
* @param {number} font_weight
* @param {number} bold_weight
* @returns {Uint8Array}
*/
export function add_css(arr: Uint8Array, font_weight: number, bold_weight: number): Uint8Array;
/**
* @param {Uint8Array} arr
* @param {boolean} bold_fullstop
* @returns {Uint8Array}
*/
export function convert(arr: Uint8Array, bold_fullstop: boolean): Uint8Array;
/**
* @param {Uint8Array} arr
* @returns {Uint8Array}
*/
export function alter_identifier(arr: Uint8Array): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add_css: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly convert: (a: number, b: number, c: number, d: number) => void;
  readonly alter_identifier: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

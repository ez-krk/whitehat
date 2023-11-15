/// <reference types="node" />
export interface ivkEkM {
    iv: Uint8Array;
    kE: Uint8Array;
    kM: Uint8Array;
}
export declare class Ed25519Ecies {
    static AESCBCEncrypt: (message: Uint8Array, kE: Uint8Array, iV: Uint8Array) => Uint8Array;
    static AESCBCDecrypt: (message: Uint8Array, kE: Uint8Array, iV: Uint8Array) => Uint8Array;
    static sharedSecretFromEd25519Keys: (secretKey: Uint8Array, publicKey: Uint8Array) => Uint8Array;
    static ivkEkMFromEd25519Keys: (secretKey: Uint8Array, publicKey: Uint8Array) => Promise<ivkEkM>;
    static encrypt: (message: Uint8Array, to: Uint8Array, from?: Uint8Array) => Promise<Buffer>;
    static decrypt: (message: Uint8Array, to: Uint8Array) => Promise<Uint8Array>;
}

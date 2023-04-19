/// <reference types="node" />
import { Compression, IUploadOptions } from "./types";
export declare type KeySize = 128 | 196 | 256;
export declare type TagSize = 96 | 104 | 112 | 120 | 128;
/**
 * The encryption-specific options used for an upload
 */
export interface IEncryptionOptions {
    /**
     * The encryption algorithm. At this time, only aes is supported.
     */
    algorithm: 'aes';
    /**
     * The encryption mode to use. At this time, only gcm is supported so only change this if you know what you're doing!
     */
    encryptionMode: 'ctr' | 'cbc' | 'gcm';
    /**
     * Key size. 256 is recommended.
     */
    keySize: number;
    /**
     * Tag size. 128 is recommended.
     */
    tagSize: number;
    /**
     * Number of iterations. 100000 is recommended.
     */
    iterations: number;
    /**
     * The compression mode to use.
     */
    compression?: Compression;
    /**
     * The password/key to use for the upload. Will be randomly generated if not set.
     */
    key?: Buffer;
}
/**
 * A fluent builder to help configure encryption options.
 */
export declare class EncryptionBuilder {
    private _options;
    /**
     *
     */
    constructor();
    setKeySize(keySize: KeySize): EncryptionBuilder;
    setTagSize(tagSize: TagSize): EncryptionBuilder;
    setIterations(iterations: number): EncryptionBuilder;
    enableCompression(enable?: boolean): EncryptionBuilder;
    useKey(keyString: string): EncryptionBuilder;
    useKey(keyBytes: Buffer): EncryptionBuilder;
    private getDefaults;
    buildOptions: () => IEncryptionOptions;
}
export declare function encryptMessageBuffer(messageBytes: Buffer, encryptionOptions: IEncryptionOptions, uploadOptions: IUploadOptions): Promise<{
    data: any[];
    cipherText: Buffer;
}>;

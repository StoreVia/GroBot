import { IUploadOptions, IUploadResult } from "./types";
import { IEncryptionOptions } from "./encryption";
/**
 * A simple client class to encapsulate uploading pastes to a PrivateBin server
 */
export declare class PrivateBinClient {
    private getDefaultOptions;
    private getMessageBytes;
    private _baseUrl;
    /**
     *  Creates a new PrivateBin client for the given server URL
     *
     * @param baseUrl: The base URL of the server. This should be the root address like `https://privatebin.net`
     */
    constructor(baseUrl: string);
    /**
     * Uploads given content as a paste to the PrivateBin server.
     *
     * @param content The paste contents to upload
     * @param options The upload options to use
     * @param encryptOpts Additional encryption options for your paste
     */
    uploadContent: (content: string, options: IUploadOptions, encryptOpts?: IEncryptionOptions) => Promise<IUploadResult>;
    private postPasteContent;
    private getRequestConfig;
}

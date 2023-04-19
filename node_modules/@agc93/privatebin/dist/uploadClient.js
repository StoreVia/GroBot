"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateBinClient = void 0;
const encryption_1 = require("./encryption");
const pako_1 = __importDefault(require("pako"));
const axios_1 = __importDefault(require("axios"));
const bs58_1 = require("bs58");
/**
 * A simple client class to encapsulate uploading pastes to a PrivateBin server
 */
class PrivateBinClient {
    /**
     *  Creates a new PrivateBin client for the given server URL
     *
     * @param baseUrl: The base URL of the server. This should be the root address like `https://privatebin.net`
     */
    constructor(baseUrl) {
        this.getMessageBytes = (data, compression) => {
            const buffer = Buffer.from(JSON.stringify({ paste: data }), 'utf8');
            if (compression === 'zlib') {
                return Buffer.from(pako_1.default.deflateRaw(new Uint8Array(buffer)));
            }
            else {
                return buffer;
            }
        };
        /**
         * Uploads given content as a paste to the PrivateBin server.
         *
         * @param content The paste contents to upload
         * @param options The upload options to use
         * @param encryptOpts Additional encryption options for your paste
         */
        this.uploadContent = async (content, options, encryptOpts) => {
            var opts = { ...this.getDefaultOptions(), ...options };
            var encryptionOpts = encryptOpts !== null && encryptOpts !== void 0 ? encryptOpts : new encryption_1.EncryptionBuilder().enableCompression(true).buildOptions();
            var messageBuffer = this.getMessageBytes(content, encryptionOpts.compression);
            var encryptedData = await (0, encryption_1.encryptMessageBuffer)(messageBuffer, encryptionOpts, opts);
            var resp = await this.postPasteContent(encryptedData.data, encryptedData.cipherText, opts);
            if (resp.status == 201 || resp.status == 200) {
                return {
                    response: resp.data,
                    success: resp.data.status == 0,
                    urlKey: (0, bs58_1.encode)(encryptionOpts.key),
                    url: `${this._baseUrl}${resp.data.url}`
                };
            }
            throw new Error("Upload failed!");
        };
        this.postPasteContent = async (requestData, cipherText, options) => {
            var requestBody = {
                v: 2,
                ct: cipherText.toString('base64'),
                adata: requestData,
                meta: {
                    expire: options.expiry
                }
            };
            var resp = await axios_1.default.post("/", requestBody, this.getRequestConfig());
            return resp;
        };
        this.getRequestConfig = () => {
            return {
                baseURL: this._baseUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'JSONHttpRequest' // required by privatebin. yikes that casing.
                }
            };
        };
        baseUrl = baseUrl.startsWith('https://') ? baseUrl : `https://${baseUrl}`;
        this._baseUrl = baseUrl.replace(/\/+$/, ""); // remove any trailing slashes
    }
    getDefaultOptions() {
        return {
            expiry: '1week',
            openDiscussion: false,
            burnAfterReading: false,
            uploadFormat: 'markdown'
        };
    }
}
exports.PrivateBinClient = PrivateBinClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VwbG9hZENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw2Q0FBMkY7QUFDM0YsZ0RBQXdCO0FBQ3hCLGtEQUFrRDtBQUNsRCwrQkFBOEI7QUFFOUI7O0dBRUc7QUFDSCxNQUFhLGdCQUFnQjtJQW9CekI7Ozs7T0FJRztJQUNILFlBQVksT0FBZTtRQWZuQixvQkFBZSxHQUFHLENBQUMsSUFBWSxFQUFFLFdBQXdCLEVBQVUsRUFBRTtZQUN6RSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRSxJQUFJLFdBQVcsS0FBSyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvRDtpQkFBTTtnQkFDSCxPQUFPLE1BQU0sQ0FBQzthQUNqQjtRQUNMLENBQUMsQ0FBQTtRQWFEOzs7Ozs7V0FNRztRQUNILGtCQUFhLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxPQUF1QixFQUFFLFdBQWdDLEVBQTBCLEVBQUU7WUFDekgsSUFBSSxJQUFJLEdBQW1CLEVBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBQyxDQUFDO1lBQ3JFLElBQUksY0FBYyxHQUFHLFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLElBQUksOEJBQWlCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNuRyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUUsSUFBSSxhQUFhLEdBQUcsTUFBTSxJQUFBLGlDQUFvQixFQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEYsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNGLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7Z0JBQzFDLE9BQU87b0JBQ0gsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDOUIsTUFBTSxFQUFFLElBQUEsYUFBTSxFQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQ2xDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7aUJBQzFDLENBQUE7YUFDSjtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUE7UUFFTyxxQkFBZ0IsR0FBRyxLQUFLLEVBQUUsV0FBa0IsRUFBRSxVQUFrQixFQUFFLE9BQXVCLEVBQUUsRUFBRTtZQUNqRyxJQUFJLFdBQVcsR0FBRztnQkFDZCxDQUFDLEVBQUUsQ0FBQztnQkFDSixFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUU7b0JBQ0YsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2lCQUN6QjthQUNKLENBQUM7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQWtCLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtZQUN2RixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFTyxxQkFBZ0IsR0FBRyxHQUF1QixFQUFFO1lBQ2hELE9BQU87Z0JBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsNkNBQTZDO2lCQUN0RjthQUNKLENBQUE7UUFDTCxDQUFDLENBQUE7UUFqREcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxPQUFPLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsOEJBQThCO0lBQy9FLENBQUM7SUEzQk8saUJBQWlCO1FBQ3JCLE9BQU87WUFDSCxNQUFNLEVBQUUsT0FBTztZQUNmLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsWUFBWSxFQUFFLFVBQVU7U0FDM0IsQ0FBQztJQUNOLENBQUM7Q0FzRUo7QUE5RUQsNENBOEVDIn0=
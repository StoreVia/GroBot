"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMessageBuffer = exports.EncryptionBuilder = void 0;
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
const pbkdf2 = (0, util_1.promisify)(crypto_1.default.pbkdf2);
/**
 * A fluent builder to help configure encryption options.
 */
class EncryptionBuilder {
    /**
     *
     */
    constructor() {
        /* usePassword = (password: string): EncryptionBuilder => {
            this._options.password = () => password;
            return this;
        } */
        this.getDefaults = () => {
            return {
                algorithm: 'aes',
                encryptionMode: 'gcm',
                keySize: 256,
                tagSize: 128,
                iterations: 100000,
                compression: 'none',
                key: crypto_1.default.randomBytes(32)
            };
        };
        this.buildOptions = () => {
            var defaults = this.getDefaults();
            return { ...defaults, ...this._options };
        };
        this._options = {};
    }
    setKeySize(keySize) {
        this._options.keySize = keySize;
        return this;
    }
    setTagSize(tagSize) {
        this._options.tagSize = tagSize;
        return this;
    }
    setIterations(iterations) {
        this._options.iterations = iterations;
        return this;
    }
    enableCompression(enable = true) {
        this._options.compression = enable ? 'zlib' : 'none';
        return this;
    }
    useKey(key) {
        if (typeof (key) === 'string') {
            this._options.key = Buffer.from(key, 'utf8');
        }
        else {
            this._options.key = key;
        }
        return this;
    }
}
exports.EncryptionBuilder = EncryptionBuilder;
async function encryptMessageBuffer(messageBytes, encryptionOptions, uploadOptions) {
    let iv = crypto_1.default.randomBytes(16);
    let salt = crypto_1.default.randomBytes(8);
    // this should use a key on IEncryptionOptions
    // let password = crypto.randomBytes(32);
    var cryptedPassword = await generateKey(encryptionOptions.key, salt, encryptionOptions);
    var crypt = { iv, salt, key: cryptedPassword };
    var algorithm = `aes-${encryptionOptions.keySize}-${encryptionOptions.encryptionMode}`; // even though it might not actually be GCM
    var cipher = crypto_1.default.createCipheriv(algorithm, cryptedPassword, iv, { authTagLength: 16 });
    // var cipher = crypto.createCipheriv(algorithm, cryptedPassword, iv);
    var data = getData(crypt, encryptionOptions, uploadOptions);
    cipher.setAAD(Buffer.from(JSON.stringify(data), 'utf8'));
    var cipherText = Buffer.concat([cipher.update(messageBytes), cipher.final(), cipher.getAuthTag()]);
    return { cipherText, data };
}
exports.encryptMessageBuffer = encryptMessageBuffer;
async function generateKey(password, salt, options) {
    var cryptResult = await pbkdf2(password !== null && password !== void 0 ? password : crypto_1.default.randomBytes(32), salt, options.iterations, password.length, 'sha256');
    // var cryptResult = crypto.pbkdf2Sync(password, salt, options.iterations, options.keySize / 8, 'sha256');
    return cryptResult;
}
function getData(params, opts, request) {
    const adata = [];
    adata.push([params.iv.toString('base64'), params.salt.toString('base64'), opts.iterations, opts.keySize, opts.tagSize, 'aes', opts.encryptionMode, opts.compression]);
    adata.push(request.uploadFormat);
    adata.push(request.openDiscussion ? 1 : 0);
    adata.push(request.burnAfterReading ? 1 : 0);
    return adata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmNyeXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLG9EQUE0QjtBQUM1QiwrQkFBaUM7QUFNakMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBUyxFQUFDLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFzQ3hDOztHQUVHO0FBQ0gsTUFBYSxpQkFBaUI7SUFFMUI7O09BRUc7SUFDSDtRQW1DQTs7O1lBR0k7UUFFSSxnQkFBVyxHQUFHLEdBQXVCLEVBQUU7WUFDM0MsT0FBTztnQkFDSCxTQUFTLEVBQUUsS0FBSztnQkFDaEIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsR0FBRyxFQUFFLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQzthQUM5QixDQUFDO1FBQ04sQ0FBQyxDQUFBO1FBRUQsaUJBQVksR0FBRyxHQUF1QixFQUFFO1lBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEVBQUMsR0FBRyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBdERHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBd0IsQ0FBQztJQUM3QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQWdCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFD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QUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0SyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyJ9
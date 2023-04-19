"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasteUrl = void 0;
/**
 * Convenience method to get a shareable link from an upload result.
 *
 * @param result The upload result object from `PrivateBinClient`
 */
function getPasteUrl(result) {
    return `${result.url}#${result.urlKey}`;
}
exports.getPasteUrl = getPasteUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBOzs7O0dBSUc7QUFDSCxTQUFnQixXQUFXLENBQUMsTUFBcUI7SUFDN0MsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQzNDLENBQUM7QUFGRCxrQ0FFQyJ9
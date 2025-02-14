/**
 * Checks if a value is a Blob.
 * @param {any} value - The value to check.
 * @param {boolean} [isReactNative=false] - Whether the environment is React Native.
 * @returns {boolean} True if the value is a Blob, false otherwise.
 */
function isBlob(value, isReactNative) {
    return isReactNative
        ? typeof value === "object" && value !== null && typeof value.uri !== "undefined"
        : typeof value === "object" &&
        value !== null &&
        typeof value.size === "number" &&
        typeof value.type === "string" &&
        typeof value.slice === "function";
}
/**
 * Checks if a value is a File.
 * @param {any} value - The value to check.
 * @param {boolean} [isReactNative=false] - Whether the environment is React Native.
 * @returns {boolean} True if the value is a File, false otherwise.
 */
function isFile(value, isReactNative) {
    return (
        isBlob(value, isReactNative) &&
        typeof value.name === "string" &&
        (typeof value.lastModified === "number" || value.lastModifiedDate instanceof Date || value instanceof Blob)
    );
}
/**
 * Converts a JSON object to FormData.
 * @param {Record<string, any> | null | undefined} obj - The JSON object to convert.
 * @param {FormData} [formData=new FormData()] - The FormData object to append to.
 * @param {string} [parentKey=""] - The parent key for nested objects.
 * @param {boolean} [isReactNative=false] - Whether the environment is React Native.
 * @returns {FormData} The resulting FormData object.
 */
function JsonToFormData(obj, formData = new FormData(), parentKey = "", isReactNative = false) {
    if (obj && typeof obj === "object") {
        if (isFile(obj, isReactNative)) {
            formData.append(parentKey, obj);
        } else if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                JsonToFormData(item, formData, `${parentKey}[${index}]`, isReactNative);
            });
        } else {
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                const newKey = parentKey ? `${parentKey}[${key}]` : key;
                JsonToFormData(value, formData, newKey, isReactNative);
            });
        }
    } else if (obj !== null && obj !== undefined) {
        formData.append(parentKey, obj);
    }
    return formData;
}


module.exports = JsonToFormData;
function isBlob(value, isReactNative) {
    return isReactNative
        ? typeof value === "object" && value !== null && typeof value.uri !== "undefined"
        : typeof value === "object" &&
        value !== null &&
        typeof value.size === "number" &&
        typeof value.type === "string" &&
        typeof value.slice === "function";
}

function isFile(value, isReactNative) {
    return (
        isBlob(value, isReactNative) &&
        typeof value.name === "string" &&
        (typeof value.lastModified === "number" || value.lastModifiedDate instanceof Date || value instanceof Blob)
    );
}

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
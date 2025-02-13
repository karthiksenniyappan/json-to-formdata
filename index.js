function JsonToFormData(obj, formData = new FormData(), parentKey = '') {
    if (obj && typeof obj === 'object' && !(obj instanceof File)) {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const newKey = parentKey ? `${parentKey}[${key}]` : key;

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    JsonToFormData(item, formData, `${newKey}[${index}]`);
                });
            } else if (typeof value === 'object' && value !== null) {
                JsonToFormData(value, formData, newKey);
            } else if (value !== null && value !== undefined) {
                formData.append(newKey, value);
            }
        });
    } else {
        formData.append(parentKey, obj);
    }
    return formData;
}

module.exports = JsonToFormData;
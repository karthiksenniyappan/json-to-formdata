// typed.d.ts

/**
 * Checks if a value is a Blob.
 * @param value - The value to check.
 * @param isReactNative - Whether the environment is React Native.
 * @returns True if the value is a Blob, false otherwise.
 */
declare function isBlob(value: any, isReactNative?: boolean): value is Blob;

/**
 * Checks if a value is a File.
 * @param value - The value to check.
 * @param isReactNative - Whether the environment is React Native.
 * @returns True if the value is a File, false otherwise.
 */
declare function isFile(value: any, isReactNative?: boolean): value is File;

/**
 * Converts a JSON object to FormData.
 * @param obj - The JSON object to convert.
 * @param formData - The FormData object to append to (optional).
 * @param parentKey - The parent key for nested objects (optional).
 * @param isReactNative - Whether the environment is React Native (optional).
 * @returns The resulting FormData object.
 */
declare function JsonToFormData(
    obj: Record<string, any> | null | undefined,
    formData?: FormData,
    parentKey?: string,
    isReactNative?: boolean
): FormData;

export = JsonToFormData;
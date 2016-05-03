/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @export
 * @param parameter The parameter to check
 * @param message The error message text to include when the error is thrown
 */
export function parameterCheck(parameter: any, message: string): void | Error {
    if ((typeof parameter === "undefined") || parameter === null) {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @export
 * @param {*} parameter The string parameter to check
 * @param {string} message The error message text to include when the error is thrown
 */
export function stringParameterCheck(parameter: any, message: string): void | Error {
    if (typeof parameter !== "string") {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required callback parameters are functions
 *
 * @export
 * @param {*} callbackParameter The callback parameter to check
 * @param {string} message The error message text to include when the error is thrown.
 */
export function callbackParameterCheck(callbackParameter: any, message: string): void | Error {
    if (typeof callbackParameter !== "function") {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @export
 * @param {*} parameter The boolean parameter to check
 * @param {string} message The error message text to include when the error is thrown
 */
export function booleanParameterCheck(parameter: any, message: string): void | Error {
    if (typeof parameter !== "boolean") {
        throw new Error(message);
    }
}
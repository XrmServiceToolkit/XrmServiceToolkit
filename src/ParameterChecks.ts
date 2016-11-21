/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @param {Object} parameter The parameter to check
 * @param {string} message The error message text to include when the error is thrown.
 */
export function parameterCheck (parameter, message): void {
    if (typeof parameter === "undefined" || parameter === null) {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @param {string} parameter The string parameter to check
 * @param {string} message The error message text to include when the error is thrown.
 */
export function stringParameterCheck (parameter: string, message: string): void {
    if (typeof parameter != "string") {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required callback parameters are functions
 *
 * @param {Function} callbackParameter The callback parameter to check
 * @param {string} message The error message text to include when the error is thrown.
 */
export function callbackParameterCheck (callbackParameter: Function, message: string): void {
    if (typeof callbackParameter != "function") {
        throw new Error(message);
    }
}

/**
 * Private function used to check whether required parameters are null or undefined
 *
 * @param {boolean} parameter The boolean parameter to check
 * @param {string} message The error message text to include when the error is thrown.
 */
export function booleanParameterCheck (parameter: string, message: string): void {
    if (typeof parameter != "boolean") {
        throw new Error(message);
    }
}
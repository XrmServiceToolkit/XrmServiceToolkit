export function alertMessage(message: string): void {
    (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message, null) : alert(message);
}

function htmlEncode(s: string): string {
    if (s === null || s === "" || s === undefined) {
        return s;
    }
    let buffer = "",
        hEncode = "";
    for (let count = 0, cnt = 0, slength = s.length; cnt < slength; cnt++) {
        let c = s.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
            buffer += String.fromCharCode(c);
        else buffer += "&#" + c + ";";
        if (++count === 500) {
            hEncode += buffer;
            buffer = "";
            count = 0;
        }
    }
    if (buffer.length) {
        hEncode += buffer;
    }
    return hEncode;
}

export function innerSurrogateAmpersandWorkaround(s: string): string {
    let buffer = '';
    let c0;
    for (let cnt = 0, slength = s.length; cnt < slength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            if (cnt + 1 < s.length) {
                let c1 = s.charCodeAt(cnt + 1);
                if (c1 >= 56320 && c1 <= 57343) {
                    buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose";
                    cnt++;
                } else
                    buffer += String.fromCharCode(c0);
            } else buffer += String.fromCharCode(c0);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    buffer = "";
    for (let cnt = 0, slength = s.length; cnt < slength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            buffer += String.fromCharCode(65533);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    s = htmlEncode(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s;
}

export function crmXmlEncode(s: string): string {
    if ('undefined' === typeof s || 'unknown' === typeof s || null === s) {
        return s;
    } else if (typeof s != "string") {
        s = s.toString();
    }
    return innerSurrogateAmpersandWorkaround(s);
}

export function crmXmlDecode(s: string): string {
    if (typeof s != "string") {
        s = s.toString();
    }

    return s;
}

/**
 * Private function to the context object.
 * @returns {Xrm.Context}
 */
export function context(): Xrm.Context {
    let oContext;
    if (typeof window.GetGlobalContext != "undefined") {
        oContext = window.GetGlobalContext();
    } else if (typeof GetGlobalContext != "undefined") {
        oContext = GetGlobalContext();
    } else {
        if (typeof Xrm != "undefined") {
            oContext = Xrm.Page.context;
        } else if (typeof window.parent.Xrm != "undefined") {
            oContext = window.parent.Xrm.Page.context;
        } else {
            throw new Error("Context is not available.");
        }
    }
    return oContext;
}

/**
 * Private function to return the server URL from the context
 *
 * @returns {string}
 */
export function getClientUrl(): string {
    let serverUrl = context().getClientUrl();
    if (serverUrl.match(/\/$/)) {
        serverUrl = serverUrl.substring(0, serverUrl.length - 1);
    }
    return serverUrl;
}

/**
 * Private function to return the path to the REST endpoint.
 *
 * @returns {string}
 */
export function oDataPath(): string {
    const oDataVersion = Xrm.Page.context.getVersion().slice(0, 3);
    return `${getClientUrl()}/data/api/v${oDataVersion}`;
}

/**
 * Private function return an Error object to the errorCallback
 *
 * @param {XMLHttpRequest} req The XMLHttpRequest response that returned an error.
 * @returns {Error}
 */
export function errorHandler(req): Error {
    try {
        return new Error("Error : " +
            req.status + ": " +
            req.statusText + ": " +
            JSON.parse(req.responseText).error.message.value);
    } catch (err) {
        // Error status codes: https://support.microsoft.com/en-us/kb/193625
        return new Error("Error : " +
            req.status + ": " +
            req.statusText + ": " +
            "Response text could not be parsed (empty?). WinInet Error codes: https://support.microsoft.com/en-us/kb/193625 ."
        );
    }
}

/**
 * Private function to convert matching string values to Date objects.
 *
 * @param {string} key The key used to identify the object property
 * @param {string} value The string value representing a date
 */
export function dateReviver (key: string, value: string): string | Date {
    let a;
    if (typeof value === 'string') {
        a = /Date\(([-+]?\d+)\)/.exec(value);
        if (a) {
            return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        }
    }
    return value;
}

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

/**
 * Get an instance of XMLHttpRequest for all browsers
 */
export function getXhr () {
    if (XMLHttpRequest) {
        // Chrome, Firefox, IE7+, Opera, Safari
        return new XMLHttpRequest();
    }
    // IE6
    try {
        // The latest stable version. It has the best security, performance,
        // reliability, and W3C conformance. Ships with Vista, and available
        // with other OS's via downloads and updates.
        return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch (e) {
        try {
            // The fallback.
            return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        } catch (e) {
            alertMessage('This browser is not AJAX enabled.');
            return null;
        }
    }
}

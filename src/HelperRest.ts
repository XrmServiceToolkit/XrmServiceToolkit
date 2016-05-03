import {getClientUrl, alertMessage, htmlEncode} from "./Helper";
import {parameterCheck} from "./ParameterCheck";

/**
 * Private function to return the path to the REST endpoint.
 *
 * @export
 * @returns String of the OrganizationData Service
 */
export function oDataPath() {
    return getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";
}

/**
 * Private function return an Error object to the errorCallback
 *
 * @export
 * @param {XMLHttpRequest} req The XMLHttpRequest response that returned an error.
 */
export function errorHandler(req: XMLHttpRequest) {
    throw new Error("Error : " +
    req.status + ": " +
    req.statusText + ": " +
    JSON.parse(req.responseText).error.message.value);
}

/**
 * Private function to convert matching string values to Date objects.
 *
 * @export
 * @param {string} key The key used to identify the object property
 * @param {string} value The string value representing a date
 * @returns {(string | Date)}
 */
export function dateReviver(key: string, value: string): string | Date {
    let a: RegExpExecArray;
    if (typeof value === "string") {
        a = /Date\(([-+]?\d+)\)/.exec(value);
        if (a) {
            return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        }
    }
    return value;
}

/**
 * Get an instance of XMLHttpRequest for all browsers
 *
 * @export
 * @returns (description)
 */
export function getXhr(): XMLHttpRequest | ActiveXObject {
    if (XMLHttpRequest) {
        // Chrome, Firefox, IE7+, Opera, Safari
        // ReSharper disable InconsistentNaming
        return new XMLHttpRequest();
        // ReSharper     restore InconsistentNaming
    }
    // IE6
    try {
        // The latest stable version. It has the best security, performance,
        // reliability, and W3C conformance. Ships with Vista, and available
        // with other OS's via downloads and updates.
        return new ActiveXObject("MSXML2.XMLHTTP.6.0");
    } catch (e) {
        try {
            // The fallback.
            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (e) {
            alertMessage("This browser is not AJAX enabled.");
            return null;
        }
    }
}

/**
 * Perform request with settings
 *
 * @export
 * @param {*} settings Settings for the request
 */
export function performRequest(settings: any): void {
    parameterCheck(settings, "The value passed to the performRequest function settings parameter is null or undefined.");
    let request: XMLHttpRequest = <XMLHttpRequest>getXhr();
    request.open(settings.type, settings.url, settings.async);
    request.setRequestHeader("Accept", "application/json");
    if (settings.action != null) {
        request.setRequestHeader("X-HTTP-Method", settings.action);
    }
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    if (settings.async) {
        request.onreadystatechange = () => {
            if (request.readyState === 4 /*Complete*/) {
                // Status 201 is for create, status 204/1223 for link and delete.
                // There appears to be an issue where IE maps the 204 status to 1223
                // when no content is returned.
                if (request.status === 204 || request.status === 1223 || request.status === 201) {
                    settings.success(request);
                } else {
                    // Failure
                    if (settings.error) {
                        settings.error(errorHandler(request));
                    } else {
                        errorHandler(request);
                    }
                }
            }
        };

        if (typeof settings.data === "undefined") {
            request.send();
        } else {
            request.send(settings.data);
        }
    } else {
        if (typeof settings.data === "undefined") {
            request.send();
        } else {
            request.send(settings.data);
        }

        if (request.status === 204 || request.status === 1223 || request.status === 201) {
            settings.success(request);
        } else {
            // Failure
            if (settings.error) {
                settings.error(errorHandler(request));
            } else {
                errorHandler(request);
            }
        }
    }
}
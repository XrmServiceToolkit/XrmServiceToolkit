import { getXhr, oDataPath, dateReviver, errorHandler } from "./Utility";
/**
 * Sends synchronous/asynchronous request to create a new record.
 *
 * @export
 * @param {Object} object A JavaScript object with properties corresponding to the Schema name of entity attributes that are valid for create operations.
 * @param {string} type A String representing the name of the entity
 * @param {Function} successCallback The function that will be passed through and be called by a successful response. This function can accept the returned record as a parameter.
 * @param {Function} errorCallback The function that will be passed through and be called by a failed response. This function must accept an Error object as a parameter.
 */
export function createRecord(object: Object, type: string, successCallback: Function, errorCallback: Function) {
    const async = successCallback ? true : false;
    let req = getXhr();
    req.open("POST", oDataPath() + type, async);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    if (async) {
        req.onreadystatechange = function () {
            if (this.readyState === 4 /* complete */) {
                req.onreadystatechange = null;
                if (req.status === 201) {
                    successCallback(JSON.parse(req.responseText, dateReviver).d);
                } else {
                    errorCallback(errorHandler(req));
                }
            }
        };
        req.send(JSON.stringify(object));
    } else {
        req.send(JSON.stringify(object));
        if (req.status === 201) {
            successCallback(JSON.parse(req.responseText, dateReviver).d);
        } else {
            errorCallback(errorHandler(req));
        }
    }

}
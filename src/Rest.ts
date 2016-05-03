/// <reference path="../typings/main.d.ts" />

import {oDataPath, dateReviver, errorHandler, getXhr, performRequest} from "./HelperRest";
import {parameterCheck, stringParameterCheck, booleanParameterCheck, callbackParameterCheck} from "./ParameterCheck";

        // RetrieveMultiple: retrieveMultipleRecords,
        // Associate: associateRecord,
        // Disassociate: disassociateRecord
export default class Rest {
    /**
     * Sends synchronous/asynchronous request to create a new record
     *
     * @param {Object} object A JavaScript object with properties corresponding to the Schema name of
     * entity attributes that are valid for create operations
     * @param {string} type A String representing the name of the entity
     * @param {Function} successCallback The function that will be passed through and be called by a successful * * response.
     * This function can accept the returned record as a parameter.
     * @param {Function} errorCallback The function that will be passed through and be called by a failed
     * response.
     * This function must accept an Error object as a parameter.
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Create(object: Object, type: string, successCallback: Function, errorCallback: Function, async:boolean): void {
        parameterCheck(object, "XrmServiceToolkit.REST.createRecord requires the object parameter.");
        stringParameterCheck(type, "XrmServiceToolkit.REST.createRecord requires the type parameter is a string.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.createRecord requires the successCallback is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.createRecord requires the errorCallback is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.createRecord requires the async is a boolean.");

        let req: XMLHttpRequest = <XMLHttpRequest>getXhr();
        req.open("POST", oDataPath() + type, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = () => {
                if (req.readyState === 4 /* complete */) {
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

    /**
     * Sends synchronous/asynchronous request to retrieve a record
     *
     * @param {string} id A String representing the GUID value for the record to retrieve
     * @param {string} type A String representing the name of the entity
     * @param {string} select A String representing the $select OData System Query Option to control which
     * attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
     * If null all properties for the record will be returned
     * @param {string} expand  String representing the $expand OData System Query Option value to control which
     * related records are also returned. This is a comma separated list of of up to 6 entity relationship names
     * If null no expanded related records will be returned.
     * @param {Function} successCallback The function that will be passed through and be called by a successful response.
     * This function must accept the returned record as a parameter.
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter.
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Retrieve(id: string, type: string, select: string, expand: string, successCallback: Function, errorCallback: Function, async: boolean): void {
        stringParameterCheck(id, "XrmServiceToolkit.REST.retrieveRecord requires the id parameter is a string.");
        stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveRecord requires the type parameter is a string.");
        if (select != null)
            stringParameterCheck(select, "XrmServiceToolkit.REST.retrieveRecord requires the select parameter is a string.");
        if (expand != null)
            stringParameterCheck(expand, "XrmServiceToolkit.REST.retrieveRecord requires the expand parameter is a string.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveRecord requires the successCallback parameter is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveRecord requires the errorCallback parameter is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveRecord requires the async parameter is a boolean.");

        let systemQueryOptions = "";

        if (select != null || expand != null) {
            systemQueryOptions = "?";
            if (select != null) {
                let selectString = "$select=" + select;
                if (expand != null) {
                    selectString = selectString + "," + expand;
                }
                systemQueryOptions = systemQueryOptions + selectString;
            }
            if (expand != null) {
                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
            }
        }

        let req: XMLHttpRequest = <XMLHttpRequest>getXhr();
        req.open("GET", oDataPath() + type + "(guid'" + id + "')" + systemQueryOptions, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = () => {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 200) {
                        successCallback(JSON.parse(req.responseText, dateReviver).d);
                    } else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 200) {
                successCallback(JSON.parse(req.responseText, dateReviver).d);
            }
            else {
                errorCallback(errorHandler(req));
            }
        }

    };

    /**
     * Sends synchronous/asynchronous request to update a record
     *
     * @param {string} id A String representing the GUID value for the record to update
     * @param {Object} object A JavaScript object with properties corresponding to the Schema name of
     * entity attributes that are valid for create operations
     * @param {string} type A String representing the name of the entity
     * @param {Function} successCallback The function that will be passed through and be called by a successful response.
     * Nothing will be returned to this function
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Update(id: string, object: Object, type: string, successCallback: Function, errorCallback: Function, async: boolean): void {
        stringParameterCheck(id, "XrmServiceToolkit.REST.updateRecord requires the id parameter.");
        parameterCheck(object, "XrmServiceToolkit.REST.updateRecord requires the object parameter.");
        stringParameterCheck(type, "XrmServiceToolkit.REST.updateRecord requires the type parameter.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.updateRecord requires the successCallback is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.updateRecord requires the errorCallback is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.updateRecord requires the async parameter is a boolean.");

        let req: XMLHttpRequest = <XMLHttpRequest>getXhr();

        req.open("POST", oDataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "MERGE");

        if (async) {
            req.onreadystatechange = () => {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 204 || req.status === 1223) {
                        successCallback();
                    } else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send(JSON.stringify(object));
        } else {
            req.send(JSON.stringify(object));
            if (req.status === 204 || req.status === 1223) {
                successCallback();
            }
            else {
                errorCallback(errorHandler(req));
            }
        }
    }

    /**
     * Sends synchronous/asynchronous request to delete a record
     *
     * @param {string} id A String representing the GUID value for the record to delete
     * @param {string} type A String representing the name of the entity
     * @param {Function} successCallback The function that will be passed through and be called by a successful response.
     * Nothing will be returned to this function
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Delete(id: string, type: string, successCallback: Function, errorCallback: Function, async: boolean): void {
        stringParameterCheck(id, "XrmServiceToolkit.REST.deleteRecord requires the id parameter.");
        stringParameterCheck(type, "XrmServiceToolkit.REST.deleteRecord requires the type parameter.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.deleteRecord requires the successCallback is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.deleteRecord requires the errorCallback is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.deleteRecord requires the async parameter is a boolean.");

        let req: XMLHttpRequest = <XMLHttpRequest>getXhr();
        req.open("POST", oDataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "DELETE");

        if (async) {
            req.onreadystatechange = () => {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 204 || req.status === 1223) {
                        successCallback();
                    } else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 204 || req.status === 1223) {
                successCallback();
            } else {
                errorCallback(errorHandler(req));
            }
        }
    }

    /**
     * Sends synchronous/asynchronous request to retrieve records
     *
     * @param {string} type The Schema Name of the Entity type record to retrieve.
     * For an Account record, use "Account"
     * @param {string} options A String representing the OData System Query Options to control the data returned
     * @param {Function} successCallback The function that will be passed through and be called for each page of records returned.
     * Each page is 50 records. If you expect that more than one page of records will be returned,
     * this function should loop through the results and push the records into an array outside of the function.
     * Use the OnComplete event handler to know when all the records have been processed
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter
     * @param {Function} onComplete The function that will be called when all the requested records have been returned.
     * No parameters are passed to this function
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static RetrieveMultiple(type: string, options: string, successCallback: Function, errorCallback: Function, onComplete: Function, async: boolean): void {
        stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string.");
        if (options != null)
            stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        callbackParameterCheck(onComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean.");

        let optionsString = "";
        if (options != null) {
            if (options.charAt(0) !== "?") {
                optionsString = "?" + options;
            } else {
                optionsString = options;
            }
        }

        let req: XMLHttpRequest = <XMLHttpRequest>getXhr();
        req.open("GET", oDataPath() + type + optionsString, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");

        if (async) {
            req.onreadystatechange = () => {
                if (req.readyState === 4 /* complete */) {
                    if (req.status === 200) {
                        let returned = JSON.parse(req.responseText, dateReviver).d;
                        successCallback(returned.results);
                        if (returned.__next == null) {
                            onComplete();
                        } else {
                            let queryOptions = returned.__next.substring((oDataPath() + type).length);
                            this.RetrieveMultiple(type, queryOptions, successCallback, errorCallback, onComplete, async);
                        }
                    } else {
                        errorCallback(errorHandler(req));
                    }
                }
            };
            req.send();
        } else {
            req.send();
            if (req.status === 200) {
                let returned = JSON.parse(req.responseText, dateReviver).d;
                successCallback(returned.results);
                if (returned.__next == null) {
                    onComplete();
                } else {
                    let queryOptions = returned.__next.substring((oDataPath() + type).length);
                    this.RetrieveMultiple(type, queryOptions, successCallback, errorCallback, onComplete, async);
                }
            } else {
                errorCallback(errorHandler(req));
            }
        }
    }

    /**
     * Sends synchronous/asynchronous request to associate a record
     *
     * @param {string} entityid1 A String representing the GUID value for the record to associate
     * @param {string} odataSetName1 A String representing the odataset name for entityid1
     * @param {string} entityid2 A String representing the GUID value for the record to be associated
     * @param {string} odataSetName2 A String representing the odataset name for entityid2
     * @param {string} relationship A String representing the name of the relationship for association
     * @param {Function} successCallback The function that will be passed through and be called by a successful response.
     * Nothing will be returned to this function
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Associate(entityid1: string, odataSetName1: string, entityid2: string, odataSetName2: string, relationship: string, successCallback: Function, errorCallback: Function, async: boolean): void {
        parameterCheck(entityid1, "XrmServiceToolkit.REST.associateRecord requires the entityid1 parameter.");
        parameterCheck(odataSetName1, "XrmServiceToolkit.REST.associateRecord requires the odataSetName1 parameter.");
        parameterCheck(entityid2, "XrmServiceToolkit.REST.associateRecord requires the entityid2 parameter.");
        parameterCheck(odataSetName2, "XrmServiceToolkit.REST.associateRecord requires the odataSetName2 parameter.");
        parameterCheck(relationship, "XrmServiceToolkit.REST.associateRecord requires the relationship parameter.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.associateRecord requires the successCallback is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.associateRecord requires the errorCallback is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.associateRecord requires the async parameter is a boolean");

        let entity2: any = {};
        entity2.uri = oDataPath() + "/" + odataSetName2 + "(guid'" + entityid2 + "')";
        let jsonEntity = JSON.stringify(entity2);

        performRequest({
            type: "POST",
            url: oDataPath() + "/" + odataSetName1 + "(guid'" + entityid1 + "')/$links/" + relationship,
            data: jsonEntity,
            success: successCallback,
            error: errorCallback,
            async: async
        });
    }

    /**
     * Sends synchronous/asynchronous request to disassociate a record
     *
     * @param {string} entityid1 A String representing the GUID value for the record to disassociate
     * @param {string} odataSetName A String representing the odataset name for entityid1
     * @param {string} entityid2 A String representing the GUID value for the record to be disassociated
     * @param {string} relationship A String representing the name of the relationship for disassociation
     * @param {Function} successCallback The function that will be passed through and be called by a successful response.
     * Nothing will be returned to this function
     * @param {Function} errorCallback The function that will be passed through and be called by a failed response.
     * This function must accept an Error object as a parameter
     * @param {boolean} async A Boolean representing if the method should run asynchronously or synchronously
     * true means asynchronously. false means synchronously
     */
    static Disassociate(entityid1: string, odataSetName: string, entityid2: string, relationship: string, successCallback: Function, errorCallback: Function, async: boolean): void {
        parameterCheck(entityid1, "XrmServiceToolkit.REST.disassociateRecord requires the entityid1 parameter.");
        parameterCheck(odataSetName, "XrmServiceToolkit.REST.disassociateRecord requires the odataSetName parameter.");
        parameterCheck(entityid2, "XrmServiceToolkit.REST.disassociateRecord requires the entityid2 parameter.");
        parameterCheck(relationship, "XrmServiceToolkit.REST.disassociateRecord requires the relationship parameter.");
        callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.disassociateRecord requires the successCallback is a function.");
        callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.disassociateRecord requires the errorCallback is a function.");
        booleanParameterCheck(async, "XrmServiceToolkit.REST.disassociateRecord requires the async parameter is a boolean.");

        var url = oDataPath() + "/" + odataSetName + "(guid'" + entityid1 + "')/$links/" + relationship + "(guid'" + entityid2 + "')";
        performRequest({
            url: url,
            type: "POST",
            action: "DELETE",
            error: errorCallback,
            success: successCallback,
            async: async
        });
    }
}
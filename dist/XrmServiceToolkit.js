(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["XrmServiceToolkit"] = factory();
	else
		root["XrmServiceToolkit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/main.d.ts" />
	"use strict";
	/**
	* MSCRM 2015, 2013, 2011 Web Service Toolkit for JavaScript
	* @author Jaimie Ji
	* @author David Berry
	* @current version : 2.2.1
	
	* Credits:
	*   The idea of this library was inspired by Daniel Cai's CrmWebServiceToolkit.
	*   The idea of BusinessEntity was inspired by Daniel Cai && Ascentium CrmService JavaScript Library.
	*   The REST Endpoint functions were inspired by MSCRM 2011 SDK JavaScript code and various resources from CRM websites and forums. Some of them were just copies with minor modification.
	*   The Soap functions were inspired by Daniel Cai && Jamie Miley && Paul Way && Customer Effective.
	*   Additional thanks to all contributors of MSCRM and i have learned a lot from you all.
	* Date: February, 2012
	*
	* Special Thanks:
	*   JetBrains ReSharper Open License
	* Date: July, 2012
	*
	* What's new:
	**********************************************************************************************************
	*   Version: 1.1
	*   Date: April, 2012
	*       Dependency: JSON2
	*       New Function - XrmServiceToolkit.Soap.Assign
	*       New Function - XrmServiceToolkit.Soap.GrantAccess
	*       New Function - XrmServiceToolkit.Soap.ModifyAccess
	*       New Function - XrmServiceToolkit.Soap.GrantAccess
	*       New Function - XrmServiceToolkit.Soap.RetrievePrincipalAccess
	**********************************************************************************************************
	*   Version: 1.2
	*   Date: April, 2012
	*       Dependency: JSON2
	*       New Fix - Fix soaps functions to create/update/retrieve activities with Party List fields.
	**********************************************************************************************************
	*   Version: 1.3
	*   Date: July, 2012
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       New Feature: cross browser support. jQuery Integration.
	*       New Extension: A new category of functions to extend some functions:
	*          1. JQueryXrmDependentOptionSet: Create Configurable Dependent Option Set to utilize CRM 2011 web resource.
	*          2. JQueryXrmFieldTooltip: Create configurable tooltip for fields on CRM 2011 form
	*          3. JQueryXrmCustomFilterView: Create configurable ability to add custom filter view to crm 2011 lookup field on the form
	*          4. JQueryXrmFormatNotesControl: Format the notes control to allow insert, allow edit
	**********************************************************************************************************
	*   Version: 1.3.1
	*   Date: November, 2012
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       New Feature - A change of logic to increase performance when returning large number of records
	*       New Function - XrmServiceToolkit.Soap.QueryAll: Return all available records by query options (>5k+)
	*       New Fix - XrmServiceToolkit.Rest.RetrieveMultiple not returning records more than 50
	*       New Fix - XrmServiceToolkit.Soap.Business error when referring number fields like (int, double, float)
	*       New Fix - XrmServiceToolkit.Soap not handling error message properly
	**********************************************************************************************************
	*   Version: 1.3.2
	*   Date: January, 2013
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       New Fix - XrmServiceToolkit.Soap cross browser support to initialize soap service
	**********************************************************************************************************
	*   Version: 1.4.0
	*   Date: January, 2013
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       Feature: Add Cross Browser Support for RU12
	*       Tested Platform: IE9, IE10, Chrome Version 24.0.1312.56 m, Firefox 18.0.1
	**********************************************************************************************************
	*   Version: 1.4.1
	*   Date: April, 2013
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       Tested Platform: IE9, IE10, Chrome Version 26.0.1410.64 m, Firefox 20.0.1
	*       Feature: Add Cross Browser Support for RU12, RU13
	*       New Fix - XrmServiceToolkit.Common.AddNotification method updated for RU12, RU13, still compatible for RU11 below
	*       New Fix - XrmServiceToolkit.Soap.Fetch method did not format linked record correctly
	*       New Fix - XrmServiceToolkit.Soap.Retrieve method did not return partylist data for activity
	*       New Fix - Added manual conversion from String to Date conversion for cross browser
	*       New Fix - getServerUrl method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
	*       New Function - getServerUrl private method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
	*       New Function - XrmServiceToolkit.Soap.RetrieveAllEntitiesMetadata method is a method to return all metadata for all entities by the specified entity filters
	*       New Function - XrmServiceToolkit.Soap.RetrieveEntityMetadata method is a method to return the metadata for a certain entity by the specified entity filters
	*       New Function - XrmServiceToolkit.Soap.RetrieveAttributeMetadata method is a method to return the metadata for a certain entity's attribute
	**********************************************************************************************************
	*   Version: 1.4.2 (beta)
	*   Date: May, 2013
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       Tested Platform: IE10
	*       New Fix - XrmServiceToolkit.Soap.Fetch now takes an additional parameter, 'fetchAll', that when set to true will retrieve all pages of results
	*       New Behaviour - XrmServiceToolkit.Soap.Fetch works best when providing a FetchXML string starting with the "entity" node, because of the way paging works;
	*           It will still function with the traditional "fetch" node to start, but then the XML has to be parsed to select just the "entity" node, which adds some overhead.
	*       New Behaviour - XrmServiceToolkit fetch and queryall methods use a unified model, and some redundant code has been removed.  This allows better paging operations.
	*
	**********************************************************************************************************
	*   Version: 2.0.0 (beta)
	*   Date: October, 2013
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
	*       Tested Platform: IE10, latest Chrome, latest FireFox
	*    Changes:
	*       New Behaviour - XrmServiceTookit.Soap.Fetch parameters change to work with asynchronous callback compared to 1.4.2 beta: XrmServiceToolkit.Soap.Fetch(fetchXml, fetchAll, callback)
	*       New Behaviour - XrmServiceTookit.Soap.AddNotification is working with CRM 2013 using the out-of-box functionality. Still support CRM 2011
	*       New Fix - XrmServiceToolkit.Common.GetObjectCodeType is now using metadata retrieval as a supported method
	*       New Fix - The included jQuery has a line changed at the bottom <window.jQuery = jQuery;> $ is removed to work with CRM 2013 form
	*   Beta Release for CRM 2013
	**********************************************************************************************************
	*   Version: 2.0.1 (beta)
	*   Date: April, 2014
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
	*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
	*    Changes:
	*       New Behaviour - XrmServiceTookit.Soap.Fetch method will allow 'page' and 'count' parameter to limit the returned records.
	*       New Fix - XrmServiceToolkit.Soap.Fetch fix an error when passing difference formats of Fetch XML with/without '<fetch>..' statements
	*       New Fix - XrmServiceToolkit.Extension methods error when retrieving web resources
	*   Beta Release for CRM 2013
	**********************************************************************************************************
	*   Version: 2.1
	*   Date: September, 2014
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
	*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
	*    Changes:
	*       Performance Refactor
	*       New Fix - XrmServiceToolkit.Common.DisableAllControlsInTab to support CRM2013 changes
	*   Beta Release for CRM 2013
	**********************************************************************************************************
	*   Version: 2.2
	*   Date: April, 2015
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
	*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
	*    Changes:
	*       CRM 2015 release
	*       New Fix - Error Handling
	*       New Fix - XrmServiceToolkit.Soap.Fetch aggregate fix
	*       New Fix - XrmServiceToolkit.Soap.Fetch distinct support
	*       New Fix - Aliased Values Handling
	*   Stable Release for CRM 2013, CRM 2015
	**********************************************************************************************************
	*   Version: 2.2.1
	*   Date: May, 2015
	*       Dependency: JSON2, jQuery (latest or 1.7.2 above)
	*       ---NOTE---Due to the changes for CRM 2013, please use the attached version of JSON2 and jQuery
	*       Tested Platform: IE11, IE10, latest Chrome, latest FireFox
	*    Changes:
	*       CRM 2015 7.1 release
	*       New Fix - Added logic for EntityReference in SOAP for 7.1 changes
	*   Beta Release for CRM 2015 online Update 1
	**********************************************************************************************************
	*/
	var Rest_1 = __webpack_require__(1);
	exports.Rest = Rest_1.default;
	var Soap_1 = __webpack_require__(5);
	exports.Soap = Soap_1.default;
	var Extension_1 = __webpack_require__(7);
	exports.Extension = Extension_1.default;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/main.d.ts" />
	"use strict";
	var HelperRest_1 = __webpack_require__(2);
	var ParameterCheck_1 = __webpack_require__(4);
	// RetrieveMultiple: retrieveMultipleRecords,
	// Associate: associateRecord,
	// Disassociate: disassociateRecord
	var Rest = (function () {
	    function Rest() {
	    }
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
	    Rest.Create = function (object, type, successCallback, errorCallback, async) {
	        ParameterCheck_1.parameterCheck(object, "XrmServiceToolkit.REST.createRecord requires the object parameter.");
	        ParameterCheck_1.stringParameterCheck(type, "XrmServiceToolkit.REST.createRecord requires the type parameter is a string.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.createRecord requires the successCallback is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.createRecord requires the errorCallback is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.createRecord requires the async is a boolean.");
	        var req = HelperRest_1.getXhr();
	        req.open("POST", HelperRest_1.oDataPath() + type, async);
	        req.setRequestHeader("Accept", "application/json");
	        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	        if (async) {
	            req.onreadystatechange = function () {
	                if (req.readyState === 4 /* complete */) {
	                    req.onreadystatechange = null;
	                    if (req.status === 201) {
	                        successCallback(JSON.parse(req.responseText, HelperRest_1.dateReviver).d);
	                    }
	                    else {
	                        errorCallback(HelperRest_1.errorHandler(req));
	                    }
	                }
	            };
	            req.send(JSON.stringify(object));
	        }
	        else {
	            req.send(JSON.stringify(object));
	            if (req.status === 201) {
	                successCallback(JSON.parse(req.responseText, HelperRest_1.dateReviver).d);
	            }
	            else {
	                errorCallback(HelperRest_1.errorHandler(req));
	            }
	        }
	    };
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
	    Rest.Retrieve = function (id, type, select, expand, successCallback, errorCallback, async) {
	        ParameterCheck_1.stringParameterCheck(id, "XrmServiceToolkit.REST.retrieveRecord requires the id parameter is a string.");
	        ParameterCheck_1.stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveRecord requires the type parameter is a string.");
	        if (select != null)
	            ParameterCheck_1.stringParameterCheck(select, "XrmServiceToolkit.REST.retrieveRecord requires the select parameter is a string.");
	        if (expand != null)
	            ParameterCheck_1.stringParameterCheck(expand, "XrmServiceToolkit.REST.retrieveRecord requires the expand parameter is a string.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveRecord requires the successCallback parameter is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveRecord requires the errorCallback parameter is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveRecord requires the async parameter is a boolean.");
	        var systemQueryOptions = "";
	        if (select != null || expand != null) {
	            systemQueryOptions = "?";
	            if (select != null) {
	                var selectString = "$select=" + select;
	                if (expand != null) {
	                    selectString = selectString + "," + expand;
	                }
	                systemQueryOptions = systemQueryOptions + selectString;
	            }
	            if (expand != null) {
	                systemQueryOptions = systemQueryOptions + "&$expand=" + expand;
	            }
	        }
	        var req = HelperRest_1.getXhr();
	        req.open("GET", HelperRest_1.oDataPath() + type + "(guid'" + id + "')" + systemQueryOptions, async);
	        req.setRequestHeader("Accept", "application/json");
	        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	        if (async) {
	            req.onreadystatechange = function () {
	                if (req.readyState === 4 /* complete */) {
	                    if (req.status === 200) {
	                        successCallback(JSON.parse(req.responseText, HelperRest_1.dateReviver).d);
	                    }
	                    else {
	                        errorCallback(HelperRest_1.errorHandler(req));
	                    }
	                }
	            };
	            req.send();
	        }
	        else {
	            req.send();
	            if (req.status === 200) {
	                successCallback(JSON.parse(req.responseText, HelperRest_1.dateReviver).d);
	            }
	            else {
	                errorCallback(HelperRest_1.errorHandler(req));
	            }
	        }
	    };
	    ;
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
	    Rest.Update = function (id, object, type, successCallback, errorCallback, async) {
	        ParameterCheck_1.stringParameterCheck(id, "XrmServiceToolkit.REST.updateRecord requires the id parameter.");
	        ParameterCheck_1.parameterCheck(object, "XrmServiceToolkit.REST.updateRecord requires the object parameter.");
	        ParameterCheck_1.stringParameterCheck(type, "XrmServiceToolkit.REST.updateRecord requires the type parameter.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.updateRecord requires the successCallback is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.updateRecord requires the errorCallback is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.updateRecord requires the async parameter is a boolean.");
	        var req = HelperRest_1.getXhr();
	        req.open("POST", HelperRest_1.oDataPath() + type + "(guid'" + id + "')", async);
	        req.setRequestHeader("Accept", "application/json");
	        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	        req.setRequestHeader("X-HTTP-Method", "MERGE");
	        if (async) {
	            req.onreadystatechange = function () {
	                if (req.readyState === 4 /* complete */) {
	                    if (req.status === 204 || req.status === 1223) {
	                        successCallback();
	                    }
	                    else {
	                        errorCallback(HelperRest_1.errorHandler(req));
	                    }
	                }
	            };
	            req.send(JSON.stringify(object));
	        }
	        else {
	            req.send(JSON.stringify(object));
	            if (req.status === 204 || req.status === 1223) {
	                successCallback();
	            }
	            else {
	                errorCallback(HelperRest_1.errorHandler(req));
	            }
	        }
	    };
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
	    Rest.Delete = function (id, type, successCallback, errorCallback, async) {
	        ParameterCheck_1.stringParameterCheck(id, "XrmServiceToolkit.REST.deleteRecord requires the id parameter.");
	        ParameterCheck_1.stringParameterCheck(type, "XrmServiceToolkit.REST.deleteRecord requires the type parameter.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.deleteRecord requires the successCallback is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.deleteRecord requires the errorCallback is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.deleteRecord requires the async parameter is a boolean.");
	        var req = HelperRest_1.getXhr();
	        req.open("POST", HelperRest_1.oDataPath() + type + "(guid'" + id + "')", async);
	        req.setRequestHeader("Accept", "application/json");
	        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	        req.setRequestHeader("X-HTTP-Method", "DELETE");
	        if (async) {
	            req.onreadystatechange = function () {
	                if (req.readyState === 4 /* complete */) {
	                    if (req.status === 204 || req.status === 1223) {
	                        successCallback();
	                    }
	                    else {
	                        errorCallback(HelperRest_1.errorHandler(req));
	                    }
	                }
	            };
	            req.send();
	        }
	        else {
	            req.send();
	            if (req.status === 204 || req.status === 1223) {
	                successCallback();
	            }
	            else {
	                errorCallback(HelperRest_1.errorHandler(req));
	            }
	        }
	    };
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
	    Rest.RetrieveMultiple = function (type, options, successCallback, errorCallback, onComplete, async) {
	        var _this = this;
	        ParameterCheck_1.stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string.");
	        if (options != null)
	            ParameterCheck_1.stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function.");
	        ParameterCheck_1.callbackParameterCheck(onComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean.");
	        var optionsString = "";
	        if (options != null) {
	            if (options.charAt(0) !== "?") {
	                optionsString = "?" + options;
	            }
	            else {
	                optionsString = options;
	            }
	        }
	        var req = HelperRest_1.getXhr();
	        req.open("GET", HelperRest_1.oDataPath() + type + optionsString, async);
	        req.setRequestHeader("Accept", "application/json");
	        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	        if (async) {
	            req.onreadystatechange = function () {
	                if (req.readyState === 4 /* complete */) {
	                    if (req.status === 200) {
	                        var returned = JSON.parse(req.responseText, HelperRest_1.dateReviver).d;
	                        successCallback(returned.results);
	                        if (returned.__next == null) {
	                            onComplete();
	                        }
	                        else {
	                            var queryOptions = returned.__next.substring((HelperRest_1.oDataPath() + type).length);
	                            _this.RetrieveMultiple(type, queryOptions, successCallback, errorCallback, onComplete, async);
	                        }
	                    }
	                    else {
	                        errorCallback(HelperRest_1.errorHandler(req));
	                    }
	                }
	            };
	            req.send();
	        }
	        else {
	            req.send();
	            if (req.status === 200) {
	                var returned = JSON.parse(req.responseText, HelperRest_1.dateReviver).d;
	                successCallback(returned.results);
	                if (returned.__next == null) {
	                    onComplete();
	                }
	                else {
	                    var queryOptions = returned.__next.substring((HelperRest_1.oDataPath() + type).length);
	                    this.RetrieveMultiple(type, queryOptions, successCallback, errorCallback, onComplete, async);
	                }
	            }
	            else {
	                errorCallback(HelperRest_1.errorHandler(req));
	            }
	        }
	    };
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
	    Rest.Associate = function (entityid1, odataSetName1, entityid2, odataSetName2, relationship, successCallback, errorCallback, async) {
	        ParameterCheck_1.parameterCheck(entityid1, "XrmServiceToolkit.REST.associateRecord requires the entityid1 parameter.");
	        ParameterCheck_1.parameterCheck(odataSetName1, "XrmServiceToolkit.REST.associateRecord requires the odataSetName1 parameter.");
	        ParameterCheck_1.parameterCheck(entityid2, "XrmServiceToolkit.REST.associateRecord requires the entityid2 parameter.");
	        ParameterCheck_1.parameterCheck(odataSetName2, "XrmServiceToolkit.REST.associateRecord requires the odataSetName2 parameter.");
	        ParameterCheck_1.parameterCheck(relationship, "XrmServiceToolkit.REST.associateRecord requires the relationship parameter.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.associateRecord requires the successCallback is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.associateRecord requires the errorCallback is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.associateRecord requires the async parameter is a boolean");
	        var entity2 = {};
	        entity2.uri = HelperRest_1.oDataPath() + "/" + odataSetName2 + "(guid'" + entityid2 + "')";
	        var jsonEntity = JSON.stringify(entity2);
	        HelperRest_1.performRequest({
	            type: "POST",
	            url: HelperRest_1.oDataPath() + "/" + odataSetName1 + "(guid'" + entityid1 + "')/$links/" + relationship,
	            data: jsonEntity,
	            success: successCallback,
	            error: errorCallback,
	            async: async
	        });
	    };
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
	    Rest.Disassociate = function (entityid1, odataSetName, entityid2, relationship, successCallback, errorCallback, async) {
	        ParameterCheck_1.parameterCheck(entityid1, "XrmServiceToolkit.REST.disassociateRecord requires the entityid1 parameter.");
	        ParameterCheck_1.parameterCheck(odataSetName, "XrmServiceToolkit.REST.disassociateRecord requires the odataSetName parameter.");
	        ParameterCheck_1.parameterCheck(entityid2, "XrmServiceToolkit.REST.disassociateRecord requires the entityid2 parameter.");
	        ParameterCheck_1.parameterCheck(relationship, "XrmServiceToolkit.REST.disassociateRecord requires the relationship parameter.");
	        ParameterCheck_1.callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.disassociateRecord requires the successCallback is a function.");
	        ParameterCheck_1.callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.disassociateRecord requires the errorCallback is a function.");
	        ParameterCheck_1.booleanParameterCheck(async, "XrmServiceToolkit.REST.disassociateRecord requires the async parameter is a boolean.");
	        var url = HelperRest_1.oDataPath() + "/" + odataSetName + "(guid'" + entityid1 + "')/$links/" + relationship + "(guid'" + entityid2 + "')";
	        HelperRest_1.performRequest({
	            url: url,
	            type: "POST",
	            action: "DELETE",
	            error: errorCallback,
	            success: successCallback,
	            async: async
	        });
	    };
	    return Rest;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Rest;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Helper_1 = __webpack_require__(3);
	var ParameterCheck_1 = __webpack_require__(4);
	/**
	 * Private function to return the path to the REST endpoint.
	 *
	 * @export
	 * @returns String of the OrganizationData Service
	 */
	function oDataPath() {
	    return Helper_1.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/";
	}
	exports.oDataPath = oDataPath;
	/**
	 * Private function return an Error object to the errorCallback
	 *
	 * @export
	 * @param {XMLHttpRequest} req The XMLHttpRequest response that returned an error.
	 */
	function errorHandler(req) {
	    throw new Error("Error : " +
	        req.status + ": " +
	        req.statusText + ": " +
	        JSON.parse(req.responseText).error.message.value);
	}
	exports.errorHandler = errorHandler;
	/**
	 * Private function to convert matching string values to Date objects.
	 *
	 * @export
	 * @param {string} key The key used to identify the object property
	 * @param {string} value The string value representing a date
	 * @returns {(string | Date)}
	 */
	function dateReviver(key, value) {
	    var a;
	    if (typeof value === "string") {
	        a = /Date\(([-+]?\d+)\)/.exec(value);
	        if (a) {
	            return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
	        }
	    }
	    return value;
	}
	exports.dateReviver = dateReviver;
	/**
	 * Get an instance of XMLHttpRequest for all browsers
	 *
	 * @export
	 * @returns (description)
	 */
	function getXhr() {
	    if (XMLHttpRequest) {
	        // Chrome, Firefox, IE7+, Opera, Safari
	        // ReSharper disable InconsistentNaming
	        return new XMLHttpRequest();
	    }
	    // IE6
	    try {
	        // The latest stable version. It has the best security, performance,
	        // reliability, and W3C conformance. Ships with Vista, and available
	        // with other OS's via downloads and updates.
	        return new ActiveXObject("MSXML2.XMLHTTP.6.0");
	    }
	    catch (e) {
	        try {
	            // The fallback.
	            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
	        }
	        catch (e) {
	            Helper_1.alertMessage("This browser is not AJAX enabled.");
	            return null;
	        }
	    }
	}
	exports.getXhr = getXhr;
	/**
	 * Perform request with settings
	 *
	 * @export
	 * @param {*} settings Settings for the request
	 */
	function performRequest(settings) {
	    ParameterCheck_1.parameterCheck(settings, "The value passed to the performRequest function settings parameter is null or undefined.");
	    var request = getXhr();
	    request.open(settings.type, settings.url, settings.async);
	    request.setRequestHeader("Accept", "application/json");
	    if (settings.action != null) {
	        request.setRequestHeader("X-HTTP-Method", settings.action);
	    }
	    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	    if (settings.async) {
	        request.onreadystatechange = function () {
	            if (request.readyState === 4 /*Complete*/) {
	                // Status 201 is for create, status 204/1223 for link and delete.
	                // There appears to be an issue where IE maps the 204 status to 1223
	                // when no content is returned.
	                if (request.status === 204 || request.status === 1223 || request.status === 201) {
	                    settings.success(request);
	                }
	                else {
	                    // Failure
	                    if (settings.error) {
	                        settings.error(errorHandler(request));
	                    }
	                    else {
	                        errorHandler(request);
	                    }
	                }
	            }
	        };
	        if (typeof settings.data === "undefined") {
	            request.send();
	        }
	        else {
	            request.send(settings.data);
	        }
	    }
	    else {
	        if (typeof settings.data === "undefined") {
	            request.send();
	        }
	        else {
	            request.send(settings.data);
	        }
	        if (request.status === 204 || request.status === 1223 || request.status === 201) {
	            settings.success(request);
	        }
	        else {
	            // Failure
	            if (settings.error) {
	                settings.error(errorHandler(request));
	            }
	            else {
	                errorHandler(request);
	            }
	        }
	    }
	}
	exports.performRequest = performRequest;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Prompt an alert message
	 *
	 * @param {string} message Alert message text
	 */
	function alertMessage(message) {
	    (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
	}
	exports.alertMessage = alertMessage;
	/**
	 * Check if two guids are equal
	 *
	 * @export
	 * @param {string} guid1 A string represents a guid
	 * @param {string} guid2 A string represents a guid
	 * @returns {boolean}
	 */
	function guidsAreEqual(guid1, guid2) {
	    var isEqual;
	    if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) {
	        isEqual = false;
	    }
	    else {
	        isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
	    }
	    return isEqual;
	}
	exports.guidsAreEqual = guidsAreEqual;
	/**
	 * Private function to the context object.
	 *
	 * @export
	 * @returns {Xrm.Context}
	 */
	function context() {
	    var oContext;
	    if (typeof window.GetGlobalContext !== "undefined") {
	        oContext = window.GetGlobalContext();
	    }
	    else if (typeof GetGlobalContext !== "undefined") {
	        oContext = GetGlobalContext();
	    }
	    else {
	        if (typeof Xrm !== "undefined") {
	            oContext = Xrm.Page.context;
	        }
	        else if (typeof window.parent.Xrm !== "undefined") {
	            oContext = window.parent.Xrm.Page.context;
	        }
	        else {
	            throw new Error("Context is not available.");
	        }
	    }
	    return oContext;
	}
	exports.context = context;
	/**
	 * Private function to return the server URL from the context
	 *
	 * @export
	 * @returns {string} Url of the organization
	 */
	function getClientUrl() {
	    var serverUrl = typeof context().getClientUrl !== "undefined" ? context().getClientUrl() : context().getServerUrl();
	    if (serverUrl.match(/\/$/)) {
	        serverUrl = serverUrl.substring(0, serverUrl.length - 1);
	    }
	    return serverUrl;
	}
	exports.getClientUrl = getClientUrl;
	function htmlEncode(s) {
	    var buffer = "";
	    var hEncode = "";
	    if (s === null || s === "" || s === undefined)
	        return s;
	    for (var count = 0, cnt = 0, slength = s.length; cnt < slength; cnt++) {
	        var c = s.charCodeAt(cnt);
	        if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95) {
	            buffer += String.fromCharCode(c);
	        }
	        else {
	            buffer += "&#" + c + ";";
	        }
	        if (++count === 500) {
	            hEncode += buffer;
	            buffer = "";
	            count = 0;
	        }
	    }
	    if (buffer.length)
	        hEncode += buffer;
	    return hEncode;
	}
	exports.htmlEncode = htmlEncode;
	function innerSurrogateAmpersandWorkaround(s) {
	    var buffer = "";
	    var c0;
	    var cnt = 0;
	    var slength = s.length;
	    for (; cnt < slength; cnt++) {
	        c0 = s.charCodeAt(cnt);
	        if (c0 >= 55296 && c0 <= 57343) {
	            if (cnt + 1 < s.length) {
	                var c1 = s.charCodeAt(cnt + 1);
	                if (c1 >= 56320 && c1 <= 57343) {
	                    buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose";
	                    cnt++;
	                }
	                else {
	                    buffer += String.fromCharCode(c0);
	                }
	            }
	            else {
	                buffer += String.fromCharCode(c0);
	            }
	        }
	        else {
	            buffer += String.fromCharCode(c0);
	        }
	    }
	    s = buffer;
	    buffer = "";
	    for (cnt = 0, slength = s.length; cnt < slength; cnt++) {
	        c0 = s.charCodeAt(cnt);
	        if (c0 >= 55296 && c0 <= 57343) {
	            buffer += String.fromCharCode(65533);
	        }
	        else {
	            buffer += String.fromCharCode(c0);
	        }
	    }
	    s = buffer;
	    s = htmlEncode(s);
	    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
	    s = s.replace(/CRMEntityReferenceClose/g, ";");
	    return s;
	}
	exports.innerSurrogateAmpersandWorkaround = innerSurrogateAmpersandWorkaround;
	function crmXmlEncode(s) {
	    if ("undefined" === typeof s || "unknown" === typeof s || null === s) {
	        return s;
	    }
	    else if (typeof s !== "string") {
	        s = s.toString();
	    }
	    return innerSurrogateAmpersandWorkaround(s);
	}
	exports.crmXmlEncode = crmXmlEncode;
	function crmXmlDecode(s) {
	    if (typeof s !== "string") {
	        s = s.toString();
	    }
	    return s;
	}
	exports.crmXmlDecode = crmXmlDecode;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Private function used to check whether required parameters are null or undefined
	 *
	 * @export
	 * @param parameter The parameter to check
	 * @param message The error message text to include when the error is thrown
	 */
	function parameterCheck(parameter, message) {
	    if ((typeof parameter === "undefined") || parameter === null) {
	        throw new Error(message);
	    }
	}
	exports.parameterCheck = parameterCheck;
	/**
	 * Private function used to check whether required parameters are null or undefined
	 *
	 * @export
	 * @param {*} parameter The string parameter to check
	 * @param {string} message The error message text to include when the error is thrown
	 */
	function stringParameterCheck(parameter, message) {
	    if (typeof parameter !== "string") {
	        throw new Error(message);
	    }
	}
	exports.stringParameterCheck = stringParameterCheck;
	/**
	 * Private function used to check whether required callback parameters are functions
	 *
	 * @export
	 * @param {*} callbackParameter The callback parameter to check
	 * @param {string} message The error message text to include when the error is thrown.
	 */
	function callbackParameterCheck(callbackParameter, message) {
	    if (typeof callbackParameter !== "function") {
	        throw new Error(message);
	    }
	}
	exports.callbackParameterCheck = callbackParameterCheck;
	/**
	 * Private function used to check whether required parameters are null or undefined
	 *
	 * @export
	 * @param {*} parameter The boolean parameter to check
	 * @param {string} message The error message text to include when the error is thrown
	 */
	function booleanParameterCheck(parameter, message) {
	    if (typeof parameter !== "boolean") {
	        throw new Error(message);
	    }
	}
	exports.booleanParameterCheck = booleanParameterCheck;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../typings/main.d.ts" />
	var Helper_1 = __webpack_require__(3);
	var HelperSoap_1 = __webpack_require__(6);
	var Soap = (function () {
	    function Soap() {
	    }
	    /**
	     * Sends synchronous/asynchronous request to create a new record
	     *
	     * @param {Object} be A JavaScript object with properties corresponding to the Schema name of
	     * entity attributes that are valid for create operations.
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Create = function (be, callback) {
	        var request = be.serialize();
	        var async = !!callback;
	        var mBody = "\n            <request i:type=\"a:CreateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                <a:KeyValuePairOfstringanyType>\n                    <b:key>Target</b:key>\n                    " + request + "\n                </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Create</a:RequestName>\n            </request>\n        ";
	        return HelperSoap_1.doRequest(mBody, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//b:value");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to update an existing record
	     *
	     * @param {businessEntity} be A JavaScript object with properties corresponding to the Schema name of
	     * entity attributes that are valid for update operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Update = function (be, callback) {
	        var request = be.serialize();
	        var async = !!callback;
	        var mBody = "\n            <request i:type=\"a:UpdateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Target</b:key>\n                        " + request + "\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Update</a:RequestName>\n            </request>\n        ";
	        return HelperSoap_1.doRequest(mBody, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//a:Results");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to delete a record
	     *
	     * @param {string} entityName A JavaScript String corresponding to the Schema name of
	     * entity that is used for delete operations
	     * @param {string} id A JavaScript String corresponding to the GUID of
	     * entity that is used for delete operations
	     * @param {Function} [callback] A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Delete = function (entityName, id, callback) {
	        var request = "\n            <request i:type=\"a:DeleteRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Target</b:key>\n                        <b:value i:type=\"a:EntityReference\">\n                            <a:Id>\"\n                                " + id + "\n                            </a:Id>\n                            <a:LogicalName>\n                                " + entityName + "\n                            </a:LogicalName>\n                            <a:Name i:nil=\"true\" />\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Delete</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//a:Results");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to execute a soap request
	     *
	     * @param {string} request A JavaScript string corresponding to the soap request
	     * that are valid for execute operations
	     * @param {Function} [callback] A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Execute = function (request, callback) {
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            if (!async) {
	                return resultXml;
	            }
	            else {
	                callback(resultXml);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a fetch request)
	     *
	     * @param {string} fetchCore A JavaScript String containing serialized XML using the FetchXML schema.
	     * For efficiency, start with the "entity" node
	     * @param {boolean} fetchAll Switch to enable paging
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Fetch = function (fetchCore, fetchAll, callback) {
	        var fetchXml = fetchCore;
	        if (fetchCore.slice(0, 7) === "<entity") {
	            fetchXml = "\n                <fetch mapping=\"logical\">\n                    " + fetchCore.replace(/\"/g, "'") + "\n                </fetch>\n            ";
	        }
	        else {
	            var isAggregate = (fetchCore.indexOf("aggregate=") !== -1);
	            var isLimitedReturn = (fetchCore.indexOf("page='1'") !== -1 && fetchCore.indexOf("count='") !== -1);
	            var distinctPos = fetchCore.indexOf("distinct=");
	            var isDistinct = (distinctPos !== -1);
	            var valQuotes = fetchCore.substring(distinctPos + 9, distinctPos + 10);
	            var distinctValue = isDistinct
	                ? fetchCore.substring(fetchCore.indexOf("distinct=") + 10, fetchCore.indexOf(valQuotes, fetchCore.indexOf("distinct=") + 10))
	                : "false";
	            var xmlDoc = HelperSoap_1.xmlParser(fetchCore);
	            var fetchEntity = HelperSoap_1.selectSingleNode(xmlDoc, "//entity");
	            if (fetchEntity === null) {
	                throw new Error("XrmServiceToolkit.Fetch: No 'entity' node in the provided FetchXML.");
	            }
	            var fetchCoreDom = fetchEntity;
	            try {
	                fetchCore = HelperSoap_1.xmlToString(fetchCoreDom).replace(/\"/g, "'");
	            }
	            catch (error) {
	                if (fetchCoreDom !== undefined && fetchCoreDom.xml) {
	                    fetchCore = fetchCoreDom.xml.replace(/\"/g, "'");
	                }
	                else {
	                    throw new Error("XrmServiceToolkit.Fetch: This client does not provide the necessary XML features to continue.");
	                }
	            }
	            if (!isAggregate && !isLimitedReturn) {
	                fetchXml = "\n                    <fetch mapping=\"logical\" distinct=\"" + (isDistinct ? distinctValue : "false") + "\"'\" >\n                        " + fetchCore + "\n                    </fetch>\n                ";
	            }
	        }
	        var request = "\n            <request i:type=\"a:RetrieveMultipleRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Query</b:key>\n                        <b:value i:type=\"a:FetchExpression\">\n                            <a:Query>" + Helper_1.crmXmlEncode(fetchXml) + "</a:Query>\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\"/>\n                <a:RequestName>RetrieveMultiple</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var fetchResult = HelperSoap_1.selectSingleNode(resultXml, "//a:Entities");
	            var moreRecords = (HelperSoap_1.selectSingleNodeText(resultXml, "//a:MoreRecords") === "true");
	            var fetchResults = [];
	            if (fetchResult != null) {
	                for (var ii = 0, olength = fetchResult.childNodes.length; ii < olength; ii++) {
	                    var entity = new HelperSoap_1.businessEntity();
	                    entity.deserialize(fetchResult.childNodes[ii]);
	                    fetchResults.push(entity);
	                }
	                if (fetchAll && moreRecords) {
	                    var pageCookie = HelperSoap_1.selectSingleNodeText(resultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
	                    HelperSoap_1.fetchMore(fetchCore, 2, pageCookie, fetchResults);
	                }
	                if (!async) {
	                    return fetchResults;
	                }
	                else {
	                    callback(fetchResults);
	                }
	            }
	            // ReSharper disable once NotAllPathsReturnValue
	        });
	    };
	    /**
	     * Sends synchronous/asynchronous request to retrieve a record
	     *
	     * @param {string} entityName A JavaScript String corresponding to the Schema name of
	     * entity that is used for retrieve operations
	     * @param {string} id A JavaScript String corresponding to the GUID of
	     * entity that is used for retrieve operations
	     * @param {Array} columnSet  A JavaScript Array corresponding to the attributes of
	     * entity that is used for retrieve operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Retrieve = function (entityName, id, columnSet, callback) {
	        var attributes = "";
	        // ReSharper disable AssignedValueIsNeverUsed
	        var query = "";
	        // ReSharper restore AssignedValueIsNeverUsed
	        if (columnSet != null) {
	            for (var i = 0, ilength = columnSet.length; i < ilength; i++) {
	                attributes += "<c:string>" + columnSet[i] + "</c:string>";
	            }
	            query = "<a:AllColumns>false</a:AllColumns>" +
	                "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
	                attributes +
	                "</a:Columns>";
	        }
	        else {
	            query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
	        }
	        var msgBody = "\n            <request i:type=\"a:RetrieveRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Target</b:key>\n                        <b:value i:type=\"a:EntityReference\">\n                            <a:Id>" + HelperSoap_1.encodeValue(id) + "</a:Id>\n                            <a:LogicalName>" + entityName + "</a:LogicalName>\n                            <a:Name i:nil=\"true\" />\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>ColumnSet</b:key>\n                        <b:value i:type=\"a:ColumnSet\">\n                            " + query + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Retrieve</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(msgBody, "Execute", !!callback, function (resultXml) {
	            var retrieveResult = HelperSoap_1.selectSingleNode(resultXml, "//b:value");
	            var entity = new HelperSoap_1.businessEntity();
	            entity.deserialize(retrieveResult);
	            if (!async) {
	                return entity;
	            }
	            else {
	                callback(entity);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a retrieveMultiple request
	     *
	     * @param {string} query A JavaScript String with properties corresponding to the retrievemultiple request
	     * that are valid for retrievemultiple operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.RetrieveMultiple = function (query, callback) {
	        var request = "\n            <request i:type=\"a:RetrieveMultipleRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Query</b:key>\n                        <b:value i:type=\"a:QueryExpression\">\n                            " + query + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\"/>\n                <a:RequestName>RetrieveMultiple</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var resultNodes = HelperSoap_1.selectSingleNode(resultXml, "//a:Entities");
	            var retriveMultipleResults = [];
	            for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
	                var entity = new HelperSoap_1.businessEntity();
	                entity.deserialize(resultNodes.childNodes[i]);
	                retriveMultipleResults[i] = entity;
	            }
	            if (!async) {
	                return retriveMultipleResults;
	            }
	            else {
	                callback(retriveMultipleResults);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a queryByAttribute request
	     *
	     * @static
	     * @param {*} queryOptions A JavaScript Object with properties corresponding to the queryByAttribute Criteria
	     * that are valid for queryByAttribute operations.
	     * queryOptions.entityName is a string represents the name of the entity
	     * queryOptions.attributes is a array represents the attributes of the entity to query
	     * queryOptions.values is a array represents the values of the attributes to query
	     * queryOptions.columnSet is a array represents the attributes of the entity to return
	     * queryOptions.orderBy is a array represents the order conditions of the results
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.QueryByAttribute = function (queryOptions, callback) {
	        var entityName = queryOptions.entityName;
	        var attributes = queryOptions.attributes;
	        var values = queryOptions.values;
	        var columnSet = queryOptions.columnSet;
	        var orderBy = queryOptions.orderBy || "";
	        attributes = HelperSoap_1.isArray(attributes) ? attributes : [attributes];
	        values = HelperSoap_1.isArray(values) ? values : [values];
	        orderBy = (!!orderBy && HelperSoap_1.isArray(orderBy)) ? orderBy : [orderBy];
	        columnSet = (!!columnSet && HelperSoap_1.isArray(columnSet)) ? columnSet : [columnSet];
	        var xml = "\n            <entity name=\"" + entityName + "\">\n                    " + HelperSoap_1.joinArray("<attribute name='", columnSet, "' />") + "\n                    " + HelperSoap_1.joinArray("<order attribute='", orderBy, "' />") + "\n                <filter>\n                    " + HelperSoap_1.joinConditionPair(attributes, values) + "\n                </filter>\n            </entity>\n        ";
	        return this.Fetch(xml, false, callback);
	    };
	    ;
	    /**
	     * Sends synchronous/asynchronous request to do a queryAll request. This is to return all records (>5k+).
	     * Consider Performance impact when using this method.
	     *
	     * @static
	     * @param {*} queryOptions A JavaScript Object with properties corresponding to the queryByAttribute Criteria
	     * that are valid for queryByAttribute operations.
	     * queryOptions.entityName is a string represents the name of the entity
	     * queryOptions.attributes is a array represents the attributes of the entity to query
	     * queryOptions.values is a array represents the values of the attributes to query
	     * queryOptions.columnSet is a array represents the attributes of the entity to return
	     * queryOptions.orderBy is a array represents the order conditions of the results
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.QueryAll = function (queryOptions, callback) {
	        var entityName = queryOptions.entityName;
	        var attributes = queryOptions.attributes;
	        var values = queryOptions.values;
	        var columnSet = queryOptions.columnSet;
	        var orderBy = queryOptions.orderBy || '';
	        attributes = HelperSoap_1.isArray(attributes) ? attributes : [attributes];
	        values = HelperSoap_1.isArray(values) ? values : [values];
	        orderBy = (!!orderBy && HelperSoap_1.isArray(orderBy)) ? orderBy : [orderBy];
	        columnSet = (!!columnSet && HelperSoap_1.isArray(columnSet)) ? columnSet : [columnSet];
	        var fetchCore = "\n            <entity name=\"" + entityName + "\">\n                    " + HelperSoap_1.joinArray("<attribute name='", columnSet, "' />") + "\n                    " + HelperSoap_1.joinArray("<order attribute='", orderBy, "' />") + "\n                <filter>\n                        " + HelperSoap_1.joinConditionPair(attributes, values) + "\n                </filter>\n            </entity>\n        ";
	        return this.Fetch(fetchCore, true, callback);
	    };
	    /**
	     * Sends synchronous/asynchronous request to setState of a record
	     *
	     * @static
	     * @param {string} entityName A JavaScript String corresponding to the Schema name of
	     * entity that is used for setState operations.
	     * @param {string} id A JavaScript String corresponding to the GUID of
	     * entity that is used for setState operations
	     * @param {number} stateCode A JavaScript Integer corresponding to the value of
	     * entity state that is used for setState operations
	     * @param {number} statusCode A JavaScript Integer corresponding to the value of
	     * entity status that is used for setState operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.SetState = function (entityName, id, stateCode, statusCode, callback) {
	        var request = "\n            <request i:type=\"b:SetStateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <c:key>EntityMoniker</c:key>\n                        <c:value i:type=\"a:EntityReference\">\n                            <a:Id>" + HelperSoap_1.encodeValue(id) + "</a:Id>\n                            <a:LogicalName>" + entityName + "</a:LogicalName>\n                            <a:Name i:nil=\"true\" />\n                        </c:value>\n                        </a:KeyValuePairOfstringanyType>\n                        <a:KeyValuePairOfstringanyType>\n                            <c:key>State</c:key>\n                            <c:value i:type=\"a:OptionSetValue\">\n                             <a:Value>" + stateCode.toString() + "</a:Value>\n                            </c:value>\n                        </a:KeyValuePairOfstringanyType>\n                        <a:KeyValuePairOfstringanyType>\n                            <c:key>Status</c:key>\n                            <c:value i:type=\"a:OptionSetValue\">\n                             <a:Value>" + statusCode.toString() + "</a:Value>\n                            </c:value>\n                        </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>SetState</a:RequestName>\n            </request>\n       ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to associate records
	     *
	     * @static
	     * @param {string} relationshipName A JavaScript String corresponding to the relationship name
	     * that is used for associate operations
	     * @param {string} targetEntityName A JavaScript String corresponding to the relationship name
	     * that is used for associate operations
	     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
	     * that is used for associate operations
	     * @param {string} relatedEntityName A JavaScript String corresponding to the schema name of the related entity
	     * that is used for associate operations
	     * @param {Array<businessEntity>} relatedBusinessEntities A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
	     * that is used for associate operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
	        var relatedEntities = relatedBusinessEntities;
	        relatedEntities = HelperSoap_1.isArray(relatedEntities) ? relatedEntities : [relatedEntities];
	        var output = [];
	        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
	            if (relatedEntities[i].id !== "") {
	                output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>");
	            }
	        }
	        var relatedXml = output.join("");
	        var request = "\n            <request i:type=\"a:AssociateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Target</b:key>\n                        <b:value i:type=\"a:EntityReference\">\n                            <a:Id>" + HelperSoap_1.encodeValue(targetId) + "</a:Id>\n                            <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                            <a:Name i:nil=\"true\" />\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Relationship</b:key>\n                        <b:value i:type=\"a:Relationship\">\n                            <a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>\n                            <a:SchemaName>" + relationshipName + "</a:SchemaName>\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <b:key>RelatedEntities</b:key>\n                    <b:value i:type=\"a:EntityReferenceCollection\">\n                        " + relatedXml + "\n                    </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Associate</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to disassociate records
	     *
	     * @static
	     * @param {string} relationshipName A JavaScript String corresponding to the relationship name
	     * that is used for associate operations
	     * @param {string} targetEntityName A JavaScript String corresponding to the relationship name
	     * that is used for associate operations
	     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
	     * that is used for associate operations
	     * @param {string} relatedEntityName A JavaScript String corresponding to the schema name of the related entity
	     * that is used for associate operations
	     * @param {Array<businessEntity>} relatedBusinessEntities A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
	     * that is used for associate operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     * @returns {(void | any)} If sync -> results
	     */
	    Soap.Disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
	        var relatedEntities = relatedBusinessEntities;
	        relatedEntities = HelperSoap_1.isArray(relatedEntities) ? relatedEntities : [relatedEntities];
	        var output = [];
	        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
	            if (relatedEntities[i].id !== "") {
	                output.push("<a:EntityReference>", "<a:Id>", relatedEntities[i].id, "</a:Id>", "<a:LogicalName>", relatedEntityName, "</a:LogicalName>", "<a:Name i:nil='true' />", "</a:EntityReference>");
	            }
	        }
	        var relatedXml = output.join("");
	        var request = "\n            <request i:type=\"a:DisassociateRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Target</b:key>\n                        <b:value i:type=\"a:EntityReference\">\n                            <a:Id>" + HelperSoap_1.encodeValue(targetId) + "</a:Id>\n                            <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                            <a:Name i:nil=\"true\" />\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>Relationship</b:key>\n                        <b:value i:type=\"a:Relationship\">\n                            <a:PrimaryEntityRole i:nil=\"true\" />\n                            <a:SchemaName>" + relationshipName + "</a:SchemaName>\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <b:key>RelatedEntities</b:key>\n                    <b:value i:type=\"a:EntityReferenceCollection\">\n                        " + relatedXml + "\n                    </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Disassociate</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous request to retrieve the GUID of the current user
	     *
	     * @static
	     * @returns {string} (description)
	     */
	    Soap.GetCurrentUserId = function () {
	        var request = "\n            <request i:type=\"b:WhoAmIRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\" />\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>WhoAmI</a:RequestName>\n            </request>\n        ";
	        var xmlDoc = HelperSoap_1.doRequest(request, "Execute");
	        return HelperSoap_1.getNodeText(HelperSoap_1.selectNodes(xmlDoc, "//b:value")[0]);
	    };
	    /**
	     * Sends synchronous request to retrieve the GUID of the current user's business unit
	     *
	     * @static
	     * @returns {string}
	     */
	    Soap.GetCurrentUserBusinessUnitId = function () {
	        var request = "\n            <request i:type=\"b:WhoAmIRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\" />\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>WhoAmI</a:RequestName>\n            </request>\n        ";
	        var xmlDoc = HelperSoap_1.doRequest(request, "Execute");
	        return HelperSoap_1.getNodeText(HelperSoap_1.selectNodes(xmlDoc, "//b:value")[1]);
	    };
	    /**
	     * Sends synchronous request to retrieve the list of the current user's roles
	     *
	     * @static
	     * @returns {Array<string>} All roles of the current user
	     */
	    Soap.GetCurrentUserRoles = function () {
	        var xml = "\n            <fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\">\n                <entity name=\"role\">\n                <attribute name=\"name\" />\n                <attribute name=\"businessunitid\" />\n                <attribute name=\"roleid\" />\n                <order attribute=\"name\" descending=\"false\" /> +\n                <link-entity name=\"systemuserroles\" from=\"roleid\" to=\"roleid\" visible=\"false\" intersect=\"true\">\n                    <link-entity name=\"systemuser\" from=\"systemuserid\" to=\"systemuserid\" alias=\"aa\">\n                    <filter type=\"and\">\n                        <condition attribute=\"systemuserid\" operator=\"eq-userid\" />\n                    </filter>\n                    </link-entity>\n                </link-entity>\n                </entity>\n            </fetch>\n        ";
	        var fetchResult = this.Fetch(xml);
	        var roles = [];
	        if (fetchResult !== null && typeof fetchResult != "undefined") {
	            for (var i = 0, ilength = fetchResult.length; i < ilength; i++) {
	                roles[i] = fetchResult[i].attributes["name"].value;
	            }
	        }
	        return roles;
	    };
	    /**
	     * Sends synchronous request to check if the current user has certain roles
	     * Passes name of role as arguments. For example, IsCurrentUserInRole('System Administrator')
	     * Returns true or false
	     *
	     * @static
	     * @returns {boolean}
	     */
	    Soap.IsCurrentUserInRole = function () {
	        var roles = this.GetCurrentUserRoles();
	        for (var i = 0, ilength = roles.length; i < ilength; i++) {
	            for (var j = 0, jlength = arguments.length; j < jlength; j++) {
	                if (roles[i] === arguments[j]) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    };
	    /**
	     * Sends synchronous/asynchronous request to assign an existing record to a user / a team
	     *
	     * @static
	     * @param {string} targetEntityName A JavaScript String corresponding to the schema name of the target entity
	     * that is used for assign operations
	     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
	     * that is used for assign operations
	     * @param {string} assigneeEntityName A JavaScript String corresponding to the schema name of the assignee entity
	     * that is used for assign operations
	     * @param {string} assigneeId A JavaScript String corresponding to the GUID of the assignee entity
	     * that is used for assign operations
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.Assign = function (targetEntityName, targetId, assigneeEntityName, assigneeId, callback) {
	        var request = "\n            <request i:type=\"b:AssignRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Target</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(targetId) + "</a:Id>\n                        <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Assignee</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(assigneeId) + "</a:Id>\n                        <a:LogicalName>" + assigneeEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>Assign</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a grantAccess request.
	     * Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and * WriteAccess
	     *
	     * @static
	     * @param {*} accessOptions A JavaScript Object with properties corresponding to the grantAccess Criteria
	     * that are valid for grantAccess operations.
	     * accessOptions.targetEntityName is a string represents the name of the target entity
	     * accessOptions.targetEntityId is a string represents the GUID of the target entity
	     * accessOptions.principalEntityName is a string represents the name of the principal entity
	     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
	     * accessOptions.accessRights is a array represents the access conditions of the results
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.GrantAccess = function (accessOptions, callback) {
	        var targetEntityName = accessOptions.targetEntityName;
	        var targetEntityId = accessOptions.targetEntityId;
	        var principalEntityName = accessOptions.principalEntityName;
	        var principalEntityId = accessOptions.principalEntityId;
	        var accessRights = accessOptions.accessRights;
	        accessRights = HelperSoap_1.isArray(accessRights) ? accessRights : [accessRights];
	        var accessRightString = "";
	        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
	            accessRightString += HelperSoap_1.encodeValue(accessRights[i]) + " ";
	        }
	        var request = "\n            <request i:type=\"b:GrantAccessRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Target</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(targetEntityId) + "</a:Id>\n                        <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>PrincipalAccess</c:key>\n                    <c:value i:type=\"b:PrincipalAccess\">\n                        <b:AccessMask>" + accessRightString + "</b:AccessMask>\n                        <b:Principal>\n                        <a:Id>" + HelperSoap_1.encodeValue(principalEntityId) + "</a:Id>\n                        <a:LogicalName>" + principalEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                        </b:Principal>\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>GrantAccess</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a modifyAccess request.
	     * Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and * WriteAccess
	     *
	     * @static
	     * @param {*} accessOptions A JavaScript Object with properties corresponding to the modifyAccess Criteria
	     * that are valid for modifyAccess operations.
	     * accessOptions.targetEntityName is a string represents the name of the target entity
	     * accessOptions.targetEntityId is a string represents the GUID of the target entity
	     * accessOptions.principalEntityName is a string represents the name of the principal entity
	     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
	     * accessOptions.accessRights is a array represents the access conditions of the results
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.ModifyAccess = function (accessOptions, callback) {
	        var targetEntityName = accessOptions.targetEntityName;
	        var targetEntityId = accessOptions.targetEntityId;
	        var principalEntityName = accessOptions.principalEntityName;
	        var principalEntityId = accessOptions.principalEntityId;
	        var accessRights = accessOptions.accessRights;
	        accessRights = HelperSoap_1.isArray(accessRights) ? accessRights : [accessRights];
	        var accessRightString = "";
	        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
	            accessRightString += HelperSoap_1.encodeValue(accessRights[i]) + " ";
	        }
	        var request = "\n            <request i:type=\"b:ModifyAccessRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Target</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(targetEntityId) + "</a:Id>\n                        <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>PrincipalAccess</c:key>\n                    <c:value i:type=\"b:PrincipalAccess\">\n                        <b:AccessMask>" + accessRightString + "</b:AccessMask>\n                        <b:Principal>\n                        <a:Id>" + HelperSoap_1.encodeValue(principalEntityId) + "</a:Id>\n                        <a:LogicalName>" + principalEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                        </b:Principal>\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>ModifyAccess</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a revokeAccess request
	     *
	     * @static
	     * @param {*} accessOptions A JavaScript Object with properties corresponding to the revokeAccess Criteria
	     * that are valid for revokeAccess operations.
	     * accessOptions.targetEntityName is a string represents the name of the target entity
	     * accessOptions.targetEntityId is a string represents the GUID of the target entity
	     * accessOptions.revokeeEntityName is a string represents the name of the revokee entity
	     * accessOptions.revokeeEntityId is a string represents the GUID of the revokee entity
	     * @param {Function} callback Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.RevokeAccess = function (accessOptions, callback) {
	        var targetEntityName = accessOptions.targetEntityName;
	        var targetEntityId = accessOptions.targetEntityId;
	        var revokeeEntityName = accessOptions.revokeeEntityName;
	        var revokeeEntityId = accessOptions.revokeeEntityId;
	        var request = "\n            <request i:type=\"b:RevokeAccessRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">\n                <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Target</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(targetEntityId) + "</a:Id>\n                        <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Revokee</c:key>\n                    <c:value i:type=\"a:EntityReference\">\n                        <a:Id>" + HelperSoap_1.encodeValue(revokeeEntityId) + "</a:Id>\n                        <a:LogicalName>" + revokeeEntityName + "</a:LogicalName>\n                        <a:Name i:nil=\"true\" />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>RevokeAccess</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var responseText = HelperSoap_1.selectSingleNodeText(resultXml, "//ser:ExecuteResult");
	            var result = Helper_1.crmXmlDecode(responseText);
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends synchronous/asynchronous request to do a retrievePrincipalAccess request
	     *
	     * @static
	     * @param {*} accessOptions A JavaScript Object with properties corresponding to the retrievePrincipalAccess Criteria
	     * that are valid for retrievePrincipalAccess operations.
	     * accessOptions.targetEntityName is a string represents the name of the target entity
	     * accessOptions.targetEntityId is a string represents the GUID of the target entity
	     * accessOptions.principalEntityName is a string represents the name of the principal entity
	     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
	     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
	     */
	    Soap.RetrievePrincipalAccess = function (accessOptions, callback) {
	        var targetEntityName = accessOptions.targetEntityName;
	        var targetEntityId = accessOptions.targetEntityId;
	        var principalEntityName = accessOptions.principalEntityName;
	        var principalEntityId = accessOptions.principalEntityId;
	        var request = "\n            <request i:type='b:RetrievePrincipalAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>\n                <a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Target</c:key>\n                    <c:value i:type='a:EntityReference'>\n                        <a:Id>" + HelperSoap_1.encodeValue(targetEntityId) + "</a:Id>\n                        <a:LogicalName>" + targetEntityName + "</a:LogicalName>\n                        <a:Name i:nil='true' />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                    <c:key>Principal</c:key>\n                    <c:value i:type='a:EntityReference'>\n                        <a:Id>" + HelperSoap_1.encodeValue(principalEntityId) + "</a:Id>\n                        <a:LogicalName>" + principalEntityName + "</a:LogicalName>\n                        <a:Name i:nil='true' />\n                    </c:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil='true' />\n                <a:RequestName>RetrievePrincipalAccess</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var result = HelperSoap_1.selectSingleNodeText(resultXml, "//b:value");
	            if (!async) {
	                return result;
	            }
	            else {
	                callback(result);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends an synchronous/asynchronous RetrieveAllEntitieMetadata Request to retrieve all entities metadata in the system
	     *
	     * @static
	     * @param {Array<string>} entityFilters The filter array available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
	     * Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
	     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
	     * @param {Function} callback The function that will be passed through and be called by a successful response.
	     * This function also used as an indicator if the function is synchronous/asynchronous
	     * @returns {(void | any)} Entity Metadata Collection
	     */
	    Soap.RetrieveAllEntitiesMetadata = function (entityFilters, retrieveIfPublished, callback) {
	        entityFilters = HelperSoap_1.isArray(entityFilters) ? entityFilters : [entityFilters];
	        var entityFiltersString = "";
	        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
	            entityFiltersString += HelperSoap_1.encodeValue(entityFilters[iii]) + " ";
	        }
	        var request = "\n            <request i:type=\"a:RetrieveAllEntitiesRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>EntityFilters</b:key>\n                        <b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">\n                        " + HelperSoap_1.encodeValue(entityFiltersString) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>RetrieveAsIfPublished</b:key>\n                        <b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(retrieveIfPublished.toString()) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>RetrieveAllEntities</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var response = HelperSoap_1.selectNodes(resultXml, "//c:EntityMetadata");
	            var results = [];
	            for (var i = 0, ilength = response.length; i < ilength; i++) {
	                var a = HelperSoap_1.objectifyNode(response[i]);
	                a._type = "EntityMetadata";
	                results.push(a);
	            }
	            if (!async) {
	                return results;
	            }
	            else {
	                callback(results);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends an synchronous/asynchronous RetreiveEntityMetadata Request to retrieve a particular entity metadata in the system
	     *
	     * @static
	     * @param {string} entityFilters The filter string available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
	     * Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time
	     * @param {string} logicalName The string of the entity logical name
	     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
	     * @param {Function} callback The function that will be passed through and be called by a successful response.
	     * This function also used as an indicator if the function is synchronous/asynchronous
	     * @returns {(void | any)} Entity Metadata
	     */
	    Soap.RetrieveEntityMetadata = function (entityFilters, logicalName, retrieveIfPublished, callback) {
	        entityFilters = HelperSoap_1.isArray(entityFilters) ? entityFilters : [entityFilters];
	        var entityFiltersString = "";
	        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
	            entityFiltersString += HelperSoap_1.encodeValue(entityFilters[iii]) + " ";
	        }
	        var request = "\n            <request i:type=\"a:RetrieveEntityRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>EntityFilters</b:key>\n                        <b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">\n                        " + HelperSoap_1.encodeValue(entityFiltersString) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>MetadataId</b:key>\n                        <b:value i:type=\"c:guid\"  xmlns:c=\"http://schemas.microsoft.com/2003/10/Serialization/\">\n                        " + HelperSoap_1.encodeValue("00000000-0000-0000-0000-000000000000") + "\n                        </b:value>\"\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>RetrieveAsIfPublished</b:key>\n                        <b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(retrieveIfPublished.toString()) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>LogicalName</b:key>\n                        <b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(logicalName) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>RetrieveEntity</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var response = HelperSoap_1.selectNodes(resultXml, "//b:value");
	            var results = [];
	            for (var i = 0, ilength = response.length; i < ilength; i++) {
	                var a = HelperSoap_1.objectifyNode(response[i]);
	                a._type = "EntityMetadata";
	                results.push(a);
	            }
	            if (!async) {
	                return results;
	            }
	            else {
	                callback(results);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    /**
	     * Sends an synchronous/asynchronous RetrieveAttributeMetadata Request to retrieve a particular entity's attribute metadata in the system
	     *
	     * @static
	     * @param {string} entityLogicalName The string of the entity logical name
	     * @param {string} attributeLogicalName The string of the entity's attribute logical name
	     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
	     * @param {Function} callback The function that will be passed through and be called by a successful response.
	     * This function also used as an indicator if the function is synchronous/asynchronous
	     * @returns {(void | any)} Entity Metadata
	     */
	    Soap.RetrieveAttributeMetadata = function (entityLogicalName, attributeLogicalName, retrieveIfPublished, callback) {
	        var request = "\n            <request i:type=\"a:RetrieveAttributeRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n                <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>EntityLogicalName</b:key>\n                        <b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(entityLogicalName) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>MetadataId</b:key>\n                        <b:value i:type=\"ser:guid\"  xmlns:ser=\"http://schemas.microsoft.com/2003/10/Serialization/\">\n                        " + HelperSoap_1.encodeValue("00000000-0000-0000-0000-000000000000") + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>RetrieveAsIfPublished</b:key>\n                        <b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(retrieveIfPublished.toString()) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                    <a:KeyValuePairOfstringanyType>\n                        <b:key>LogicalName</b:key>\n                        <b:value i:type=\"c:string\"   xmlns:c=\"http://www.w3.org/2001/XMLSchema\">\n                        " + HelperSoap_1.encodeValue(attributeLogicalName) + "\n                        </b:value>\n                    </a:KeyValuePairOfstringanyType>\n                </a:Parameters>\n                <a:RequestId i:nil=\"true\" />\n                <a:RequestName>RetrieveAttribute</a:RequestName>\n            </request>\n        ";
	        var async = !!callback;
	        return HelperSoap_1.doRequest(request, "Execute", async, function (resultXml) {
	            var response = HelperSoap_1.selectNodes(resultXml, "//b:value");
	            var results = [];
	            for (var i = 0, ilength = response.length; i < ilength; i++) {
	                var a = HelperSoap_1.objectifyNode(response[i]);
	                results.push(a);
	            }
	            if (!async) {
	                return results;
	            }
	            else {
	                callback(results);
	            }
	            // ReSharper disable NotAllPathsReturnValue
	        });
	        // ReSharper restore NotAllPathsReturnValue
	    };
	    return Soap;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Soap;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/main.d.ts" />
	"use strict";
	var Helper_1 = __webpack_require__(3);
	function padNumber(s, len) {
	    len = len || 2;
	    var str = s.toString();
	    while (str.length < len) {
	        str = "0" + str;
	    }
	    return str;
	}
	exports.padNumber = padNumber;
	function encodeDate(dateTime) {
	    return dateTime.getFullYear() + "-" +
	        padNumber(dateTime.getMonth() + 1) + "-" +
	        padNumber(dateTime.getDate()) + "T" +
	        padNumber(dateTime.getHours()) + ":" +
	        padNumber(dateTime.getMinutes()) + ":" +
	        padNumber(dateTime.getSeconds());
	}
	exports.encodeDate = encodeDate;
	function encodeValue(value) {
	    // Handle GUIDs wrapped in braces
	    if (typeof value == typeof "" && value.slice(0, 1) === "{" && value.slice(-1) === "}") {
	        value = value.slice(1, -1);
	    }
	    // ReSharper disable QualifiedExpressionMaybeNull
	    return (typeof value === "object" && value.getTime)
	        ? encodeDate(value)
	        : Helper_1.crmXmlEncode(value);
	}
	exports.encodeValue = encodeValue;
	var xrmValue = (function () {
	    function xrmValue(sType, sValue) {
	        this.type = sType;
	        this.value = sValue;
	    }
	    return xrmValue;
	}());
	exports.xrmValue = xrmValue;
	var xrmEntityReference = (function () {
	    function xrmEntityReference(gId, sLogicalName, sName) {
	        this.id = gId;
	        this.logicalName = sLogicalName;
	        this.name = sName;
	        this.type = 'EntityReference';
	    }
	    return xrmEntityReference;
	}());
	exports.xrmEntityReference = xrmEntityReference;
	var xrmEntityCollection = (function () {
	    function xrmEntityCollection(items) {
	        this.value = items;
	        this.type = 'EntityCollection';
	    }
	    return xrmEntityCollection;
	}());
	exports.xrmEntityCollection = xrmEntityCollection;
	var xrmOptionSetValue = (function () {
	    function xrmOptionSetValue(iValue, sFormattedValue) {
	        this.value = iValue;
	        this.formattedValue = sFormattedValue;
	        this.type = "OptionSetValue";
	    }
	    return xrmOptionSetValue;
	}());
	exports.xrmOptionSetValue = xrmOptionSetValue;
	/**
	 * A object represents a business entity for CRM 2011
	 *
	 * @export
	 * @param {string} logicalName A String represents the name of the entity.
	 * For example, "contact" means the business entity will be a contact entity
	 * @param {string} id A String represents the id of the entity. If not passed, it will be auto populated as a empty guid string
	 */
	var businessEntity = (function () {
	    function businessEntity(logicalName, id) {
	        this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
	        this.logicalName = logicalName;
	        this.attributes = Object.create(null);
	    }
	    /**
	    * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
	    * @return {String} The serialized XML string of CRM entity.
	    */
	    businessEntity.prototype.serialize = function () {
	        var xml = ["<b:value i:type='a:Entity'>"];
	        xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
	        var attributes = this.attributes;
	        for (var attributeName in attributes) {
	            if (attributes.hasOwnProperty(attributeName)) {
	                var attribute = attributes[attributeName];
	                xml.push("<a:KeyValuePairOfstringanyType>");
	                xml.push("<b:key>", attributeName, "</b:key>");
	                if (attribute === null || attribute.value === null) {
	                    xml.push("<b:value i:nil='true' />");
	                }
	                else {
	                    var sType = (!attribute.type)
	                        ? typeof attribute
	                        : Helper_1.crmXmlEncode(attribute.type);
	                    var value = void 0;
	                    var encodedValue = void 0;
	                    var id = void 0;
	                    var encodedId = void 0;
	                    var logicalName = void 0;
	                    var encodedLogicalName = void 0;
	                    switch (sType) {
	                        case "OptionSetValue":
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            encodedValue = encodeValue(value);
	                            xml.push("<b:value i:type='a:OptionSetValue'>");
	                            xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
	                            break;
	                        case "EntityCollection":
	                            xml.push("<b:value i:type='a:EntityCollection'>");
	                            xml.push("<a:Entities>");
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            var collections = isArray(value) ? value : [value];
	                            for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
	                                var item = collections[i];
	                                id = (item.hasOwnProperty("id")) ? item["id"] : item;
	                                encodedId = encodeValue(id);
	                                logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
	                                encodedLogicalName = encodeValue(logicalName);
	                                xml.push("<a:Entity>");
	                                xml.push("<a:Attributes>");
	                                xml.push("<a:KeyValuePairOfstringanyType>");
	                                xml.push("<b:key>partyid</b:key>");
	                                xml.push("<b:value i:type='a:EntityReference'>");
	                                xml.push("<a:Id>", encodedId, "</a:Id>");
	                                if (Xrm.Utility.openQuickCreate !== undefined) {
	                                    xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
	                                }
	                                xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
	                                xml.push("<a:Name i:nil='true' />");
	                                if (Xrm.Utility.openQuickCreate !== undefined) {
	                                    xml.push("<a:RowVersion i:nil='true' />");
	                                }
	                                xml.push("</b:value>");
	                                xml.push("</a:KeyValuePairOfstringanyType>");
	                                xml.push("</a:Attributes>");
	                                xml.push("<a:EntityState i:nil='true' />");
	                                xml.push("<a:FormattedValues />");
	                                xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>");
	                                xml.push("<a:LogicalName>activityparty</a:LogicalName>");
	                                xml.push("<a:RelatedEntities />");
	                                xml.push("</a:Entity>");
	                            }
	                            xml.push("</a:Entities>");
	                            xml.push("<a:EntityName i:nil='true' />");
	                            xml.push("<a:MinActiveRowVersion i:nil='true' />");
	                            xml.push("<a:MoreRecords>false</a:MoreRecords>");
	                            xml.push("<a:PagingCookie i:nil='true' />");
	                            xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>");
	                            xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>");
	                            xml.push("</b:value>");
	                            break;
	                        case "EntityReference":
	                            id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
	                            encodedId = encodeValue(id);
	                            logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
	                            encodedLogicalName = encodeValue(logicalName);
	                            xml.push("<b:value i:type='a:EntityReference'>");
	                            xml.push("<a:Id>", encodedId, "</a:Id>");
	                            if (Xrm.Utility.openQuickCreate !== undefined) {
	                                xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
	                            }
	                            xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
	                            xml.push("<a:Name i:nil='true' />");
	                            if (Xrm.Utility.openQuickCreate !== undefined) {
	                                xml.push("<a:RowVersion i:nil='true' />");
	                            }
	                            xml.push("</b:value>");
	                            break;
	                        case "Money":
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            encodedValue = encodeValue(value);
	                            xml.push("<b:value i:type='a:Money'>");
	                            xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
	                            break;
	                        case "guid":
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            encodedValue = encodeValue(value);
	                            xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
	                            xml.push(encodedValue, "</b:value>");
	                            break;
	                        case "number":
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            encodedValue = encodeValue(value);
	                            var oType = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:decimal";
	                            xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
	                            xml.push(encodedValue, '</b:value>');
	                            break;
	                        default:
	                            value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
	                            encodedValue = encodeValue(value);
	                            sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
	                            xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>");
	                            break;
	                    }
	                }
	                xml.push("</a:KeyValuePairOfstringanyType>");
	            }
	        }
	        xml.push("</a:Attributes><a:EntityState i:nil='true' />");
	        xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
	        xml.push("<a:Id>", encodeValue(this.id), "</a:Id>");
	        xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>");
	        xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
	        xml.push("</b:value>");
	        return xml.join("");
	    };
	    /**
	    * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
	    * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
	    */
	    businessEntity.prototype.deserialize = function (resultNode) {
	        var obj = Object.create(null);
	        var resultNodes = resultNode.childNodes;
	        for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
	            var sKey = void 0;
	            var parentNode = resultNodes[j];
	            switch (parentNode.nodeName) {
	                case "a:Attributes":
	                    var attr = parentNode;
	                    for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
	                        var tempParentNode = attr.childNodes[k];
	                        // Establish the Key for the Attribute
	                        var tempParentNodeChildNodes = tempParentNode.childNodes;
	                        sKey = getNodeText(tempParentNodeChildNodes[0]);
	                        var tempNode = tempParentNodeChildNodes[1];
	                        // Determine the Type of Attribute value we should expect
	                        var sType = tempNode.attributes.getNamedItem("i:type").value;
	                        // check for AliasedValue
	                        if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
	                            // reset the type to the actual attribute type
	                            var subNode = tempNode.childNodes[2];
	                            sType = subNode.attributes.getNamedItem("i:type").value;
	                            //sKey = getNodeText(tempNode.childNodes[1]) + "." + getNodeText(tempNode.childNodes[0]);
	                            // reset the node to the AliasedValue value node
	                            tempNode = subNode;
	                        }
	                        var entRef = void 0;
	                        var entCv = void 0;
	                        switch (sType) {
	                            case "a:OptionSetValue":
	                                var entOsv = new xrmOptionSetValue();
	                                entOsv.type = sType.replace('a:', '');
	                                entOsv.value = parseInt(getNodeText(tempNode));
	                                obj[sKey] = entOsv;
	                                break;
	                            case "a:EntityReference":
	                                entRef = new xrmEntityReference();
	                                entRef.type = sType.replace('a:', '');
	                                var oChildNodes = tempNode.childNodes;
	                                for (var i = 0, leni = oChildNodes.length; i < leni; i++) {
	                                    var entityReferenceNode = oChildNodes[i];
	                                    switch (entityReferenceNode.nodeName) {
	                                        case "a:Id":
	                                            entRef.id = getNodeText(entityReferenceNode);
	                                            break;
	                                        case "a:LogicalName":
	                                            entRef.logicalName = getNodeText(entityReferenceNode);
	                                            break;
	                                        case "a:Name":
	                                            entRef.name = getNodeText(entityReferenceNode);
	                                            break;
	                                    }
	                                }
	                                obj[sKey] = entRef;
	                                break;
	                            case "a:EntityCollection":
	                                entRef = new xrmEntityCollection();
	                                entRef.type = sType.replace('a:', '');
	                                //get all party items....
	                                var items = [];
	                                var partyNodes = tempNode.childNodes;
	                                for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
	                                    var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
	                                    for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
	                                        var itemNodeChildNodes = itemNodes[z].childNodes;
	                                        var nodeText = getNodeText(itemNodeChildNodes[0]);
	                                        if (nodeText === "partyid") {
	                                            var itemRef = new xrmEntityReference();
	                                            var partyListNodes = itemNodeChildNodes[1].childNodes;
	                                            for (var pi = 0, lenpi = partyListNodes.length; pi < lenpi; pi++) {
	                                                var partyReferenceNode = partyListNodes[i];
	                                                switch (partyReferenceNode.nodeName) {
	                                                    case "a:Id":
	                                                        itemRef.id = getNodeText(partyReferenceNode);
	                                                        break;
	                                                    case "a:LogicalName":
	                                                        itemRef.logicalName = getNodeText(partyReferenceNode);
	                                                        break;
	                                                    case "a:Name":
	                                                        itemRef.name = getNodeText(partyReferenceNode);
	                                                        break;
	                                                }
	                                            }
	                                            items[y] = itemRef;
	                                        }
	                                    }
	                                }
	                                entRef.value = items;
	                                obj[sKey] = entRef;
	                                break;
	                            case "a:Money":
	                                entCv = new xrmValue();
	                                entCv.type = sType.replace('a:', '');
	                                entCv.value = parseFloat(getNodeText(tempNode));
	                                obj[sKey] = entCv;
	                                break;
	                            default:
	                                entCv = new xrmValue();
	                                entCv.type = sType.replace('c:', '').replace('a:', '');
	                                if (entCv.type === "int") {
	                                    entCv.value = parseInt(getNodeText(tempNode));
	                                }
	                                else if (entCv.type === "decimal" || entCv.type === "double") {
	                                    entCv.value = parseFloat(getNodeText(tempNode));
	                                }
	                                else if (entCv.type === "dateTime") {
	                                    entCv.value = stringToDate(getNodeText(tempNode));
	                                }
	                                else if (entCv.type === "boolean") {
	                                    entCv.value = (getNodeText(tempNode) === 'false') ? false : true;
	                                }
	                                else {
	                                    entCv.value = getNodeText(tempNode);
	                                }
	                                obj[sKey] = entCv;
	                                break;
	                        }
	                    }
	                    this.attributes = obj;
	                    break;
	                case "a:Id":
	                    this.id = getNodeText(parentNode);
	                    break;
	                case "a:LogicalName":
	                    this.logicalName = getNodeText(parentNode);
	                    break;
	                case "a:FormattedValues":
	                    var foVal = parentNode;
	                    for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) {
	                        // Establish the Key, we are going to fill in the formatted value of the already found attribute
	                        var foNode = foVal.childNodes[o];
	                        sKey = getNodeText(foNode.childNodes[0]);
	                        this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]);
	                        if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
	                            this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
	                        }
	                    }
	                    break;
	            }
	        }
	    };
	    return businessEntity;
	}());
	exports.businessEntity = businessEntity;
	function stringToDate(s) {
	    var b = s.split(/\D/);
	    return new Date(Date.UTC(Number(b[0]), Number(b[1]) - 1, Number(b[2]), Number(b[3]), Number(b[4]), Number(b[5])));
	}
	exports.stringToDate = stringToDate;
	function nsResolver(prefix) {
	    var ns = new Map([
	        ["s", "http://schemas.xmlsoap.org/soap/envelope/"],
	        ["a", "http://schemas.microsoft.com/xrm/2011/Contracts"],
	        ["i", "http://www.w3.org/2001/XMLSchema-instance"],
	        ["b", "http://schemas.datacontract.org/2004/07/System.Collections.Generic"],
	        ["c", "http://schemas.microsoft.com/xrm/2011/Metadata"],
	        ["ser", "http://schemas.microsoft.com/xrm/2011/Contracts/Services"]
	    ]);
	    return ns.get(prefix) || null;
	}
	exports.nsResolver = nsResolver;
	;
	function isNodeNull(node) {
	    if (node == null) {
	        return true;
	    }
	    if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true")) {
	        return true;
	    }
	    return false;
	}
	exports.isNodeNull = isNodeNull;
	function selectNodes(node, xPathExpression) {
	    if (typeof (node.selectNodes) != "undefined") {
	        return node.selectNodes(xPathExpression);
	    }
	    else {
	        var output = [];
	        var xPathResults = node.evaluate(xPathExpression, node, nsResolver, XPathResult.ANY_TYPE, null);
	        var result = xPathResults.iterateNext();
	        while (result) {
	            output.push(result);
	            result = xPathResults.iterateNext();
	        }
	        return output;
	    }
	}
	exports.selectNodes = selectNodes;
	function selectSingleNode(node, xpathExpr) {
	    if (typeof (node.selectSingleNode) != "undefined") {
	        return node.selectSingleNode(xpathExpr);
	    }
	    else {
	        var xpe = new XPathEvaluator();
	        var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	        return results.singleNodeValue;
	    }
	}
	exports.selectSingleNode = selectSingleNode;
	;
	function selectSingleNodeText(node, xpathExpr) {
	    var x = selectSingleNode(node, xpathExpr);
	    if (isNodeNull(x)) {
	        return null;
	    }
	    if (typeof (x.text) != "undefined") {
	        return x.text;
	    }
	    else {
	        return x.textContent;
	    }
	}
	exports.selectSingleNodeText = selectSingleNodeText;
	function getNodeText(node) {
	    if (typeof (node.text) != "undefined") {
	        return node.text;
	    }
	    else {
	        return node.textContent;
	    }
	}
	exports.getNodeText = getNodeText;
	function setSelectionNamespaces(doc) {
	    var namespaces = [
	        "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
	        "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
	        "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
	        "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
	        "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'",
	        "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"
	    ];
	    doc.setProperty("SelectionNamespaces", namespaces.join(" "));
	}
	exports.setSelectionNamespaces = setSelectionNamespaces;
	/**
	 * cross browser responseXml to return a XML object
	 *
	 * @export
	 * @param {string} txt Source xml string
	 * @returns {XMLDocument} Parsed XML Document
	 */
	function xmlParser(txt) {
	    var xmlDoc = null;
	    try {
	        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	        xmlDoc.async = false;
	        xmlDoc.loadXML(txt);
	    }
	    catch (e) {
	        if (DOMParser) {
	            // ReSharper disable InconsistentNaming
	            var parser = new DOMParser();
	            // ReSharper restore InconsistentNaming
	            xmlDoc = parser.parseFromString(txt, "text/xml");
	        }
	        else {
	            Helper_1.alertMessage("Cannot convert the XML string to a cross-browser XML object.");
	        }
	    }
	    return xmlDoc;
	}
	exports.xmlParser = xmlParser;
	function xmlToString(responseXml) {
	    var xmlString = "";
	    try {
	        if (responseXml != null) {
	            if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
	                // ReSharper disable InconsistentNaming
	                xmlString = (new XMLSerializer()).serializeToString(responseXml);
	            }
	            else {
	                if (typeof responseXml.xml !== "undefined") {
	                    xmlString = responseXml.xml;
	                }
	                else if (typeof responseXml[0].xml !== "undefined") {
	                    xmlString = responseXml[0].xml;
	                }
	            }
	        }
	    }
	    catch (e) {
	        Helper_1.alertMessage("Cannot convert the XML to a string.");
	    }
	    return xmlString;
	}
	exports.xmlToString = xmlToString;
	function isArray(input) {
	    return input.constructor.toString().indexOf("Array") !== -1;
	}
	exports.isArray = isArray;
	function getError(async, resp, internalCallback) {
	    //Error descriptions come from http://support.microsoft.com/kb/193625
	    if (resp.status === 12029) {
	        throw new Error("The attempt to connect to the server failed.");
	    }
	    if (resp.status === 12007) {
	        throw new Error("The server name could not be resolved.");
	    }
	    var faultXml = resp.responseXML;
	    var faultstring = null;
	    var errorCode = null;
	    var errorMessage = "Unknown (unable to parse the fault)";
	    if (faultXml !== null && typeof faultXml == "object") {
	        var bodyNode = faultXml.firstChild.firstChild;
	        //Retrieve the fault node
	        for (var i = 0; i < bodyNode.childNodes.length; i++) {
	            var node = bodyNode.childNodes[i];
	            //NOTE: This comparison does not handle the case where the XML namespace changes
	            if ("s:Fault" === node.nodeName) {
	                for (var j = 0; j < node.childNodes.length; j++) {
	                    var testNode = node.childNodes[j];
	                    if ("faultstring" === testNode.nodeName) {
	                        faultstring = getNodeText(testNode);
	                    }
	                    if ("detail" === testNode.nodeName) {
	                        for (var k = 0; k < testNode.childNodes.length; k++) {
	                            var orgServiceFault = testNode.childNodes[k];
	                            if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
	                                for (var l = 0; l < orgServiceFault.childNodes.length; l++) {
	                                    var errorCodeNode = orgServiceFault.childNodes[l];
	                                    if ("ErrorCode" === errorCodeNode.nodeName) {
	                                        errorCode = getNodeText(errorCodeNode);
	                                        break;
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                break;
	            }
	        }
	    }
	    if (errorCode != null && faultstring != null) {
	        errorMessage = "Error Code:" + errorCode + " Message: " + faultstring;
	    }
	    else {
	        if (faultstring != null) {
	            errorMessage = faultstring;
	        }
	    }
	    if (async) {
	        return new Error(errorMessage);
	    }
	    else {
	        throw new Error(errorMessage);
	    }
	}
	exports.getError = getError;
	function doRequest(soapBody, requestType, async, internalCallback) {
	    async = async || false;
	    // Wrap the Soap Body in a soap:Envelope.
	    var soapXml = "\n    <soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n        <soap:Body>\n            <" + requestType + " xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">" + soapBody + "</" + requestType + ">\n        </soap:Body>\n    </soap:Envelope>\n    ";
	    var req = new XMLHttpRequest();
	    req.open("POST", orgServicePath(), async);
	    req.setRequestHeader("Accept", "application/xml, text/xml, */*");
	    req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	    req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/" + requestType);
	    //IE10
	    try {
	        req.responseType = 'msxml-document';
	    }
	    catch (e) {
	    }
	    if (async) {
	        req.onreadystatechange = function () {
	            if (req.readyState === 4 /* complete */) {
	                req.onreadystatechange = null; //Addresses potential memory leak issue with IE
	                if (req.status === 200) {
	                    var doc = req.responseXML;
	                    try {
	                        setSelectionNamespaces(doc);
	                    }
	                    catch (e) {
	                    }
	                    internalCallback(doc);
	                }
	                else {
	                    getError(true, req);
	                }
	            }
	        };
	        req.send(soapXml);
	    }
	    else {
	        req.send(soapXml);
	        if (req.status === 200) {
	            var doc = req.responseXML;
	            try {
	                setSelectionNamespaces(doc);
	            }
	            catch (e) {
	            }
	            var result = doc;
	            return !!internalCallback ? internalCallback(result) : result;
	        }
	        else {
	            getError(false, req);
	        }
	    }
	    // ReSharper disable NotAllPathsReturnValue
	}
	exports.doRequest = doRequest;
	// ReSharper restore NotAllPathsReturnValue
	/**
	 * Private function to return the path to the organization service
	 *
	 * @returns {string}
	 */
	function orgServicePath() {
	    return Helper_1.getClientUrl() + "/XRMServices/2011/Organization.svc/web";
	}
	function fetchMore(fetchCoreXml, pageNumber, pageCookie, fetchResults) {
	    //Build new query
	    var moreFetchXml = "\n        <fetch mapping=\"logical\" page=\"" + pageNumber + "\" count=\"5000\" paging-cookie=\"" + pageCookie + "\">\n            " + fetchCoreXml.replace(/\"/g, "'") + "\n        </fetch>\n    ";
	    var moreMsgBody = "\n        <request i:type=\"a:RetrieveMultipleRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">\n            <a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">\n                <a:KeyValuePairOfstringanyType>\n                    <b:key>Query</b:key>\n                    <b:value i:type=\"a:FetchExpression\">\n                        <a:Query>" + Helper_1.crmXmlEncode(moreFetchXml) + "</a:Query>\n                    </b:value>\n                </a:KeyValuePairOfstringanyType>\n            </a:Parameters>\n            <a:RequestId i:nil=\"true\"/>\n            <a:RequestName>RetrieveMultiple</a:RequestName>\n        </request>\n    ";
	    return doRequest(moreMsgBody, "Execute", false, function (moreResultXml) {
	        var newFetchResult = selectSingleNode(moreResultXml, "//a:Entities");
	        var newMoreRecords = (selectSingleNodeText(moreResultXml, "//a:MoreRecords") === "true");
	        for (var iii = 0, nLength = newFetchResult.childNodes.length; iii < nLength; iii++) {
	            var entity = new businessEntity();
	            entity.deserialize(newFetchResult.childNodes[iii]);
	            fetchResults.push(entity);
	        }
	        if (newMoreRecords) {
	            pageNumber += 1;
	            var newPageCookie = selectSingleNodeText(moreResultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');
	            fetchMore(fetchCoreXml, pageNumber, newPageCookie, fetchResults);
	        }
	        else {
	            return fetchResults;
	        }
	    });
	}
	exports.fetchMore = fetchMore;
	function joinArray(prefix, array, suffix) {
	    var output = [];
	    for (var i = 0, ilength = array.length; i < ilength; i++) {
	        if (array[i] !== "" && array[i] != undefined) {
	            output.push(prefix, array[i], suffix);
	        }
	    }
	    return output.join("");
	}
	exports.joinArray = joinArray;
	function joinConditionPair(attributes, values) {
	    var output = [];
	    for (var i = 0, ilength = attributes.length; i < ilength; i++) {
	        if (attributes[i] !== "") {
	            var value1 = values[i];
	            if (typeof value1 == typeof []) {
	                output.push("<condition attribute='", attributes[i], "' operator='in' >");
	                for (var valueIndex in value1) {
	                    if (value1.hasOwnProperty(valueIndex)) {
	                        var value = encodeValue(value1[valueIndex]);
	                        output.push("<value>" + value + "</value>");
	                    }
	                }
	                output.push("</condition>");
	            }
	            else if (typeof value1 == typeof "") {
	                output.push("<condition attribute='", attributes[i], "' operator='eq' value='", encodeValue(value1), "' />");
	            }
	        }
	    }
	    return output.join("");
	}
	exports.joinConditionPair = joinConditionPair;
	// Added in 1.4.1 for metadata retrieval
	// Inspired From Microsoft SDK code to retrieve Metadata using JavaScript
	// Copyright (C) Microsoft Corporation.  All rights reserved.
	var arrayElements = [
	    "Attributes",
	    "ManyToManyRelationships",
	    "ManyToOneRelationships",
	    "OneToManyRelationships",
	    "Privileges",
	    "LocalizedLabels",
	    "Options",
	    "Targets"
	];
	function isMetadataArray(elementName) {
	    for (var i = 0, ilength = arrayElements.length; i < ilength; i++) {
	        if (elementName === arrayElements[i]) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.isMetadataArray = isMetadataArray;
	function getNodeName(node) {
	    if (typeof (node.baseName) !== "undefined") {
	        return node.baseName;
	    }
	    else {
	        return node.localName;
	    }
	}
	exports.getNodeName = getNodeName;
	function objectifyNode(node) {
	    //Check for null
	    if (node.attributes != null && node.attributes.length === 1) {
	        if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue === "true") {
	            return null;
	        }
	    }
	    //Check if it is a value
	    if ((node.firstChild != null) && (node.firstChild.nodeType === 3)) {
	        var nodeName = getNodeName(node);
	        switch (nodeName) {
	            //Integer Values
	            case "ActivityTypeMask":
	            case "ObjectTypeCode":
	            case "ColumnNumber":
	            case "DefaultFormValue":
	            case "MaxValue":
	            case "MinValue":
	            case "MaxLength":
	            case "Order":
	            case "Precision":
	            case "PrecisionSource":
	            case "LanguageCode":
	                return parseInt(node.firstChild.nodeValue, 10);
	            // Boolean values
	            case "AutoRouteToOwnerQueue":
	            case "CanBeChanged":
	            case "CanTriggerWorkflow":
	            case "IsActivity":
	            case "IsActivityParty":
	            case "IsAvailableOffline":
	            case "IsChildEntity":
	            case "IsCustomEntity":
	            case "IsCustomOptionSet":
	            case "IsDocumentManagementEnabled":
	            case "IsEnabledForCharts":
	            case "IsGlobal":
	            case "IsImportable":
	            case "IsIntersect":
	            case "IsManaged":
	            case "IsReadingPaneEnabled":
	            case "IsValidForAdvancedFind":
	            case "CanBeSecuredForCreate":
	            case "CanBeSecuredForRead":
	            case "CanBeSecuredForUpdate":
	            case "IsCustomAttribute":
	            case "IsPrimaryId":
	            case "IsPrimaryName":
	            case "IsSecured":
	            case "IsValidForCreate":
	            case "IsValidForRead":
	            case "IsValidForUpdate":
	            case "IsCustomRelationship":
	            case "CanBeBasic":
	            case "CanBeDeep":
	            case "CanBeGlobal":
	            case "CanBeLocal":
	                return (node.firstChild.nodeValue === "true") ? true : false;
	            //OptionMetadata.Value and BooleanManagedProperty.Value and AttributeRequiredLevelManagedProperty.Value
	            case "Value":
	                //BooleanManagedProperty.Value
	                if ((node.firstChild.nodeValue === "true") || (node.firstChild.nodeValue === "false")) {
	                    return (node.firstChild.nodeValue === "true") ? true : false;
	                }
	                //AttributeRequiredLevelManagedProperty.Value
	                if ((node.firstChild.nodeValue === "ApplicationRequired") ||
	                    (node.firstChild.nodeValue === "None") ||
	                    (node.firstChild.nodeValue === "Recommended") ||
	                    (node.firstChild.nodeValue === "SystemRequired")) {
	                    return node.firstChild.nodeValue;
	                }
	                else {
	                    //OptionMetadata.Value
	                    return parseInt(node.firstChild.nodeValue, 10);
	                }
	            //String values
	            default:
	                return node.firstChild.nodeValue;
	        }
	    }
	    //Check if it is a known array
	    if (isMetadataArray(getNodeName(node))) {
	        var arrayValue = [];
	        for (var iii = 0, tempLength = node.childNodes.length; iii < tempLength; iii++) {
	            var objectTypeName = void 0;
	            if ((node.childNodes[iii].attributes != null) && (node.childNodes[iii].attributes.getNamedItem("i:type") != null)) {
	                objectTypeName = node.childNodes[iii].attributes.getNamedItem("i:type").nodeValue.split(":")[1];
	            }
	            else {
	                objectTypeName = getNodeName(node.childNodes[iii]);
	            }
	            var b = objectifyNode(node.childNodes[iii]);
	            b._type = objectTypeName;
	            arrayValue.push(b);
	        }
	        return arrayValue;
	    }
	    //Null entity description labels are returned as <label/> - not using i:nil = true;
	    if (node.childNodes.length === 0) {
	        return null;
	    }
	    //Otherwise return an object
	    var c = {};
	    if (node.attributes.getNamedItem("i:type") != null) {
	        c._type = node.attributes.getNamedItem("i:type").nodeValue.split(":")[1];
	    }
	    for (var i = 0, ilength = node.childNodes.length; i < ilength; i++) {
	        if (node.childNodes[i].nodeType === 3) {
	            c[getNodeName(node.childNodes[i])] = node.childNodes[i].nodeValue;
	        }
	        else {
	            c[getNodeName(node.childNodes[i])] = objectifyNode(node.childNodes[i]);
	        }
	    }
	    return c;
	}
	exports.objectifyNode = objectifyNode;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../typings/main.d.ts" />
	var Helper_1 = __webpack_require__(3);
	// JQueryXrmFieldTooltip: jQueryXrmFieldTooltip,
	// JQueryXrmDependentOptionSet: jQueryXrmDependentOptionSet,
	// JQueryXrmCustomFilterView: jQueryXrmCustomFilterView,
	// JQueryXrmFormatNotesControl: jQueryXrmFormatNotesControl
	var Extension = (function () {
	    function Extension() {
	    }
	    // jQuery Load Help function to add tooltip for attribute in CRM 2011. Unsupported because of the usage of DOM object edit.
	    //****************************************************
	    /**
	     * A generic configurable method to add tooltip to crm 2011 field.
	     *
	     * @param {string} filename A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
	     * @param {boolean} bDisplayImg A JavaScript boolean corresponding if display a help image for the tooltip
	     * @example
	     * JQueryLoadHelp('cm_xmlhelpfile', true);
	     */
	    Extension.JQueryXrmFieldTooltip = function (filename, bDisplayImg) {
	        /*
	        This function is used add tooltips to any field in CRM2011.
	
	        This function requires the following parameters:
	        filename :   name of the XML web resource
	        bDisplayImg: boolean to show/hide the help image (true/false)
	        Returns: nothing
	        Example:  jQueryLoadHelp('cm_xmlhelpfile', true);
	        Designed by: http://lambrite.com/?p=221
	        Adapted by Geron Profet (www.crmxpg.nl), Jaimie Ji
	        Modified by Jaimie Ji with jQuery and cross browser
	        */
	        if (Xrm.Page.ui.setFormNotification !== undefined) {
	            Helper_1.alertMessage("XrmServiceToolkit.Extension.JQueryXrmFieldTooltip is not supported in CRM2013.\nPlease use the out of box functionality");
	            return;
	        }
	        if (typeof jQuery === "undefined") {
	            var errorMessage = ("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
	            Helper_1.alertMessage(errorMessage);
	            return;
	        }
	        /**
	         * Appends a help tooltip to an attribute
	         *
	         * @param {string} entity Entityname
	         * @param {string} attr Attributename
	         * @param {string} txt Help description
	         */
	        function registerHelp(entity, attr, txt) {
	            var obj = jQuery("#" + attr + "_c").children(":first");
	            if (obj != null) {
	                var html = "\n                    <img id=\"img_" + attr + "\" src=\"/_imgs/ico/16_help.gif\" alt=\"" + txt + "\" width=\"16\" height=\"16\" /><div id=\"help_" + attr + "\" style=\"visibility: hidden; position: absolute;\">: " + txt + "</div>\n                ";
	                jQuery(obj).append(html);
	                // 20110909 GP: added line to hide/show help image
	                jQuery("#img_" + attr).css("display", (bDisplayImg) ? "inline" : "none");
	            }
	        }
	        // ****************************************************
	        function parseHelpXml(data) {
	            var _this = this;
	            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
	            var entXml = jQuery("entity[name=" + entity + "]", data);
	            jQuery(entXml).children().each(function () {
	                var attr = jQuery(_this).attr("name");
	                var txt = jQuery(_this).find("shorthelp").text();
	                registerHelp(entity, attr, txt);
	            });
	        }
	        jQuery.support.cors = true;
	        jQuery.ajax({
	            type: "GET",
	            url: Helper_1.getClientUrl() + "/WebResources/" + filename,
	            dataType: "xml",
	            success: parseHelpXml,
	            // ReSharper disable UnusedParameter
	            error: function (xmlHttpRequest, textStatus, errorThrown) {
	                // ReSharper restore UnusedParameter
	                Helper_1.alertMessage("Something is wrong to setup the tooltip for the fields. Please contact your administrator");
	            }
	        }); // end Ajax
	    };
	    // Generic Dependent Option Set Function. Changed from CRM 2011 SDK example
	    /**
	     * A generic configurable method to configure dependent optionset for CRM 2011 instance
	     *
	     * @param {string} filename A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
	     */
	    Extension.JQueryXrmDependentOptionSet = function (filename) {
	        if (typeof jQuery === "undefined") {
	            Helper_1.alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
	            return;
	        }
	        // This is the function set on the OnChange event for
	        // parent fields.
	        // ReSharper disable DuplicatingLocalDeclaration
	        function filterDependentField(parentField, childField, jQueryXrmDependentOptionSet) {
	            // ReSharper restore DuplicatingLocalDeclaration
	            for (var depOptionSet in this.JQueryXrmDependentOptionSet.config) {
	                if (this.JQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
	                    var dependentOptionSet = this.JQueryXrmDependentOptionSet.config[depOptionSet];
	                    /* Match the parameters to the correct dependent optionset mapping*/
	                    if ((dependentOptionSet.parent === parentField) && (dependentOptionSet.dependent === childField)) {
	                        /* Get references to the related fields*/
	                        var parent_1 = Xrm.Page.data.entity.attributes.get(parentField);
	                        var child = Xrm.Page.data.entity.attributes.get(childField);
	                        var parentControl = Xrm.Page.getControl(parentField);
	                        var childControl = Xrm.Page.getControl(childField);
	                        /* Capture the current value of the child field*/
	                        var currentChildFieldValue = child.getValue();
	                        /* If the parent field is null the Child field can be set to null */
	                        var controls = void 0;
	                        var ctrl = void 0;
	                        if (parent_1.getValue() === null) {
	                            child.setValue(null);
	                            child.setSubmitMode("always");
	                            child.fireOnChange();
	                            // Any attribute may have any number of controls,
	                            // so disable each instance.
	                            controls = child.controls.get();
	                            for (ctrl in controls) {
	                                if (controls.hasOwnProperty(ctrl)) {
	                                    controls[ctrl].setDisabled(true);
	                                }
	                            }
	                            return;
	                        }
	                        for (var os in dependentOptionSet.options) {
	                            if (dependentOptionSet.options.hasOwnProperty(os)) {
	                                var options = dependentOptionSet.options[os];
	                                var optionsToShow = options.showOptions;
	                                /* Find the Options that corresponds to the value of the parent field. */
	                                if (parent_1.getValue().toString() === options.value.toString()) {
	                                    controls = child.controls.get(); /*Enable the field and set the options*/
	                                    for (ctrl in controls) {
	                                        if (controls.hasOwnProperty(ctrl)) {
	                                            controls[ctrl].setDisabled(false);
	                                            controls[ctrl].clearOptions();
	                                            for (var option in optionsToShow) {
	                                                if (optionsToShow.hasOwnProperty(option)) {
	                                                    controls[ctrl].addOption(optionsToShow[option]);
	                                                }
	                                            }
	                                        }
	                                    }
	                                    /*Check whether the current value is valid*/
	                                    var bCurrentValueIsValid = false;
	                                    var childFieldOptions = optionsToShow;
	                                    for (var validOptionIndex in childFieldOptions) {
	                                        if (childFieldOptions.hasOwnProperty(validOptionIndex)) {
	                                            var optionDataValue = childFieldOptions[validOptionIndex].value;
	                                            if (currentChildFieldValue === parseInt(optionDataValue)) {
	                                                bCurrentValueIsValid = true;
	                                                break;
	                                            }
	                                        }
	                                    }
	                                    /*
	                            If the value is valid, set it.
	                            If not, set the child field to null
	                            */
	                                    if (bCurrentValueIsValid) {
	                                        child.setValue(currentChildFieldValue);
	                                    }
	                                    else {
	                                        child.setValue(null);
	                                    }
	                                    child.setSubmitMode("always");
	                                    child.fireOnChange();
	                                    if (parentControl.getDisabled() === true) {
	                                        childControl.setDisabled(true);
	                                    }
	                                    break;
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        /**
	         * Initialize optionsets
	         *
	         * @param {*} data (description)
	         */
	        function init(data) {
	            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
	            var configWr = jQuery("entity[name=" + entity + "]", data);
	            // Convert the XML Data into a JScript object.
	            var parentFields = configWr.children("ParentField");
	            var jsConfig = [];
	            for (var i = 0, ilength = parentFields.length; i < ilength; i++) {
	                var node = parentFields[i];
	                var mapping = {};
	                mapping.parent = jQuery(node).attr("id");
	                mapping.dependent = jQuery(node).children("DependentField:first").attr("id");
	                mapping.options = [];
	                var options = jQuery(node).children("Option");
	                for (var a = 0, alength = options.length; a < alength; a++) {
	                    var option = {};
	                    option.value = jQuery(options[a]).attr("value");
	                    option.showOptions = [];
	                    var optionsToShow = jQuery(options[a]).children("ShowOption");
	                    for (var b = 0, blength = optionsToShow.length; b < blength; b++) {
	                        var optionToShow = {};
	                        optionToShow.value = jQuery(optionsToShow[b]).attr("value");
	                        optionToShow.text = jQuery(optionsToShow[b]).attr("label"); // Label is not used in the code.
	                        option.showOptions.push(optionToShow);
	                    }
	                    mapping.options.push(option);
	                }
	                jsConfig.push(mapping);
	            }
	            // Attach the configuration object to jQueryXrmDependentOptionSet
	            // so it will be available for the OnChange events.
	            this.JQueryXrmDependentOptionSet.config = jsConfig;
	            // Fire the OnChange event for the mapped optionset fields
	            // so that the dependent fields are filtered for the current values.
	            for (var depOptionSet in this.JQueryXrmDependentOptionSet.config) {
	                if (this.JQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
	                    var parent_2 = this.JQueryXrmDependentOptionSet.config[depOptionSet].parent;
	                    var child = this.JQueryXrmDependentOptionSet.config[depOptionSet].dependent;
	                    filterDependentField(parent_2, child, this.JQueryXrmDependentOptionSet);
	                }
	            }
	        }
	        jQuery.support.cors = true;
	        jQuery.ajax({
	            type: "GET",
	            url: Helper_1.getClientUrl() + "/WebResources/" + filename,
	            dataType: "xml",
	            success: init,
	            // ReSharper disable UnusedParameter
	            error: function (xmlHttpRequest, textStatus, errorThrown) {
	                // ReSharper restore UnusedParameter
	                Helper_1.alertMessage("Something is wrong to setup the dependent picklist. Please contact your administrator");
	            }
	        }); // end Ajax
	    };
	    ;
	    /**
	     * (A generic configurable method to add custom filter view to lookup field in crm 2011 instance
	     *
	     * @param {string} filename A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
	     */
	    Extension.JQueryXrmCustomFilterView = function (filename) {
	        if (typeof jQuery === "undefined") {
	            Helper_1.alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
	            return;
	        }
	        function setCustomFilterView(target, entityName, viewName, fetchXml, layoutXml) {
	            // use randomly generated GUID Id for our new view
	            var viewId = "{1DFB2B35-B07C-44D1-868D-258DEEAB88E2}";
	            // add the Custom View to the indicated [lookupFieldName] Control
	            Xrm.Page.getControl(target).addCustomView(viewId, entityName, viewName, fetchXml, layoutXml, true);
	        }
	        function xmlToString(responseXml) {
	            var xmlString = "";
	            try {
	                if (responseXml != null) {
	                    if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
	                        // ReSharper disable InconsistentNaming
	                        xmlString = (new XMLSerializer()).serializeToString(responseXml);
	                    }
	                    else {
	                        if (typeof responseXml.xml !== "undefined") {
	                            xmlString = responseXml.xml;
	                        }
	                        else if (typeof responseXml[0].xml !== "undefined") {
	                            xmlString = responseXml[0].xml;
	                        }
	                    }
	                }
	            }
	            catch (e) {
	                Helper_1.alertMessage("Cannot convert the XML to a string.");
	            }
	            return xmlString;
	        }
	        function init(data) {
	            var entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
	            var configWr = jQuery("entity[name=" + entity + "]", data);
	            // Convert the XML Data into a JScript object.
	            var targetFields = configWr.children("TargetField");
	            var jsConfig = [];
	            for (var i = 0, ilength = targetFields.length; i < ilength; i++) {
	                var node = targetFields[i];
	                var mapping = {};
	                mapping.target = jQuery(node).attr("id");
	                mapping.entityName = jQuery(node).attr("viewentity");
	                mapping.viewName = jQuery(node).attr("viewname");
	                mapping.dynamic = jQuery(node).children("dynamic").children();
	                mapping.fetchXml = xmlToString(jQuery(node).children("fetch"));
	                mapping.layoutXml = xmlToString(jQuery(node).children("grid"));
	                jsConfig.push(mapping);
	            }
	            // Attach the configuration object to JQueryCustomFilterView
	            // so it will be available for the OnChange events.
	            this.JQueryXrmCustomFilterView.config = jsConfig;
	            // Fire the OnChange event for the mapped fields
	            // so that the lookup dialog are changed with the filtered view for the current values.
	            for (var customFilterView in this.JQueryXrmCustomFilterView.config) {
	                if (this.JQueryXrmCustomFilterView.config.hasOwnProperty(customFilterView)) {
	                    var target = this.JQueryXrmCustomFilterView.config[customFilterView].target;
	                    var entityName = this.JQueryXrmCustomFilterView.config[customFilterView].entityName;
	                    var viewName = this.JQueryXrmCustomFilterView.config[customFilterView].viewName;
	                    var dynamic = this.JQueryXrmCustomFilterView.config[customFilterView].dynamic;
	                    var fetchXml = this.JQueryXrmCustomFilterView.config[customFilterView].fetchXml;
	                    var layoutXml = this.JQueryXrmCustomFilterView.config[customFilterView].layoutXml;
	                    // TODO: Adding logics for various field and conditions. More tests required.
	                    if (dynamic != null) {
	                        for (var a = 0, alength = dynamic.length; a < alength; a++) {
	                            var dynamicControlType = Xrm.Page.getControl(jQuery(dynamic).attr("name")).getControlType();
	                            var fieldValueType = jQuery(dynamic).attr("fieldvaluetype"); // for optionset, name might be used to filter
	                            if (Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getValue() === null) {
	                                Helper_1.alertMessage(jQuery(dynamic).attr("name") + " does not have a value. Please put validation logic on the field change to call this function. Only use XrmServiceToolkit.Extension.JQueryXrmCustomFilterView when the field has a value.");
	                                return;
	                            }
	                            var dynamicValue = null;
	                            switch (dynamicControlType) {
	                                case "standard":
	                                    dynamicValue = Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getValue();
	                                    break;
	                                case "optionset":
	                                    dynamicValue = (fieldValueType != null && fieldValueType === "label") ? Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getSelectionOption().text : Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getValue();
	                                    break;
	                                case "lookup":
	                                    dynamicValue = (fieldValueType != null && fieldValueType === "name") ? Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getValue()[0].name : Xrm.Page.getAttribute(jQuery(dynamic).attr("name")).getValue()[0].id;
	                                    break;
	                                default:
	                                    Helper_1.alertMessage(jQuery(dynamic).attr("name") + " is not supported for filter lookup view. Please change the configuration.");
	                                    break;
	                            }
	                            var operator = jQuery(dynamic).attr("operator");
	                            if (operator === null) {
	                                Helper_1.alertMessage("operator is missing in the configuration file. Please fix the issue");
	                                return;
	                            }
	                            var dynamicString = jQuery(dynamic).attr("fetchnote");
	                            switch (operator.toLowerCase()) {
	                                case "contains":
	                                case "does not contain":
	                                    dynamicValue = "%" + dynamicValue + "%";
	                                    break;
	                                case "begins with":
	                                case "does not begin with":
	                                    dynamicValue = dynamicValue + "%";
	                                    break;
	                                case "ends with":
	                                case "does not end with":
	                                    dynamicValue = "%" + dynamicValue;
	                                    break;
	                                default:
	                                    break;
	                            }
	                            fetchXml = fetchXml.replace(dynamicString, dynamicValue);
	                        }
	                    }
	                    // replace the values if required
	                    setCustomFilterView(target, entityName, viewName, fetchXml, layoutXml);
	                }
	            }
	        }
	        jQuery.support.cors = true;
	        jQuery.ajax({
	            type: "GET",
	            url: Helper_1.getClientUrl() + "/WebResources/" + filename,
	            dataType: "xml",
	            success: init,
	            // ReSharper disable UnusedParameter
	            error: function (xmlHttpRequest, textStatus, errorThrown) {
	                // ReSharper restore UnusedParameter
	                Helper_1.alertMessage("Something is wrong to setup the custom filter view. Please contact your administrator");
	            }
	        }); // end Ajax
	    };
	    ;
	    // Disable or Enable to insert/edit note for entity. Unsupported because of DOM object edit
	    /**
	     * A generic configurable method to format the note control in crm 2011 instance
	     *
	     * @param {boolean} allowInsert A JavaScript boolean to format if the note control allow insert
	     * @param {boolean} allowEdit A JavaScript boolean to format if the note control allow edit
	     */
	    Extension.JQueryXrmFormatNotesControl = function (allowInsert, allowEdit) {
	        if (Xrm.Page.ui.setFormNotification !== undefined) {
	            Helper_1.alertMessage("XrmServiceToolkit.Extension.JQueryXrmFormatNotesControl is not supported in CRM2013");
	            return;
	        }
	        if (typeof jQuery === "undefined") {
	            Helper_1.alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
	            return;
	        }
	        jQuery.support.cors = true;
	        var notescontrol = jQuery("#notescontrol");
	        if (notescontrol === null || notescontrol === undefined)
	            return;
	        var url = notescontrol.attr("url");
	        if (url != null) {
	            if (!allowInsert) {
	                url = url.replace("EnableInsert=true", "EnableInsert=false");
	            }
	            else if (!allowEdit) {
	                url = url.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
	            }
	            notescontrol.attr("url", url);
	        }
	        else {
	            var src = notescontrol.attr("src");
	            if (src != null) {
	                if (!allowInsert) {
	                    src = src.replace("EnableInsert=true", "EnableInsert=false");
	                }
	                else if (!allowEdit) {
	                    src = src.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
	                }
	                notescontrol.attr("src", src);
	            }
	        }
	    };
	    return Extension;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Extension;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=XrmServiceToolkit.js.map
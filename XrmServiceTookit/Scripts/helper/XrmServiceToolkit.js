/**
* MSCRM 2011 Web Service Toolkit for JavaScript
* @author Jaimie Ji
* @version : 1.0

* Credits:
*   The idea of this library was inspired by Daniel Cai's CrmWebServiceToolkit.
*   The idea of BusinessEntity was inspired by Daniel Cai && Ascentium CrmService JavaScript Library.
*   The REST Endpoint functions were inspired by MSCRM 2011 SDK javascript code and various resources from CRM websites and forums. Some of them were just copies with minor modification.
*   The Soap functions were inspired by Daniel Cai && Jamie Miley && Paul Way && Customer Effective.
*   Additional thanks to all contributors of MSCRM and i have learned a lot from you all.
* Date: February, 2012
*/

XrmServiceToolkit = function () {
    /// <summary>
    /// XrmServiceToolkit.Common for common funcitons.
    /// XrmServiceToolkit.Rest for all REST endpoints funcitons.
    /// XrmServiceToolkit.Soap for all Soap funtions.
    /// </summary>
};

XrmServiceToolkit.Common = function () {

    var _guidsAreEqual = function (guid1, guid2) {
        /// <summary>
        /// Check if two guids are equal
        /// </summary>
        /// <param name="guid1" type="string">
        /// A string represents a guid
        /// </param>
        /// <param name="guid2" type="string">
        /// A string represents a guid
        /// </param>
        /// <returns type="boolean" />
        var isEqual = false;

        if (guid1 == null || guid2 == null) {
            isEqual = false;
        }
        else {
            isEqual = guid1.replace(/[{}]/g, "").toLowerCase() == guid2.replace(/[{}]/g, "").toLowerCase();
        }

        return isEqual;
    };

    var _enableField = function (fieldName) {
        /// <summary>
        /// Enable a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be enabled
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setDisabled(false);
    };

    var _disableField = function (fieldName) {
        /// <summary>
        /// Disable a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be disabled
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setDisabled(true);
    };

    var _showField = function (fieldName) {
        /// <summary>
        /// Show a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be shown
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setVisible(true);
    };

    var _hideField = function (fieldName) {
        /// <summary>
        /// Hide a field by the name
        /// </summary>
        /// <param name="fieldName" type="string">
        /// The name of the field to be hidden
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getControl(fieldName).setVisible(false);
    };

    var _updateRequirementLevel = function (fieldName, levelName) {
        /// <summary>
        /// Updates the requirement level of a field
        /// </summary>
        /// <param name="fieldName" type="string">
        /// Name of the field
        /// </param>
        /// <param name="levelName" type="string">
        /// Name of the requirement level. [None, Recommended, Required] (Case Sensitive)
        /// </param>
        /// <returns type="void" />
        Xrm.Page.getAttribute(fieldName).setRequiredLevel(levelName);
    };

    var _showError = function (error) {
        /// <summary>
        /// Alert the error message if occoured
        /// </summary>
        /// <param name="error" type="error">
        /// Object of the javascript error
        /// </param>
        /// <returns type="void" />
        alert(error.message);
    };

    var _getObjectTypeCode = function (entityName) {
        /// <summary>
        /// Gets the EntityTypeCode / ObjectTypeCode of a entity
        /// </summary>
        /// <param name="entityName" type="string">
        /// Name of entity to return object type code of
        /// </param>
        /// <returns type="int" />
        var lookupService = new RemoteCommand("LookupService", "RetrieveTypeCode");
        lookupService.SetParameter("entityName", entityName);
        var result = lookupService.Execute();

        if (result.Success && typeof result.ReturnValue == "number") {
            return result.ReturnValue;
        } else {
            return null;
        }
    };

    var _addNotification = function (message, level) {
        /// <summary>
        /// Add a notification bar message with CRM 2011 style
        /// </summary>
        /// <param name="message" type="string">
        /// Details of the message
        /// </param>
        /// <param name="level" type="int">
        /// The warning level of the message: [1 critial, 2 information, 3 warning]
        /// </param>
        /// <returns type="void" />
        var notificationsArea = document.getElementById('crmNotifications');
        if (notificationsArea == null) {
            alert('div not found'); return;
        }
        if (level == 1) {
            //critical  
            notificationsArea.AddNotification('mep1', 1, 'source', message);
        }

        if (level == 2) {
            //Info  
            notificationsArea.AddNotification('mep3', 3, 'source', message);
        }
        if (level == 3) {
            //Warning  
            notificationsArea.AddNotification('mep2', 2, 'source', message);
        }
        if (message == "") {
            notificationsArea.SetNotifications(null, null);
        }
    };

    var _calculateDaysBetween = function (datetime1, datetime2) {
        /// <summary>
        /// Calculate the days between two dates
        /// </summary>
        /// <param name="datetime1" type="DateTime">
        /// The first / early date to be calculated
        /// </param>
        /// <param name="datetime2" type="DateTime">
        /// The second / later date to e calculated
        /// </param>
        /// <returns type="int" />

        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = datetime1.getTime();
        var date2_ms = datetime2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms)

        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY)
    };

    // Toolkit's public static members
    return {
        EnableField: _enableField,
        DisableField: _disableField,
        ShowField: _showField,
        HideField: _hideField,
        UpdateRequiredLevel: _updateRequirementLevel,
        GetObjectTypeCode: _getObjectTypeCode,
        CalculateDaysBetween: _calculateDaysBetween,
        AddNotification: _addNotification,
        ShowError: _showError,
        GuidsAreEqual : _guidsAreEqual
    };

} ();

XrmServiceToolkit.Rest = function () {
    // Private members
    var _htmlEncode = function (s) {
        if (s == null || s == "") return s;
        for (var count = 0, buffer = "", htmlEncode = "", cnt = 0; cnt < s.length; cnt++) {
            var c = s.charCodeAt(cnt);
            if (c > 96 && c < 123 || c > 64 && c < 91 || c == 32 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95)
                buffer += String.fromCharCode(c);
            else buffer += "&#" + c + ";";
            if (++count == 500) {
                htmlEncode += buffer; buffer = ""; count = 0
            }
        }
        if (buffer.length) htmlEncode += buffer;
        return htmlEncode
    };

    var innerSurrogateAmpersandWorkaround = function (s) {
        for (var buffer = "", cnt = 0; cnt < s.length; cnt++) {
            var c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                if (cnt + 1 < s.length) {
                    var c1 = s.charCodeAt(cnt + 1);
                    if (c1 >= 56320 && c1 <= 57343) {
                        buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++
                    }
                    else
                        buffer += String.fromCharCode(c0)
                }
                else buffer += String.fromCharCode(c0);
            else buffer += String.fromCharCode(c0)
        }
        s = buffer;
        buffer = "";
        for (var cnt = 0; cnt < s.length; cnt++) {
            var c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                buffer += String.fromCharCode(65533);
            else buffer += String.fromCharCode(c0)
        }
        s = buffer;
        s = _htmlEncode(s);
        s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
        s = s.replace(/CRMEntityReferenceClose/g, ";");
        return s
    };

    var CrmXmlEncode = function (s) {
        if ("undefined" == typeof s || "unknown" == typeof s || null == s) return s;
        else if (typeof s != "string") s = s.toString();
        return innerSurrogateAmpersandWorkaround(s)
    };

    var CrmXmlDecode = function (s) {
        if (typeof s != "string") s = s.toString();
        return s;
    };

    var _context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        if (typeof GetGlobalContext != "undefined") {
            return GetGlobalContext();
        }
        else {
            if (typeof Xrm != "undefined") {
                if (typeof Xrm != "undefined") {
                    return Xrm.Page.context;
                }
                else {
                    if (typeof window.parent.Xrm != "undefined") {
                        return window.parent.Xrm.Page.context;
                    }
                }
            }
            else {
                throw new Error("Context is not available.");
            }
        }
    };

    var _getServerUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = _context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var _ODataPath = function () {
        ///<summary>
        /// Private function to return the path to the REST endpoint.
        ///</summary>
        ///<returns>String</returns>
        return _getServerUrl() + "/XRMServices/2011/OrganizationData.svc/";
    };

    var _errorHandler = function (req) {
        ///<summary>
        /// Private function return an Error object to the errorCallback
        ///</summary>
        ///<param name="req" type="XMLHttpRequest">
        /// The XMLHttpRequest response that returned an error.
        ///</param>
        ///<returns>Error</returns>
        return new Error("Error : " +
        req.status + ": " +
        req.statusText + ": " +
        JSON.parse(req.responseText).error.message.value);
    };

    var _dateReviver = function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    };

    var _parameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="Object">
        /// The parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if ((typeof parameter === "undefined") || parameter === null) {
            throw new Error(message);
        }
    };

    var _stringParameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="String">
        /// The string parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof parameter != "string") {
            throw new Error(message);
        }
    };

    var _callbackParameterCheck = function (callbackParameter, message) {
        ///<summary>
        /// Private function used to check whether required callback parameters are functions
        ///</summary>
        ///<param name="callbackParameter" type="Function">
        /// The callback parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof callbackParameter != "function") {
            throw new Error(message);
        }
    };

    var _booleanParameterCheck = function (parameter, message) {
        ///<summary>
        /// Private function used to check whether required parameters are null or undefined
        ///</summary>
        ///<param name="parameter" type="String">
        /// The string parameter to check;
        ///</param>
        ///<param name="message" type="String">
        /// The error message text to include when the error is thrown.
        ///</param>
        if (typeof parameter != "boolean") {
            throw new Error(message);
        }
    };

    var _createRecord = function (object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to create a new record.
        ///</summary>
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        _parameterCheck(object, "XrmServiceToolkit.REST.createRecord requires the object parameter.");
        ///</param>
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        _stringParameterCheck(type, "XrmServiceToolkit.REST.createRecord requires the type parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function can accept the returned record as a parameter.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.createRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.createRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.createRecord requires the async is a boolean.");

        var req = new XMLHttpRequest();
        req.open("POST", _ODataPath() + type, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 201) {
                    successCallback(JSON.parse(this.responseText, _dateReviver).d);
                }
                else {
                    errorCallback(_errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(object));
    };

    var _retrieveRecord = function (id, type, select, expand, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to retrieve.
        ///</param>
        _stringParameterCheck(id, "XrmServiceToolkit.REST.retrieveRecord requires the id parameter is a string.");
        ///</param>
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        _stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveRecord requires the type parameter is a string.");
        ///<param name="select" type="String">
        /// A String representing the $select OData System Query Option to control which
        /// attributes will be returned. This is a comma separated list of Attribute names that are valid for retrieve.
        /// If null all properties for the record will be returned
        ///</param>
        if (select != null)
            _stringParameterCheck(select, "XrmServiceToolkit.REST.retrieveRecord requires the select parameter is a string.");
        ///<param name="expand" type="String">
        /// A String representing the $expand OData System Query Option value to control which
        /// related records are also returned. This is a comma separated list of of up to 6 entity relationship names
        /// If null no expanded related records will be returned.
        ///</param>
        if (expand != null)
            _stringParameterCheck(expand, "XrmServiceToolkit.REST.retrieveRecord requires the expand parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// This function must accept the returned record as a parameter.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveRecord requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveRecord requires the errorCallback parameter is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveRecord requires the async parameter is a boolean.");

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


        var req = new XMLHttpRequest();
        req.open("GET", _ODataPath() + type + "(guid'" + id + "')" + systemQueryOptions, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 200) {
                    successCallback(JSON.parse(this.responseText, _dateReviver).d);
                }
                else {
                    errorCallback(_errorHandler(this));
                }
            }
        };
        req.send();
    };

    var _updateRecord = function (id, object, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to update a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to update.
        ///</param>
        _stringParameterCheck(id, "XrmServiceToolkit.REST.updateRecord requires the id parameter.");
        ///<param name="object" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        _parameterCheck(object, "XrmServiceToolkit.REST.updateRecord requires the object parameter.");
        ///</param>
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        _stringParameterCheck(type, "XrmServiceToolkit.REST.updateRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.updateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.updateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.updateRecord requires the async parameter is a boolean.");

        var req = new XMLHttpRequest();

        req.open("POST", _ODataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "MERGE");

        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 204 || this.status == 1223) {
                    successCallback();
                }
                else {
                    errorCallback(_errorHandler(this));
                }
            }
        };
        req.send(JSON.stringify(object));
    };

    var _deleteRecord = function (id, type, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to delete a record.
        ///</summary>
        ///<param name="id" type="String">
        /// A String representing the GUID value for the record to delete.
        ///</param>
        _stringParameterCheck(id, "XrmServiceToolkit.REST.deleteRecord requires the id parameter.");
        ///</param>
        ///<param name="type" type="string">
        /// A String representing the name of the entity
        ///</param>
        _stringParameterCheck(type, "XrmServiceToolkit.REST.deleteRecord requires the type parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.deleteRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.deleteRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.deleteRecord requires the async parameter is a boolean.");

        var req = new XMLHttpRequest();
        req.open("POST", _ODataPath() + type + "(guid'" + id + "')", async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("X-HTTP-Method", "DELETE");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 204 || this.status == 1223) {
                    successCallback();
                }
                else {
                    errorCallback(_errorHandler(this));
                }
            }
        };
        req.send();
    };

    var _retrieveMultipleRecords = function (type, options, successCallback, errorCallback, OnComplete, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve records.
        ///</summary>
        ///<param name="type" type="String">
        /// The Schema Name of the Entity type record to retrieve.
        /// For an Account record, use "Account"
        ///</param>
        _stringParameterCheck(type, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the type parameter is a string.");
        ///<param name="options" type="String">
        /// A String representing the OData System Query Options to control the data returned
        ///</param>
        if (options != null)
            _stringParameterCheck(options, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the options parameter is a string.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called for each page of records returned.
        /// Each page is 50 records. If you expect that more than one page of records will be returned,
        /// this function should loop through the results and push the records into an array outside of the function.
        /// Use the OnComplete event handler to know when all the records have been processed.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the successCallback parameter is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the errorCallback parameter is a function.");
        ///<param name="OnComplete" type="Function">
        /// The function that will be called when all the requested records have been returned.
        /// No parameters are passed to this function.
        /// </param>
        _callbackParameterCheck(OnComplete, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the OnComplete parameter is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.retrieveMultipleRecords requires the async parameter is a boolean.");

        var optionsString;
        if (options != null) {
            if (options.charAt(0) != "?") {
                optionsString = "?" + options;
            }
            else {
                optionsString = options;
            }
        }

        var req = new XMLHttpRequest();
        req.open("GET", _ODataPath() + type + optionsString, async);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState == 4 /* complete */) {
                if (this.status == 200) {
                    var returned = JSON.parse(this.responseText, _dateReviver).d;
                    successCallback(returned.results);
                    if (returned.__next != null) {
                        var queryOptions = returned.__next.substring((_ODataPath() + type).length);
                        _retrieveMultipleRecords(type, queryOptions, successCallback, errorCallback, OnComplete);
                    }
                    else {
                        OnComplete();
                    }
                }
                else {
                    errorCallback(_errorHandler(this));
                }
            }
        };
        req.send();
    };

    var _performRequest = function (settings) {
        _parameterCheck(settings, "The value passed to the performRequest function settings parameter is null or undefined.");
        var request = new XMLHttpRequest();
        request.open(settings.type, settings.url, settings.async);
        request.setRequestHeader("Accept", "application/json");
        if (settings.action != null) {
            request.setRequestHeader("X-HTTP-Method", settings.action);
        }
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.onreadystatechange = function () {
            if (this.readyState == 4 /*Complete*/) {
                // Status 201 is for create, status 204/1223 for link and delete.
                // There appears to be an issue where IE maps the 204 status to 1223
                // when no content is returned.
                if (this.status == 204 || this.status == 1223 || this.status == 201) {
                    settings.success(this);
                }
                else {
                    // Failure
                    if (settings.error) {
                        settings.error(_errorHandler(this));
                    }
                    else {
                        _errorHandler(this);
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

    var _associateRecord = function (entityid1, odataSetName1, entityid2, odataSetName2, relationship, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to associate a record.
        ///</summary>
        ///<param name="entityid1" type="string">
        /// A String representing the GUID value for the record to associate.
        ///</param>
        _parameterCheck(entityid1, "XrmServiceToolkit.REST.associateRecord requires the entityid1 parameter.");
        ///<param name="odataSetName1" type="string">
        /// A String representing the odataset name for entityid1
        ///</param>
        _parameterCheck(odataSetName1, "XrmServiceToolkit.REST.associateRecord requires the odataSetName1 parameter.");
        ///<param name="entityid2" type="string">
        /// A String representing the GUID value for the record to be associated.
        ///</param>
        _parameterCheck(entityid2, "XrmServiceToolkit.REST.associateRecord requires the entityid2 parameter.");
        ///<param name="odataSetName2" type="string">
        /// A String representing the odataset name for entityid2
        ///</param>
        _parameterCheck(odataSetName2, "XrmServiceToolkit.REST.associateRecord requires the odataSetName2 parameter.");
        ///<param name="relationship" type="string">
        /// A String representing the name of the relationship for association
        ///</param>
        _parameterCheck(relationship, "XrmServiceToolkit.REST.associateRecord requires the relationship parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.associateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.associateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.associateRecord requires the async parameter is a boolean");

        var entity2 = {};
        entity2.uri = _ODataPath() + "/" + odataSetName2 + "(guid'" + entityid2 + "')";
        var jsonEntity = window.JSON.stringify(entity2);

        _performRequest({
            type: "POST",
            url: _ODataPath() + "/" + odataSetName1 + "(guid'" + entityid1 + "')/$links/" + relationship,
            data: jsonEntity,
            success: successCallback,
            error: errorCallback,
            async: async
        });
    };

    var _disassociateRecord = function (entityid1, odataSetName, entityid2, relationship, successCallback, errorCallback, async) {
        ///<summary>
        /// Sends synchronous/asynchronous request to disassociate a record.
        ///</summary>
        ///<param name="entityid1" type="string">
        /// A String representing the GUID value for the record to disassociate.
        ///</param>
        _parameterCheck(entityid1, "XrmServiceToolkit.REST.disassociateRecord requires the entityid1 parameter.");
        ///<param name="odataSetName" type="string">
        /// A String representing the odataset name for entityid1
        ///</param>
        _parameterCheck(odataSetName, "XrmServiceToolkit.REST.disassociateRecord requires the odataSetName parameter.");
        ///<param name="entityid2" type="string">
        /// A String representing the GUID value for the record to be disassociated.
        ///</param>
        _parameterCheck(entityid2, "XrmServiceToolkit.REST.disassociateRecord requires the entityid2 parameter.");
        ///<param name="relationship" type="string">
        /// A String representing the name of the relationship for disassociation
        ///</param>
        _parameterCheck(relationship, "XrmServiceToolkit.REST.disassociateRecord requires the relationship parameter.");
        ///<param name="successCallback" type="Function">
        /// The function that will be passed through and be called by a successful response. 
        /// Nothing will be returned to this function.
        /// </param>
        _callbackParameterCheck(successCallback, "XrmServiceToolkit.REST.disassociateRecord requires the successCallback is a function.");
        ///<param name="errorCallback" type="Function">
        /// The function that will be passed through and be called by a failed response. 
        /// This function must accept an Error object as a parameter.
        /// </param>
        _callbackParameterCheck(errorCallback, "XrmServiceToolkit.REST.disassociateRecord requires the errorCallback is a function.");
        ///<param name="async" type="Boolean">
        /// A Boolean representing if the method should run asynchronously or synchronously
        /// true means asynchronously. false means synchronously
        /// </param>
        _booleanParameterCheck(async, "XrmServiceToolkit.REST.disassociateRecord requires the async parameter is a boolean.");

        var url = _ODataPath() + "/" + odataSetName + "(guid'" + entityid1 + "')/$links/" + relationship + "(guid'" + entityid2 + "')";
        _performRequest({
            url: url,
            type: "POST",
            action: "DELETE",
            error: errorCallback,
            success: successCallback,
            async: async
        });
    };

    // Toolkit's public static members
    return {
        Create: _createRecord,
        Retrieve: _retrieveRecord,
        Update: _updateRecord,
        Delete: _deleteRecord,
        RetrieveMultiple: _retrieveMultipleRecords,
        Associate: _associateRecord,
        Disassociate: _disassociateRecord
    };
} ();

XrmServiceToolkit.Soap = function () {

    var _htmlEncode = function (s) {
        if (s == null || s == "") return s;
        for (var count = 0, buffer = "", htmlEncode = "", cnt = 0; cnt < s.length; cnt++) {
            var c = s.charCodeAt(cnt);
            if (c > 96 && c < 123 || c > 64 && c < 91 || c == 32 || c > 47 && c < 58 || c == 46 || c == 44 || c == 45 || c == 95)
                buffer += String.fromCharCode(c);
            else buffer += "&#" + c + ";";
            if (++count == 500) {
                htmlEncode += buffer; buffer = ""; count = 0
            }
        }
        if (buffer.length) htmlEncode += buffer;
        return htmlEncode
    };

    var innerSurrogateAmpersandWorkaround = function (s) {
        for (var buffer = "", cnt = 0; cnt < s.length; cnt++) {
            var c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                if (cnt + 1 < s.length) {
                    var c1 = s.charCodeAt(cnt + 1);
                    if (c1 >= 56320 && c1 <= 57343) {
                        buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++
                    }
                    else
                        buffer += String.fromCharCode(c0)
                }
                else buffer += String.fromCharCode(c0);
            else buffer += String.fromCharCode(c0)
        }
        s = buffer;
        buffer = "";
        for (var cnt = 0; cnt < s.length; cnt++) {
            var c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                buffer += String.fromCharCode(65533);
            else buffer += String.fromCharCode(c0)
        }
        s = buffer;
        s = _htmlEncode(s);
        s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
        s = s.replace(/CRMEntityReferenceClose/g, ";");
        return s
    };

    var CrmXmlEncode = function (s) {
        if ("undefined" == typeof s || "unknown" == typeof s || null == s) return s;
        else if (typeof s != "string") s = s.toString();
        return innerSurrogateAmpersandWorkaround(s)
    };

    var CrmXmlDecode = function (s) {
        if (typeof s != "string") s = s.toString();
        return s;
    };

    var _padNumber = function (s, len) {
        len = len || 2;

        s = '' + s;
        while (s.length < len) {
            s = "0" + s;
        }
        return s;
    };

    var _encodeDate = function(dateTime) {
        return dateTime.getFullYear() + "-" +
               _padNumber(dateTime.getMonth() + 1) + "-" +
               _padNumber(dateTime.getDate()) + "T" +
               _padNumber(dateTime.getHours()) + ":" +
               _padNumber(dateTime.getMinutes()) + ":" +
               _padNumber(dateTime.getSeconds());
    };

    var _encodeValue = function(value) {
        return (typeof value === "object" && value.getTime)
               ? _encodeDate(value)
               : ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlEncode(value) : CrmXmlEncode(value));
    }

    var _context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        if (typeof GetGlobalContext != "undefined") {
            return GetGlobalContext();
        }
        else {
            if (typeof Xrm != "undefined") {
                if (typeof Xrm != "undefined") {
                    return Xrm.Page.context;
                }
                else {
                    if (typeof window.parent.Xrm != "undefined") {
                        return window.parent.Xrm.Page.context;
                    }
                }
            }
            else {
                throw new Error("Context is not available.");
            }
        }
    };

    var _getServerUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = _context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var _orgServicePath = function () {
        ///<summary>
        /// Private function to return the path to the organization service.
        ///</summary>
        ///<returns>String</returns>
        return _getServerUrl() + "/XRMServices/2011/Organization.svc/web";
        //TESTURL
        //return "http://localhost:5555/XRMServices/2011/Organization.svc/web";
    };

    var _dateReviver = function (key, value) {
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    };

    var _xrmValue = function (sType, sValue) {
        this.type = sType;
        this.value = sValue;
    };

    var _xrmEntityReference = function (gID, sLogicalName, sName) {
        this.id = gID;
        this.logicalName = sLogicalName;
        this.name = sName;
        this.type = 'EntityReference';
    };

    var _xrmOptionSetValue = function (iValue, sFormattedValue) {
        this.value = iValue;
        this.formattedValue = sFormattedValue;
        this.type = 'OptionSetValue';
    };

    var _businessEntity = function (logicalName,id) {
        ///<summary>
        /// A object represents a business entity for CRM 2011.
        ///</summary>
        ///<param name="logicalName" type="String">
        /// A String represents the name of the entity. 
        /// For example, "contact" means the business entity will be a contact entity
        ///<param name="id" type="String">
        /// A String represents the id of the entity. If not passed, it will be autopopulated as a empty guid string    
        this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
        this.logicalName = logicalName;
        this.attributes = new Object();
    };

    _businessEntity.prototype = {
        /**
        * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
        * @return {String} The serialized XML string of CRM entity.
        */
        serialize: function () {
                  
            var xml = ['<entity xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">'];
            xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');

            for (var attributeName in this.attributes) {
                var attribute = this.attributes[attributeName];
                
                xml.push('<a:KeyValuePairOfstringanyType>');
                xml.push('<b:key>', attributeName, '</b:key>');

                if (attribute === null || attribute.value === null) {
                    xml.push('<b:value i:nil="true" />');
                }
                else {
                    var sType = (!attribute.type)
                            ? typeof attribute
                            : ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlEncode(attribute.type) : CrmXmlEncode(attribute.type));

                    switch (sType) {
                        case "OptionSetValue":
                            var value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var encodedValue = _encodeValue(value);
                            xml.push('<b:value i:type="a:OptionSetValue">');
                            xml.push('<a:Value>', encodedValue, '</a:Value>', '</b:value>');
                            break;

                        case "EntityReference":
                            var _id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                            var encodedId = _encodeValue(_id);
                            var _logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                            var encodedLogicalName = _encodeValue(_logicalName);
                            xml.push('<b:value i:type="a:EntityReference">');
                            xml.push('<a:Id>',encodedId,'</a:Id>');
                            xml.push('<a:LogicalName>',encodedLogicalName,'</a:LogicalName>');
                            xml.push('<a:Name i:nil="true" />', '</b:value>');
                            break;

                        case "Money":
                            var value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var encodedValue = _encodeValue(value);
                            xml.push('<b:value i:type="a:Money">');
                            xml.push('<a:Value>', encodedValue, '</a:Value>', '</b:value>');
                            break;
                        
                        case "guid":
                            var value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var encodedValue = _encodeValue(value);
                            xml.push('<b:value i:type="c:guid" xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/">');
                            xml.push(encodedValue, '</b:value>');
                            break;

                        case "number":
                            var value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var encodedValue = _encodeValue(value);
                            var oType = (parseInt(encodedValue) == encodedValue) ? "c:int" : "c:decimal";
                            xml.push('<b:value i:type="', oType, '" xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/">');
                            xml.push(encodedValue, '</b:value>');
                            break;

                        default:
                            var value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                            var encodedValue = _encodeValue(value);
                            sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                            xml.push('<b:value i:type="c:', sType, '" xmlns:c="http://www.w3.org/2001/XMLSchema">', encodedValue, '</b:value>');
                            break;
                    }   
                }
                xml.push('</a:KeyValuePairOfstringanyType>');
            }

            xml.push('</a:Attributes><a:EntityState i:nil="true" />');
            xml.push('<a:FormattedValues xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />');
            xml.push('<a:Id>', _encodeValue(this.id), '</a:Id>');
            xml.push('<a:LogicalName>', this.logicalName, '</a:LogicalName>');
            xml.push('<a:RelatedEntities xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />');
            xml.push('</entity>');
            return xml.join("");
        },

        /**
        * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
        * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
        */
        deserialize: function (resultNode) {
            var obj = new Object();
            var resultNodes = resultNode.childNodes;

            for (var j = 0; j < resultNodes.length; j++) {
                switch (resultNodes[j].baseName) {
                    case "Attributes":
                        var attr = resultNodes[j];
                        for (var k = 0; k < attr.childNodes.length; k++) {
 
                            // Establish the Key for the Attribute
                            var sKey = attr.childNodes[k].firstChild.text;
                            var sType = '';
 
                            // Determine the Type of Attribute value we should expect
                            for (var l = 0; l < attr.childNodes[k].childNodes[1].attributes.length; l++) {
                                if (attr.childNodes[k].childNodes[1].attributes[l].baseName == 'type') {
                                    sType = attr.childNodes[k].childNodes[1].attributes[l].text;
                                }
                            }
 
                            switch (sType) {
                                case "a:OptionSetValue":
                                    var entOSV = new _xrmOptionSetValue();
                                    entOSV.type = sType.replace('a:','');
                                    entOSV.value = parseInt(attr.childNodes[k].childNodes[1].text);
                                    obj[sKey] = entOSV;
                                break;
 
                                case "a:EntityReference":
                                    var entRef = new _xrmEntityReference();
                                    entRef.type = sType.replace('a:', '');
                                    entRef.id = attr.childNodes[k].childNodes[1].childNodes[0].text;
                                    entRef.logicalName = attr.childNodes[k].childNodes[1].childNodes[1].text;
                                    entRef.name = attr.childNodes[k].childNodes[1].childNodes[2].text;
                                    obj[sKey] = entRef;
                                break;

                            case "a:Money":
                                    var entCV = new _xrmValue();
                                    entCV.type = sType.replace('a:', '');
                                    entCV.value = parseFloat(attr.childNodes[k].childNodes[1].text);
                                    obj[sKey] = entCV;
                                break;

                            default:
                                var entCV = new _xrmValue();
                                entCV.type = sType.replace('c:', '').replace('a:', '');
                                if (entCV.type == "int") {
                                    entCV.value = parseInt(attr.childNodes[k].childNodes[1].text);
                                }
                                else if (entCV.type == "decimal") {
                                    entCV.value = parseFloat(attr.childNodes[k].childNodes[1].text);
                                }
                                else if (entCV.type == "dateTime") {
                                    entCV.value = new Date(attr.childNodes[k].childNodes[1].text);
                                }
                                else if (entCV.type == "boolean") {
                                    entCV.value = (attr.childNodes[k].childNodes[1].text == 'false') ? false : true;
                                }
                                else {
                                    entCV.value = attr.childNodes[k].childNodes[1].text;
                                }                                
                                obj[sKey] = entCV;
                            break;
                            }
                        }
                        this.attributes = obj;
                    break;
 
                    case "Id":
                        this.id = resultNodes[j].text;
                    break;
 
                    case "LogicalName":
                        this.logicalName = resultNodes[j].text;
                    break;
 
                    case "FormattedValues":
                        var foVal = resultNodes[j];
 
                        for (var k = 0; k < foVal.childNodes.length; k++) {
                            // Establish the Key, we are going to fill in the formatted value of the already found attribute
                            var sKey = foVal.childNodes[k].firstChild.text;
                            this.attributes[sKey].formattedValue = foVal.childNodes[k].childNodes[1].text;
                        }
                    break;
                }
            }
        }
    };

    var _doRequest = function (soapBody, requestType, async, internalCallback) {
        async = async || false;

        // Wrap the Soap Body in a soap:Envelope.
        var soapXml =
        ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>",
            "<soap:Body>",
                "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">",
            "</soap:Body>",
            "</soap:Envelope>"
        ].join("");

        var req = new XMLHttpRequest();
        req.open("POST", _orgServicePath(), async)
        req.setRequestHeader("Accept", "application/xml, text/xml, */*");
        req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
        req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/" + requestType);

        req.send(soapXml);

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState == 4) { // "complete"
                    if (req.status == 200) { // "OK"
                        internalCallback(_processResponse(req.responseXML, req.responseText));
                    }
                    else {
                        throw new Error("HTTP-Requests ERROR: " + req.statusText);
                    }
                }
            };
        }
        else {
            var result = _processResponse(req.responseXML);
            return !!internalCallback ? internalCallback(result) : result;
        }
    };

    var _processResponse = function (responseXml, responseText) {

        if (responseXml === null || responseXml.xml === null || responseXml.xml === "") {
            if (responseText !== null && responseText !== "")
                throw new Error(responseText);
            else
                throw new Error("No response received from the server. ");
        }

        // Report the error if occurred
        var error = responseXml.selectSingleNode("//error");
        var faultString = responseXml.selectSingleNode("//faultstring");

        if (error !== null || faultString !== null) {
            throw new Error(error !== null ? responseXml.selectSingleNode('//description').nodeTypedValue : faultString.text);
        }

        // Load responseXML and return as an XML object
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(responseXml.xml);
        return xmlDoc;
    };

    var _create = function (businessEntity, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to create a new record.
        ///</summary>
        ///<param name="businessEntity" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var request = businessEntity.serialize();

        var async = !!callback;

        return _doRequest(request, "Create", async, function (resultXml) {
            var response = resultXml.selectSingleNode("//CreateResponse/CreateResult");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));

            if (!async)
                return result;
            else
                callback(result);
        });
    };

    var _update = function (businessEntity, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to update an existing record.
        ///</summary>
        ///<param name="businessEntity" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for update operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var request = businessEntity.serialize();

        var async = !!callback;

        return _doRequest(request, "Update", async, function (resultXml) {
            var response = resultXml.selectSingleNode("//UpdateResponse");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));

            if (!async)
                return result;
            else
                callback(result);
        });
    };

    var _delete = function (entityName, id, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to delete a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for delete operations.
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for delete operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var request =
                [
                    "<entityName>", entityName, "</entityName>",
                    "<id>", id, "</id>"
                ].join("");

        var async = !!callback;

        return _doRequest(request, "Delete", async, function (resultXml) {
            var response = resultXml.selectSingleNode("//DeleteResponse");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));

            if (!async)
                return result;
            else
                callback(result);
        });
    };

    var _execute = function (request, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to execute a soap request.
        ///</summary>
        ///<param name="request" type="String">
        /// A JavaScript string corresponding to the soap request
        /// that are valid for execute operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var async = !!callback;

        return _doRequest(request, "Execute", async, function (resultXml) {
            if (!async)
                return resultXml;
            else
                callback(resultXml);
        });
    };

    var _fetch = function (fetchXml, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a fetch request.
        ///</summary>
        ///<param name="fetchXml" type="String">
        /// A JavaScript String with properties corresponding to the fetchXml 
        /// that are valid for fetch operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var msgBody = "<query i:type='a:FetchExpression' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>" +
                            "<a:Query>" +
                                ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlEncode(fetchXml) : CrmXmlEncode(fetchXml)) +
                            "</a:Query>" +
                        "</query>";
        var async = !!callback;

        return _doRequest(msgBody, "RetrieveMultiple", !!callback, function (resultXml) {

            var fetchResult = resultXml.selectSingleNode("//a:Entities");
            var results = [];

            for (var i = 0; i < fetchResult.childNodes.length; i++) {
                var entity = new _businessEntity();

                entity.deserialize(fetchResult.childNodes[i]);
                results[i] = entity;
            }

            if (!async)
                return results;
            else
                callback(results);
        });
    };

    var _retrieve = function (entityName, id, columnSet, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for retrieve operations.
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for retrieve operations.
        ///<param name="columnSet" type="Array">
        /// A JavaScript Array corresponding to the attributes of
        /// entity that is used for retrieve operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var attributes = "";
        var query = "";
        if (columnSet != null) {
            for (var i = 0; i < columnSet.length; i++) {
                attributes += "<b:string>" + columnSet[i] + "</b:string>";
            }
            query = "<a:AllColumns>false</a:AllColumns>" +
                    "<a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                        attributes +
                    "</a:Columns>";
        }
        else {
            query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
        }

        var msgBody =
            [
                "<entityName>", entityName, "</entityName>",
                "<id>", id, "</id>",
                "<columnSet xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                    query,
                "</columnSet>"
            ].join("");

        var async = !!callback;

        return _doRequest(msgBody, "Retrieve", !!callback, function (resultXml) {

            var retrieveResult = resultXml.selectSingleNode("//RetrieveResult");

            var entity = new _businessEntity();
            entity.deserialize(retrieveResult);

            if (!async)
                return entity;
            else
                callback(entity);
        });
    };

    var _retrieveMultiple = function (query, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a retrieveMultiple request.
        ///</summary>
        ///<param name="query" type="String">
        /// A JavaScript String with properties corresponding to the retrievemultiple request 
        /// that are valid for retrievemultiple operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var msgBody =
                [
                    "<query i:type='a:QueryExpression' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>", query, "</query>"
                ].join("");

        var async = !!callback;

        return _doRequest(msgBody, "RetrieveMultiple", async, function (resultXml) {
            var resultNodes = resultXml.selectSingleNode("//a:Entities");
            var results = [];

            for (var i = 0; i < resultNodes.childNodes.length; i++) {
                var entity = new _businessEntity();

                entity.deserialize(resultNodes.childNodes[i]);
                results[i] = entity;
            }

            if (!async)
                return results;
            else
                callback(results);
        });
    };

    var _joinArray = function (prefix, array, suffix) {
        var output = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] != '' && array[i] != undefined) {
                output.push(prefix, array[i], suffix);
            }
        }
        return output.join("");
    };

    var _joinConditionPair = function (attributes, values) {
        var output = [];
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i] != '') {
                output.push("<condition attribute='", attributes[i], "' operator='eq' value='", values[i], "' />");
            }
        }
        return output.join("");
    };

    var _isArray = function (input) {
        return input.constructor.toString().indexOf("Array") != -1;
    };

    var _queryByAttribute = function (queryOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a queryByAttribute request.
        ///</summary>
        ///<param name="queryOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the queryByAttribute Criteria 
        /// that are valid for queryByAttribute operations.
        /// queryOptions.entityName is a string represents the name of the entity
        /// queryOptions.attributes is a array represents the attributes of the entity to query
        /// queryOptions.values is a array represents the values of the attributes to query
        /// queryOptions.columnSet is a array represents the attributes of the entity to return
        /// queryOptions.orderby is a array represents the oder conditons of the results
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var entityName = queryOptions.entityName;
        var attributes = queryOptions.attributes;
        var values = queryOptions.values;
        var columnSet = queryOptions.columnSet;
        var orderby = queryOptions.orderby || '';

        attributes = _isArray(attributes) ? attributes : [attributes];
        values = _isArray(values) ? values : [values];
        orderby = (!!orderby && _isArray(orderby)) ? orderby : [orderby];
        columnSet = (!!columnSet && _isArray(columnSet)) ? columnSet : [columnSet];

        for (var i = 0; i < values.length; i++) {
            values[i] = _encodeValue(values[i]);
        }

        var xml =
                [
                    "<fetch mapping='logical'>",
                    "   <entity name='", entityName, "'>",
                           _joinArray("<attribute name='", columnSet, "' />"),
                           _joinArray("<order attribute='", orderby, "' />"),
                    "      <filter>",
                              _joinConditionPair(attributes, values),
                    "      </filter>",
                    "   </entity>",
                    "</fetch>"
                ].join("");

        return _fetch(xml, callback);
    };

    var _setState = function (entityName, id, stateCode, statusCode, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to setState of a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for setState operations.
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for setState operations.
        ///<param name="stateCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity state that is used for setState operations.
        ///<param name="statusCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity status that is used for setState operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var request = [
            "<request i:type='b:SetStateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<c:key>EntityMoniker</c:key>",
                        "<c:value i:type='a:EntityReference'>",
                          "<a:Id>", id, "</a:Id>",
                          "<a:LogicalName>", entityName, "</a:LogicalName>",
                          "<a:Name i:nil='true' />",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>State</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", stateCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>Status</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", statusCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>SetState</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return _doRequest(request, "Execute", async, function (resultXml) {

            var response = resultXml.selectSingleNode("//ExecuteResponse/ExecuteResult");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));
            if (!async)
                return result;
            else
                callback(result);
        });
    };

    var _associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        //<summary>
        /// Sends synchronous/asynchronous request to associate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for associate operations.
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for associate operations.
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for associate operations.
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for associate operations.
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for associate operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = _isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0; i < relatedEntities.length; i++) {
            if (relatedEntities[i].id != '') {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />", 
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", targetId, "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole i:nil='true' />",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>", 
                        relatedXml, 
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Associate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return _doRequest(request, "Execute", async, function (resultXml) {

            var response = resultXml.selectSingleNode("//ExecuteResponse/ExecuteResult");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));
            if (!async)
                return result;
            else
                callback(result);
        });
    };

    var _disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        //<summary>
        /// Sends synchronous/asynchronous request to disassociate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for disassociate operations.
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for disassociate operations.
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for disassociate operations.
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for disassociate operations.
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for disassociate operations.
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = _isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0; i < relatedEntities.length; i++) {
            if (relatedEntities[i].id != '') {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", targetId, "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole i:nil='true' />",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>",
                        relatedXml,
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Disassociate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return _doRequest(request, "Execute", async, function (resultXml) {

            var response = resultXml.selectSingleNode("//ExecuteResponse/ExecuteResult");
            var result = ((typeof CrmEncodeDecode != 'undefined') ? CrmEncodeDecode.CrmXmlDecode(response.text) : CrmXmlDecode(response.text));
            if (!async)
                return result;
            else
                callback(result);
        });
    };    

    var _getCurrentUserId = function() {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user.
        ///</summary>
        var request = "<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>" +
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />" +
                        "<a:RequestId i:nil='true' />" +
                        "<a:RequestName>WhoAmI</a:RequestName>" +
                      "</request>";
        var xmlDoc = _doRequest(request, "Execute");

        return xmlDoc.getElementsByTagName("a:Results")[0].childNodes[0].childNodes[1].text;
    };

    var _getCurrentUserBusinessUnitId = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user's business unit.
        ///</summary>
        var request = "<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>" +
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />" +
                        "<a:RequestId i:nil='true' />" +
                        "<a:RequestName>WhoAmI</a:RequestName>" +
                      "</request>";
        var xmlDoc = _doRequest(request, "Execute");

        return xmlDoc.getElementsByTagName("a:Results")[0].childNodes[1].childNodes[1].text;
    };

    var _getCurrentUserRoles = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the list of the current user's roles.
        ///</summary>
        var xml =
                [
                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>" +
                      "<entity name='role'>" +
                        "<attribute name='name' />" +
                        "<attribute name='businessunitid' />" +
                        "<attribute name='roleid' />" +
                        "<order attribute='name' descending='false' />" +
                        "<link-entity name='systemuserroles' from='roleid' to='roleid' visible='false' intersect='true'>" +
                          "<link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='aa'>" +
                            "<filter type='and'>" +
                              "<condition attribute='systemuserid' operator='eq-userid' />" +
                            "</filter>" +
                          "</link-entity>" +
                        "</link-entity>" +
                      "</entity>" +
                    "</fetch>"
                ].join("");

        var fetchResult = _fetch(xml);
        var roles = [];

        if (fetchResult !== null) {
            for (var i = 0; i < fetchResult.length; i++) {
                roles[i] = fetchResult[i].attributes["name"].value;
            }
        }

        return roles;
    };

    var _isCurrentUserInRole = function () {
        ///<summary>
        /// Sends synchronous request to check if the current user has certain roles
        /// Passs name of role as arguments. For example, IsCurrentUserInRole('System Administrator')
        /// Returns true or false.
        ///</summary>
        var roles = _getCurrentUserRoles();
        for (var i = 0; i < roles.length; i++) {
            for (var j = 0; j < arguments.length; j++) {
                if (roles[i] === arguments[j]) {
                    return true;
                }
            }
        }

        return false;
    };

    //Toolkit's Return Static Methods
    return {
        BusinessEntity: _businessEntity,
        Execute: _execute,
        Fetch: _fetch,
        Retrieve: _retrieve,
        RetrieveMultiple: _retrieveMultiple,
        Create: _create,
        Update: _update,
        Delete: _delete,
        QueryByAttribute: _queryByAttribute,
        SetState: _setState,
        Associate: _associate,
        Disassociate: _disassociate,
        GetCurrentUserId : _getCurrentUserId,
        GetCurrentUserBusinessUnitId : _getCurrentUserBusinessUnitId,
        GetCurrentUserRoles : _getCurrentUserRoles,
        IsCurrentUserRole : _isCurrentUserInRole
    };

} ();

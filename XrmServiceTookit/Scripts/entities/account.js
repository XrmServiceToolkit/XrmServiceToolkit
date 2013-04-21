/// <reference path="../helper/json2.js" />
/// <reference path="../helper/jquery.js" />
/// <reference path="../helper/XrmServiceToolkit.js" />
/// <reference path="../helper/XrmPageTemplate.js" />

account_onLoad = function () {
    try {
        XrmServiceToolkit.Common.AddNotification('this is a test message', 1);
        alert(XrmServiceToolkit.Common.GetObjectTypeCode('account'));
    }
    catch (err) {
        alert(err.message);
    }
};

account_accountcategorycode_onChange = function () {
    try {
        //XrmServiceToolkit.Extension.JQueryXrmDependentOptionSet("new_JQueryDependentOptionSetConfig");
    }
    catch (err) {
        alert(err.message);
    }
};
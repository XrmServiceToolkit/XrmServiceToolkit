/// <reference path="../helper/json2.js" />
/// <reference path="../helper/jquery.js" />
/// <reference path="../helper/XrmServiceToolkit.js" />
/// <reference path="../helper/XrmPageTemplate.js" />

account_onLoad = function () {
    try {
        XrmServiceToolkit.Common.AddNotification('this is a test message', 1);
        alert(XrmServiceToolkit.Common.GetObjectTypeCode('account'));

        var createAccount = new XrmServiceToolkit.Soap.BusinessEntity("account");
        createAccount.attributes["name"] = "Test Account Name";
        createAccount.attributes["description"] = "This account was created by the XrmServiceToolkit.Soap.Create() sample.";
        createAccount.attributes["preferredcontactmethodcode"] = { value: 2, type: "OptionSetValue" };
        createAccount.attributes["revenue"] = { value: 2000.00, type: "Money" };
        createAccount.attributes["donotphone"] = false;

        XrmServiceToolkit.Soap.Create(createAccount, function(result) {
            if (result != null) {
                alert(result);
            }
        });
        
        XrmServiceToolkit.Extension.JQueryXrmDependentOptionSet("new_JQueryDependentOptionSetConfig");

        //XrmServiceToolkit.Common.DisableAllControlsInTab(0);

        var queryOptions = {
            entityName: "contact1",
            attributes: ["statecode"],
            values: ["aaajsjsjs"],
            columnSet: ["firstname", "lastname", "middlename", "familystatuscode", "ownerid", "creditlimit", "birthdate", "donotemail", "donotphone"],
            orderBy: ["firstname", "lastname"] // Order by firstname and then lastname even though we are only getting one record back
        };

        XrmServiceToolkit.Soap.QueryByAttribute(queryOptions, function(result) {
        try {
            alert("success");
        } catch (e) {
            alert(e.message);
        } 

        });

    }
    catch (err) {
        alert(err.message);
    }
};

account_accountcategorycode_onChange = function () {
    try {
        XrmServiceToolkit.Extension.JQueryXrmDependentOptionSet("new_JQueryDependentOptionSetConfig");
    }
    catch (err) {
        alert(err.message);
    }
};
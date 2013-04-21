/// <reference path="../helper/json2.js" />
/// <reference path="../helper/jquery.js" />
/// <reference path="../helper/XrmServiceToolkit.js" />
/// <reference path="../helper/XrmPageTemplate.js" />

var testMethod = function () {
    try {
        var currentRecordId = null;

        if (Xrm.Page.data) {
            currentRecordId = Xrm.Page.data.entity.getId();
        }
        else if (window.opener.Xrm.Page.data) {
            currentRecordId = window.opener.Xrm.Page.data.entity.getId();
        }
        else {
            alert("Something is wrong to get recordid. Please contact administrtor for the issue.");
        }
        
        var createContact = new XrmServiceToolkit.Soap.BusinessEntity("contact");
        createContact.attributes["firstname"] = "Jaimie";
        createContact.attributes["lastname"] = "Ji";
        createContact.attributes["gendercode"] = { value: 1, type: "OptionSetValue" };
        createContact.attributes["familystatuscode"] = { value: 1, type: "OptionSetValue" }; // Picklist : Single - 1
        createContact.attributes["creditlimit"] = { value: 2, type: "Money" };
        createContact.attributes["birthdate"] = new Date();
        createContact.attributes["donotemail"] = true;
        createContact.attributes["donotphone"] = false;
        createContact.attributes["parentcustomerid"] = { id: currentRecordId, logicalName: "account", type: "EntityReference" };

        var contactId = XrmServiceToolkit.Soap.Create(createContact);

        var cols = ["firstname", "lastname""familystatuscode", "ownerid", "creditlimit", "birthdate", "donotemail", "donotphone"];
        var retrievedContact = XrmServiceToolkit.Soap.Retrieve("contact", contactId, cols);
        if (retrievedContact != null) {
            alert(retrievedContact.attributes['firstname'].value);
        }
    }
    catch (err) {
        alert(err.message);
    }
};

testMethod();

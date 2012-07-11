/// <reference path="../helper/json2.js" />
/// <reference path="../helper/jquery.js" />
/// <reference path="../helper/XrmServiceToolkit.js" />
/// <reference path="../helper/XrmPageTemplate.js" />

account_onLoad = function () {
    try {
        //Examples about how to use the extension mehtods.
        XrmServiceToolkit.Extension.JQueryXrmFieldTooltip("new_JQueryFieldTooltipConfig");
        XrmServiceToolkit.Extension.JQueryXrmDependentOptionSet("new_JQueryDependentOptionSetConfig");
        XrmServiceToolkit.Extension.JQueryXrmCustomFilterView("new_JQueryLookupCustomFilterViewConfig");

        XrmServiceToolkit.Common.DisableAllControlsInSection('general');
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
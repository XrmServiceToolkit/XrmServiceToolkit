/// <reference path="../typings/main.d.ts" />
import {alertMessage, getClientUrl} from "./Helper";
        // JQueryXrmFieldTooltip: jQueryXrmFieldTooltip,
        // JQueryXrmDependentOptionSet: jQueryXrmDependentOptionSet,
        // JQueryXrmCustomFilterView: jQueryXrmCustomFilterView,
        // JQueryXrmFormatNotesControl: jQueryXrmFormatNotesControl

export default class Extension {
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
    static JQueryXrmFieldTooltip(filename: string, bDisplayImg: boolean): void {
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
            alertMessage("XrmServiceToolkit.Extension.JQueryXrmFieldTooltip is not supported in CRM2013.\nPlease use the out of box functionality");
            return;
        }

        if (typeof jQuery === "undefined") {
            let errorMessage = ("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
            alertMessage(errorMessage);
            return;
        }

        /**
         * Appends a help tooltip to an attribute
         *
         * @param {string} entity Entityname
         * @param {string} attr Attributename
         * @param {string} txt Help description
         */
        function registerHelp(entity: string, attr: string, txt:string): void {
            let obj = jQuery("#" + attr + "_c").children(":first");
            if (obj != null) {
                let html = `
                    <img id="img_${attr}" src="/_imgs/ico/16_help.gif" alt="${txt}" width="16" height="16" /><div id="help_${attr}" style="visibility: hidden; position: absolute;">: ${txt}</div>
                `;
                jQuery(obj).append(html);
                // 20110909 GP: added line to hide/show help image
                jQuery("#img_" + attr).css("display", (bDisplayImg) ? "inline" : "none");
            }
        }

        // ****************************************************
        function parseHelpXml(data: any): void {
            let entity = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            let entXml = jQuery("entity[name=" + entity + "]", data);
            jQuery(entXml).children().each(() => {
                let attr = jQuery(this).attr("name");
                let txt = jQuery(this).find("shorthelp").text();
                registerHelp(entity, attr, txt);
            });
        }

        jQuery.support.cors = true;

        jQuery.ajax({
            type: "GET",
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: parseHelpXml,
            // ReSharper disable UnusedParameter
            error: (xmlHttpRequest, textStatus, errorThrown) => {
                // ReSharper restore UnusedParameter
                alertMessage("Something is wrong to setup the tooltip for the fields. Please contact your administrator");
            }
        }); // end Ajax
    }

    // Generic Dependent Option Set Function. Changed from CRM 2011 SDK example
    /**
     * A generic configurable method to configure dependent optionset for CRM 2011 instance
     *
     * @param {string} filename A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
     */
    static JQueryXrmDependentOptionSet(filename: string): void {
        if (typeof jQuery === "undefined") {
            alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
            return;
        }

        // This is the function set on the OnChange event for
        // parent fields.
        // ReSharper disable DuplicatingLocalDeclaration
        function filterDependentField(parentField: string, childField: string, jQueryXrmDependentOptionSet: Xrm.Page.OptionSetAttribute) {
            // ReSharper restore DuplicatingLocalDeclaration
            for (let depOptionSet in this.JQueryXrmDependentOptionSet.config) {
                if (this.JQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
                    let dependentOptionSet = this.JQueryXrmDependentOptionSet.config[depOptionSet];
                    /* Match the parameters to the correct dependent optionset mapping*/
                    if ((dependentOptionSet.parent === parentField) && (dependentOptionSet.dependent === childField)) {
                        /* Get references to the related fields*/
                        let parent: Xrm.Page.OptionSetAttribute = <Xrm.Page.OptionSetAttribute>Xrm.Page.data.entity.attributes.get(parentField);
                        let child: Xrm.Page.OptionSetAttribute = <Xrm.Page.OptionSetAttribute>Xrm.Page.data.entity.attributes.get(childField);

                        let parentControl = Xrm.Page.getControl(parentField);
                        let childControl = Xrm.Page.getControl(childField);
                        /* Capture the current value of the child field*/
                        let currentChildFieldValue = (<Xrm.Page.OptionSetAttribute>child).getValue();

                        /* If the parent field is null the Child field can be set to null */
                        let controls: Array<Xrm.Page.Control>;
                        let ctrl: string;
                        if (parent.getValue() === null) {
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

                        for (let os in dependentOptionSet.options) {
                            if (dependentOptionSet.options.hasOwnProperty(os)) {
                                let options = dependentOptionSet.options[os];
                                let optionsToShow = options.showOptions;
                                /* Find the Options that corresponds to the value of the parent field. */
                                if (parent.getValue().toString() === options.value.toString()) {
                                    controls = child.controls.get(); /*Enable the field and set the options*/
                                    for (ctrl in controls) {
                                        if (controls.hasOwnProperty(ctrl)) {
                                            controls[ctrl].setDisabled(false);
                                            (<Xrm.Page.OptionSetControl>controls[ctrl]).clearOptions();

                                            for (let option in optionsToShow) {
                                                if (optionsToShow.hasOwnProperty(option)) {
                                                    (<Xrm.Page.OptionSetControl>controls[ctrl]).addOption(optionsToShow[option]);
                                                }
                                            }
                                        }
                                    }
                                    /*Check whether the current value is valid*/
                                    let bCurrentValueIsValid = false;
                                    let childFieldOptions = optionsToShow;

                                    for (let validOptionIndex in childFieldOptions) {
                                        if (childFieldOptions.hasOwnProperty(validOptionIndex)) {
                                            let optionDataValue = childFieldOptions[validOptionIndex].value;

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
                                    } else {
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
        function init(data: any): void {
            let entity: string = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            let configWr: JQuery = jQuery("entity[name=" + entity + "]", data);

            // Convert the XML Data into a JScript object.
            let parentFields: JQuery = configWr.children("ParentField");
            let jsConfig: Array<any> = [];
            for (let i = 0, ilength = parentFields.length; i < ilength; i++) {
                let node = parentFields[i];
                let mapping: any = {};
                mapping.parent = jQuery(node).attr("id");
                mapping.dependent = jQuery(node).children("DependentField:first").attr("id");
                mapping.options = [];
                let options = jQuery(node).children("Option");
                for (let a = 0, alength = options.length; a < alength; a++) {
                    let option: any = {};
                    option.value = jQuery(options[a]).attr("value");
                    option.showOptions = [];
                    let optionsToShow = jQuery(options[a]).children("ShowOption");
                    for (let b = 0, blength = optionsToShow.length; b < blength; b++) {
                        let optionToShow: any = {};
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
            for (let depOptionSet in this.JQueryXrmDependentOptionSet.config) {
                if (this.JQueryXrmDependentOptionSet.config.hasOwnProperty(depOptionSet)) {
                    let parent = this.JQueryXrmDependentOptionSet.config[depOptionSet].parent;
                    let child = this.JQueryXrmDependentOptionSet.config[depOptionSet].dependent;
                    filterDependentField(parent, child, this.JQueryXrmDependentOptionSet);
                }
            }
        }

        jQuery.support.cors = true;

        jQuery.ajax({
            type: "GET",
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: init,
            // ReSharper disable UnusedParameter
            error: (xmlHttpRequest, textStatus, errorThrown) => {
                // ReSharper restore UnusedParameter
                alertMessage("Something is wrong to setup the dependent picklist. Please contact your administrator");
            }
        }); // end Ajax
    };

    /**
     * (A generic configurable method to add custom filter view to lookup field in crm 2011 instance
     *
     * @param {string} filename A JavaScript String corresponding the name of the configuration web resource name in CRM 2011 instance
     */
    static JQueryXrmCustomFilterView(filename: string): void {
        if (typeof jQuery === "undefined") {
            alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
            return;
        }

        function setCustomFilterView(target: string, entityName: string, viewName: string, fetchXml: string, layoutXml: string): void {
            // use randomly generated GUID Id for our new view
            let viewId: string = "{1DFB2B35-B07C-44D1-868D-258DEEAB88E2}";

            // add the Custom View to the indicated [lookupFieldName] Control
            Xrm.Page.getControl<Xrm.Page.LookupControl>(target).addCustomView(viewId, entityName, viewName, fetchXml, layoutXml, true);
        }

        function xmlToString(responseXml: Node): string {
            let xmlString = "";
            try {
                if (responseXml != null) {
                    if (typeof XMLSerializer !== "undefined" && typeof (<any>responseXml).xml === "undefined") {
                        // ReSharper disable InconsistentNaming
                        xmlString = (new XMLSerializer()).serializeToString(responseXml);
                        // ReSharper restore InconsistentNaming
                    } else {
                        if (typeof (<any>responseXml).xml !== "undefined") {
                            xmlString = responseXml.xml;
                        }
                        else if (typeof (<any>responseXml)[0].xml !== "undefined") {
                            xmlString = (<any>responseXml)[0].xml;
                        }

                    }
                }
            } catch (e) {
                alertMessage("Cannot convert the XML to a string.");
            }
            return xmlString;
        }

        function init(data: any): void {
            let entity: string = Xrm.Page.data.entity.getEntityName().toString().toLowerCase();
            let configWr: JQuery = jQuery("entity[name=" + entity + "]", data);

            // Convert the XML Data into a JScript object.
            let targetFields = configWr.children("TargetField");
            let jsConfig: Array<any> = [];
            for (let i = 0, ilength = targetFields.length; i < ilength; i++) {
                let node: JQuery = targetFields[i];
                let mapping: any = {};
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
            for (let customFilterView in this.JQueryXrmCustomFilterView.config) {
                if (this.JQueryXrmCustomFilterView.config.hasOwnProperty(customFilterView)) {
                    let target = this.JQueryXrmCustomFilterView.config[customFilterView].target;
                    let entityName = this.JQueryXrmCustomFilterView.config[customFilterView].entityName;
                    let viewName = this.JQueryXrmCustomFilterView.config[customFilterView].viewName;
                    let dynamic = this.JQueryXrmCustomFilterView.config[customFilterView].dynamic;
                    let fetchXml = this.JQueryXrmCustomFilterView.config[customFilterView].fetchXml;
                    let layoutXml = this.JQueryXrmCustomFilterView.config[customFilterView].layoutXml;

                    // TODO: Adding logics for various field and conditions. More tests required.
                    if (dynamic != null) {
                        for (let a = 0, alength = dynamic.length; a < alength; a++) {
                            let dynamicControlType = Xrm.Page.getControl(jQuery(dynamic).attr("name")).getControlType();
                            let fieldValueType = jQuery(dynamic).attr("fieldvaluetype"); // for optionset, name might be used to filter
                            if ((<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getValue() === null) {
                                alertMessage(jQuery(dynamic).attr("name") + " does not have a value. Please put validation logic on the field change to call this function. Only use XrmServiceToolkit.Extension.JQueryXrmCustomFilterView when the field has a value.");
                                return;
                            }
                            let dynamicValue: any = null;
                            switch (dynamicControlType) {
                            case "standard":
                                dynamicValue = (<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getValue();
                                break;
                            case "optionset":
                                dynamicValue = (fieldValueType != null && fieldValueType === "label") ? (<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getSelectionOption().text : (<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getValue();
                                break;
                            case "lookup":
                                dynamicValue = (fieldValueType != null && fieldValueType === "name") ? (<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getValue()[0].name : (<any>Xrm).Page.getAttribute(jQuery(dynamic).attr("name")).getValue()[0].id;
                                break;
                            default:
                                alertMessage(jQuery(dynamic).attr("name") + " is not supported for filter lookup view. Please change the configuration.");
                                break;
                            }

                            let operator = jQuery(dynamic).attr("operator");
                            if (operator === null) {
                                alertMessage("operator is missing in the configuration file. Please fix the issue");
                                return;
                            }
                            let dynamicString = jQuery(dynamic).attr("fetchnote");
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
            url: getClientUrl() + "/WebResources/" + filename,
            dataType: "xml",
            success: init,
            // ReSharper disable UnusedParameter
            error: (xmlHttpRequest, textStatus, errorThrown) => {
                // ReSharper restore UnusedParameter
                alertMessage("Something is wrong to setup the custom filter view. Please contact your administrator");
            }
        }); // end Ajax

    };

    // Disable or Enable to insert/edit note for entity. Unsupported because of DOM object edit
    /**
     * A generic configurable method to format the note control in crm 2011 instance
     *
     * @param {boolean} allowInsert A JavaScript boolean to format if the note control allow insert
     * @param {boolean} allowEdit A JavaScript boolean to format if the note control allow edit
     */
    static JQueryXrmFormatNotesControl(allowInsert: boolean, allowEdit: boolean): void {
        if (Xrm.Page.ui.setFormNotification !== undefined) {
            alertMessage("XrmServiceToolkit.Extension.JQueryXrmFormatNotesControl is not supported in CRM2013");
            return;
        }

        if (typeof jQuery === "undefined") {
            alertMessage("jQuery is not loaded.\nPlease ensure that jQuery is included\n as web resource in the form load.");
            return;
        }

        jQuery.support.cors = true;

        let notescontrol = jQuery("#notescontrol");
        if (notescontrol === null || notescontrol === undefined) return;
        let url = notescontrol.attr("url");
        if (url != null) {
            if (!allowInsert) {
                url = url.replace("EnableInsert=true", "EnableInsert=false");
            } else if (!allowEdit) {
                url = url.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
            }
            notescontrol.attr("url", url);
        } else {
            let src = notescontrol.attr("src");
            if (src != null) {
                if (!allowInsert) {
                    src = src.replace("EnableInsert=true", "EnableInsert=false");
                } else if (!allowEdit) {
                    src = src.replace("EnableInlineEdit=true", "EnableInlineEdit=false");
                }
                notescontrol.attr("src", src);
            }
        }
    }
}
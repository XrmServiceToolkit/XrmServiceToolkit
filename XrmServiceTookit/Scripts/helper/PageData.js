var pageData = {
    "xrmUtilityExists": true,
    "Event": "onload",
    "SaveMode": null,
    "EventSource": null,
    "AuthenticationHeader": "&lt;soap:Header&gt;&lt;CrmAuthenticationToken xmlns=\"http&#58;&#47;&#47;schemas.microsoft.com&#47;crm&#47;2007&#47;WebServices\"&gt;&lt;AuthenticationType xmlns=\"http&#58;&#47;&#47;schemas.microsoft.com&#47;crm&#47;2007&#47;CoreTypes\"&gt;3&lt;/AuthenticationType&gt;&lt;CrmTicket xmlns=\"http&#58;&#47;&#47;schemas.microsoft.com&#47;crm&#47;2007&#47;CoreTypes\"&gt;&lt;/CrmTicket&gt;&lt;OrganizationName xmlns=\"http&#58;&#47;&#47;schemas.microsoft.com&#47;crm&#47;2007&#47;CoreTypes\"&gt;jaimieji&lt;/OrganizationName&gt;&lt;CallerId xmlns=\"http&#58;&#47;&#47;schemas.microsoft.com&#47;crm&#47;2007&#47;CoreTypes\"&gt;00000000-0000-0000-0000-000000000000&lt;/CallerId&gt;&lt;/CrmAuthenticationToken&gt;&lt;/soap:Header&gt;",
    "CurrentTheme": "Default",
    "OrgLcid": 1033,
    "OrgUniqueName": "XrmServiceToolkitDev",
    "QueryStringParameters": { "_gridType": "1", "etc": "1", "id": "{23DE412D-5940-E211-B148-D48564519C24}", "pagemode": "iframe", "preloadcache": "1354877028374", "rskey": "295304538" },
    "ServerUrl": "http://localhost:5555/XrmServiceToolkit",
    "UserId": "{03327570-43A1-418E-AA58-8EDE97E4A101}",
    "UserLcid": 1033,
    "UserRoles": ["aae85351-6829-e211-af68-d48564519c24", "98f25351-6829-e211-af68-d48564519c24"],
    "isOutlookClient": false,
    "isOutlookOnline": true,
    "DataXml": "&lt;account&gt;&lt;/account&gt;",
    "EntityName": "account",
    "Id": "{23DE412D-5940-E211-B148-D48564519C24}",
    "IsDirty": false,
    "CurrentControl": "name",
    "CurrentForm": null,
    "Forms": [],
    "FormType": 2,
    "ViewPortHeight": 306,
    "ViewPortWidth": 795,
    "AttributesLength": 53,
    "Attributes": [
    { "Name": "name", "Value": "A Store (sample)", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "required", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 160, "Controls": [{ "Name": "name"}] },
    { "Name": "telephone1", "Value": "555-0136", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 50, "Controls": [{ "Name": "telephone1"}] },
    { "Name": "primarycontactid", "Value": [{ "entityType": "contact", "id": "{87DE412D-5940-E211-B148-D48564519C24}", "name": "Adrian Dumitrascu (sample)"}], "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "primarycontactid"}] },
    { "Name": "telephone2", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 50, "Controls": [{ "Name": "telephone2"}] },
    { "Name": "accountnumber", "Value": "ABSS4G45", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 20, "Controls": [{ "Name": "accountnumber"}] },
    { "Name": "fax", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 50, "Controls": [{ "Name": "fax"}] },
    { "Name": "parentaccountid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "parentaccountid"}] },
    { "Name": "websiteurl", "Value": null, "Type": "string", "Format": "url", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 200, "Controls": [{ "Name": "websiteurl"}] },
    { "Name": "emailaddress1", "Value": "someone1@example.com", "Type": "string", "Format": "email", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 100, "Controls": [{ "Name": "emailaddress1"}] },
    { "Name": "address1_addresstypecode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Bill To", "value": 1 }, { "text": "Ship To", "value": 2 }, { "text": "Primary", "value": 3 }, { "text": "Other", "value": 4 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "address1_addresstypecode"}] },
    { "Name": "address1_city", "Value": "Renton", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 80, "Controls": [{ "Name": "address1_city"}] },
    { "Name": "address1_name", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 200, "Controls": [{ "Name": "address1_name"}] },
    { "Name": "address1_stateorprovince", "Value": "TX", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 50, "Controls": [{ "Name": "address1_stateorprovince"}] },
    { "Name": "address1_line1", "Value": "5009 Orange Street", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 250, "Controls": [{ "Name": "address1_line1"}] },
    { "Name": "address1_postalcode", "Value": "20175", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 20, "Controls": [{ "Name": "address1_postalcode"}] },
    { "Name": "address1_line2", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 250, "Controls": [{ "Name": "address1_line2"}] },
    { "Name": "address1_country", "Value": "U.S.", "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 80, "Controls": [{ "Name": "address1_country"}] },
    { "Name": "address1_line3", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 250, "Controls": [{ "Name": "address1_line3"}] },
    { "Name": "address1_telephone1", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 50, "Controls": [{ "Name": "address1_telephone1"}] },
    { "Name": "address1_shippingmethodcode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Airborne", "value": 1 }, { "text": "DHL", "value": 2 }, { "text": "FedEx", "value": 3 }, { "text": "UPS", "value": 4 }, { "text": "Postal Mail", "value": 5 }, { "text": "Full Load", "value": 6 }, { "text": "Will Call", "value": 7 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "address1_shippingmethodcode"}] },
    { "Name": "address1_freighttermscode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "FOB", "value": 1 }, { "text": "No Charge", "value": 2 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "address1_freighttermscode"}] },
    { "Name": "description", "Value": null, "Type": "memo", "Format": "textarea", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 2000, "Controls": [{ "Name": "description"}] },
    { "Name": "industrycode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Accounting", "value": 1 }, { "text": "Agriculture and Non-petrol Natural Resource Extraction", "value": 2 }, { "text": "Broadcasting Printing and Publishing", "value": 3 }, { "text": "Brokers", "value": 4 }, { "text": "Building Supply Retail", "value": 5 }, { "text": "Business Services", "value": 6 }, { "text": "Consulting", "value": 7 }, { "text": "Consumer Services", "value": 8 }, { "text": "Design, Direction and Creative Management", "value": 9 }, { "text": "Distributors, Dispatchers and Processors", "value": 10 }, { "text": "Doctor's Offices and Clinics", "value": 11 }, { "text": "Durable Manufacturing", "value": 12 }, { "text": "Eating and Drinking Places", "value": 13 }, { "text": "Entertainment Retail", "value": 14 }, { "text": "Equipment Rental and Leasing", "value": 15 }, { "text": "Financial", "value": 16 }, { "text": "Food and Tobacco Processing", "value": 17 }, { "text": "Inbound Capital Intensive Processing", "value": 18 }, { "text": "Inbound Repair and Services", "value": 19 }, { "text": "Insurance", "value": 20 }, { "text": "Legal Services", "value": 21 }, { "text": "Non-Durable Merchandise Retail", "value": 22 }, { "text": "Outbound Consumer Service", "value": 23 }, { "text": "Petrochemical Extraction and Distribution", "value": 24 }, { "text": "Service Retail", "value": 25 }, { "text": "SIG Affiliations", "value": 26 }, { "text": "Social Services", "value": 27 }, { "text": "Special Outbound Trade Contractors", "value": 28 }, { "text": "Specialty Realty", "value": 29 }, { "text": "Transportation", "value": 30 }, { "text": "Utility Creation and Distribution", "value": 31 }, { "text": "Vehicle Retail", "value": 32 }, { "text": "Wholesale", "value": 33 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "industrycode"}] },
    { "Name": "revenue", "Value": null, "Type": "money", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Max": 100000000000000, "Min": 0, "Precision": 2, "Controls": [{ "Name": "revenue"}] },
    { "Name": "ownershipcode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Public", "value": 1 }, { "text": "Private", "value": 2 }, { "text": "Subsidiary", "value": 3 }, { "text": "Other", "value": 4 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "ownershipcode"}] },
    { "Name": "numberofemployees", "Value": null, "Type": "integer", "Format": "none", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Max": 1000000000, "Min": 0, "Precision": 0, "Controls": [{ "Name": "numberofemployees"}] },
    { "Name": "tickersymbol", "Value": null, "Type": "string", "Format": "tickersymbol", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 10, "Controls": [{ "Name": "tickersymbol"}] },
    { "Name": "sic", "Value": null, "Type": "string", "Format": "text", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 20, "Controls": [{ "Name": "sic"}] },
    { "Name": "territoryid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "territoryid"}] },
    { "Name": "accountcategorycode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Preferred Customer", "value": 1 }, { "text": "Standard", "value": 2 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "accountcategorycode"}] },
    { "Name": "customertypecode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Competitor", "value": 1 }, { "text": "Consultant", "value": 2 }, { "text": "Customer", "value": 3 }, { "text": "Investor", "value": 4 }, { "text": "Partner", "value": 5 }, { "text": "Influencer", "value": 6 }, { "text": "Press", "value": 7 }, { "text": "Prospect", "value": 8 }, { "text": "Reseller", "value": 9 }, { "text": "Supplier", "value": 10 }, { "text": "Vendor", "value": 11 }, { "text": "Other", "value": 12 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "customertypecode"}] },
    { "Name": "transactioncurrencyid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "transactioncurrencyid"}] },
    { "Name": "paymenttermscode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Net 30", "value": 1 }, { "text": "2% 10, Net 30", "value": 2 }, { "text": "Net 45", "value": 3 }, { "text": "Net 60", "value": 4 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "paymenttermscode"}] },
    { "Name": "creditlimit", "Value": null, "Type": "money", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Max": 100000000000000, "Min": 0, "Precision": 2, "Controls": [{ "Name": "creditlimit"}] },
    { "Name": "defaultpricelevelid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "defaultpricelevelid"}] },
    { "Name": "creditonhold", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "creditonhold"}] },
    { "Name": "ownerid", "Value": [{ "entityType": "systemuser", "id": "{03327570-43A1-418E-AA58-8EDE97E4A101}", "name": "Jaimie Ji"}], "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "required", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "ownerid"}] },
    { "Name": "preferredcontactmethodcode", "Value": 1, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": 1, "Options": [{ "text": "Any", "value": 1 }, { "text": "E-mail", "value": 2 }, { "text": "Phone", "value": 3 }, { "text": "Fax", "value": 4 }, { "text": "Mail", "value": 5}], "SelectedOption": { "option": "Any", "value": 1 }, "Text": "Any", "Controls": [{ "Name": "preferredcontactmethodcode"}] },
    { "Name": "donotemail", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotemail"}] },
    { "Name": "donotbulkemail", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotbulkemail"}] },
    { "Name": "donotphone", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotphone"}] },
    { "Name": "donotfax", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotfax"}] },
    { "Name": "donotpostalmail", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotpostalmail"}] },
    { "Name": "originatingleadid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "never", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "originatingleadid"}] },
    { "Name": "lastusedincampaign", "Value": null, "Type": "datetime", "Format": "date", "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "lastusedincampaign"}] },
    { "Name": "donotsendmm", "Value": false, "Type": "boolean", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": false, "Controls": [{ "Name": "donotsendmm"}] },
    { "Name": "preferredappointmentdaycode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Sunday", "value": 0 }, { "text": "Monday", "value": 1 }, { "text": "Tuesday", "value": 2 }, { "text": "Wednesday", "value": 3 }, { "text": "Thursday", "value": 4 }, { "text": "Friday", "value": 5 }, { "text": "Saturday", "value": 6 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "preferredappointmentdaycode"}] },
    { "Name": "preferredequipmentid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "preferredequipmentid"}] },
    { "Name": "preferredappointmenttimecode", "Value": null, "Type": "optionset", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "InitialValue": null, "Options": [{ "text": "Morning", "value": 1 }, { "text": "Afternoon", "value": 2 }, { "text": "Evening", "value": 3 }, { "text": "", "value": null}], "SelectedOption": null, "Text": null, "Controls": [{ "Name": "preferredappointmenttimecode"}] },
    { "Name": "preferredsystemuserid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "preferredsystemuserid"}] },
    { "Name": "preferredserviceid", "Value": null, "Type": "lookup", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "Controls": [{ "Name": "preferredserviceid"}] },
    { "Name": "address1_addressid", "Value": "{C1ADB8E7-4861-4377-BBF6-DD935E418284}", "Type": "string", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 1.7976931348623157e+308, "Controls": [] },
    { "Name": "address2_addressid", "Value": "{CA749BB6-E5CF-41FB-830A-7AEB4B6B9866}", "Type": "string", "Format": null, "IsDirty": false, "RequiredLevel": "none", "SubmitMode": "dirty", "UserPrivilege": { "canRead": true, "canUpdate": true, "canCreate": true }, "MaxLength": 1.7976931348623157e+308, "Controls": [] }
 ],
    "ControlsLength": 55,
    "Controls": [
    { "Name": "WebResource_RecordWall", "Type": "webresource", "Disabled": false, "Visible": true, "Label": "RecordWall", "Src": "/%7B634904737150000000%7D/WebResources/msdyn_/RecordWall.htm?id=%7b23DE412D-5940-E211-B148-D48564519C24%7d&orglcid=1033&orgname=jaimieji&type=1&typename=account&userlcid=1033" },
    { "Name": "name", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Account Name", "Attribute": "name" },
    { "Name": "telephone1", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Main Phone", "Attribute": "telephone1" },
    { "Name": "primarycontactid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Primary Contact", "Attribute": "primarycontactid", "DefaultView": "{A2D479C5-53E3-4C69-ADDD-802327E67A0D}" },
    { "Name": "telephone2", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Other Phone", "Attribute": "telephone2" },
    { "Name": "accountnumber", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Account Number", "Attribute": "accountnumber" },
    { "Name": "fax", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Fax", "Attribute": "fax" },
    { "Name": "parentaccountid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Parent Account", "Attribute": "parentaccountid", "DefaultView": "{A9AF0AB8-861D-4CFA-92A5-C6281FED7FAB}" },
    { "Name": "websiteurl", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Web Site", "Attribute": "websiteurl" },
    { "Name": "emailaddress1", "Type": "standard", "Disabled": false, "Visible": true, "Label": "E-mail", "Attribute": "emailaddress1" },
    { "Name": "address1_addresstypecode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Address Type", "Attribute": "address1_addresstypecode" },
    { "Name": "address1_city", "Type": "standard", "Disabled": false, "Visible": true, "Label": "City", "Attribute": "address1_city" },
    { "Name": "address1_name", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Address Name", "Attribute": "address1_name" },
    { "Name": "address1_stateorprovince", "Type": "standard", "Disabled": false, "Visible": true, "Label": "State/Province", "Attribute": "address1_stateorprovince" },
    { "Name": "address1_line1", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Street 1", "Attribute": "address1_line1" },
    { "Name": "address1_postalcode", "Type": "standard", "Disabled": false, "Visible": true, "Label": "ZIP/Postal Code", "Attribute": "address1_postalcode" },
    { "Name": "address1_line2", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Street 2", "Attribute": "address1_line2" },
    { "Name": "address1_country", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Country/Region", "Attribute": "address1_country" },
    { "Name": "address1_line3", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Street 3", "Attribute": "address1_line3" },
    { "Name": "address1_telephone1", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Phone", "Attribute": "address1_telephone1" },
    { "Name": "address1_shippingmethodcode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Shipping Method", "Attribute": "address1_shippingmethodcode" },
    { "Name": "address1_freighttermscode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Freight Terms", "Attribute": "address1_freighttermscode" },
    { "Name": "description", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Description", "Attribute": "description" },
    { "Name": "industrycode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Industry", "Attribute": "industrycode" },
    { "Name": "revenue", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Annual Revenue", "Attribute": "revenue" },
    { "Name": "ownershipcode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Ownership", "Attribute": "ownershipcode" },
    { "Name": "numberofemployees", "Type": "standard", "Disabled": false, "Visible": true, "Label": "No. of Employees", "Attribute": "numberofemployees" },
    { "Name": "tickersymbol", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Ticker Symbol", "Attribute": "tickersymbol" },
    { "Name": "sic", "Type": "standard", "Disabled": false, "Visible": true, "Label": "SIC Code", "Attribute": "sic" },
    { "Name": "territoryid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Territory", "Attribute": "territoryid", "DefaultView": "{AD81B2CA-9789-4465-8C56-94C10830A6ED}" },
    { "Name": "accountcategorycode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Category", "Attribute": "accountcategorycode" },
    { "Name": "customertypecode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Relationship Type", "Attribute": "customertypecode" },
    { "Name": "transactioncurrencyid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Currency", "Attribute": "transactioncurrencyid", "DefaultView": "{CD5625B0-DDA8-4EE2-B13F-B9331E027C8A}" },
    { "Name": "paymenttermscode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Payment Terms", "Attribute": "paymenttermscode" },
    { "Name": "creditlimit", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Credit Limit", "Attribute": "creditlimit" },
    { "Name": "defaultpricelevelid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Price List", "Attribute": "defaultpricelevelid", "DefaultView": "{EE499892-35E1-4D07-A1B7-BB69FE9BFD42}" },
    { "Name": "creditonhold", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Credit Hold", "Attribute": "creditonhold" },
    { "Name": "accountContactsGrid", "Type": "subgrid", "Disabled": false, "Visible": true, "Label": "Contacts" },
    { "Name": "accountactivitiesgrid", "Type": "subgrid", "Disabled": false, "Visible": true, "Label": "Activities" },
    { "Name": "notescontrol", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Note Text", "Attribute": null },
    { "Name": "ownerid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Owner", "Attribute": "ownerid", "DefaultView": "{E88CA999-0B16-4AE9-B6A9-9EDC840D42D8}" },
    { "Name": "preferredcontactmethodcode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Preferred", "Attribute": "preferredcontactmethodcode" },
    { "Name": "donotemail", "Type": "standard", "Disabled": false, "Visible": true, "Label": "E-mail", "Attribute": "donotemail" },
    { "Name": "donotbulkemail", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Bulk E-mail", "Attribute": "donotbulkemail" },
    { "Name": "donotphone", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Phone", "Attribute": "donotphone" },
    { "Name": "donotfax", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Fax", "Attribute": "donotfax" },
    { "Name": "donotpostalmail", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Mail", "Attribute": "donotpostalmail" },
    { "Name": "originatingleadid", "Type": "lookup", "Disabled": true, "Visible": true, "Label": "Originating Lead", "Attribute": "originatingleadid", "DefaultView": "{ECBAC1A3-F8D8-4423-8F7E-10B11119739A}" },
    { "Name": "lastusedincampaign", "Type": "standard", "Disabled": true, "Visible": true, "Label": "Last Date Included in Campaign", "Attribute": "lastusedincampaign" },
    { "Name": "donotsendmm", "Type": "standard", "Disabled": false, "Visible": true, "Label": "Send Marketing Materials", "Attribute": "donotsendmm" },
    { "Name": "preferredappointmentdaycode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Preferred Day", "Attribute": "preferredappointmentdaycode" },
    { "Name": "preferredequipmentid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Preferred Facility/Equipment", "Attribute": "preferredequipmentid", "DefaultView": "{84F76829-AABB-467E-8F8E-5FC6A3B448AF}" },
    { "Name": "preferredappointmenttimecode", "Type": "optionset", "Disabled": false, "Visible": true, "Label": "Preferred Time", "Attribute": "preferredappointmenttimecode" },
    { "Name": "preferredsystemuserid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Preferred User", "Attribute": "preferredsystemuserid", "DefaultView": "{E88CA999-0B16-4AE9-B6A9-9EDC840D42D8}" },
    { "Name": "preferredserviceid", "Type": "lookup", "Disabled": false, "Visible": true, "Label": "Preferred Service", "Attribute": "preferredserviceid", "DefaultView": "{2BD4DE5E-A7B4-4F5D-8FDE-EB3B62D8E2B2}" }
 ],
    "Navigation": [
    { "Id": "navAddresses", "Key": "navAddresses", "Label": "More Addresses", "Visible": true },
    { "Id": "navActivities", "Key": "navActivities", "Label": "Activities", "Visible": true },
    { "Id": "navActivityHistory", "Key": "navActivityHistory", "Label": "Closed Activities", "Visible": true },
    { "Id": "navSubAct", "Key": "navSubAct", "Label": "Sub-Accounts", "Visible": true },
    { "Id": "navContacts", "Key": "navContacts", "Label": "Contacts", "Visible": true },
    { "Id": "navRelationships", "Key": "navRelationships", "Label": "Relationships", "Visible": true },
    { "Id": "navConnections", "Key": "navConnections", "Label": "Connections", "Visible": true },
    { "Id": "navDocument", "Key": "navDocument", "Label": "Documents", "Visible": true },
    { "Id": "navAudit", "Key": "navAudit", "Label": "Audit History", "Visible": true },
    { "Id": "navOpps", "Key": "navOpps", "Label": "Opportunities", "Visible": true },
    { "Id": "navQuotes", "Key": "navQuotes", "Label": "Quotes", "Visible": true },
    { "Id": "navOrders", "Key": "navOrders", "Label": "Orders", "Visible": true },
    { "Id": "navInvoices", "Key": "navInvoices", "Label": "Invoices", "Visible": true },
    { "Id": "navService", "Key": "navService", "Label": "Cases", "Visible": true },
    { "Id": "navContracts", "Key": "navContracts", "Label": "Contracts", "Visible": true },
    { "Id": "navCampaignsInSFA", "Key": "navCampaignsInSFA", "Label": "Campaigns", "Visible": true },
    { "Id": "navListsInSFA", "Key": "navListsInSFA", "Label": "Marketing Lists", "Visible": true },
    { "Id": "navAsyncOperations", "Key": "navAsyncOperations", "Label": "Workflows", "Visible": true },
    { "Id": "navProcessSessions", "Key": "navProcessSessions", "Label": "Dialog Sessions", "Visible": true }
 ],
    "Tabs": [
    { "Label": "Record Wall", "Name": "tab_recordwall", "DisplayState": "collapsed", "Visible": true, "Sections": [
        { "Label": "Section", "Name": "tab_recordwall_section_1", "Visible": true, "Controls": [
            { "Name": "WebResource_RecordWall" }
          ]
        }
      ]
    },
    { "Label": "General", "Name": "general", "DisplayState": "expanded", "Visible": true, "Sections": [
        { "Label": "Account Information", "Name": "account information", "Visible": true, "Controls": [
            { "Name": "name" },
            { "Name": "telephone1" },
            { "Name": "primarycontactid" },
            { "Name": "telephone2" },
            { "Name": "accountnumber" },
            { "Name": "fax" },
            { "Name": "parentaccountid" },
            { "Name": "websiteurl" },
            { "Name": "emailaddress1" }
          ]
        },
        { "Label": "Address", "Name": "address", "Visible": true, "Controls": [
            { "Name": "address1_addresstypecode" },
            { "Name": "address1_city" },
            { "Name": "address1_name" },
            { "Name": "address1_stateorprovince" },
            { "Name": "address1_line1" },
            { "Name": "address1_postalcode" },
            { "Name": "address1_line2" },
            { "Name": "address1_country" },
            { "Name": "address1_line3" },
            { "Name": "address1_telephone1" }
          ]
        },
        { "Label": "Shipping Information", "Name": "shipping information", "Visible": true, "Controls": [
            { "Name": "address1_shippingmethodcode" },
            { "Name": "address1_freighttermscode" }
          ]
        },
        { "Label": "Description", "Name": "description", "Visible": true, "Controls": [
            { "Name": "description" }
          ]
        }
      ]
    },
    { "Label": "Details", "Name": "details", "DisplayState": "expanded", "Visible": true, "Sections": [
        { "Label": "Professional Information", "Name": "professional information", "Visible": true, "Controls": [
            { "Name": "industrycode" },
            { "Name": "revenue" },
            { "Name": "ownershipcode" },
            { "Name": "numberofemployees" },
            { "Name": "tickersymbol" },
            { "Name": "sic" }
          ]
        },
        { "Label": "Description", "Name": "description", "Visible": true, "Controls": [
            { "Name": "territoryid" },
            { "Name": "accountcategorycode" },
            { "Name": "customertypecode" }
          ]
        },
        { "Label": "Billing Information", "Name": "billing information", "Visible": true, "Controls": [
            { "Name": "transactioncurrencyid" },
            { "Name": "paymenttermscode" },
            { "Name": "creditlimit" },
            { "Name": "defaultpricelevelid" },
            { "Name": "creditonhold" }
          ]
        }
      ]
    },
    { "Label": "Contacts", "Name": "contacts", "DisplayState": "expanded", "Visible": true, "Sections": [
        { "Label": "Contacts", "Name": "contacts", "Visible": true, "Controls": [
            { "Name": "accountContactsGrid" }
          ]
        }
      ]
    },
    { "Label": "Notes & Activities", "Name": "notes and activities", "DisplayState": "collapsed", "Visible": true, "Sections": [
        { "Label": "Activities", "Name": "activities", "Visible": true, "Controls": [
            { "Name": "accountactivitiesgrid" }
          ]
        },
        { "Label": "Notes", "Name": "notes", "Visible": true, "Controls": [
            { "Name": "notescontrol" }
          ]
        }
      ]
    },
    { "Label": "Preferences", "Name": "administration", "DisplayState": "expanded", "Visible": true, "Sections": [
        { "Label": "Internal Information", "Name": "internal information", "Visible": true, "Controls": [
            { "Name": "ownerid" }
          ]
        },
        { "Label": "Contact Methods", "Name": "contact methods", "Visible": true, "Controls": [
            { "Name": "preferredcontactmethodcode" },
            { "Name": "donotemail" },
            { "Name": "donotbulkemail" },
            { "Name": "donotphone" },
            { "Name": "donotfax" },
            { "Name": "donotpostalmail" }
          ]
        },
        { "Label": "Marketing Information", "Name": "marketing information", "Visible": true, "Controls": [
            { "Name": "originatingleadid" },
            { "Name": "lastusedincampaign" },
            { "Name": "donotsendmm" }
          ]
        },
        { "Label": "Service Preferences", "Name": "service preferences", "Visible": true, "Controls": [
            { "Name": "preferredappointmentdaycode" },
            { "Name": "preferredequipmentid" },
            { "Name": "preferredappointmenttimecode" },
            { "Name": "preferredsystemuserid" },
            { "Name": "preferredserviceid" }
          ]
        }
      ]
    }
  ]
};
MSCRM 2011 Web Service Toolkit for JavaScript
@author Jaimie Ji
Credits:
The idea of this library was inspired by Daniel Cai's CrmWebServiceToolkit.
The idea of this Qunit testing was inspired by Daniel Cai's CrmWebServiceToolkit.
The idea of BusinessEntity was inspired by Daniel Cai && Ascentium CrmService JavaScript Library.
The REST Endpoint functions were inspired by MSCRM 2011 SDK javascript code and various resources from CRM websites and forums. Some of them were just copies with minor modification.
The Soap functions were inspired by Daniel Cai && Jamie Miley && Paul Way && Customer Effective.
Additional thanks to all contributors of MSCRM and i have learned a lot from you all.
Date: February, 2012
[Speical Thanks]

Thanks very much for JetBrains to provide me a free ReSharper open license for this project.

Features

Extension methods for common operations.
Support for synchronous/asynchronous call
Support for all models of Microsoft CRM 2011 (AD/IFD/CRM Online).
Lightweight and Simplicity - gives direct access to the Organization Data Service and Organization Service without having to generate SOAP request each time.
Common Functions

EnableField: A JavaScript Function to enable a crm field
DisableField: A JavaScript Functionto disable a crm field
ShowField: A JavaScript Functionto show a crm field
HideField: A JavaScript Functionto hide a crm field
UpdateRequiredLevel: A JavaScript Function to update the required level a crm field
GetObjectTypeCode: A JavaScript Function to get the object type code of a entity
CalculateDaysBetween: A JavaScript Function to calcuate days between two dates
AddNotification: A JavaScript Function to add a crm2011-like notification message on top of a form
ShowError: A JavaScript Function to show a alert of a error message
GuidsAreEqual : A JavaScript Function to check if two guids are the same
DisableAllControlsInTab : A JavaScript Function to disable all controls in a tab by tab number
DisableAllControlsInSection : A JavaScript Function to disable all controls in a section label
Rest Functions

Create: A JavaScript Fuction to perform a create Rest Endpoint request  
Retrieve: A JavaScript Fuction to perform a retrieve Rest Endpoint request
Update: A JavaScript Fuction to perform a update Rest Endpoint request
Delete: A JavaScript Fuction to perform a delete Rest Endpoint request
RetrieveMultiple: A JavaScript Fuction to perform a retrieveMultiple Rest Endpoint request
Associate: A JavaScript Fuction to perform a associate Rest Endpoint request
Disassociate: A JavaScript Fuction to perform a disassociate Rest Endpoint request
Soap Functions

Busines Entity: A JavaScript Object represents a business entity of CRM 2011
Execute: A JavaScript Function to perform a execute soap request
Fetch: A JavaScript Function to perform a fetch soap request
Retrieve: A JavaScript Function to perform a retrieve soap request
RetrieveMultiple: A JavaScript Function to perform a retrieve multiple soap request
Create: A JavaScript Function to perform a create soap request
Update: A JavaScript Function to perform a update soap request
Delete: A JavaScript Function to perform a delete soap request
QueryByAttribute: A JavaScript Function to perform a query by attribute soap request
QueryAll: A JavaScript Function to perform a query all soap request to return all records (>5k+)
SetState: A JavaScript Function to perform a set state soap request
Associate: A JavaScript Function to perform a associate soap request
Assign: A JavaScript Function to perform a assign soap request
RetrievePrincipalAccess: A JavaScript Function to perform a retrieve principal access soap request
GrantAccess: A JavaScript Function to perform a grant access soap request
ModifyAccess: A JavaScript Function to perform a modify access soap request
RevokeAccess: A JavaScript Function to perform a revoke access soap request
GetCurrentUserId : A JavaScript Function to get the id of the current user
GetCurrentUserBusinessUnitId : A JavaScript Function to get the business unit id of the current user
GetCurrentUserRoles : A JavaScript Function to get the list of the current user roles
IsCurrentUserRole : A JavaScript Function to check if the current user has certains roles
RetrieveAllEntitiesMetadata: A JavaScript Function to retrieve all entities' metadata according to the expected EntityFilter
RetrieveEntityMetadata: A JavaScript Function to retrieve one entity's metadata according to the expected entity name and EntityFilter
RetrieveAttributeMetadata: A JavaScript Function to retrieve one attribute's metadata according to the entity name and attribute name
Extension Functions

JQueryXrmDependentOptionSet: Create Configurable Dependent Option Set to utilize CRM 2011 web resource.
JQueryXrmFieldTooltip: Create configurable tooltip for fields on CRM 2011 form
JQueryXrmCustomFilterView: Create configurable ability to add custom filter view to crm 2011 lookup field on the form
JQueryXrmFormatNotesControl: Format the notes control to allow insert, allow edit

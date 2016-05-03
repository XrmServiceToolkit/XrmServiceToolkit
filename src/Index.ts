/// <reference path="../typings/main.d.ts" />

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

export {default as Rest} from "./Rest";
export {default as Soap} from "./Soap";
export {default as Extension} from "./Extension";
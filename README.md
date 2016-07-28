[![Gitter](https://badges.gitter.im/XrmServiceToolkit/XrmServiceToolkit.svg)](https://gitter.im/XrmServiceToolkit/XrmServiceToolkit?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A while ago when developing a typescript version I also rewrote the documentation to jsdoc. Here you can see the result, maybe it helps you along faster.
[XrmServiceToolkit Documentation](https://cdn.rawgit.com/XrmServiceToolkit/XrmServiceToolkit/feature/TypeScript/src/typedoc/index.html)

# **Project Description**

XrmServiceToolkit is a JavaScript library which can be used for JavaScript Development under the platform for **Microsoft Dynamics CRM 2011/2013/2015 environments**. The library contains four major parts regarding functions.

* Common: General Methods used for various purpose.
* Rest: Organization Data Service functions including CRUD, Associate, Disassociate, etc
* Soap: Organization Service functions including CRUD, Fetch, Associate, Disassociate, etc
* Extension: jQuery extension to utilize WebResource to extend CRM 2011 / CRM 2013 / CRM 2015 including dependent OptionSet, field tooltip, add custom filter view to lookup field. (Some Methods 'Unsupported'. Some of these methods have either been replaced with supported methods or deprecated in CRM 2013 version)

## **Next(develop branch)**
* Added CommonJS and AMD Module support
* Fixed typos in comments

## **CRM 2015**

* V2.2 is the official release for CRM 2015 support
* If you are on CRM 2015 online Update 1, please go to download page and download v2.2.1

## **CRM 2013**

* A beta version has just been released in source code section for CRM 2013 [changeset: 25977]
* CRM 2013 Support and Development
* Tested CRM 2013 server
  * PC
    * CRM 2013 on-premise for IE10, latest chrome, latest firefox
    * CRM 2013 online for IE10, latest chrome, latest firefox
  * Tablet - iPad 2, iOS 7.0.2
    * CRM 2013 online for latest chrome, latest safari
  * Tablet Client
    * iOS Client - iPad 2, iOS 7.0.2
    * Windows App - Windows 8, Windows RT

### **Debug / Unit Test JavaScript Rest or Soap in Visual Studio For CRM 2011**

Debug Soap / Rest in Visual Studio For CRM 2011

### **Whats new**

#### Version 2.2

Dependency JSON2, jQuery 1.7.2 or above

Date: April, 2015

* Tested Browser: IE10, IE11, Chrome (latest), Firefox (latest)
* Tested CRM server: CRM 2015, CRM 2013, CRM 2011
* Bug fixes for XrmServiceToolkit.Sopa.Fetch
* Bug fixes for error handling
* Dependency JSON2, jQuery 1.7.2 or above

Date: October, 2014

* Tested Browser: IE10, IE11, Chrome (latest), Firefox (latest)
* Tested CRM server: CRM 2011 with RU17, CRM 2013 online, CRM 2013 on-premise with SP1
* Performance refactor release.
* Minified version release
* Bug fixes for XrmServiceToolkit.Soap.Fetch
* Bug fixes for extension methods

#### Version 2.0.1

Dependency JSON2, jQuery 1.7.2 or above(modified)

Date: April, 2014

* Tested Browser: IE10, Chrome (latest), Firefox (latest)
* Tested CRM server: CRM 2011 with RU16, CRM 2013 online, CRM 2013 on-premise with RU2
* New Behaviour - XrmServiceToolkit.Soap.Fetch now allows limited return with 'page' and 'count' parameters in fetch xml
* New Fix - XrmServiceToolkit.Soap.Fetch fixed an issue when passing different format of fetchXml with/without ```<fetch>``` part
* New Fix - XrmServiceToolkit.Extension fixed an issue when retrieving web resources.

#### Version 2.0.0

Dependency: JSON2, jQuery 1.7.2(modified)

Date: October, 2013

* Tested Browser: IE10, Chrome (latest), Firefox (latest)
* Tested CRM server: CRM 2011 with RU15, CRM 2013 online, CRM 2013 on-premise RTM
* New Behaviour - XrmServiceToolkit.Soap.Fetch parameters change to work with asynchronous callback compared to 1.4.2 beta: * XrmServiceToolkit.Soap.Fetch(fetchXml, fetchAll, callback)
* New Behaviour - XrmServiceToolkit.Common.AddNotification is working with CRM 2013 using the out-of-box functionality. Still support CRM 2011
* New Fix - XrmServiceToolkit.Comon.GetObjectCodeType is now using metadata retrieval as a supported method
* New Fix - The included jQuery has a line changed at the bottom ```<window.jQuery = jQuery;>``` $ is removed to work with CRM 2013 form

#### Version 1.4.1

Dependency: JSON2, jQuery 1.7.2 above

Date: April, 2013

* New Feature: Add more cross browser support for RU12, RU13
* Tested Browser: IE9, IE10, Chrome (latest), Firefox (latest)
* New Fix: XrmServiceToolkit.Common.AddNotification method updated for RU12, RU13, still compatible for RU11 below
* New Fix: XrmServiceToolkit.Soap.Fetch method did not format linked record correctly
* New Fix: XrmServiceToolkit.Soap.Retrieve method did not return partylist data for activity
* New Fix: Added manual conversion from String to Date conversion for cross browser
* New Fix: getServerUrl method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
* New Function: getServerUrl private method is updated as getClientUrl to align with RU12 SDK method getClientUrl(), still compatible to support RU11 below
* New Function: XrmServiceToolkit.Soap.RetrieveAllEntitiesMetadata method is a method to return all metadata for all entities by the specified entity filters
* New Function: XrmServiceToolkit.Soap.RetrieveEntityMetadata method is a method to return the metadata for a certain entity by the specified entity filters
* New Function: XrmServiceToolkit.Soap.RetrieveAttributeMetadata method is a method to return the metadata for a certain entity's attribute

#### Version: 1.4.0

Dependency: JSON2, jQuery 1.7.2 above

Date: January, 2013

* New Feature: Add more cross browser support for RU12
* Tested Browser: IE9, IE10, Chrome Version 24.0.1312.56 m, Firefox 18.0.1

#### Version: 1.3.2

Dependency: JSON2, jQuery 1.7.2 above

Date: January, 2013

* New Fix: An issue where XrmServiceToolkit.Soap could not be initialized properly when calling from Ribbon for CRM Online
* Add more cross browser support for coming RU12

#### Version: 1.3.1

Dependency: JSON2, jQuery 1.7.2 above

Date: November, 2012

* New Feature:
* A logic change to improvie performance when retrieving larger number of records
* New Function:
* XrmServiceToolkit.Soap.QueryAll: a method to return all records (>5k+). Similar to how to use XrmServiceToolkit.Soap.QueryByAttribute
* New Fix:
* XrmServiceToolkit.Rest.RetrieveMultiple not returning more than 50 records
* XrmServiceToolkit.Soap.BusinessEntity not working properly with number attribute like int, double, decimal
* XrmServiceToolkit.Soap not handling error message properly.

#### Version: 1.3

Dependency: JSON2, jQuery 1.7.2 above

Date: July, 2012

* New Feature
* Integration with jQuery
* Cross Browser support (TODO: Testings for real 'cross-browser' support. Long Story)
* New Extension:
* JQueryXrmDependentOptionSet: Create Configurable Dependent Option Set to utilize CRM 2011 web resource.
* JQueryXrmFieldTooltip: Create configurable tooltip for fields on CRM 2011 form
* JQueryXrmCustomFilterView: Create configurable resource to add custom filter view to crm 2011 lookup field on the form
* JQueryXrmFormatNotesControl: Format the notes control to allow insert, allow edit

#### Version: 1.2

Dependency: JSON2

Date: May, 2012

* New Fix - Create, Update, Retrieve activity with Party List Type. See documentation and test page for details

#### Version: 1.1

Dependency: JSON2

Date: April, 2012

* New Function - XrmServiceToolkit.Soap.Assign
* New Function - XrmServiceToolkit.Soap.GrantAccess
* New Function - XrmServiceToolkit.Soap.ModifyAccess
* New Function - XrmServiceToolkit.Soap.RevokeAccess
* New Function - XrmServiceToolkit.Soap.RetrievePrincipalAccess

#### <font color='blue'>Whats coming</font>

<font color='blue'>CRM 2013 development and toolkit expansion for cross browser, cross platform development.</font>

* <font color='blue'>Finalize Cross-Browser Support.</font>
* <font color='blue'>Tune performance</font>

<font color='blue'>If you have suggestions, please also let me know.</font>

/// <reference path="PageData.js" />

// DO NOT MODIFY THIS FILE.

// After you have installed the Xrm.Page Script Development Form Snapshot solution in your organization,
// use the Xrm.Page Snapshot button on the Customize tab of a form to generate a pageData object.
// Copy the pageData object definition into the PageData.js file in this Visual Studio project.
// - You should overwrite the existing definition
// In your JScript library you should now get IntelliSense completion support for child objects of the Xrm.Page
// Methods in Xrm.Page will provide IntelliSense guidance.
// Methods that change Xrm.Page data will allow retrieving and setting data values.
// Use the TestPage.htm to include scripts to test functions in your library.


if (typeof (pageData) == "undefined") {
 var message = "You must include the output of the Xrm.Page Snapshot in the\n";
 message += "PageData.js file for this solution. After you have installed the Xrm.Page Script Development Form Snapshot solution\n";
 message += " open an entity form and click the Customize tab in the ribbon. Click\n";
 message += "the Xrm.Page Snapshot button and copy the output into PageData.js.";
 alert(message);

}


// Build the Xrm object ==============================================================
var Xrm = {
 Page: {
  context: new _context(),
  data: {
   entity: new _entity()
  },
  ui: {
   controls: new _uiControlsMethods(),
   formSelector: new _formSelector(),
   z_ctrlCol: [], //Populated by _tabs
   navigation: new _navigation(),
   tabs: new _tabsMethods(),
   z_tabsCol: [], //Set by _tabs
   close: function () {
    /// <summary>
    /// Closes the form.
    /// </summary>
   },
   z_currentControl: pageData.CurrentControl,
   getCurrentControl: function () {
    /// <summary>
    /// Returns the control object that currently has focus on the form.
    /// </summary>
    /// <returns type="Object" />
    return Xrm.Page.ui.controls.get(this.z_currentControl);
   },
   getFormType: function () {
    /// <summary>
    /// Indicates the form context for the record.
    /// <para>	0 : Undefined</para>
    /// <para>	1 : Create</para>
    /// <para>	2 : Update</para>
    /// <para>	3 : Read Only</para>
    /// <para>	4 : Disabled</para>
    /// <para>	5 : Quick Create (Deprecated)</para>
    /// <para>	6 : Bulk Edit</para>
    /// </summary>
    /// <returns type="Number" />
    return pageData.FormType;
   },
   getViewPortHeight: function () {
    /// <summary>
    /// Returns the height of the viewport in pixels.
    /// </summary>
    /// <returns type="Number" />
    return pageData.ViewPortHeight;
   },
   getViewPortWidth: function () {
    /// <summary>
    /// Returns the width of the viewport in pixels.
    /// </summary>
    /// <returns type="Number" />
    return pageData.ViewPortWidth;
   },
   refreshRibbon: function () {
    /// <summary>
    /// Causes the ribbon to re-evaluate data that controls what is displayed in it.
    /// </summary>
   }
  },
  __namespace: true
 },
 __namespace: true
};

//Generates the collections of tabs, sections and controls.
Xrm.Page.ui.z_tabsCol = new _tabs();

//Adds the collection methods to sections and controls
for (var tabIndex in Xrm.Page.ui.z_tabsCol) {
 Xrm.Page.ui.z_tabsCol[tabIndex].sections = new _sectionMethods(tabIndex);

 for (var sectionIndex in Xrm.Page.ui.z_tabsCol[tabIndex].z_sections) {
  Xrm.Page.ui.z_tabsCol[tabIndex].z_sections[sectionIndex].controls = new _SectionControlsMethods(tabIndex, sectionIndex);
 }
}
// Adds the collection methods to the navigation items
Xrm.Page.ui.navigation.items = new _navItemsMethods();

//Adds the collection methods to the formSelector items
Xrm.Page.ui.formSelector.items = new _formItemsMethods();

// Creates the getAttribute method
Xrm.Page.getAttribute = function (argument) {
 /// <summary>
 /// Returns one or more attributes depending on the arguments passed.
 /// </summary>
 /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
 /// <para>1: None: Returns an array of all the attributes.</para>
 /// <para>2: String: Returns the attribute where the argument matches the name.</para>
 /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
 /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
 /// </param>
 return Xrm.Page.data.entity.attributes.get(argument);
};
// Creates the getControl method
Xrm.Page.getControl = function (argument) {
 /// <summary>
 /// Returns one or more controls depending on the arguments passed.
 /// </summary>
 /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
 /// <para>1: None: Returns an array of all the controls.</para>
 /// <para>2: String: Returns the control where the argument matches the name.</para>
 /// <para>3: Number: Returns the control where the argument matches the index.</para>
 /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
 /// </param>

 return Xrm.Page.ui.controls.get(argument);
};


// CONTEXT =====================================================
function _context() {

 return {
  getAuthenticationHeader: function () {
   /// <summary>
   /// Returns the encoded SOAP header necessary to use Microsoft Dynamics CRM 4.0 web service calls using Jscript.
   /// </summary>
   /// <returns type="String" />
   return pageData.AuthenticationHeader.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  },
  getCurrentTheme: function () {
   /// <summary>
   /// Returns the current theme used in the application.
   /// </summary>
   /// <returns type="String" />
   return pageData.CurrentTheme
  },
  getOrgLcid: function () {
   /// <summary>
   /// Returns the LCID value that represents the Microsoft Dynamics CRM Language Pack that is the base language for the organization.
   /// </summary>
   /// <returns type="Number" />
   return pageData.OrgLcid;
  },
  getOrgUniqueName: function () {
   /// <summary>
   /// Returns the unique text value of the organization’s name.
   /// </summary>
   /// <returns type="String" />
   return pageData.OrgUniqueName;
  },
  getQueryStringParameters: function () {
   /// <summary>
   /// Returns a dictionary object of key value pairs representing the query string arguments that were passed to the page.
   /// </summary>
   /// <returns type="Object" />
   return pageData.QueryStringParameters;
  },
  getClientUrl: function () {
   /// <summary>
   /// Returns the base server URL. When a user is working offline with the Microsoft Dynamics CRM for Microsoft Office Outlook client, the URL is to the local Microsoft Dynamics CRM Web services.
   /// </summary>
   /// <returns type="Object" />
   return pageData.ServerUrl;
  },
  getUserId: function () {
   /// <summary>
   /// Returns GUID value of the SystemUser.id value for the current user.
   /// </summary>
   /// <returns type="String" />
   return pageData.UserId;
  },
  getUserLcid: function () {
   /// <summary>
   /// Returns the LCID value that represents the Microsoft Dynamics CRM Language Pack that is the user selected as their preferred language.
   /// </summary>
   /// <returns type="Number" />
   return pageData.UserLcid
  },
  getUserRoles: function () {
   /// <summary>
   /// Returns an array of strings representing the GUID values of each of the security roles that the user is associated with.
   /// </summary>
   /// <returns type="Array" />
   return pageData.UserRoles
  },
  isOutlookClient: function () {
   /// <summary>
   /// Returns Whether the client is the Outlook client
   /// </summary>
   /// <returns type="Boolean" />
   return pageData.isOutlookClient
  },
  isOutlookOnline: function () {
   /// <summary>
   /// Returns whether the use of the  Outlook client is connected to the server. Returns false when they are working offline.
   /// </summary>
   /// <returns type="Boolean" />
   return pageData.isOutlookOnline
  },
  prependOrgName: function (url) {
   /// <summary>
   /// Accepts a string and prepends the organization name to it with a leading forward slash: "/"+OrgUniqueName + url
   /// </summary>
   /// <returns type="String" />
   return "/" + this.getOrgUniqueName() + url;
  }

 };
}

// ENTITY =====================================================

function _entity() {
 return {
  z_saveEventHandlers: [],
  z_isDirty: pageData.IsDirty,
  z_defaultPrevented: false,
  addOnSave: function (functionPointer) {
   /// <summary>
   /// Adds the event handler function to be called when the entity is saved. 
   /// It will be added to the bottom of the event pipeline and called after the other event handlers.
   /// </summary>
   this.z_saveEventHandlers.push(functionPointer);
  },
  removeOnSave: function (functionPointer) {
   /// <summary>
   /// Removes the the event handler function from the event pipeline.
   /// </summary>
   var newSaveHandlers = [];
   for (var i = 0; i < this.z_saveEventHandlers.length; i++) {
    if (this.z_saveEventHandlers[i] != functionPointer)
    { newSaveHandlers.push(this.z_saveEventHandlers[i]); }
   }
   this.z_saveEventHandlers = newSaveHandlers;
  },
  getDataXml: function () {
   /// <summary>
   /// Returns a string representing the xml that will be sent to the server when the record is saved. Only data in fields that have changed are set to the server.
   /// </summary>
   /// <returns type="String" />
   var entityName = Xrm.Page.data.entity.getEntityName();
   var returnString = "<" + entityName + ">";
   for (var i = 0; i < Xrm.Page.data.entity.z_attCol.length; i++) {

    var attribute = Xrm.Page.getAttribute(i);
    var attributeName = attribute.getName();
    var attributeValue = attribute.getValue();

    if ((attribute.getSubmitMode() == "always") || (attribute.getIsDirty())) {
     if (attribute.getValue() == null) {
      returnString += "<" + attributeName + "/>";
     }
     else {
      returnString += "<" + attributeName + ">" + attributeValue + "</" + attributeName + ">";
     }

    }
   }

   returnString += "</" + entityName + ">";

   return returnString



  },
  getEntityName: function () {
   /// <summary>
   /// Returns a string representing the logical name of the entity for the record.
   /// </summary>
   /// <returns type="String" />
   return pageData.EntityName;
  },
  getId: function () {
   /// <summary>
   /// Returns a string representing the GUID id value for the record.
   /// </summary>
   /// <returns type="String" />
   return pageData.Id;
  },
  getIsDirty: function () {
   /// <summary>
   /// Returns a Boolean value that indicates if any fields in the form have been modified.
   /// </summary>
   /// <returns type="Boolean" />
   return this.z_isDirty;
  },
  save: function (argument) {
   /// <summary>
   /// Saves the record.
   /// </summary>
   /// <param name="argument" type="String" mayBeNull="true" optional="true" >
   /// <para>1: None: If no parameter is included the record will simply be saved. </para>
   /// <para>2: "saveandclose" : Saves record and closes the form.</para>   
   /// <para>3: "saveandnew" : Saves the record and opens a blank form for a new record.</para>
   /// </param>
   for (var i = 0; i < this.z_saveEventHandlers.length; i++) {
    this.z_saveEventHandlers[i]();
   }
   if (this.z_defaultPrevented == false) {
    this.z_isDirty = false;
    var numberOfAttributes = this.attributes.getLength();
    for (var i = 0; i < numberOfAttributes; i++) {
     this.attributes.get(i).z_isDirty = false;
    }
   }

  },
  z_attCol: new _attributes(),
  attributes: new _AttributesMethods()
 };
}

// =====================================================
// ATTRIBUTES ==========================================
// =====================================================

//Start Attribute definitions  -------------------------------------------------------------------

// ATTRIBUTE Base ===================================================================

function _attributeBase(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls) {
 this.z_name = name;
 this.z_value;
 //If this is a datetime attribute the z_value should be set as a Date object here.
 if (value == null)
 { this.z_value = null; }
 else {
  var isDateTime = false;
  for (var i in pageData.Attributes) {
   if (pageData.Attributes[i].Name == name) {
    if (pageData.Attributes[i].Type == "datetime") {
     isDateTime = true;
     this.z_value = new Date(value);
    }
   }
  }
  if (!isDateTime) {

   this.z_value = value;

  }
 }
 this.z_format = format;
 this.z_isDirty = isDirty;
 this.z_requiredLevel = requiredLevel;
 this.z_submitMode = submitMode;
 this.z_userPrivilege = userPrivilege;
 this.z_ctrlCol = [];
 this.controls = new _attributeControlMethods(this.z_ctrlCol);
 this.z_handlers = [];
 this.addOnChange = function (functionPointer) {
  /// <summary>
  /// Adds an event handler function to the OnChange event for the attribute. It will be called after the other event handler functions in the event pipeline.
  /// </summary>
  this.z_handlers.push(functionPointer);
 };
 this.removeOnChange = function (functionPointer) {
  /// <summary>
  /// Removes and event handler function from the OnChange event for the attribute.
  /// </summary>
  var newHandlers = [];
  for (var i = 0; i < this.z_handlers.length; i++) {
   if (this.z_handlers[i] != functionPointer) {
    newHandlers.push(this.z_handlers[i]);
   }
  }
  this.z_handlers = newHandlers;
 };
 this.fireOnChange = function () {
  /// <summary>
  /// Causes the OnChange event to occur on the attribute so that any script associated to that event can execute. 
  /// </summary>
  for (var i = 0; i < this.z_handlers.length; i++) {
   this.z_handlers[i]();
  }
 };
 this.getFormat = function () {
  /// <summary>
  /// Returns a string value that represents formatting options for the attribute. The value may be null.
  /// </summary>
  /// <returns type="String" />
  return this.z_format;
 };
 this.getIsDirty = function () {
  /// <summary>
  /// Returns a Boolean value indicating if there are unsaved changes to the attribute value.
  /// </summary>
  /// <returns type="Boolean" />
  return this.z_isDirty;
 };
 this.getName = function () {
  /// <summary>
  /// Returns a string representing the logical name of the attribute.
  /// </summary>
  /// <returns type="String" />
  return this.z_name;
 };
 this.getParent = function () {
  /// <summary>
  /// Returns the entity object that is the parent to the attribute. In the case of an attribute this is Xrm.Page.data.entity.
  /// </summary>
  return Xrm.Page.data.entity;
 };
 this.getRequiredLevel = function () {
  /// <summary>
  /// Returns a string value indicating whether a value for the attribute is required or recommended.  Will return either "none", "required", or "recommended".
  /// </summary>
  /// <returns type="String" />
  return this.z_requiredLevel;
 };
 this.getSubmitMode = function () {
  /// <summary>
  /// Returns a string indicating when data from the attribute will be submitted when the record is saved. Will return either "always", "never", or "dirty".
  /// </summary>
  /// <returns type="String" />
  return this.z_submitMode;
 };
 this.getUserPrivilege = function () {
  /// <summary>
  /// Returns an array of privileges that contain Boolean values indicating if the user can create, read or update data values for an attribute. 
  /// </summary>
  /// <returns type="Array" />
  return this.z_userPrivilege;
 };
 this.setRequiredLevel = function (level) {
  /// <summary>
  /// Sets the required level for the attribute
  /// </summary>
  /// <param name="level" type="String" mayBeNull="false" optional="false" >
  /// Valid values include "none", "required", and "recommended".
  /// </param>
  if (level == "none" || level == "required" || level == "recommended")
  { this.z_requiredLevel = level; }
  else {
   throw { message: "Invalid argument. Valid arguments include \"none\", \"required\", and \"recommended\"." }
  }
 };
 this.setSubmitMode = function (mode) {
  /// <summary>
  /// Sets whether data from the attribute will be submitted when the record is saved.
  /// </summary>
  /// <param name="mode" type="String" mayBeNull="false" optional="false" >
  /// Valid values include "always", "never", and "dirty".
  /// </param>
  if (mode == "always" || mode == "never" || mode == "dirty")
  { this.z_submitMode = mode; }
  else {
   throw { message: "Invalid argument. Valid arguments include \"always\", \"never\", and \"dirty\"." }
  }
 };

}
// NUMBER Base ===================================================================

function _numberBaseAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.z_max = max;
 this.z_min = min;
 this.z_precision = precision;
 this.getMax = function () {
  /// <summary>
  /// Returns a number indicating the maximum allowed value for an attribute.
  /// </summary>
  /// <returns type="Number" />
  return this.z_max;
 };
 this.getMin = function () {
  /// <summary>
  /// Returns a number indicating the minimum allowed value for an attribute.
  /// </summary>
  /// <returns type="Number" />
  return this.z_min;
 };
 this.getPrecision = function () {
  /// <summary>
  /// Returns the number of digits allowed to the right of the decimal point.
  /// </summary>
  /// <returns type="Number" />
  return this.z_precision;
 };

}
_numberBaseAttribute.prototype = new _attributeBase();


// BOOLEAN ===================================================================
function _booleanAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, initialValue) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.z_initialValue = initialValue;
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'boolean'.
  /// </summary>
  /// <returns type="String" />
  return "boolean";
 };
 this.getInitialValue = function () {
  /// <summary>
  /// Returns the value of the attribute when the record was last saved or the default value before the record is saved.
  /// </summary>
  /// <returns type="Number" />
  return this.z_initialValue;
 }
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the ### attribute
  /// </summary>
  /// <returns type="Boolean" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a Boolean attribute.
  /// </summary>
  /// <param name="newValue" type="Boolean" mayBeNull="false" optional="false" >
  /// The new value for the boolean attribute
  /// </param>
  if (newValue != null && (typeof newValue == "boolean")) {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }

  }
  else {
   throw { message: "Invalid argument. The expected type is Boolean." }
  }
 };

}
_booleanAttribute.prototype = new _attributeBase();

// DATETIME ===================================================================

function _datetimeAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'datetime'.
  /// </summary>
  /// <returns type="String" />
  return "datetime";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the datetime attribute
  /// </summary>
  /// <returns type="Date" />
  return this.z_value;

 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a datetime attribute.
  /// </summary>
  /// <param name="newValue" type="Date" mayBeNull="false" optional="false" >
  /// The new value for the datetime attribute
  /// </param>
  if (this.z_value != newValue) {
   if (newValue == null) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }
   else {
    var test;
    try {
     test = newValue.getYear();
     this.z_value = newValue;
     this.fireOnChange();
    }
    catch (e) {
     throw { message: "Invalid argument. Argument must be a Date object" }
    }
   }
  }

 };

}
_datetimeAttribute.prototype = new _attributeBase();

// DECIMAL ===================================================================

function _decimalAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision) {

 _numberBaseAttribute.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'decimal'.
  /// </summary>
  /// <returns type="String" />
  return "decimal";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the decimal attribute
  /// </summary>
  /// <returns type="Number" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a decimal attribute.
  /// </summary>
  /// <param name="newValue" type="Number" mayBeNull="false" optional="false" >
  /// The new value for the decimal attribute
  /// </param>
  if (newValue == null || typeof newValue == "number") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }


  }
  else {
   throw { message: "Invalid argument. Argument must be of type Number." }
  }
 };

}
_decimalAttribute.prototype = new _numberBaseAttribute();

// DOUBLE ===================================================================

function _doubleAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision) {
 _numberBaseAttribute.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'double'.
  /// </summary>
  /// <returns type="String" />
  return "double";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the double attribute
  /// </summary>
  /// <returns type="Number" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a double attribute.
  /// </summary>
  /// <param name="newValue" type="Number" mayBeNull="false" optional="false" >
  /// The new value for the double attribute
  /// </param>
  if (newValue == null || typeof newValue == "number") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }


  }
  else {
   throw { message: "Invalid argument. Argument must be of type Number." }
  }
 };

}
_doubleAttribute.prototype = new _numberBaseAttribute();

// INTEGER ===================================================================

function _integerAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision) {
 _numberBaseAttribute.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'integer'.
  /// </summary>
  /// <returns type="String" />
  return "integer";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the integer attribute
  /// </summary>
  /// <returns type="Number" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a integer attribute.
  /// </summary>
  /// <param name="newValue" type="Number" mayBeNull="false" optional="false" >
  /// The new value for the integer attribute
  /// </param>
  if (newValue == null || typeof newValue == "number") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }

  }
  else {
   throw { message: "Invalid argument. Argument must be of type Number or null." }
  }
 };

}
_integerAttribute.prototype = new _numberBaseAttribute();

// LOOKUP ===================================================================

function _lookupAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'lookup'.
  /// </summary>
  /// <returns type="String" />
  return "lookup";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the lookup attribute
  /// </summary>
  if (typeof this.z_value == "undefined")
  { return null; }
  else {
   return this.z_value;
  }

 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a lookup attribute.
  /// </summary>
  /// <param name="newValue" type="Array" mayBeNull="true" optional="true" >
  /// The new value for the lookup attribute. This value must be an array of lookup objects
  /// </param>
  if (
		newValue == null || (typeof newValue[0].entityType == "string" && typeof newValue[0].id == "string" && typeof newValue[0].name == "string")
) {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }


  }
  else {
   throw { message: "Invalid argument. Expected an array of lookup objects." }
  }
 };

}
_lookupAttribute.prototype = new _attributeBase();

// MEMO ===================================================================

function _memoAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, maxLength) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.z_maxLength = maxLength;
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'memo'.
  /// </summary>
  /// <returns type="String" />
  return "memo";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the memo attribute
  /// </summary>
  /// <returns type="String" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a memo attribute.
  /// </summary>
  /// <param name="newValue" type="String" mayBeNull="true" optional="false" >
  /// The new value for the memo attribute
  /// </param>
  if (newValue == null || typeof newValue == "string") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }

  }
  else
  { throw { message: "Invalid argument. Valid arguments are null or a String."} }
 };
 this.getMaxLength = function () { 					/// <summary>
  /// Returns a number indicating the maximum length of a string or memo attribute.
  /// </summary>
  /// <returns type="Number" />
  return this.z_maxLength;
 };

}
_memoAttribute.prototype = new _attributeBase();

// MONEY ===================================================================

function _moneyAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision) {
 _numberBaseAttribute.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, max, min, precision);
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case 'money'.
  /// </summary>
  /// <returns type="String" />
  return "money";
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the money attribute
  /// </summary>
  /// <returns type="Number" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a money attribute.
  /// </summary>
  /// <param name="newValue" type="Number" mayBeNull="true" optional="false" >
  /// The new value for the money attribute
  /// </param>
  if (newValue == null || typeof newValue == "number") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }

  }
  else {
   throw { message: "Invalid argument. Argument must be of type Number or null." }
  }
 };

}
_moneyAttribute.prototype = new _numberBaseAttribute();

// OPTIONSET ===================================================================

function _optionsetAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, initialValue, options) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.z_initialValue = initialValue;
 this.z_options = options;
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case "optionset".
  /// </summary>
  /// <returns type="String" />
  return "optionset";
 };
 this.getInitialValue = function () {
  /// <summary>
  /// Returns the value of the optionset when the record was last saved or the default value before the record is saved.
  /// </summary>
  /// <returns type="Number" />
  return this.z_initialValue;
 }
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the optionset attribute
  /// </summary>
  /// <returns type="Number" />
  return this.z_value;
 };
 this.getOption = function (value) {

  /// <summary>
  /// Returns an option object with the value matching the argument passed to the method.
  /// </summary>
  /// <returns type="Object" />		
  /// <param name="value" mayBeNull="false" optional="false" >
  /// The value to use to select the option
  /// </param>
  if (value == null) {
   throw { message: "Invalid argument. Null is not a valid parameter." };
  }
  var searchValue;
  if (typeof value == "string") {
   searchValue = parseInt(value, 10);
   if (isNan(searchValue)) {
    throw { message: "Invalid argument. String argument only valid if it can be converted to a number." };
   }
  }
  else {
   if (typeof value == "number") {
    searchValue = value;
   }
   else {
    throw { message: "Invalid argument. Argument must be a String or a Number." };
   }
  }
  for (var i in this.z_options) {
   if (searchValue == this.z_options[i].value) {
    return this.z_options[i];
   }
  }
 };

 this.getSelectedOption = function () {
  /// <summary>
  /// Returns the currently selected option
  /// </summary>
  /// <returns type="Object" />

  if (this.z_value == null)
  { return null; }
  else {
   for (var i in this.z_options) {
    if (this.z_value == this.z_options[i].value) {
     return this.z_options[i];
    }
   }
  }

 };
 this.getText = function () {
  /// <summary>
  /// Returns the text of the currently selected option;
  /// </summary>
  /// <returns type="String" />}
  var selectedOption = this.getSelectedOption();
  if (selectedOption == null)
  { return ""; }
  else
  { return selectedOption.text; }
 };

 this.getOptions = function () {
  /// <summary>
  /// Retrieves the available options
  /// </summary>
  /// <returns type="Array" />
  return this.z_options;
 }
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a optionset attribute.
  /// </summary>
  /// <param name="newValue" type="Number" mayBeNull="false" optional="false" >
  /// The new value for the optionset attribute
  /// </param>
  if (newValue == null || typeof newValue == "number") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }


  } // No test that the number is a valid option
  else {
   throw { message: "Invalid argument. Argument must be of type Number or null." }
  }
 };

}
_optionsetAttribute.prototype = new _attributeBase();

// STRING ===================================================================

function _stringAttribute(name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls, maxLength) {
 _attributeBase.call(this, name, value, format, isDirty, requiredLevel, submitMode, userPrivilege, controls);
 this.z_maxLength = maxLength;
 this.getAttributeType = function () {
  /// <summary>
  /// Returns a string value that represents the type of attribute. In this case, 'string'.
  /// </summary>
  /// <returns type="String" />
  return "string";
 };
 this.getMaxLength = function () { 					/// <summary>
  /// Returns a number indicating the maximum length of a string or memo attribute.
  /// </summary>
  /// <returns type="Number" />
  return this.z_maxLength;
 };
 this.getValue = function () {
  /// <summary>
  /// Retrieves the data value for the string attribute
  /// </summary>
  /// <returns type="String" />
  return this.z_value;
 };
 this.setValue = function (newValue) {
  /// <summary>
  /// Sets the data value for a string attribute.
  /// </summary>
  /// <param name="newValue" type="String" mayBeNull="true" optional="false" >
  /// The new value for the String attribute
  /// </param>
  if (newValue == null || typeof newValue == "string") {
   if (this.z_value != newValue) {
    this.z_value = newValue;
    this.z_isDirty = true;
    Xrm.Page.data.entity.z_isDirty = true;
    this.fireOnChange();
   }

  }
  else {
   throw { message: "Invalid argument. Argument must be of type String or null." }
  }
 };

}
_stringAttribute.prototype = new _attributeBase();




// Set Attributes Collection
function _attributes() {
 var attCol = [];
 for (var i = 0; i < pageData.Attributes.length; i++) {
  var att = pageData.Attributes[i];
  var attribute;
  var type = att.Type;
  switch (type) {
   case "datetime":
    attribute = new _datetimeAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls);
    break;
   case "lookup":
    attribute = new _lookupAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls);
    break;
   case "memo":
    attribute = new _memoAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.MaxLength);
    break;
   case "string":
    attribute = new _stringAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.MaxLength);
    break;
   case "decimal":
    attribute = new _decimalAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.Max, att.Min, att.Precision);
    break;
   case "double":
    attribute = new _doubleAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.controls, att.Max, att.Min, att.Precision);
    break;
   case "integer":
    attribute = new _integerAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.Max, att.Min, att.Precision);
    break;
   case "money":
    attribute = new _moneyAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.Max, att.Min, att.Precision);
    break;
   case "boolean":
    attribute = new _booleanAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.InitialValue);
    break;
   case "optionset":
    attribute = new _optionsetAttribute(att.Name, att.Value, att.Format, att.IsDirty, att.RequiredLevel, att.SubmitMode, att.UserPrivilege, att.Controls, att.InitialValue, att.Options);
    break;
  }
  attCol.push(attribute);
 }
 return attCol;
}


//The Attributes Collection Methods ===============================================
function _AttributesMethods() {
 return {
  forEach: function (delegate_function) {
   /// <summary>
   /// Applies the action contained within a delegate function.
   /// </summary>
   /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
   /// The delegate_function must include parameters for attribute and index. i.e : MyFunction(attribute,index).
   /// </param>
   var attributes = Xrm.Page.data.entity.z_attCol;
   for (var i in attributes) {
    delegate_function(attributes[i], i);
   }
  },
  get: function (argument) {
   /// <summary>
   /// Returns one or more attributes depending on the arguments passed.
   /// </summary>
   /// <param name="argument" mayBeNull="true" optional="true" >
   /// <para>1: None: Returns an array of all the attributes.</para>
   /// <para>2: String: Returns the attribute where the argument matches the name.</para>
   /// <para>3: Number: Returns the attribute where the argument matches the index.</para>
   /// <para>4: Function: Returns any attributes that cause the delegate function to return true.</para>
   /// </param>
   var argType = typeof argument;

   if (argument == null) {
    return Xrm.Page.data.entity.z_attCol;
   }

   switch (argType) {
    case "number":
     return Xrm.Page.data.entity.z_attCol[argument];
     break;
    case "string":
     for (var i in Xrm.Page.data.entity.z_attCol) {
      if (Xrm.Page.data.entity.z_attCol[i].getName() == argument) {
       return Xrm.Page.data.entity.z_attCol[i];
       break;
      }
     }
     break;
    case "function":
     var AttsToReturn = [];
     for (var i in Xrm.Page.data.entity.z_attCol) {
      if (argument(Xrm.Page.data.entity.z_attCol[i], i))
      { AttsToReturn.push(Xrm.Page.data.entity.z_attCol[i]); }
     }
     return AttsToReturn;
     break;
   }
  },
  getLength: function () {
   /// <summary>
   /// Returns the number of items in the collection.
   /// </summary>
   /// <returns type="Number" />
   return pageData.AttributesLength;
  }
 };
}


//Start Control definitions  -------------------------------------------------------------------
// BASE Control ===================================================================

function _baseControl(name, disabled, label, visible, parent) {
 this.z_name = name;
 this.z_isDisabled = disabled;
 this.z_label = label;
 this.z_parent = parent;
 this.z_isVisible = visible;
 this.getName = function () {
  /// <summary>
  /// Returns a name for the control that is set at runtime.
  /// </summary>
  /// <returns type="String" />
  return this.z_name;
 };
 this.getDisabled = function () {
  /// <summary>
  /// Returns whether the control is disabled.
  /// </summary>
  /// <returns type="Boolean" />
  return this.z_isDisabled;
 };
 this.getLabel = function () {
  /// <summary>
  /// Returns the label for the control
  /// </summary>
  /// <returns type="String" />
  return this.z_label;

 };
 this.getParent = function () {
  /// <summary>
  /// Returns a reference to the section object that contains the control.
  /// </summary>
  return this.z_parent;
 };
 this.getVisible = function () {
  /// <summary>
  /// Returns a value that indicates whether the control is currently visible.
  /// </summary>
  /// <returns type="Boolean" />

  return this.z_isVisible;
 };
 this.setDisabled = function (isDisabled) {
  /// <summary>
  /// Sets whether the control is disabled.
  /// </summary>
  /// <param name="isDisabled" type="Boolean" mayBeNull="false" optional="false" >
  /// Whether the control is disabled.
  /// </param>
  if (typeof isDisabled == "boolean")
  { this.z_isDisabled = isDisabled; }
  else
  { throw { message: "Invalid argument. Boolean value expected."} }
 };
 this.setFocus = function () {
  /// <summary>
  /// Sets the focus on the control.
  /// </summary>
  Xrm.Page.ui.z_currentControl = this.z_name;
 };
 this.setLabel = function (label) {
  /// <summary>
  /// Sets the label for the control.
  /// </summary>
  /// <param name="label" type="String" mayBeNull="false" optional="false" >
  /// The text of the label.
  /// </param>
  if (typeof label == "string")
  { this.z_label = label; }
  else
  { throw { message: "Invalid argument. String value expected."} }
 };
 this.setVisible = function (isVisible) {
  /// <summary>
  /// Sets a value that indicates whether the control is visible. 
  /// </summary>
  /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
  /// Whether the control is visible
  /// </param>
  this.z_isVisible = isVisible;
 };
}


// STANDARD Control ===================================================================

function _standardControl(name, disabled, label, visible, parent, attribute) {
 _baseControl.call(this, name, disabled, label, visible, parent);
 this.z_attribute = attribute;
 this.getAttribute = function () {
  /// <summary>
  /// Returns the attribute that the control is bound to.
  /// </summary>
  if (this.z_attribute == null)
  { return null; }
  else {
   return Xrm.Page.data.entity.attributes.get(this.z_attribute);
  }

 };
 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "standard".
  /// </summary>
  /// <returns type="String" />
  return "standard";
 };
}
_standardControl.prototype = new _baseControl();

// IFrame Control ===================================================================

function _IFrameControl(name, disabled, label, visible, parent, src, initialUrl) {
 _baseControl.call(this, name, disabled, label, visible, parent);
 this.z_src = src;
 this.z_url = initialUrl;
 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "iframe".
  /// </summary>
  /// <returns type="String" />
  return "iframe";
 };
 this.getSrc = function () {
  /// <summary>
  /// Returns a value for the URL to be displayed in an IFrame.
  /// </summary>
  /// <returns type="String" />
  return this.z_src;
 };
 this.setSrc = function (uri) {
  /// <summary>
  /// Sets the URL to be displayed in an IFrame.
  /// </summary>
  /// <param name="uri" type="Boolean" mayBeNull="false" optional="false" >
  /// The URL to be displayed in an IFrame.
  /// </param>
  if (typeof uri == "string")
  { this.z_src = uri; }
  else
  { throw { message: "Invalid argument. String value expected."} }

 }
 this.getInitialUrl = function () {
  /// <summary>
  /// Returns the default URL that an IFrame control is configured to display.
  /// </summary>
  /// <returns type="String" />
  return this.z_url;
 };
}
_IFrameControl.prototype = new _baseControl();


// Lookup Control ===================================================================

function _lookupControl(name, disabled, label, visible, parent, attribute, defaultView) {
 _baseControl.call(this, name, disabled, label, visible, parent);
 this.z_attribute = attribute;
 this.z_defaultView = defaultView;
 this.addCustomView = function (viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
  /// <summary>
  /// Adds a new view for the lookup dialog. 
  /// </summary>
  /// <param name="viewId" type="String" mayBeNull="false" optional="false" >
  /// The string representation of a GUID Id for a view.
  /// </param>
  /// <param name="entityName" type="String" mayBeNull="false" optional="false" >
  /// The name of the entity.
  /// </param>
  /// <param name="viewDisplayName" type="String" mayBeNull="false" optional="false" >
  /// The name of the view.
  /// </param>
  /// <param name="fetchXml" type="String" mayBeNull="false" optional="false" >
  /// The fetchXml query for the view.
  /// </param>
  /// <param name="layoutXml" type="String" mayBeNull="false" optional="false" >
  /// The XML defining the layout of the view.
  /// </param>
  /// <param name="isDefault" type="Boolean" mayBeNull="false" optional="false" >
  /// Whether the view should be the default view.
  /// </param>
  if (typeof viewId != "string" || typeof entityName != "string" || typeof viewDisplayName != "string" || typeof fetchXml != "string" || typeof layoutXml != "string" || typeof isDefault != "boolean") {
   throw { message: "Invalid argument. One of the properties of the view is not the correct type." };
  }
  if (isDefault)
  { this.z_defaultView = viewId; }
 };
 this.getAttribute = function () {
  /// <summary>
  /// Returns the attribute that the control is bound to.
  /// </summary>
  return Xrm.Page.data.entity.attributes.get(this.z_attribute);
 };
 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "lookup".
  /// </summary>
  /// <returns type="String" />
  return "lookup";
 };
 this.getDefaultView = function () {
  /// <summary>
  /// Returns the Id value of the default lookup dialog view.
  /// </summary>
  /// <returns type="String" />
  return this.z_defaultView;
 };
 this.setDefaultView = function (viewGuid) {
  /// <summary>
  /// Sets the Id value of the default lookup dialog view.
  /// </summary>
  /// <returns type="String" />
  /// <param name="viewGuid" type="String" mayBeNull="false" optional="false" >
  /// String specifies the GUID for the default view
  /// </param>
  if (typeof viewGuid == "string")
  { }
  else
  { throw { message: "Invalid argument. String value expected."} }
 };

}
_lookupControl.prototype = new _baseControl();


// optionSet Control ===================================================================

function _optionSetControl(name, disabled, label, visible, parent, attribute) {
 _baseControl.call(this, name, disabled, label, visible, parent);
 this.z_attribute = attribute;
 this.z_options = [];

 try {
  this.z_options = Xrm.Page.data.entity.attributes.get(attribute).getOptions();
 }
 catch (e) {
  //If a Boolean Attribute is formatted as a list, it has a optionset control but the attribute
  // doesn't support the getOptions methods resulting in the following error.
  if (e.number == -2146827850) {
   //Setting a pair of Boolean value options to simulate a boolean attribute.
   this.z_options.push({ "text": "True", "value": 1 });
   this.z_options.push({ "text": "False", "value": 0 });
  }
  else
  { throw (e); }

 }

 this.addOption = function (option, index) {
  /// <summary>
  /// Adds an option to an Option set control.
  /// </summary>
  /// <param name="option" type="Object" mayBeNull="false" optional="false" >
  /// An option object to add to the OptionSet. For example: { "text": "Item A", "value": "100000000" }
  /// </param>
  /// <param name="index" type="Number" mayBeNull="true" optional="true" >
  ///  (Optional) The index position to place the new option. If not provided the option will be added to the end.
  /// </param>

  if (index != null) {
   var newOptions = [];
   for (var i = 0; i < this.z_options; i++) {
    if (i == index) {
     newOptions.push(option);
     i--;
    }
    else {
     newOptions.push(this.z_options[i]);
    }
   }
   this.z_options = newOptions;
  }
  else {
   this.z_options.push(option);
  }
 };
 this.getAttribute = function () {
  /// <summary>
  /// Returns the attribute that the control is bound to.
  /// </summary>
  return Xrm.Page.data.entity.attributes.get(this.z_attribute);
 };
 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "optionset".
  /// </summary>
  /// <returns type="String" />
  return "optionset";
 };
 this.clearOptions = function () {
  /// <summary>
  /// Clears all options from an Option Set control.
  /// </summary>
  this.z_options = [];
 };
 this.removeOption = function (value) {
  /// <summary>
  /// Removes an option from an Option Set control.
  /// </summary>
  /// <param name="value" type="Number" mayBeNull="false" optional="false" >
  /// The value of the option you want to remove.
  /// </param>
  if (value == null || typeof value == "number") {
   var newOptions = [];
   for (var i = 0; i < this.z_options.length; i++) {
    if (this.z_options[i].value == value) {
     i++;
    }
    else {
     newOptions.push(this.z_options[i]);
    }
   }
   this.z_options = newOptions;
  }
  else
  { throw { message: "Invalid argument. Number or null value expected"} }
 }
}
_optionSetControl.prototype = new _baseControl();


// subGrid Control ===================================================================

function _subGridControl(name, disabled, label, visible, parent) {
 _baseControl.call(this, name, disabled, label, visible, parent);

 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "subgrid".
  /// </summary>
  /// <returns type="String" />
  return "subgrid";
 };
 this.refresh = function () {
  /// <summary>
  /// Refreshes the data displayed in a Sub-Grid
  /// </summary>
 };

}
_subGridControl.prototype = new _baseControl();


// webResource Control ===================================================================

function _webResourceControl(name, disabled, label, visible, parent, src, data) {
 _baseControl.call(this, name, disabled, label, visible, parent);
 this.z_src = src;
 this.z_data = data;
 this.getControlType = function () {
  /// <summary>
  /// Returns a String describing the type of control. In this case "webresource".
  /// </summary>
  /// <returns type="String" />
  return "webresource";
 };
 this.getSrc = function () {
  /// <summary>
  /// Returns a value for the URL to be displayed in an Web Resource.
  /// </summary>
  /// <returns type="String" />
  return this.z_src;
 };
 this.setSrc = function (uri) {
  /// <summary>
  /// Sets the URL to be displayed in an Web Resource.
  /// </summary>
  /// <param name="uri" type="Boolean" mayBeNull="false" optional="false" >
  /// The URL to be displayed in an IFrame.
  /// </param>
  if (typeof uri == "string")
  { this.z_src = uri; }
  else
  { throw { message: "Invalid argument. String value expected."} }

 }
 if (this.z_data != "No data property") {
  this.getData = function () {
   /// <summary>
   /// Returns a value for the data parameter passed to a Silverlight Web resource.
   /// </summary>
   /// <returns type="Object" />
   return this.z_data;
  }
  this.setData = function (obj) {
   /// <summary>
   /// Sets the data parameter passed to a Silverlight Web resource.
   /// </summary>
   /// <param name="obj" type="Object" mayBeNull="false" optional="false" >
   /// The data parameter to be passed to a Silverlight Web resource.
   /// </param>
   this.z_data = obj;
  }

 }

}
_webResourceControl.prototype = new _baseControl();

//End Control definitions  -------------------------------------------------------------------

function _tabs() {
 var AllTabsData = pageData.Tabs;
 arrTabs = [];
 for (var i in AllTabsData) {
  arrTabs.push(new _tab(AllTabsData[i], i));
 }
 return arrTabs;
}

function _tab(tb, index) {
 this.z_index = index;
 this.z_label = tb.Label;
 this.z_name = tb.Name;
 this.z_displayState = tb.DisplayState;
 this.z_isVisible = tb.Visible;
 this.getDisplayState = function () {
  /// <summary>
  /// Returns the display state for the tab
  /// </summary>
  /// <returns type="String" />
  return this.z_displayState;

 };
 this.getLabel = function () {
  /// <summary>
  /// Returns the label for the tab
  /// </summary>
  /// <returns type="String" />
  return this.z_label;

 };
 this.getName = function () {
  /// <summary>
  /// Returns the name for the tab
  /// </summary>
  /// <returns type="String" />
  return this.z_name;

 };
 this.getParent = function () {
  /// <summary>
  /// Returns a reference to Xrm.Page.ui
  /// </summary>
  return Xrm.Page.ui;
 };
 this.getVisible = function () {
  /// <summary>
  /// Returns a value that indicates whether the tab is currently visible.
  /// </summary>
  /// <returns type="Boolean" />

  return this.z_isVisible;
 };
 this.setDisplayState = function (state) {
  /// <summary>
  /// Sets the display state for the tab.
  /// </summary>
  /// <param name="state" type="String" mayBeNull="false" optional="false" >
  /// The state of the tab either expanded or collapsed
  /// </param>
  if (state == "expanded" || state == "collapsed")
  { this.z_displayState = state; }
  else
  { throw { message: "Invalid argument. Valid values are \"expanded\" and \"collapsed\"."} }
 };
 this.setFocus = function () {
  /// <summary>
  /// Sets the focus on the tab.
  /// </summary>
 };
 this.setLabel = function (label) {
  /// <summary>
  /// Sets the label for the tab.
  /// </summary>
  /// <param name="label" type="String" mayBeNull="false" optional="false" >
  /// The text of the label.
  /// </param>
  if (typeof label == "string") {
   this.z_label = label;
  }
  else
  { throw { message: "Invalid argument. String type expected."} }
 };
 this.setVisible = function (isVisible) {
  /// <summary>
  /// Sets a value that indicates whether the tab is visible. 
  /// </summary>
  /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
  /// Whether the control is visible
  /// </param>
  if (typeof isVisible == "boolean") {
   this.z_isVisible = isVisible;
  }
  else
  { throw { message: "Invalid argument. Boolean type expected."} }
 };

 this.z_sections = [];
 for (var i in tb.Sections) {
  this.z_sections.push(new _section(tb.Sections[i], this, index, i));
 }

 this.sections = {}; //Do later

}

function _section(sect, parentTab, thisTabIndex, thisSectionIndex) {

 this.z_label = sect.Label;
 this.z_name = sect.Name;
 this.z_parent = parentTab;
 this.z_isVisible = sect.Visible;

 this.getLabel = function () {
  /// <summary>
  /// Returns the label for the section
  /// </summary>
  /// <returns type="String" />
  return this.z_label;

 };
 this.getName = function () {
  /// <summary>
  /// Returns the name for the section
  /// </summary>
  /// <returns type="String" />
  return this.z_name;

 };
 this.getParent = function () {
  /// <summary>
  /// Returns a reference to the tab object that contains the section.
  /// </summary>
  return this.z_parent;
 };
 this.getVisible = function () {
  /// <summary>
  /// Returns a value that indicates whether the section is currently visible.
  /// </summary>
  /// <returns type="Boolean" />

  return this.z_isVisible;
 };

 this.setLabel = function (label) {
  /// <summary>
  /// Sets the label for the section.
  /// </summary>
  /// <param name="label" type="String" mayBeNull="false" optional="false" >
  /// The text of the label.
  /// </param>
  if (typeof label == "string") {
   this.z_label = label;
  }
  else
  { throw { message: "Invalid argument. String type expected."} }

 };
 this.setVisible = function (isVisible) {
  /// <summary>
  /// Sets a value that indicates whether the section is visible. 
  /// </summary>
  /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
  /// Whether the control is visible
  /// </param>
  if (typeof isVisible == "boolean") {
   this.z_isVisible = isVisible;
  }
  else
  { throw { message: "Invalid argument. Boolean type expected."} }
 };
 this.z_sectionControls = new _sectionControls(sect.Controls, this);

 this.controls = {} //Do later


}

function _sectionControls(controlNames, parentSection) {
 var sectControls = [];
 for (var i in controlNames) {
  var control;
  for (var x in pageData.Controls) {
   var cntrl = pageData.Controls[x];
   if (cntrl.Name == controlNames[i].Name) {
    switch (cntrl.Type) {
     case "standard":
      control = new _standardControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Attribute);
      if (cntrl.Attribute != null) // Notes control is a standard control without an attribute
      {
       Xrm.Page.data.entity.attributes.get(cntrl.Attribute).z_ctrlCol.push(control);
      }
      break;
     case "iframe":
      control = new _IFrameControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Src, cntrl.InitialUrl);
      break;
     case "lookup":
      control = new _lookupControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Attribute, cntrl.DefaultView);
      Xrm.Page.data.entity.attributes.get(cntrl.Attribute).z_ctrlCol.push(control);
      break;
     case "optionset":
      control = new _optionSetControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Attribute);
      Xrm.Page.data.entity.attributes.get(cntrl.Attribute).z_ctrlCol.push(control);
      break;
     case "subgrid":
      control = new _subGridControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection);
      break;
     case "webresource":
      //Only Silverlight Web resources have a data property.
      if (typeof (cntrl.Data) == "undefined") {
       control = new _webResourceControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Src, "No data property");
       break;
      }
      else {
       control = new _webResourceControl(cntrl.Name, cntrl.Disabled, cntrl.Label, cntrl.Visible, parentSection, cntrl.Src, cntrl.Data);
       break;
      }
    }
    Xrm.Page.ui.z_ctrlCol.push(control);
   }
  }
  sectControls.push(control);
 }
 return sectControls;
}



//The Tabs Methods 
function _tabsMethods() {
 return {
  forEach: function (delegate_function) {
   /// <summary>
   /// Applies the action contained within a delegate function.
   /// </summary>
   /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
   /// The delegate_function must include parameters for tab and index. i.e : MyFunction(tab,index).
   /// </param>

   var tabs = Xrm.Page.ui.z_tabsCol;
   for (var i in tabs) {
    delegate_function(tabs[i], i);
   }

  },
  get: function (argument) {
   /// <summary>
   /// Returns one or more tabs depending on the arguments passed.
   /// </summary>
   /// <param name="argument" mayBeNull="true" optional="true" >
   /// <para>1: None: Returns an array of all the tabs.</para>
   /// <para>2: String: Returns the tab where the argument matches the name.</para>
   /// <para>3: Number: Returns the tab where the argument matches the index.</para>
   /// <para>4: Function: Returns any tabs that cause the delegate function to return true.</para>
   /// </param>
   var argType = typeof argument;

   if (argument == null) {
    return Xrm.Page.ui.z_tabsCol;
   }

   switch (argType) {
    case "number":
     return Xrm.Page.ui.z_tabsCol[argument];
     break;
    case "string":
     for (var i in Xrm.Page.ui.z_tabsCol) {
      if (Xrm.Page.ui.z_tabsCol[i].getName() == argument) {
       return Xrm.Page.ui.z_tabsCol[i];
       break;
      }
     }
     return null;
     break;
    case "function":
     var TabsToReturn = [];
     for (var i in Xrm.Page.ui.z_tabsCol) {
      if (argument(Xrm.Page.ui.z_tabsCol[i], i))
      { TabsToReturn.push(Xrm.Page.ui.z_tabsCol[i]); }
     }
     return TabsToReturn;
     break;
   }
  },
  getLength: function () {
   /// <summary>
   /// Returns the number of items in the collection.
   /// </summary>
   /// <returns type="Number" />
   return pageData.Tabs.length;
  }
 };
}

function _sectionMethods(thisTabIndex) {
 return {
  tabIndex: thisTabIndex,
  forEach: function (delegate_function) {
   /// <summary>
   /// Applies the action contained within a delegate function.
   /// </summary>
   /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
   /// The delegate_function must include parameters for section and index. i.e : MyFunction(section,index).
   /// </param>
   var sections = Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections;
   for (var i in sections) {
    delegate_function(sections[i], i);
   }

  },
  get: function (argument) {
   /// <summary>
   /// Returns one or more sections depending on the arguments passed.
   /// </summary>
   /// <param name="argument" mayBeNull="true" optional="true" >
   /// <para>1: None: Returns an array of all the sections.</para>
   /// <para>2: Number: Returns the section where the argument matches the index.</para>
   /// <para>3: String: Returns the section where the argument matches the name.</para>
   /// <para>4: Function: Returns any sections that cause the delegate function to return true.</para>
   /// </param>
   var argType = typeof argument;

   if (argument == null) {

    return Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections
   }

   switch (argType) {
    case "number":
     return Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections[argument];
     break;
    case "string":
     for (var i in Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections) {
      if (Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections[i].getName() == argument) {
       return Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections[i];
       break;
      }
     }
     return null;
     break;
    case "function":
     var SectionsToReturn = [];
     for (var i in Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections) {
      if (argument(Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections[i], i))
      { SectionsToReturn.push(Xrm.Page.ui.z_tabsCol[this.tabIndex].z_sections[i]); }
     }
     return SectionsToReturn;
     break;
   }
  },
  getLength: function () {
   /// <summary>
   /// Returns the number of sections in the tab.
   /// </summary>
   /// <returns type="Number" />
   return pageData.Tabs[this.tabIndex].Sections.length;
  }
 };

}

// Section Controls Methods
function _SectionControlsMethods(thisTabIndex, thisSectionIndex) {
 return {
  controls: Xrm.Page.ui.z_tabsCol[thisTabIndex].z_sections[thisSectionIndex].z_sectionControls,
  forEach: function (delegate_function) {
   /// <summary>
   /// Applies the action contained within a delegate function.
   /// </summary>
   /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
   /// The delegate_function must include parameters for section and index. i.e : MyFunction(section,index).
   /// </param>

   for (var i in this.controls) {
    delegate_function(this.controls[i], i);
   }

  },
  get: function (argument) {
   /// <summary>
   /// Returns one or more sections depending on the arguments passed.
   /// </summary>
   /// <param name="argument" mayBeNull="true" optional="true" >
   /// <para>1: None: Returns an array of all the sections.</para>
   /// <para>2: Number: Returns the section where the argument matches the index.</para>
   /// <para>3: String: Returns the section where the argument matches the name.</para>
   /// <para>4: Function: Returns any sections that cause the delegate function to return true.</para>
   /// </param>
   var argType = typeof argument;

   if (argument == null) {

    return this.controls
   }

   switch (argType) {
    case "number":
     return this.controls[argument];
     break;
    case "string":
     for (var i in this.controls) {
      if (this.controls[i].getName() == argument) {
       return this.controls[i];
       break;
      }
     }
     break;
    case "function":
     var ControlsToReturn = [];
     for (var i in this.controls) {
      if (argument(this.controls[i], i))
      { ControlsToReturn.push(this.controls[i]); }
     }
     return ControlsToReturn;
     break;
   }
  },
  getLength: function () {
   /// <summary>
   /// Returns the number of sections in the tab.
   /// </summary>
   /// <returns type="Number" />
   return this.controls.length;
  }
 };

}


function _attributeControlMethods(arrCntrls) {
 return {

  forEach: function (delegate_function) {
   /// <summary>
   /// Applies the action contained within a delegate function.
   /// </summary>
   /// <param name="delegate_function" type="Object" mayBeNull="false" optional="false" >
   /// The function must include parameters for control and index. i.e Myfunction(control, index).
   /// </param>					
   for (var i in arrCntrls) {
    delegate_function(arrCntrls[i], i);
   }
  },
  get: function (argument) {

   /// <summary>
   /// Returns one or more controls depending on the arguments passed.
   /// </summary>
   /// <param name="argument" mayBeNull="true" optional="true" >
   /// <para>1: None: Returns an array of all the section.</para>
   /// <para>2: String: Returns the control where the argument matches the name.</para>
   /// <para>3: Number: Returns the control where the argument matches the index.</para>
   /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
   /// </param>
   if (argument == null || argument == "undefined")
   { return arrCntrls; }
   var argType = new String();
   argType = typeof argument;

   switch (argType) {
    case "number":
     return arrCntrls[argument];
     break;
    case "string":

     for (var i in arrCntrls) {
      if (arrCntrls[i].getName() == argument) {
       return arrCntrls[i];
      }
     }
     break;
    case "function":
     var ControlsToReturn = [];
     for (var i in arrCntrls) {
      if (argument(arrCntrls[i], i))
      { ControlsToReturn.push(arrCntrls[i]); }
     }
     return ControlsToReturn;
     break;
   }

  },
  getLength: function () {
   return arrCntrls.length;
  }

 };
};

//The UI Controls Methods
function _uiControlsMethods() {
 this.forEach = function (delegate_function) {
  /// <summary>
  /// Applies the action contained within a delegate function.
  /// </summary>
  /// <param name="delegate_function" type="Object" mayBeNull="false" optional="false" >
  /// The function must include parameters for control and index. i.e Myfunction(control, index).
  /// </param>
  var controls = Xrm.Page.ui.z_ctrlCol;
  for (var i in controls) {
   delegate_function(controls[i], i);
  }

 };
 this.get = function (argument) {
  /// <summary>
  /// Returns one or more controls depending on the arguments passed.
  /// </summary>
  /// <param name="argument" type="Object" mayBeNull="true" optional="true" >
  /// <para>1: None: Returns an array of all the controls.</para>
  /// <para>2: String: Returns the control where the argument matches the name.</para>
  /// <para>3: Number: Returns the control where the argument matches the index.</para>
  /// <para>4: Function: Returns any controls that cause the delegate function to return true.</para>
  /// </param>
  if (argument == null)
  { return Xrm.Page.ui.z_ctrlCol; }
  var argType = typeof argument;
  var Controls = Xrm.Page.ui.z_ctrlCol;
  switch (argType) {
   case "number":
    return Controls[argument];
    break;
   case "string":

    for (var i in Controls) {
     if (Controls[i].getName() == argument) {
      return Controls[i];
     }
    }
    break;
   case "function":
    var ControlsToReturn = [];
    for (var i in Controls) {
     if (argument(Controls[i], i))
     { ControlsToReturn.push(Controls[i]); }
    }
    return ControlsToReturn;
    break;
  }

 };
 this.getLength = function ()
 { return pageData.ControlsLength; };

}

function _navigation() {
 return {
  z_navItems: new _navItemsCol(),
  items: {} // Set later
 };
}

function _navItemsCol() {
 var navItems = [];
 for (var i in pageData.Navigation)
 { navItems.push(new _navItem(pageData.Navigation[i])); }
 return navItems;

}

function _navItem(item) {
 this.z_id = item.Id;
 this.z_key = item.Key;
 this.z_label = item.Label;
 this.z_isVisible = item.Visible;
 this.getId = function () {
  /// <summary>
  /// Returns the id of the item
  /// </summary>
  /// <returns type="String" />
  return this.z_id;
 };
 this.getKey = function () {
  /// <summary>
  /// Returns the key of the item
  /// </summary>
  /// <returns type="String" />
  return this.z_key;
 };
 this.getLabel = function () {
  /// <summary>
  /// Returns the label for the item
  /// </summary>
  /// <returns type="String" />
  return this.z_label;
 };
 this.getVisible = function () {
  /// <summary>
  /// Returns whether the item is currently visible.
  /// </summary>
  /// <returns type="Boolean" />
  return this.z_isVisible;
 };
 this.setFocus = function () {
  /// <summary>
  /// Sets focus on the item
  /// </summary>
 };
 this.setLabel = function (labelText) {
  /// <summary>
  /// Sets the label text of the item.
  /// </summary>
  /// <param name="labelText" type="String" mayBeNull="false" optional="false" >
  /// The new text for the label.
  /// </param>
  if (typeof labelText == "string")
  { this.z_label = labelText; }
  else
  { throw { message: "Invalid argument. Expected string value." }; }
 };
 this.setVisible = function (isVisible) {
  /// <summary>
  /// Sets whether the item is visible
  /// </summary>
  /// <param name="isVisible" type="Boolean" mayBeNull="false" optional="false" >
  /// The boolean value indicating whether the item is visible
  /// </param>
  if (typeof isVisible == "boolean") {
   this.z_isVisible = isVisible;
  }
  else
  { throw { message: "Invalid argument. Expected boolean value." }; }
 };
}

function _navItemsMethods() {
 this.items = Xrm.Page.ui.navigation.z_navItems;
 this.forEach = function (delegate_function) {
  /// <summary>
  /// Applies the action contained within a delegate function.
  /// </summary>
  /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
  /// The function must include parameters for navigation item and index. i.e Myfunction(item, index).
  /// </param>

  for (var i in this.items) {
   delegate_function(this.items[i], i);
  }

 };
 this.get = function (argument) {
  /// <summary>
  /// Returns one or more items depending on the arguments passed.
  /// </summary>
  /// <param name="argument" mayBeNull="true" optional="true" >
  /// <para>1: None: Returns an array of all the items.</para>
  /// <para>2: String: Returns the item where the argument matches the id.</para>
  /// <para>3: Number: Returns the item where the argument matches the index.</para>
  /// <para>4: Function: Returns any items that cause the delegate function to return true.</para>
  /// </param>
  if (argument == null)
  { return this.items; }
  var argType = typeof argument;
  switch (argType) {
   case "number":
    return this.items[argument];
    break;
   case "string":

    for (var i in this.items) {
     if (this.items[i].getId() == argument) {
      return this.items[i];
     }
    }
    break;
   case "function":
    var ItemsToReturn = [];
    for (var i in this.items) {
     if (argument(this.items[i], i))
     { ItemsToReturn.push(this.items[i]); }
    }
    return ItemsToReturn;
    break;
  }

 };
 this.getLength = function ()
 { return this.items.length; };

}

function _formSelector() {
 return {
  z_formItems: new _formItemsCol(),
  z_currentItem: new _formItem(pageData.CurrentForm),
  getCurrentItem: function () {		/// <summary>
   /// Returns a reference to the form currently being shown.
   /// </summary>
   /// <returns type="Object" />
   return this.z_currentItem;
  },
  items: {} // Set later
 };
}

function _formItemsCol() {
 var formItems = [];
 for (var i in pageData.Forms)
 { formItems.push(new _formItem(pageData.Forms[i])); }
 return formItems;
}

function _formItem(item) {
 if (item == null) {
  return null;
 }
 this.z_id = item.Id;
 this.z_key = item.Key;
 this.z_label = item.Label;
 this.getId = function () {
  /// <summary>
  /// Returns the id of the form item
  /// </summary>
  /// <returns type="String" />
  return this.z_id;
 };
 this.getKey = function () {
  /// <summary>
  /// Returns the key of the form item
  /// </summary>
  /// <returns type="String" />
  return this.z_key;
 };
 this.getLabel = function () {
  /// <summary>
  /// Returns the label for the form item
  /// </summary>
  /// <returns type="String" />
  return this.z_label;
 };
 this.navigate = function () {
  /// <summary>
  /// Closes the current form and opens the specified form.
  /// </summary>
 };
}

function _formItemsMethods() {
 this.items = Xrm.Page.ui.formSelector.z_formItems;
 this.forEach = function (delegate_function) {
  /// <summary>
  /// Applies the action contained within a delegate function.
  /// </summary>
  /// <param name="delegate_function" type="Function" mayBeNull="false" optional="false" >
  /// The function must include parameters for form item and index. i.e Myfunction(item, index).
  /// </param>

  for (var i in this.items) {
   delegate_function(this.items[i], i);
  }

 };
 this.get = function (argument) {
  /// <summary>
  /// Returns one or more form items depending on the arguments passed.
  /// </summary>
  /// <param name="argument" mayBeNull="true" optional="true" >
  /// <para>1: None: Returns an array of all the form items.</para>
  /// <para>2: String: Returns the form item where the argument matches the id.</para>
  /// <para>3: Number: Returns the form item where the argument matches the index.</para>
  /// <para>4: Function: Returns any form items that cause the delegate function to return true.</para>
  /// </param>
  if (argument == null)
  { return this.items; }
  var argType = typeof argument;
  switch (argType) {
   case "number":
    return this.items[argument];
    break;
   case "string":

    for (var i in this.items) {
     if (this.items[i].getId() == argument) {
      return this.items[i];
     }
    }
    break;
   case "function":
    var ItemsToReturn = [];
    for (var i in this.items) {
     if (argument(this.items[i], i))
     { ItemsToReturn.push(this.items[i]); }
    }
    return ItemsToReturn;
    break;
  }

 };
 this.getLength = function ()
 { return this.items.length; };

}

var eContext = {
 z_depth: 0,
 z_sharedVariables: [],
 z_event: pageData.Event,
 z_eventSource: pageData.EventSource,
 z_eventArgs: new _eventArgs(),
 getContext: function () {
  /// <summary>
  /// Returns the Xrm.Page.context object
  /// </summary>
  /// <returns type="Object" />
  return Xrm.Page.context;
 },
 getDepth: function () {
  /// <summary>
  /// Returns a value indicating the order in which this handler is executed. 
  /// </summary>
  /// <returns type="Number" />
  return this.z_depth;
 },
 getEventArgs: function () { 		/// <summary>
  /// Returns an object with methods to manage the Save event.
  /// </summary>
  /// <returns type="Object" />
  return this.z_eventArgs;
 },
 getEventSource: function () {
  /// <summary>
  /// Returns a reference to the object that the event occurred on.
  /// </summary>
  /// <returns type="Object" />
  var type = this.z_eventSource.type;
  var name = this.z_eventSource.name;
  switch (type) {
   case "attribute":
    return Xrm.Page.getAttribute(name);
    break;
   case "tab":
    return Xrm.Page.ui.tabs.get(name);
    break;
   case "IFRAME":
    return Xrm.Page.ui.controls.get(name);
    break;
   default:
    return null;
    break;

  }
 },
 getSharedVariable: function (key) {
  /// <summary>
  /// Retrieves a variable set using setSharedVariable in an earlier event handler
  /// </summary>
  /// <returns type="Object" />
  var sharedVariables = this.z_sharedVariables
  for (var i in sharedVariables) {
   if (sharedVariables[i].key == key) {
    return sharedVariables[i].value;
    break;
   }
  }
 },
 setSharedVariable: function (key, value) {
  /// <summary>
  /// Sets the value of a variable to be used by a hander after the current handler completes.
  /// </summary>
  this.z_sharedVariables.push({ "key": key, "value": value });
 }

};

function _eventArgs() {
 if (pageData.Event == "onsave") {
  return {


   getSaveMode: function () {
    /// <summary>
    /// Returns a value indicating how the save event was initiated by the user.
    /// <para>1 : Save - any entity.</para>
    /// <para>2 : Save and Close - any entity.</para>
    /// <para>59 : Save and New - any entity.</para>
    /// <para>58: Save as Completed - activity.</para>
    /// <para>5 : Deactivate - any entity.</para>
    /// <para>6 : Reactivate - any entity.</para>
    /// <para>47 : Assign - any user or team owned entity.</para>
    /// <para>7 : Send - E-Mail.</para>
    /// <para>16 : Qualify - Lead.</para>
    /// <para>15 : Disqualify - Lead.</para>
    /// </summary>
    /// <returns type="Number" />
    return this.z_saveMode;
   },
   isDefaultPrevented: function () {
    /// <summary>
    /// Returns a value indicating whether the save event has been cancelled because the preventDefault method was used in this event hander or a previous event handler.
    /// </summary>
    /// <returns type="Boolean" />
    return Xrm.Page.data.entity.z_defaultPrevented
   },
   preventDefault: function () {
    /// <summary>
    /// Cancels the save operation, but all remaining handlers for the event will still be executed.
    /// </summary>

    Xrm.Page.data.entity.z_defaultPrevented = true;
   },
   z_saveMode: pageData.SaveMode
  };
 }
 else
 { return null; }

}

//Placeholders for the supported MS AJAX date functions found in the XrmPage.
//NOTE: These do not necessarily match the actual return values

// format method: See http://msdn.microsoft.com/en-us/library/bb384009.aspx
Date.prototype.format = function () {
 /// <summary>
 /// <para>Formats a date as a string using the user's Microsoft CRM locale preferences.</para>
 /// <para>NOTE: This function is simulated in the XrmPageTemplate. It uses the operating system locale.</para>
 /// </summary>
 return this.toString();
};
// localeFormat method: See http://msdn.microsoft.com/en-us/library/bb383816.aspx
Date.prototype.localeFormat = function () {
 /// <summary>
 /// <para>Formats a date Formats a date as a string using the user's Microsoft CRM locale preferences.</para>
 /// <para>NOTE: This function is simulated in the XrmPageTemplate. It uses the operating system locale.</para>
 /// </summary>
 return this.toLocaleString();
};
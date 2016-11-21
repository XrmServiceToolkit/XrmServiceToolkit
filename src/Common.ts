export function alertMessage(message: string): void {
    (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message, null) : alert(message);
}
/**
 * Check if two guids are equal
 *
 * @param {string} guid1 A string represents a guid
 * @param {string} guid2 A string represents a guid
 * @returns {boolean}
 */
export function guidsAreEqual(guid1: string, guid2: string): boolean {
    let isEqual;
    if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) {
        isEqual = false;
    } else {
        isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
    }

    return isEqual;
}

/**
 * Test if string is guid
 *
 * @param {string} guid A string represents a guid
 * @return {boolean}
 */
export function isGuid(guid: string): boolean {
    return /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0‌​-9a-fA-F]{4}\-[0-9a-‌​fA-F]{12}$/i.test(guid);
}

/**
 * Enable a field by the name
 *
 * @param {string} fieldName The name of the field to be enabled
 */
export function enableField(fieldName: string): void {
    Xrm.Page.getControl(fieldName).setDisabled(false);
}

/**
 * Disable a field by the name
 *
 * @param {string} fieldName The name of the field to be disabled
 */
export function disableField(fieldName: string): void {
    Xrm.Page.getControl(fieldName).setDisabled(true);
}

/**
 * Show a field by the name
 *
 * @param {string} fieldName The name of the field to be shown
 */
export function showField(fieldName: string): void {
    Xrm.Page.getControl(fieldName).setVisible(true);
}

/**
 * Hide a field by the name
 *
 * @param {string} fieldName The name of the field to be shown
 */
export function hideField(fieldName: string): void {
    Xrm.Page.getControl(fieldName).setVisible(false);
}

/**
 * Updates the requirement level of a field
 *
 * @param {string} fieldName Name of the field
 * @param {string} levelName Name of the requirement level. [none, recommended, required] (Case Sensitive)
 */
export function updateRequirementLevel(fieldName: string, levelName: string): void {
    Xrm.Page.getAttribute(fieldName).setRequiredLevel(levelName);
}

/**
 * Alert the error message if occurred
 *
 * @param {error} error Object of the JavaScript error
 */
export function showError(error: Error): void {
    alertMessage(error.message);
}

/**
 * Gets the EntityTypeCode / ObjectTypeCode of a entity
 *
 * @param {string} entityName Name of entity to return object type code of
 */
export function getObjectTypeCode(entityName: string): number {
    try {
        let entityMetaData = XrmServiceToolkit.Soap.RetrieveEntityMetadata("Entity", entityName, false);
        if (entityMetaData && entityMetaData.length === 1) {
            return entityMetaData[0].ObjectTypeCode;
        } else {
            return null;
        }
    } catch (e) {
        showError(e.message);
        return null;
    }
}

/**
 * Add a notification bar message with CRM 2011 style
 *
 * @param {string} message Details of the message
 * @param {number} level The warning level of the message: [1 critical, 2 information, 3 warning]
 * @param {string} uniqueId A unique identifier for the message used with clearFormNotification to remove the notification.
 */
export function addNotification(message: string, level: number, uniqueId: string): void {
    if (Xrm.Page.ui.setFormNotification !== undefined) {
        // CRM 2013
        if (!!uniqueId) {
            Xrm.Page.ui.clearFormNotification(uniqueId);
            if (level === 1) {
                //Error
                Xrm.Page.ui.setFormNotification(message, "ERROR", uniqueId);
            }
            if (level === 2) {
                //Info
                Xrm.Page.ui.setFormNotification(message, "INFO", uniqueId);
            }
            if (level === 3) {
                //Warning
                Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId);
            }
        } else {
            let tempUniqueId = "formNotification00";
            Xrm.Page.ui.clearFormNotification(tempUniqueId);
            if (level === 1) {
                //Error
                Xrm.Page.ui.setFormNotification(message, "ERROR", tempUniqueId);
            }
            if (level === 2) {
                //Info
                Xrm.Page.ui.setFormNotification(message, "INFO", tempUniqueId);
            }
            if (level === 3) {
                //Warning
                Xrm.Page.ui.setFormNotification(message, "WARNING", tempUniqueId);
            }
        }
    }
    // Deprecated -> Turboforms
    // } else {
    //     let notificationsArea = document.getElementById('crmNotifications');
    //     if (notificationsArea === null || notificationsArea === undefined) {
    //         alertMessage('Cannot find the notification area');
    //         return;
    //     }
    //     if (typeof notificationsArea.AddNotification !== "undefined" && typeof notificationsArea.control.AddNotification !== "undefined") {
    //         alertMessage('Add Notification is no longer supported');
    //         return;
    //     }
    //     if (level === 1) {
    //         //critical
    //         if (typeof notificationsArea.AddNotification !== "undefined") {
    //             notificationsArea.AddNotification('mep1', 1, 'source', message);
    //         } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
    //             notificationsArea.control.AddNotification('mep1', 1, 'source', message);
    //         }
    //     }

    //     if (level === 2) {
    //         //Info
    //         if (typeof notificationsArea.AddNotification !== "undefined") {
    //             notificationsArea.AddNotification('mep3', 3, 'source', message);
    //         } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
    //             notificationsArea.control.AddNotification('mep3', 3, 'source', message);
    //         }
    //     }
    //     if (level === 3) {
    //         //Warning
    //         if (typeof notificationsArea.AddNotification !== "undefined") {
    //             notificationsArea.AddNotification('mep2', 2, 'source', message);
    //         } else if (typeof notificationsArea.control.AddNotification !== "undefined") {
    //             notificationsArea.control.AddNotification('mep2', 2, 'source', message);
    //         }
    //     }
    //     if (message === "") {
    //         if (typeof notificationsArea.SetNotifications !== "undefined") {
    //             notificationsArea.SetNotifications(null, null);
    //         } else if (typeof notificationsArea.control.SetNotifications !== "undefined") {
    //             notificationsArea.control.SetNotifications(null, null);
    //         } else {
    //             alertMessage('Set Notification is no longer supported');
    //         }
    //     }
    // }
}

export function addControlNotification(attributeName: string, message: string, uniqueId: string = "XrmServiceToolkit"): void {
    if (Xrm.Page.getControl(attributeName).setNotification !== undefined) {
        Xrm.Page.getControl(attributeName).setNotification(message, uniqueId);
    }
}

/**
 * Calculate the days between two dates
 *
 * @param {Date} datetime1 The first / early date to be calculated
 * @param {Date} datetime2 The second / later date to be calculated
 */
export function calculateDaysBetween(datetime1: Date, datetime2: Date): number {
    // The number of milliseconds in one day
    const oneDay = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1Ms = datetime1.getTime();
    const date2Ms = datetime2.getTime();

    // Calculate the difference in milliseconds
    let differenceMs = Math.abs(date1Ms - date2Ms); // Convert back to days and return
    return Math.round(differenceMs / oneDay);
}

/**
 * Disable all controls in a tab by tab number.
 *
 * @param {number} tabControlNo The number of the tab
 */
export function disableAllControlsInTab(tabControlNo: number): void {
    const tabControl = Xrm.Page.ui.tabs.get(tabControlNo);
    if (tabControl != null) {
        Xrm.Page.ui.controls.forEach(
            (control) => {
                if (control.getParent() !== null &&
                    control.getParent().getParent() != null &&
                    control.getParent().getParent() === tabControl &&
                    control.getControlType() !== "subgrid") {
                    control.setDisabled(true);
                }
            }
        );
    }
}

/**
 * Disable all controls in a section by section label.
 *
 * @param {string} sectionLabel The label of the section
 */
export function disableAllControlsInSection (sectionLabel: string): void {
    const tabs = Xrm.Page.ui.tabs;
    for (let i = 0, tablength = tabs.getLength(); i < tablength; i++) {
        let tab = tabs.get(i);
        let sections = tab.sections;
        for (let j = 0, sectionlength = sections.getLength(); j < sectionlength; j++) {
            let section = sections.get(j);
            if (section.getLabel().toLowerCase() === sectionLabel.toLowerCase()) {
                Xrm.Page.ui.controls.forEach(
                    (control) => {
                        if (control.getParent() !== null &&
                            control.getParent().getLabel() === sectionLabel &&
                            control.getControlType() !== "subgrid") {
                            control.setDisabled(true);
                        }
                    }
                );
                break;
            }
        }
    }
}

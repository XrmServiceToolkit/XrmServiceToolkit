/// <reference path="../typings/main.d.ts" />
import Soap from "./Soap";
import {alertMessage} from "./Helper";

export default class Common {

    /**
     * Enable a field by the name
     * 
     * @param {string} fieldName The name of the field to be enabled
     */
    EnableField(fieldName: string): void {
        Xrm.Page.getControl(fieldName).setDisabled(false);
    }

    /**
     * Disable a field by the name
     * 
     * @param {string} fieldName The name of the field to be disabled
     */
    DisableField(fieldName: string): void {
        Xrm.Page.getControl(fieldName).setDisabled(true);
    }

    /**
     * Show a field by the name
     * 
     * @param {string} fieldName The name of the field to be shown
     */
    ShowField(fieldName: string): void {
        Xrm.Page.getControl(fieldName).setVisible(true);
    }

    /**
     *Hide a field by the name
     * 
     * @param {string} fieldName The name of the field to be hidden
     */
    HideField(fieldName: string): void {
        Xrm.Page.getControl(fieldName).setVisible(false);
    }

    /**
     * Updates the requirement level of a field
     * 
     * @param {string} fieldName Name of the field
     * @param {string} levelName Name of the requirement level. [none, recommended, required] (Case Sensitive)
     */
    UpdateRequirementLevel(fieldName: string, levelName: string): void {
        Xrm.Page.getAttribute(fieldName).setRequiredLevel(levelName);
    }

    /**
     * Alert the error message if occurred
     * 
     * @param {Error} error Object of the JavaScript error
     */
    ShowError(error: Error): void {
        alertMessage(error.message);
    }

    /**
     * Gets the EntityTypeCode / ObjectTypeCode of a entity
     * 
     * @param {string} entityName Name of entity to return object type code of
     * @returns {number} Entity typecode
     */
    GetObjectTypeCode(entityName: string): number {
        try {
            let entityMetaData = Soap.RetrieveEntityMetadata("Entity", entityName, false);
            if (entityMetaData && entityMetaData.length === 1) {
                return entityMetaData[0].ObjectTypeCode;
            } else {
                return null;
            }
        } catch (e) {
            this.ShowError(e.message);
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
    AddNotification(message: string, level: number, uniqueId: string): void {
        if (Xrm.Page.ui.setFormNotification !== undefined) {
            // CRM 2013
            if (!!uniqueId) {
                Xrm.Page.ui.clearFormNotification(uniqueId);
                if (level === 1) {
                    // Error
                    Xrm.Page.ui.setFormNotification(message, "ERROR", uniqueId);
                }
                if (level === 2) {
                    // Info
                    Xrm.Page.ui.setFormNotification(message, "INFO", uniqueId);
                }
                if (level === 3) {
                    // Warning
                    Xrm.Page.ui.setFormNotification(message, "WARNING", uniqueId);
                }
            } else {
                let tempUniqueId = "formNotification00";
                Xrm.Page.ui.clearFormNotification(tempUniqueId);
                if (level === 1) {
                    // Error
                    Xrm.Page.ui.setFormNotification(message, "ERROR", tempUniqueId);
                }
                if (level === 2) {
                    // Info
                    Xrm.Page.ui.setFormNotification(message, "INFO", tempUniqueId);
                }
                if (level === 3) {
                    // Warning
                    Xrm.Page.ui.setFormNotification(message, "WARNING", tempUniqueId);
                }
            }
        } else {
            let notificationsArea = document.getElementById("crmNotifications");
            if (notificationsArea === null || notificationsArea === undefined) {
                alertMessage("Cannot find the notification area");
                return;
            }
            if (typeof (<any>notificationsArea).AddNotification !== "undefined" && typeof (<any>notificationsArea).control.AddNotification !== "undefined") {
                alertMessage("Add Notification is no longer supported");
                return;
            }
            if (level === 1) {
                // critical
                if (typeof (<any>notificationsArea).AddNotification !== "undefined") {
                    (<any>notificationsArea).AddNotification("mep1", 1, "source", message);
                } else if (typeof (<any>notificationsArea).control.AddNotification !== "undefined") {
                    (<any>notificationsArea).control.AddNotification("mep1", 1, "source", message);
                }
            }

            if (level === 2) {
                // Info
                if (typeof (<any>notificationsArea).AddNotification !== "undefined") {
                    (<any>notificationsArea).AddNotification("mep3", 3, "source", message);
                } else if (typeof (<any>notificationsArea).control.AddNotification !== "undefined") {
                    (<any>notificationsArea).control.AddNotification("mep3", 3, "source", message);
                }
            }
            if (level === 3) {
                // Warning
                if (typeof (<any>notificationsArea).AddNotification !== "undefined") {
                    (<any>notificationsArea).AddNotification("mep2", 2, "source", message);
                } else if (typeof (<any>notificationsArea).control.AddNotification !== "undefined") {
                    (<any>notificationsArea).control.AddNotification("mep2", 2, "source", message);
                }
            }
            if (message === "") {
                if (typeof (<any>notificationsArea).SetNotifications !== "undefined") {
                    (<any>notificationsArea).SetNotifications(null, null);
                } else if (typeof (<any>notificationsArea).control.SetNotifications !== "undefined") {
                    (<any>notificationsArea).control.SetNotifications(null, null);
                } else {
                    alertMessage("Set Notification is no longer supported");
                }
            }
        }
    }

    /**
     * Add control notification
     * 
     * @param {string} attributeName Name of the attribute for the notification
     * @param {string} message Text of the notification
     */
    AddControlNotification(attributeName: string, message: string): void {
        if (Xrm.Page.getControl(attributeName).setNotification !== undefined) {
            Xrm.Page.getControl(attributeName).setNotification(message, attributeName + "controlNotification00");
        }
    }

    /**
     * Calculate the days between two dates
     * 
     * @param {Date} datetime1 The first / early date to be calculated
     * @param {Date} datetime2 The second / later date to be calculated
     * @returns {number} Difference between the dates
     */
    CalculateDaysBetween(datetime1: Date, datetime2: Date): number {
        // The number of milliseconds in one day
        let oneDay = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        let date1Ms = datetime1.getTime();
        let date2Ms = datetime2.getTime();

        // Calculate the difference in milliseconds
        let differenceMs = Math.abs(date1Ms - date2Ms); // Convert back to days and return
        return Math.round(differenceMs / oneDay);
    };

    /**
     * Disable all controls in a tab by tab number.
     * 
     * @param {number} tabControlNo The number of the tab
     */
    DisableAllControlsInTab(tabControlNo: number): void {
        let tabControl = Xrm.Page.ui.tabs.get(tabControlNo);
        if (tabControl != null) {
            Xrm.Page.ui.controls.forEach(
             (control) => {
                 if (control.getParent() !== null && control.getParent().getParent() != null && control.getParent().getParent() === tabControl && control.getControlType() !== "subgrid") {
                     control.setDisabled(true);
                 }
             });
        }
    };

    /**
     * Disable all controls in a section by section label.
     * 
     * @param {string} sectionLabel The label of the section
     */
    DisableAllControlsInSection(sectionLabel: string): void {
        let tabs = Xrm.Page.ui.tabs;
        for (let i = 0, tablength = tabs.getLength() ; i < tablength; i++) {
            let tab = tabs.get(i);
            let sections = tab.sections;
            for (let j = 0, sectionlength = sections.getLength() ; j < sectionlength; j++) {
                let section = sections.get(j);
                if (section.getLabel().toLowerCase() === sectionLabel.toLowerCase()) {
                    Xrm.Page.ui.controls.forEach(
                        (control) => {
                            if (control.getParent() !== null && control.getParent().getLabel() === sectionLabel && control.getControlType() !== "subgrid") {
                                control.setDisabled(true);
                            }
                        });
                    break;
                }
            }
        }
    }
}

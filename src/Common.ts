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
export function showError (error: Error): void {
    alertMessage(error.message);
}

/**
 * Gets the EntityTypeCode / ObjectTypeCode of a entity
 *
 * @param {string} entityName Name of entity to return object type code of
 */
export function getObjectTypeCode (entityName: string): number {
        try {
            var entityMetaData = XrmServiceToolkit.Soap.RetrieveEntityMetadata("Entity", entityName, false);
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
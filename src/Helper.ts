/**
 * Prompt an alert message
 *
 * @param {string} message Alert message text
 */
export function alertMessage(message: string): void{
    (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? (<any>Xrm).Utility.alertDialog(message) : alert(message);
}

/**
 * Check if two guids are equal
 *
 * @export
 * @param {string} guid1 A string represents a guid
 * @param {string} guid2 A string represents a guid
 * @returns {boolean}
 */
export function guidsAreEqual(guid1: string, guid2: string): boolean{
    let isEqual: boolean;
    if (guid1 === null || guid2 === null || guid1 === undefined || guid2 === undefined) {
        isEqual = false;
    } else {
        isEqual = guid1.replace(/[{}]/g, "").toLowerCase() === guid2.replace(/[{}]/g, "").toLowerCase();
    }

    return isEqual;
}

/**
 * Private function to the context object.
 *
 * @export
 * @returns {Xrm.Context}
 */
export function context(): Xrm.Context {
    let oContext: Xrm.Context;
    if (typeof window.GetGlobalContext !== "undefined") {
        oContext = window.GetGlobalContext();
    } else if (typeof GetGlobalContext !== "undefined") {
        oContext = GetGlobalContext();
    } else {
        if (typeof Xrm !== "undefined") {
            oContext = Xrm.Page.context;
        } else if (typeof window.parent.Xrm !== "undefined") {
            oContext = window.parent.Xrm.Page.context;
        } else {
            throw new Error("Context is not available.");
        }
    }
    return oContext;
}

 /**
  * Private function to return the server URL from the context
  *
  * @export
  * @returns {string} Url of the organization
  */
 export function getClientUrl() {
    let serverUrl = typeof context().getClientUrl !== "undefined" ? context().getClientUrl() : (<any>context()).getServerUrl();
    if (serverUrl.match(/\/$/)) {
        serverUrl = serverUrl.substring(0, serverUrl.length - 1);
    }
    return serverUrl;
}

export function htmlEncode(s: string): string {
    let buffer: string = "";
    let hEncode: string = "";
    if (s === null || s === "" || s === undefined) return s;
    for (let count = 0, cnt = 0, slength = s.length; cnt < slength; cnt++) {
        let c = s.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95){
            buffer += String.fromCharCode(c);
        } else {
            buffer += "&#" + c + ";";
        }
        if (++count === 500) {
            hEncode += buffer; buffer = ""; count = 0;
        }
    }
    if (buffer.length) hEncode += buffer;
    return hEncode;
 }

export function innerSurrogateAmpersandWorkaround(s: string): string {
    let buffer: string = "";
    let c0: number;
    let cnt: number = 0;
    let slength: number = s.length;
    for ( ; cnt < slength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343) {
            if (cnt + 1 < s.length) {
                let c1 = s.charCodeAt(cnt + 1);
                if (c1 >= 56320 && c1 <= 57343) {
                    buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++;
                } else {
                    buffer += String.fromCharCode(c0);
                }
            } else {
                buffer += String.fromCharCode(c0);
            }
        } else {
            buffer += String.fromCharCode(c0);
        }
    }
    s = buffer;
    buffer = "";
    for (cnt = 0, slength = s.length; cnt < slength; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343){
            buffer += String.fromCharCode(65533);
        } else {
            buffer += String.fromCharCode(c0);
        }
    }
    s = buffer;
    s = htmlEncode(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s;
}

export function crmXmlEncode(s: string): string {
    if ("undefined" === typeof s || "unknown" === typeof s || null === s){
         return s;
    } else if (typeof s !== "string") {
         s = s.toString();
        }
    return innerSurrogateAmpersandWorkaround(s);
}

export function crmXmlDecode(s: string): string {
    if (typeof s !== "string") {
        s = s.toString();
    }
    return s;
}
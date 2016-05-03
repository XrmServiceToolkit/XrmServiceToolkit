/// <reference path="../typings/main.d.ts" />

import {crmXmlEncode, alertMessage, getClientUrl} from "./Helper";

export function padNumber(s: number, len?: number): string {
    len = len || 2;

    let str = s.toString();
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

export function encodeDate(dateTime: Date): string {
    return dateTime.getFullYear() + "-" +
        padNumber(dateTime.getMonth() + 1) + "-" +
        padNumber(dateTime.getDate()) + "T" +
        padNumber(dateTime.getHours()) + ":" +
        padNumber(dateTime.getMinutes()) + ":" +
        padNumber(dateTime.getSeconds());
}

function isGuid(guidString: string): boolean{
    if( typeof guidString === "string" && guidString.test(/^\{?[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\}?$/i)){
        return true;
    } else {
        return false;
    }
}

export function encodeValue(value: any): any {
    // Handle GUIDs wrapped in braces
    if (isGuid(value)) {
        value = value.replace(/[{}]/gi, "");
    }

    // ReSharper disable QualifiedExpressionMaybeNull
    return (typeof value === "object" && value.getTime)
    // ReSharper restore QualifiedExpressionMaybeNull
            ? encodeDate(value)
            : crmXmlEncode(value);
}

export class xrmValue {
    type: string;
    value: string;

    constructor(sType?: string, sValue?: any){
        this.type = sType;
        this.value = sValue;
    }
}

export class xrmEntityReference {
    id: string;
    logicalName: string;
    name: string;
    type: string;

    constructor(gId?: string, sLogicalName?: string, sName?: string){
        this.id = gId;
        this.logicalName = sLogicalName;
        this.name = sName;
        this.type = 'EntityReference';
    }
}

export class xrmEntityCollection {
    value: Array<any>;
    type: string;

    constructor(items?: Array<any>) {
        this.value = items;
        this.type = 'EntityCollection';
    }
}

export class xrmOptionSetValue {
    value: number;
    formattedValue: string;
    type: string;

    constructor(iValue?: number, sFormattedValue?: string ){
        this.value = iValue;
        this.formattedValue = sFormattedValue;
        this.type = "OptionSetValue";
    }
}

/**
 * A object represents a business entity for CRM 2011
 *
 * @export
 * @param {string} logicalName A String represents the name of the entity.
 * For example, "contact" means the business entity will be a contact entity
 * @param {string} id A String represents the id of the entity. If not passed, it will be auto populated as a empty guid string
 */
export class businessEntity {
    id: string;
    logicalName:string;
    attributes: any;

    constructor(logicalName?: string, id?: string){
        this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
        this.logicalName = logicalName;
        this.attributes = Object.create(null);
    }

    /**
    * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
    * @return {String} The serialized XML string of CRM entity.
    */
    serialize() {
        let xml: Array<string> = ["<b:value i:type='a:Entity'>"];
        xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
        let attributes = this.attributes;
        for (let attributeName in attributes) {
            if (attributes.hasOwnProperty(attributeName)) {
                let attribute = attributes[attributeName];

                xml.push("<a:KeyValuePairOfstringanyType>");
                xml.push("<b:key>", attributeName, "</b:key>");

                if (attribute === null || attribute.value === null) {
                    xml.push("<b:value i:nil='true' />");
                } else {
                    let sType = (!attribute.type)
                        ? typeof attribute
                        : crmXmlEncode(attribute.type);
                    let value: any;
                    let encodedValue: any;
                    let id: string;
                    let encodedId: string;
                    let logicalName: string;
                    let encodedLogicalName: string;
                    switch (sType) {
                    case "OptionSetValue":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push("<b:value i:type='a:OptionSetValue'>");
                        xml.push("<a:Value>", <string>encodedValue, "</a:Value>", "</b:value>");
                        break;

                    case "EntityCollection":
                        xml.push("<b:value i:type='a:EntityCollection'>");
                        xml.push("<a:Entities>");
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        let collections: any = isArray(value) ? value : [value];

                        for (let i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
                            let item = collections[i];
                            id = (item.hasOwnProperty("id")) ? item["id"] : item;
                            encodedId = encodeValue(id);
                            logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                            encodedLogicalName = encodeValue(logicalName);
                            xml.push("<a:Entity>");
                            xml.push("<a:Attributes>");
                            xml.push("<a:KeyValuePairOfstringanyType>");
                            xml.push("<b:key>partyid</b:key>");
                            xml.push("<b:value i:type='a:EntityReference'>");
                            xml.push("<a:Id>", encodedId, "</a:Id>");
                            if (Xrm.Utility.openQuickCreate !== undefined) {
                                xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
                            }
                            xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                            xml.push("<a:Name i:nil='true' />");
                            if (Xrm.Utility.openQuickCreate !== undefined) {
                                xml.push("<a:RowVersion i:nil='true' />");
                            }
                            xml.push("</b:value>");
                            xml.push("</a:KeyValuePairOfstringanyType>");
                            xml.push("</a:Attributes>");
                            xml.push("<a:EntityState i:nil='true' />");
                            xml.push("<a:FormattedValues />");
                            xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>");
                            xml.push("<a:LogicalName>activityparty</a:LogicalName>");
                            xml.push("<a:RelatedEntities />");
                            xml.push("</a:Entity>");
                        }
                        xml.push("</a:Entities>");
                        xml.push("<a:EntityName i:nil='true' />");
                        xml.push("<a:MinActiveRowVersion i:nil='true' />");
                        xml.push("<a:MoreRecords>false</a:MoreRecords>");
                        xml.push("<a:PagingCookie i:nil='true' />");
                        xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>");
                        xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>");
                        xml.push("</b:value>");
                        break;

                    case "EntityReference":
                        id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                        encodedId = encodeValue(id);
                        logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                        encodedLogicalName = encodeValue(logicalName);
                        xml.push("<b:value i:type='a:EntityReference'>");
                        xml.push("<a:Id>", encodedId, "</a:Id>");
                        if (Xrm.Utility.openQuickCreate !== undefined) {
                            xml.push("<a:KeyAttributes xmlns:c='http://schemas.microsoft.com/xrm/7.1/Contracts' />");
                        }
                        xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                        xml.push("<a:Name i:nil='true' />");
                        if (Xrm.Utility.openQuickCreate !== undefined) {
                            xml.push("<a:RowVersion i:nil='true' />");
                        }
                        xml.push("</b:value>");
                        break;

                    case "Money":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push("<b:value i:type='a:Money'>");
                        xml.push("<a:Value>", <string>encodedValue, "</a:Value>", "</b:value>");
                        break;

                    case "guid":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
                        xml.push(<string>encodedValue, "</b:value>");
                        break;

                    case "number":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        let oType: string = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:decimal";
                        xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                        xml.push(<string>encodedValue, '</b:value>');
                        break;

                    default:
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                        xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", <string>encodedValue, "</b:value>");
                        break;
                    }
                }
                xml.push("</a:KeyValuePairOfstringanyType>");
            }
        }

        xml.push("</a:Attributes><a:EntityState i:nil='true' />");
        xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
        xml.push("<a:Id>", encodeValue(this.id), "</a:Id>");
        xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>");
        xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
        xml.push("</b:value>");
        return xml.join("");
    }

    /**
    * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
    * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
    */
    deserialize(resultNode: Node) {
        let obj = Object.create(null);
        let resultNodes: NodeList = resultNode.childNodes;

        for (let j = 0, lenj = resultNodes.length; j < lenj; j++) {
            let sKey: string;
            let parentNode: Node = resultNodes[j];
            switch (parentNode.nodeName) {
                case "a:Attributes":
                    let attr: Node = parentNode;
                    for (let k: number = 0, lenk: number = attr.childNodes.length; k < lenk; k++) {
                        let tempParentNode: Node = attr.childNodes[k];
                        // Establish the Key for the Attribute
                        let tempParentNodeChildNodes: NodeList = tempParentNode.childNodes;
                        sKey = getNodeText(tempParentNodeChildNodes[0]);

                        let tempNode: Node = tempParentNodeChildNodes[1];
                        // Determine the Type of Attribute value we should expect
                        let sType = tempNode.attributes.getNamedItem("i:type").value;

                        // check for AliasedValue
                        if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
                            // reset the type to the actual attribute type
                            let subNode: Node = tempNode.childNodes[2];
                            sType = subNode.attributes.getNamedItem("i:type").value;

                            //sKey = getNodeText(tempNode.childNodes[1]) + "." + getNodeText(tempNode.childNodes[0]);
                            // reset the node to the AliasedValue value node
                            tempNode = subNode;
                        }

                        let entRef: any;
                        let entCv: any;
                        switch (sType) {
                            case "a:OptionSetValue":
                                let entOsv: xrmOptionSetValue = new xrmOptionSetValue();
                                entOsv.type = sType.replace('a:', '');
                                entOsv.value = parseInt(getNodeText(tempNode));
                                obj[sKey] = entOsv;
                                break;

                            case "a:EntityReference":
                                entRef = new xrmEntityReference();
                                entRef.type = sType.replace('a:', '');
                                let oChildNodes = tempNode.childNodes;
                                for (let i = 0, leni = oChildNodes.length; i < leni; i++) {
                                    let entityReferenceNode = oChildNodes[i];

                                    switch (entityReferenceNode.nodeName) {
                                        case "a:Id":
                                            entRef.id = getNodeText(entityReferenceNode);
                                            break;
                                        case "a:LogicalName":
                                            entRef.logicalName = getNodeText(entityReferenceNode);
                                            break;
                                        case "a:Name":
                                            entRef.name = getNodeText(entityReferenceNode);
                                            break;
                                    }
                                }
                                obj[sKey] = entRef;
                                break;

                            case "a:EntityCollection":
                                entRef = new xrmEntityCollection();
                                entRef.type = sType.replace('a:', '');

                                //get all party items....
                                let items: Array<xrmEntityReference> = [];
                                let partyNodes = tempNode.childNodes;
                                for (let y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
                                    let itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                    for (let z = 0, lenz = itemNodes.length; z < lenz; z++) {
                                        let itemNodeChildNodes = itemNodes[z].childNodes;
                                        let nodeText = getNodeText(itemNodeChildNodes[0]);
                                        if (nodeText === "partyid") {
                                            let itemRef = new xrmEntityReference();
                                            let partyListNodes = itemNodeChildNodes[1].childNodes;
                                            for (let pi = 0, lenpi = partyListNodes.length; pi < lenpi; pi++) {
                                                let partyReferenceNode = partyListNodes[i];

                                                switch (partyReferenceNode.nodeName) {
                                                    case "a:Id":
                                                        itemRef.id = getNodeText(partyReferenceNode);
                                                        break;
                                                    case "a:LogicalName":
                                                        itemRef.logicalName = getNodeText(partyReferenceNode);
                                                        break;
                                                    case "a:Name":
                                                        itemRef.name = getNodeText(partyReferenceNode);
                                                        break;
                                                }
                                            }
                                            items[y] = itemRef;
                                        }
                                    }
                                }
                                entRef.value = items;
                                obj[sKey] = entRef;
                                break;

                            case "a:Money":
                                entCv = new xrmValue();
                                entCv.type = sType.replace('a:', '');
                                entCv.value = parseFloat(getNodeText(tempNode));
                                obj[sKey] = entCv;
                                break;

                            default:
                                entCv = new xrmValue();
                                entCv.type = sType.replace('c:', '').replace('a:', '');
                                if (entCv.type === "int") {
                                    entCv.value = parseInt(getNodeText(tempNode));
                                }
                                else if (entCv.type === "decimal" || entCv.type === "double") {
                                    entCv.value = parseFloat(getNodeText(tempNode));
                                }
                                else if (entCv.type === "dateTime") {
                                    entCv.value = stringToDate(getNodeText(tempNode));
                                }
                                else if (entCv.type === "boolean") {
                                    entCv.value = (getNodeText(tempNode) === 'false') ? false : true;
                                }
                                else {
                                    entCv.value = getNodeText(tempNode);
                                }
                                obj[sKey] = entCv;
                                break;
                        }
                    }
                    this.attributes = obj;
                    break;

                case "a:Id":
                    this.id = getNodeText(parentNode);
                    break;

                case "a:LogicalName":
                    this.logicalName = getNodeText(parentNode);
                    break;

                case "a:FormattedValues":
                    let foVal = parentNode;

                    for (let o = 0, leno = foVal.childNodes.length; o < leno; o++) {
                        // Establish the Key, we are going to fill in the formatted value of the already found attribute
                        let foNode = foVal.childNodes[o];
                        sKey = getNodeText(foNode.childNodes[0]);
                        this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]);
                        if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
                            this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
                        }
                    }
                    break;
            }
        }
    }
}

export function stringToDate(s: string): Date {
    let b = s.split(/\D/);
    return new Date(Date.UTC(Number(b[0]), Number(b[1]) - 1, Number(b[2]), Number(b[3]), Number(b[4]), Number(b[5])));
}

export function nsResolver(prefix: string): string {
    const ns = new Map([
        ["s", "http://schemas.xmlsoap.org/soap/envelope/"],
        ["a", "http://schemas.microsoft.com/xrm/2011/Contracts"],
        ["i", "http://www.w3.org/2001/XMLSchema-instance"],
        ["b", "http://schemas.datacontract.org/2004/07/System.Collections.Generic"],
        ["c", "http://schemas.microsoft.com/xrm/2011/Metadata"],
        ["ser", "http://schemas.microsoft.com/xrm/2011/Contracts/Services"]
    ]);

    return ns.get(prefix) || null;
};

export function isNodeNull(node: Node): boolean {
    if (node == null){
        return true;
    }

    if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true")){
        return true;
    }

    return false;
}

export function selectNodes(node: any, xPathExpression: string): Array<string> {
    if (typeof (node.selectNodes) != "undefined") {
        return node.selectNodes(xPathExpression);
    } else {
        let output: Array<string> = [];
        let xPathResults = node.evaluate(xPathExpression, node, nsResolver, XPathResult.ANY_TYPE, null);
        let result = xPathResults.iterateNext();
        while (result) {
            output.push(result);
            result = xPathResults.iterateNext();
        }
        return output;
    }
}

export function selectSingleNode(node: any, xpathExpr: string) {
    if (typeof (node.selectSingleNode) != "undefined") {
        return node.selectSingleNode(xpathExpr);
    } else {
        let xpe: XPathEvaluator = new XPathEvaluator();
        let results = xpe.evaluate(xpathExpr, node, <any>nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return results.singleNodeValue;
    }
};

export function selectSingleNodeText(node: any, xpathExpr: string): string {
    let x = selectSingleNode(node, xpathExpr);
    if (isNodeNull(x)) {
        return null;
    }
    if (typeof (x.text) != "undefined") {
        return x.text;
    } else {
        return x.textContent;
    }
}

export function getNodeText(node: any): string {
    if (typeof (node.text) != "undefined") {
        return node.text;
    } else {
        return node.textContent;
    }
}

export function setSelectionNamespaces(doc: any): void {
    const namespaces = [
        "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
        "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
        "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
        "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
        "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'",
        "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"
    ];

    doc.setProperty("SelectionNamespaces", namespaces.join(" "));
}

/**
 * cross browser responseXml to return a XML object
 *
 * @export
 * @param {string} txt Source xml string
 * @returns {XMLDocument} Parsed XML Document
 */
export function xmlParser(txt: string): XMLDocument {
    let xmlDoc: DOMParser | any = null;
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    } catch (e) {
        if (DOMParser) {
            // ReSharper disable InconsistentNaming
            let parser = new DOMParser();
            // ReSharper restore InconsistentNaming
            xmlDoc = parser.parseFromString(txt, "text/xml");
        } else {
            alertMessage("Cannot convert the XML string to a cross-browser XML object.");
        }
    }

    return xmlDoc;
}

export function xmlToString(responseXml: Node): string {
    var xmlString = "";
    try {
        if (responseXml != null) {
            if (typeof XMLSerializer !== "undefined" && typeof (<any>responseXml).xml === "undefined") {
                // ReSharper disable InconsistentNaming
                xmlString = (new XMLSerializer()).serializeToString(responseXml);
                // ReSharper restore InconsistentNaming
            } else {
                if (typeof (<any>responseXml).xml !== "undefined") {
                    xmlString = (<any>responseXml).xml;
                } else if (typeof (<any>responseXml)[0].xml !== "undefined") {
                    xmlString = (<any>responseXml)[0].xml;
                }
            }
        }
    } catch (e) {
        alertMessage("Cannot convert the XML to a string.");
    }
    return xmlString;
}

export function isArray (input: any): boolean {
    return input.constructor.toString().indexOf("Array") !== -1;
}

export function getError(async: boolean, resp: any, internalCallback?: Function): Error {
    //Error descriptions come from http://support.microsoft.com/kb/193625

    if (resp.status === 12029) {
        throw new Error("The attempt to connect to the server failed.");
    }

    if (resp.status === 12007) {
        throw new Error("The server name could not be resolved.");
    }

    let faultXml = resp.responseXML;

    let faultstring: string = null;
    let errorCode: string = null;

    let errorMessage = "Unknown (unable to parse the fault)";
    if (faultXml !== null && typeof faultXml == "object") {
        let bodyNode: Node = faultXml.firstChild.firstChild;

        //Retrieve the fault node
        for (let i = 0; i < bodyNode.childNodes.length; i++) {
            let node: Node = bodyNode.childNodes[i];

            //NOTE: This comparison does not handle the case where the XML namespace changes
            if ("s:Fault" === node.nodeName) {
                for (let j = 0; j < node.childNodes.length; j++) {
                    let testNode: Node = node.childNodes[j];
                    if ("faultstring" === testNode.nodeName) {
                        faultstring = getNodeText(testNode);
                    }
                    if ("detail" === testNode.nodeName) {
                        for (let k = 0; k < testNode.childNodes.length; k++) {
                            let orgServiceFault: Node = testNode.childNodes[k];
                            if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
                                for (let l = 0; l < orgServiceFault.childNodes.length; l++) {
                                    var errorCodeNode: Node = orgServiceFault.childNodes[l];
                                    if ("ErrorCode" === errorCodeNode.nodeName) {
                                        errorCode = getNodeText(errorCodeNode);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            }
        }
    }

    if (errorCode != null && faultstring != null) {
        errorMessage = "Error Code:" + errorCode + " Message: " + faultstring;
    } else {
        if (faultstring != null) {
            errorMessage = faultstring;
        }
    }

    if (async) {
        return new Error(errorMessage);
    } else {
        throw new Error(errorMessage);
    }
}

export function doRequest (soapBody: string, requestType: string, async?: boolean, internalCallback?: Function): void {
    async = async || false;

    // Wrap the Soap Body in a soap:Envelope.
    let soapXml =`
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <${requestType} xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">${soapBody}</${requestType}>
        </soap:Body>
    </soap:Envelope>
    `;

    let req = new XMLHttpRequest();
    req.open("POST", orgServicePath(), async);
    req.setRequestHeader("Accept", "application/xml, text/xml, */*");
    req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    req.setRequestHeader("SOAPAction", `http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/${requestType}`);

    //IE10
    try {
        req.responseType = 'msxml-document';
    } catch (e) {
    }

    if (async) {
        req.onreadystatechange = function () {
            if (req.readyState === 4 /* complete */) {
                req.onreadystatechange = null; //Addresses potential memory leak issue with IE
                if (req.status === 200) { // "OK"
                    let doc = req.responseXML;
                    try {
                        setSelectionNamespaces(doc);
                    } catch (e) {
                    }
                    internalCallback(doc);
                } else {
                    getError(true, req);
                }
            }
        };

        req.send(soapXml);
    } else {
        req.send(soapXml);
        if (req.status === 200) {
            let doc = req.responseXML;
            try {
                setSelectionNamespaces(doc);
            } catch (e) {
            }
            let result = doc;
            return !!internalCallback ? internalCallback(result) : result;
        } else {
            getError(false, req);
        }
    }
    // ReSharper disable NotAllPathsReturnValue
}
// ReSharper restore NotAllPathsReturnValue

/**
 * Private function to return the path to the organization service
 *
 * @returns {string}
 */
function orgServicePath(): string {
    return `${getClientUrl()}/XRMServices/2011/Organization.svc/web`;
}

export function fetchMore(fetchCoreXml: string, pageNumber: number, pageCookie: any, fetchResults: any): any {

    //Build new query
    let moreFetchXml = `
        <fetch mapping="logical" page="${pageNumber}" count="5000" paging-cookie="${pageCookie}">
            ${fetchCoreXml.replace(/\"/g, "'")}
        </fetch>
    `;

    let moreMsgBody = `
        <request i:type="a:RetrieveMultipleRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
            <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                <a:KeyValuePairOfstringanyType>
                    <b:key>Query</b:key>
                    <b:value i:type="a:FetchExpression">
                        <a:Query>${crmXmlEncode(moreFetchXml)}</a:Query>
                    </b:value>
                </a:KeyValuePairOfstringanyType>
            </a:Parameters>
            <a:RequestId i:nil="true"/>
            <a:RequestName>RetrieveMultiple</a:RequestName>
        </request>
    `;


    return doRequest(moreMsgBody, "Execute", false, (moreResultXml: string) => {
        let newFetchResult: Node = selectSingleNode(moreResultXml, "//a:Entities");
        let newMoreRecords: boolean = (selectSingleNodeText(moreResultXml, "//a:MoreRecords") === "true");

        for (let iii = 0, nLength = newFetchResult.childNodes.length; iii < nLength; iii++) {
            let entity = new businessEntity();

            entity.deserialize(newFetchResult.childNodes[iii]);
            fetchResults.push(entity);
        }

        if (newMoreRecords) {
            pageNumber += 1;
            let newPageCookie = selectSingleNodeText(moreResultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');

            fetchMore(fetchCoreXml, pageNumber, newPageCookie, fetchResults);
        } else {
            return fetchResults;
        }
    });
}

export function joinArray(prefix: string, array?: Array<any>, suffix?: string): string {
    let output: Array<any> = [];
    for (let i = 0, ilength = array.length; i < ilength; i++) {
        if (array[i] !== "" && array[i] != undefined) {
            output.push(prefix, array[i], suffix);
        }
    }
    return output.join("");
}

export function joinConditionPair(attributes: Array<any>, values: Array<any>): string {
    let output: Array<string> = [];
    for (let i = 0, ilength = attributes.length; i < ilength; i++) {
        if (attributes[i] !== "") {
            let value1 = values[i];
            if (typeof value1 == typeof []) {
                output.push("<condition attribute='", attributes[i], "' operator='in' >");

                for (let valueIndex in value1) {
                    if (value1.hasOwnProperty(valueIndex)) {
                        let value = encodeValue(value1[valueIndex]);
                        output.push("<value>" + value + "</value>");
                    }
                }
                output.push("</condition>");
            } else if (typeof value1 == typeof "") {
                output.push("<condition attribute='", attributes[i], "' operator='eq' value='", encodeValue(value1), "' />");
            }
        }
    }
    return output.join("");
}

// Added in 1.4.1 for metadata retrieval
// Inspired From Microsoft SDK code to retrieve Metadata using JavaScript
// Copyright (C) Microsoft Corporation.  All rights reserved.
let arrayElements = [
    "Attributes",
    "ManyToManyRelationships",
    "ManyToOneRelationships",
    "OneToManyRelationships",
    "Privileges",
    "LocalizedLabels",
    "Options",
    "Targets"
];

export function isMetadataArray(elementName: string): boolean {
    for (var i = 0, ilength = arrayElements.length; i < ilength; i++) {
        if (elementName === arrayElements[i]) {
            return true;
        }
    }
    return false;
}

export function getNodeName(node: any): string {
    if (typeof (node.baseName) !== "undefined") {
        return node.baseName;
    } else {
        return node.localName;
    }
}

export function objectifyNode(node: Node): any {
    //Check for null
    if (node.attributes != null && node.attributes.length === 1) {
        if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue === "true") {
            return null;
        }
    }

    //Check if it is a value
    if ((node.firstChild != null) && (node.firstChild.nodeType === 3)) {
        let nodeName: string = getNodeName(node);

        switch (nodeName) {
            //Integer Values
            case "ActivityTypeMask":
            case "ObjectTypeCode":
            case "ColumnNumber":
            case "DefaultFormValue":
            case "MaxValue":
            case "MinValue":
            case "MaxLength":
            case "Order":
            case "Precision":
            case "PrecisionSource":
            case "LanguageCode":
                return parseInt(node.firstChild.nodeValue, 10);
                // Boolean values
            case "AutoRouteToOwnerQueue":
            case "CanBeChanged":
            case "CanTriggerWorkflow":
            case "IsActivity":
            case "IsActivityParty":
            case "IsAvailableOffline":
            case "IsChildEntity":
            case "IsCustomEntity":
            case "IsCustomOptionSet":
            case "IsDocumentManagementEnabled":
            case "IsEnabledForCharts":
            case "IsGlobal":
            case "IsImportable":
            case "IsIntersect":
            case "IsManaged":
            case "IsReadingPaneEnabled":
            case "IsValidForAdvancedFind":
            case "CanBeSecuredForCreate":
            case "CanBeSecuredForRead":
            case "CanBeSecuredForUpdate":
            case "IsCustomAttribute":
            case "IsPrimaryId":
            case "IsPrimaryName":
            case "IsSecured":
            case "IsValidForCreate":
            case "IsValidForRead":
            case "IsValidForUpdate":
            case "IsCustomRelationship":
            case "CanBeBasic":
            case "CanBeDeep":
            case "CanBeGlobal":
            case "CanBeLocal":
                return (node.firstChild.nodeValue === "true") ? true : false;
                //OptionMetadata.Value and BooleanManagedProperty.Value and AttributeRequiredLevelManagedProperty.Value
            case "Value":
                //BooleanManagedProperty.Value
                if ((node.firstChild.nodeValue === "true") || (node.firstChild.nodeValue === "false")) {
                    return (node.firstChild.nodeValue === "true") ? true : false;
                }
                //AttributeRequiredLevelManagedProperty.Value
                if (
                        (node.firstChild.nodeValue === "ApplicationRequired") ||
                        (node.firstChild.nodeValue === "None") ||
                        (node.firstChild.nodeValue === "Recommended") ||
                        (node.firstChild.nodeValue === "SystemRequired")
                    ) {
                    return node.firstChild.nodeValue;
                } else {
                    //OptionMetadata.Value
                    return parseInt(node.firstChild.nodeValue, 10);
                }
                //String values
            default:
                return node.firstChild.nodeValue;
        }
    }

    //Check if it is a known array
    if (isMetadataArray(getNodeName(node))) {
        let arrayValue: Array<string> = [];
        for (let iii: number = 0, tempLength: number = node.childNodes.length; iii < tempLength; iii++) {
            let objectTypeName: string;
            if ((node.childNodes[iii].attributes != null) && (node.childNodes[iii].attributes.getNamedItem("i:type") != null)) {
                objectTypeName = node.childNodes[iii].attributes.getNamedItem("i:type").nodeValue.split(":")[1];
            } else {
                objectTypeName = getNodeName(node.childNodes[iii]);
            }

            let b = objectifyNode(node.childNodes[iii]);
            b._type = objectTypeName;
            arrayValue.push(b);

        }

        return arrayValue;
    }

    //Null entity description labels are returned as <label/> - not using i:nil = true;
    if (node.childNodes.length === 0) {
        return null;
    }

    //Otherwise return an object
    let c: any = {};
    if (node.attributes.getNamedItem("i:type") != null) {
        c._type = node.attributes.getNamedItem("i:type").nodeValue.split(":")[1];
    }
    
    for (let i: number = 0, ilength: number = node.childNodes.length; i < ilength; i++) {
        if (node.childNodes[i].nodeType === 3) {
            c[getNodeName(node.childNodes[i])] = node.childNodes[i].nodeValue;
        } else {
            c[getNodeName(node.childNodes[i])] = objectifyNode(node.childNodes[i]);
        }
    }
    return c;
}

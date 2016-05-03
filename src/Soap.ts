/// <reference path="../typings/main.d.ts" />
import {alertMessage, htmlEncode, innerSurrogateAmpersandWorkaround, crmXmlDecode, crmXmlEncode } from "./Helper";
import {xrmEntityReference, businessEntity, doRequest, xmlParser, xmlToString, selectSingleNodeText, selectSingleNode, getNodeText, selectNodes, fetchMore, isArray, encodeValue, joinArray, joinConditionPair, objectifyNode} from "./HelperSoap";

export default class Soap{

    /**
     * Sends synchronous/asynchronous request to create a new record
     *
     * @param {Object} be A JavaScript object with properties corresponding to the Schema name of
     * entity attributes that are valid for create operations.
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Create(be: businessEntity, callback?: Function): void | any {
        let request = be.serialize();
        let async = !!callback;
        let mBody = `
            <request i:type="a:CreateRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                <a:KeyValuePairOfstringanyType>
                    <b:key>Target</b:key>
                    ${request}
                </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Create</a:RequestName>
            </request>
        `;

        return doRequest(mBody, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//b:value");
            let result = crmXmlDecode(responseText);

            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to update an existing record
     *
     * @param {businessEntity} be A JavaScript object with properties corresponding to the Schema name of
     * entity attributes that are valid for update operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Update(be: businessEntity, callback?: Function): void | any {
        let request = be.serialize();
        let async = !!callback;
        let mBody = `
            <request i:type="a:UpdateRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Target</b:key>
                        ${request}
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Update</a:RequestName>
            </request>
        `;

        return doRequest(mBody, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//a:Results");
            let result = crmXmlDecode(responseText);

            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to delete a record
     *
     * @param {string} entityName A JavaScript String corresponding to the Schema name of
     * entity that is used for delete operations
     * @param {string} id A JavaScript String corresponding to the GUID of
     * entity that is used for delete operations
     * @param {Function} [callback] A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Delete(entityName: string, id: string, callback?: Function): void | any {
        let request =`
            <request i:type="a:DeleteRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Target</b:key>
                        <b:value i:type="a:EntityReference">
                            <a:Id>"
                                ${id}
                            </a:Id>
                            <a:LogicalName>
                                ${entityName}
                            </a:LogicalName>
                            <a:Name i:nil="true" />
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Delete</a:RequestName>
            </request>
        `;
        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//a:Results");
            let result = crmXmlDecode(responseText);

            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to execute a soap request
     *
     * @param {string} request A JavaScript string corresponding to the soap request
     * that are valid for execute operations
     * @param {Function} [callback] A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Execute(request: string, callback?: Function): void | any {
        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            if (!async){
                return resultXml;
            } else{
                callback(resultXml);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a fetch request)
     *
     * @param {string} fetchCore A JavaScript String containing serialized XML using the FetchXML schema.
     * For efficiency, start with the "entity" node
     * @param {boolean} fetchAll Switch to enable paging
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Fetch (fetchCore: string, fetchAll?: boolean, callback?: Function): void | any {
        let fetchXml = fetchCore;

        if (fetchCore.slice(0, 7) === "<entity") {
            fetchXml =`
                <fetch mapping="logical">
                    ${fetchCore.replace(/\"/g, "'")}
                </fetch>
            `;
        } else {
            let isAggregate = (fetchCore.indexOf("aggregate=") !== -1);
            let isLimitedReturn = (fetchCore.indexOf("page='1'") !== -1 && fetchCore.indexOf("count='") !== -1);

            let distinctPos = fetchCore.indexOf("distinct=");
            let isDistinct = (distinctPos !== -1);
            let valQuotes = fetchCore.substring(distinctPos + 9, distinctPos + 10);
            let distinctValue = isDistinct
                ? fetchCore.substring(fetchCore.indexOf("distinct=") + 10, fetchCore.indexOf(valQuotes, fetchCore.indexOf("distinct=") + 10))
                : "false";
            let xmlDoc = xmlParser(fetchCore);
            let fetchEntity = selectSingleNode(xmlDoc, "//entity");
            if (fetchEntity === null) {
                throw new Error("XrmServiceToolkit.Fetch: No 'entity' node in the provided FetchXML.");
            }
            let fetchCoreDom = fetchEntity;
            try {
                fetchCore = xmlToString(fetchCoreDom).replace(/\"/g, "'");
            } catch (error) {
                if (fetchCoreDom !== undefined && fetchCoreDom.xml) {
                    fetchCore = fetchCoreDom.xml.replace(/\"/g, "'");
                } else {
                    throw new Error("XrmServiceToolkit.Fetch: This client does not provide the necessary XML features to continue.");
                }
            }

            if (!isAggregate && !isLimitedReturn) {
                fetchXml = `
                    <fetch mapping="logical" distinct="${(isDistinct ? distinctValue : "false")}"'" >
                        ${fetchCore}
                    </fetch>
                `;
            }
        }

        let request = `
            <request i:type="a:RetrieveMultipleRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Query</b:key>
                        <b:value i:type="a:FetchExpression">
                            <a:Query>${crmXmlEncode(fetchXml)}</a:Query>
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true"/>
                <a:RequestName>RetrieveMultiple</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let fetchResult: Node = selectSingleNode(resultXml, "//a:Entities");
            let moreRecords: boolean = (selectSingleNodeText(resultXml, "//a:MoreRecords") === "true");

            let fetchResults: Array<any> = [];
            if (fetchResult != null) {
                for (let ii: number = 0, olength = fetchResult.childNodes.length; ii < olength; ii++) {
                    let entity: businessEntity = new businessEntity();

                    entity.deserialize(fetchResult.childNodes[ii]);
                    fetchResults.push(entity);
                }

                if (fetchAll && moreRecords) {
                    let pageCookie = selectSingleNodeText(resultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');

                    fetchMore(fetchCore, 2, pageCookie, fetchResults);
                }

                if (!async){
                    return fetchResults;
                } else{
                    callback(fetchResults);
                }
            }
            // ReSharper disable once NotAllPathsReturnValue
        });
    }

    /**
     * Sends synchronous/asynchronous request to retrieve a record
     *
     * @param {string} entityName A JavaScript String corresponding to the Schema name of
     * entity that is used for retrieve operations
     * @param {string} id A JavaScript String corresponding to the GUID of
     * entity that is used for retrieve operations
     * @param {Array} columnSet  A JavaScript Array corresponding to the attributes of
     * entity that is used for retrieve operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Retrieve(entityName: string, id: string, columnSet: Array<any>, callback: Function): void | any {
        let attributes = "";
        // ReSharper disable AssignedValueIsNeverUsed
        let query = "";
        // ReSharper restore AssignedValueIsNeverUsed
        if (columnSet != null) {
            for (let i = 0, ilength = columnSet.length; i < ilength; i++) {
                attributes += "<c:string>" + columnSet[i] + "</c:string>";
            }
            query = "<a:AllColumns>false</a:AllColumns>" +
                    "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                        attributes +
                    "</a:Columns>";
        }
        else {
            query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
        }

        let msgBody = `
            <request i:type="a:RetrieveRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Target</b:key>
                        <b:value i:type="a:EntityReference">
                            <a:Id>${encodeValue(id)}</a:Id>
                            <a:LogicalName>${entityName}</a:LogicalName>
                            <a:Name i:nil="true" />
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>ColumnSet</b:key>
                        <b:value i:type="a:ColumnSet">
                            ${query}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Retrieve</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(msgBody, "Execute", !!callback, (resultXml: string) => {
            let retrieveResult: Node = selectSingleNode(resultXml, "//b:value");
            let entity: businessEntity = new businessEntity();
            entity.deserialize(retrieveResult);

            if (!async){
                return entity;
            } else {
                callback(entity);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a retrieveMultiple request
     *
     * @param {string} query A JavaScript String with properties corresponding to the retrievemultiple request
     * that are valid for retrievemultiple operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static RetrieveMultiple(query: string, callback: Function): void | any {
        let request = `
            <request i:type="a:RetrieveMultipleRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Query</b:key>
                        <b:value i:type="a:QueryExpression">
                            ${query}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true"/>
                <a:RequestName>RetrieveMultiple</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let resultNodes: Node = selectSingleNode(resultXml, "//a:Entities");

            let retriveMultipleResults: Array<businessEntity> = [];

            for (let i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
                let entity = new businessEntity();

                entity.deserialize(resultNodes.childNodes[i]);
                retriveMultipleResults[i] = entity;
            }

            if (!async){
                return retriveMultipleResults;
            } else{
                callback(retriveMultipleResults);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a queryByAttribute request
     *
     * @static
     * @param {*} queryOptions A JavaScript Object with properties corresponding to the queryByAttribute Criteria
     * that are valid for queryByAttribute operations.
     * queryOptions.entityName is a string represents the name of the entity
     * queryOptions.attributes is a array represents the attributes of the entity to query
     * queryOptions.values is a array represents the values of the attributes to query
     * queryOptions.columnSet is a array represents the attributes of the entity to return
     * queryOptions.orderBy is a array represents the order conditions of the results
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static QueryByAttribute(queryOptions: any, callback: Function): void {
        let entityName: string = queryOptions.entityName;
        let attributes: any = queryOptions.attributes;
        let values: any = queryOptions.values;
        let columnSet: any = queryOptions.columnSet;
        let orderBy = queryOptions.orderBy || "";

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        let xml =`
            <entity name="${entityName}">
                    ${joinArray("<attribute name='", columnSet, "' />")}
                    ${joinArray("<order attribute='", orderBy, "' />")}
                <filter>
                    ${joinConditionPair(attributes, values)}
                </filter>
            </entity>
        `;

        return this.Fetch(xml, false, callback);
    };

    /**
     * Sends synchronous/asynchronous request to do a queryAll request. This is to return all records (>5k+).
     * Consider Performance impact when using this method.
     *
     * @static
     * @param {*} queryOptions A JavaScript Object with properties corresponding to the queryByAttribute Criteria
     * that are valid for queryByAttribute operations.
     * queryOptions.entityName is a string represents the name of the entity
     * queryOptions.attributes is a array represents the attributes of the entity to query
     * queryOptions.values is a array represents the values of the attributes to query
     * queryOptions.columnSet is a array represents the attributes of the entity to return
     * queryOptions.orderBy is a array represents the order conditions of the results
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static QueryAll(queryOptions: any, callback: Function): void {
        let entityName: string = queryOptions.entityName;
        let attributes: Array<any> = queryOptions.attributes;
        let values: any = queryOptions.values;
        let columnSet: Array<any> = queryOptions.columnSet;
        let orderBy: Array<any> = queryOptions.orderBy || '';

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        let fetchCore = `
            <entity name="${entityName}">
                    ${joinArray("<attribute name='", columnSet, "' />")}
                    ${joinArray("<order attribute='", orderBy, "' />")}
                <filter>
                        ${joinConditionPair(attributes, values)}
                </filter>
            </entity>
        `;

        return this.Fetch(fetchCore, true, callback);
    }

    /**
     * Sends synchronous/asynchronous request to setState of a record
     *
     * @static
     * @param {string} entityName A JavaScript String corresponding to the Schema name of
     * entity that is used for setState operations.
     * @param {string} id A JavaScript String corresponding to the GUID of
     * entity that is used for setState operations
     * @param {number} stateCode A JavaScript Integer corresponding to the value of
     * entity state that is used for setState operations
     * @param {number} statusCode A JavaScript Integer corresponding to the value of
     * entity status that is used for setState operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static SetState(entityName: string, id: string, stateCode: number, statusCode: number, callback: Function): void {
        let request = `
            <request i:type="b:SetStateRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <c:key>EntityMoniker</c:key>
                        <c:value i:type="a:EntityReference">
                            <a:Id>${encodeValue(id)}</a:Id>
                            <a:LogicalName>${entityName}</a:LogicalName>
                            <a:Name i:nil="true" />
                        </c:value>
                        </a:KeyValuePairOfstringanyType>
                        <a:KeyValuePairOfstringanyType>
                            <c:key>State</c:key>
                            <c:value i:type="a:OptionSetValue">
                             <a:Value>${stateCode.toString()}</a:Value>
                            </c:value>
                        </a:KeyValuePairOfstringanyType>
                        <a:KeyValuePairOfstringanyType>
                            <c:key>Status</c:key>
                            <c:value i:type="a:OptionSetValue">
                             <a:Value>${statusCode.toString()}</a:Value>
                            </c:value>
                        </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>SetState</a:RequestName>
            </request>
       `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result = crmXmlDecode(responseText);
            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to associate records
     *
     * @static
     * @param {string} relationshipName A JavaScript String corresponding to the relationship name
     * that is used for associate operations
     * @param {string} targetEntityName A JavaScript String corresponding to the relationship name
     * that is used for associate operations
     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
     * that is used for associate operations
     * @param {string} relatedEntityName A JavaScript String corresponding to the schema name of the related entity
     * that is used for associate operations
     * @param {Array<businessEntity>} relatedBusinessEntities A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
     * that is used for associate operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Associate(relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: Array<businessEntity>, callback: Function): void | any{
        let relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        let output: Array<string> = [];
        for (let i: number = 0, ilength: number = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        let relatedXml = output.join("");

        let request = `
            <request i:type="a:AssociateRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Target</b:key>
                        <b:value i:type="a:EntityReference">
                            <a:Id>${encodeValue(targetId)}</a:Id>
                            <a:LogicalName>${targetEntityName}</a:LogicalName>
                            <a:Name i:nil="true" />
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Relationship</b:key>
                        <b:value i:type="a:Relationship">
                            <a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>
                            <a:SchemaName>${relationshipName}</a:SchemaName>
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <b:key>RelatedEntities</b:key>
                    <b:value i:type="a:EntityReferenceCollection">
                        ${relatedXml}
                    </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Associate</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result = crmXmlDecode(responseText);
            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to disassociate records
     *
     * @static
     * @param {string} relationshipName A JavaScript String corresponding to the relationship name
     * that is used for associate operations
     * @param {string} targetEntityName A JavaScript String corresponding to the relationship name
     * that is used for associate operations
     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
     * that is used for associate operations
     * @param {string} relatedEntityName A JavaScript String corresponding to the schema name of the related entity
     * that is used for associate operations
     * @param {Array<businessEntity>} relatedBusinessEntities A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
     * that is used for associate operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     * @returns {(void | any)} If sync -> results
     */
    static Disassociate(relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: Array<businessEntity>, callback: Function): void | any {
        let relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        let output: Array<string> = [];
        for (let i = 0, ilength = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }
        let relatedXml = output.join("");
        let request = `
            <request i:type="a:DisassociateRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Target</b:key>
                        <b:value i:type="a:EntityReference">
                            <a:Id>${encodeValue(targetId)}</a:Id>
                            <a:LogicalName>${targetEntityName}</a:LogicalName>
                            <a:Name i:nil="true" />
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>Relationship</b:key>
                        <b:value i:type="a:Relationship">
                            <a:PrimaryEntityRole i:nil="true" />
                            <a:SchemaName>${relationshipName}</a:SchemaName>
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <b:key>RelatedEntities</b:key>
                    <b:value i:type="a:EntityReferenceCollection">
                        ${relatedXml}
                    </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Disassociate</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result = crmXmlDecode(responseText);
            if (!async) {
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous request to retrieve the GUID of the current user
     *
     * @static
     * @returns {string} (description)
     */
    static GetCurrentUserId (): string {
        let request = `
            <request i:type="b:WhoAmIRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />
                <a:RequestId i:nil="true" />
                <a:RequestName>WhoAmI</a:RequestName>
            </request>
        `;
        let xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[0]);
    }

    /**
     * Sends synchronous request to retrieve the GUID of the current user's business unit
     * 
     * @static
     * @returns {string}
     */
    static GetCurrentUserBusinessUnitId(): string {
        let request = `
            <request i:type="b:WhoAmIRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />
                <a:RequestId i:nil="true" />
                <a:RequestName>WhoAmI</a:RequestName>
            </request>
        `;
        let xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[1]);
    }

    /**
     * Sends synchronous request to retrieve the list of the current user's roles
     * 
     * @static
     * @returns {Array<string>} All roles of the current user
     */
    static GetCurrentUserRoles(): Array<string> {
        var xml = `
            <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">
                <entity name="role">
                <attribute name="name" />
                <attribute name="businessunitid" />
                <attribute name="roleid" />
                <order attribute="name" descending="false" /> +
                <link-entity name="systemuserroles" from="roleid" to="roleid" visible="false" intersect="true">
                    <link-entity name="systemuser" from="systemuserid" to="systemuserid" alias="aa">
                    <filter type="and">
                        <condition attribute="systemuserid" operator="eq-userid" />
                    </filter>
                    </link-entity>
                </link-entity>
                </entity>
            </fetch>
        `;

        let fetchResult = this.Fetch(xml);
        let roles: Array<string> = [];

        if (fetchResult !== null && typeof fetchResult != "undefined") {
            for (let i = 0, ilength = fetchResult.length; i < ilength; i++) {
                roles[i] = fetchResult[i].attributes["name"].value;
            }
        }

        return roles;
    }

    /**
     * Sends synchronous request to check if the current user has certain roles
     * Passes name of role as arguments. For example, IsCurrentUserInRole('System Administrator')
     * Returns true or false
     * 
     * @static
     * @returns {boolean}
     */
    static IsCurrentUserInRole(): boolean {
        let roles: Array<string> = this.GetCurrentUserRoles();
        for (let i: number = 0, ilength: number = roles.length; i < ilength; i++) {
            for (let j: number = 0, jlength: number = arguments.length; j < jlength; j++) {
                if (roles[i] === arguments[j]) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Sends synchronous/asynchronous request to assign an existing record to a user / a team
     * 
     * @static
     * @param {string} targetEntityName A JavaScript String corresponding to the schema name of the target entity
     * that is used for assign operations
     * @param {string} targetId A JavaScript String corresponding to the GUID of the target entity
     * that is used for assign operations
     * @param {string} assigneeEntityName A JavaScript String corresponding to the schema name of the assignee entity
     * that is used for assign operations
     * @param {string} assigneeId A JavaScript String corresponding to the GUID of the assignee entity
     * that is used for assign operations
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static Assign(targetEntityName: string, targetId: string, assigneeEntityName: string, assigneeId: string, callback: Function): void {
        let request = `
            <request i:type="b:AssignRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Target</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(targetId)}</a:Id>
                        <a:LogicalName>${targetEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Assignee</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(assigneeId)}</a:Id>
                        <a:LogicalName>${assigneeEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>Assign</a:RequestName>
            </request>
        `;
        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText: string = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result: string = crmXmlDecode(responseText);
            if (!async){
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a grantAccess request.
     * Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and * WriteAccess
     * 
     * @static
     * @param {*} accessOptions A JavaScript Object with properties corresponding to the grantAccess Criteria
     * that are valid for grantAccess operations.
     * accessOptions.targetEntityName is a string represents the name of the target entity
     * accessOptions.targetEntityId is a string represents the GUID of the target entity
     * accessOptions.principalEntityName is a string represents the name of the principal entity
     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
     * accessOptions.accessRights is a array represents the access conditions of the results
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static GrantAccess(accessOptions: any, callback: Function): void {
        let targetEntityName: string = accessOptions.targetEntityName;
        let targetEntityId: string = accessOptions.targetEntityId;
        let principalEntityName: string = accessOptions.principalEntityName;
        let principalEntityId: string = accessOptions.principalEntityId;
        let accessRights: string | Array<string> = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        let accessRightString = "";
        for (let i: number = 0, ilength: number = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        let request = `
            <request i:type="b:GrantAccessRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Target</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(targetEntityId)}</a:Id>
                        <a:LogicalName>${targetEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>PrincipalAccess</c:key>
                    <c:value i:type="b:PrincipalAccess">
                        <b:AccessMask>${accessRightString}</b:AccessMask>
                        <b:Principal>
                        <a:Id>${encodeValue(principalEntityId)}</a:Id>
                        <a:LogicalName>${principalEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                        </b:Principal>
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>GrantAccess</a:RequestName>
            </request>
        `;
        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText: string = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result: string = crmXmlDecode(responseText);
            if (!async){
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a modifyAccess request.
     * Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and * WriteAccess
     * 
     * @static
     * @param {*} accessOptions A JavaScript Object with properties corresponding to the modifyAccess Criteria
     * that are valid for modifyAccess operations.
     * accessOptions.targetEntityName is a string represents the name of the target entity
     * accessOptions.targetEntityId is a string represents the GUID of the target entity
     * accessOptions.principalEntityName is a string represents the name of the principal entity
     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
     * accessOptions.accessRights is a array represents the access conditions of the results
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static ModifyAccess(accessOptions: any, callback: Function): void {
        let targetEntityName: string = accessOptions.targetEntityName;
        let targetEntityId: string = accessOptions.targetEntityId;
        let principalEntityName: string = accessOptions.principalEntityName;
        let principalEntityId: string = accessOptions.principalEntityId;
        let accessRights: string | Array<string> = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        let accessRightString = "";
        for (let i = 0, ilength = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        let request = `
            <request i:type="b:ModifyAccessRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Target</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(targetEntityId)}</a:Id>
                        <a:LogicalName>${targetEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>PrincipalAccess</c:key>
                    <c:value i:type="b:PrincipalAccess">
                        <b:AccessMask>${accessRightString}</b:AccessMask>
                        <b:Principal>
                        <a:Id>${encodeValue(principalEntityId)}</a:Id>
                        <a:LogicalName>${principalEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                        </b:Principal>
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>ModifyAccess</a:RequestName>
            </request>
        `;
        
        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText: string = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result: string = crmXmlDecode(responseText);
            if (!async){
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a revokeAccess request
     * 
     * @static
     * @param {*} accessOptions A JavaScript Object with properties corresponding to the revokeAccess Criteria
     * that are valid for revokeAccess operations.
     * accessOptions.targetEntityName is a string represents the name of the target entity
     * accessOptions.targetEntityId is a string represents the GUID of the target entity
     * accessOptions.revokeeEntityName is a string represents the name of the revokee entity
     * accessOptions.revokeeEntityId is a string represents the GUID of the revokee entity
     * @param {Function} callback Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static RevokeAccess(accessOptions: any, callback: Function): void {
        let targetEntityName: string = accessOptions.targetEntityName;
        let targetEntityId: string = accessOptions.targetEntityId;
        let revokeeEntityName: string = accessOptions.revokeeEntityName;
        let revokeeEntityId: string = accessOptions.revokeeEntityId;

        let request: string = `
            <request i:type="b:RevokeAccessRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:b="http://schemas.microsoft.com/crm/2011/Contracts">
                <a:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Target</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(targetEntityId)}</a:Id>
                        <a:LogicalName>${targetEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Revokee</c:key>
                    <c:value i:type="a:EntityReference">
                        <a:Id>${encodeValue(revokeeEntityId)}</a:Id>
                        <a:LogicalName>${revokeeEntityName}</a:LogicalName>
                        <a:Name i:nil="true" />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>RevokeAccess</a:RequestName>
            </request>
        `;
        let async: boolean = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let responseText: string = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            let result: string = crmXmlDecode(responseText);
            if (!async){
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends synchronous/asynchronous request to do a retrievePrincipalAccess request
     * 
     * @static
     * @param {*} accessOptions A JavaScript Object with properties corresponding to the retrievePrincipalAccess Criteria
     * that are valid for retrievePrincipalAccess operations.
     * accessOptions.targetEntityName is a string represents the name of the target entity
     * accessOptions.targetEntityId is a string represents the GUID of the target entity
     * accessOptions.principalEntityName is a string represents the name of the principal entity
     * accessOptions.principalEntityId is a string represents the GUID of the principal entity
     * @param {Function} callback A Function used for asynchronous request. If not defined, it sends a synchronous request
     */
    static RetrievePrincipalAccess(accessOptions: any, callback: Function): void {
        let targetEntityName: string = accessOptions.targetEntityName;
        let targetEntityId: string = accessOptions.targetEntityId;
        let principalEntityName: string = accessOptions.principalEntityName;
        let principalEntityId: string = accessOptions.principalEntityId;

        let request: string = `
            <request i:type='b:RetrievePrincipalAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>
                <a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Target</c:key>
                    <c:value i:type='a:EntityReference'>
                        <a:Id>${encodeValue(targetEntityId)}</a:Id>
                        <a:LogicalName>${targetEntityName}</a:LogicalName>
                        <a:Name i:nil='true' />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                    <c:key>Principal</c:key>
                    <c:value i:type='a:EntityReference'>
                        <a:Id>${encodeValue(principalEntityId)}</a:Id>
                        <a:LogicalName>${principalEntityName}</a:LogicalName>
                        <a:Name i:nil='true' />
                    </c:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil='true' />
                <a:RequestName>RetrievePrincipalAccess</a:RequestName>
            </request>
        `;
        
        let async: boolean = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let result: string = selectSingleNodeText(resultXml, "//b:value");
            if (!async){
                return result;
            } else {
                callback(result);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }
    
    /**
     * Sends an synchronous/asynchronous RetrieveAllEntitieMetadata Request to retrieve all entities metadata in the system
     * 
     * @static
     * @param {Array<string>} entityFilters The filter array available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
     * Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
     * @param {Function} callback The function that will be passed through and be called by a successful response.
     * This function also used as an indicator if the function is synchronous/asynchronous
     * @returns {(void | any)} Entity Metadata Collection
     */
    static RetrieveAllEntitiesMetadata(entityFilters: Array<string>, retrieveIfPublished: boolean, callback:Function): void | any {
        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        let entityFiltersString: string = "";
        for (let iii: number = 0, templength: number = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        let request = `
            <request i:type="a:RetrieveAllEntitiesRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>EntityFilters</b:key>
                        <b:value i:type="c:EntityFilters" xmlns:c="http://schemas.microsoft.com/xrm/2011/Metadata">
                        ${encodeValue(entityFiltersString)}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>RetrieveAsIfPublished</b:key>
                        <b:value i:type="c:boolean" xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(retrieveIfPublished.toString())}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>RetrieveAllEntities</a:RequestName>
            </request>
        `;

        let async = !!callback;
        return doRequest(request, "Execute", async, (resultXml: string) => {
            let response: any = selectNodes(resultXml, "//c:EntityMetadata");

            let results: Array<any> = [];
            for (let i = 0, ilength = response.length; i < ilength; i++) {
                let a = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async){
                return results;
            } else {
                callback(results);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends an synchronous/asynchronous RetreiveEntityMetadata Request to retrieve a particular entity metadata in the system
     * 
     * @static
     * @param {string} entityFilters The filter string available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
     * Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time
     * @param {string} logicalName The string of the entity logical name
     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
     * @param {Function} callback The function that will be passed through and be called by a successful response.
     * This function also used as an indicator if the function is synchronous/asynchronous
     * @returns {(void | any)} Entity Metadata
     */
    static RetrieveEntityMetadata(entityFilters: string, logicalName: string, retrieveIfPublished: boolean, callback: Function): void | any {
        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        let entityFiltersString: string = "";
        for (let iii: number = 0, templength: number = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        let request: string = `
            <request i:type="a:RetrieveEntityRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>EntityFilters</b:key>
                        <b:value i:type="c:EntityFilters" xmlns:c="http://schemas.microsoft.com/xrm/2011/Metadata">
                        ${encodeValue(entityFiltersString)}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>MetadataId</b:key>
                        <b:value i:type="c:guid"  xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/">
                        ${encodeValue("00000000-0000-0000-0000-000000000000")}
                        </b:value>"
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>RetrieveAsIfPublished</b:key>
                        <b:value i:type="c:boolean" xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(retrieveIfPublished.toString())}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>LogicalName</b:key>
                        <b:value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(logicalName)}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>RetrieveEntity</a:RequestName>
            </request>
        `;

        let async = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let response: any = selectNodes(resultXml, "//b:value");

            let results: Array<string> = [];
            for (let i: number = 0, ilength = response.length; i < ilength; i++) {
                let a: any = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async){
                return results;
            } else {
                callback(results);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }

    /**
     * Sends an synchronous/asynchronous RetrieveAttributeMetadata Request to retrieve a particular entity's attribute metadata in the system
     * 
     * @static
     * @param {string} entityLogicalName The string of the entity logical name
     * @param {string} attributeLogicalName The string of the entity's attribute logical name
     * @param {boolean} retrieveIfPublished Sets whether to retrieve the metadata that has not been published
     * @param {Function} callback The function that will be passed through and be called by a successful response.
     * This function also used as an indicator if the function is synchronous/asynchronous
     * @returns {(void | any)} Entity Metadata
     */
    static RetrieveAttributeMetadata(entityLogicalName: string, attributeLogicalName: string, retrieveIfPublished: boolean, callback: Function): void | any {
        let request = `
            <request i:type="a:RetrieveAttributeRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">
                <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">
                    <a:KeyValuePairOfstringanyType>
                        <b:key>EntityLogicalName</b:key>
                        <b:value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(entityLogicalName)}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>MetadataId</b:key>
                        <b:value i:type="ser:guid"  xmlns:ser="http://schemas.microsoft.com/2003/10/Serialization/">
                        ${encodeValue("00000000-0000-0000-0000-000000000000")}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>RetrieveAsIfPublished</b:key>
                        <b:value i:type="c:boolean" xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(retrieveIfPublished.toString())}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                    <a:KeyValuePairOfstringanyType>
                        <b:key>LogicalName</b:key>
                        <b:value i:type="c:string"   xmlns:c="http://www.w3.org/2001/XMLSchema">
                        ${encodeValue(attributeLogicalName)}
                        </b:value>
                    </a:KeyValuePairOfstringanyType>
                </a:Parameters>
                <a:RequestId i:nil="true" />
                <a:RequestName>RetrieveAttribute</a:RequestName>
            </request>
        `;

        let async: boolean = !!callback;

        return doRequest(request, "Execute", async, (resultXml: string) => {
            let response: any = selectNodes(resultXml, "//b:value");
            let results: Array<any> = [];
            for (let i: number = 0, ilength: number = response.length; i < ilength; i++) {
                let a: any = objectifyNode(response[i]);
                results.push(a);
            }

            if (!async){
                return results;
            } else {
                callback(results);
            }
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    }
}
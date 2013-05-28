/// <reference path="Xrm2011.d.ts" />

/**
* MSCRM 2011 Web Service Toolkit for JavaScript
* @namespace
* @todo 
*/
module XrmServiceToolkit
{
    /**
    * @interface
    */
    export interface Entity
    {
        [index: string]: any;
    }

    /**
    * @interface
    */
    export interface BusinessEntity
    {
        id: string;
        logicalName: string;
        attributes: { [index: string]: Attribute; };
    }

    /**
    * @interface
    */
    export interface Attribute
    {
        type: string;
        value: any;
        id?: string;
        logicalName?: string;
        name?: string;
        formattedValue?: string;
    }

    /**
    * @interface
    */
    export interface QueryOptions
    {
        entityName: string;
        attributes: string[];
        values: any[];
        columnSet: string[];
        orderBy?: string[];
    }

    /**
    * @interface
    */
    export interface GrantAccessOptions
    {
        targetEntityName: string;
        targetEntityId: string;
        principalEntityName: string;
        principalEntityId: string;
        accessRights: string[];
    }

    /**
    * @interface
    */
    export interface RevokeAccessOptions
    {
        targetEntityName: string;
        targetEntityId: string;
        revokeeEntityName: string;
        revokeeEntityId: string;
    }

    /**
    * @interface
    */
    export interface GetAccessOptions
    {
        targetEntityName: string;
        targetEntityId: string;
        principalEntityName: string;
        principalEntityId: string;
    }

    /**
    * @namespace
    */
    export module Rest
    {
        /**
        * @interface
        */
        export interface EntityReference
        {
            Id: string;
            Name: string;
            LogicalName: string;
        }

        export function Create( object: Entity, type: string, successCallback: ( entity?: Entity ) => void , errorCallback: ( error: Error ) => void , async: bool );
        export function Retrieve( id: string, type: string, select: string, expand: string, successCallback: ( entity: Entity ) => void , errorCallback: ( error: Error ) => void , async: bool );
        export function Update( id: string, object: Entity, type: string, successCallback: () => void , errorCallback: ( error: Error ) => void , async: bool );
        export function Delete( id: string, type: string, successCallback: () => void , errorCallback: ( error: Error ) => void , async: bool );
        export function RetrieveMultiple( type: string, options: string, successCallback: ( entities: Entity[] ) => void , errorCallback: ( error: Error ) => void , onComplete: () => void , async: bool );
        export function Associate( entityid1: string, odataSetName1: string, entityid2: string, odataSetName2: string, relationship: string, successCallback: () => void , errorCallback: ( error: Error ) => void , async: bool );
        export function Disassociate( entityid1: string, odataSetName: string, entityid2: string, relationship: string, successCallback: () => void , errorCallback: ( error: Error ) => void , async: bool );
    }

    /**
    * @namespace
    */
    export module Soap
    {
        /**
        * @interface
        */
        export interface EntityReference extends Attribute
        {
            id: string;
            name: string;
            logicalName: string;
        }

        export function Execute( request: string, callback?: ( resultXml: Document ) => void ): void;
        export function Execute(request: string): Document;
        export function Fetch( fetchXml: String, callback: ( fetchResults: BusinessEntity[] ) => void ): void;
        export function Fetch( fetchXml: String ): BusinessEntity[];
        export function Retrieve( entityName: string, id: string, columnSet: string[], callback?: ( retrieveResult: BusinessEntity ) => void ): void;
        export function Retrieve( entityName: string, id: string, columnSet: string[] ): BusinessEntity;
        export function RetrieveMultiple( query: string, callback?: ( retrieveMultipleResults: BusinessEntity[] ) => void ): void;
        export function RetrieveMultiple( query: string ): BusinessEntity[];
        export function Create( be: BusinessEntity, callback?: ( createResult: string ) => void ): void;
        export function Create( be: BusinessEntity ): string;
        export function Update( be: BusinessEntity, callback?: ( updateResult: string ) => void ): void;
        export function Update( be: BusinessEntity ): string;
        export function Delete( entityName: string, id: string, callback?: ( deleteResult: string ) => void ): void;
        export function Delete( entityName: string, id: string ): string;
        export function QueryByAttribute( queryOptions: QueryOptions, callback?: ( fetchResults: BusinessEntity[] ) => void ): void;
        export function QueryByAttribute( queryOptions: QueryOptions ): BusinessEntity[];
        export function QueryAll( queryOptions: QueryOptions, callback?: ( fetchResults: BusinessEntity[] ) => void ): void;
        export function QueryAll( queryOptions: QueryOptions ): BusinessEntity[];
        export function SetState( entityName: string, id: string, stateCode: number, statusCode: number, callback?: ( resultXml: Document ) => void ): void;
        export function SetState( entityName: string, id: string, stateCode: number, statusCode: number ): Document;
        export function Associate( relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: BusinessEntity[], callback?: ( associateResult: string ) => void ): void;
        export function Associate( relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: BusinessEntity[] ): string;
        export function Disassociate( relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: BusinessEntity[], callback?: ( disassociateResult: string ) => void ): void;
        export function Disassociate( relationshipName: string, targetEntityName: string, targetId: string, relatedEntityName: string, relatedBusinessEntities: BusinessEntity[] ): string;
        export function Assign( targetEntityName: string, targetId: string, assigneeEntityName: string, assigneeId: string, callback?: ( assignResult: string ) => void ): void;
        export function Assign( targetEntityName: string, targetId: string, assigneeEntityName: string, assigneeId: string ): string;
        export function RetrievePrincipalAccess( accessOptions: GetAccessOptions, callback?: ( retrieveAccessResult: string ) => void ): void;
        export function RetrievePrincipalAccess( accessOptions: GetAccessOptions ): string;
        export function GrantAccess( accessOptions: GrantAccessOptions, callback?: ( grantAccessResult: string ) => void ): void;
        export function GrantAccess( accessOptions: GrantAccessOptions ): string;
        export function ModifyAccess( accessOptions: GrantAccessOptions, callback?: ( modifyAccessResult: string ) => void ): void;
        export function ModifyAccess( accessOptions: GrantAccessOptions ): string;
        export function RevokeAccess( accessOptions: RevokeAccessOptions, callback?: ( revokeAccessResult: string ) => void ): void;
        export function RevokeAccess( accessOptions: RevokeAccessOptions ): string;
        export function GetCurrentUserId(): string;
        export function GetCurrentUserBusinessUnitId(): string;
        export function GetCurrentUserRoles(): string[];
        export function IsCurrentUserRole(): bool;
    }
}
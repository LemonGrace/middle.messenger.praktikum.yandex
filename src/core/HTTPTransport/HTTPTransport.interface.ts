export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export type IObject = Record<string, any>;
export interface IDispatchOptions {
    data?: IObject;
    params?: object;
}
export interface IRequestOptions extends IDispatchOptions {
    method: METHOD;
}
export type IHTTPResult<IValue> = [IValue, null] | [null, Error];
export type THTTPMethod = <IResult>(url: string, options?: IDispatchOptions)
    => Promise<IHTTPResult<IResult>>;

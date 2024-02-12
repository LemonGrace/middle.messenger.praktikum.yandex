import { IObject } from '../../utils/IObject';

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IDispatchOptions {
    data?: IObject | FormData;
    params?: object;
}
export interface IRequestOptions extends IDispatchOptions {
    method: METHOD;
}
export type IHTTPResult<IValue> = [IValue, null] | [null, Error];
export type THTTPMethod = <IResult>(url: string, options?: IDispatchOptions)
    => Promise<IHTTPResult<IResult>>;

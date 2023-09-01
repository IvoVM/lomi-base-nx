export interface IToken {
    orderToken?: string;
    bearerToken?: string;
}
export declare type RequiredAnyToken = {
    order_token: string;
    bearer_token?: never;
} | {
    order_token?: never;
    bearer_token: string;
};
export declare type OptionalAnyToken = {
    order_token?: string;
    bearer_token?: never;
} | {
    order_token?: never;
    bearer_token?: string;
};
export declare type RequiredAccountToken = {
    bearer_token: string;
};
export declare type OptionalAccountToken = {
    bearer_token?: string;
};
export interface IOAuthToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    refresh_token: string;
    created_at: number;
}

export enum GRANT_TYPE {
    PASSWORD = 'password',
    REFRESH_TOKEN = 'refresh_token'
}

export interface ICredentials {
    username: string;
    password: string;
    grant_type?: GRANT_TYPE
}

export type RefreshToken = Pick<IOAuthToken, 'refresh_token'>




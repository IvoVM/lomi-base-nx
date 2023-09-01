import { IRelationships } from "./relationships.type";

export interface IAccount {
    data: {
        id: string;
        type: string;
        attributes: IAttributes
        relationships: IRelationships;
    };
}

export interface IAttributes {
    email: string;
    store_credits: number;
    completed_orders: number;
    county_id: number;
    first_name: string;
    last_name: string;
    born_date?: Date;
    gender?: string;
    city?: string;
    skip_optional_data?: boolean;
    prime_expiration?: Date;
    is_prime?: boolean;
    accumulated_latam_miles?: number;
    roles?: Array<string | null>;
}

export interface ICreateOptions {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface INewPassword {
    password: string;
    password_confirmation: string;
}
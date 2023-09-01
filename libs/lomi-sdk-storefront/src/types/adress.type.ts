export interface IAddresses {
    data: AddressData[];
}

export interface AddressData {
    id: string;
    type: string;
    attributes: AddressAttributes;
}

export interface AddressAttributes {
    firstname: string;
    lastname: string;
    address1: string;
    address2: string;
    city: string;
    zipcode?: number;
    phone: string;
    state_name?: string;
    company?: string;
    country_name?: string;
    country_iso3?: string;
    country_iso?: string;
    label?: string;
    state_code?: string;
    global?: boolean;
    county_id: number;
    country_id: number;
    state_id: number;
    note?: string;
    info_note?: string;
    county_name?: string;
    hide_in_frontend?: boolean;
}

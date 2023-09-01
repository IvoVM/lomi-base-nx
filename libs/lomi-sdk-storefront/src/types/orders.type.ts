export interface IOrdersList {
    data:  IOrderData[];
    meta:  Meta;
    links: Links;
}

export interface IOrderData {
    id:            string;
    type:          string;
    attributes:    IOrderAttributes;
    relationships: Relationships;
}

export interface IOrderAttributes {
    number:                       string;
    item_total:                   string;
    total:                        string;
    ship_total:                   string;
    adjustment_total:             string;
    created_at:                   Date;
    updated_at:                   Date;
    completed_at:                 Date;
    included_tax_total:           string;
    additional_tax_total:         string;
    display_additional_tax_total: string;
    display_included_tax_total:   string;
    tax_total:                    string;
    currency:                     string;
    state:                        string;
    token:                        string;
    email:                        string;
    display_item_total:           string;
    display_ship_total:           string;
    display_adjustment_total:     string;
    display_tax_total:            string;
    promo_total:                  string;
    display_promo_total:          string;
    item_count:                   number;
    special_instructions:         null | string;
    display_total:                string;
    pre_tax_item_amount:          string;
    display_pre_tax_item_amount:  string;
    pre_tax_total:                string;
    display_pre_tax_total:        string;
    shipment_state:               string;
    payment_state:                string;
    miles_latam:                  null;
    latam_code:                   null;
    id_latam_response:            null;
    scheduled_at:                 Date | null;
    any_item_with_alcohol:        boolean;
    hide_edenred_btn:             boolean;
    stock_locations:              Array<string | null>;
}

export interface Relationships {
    line_items:       ILineItems;
    variants:         ILineItems;
    promotions:       ILineItems;
    payments:         ILineItems;
    shipments:        ILineItems;
    user:             IBillingAddress;
    billing_address:  IBillingAddress;
    shipping_address: IBillingAddress;
}

export interface IBillingAddress {
    data: DAT;
}

export interface DAT {
    id:   string;
    type: Type;
}

export enum Type {
    Address = "address",
    LineItem = "line_item",
    Payment = "payment",
    Promotion = "promotion",
    Shipment = "shipment",
    User = "user",
    Variant = "variant",
}

export interface ILineItems {
    data: DAT[];
}

export interface Links {
    self:  string;
    next:  string;
    prev:  string;
    last:  string;
    first: string;
}

export interface Meta {
    count:       number;
    total_count: number;
    total_pages: number;
}
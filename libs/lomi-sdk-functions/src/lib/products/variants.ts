import { SpreeEntity } from "../../spree";

export type Variant = {
    sku: string;
    weight: string;
    height: number | null;
    depth: number | null;
    deleted_at: string | null;
    is_master: boolean;
    cost_price: string;
    position: number;
    cost_currency: string;
    track_inventory: boolean;
    updated_at: string;
    discontinue_on: string | null;
    created_at: string;
    storage_location: string;
    compare_at_cost_price: string;
    google_merchant_updated_at: string | null;
    ean: string | null;
    name: string;
    options_text: string;
    total_on_hand: number;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    available: boolean;
    currency: string;
    price: string;
    display_price: string;
    compare_at_price: string;
    display_compare_at_price: string;

    stock_items?: SpreeEntity<any>[];
  }
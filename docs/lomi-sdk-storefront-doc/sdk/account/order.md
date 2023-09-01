# Ordenes Completadas

En esta sección encontrarás todas las órdenes completadas del usuario. Puedes buscar todas las órdenes o seleccionar una específica.

## Lista de ordenes

Devuelve todas las órdenes completadas realizadas por el usuario.

```js
import { account } from "@lomi/sdk-storefront";

await account().completedOrdersList(token)
```

### Respuesta

```js
{
    data: [
        {
            id: "1",
            type: "cart",
            attributes: {
                number: "R1",
                item_total: "16110.0",
                total: "13267.0",
                ship_total: "1990.0",
                adjustment_total: "-4833.0",
                created_at: "2022-07-21T13:21:18.747-04:00",
                updated_at: "2022-07-21T14:52:42.390-04:00",
                completed_at: "2022-07-21T13:46:12.059-04:00",
                included_tax_total: "0.0",
                additional_tax_total: "0.0",
                display_additional_tax_total: "$0",
                display_included_tax_total: "$0",
                tax_total: "0.0",
                currency: "CLP",
                state: "complete",
                token: "EuNJoJIoNeGX_PAZghCh5Q1658424078740",
                email: "orlando@lomi.cl",
                display_item_total: "$16.110",
                display_ship_total: "$1.990",
                display_adjustment_total: "-$4.833",
                display_tax_total: "$0",
                promo_total: "-4833.0",
                display_promo_total: "-$4.833",
                item_count: 7,
                special_instructions: null,
                display_total: "$13.267",
                pre_tax_item_amount: "16110.0",
                display_pre_tax_item_amount: "$16.110",
                pre_tax_total: "18100.0",
                display_pre_tax_total: "$18.100",
                shipment_state: "shipped",
                payment_state: "paid",
                miles_latam: null,
                latam_code: null,
                id_latam_response: null,
                scheduled_at: null,
                any_item_with_alcohol: false,
                stock_locations: []
            },
            relationships: {
                line_items: {
                    data: [
                        {
                            id: "1",
                            type: "line_item"
                        },
                        {
                            id: "2",
                            type: "line_item"
                        },
                        {
                            id: "3",
                            type: "line_item"
                        },
                        {
                            id: "4",
                            type: "line_item"
                        },
                        {
                            id: "5",
                            type: "line_item"
                        }
                    ]
                },
                variants: {
                    data: [
                        {
                            id: "1",
                            type: "variant"
                        },
                        {
                            id: "2",
                            type: "variant"
                        },
                        {
                            id: "3",
                            type: "variant"
                        },
                        {
                            id: "4",
                            type: "variant"
                        },
                        {
                            id: "5",
                            type: "variant"
                        }
                    ]
                },
                promotions: {
                    data: [
                        {
                            id: "1",
                            type: "promotion"
                        }
                    ]
                },
                payments: {
                    data: [
                        {
                            id: "1",
                            type: "payment"
                        }
                    ]
                },
                shipments: {
                    data: [
                        {
                            id: "1",
                            type: "shipment"
                        }
                    ]
                },
                user: {
                    data: {
                        id: "40",
                        type: "user"
                    }
                },
                billing_address: {
                    data: {
                        id: "1231231312",
                        type: "address"
                    }
                },
                shipping_address: {
                    data: {
                        id: "1231231312",
                        type: "address"
                    }
                }
            }
        }
    ],
    meta: {
        count: 1,
        total_count: 1,
        total_pages: 1
    },
    links: {
        self: "https://lomi.cl/api/v2/storefront/account/orders",
        next: "https://lomi.cl/api/v2/storefront/account/orders?page=1",
        prev: "https://lomi.cl/api/v2/storefront/account/orders?page=1",
        last: "https://lomi.cl/api/v2/storefront/account/orders?page=1",
        first: "https://lomi.cl/api/v2/storefront/account/orders?page=1"
    }
}
```

## Traer Orden

Devuelve una orden completada para el usuario actual.

```js
import { account } from "@lomi/sdk-storefront";

await account().completedOrder(token.access_token, 'numeroDeOrden')
```

### Respuesta

```js
{
    id: "1",
    type: "cart",
    attributes: {
        number: "R1",
        item_total: "16110.0",
        total: "13267.0",
        ship_total: "1990.0",
        adjustment_total: "-4833.0",
        created_at: "2022-07-21T13:21:18.747-04:00",
        updated_at: "2022-07-21T14:52:42.390-04:00",
        completed_at: "2022-07-21T13:46:12.059-04:00",
        included_tax_total: "0.0",
        additional_tax_total: "0.0",
        display_additional_tax_total: "$0",
        display_included_tax_total: "$0",
        tax_total: "0.0",
        currency: "CLP",
        state: "complete",
        token: "EuNJoJIoNeGX_PAZghCh5Q1658424078740",
        email: "orlando@lomi.cl",
        display_item_total: "$16.110",
        display_ship_total: "$1.990",
        display_adjustment_total: "-$4.833",
        display_tax_total: "$0",
        promo_total: "-4833.0",
        display_promo_total: "-$4.833",
        item_count: 7,
        special_instructions: null,
        display_total: "$13.267",
        pre_tax_item_amount: "16110.0",
        display_pre_tax_item_amount: "$16.110",
        pre_tax_total: "18100.0",
        display_pre_tax_total: "$18.100",
        shipment_state: "shipped",
        payment_state: "paid",
        miles_latam: null,
        latam_code: null,
        id_latam_response: null,
        scheduled_at: null,
        any_item_with_alcohol: false,
        stock_locations: []
    },
    relationships: {
        line_items: {
            data: [
                {
                    id: "1",
                    type: "line_item"
                },
                {
                    id: "2",
                    type: "line_item"
                },
                {
                    id: "3",
                    type: "line_item"
                },
                {
                    id: "4",
                    type: "line_item"
                },
                {
                    id: "5",
                    type: "line_item"
                }
            ]
        },
        variants: {
            data: [
                {
                    id: "1",
                    type: "variant"
                },
                {
                    id: "2",
                    type: "variant"
                },
                {
                    id: "3",
                    type: "variant"
                },
                {
                    id: "4",
                    type: "variant"
                },
                {
                    id: "5",
                    type: "variant"
                }
            ]
        },
        promotions: {
            data: [
                {
                    id: "1",
                    type: "promotion"
                }
            ]
        },
        payments: {
            data: [
                {
                    id: "1",
                    type: "payment"
                }
            ]
        },
        shipments: {
            data: [
                {
                    id: "1",
                    type: "shipment"
                }
            ]
        },
        user: {
            data: {
                id: "40",
                type: "user"
            }
        },
        billing_address: {
            data: {
                id: "1231231312",
                type: "address"
            }
        },
        shipping_address: {
            data: {
                id: "1231231312",
                type: "address"
            }
        }
    }
}
```

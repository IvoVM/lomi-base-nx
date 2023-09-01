# Carrito

## Crear Carro

Para crear un **carrito** debes enviar una solicitud `POST` al siguiente end point `/api/v2/storefront/cart`. En el cuerpo de la petcion debes ingresar los siguientes valores: **bearer_token** el cual se obiente en la [Respuesta](/api/auth/#respuesta) de crear un token y **channel** este es el nombre desde donde sea crea el carrito. A continuacuon se muestra un emeplo de la peticion.

```js
{
    bearer_token: "ZEzrkmJ5lpC6JjRBRKY8",
    channel: "Nombre Empresa"
}
```

## Ver Carro

Para ver la informacion del **carro** debes enviar una solicitud `GET` al siguiente end point `/api/v2/storefront/cart`. En el cuerpo de la petcion debes enviar el **order_token** previamiente entregado en la [Respuesta](/api/cart/#respuesta) al momento de crear uno. A continaucion se muestra un ejemplo del cuerpo dela peticion. 

```js
{
    order_token: "3Qicf3bbAutNQyDiS5YI"
}
```

## Actualizar Carro

asdasd

## Respuesta

En caso de que la petición para crear carro o ver la informacion de un carro uno sea correcta, tendras un respuesta con los siguientes datos:

```js{21}
{
    data: {
        id: "1111111",
        type: "cart",
        attributes: {
            number: "R1111111",
            item_total: "0.0",
            total: "0.0",
            ship_total: "0.0",
            adjustment_total: "0.0",
            created_at: "2023-04-04T23:11:08.106-04:00",
            updated_at: "2023-04-04T23:11:08.106-04:00",
            completed_at: null,
            included_tax_total: "0.0",
            additional_tax_total: "0.0",
            display_additional_tax_total: "$0",
            display_included_tax_total: "$0",
            tax_total: "0.0",
            currency: "CLP",
            state: "cart",
            token: "3Qicf3bbAutNQyDiS5YI",
            email: null,
            display_item_total: "$0",
            display_ship_total: "$0",
            display_adjustment_total: "$0",
            display_tax_total: "$0",
            promo_total: "0.0",
            display_promo_total: "$0",
            item_count: 0,
            special_instructions: null,
            display_total: "$0",
            pre_tax_item_amount: "0.0",
            display_pre_tax_item_amount: "$0",
            pre_tax_total: "0.0",
            display_pre_tax_total: "$0",
            shipment_state: null,
            payment_state: null,
            miles_latam: null,
            latam_code: null,
            id_latam_response: null,
            scheduled_at: null,
            any_item_with_alcohol: false,
            hide_edenred_btn: false,
            stock_locations: [
                {
                    id: 1,
                    name: "Tienda 1",
                    address1: "Calle falsa 123",
                    address2: "",
                }
            ]
        }
    }
}
```

::: info
Debes guardar el `token del carro` ya que lo debes utilizar en futuras peticiones, ya sea como header o enviarlo en el body. Este token lo encuentras dentro `data -> attributes -> token`
:::


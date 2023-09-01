# Direcciones

En esta sección se explica cómo usar el SDK para gestionar las direcciones del usuario. Es esencial ya que se utilizarán estas direcciones para enviar los productos al usuario y seleccionar la tienda correspondiente según su ubicación.

## Lista direcciones

Traer una lista de direcciones para el usuario actual.

```js
import { account } from "@lomi/sdk-storefront";

await account().AddressesList(token)
```

## Crear direccion

Crea una nueva direccion para el usuario actual.

```js
import { account } from "@lomi/sdk-storefront";

const newAddress: AddressAttributes = {
    firstname: "firstname",
    lastname: "lastname",
    address1: "El Pillan",
    address2: "1",
    city: "Santiago",
    phone: "11111111",
    state_name: "Región Metropolitana",
    country_name: "Chile",
    global: false,
    county_id: 2,
    country_id: 1,
    state_id: 1,
}

await account().createAddress(token, newAddress)
```
## Actualizar direccion

Actualiza una dirección específica para el usuario actual.

```js
import { account } from "@lomi/sdk-storefront";

await account()
    .updateAddress(token, 'addressId', { firstname: 'Nombre Nuevo'})
```

## Eliminar direccion

Elimina una dirección específica para el usuario actual.

```js
import { account } from "@lomi/sdk-storefront";

await account().removeAddress(token, 'addressId')
```

## Respuesta

Para todos los puntos anteriores, si la operación se realiza con éxito, la respuesta obtenida será la misma en todos los casos.

```js
{
    data: [
        {
            id: "1",
            type: "address",
            attributes: {
                firstname: "firstname",
                lastname: "lastname",
                address1: "calle",
                address2: "numero depto",
                city: "Las Condes",
                phone: "111111111",
                state_name: "Región Metropolitana",
                country_name: "Chile",
                country_iso3: "CHL",
                country_iso: "CL",
                state_code: "RM",
                county_id: 2,
                country_id: 1,
                state_id: 1,
                note: null,
                info_note: null,
                county_name: "Las Condes",
            }
        }
    ]
}
```

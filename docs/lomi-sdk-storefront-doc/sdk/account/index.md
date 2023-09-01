# Cuenta

Este apartado explica cómo manejar la cuenta del usuario utilizando el SDK. Se pueden crear nuevas cuentas, actualizar cuentas existentes o cambiar contraseñas utilizando diferentes funciones en el SDK.

## Crear Cuenta

Para crear una nueva cuenta, solo se necesitan tres datos: el correo electrónico, la contraseña y una confirmación de esta. Los usuarios de LOMI pueden agregar datos adicionales, pero para hacerlo, deben modificar la información de una cuenta existente. Después de crear una cuenta para el nuevo usuario, se le puede solicitar que actualice sus datos.

```js
import { account, ICreateOptions } from "@lomi/sdk-storefront";

const createUser: ICreateOptions = {
    email: 'email@email.com',
    password: 'contraseña',
    password_confirmation: 'contraseña'
}

const createResponse = await account().create(createUser)
```

::: tip
Para utilizar las siguientes funciones, es necesario enviar el access token obtenido en la [Respuesta](/sdk/token/#respuesta) del punto anterior.
:::

## Cambiar Contraseña

Cambia la contraseña del usuario.

```js
import { resetPassword, INewPassword } from "@lomi/sdk-storefront";

const newCredentials: INewPassword = {
    password: 'password',
    password_confirmation: 'password'
}

const response = await account().resetPassword(token, newCredentials)
```

## Información del Usuario

Devuelve los detalles del usuario actual

```js
import { getUserInfo, INewPassword } from "@lomi/sdk-storefront";

const userInfoResponse = await account().getUserInfo(token)
```

## Respuesta

Para todos los puntos anteriores, si la operación se realiza con éxito, la respuesta obtenida será la misma en todos los casos.

```js
{
  data: {
    id: "34101",
    type: "user",
    attributes: {
      email: "email",
      store_credits: 0,
      completed_orders: 10,
      county_id: 2,
      first_name: "Nombre",
      last_name: "Apelldio",
      born_date: null,
      gender: "",
      city: null,
      skip_optional_data: false,
      is_prime: false,
      accumulated_latam_miles: 0,
    },
    relationships: {
      default_billing_address: {
        data: {
          id: "2",
          type: "address"
        }
      },
      default_shipping_address: {
        data: {
          id: "2",
          type: "address"
        }
      }
    }
  }
}
```
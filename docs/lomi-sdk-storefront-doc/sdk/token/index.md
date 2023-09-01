# Token

Esta función tiene como objetivo crear un nuevo Bearer token o actualizar uno existente. El token se encuentra en el cuerpo de la respuesta y es necesario para futuras solicitudes. La mayoría de los métodos de este SDK requieren un token para la autenticación, que puede ser un token de sesión o el de la orden. Sin embargo, algunas funciones requieren específicamente el uso del token de sesión.

## Obtener bearer token

Para obtener este token, debes iniciar sesión utilizando el método `getToken` del SDK. Si envías las credenciales correctas en la respuesta, podrás obtener tu `access_token`.

```js
import { auth } from "@lomi/sdk-storefront";

const credentials = {
    username: 'username',
    password: 'password'
}
const tokenResponse = await auth().getToken(credentials)
```

## Refrescar bearer token

En caso de que tu Bearer token haya expirado, puedes utilizar esta función para mantener la sesión de tu usuario activa sin tener que volver a iniciar sesión.

```js
import { auth } from "@lomi/sdk-storefront";

const refreshTokenResponse = await auth().refreshtoken(refreshToken)
```

## Respuesta

En caso de que el Bearer token se haya creado o actualizado correctamente, tendrás la siguiente respuesta:

```js
{
  access_token: "SfM3k8kq5Wkc6xz6rgMlsl-mbygJ1ptq4DR0Ah51vjA",
  token_type: "Bearer",
  expires_in: 7200,
  refresh_token: "SqJDIwX00fehqHxS6xmb-kzqAlrYe_0EHgekMexVT8k",
  created_at: 1581873931
}
```

::: tip
Recuerda guardar este token ya que posiblemente lo necesitarás utilizar en funciones siguientes.
:::

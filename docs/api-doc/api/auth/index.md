# Token

Para crear o refrescar un **token** debes enviar una solicitud `POST` al siguiente end point `/spree_oauth/token`. Para obtener las credenciales necesarias debes comunicarte con alguien del equipo de **LOMI**

## Crear Token

Para crear de un token deben enviar la solicitud previamente mencionada. El cuerpo de la petición debe contener los siguientes campos:


```js
{
    username: "user@example.com,",
    password: "password",
    grant_type: "password"
}
```

## Refrescar Token

Para refrescar de un token deben enviar la solicitud previamente mencionada. El cuerpo de la petición debe contener los siguientes campos:

```js
{
    refresh_token: "35v94j3uliJIMvfejg7l",
    grant_type: "refresh_token"
}
```

## Respuesta

En caso de que la petición para craer un token o refrescar uno sea correcta, tendras un respuesta con los siguientes datos:

```js{2}
{
    access_token: "ZEzrkmJ5lpC6JjRBRKY8",
    token_type: "Bearer",
    expires_in: 7200,
    refresh_token: "35v94j3uliJIMvfejg7l",
    created_at: 1680579188
}
```

::: info
Debes guardar este `access_token` ya que lo debes utilizar en futuras peticiones
:::


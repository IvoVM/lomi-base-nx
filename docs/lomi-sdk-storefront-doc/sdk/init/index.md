# Iniciar SDK

Este SDK se usa para conectarse a las tiendas de LOMI y acceder a su catálogo de productos, permitiendo a los usuarios hacer compras a través de nuestra plataforma. Para lograrlo, se emplea Axios para enviar solicitudes a los diferentes endpoints. Antes de comenzar, es necesario inicializar el SDK y asignar uno de los ambientes de LOMI, que corresponde a la URL base que Axios utilizará para enviar las solicitudes correspondientes.

## Ambientes

Tenemos tres ambientes:

* Main: producción
* Unicorn: pruebas
* Dev: desarrollo

## Como utilizar el SDK

Primero debes importar la librería y utilizar el método `setUrl` que se encuentra dentro de `initSdk`. A este método debes enviarle uno de los 3 ambientes explicados en el punto anterior. También puedes encontrar estos tipos en la documentación de la librería."

```js
import { initSdk } from "@lomi/sdk-storefront";

await initSdk().setUrl(HOST.LOMI)
```

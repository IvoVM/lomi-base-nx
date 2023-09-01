import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LOMI",
  description: "Documentación para utilizar el SDK de LOMI storeFront",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'SDK', link: '/sdk/init/' }
    ],
    sidebar: {
      '/sdk/': [
        {
          text: 'SDK',
          items: [
            { text: 'Iniciar', link: '/sdk/init/'}
          ]
        },
        {
          text: 'Autenticación',
          items: [
            { text: 'Bearer Token', link: '/sdk/token/'}
          ]
        },
        {
          text: 'Cuenta',
          items: [
            { text: 'Usuario', link: '/sdk/account/'},
            { text: 'Direcciones', link: '/sdk/account/address'},
            { text: 'Ordenes Completadas', link: '/sdk/account/order'},
          ]
        }
      ]
    },
    outlineTitle: 'En esta pagina',
    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente',
    }
  }
})

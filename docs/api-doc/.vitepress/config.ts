import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LOMI",
  description: "LOMI doc",
  lang: 'es',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '../assets/leafs.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/auth/' }
    ],
    sidebar: {
      '/api/':[
        {
          text: 'Autenticación',
          items: [
            { text: 'Token', link: '/api/auth/', }
          ]
        },
        {
          text:'Orden',
          items: [
              { text: 'Carro', link: '/api/cart/'},
              { text: 'asd', link: '/api/markdown-examples'},
          ]
        }
      ],
    },
    outlineTitle: 'En esta pagina',
    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente',
    }
  }
})

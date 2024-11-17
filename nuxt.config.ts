// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({ 
   app: {
    head: {
      link: [
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      }
    ],
      script: [
        { src: '/javascript/script.js', defer: true }       
      ],
    },
  },  
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        //bootstrap 5.2
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' },
        //jquery
        { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js' },
        //canvas
        { src: 'https://canvasjs.com/assets/script/canvasjs.min.js'}
      ],
      link: [
        //google fonts
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap' },

        //bootstrap 5.2
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' }
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>

      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>

      ]
    }
  }
})

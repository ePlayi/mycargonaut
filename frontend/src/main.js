import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './registerServiceWorker'

//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    }
  },
})

const app = createApp(App)

createApp(App)


app.use(router)
app.use(vuetify)
app.use(VueAxios, axios)
app.mount('#app')

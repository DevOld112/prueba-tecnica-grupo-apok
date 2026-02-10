import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import '../src/assets/index.css'

import App from './App.vue'
import router from './router'

const i18n = createI18n({})

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.use(i18n)
app.mount('#app')

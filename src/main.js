/*import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
<<<<<<< HEAD
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
=======

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
*/
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
>>>>>>> 3b75ae1be3c3211a62a7d35d8dc0d7bdf0deb2b2

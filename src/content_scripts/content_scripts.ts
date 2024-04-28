import { createApp } from 'vue'
import App from '../override/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

window.onload = async () => {
  const el = document.querySelector('body')
  if (el) {
    el.insertAdjacentHTML(
      'afterend',
      '<div id="xxx"></div>',
    )
    const app = createApp(App)
    app.use(ElementPlus)
    app.mount('#xxx')
  }
}

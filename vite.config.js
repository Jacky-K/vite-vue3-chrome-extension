import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        // option: resolve(__dirname, 'option.html'),
        popup: resolve(__dirname, 'popup.html'),
        content: resolve(__dirname, 'content.html'),
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // This is the context of the requests you want to proxy
        target: 'http://194.238.19.81/dingadeth',  // The target server
        changeOrigin: true,  // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, '')  // Optionally remove the /api prefix from the request URL
      }
    }
  }
})

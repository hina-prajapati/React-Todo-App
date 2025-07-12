import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   allowedHosts: ['56e1-182-48-212-78.ngrok-free.app']  // 👈 your ngrok domain here
  // }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // node_modules athule thiyena libraries wenama files walata kadanawa
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    // Warning eka ena limit eka 1000kb wenakan wedi karanna
    chunkSizeWarningLimit: 1000,
  },
})
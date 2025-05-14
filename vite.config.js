import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/Monkey-Pop/',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Asegura que los archivos de audio no se conviertan a base64
    rollupOptions: {
      output: {
        manualChunks: undefined, // Evita la fragmentación automática que puede afectar a los recursos
      },
    },
  },
})

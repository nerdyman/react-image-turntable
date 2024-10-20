import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
  },
  server: {
    host: '0.0.0.0',
    port: !Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000,
  },
  clearScreen: false,
  plugins: [react()],
});

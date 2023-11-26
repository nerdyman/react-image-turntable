import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000,
  },
  clearScreen: false,
  plugins: [react()],
});

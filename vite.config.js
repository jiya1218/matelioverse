import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        categories: resolve(__dirname, 'categories.html'),
        partner: resolve(__dirname, 'partner.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});

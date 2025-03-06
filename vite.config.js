import { defineConfig } from 'vite';

process.env.VITE_PORT = 3000;

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});


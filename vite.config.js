import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  root: './src',
  server: { https: true },
  plugins: [mkcert()],
  test: {
    exclude: ['**/e2e/**'],
    root: './',
    reporters: ['default'],
  },
});

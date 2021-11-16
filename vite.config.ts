import { defineConfig } from 'vite';

export default defineConfig({
   base: '/recharge-calculator/',
   build: {
      target: 'es6',
      assetsDir: 'static',
      brotliSize: true,
      chunkSizeWarningLimit: 100,
      sourcemap: true,
      write: true,
   },
});

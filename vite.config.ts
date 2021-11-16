import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
   base: '/recharge-calculator/',
   plugins: [
      legacy({
         targets: ['defaults', 'IE 11'],
         polyfills: true,
         modernPolyfills: true,
         renderLegacyChunks: true,
      }),
   ],
   build: {
      target: 'es6',
      assetsDir: 'static',
      chunkSizeWarningLimit: 100,
      sourcemap: mode == 'development',
   },
}));

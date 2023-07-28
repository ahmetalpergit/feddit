import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName(name, filename) {
        const file = path.basename(filename, '.scss').replace('.module', '');
        return file + '_' + name;
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
});

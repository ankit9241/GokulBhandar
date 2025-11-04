import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    open: true,
    strictPort: true,
    // Disable HMR completely
    hmr: false,
    // Optimize file watching
    watch: {
      usePolling: false,
      // Limit watch depth to 2 levels
      depth: 2,
      // Ignore common directories that don't need to trigger reloads
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.vscode/**',
        '**/public/**',
        '**/coverage/**',
        '**/cypress/**',
        '**/test/**',
        '**/tests/**',
        '**/__tests__/**',
        '**/*.md',
        '**/*.txt'
      ]
    },
    host: '0.0.0.0',
    cors: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

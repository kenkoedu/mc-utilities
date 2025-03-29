import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mc-utilities/",
  // assetsInclude: ['assets/questions/*.png'], 
  plugins: [vue(),
  Components({
    resolvers: [
      BootstrapVueNextResolver()],
    dts: true,
  }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Ensure this is correctly set
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]'
      }
    }
  },
})

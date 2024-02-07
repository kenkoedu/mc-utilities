import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolve from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mc-utilities/",
  // assetsInclude: ['assets/questions/*.png'], 
  plugins: [vue(),
  Components({
    resolvers: [IconsResolve(),
    BootstrapVueNextResolver()],
    dts: true,
  }),
  Icons({
    compiler: 'vue3',
    autoInstall: true,
  }),
  ],
})

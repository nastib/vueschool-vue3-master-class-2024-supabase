import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import { defineConfig } from 'vite'
import {  type UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    Components({
      /* options */
      dirs: ['src/components/**/*', 'src/layouts' ],
      extensions: ['vue'],
    }),
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        // presets
        'vue',
        VueRouterAutoImports,
        // custom
        {
          '@vueuse/core': [
          // named imports
          'useMouse', // import { useMouse } from '@vueuse/core',
          // alias
          ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
        },
        {
          'pinia':[
            'storeToRefs',
            'defineStore',
            'acceptHMRUpdate'
          ]
        }
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: ['src/stores/**','src/composables/**',],
    }),
    // ⚠️ Vue must be placed after VueRouter()
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (e) => e.startsWith('iconify-icon')
        }
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}) satisfies UserConfig

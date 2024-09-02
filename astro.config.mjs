import { defineConfig } from 'astro/config';
import path from 'path';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  //site: 'https://anzokiharu.jp',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/assets/style/utils/_utils.scss"; `,
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: (chunk) => {
            const { name } = chunk;
            console.table(chunk);
            if (name === 'global') {
              return 'global.js';
            }
            // ディレクトリ名とページ名を組み合わせたファイル名を生成
            const parts = name.split('/');
            const fileName = parts.pop();
            const dirName = parts.join('_') + name; // ディレクトリ名をアンダースコアで連結
            return `assets/scripts/${dirName}.js`;
          },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(-1);
            if (/js|jsx|ts|tsx/i.test(extType)) {
              extType = 'scripts';
            }
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            if (/css|scss/i.test(extType)) {
              extType = 'styles';
            }
            if (/woff|woff2|ttf/i.test(extType)) {
              extType = 'font';
            }
            return `assets/${extType}/[name].[ext]`;
          },
        },
      },
      /* rollupOptions: {
        output: {
          entryFileNames: (chunk) => {
            const { name } = chunk;
            if (name === 'global') {
              return 'global.js';
            }
            // ディレクトリ名とページ名を組み合わせたファイル名を生成
            const parts = name.split('/');
            const fileName = parts.pop();
            const dirName = parts.join('_') + 'aaaaa'; // ディレクトリ名をアンダースコアで連結
            return `${dirName}.js`;
          },
          //chunkFileNames: 'client-[name]-[hash].js',
          assetFileNames: '[name].[ext]',
        },
      }, */
    },
    server: {
      watch: {
        ignored: ['**/htdocs/**'],
      },
    },
  },
  outDir: 'htdocs/',
  base: '/',
  compressHTML: false,
  integrations: [
    {
      name: 'chunkFileNames-for-client',
      hooks: {
        'astro:build:setup': ({ vite, target }) => {
          if (target === 'client') {
            vite.build.rollupOptions.output.chunkFileNames = () => {
              return `assets/scripts/chunks/[name].js`;
            };
          }
        },
      },
    },
    //sitemap(),
  ],
  /* integrations: [
    {
      name: 'my-integration',
      hooks: {
        'astro:build:setup': async ({ updateConfig, command }) => {
          const isClientBuild = command === 'build';

          updateConfig({
            vite: {
              build: {
                rollupOptions: {
                  output: {
                    entryFileNames: (chunk) => {
                      const { name } = chunk;
                      if (name === 'global') {
                        return 'global.js';
                      }
                      // ディレクトリ名とページ名を組み合わせたファイル名を生成
                      const parts = name.split('/');
                      const fileName = parts.pop();
                      const dirName = parts.join('_') + 'aaaaa'; // ディレクトリ名をアンダースコアで連結
                      return `${dirName}.js`;
                    },
                    chunkFileNames: isClientBuild ? 'client-[name]-[hash].js' : 'server-[name]-[hash].js',
                    assetFileNames: '[name].[ext]',
                  },
                },
              },
            },
          });
        },
      },
    },
  ], */
  server: {
    port: 3001,
    host: true,
  },
});

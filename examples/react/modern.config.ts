import { appTools, defineConfig } from '@modern-js/app-tools';
import { webxPlugin } from '@webx-kit/modernjs-plugin';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  plugins: [
    appTools(),
    webxPlugin({
      background: './src/background/index.ts',
      contentScripts: './src/content-scripts/index.tsx',
    }),
  ],
  output: {
    polyfill: 'off',
  },
});

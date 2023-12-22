import assert from 'node:assert';
import { appTools, defineConfig } from '@modern-js/app-tools';

const isDev = process.env.NODE_ENV === 'development';

const scriptEntries = [
  {
    name: 'content-script',
    path: './src/content-scripts/index.tsx',
  },
];

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  plugins: [appTools()],
  source: {
    entriesDir: './src/pages',
  },
  dev: {
    assetPrefix: true,
  },
  output: {
    disableInlineRuntimeChunk: true, // inline scripts are not allowed in MV3
    disableFilenameHash: true,
    copy: [
      {
        from: './src/manifest.ts',
        to: './manifest.json',
        async transform(_input, filename) {
          const manifest = await evalFile(filename);
          return isDev ? JSON.stringify(manifest, null, 2) : JSON.stringify(manifest);
        },
      },
    ],
    polyfill: 'off',
  },
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  tools: {
    devServer: {
      client: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    webpack(config) {
      assert(
        config.entry &&
          typeof config.entry !== 'string' &&
          typeof config.entry !== 'function' &&
          !Array.isArray(config.entry)
      );

      config.entry = {
        ...config.entry,
        ...Object.fromEntries(scriptEntries.map((entry) => [entry.name, entry.path])),
      };
    },
  },
});

async function evalFile(filename: string) {
  const { default: createJITI } = await import('jiti');
  const jiti = createJITI(__filename, { interopDefault: true });
  return jiti(filename);
}

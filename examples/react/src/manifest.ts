import type { Manifest } from 'webextension-polyfill';

const isDev = process.env.NODE_ENV === 'development';

const manifest: Manifest.WebExtensionManifest = {
  // $schema: 'https://json.schemastore.org/chrome-manifest.json',
  manifest_version: 3,
  name: 'webx-kit-demo',
  version: '0.0.0',
  action: {
    default_popup: 'html/popup/index.html',
  },
  options_ui: {
    page: 'html/options/index.html',
    open_in_tab: true,
  },
  host_permissions: ['<all_urls>'],
  ...(isDev
    ? {
        content_security_policy: {
          extension_pages: "script-src 'self' http://localhost:8080/; object-src 'self' http://localhost:8080/",
        },
      }
    : {}),
};

export default manifest;

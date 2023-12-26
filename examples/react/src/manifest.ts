const isDev = process.env.NODE_ENV === 'development';

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'webx-kit-demo',
  version: '0.0.0',
  action: {
    default_popup: 'popup.html',
  },
  options_ui: {
    page: 'options.html',
    open_in_tab: true,
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['static/js/content-script.js'],
      run_at: 'document_idle',
      // HMR loads hot-update chunks as script elements, causing cross-context issues
      world: 'MAIN',
    },
  ],
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

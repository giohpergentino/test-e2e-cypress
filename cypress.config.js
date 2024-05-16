import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://js-web-app.vercel.app/',
    // Não vai limpar o estado da tela após cada it
    testIsolation: false
  },
});

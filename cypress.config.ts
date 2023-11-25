import { defineConfig } from "cypress"

export default defineConfig({
  env: {
    user: 'administrator@localhost',
    password: 'Administrator1!',
  },
  e2e: {
    defaultCommandTimeout: 15000,
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      config.specPattern = [
          'cypress/e2e/user/user-insert.cy.ts'
      ]
      return config
    },
  },
});

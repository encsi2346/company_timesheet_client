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
          'cypress/e2e/user/user-create.cy.ts',
          'cypress/e2e/user/user-list.cy.ts',
          'cypress/e2e/project/project-create.cy.ts',
          'cypress/e2e/project/project-list.cy.ts'
      ]
      return config
    },
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
});

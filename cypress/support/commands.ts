Cypress.Commands.add('login', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="email-input"]').type(Cypress.env('user'))
    cy.get('[data-testid="password-input"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
})
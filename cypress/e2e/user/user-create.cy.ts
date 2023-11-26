beforeEach(() => {
    cy.intercept('POST', '/api/auth/login').as('createUser')
    cy.login()
})

describe('Create users', () => {
    it('Should create an employee', () => {
        cy.createUser()
    })
})

afterEach(() => {
    cy.logout()
})
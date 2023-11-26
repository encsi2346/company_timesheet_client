beforeEach(() => {
    cy.login()
})

describe('Create users', () => {
    it('Should create an employee', () => {
        cy.createProject()
    })
})

afterEach(() => {
    cy.logout()
})
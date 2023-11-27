beforeEach(() => {
    cy.login()
})

describe('Create users', () => {
    it('Should create a project', () => {
        cy.createProject()
    })
})

afterEach(() => {
    cy.logout()
})
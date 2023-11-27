beforeEach(() => {
    cy.intercept('GET', '/api/Projects').as('listProjects')
    cy.login()
})

describe('List users', () => {
    it('Should list users', () => {
        cy.visit('http://localhost:3000/projects')

        cy.wait('@listProjects').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})

afterEach(() => {
    cy.logout()
})
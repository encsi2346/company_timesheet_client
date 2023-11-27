beforeEach(() => {
    cy.intercept('GET', '/api/Projects').as('listProjects')
    cy.login()
})

describe('List projects', () => {
    it('Should return 200 response code on listing projects', () => {
        cy.visit('http://localhost:3000/projects')

        cy.wait('@listProjects').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})

afterEach(() => {
    cy.logout()
})
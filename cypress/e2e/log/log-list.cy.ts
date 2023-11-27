beforeEach(() => {
    cy.intercept('GET', '/api/AuditLogs').as('listLogs')
    cy.login()
})

describe('List users', () => {
    it('Should return 200 response code on retrieving logs', () => {
        cy.visit('http://localhost:3000/logs')

        cy.wait('@listLogs').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})

afterEach(() => {
    cy.logout()
})
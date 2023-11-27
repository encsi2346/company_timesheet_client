beforeEach(() => {
    cy.intercept('GET', '/api/Employees').as('listUsers')
    cy.login()
})

describe('List users', () => {
    it('Should return 200 response code on listing users', () => {
        cy.visit('http://localhost:3000/users')

        cy.wait('@listUsers').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})

afterEach(() => {
    cy.logout()
})
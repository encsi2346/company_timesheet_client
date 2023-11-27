beforeEach(() => {
    cy.intercept('PUT', '/api/Employees/*').as('editUser')
    cy.login()
})

describe('Edit user', () => {
    it('Should return 200 response code on editing user', () => {
        cy.editUser()

        cy.wait('@editUser').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
})

afterEach(() => {
    cy.logout()
})
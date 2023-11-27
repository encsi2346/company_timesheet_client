beforeEach(() => {
    cy.intercept('POST', '/api/Employees').as('createUser')
    cy.login()
})

describe('Create users', () => {
    const randomSuffix = new Date().getTime();
    it('Should return 200 response code on creating test@te.st employee', () => {
        cy.createUser('test' + randomSuffix + '@te.st', 'Test' + randomSuffix)

        cy.wait('@createUser').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    })
    it('Should return 500 response code on creating test@te.st employee because it already exists', () => {
        cy.createUser('test@te.st', 'Test')
        cy.createUser('test@te.st', 'Test')
        cy.wait('@createUser').then((interception) => {
            expect(interception.response.statusCode).to.equal(500);
        });
    })
})

afterEach(() => {
    cy.logout()
})
beforeEach(() => {
    cy.intercept('POST', '/api/Employees').as('createUser')
    cy.login()
})

describe('Create users', () => {
    it('Should return 200 response code on creating test@te.st employee', () => {
        const randomSuffix = new Date().getTime();
        cy.createUser('test' + randomSuffix + '@te.st')

        cy.wait('@createUser').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
        it('Should be visible after creation', () => {
            //TODO cant do it because the users list does not have any text in it
            /*const randomSuffix = new Date().getTime();
            cy.createUser('test' + randomSuffix + '@te.st')
    
            cy.wait('@createUser').then((interception) => {
                expect(interception.response.statusCode).to.equal(200);
            });*/
        })
    })
    it('Should return 500 response code on creating test@te.st employee because it already exists', () => {
        cy.createUser('test@te.st')
        cy.createUser('test@te.st')
        cy.wait('@createUser').then((interception) => {
            expect(interception.response.statusCode).to.equal(500);
        });
    })
})

afterEach(() => {
    cy.logout()
})
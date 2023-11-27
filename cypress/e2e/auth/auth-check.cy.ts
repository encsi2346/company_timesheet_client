beforeEach(() => {
    cy.intercept('POST', '/api/Users/login*').as('login')
    cy.intercept('GET', '/logout*').as('logout')
})

describe('Login and Logout Tests', () => {
    context('Login', () => {
      it('Should successfully login and set authentication cookie', () => {
        cy.login()

        cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
        
        cy.window().then((win) => {
            const authInfo = win.localStorage.getItem('authInfo');
    
            expect(authInfo).to.contain('accessToken');
            expect(authInfo).to.contain('refreshToken');
        });
        cy.url().should('include', '/dashboard');
      });
  
      it('Should return 401 response code on unsuccessful login attempt', () => {
        cy.login('non@existing.user')

        cy.wait('@login').then((interception) => {
            expect(interception.response.statusCode).to.equal(401);
        });

        cy.window().then((win) => {
            const authInfo = win.localStorage.getItem('authInfo');
    
            expect(authInfo).to.be.null;
        });

        cy.url().should('include', '/login');
        
      });
    });
  
    context('Logout', () => {
      beforeEach(() => {
        cy.login();
      });
  
      it('Should successfully logout and remove authentication cookie', () => {
        cy.logout();

        cy.wait('@logout').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });

        cy.window().then((win) => {
            const authInfo = win.localStorage.getItem('authInfo');
    
            expect(authInfo).to.be.null;
        });
  
        cy.url().should('include', '/login');
        
      });
    });
  });
  
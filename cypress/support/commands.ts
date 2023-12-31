Cypress.Commands.add('login', (user) => {
    cy.visit('http://localhost:3000/login');
    if (user) {
        cy.get('[data-testid="email-input"]').type(user)
    } else {
        cy.get('[data-testid="email-input"]').type(Cypress.env('user'))
    }
    cy.get('[data-testid="password-input"]').type(Cypress.env('password'))
    cy.get('button[type="submit"]').click()
    cy.wait(3000)
})

Cypress.Commands.add('logout', () => {
    cy.wait(3000)
    cy.visit('http://localhost:3000/logout');
})

Cypress.Commands.add('createUser', (email, firstname) => {
    cy.visit('http://localhost:3000/users/new');
    cy.get('[data-testid="first-name-input"]').type(firstname)
    cy.get('[data-testid="family-name-input"]').type('Test')
    cy.get('[data-testid="datepicker-birthDate"]').type('1990.01.01')
    cy.get('[data-testid="birth-place-input"]').type('TestLand')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="phone-input"]').type('123456789')
    cy.get('[data-testid="address-input"]').type('TestLand TestCity, Test Drive -12.')
    cy.get('[data-testid="user-role-input"]').click()
    cy.get('[data-value="2"]').click()
    cy.get('[data-testid="datepicker-hireDate"]').type('2023.01.01.')
    //cy.get('[data-testid="seniority-input"]').click()
    //cy.get('[data-value="Medior"]').click()
    cy.get('[data-testid="gross-hourly-wage-input"]').type('123456')
    //cy.get('[data-testid="gross-value-for-project-input"]').type('123456')
    cy.get('[data-testid="contract-type-input"]').click()
    cy.get('[data-value="1"]').click()
    //cy.get('[data-testid="direct-manager-input"]').click()
    //cy.get('[data-value="Példa Éva"]').click()
    cy.get('[data-testid="datepicker-terminationDate"]').type('2023.01.02.')
    cy.get('[data-testid="position-input"]').click()
    cy.get('[data-value="Project Manager"]').click()
    //cy.get('[data-testid="net-hourly-wage-input"]').type('123456')
    //cy.get('[data-testid="net-value-for-project-input"]').type('123456')
    //cy.get('[data-testid="expected-monthly-hours-input"]').type('12')
    cy.get('[data-testid="save-button"]').click()
})

Cypress.Commands.add('createProject', () => {
    cy.visit('http://localhost:3000/projects/new')
    cy.get('[data-testid="type-input"]').click()
    cy.get('[data-value="0"]').click()
    cy.get('[data-testid="title-input"]').type('TestProject')
    cy.get('[data-testid="datepicker-estimatedStartDate"]').type('2023.01.01.')
    cy.get('[data-testid="datepicker-startDate"]').type('2023.01.01.')
    cy.get('[data-testid="estimated-hours-input"]').type('123456')
    cy.get('[data-testid="estimated-value-input"]').type('123456')
    cy.get('[data-testid="estimated-gross-expenditure-input"]').type('123456')
    //cy.get('[data-testid="project-type-input"]').click()
    cy.get('[data-testid="status-input"]').click()
    cy.get('[data-value="0"]').click()
    cy.get('[data-testid="partner-input"]').type('TestPartner')
    cy.get('[data-testid="datepicker-estimatedEndDate"]').type('2023.01.01.')
    cy.get('[data-testid="datepicker-endDate"]').type('2023.01.01.')
    //cy.get('[data-testid="real-hours-input"]').type('1337')
    //cy.get('[data-testid="real-value-input"]').type('1337')
    cy.get('[data-testid="estimated-gross-expenditure-input"]').type('1337')
    cy.get('[data-testid="save-button"]').click()
    cy.wait(3000)
    cy.visit('http://localhost:3000/projects/')
})

Cypress.Commands.add('createPlannerEvent', () => {
    cy.visit('http://localhost:3000/planner/my-planner')
    cy.get('[data-testid="grid"]').trigger('mousemove', { clientX: 1000, clientY: 1000 });
    cy.get('[data-testid="grid"]').click()
    //cant do it because nothing has data-testid and it is not connected with backend properly
})

Cypress.Commands.add('editUser', () => {
    cy.visit('http://localhost:3000/users')
    cy.get('[data-testid="user-table"]').trigger('mousemove', { clientX: 1000, clientY: 1000 });
    cy.wait(1000)
    cy.get('[data-testid="user-table"]').click()
    cy.get('[data-testid="save-button"]').click()
    cy.get('[data-testid="phone-input"]').type('666666666')
    cy.get('[data-testid="save-button"]').click()
})
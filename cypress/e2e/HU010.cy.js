//Para probar inicio de sesión módulo HU004
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })

    it('Happy Path',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        cy.get('.react-datepicker__input-container > input').type('02/05/2024')
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        //Seleccionar las horas de inicio y fin
        cy.get(':nth-child(3) > select').select('15:00')
        cy.get(':nth-child(4) > select').select('18:00')
        cy.get(':nth-child(1) > label > .counter-HU025 > :nth-child(3)').click()
        cy.get(':nth-child(2) > label > .counter-HU025 > :nth-child(3)').click()
        cy.get(':nth-child(3) > label > .counter-HU025 > :nth-child(3)').click()
        cy.get(':nth-child(7) > input').type('2')
        cy.get('.submit-button-HU025').click()
        cy.get('.botoncito2HU004').click()

    })
    
    it('Aceptar Reservacion sin nada',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.get('.reservation-link').click()
        
        cy.get('.submit-button-HU025').click()
        //Lo siguiente no deberia ser visible
        cy.get('.botoncito2HU004').should('not.be.visible')

    })


    it('Reservacion solo con sala',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        
        cy.get('.submit-button-HU025').click()
        cy.get('.botoncito2HU004').click()
        cy.get('.botoncito2HU004').should('not.be.visible')

    })

    it('Reservacion con sala y fecha',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')

        cy.get('.react-datepicker__input-container > input').type('02/05/2024')
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        cy.get('.submit-button-HU025').click()
        cy.get('.botoncito2HU004').click()
        cy.get('.botoncito2HU004').should('not.be.visible')

    })

    it('Reservacion con sala, fecha y horas invalidas',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        
        cy.get('.react-datepicker__input-container > input').type('02/05/2024')
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        cy.get(':nth-child(3) > select').select('18:00')
        cy.get(':nth-child(4) > select').select('15:00')
        cy.get('.submit-button-HU025').click()
        cy.get('.botoncito2HU004').click()
        cy.get('.botoncito2HU004').should('not.be.visible')

    })
})
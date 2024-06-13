//Para probar reservación de salas tradicional
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/reservar')
    })

    it('Happy Path',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('form > button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        cy.get('.react-datepicker__input-container > input').type('02/08/2024')
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        //Seleccionar las horas de inicio y fin
        cy.get(':nth-child(3) > select').select('15:00')
        cy.get(':nth-child(4) > select').select('18:00')
        cy.get(':nth-child(1) > label > .counter-HU025 > :nth-child(3)').click()
        cy.get(':nth-child(2) > label > .counter-HU025 > :nth-child(3)').click()
        cy.get(':nth-child(3) > label > .counter-HU025 > :nth-child(3)').click()
        cy.wait(2000)
        cy.get('.submit-button-HU025').click()
        cy.wait(2000)
        cy.get('.botoncito2HU004').click()
        cy.wait(2000)


    })
    
    it('Aceptar Reservacion sin nada',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('form > button').click()
        cy.get('.reservation-link').click()
        
        cy.get('.submit-button-HU025').click()
        //Lo siguiente no deberia ser visible
        cy.get('.title').should('be.visible')

    })


    it('Reservacion solo con sala',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('form > button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        
        cy.get('.submit-button-HU025').click()
        cy.get('.title').should('be.visible')

    })

    it('Reservacion con sala y fecha',()=>{
        cy.get(':nth-child(1) > input').type('A00833125');
        cy.get(':nth-child(2) > input').type('cristina123');
        cy.get('form > button').click()
        cy.get('.reservation-link').click()
        cy.get(':nth-child(1) > select').select('Dimension Forge')

        cy.get('.react-datepicker__input-container > input').type('02/05/2024')
        cy.get(':nth-child(1) > select').select('Dimension Forge')
        cy.get('.submit-button-HU025').click()
        cy.get('.title').should('be.visible')

    })

})
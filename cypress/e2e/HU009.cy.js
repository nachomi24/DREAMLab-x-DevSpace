describe('Prueba de visualizacion de Garage Valley', () => {
    beforeEach(() => {  
      cy.visit('http://localhost:5173/')
    })
    
    it('Visualizar el titulo de garage valley', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('.Content-text > :nth-child(1)').should('be.visible')
        
    })

    it('Visualizar la imagen de garage valley', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('.Garage').should('be.visible')
        
    })

    it('Visualizar las tarjetas de las salas dentro de garage valley', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('.Card').should('be.visible')
        
    })

    it('Visualizar el nombre de la sala', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('h2').should('be.visible')
        
    })

    it('Visualizar descripción general de la sala', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('p').should('be.visible')
        
    })

    it('Hacer click en las flechas para visualizar las distintas salas', () => {

        cy.get('.fa-bars').click()
        cy.get(':nth-child(3) > .mina-bold-2').click()
        cy.get('.GV').click()
        cy.get('.Card > :nth-child(3)').click()
        cy.get('.Card').should('be.visible')
        
    })





    
    
    
  
  
  })
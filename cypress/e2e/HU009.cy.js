describe('Prueba de visualizacion de Garage Valley', () => {
    beforeEach(() => {  
      cy.visit('www.dreamlabspace.world')
    })
    
    it('Visualizar el titulo de garage valley', () => {

        cy.get('.GVHU008').click()
        cy.get('.Content-textHU009 > :nth-child(1)').should('be.visible')
        
    })

    it('Visualizar la imagen de garage valley', () => {

        cy.get('.GVHU008').click()
        cy.get('.GarageHU009').should('be.visible')
        
    })

    it('Visualizar las tarjetas de las salas dentro de garage valley', () => {

        cy.get('.GVHU008').click()
        cy.get('.CardHU009').should('be.visible')
        
    })

    it('Visualizar el nombre de la sala', () => {

        cy.get('.GVHU008').click()
        cy.get('h2').should('be.visible')
        
    })

    it('Visualizar descripción general de la sala', () => {

        cy.get('.GVHU008').click()
        cy.get('p').should('be.visible')
        
    })

    it('Hacer click en las flechas para visualizar las distintas salas', () => {

        cy.get('.GVHU008').click()
        cy.get('.CardHU009 > :nth-child(3)').click()
        cy.get('.CardHU009').should('be.visible')
        
    })





    
    
    
  
  
  })
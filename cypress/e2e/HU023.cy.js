//Reservar un taller
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/')
    })

    it('Iniciar sesión',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()  
    })


    it('Seleccionar un taller',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()  
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').click()
        cy.get('.modal-content016-inside-body-content').should('be.visible')
        
    })


    it('Reservar un taller',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()  
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').click()
        cy.get('.modal-content016-inside-body-content').should('be.visible')
        cy.get('.botoncito2016').click()
        cy.get('.popup-button-aceptar').click()
        cy.get('.confirmation-message').should('be.visible')
        cy.get('.reservadoverde016').should('be.visible')

    })


    it('Cancelar un taller',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()  
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').click()
        cy.get('.botoncito2016').click()
        cy.get('.popup-button-aceptar').click()
        cy.get('.confirmation-message').should('be.visible')
        cy.get('.confirmation-message').should('be.visible')

    })






   
})
//Gestionar reservaciones
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
        cy.get('.perfil-icono').click()
        cy.get('.perfil-dropdown-menu > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000040')
        cy.get(':nth-child(2) > input').type('LuiRi123')
        cy.get('form > button').click()
    })

    it('Ver detalles',()=>{
        cy.get(':nth-child(3) > .info-container-HU022 > .tarjeta-reserva-botones-HU022 > :nth-child(1)').click()
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(1)').should('be.visible')
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(2)').should('be.visible')
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(3)').should('be.visible')
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(3)').should('be.visible')
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(4)').should('be.visible')
        cy.get('.modal-content-inside-cuerpoHU022-content-2-HU022 > :nth-child(5)').should('be.visible')
        cy.get('.close-button-HU022').click()
    })

    it('Confirmar solicitud de reserva',()=>{
        cy.get(':nth-child(3) > .info-container-HU022 > .tarjeta-reserva-botones-HU022 > :nth-child(2)').click()
        cy.get('.popup-button-aceptar').click()
    })

    it('Rechazar solicitud de reserva',()=>{
        cy.get(':nth-child(3) > .info-container-HU022 > .tarjeta-reserva-botones-HU022 > :nth-child(2)').click()
        cy.get('.popup-button-cerrar').click()
    })
})
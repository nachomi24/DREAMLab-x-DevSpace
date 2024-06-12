
//Para probar cancelar reservación HU020
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
        cy.get('.perfil-icono').click()
        cy.get('.perfil-dropdown-menu > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('a01368580')
        cy.get(':nth-child(2) > input').type('roberta123')
        cy.get('form > button').click()
    })

    it('probar que pueda visualizar el botón de cancelar',()=>{
        cy.get('.foto-perfil').click()
        cy.get('.perfil-dropdown-menu > a.mina-bold-2').click()
        cy.get(':nth-child(1) > .tarjeta-info > .info-detail-cl-bt > .botoncito1019').should('be.visible')
    })

    it('probar que pueda visualizar el pop up de cancelar',()=>{
        cy.get('.foto-perfil').click()
        cy.get('.perfil-dropdown-menu > a.mina-bold-2').click()
        cy.get(':nth-child(1) > .tarjeta-info > .info-detail-cl-bt > .botoncito1019').click()
        cy.get('.popup-content').should('be.visible')
    })

    it('probar que se pueda confirmar una cancelación',()=>{
        cy.get('.foto-perfil').click()
        cy.get('.perfil-dropdown-menu > a.mina-bold-2').click()
        cy.get(':nth-child(1) > .tarjeta-info > .info-detail-cl-bt > .botoncito1019').click()
        cy.get('.popup-content').should('be.visible')
        cy.get('.popup-button-aceptar').click()
    })
})
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('probar que pueda ir a la seccion de reservar',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('A01027008')
        cy.get('#send_button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible');
        
    })
})
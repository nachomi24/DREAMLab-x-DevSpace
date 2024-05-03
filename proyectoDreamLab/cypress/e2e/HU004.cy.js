//Para probar inicio de sesión módulo HU004
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('matrícula correcta',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Mi matrícula es A01027008')
        cy.get('#send_button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
    })

    it('matrícula incorrecta',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Mi matrícula es A010101')
        cy.get('#send_button').click()
        cy.wait(200)
        cy.contains('Lo siento').should('be.visible');
    })

    it('campo vacío',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Mi matrícula es')
        cy.get('#send_button').click()
        cy.wait(200)
        cy.contains('matrícula').should('be.visible');
    })
})
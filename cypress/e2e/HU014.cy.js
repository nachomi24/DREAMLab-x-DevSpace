//Para probar inicio de sesión módulo HU004
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })
 
    it('Especificar personas válido',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 2 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas')
        cy.get('#button_send_message').click()
        cy.wait(2000)
        cy.get('.modal-content-inside-body-content').should('be.visible');
    })

    it('Especificar personas inválido',()=>{
        
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 2 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 40 personas')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get(':nth-child(5) > .text_wrapper').should('be.visible');
    })

    it('No especificar personas',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 2 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos personas.')
        cy.get('#button_send_message').click()
        cy.wait(2000)
        cy.contains('personas').scrollIntoView();
        cy.contains('personas').should('be.visible');
    })
})
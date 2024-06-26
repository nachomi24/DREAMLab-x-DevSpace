//Para probar inicio de sesión módulo HU0011
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
    })
 
    it('Especificar fecha válida',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 9 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas')
        cy.get('#button_send_message').click()
        cy.wait(5000)
        cy.get('.titulito-header').should('be.visible');
    })

    it('Especificar fecha inválida',()=>{
        
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(2000)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 41 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas')
        cy.get('#button_send_message').click()
        cy.wait(5000)
        cy.get('.titulito-header').should('not.exist');
    })

    it('No especificar fecha',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(2000)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas.')
        cy.get('#button_send_message').click()
        cy.wait(5000)
        cy.get(':nth-child(5) > .text_wrapper > .text').contains('Muchas gracias').should('not.be.visible');
    })
})

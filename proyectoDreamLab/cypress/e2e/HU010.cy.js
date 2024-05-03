//Para probar inicio de sesión módulo HU004
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('Especificar sala existente',()=>{
        
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Quiero reservar la sala DL101')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get(':nth-child(5) > .text_wrapper > .text').should('be.visible');
        cy.contains('Sala: DL101, Nombre: Dimension Forge, Cupo: 10, Recursos: 6 Mouses, 10 Apple Vision Pro, 5 Lectores de huella, Hora de Inicio: 15:00:00, Hora de Fin: 19:00:00')
        .should('be.visible');
    })
    
    it('Especificar sala inexistente',()=>{
        
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala DL122, el 2 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get(':nth-child(5) > .text_wrapper > .text').should('be.visible');
    })

    it('No especificar sala',()=>{
        
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get('#conversation_query').type('Hola, mi matricula es A00835268')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get('#conversation_query').type('Deseo reservar en la sala, el 2 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas')
        cy.get('#button_send_message').click()
        cy.wait(200)
        cy.get(':nth-child(5) > .text_wrapper > .text').should('be.visible');
    })
})
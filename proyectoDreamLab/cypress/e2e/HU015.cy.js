//Para probar la confirmación de una reservación
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/')
    })

    it('probar que se puede visualizar el detalle de confirmación de una reservación',()=>{
        cy.get('.fa-bars').click();
        cy.get(':nth-child(2) > .mina-bold-2').click();
        cy.get('#conversation_query').type('Hola, mi matrícula es A01368580');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 8 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.get('.modal-content-inside-body-content').should('be.visible');
    })

    it('probar que no se puede visualizar el detalle de confirmación de una reservación al dar detalles incompletos',()=>{
        cy.get('.fa-bars').click();
        cy.get(':nth-child(2) > .mina-bold-2').click();
        cy.get('#conversation_query').type('Hola, mi matrícula es A01368580');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 8 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches.');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.contains('requisitos').should('be.visible');        
    })

    it('probar que se puede confirmar una reservación',()=>{
        cy.get('.fa-bars').click();
        cy.get(':nth-child(2) > .mina-bold-2').click();
        cy.get('#conversation_query').type('Hola, mi matrícula es A01368580');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.get('#conversation_query').type('Deseo reservar en la sala DL103, el 8 de mayo de 2024 de 3PM a 5PM. Los recursos serán 3 computadoras y 2 switches. Seremos 2 personas');
        cy.get('#button_send_message').click();
        cy.wait(2000);
        cy.get('.botoncito2').click();
        cy.get('.reservaciones-pend-fut-div-content').should('be.visible');
    })

})
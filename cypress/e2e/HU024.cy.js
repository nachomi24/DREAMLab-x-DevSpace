//Gestionar talleres
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('https://green-ground-02320f30f.5.azurestaticapps.net/')
    })



    it('Agregar taller',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get('.boton-agregar').click()
        cy.get(':nth-child(1) > input').type('TC2008B')
        cy.get(':nth-child(2) > input').type('Taller de programación basica')
        cy.get(':nth-child(3) > input').type('10')
        cy.get(':nth-child(4) > input').type('DL101')
        cy.get(':nth-child(5) > input').type('2021-12-12')
        cy.get(':nth-child(6) > input').type('10:30')
        cy.get(':nth-child(7) > input').type('12:30')
        cy.get(':nth-child(8) > input').type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTYgKWdcH3YQvL-4wkMGvEGIwLsqdUd0KO6h56Op5Gn7TwFkfLLU42FyLEkZrKWhJYR-o&usqp=CAU')
        cy.get('.boton026').click()
        cy.wait(200)
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').should('be.visible')
        
       
    })


    it('Editar taller',()=>{
        cy.get('.fa-bars').click()
        cy.get(':nth-child(2) > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click()
        cy.wait(200)
        cy.get('.foto-perfil').should('be.visible') 
        cy.get('.contenedor-principal-tarjetas026').should('be.visible')
        cy.get(':nth-child(4) > .info-container-HU026 > .tarjeta-reserva026-botones > :nth-child(1)').click()
        cy.get(':nth-child(3) > input').type('2')
        cy.get('.boton026').click()
        cy.wait(200)
        cy.get('.bars-img-navbar-principal').click()
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click()
        cy.get(':nth-child(2) > :nth-child(1) > .tarjeta-img-inside016').should('be.visible')
        

       
    })

    it('Eliminar taller', () => {
        cy.get('.fa-bars').click();
        cy.get(':nth-child(2) > .mina-bold-2').click();
        cy.get(':nth-child(1) > input').type('L00000003');
        cy.get(':nth-child(2) > input').type('Roberto123');
        cy.get('form > button').click();
        cy.wait(200);
        cy.get('.foto-perfil').should('be.visible');
        cy.get('.contenedor-principal-tarjetas026').should('be.visible');
        cy.get(':nth-child(4) > .info-container-HU026 > .tarjeta-reserva026-botones > :nth-child(2)').click();
        cy.get('.popup-content').should('be.visible');
        cy.get('.popup-button-aceptar').click();
        cy.get('.confirmation-message').should('be.visible');
        cy.wait(200);
        cy.get('.bars-img-navbar-principal').click();
        cy.get('.dropdown-menu-2 > :nth-child(1) > .mina-bold-2').click();
    
        // Aquí busca por el nombre del taller específico y verifica que no esté presente
        cy.contains('Taller de programación básica').should('not.exist');
    });
    




   
})
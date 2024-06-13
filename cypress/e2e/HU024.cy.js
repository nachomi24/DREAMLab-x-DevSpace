//Crear talleres
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
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
        cy.get(':nth-child(8) > input').type('https://docpath.com/wp-content/uploads/features-and-advantages-of-virtual-machine-systems.png')
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
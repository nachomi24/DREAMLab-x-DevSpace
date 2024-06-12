//Gestionar reservaciones
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('www.dreamlabspace.world')
        cy.get('.perfil-icono').click()
        cy.get('.perfil-dropdown-menu > .mina-bold-2').click()
        cy.get(':nth-child(1) > input').type('L00000040')
        cy.get(':nth-child(2) > input').type('LuiRi123')
        cy.get('form > button').click()
        cy.wait(2000)
        cy.get('.fa-solid').click()
        cy.get(':nth-child(2) > .mina-bold-2-HU022').click()
    })


    it('Eliminar publicación',()=>{ 
        cy.get(':nth-child(4) > .info-container-HU024 > .tarjeta-reserva024-botones > :nth-child(2)').click()  

    })

    it('Agregar publicación',()=>{ 
        cy.get('.boton-agregar').click()
        cy.get(':nth-child(1) > input').type('Título')
        cy.get(':nth-child(2) > input').type('Mesh Flinders')
        cy.get('textarea').type('What to expect from this transformational technology.')
        cy.get(':nth-child(4) > input').type('https://www.ibm.com/blog/5g-future/')
        cy.get(':nth-child(5) > input').type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNr5WrS2p0-y1xsqNADRUESo7nlyHOlSF-fA&s')
        cy.get(':nth-child(6) > input').type('Wed Mar 13 2024 18:00:00 GMT-0600 (hora estándar central)')
        cy.get('.boton024').click()
    })

    it('Editar publicación',()=>{ 
        cy.get(':nth-child(4) > .info-container-HU024 > .tarjeta-reserva024-botones > :nth-child(1)').click()
        cy.get(':nth-child(1) > input').type('The future of 5G')
        cy.get('.boton024').click()
    })

    it('Visualizar videowall',()=>{ 
        cy.get('.videowall-link > p').click()
    })

    it('Desactivar/Activar publicación',()=>{ 
        cy.get(':nth-child(4) > .estado-publicacion').click()
        cy.wait(4000)
        cy.get(':nth-child(4) > .estado-publicacion').click()
    })
})
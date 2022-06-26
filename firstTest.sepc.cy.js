/// <reference types="cypress" />


describe('Our first suite', () =>{
    //Locators
    it('first test', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')
        
        //by ID
        cy.get('#inputEmail1')

        //by Class Name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by Attribute Name and Value
        cy.get('[placeholder="Email"]')

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]') 

        //by Tag Name , Attribute Name and Value
        cy.get('input[placeholder="Email"]')
        
        //by Two Different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by Tag Name , Attribute with Value , ID , Class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
    })

    //advanced locators
    it('second test', () => {
        
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        //by self-added locator
        cy.get('[data-cy="imputEmail1"]')

        //by Text + Attribute Name and Value
        cy.contains('[status="warning"]','Sign in')

        //find in DOM
        cy.get('#inputEmail3')
        .parents('form') //in HTML code
        .find('button') //find button in form // after parents element call
        .should('contain', 'Sign in') //check that Sign in text present
        .parents('form') //one more time go to form in HTML code
        .find('nb-checkbox') //find checkbox
        .click()

        cy.contains('nb-card','Horizontal form').find('[placeholder="Email"]')

    })

    it('then and wrap methods', () => {
        cy.visit('/')

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')
        
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLablefirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLablefirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card', 'Basic form').then(secondForm => {
            const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
            expect (passwordLabelFirst).to.equal(passwordSecondText)

            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            
        })
            
        })

        })

        it('Invoke command', () => {
            cy.visit('/')
    
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click() 

            //1
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

            //2
            cy.get('[for="exampleInputEmail1"]').then(label => {
                expect(label.text()).to.equal('Email address')
            })

            //3 check if checkbox attribute is adding or not
            cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
                expect(text).to.equal('Email address')
            })

            cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr','class')
            .should('contain','checked')

            //3.1 check if checkbox attribute is adding or not
            // cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            //     expect(text).to.equal('Email address')
            // })

            // cy.contains('nb-card', 'Basic form')
            // .find('nb-checkbox')
            // .click()
            // .find('.custom-checkbox')
            // .invoke('attr','class')
            // .then(classValue => {
            //     expect(classValue).to.contain('checked')
            // })
    
    })

    it.only('assert property, invoke - date picker', () => {
        cy.visit('/')
    
        cy.contains('Forms').click()
        cy.contains('Datepicker').click() 
        
        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('7').click()
            cy.wrap(input).invoke('prop','value').should('contain','Jun 7, 2022')

        })


    })



})

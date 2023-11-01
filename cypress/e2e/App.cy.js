/* globals cy */

describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('opens with Fall CS courses', () => {
        cy.visit('/'); cy.get('[data-cy=course]').should('contain', 'Fall CS');
    });

    it('shows sign in prompt', () => {
        cy.visit('/');
        cy.get('[data-cy=login-prompt]').should('contain', 'Please sign in to continue.');
    });

    it('shows Winter courses when Winter is selected', () => {
        cy.visit('/');
        cy.get('[data-cy=Winter]').click();
        cy.get('[data-cy=course]').should('contain', 'Winter');
    });
});
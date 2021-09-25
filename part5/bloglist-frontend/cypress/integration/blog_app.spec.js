describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get('form');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('mluukkai');
      cy.get('input:last').type('salainen');

      cy.contains('login').click();

      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('input:first').type('edijkstra');
      cy.get('input:last').type('geheim');

      cy.contains('login').click();

      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai',
        password: 'salainen',
      }).then((response) => {
        localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.body)
        );

        cy.createBlog({
          title: 'Types and Tests',
          author: 'Uncle Bob',
          url: 'https://blog.cleancoder.com/uncle-bob/2017/01/13/TypesAndTests.html',
        });
      });
    });

    it('a blog can be created', () => {
      cy.contains('create new blog').click();

      cy.get('.titleInput').type('The Disinvitation');
      cy.get('.authorInput').type('Uncle Bob');
      cy.get('.urlInput').type(
        'https://blog.cleancoder.com/uncle-bob/2020/09/12/TheDisinvitation.html'
      );

      cy.get('#createBlogButton').click();

      cy.contains('a new blog The Disinvitation added');
    });

    it('users can like a blog', () => {
      cy.contains('view').click();
      cy.contains('like').click();
    });

    it('user who created a blog can delete it', () => {
      cy.contains('view').click();
      cy.contains('delete').click();
    });

    it('the blogs are ordered according to likes with the blog with the most likes being first', () => {
      cy.createBlog({
        title: 'Pickled State',
        author: 'Uncle Bob',
        url: 'https://blog.cleancoder.com/uncle-bob/2018/06/06/PickledState.html',
      });

      cy.createBlog({
        title: 'REPL Driven Design',
        author: 'Uncle Bob',
        url: 'https://blog.cleancoder.com/uncle-bob/2020/05/27/ReplDrivenDesign.html',
      });

      cy.contains('Types and Tests').as('firstBlog');
      cy.contains('Pickled State').as('secondBlog');
      cy.contains('REPL Driven Design').as('thirdBlog');

      cy.get('@firstBlog').contains('view').click();
      cy.get('@firstBlog').contains('like').click();

      cy.get('@secondBlog').contains('view').click();
      cy.get('@secondBlog').contains('like').click();
      cy.get('@secondBlog').contains('like').click();

      cy.get('@thirdBlog').contains('view').click();
      cy.get('@thirdBlog').contains('like').click();
      cy.get('@thirdBlog').contains('like').click();
      cy.get('@thirdBlog').contains('like').click();

      cy.get('.blog').then((blogs) => {
        cy.wrap(blogs[0]).get('.likeButton').parent().should('contain', 3);
        cy.wrap(blogs[1]).get('.likeButton').parent().should('contain', 2);
        cy.wrap(blogs[2]).get('.likeButton').parent().should('contain', 1);
      });
    });
  });
});

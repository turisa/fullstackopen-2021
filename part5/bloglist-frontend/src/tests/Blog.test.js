import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';

describe('<Blog />', () => {
  let blog;
  let user;
  let component;
  let mockUpvoteBlog;
  let mockDeleteBlog;

  beforeEach(() => {
    blog = {
      title: 'The Disinvitation',
      author: 'Uncle Bob',
      url: 'https://blog.cleancoder.com/uncle-bob/2020/09/12/TheDisinvitation.html',
      likes: '0',
      user: {
        name: 'John',
        username: 'john',
      },
    };

    user = {
      username: 'alice',
    };

    mockUpvoteBlog = jest.fn();
    mockDeleteBlog = jest.fn();

    component = render(
      <Blog
        blog={blog}
        user={user}
        upvoteBlog={mockUpvoteBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
  });

  test('the component renders the title and author, but does not render the url or number of likes', () => {
    let div;

    div = component.container.querySelector('.blog');

    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);

    expect(div).toHaveStyle('display: block');

    div = component.container.querySelector('.togglableBlogView');

    expect(div).toHaveStyle('display: none');
  });

  test('the url and number of likes are shown when the view button has been clicked', () => {
    let div;

    const button = component.getByText('view');
    fireEvent.click(button);

    div = component.container.querySelector('.togglableBlogView');

    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);

    expect(div).toHaveStyle('display: block');
  });

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const button = component.getByText('like');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockUpvoteBlog.mock.calls).toHaveLength(2);
  });
});

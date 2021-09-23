import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

describe('<BlogForm />', () => {
  test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockCreateBlog = jest.fn();

    const component = render(<BlogForm createBlog={mockCreateBlog} />);

    const blogObject = {
      title: 'The Disinvitation',
      author: 'Uncle Bob',
      url: 'https://blog.cleancoder.com/uncle-bob/2020/09/12/TheDisinvitation.html',
    };

    const form = component.container.querySelector('form');

    const titleInput = component.container.querySelector('.titleInput');
    const authorInput = component.container.querySelector('.authorInput');
    const urlInput = component.container.querySelector('.urlInput');

    fireEvent.change(titleInput, {
      target: {
        value: blogObject.title,
      },
    });

    fireEvent.change(authorInput, {
      target: {
        value: blogObject.author,
      },
    });

    fireEvent.change(urlInput, {
      target: {
        value: blogObject.url,
      },
    });

    fireEvent.submit(form);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    console.log(mockCreateBlog.mock.calls);
    expect(mockCreateBlog.mock.calls[0][0]).toEqual(blogObject);
  });
});

import React from 'react';

import { useField } from '../hooks/index';

const CreateNew = ({ addNew }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = () => {
    content.clear();
    author.clear();
    info.clear();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={(e) => content.onChange(e)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={(e) => author.onChange(e)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            onChange={(e) => info.onChange(e)}
          />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

export default CreateNew;

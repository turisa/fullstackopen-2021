import React from 'react';

const Header = ({ text }) => {
  return <h1>text</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  return (
    <div className="App">
      const header = "give feedback"
      <Header text={header}></Header>
    </div>
  );
};

export default App;

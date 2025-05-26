import React from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
  return (
    <div className="App">
      <h1>Mini Message Board</h1>
      <MessageForm />
      <MessageList />
    </div>
  );
}

export default App;
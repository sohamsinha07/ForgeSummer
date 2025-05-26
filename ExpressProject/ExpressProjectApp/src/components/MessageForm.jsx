import React, { useState } from 'react';
import axios from 'axios';

function MessageForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/messages`, { username, message });
    setUsername('');
    setMessage('');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" required />
      <button type="submit">Post</button>
    </form>
  );
}

export default MessageForm;
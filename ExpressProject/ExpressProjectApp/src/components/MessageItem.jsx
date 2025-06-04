import React from 'react';
import axios from 'axios';

function MessageItem({ message }) {
  const handleDelete = async () => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/messages/${message.id}`);
    window.location.reload();
  };

  return (
    <div style={{ border: '1px solid gray', margin: '8px', padding: '8px', color: white }}>
      <strong>{message.username}</strong>: {message.message}
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
    </div>
  );
}

export default MessageItem;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageItem from './MessageItem';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/messages`);
      setMessages(res.data);
    }
    fetchMessages();
  }, []);

  return (
    <div>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export default MessageList;
import React, { useEffect, useState } from 'react';
import { getPoll, addResponse } from './polls';


function App() {
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPoll() {
      try {
        const data = await getPoll();
        setQuestion(data.Question);
        setResponses(data.Responses || {});
      } catch (err) {
        console.error(err);
        setQuestion("Error loading poll.");
      } finally {
        setLoading(false);
      }
    }
    loadPoll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const updated = await addResponse(input);
      setResponses(updated);
      setInput("");
    } catch (err) {
      console.error("Failed to add response:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{question}</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {Object.entries(responses).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

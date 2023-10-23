import { useState, useEffect } from 'react';

function QueueComponent() {
  const [queue, setQueue] = useState<number[]>([]);

  // Add integer to queue
  const addIntToQueue = (int: number) => {
    setQueue([...queue, int]);
  };

  // Remove integer from queue
  const removeIntFromQueue = () => {
    setQueue(queue.slice(1));
  };

  // Notify next user in line
  useEffect(() => {
    const timer = setInterval(() => {
      if (queue.length > 0) {
        const nextInt = queue[0];
        alert(`It's your turn, ${nextInt}!`);
        removeIntFromQueue();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [queue]);

  return (
    <div>
      <h1>Queue Management System</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const int = parseInt(e.target.elements.int.value);
        addIntToQueue(int);
      }}>
        <label htmlFor="int">Integer:</label>
        <input type="number" id="int" name="int" required />
        <button type="submit">Add to Queue</button>
      </form>
      <h2>Current Queue:</h2>
      <ul>
        {queue.map((int, index) => (
          <li key={index}>{int}</li>
        ))}
      </ul>
    </div>
  );
}

export default QueueComponent;
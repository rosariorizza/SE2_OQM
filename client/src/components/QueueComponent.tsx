import { useState, useEffect } from 'react';

function QueueComponent() {
  const [queue, setQueue] = useState([]);

  // Add user to queue
  const addUserToQueue = (user) => {
    setQueue([...queue, user]); //TODO add effective user, for now it's just an "any" type
  };

  // Remove user from queue
  const removeUserFromQueue = () => {
    setQueue(queue.slice(1));
  };

  // Notify next user in line
  useEffect(() => {
    const timer = setInterval(() => {
      if (queue.length > 0) {
        const nextUser = queue[0];
        alert(`It's your turn, ${nextUser.name}!`);
        removeUserFromQueue();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [queue]);

  return (
    <div>
      <h1>Queue Management System</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const name = user.name; //TODO
        const email = user.email; //TODO
        addUserToQueue({ name, email });
      }}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <button type="submit">Add to Queue</button>
      </form>
      <h2>Current Queue:</h2>
      <ul>
        {queue.map((user, index) => (
          <li key={index}>{user.name} ({user.email})</li> //TODO
        ))}
      </ul>
    </div>
  );
}

export default QueueComponent;
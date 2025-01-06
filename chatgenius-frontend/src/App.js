import React, { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  useEffect(() => { // React Hook that runs side effects in functional components. 
                    //  We use it to manage the Socket.IO connection.
    const socket = io('http://localhost:4000'); // Connect to your backend server running on port 4000

    socket.on('connect', () => {
      console.log('Connected to server'); // Log on successful connection
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server'); // Log on disconnection
    });

    // Clean up (close) the connection when the component unmounts, preventing memory leaks
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency nsures that the effect runs only once 
          // when the component mounts and that the cleanup function 
          // runs when the component unmounts.

  return (
    <div>
      <h1>ChatGenius</h1>
      {/* We will add the chat UI components here later */}
    </div>
  );
}

export default App;

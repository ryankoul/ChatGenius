import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null); // Store socket instance initialized to null inside component's state, so it persists across re-renders
  const [message, setMessage] = useState(''); // State variable initialized to an empty string to store input field value
  const [messages, setMessages] = useState([]); // State variable initialized to an empty array to store received messages
  
  useEffect(() => { // React Hook that runs side effects in functional components. 
                    //  We use it to manage the Socket.IO connection.
    const newSocket = io('http://localhost:4000'); // Connect to your backend server running on port 4000
    setSocket(newSocket); // Update the socket state variable with the newSocket instance

    newSocket.on('connect', () => {
      console.log('Connected to server'); // Log on successful connection
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server'); // Log on disconnection
    });

    // Clean up (close) the connection when the component unmounts, preventing memory leaks
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency ensures that the effect runs only once 
          // when the component mounts and that the cleanup function 
          // runs when the component unmounts.
  
  // Listen for incoming messages from the server.
  useEffect(() => {
    // runs whenever the socket state variable changes (which happens when the socket is initialized)
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Add the new message to the messages array
      });
    }
  }, [socket]); // Run this effect whenever the 'socket' dependency changes
  
  // Called when the user types in the input field
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message); // Send message content (event named message) to the server
      setMessage(''); // Clear the input field after message is sent
    }
  };

  return (
    // Applied to the main container, this creates a vertical layout where elements are stacked from top to bottom.
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1>ChatGenius</h1>

      {/* Messages container on bottom of page */}
      {/* flex: 1 allows the messages container to take up the available space, pushing the input container to the bottom. */}
      {/* overflowY: 'auto' makes the messages area scrollable when the content overflows. */}
      <div style={{ flex: 1, overflowY: 'auto', borderBottom: '1px solid #ccc' }}>
        {messages.map((msg, index) => (
          // whiteSpace: 'pre-wrap' preserves whitespace and allows lines to wrap when they reach the end of the container in the message content
          <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
            {msg}
          </div>
        ))}

      {/* Input and button container*/}
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Enter your message"
          style={{ flex: 1, marginRight: '10px', padding: '8px' }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
  );
}

export default App;

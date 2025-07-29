import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [setSocket]);

  const handleJoinRoom = () => {
    socket.emit('joinRoom', room);
  };

  const handleSendMessage = () => {
    socket.emit('chatMessage', { room, message });
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter room code"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;

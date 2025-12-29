import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Director', text: 'Hello! Interested in your profile.', time: '10:30 AM' },
    { id: 2, sender: 'You', text: 'Thank you! I\'d love to discuss the role.', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with Director</h2>
          <Link to="/actor/dashboard">Back to Dashboard</Link>
        </div>
        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
import React, {useState} from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, seMessages] = useState([]);

  const handleSend = (text) => {
    const message = {id: text, from: 'you', text}
    seMessages(messages.concat(message))
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;

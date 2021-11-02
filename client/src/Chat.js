import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { messagesQuery } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { loading, error, data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];

  const handleSend = (text) => {
    // TODO MUTATION
  };

  // if(loading) return <Spinner />
  // if(error) return <Error />
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

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import {
  addMessageMutation,
  messageAddedSubscription,
  messagesQuery,
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      // setMessages(messages.concat(subscriptionData.data.messageAdded));
      // we're writting on the apollo cache "client.cache"
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  const [addMessage, { loading, error, data, called }] =
    useMutation(addMessageMutation);

  // see the latest message from the subscription
  // const { loading, error, data } = useQuery(messagesQuery);
  // const {data} = useSubscription(messageAddedSubscription)
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation);
  // const messages = data ?[ data.messagesAdded] : [];

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text } } });
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

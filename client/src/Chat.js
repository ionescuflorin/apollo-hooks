import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import {
  addMessageMutation,
  messageAddedSubscription,
  messagesQuery,
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function useChatMessages() {
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

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}

const Chat = ({ user }) => {
  const { messages, addMessage } = useChatMessages();

  // see the latest message from the subscription
  // const { loading, error, data } = useQuery(messagesQuery);
  // const {data} = useSubscription(messageAddedSubscription)
  // const [addMessage, {loading, error, data, called}] = useMutation(addMessageMutation);
  // const messages = data ?[ data.messagesAdded] : [];


  // if(loading) return <Spinner />
  // if(error) return <Error />
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
};

export default Chat;

import React, { Component } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

class Chat extends Component {
  state = {messages: []};
  subscription = null;

  async componentDidMount() {
    // instead we'll use useQuery
    const messages = await getMessages();
    this.setState({messages});
    // instead we'll use useSubscriitpion
    this.subscription = onMessageAdded((message) => {
      this.setState({messages: this.state.messages.concat(message)});
    })
  }

  componentWillUnmount() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async handleSend(text) {
    // instead we'll use useMutatuin
    await addMessage(text);
  }

  render() {
    const {user} = this.props;
    const {messages} = this.state;
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Chatting as {user}</h1>
          <MessageList user={user} messages={messages} />
          <MessageInput onSend={this.handleSend.bind(this)} />
        </div>
      </section>
    );
  }  
}

export default Chat;

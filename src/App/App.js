import React, { useState } from 'react';
import Composer from '../Composer';
import Stage from '../Stage';
import './App.scss';

const shortId = require('shortid');
const defaultProps = {
  message: '',
  name: '',
  id: '',
}

function App(props = defaultProps) {
  const msgStorage = window.localStorage;

  const [messagePayload, setMessagePayload] = useState(defaultProps);
  const [msgList, setMessageList] = useState([]);

  const getMessages = () => {
    const msgArray = msgStorage.getItem('messageList');
    setMessageList(JSON.parse(msgArray));
  }

  const setMessages = () => {
    msgList.push(messagePayload);
    const tempStr = JSON.stringify(msgList);
    msgStorage.setItem('messageList', tempStr);
  }

  // We're using local storage initially to hold our messages for retrieval by another user (in same browser)
  // TODO: Replace local storage with a real backend? possibly socketIO?
  function handlePostMessage(msg) {
    getMessages();
    setMessagePayload({
      message: msg,
      name: name,
      id: shortId.generate(),
    });
    setMessages();
  }

  const messages = msgList;
  const { name } = props;
  return (
    <div id="app">
      <Stage
        name={name}
        messages={messages}
      />
      <Composer
        name={name}
        newMessage={(msg, name) => {
          handlePostMessage(msg);
        }} />
    </div>
  );
}

export default App;

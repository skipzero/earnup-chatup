import React, { useEffect, useRef } from 'react';
import './Stage.scss';

function Stage(props) {
  const { messages, name } = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(scrollToBottom, [messages]);

  return <div id='stage'>
    {messages.map((msg) => {
      let classList = msg.name === name ? 'message sent' : 'message';
      return <li key={msg.id} >
        <div className={classList}>
          {msg.message}
        </div>
        {msg.name}
      </li>
    })}
    <div ref={messagesEndRef} />
  </div>
}

export default Stage;

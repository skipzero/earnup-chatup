import React, { useEffect, useRef } from 'react';
import './Stage.scss';

// React Hooks! :)
function Stage(props) {
  const { messages, uName } = props;

  // this scrolls down to newest messages on bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(scrollToBottom, [messages]);

  return <div id='stage'>
    {messages.map((msg) => {
      const { name, message, myMessage } = msg;

      if (message === '') { // get rid of any empty messages
        return null;
      }

      let classList = myMessage ? 'message-wrapper sent' : 'message-wrapper';
      return <li key={msg.id} className={classList}>
        <div className='col'>
          <div className='message'>
            {message}
          </div>
          <div className='name'>
            {name}
          </div>
        </div>
      </li>
    })}
    <div ref={messagesEndRef} />
  </div>
}

export default Stage;

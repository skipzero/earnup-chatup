import React, { useEffect, useRef } from 'react';
import './Stage.scss';

function Stage(props) {
  const { messages, uName } = props;
  console.log("Stage", props)
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(scrollToBottom, [messages]);

  return <div id='stage'>
    {messages.map((msg) => {
      const { name, message } = msg;
      console.log('MSG::', msg)
      let classList = name === uName ? 'message-wrapper sent' : 'message-wrapper';
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

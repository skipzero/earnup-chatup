import React, { useState } from 'react';
import './Composer.scss';

function Composer(props) {
  const { newMessage } = props;
  const [messageValue, setMessageValue] = useState('');

  const sendMessage = async (msg) => {
    newMessage(msg);
  }


  return <div id='composer'>
    <div className='input'>
      <input
        type='text'
        className='compose-input'
        onChange={e => {
          setMessageValue(e.target.value);
        }}
      />
      <button
        type='submit'
        className='msg-submit'
        onClick={() => {
          sendMessage(messageValue);
        }}
      >Send</button>
    </div>
  </div>
}

export default Composer;

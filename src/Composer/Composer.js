import React, { useState } from 'react';
import './Composer.scss';

function Composer(props) {
  const { newMessage } = props;
  const [messageValue, setMessageValue] = useState('');

  const sendMessage = async () => {
    const input = document.querySelector('.msg-submit');
    console.log('SUBMIT::', input)
    await newMessage(messageValue);
    setMessageValue('');
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
          sendMessage();
        }}
      >Send</button>
    </div>
  </div>
}

export default Composer;

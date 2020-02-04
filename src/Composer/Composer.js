import React, { useState } from 'react';
import './Composer.scss';

// React Hooks!
function Composer(props) {
  const { newMessage } = props;
  const [messageValue, setMessageValue] = useState('');

  const sendMessage = async () => {
    await newMessage(messageValue); // pass message to App to handle posting to server
    setMessageValue(''); // reset the message input field
  }

  // render our message input and submit button
  return <div id='composer'>
    <div className='input'>
      <form onSubmit={sendMessage} >
        <input
          type='text'
          className='compose-input'
          placeholder='Enter message here...'
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
      </form>
    </div>
  </div>
}

export default Composer;

import React, { Component } from 'react';

import axios from 'axios';

import Composer from '../Composer';
import Stage from '../Stage';
import './App.scss';

const shortId = require('shortid');

// our parent component. if this were using redux, this would be our container,
// allowing for children to have access to state as needed
class App extends Component {
  constructor(props) {
    super(props);
    this.submitUserName = this.submitUserName.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // initial state
    this.state = {
      msgList: [],
      uName: '',
      msg: '',
      url: '/api/messages',
    }
  }

  // we get our messages and check local storage for a user name.
  componentWillMount() {
    this.getMessages();
    this.getUserLocalStorage();
  }

  // if we didn't have a use name, this will set it in state and local storage so it persists
  submitUserName(e) {
    e.preventDefault();
    const input = document.querySelector('input.name-input');
    this.setUserLocalStorage(input.value); // local storage bit

    this.setState({
      uName: input.value,
    })
  }

  // retreives user name from local storage, if one exists
  getUserLocalStorage() {
    const uName = window.localStorage.getItem('userName');
    if (uName) {
      this.setState({
        uName,
      })
    }
  }

  // sets user name if one didn't already exist
  setUserLocalStorage(name) {
    window.localStorage.setItem('userName', name)
  }

  // retrieve messages from server/DB using our API
  async getMessages() {
    const { url } = this.state;
    try {
      await axios.get(url)
        .then(d => {
          this.setState({
            msgList: d.data,
          });
        })
    }
    catch (error) {
      // try again after half a second if fails due to race condition.
      // occasionally, we'll get a hickup getting our messages from the server.
      console.log('retrying initial data request...');
      setTimeout(async () => {
        await this.getMessages();
      }, 500);
    }
  }

  // our onChange handler updates state when a change in our input
  handleChange(e) {
    e.preventDefault();
    console.log('On Change:::', e.target)
    const input = e.target.value;
    this.setState({ [e.target.name]: input });
  }

  // posts our message to server using our API.
  async handlePostMessage(msg) {
    // check for empties and return early in the event we have any
    if (msg === '') {
      console.error('ERROR: NNo empty messages allowed') // TODO: surface warning to user
      return null;
    }
    const { uName, url } = this.state;
    const payload = {
      name: uName,
      message: msg,
      id: shortId.generate(),
    }
    // post our message to server and reload our messages with new one included.
    await axios.post(url, payload)
      .then(this.getMessages());
  }

  render() {
    const { msgList, uName } = this.state;
    // if we don't have a user name, we show the input to add one.
    return <>
      {
        !uName ?
          (
            <div id="login" >
              <div className="login-wrapper">
                <form onSubmit={(name) => {
                  this.submitUserName(name)
                }}>
                  <input type='text'
                    placeholder='Type your username...'
                    onKeyDown={(e) => {
                      if (e.code === 'Enter') {
                        console.log('Keydown', e)
                        this.submitUserName(e.target.value)
                      }
                    }}
                    onChange={this.handleChange}
                    className='name-input'
                  />
                  <input
                    type='submit'
                    value='Join Chat!'
                    onClick={(name) => {
                      this.submitUserName(name)
                    }}
                    className='btn btn-submit login'
                  />
                </form>
              </div>
            </div>
          ) : (
            <div id="app">
              <Stage
                uName={uName}
                messages={msgList}
              />
              <Composer
                name={uName}
                newMessage={(msg) => {
                  this.handlePostMessage(msg);
                }} />
            </div>
          )
      }
    </>
  }
}

export default App;

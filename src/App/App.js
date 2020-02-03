import React, { Component } from 'react';

import axios from 'axios';
import io from 'socket.io-client';

import Composer from '../Composer';
import Stage from '../Stage';
import './App.scss';

const shortId = require('shortid');

class App extends Component {
  constructor(props) {
    super(props);
    this.submitUserName = this.submitUserName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      msgList: [],
      uName: '',
      msg: '',
      url: '/api/messages',
    }
    this.socket = io('localhost:3001');
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({
        msgList: [...this.state.msgList, data]
      });
      console.log(this.state.msgList);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        name: this.state.uName,
        message: this.state.msg,
        id: shortId.generate(),
      })
      this.setState({ message: '' });

    }
  }

  componentWillMount() {
    this.getMessages();
  }

  submitUserName(e) {
    e.preventDefault();
    const input = document.querySelector('input.name-input');
    console.log('user submit:', input)
    this.setState({
      uName: input.value,
    })
  }

  async getMessages() {
    const { url } = this.state;
    await axios.get(url)
      .then(d => {
        console.log('DATA::', d)
        this.setState({
          msgList: d.data,
        });
      })
  }

  handleChange(e) {
    e.preventDefault();
    console.log('On Change:::', e.target.value)
    const input = e.target.value;
    this.setState({ [e.target.name]: input });
  }

  async handlePostMessage(msg) {
    const { uName, url } = this.state;
    const payload = {
      name: uName,
      message: msg,
      id: shortId.generate(),
    }
    this.socket.emit('SEND_MESSAGE', payload);
    this.setState(payload)

    await axios.post(url, payload)
      .then(this.getMessages());
  }

  render() {
    const { msgList, uName } = this.state;
    return <>
      {
        !uName ?
          (
            <div id="login" >
              <div className="login-wrapper">
                <input type='text'
                  placeholder='Type your username...'
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
                newMessage={(msg, name) => {
                  this.handlePostMessage(msg);
                }} />
            </div>
          )
      }
    </>
  }
}

export default App;

const express = require('express');
const bodyParser = require('body-parser');

const { Messages } = require('./model');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// our API routes. Get to retreive messages
app.get('/api/messages', async (_req, res) => {
  const messages = await Messages.findAll();
  return res.json(messages);
});

// Post to add a new message
app.post('/api/messages', async (req, res) => {
  const temp = await Messages.create(req.body);
  return res.json(temp);
});

module.exports = app;

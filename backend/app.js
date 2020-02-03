const express = require('express');
const { Messages } = require('./model');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/messages', async (_req, res) => {
  const messages = await Messages.findAll();
  return res.json(messages);
});
/*
app.post('/users/', (request, response) =>{
    knex('users').insert(request.body)
    .then(function(id){
          knex('users').where({id:id[0]})
          .then(results=>{response.send(results[0])});
    });
});*/
app.post('/api/messages', async (req, res) => {
  const temp = await Messages.create(req.body);
  return res.json(temp);
});

module.exports = app;

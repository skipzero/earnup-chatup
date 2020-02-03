const app = require('./app');
const socket = require('socket.io');

init();

async function init() {
  const server = app.listen(3001, () => {
    console.log('Express App Listening on Port 3001');
  });
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log(socket.id);
  });

}

const app = require('./app');

init();

async function init() {
  app.listen(3001, () => {
    console.log('Express App Listening on Port 3001');
  });
}

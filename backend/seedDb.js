const { Messages } = require('./model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create table
  await Messages.sync({ force: true });
  // insert data
  await Promise.all([
    Messages.create({
      name: 'bigSmiles99',
      message: 'Who\'s on first?',
      id: 'ck8RVv7S',
      myMessage: false,
    }),
    Messages.create({
      name: 'forty9er-138',
      message: 'who?',
      id: 'efZ_g5LX',
      myMessage: false,
    }),
    Messages.create({
      name: 'MarcOly',
      message: 'that\'s right, who IS on first',
      id: 'UHpe_d_K',
      myMessage: false,
    }),
    Messages.create({
      name: 'gringo',
      message: 'I don\'t know is on second',
      id: 'hxZMF6qr',
      myMessage: false,
    })
  ]);
}

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
      message: 'this is a message for the others... watch out for the bump.',
      id: 'ck8RVv7S',
    }),
    Messages.create({
      name: 'forty9er-138',
      message: 'what bump? I don\'t see a bump!',
      id: 'efZ_g5LX',
    }),
    Messages.create({
      name: 'MarcOly',
      message: 'OI! that bump. The one in the road!',
      id: 'UHpe_d_K',
    }),
    Messages.create({
      name: 'gringo',
      message: 'that\'s not a bump, that\'s a hill. ',
      id: 'hxZMF6qr',
    })
  ]);
}

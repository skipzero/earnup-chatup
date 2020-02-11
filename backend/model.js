const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

// our model for messages, sequelize then inserted in our DB.
class Messages extends Sequelize.Model { }
Messages.init(
  {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    myMessage: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Messages'
    // options
  }
);

module.exports = {
  sequelize,
  Messages
};

const Sequelize = require('sequelize');

// const sequelize = new Sequelize('tracnghi_trac_nghiem', 'tracnghi_tracnghi', 'NA0xX5l+ykU30.', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

const sequelize = new Sequelize('quizzes', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

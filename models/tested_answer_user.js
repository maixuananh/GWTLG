const { Sequelize, sequelize } = require('./index');
const Tested = require('./tested');
const User = require('./users');

const TestedAnswerUser = sequelize.define('tested_answer_users', {
    id_tested_answer_user: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    id_user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_tested: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

User.hasMany(TestedAnswerUser, { foreignKey: 'id_user' });
Tested.hasMany(TestedAnswerUser, { foreignKey: 'id_tested' });

module.exports = TestedAnswerUser;

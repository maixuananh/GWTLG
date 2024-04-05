const { Sequelize, sequelize } = require('./index');

const Answer = sequelize.define('answer', {
    id_dapan: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    id_cauhoi: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    is_true: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    noi_dung: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Answer;

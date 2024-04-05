const { Sequelize, sequelize } = require('./index');

const Class = sequelize.define('classes', {
    ma_lop: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    ten_lop: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ma_vao_lop: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Class;

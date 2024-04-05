const { Sequelize, sequelize } = require('./index');
const User = require('./users');
const Class = require('./classes');

const ClassUser = sequelize.define('class_users', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nguoi_dung_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ma_lop: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    permission: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.hasMany(ClassUser, { foreignKey: 'nguoi_dung_id' });
Class.hasMany(ClassUser, { foreignKey: 'ma_lop' });

module.exports = ClassUser;

const { Sequelize, sequelize } = require('./index');
const User = sequelize.define('user', {
    nguoi_dung_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    ten_dang_nhap: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mat_khau: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;

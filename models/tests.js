const { Sequelize, sequelize } = require('./index');

const Test = sequelize.define('tests', {
    de_thi_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    ten_de_thi: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    thoi_gian_lam_bai: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    id_malop: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Test;

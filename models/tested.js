const { Sequelize, sequelize } = require('./index');

const Tested = sequelize.define('testeds', {
    id_bai_thi: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    nguoi_dung_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_de_thi: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Tested;

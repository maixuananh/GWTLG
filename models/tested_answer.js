const { Sequelize, sequelize } = require('./index');

const TestedAnswer = sequelize.define('tested_answers', {
    id_dap_an_bai_thi: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    id_bai_thi_da_nop: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_cau_tra_loi: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = TestedAnswer;

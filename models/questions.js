const { Sequelize, sequelize } = require('./index');

const Question = sequelize.define('question', {
    cau_hoi_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    noi_dung_cau_hoi: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id_dethi: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


module.exports = Question;

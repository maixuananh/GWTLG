const { Sequelize, sequelize } = require('./index');
const Test = require('./tests');
const Tested = require('./tested');
const User = require('./users');

const GradePoint = sequelize.define('grade_points', {
    gradePointId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    testId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    testedId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    isPass: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    correctCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
});

User.hasMany(GradePoint, { foreignKey: 'userId' });
Test.hasOne(GradePoint, { foreignKey: 'testId' });
Tested.hasOne(GradePoint, { foreignKey: 'testedId' });
Tested.hasOne(GradePoint, { foreignKey: 'testedId' });

module.exports = GradePoint;
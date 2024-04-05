const GradePoint = require('../models/gradepoint');
const Utils = require('../utils/utils');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const Tested = require('../models/tested');
const TestedAnswer = require('../models/tested_answer');
const Test = require('../models/tests');
const User = require('../models/users');

class GradeFunction {
    static async getGradeByTest(req, res) {
        try {
            const grade_list = await GradePoint.findAll({
                where: {
                    testId: req.body.testId
                },
                attribute: ['userId']
            });
            const users = await User.findAll({
                where: {
                    nguoi_dung_id: grade_list.map(data => data = data.userId)
                }
            });

            const combinedData = grade_list.map(grade => {
                const userData = users.find(user => user.nguoi_dung_id === grade.userId);
                return {
                    gradePointId: grade.gradePointId,
                    testId: grade.testId,
                    testedId: grade.testedId,
                    userId: grade.userId,
                    total: grade.total,
                    isPass: grade.isPass,
                    correctCount: grade.correctCount,
                    username: userData ? userData.ten_dang_nhap : null,
                };
            });
            return res.status(200).send({
                data: combinedData,
                status: 200,
                message: 'get grade by test success'
            });
        } catch (err) {
            console.log('err get grade', err);
            return res.status(200).send({
                data: null,
                status: 401,
                message: 'get grade by test fail'
            });
        }

    }

    static async createGradeByTestId(req, res) {
        try {
            const { testId } = req.body;
            const find_grade_available = await GradePoint.findOne({
                where: {
                    testId: testId
                }
            });
            if (find_grade_available) {
                return res.status(200).send({
                    message: 'create fail it available',
                    data: null,
                    status: 401
                });
            }
            const tested_list = await Tested.findAll({
                where: {
                    id_de_thi: testId
                }
            });
            // vòng lặp số bài thi
            for (let tested of tested_list) {
                const answers = await TestedAnswer.findAll({
                    where: {
                        id_bai_thi_da_nop: tested.id_bai_thi
                    }
                });
                let count = 0;
                for (let answer_in_test of answers) {
                    const answer_validate = await Answer.findOne({
                        where: {
                            id_dapan: answer_in_test.id_cau_tra_loi
                        }
                    });

                    //kiểm tra kết quả
                    if (answer_validate.is_true) count++;
                }
                const gradePointId = Utils.createID('gradePointId');
                const questions = await Question.findAll({
                    where: {
                        id_dethi: testId
                    }
                });
                const total = count / questions.length * 10;
                await GradePoint.create({
                    gradePointId: gradePointId,
                    testId: testId,
                    testedId: tested.id_bai_thi,
                    userId: tested.nguoi_dung_id,
                    total: total,
                    isPass: total >= 5 ? 1 : 0,
                    correctCount: count
                });
                const list_grade_point = await GradePoint.findAll({
                    where: {
                        testId: testId
                    }
                });
                const users = await User.findAll({
                    where: {
                        nguoi_dung_id: grade_list.map(data => data = data.userId)
                    }
                });
    
                const combinedData = list_grade_point.map(grade => {
                    const userData = users.find(user => user.nguoi_dung_id === grade.userId);
                    return {
                        gradePointId: grade.gradePointId,
                        testId: grade.testId,
                        testedId: grade.testedId,
                        userId: grade.userId,
                        total: grade.total,
                        isPass: grade.isPass,
                        correctCount: grade.correctCount,
                        username: userData ? userData.ten_dang_nhap : null,
                    };
                });
                return res.status(200).send({
                    data: combinedData,
                    message: 'create list grade point success',
                    status: 200
                });
            }
            

            return res.status(200).send({
                data: [],
                status: 200,
                message: 'get grade by test success'
            });
        } catch (err) {
            console.log('err get grade', err);
            return res.status(200).send({
                data: null,
                status: 401,
                message: 'get grade by test fail'
            });
        }

    }
}

module.exports = GradeFunction;
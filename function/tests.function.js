const Test = require('../models/tests');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const Utils = require('../utils/utils');
const ClassUser = require('../models/class_users');

class TestFunction {
    static async getTestByAdminId(req, res) {
        try {
            const user = req.user;
            const classes_user = await ClassUser.findAll({
                where: {
                    nguoi_dung_id: user.userId
                },
                attribute: ['ma_lop']
            });
            const tests = await Test.findAll({
                where: {
                    id_malop: classes_user.map(data => data = data.ma_lop)
                }
            });
            return res.status(200).send({
                data: tests,
                status: 200,
                message: 'get test by admin id success'
            });
        } catch (err) {
            console.log('err get test by admin id', err);
            return res.status(200).send({
                data: null,
                message: 'get test by admin id fail',
                status: 401
            });
        }
    }
    static async getTestsByClassId(req, res) {
        try {
            const classId = req.body.classId;
            const tests = await Test.findAll({
                where: {
                    id_malop: classId
                }
            });

            return res.status(200).send({
                message: 'get tests success',
                data: tests ? tests : [],
                status: 200
            });
        } catch(err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'get tests fail'
            });
        }
    }

    static async getDetailTest(req, res) {
        try {
            const testId = req.body.testId;
            const test = await Test.findOne({
                where: {
                    de_thi_id: testId
                }
            });

            let questions = await Question.findAll({
                where: {
                    id_dethi: testId
                }
            });

            if (!questions) {
                return res.status(200).send({
                    data: null,
                    message: 'get detail test fail',
                    status: 401
                });
            }
            let questions_answer = [];
            for(let question of questions) {
                const answers = await Answer.findAll({
                    where: {
                        id_cauhoi: question.cau_hoi_id
                    }
                });
                questions_answer.push({
                    cau_hoi_id: question.cau_hoi_id,
                    noi_dung_cau_hoi: question.noi_dung_cau_hoi,
                    id_dethi: question.id_dethi,
                    dap_an: answers
                });
            }

            return res.status(200).send({
                data: {
                    de_thi_id: test.de_thi_id,
                    ten_de_thi: test.ten_de_thi,
                    thoi_gian_lam_bai: test.thoi_gian_lam_bai,
                    id_malop: test.id_malop,
                    questions: questions_answer
                },
                status: 200,
                message: 'success'
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                data: null,
                message: 'get detail test fail',
                status: 401
            });
        }
    }

    static async createTest(req, res) {
        try {
            const data = req.body;
            const test_id = Utils.createID('test');
            const test_created = await Test.create({
                de_thi_id: test_id,
                ten_de_thi: data.name,
                thoi_gian_lam_bai: data.time,
                id_malop: data.classId
            });

            if (!test_created) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'create test fail'
                });
            }
            for(let question of data.questions) {
                const questionId = Utils.createID('question');
                const question_created = await Question.create({
                    cau_hoi_id: questionId,
                    noi_dung_cau_hoi: question.content,
                    id_dethi: test_id
                });

                if (!question_created) {
                    return res.status(200).send({
                        data: null,
                        message: 'create question in test fail',
                        status: 401
                    });
                }

                for(let answer of question.dap_an) {
                    const answer_created = await Answer.create({
                        id_dapan: Utils.createID('answer'),
                        id_cauhoi: questionId,
                        is_true: answer.isTrue,
                        noi_dung: answer.content
                    });
    
                    if (!answer_created) {
                        return res.status(200).send({
                            data: null,
                            message: 'create answer in test fail',
                            status: 401
                        });
                    }
                }
            }

            return res.status(200).send({
                status: 200,
                data: null,
                message: 'create test success'
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'create test fail'
            });
        }
    }

}

module.exports = TestFunction;
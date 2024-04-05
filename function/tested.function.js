const Tested = require('../models/tested');
const TestedAnswerUser = require('../models/tested_answer_user');
const TestedAnswer = require('../models/tested_answer');
const Utils = require('../utils/utils');

class TestedFunction {
    static async getTestedIdsByUserId(req, res) {
        try {
            const userId = req.user.userId;
            const tested_list = await TestedAnswerUser.findAll({
                where: {
                    id_user: userId
                },
                attribute: ['id_tested']
            });
            const test_list_id = await Tested.findAll({
                where: {
                    id_bai_thi: tested_list.map(tested => tested = tested.id_tested)
                },
                attribute: ['id_de_thi']
            })
            return res.status(200).send({
                status: 200,
                message: 'get list tested id success',
                data: test_list_id.map(test => test = test.id_de_thi)
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'get list tested id fail'
            });
        }
    }
    static async getTestedByTestId(req, res) {
        try {
            const testId = req.body.testId;
            const tests = await Tested.findAll({
                where: {
                    id_de_thi: testId
                }
            });

            return res.status(200).send({
                message: 'get tested success',
                data: tests ? tests : [],
                status: 200
            });
        } catch(err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'get tested fail'
            });
        }
    }

    static async sendTested(req, res) {
        try {
            const userId = req.user.userId;
            
            const data = req.body;
            const tested_id = Utils.createID('tested');
            if (data.isExpired) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'test time out'
                });
            }

            const tested_created = await Tested.create({
                id_bai_thi: tested_id,
                nguoi_dung_id: userId,
                id_de_thi: data.test_id,
            });

            if (!tested_created) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'send tested fail'
                });
            }

            for(let answer of data.answers) {
                const answeredId = Utils.createID('answered');
                await TestedAnswer.create({
                    id_dap_an_bai_thi: answeredId,
                    id_bai_thi_da_nop: tested_id,
                    id_cau_tra_loi: answer.answerId
                });
            }

            const tested_answer_id =  Utils.createID('tested_answered_id');
            await TestedAnswerUser.create({
                id_tested_answer_user: tested_answer_id,
                id_user: userId,
                id_tested: tested_id
            });

            return res.status(200).send({
                status: 200,
                data: null,
                message: 'send tested success'
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'send tested fail'
            });
        }
    }

}

module.exports = TestedFunction;
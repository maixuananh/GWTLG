const Class = require('../models/classes');
const ClassUser = require('../models/class_users');
const { Op } = require('sequelize');
const Utils = require('../utils/utils');
const { OWNER_CLASS, STUDENT } = require('../enums/class_permission');

class ClassFunction {
    static async getAllClass(req, res) {
        try {
            const user = req.user;
            console.log(user);
            const class_users = await ClassUser.findAll({
                where: {
                    nguoi_dung_id: user.userId
                },
                attributes: ['ma_lop']
            });
            const classes = await Class.findAll({
                where: {
                    ma_lop: class_users.map(class_user => class_user = class_user.ma_lop)
                }
            });
            if (classes) {
                return res.status(200).send({
                    status: 200,
                    data: classes,
                    message: 'success'
                });
            }
            
            return res.status(200).send({
                status: 401,
                data: classes,
                message: 'fail'
            });
        } catch (err) {
            console.log("error get all users", err);
            return res.status(200).send({
                status: 404,
                data: [],
                message: 'fail'
            });
        }
    }

    static async getByAdmin(req, res) {
        try {
            const user = req.user;
            const _list_class_user_id = await ClassUser.findAll({
                where: {
                    nguoi_dung_id: user.userId
                },
                attributes: ['ma_lop']
            });

            if (_list_class_user_id.length == 0) {
                return res.status(200).send({
                    message: 'not found class of this user',
                    data: [],
                    status: 404
                });
            }
            const _list_class = await Class.findAll({
                where: {
                    ma_lop: _list_class_user_id.map(class_user => class_user = class_user.ma_lop)
                }
            });

            return res.status(200).send({
                data: _list_class,
                message: 'success',
                status: 200
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                message: 'get class by admin id fail',
                data: null
            });
        }
    }

    static async search(req, res) {
        try {
            const classes_found = await Class.findAll({
                ten_lop: {
                    [Op.like]: `%${req.body.class_name}%`
                }
            });

            if (classes_found) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: classes_found
                });
            }
        } catch (err) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'error'
            });
        }
    }

    static async createClass(req, res) {
        try {
            const user = req.user;
            const id = Utils.createID('ma_lop');

            const class_created = await Class.create({
                ma_lop: id,
                ten_lop: req.body.class_name,
                description: req.body.description || null,
                ma_vao_lop: Utils.createClassID()
            });

            const class_user_created = await ClassUser.create({
                id: Utils.createID('lopuser'),
                permission: OWNER_CLASS,
                ma_lop: id,
                nguoi_dung_id: user.userId
            });

            if (!class_user_created) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'create class user fail'
                });
            }

            if (!class_created) {
                return res.status(200).send({
                    status: 401,
                    message: 'fail',
                    data: null
                });
            }
            return res.status(200).send({
                status: 200,
                message: 'success',
                data: class_created
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                message: 'create class fail',
                data: null
            });
        }
    }

    static async joinClass(req, res) {
        try {
            const user = req.user;
            const { id_join_class } = req.body;
            const classroom = await Class.findOne({
                where: {
                    ma_vao_lop: id_join_class
                }
            });

            const class_user_created = await ClassUser.create({
                id: Utils.createID('lopuser'),
                permission: STUDENT,
                ma_lop: classroom.ma_lop,
                nguoi_dung_id: user.userId
            });

            if (!class_user_created) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'create class user fail'
                });
            }

            return res.status(200).send({
                status: 200,
                message: 'success',
                data: classroom
            });
        } catch (err) {
            console.log('join class err', err);
            return res.status(200).send({
                data: null,
                message: 'join class fail',
                status: 401
            });
        }
    }
}

module.exports = ClassFunction;
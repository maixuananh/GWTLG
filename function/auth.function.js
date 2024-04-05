const User = require('../models/users');
const Utils = require('../utils/utils');
const bcrypt = require("bcrypt");

class AuthFunction {
    static async register(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const password_bcrypt = await bcrypt.hash(req.body.password, salt);
            const existing_user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (existing_user) {
                return res.status(200).send({
                    status: 400,
                    message: 'fail',
                    data: null
                });
            }

            const user_data = {
                nguoi_dung_id: Utils.createID('user_id'),
                ten_dang_nhap: req.body.username,
                mat_khau: password_bcrypt,
                email: req.body.email,
            };
            const user_create = await User.create(user_data);

            if (!user_create) {
                return res.status(200).send({
                    status: 401,
                    data: null,
                    message: 'register fail'
                });
            }

            return res.status(200).send({
                status: 200,
                data: {
                    token: Utils.createJWT(user_data),
                    refreshToken: Utils.createRefreshToken(user_data),
                    nguoi_dung_id: user_data.nguoi_dung_id,
                    ten_dang_nhap: user_data.ten_dang_nhap,
                    email: user_data.email
                },
                message: 'success'
            });
        } catch (err) {
            console.log(err);
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'register fail'
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(200).send({
                    status: 404,
                    message: 'User not found',
                    data: null
                });
            }
            const match = bcrypt.compare(password, user.mat_khau);
            if (match) {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    data: {
                        token: Utils.createJWT(user),
                        refreshToken: Utils.createRefreshToken(user),
                        nguoi_dung_id: user.nguoi_dung_id,
                        ten_dang_nhap: user.ten_dang_nhap,
                        email: user.email
                    }
                });
            } else {
                res.status(200).send({
                    status: 404,
                    message: 'fail',
                    data: null
                });
            }
        } catch (error) {
            res.status(200).send({
                status: 404,
                message: 'fail',
                data: null
            });
            console.error('Error during login:', error);
        }
    }

    static async getAllUser(req, res) {
        const token = req.headers.authorization;
        const decoded_data = await Utils.getDecodeTokenData(token);
        if (decoded_data === null) {
            return res.status(200).send({
                status: 401,
                data: null,
                message: 'fail token not valid'
            });
        }
        User.findOne({
            where: {
                nguoi_dung_id: decoded_data.userId
            }
        })
            .then(admin => {
                if (admin) {
                    User.findAll().then(users => {
                        res.status(200).send({
                            status: 200,
                            data: users,
                            message: 'success'
                        });
                    })
                }
            })
            .catch(error => {
                console.log("error get all users", error);
                res.status(200).send({
                    status: 404,
                    data: [],
                    message: 'fail'
                });
            });
    }

    static async refreshToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                return res.status(200).send({
                    message: 'Refresh token không được cung cấp.',
                    data: null,
                    status: 401
                });
            }
            const user_data = Utils.getDecodeRefreshTokenData();
            const accessToken = Utils.createJWT(user_data) // Tạo lại access token mới
            return res.status(200).send({
                message: 'create new token success',
                data: {
                    accessToken
                },
                status: 200
            });
        } catch (err) {
            console.log('err refresh token route', err);
            return res.status(200).send({
                message: 'create new token fail',
                data: null,
                status: 401
            });
        }
    }
}

module.exports = AuthFunction;
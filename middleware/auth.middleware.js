const Utils = require('../utils/utils');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token == null) return res.status(403).send({
        message: 'token invalid',
        data: null,
        status: 403
    });
    const decoded_data = Utils.getDecodeTokenData(token);
    if (decoded_data == null) return res.status(403).send({
        message: 'token invalid or expired',
        data: null,
        status: 403
    });
    req.user = decoded_data;
    next();
};

module.exports = {authenticateToken};
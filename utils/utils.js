const jwt = require("jsonwebtoken");
const secretKey = "myapp";
const secretRefreshToken = "myappsecret";

class Utils {
    static createJWT(user) {
        return jwt.sign({
            userId: user.nguoi_dung_id, username: user.ten_dang_nhap
        },
            secretKey,
            { expiresIn: '1h' });
    }

    static createRefreshToken(user) {
        return jwt.sign({
            userId: user.nguoi_dung_id, username: user.ten_dang_nhap
        },
            secretRefreshToken,
            { expiresIn: '7d' });
    }

    static getDecodeTokenData(token) {
        let decoded_data = null;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log('token err', err);
                return null;
            }
            decoded_data = decoded;
        });
        return decoded_data;
    }

    static getDecodeRefreshTokenData(token) {
        let decoded_data = null;
        jwt.verify(token, secretRefreshToken, (err, decoded) => {
            if (err) {
                console.log('err refresh token', err);
                return null;
            }
            decoded_data = decoded;
        });
        return decoded_data;
    }
    //UTC STRING 0.4534654654654
    static createID(type) {
        return String(Date.now()) + type + String(Math.random());
    }

    static createClassID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength =  8;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }
}

module.exports = Utils;
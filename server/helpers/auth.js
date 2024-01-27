const bycrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bycrypt.genSalt(10, (err, salt) => {
            if(err) {
                reject(err);
            }
            bycrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

const comparePassword = (password, hashed) => {
    return bycrypt.compare(password, hashed);
}

module.exports = {
    hashPassword,
    comparePassword
}
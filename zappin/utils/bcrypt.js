const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

const comparePassword = (password, dbpassword) => {
        return bcrypt.compareSync(password, dbpassword);
};

module.exports = {hashPassword,comparePassword}
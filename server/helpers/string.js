const bcrypt = require('bcrypt');

module.exports = {
  generateRandomString(length) {
    let s = '';
    do {
      s += Math.random().toString(36).substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
  },

  generatePasswordHash(password) {
    return bcrypt.hashSync(password,  +process.env.HASH_SALT_LEVEL || 3);
  }
};

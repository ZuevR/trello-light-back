const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    return bcrypt.hashSync(password, +process.env.HASH_SALT_LEVEL || 3);
  },

  comparePassword(formPassword, basePassword) {
    return bcrypt.compareSync(formPassword, basePassword);
  },

  generateToken(payload) {
    const exp = Math.floor(Date.now() / 1000) + (3600 * 24);

    const sign = jwt.sign({
        exp,
        id: payload.id,
        username: payload.username
      },
      'intspirit'
    );

    return {
      exp,
      id: sign
    }
  },

  verifyToken(req, res, next) {
    const token = req.headers.token;

    jwt.verify(token, 'intspirit', (err, decoded) => {
      if (decoded) {
        req._userId = decoded.id;
        req._userName = decoded.name;
        next();
      } else {
        res.status(401).send({ message: 'Authorization failed' });
      }
    });
  }

};

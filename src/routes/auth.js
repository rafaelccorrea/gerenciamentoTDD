const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const ValidationError = require('../errors/validationError');

const secret = 'secret!';

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) throw new ValidationError('User or password incorrect!');
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.encode(payload, secret);

        res.status(200).json({ token });
      } else throw new ValidationError('User or password incorrect!');
    }).catch((err) => next(err));
  };

  return { signin };
};

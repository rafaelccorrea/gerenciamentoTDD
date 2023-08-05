const bcrypt = require('bcrypt-nodejs');

const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = () => app.db('users').select(['id', 'name', 'email']);

  // eslint-disable-next-line arrow-body-style
  const findOne = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError('Name is required');
    if (!user.email) throw new ValidationError('Email is required');
    if (!user.password) throw new ValidationError('Password is required');

    const userDb = await findOne({ email: user.email });

    if (userDb) throw new ValidationError('Email exists already');

    const newUser = { ...user };

    newUser.password = getPasswordHash(user.password);

    return app
      .db('users')
      .insert(newUser, ['id', 'name', 'email']);
  };

  return {
    findAll,
    save,
    findOne,
  };
};

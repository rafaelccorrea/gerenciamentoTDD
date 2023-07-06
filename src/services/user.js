const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select();

  const save = async (user) => {
    if (!user.name) throw new ValidationError('Name is required');
    if (!user.email) throw new ValidationError('Email is required');
    if (!user.password) throw new ValidationError('Password is required');

    const userDb = await findAll({ email: user.email });

    if (userDb && userDb.length > 0) throw new ValidationError('Email exists already');

    return app
      .db('users')
      .insert(user, '*');
  };

  return {
    findAll,
    save,
  };
};

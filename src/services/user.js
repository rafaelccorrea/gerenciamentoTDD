module.exports = (app) => {
  const findAll = (filter = {}) => app.db('users').where(filter).select();

  const save = async (user) => {
    if (!user.name) return { error: 'Name is required' };
    if (!user.email) return { error: 'Email is required' };
    if (!user.password) return { error: 'Password is required' };

    const userDb = await findAll({ email: user.email });

    if (userDb && userDb.length > 0) return { error: 'Email exists already' };

    return app
      .db('users')
      .insert(user, '*');
  };

  return {
    findAll,
    save,
  };
};

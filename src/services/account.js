module.exports = (app) => {
  const save = (account) => {
    if (!account.name) return { error: 'Name is required' };
    return app.db('accounts').insert(account, '*');
  };

  const findAll = () => app.db('accounts');

  const find = (filter = {}) => app.db('accounts').where(filter).first();

  const update = (id, account) => app.db('accounts').where({ id }).update(account, '*');

  const remove = (id) => app.db('accounts').where({ id }).del();

  return {
    save, findAll, find, update, remove,
  };
};

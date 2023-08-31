module.exports = (app) => {
  app.route('/auth/signin').post(app.routes.auth.signin);

  app.route('/users')
    .all(app.config.passport.authenticated())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/accounts')
    .all(app.config.passport.authenticated())
    .get(app.routes.accounts.getAll)
    .post(app.routes.accounts.create);

  app.route('/accounts/:id')
    .all(app.config.passport.authenticated())
    .get(app.routes.accounts.findById)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};

const passport = require('passport');
const passportJwt = require('passport-jwt');

const secret = 'secret!';

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    const user = app.services.user.findOne({
      id: payload.id,
    });

    if (!user) {
      done(null, false);
    }
    done(null, { ...payload });
  });

  passport.use(strategy);

  return {
    authenticated: () => passport.authenticate('jwt', { session: false }),
  };
};

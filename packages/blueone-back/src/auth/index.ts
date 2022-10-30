import passport from 'passport';

import local from './local';

import { User } from '@/models';

export default () => {
  passport.serializeUser<User['id']>((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser<User['id']>(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      return done(null, user); // req.user
    } catch (err) {
      return done(err);
    }
  });

  local();
};

import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { User } from '@/models';

export default () => {
  passport.use(
    'local',
    new Strategy(
      {
        usernameField: 'phoneNumber',
        passwordField: 'password',
      },
      async (phoneNumber, password, done) => {
        try {
          const user = await User.findOne({ where: { phoneNumber } });
          if (!user) {
            return done(null, false, {
              message: '전화번호 혹은 비밀번호가 유효하지 않습니다.',
            });
          }
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return done(null, false, {
              message: '전화번호 혹은 비밀번호가 유효하지 않습니다.',
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

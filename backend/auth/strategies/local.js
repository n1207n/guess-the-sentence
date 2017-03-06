'use strict';

import {User} from '../../models';

import {Strategy as LocalStrategy} from 'passport-local';

const options = {usernameField: 'email'};

export default new LocalStrategy(options, async (email, password, done) => {
  try {
    const user = await User.findOne({email}).exec();

    if (user === null) {
      done(null, false, {message: "Incorrect email"});
    }

    else if (user.password === password) {
      done(null, user, {message: "OK"});
    } else {
      done(null, false, {message: "Incorrect password"});
    }
  } catch (e) {
    done(e);
  }
});

'use strict';

import {User} from '../../models';

import {Strategy as LocalStrategy} from 'passport-local';

// email as username field
const options = {usernameField: 'email'};

export default new LocalStrategy(options, async (email, password, done) => {
  /**
   * done callback parameters
   * - JS error object or null
   * - data or false boolean value
   * - message string or null
   */
  try {
    const user = await User.findOne({email}).exec();

    if (user === null) {
      done(null, false, "Incorrect email");
    } else if (user.password === password) {
      done(null, user, "OK");
    } else {
      done(null, false, "Incorrect password");
    }
  } catch (e) {
    done(e);
  }
});

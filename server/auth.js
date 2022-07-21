import passport from 'passport';
import passportLocal from 'passport-local';

const { Strategy } = passportLocal;
let db;

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using username and
// password credentials from the client. The LocalStrategy object is used to
// authenticate a user using a username and password.
const strategy = new Strategy(async (username, password, done) => {
  if (!db){
    return done(null, false, {message: "db not ready!"});
  }
  const user = await db.findOne({
    username
  });
  if (!user) {
    // no such user
    return done(null, false, { message: 'No username' });
  }

  if (user.psw !== password) { //does the user have the password
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password!' });
  }
  // success!

  return done(null, username);
});

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a username and
// password. There are other strategies available, but this is the simplest.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app, _db) => {
    db = _db;
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => { //needs access to db
    return passport.authenticate(domain, where);
  },
};

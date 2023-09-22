const passport = require ( "passport")
const local = require ( "passport-local")
const { userModel } = require ( "../Dao/models/usersModel.js")
const { createHash, validatePassword } = require ( "../utils.js")
const GitHubStrategy = require ( "passport-github2")
const config = require ( "./config.js")
const { cartService } = require ( "../repository/index.js")


const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user || email === config.auth.account) {
            //No error occurred but this user already exist and can not continue
            console.log("User already exist");
            return done(null, false);
          } else {
            //Everything OK
            const newUser = {
              first_name,
              last_name,
              email,
              age,
              password: createHash(password),
              role: "user",
            };
            let result = await userModel.create(newUser);
            return done(null, result);
          }
        } catch (error) {
          //Everything bad, send error
          return done("Error ocurred when try to register: " + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    if (id === 0) {
      const user = {
        _id: 0,
        first_name: "vic",
        last_name: "pacheco",
        email: "vicpacheco@mail.com",
        age: 30,
        role: "admin",
      };
      done(null, user);
    } else {
      const user = await userModel.findById(id);
      done(null, user);
    }
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          let user;
          if (email == config.auth.account && password == config.auth.pass) {
            user = {
              _id: 0, //A modo de prueba, teniendo en cuenta que ningun usuario va a tener ese ID, para serializar
              first_name: "Administrador",
              last_name: "Del Sistema",
              email: email,
              age: 99,
              role: "admin",
            };
            return done(null, user);
          } else {
            user = await userModel.findOne({ email });
            user.cart = await cartService.addCart();
            if (!user) {
              console.log("El usuario no existe");
              return done(null, false);
            } else {
              if (!validatePassword(password, user)) return done(null, false);
              console.log("Todo ok");
              return done(null, user);
            }
          }
        } catch (error) {
          console.log("Todo RE MAL");
          return done("Error ocurred when try to login: " + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.5529ebbeb6f1d8f9",
        clientSecret: "7b2a182f0b04047474b9b1c8f30a9b3f88bc69df",
        callbackURL: "http://localhost:9090/api/sessions/github-callback",
        scope: ["user:email"],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let user = await userModel.findOne({ email: profile._json.email });
          user.cart = await cartService.addCart();

          if (!user) {
            let email;
            if (profile._json.email != null) {
              email = profile._json.email;
            } else {
              email = "Email not available";
            }
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              email: email,
              age: 18,
              password: "",
              role: "user",
              cart: user.cart,
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );
};

export default initializePassport;
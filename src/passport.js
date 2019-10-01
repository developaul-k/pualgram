import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    console.log('@@@here')
    console.log(payload.id)
    const user = await prisma.user({ id: payload.id });

    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate(
    "jwt",
    {
      session: false
    },
    (error, user) => {
      if (user) {
        req.user = user;
      } else {
        console.log('왜 없어?')
      }
      next();
    }
  )(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));

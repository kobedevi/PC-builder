const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../../models/User');


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new Strategy(jwtOptions, async(payload, done) => {
    try{
        const user = await User.findById(payload._id);
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch(e) {
        return done(e, false);
    }
})

module.exports = jwtStrategy;
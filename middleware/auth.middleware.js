var jwt = require('jsonwebtoken');

module.exports = (router, User) => {
    router.use(async (req, res, next) => {
        let token = req.query.token || req.body.token;

        try {
            let tokenContent = jwt.verify(token, process.env.SECRET);

            try {
                let user = await User.findOne({where: {email: tokenContent.email, token: token}});
                req.user = user;
                next()
            }
            catch {
                res.status(400).send({message: "User not found."});
                return
            }
            
        } catch(e) {
            res.status(400).send({message: "Invalid token."});
            return
        }
    })
}
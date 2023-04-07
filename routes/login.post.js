const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = (app, User) => {
    app.post("/login", async (req, res) => {
        try {
            let user = await User.scope("withPass").findOne({where: {email: req.body.email}});
            if(!user){
                res.send({error: "User not found."})
                return
            }

            if(await bcrypt.compare(req.body.password, user.password)) {

                let token = jwt.sign({
                    email: user.email
                }, process.env.SECRET, { expiresIn: '2h'});
                
                user.update({token})

                res.send({"token": user.token});
                return
            } else {
                res.send({error: "incorrect password."})
            }

        } catch {
            res.send({error: "An unknown error occured."})
        }
        
    })
}